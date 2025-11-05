import React from "react";
import type { GlobalHeaderProps } from "./GlobalHeader.types";
import styles from "./GlobalHeader.module.css";

export const GlobalHeader: React.FC<GlobalHeaderProps> = ({
  appName,
  logo,
  userName,
  userAvatar,
  notifications = 0,
  onProfileClick,
  onNotificationsClick,
  onLogoClick,
  children,
  className,
}) => (
  <header className={`${styles.globalHeader} ${className || ""}`}>
    <div className={styles.left}>
      <button
        type="button"
        className={styles.logoButton}
        onClick={onLogoClick}
        aria-label="Go to home"
      >
        {logo || <span className={styles.defaultLogo}>INGKA</span>}
      </button>
      <span className={styles.appName}>{appName}</span>
    </div>

    <div className={styles.center}>{children}</div>

    <div className={styles.right}>
      {notifications > 0 && (
        <button
          type="button"
          className={styles.notifications}
          onClick={onNotificationsClick}
          aria-label={`${notifications} notifications`}
        >
          <span className={styles.icon}>🔔</span>
          <span className={styles.badge}>
            {notifications > 99 ? "99+" : notifications}
          </span>
        </button>
      )}

      {userName && (
        <button
          type="button"
          className={styles.profile}
          onClick={onProfileClick}
          aria-label="User profile"
        >
          {userAvatar ? (
            <img src={userAvatar} alt={userName} className={styles.avatar} />
          ) : (
            <span className={styles.avatarFallback}>
              {userName.charAt(0).toUpperCase()}
            </span>
          )}
          <span className={styles.userName}>{userName}</span>
        </button>
      )}
    </div>
  </header>
);

GlobalHeader.displayName = "GlobalHeader";
