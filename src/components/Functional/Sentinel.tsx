import { useEffect, useRef } from "react";

export interface SentinelProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Element that acts as the scroll viewport.
   * null means the browser viewport.
   */
  root?: Element | null;

  /**
   * Ref to the element that acts as the scroll viewport.
   * Use this when the root is assigned through React's ref lifecycle.
   */
  rootRef?: React.RefObject<Element | null>;

  /**
   * How much of the detector must be visible before
   * `isIntersecting` becomes true.
   *
   * 0 = any amount
   * 1 = completely visible
   */
  threshold?: number | number[];

  /**
   * Expands/shrinks the root's effective intersection area.
   * Useful for moving the trigger point.
   */
  rootMargin?: string;

  /**
   * Called whenever the intersection state changes.
   */
  onIntersect?: (
    isIntersecting: boolean,
    entry: IntersectionObserverEntry,
  ) => void;

  /**
   * Called when the detector enters the root.
   */
  onEnter?: (entry: IntersectionObserverEntry) => void;

  /**
   * Called when the detector leaves the root.
   */
  onLeave?: (entry: IntersectionObserverEntry) => void;

  /**
   * Stop observing after the first intersection.
   */
  once?: boolean;
}

export default function SentinelDetector({
  root = null,
  rootRef,
  threshold = 0,
  rootMargin = "0px",
  onIntersect,
  onEnter,
  onLeave,
  once = false,
  ...divProps
}: SentinelProps) {
  const detectorRef = useRef<HTMLDivElement>(null);
  const onIntersectRef = useRef(onIntersect);
  const onEnterRef = useRef(onEnter);
  const onLeaveRef = useRef(onLeave);

  onIntersectRef.current = onIntersect;
  onEnterRef.current = onEnter;
  onLeaveRef.current = onLeave;

  useEffect(() => {
    const element = detectorRef.current;
    const observerRoot = rootRef?.current ?? root;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;

        onIntersectRef.current?.(isIntersecting, entry);

        if (isIntersecting) {
          onEnterRef.current?.(entry);

          if (once) {
            observer.unobserve(element);
          }
        } else {
          onLeaveRef.current?.(entry);
        }
      },
      {
        root: observerRoot,
        threshold,
        rootMargin,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [root, rootRef, threshold, rootMargin, once]);

  return <div ref={detectorRef} aria-hidden="true" {...divProps} />;
}
