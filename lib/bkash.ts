// lib/bkash.ts

export async function getBkashToken(): Promise<string> {
  console.log("bKash env check:", {
    url: process.env.BKASH_GRANT_TOKEN_URL,
    username: process.env.BKASH_USERNAME,
    hasPassword: !!process.env.BKASH_PASSWORD,
    hasApiKey: !!process.env.BKASH_API_KEY,
    hasSecret: !!process.env.BKASH_SECRET_KEY,
  });

  const res = await fetch(process.env.BKASH_GRANT_TOKEN_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      username: process.env.BKASH_USERNAME!,
      password: process.env.BKASH_PASSWORD!,
    },
    body: JSON.stringify({
      app_key: process.env.BKASH_API_KEY,
      app_secret: process.env.BKASH_SECRET_KEY,
    }),
  });

  const data = await res.json();

  if (!data.id_token) {
    throw new Error("bKash token grant failed: " + JSON.stringify(data));
  }

  return data.id_token as string;
}
