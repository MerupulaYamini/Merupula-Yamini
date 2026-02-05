import React, { useState } from 'react';
import { Menu, Avatar, message } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  PlusCircleOutlined,
  AppstoreOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
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
  
  // Get current page from URL path
  const getCurrentKey = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'dashboard';
    if (path === '/user-management') return 'user-management';
    if (path === '/create-ticket') return 'create-ticket';
    return 'dashboard';
  };

  const [selectedKey, setSelectedKey] = useState(getCurrentKey());

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: 'user-management',
      icon: <UserOutlined />,
      label: 'User Management',
    },
    {
      key: 'create-ticket',
      icon: <PlusCircleOutlined />,
      label: 'Create Ticket',
    },
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
      default:
        navigate('/dashboard');
    }
  };

  const handleLogout = () => {
    message.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <DashboardLayout>
      <DashboardHeader>
        <LogoContainer>
          <AppstoreOutlined className="logo-icon" />
          <h1 className="logo-text">TicketFlow</h1>
        </LogoContainer>
        
        <UserSection>
          <UserAvatar icon={<UserOutlined />} />
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