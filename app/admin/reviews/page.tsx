// app/admin/reviews/page.tsx
import { db } from "@/lib/db";
import Link from "next/link";
import { replyToReview, toggleHidden } from "./_actions";

export const metadata = { title: "Reviews — Admin — MERQ" };

const FILTER_OPTIONS = ["ALL", "UNREPLIED", "HIDDEN"];

export default async function AdminReviewsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter } = await searchParams;
  const active = filter ?? "ALL";

  const where =
    active === "UNREPLIED"
      ? { adminReply: null }
      : active === "HIDDEN"
        ? { hidden: true }
        : undefined;

  const reviews = await db.review.findMany({
    where,
    include: {
      user: { select: { name: true, email: true } },
      product: { select: { name: true, slug: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-serif text-3xl mb-8">Reviews</h1>

      <div className="flex gap-2 mb-8 flex-wrap">
        {FILTER_OPTIONS.map((f) => {
          const isActive = active === f;
          return (
            <Link
              key={f}
              href={
                f === "ALL" ? "/admin/reviews" : `/admin/reviews?filter=${f}`
              }
              className={`text-xs px-3 py-1.5 border rounded transition-colors ${
                isActive
                  ? "border-[#E8E4DE] text-[#E8E4DE]"
                  : "border-[#3A3830] text-[#7A7468] hover:border-[#E8E4DE] hover:text-[#E8E4DE]"
              }`}
            >
              {f}
            </Link>
          );
        })}
      </div>

      <div className="flex flex-col gap-4">
        {reviews.length === 0 && (
          <p className="text-[#7A7468] text-sm">No reviews found.</p>
        )}

        {reviews.map((review) => (
          <div
            key={review.id}
            className={`bg-[#1E1C18] border rounded p-5 ${
              review.hidden ? "border-red-900" : "border-[#3A3830]"
            }`}
          >
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <Link
                  href={`/shop/${review.product.slug}`}
                  className="text-sm text-[#E8E4DE] hover:underline"
                >
                  {review.product.name}
                </Link>
                <p className="text-xs text-[#7A7468] mt-1">
                  {review.user.name ?? review.user.email}
                </p>
                <p className="text-xs text-[#3A3830] mt-1">
                  {new Date(review.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="text-right">
                <span className="text-[#D4A853] text-sm tracking-wider">
                  {"★".repeat(review.rating)}
                  <span className="text-[#3A3830]">
                    {"★".repeat(5 - review.rating)}
                  </span>
                </span>
                {review.hidden && (
                  <p className="text-xs text-red-500 mt-1">Hidden</p>
                )}
              </div>
            </div>

            {review.comment && (
              <p className="text-sm text-[#7A7468] mt-3">{review.comment}</p>
            )}

            {/* Existing admin reply */}
            {review.adminReply && (
              <div className="mt-4 pl-4 border-l-2 border-[#3A3830]">
                <p className="text-xs text-[#D4A853] uppercase tracking-widest mb-1">
                  MERQ replied
                </p>
                <p className="text-sm text-[#E8E4DE]">{review.adminReply}</p>
              </div>
            )}

            {/* Reply form */}
            <form action={replyToReview} className="mt-4 flex gap-2">
              <input type="hidden" name="reviewId" value={review.id} />
              <input
                name="reply"
                defaultValue={review.adminReply ?? ""}
                placeholder="Write a reply…"
                className="flex-1 bg-transparent border border-[#3A3830] rounded px-3 py-1.5 text-sm text-[#E8E4DE] placeholder-[#3A3830] focus:outline-none focus:border-[#7A7468]"
              />
              <button
                type="submit"
                className="text-xs border border-[#E8E4DE] text-[#E8E4DE] px-4 py-1.5 hover:bg-[#E8E4DE] hover:text-[#111010] transition-colors rounded shrink-0"
              >
                {review.adminReply ? "Update" : "Reply"}
              </button>
            </form>

            {/* Hide/unhide toggle */}
            <form action={toggleHidden} className="mt-2">
              <input type="hidden" name="reviewId" value={review.id} />
              <input
                type="hidden"
                name="hidden"
                value={review.hidden ? "true" : "false"}
              />
              <button
                type="submit"
                className="text-xs text-[#7A7468] hover:text-red-500 transition-colors underline underline-offset-4"
              >
                {review.hidden ? "Unhide" : "Hide review"}
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
