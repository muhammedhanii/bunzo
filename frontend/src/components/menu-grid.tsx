"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { categories, products } from "@/lib/data";
import { useCartStore } from "@/store/cart";

export default function MenuGrid() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("all");
  const [flyId, setFlyId] = useState<number | null>(null);
  const addItem = useCartStore((state) => state.addItem);

  const filtered = useMemo(
    () => (activeCategory === "all" ? products : products.filter((item) => item.category === activeCategory)),
    [activeCategory],
  );

  return (
    <section className="mx-auto max-w-7xl px-6 py-14 md:px-16">
      <h1 className="mb-5 text-4xl font-bold">Menu</h1>
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            className={`rounded-full px-4 py-2 text-sm capitalize transition ${
              activeCategory === category
                ? "bg-[#E50914] text-white shadow-[0_0_24px_rgba(229,9,20,0.5)]"
                : "bg-white/10 text-white/70 hover:bg-white/15"
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <motion.article
            key={product.id}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group glass-card relative overflow-hidden rounded-3xl"
          >
            <Link href={`/product/${product.id}`} className="block">
              <div className="relative h-52">
                <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
            </Link>
            <div className="space-y-3 p-5">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-[#E50914]">${product.price.toFixed(2)}</p>
              </div>
              <p className="text-sm text-white/70">{product.description}</p>
              <button
                onClick={() => {
                  addItem(product);
                  setFlyId(product.id);
                  setTimeout(() => setFlyId(null), 550);
                }}
                className="w-full rounded-xl bg-[#E50914] px-4 py-2 text-sm font-semibold shadow-[0_0_24px_rgba(229,9,20,0.4)] hover:brightness-110"
              >
                Add to Cart
              </button>
              {flyId === product.id && (
                <motion.span
                  initial={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                  animate={{ opacity: 0, y: -120, x: 160, scale: 0.3 }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  className="pointer-events-none absolute right-8 top-8 rounded-full bg-[#E50914] px-2 py-1 text-xs"
                >
                  +1
                </motion.span>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
