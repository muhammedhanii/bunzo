import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="glass-card rounded-3xl p-8 text-center">
        <h2 className="text-2xl font-bold">Page not found</h2>
        <Link href="/" className="mt-3 inline-block text-[#E50914]">
          Back to Bunzo
        </Link>
      </div>
    </div>
  );
}
