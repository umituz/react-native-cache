/**
 * useCache Hook
 */
import type { CacheConfig } from '../domain/types/Cache';
export declare function useCache<T>(cacheName: string, config?: CacheConfig): {
    set: (key: string, value: T, ttl?: number) => void;
    get: (key: string) => T | undefined;
    has: (key: string) => boolean;
    remove: (key: string) => boolean;
    clear: () => void;
    invalidatePattern: (pattern: string) => number;
    getStats: () => import("../domain/types/Cache").CacheStats;
};
//# sourceMappingURL=useCache.d.ts.map