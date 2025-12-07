import { redis } from "../config/redis.js";

class CacheService {
  constructor() {
    this.defaultTTL = 3600;
  }

  async get(key) {
    try {
      const value = await redis.get(key);

      if (value) {
        console.log(`✓ Cache hit: ${key}`);
      } else {
        console.log(`✗ Cache miss: ${key}`);
      }

      return value;
    } catch (error) {
      console.error("Cache get error:", error.message);
      return null;
    }
  }

  async set(key, value, ttl = this.defaultTTL) {
    try {
      await redis.set(key, value);
      await redis.expire(key, ttl);
      console.log(`✓ Cached: ${key} (TTL: ${ttl}s)`);
      return true;
    } catch (error) {
      console.error("Cache set error:", error.message);
      // Don't throw - app should work without cache
      return false;
    }
  }
}

export default new CacheService();
