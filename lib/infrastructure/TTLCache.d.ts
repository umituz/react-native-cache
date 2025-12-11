/**
 * TTL Cache
 * Time-to-live cache with automatic cleanup
 */
import { Cache } from '../domain/Cache';
import type { CacheConfig } from '../domain/types/Cache';
export declare class TTLCache<T = unknown> extends Cache<T> {
    private cleanupInterval;
    constructor(config?: CacheConfig & {
        cleanupIntervalMs?: number;
    });
    private startCleanup;
    private cleanup;
    destroy(): void;
}
//# sourceMappingURL=TTLCache.d.ts.map