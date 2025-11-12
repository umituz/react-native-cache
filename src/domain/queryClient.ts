/**
 * Query Client Singleton
 * Global QueryClient instance for cache invalidation outside React components
 */

import type { QueryClient } from '@tanstack/react-query';

// Global singleton instance
let queryClientInstance: QueryClient | null = null;

/**
 * Get the global QueryClient instance
 * Must be initialized first by calling setQueryClient
 */
export const getQueryClient = (): QueryClient => {
  if (!queryClientInstance) {
    throw new Error(
      'QueryClient not initialized. Call setQueryClient first in app root.'
    );
  }
  return queryClientInstance;
};

/**
 * Set the global QueryClient instance
 * Should be called once in app root (_layout.tsx)
 */
export const setQueryClient = (client: QueryClient): void => {
  queryClientInstance = client;
};

/**
 * Check if QueryClient is initialized
 */
export const hasQueryClient = (): boolean => {
  return queryClientInstance !== null;
};

