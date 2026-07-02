"use client"; // or server component in Next.js App Router

import { useActionState } from "react";

async function submitAction(prevState, formData) {
  const name = formData.get("name");

  if (!name || name.length < 2) {
    return { error: "Name must be at least 2 characters" };
  }

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { success: `Hello, ${name}!` };
}

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitAction, null);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form
        action={formAction}
        className="w-full max-w-md space-y-4 bg-pitch p-6 rounded-lg"
      >
        <h1 className="text-2xl font-semibold text-ivory mb-4">Contact Form</h1>

        <input
          name="name"
          placeholder="Your name"
          disabled={isPending}
          className="w-full px-4 py-2 bg-smoke text-ivory placeholder-ash rounded border border-ash focus:outline-none focus:border-bronze disabled:opacity-50"
        />

        <button
          type="submit"
          disabled={isPending}
          className="w-full px-4 py-2 bg-bronze text-pitch font-semibold rounded hover:bg-accent disabled:opacity-50 transition-colors"
        >
          {isPending ? "Submitting..." : "Submit"}
        </button>

        {state?.error && (
          <p className="text-red-400 text-sm mt-2">{state.error}</p>
        )}
        {state?.success && (
          <p className="text-green-400 text-sm mt-2">{state.success}</p>
        )}
      </form>
    </div>
  );
}
