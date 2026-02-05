import styled from 'styled-components';
import { Layout, Menu, Card, Button, Avatar, Input } from 'antd';
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

export const PageTitle = styled.h1`
  color: #262626;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const PageSubtitle = styled.p`
  color: #8c8c8c;
  font-size: 16px;
  margin-bottom: 24px;
`;

export const PendingCard = styled(Card)`
  .ant-card-head {
    border-bottom: 2px solid #1890ff;
    
    .ant-card-head-title {
      color: #262626;
      font-size: 18px;
      font-weight: 600;
    }
  }
  
  .ant-card-body {
    padding: 0;
  }
`;

export const UserItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const UserDetails = styled.div`
  .user-name {
    color: #262626;
    font-size: 14px;
    font-weight: 500;
    margin: 0 0 4px 0;
  }
  
  .user-email {
    color: #8c8c8c;
    font-size: 12px;
    margin: 0;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

export const AcceptButton = styled(Button)`
  background-color: #52c41a;
  border-color: #52c41a;
  color: white;
  
  &:hover {
    background-color: #73d13d;
    border-color: #73d13d;
  }
`;

export const DeclineButton = styled(Button)`
  background-color: #ff4d4f;
  border-color: #ff4d4f;
  color: white;
  
  &:hover {
    background-color: #ff7875;
    border-color: #ff7875;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: #fafafa;
  border-top: 1px solid #f0f0f0;
`;

export const ShowingText = styled.span`
  color: #8c8c8c;
  font-size: 14px;
`;

export const PaginationButtons = styled.div`
  display: flex;
  gap: 8px;
`;

export const PaginationButton = styled(Button)`
  &:disabled {
    color: #d9d9d9;
    border-color: #d9d9d9;
  }
`;

// Ticket Management Components
export const TicketSection = styled.div`
  margin-top: 24px;
`;

export const SectionTitle = styled.h2`
  color: #262626;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
`;

export const TicketHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 16px;
`;

export const CreateTicketButton = styled(Button)`
  background-color: #1890ff;
  border-color: #1890ff;
  color: white;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background-color: #40a9ff;
    border-color: #40a9ff;
  }
`;

export const TicketFilters = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
`;

export const SearchInput = styled(Input)`
  width: 250px;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const FilterSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  background: white;
  color: #262626;
  font-size: 14px;
  min-width: 120px;
  
  &:hover {
    border-color: #40a9ff;
  }
  
  &:focus {
    outline: none;
    border-color: #1890ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
`;

export const TicketTable = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  overflow: hidden;
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 100px 2fr 120px 120px 150px 120px 100px;
  background: #fafafa;
  border-bottom: 1px solid #f0f0f0;
  padding: 16px;
  font-weight: 600;
  color: #8c8c8c;
  font-size: 12px;
  text-transform: uppercase;
  
  @media (max-width: 1200px) {
    grid-template-columns: 80px 2fr 100px 100px 120px 100px 80px;
    font-size: 11px;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 100px 2fr 120px 120px 150px 120px 100px;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
  align-items: center;
  
  &:hover {
    background-color: #fafafa;
  }
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: 1200px) {
    grid-template-columns: 80px 2fr 100px 100px 120px 100px 80px;
  }
  
  @media (max-width: 768px) {
    display: block;
    padding: 16px;
    border-bottom: 2px solid #f0f0f0;
  }
`;

export const TicketId = styled.span`
  font-family: 'Courier New', monospace;
  font-weight: 600;
  color: #262626;
  font-size: 12px;
`;

export const TicketTitle = styled.span`
  color: #262626;
  font-size: 14px;
  font-weight: 500;
`;

export const LabelTag = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  
  &.new-feature {
    background-color: #e6f7ff;
    color: #1890ff;
  }
  
  &.bug {
    background-color: #fff2e8;
    color: #fa541c;
  }
  
  &.improvement {
    background-color: #f6ffed;
    color: #52c41a;
  }
`;

export const StatusTag = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  
  &.in-progress {
    background-color: #e6f7ff;
    color: #1890ff;
  }
  
  &.todo {
    background-color: #f0f0f0;
    color: #8c8c8c;
  }
  
  &.review {
    background-color: #fff7e6;
    color: #fa8c16;
  }
  
  &.ready-to-deploy {
    background-color: #f6ffed;
    color: #52c41a;
  }
`;

export const UserName = styled.span`
  color: #262626;
  font-size: 13px;
`;

export const ActionMenu = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const DeleteButton = styled(Button)`
  background-color: #ff4d4f;
  border-color: #ff4d4f;
  color: white;
  padding: 4px 8px;
  height: auto;
  
  &:hover {
    background-color: #ff7875;
    border-color: #ff7875;
  }
`;

export const MoreButton = styled(Button)`
  border: none;
  background: none;
  color: #8c8c8c;
  padding: 4px;
  height: auto;
  
  &:hover {
    color: #1890ff;
    background: #f0f8ff;
  }
`;

export const NoTicketsMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #8c8c8c;
  background: white;
  border-radius: 8px;
  margin-top: 16px;
  font-size: 14px;
`;

export const UserAvatarColored = styled(Avatar)`
  background-color: ${props => props.bgcolor || '#1890ff'};
`;

export const LogoutIcon = styled(LogoutOutlined)`
  font-size: 16px;
  cursor: pointer;
  color: #8c8c8c;
  
  &:hover {
    color: #1890ff;
  }
`;