import { SetStateAction, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';

export const useUrlParam = <T>(name: string) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlParam = useMemo(() => {
    const param = searchParams.get(name);

    if (!param) return undefined;

    try {
      return JSON.parse(param) as T;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }, [name, searchParams]);

  const setUrlParam = useCallback(
    (setter: SetStateAction<T | undefined>) => {
      setSearchParams(
        (prev) => {
          let oldValue;
          try {
            oldValue = JSON.parse(prev.get(name) || '{}');
          } catch (e) {
            console.error(e);
          }

          const newValue =
            typeof setter === 'function'
              ? (setter as (prevState: T | undefined) => T | undefined)(
                  oldValue,
                )
              : setter;

          if (newValue !== undefined) {
            prev.set(name, JSON.stringify(newValue));
          } else {
            prev.delete(name);
          }

          return prev;
        },
        { replace: true },
      );
    },
    [name, setSearchParams],
  );

  return [urlParam, setUrlParam] as const;
};
