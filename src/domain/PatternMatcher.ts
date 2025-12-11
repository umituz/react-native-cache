/**
 * Pattern Matcher for Cache Keys
 */

export class PatternMatcher {
  static convertPatternToRegex(pattern: string): RegExp {
    const escapedPattern = pattern
      .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
      .replace(/\*/g, '.*');
    return new RegExp(`^${escapedPattern}$`);
  }

  static matchesPattern(key: string, pattern: string): boolean {
    const regex = this.convertPatternToRegex(pattern);
    return regex.test(key);
  }
}