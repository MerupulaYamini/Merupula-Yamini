import React, { useState } from 'react';
import { Menu, message } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  PlusCircleOutlined,
  AppstoreOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { logoutUser, getCurrentUser } from '../../services/authService';
import {
  DashboardLayout,
  DashboardHeader,
  LogoContainer,
  UserSection,
  UserAvatar,
  DashboardSider,
  DashboardContent,
  LogoutIcon
} from './layout.styles';

const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if current user is admin
  const currentUser = getCurrentUser();
  const isAdmin = currentUser.roles && currentUser.roles.includes('ADMIN');
  
  // Get current page from URL path
  const getCurrentKey = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'dashboard';
    if (path === '/user-management') return 'user-management';
    if (path === '/create-ticket') return 'create-ticket';
    if (path === '/my-tickets') return 'my-tickets';
    return 'dashboard';
  };

  const [selectedKey, setSelectedKey] = useState(getCurrentKey());

  // Build menu items based on user role
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
  ];

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
    
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

  const handleLogout = async () => {
    try {
      await logoutUser();
      message.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if API fails, clear local storage and redirect
      localStorage.clear();
      message.info('Logged out');
      navigate('/login');
    }
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <DashboardLayout>
      <DashboardHeader>
        <LogoContainer>
          <AppstoreOutlined className="logo-icon" />
          <h1 className="logo-text">TicketFlow</h1>
        </LogoContainer>
        
        <UserSection>
          <UserAvatar icon={<UserOutlined />} onClick={handleProfileClick} />
          <LogoutIcon onClick={handleLogout} />
        </UserSection>
      </DashboardHeader>

      <DashboardLayout>
        <DashboardSider width={200}>
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            items={menuItems}
            onClick={handleMenuClick}
            style={{ height: '100%', paddingTop: '16px' }}
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