import { Link, redirect } from "react-router";
import type { Route } from "./+types/cart";
import { getProductById } from "~/data/products";
import { formatPrice } from "~/lib/format";
import { parseCart, removeFromCart, updateQuantity, serializeCart } from "~/lib/cart.server";

export function meta() {
  return [{ title: "Cart" }];
}

export function loader({ request, context }: Route.LoaderArgs) {
  const cart = parseCart(request.headers.get("Cookie"));
  const stripeConfigured = Boolean(context.cloudflare.env.STRIPE_SECRET_KEY);
  const items = cart.items
    .map((item) => {
      const product = getProductById(item.productId);
      if (!product) return null;
      return {
        productId: item.productId,
        quantity: item.quantity,
        name: product.name,
        price: product.price,
        image: product.image,
        handle: product.handle,
      };
    })
    .filter((item) => item !== null);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return { items, total, stripeConfigured };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");
  const productId = formData.get("productId");

  if (typeof productId !== "string") {
    throw new Response("Bad Request", { status: 400 });
  }

  const cart = parseCart(request.headers.get("Cookie"));
  let updated = cart;

  if (intent === "remove") {
    updated = removeFromCart(cart, productId);
  } else if (intent === "update") {
    const quantity = Number(formData.get("quantity"));
    if (Number.isNaN(quantity) || quantity < 0) {
      throw new Response("Bad Request", { status: 400 });
    }
    updated = updateQuantity(cart, productId, quantity);
  }

  return redirect("/cart", {
    headers: { "Set-Cookie": serializeCart(updated, request) },
  });
}

export default function Cart({ loaderData }: Route.ComponentProps) {
  const { items, total, stripeConfigured } = loaderData;

  if (items.length === 0) {
    return (
      <div className="py-16 text-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Your cart is empty
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Add some items to get started.</p>
        <Link
          to="/"
          className="mt-6 inline-block text-sm font-medium text-gray-900 underline dark:text-gray-100"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
        Cart
      </h1>

      <div className="mt-8 space-y-6">
        {items.map((item) => (
          <div
            key={item.productId}
            className="flex items-start gap-4 border-b border-gray-200 pb-6 dark:border-gray-800"
          >
            <Link to={`/products/${item.handle}`} className="shrink-0">
              <img src={item.image} alt={item.name} className="h-24 w-24 rounded-lg object-cover" />
            </Link>

            <div className="flex flex-1 flex-col gap-2">
              <div className="flex items-start justify-between">
                <Link
                  to={`/products/${item.handle}`}
                  className="font-medium text-gray-900 hover:underline dark:text-gray-100"
                >
                  {item.name}
                </Link>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <form method="post" className="flex items-center gap-2">
                  <input type="hidden" name="intent" value="update" />
                  <input type="hidden" name="productId" value={item.productId} />
                  <label className="sr-only" htmlFor={`qty-${item.productId}`}>
                    Quantity
                  </label>
                  <select
                    id={`qty-${item.productId}`}
                    name="quantity"
                    defaultValue={item.quantity}
                    onChange={(e) => e.currentTarget.form?.requestSubmit()}
                    className="rounded border border-gray-300 bg-white px-2 py-1 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </form>

                <form method="post">
                  <input type="hidden" name="intent" value="remove" />
                  <input type="hidden" name="productId" value={item.productId} />
                  <button
                    type="submit"
                    className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    Remove
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">Total</span>
        <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {formatPrice(total)}
        </span>
      </div>

      <form method="post" action="/checkout" className="mt-6">
        <button
          type="submit"
          disabled={!stripeConfigured}
          className="w-full rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
        >
          Checkout
        </button>
        {!stripeConfigured && (
          <p className="mt-2 text-center text-sm text-amber-600 dark:text-amber-400">
            Checkout is unavailable. Add your STRIPE_SECRET_KEY to .dev.vars to enable it.
          </p>
        )}
      </form>
    </div>
  );
}
