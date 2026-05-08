// app/loading.tsx

export default function Loading() {
  return (
    <main className="min-h-screen bg-[#111010] flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <p className="font-serif text-[#E8E4DE] text-3xl tracking-[0.4em] uppercase animate-pulse">
          MERQ
        </p>

        <div className="w-12 h-px bg-[#3A3830] relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-full bg-[#7A7468] animate-[shimmer_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
    </main>
  );
}
