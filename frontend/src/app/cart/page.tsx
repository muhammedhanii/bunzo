"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/cart";

export default function CartPage() {
  const { items, removeItem, updateQty, total } = useCartStore();

  return (
    <section className="mx-auto max-w-5xl px-6 py-14 md:px-16">
      <h1 className="mb-8 text-4xl font-bold">Cart</h1>
      {items.length === 0 ? (
        <div className="glass-card rounded-3xl p-8 text-white/70">
          Your cart is empty. <Link href="/menu" className="text-[#E50914]">Browse menu</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <motion.div
              layout
              key={item.id}
              className="glass-card flex items-center justify-between rounded-2xl p-5"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-sm text-white/65">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => updateQty(item.id, item.quantity - 1)} className="rounded bg-white/15 px-3 py-1">-</button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button onClick={() => updateQty(item.id, item.quantity + 1)} className="rounded bg-white/15 px-3 py-1">+</button>
                <button onClick={() => removeItem(item.id)} className="ml-2 rounded bg-[#E50914] px-3 py-1 text-sm">Remove</button>
              </div>
            </motion.div>
          ))}
          <div className="glass-card mt-6 flex items-center justify-between rounded-2xl p-6">
            <p className="text-xl">Total: <span className="text-[#E50914]">${total().toFixed(2)}</span></p>
            <Link href="/checkout" className="rounded-xl bg-[#E50914] px-5 py-2 font-semibold">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
