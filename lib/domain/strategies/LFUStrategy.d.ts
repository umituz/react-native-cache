/**
 * LFU (Least Frequently Used) Eviction Strategy
 */
import type { EvictionStrategy } from './EvictionStrategy';
import type { CacheEntry } from '../types/Cache';
export declare class LFUStrategy<T> implements EvictionStrategy<T> {
    findKeyToEvict(entries: Map<string, CacheEntry<T>>): string | undefined;
}
//# sourceMappingURL=LFUStrategy.d.ts.map