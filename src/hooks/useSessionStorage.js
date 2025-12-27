import { useEffect, useState } from 'react';

import { SS } from '../../utils/sessionStorage';

export function useSessionStorage(key, initialValue = null) {
  const [value, setValue] = useState(() => {
    try {
      return SS.get(key);
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      if (value == null) {
        SS.remove(key);
      } else {
        SS.set(key, value);
      }
    } catch {}
  }, [key, value]);

  return [value, setValue];
}
