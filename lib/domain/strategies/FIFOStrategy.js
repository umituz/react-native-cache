/**
 * FIFO (First In First Out) Eviction Strategy
 */
export class FIFOStrategy {
    findKeyToEvict(entries) {
        return entries.keys().next().value;
    }
}
//# sourceMappingURL=FIFOStrategy.js.map