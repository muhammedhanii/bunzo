export default function AdminPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14 md:px-16">
      <h1 className="mb-7 text-4xl font-bold">Admin Dashboard</h1>
      <div className="mb-8 grid gap-4 md:grid-cols-4">
        {[
          ["Revenue", "$48,520"],
          ["Orders", "1,248"],
          ["Products", "32"],
          ["Customers", "920"],
        ].map(([label, value]) => (
          <div key={label} className="glass-card rounded-2xl p-5">
            <p className="text-sm text-white/60">{label}</p>
            <p className="mt-2 text-2xl font-bold text-[#E50914]">{value}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-card rounded-3xl p-6">
          <h2 className="mb-4 text-xl font-semibold">Manage Products</h2>
          <div className="grid gap-3">
            <input placeholder="Product name" className="rounded-xl border border-white/20 bg-white/5 p-3" />
            <input placeholder="Price" className="rounded-xl border border-white/20 bg-white/5 p-3" />
            <input placeholder="Image URL" className="rounded-xl border border-white/20 bg-white/5 p-3" />
            <button className="rounded-xl bg-[#E50914] px-4 py-3 font-semibold">Create Product</button>
          </div>
        </div>
        <div className="glass-card rounded-3xl p-6">
          <h2 className="mb-4 text-xl font-semibold">Recent Orders</h2>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="rounded-xl bg-white/5 p-3">#BZ-1201 · $52.20 · Paid</li>
            <li className="rounded-xl bg-white/5 p-3">#BZ-1200 · $28.80 · Preparing</li>
            <li className="rounded-xl bg-white/5 p-3">#BZ-1199 · $68.40 · Delivered</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
