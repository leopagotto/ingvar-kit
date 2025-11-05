import React, { useEffect, useRef } from "react";
import type { UserProfileProps } from "./UserProfile.types";
import styles from "./UserProfile.module.css";

export const UserProfile: React.FC<UserProfileProps> = ({
  userName,
  userEmail,
  userAvatar,
  menuItems = [],
  isOpen,
  onClose,
  className,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className={`${styles.userProfile} ${className || ""}`}
    >
      <div className={styles.header}>
        {userAvatar ? (
          <img src={userAvatar} alt={userName} className={styles.avatar} />
        ) : (
          <span className={styles.avatarFallback}>
            {userName.charAt(0).toUpperCase()}
          </span>
        )}
        <div className={styles.userInfo}>
          <div className={styles.userName}>{userName}</div>
          {userEmail && <div className={styles.userEmail}>{userEmail}</div>}
        </div>
      </div>

      {menuItems.length > 0 && (
        <div className={styles.menu}>
          {menuItems.map((item, index) =>
            item.divider ? (
              <div key={index} className={styles.divider} />
            ) : (
              <button
                key={index}
                type="button"
                className={styles.menuItem}
                onClick={() => {
                  item.onClick?.();
                  onClose();
                }}
              >
                {item.icon && <span className={styles.icon}>{item.icon}</span>}
                <span className={styles.label}>{item.label}</span>
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

UserProfile.displayName = "UserProfile";
