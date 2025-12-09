/**
 * Cache Strategy
 * Domain layer - Business logic for cache calculations
 */

import { CacheType, type CacheConfig } from '../types/CacheType';
import { TIME } from '../../infrastructure/config/cache.config';

/**
 * Cache strategy calculator
 * Calculates cache configuration based on data type
 */
export class CacheStrategy {
  /**
   * Get cache configuration for master data
   * Master data rarely changes (templates, categories, packages)
   */
  static getMasterDataConfig(): CacheConfig {
    return {
      staleTime: TIME.DAY, // 24 hours
      gcTime: TIME.WEEK, // 7 days
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    };
  }

  /**
   * Get cache configuration for user data
   * User data changes moderately (sessions, stats, logs)
   */
  static getUserDataConfig(): CacheConfig {
    return {
      staleTime: TIME.MINUTE * 5, // 5 minutes
      gcTime: TIME.HOUR, // 1 hour
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    };
  }

  /**
   * Get cache configuration for real-time data
   * Real-time data updates frequently via subscriptions
   */
  static getRealtimeDataConfig(): CacheConfig {
    return {
      staleTime: TIME.MINUTE, // 1 minute
      gcTime: TIME.MINUTE * 30, // 30 minutes
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    };
  }

  /**
   * Get cache configuration for public/shared data
   * Public data is read-heavy, write-light, eventual consistency acceptable
   * Examples: Community posts, leaderboards, product listings, shared resources
   */
  static getPublicDataConfig(): CacheConfig {
    return {
      staleTime: TIME.MINUTE * 30, // 30 minutes
      gcTime: TIME.HOUR * 2, // 2 hours
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    };
  }

  /**
   * Get cache configuration by type
   */
  static getConfigByType(type: CacheType): CacheConfig {
    switch (type) {
      case CacheType.MASTER_DATA:
        return this.getMasterDataConfig();
      case CacheType.USER_DATA:
        return this.getUserDataConfig();
      case CacheType.REALTIME_DATA:
        return this.getRealtimeDataConfig();
      case CacheType.PUBLIC_DATA:
        return this.getPublicDataConfig();
      default:
        return this.getUserDataConfig();
    }
  }
}

