# @umituz/react-native-cache

TanStack Query cache management and configuration for React Native apps with centralized cache strategies.

## Features

- 🎯 **Centralized Cache Configuration**: Single source of truth for all cache settings
- ⏱️ **Time Constants**: Readable time constants (SECOND, MINUTE, HOUR, DAY, WEEK)
- 📊 **Cache Categories**: Master data, user data, and real-time data cache presets
- 🔄 **QueryClient Singleton**: Global QueryClient instance for cache invalidation
- 🛡️ **Request Deduplication**: Middleware to prevent duplicate network requests
- 🎨 **Environment Config**: Different cache settings for development and production

## Installation

```bash
npm install @umituz/react-native-cache
```

## Peer Dependencies

This package requires the following peer dependencies:

```bash
npm install @tanstack/react-query
```

## Usage

### Basic Setup

```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DEFAULT_QUERY_CONFIG, setQueryClient } from '@umituz/react-native-cache';

// Create QueryClient with default config
const queryClient = new QueryClient(DEFAULT_QUERY_CONFIG);

// Set global instance for use outside React components
setQueryClient(queryClient);

// Wrap your app
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Your app */}
    </QueryClientProvider>
  );
}
```

### Using Cache Presets

```typescript
import { useQuery } from '@tanstack/react-query';
import { MASTER_DATA_CACHE, USER_DATA_CACHE } from '@umituz/react-native-cache';

// Master data (rarely changes)
const { data: meditationTypes } = useQuery({
  queryKey: ['meditation-types'],
  queryFn: fetchMeditationTypes,
  ...MASTER_DATA_CACHE.MEDITATION_TYPES,
});

// User data (moderate changes)
const { data: sessions } = useQuery({
  queryKey: ['sessions'],
  queryFn: fetchSessions,
  ...USER_DATA_CACHE.SESSIONS,
});
```

### Using QueryClient Outside React Components

```typescript
import { getQueryClient } from '@umituz/react-native-cache';

// In a service or utility function
async function invalidateSessions() {
  const queryClient = getQueryClient();
  await queryClient.invalidateQueries({ queryKey: ['sessions'] });
}
```

### Request Deduplication

```typescript
import { requestDeduplicationMiddleware } from '@umituz/react-native-cache';

// Prevent duplicate requests
const data = await requestDeduplicationMiddleware.deduplicate(
  '/api/users',
  'GET',
  () => fetch('/api/users').then(res => res.json())
);
```

### Time Constants

```typescript
import { TIME } from '@umituz/react-native-cache';

const customCache = {
  staleTime: TIME.MINUTE * 10, // 10 minutes
  gcTime: TIME.HOUR * 2, // 2 hours
};
```

## API Reference

### Cache Configuration

- `TIME`: Time constants (SECOND, MINUTE, HOUR, DAY, WEEK)
- `MASTER_DATA_CACHE`: Cache settings for rarely changing data
- `USER_DATA_CACHE`: Cache settings for user-specific data
- `REALTIME_DATA_CACHE`: Cache settings for real-time data
- `DEFAULT_QUERY_CONFIG`: Default QueryClient configuration
- `ENV_CACHE_CONFIG`: Environment-specific cache settings

### QueryClient Singleton

- `getQueryClient()`: Get global QueryClient instance
- `setQueryClient(client)`: Set global QueryClient instance
- `hasQueryClient()`: Check if QueryClient is initialized

### Middleware

- `requestDeduplicationMiddleware`: Request deduplication middleware

## Cache Strategy Guide

| Data Type          | Update Frequency | Cache Preset | Example               |
|--------------------|------------------|--------------|-----------------------|
| Master Data        | Rarely           | `MASTER_DATA_CACHE` | Meditation types      |
| User Data          | Moderate         | `USER_DATA_CACHE` | Sessions, statistics  |
| Real-time Data     | Frequent         | `REALTIME_DATA_CACHE` | Live updates          |

## License

MIT

## Author

Ümit UZ <umit@umituz.com>

