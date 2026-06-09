// lib/formatPrice.ts

/**
 * Converts cents (integer) to a formatted USD currency string.
 * E.g., formatPrice(98000) → "$980.00"
 *       formatPrice(1500) → "$15.00"
 *
 * @param cents - Price in cents (as stored in the database)
 * @returns Formatted USD string with currency symbol
 */
export function formatPrice(cents: number | string): string {
  const numCents = typeof cents === "string" ? parseFloat(cents) : cents;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(numCents / 100);
}
