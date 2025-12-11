/**
 * @umituz/react-native-cache
 * In-memory caching utilities for React Native
 */
export { Cache } from './domain/Cache';
export { CacheManager, cacheManager } from './domain/CacheManager';
export { TTLCache } from './infrastructure/TTLCache';
export type { CacheEntry, CacheConfig, CacheStats, EvictionStrategy, } from './domain/types/Cache';
export { useCache } from './presentation/useCache';
export { useCachedValue } from './presentation/useCachedValue';
//# sourceMappingURL=index.d.ts.map