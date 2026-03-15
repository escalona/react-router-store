import type { Product } from "./types";

export const products: Product[] = [
  {
    id: "1",
    handle: "classic-tee",
    name: "Classic Tee",
    description:
      "A timeless cotton t-shirt with a relaxed fit. Soft, breathable fabric keeps you comfortable all day long.",
    price: 2900,
    currency: "usd",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop",
  },
  {
    id: "2",
    handle: "everyday-hoodie",
    name: "Everyday Hoodie",
    description:
      "A midweight fleece hoodie perfect for layering. Features a kangaroo pocket and adjustable drawstring hood.",
    price: 5900,
    currency: "usd",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop",
  },
  {
    id: "3",
    handle: "canvas-tote",
    name: "Canvas Tote",
    description:
      "Durable heavyweight canvas tote with reinforced straps. Roomy enough for groceries, books, or gym gear.",
    price: 3200,
    currency: "usd",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&h=800&fit=crop",
  },
  {
    id: "4",
    handle: "ceramic-mug",
    name: "Ceramic Mug",
    description:
      "Hand-finished stoneware mug with a smooth matte glaze. Holds 12 oz and is microwave and dishwasher safe.",
    price: 1800,
    currency: "usd",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&h=800&fit=crop",
  },
  {
    id: "5",
    handle: "leather-wallet",
    name: "Leather Wallet",
    description:
      "Slim bifold wallet crafted from full-grain leather. Features six card slots and a bill compartment.",
    price: 4500,
    currency: "usd",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&h=800&fit=crop",
  },
  {
    id: "6",
    handle: "wool-beanie",
    name: "Wool Beanie",
    description:
      "Soft merino wool beanie with a ribbed knit texture. Warm, breathable, and fits most head sizes.",
    price: 2400,
    currency: "usd",
    image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800&h=800&fit=crop",
  },
];

export function getProductByHandle(handle: string): Product | undefined {
  return products.find((p) => p.handle === handle);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
