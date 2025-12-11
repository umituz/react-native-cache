/**
 * In-Memory Cache
 */
import type { CacheConfig, CacheStats } from './types/Cache';
export declare class Cache<T = unknown> {
    private store;
    private config;
    private stats;
    constructor(config?: CacheConfig);
    set(key: string, value: T, ttl?: number): void;
    get(key: string): T | undefined;
    has(key: string): boolean;
    delete(key: string): boolean;
    invalidatePattern(pattern: string): number;
    clear(): void;
    private convertPatternToRegex;
    getStats(): CacheStats;
    keys(): string[];
    private isExpired;
    private evictOne;
    private findLRU;
    private findLFU;
    private findFIFO;
    private findNearestExpiry;
}
//# sourceMappingURL=Cache.d.ts.map