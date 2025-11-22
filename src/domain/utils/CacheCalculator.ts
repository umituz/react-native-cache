/**
 * Cache Calculator
 * Domain layer - Business logic for cache calculations
 *
 * Single Responsibility: Calculate cache expiry, age, and validation
 */

import { CacheType, type CacheConfig } from '../types/CacheType';
import { CacheStrategy } from '../strategies/CacheStrategy';
import { TIME } from '../../infrastructure/config/cache.config';

/**
 * Cache Calculator
 * Centralized cache calculations for all cache operations
 */
export class CacheCalculator {
  /**
   * Calculate cache expiry timestamp
   */
  static calculateExpiry(staleTime: number): number {
    return Date.now() + staleTime;
  }

  /**
   * Calculate cache age in milliseconds
   */
  static calculateAge(timestamp: number): number {
    return Date.now() - timestamp;
  }

  /**
   * Check if cache is expired
   */
  static isExpired(timestamp: number, expiry?: number): boolean {
    if (expiry) {
      return Date.now() > expiry;
    }
    return false;
  }

  /**
   * Get expiry time for cache type
   */
  static getExpiryForType(type: CacheType): number {
    const config = CacheStrategy.getConfigByType(type);
    return this.calculateExpiry(config.staleTime);
  }

  /**
   * Get expiry time in milliseconds for cache type
   */
  static getExpiryMsForType(type: CacheType): number {
    const config = CacheStrategy.getConfigByType(type);
    return config.staleTime;
  }

  /**
   * Format cache age for logging
   */
  static formatAge(ageMs: number): string {
    if (ageMs < TIME.MINUTE) {
      return `${Math.round(ageMs / TIME.SECOND)}s`;
    }
    if (ageMs < TIME.HOUR) {
      return `${Math.round(ageMs / TIME.MINUTE)}m`;
    }
    if (ageMs < TIME.DAY) {
      return `${Math.round(ageMs / TIME.HOUR)}h`;
    }
    return `${Math.round(ageMs / TIME.DAY)}d`;
  }

  /**
   * Check if cache is still fresh
   */
  static isFresh(timestamp: number, staleTime: number): boolean {
    const age = this.calculateAge(timestamp);
    return age < staleTime;
  }
}

