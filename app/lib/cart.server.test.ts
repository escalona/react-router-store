import { describe, expect, it } from "vitest";
import {
  addToCart,
  clearCart,
  getCartCount,
  parseCart,
  serializeCart,
  updateQuantity,
} from "./cart.server";

function encodeCartCookie(value: unknown) {
  return `__cart=${btoa(JSON.stringify(value))}`;
}

describe("cart.server", () => {
  it("returns an empty cart when the cookie is missing or malformed", () => {
    expect(parseCart(null)).toEqual({ items: [] });
    expect(parseCart("session=abc123")).toEqual({ items: [] });
    expect(parseCart("__cart=not-base64")).toEqual({ items: [] });
  });

  it("filters invalid items out of the parsed cookie payload", () => {
    const cookie = encodeCartCookie({
      items: [
        { productId: "1", quantity: 2 },
        { productId: "2", quantity: 0 },
        { productId: 3, quantity: 1 },
        null,
      ],
    });

    expect(parseCart(cookie)).toEqual({
      items: [{ productId: "1", quantity: 2 }],
    });
  });

  it("serializes carts into secure cookies that can be parsed back out", () => {
    const cart = { items: [{ productId: "1", quantity: 2 }] };
    const request = new Request("https://store.example/cart");
    const header = serializeCart(cart, request);

    expect(header).toContain("HttpOnly");
    expect(header).toContain("SameSite=Lax");
    expect(header).toContain("Secure");
    expect(parseCart(header)).toEqual(cart);
  });

  it("updates quantities, removes empty lines, and clears the cookie", () => {
    const cart = addToCart({ items: [{ productId: "1", quantity: 1 }] }, "1", 2);

    expect(getCartCount(cart)).toBe(3);
    expect(updateQuantity(cart, "1", 0)).toEqual({ items: [] });

    const cleared = clearCart(new Request("https://store.example/cart"));

    expect(cleared).toContain("Max-Age=0");
    expect(cleared).toContain("Secure");
  });
});
