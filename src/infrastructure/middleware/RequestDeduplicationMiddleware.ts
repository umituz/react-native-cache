/**
 * Request Deduplication Middleware
 *
 * Prevents duplicate network requests by tracking active requests
 * and returning the same promise for identical requests.
 */

interface PendingRequest {
  promise: Promise<unknown>;
  timestamp: number;
}

class RequestDeduplicationMiddleware {
  private pendingRequests = new Map<string, PendingRequest>();
  private readonly REQUEST_TIMEOUT = 30000; // 30 seconds

  /**
   * Generate a unique key for the request
   */
  private generateRequestKey(
    url: string,
    method: string,
    body?: unknown
  ): string {
    const bodyString = body ? JSON.stringify(body) : '';
    return `${method}:${url}:${bodyString}`;
  }

  /**
   * Check if request is already pending
   */
  private isRequestPending(key: string): boolean {
    const pending = this.pendingRequests.get(key);
    if (!pending) return false;

    // Check if request has timed out
    if (Date.now() - pending.timestamp > this.REQUEST_TIMEOUT) {
      this.pendingRequests.delete(key);
      return false;
    }

    return true;
  }

  /**
   * Get pending request promise
   */
  private getPendingRequest(key: string): Promise<unknown> | null {
    const pending = this.pendingRequests.get(key);
    return pending ? pending.promise : null;
  }

  /**
   * Add request to pending list
   */
  private addPendingRequest(key: string, promise: Promise<unknown>): void {
    this.pendingRequests.set(key, {
      promise,
      timestamp: Date.now(),
    });

    // Clean up when promise resolves/rejects
    promise.finally(() => {
      this.pendingRequests.delete(key);
    });
  }

  /**
   * Deduplicate a request
   */
  async deduplicate<T>(
    url: string,
    method: string,
    requestFn: () => Promise<T>,
    body?: unknown
  ): Promise<T> {
    const key = this.generateRequestKey(url, method, body);

    // Check if request is already pending
    if (this.isRequestPending(key)) {
      const pendingPromise = this.getPendingRequest(key);
      if (pendingPromise) {
        return pendingPromise as Promise<T>;
      }
    }

    // Create new request
    const promise = requestFn();
    this.addPendingRequest(key, promise);

    return promise;
  }

  /**
   * Clear all pending requests
   */
  clear(): void {
    this.pendingRequests.clear();
  }

  /**
   * Get pending requests count (for debugging)
   */
  getPendingCount(): number {
    return this.pendingRequests.size;
  }
}

export const requestDeduplicationMiddleware =
  new RequestDeduplicationMiddleware();

