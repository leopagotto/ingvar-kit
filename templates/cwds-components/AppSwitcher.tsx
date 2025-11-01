import React from 'react';
import './styles/cwds-tokens.css';

/**
 * CWDS App Switcher Component
 * 
 * Design Source: Figma - Ingka Co-worker Design Components
 * Node: 702:2931
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
      <div className={`cwds-app-switcher ${className}`} style={{
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
