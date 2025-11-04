export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  articleNumber?: string;
}

export interface CartProps {
  items: CartItem[];
  onQuantityChange?: (itemId: string, quantity: number) => void;
  onRemoveItem?: (itemId: string) => void;
  onCheckout?: () => void;
  currency?: string;
  className?: string;
}
