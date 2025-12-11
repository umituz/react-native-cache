/**
 * FIFO (First In First Out) Eviction Strategy
 */
import type { EvictionStrategy } from './EvictionStrategy';
import type { CacheEntry } from '../types/Cache';
export declare class FIFOStrategy<T> implements EvictionStrategy<T> {
    findKeyToEvict(entries: Map<string, CacheEntry<T>>): string | undefined;
}
//# sourceMappingURL=FIFOStrategy.d.ts.map