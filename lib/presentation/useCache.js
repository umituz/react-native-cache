/**
 * useCache Hook
 */
import { useCallback, useState } from 'react';
import { cacheManager } from '../domain/CacheManager';
export function useCache(cacheName, config) {
    const cache = cacheManager.getCache(cacheName, config);
    const [, forceUpdate] = useState({});
    const triggerUpdate = useCallback(() => {
        forceUpdate({});
    }, []);
    const set = useCallback((key, value, ttl) => {
        cache.set(key, value, ttl);
        triggerUpdate();
    }, [cache, triggerUpdate]);
    const get = useCallback((key) => {
        return cache.get(key);
    }, [cache]);
    const has = useCallback((key) => {
        return cache.has(key);
    }, [cache]);
    const remove = useCallback((key) => {
        const result = cache.delete(key);
        triggerUpdate();
        return result;
    }, [cache, triggerUpdate]);
    const clear = useCallback(() => {
        cache.clear();
        triggerUpdate();
    }, [cache, triggerUpdate]);
    const invalidatePattern = useCallback((pattern) => {
        const count = cache.invalidatePattern(pattern);
        triggerUpdate();
        return count;
    }, [cache, triggerUpdate]);
    const getStats = useCallback(() => {
        return cache.getStats();
    }, [cache]);
    return {
        set,
        get,
        has,
        remove,
        clear,
        invalidatePattern,
        getStats,
    };
}
//# sourceMappingURL=useCache.js.map