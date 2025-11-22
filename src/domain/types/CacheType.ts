/**
 * Cache Type Definitions
 * Domain layer - Business logic types
 */

/**
 * Cache data types for different use cases
 */
export enum CacheType {
  MASTER_DATA = 'MASTER_DATA',
  USER_DATA = 'USER_DATA',
  REALTIME_DATA = 'REALTIME_DATA',
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

