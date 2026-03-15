import type { Cart, CartItem } from "~/data/types";

const COOKIE_NAME = "__cart";
const MAX_AGE = 604800; // 7 days

function isValidCartItem(item: unknown): item is CartItem {
  return (
    typeof item === "object" &&
    item !== null &&
    typeof (item as CartItem).productId === "string" &&
    typeof (item as CartItem).quantity === "number" &&
    (item as CartItem).quantity > 0
  );
}

export function parseCart(cookieHeader: string | null): Cart {
  if (!cookieHeader) return { items: [] };

  const match = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${COOKIE_NAME}=`));

  if (!match) return { items: [] };

  try {
    const value = match.slice(COOKIE_NAME.length + 1);
    const json = atob(value);
    const parsed = JSON.parse(json);
    if (parsed && Array.isArray(parsed.items)) {
      return { items: parsed.items.filter(isValidCartItem) };
    }
  } catch {
    // Corrupted cookie — start fresh
  }

  return { items: [] };
}

function buildCookieString(value: string, maxAge: number, isSecure: boolean): string {
  const parts = [
    `${COOKIE_NAME}=${value}`,
    `Path=/`,
    `HttpOnly`,
    `SameSite=Lax`,
    `Max-Age=${maxAge}`,
  ];
  if (isSecure) parts.push("Secure");
  return parts.join("; ");
}

export function serializeCart(cart: Cart, request: Request): string {
  const value = btoa(JSON.stringify(cart));
  return buildCookieString(value, MAX_AGE, request.url.startsWith("https:"));
}

export function addToCart(cart: Cart, productId: string, quantity = 1): Cart {
  const found = cart.items.some((item) => item.productId === productId);
  if (found) {
    return {
      items: cart.items.map((item) =>
        item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item,
      ),
    };
  }
  return { items: [...cart.items, { productId, quantity }] };
}

export function removeFromCart(cart: Cart, productId: string): Cart {
  return { items: cart.items.filter((item) => item.productId !== productId) };
}

export function updateQuantity(cart: Cart, productId: string, quantity: number): Cart {
  if (quantity <= 0) return removeFromCart(cart, productId);
  return {
    items: cart.items.map((item) => (item.productId === productId ? { ...item, quantity } : item)),
  };
}

export function clearCart(request: Request): string {
  return buildCookieString("", 0, request.url.startsWith("https:"));
}

export function getCartCount(cart: Cart): number {
  return cart.items.reduce((sum, item) => sum + item.quantity, 0);
}
