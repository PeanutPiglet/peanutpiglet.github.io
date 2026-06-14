import { motion } from 'motion/react';

const name = 'JACK TANG';

const delayDict: Map<number, number> = new Map([
    [0, 0], [1, 0.04], [2, 0.04], [3, 0.08], [4, 0.12], [5, 0.16], [6, 0.04], [7, 0.12], [8, 0.16]
]);


export default function NameTitle() {
  return (
    <motion.div
      className="w-full text-center text-[clamp(3rem,18vw,12rem)] leading-none tracking-[0.04em] text-white [font-family:Monument,ui-sans-serif,system-ui,sans-serif]"
      initial="hidden"
      animate="visible"
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
            delay: delayDict.get(index) ,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  );
}
