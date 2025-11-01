import React from 'react';
import './styles/cwds-tokens.css';

/**
 * CWDS Profile Component
 * 
 * Design Source: Figma - Ingka Co-worker Design Components
 * Node: 2941:96
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
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
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
      <div className={`cwds-profile ${className}`} style={{
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
