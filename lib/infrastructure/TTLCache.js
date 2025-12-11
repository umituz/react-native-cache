/**
 * TTL Cache
 * Time-to-live cache with automatic cleanup
 */
import { Cache } from '../domain/Cache';
export class TTLCache extends Cache {
    constructor(config = {}) {
        super(config);
        this.cleanupInterval = null;
        const cleanupIntervalMs = config.cleanupIntervalMs || 60000;
        this.startCleanup(cleanupIntervalMs);
    }
    startCleanup(intervalMs) {
        this.cleanupInterval = setInterval(() => {
            this.cleanup();
        }, intervalMs);
    }
    cleanup() {
        const keys = this.keys();
        let cleanedCount = 0;
        for (const key of keys) {
            if (this.get(key) === undefined) {
                cleanedCount++;
            }
        }
        if (__DEV__ && cleanedCount > 0) {
            console.log(`TTLCache: Cleaned up ${cleanedCount} expired entries`);
        }
    }
    destroy() {
        if (this.cleanupInterval) {
            clearInterval(this.cleanupInterval);
            this.cleanupInterval = null;
        }
        this.clear();
    }
}
//# sourceMappingURL=TTLCache.js.map