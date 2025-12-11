/**
 * In-Memory Cache
 */
export class Cache {
    constructor(config = {}) {
        this.store = new Map();
        this.stats = {
            size: 0,
            hits: 0,
            misses: 0,
            evictions: 0,
            expirations: 0,
        };
        this.config = {
            maxSize: config.maxSize || 100,
            defaultTTL: config.defaultTTL || 5 * 60 * 1000, // 5 minutes
            onEvict: config.onEvict || (() => { }),
            onExpire: config.onExpire || (() => { }),
        };
    }
    set(key, value, ttl) {
        if (this.store.size >= this.config.maxSize && !this.store.has(key)) {
            this.evictOne('lru');
        }
        const entry = {
            value,
            timestamp: Date.now(),
            ttl: ttl || this.config.defaultTTL,
            accessCount: 0,
            lastAccess: Date.now(),
        };
        this.store.set(key, entry);
        this.stats.size = this.store.size;
    }
    get(key) {
        const entry = this.store.get(key);
        if (!entry) {
            this.stats.misses++;
            return undefined;
        }
        if (this.isExpired(entry)) {
            this.delete(key);
            this.stats.misses++;
            this.stats.expirations++;
            this.config.onExpire(key, entry);
            return undefined;
        }
        entry.accessCount++;
        entry.lastAccess = Date.now();
        this.stats.hits++;
        return entry.value;
    }
    has(key) {
        const entry = this.store.get(key);
        if (!entry)
            return false;
        if (this.isExpired(entry)) {
            this.delete(key);
            return false;
        }
        return true;
    }
    delete(key) {
        return this.store.delete(key);
    }
    invalidatePattern(pattern) {
        const regex = this.convertPatternToRegex(pattern);
        let invalidatedCount = 0;
        for (const key of this.store.keys()) {
            if (regex.test(key)) {
                this.store.delete(key);
                invalidatedCount++;
            }
        }
        this.stats.size = this.store.size;
        return invalidatedCount;
    }
    clear() {
        this.store.clear();
        this.stats = {
            size: 0,
            hits: 0,
            misses: 0,
            evictions: 0,
            expirations: 0,
        };
    }
    convertPatternToRegex(pattern) {
        const escapedPattern = pattern
            .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
            .replace(/\*/g, '.*');
        return new RegExp(`^${escapedPattern}$`);
    }
    getStats() {
        return { ...this.stats };
    }
    keys() {
        return Array.from(this.store.keys());
    }
    isExpired(entry) {
        return Date.now() - entry.timestamp > entry.ttl;
    }
    evictOne(strategy) {
        let keyToEvict;
        if (strategy === 'lru') {
            keyToEvict = this.findLRU();
        }
        else if (strategy === 'lfu') {
            keyToEvict = this.findLFU();
        }
        else if (strategy === 'fifo') {
            keyToEvict = this.findFIFO();
        }
        else if (strategy === 'ttl') {
            keyToEvict = this.findNearestExpiry();
        }
        if (keyToEvict) {
            const entry = this.store.get(keyToEvict);
            this.store.delete(keyToEvict);
            this.stats.evictions++;
            if (entry) {
                this.config.onEvict(keyToEvict, entry);
            }
        }
    }
    findLRU() {
        let oldest;
        let oldestTime = Infinity;
        for (const [key, entry] of this.store.entries()) {
            if (entry.lastAccess < oldestTime) {
                oldestTime = entry.lastAccess;
                oldest = key;
            }
        }
        return oldest;
    }
    findLFU() {
        let least;
        let leastCount = Infinity;
        for (const [key, entry] of this.store.entries()) {
            if (entry.accessCount < leastCount) {
                leastCount = entry.accessCount;
                least = key;
            }
        }
        return least;
    }
    findFIFO() {
        return this.store.keys().next().value;
    }
    findNearestExpiry() {
        let nearest;
        let nearestExpiry = Infinity;
        for (const [key, entry] of this.store.entries()) {
            const expiry = entry.timestamp + entry.ttl;
            if (expiry < nearestExpiry) {
                nearestExpiry = expiry;
                nearest = key;
            }
        }
        return nearest;
    }
}
//# sourceMappingURL=Cache.js.map