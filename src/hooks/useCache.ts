
import { useState, useEffect } from 'react';

interface CacheConfig {
  key: string;
  ttl?: number; // Time to live in milliseconds, defaults to 48 hours
}

export function useCache<T>(config: CacheConfig, fetcher: () => Promise<T>): {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
} {
  const { key, ttl = 48 * 60 * 60 * 1000 } = config; // Default TTL: 48 hours
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const getCachedData = (): { data: T | null; timestamp: number } | null => {
    const item = localStorage.getItem(`cache_${key}`);
    if (!item) return null;
    
    try {
      return JSON.parse(item);
    } catch (err) {
      console.error('Error parsing cached data:', err);
      return null;
    }
  };

  const setCachedData = (data: T) => {
    const cacheItem = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(`cache_${key}`, JSON.stringify(cacheItem));
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const freshData = await fetcher();
      setData(freshData);
      setCachedData(freshData);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      setLoading(false);
    }
  };

  const refresh = async () => {
    await fetchData();
  };

  useEffect(() => {
    const cached = getCachedData();
    
    if (cached && Date.now() - cached.timestamp < ttl) {
      setData(cached.data);
      setLoading(false);
    } else {
      fetchData();
    }
  }, [key]);

  return { data, loading, error, refresh };
}
