"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;
const CHARS = "!@#$%^&*():{};|,.<>/?";

type Props = {
  children: string;
  cyclesPerLetter?: number;
  shuffleTime?: number;
  chars?: string;
};

const ScrambleText: React.FC<Props> = ({
  children,
  cyclesPerLetter = CYCLES_PER_LETTER,
  shuffleTime = SHUFFLE_TIME,
  chars = CHARS,
}) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const TARGET_TEXT = children;

  const [text, setText] = useState(TARGET_TEXT);

  const scramble = useCallback(() => {
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = TARGET_TEXT.split("")
        .map((char, index) => {
          if (pos / cyclesPerLetter > index) {
            return char;
          }

          const randomCharIndex = Math.floor(Math.random() * chars.length);
          const randomChar = chars[randomCharIndex];

          return randomChar;
        })
        .join("");

      setText(scrambled);
      pos++;

      if (pos >= TARGET_TEXT.length * cyclesPerLetter) {
        stopScramble();
      }
    }, shuffleTime);
  }, [cyclesPerLetter, shuffleTime, chars]);

  const stopScramble = useCallback(() => {
    clearInterval(intervalRef.current as NodeJS.Timeout);
    setText(TARGET_TEXT);
  }, []);

  return (
    <motion.div
      onMouseEnter={scramble}
      onMouseLeave={stopScramble}
      className="relative overflow-hidden"
    >
      <div className="relative z-10 flex items-center gap-2">
        <span>{text}</span>
      </div>
    </motion.div>
  );
};

export default ScrambleText;
