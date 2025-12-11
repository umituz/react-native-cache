/**
 * Cache Statistics Tracker
 */
import type { CacheStats } from './types/Cache';
export declare class CacheStatsTracker {
    private stats;
    recordHit(): void;
    recordMiss(): void;
    recordEviction(): void;
    recordExpiration(): void;
    updateSize(size: number): void;
    getStats(): CacheStats;
    reset(): void;
}
//# sourceMappingURL=CacheStatsTracker.d.ts.map