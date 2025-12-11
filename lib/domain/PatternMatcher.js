/**
 * Pattern Matcher for Cache Keys
 */
export class PatternMatcher {
    static convertPatternToRegex(pattern) {
        const escapedPattern = pattern
            .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
            .replace(/\*/g, '.*');
        return new RegExp(`^${escapedPattern}$`);
    }
    static matchesPattern(key, pattern) {
        const regex = this.convertPatternToRegex(pattern);
        return regex.test(key);
    }
}
//# sourceMappingURL=PatternMatcher.js.map