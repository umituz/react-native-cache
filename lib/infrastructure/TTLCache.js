/**
 * TTL Cache
 * Time-to-live cache with automatic cleanup
 */
import { Cache } from '../domain/Cache';
export class TTLCache extends Cache {
    constructor(config = {}) {
        super(config);
        this.cleanupInterval = null;
        const cleanupIntervalMs = config.cleanupIntervalMs || 60000; // 1 minute
        this.startCleanup(cleanupIntervalMs);
    }
    startCleanup(intervalMs) {
        this.cleanupInterval = setInterval(() => {
            this.cleanup();
        }, intervalMs);
    }
    cleanup() {
        const keys = this.keys();
        for (const key of keys) {
            this.get(key); // This will auto-delete expired entries
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