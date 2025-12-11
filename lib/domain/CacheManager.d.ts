/**
 * Cache Manager
 * Manages multiple cache instances
 */
import { Cache } from './Cache';
import type { CacheConfig } from './types/Cache';
export declare class CacheManager {
    private static instance;
    private caches;
    private constructor();
    static getInstance(): CacheManager;
    getCache<T>(name: string, config?: CacheConfig): Cache<T>;
    deleteCache(name: string): boolean;
    clearAll(): void;
    getCacheNames(): string[];
}
export declare const cacheManager: CacheManager;
//# sourceMappingURL=CacheManager.d.ts.map