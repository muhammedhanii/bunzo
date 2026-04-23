"use client";

import { motion, useMotionValue } from "framer-motion";
import { useEffect } from "react";

export default function CursorGlow() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      x.set(event.clientX - 150);
      y.set(event.clientY - 150);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(229,9,20,0.35)_0%,rgba(10,31,68,0.06)_50%,transparent_72%)] blur-2xl"
      style={{ x, y }}
    />
  );
}
