/**
 * TTL (Time To Live) Eviction Strategy
 */
export class TTLStrategy {
    findKeyToEvict(entries) {
        let nearest;
        let nearestExpiry = Infinity;
        for (const [key, entry] of entries.entries()) {
            const expiry = entry.timestamp + entry.ttl;
            if (expiry < nearestExpiry) {
                nearestExpiry = expiry;
                nearest = key;
            }
        }
        return nearest;
    }
}
//# sourceMappingURL=TTLStrategy.js.map