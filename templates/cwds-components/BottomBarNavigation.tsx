import React from 'react';
import './styles/cwds-tokens.css';

/**
 * CWDS Bottom Bar Navigation Component
 * 
 * Design Source: Figma - Ingka Co-worker Design Components
 * Node: 2941:97
 * 
 * Bottom navigation bar for mobile views.
 * 
 * @example
 * <BottomBarNavigation
 *   items={[
 *     { id: 'home', label: 'Home', icon: 'home' },
 *     { id: 'search', label: 'Search', icon: 'search' },
 *     { id: 'profile', label: 'Profile', icon: 'profile' },
 *   ]}
 *   activeItemId="home"
 *   onItemClick={(item) => console.log('Clicked:', item)}
 * />
 */

export interface BottomNavItem {
  id: string;
  label: string;
  icon?: string;
  badge?: number;
}

export interface BottomBarNavigationProps {
  items: BottomNavItem[];
  activeItemId?: string;
  onItemClick?: (item: BottomNavItem) => void;
  className?: string;
}

export const BottomBarNavigation: React.FC<BottomBarNavigationProps> = ({
  items,
  activeItemId,
  onItemClick,
  className = ''
}) => {
  return (
    <nav className={`cwds-bottom-bar-navigation ${className}`} style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#FFFFFF',
      borderTop: '1px solid #E0E0E0',
      display: 'flex',
      justifyContent: 'space-around',
      padding: '8px 0',
      zIndex: 1000
    }}>
      {items.map(item => {
        const isActive = item.id === activeItemId;
        
        return (
          <button
            key={item.id}
            onClick={() => onItemClick && onItemClick(item)}
            style={{
              flex: 1,
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              position: 'relative'
            }}
          >
            {/* Icon placeholder */}
            <div style={{
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              <div style={{
                width: '20px',
                height: '20px',
                backgroundColor: isActive ? '#111111' : '#909090',
                borderRadius: '4px'
              }} />
              {item.badge && item.badge > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  backgroundColor: '#E00751',
                  color: '#FFFFFF',
                  fontSize: '10px',
                  fontWeight: 700,
                  borderRadius: '999px',
                  minWidth: '16px',
                  height: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 4px'
                }}>
                  {item.badge > 99 ? '99+' : item.badge}
                </span>
              )}
            </div>
            
            <span style={{
              fontSize: '12px',
              color: isActive ? '#111111' : '#909090',
              fontWeight: isActive ? 600 : 400
            }}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomBarNavigation;
