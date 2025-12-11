/**
 * Cache Statistics Tracker
 */
export class CacheStatsTracker {
    constructor() {
        this.stats = {
            size: 0,
            hits: 0,
            misses: 0,
            evictions: 0,
            expirations: 0,
        };
    }
    recordHit() {
        this.stats.hits++;
    }
    recordMiss() {
        this.stats.misses++;
    }
    recordEviction() {
        this.stats.evictions++;
    }
    recordExpiration() {
        this.stats.expirations++;
    }
    updateSize(size) {
        this.stats.size = size;
    }
    getStats() {
        return { ...this.stats };
    }
    reset() {
        this.stats = {
            size: 0,
            hits: 0,
            misses: 0,
            evictions: 0,
            expirations: 0,
        };
    }
}
//# sourceMappingURL=CacheStatsTracker.js.map