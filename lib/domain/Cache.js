/**
 * In-Memory Cache
 */
import { CacheStatsTracker } from './CacheStatsTracker';
import { PatternMatcher } from './PatternMatcher';
import { LRUStrategy } from './strategies/LRUStrategy';
import { LFUStrategy } from './strategies/LFUStrategy';
import { FIFOStrategy } from './strategies/FIFOStrategy';
import { TTLStrategy } from './strategies/TTLStrategy';
export class Cache {
    constructor(config = {}) {
        this.store = new Map();
        this.statsTracker = new CacheStatsTracker();
        this.strategies = {
            lru: new LRUStrategy(),
            lfu: new LFUStrategy(),
            fifo: new FIFOStrategy(),
            ttl: new TTLStrategy(),
        };
        this.config = {
            maxSize: config.maxSize || 100,
            defaultTTL: config.defaultTTL || 5 * 60 * 1000,
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
        this.statsTracker.updateSize(this.store.size);
        if (__DEV__) {
            console.log(`Cache: Set key "${key}" with TTL ${entry.ttl}ms`);
        }
    }
    get(key) {
        const entry = this.store.get(key);
        if (!entry) {
            this.statsTracker.recordMiss();
            return undefined;
        }
        if (this.isExpired(entry)) {
            this.delete(key);
            this.statsTracker.recordMiss();
            this.statsTracker.recordExpiration();
            this.config.onExpire(key, entry);
            return undefined;
        }
        entry.accessCount++;
        entry.lastAccess = Date.now();
        this.statsTracker.recordHit();
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
        const deleted = this.store.delete(key);
        if (deleted) {
            this.statsTracker.updateSize(this.store.size);
        }
        return deleted;
    }
    invalidatePattern(pattern) {
        let invalidatedCount = 0;
        for (const key of this.store.keys()) {
            if (PatternMatcher.matchesPattern(key, pattern)) {
                this.store.delete(key);
                invalidatedCount++;
            }
        }
        this.statsTracker.updateSize(this.store.size);
        return invalidatedCount;
    }
    clear() {
        this.store.clear();
        this.statsTracker.reset();
    }
    getStats() {
        return this.statsTracker.getStats();
    }
    keys() {
        return Array.from(this.store.keys());
    }
    isExpired(entry) {
        return Date.now() - entry.timestamp > entry.ttl;
    }
    evictOne(strategy) {
        const evictionStrategy = this.strategies[strategy];
        if (!evictionStrategy)
            return;
        const keyToEvict = evictionStrategy.findKeyToEvict(this.store);
        if (keyToEvict) {
            const entry = this.store.get(keyToEvict);
            this.store.delete(keyToEvict);
            this.statsTracker.recordEviction();
            this.statsTracker.updateSize(this.store.size);
            if (__DEV__) {
                console.log(`Cache: Evicted key "${keyToEvict}" using ${strategy} strategy`);
            }
            if (entry) {
                this.config.onEvict(keyToEvict, entry);
            }
        }
    }
}
//# sourceMappingURL=Cache.js.map