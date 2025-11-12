/**
 * @umituz/react-native-cache - Public API
 *
 * TanStack Query cache management and configuration for React Native apps
 * Centralized cache strategies for all queries
 *
 * Usage:
 *   import { DEFAULT_QUERY_CONFIG, setQueryClient, getQueryClient } from '@umituz/react-native-cache';
 */

// =============================================================================
// INFRASTRUCTURE LAYER - Cache Configuration
// =============================================================================

export {
  TIME,
  MASTER_DATA_CACHE,
  USER_DATA_CACHE,
  REALTIME_DATA_CACHE,
  DEFAULT_QUERY_CONFIG,
  ENV_CACHE_CONFIG,
} from './infrastructure/config/cache.config';

// =============================================================================
// INFRASTRUCTURE LAYER - Middleware
// =============================================================================

export { requestDeduplicationMiddleware } from './infrastructure/middleware/RequestDeduplicationMiddleware';

// =============================================================================
// DOMAIN LAYER - QueryClient Singleton
// =============================================================================

export { getQueryClient, setQueryClient, hasQueryClient } from './domain/queryClient';

