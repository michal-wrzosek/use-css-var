import { nanoid } from 'nanoid';
import { useEffect, useRef, useState } from 'react';
import { removeVar, setVar } from './vars';

export const useCssVar = (value: string): string => {
  const [id] = useState(nanoid(8));
  const isRegisteredRef = useRef(false);
  const isMountedRef = useRef(false);

  useEffect(() => {
    if (isMountedRef.current) {
      setVar(id, value);
    } else {
      isMountedRef.current = true;
    }
  }, [id, value]);

  useEffect(() => {
    return (): void => removeVar(id);
  }, [id]);

  if (!isRegisteredRef.current) {
    isRegisteredRef.current = true;
    setVar(id, value);
  }

  return id;
};
