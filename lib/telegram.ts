// lib/telegram.ts

export async function sendTelegramNotification(message: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error(
      "❌ Telegram credentials missing - BOT_TOKEN:",
      !!token,
      "CHAT_ID:",
      !!chatId,
    );
    return;
  }

  console.log("📤 Attempting to send Telegram notification...");

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
        }),
        signal: controller.signal,
      },
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      const error = await response.json();
      console.error("❌ Telegram API error:", response.status, error);
      return;
    }

    const result = await response.json();
    console.log(
      "✅ Telegram notification sent successfully. Message ID:",
      result.result?.message_id,
    );
  } catch (error) {
    console.error(
      "❌ Failed to send Telegram notification:",
      error instanceof Error ? error.message : error,
    );
  }
}
