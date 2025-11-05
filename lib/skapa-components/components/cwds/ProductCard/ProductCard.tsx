import React from "react";
import type { ProductCardProps } from "./ProductCard.types";
import styles from "./ProductCard.module.css";

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  image,
  articleNumber,
  description,
  inStock = true,
  onAddToCart,
  onViewDetails,
  currency = "€",
  className,
}) => (
  <div
    className={`${styles.productCard} ${!inStock ? styles.outOfStock : ""} ${
      className || ""
    }`}
  >
    <div className={styles.imageContainer} onClick={onViewDetails}>
      {image ? (
        <img src={image} alt={name} className={styles.image} />
      ) : (
        <div className={styles.imagePlaceholder}>📦</div>
      )}
      {!inStock && <div className={styles.badge}>Out of Stock</div>}
    </div>

    <div className={styles.content}>
      <h3 className={styles.name} onClick={onViewDetails}>
        {name}
      </h3>

      {articleNumber && (
        <div className={styles.articleNumber}>Art. {articleNumber}</div>
      )}

      {description && <p className={styles.description}>{description}</p>}

      <div className={styles.footer}>
        <div className={styles.price}>
          {currency}
          {price.toFixed(2)}
        </div>
        <button
          type="button"
          className={styles.addButton}
          onClick={onAddToCart}
          disabled={!inStock}
        >
          {inStock ? "+ Add to Cart" : "Unavailable"}
        </button>
      </div>
    </div>
  </div>
);

ProductCard.displayName = "ProductCard";
