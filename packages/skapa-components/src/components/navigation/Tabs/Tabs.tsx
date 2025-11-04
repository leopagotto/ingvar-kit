import React, { useState } from "react";
import type { TabsProps } from "./Tabs.types";
import styles from "./Tabs.module.css";

/**
 * Tabs component for content organization
 *
 * @example
 * <Tabs
 *   items={[
 *     { id: '1', label: 'Tab 1', content: <div>Content 1</div> },
 *     { id: '2', label: 'Tab 2', content: <div>Content 2</div> }
 *   ]}
 * />
 */
export const Tabs: React.FC<TabsProps> = ({
  items,
  activeTab: controlledActiveTab,
  defaultActiveTab,
  onChange,
  subtle = false,
  className,
}) => {
  const [uncontrolledActiveTab, setUncontrolledActiveTab] = useState(
    defaultActiveTab || items[0]?.id
  );

  const activeTab =
    controlledActiveTab !== undefined
      ? controlledActiveTab
      : uncontrolledActiveTab;

  const handleTabClick = (tabId: string) => {
    if (controlledActiveTab === undefined) {
      setUncontrolledActiveTab(tabId);
    }
    onChange?.(tabId);
  };

  const activeContent = items.find((item) => item.id === activeTab)?.content;

  return (
    <div className={`${styles.tabs} ${className || ""}`}>
      <div
        className={`${styles.tabList} ${subtle ? styles.subtle : ""}`}
        role="tablist"
      >
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={activeTab === item.id}
            aria-controls={`panel-${item.id}`}
            id={`tab-${item.id}`}
            className={`${styles.tab} ${
              activeTab === item.id ? styles.active : ""
            }`}
            onClick={() => handleTabClick(item.id)}
            disabled={item.disabled}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div
        className={styles.panel}
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
      >
        {activeContent}
      </div>
    </div>
  );
};

Tabs.displayName = "Tabs";
