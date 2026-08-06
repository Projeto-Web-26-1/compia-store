export interface CartItem {
  productId: string;
  name: string;
  price: number;
  format: string;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
}