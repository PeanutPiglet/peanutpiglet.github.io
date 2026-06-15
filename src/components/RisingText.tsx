import { motion } from "motion/react";

interface RisingTextProps {
  text: string;
  className?: string;
  duration?: number;
  stagger?: number;
  initialY?: number;
  easing?: number[];
  as?: "div" | "h1" | "h2" | "p";
  delay?: number;
}

export default function RisingText({
  text,
  className = "",
  duration = 1.1,
  stagger = 0.03,
  initialY = 80,
  easing = [0.22, 1, 0.36, 1],
  as = "div",
  delay = 0,
}: RisingTextProps) {
  const Component = motion[as] ?? motion.div;

  return (
    <Component
      className={className}
      initial="hidden"
      animate="visible"
      aria-label={text}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          className="inline-block will-change-transform"
          initial={{ opacity: 0, y: initialY }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration,
            delay: delay + index * stagger,
            ease: easing,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </Component>
  );
}
