import { motion } from 'motion/react';

const name = "Jack Tang"

const staggerDict = new Map<number, number>([
  [0, 0], [1, 0.04], [2, 0.12], [3, 0.04], [4, 0.8], [5, 0.16], [6, 0.08], [7, 0.04], [8, 0.12]
])

export default function NameTitle() {
  return (
    <div
      className="w-full text-center text-[clamp(3rem,18vw,12rem)] leading-none tracking-[0.04em] text-white [font-family:Monument,ui-sans-serif,system-ui,sans-serif]"
      aria-label={name}
    >
      {name.split('').map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          className="inline-block will-change-transform"
          initial={{ opacity: 0, y: 1000 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 2.0,
            delay: staggerDict.get(index),
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  );
}
