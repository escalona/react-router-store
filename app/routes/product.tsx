import { redirect } from "react-router";
import type { Route } from "./+types/product";
import { getProductByHandle } from "~/data/products";
import { formatPrice } from "~/lib/format";
import { parseCart, addToCart, serializeCart } from "~/lib/cart.server";
import { Button } from "~/components/button";

export function loader({ params }: Route.LoaderArgs) {
  const product = getProductByHandle(params.handle);
  if (!product) throw new Response("Not Found", { status: 404 });
  return { product };
}

export async function action({ request, params }: Route.ActionArgs) {
  const product = getProductByHandle(params.handle);
  if (!product) throw new Response("Not Found", { status: 404 });

  const cart = parseCart(request.headers.get("Cookie"));
  const updated = addToCart(cart, product.id);

  return redirect("/cart", {
    headers: { "Set-Cookie": serializeCart(updated, request) },
  });
}

export function meta({ data }: Route.MetaArgs) {
  if (!data) return [{ title: "Product not found" }];
  return [{ title: data.product.name }, { name: "description", content: data.product.description }];
}

export default function Product({ loaderData }: Route.ComponentProps) {
  const { product } = loaderData;

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-900">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
      </div>

      <div className="flex flex-col justify-center gap-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
            {product.name}
          </h1>
          <p className="mt-2 text-2xl font-medium text-gray-900 dark:text-gray-100">
            {formatPrice(product.price)}
          </p>
        </div>

        <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
          {product.description}
        </p>

        <form method="post">
          <Button type="submit" size="lg" className="w-full">
            Add to Cart
          </Button>
        </form>
      </div>
    </div>
  );
}
