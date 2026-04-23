"use client";

import { FormEvent, useMemo, useState } from "react";

type DraftProduct = {
  name: string;
  price: string;
  imageUrl: string;
};

type ProductEntry = DraftProduct & { id: number };

export default function AdminPage() {
  const [draft, setDraft] = useState<DraftProduct>({ name: "", price: "", imageUrl: "" });
  const [products, setProducts] = useState<ProductEntry[]>([
    { id: 1, name: "Neon Truffle Stack", price: "18.90", imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80" },
  ]);

  const stats = useMemo(
    () => [
      ["Revenue", "$48,520"],
      ["Orders", "1,248"],
      ["Products", String(products.length)],
      ["Customers", "920"],
    ],
    [products.length],
  );

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!draft.name.trim() || !draft.price.trim()) return;
    setProducts((current) => [
      { id: Date.now(), ...draft, imageUrl: draft.imageUrl || "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80" },
      ...current,
    ]);
    setDraft({ name: "", price: "", imageUrl: "" });
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-14 md:px-16">
      <h1 className="mb-7 text-4xl font-bold">Admin Dashboard</h1>
      <div className="mb-8 grid gap-4 md:grid-cols-4">
        {stats.map(([label, value]) => (
          <div key={label} className="glass-card rounded-2xl p-5">
            <p className="text-sm text-white/60">{label}</p>
            <p className="mt-2 text-2xl font-bold text-[#E50914]">{value}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-card rounded-3xl p-6">
          <h2 className="mb-4 text-xl font-semibold">Manage Products</h2>
          <form className="grid gap-3" onSubmit={onSubmit}>
            <input
              placeholder="Product name"
              className="rounded-xl border border-white/20 bg-white/5 p-3"
              value={draft.name}
              onChange={(event) => setDraft((prev) => ({ ...prev, name: event.target.value }))}
            />
            <input
              placeholder="Price"
              type="number"
              min="0"
              step="0.01"
              className="rounded-xl border border-white/20 bg-white/5 p-3"
              value={draft.price}
              onChange={(event) => setDraft((prev) => ({ ...prev, price: event.target.value }))}
            />
            <input
              placeholder="Image URL"
              className="rounded-xl border border-white/20 bg-white/5 p-3"
              value={draft.imageUrl}
              onChange={(event) => setDraft((prev) => ({ ...prev, imageUrl: event.target.value }))}
            />
            <button className="rounded-xl bg-[#E50914] px-4 py-3 font-semibold">Create Product</button>
          </form>
        </div>
        <div className="glass-card rounded-3xl p-6">
          <h2 className="mb-4 text-xl font-semibold">Recent Orders</h2>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="rounded-xl bg-white/5 p-3">#BZ-1201 · $52.20 · Paid</li>
            <li className="rounded-xl bg-white/5 p-3">#BZ-1200 · $28.80 · Preparing</li>
            <li className="rounded-xl bg-white/5 p-3">#BZ-1199 · $68.40 · Delivered</li>
          </ul>
          <h3 className="mb-3 mt-6 text-lg font-semibold">Created Products</h3>
          <ul className="space-y-2 text-sm text-white/75">
            {products.map((product) => (
              <li key={product.id} className="rounded-xl bg-white/5 p-3">
                {product.name} · ${Number(product.price || 0).toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
