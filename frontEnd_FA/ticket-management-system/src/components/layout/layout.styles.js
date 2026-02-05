import styled from 'styled-components';
import { Layout, Menu, Avatar } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

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
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  
  .logo-icon {
    color: #1890ff;
    font-size: 24px;
  }
  
  .logo-text {
    color: #1890ff;
    font-size: 20px;
    font-weight: 600;
    margin: 0;
  }
`;

export const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const UserAvatar = styled(Avatar)`
  background-color: #1890ff;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 2px 8px rgba(24, 144, 255, 0.3);
  }
`;

export const DashboardSider = styled(Sider)`
  background: #fff;
  border-right: 1px solid #f0f0f0;
  
  .ant-menu {
    border-right: none;
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
  }
`;

export const DashboardContent = styled(Content)`
  padding: 24px;
  background: #f5f5f5;
  min-height: calc(100vh - 64px);
`;

export const LogoutIcon = styled(LogoutOutlined)`
  font-size: 16px;
  cursor: pointer;
  color: #8c8c8c;
  
  &:hover {
    color: #1890ff;
  }
`;