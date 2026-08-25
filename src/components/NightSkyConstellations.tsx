import React, { useCallback, useState, useEffect } from "react";
import { useDebouncedCall } from "./CommonHooks";

// Seeded random number generator for reproducible constellations
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

interface Star {
  x: number;
  y: number;
  brightness: number;
  motion: Motion;
}

interface Motion {
  xOffsets: number[];
  yOffsets: number[];
  duration: number;
}

interface Line {
  start: Star;
  end: Star;
  opacity: number;
}

interface ConstellationData {
  stars: Star[];
  lines: Line[];
}

// Generate stars and constellation lines
function generateConstellations(
  width: number,
  height: number,
): ConstellationData {
  const stars: Star[] = [];
  const baseStarDensity = 600 / (2400 * 2400);
  const numStars = Math.max(100, Math.round(width * height * baseStarDensity));
  const motionXAmount = 48;
  const motionYAmount = 48;

  // Generate star positions and brightness
  for (let i = 0; i < numStars; i++) {
    const seed1 = i * 12.98;
    const seed2 = i * 78.233;
    const seed3 = i * 43.614;
    const motionSeed = i * 91.731;

    stars.push({
      x: seededRandom(seed1) * width,
      y: seededRandom(seed2) * height,
      brightness: 0.3 + seededRandom(seed3) * 0.7,
      motion: {
        xOffsets: [
          0,
          (seededRandom(motionSeed) - 0.5) * motionXAmount,
          (seededRandom(motionSeed + 1) - 0.5) * motionXAmount,
          (seededRandom(motionSeed + 2) - 0.5) * motionXAmount,
          0,
        ],
        yOffsets: [
          0,
          (seededRandom(motionSeed + 3) - 0.5) * motionYAmount,
          (seededRandom(motionSeed + 4) - 0.5) * motionYAmount,
          (seededRandom(motionSeed + 5) - 0.5) * motionYAmount,
          0,
        ],
        duration: 16 + seededRandom(motionSeed + 6) * 36,
      },
    });
  }

  // Create lines between nearby stars to form constellations
  const lines: Line[] = [];
  const connectionDistance = Math.max(70, Math.min(width, height) * 0.06);
  const maxConnectionsPerStar = 3; // Limit connections per star for performance
  const connectedStarIndices = new Set<number>(); // Track which stars have connections

  for (let i = 0; i < stars.length; i++) {
    let connectionCount = 0;

    for (
      let j = i + 1;
      j < stars.length && connectionCount < maxConnectionsPerStar;
      j++
    ) {
      const dx = stars[i].x - stars[j].x;
      const dy = stars[i].y - stars[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < connectionDistance) {
        const opacity = Math.max(0.4, 1 - distance / connectionDistance) * 0.9;
        lines.push({
          start: stars[i],
          end: stars[j],
          opacity,
        });
        connectedStarIndices.add(i);
        connectedStarIndices.add(j);
        connectionCount++;
      }
    }
  }

  // Prune stars without connections
  const connectedStars = stars.filter((_, idx) =>
    connectedStarIndices.has(idx),
  );

  return { stars: connectedStars, lines };
}

function animatedValues(position: number, offsets: number[]): string {
  return offsets.map((offset) => position + offset).join("; ");
}

interface NightSkyConstellationsProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function NightSkyConstellations({
  className = "",
  width,
  height,
}: NightSkyConstellationsProps) {
  console.log("Sky being rendered");
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [data, setData] = useState<ConstellationData | null>(null);
  const updateViewport = useCallback(() => {
    setViewport({
      width: window.innerWidth || 1440,
      height: window.innerHeight || 900,
    });
  }, []);
  const tryUpdateViewport = useDebouncedCall(updateViewport, [], 500, true);

  useEffect(() => {
    updateViewport();
    window.addEventListener("resize", tryUpdateViewport);

    return () => window.removeEventListener("resize", tryUpdateViewport);
  }, [tryUpdateViewport, updateViewport]);

  const viewWidth = width ?? (viewport.width || 1440);
  const viewHeight = height ?? (viewport.height || 900);

  useEffect(() => {
    setData(generateConstellations(viewWidth, viewHeight));
  }, [viewWidth, viewHeight]);

  if (!data) return null;

  return (
    <div
      className={`fixed inset-0 overflow-hidden bg-black ${className}`}
      style={{ zIndex: -1 }}
    >
      <div
        aria-hidden="true"
        className="h-full w-full"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 300% 200% at 50% 150%, rgba(255, 84, 158, 1) 0%, rgba(255, 84, 158, 0.2) 24%, rgba(255, 84, 158, 0.1) 40%, rgba(30, 13, 33, 0) 56%)",
          pointerEvents: "none",
          mixBlendMode: "screen",
        }}
      />
      <svg
        viewBox={`0 0 ${viewWidth} ${viewHeight}`}
        className="block"
        style={{
          width: "100vw",
          height: "100vh",
        }}
        preserveAspectRatio="none"
      >
        {/* Defs for glow effects */}
        <defs>
          <filter id="starGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Constellation lines - render first (background) */}
        <g opacity="1.0">
          {data.lines.map((line, idx) => (
            <line
              key={`line-${idx}`}
              x1={line.start.x}
              y1={line.start.y}
              x2={line.end.x}
              y2={line.end.y}
              stroke="rgba(255, 187, 84, 0.4)"
              strokeWidth="1.4"
              opacity={line.opacity}
              strokeLinecap="round"
            >
              <animate
                attributeName="x1"
                values={animatedValues(
                  line.start.x,
                  line.start.motion.xOffsets,
                )}
                dur={`${line.start.motion.duration}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="y1"
                values={animatedValues(
                  line.start.y,
                  line.start.motion.yOffsets,
                )}
                dur={`${line.start.motion.duration}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="x2"
                values={animatedValues(line.end.x, line.end.motion.xOffsets)}
                dur={`${line.end.motion.duration}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="y2"
                values={animatedValues(line.end.y, line.end.motion.yOffsets)}
                dur={`${line.end.motion.duration}s`}
                repeatCount="indefinite"
              />
            </line>
          ))}
        </g>

        {/* Stars - render after lines */}
        <g filter="url(#starGlow)">
          {data.stars.map((star, idx) => {
            const radius = 0.4 + star.brightness * 0.8;
            return (
              <circle
                key={`star-${idx}`}
                cx={star.x}
                cy={star.y}
                r={radius}
                fill={`rgba(255, 84, 158, ${star.brightness})`}
              >
                <animate
                  attributeName="cx"
                  values={animatedValues(star.x, star.motion.xOffsets)}
                  dur={`${star.motion.duration}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="cy"
                  values={animatedValues(star.y, star.motion.yOffsets)}
                  dur={`${star.motion.duration}s`}
                  repeatCount="indefinite"
                />
              </circle>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
