import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-onyx flex items-center justify-center px-6 md:px-12 overflow-hidden">
      {/* Monumental background watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-[#151413] text-[55vw] md:text-[38vw] font-sans font-medium leading-none tracking-tighter">
          404
        </span>
      </div>

      <div className="relative z-10 w-full max-w-xl">
        {/* Section label with rule */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-8 h-px bg-[#2A2824]" />
          <p className="text-[#3A3830] text-[10px] tracking-[0.4em] uppercase font-medium">
            404 — Not Found
          </p>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-[#E8E4DE] text-5xl md:text-6xl leading-[1.1] mb-8">
          Nothing here.
        </h1>

        {/* Body */}
        <p className="text-[#7A7468] text-sm leading-relaxed mb-12 max-w-sm">
          The page you are looking for does not exist or has been moved to a
          different location.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <Link
            href="/shop"
            className="text-[11px] tracking-[0.3em] uppercase text-onyx bg-[#E8E4DE] px-10 py-3.5 hover:bg-white transition-colors duration-300"
          >
            Browse the collection
          </Link>

          <Link
            href="/"
            className="text-[11px] tracking-[0.3em] uppercase text-[#7A7468] border border-[#2A2824] px-10 py-3.5 hover:border-[#7A7468] hover:text-[#E8E4DE] transition-colors duration-300"
          >
            Go home
          </Link>
        </div>
      </div>

      {/* Footer mark */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-5">
        <div className="w-16 h-px bg-[#1E1C18]" />
        <p className="text-[#1E1C18] text-[10px] tracking-[0.5em] uppercase">
          MERQ
        </p>
        <div className="w-16 h-px bg-[#1E1C18]" />
      </div>
    </main>
  );
}
