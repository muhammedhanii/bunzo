"use client";

import dynamic from "next/dynamic";
import { motion, useMotionTemplate, useMotionValue, animate } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import MagneticButton from "@/components/magnetic-button";

const BurgerHero = dynamic(() => import("@/components/burger-hero"), { ssr: false });

export default function Hero() {
  const red = useMotionValue(229);
  const blue = useMotionValue(10);

  useEffect(() => {
    const redAnimation = animate(red, 150, { duration: 5, repeat: Infinity, repeatType: "mirror" });
    const blueAnimation = animate(blue, 80, { duration: 5, repeat: Infinity, repeatType: "mirror" });
    return () => {
      redAnimation.stop();
      blueAnimation.stop();
    };
  }, [red, blue]);

  const gradient = useMotionTemplate`radial-gradient(circle at 30% 20%, rgba(${red}, 9, 20, 0.35), transparent 42%), radial-gradient(circle at 70% 80%, rgba(10, 31, ${blue}, 0.42), transparent 44%)`;

  return (
    <section className="relative min-h-screen overflow-hidden px-6 pt-10 md:px-16">
      <motion.div className="absolute inset-0 -z-10" style={{ background: gradient }} />
      <div className="grid min-h-[90vh] grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <p className="inline-flex rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/80 backdrop-blur-xl">
            Futuristic Premium Fast Food
          </p>
          <h1 className="text-5xl font-black leading-[1.05] md:text-7xl">
            BUNZO <span className="text-[#E50914] drop-shadow-[0_0_14px_rgba(229,9,20,0.7)]">BURGER</span>
          </h1>
          <p className="max-w-xl text-lg text-white/75 md:text-xl">
            An immersive burger experience crafted with cinematic flavor, neon aesthetics, and precision-engineered taste.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/menu">
              <MagneticButton className="rounded-full bg-[#E50914] px-8 py-3 font-semibold text-white shadow-[0_0_35px_rgba(229,9,20,0.55)] transition hover:brightness-110">
                Order Now
              </MagneticButton>
            </Link>
            <Link href="#menu-preview">
              <MagneticButton className="rounded-full border border-white/30 bg-white/5 px-8 py-3 font-semibold text-white backdrop-blur-xl transition hover:bg-white/10">
                Explore Menu
              </MagneticButton>
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="glass-card h-[56vh] min-h-[420px] overflow-hidden rounded-[2rem]"
        >
          <BurgerHero />
        </motion.div>
      </div>
    </section>
  );
}
