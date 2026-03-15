import { Link } from "react-router";
import type { Route } from "./+types/home";
import { products } from "~/data/products";
import { formatPrice } from "~/lib/format";

export function meta(_args: Route.MetaArgs) {
  return [{ title: "Store" }, { name: "description", content: "Browse our collection" }];
}

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
        Products
      </h1>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Link key={product.id} to={`/products/${product.handle}`} className="group">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-900">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="mt-3">
              <h2 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {product.name}
              </h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {formatPrice(product.price)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
