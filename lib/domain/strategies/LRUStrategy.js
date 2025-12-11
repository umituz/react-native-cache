/**
 * LRU (Least Recently Used) Eviction Strategy
 */
export class LRUStrategy {
    findKeyToEvict(entries) {
        let oldest;
        let oldestTime = Infinity;
        for (const [key, entry] of entries.entries()) {
            if (entry.lastAccess < oldestTime) {
                oldestTime = entry.lastAccess;
                oldest = key;
            }
        }
        return oldest;
    }
}
//# sourceMappingURL=LRUStrategy.js.map