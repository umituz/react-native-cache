/**
 * TanStack Query Cache Configuration
 *
 * Centralized cache management for all queries in React Native apps.
 * This file defines staleTime and gcTime (garbage collection time) for different
 * types of data based on their update frequency and usage patterns.
 *
 * Philosophy:
 * - Master data (sounds, types) = Long cache (rarely changes)
 * - User data (sessions, stats) = Medium cache (changes moderately)
 * - Real-time data (live updates) = Short cache (changes frequently)
 *
 * Cache Time Definitions:
 * - staleTime: How long data is considered "fresh" before refetch
 * - gcTime: How long unused data stays in memory (formerly cacheTime)
 *
 * @see https://tanstack.com/query/latest/docs/react/guides/caching
 */

/**
 * Time constants in milliseconds
 * Defined for readability and reusability
 */
export const TIME = {
  SECOND: 1000,
  MINUTE: 1000 * 60,
  HOUR: 1000 * 60 * 60,
  DAY: 1000 * 60 * 60 * 24,
  WEEK: 1000 * 60 * 60 * 24 * 7,
} as const;

/**
 * Master Data Cache Settings
 *
 * For data that rarely changes (meditation types, ambient sounds, app config).
 * These are essentially "static" data that only change when admin updates them.
 *
 * Strategy:
 * - Long staleTime: Avoid unnecessary refetches
 * - Long gcTime: Keep in memory for app lifetime
 * - Background refetch: Still update when app focuses (but not often)
 */
export const MASTER_DATA_CACHE = {
  // Meditation types (e.g., mindfulness, breathing, body-scan)
  // Changes: Only when new types are added via admin panel (very rare)
  MEDITATION_TYPES: {
    staleTime: TIME.DAY, // 24 hours - master data rarely changes
    gcTime: TIME.WEEK, // 7 days - keep in cache for a week
  },

  // Ambient sounds (e.g., rain, ocean, forest)
  // Changes: When new sounds added or premium status changes
  AMBIENT_SOUNDS: {
    staleTime: TIME.MINUTE * 5, // 5 minutes - refetch to catch premium status changes
    gcTime: TIME.HOUR, // 1 hour - keep in cache for quick access
  },

  // App configuration/settings
  // Changes: Rarely, only on app updates or admin changes
  APP_CONFIG: {
    staleTime: TIME.DAY, // 24 hours
    gcTime: TIME.WEEK, // 7 days
  },
} as const;

/**
 * User Data Cache Settings
 *
 * For user-specific data that changes moderately (sessions, statistics, achievements).
 * These update when user completes sessions but not in real-time.
 *
 * Strategy:
 * - Medium staleTime: Balance between freshness and performance
 * - Medium gcTime: Keep in memory for current session
 * - Real-time subscriptions: Handle live updates via Supabase realtime
 */
export const USER_DATA_CACHE = {
  // User statistics (total sessions, streak, total time)
  // Changes: After each session completion
  STATISTICS: {
    staleTime: TIME.MINUTE * 5, // 5 minutes - data considered fresh
    gcTime: TIME.HOUR, // 1 hour - keep in cache
  },

  // User sessions list (history of completed sessions)
  // Changes: When user completes new session or deletes sessions
  SESSIONS: {
    staleTime: TIME.MINUTE * 2, // 2 minutes - sessions update frequently
    gcTime: TIME.HOUR, // 1 hour - keep in cache
  },

  // Last/most recent session
  // Changes: Every time user completes a session
  LAST_SESSION: {
    staleTime: TIME.MINUTE * 2, // 2 minutes - last session updates frequently
    gcTime: TIME.HOUR, // 1 hour - keep in cache
  },

  // Weekly progress data (for charts)
  // Changes: Daily as user completes sessions
  WEEKLY_SESSIONS: {
    staleTime: TIME.MINUTE * 5, // 5 minutes
    gcTime: TIME.HOUR, // 1 hour
  },

  // Monthly progress data (for charts)
  // Changes: Daily as user completes sessions
  MONTHLY_SESSIONS: {
    staleTime: TIME.MINUTE * 5, // 5 minutes
    gcTime: TIME.HOUR, // 1 hour
  },

  // Sessions grouped by meditation type
  // Changes: After each session completion
  SESSIONS_BY_TYPE: {
    staleTime: TIME.MINUTE * 5, // 5 minutes
    gcTime: TIME.HOUR, // 1 hour
  },

  // User achievements (unlocked badges, milestones)
  // Changes: When user unlocks new achievement
  ACHIEVEMENTS: {
    staleTime: TIME.MINUTE * 5, // 5 minutes - achievements update relatively frequently
    gcTime: TIME.HOUR, // 1 hour - keep in cache
  },
} as const;

/**
 * Real-time Data Cache Settings
 *
 * For data that updates in real-time via Supabase subscriptions.
 * These have short staleTime because updates are pushed via realtime.
 *
 * Strategy:
 * - Short staleTime: Data updates via realtime, but still allow refetch
 * - Medium gcTime: Keep in memory during active use
 * - Realtime subscriptions: Handle immediate updates
 */
export const REALTIME_DATA_CACHE = {
  // Live session updates (if implementing live features in future)
  LIVE_SESSIONS: {
    staleTime: TIME.MINUTE, // 1 minute - updates via realtime
    gcTime: TIME.MINUTE * 30, // 30 minutes
  },
} as const;

/**
 * Default QueryClient Configuration
 *
 * Global defaults for all queries. Individual queries can override these.
 * These are conservative defaults that work well for most use cases.
 */
export const DEFAULT_QUERY_CONFIG = {
  queries: {
    staleTime: TIME.MINUTE * 5, // 5 minutes - balanced default
    gcTime: TIME.HOUR, // 1 hour - reasonable cache retention
    retry: 1, // Retry failed requests once
    refetchOnWindowFocus: false, // Prevent duplicate requests on focus
    refetchOnReconnect: true, // Refetch when connection restored
    refetchOnMount: false, // Prevent duplicate requests on mount
  },
  mutations: {
    retry: 0, // Don't retry mutations automatically
  },
} as const;

/**
 * Development/Production Environment Settings
 *
 * Optional: Different cache settings for development vs production.
 * Currently using same settings for both, but can be split if needed.
 */
export const ENV_CACHE_CONFIG = {
  development: {
    // Shorter cache times in dev for easier testing
    staleTime: TIME.MINUTE * 2, // 2 minutes
    gcTime: TIME.MINUTE * 30, // 30 minutes
  },
  production: {
    // Longer cache times in prod for performance
    staleTime: TIME.MINUTE * 5, // 5 minutes
    gcTime: TIME.HOUR, // 1 hour
  },
} as const;

/**
 * Cache Strategy Reference
 *
 * Quick reference for choosing cache settings:
 *
 * | Data Type          | Update Frequency | staleTime | gcTime | Example               |
 * |--------------------|------------------|-----------|--------|-----------------------|
 * | Master Data        | Rarely           | 1-24 hrs  | 1 week | Meditation types      |
 * | User Data          | Moderate         | 2-5 mins  | 1 hour | Sessions, statistics  |
 * | Real-time Data     | Frequent         | 1 min     | 30 min | Live updates          |
 * | Paginated Lists    | Varies           | 2-5 mins  | 1 hour | Session history       |
 * | Search Results     | Dynamic          | 1 min     | 30 min | Sound search          |
 *
 * Guidelines:
 * 1. If data rarely changes → MASTER_DATA_CACHE
 * 2. If data changes per user action → USER_DATA_CACHE
 * 3. If data updates in real-time → REALTIME_DATA_CACHE
 * 4. If unsure → Use DEFAULT_QUERY_CONFIG
 */

