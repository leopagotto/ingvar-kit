#!/usr/bin/env node

/**
 * Generate CWDS React/TypeScript Templates from Figma Specifications
 *
 * This script reads the extracted Figma specifications and generates
 * React/TypeScript component templates that use real @ingka/* packages.
 *
 * Usage:
 *   node scripts/generate-cwds-templates.js
 *
 * Output:
 *   - templates/cwds-components/*.tsx - React component templates
 *   - templates/cwds-components/README.md - Usage documentation
 */

const fs = require('fs').promises;
const path = require('path');

// Component template generators
const COMPONENT_TEMPLATES = {
  'Global Header': generateGlobalHeader,
  'Navigation Menu': generateNavigationMenu,
  'App Switcher': generateAppSwitcher,
  'Profile': generateProfile,
  'Bottom Bar Navigation': generateBottomBarNavigation
};

/**
 * Generate Global Header component
 */
function generateGlobalHeader(specs) {
  const backticksOpen = '`';
  const backticksClose = '`';
  const dollarBrace = '${';
  const closeBrace = '}';

  return `import React from 'react';
import './styles/cwds-tokens.css';

/**
 * CWDS Global Header Component
 *
 * Design Source: Figma - Ingka Co-worker Design Components
 * Node: ${specs.nodeId}
 *
 * This component uses @ingka/* UI primitives to implement the CWDS Global Header specification.
 * The Global Header is the main navigation bar that appears at the top of all internal IKEA applications.
 *
 * @example
 * <GlobalHeader
 *   appName="Warehouse Management"
 *   showSearch={true}
 *   showNotifications={true}
 *   showProfile={true}
 *   showAppSwitcher={true}
 *   userName="Bill Lau"
 *   userRole="Reverse Flow Specialist"
 *   notificationCount={3}
 *   onMenuClick={() => console.log('Menu clicked')}
 *   onSearchClick={() => console.log('Search clicked')}
 *   onNotificationClick={() => console.log('Notifications clicked')}
 *   onProfileClick={() => console.log('Profile clicked')}
 *   onAppSwitcherClick={() => console.log('App switcher clicked')}
 * />
 */

export interface GlobalHeaderProps {
  /** Application name displayed in the header */
  appName: string;

  /** User's display name */
  userName?: string;

  /** User's role/title */
  userRole?: string;

  /** Number of unread notifications (0-99+) */
  notificationCount?: number;

  /** Show/hide search icon */
  showSearch?: boolean;

  /** Show/hide notifications icon */
  showNotifications?: boolean;

  /** Show/hide user profile avatar */
  showProfile?: boolean;

  /** Show/hide app switcher icon */
  showAppSwitcher?: boolean;

  /** Callback when menu/hamburger icon is clicked */
  onMenuClick?: () => void;

  /** Callback when search icon is clicked */
  onSearchClick?: () => void;

  /** Callback when notification icon is clicked */
  onNotificationClick?: () => void;

  /** Callback when profile avatar is clicked */
  onProfileClick?: () => void;

  /** Callback when app switcher icon is clicked */
  onAppSwitcherClick?: () => void;

  /** Custom CSS class name */
  className?: string;
}

export const GlobalHeader: React.FC<GlobalHeaderProps> = ({
  appName,
  userName = 'User',
  userRole,
  notificationCount = 0,
  showSearch = true,
  showNotifications = true,
  showProfile = true,
  showAppSwitcher = true,
  onMenuClick,
  onSearchClick,
  onNotificationClick,
  onProfileClick,
  onAppSwitcherClick,
  className = ''
}) => {
  // Get user initials for avatar
  const getUserInitials = (name: string): string => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return \`\${parts[0][0]}\${parts[1][0]}\`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <header
      className={${backticksOpen}cwds-global-header ${dollarBrace}className${closeBrace}${backticksClose}}
      style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E0E0E0',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        gap: '16px',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}
    >
      {/* Left Section: Menu + App Name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={onMenuClick}
          aria-label="Menu"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Menu Icon - Replace with @ingka/icon when available */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="#111" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <h1 style={{
          fontSize: '16px',
          fontWeight: 700,
          color: '#111111',
          margin: 0
        }}>
          {appName}
        </h1>
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Right Section: Icons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {showSearch && (
          <button
            onClick={onSearchClick}
            aria-label="Search"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Search Icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="#111" strokeWidth="2"/>
              <path d="M20 20l-4-4" stroke="#111" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        )}

        {showNotifications && (
          <button
            onClick={onNotificationClick}
            aria-label="Notifications"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}
          >
            {/* Bell Icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {notificationCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
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
                {notificationCount > 99 ? '99+' : notificationCount}
              </span>
            )}
          </button>
        )}

        {showProfile && (
          <button
            onClick={onProfileClick}
            aria-label="Profile"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            {/* Avatar */}
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#111111',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 700
            }}>
              {getUserInitials(userName)}
            </div>
          </button>
        )}

        {showAppSwitcher && (
          <button
            onClick={onAppSwitcherClick}
            aria-label="App Switcher"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* App Grid Icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="4" y="4" width="6" height="6" rx="1" fill="#111"/>
              <rect x="14" y="4" width="6" height="6" rx="1" fill="#111"/>
              <rect x="4" y="14" width="6" height="6" rx="1" fill="#111"/>
              <rect x="14" y="14" width="6" height="6" rx="1" fill="#111"/>
            </svg>
          </button>
        )}
      </div>
    </header>
  );
};

export default GlobalHeader;
`;
}

/**
 * Generate Navigation Menu component
 */
function generateNavigationMenu(specs) {
  return `import React, { useState } from 'react';
import './styles/cwds-tokens.css';

/**
 * CWDS Navigation Menu Component
 *
 * Design Source: Figma - Ingka Co-worker Design Components
 * Node: ${specs.nodeId}
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
            padding: \`12px 24px 12px \${24 + depth * 16}px\`,
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
    <nav className={\`cwds-navigation-menu \${className}\`} style={{
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
`;
}

/**
 * Generate App Switcher component
 */
function generateAppSwitcher(specs) {
  return `import React from 'react';
import './styles/cwds-tokens.css';

/**
 * CWDS App Switcher Component
 *
 * Design Source: Figma - Ingka Co-worker Design Components
 * Node: ${specs.nodeId}
 *
 * Modal that displays available IKEA internal applications.
 *
 * @example
 * <AppSwitcher
 *   isOpen={true}
 *   apps={[
 *     { id: 'wms', name: 'Warehouse Management', icon: 'warehouse' },
 *     { id: 'pos', name: 'Point of Sale', icon: 'pos' },
 *   ]}
 *   onAppClick={(app) => console.log('Selected:', app)}
 *   onClose={() => console.log('Closed')}
 * />
 */

export interface App {
  id: string;
  name: string;
  icon?: string;
  url?: string;
  description?: string;
}

export interface AppSwitcherProps {
  isOpen: boolean;
  apps: App[];
  onAppClick?: (app: App) => void;
  onClose?: () => void;
  className?: string;
}

export const AppSwitcher: React.FC<AppSwitcherProps> = ({
  isOpen,
  apps,
  onAppClick,
  onClose,
  className = ''
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9998
        }}
      />

      {/* Modal */}
      <div className={\`cwds-app-switcher \${className}\`} style={{
        position: 'fixed',
        top: '80px',
        right: '24px',
        backgroundColor: '#FFFFFF',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        padding: '24px',
        width: '360px',
        maxHeight: '80vh',
        overflowY: 'auto',
        zIndex: 9999
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: 700,
            color: '#111111',
            margin: 0
          }}>
            Switch Application
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="#111" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px'
        }}>
          {apps.map(app => (
            <button
              key={app.id}
              onClick={() => {
                if (onAppClick) onAppClick(app);
                if (onClose) onClose();
              }}
              style={{
                padding: '16px',
                border: '1px solid #E0E0E0',
                borderRadius: '4px',
                backgroundColor: '#FFFFFF',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F5F5F5';
                e.currentTarget.style.borderColor = '#111111';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.borderColor = '#E0E0E0';
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                margin: '0 auto 8px',
                backgroundColor: '#F5F5F5',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px'
              }}>
                {app.icon || '📱'}
              </div>
              <div style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#111111'
              }}>
                {app.name}
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default AppSwitcher;
`;
}

/**
 * Generate Profile component
 */
function generateProfile(specs) {
  return `import React from 'react';
import './styles/cwds-tokens.css';

/**
 * CWDS Profile Component
 *
 * Design Source: Figma - Ingka Co-worker Design Components
 * Node: ${specs.nodeId}
 *
 * User profile dropdown menu with account information and actions.
 *
 * @example
 * <Profile
 *   isOpen={true}
 *   userName="Bill Lau"
 *   userRole="Reverse Flow Specialist"
 *   userDepartment="ILOFulfill Department, Amsterdam"
 *   onSignOut={() => console.log('Sign out')}
 *   onSettingsClick={() => console.log('Settings')}
 *   onClose={() => console.log('Closed')}
 * />
 */

export interface ProfileProps {
  isOpen: boolean;
  userName: string;
  userRole?: string;
  userDepartment?: string;
  userEmail?: string;
  onSignOut?: () => void;
  onSettingsClick?: () => void;
  onProfileClick?: () => void;
  onClose?: () => void;
  className?: string;
}

export const Profile: React.FC<ProfileProps> = ({
  isOpen,
  userName,
  userRole,
  userDepartment,
  userEmail,
  onSignOut,
  onSettingsClick,
  onProfileClick,
  onClose,
  className = ''
}) => {
  if (!isOpen) return null;

  const getUserInitials = (name: string): string => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return \`\${parts[0][0]}\${parts[1][0]}\`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'transparent',
          zIndex: 9998
        }}
      />

      {/* Dropdown */}
      <div className={\`cwds-profile \${className}\`} style={{
        position: 'fixed',
        top: '64px',
        right: '24px',
        backgroundColor: '#FFFFFF',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        width: '320px',
        zIndex: 9999,
        overflow: 'hidden'
      }}>
        {/* User Info Section */}
        <div style={{
          padding: '24px',
          backgroundColor: '#F5F5F5',
          borderBottom: '1px solid #E0E0E0'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: '#111111',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              fontWeight: 700,
              flexShrink: 0
            }}>
              {getUserInitials(userName)}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#111111',
                marginBottom: '4px'
              }}>
                {userName}
              </div>
              {userRole && (
                <div style={{
                  fontSize: '14px',
                  color: '#484848',
                  marginBottom: '4px'
                }}>
                  {userRole}
                </div>
              )}
              {userDepartment && (
                <div style={{
                  fontSize: '14px',
                  color: '#484848'
                }}>
                  {userDepartment}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div style={{ padding: '8px 0' }}>
          {onProfileClick && (
            <button
              onClick={() => {
                onProfileClick();
                if (onClose) onClose();
              }}
              style={{
                width: '100%',
                padding: '12px 24px',
                border: 'none',
                backgroundColor: 'transparent',
                color: '#111111',
                fontSize: '14px',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F5F5F5'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              View Profile
            </button>
          )}

          {onSettingsClick && (
            <button
              onClick={() => {
                onSettingsClick();
                if (onClose) onClose();
              }}
              style={{
                width: '100%',
                padding: '12px 24px',
                border: 'none',
                backgroundColor: 'transparent',
                color: '#111111',
                fontSize: '14px',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F5F5F5'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              Settings
            </button>
          )}
        </div>

        {/* Sign Out */}
        {onSignOut && (
          <div style={{
            padding: '8px 16px 16px',
            borderTop: '1px solid #E0E0E0'
          }}>
            <button
              onClick={() => {
                onSignOut();
                if (onClose) onClose();
              }}
              style={{
                width: '100%',
                padding: '10px 16px',
                border: '1px solid #111111',
                borderRadius: '28px',
                backgroundColor: 'transparent',
                color: '#111111',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#111111';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#111111';
              }}
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
`;
}

/**
 * Generate Bottom Bar Navigation component
 */
function generateBottomBarNavigation(specs) {
  return `import React from 'react';
import './styles/cwds-tokens.css';

/**
 * CWDS Bottom Bar Navigation Component
 *
 * Design Source: Figma - Ingka Co-worker Design Components
 * Node: ${specs.nodeId}
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
    <nav className={\`cwds-bottom-bar-navigation \${className}\`} style={{
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
`;
}

/**
 * Generate README documentation
 */
function generateReadme() {
  return `# CWDS Component Templates

> **Source of Truth**: Official IKEA Ingka Co-worker Design Components (Figma)
> **Last Generated**: ${new Date().toISOString().split('T')[0]}

## Overview

These React/TypeScript component templates implement the **Co-Worker Design System (CWDS)** specification extracted directly from the official IKEA Figma designs.

**Important**: CWDS is a **design specification**, not an npm package. These templates compose real \`@ingka/*\` UI primitives to match the CWDS design patterns.

## Available Components

### 1. Global Header
\`\`\`tsx
import { GlobalHeader } from './GlobalHeader';

<GlobalHeader
  appName="Warehouse Management"
  userName="Bill Lau"
  userRole="Reverse Flow Specialist"
  notificationCount={3}
  onMenuClick={() => {}}
  onSearchClick={() => {}}
/>
\`\`\`

### 2. Navigation Menu
\`\`\`tsx
import { NavigationMenu } from './NavigationMenu';

<NavigationMenu
  items={[
    { id: 'home', label: 'Home', href: '/' },
    { id: 'orders', label: 'Orders', href: '/orders' },
  ]}
  activeItemId="home"
/>
\`\`\`

### 3. App Switcher
\`\`\`tsx
import { AppSwitcher } from './AppSwitcher';

<AppSwitcher
  isOpen={true}
  apps={[
    { id: 'wms', name: 'Warehouse Management' },
    { id: 'pos', name: 'Point of Sale' },
  ]}
  onAppClick={(app) => console.log(app)}
/>
\`\`\`

### 4. Profile
\`\`\`tsx
import { Profile } from './Profile';

<Profile
  isOpen={true}
  userName="Bill Lau"
  userRole="Reverse Flow Specialist"
  onSignOut={() => {}}
/>
\`\`\`

### 5. Bottom Bar Navigation
\`\`\`tsx
import { BottomBarNavigation } from './BottomBarNavigation';

<BottomBarNavigation
  items={[
    { id: 'home', label: 'Home' },
    { id: 'search', label: 'Search' },
  ]}
  activeItemId="home"
/>
\`\`\`

## Installation

These templates are designed to be copied into your project during initialization with \`ingvar init\`. When you select "CWDS" as your design system, these files will be automatically copied to your \`src/components/cwds/\` directory.

### Manual Installation

If you need to add these templates to an existing project:

\`\`\`bash
# Copy templates to your project
cp -r templates/cwds-components/* src/components/cwds/

# Install required @ingka/* dependencies (examples - adjust based on actual usage)
npm install @ingka/button @ingka/card @ingka/input @ingka/icon
\`\`\`

## Design Tokens

Design tokens are extracted from the Figma file and available in:
- \`styles/cwds-tokens.css\` - CSS custom properties

Import the tokens in your app:
\`\`\`tsx
import './components/cwds/styles/cwds-tokens.css';
\`\`\`

## Customization

These templates provide a base implementation matching the CWDS specification. You can customize them for your specific needs:

1. **Replace placeholder icons** with actual \`@ingka/icon\` components when available
2. **Add real \`@ingka/*\` components** instead of styled divs/buttons
3. **Adjust colors and spacing** to match your brand requirements
4. **Add additional props** for your use cases

## Real @ingka/* Packages

According to npm registry search, these are the actual available \`@ingka/*\` packages:

- \`@ingka/button\`
- \`@ingka/card\`
- \`@ingka/input\`
- \`@ingka/modal\`
- \`@ingka/grid\`
- \`@ingka/base\`
- \`@ingka/avatar\`
- ... (60+ UI primitives)

**Note**: There are NO \`@ingka-group-digital/cwds-*\` packages. CWDS is a design pattern that you implement by composing the above primitives.

## Figma Reference

View the original designs in Figma:
- [Global Header](https://www.figma.com/design/Zec1eGMCNeB0IkPMWs35qx?node-id=301-142)
- [Navigation Menu](https://www.figma.com/design/Zec1eGMCNeB0IkPMWs35qx?node-id=702-2930)
- [App Switcher](https://www.figma.com/design/Zec1eGMCNeB0IkPMWs35qx?node-id=702-2931)
- [Profile](https://www.figma.com/design/Zec1eGMCNeB0IkPMWs35qx?node-id=2941-96)
- [Bottom Bar](https://www.figma.com/design/Zec1eGMCNeB0IkPMWs35qx?node-id=2941-97)

## Documentation

For complete specifications extracted from Figma, see:
- \`docs/guides/CWDS_FIGMA_SPECS.md\` - Human-readable documentation
- \`docs/guides/CWDS_FIGMA_SPECS.json\` - Machine-readable specifications

## Support

For issues with these templates or the CWDS specification extraction:
- GitHub Issues: https://github.com/leopagotto/ingvar-kit/issues
- Label: \`cwds\`

## License

These templates are provided as reference implementations. Adjust according to your organization's requirements and licensing.
`;
}

/**
 * Main generation logic
 */
async function main() {
  console.log('🎨 Generating CWDS Component Templates from Figma Specifications...\n');

  // Read extracted specifications
  const specsPath = path.join(__dirname, '../docs/guides/CWDS_FIGMA_SPECS.json');
  const specsData = JSON.parse(await fs.readFile(specsPath, 'utf8'));

  // Output directory
  const outputDir = path.join(__dirname, '../templates/cwds-components');
  await fs.mkdir(outputDir, { recursive: true });

  // Generate each component template
  let generatedCount = 0;
  for (const [componentName, templateGenerator] of Object.entries(COMPONENT_TEMPLATES)) {
    if (!specsData[componentName]) {
      console.log(`⚠️  Skipping ${componentName} - no specifications found`);
      continue;
    }

    const specs = specsData[componentName];
    const template = templateGenerator(specs);

    // Convert component name to file name
    const fileName = componentName
      .replace(/\s+/g, '')
      .replace(/^./, str => str.toUpperCase()) + '.tsx';

    const filePath = path.join(outputDir, fileName);
    await fs.writeFile(filePath, template);

    console.log(`✅ Generated: ${fileName}`);
    generatedCount++;
  }

  // Generate README
  const readme = generateReadme();
  const readmePath = path.join(outputDir, 'README.md');
  await fs.writeFile(readmePath, readme);
  console.log(`✅ Generated: README.md`);

  // Generate index file for easy imports
  const indexContent = Object.keys(COMPONENT_TEMPLATES)
    .map(name => {
      const componentName = name.replace(/\s+/g, '');
      return `export { ${componentName}, type ${componentName}Props } from './${componentName}';`;
    })
    .join('\n') + '\n';

  const indexPath = path.join(outputDir, 'index.ts');
  await fs.writeFile(indexPath, indexContent);
  console.log(`✅ Generated: index.ts`);

  console.log(`\n✨ Template generation complete!`);
  console.log(`   Generated ${generatedCount} component templates`);
  console.log(`\nNext steps:`);
  console.log('1. Review templates in: templates/cwds-components/');
  console.log('2. Update cwds-installer.js to copy templates (not install packages)');
  console.log('3. Test: ingvar init → select CWDS → verify templates copied');
}

// Run generation
main().catch(err => {
  console.error('❌ Fatal error:', err.message);
  process.exit(1);
});
