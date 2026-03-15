import { describe, expect, it } from "vitest";
import { parseCart } from "~/lib/cart.server";
import { action, loader } from "./product";

describe("Product route", () => {
  it("returns the requested product from the loader", () => {
    const result = loader({
      params: { handle: "classic-tee" },
    } as Parameters<typeof loader>[0]);

    expect(result.product.name).toBe("Classic Tee");
  });

  it("throws a 404 response when the product is missing", () => {
    try {
      loader({
        params: { handle: "missing-product" },
      } as Parameters<typeof loader>[0]);

      throw new Error("Expected loader to throw");
    } catch (error) {
      expect(error).toBeInstanceOf(Response);
      expect((error as Response).status).toBe(404);
    }
  });

  it("adds the product to the cart and redirects to /cart", async () => {
    const response = await action({
      params: { handle: "classic-tee" },
      request: new Request("https://store.example/products/classic-tee", {
        method: "POST",
      }),
    } as Parameters<typeof action>[0]);

    expect(response.status).toBe(302);
    expect(response.headers.get("Location")).toBe("/cart");
    expect(parseCart(response.headers.get("Set-Cookie"))).toEqual({
      items: [{ productId: "1", quantity: 1 }],
    });
  });
});
