import { useEffect, useRef, useState } from 'react';

export const getRandomNumber = (min: number, max: number): number => Math.random() * (max - min) + min;

export const numberToColor = (number: number): string => '#' + ((number * 0xffffff) << 0).toString(16);

export const useRandom = (minVal: number, maxVal: number, minTime: number, maxTime: number) => {
  const [value, setValue] = useState(getRandomNumber(minVal, maxVal));
  const timeoutIdRef = useRef<number>();

  useEffect(() => {
    const tick = () => {
      clearTimeout(timeoutIdRef.current);
      const nextTick = getRandomNumber(minTime, maxTime);

      timeoutIdRef.current = window.setTimeout(() => {
        setValue(getRandomNumber(minVal, maxVal));
        tick();
      }, nextTick);
    };

    tick();

    return () => clearTimeout(timeoutIdRef.current);
  }, [minVal, maxVal, minTime, maxTime]);

  return value;
};
