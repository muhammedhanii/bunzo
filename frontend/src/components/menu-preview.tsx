"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { products } from "@/lib/data";

export default function MenuPreview() {
  return (
    <section id="menu-preview" className="mx-auto max-w-7xl px-6 py-20 md:px-16">
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-white/60">Signature Selection</p>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">Bunzo Menu Highlights</h2>
        </div>
        <Link href="/menu" className="text-sm text-[#E50914] hover:underline">
          View Full Menu
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {products
          .filter((item) => item.featured)
          .map((product, index) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="group glass-card overflow-hidden rounded-3xl"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-5">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <span className="text-[#E50914]">${product.price.toFixed(2)}</span>
                </div>
                <p className="text-sm text-white/70">{product.description}</p>
              </div>
            </motion.article>
          ))}
      </div>
    </section>
  );
}
