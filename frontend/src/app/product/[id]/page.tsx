"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { products } from "@/lib/data";
import { useCartStore } from "@/store/cart";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const product = useMemo(() => products.find((item) => item.id === Number(id)), [id]);
  const addItem = useCartStore((state) => state.addItem);
  const [zoomed, setZoomed] = useState(false);

  if (!product) return <div className="px-6 py-20 md:px-16">Product not found.</div>;

  return (
    <section className="mx-auto grid max-w-6xl gap-8 px-6 py-14 md:grid-cols-2 md:px-16">
      <motion.div
        whileHover={{ scale: 1.02 }}
        onClick={() => setZoomed((value) => !value)}
        className="glass-card relative h-[440px] cursor-zoom-in overflow-hidden rounded-3xl"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={`object-cover transition duration-500 ${zoomed ? "scale-125" : "scale-100"}`}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </motion.div>
      <div className="glass-card rounded-3xl p-7">
        <h1 className="text-4xl font-bold">{product.name}</h1>
        <p className="mt-4 text-white/75">{product.description}</p>
        <p className="mt-6 text-3xl text-[#E50914]">${product.price.toFixed(2)}</p>
        <button
          onClick={() => addItem(product)}
          className="mt-6 rounded-xl bg-[#E50914] px-5 py-3 font-semibold shadow-[0_0_30px_rgba(229,9,20,0.45)]"
        >
          Add to Cart
        </button>
        <div className="mt-8 border-t border-white/15 pt-6">
          <h2 className="text-lg font-semibold">Reviews</h2>
          <div className="mt-3 space-y-3 text-sm text-white/75">
            <p>★★★★★ “Wildly premium taste and presentation.”</p>
            <p>★★★★★ “Best burger UX and best burger. Unreal.”</p>
            <p>★★★★☆ “Perfect textures and deep flavor layers.”</p>
          </div>
        </div>
      </div>
    </section>
  );
}
