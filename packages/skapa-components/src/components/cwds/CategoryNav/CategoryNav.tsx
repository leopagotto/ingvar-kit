import React, { useState } from "react";
import type { CategoryNavProps, Category } from "./CategoryNav.types";
import styles from "./CategoryNav.module.css";

export const CategoryNav: React.FC<CategoryNavProps> = ({
  categories,
  activeCategory,
  onCategoryClick,
  orientation = "horizontal",
  showIcons = true,
  className,
}) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const renderCategory = (category: Category, level: number = 0) => {
    const isActive = activeCategory === category.id;
    const isExpanded = expandedCategories.includes(category.id);
    const hasSubcategories =
      category.subcategories && category.subcategories.length > 0;

    return (
      <div
        key={category.id}
        className={styles.categoryItem}
        style={{ paddingLeft: `${level * 16}px` }}
      >
        <button
          type="button"
          className={`${styles.categoryButton} ${
            isActive ? styles.active : ""
          }`}
          onClick={() => {
            onCategoryClick?.(category.id);
            if (hasSubcategories) {
              toggleCategory(category.id);
            }
          }}
        >
          {showIcons && category.icon && (
            <span className={styles.icon}>{category.icon}</span>
          )}
          <span className={styles.label}>{category.name}</span>
          {hasSubcategories && (
            <span className={styles.arrow}>{isExpanded ? "▼" : "▶"}</span>
          )}
        </button>
        {hasSubcategories && isExpanded && (
          <div className={styles.subcategories}>
            {category.subcategories!.map((sub) =>
              renderCategory(sub, level + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav
      className={`${styles.categoryNav} ${styles[orientation]} ${
        className || ""
      }`}
    >
      {categories.map((category) => renderCategory(category))}
    </nav>
  );
};

CategoryNav.displayName = "CategoryNav";
