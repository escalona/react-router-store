import { data, Link, redirect } from "react-router";
import type { Route } from "./+types/checkout-success";
import { clearCart } from "~/lib/cart.server";
import { createStripeClient } from "~/lib/stripe.server";

export function meta() {
  return [{ title: "Order Confirmed" }];
}

export async function loader({ request, context }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get("session_id");

  if (!sessionId) {
    return redirect("/");
  }

  const stripe = createStripeClient(context.cloudflare.env.STRIPE_SECRET_KEY);
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== "paid") {
    return redirect("/cart");
  }

  return data(null, {
    headers: { "Set-Cookie": clearCart(request) },
  });
}

export default function CheckoutSuccess() {
  return (
    <div className="py-16 text-center">
      <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
        Thank you for your order!
      </h1>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        Your payment was successful. We&apos;ll send you a confirmation email shortly.
      </p>
      <Link
        to="/"
        className="mt-8 inline-block rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
