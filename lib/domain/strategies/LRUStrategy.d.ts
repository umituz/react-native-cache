/**
 * LRU (Least Recently Used) Eviction Strategy
 */
import type { EvictionStrategy } from './EvictionStrategy';
import type { CacheEntry } from '../types/Cache';
export declare class LRUStrategy<T> implements EvictionStrategy<T> {
    findKeyToEvict(entries: Map<string, CacheEntry<T>>): string | undefined;
}
//# sourceMappingURL=LRUStrategy.d.ts.map