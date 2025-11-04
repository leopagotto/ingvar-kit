export interface ProductCardProps {
  name: string;
  price: number;
  image?: string;
  articleNumber?: string;
  description?: string;
  inStock?: boolean;
  onAddToCart?: () => void;
  onViewDetails?: () => void;
  currency?: string;
  className?: string;
}
