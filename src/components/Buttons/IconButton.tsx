import { motion } from "motion/react";

export default function IconButton({
  href,
  icon,
  viewSize,
  label,
  external,
  collapsed,
  justifyRight,
}: {
  href: string;
  icon: string;
  viewSize: string;
  label: string;
  external: boolean;
  collapsed: boolean;
  justifyRight: boolean;
}) {
  return (
    <motion.a
      key={label}
      layout
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      aria-label={label}
      title={label}
      className={
        collapsed
          ? "flex aspect-square w-10 p-1 items-center justify-center border border-white/30 text-sm transition-colors hover:border-[#ff549e] hover:text-[#ff549e]"
          : "flex w-full max-w-md items-center gap-2 border border-white/30 px-4 py-2 transition-colors hover:border-[#ff549e]"
      }
      style={{ justifyContent: justifyRight ? "flex-end" : "flex-start" }}
    >
      {justifyRight ? (
        <>
          <motion.span
            initial={false}
            animate={{
              opacity: collapsed ? 0 : 1,
              width: collapsed ? 0 : "auto",
            }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden whitespace-nowrap font-[monument] text-3xl"
          >
            {label}
          </motion.span>
          <span aria-hidden="true" className="flex justify-center w-12">
            <svg
              width="100%"
              height="100%"
              data-name="Layer 2"
              viewBox={viewSize}
            >
              <path
                d={icon}
                style={{
                  fill: "none",
                  stroke: "#ffffff",
                  vectorEffect: "non-scaling-stroke",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  fillRule: "evenodd",
                }}
              />
            </svg>
          </span>
        </>
      ) : (
        <>
          <span aria-hidden="true" className="flex justify-center w-12">
            <svg
              width="100%"
              height="100%"
              data-name="Layer 2"
              viewBox={viewSize}
            >
              <path
                d={icon}
                style={{
                  fill: "none",
                  stroke: "#ffffff",
                  vectorEffect: "non-scaling-stroke",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  fillRule: "evenodd",
                }}
              />
            </svg>
          </span>
          <motion.span
            initial={false}
            animate={{
              opacity: collapsed ? 0 : 1,
              width: collapsed ? 0 : "auto",
            }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden whitespace-nowrap font-[monument] text-3xl"
          >
            {label}
          </motion.span>
        </>
      )}
    </motion.a>
  );
}
