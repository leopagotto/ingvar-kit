import React, { useState } from 'react';
import './styles/cwds-tokens.css';

/**
 * CWDS Navigation Menu Component
 * 
 * Design Source: Figma - Ingka Co-worker Design Components
 * Node: 702:2930
 * 
 * Side navigation menu for internal IKEA applications.
 * 
 * @example
 * <NavigationMenu
 *   items={[
 *     { id: 'home', label: 'Home', icon: 'home', href: '/' },
 *     { id: 'orders', label: 'Orders', icon: 'orders', href: '/orders' },
 *   ]}
 *   activeItemId="home"
 *   onItemClick={(item) => console.log('Clicked:', item)}
 * />
 */

export interface NavigationMenuItem {
  id: string;
  label: string;
  icon?: string;
  href?: string;
  children?: NavigationMenuItem[];
}

export interface NavigationMenuProps {
  items: NavigationMenuItem[];
  activeItemId?: string;
  onItemClick?: (item: NavigationMenuItem) => void;
  className?: string;
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({
  items,
  activeItemId,
  onItemClick,
  className = ''
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const renderMenuItem = (item: NavigationMenuItem, depth: number = 0) => {
    const isActive = item.id === activeItemId;
    const isExpanded = expandedItems.has(item.id);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <li key={item.id} style={{ listStyle: 'none' }}>
        <button
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.id);
            }
            if (onItemClick) {
              onItemClick(item);
            }
          }}
          style={{
            width: '100%',
            padding: `12px 24px 12px ${24 + depth * 16}px`,
            border: 'none',
            backgroundColor: isActive ? '#F5F5F5' : 'transparent',
            color: '#111111',
            fontSize: '14px',
            fontWeight: isActive ? 700 : 400,
            textAlign: 'left',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => {
            if (!isActive) e.currentTarget.style.backgroundColor = '#F5F5F5';
          }}
          onMouseLeave={(e) => {
            if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          {item.label}
          {hasChildren && (
            <span style={{ marginLeft: 'auto' }}>
              {isExpanded ? '▼' : '▶'}
            </span>
          )}
        </button>
        {hasChildren && isExpanded && (
          <ul style={{ margin: 0, padding: 0 }}>
            {item.children!.map(child => renderMenuItem(child, depth + 1))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <nav className={`cwds-navigation-menu ${className}`} style={{
      width: '280px',
      backgroundColor: '#FFFFFF',
      borderRight: '1px solid #E0E0E0',
      height: '100vh',
      overflowY: 'auto'
    }}>
      <ul style={{ margin: 0, padding: '8px 0' }}>
        {items.map(item => renderMenuItem(item))}
      </ul>
    </nav>
  );
};

export default NavigationMenu;
