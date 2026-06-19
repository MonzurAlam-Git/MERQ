// components/shop/ReviewForm.tsx
"use client";

import { submitReview } from "@/lib/actions/reviews";
import { useState } from "react";

type Props = {
  productId: number;
  slug: string;
};

export default function ReviewForm({ productId, slug }: Props) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    if (rating === 0) {
      setError("Select a rating.");
      return;
    }
    setPending(true);
    setError("");
    try {
      await submitReview(productId, slug, rating, comment);
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="space-y-5">
      <p className="text-[10px] tracking-[0.25em] uppercase text-[#7A7468]">
        Your Review
      </p>

      {/* Star picker */}
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className="text-2xl transition-colors duration-100"
            aria-label={`Rate ${star} out of 5`}
          >
            <span
              className={
                star <= (hovered || rating)
                  ? "text-[#D4A853]"
                  : "text-[#3A3830]"
              }
            >
              ★
            </span>
          </button>
        ))}
      </div>

      {/* Comment */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Say something, or nothing."
        rows={4}
        className="w-full bg-transparent border border-[#3A3830] text-[#E8E4DE] placeholder-[#3A3830] px-4 py-3 text-[13px] tracking-wide resize-none focus:outline-none focus:border-[#7A7468] transition-colors"
      />

      {error && (
        <p className="text-[11px] tracking-[0.15em] text-[#D4A853]">{error}</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={pending}
        className="px-8 py-3 bg-[#E8E4DE] text-onyx text-[11px] tracking-[0.3em] uppercase hover:bg-white transition-colors duration-200 disabled:opacity-40"
      >
        {pending ? "Submitting…" : "Submit"}
      </button>
    </div>
  );
}
