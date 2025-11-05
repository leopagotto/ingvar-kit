export interface Category {
  id: string;
  name: string;
  icon?: string;
  subcategories?: Category[];
}

export interface CategoryNavProps {
  categories: Category[];
  activeCategory?: string;
  onCategoryClick?: (categoryId: string) => void;
  orientation?: 'horizontal' | 'vertical';
  showIcons?: boolean;
  className?: string;
}
