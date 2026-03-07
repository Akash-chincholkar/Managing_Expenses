"use client";

import { cn } from "@/lib/utils";
import type { HTMLMotionProps, Variants } from "motion/react";
import { motion, useAnimation, useReducedMotion } from "motion/react";
import { forwardRef, useEffect, useImperativeHandle } from "react";

export interface AudioLinesIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface AudioLinesIconProps extends HTMLMotionProps<"div"> {
  size?: number;
  duration?: number;
  isAnimated?: boolean;
}

const AudioLinesIcon = forwardRef<AudioLinesIconHandle, AudioLinesIconProps>(
  (
    {
      className,
      size = 24,
      duration = 1, // Controls the speed of one wave cycle
      isAnimated = true,
      ...props
    },
    ref
  ) => {
    const controls = useAnimation();
    const reduced = useReducedMotion();

    // Expose manual controls if needed, but useEffect handles the auto-start
    useImperativeHandle(ref, () => ({
      startAnimation: () =>
        reduced ? controls.start("normal") : controls.start("animate"),
      stopAnimation: () => controls.start("normal"),
    }));

    // Automatically start animation when component mounts or isAnimated changes
    useEffect(() => {
      if (isAnimated && !reduced) {
        controls.start("animate");
      } else {
        controls.start("normal");
      }
    }, [isAnimated, reduced, controls]);

    const barVariants: Variants = {
      normal: { scaleY: 1, opacity: 1 },
      animate: (i: number) => ({
        // Cycle: Start normal -> grow tall -> shrink short -> back to normal
        scaleY: [1, 1.5, 0.5, 1], 
        opacity: [1, 0.8, 1],
        transition: {
          duration: duration,
          repeat: Infinity, // <--- This makes it loop forever
          repeatType: "loop", 
          delay: i * 0.15, // Stagger effect for the "wave" look
          ease: "easeInOut",
        },
      }),
    };

    const paths = [
      "M2 10v3",
      "M6 6v11",
      "M10 3v18",
      "M14 8v7",
      "M18 5v13",
      "M22 10v3",
    ];

    return (
      <motion.div
        className={cn("inline-flex items-center justify-center", className)}
        {...props}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={controls} // Controlled by the useEffect above
          initial="normal"
        >
          {paths.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              variants={barVariants}
              custom={i}
              style={{ originY: 0.5 }} // Ensures bars grow from the center
            />
          ))}
        </motion.svg>
      </motion.div>
    );
  }
);

AudioLinesIcon.displayName = "AudioLinesIcon";
export { AudioLinesIcon };
