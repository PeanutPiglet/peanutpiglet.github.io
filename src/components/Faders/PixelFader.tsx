import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

export type PixelProgress = number | { current: number };

export interface PixelFaderKeypoint {
  progress: number;
  opacity: number;
}

interface Pixel {
  id: number;
  fadeOffset: number;
  yProgress: number;
}

interface PixelFaderProps {
  scrollProgress?: PixelProgress;
  pixelSize?: number;
  color?: string;
  className?: string;
  offsetRange?: [number, number];
  yWeight?: number;
  keypoints?: PixelFaderKeypoint[];
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const seededUnit = (seed: number) => {
  const value = Math.sin(seed) * 43758.5453;
  return value - Math.floor(value);
};

const defaultKeypoints: PixelFaderKeypoint[] = [
  { progress: 0, opacity: 1 },
  { progress: 1, opacity: 0 },
];

const getOpacityAtProgress = (
  progress: number,
  keypoints: PixelFaderKeypoint[],
) => {
  if (progress <= keypoints[0].progress) return keypoints[0].opacity;

  for (let index = 1; index < keypoints.length; index++) {
    const previous = keypoints[index - 1];
    const current = keypoints[index];

    if (progress <= current.progress) {
      const range = current.progress - previous.progress;
      const amount = range === 0 ? 1 : (progress - previous.progress) / range;
      return previous.opacity + (current.opacity - previous.opacity) * amount;
    }
  }

  return keypoints[keypoints.length - 1].opacity;
};

export default function PixelFader({
  scrollProgress = 0,
  pixelSize = 48,
  color = "currentColor",
  className = "",
  offsetRange = [0, 0.65],
  yWeight = 0,
  keypoints = defaultKeypoints,
}: PixelFaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pixels, setPixels] = useState<Pixel[]>([]);
  const resolvedKeypoints = (keypoints.length ? keypoints : defaultKeypoints)
    .map((keypoint) => ({
      progress: clamp(keypoint.progress, 0, 1),
      opacity: clamp(keypoint.opacity, 0, 1),
    }))
    .sort((first, second) => first.progress - second.progress);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateGrid = (width: number, height: number) => {
      const columns = Math.max(1, Math.ceil(width / pixelSize));
      const rows = Math.max(1, Math.ceil(height / pixelSize));
      const pixelCount = columns * rows;

      setPixels(
        Array.from({ length: pixelCount }, (_, id) => ({
          id,
          fadeOffset:
            offsetRange[0] +
            seededUnit(id * 12.9898) * (offsetRange[1] - offsetRange[0]),
          yProgress: rows === 1 ? 0 : Math.floor(id / columns) / (rows - 1),
        })),
      );
      container.style.setProperty("--pixel-columns", `${columns}`);
    };

    const observer = new ResizeObserver(([entry]) => {
      updateGrid(entry.contentRect.width, entry.contentRect.height);
    });
    observer.observe(container);

    return () => observer.disconnect();
  }, [offsetRange, pixelSize]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrame = 0;
    const shouldAnimate = typeof scrollProgress !== "number";
    const updateOpacity = () => {
      const progress = clamp(
        typeof scrollProgress === "number"
          ? scrollProgress
          : scrollProgress.current,
        0,
        1,
      );

      container.style.setProperty("--pixel-progress", `${progress}`);

      for (const pixel of container.children) {
        const fadeOffset = Number(pixel.getAttribute("data-fade-offset"));
        const yProgress = Number(pixel.getAttribute("data-y-progress"));
        const shiftedProgress = clamp(
          progress - fadeOffset + yProgress * yWeight,
          0,
          1,
        );
        const opacity = clamp(
          getOpacityAtProgress(shiftedProgress, resolvedKeypoints),
          0,
          1,
        );
        (pixel as HTMLElement).style.opacity = `${opacity}`;
      }
      if (shouldAnimate) animationFrame = requestAnimationFrame(updateOpacity);
    };

    updateOpacity();
    return () => cancelAnimationFrame(animationFrame);
  }, [resolvedKeypoints, scrollProgress, yWeight]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 grid overflow-hidden ${className}`}
      style={
        {
          gridTemplateColumns: "repeat(var(--pixel-columns), 1fr)",
          gridAutoRows: `${pixelSize}px`,
          color,
        } as CSSProperties
      }
    >
      {pixels.map((pixel) => (
        <span
          key={pixel.id}
          data-fade-offset={pixel.fadeOffset}
          data-y-progress={pixel.yProgress}
          className="bg-current"
        />
      ))}
    </div>
  );
}
