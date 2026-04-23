"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function MagneticButton({ children, onClick, className = "" }: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 240, damping: 16 });
  const springY = useSpring(y, { stiffness: 240, damping: 16 });

  return (
    <motion.button
      onClick={onClick}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={(event) => {
        const rect = (event.currentTarget as HTMLButtonElement).getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * 0.12);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.12);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}
