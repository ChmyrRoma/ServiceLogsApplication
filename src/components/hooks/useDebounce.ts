import { useEffect, useRef, useState } from 'react';

export const useDebounce = <T>(value: T, delay = 500, callback?: () => void) => {
  const [debouncedValue, setDebouncedValue] = useState<string | T>('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setDebouncedValue(value);
      if (callback) {
        callback();
      }
    }, delay);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [value, delay]);

  return debouncedValue;
};
