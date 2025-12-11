/**
 * In-Memory Cache
 */
import type { CacheConfig, CacheStats } from './types/Cache';
export declare class Cache<T = unknown> {
    private store;
    private config;
    private statsTracker;
    private strategies;
    constructor(config?: CacheConfig);
    set(key: string, value: T, ttl?: number): void;
    get(key: string): T | undefined;
    has(key: string): boolean;
    delete(key: string): boolean;
    invalidatePattern(pattern: string): number;
    clear(): void;
    getStats(): CacheStats;
    keys(): string[];
    private isExpired;
    private evictOne;
}
//# sourceMappingURL=Cache.d.ts.map