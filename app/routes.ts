import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("routes/store-layout.tsx", [
    index("routes/home.tsx"),
    route("products/:handle", "routes/product.tsx"),
    route("cart", "routes/cart.tsx"),
    route("checkout", "routes/checkout.tsx"),
    route("checkout/success", "routes/checkout-success.tsx"),
  ]),
] satisfies RouteConfig;
