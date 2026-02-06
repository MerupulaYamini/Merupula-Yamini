import React, { useState, useEffect } from 'react';
import { Menu, message, Modal } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  PlusCircleOutlined,
  AppstoreOutlined,
  MenuOutlined,
  LogoutOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { logoutUser, getCurrentUser, getUserProfilePicture } from '../../services/authService';
import {
  DashboardLayout,
  DashboardHeader,
  LogoContainer,
  UserSection,
  UserAvatar,
  DashboardSider,
  DashboardContent,
  MenuButton,
  MobileOverlay
} from './layout.styles';

const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);
  const [profilePictureError, setProfilePictureError] = useState(false);
  
  // Check if current user is admin
  const currentUser = getCurrentUser();
  const isAdmin = currentUser.roles && currentUser.roles.includes('ADMIN');
  
  // Load profile picture on mount
  // Same blob URL approach as Profile page - works well with auth headers
  useEffect(() => {
    const loadProfilePicture = async () => {
      if (currentUser.userId) {
        try {
          const blob = await getUserProfilePicture(currentUser.userId);
          const objectUrl = URL.createObjectURL(blob);
          setProfilePictureUrl(objectUrl);
          setProfilePictureError(false);
        } catch (error) {
          console.error('Failed to load profile picture:', error);
          setProfilePictureError(true); // Fall back to default avatar
        }
      }
    };
    
    loadProfilePicture();
    
    // Cleanup to prevent memory leaks
    return () => {
      if (profilePictureUrl) {
        URL.revokeObjectURL(profilePictureUrl);
      }
    };
  }, [currentUser.userId]);
  
  const handleProfilePictureError = () => {
    setProfilePictureError(true);
  };
  
  // Get current page from URL path for menu highlighting
  // This keeps the menu in sync when navigating via browser back/forward
  const getCurrentKey = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'dashboard';
    if (path === '/user-management') return 'user-management';
    if (path === '/create-ticket') return 'create-ticket';
    if (path === '/my-tickets') return 'my-tickets';
    return 'dashboard'; // Default fallback
  };

  const [selectedKey, setSelectedKey] = useState(getCurrentKey());

  // Build menu items based on user role
  // Admin sees User Management + Create Ticket
  // Employee sees View My Tickets instead
  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    // Only show User Management for Admin
    ...(isAdmin ? [{
      key: 'user-management',
      icon: <UserOutlined />,
      label: 'User Management',
    }] : []),
    // Show Create Ticket for Admin, View My Tickets for Employee
    ...(isAdmin ? [{
      key: 'create-ticket',
      icon: <PlusCircleOutlined />,
      label: 'Create Ticket',
    }] : [{
      key: 'my-tickets',
      icon: <AppstoreOutlined />,
      label: 'View My Tickets',
    }]),
    // Logout button at the bottom - fixed position via CSS
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      danger: true,
      className: 'logout-item'
    }
  ];

  const handleMenuClick = (e) => {
    // Handle logout separately with confirmation modal
    if (e.key === 'logout') {
      handleLogoutClick();
      return;
    }

    setSelectedKey(e.key);
    setSidebarOpen(false); // Close sidebar on mobile after selection - better UX
    
    // Navigate to the selected page
    switch (e.key) {
      case 'dashboard':
        navigate('/dashboard');
        break;
      case 'user-management':
        navigate('/user-management');
        break;
      case 'create-ticket':
        navigate('/create-ticket');
        break;
      case 'my-tickets':
        navigate('/my-tickets');
        break;
      default:
        navigate('/dashboard');
    }
  };

  // Logout with confirmation - prevents accidental logouts
  const handleLogoutClick = () => {
    Modal.confirm({
      title: 'Confirm Logout',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to logout?',
      okText: 'Logout',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await logoutUser();
          message.success('Logged out successfully');
          navigate('/login');
        } catch (error) {
          // Even if API fails, clear local storage and redirect
          // Better to force logout than leave user in weird state
          localStorage.clear();
          message.info('Logged out');
          navigate('/login');
        }
      }
    });
    setSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <DashboardLayout>
      <DashboardHeader>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <MenuButton onClick={toggleSidebar}>
            <MenuOutlined />
          </MenuButton>
          <LogoContainer>
            <AppstoreOutlined className="logo-icon" />
            <h1 className="logo-text">TicketFlow</h1>
          </LogoContainer>
        </div>
        
        <UserSection>
          <UserAvatar 
            icon={<UserOutlined />} 
            onClick={handleProfileClick}
            src={!profilePictureError && profilePictureUrl ? profilePictureUrl : undefined}
            onError={handleProfilePictureError}
          />
        </UserSection>
      </DashboardHeader>

      <DashboardLayout>
        {sidebarOpen && <MobileOverlay onClick={closeSidebar} />}
        
        <DashboardSider width={200} className={sidebarOpen ? 'open' : ''}>
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            items={menuItems}
            onClick={handleMenuClick}
            style={{ height: '100%', paddingTop: '16px', display: 'flex', flexDirection: 'column' }}
          />
        </DashboardSider>

        <DashboardContent>
          {children}
        </DashboardContent>
      </DashboardLayout>
    </DashboardLayout>
  );
};

export default MainLayout;