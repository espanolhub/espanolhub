// نظام caching بسيط للألعاب
// Simple caching system for games

interface CacheItem {
  data: any;
  timestamp: number;
  expiry: number; // milliseconds
}

class GameCache {
  private cache = new Map<string, CacheItem>();
  
  // إضافة بيانات إلى الـ cache
  set(key: string, data: any, ttlMinutes: number = 30): void {
    const expiry = Date.now() + (ttlMinutes * 60 * 1000);
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiry
    });
  }
  
  // جلب البيانات من الـ cache
  get(key: string): any | null {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }
    
    // التحقق من انتهاء صلاحية الـ cache
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data;
  }
  
  // التحقق إذا كانت البيانات موجودة وصالحة
  has(key: string): boolean {
    return this.get(key) !== null;
  }
  
  // حذف عنصر معين من الـ cache
  delete(key: string): boolean {
    return this.cache.delete(key);
  }
  
  // تفريغ الـ cache بالكامل
  clear(): void {
    this.cache.clear();
  }
  
  // حذف البيانات المنتهية الصلاحية
  cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiry) {
        this.cache.delete(key);
      }
    }
  }
  
  // الحصول على حجم الـ cache
  size(): number {
    return this.cache.size;
  }
  
  // طباعة معلومات الـ cache (للتصحيح)
  debug(): void {
    console.log('Cache Debug Info:');
    console.log('Size:', this.cache.size);
    for (const [key, item] of this.cache.entries()) {
      const remainingTime = Math.max(0, item.expiry - Date.now());
      console.log(`${key}: ${remainingTime}ms remaining`);
    }
  }
}

// إنشاء نسخة واحدة من الـ cache (Singleton pattern)
export const gameCache = new GameCache();

// دالة مساعدة للـ fetch مع caching
export async function cachedFetch(
  url: string, 
  options: RequestInit = {}, 
  ttlMinutes: number = 30
): Promise<Response> {
  const cacheKey = `${url}:${JSON.stringify(options)}`;
  
  // محاولة جلب البيانات من الـ cache أولاً
  const cachedData = gameCache.get(cacheKey);
  if (cachedData) {
    console.log(`🎯 Cache HIT for: ${url}`);
    return new Response(JSON.stringify(cachedData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  // إذا لم تكن البيانات في الـ cache، قم بجلبها من الـ API
  console.log(`🌐 Cache MISS for: ${url}`);
  const response = await fetch(url, options);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();
  
  // تخزين البيانات في الـ cache
  gameCache.set(cacheKey, data, ttlMinutes);
  
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

// تنظيف الـ cache تلقائياً كل 5 دقائق
if (typeof window !== 'undefined') {
  setInterval(() => {
    gameCache.cleanup();
  }, 5 * 60 * 1000);
}
