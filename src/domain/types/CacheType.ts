/**
 * Cache Type Definitions
 * Domain layer - Business logic types
 */

/**
 * Cache data types for different use cases
 *
 * General-purpose cache types for any app:
 * - MASTER_DATA: Static/rarely changing (app config, categories)
 * - USER_DATA: User-specific data (profile, sessions, preferences)
 * - REALTIME_DATA: Real-time updates (live notifications, chat)
 * - PUBLIC_DATA: Public/shared content (community posts, leaderboards)
 */
export enum CacheType {
  MASTER_DATA = 'MASTER_DATA',
  USER_DATA = 'USER_DATA',
  REALTIME_DATA = 'REALTIME_DATA',
  PUBLIC_DATA = 'PUBLIC_DATA',
}

/**
 * Cache configuration for a specific data type
 */
export interface CacheConfig {
  staleTime: number;
  gcTime: number;
  refetchOnMount?: boolean;
  refetchOnWindowFocus?: boolean;
  refetchOnReconnect?: boolean;
}

