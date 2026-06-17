import { motion } from "motion/react";

interface BorderTracerProps {
  left?: boolean;
  right?: boolean;
  top?: boolean;
  bottom?: boolean;
  origin?: string;
  color: string;
  anim_delay: number;
  anim_duration: number;
  thickness?: string;
}

export default function BorderTracer({
  left = false,
  right = false,
  top = false,
  bottom = false,
  origin = "bottom",
  color,
  anim_delay = 0,
  anim_duration = 2,
  thickness = "1px",
}: BorderTracerProps) {
  return (
    <>
      {left ? (
        <motion.div
          className={`absolute left-0 h-full`}
          style={{
            backgroundColor: color,
            width: thickness,
            transformOrigin: origin,
          }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: anim_duration, delay: anim_delay }}
        ></motion.div>
      ) : (
        ""
      )}
      {right ? (
        <motion.div
          className={`absolute right-0 h-full`}
          style={{
            backgroundColor: color,
            width: thickness,
            transformOrigin: origin,
          }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: anim_duration, delay: anim_delay }}
        ></motion.div>
      ) : (
        ""
      )}
      {top ? (
        <motion.div
          className={`absolute top-0 w-full`}
          style={{
            backgroundColor: color,
            height: thickness,
            transformOrigin: origin,
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: anim_duration, delay: anim_delay }}
        ></motion.div>
      ) : (
        ""
      )}
      {bottom ? (
        <motion.div
          className={`absolute bottom-0 w-full`}
          style={{
            backgroundColor: color,
            height: thickness,
            transformOrigin: origin,
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: anim_duration, delay: anim_delay }}
        ></motion.div>
      ) : (
        ""
      )}
    </>
  );
}
