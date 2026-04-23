"use client";

import { FormEvent, useMemo, useState } from "react";
import { useCartStore } from "@/store/cart";

export default function CheckoutPage() {
  const { items, total, clear } = useCartStore();
  const [ordered, setOrdered] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cartIsEmpty = useMemo(() => items.length === 0, [items.length]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (cartIsEmpty) {
      setError("Your cart is empty. Add items before checkout.");
      return;
    }

    const form = new FormData(event.currentTarget);
    const required = ["fullName", "email", "phone", "city", "address"];
    const missing = required.some((name) => !String(form.get(name) ?? "").trim());

    if (missing) {
      setError("Please complete all required checkout fields.");
      return;
    }

    setError(null);
    clear();
    setOrdered(true);
    event.currentTarget.reset();
  };

  return (
    <section className="mx-auto max-w-4xl px-6 py-14 md:px-16">
      <h1 className="mb-8 text-4xl font-bold">Checkout</h1>
      <form className="glass-card rounded-3xl p-8" onSubmit={onSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm">
            Full Name
            <input
              name="fullName"
              type="text"
              required
              placeholder="Full Name"
              className="rounded-xl border border-white/20 bg-white/5 p-3 outline-none focus:border-[#E50914]"
            />
          </label>
          <label className="grid gap-2 text-sm">
            Email
            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              className="rounded-xl border border-white/20 bg-white/5 p-3 outline-none focus:border-[#E50914]"
            />
          </label>
          <label className="grid gap-2 text-sm">
            Phone
            <input
              name="phone"
              type="tel"
              required
              placeholder="Phone"
              className="rounded-xl border border-white/20 bg-white/5 p-3 outline-none focus:border-[#E50914]"
            />
          </label>
          <label className="grid gap-2 text-sm">
            City
            <input
              name="city"
              type="text"
              required
              placeholder="City"
              className="rounded-xl border border-white/20 bg-white/5 p-3 outline-none focus:border-[#E50914]"
            />
          </label>
        </div>
        <label className="mt-4 grid gap-2 text-sm">
          Delivery Address
          <textarea
            name="address"
            required
            placeholder="Delivery Address"
            className="h-32 w-full rounded-xl border border-white/20 bg-white/5 p-3 outline-none focus:border-[#E50914]"
          />
        </label>
        <div className="mt-6 flex items-center justify-between">
          <p className="text-xl">Total <span className="text-[#E50914]">${total().toFixed(2)}</span></p>
          <button
            type="submit"
            disabled={cartIsEmpty}
            className="rounded-xl bg-[#E50914] px-6 py-3 font-semibold shadow-[0_0_28px_rgba(229,9,20,0.45)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Place Order
          </button>
        </div>
        {error && <p className="mt-4 text-sm text-amber-400">{error}</p>}
        {ordered && <p className="mt-4 text-sm text-emerald-400">Order placed successfully. Bunzo is on the way.</p>}
      </form>
    </section>
  );
}
