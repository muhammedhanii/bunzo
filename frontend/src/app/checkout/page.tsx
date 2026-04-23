"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart";

export default function CheckoutPage() {
  const { total, clear } = useCartStore();
  const [ordered, setOrdered] = useState(false);

  return (
    <section className="mx-auto max-w-4xl px-6 py-14 md:px-16">
      <h1 className="mb-8 text-4xl font-bold">Checkout</h1>
      <div className="glass-card rounded-3xl p-8">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm">
            Full Name
            <input type="text" placeholder="Full Name" className="rounded-xl border border-white/20 bg-white/5 p-3 outline-none focus:border-[#E50914]" />
          </label>
          <label className="grid gap-2 text-sm">
            Email
            <input type="email" placeholder="Email" className="rounded-xl border border-white/20 bg-white/5 p-3 outline-none focus:border-[#E50914]" />
          </label>
          <label className="grid gap-2 text-sm">
            Phone
            <input type="tel" placeholder="Phone" className="rounded-xl border border-white/20 bg-white/5 p-3 outline-none focus:border-[#E50914]" />
          </label>
          <label className="grid gap-2 text-sm">
            City
            <input type="text" placeholder="City" className="rounded-xl border border-white/20 bg-white/5 p-3 outline-none focus:border-[#E50914]" />
          </label>
        </div>
        <label className="mt-4 grid gap-2 text-sm">
          Delivery Address
          <textarea
            placeholder="Delivery Address"
            className="h-32 w-full rounded-xl border border-white/20 bg-white/5 p-3 outline-none focus:border-[#E50914]"
          />
        </label>
        <div className="mt-6 flex items-center justify-between">
          <p className="text-xl">Total <span className="text-[#E50914]">${total().toFixed(2)}</span></p>
          <button
            onClick={() => {
              clear();
              setOrdered(true);
            }}
            className="rounded-xl bg-[#E50914] px-6 py-3 font-semibold shadow-[0_0_28px_rgba(229,9,20,0.45)]"
          >
            Place Order
          </button>
        </div>
        {ordered && <p className="mt-4 text-sm text-emerald-400">Order placed successfully. Bunzo is on the way.</p>}
      </div>
    </section>
  );
}
