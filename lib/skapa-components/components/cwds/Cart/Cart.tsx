import React from "react";
import type { CartProps } from "./Cart.types";
import styles from "./Cart.module.css";

export const Cart: React.FC<CartProps> = ({
  items,
  onQuantityChange,
  onRemoveItem,
  onCheckout,
  currency = "€",
  className,
}) => {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className={`${styles.cart} ${className || ""}`}>
      <div className={styles.header}>
        <h3 className={styles.title}>Shopping Cart</h3>
        <span className={styles.itemCount}>{items.length} items</span>
      </div>

      {items.length === 0 ? (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>🛒</span>
          <p className={styles.emptyText}>Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className={styles.items}>
            {items.map((item) => (
              <div key={item.id} className={styles.item}>
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className={styles.itemImage}
                  />
                )}
                <div className={styles.itemInfo}>
                  <div className={styles.itemName}>{item.name}</div>
                  {item.articleNumber && (
                    <div className={styles.articleNumber}>
                      Art. {item.articleNumber}
                    </div>
                  )}
                  <div className={styles.itemPrice}>
                    {currency}
                    {item.price.toFixed(2)}
                  </div>
                </div>
                <div className={styles.itemActions}>
                  <div className={styles.quantity}>
                    <button
                      type="button"
                      onClick={() =>
                        onQuantityChange?.(item.id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() =>
                        onQuantityChange?.(item.id, item.quantity + 1)
                      }
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className={styles.removeButton}
                    onClick={() => onRemoveItem?.(item.id)}
                    aria-label="Remove item"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.footer}>
            <div className={styles.total}>
              <span className={styles.totalLabel}>Total:</span>
              <span className={styles.totalAmount}>
                {currency}
                {total.toFixed(2)}
              </span>
            </div>
            <button
              type="button"
              className={styles.checkoutButton}
              onClick={onCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

Cart.displayName = "Cart";
