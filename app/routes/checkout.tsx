import { redirect } from "react-router";
import type { Route } from "./+types/checkout";
import { parseCart } from "~/lib/cart.server";
import { createStripeClient, createCheckoutSession } from "~/lib/stripe.server";

export async function action({ request, context }: Route.ActionArgs) {
  const cart = parseCart(request.headers.get("Cookie"));

  if (cart.items.length === 0) {
    return redirect("/cart");
  }

  const stripeKey = context.cloudflare.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    throw new Response(
      "Checkout is unavailable. Set STRIPE_SECRET_KEY in your .dev.vars file (see .dev.vars.example).",
      { status: 503 },
    );
  }

  const stripe = createStripeClient(stripeKey);
  const origin = new URL(request.url).origin;
  const session = await createCheckoutSession(stripe, cart, origin);

  if (!session.url) {
    throw new Response("Failed to create checkout session", { status: 500 });
  }

  return redirect(session.url);
}

export function loader() {
  return redirect("/cart");
}
