/**
 * @umituz/react-native-cache - Public API
 *
 * TanStack Query cache management and configuration for React Native apps
 * Centralized cache strategies for all queries
 *
 * Usage:
 *   import { DEFAULT_QUERY_CONFIG, setQueryClient, getQueryClient } from '@umituz/react-native-cache';
 *   import { StorageCacheService, CacheStrategy, CacheType } from '@umituz/react-native-cache';
 */

// =============================================================================
// DOMAIN LAYER - Types
// =============================================================================

export { CacheType } from './domain/types/CacheType';
export type { CacheConfig } from './domain/types/CacheType';

// =============================================================================
// DOMAIN LAYER - Entities
// =============================================================================

export type { CachedData, CacheMetadata } from './domain/entities/CachedData';

// =============================================================================
// DOMAIN LAYER - Strategies
// =============================================================================

export { CacheStrategy } from './domain/strategies/CacheStrategy';

// =============================================================================
// DOMAIN LAYER - Utilities
// =============================================================================

export { CacheCalculator } from './domain/utils/CacheCalculator';
export { CacheKeyBuilder } from './domain/utils/CacheKeyBuilder';

// =============================================================================
// DOMAIN LAYER - QueryClient Singleton
// =============================================================================

export { getQueryClient, setQueryClient, hasQueryClient } from './domain/queryClient';

// =============================================================================
// APPLICATION LAYER - Ports
// =============================================================================

export type { IStorageCacheRepository } from './application/ports/IStorageCacheRepository';

// =============================================================================
// INFRASTRUCTURE LAYER - Cache Configuration
// =============================================================================

export {
  TIME,
  MASTER_DATA_CACHE,
  USER_DATA_CACHE,
  REALTIME_DATA_CACHE,
  PUBLIC_DATA_CACHE,
  DEFAULT_QUERY_CONFIG,
  ENV_CACHE_CONFIG,
} from './infrastructure/config/cache.config';

// =============================================================================
// INFRASTRUCTURE LAYER - Repositories
// =============================================================================

export { StorageCacheRepository } from './infrastructure/repositories/StorageCacheRepository';

// =============================================================================
// INFRASTRUCTURE LAYER - Services
// =============================================================================

export { StorageCacheService } from './infrastructure/services/StorageCacheService';

// =============================================================================
// INFRASTRUCTURE LAYER - Middleware
// =============================================================================

export { requestDeduplicationMiddleware } from './infrastructure/middleware/RequestDeduplicationMiddleware';

