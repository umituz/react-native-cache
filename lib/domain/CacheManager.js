/**
 * Cache Manager
 * Manages multiple cache instances
 */
import { Cache } from './Cache';
export class CacheManager {
    constructor() {
        this.caches = new Map();
    }
    static getInstance() {
        if (!CacheManager.instance) {
            CacheManager.instance = new CacheManager();
        }
        return CacheManager.instance;
    }
    getCache(name, config) {
        if (!this.caches.has(name)) {
            this.caches.set(name, new Cache(config));
        }
        return this.caches.get(name);
    }
    deleteCache(name) {
        const cache = this.caches.get(name);
        if (cache) {
            cache.clear();
            return this.caches.delete(name);
        }
        return false;
    }
    clearAll() {
        this.caches.forEach((cache) => cache.clear());
        this.caches.clear();
    }
    getCacheNames() {
        return Array.from(this.caches.keys());
    }
}
export const cacheManager = CacheManager.getInstance();
//# sourceMappingURL=CacheManager.js.map