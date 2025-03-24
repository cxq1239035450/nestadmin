// app.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis'
@Injectable()
export class RedisService {
  constructor(@InjectRedis() private readonly redis: Redis) {}
  
  // 设置键值
  async set(key: string, value: string): Promise<boolean> {
    try {
      await this.redis.set(key, value);
      return true;
    } catch (error) {
      console.error('Redis 设置键值对失败:', error);
      return false;
    }
  }
  // 获取键值
  async get(key: string): Promise<string | null> {
    try {
      return await this.redis.get(key);
    } catch (error) {
      console.error('Redis 获取键值对失败:', error);
      return null;
    }
  }
  // 删除键
  async del(key: string): Promise<boolean> {
    try {
      const result = await this.redis.del(key);
      return result > 0;
    } catch (error) {
      console.error('Redis 删除键失败:', error);
      return false;
    }
  }
  // 设置过期时间
  async expire(key: string, seconds: number): Promise<boolean> {
    try {
      const result = await this.redis.expire(key, seconds);
      return result === 1;
    } catch (error) {
      console.error('Redis 设置过期时间失败:', error);
      return false;
    }
  }
}

