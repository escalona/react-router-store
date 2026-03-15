export interface Product {
  id: string;
  handle: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
}
