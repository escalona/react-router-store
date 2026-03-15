import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { products } from "~/data/products";
import { formatPrice } from "~/lib/format";
import { renderWithRouter } from "~/test/render-with-router";
import Home from "./home";

describe("Home route", () => {
  it("renders the product grid with links and formatted prices", () => {
    renderWithRouter(<Home />);

    expect(screen.getByRole("heading", { name: "Products" })).toBeInTheDocument();

    for (const product of products) {
      expect(screen.getByRole("img", { name: product.name })).toBeInTheDocument();
      expect(screen.getByText(product.name)).toBeInTheDocument();
      expect(screen.getByText(formatPrice(product.price))).toBeInTheDocument();
      expect(screen.getByText(product.name).closest("a")).toHaveAttribute(
        "href",
        `/products/${product.handle}`,
      );
    }
  });
});
