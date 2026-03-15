import { Link, Outlet } from "react-router";
import type { Route } from "./+types/store-layout";
import { parseCart, getCartCount } from "~/lib/cart.server";

export function loader({ request }: Route.LoaderArgs) {
  const cart = parseCart(request.headers.get("Cookie"));
  return { cartCount: getCartCount(cart) };
}

export default function StoreLayout({ loaderData }: Route.ComponentProps) {
  const { cartCount } = loaderData;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <header className="border-b border-gray-200 dark:border-gray-800">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            to="/"
            className="text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-100"
          >
            Store
          </Link>
          <Link
            to="/cart"
            className="relative text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            Cart
            {cartCount > 0 && (
              <span className="ml-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-900 px-1.5 text-xs font-medium text-white dark:bg-gray-100 dark:text-gray-900">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
