import { useCallback, useEffect, useRef } from "react";

export function useDebouncedCall(
  func: (...args: any[]) => void,
  args: Array<any>,
  threshold: number = 1000,
  catchup: boolean = true,
) {
  const lastCall = useRef(0);
  const needsCatchup = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const funcRef = useRef(func);
  const argsRef = useRef(args);

  funcRef.current = func;
  argsRef.current = args;

  const invoke = useCallback(() => {
    lastCall.current = Date.now();
    funcRef.current(...argsRef.current);
  }, []);

  const scheduleCatchup = useCallback(() => {
    timer.current = setTimeout(() => {
      timer.current = null;

      if (!needsCatchup.current) return;

      needsCatchup.current = false;
      if (catchup) invoke();

      // Keep this loop iterative so continuous calls never grow the call stack.
      if (catchup) scheduleCatchup();
    }, threshold);
  }, [catchup, invoke, threshold]);

  const debounced = useCallback(() => {
    if (Date.now() - lastCall.current < threshold) {
      needsCatchup.current = true;
      return;
    }
    invoke();
    if (catchup && timer.current === null) scheduleCatchup();
  }, [catchup, invoke, scheduleCatchup, threshold]);

  useEffect(() => {
    return () => {
      if (timer.current !== null) clearTimeout(timer.current);
    };
  }, []);

  return debounced;
}
