// app/shop/loading.tsx

export default function ShopLoading() {
  return (
    <main className="min-h-screen bg-onyx pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header skeleton */}
        <div className="mb-10 pb-6 border-b border-[#3A3830]">
          <div className="h-4 w-20 bg-[#1E1C18] rounded mb-4 animate-pulse" />
          <div className="h-14 w-64 bg-[#1E1C18] rounded animate-pulse" />
        </div>

        {/* Filter skeleton */}
        <div className="flex gap-6 mb-10">
          {Array.from({ length: 6 }).map((_: unknown, i: number) => (
            <div
              key={i}
              className="h-3 w-16 bg-[#1E1C18] rounded animate-pulse"
            />
          ))}
        </div>

        {/* Grid skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12">
          {Array.from({ length: 8 }).map((_: unknown, i: number) => (
            <div key={i}>
              <div className="aspect-[3/4] bg-[#1E1C18] rounded animate-pulse mb-4" />
              <div className="h-4 w-3/4 bg-[#1E1C18] rounded animate-pulse mb-2" />
              <div className="h-3 w-1/4 bg-[#1E1C18] rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
