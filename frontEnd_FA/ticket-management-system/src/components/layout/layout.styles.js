import styled from 'styled-components';
import { Layout, Menu, Avatar } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

// Breakpoints
const breakpoints = {
  mobile: '576px',
  tablet: '768px',
  desktop: '992px',
  large: '1200px'
};

export const DashboardLayout = styled(Layout)`
  min-height: 100vh;
`;

export const DashboardHeader = styled(Header)`
  background: #fff;
  padding: 0 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f0f0f0;
  position: sticky;
  top: 0;
  z-index: 10;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 0 16px;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  
  .logo-icon {
    color: #1890ff;
    font-size: 24px;

    @media (max-width: ${breakpoints.mobile}) {
      font-size: 20px;
    }
  }
  
  .logo-text {
    color: #1890ff;
    font-size: 20px;
    font-weight: 600;
    margin: 0;

    @media (max-width: ${breakpoints.mobile}) {
      font-size: 16px;
    }

    @media (max-width: 400px) {
      display: none;
    }
  }
`;

export const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: ${breakpoints.mobile}) {
    gap: 8px;
  }
`;

export const UserAvatar = styled(Avatar)`
  background-color: #1890ff;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 2px 8px rgba(24, 144, 255, 0.3);
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 32px;
    height: 32px;
  }
`;

export const DashboardSider = styled(Sider)`
  background: #fff;
  border-right: 1px solid #f0f0f0;
  
  .ant-menu {
    border-right: none;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .ant-menu-item {
    margin: 4px 8px;
    border-radius: 6px;
    
    &.ant-menu-item-selected {
      background-color: #e6f7ff;
      
      .ant-menu-item-icon,
      .ant-menu-title-content {
        color: #1890ff;
      }
    }

    &:last-child {
      margin-top: auto;
      margin-bottom: 16px;
      border: 1.5px solid #ffccc7;
      
      &:hover {
        background-color: #fff2f0;
        border-color: #ff4d4f;
        
        .ant-menu-item-icon,
        .ant-menu-title-content {
          color: #ff4d4f;
        }
      }
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    position: fixed;
    left: 0;
    top: 64px;
    bottom: 0;
    z-index: 1000;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);

    &.open {
      transform: translateX(0);
    }
  }
`;

export const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 20px;
  color: #262626;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f0f0f0;
    color: #1890ff;
  }

  &:active {
    background-color: #e6e6e6;
  }

  @media (max-width: ${breakpoints.tablet}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const MobileOverlay = styled.div`
  display: none;

  @media (max-width: ${breakpoints.tablet}) {
    display: block;
    position: fixed;
    top: 64px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.45);
    z-index: 999;
  }
`;

export const DashboardContent = styled(Content)`
  padding: 24px;
  background: #f5f5f5;
  min-height: calc(100vh - 64px);

  @media (max-width: ${breakpoints.tablet}) {
    padding: 16px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 12px;
  }
`;

export const LogoutIcon = styled(LogoutOutlined)`
  font-size: 16px;
  cursor: pointer;
  color: #8c8c8c;
  
  &:hover {
    color: #1890ff;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 14px;
  }
`;