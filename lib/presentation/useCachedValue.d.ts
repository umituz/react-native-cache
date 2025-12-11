/**
 * useCachedValue Hook
 */
import type { CacheConfig } from '../domain/types/Cache';
export declare function useCachedValue<T>(cacheName: string, key: string, fetcher: () => Promise<T>, config?: CacheConfig & {
    ttl?: number;
}): {
    value: T | undefined;
    isLoading: boolean;
    error: Error | null;
    invalidate: () => void;
    invalidatePattern: (pattern: string) => number;
    refetch: () => void;
};
//# sourceMappingURL=useCachedValue.d.ts.map