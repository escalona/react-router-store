import Stripe from "stripe";
import type { Cart } from "~/data/types";
import { getProductById } from "~/data/products";

export function createStripeClient(secretKey: string): Stripe {
  return new Stripe(secretKey, {
    httpClient: Stripe.createFetchHttpClient(),
  });
}

export async function createCheckoutSession(
  stripe: Stripe,
  cart: Cart,
  origin: string,
): Promise<Stripe.Checkout.Session> {
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  for (const item of cart.items) {
    const product = getProductById(item.productId);
    if (!product) continue;

    lineItems.push({
      price_data: {
        currency: product.currency,
        product_data: {
          name: product.name,
          images: [product.image],
        },
        unit_amount: product.price,
      },
      quantity: item.quantity,
    });
  }

  return stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cart`,
  });
}
