/**
 * LFU (Least Frequently Used) Eviction Strategy
 */
export class LFUStrategy {
    findKeyToEvict(entries) {
        let least;
        let leastCount = Infinity;
        for (const [key, entry] of entries.entries()) {
            if (entry.accessCount < leastCount) {
                leastCount = entry.accessCount;
                least = key;
            }
        }
        return least;
    }
}
//# sourceMappingURL=LFUStrategy.js.map