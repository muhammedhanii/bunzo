"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart";

export default function SiteHeader() {
  const count = useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b0b0bcc] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-16">
        <Link href="/" className="text-xl font-black tracking-widest">
          BUNZO
        </Link>
        <nav className="flex items-center gap-5 text-sm text-white/80">
          <Link href="/menu" className="hover:text-white">Menu</Link>
          <Link href="/checkout" className="hover:text-white">Checkout</Link>
          <Link href="/admin" className="hover:text-white">Admin</Link>
          <Link href="/cart" className="rounded-full border border-white/20 px-4 py-1.5 hover:bg-white/10">
            Cart ({count})
          </Link>
        </nav>
      </div>
    </header>
  );
}
