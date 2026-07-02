// components/shop/ReviewList.tsx

type Review = {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: Date;
  adminReply: string | null;
  hidden: boolean;
  user: { name: string | null };
};

type Props = {
  reviews: Review[];
};

function StarDisplay({ rating }: { rating: number }) {
  return (
    <span className="text-sm tracking-wider">
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          className={s <= rating ? "text-[#D4A853]" : "text-[#3A3830]"}
        >
          ★
        </span>
      ))}
    </span>
  );
}

export default function ReviewList({ reviews }: Props) {
  if (reviews.length === 0) {
    return (
      <p className="text-[11px] tracking-[0.2em] uppercase text-[#3A3830]">
        No reviews yet.
      </p>
    );
  }

  const average =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <div className="space-y-8">
      {/* Average */}
      <div className="flex items-baseline gap-4">
        <span className="font-serif text-[#E8E4DE] text-4xl">
          {average.toFixed(1)}
        </span>
        <StarDisplay rating={Math.round(average)} />
        <span className="text-[11px] tracking-[0.2em] uppercase text-[#7A7468]">
          {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
        </span>
      </div>

      <div className="w-full h-px bg-[#1E1C18]" />

      {/* Individual reviews */}
      <div className="space-y-8">
        {reviews.map((r) => (
          <div key={r.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <StarDisplay rating={r.rating} />
                <span className="text-[11px] tracking-[0.15em] uppercase text-[#7A7468]">
                  {r.user.name ?? "Anonymous"}
                </span>
              </div>
              <span className="text-[10px] tracking-[0.1em] text-[#3A3830]">
                {new Date(r.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
            {r.comment && (
              <p className="text-[13px] text-[#7A7468] leading-relaxed pl-0">
                {r.comment}
              </p>
            )}
            {r.adminReply && (
              <div className="mt-3 pl-4 border-l-2 border-[#3A3830]">
                <p className="text-[10px] text-[#D4A853] uppercase tracking-[0.2em] mb-1">
                  MERQ replied
                </p>
                <p className="text-[13px] text-[#7A7468] leading-relaxed">
                  {r.adminReply}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
