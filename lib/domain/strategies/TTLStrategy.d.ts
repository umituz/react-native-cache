/**
 * TTL (Time To Live) Eviction Strategy
 */
import type { EvictionStrategy } from './EvictionStrategy';
import type { CacheEntry } from '../types/Cache';
export declare class TTLStrategy<T> implements EvictionStrategy<T> {
    findKeyToEvict(entries: Map<string, CacheEntry<T>>): string | undefined;
}
//# sourceMappingURL=TTLStrategy.d.ts.map