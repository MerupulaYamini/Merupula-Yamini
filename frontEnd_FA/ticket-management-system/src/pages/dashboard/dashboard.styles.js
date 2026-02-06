import styled from 'styled-components';
import { Layout, Menu, Card, Button, Avatar, Input } from 'antd';
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

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 24px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 20px;
  }
`;

export const PageSubtitle = styled.p`
  color: #8c8c8c;
  font-size: 16px;
  margin-bottom: 24px;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 14px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 13px;
    margin-bottom: 16px;
  }
`;

export const PendingCard = styled(Card)`
  width: 100%;
  max-width: 1034px;
  min-height: 326px;
  height: auto;
  background: #FFFFFF;
  border-radius: 8px;
  border: 1.5px solid #d9d9d9;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08), 0px 0px 0px rgba(23, 26, 31, 0);
  
  &:hover {
    border-color: #1890ff;
    box-shadow: 0 4px 12px rgba(24, 144, 255, 0.1);
  }
  
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
    height: calc(326px - 57px); /* Subtract header height */
    overflow: hidden;
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

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    gap: 12px;
    padding: 12px 16px;
  }
`;

export const ShowingText = styled.span`
  color: #8c8c8c;
  font-size: 14px;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 12px;
  }
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

  @media (max-width: ${breakpoints.mobile}) {
    margin-top: 16px;
  }
`;

export const SectionTitle = styled.h2`
  color: #262626;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 18px;
    margin-bottom: 12px;
  }
`;

export const TicketHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 16px;

  @media (max-width: ${breakpoints.desktop}) {
    flex-direction: column;
    align-items: stretch;
  }
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

  @media (max-width: ${breakpoints.desktop}) {
    width: 100%;
    justify-content: center;
  }
`;

export const TicketFilters = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: ${breakpoints.desktop}) {
    width: 100%;
  }

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    gap: 8px;
  }
`;

export const SearchInput = styled(Input)`
  width: 250px;
  border: 1.5px solid #d9d9d9;
  border-radius: 6px;
  
  &:hover {
    border-color: #40a9ff;
  }
  
  &:focus,
  &:focus-within {
    border-color: #1890ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
  }
  
  @media (max-width: ${breakpoints.desktop}) {
    flex: 1;
    min-width: 200px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
  }
`;

export const FilterSelect = styled.select`
  padding: 8px 12px;
  border: 1.5px solid #d9d9d9;
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
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
  }

  @media (max-width: ${breakpoints.desktop}) {
    flex: 1;
    min-width: 150px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
  }
`;

export const TicketTable = styled.div`
  background: white;
  border-radius: 8px;
  border: 1.5px solid #d9d9d9;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  
  &:hover {
    border-color: #1890ff;
    box-shadow: 0 4px 12px rgba(24, 144, 255, 0.1);
  }

  @media (max-width: ${breakpoints.tablet}) {
    overflow-x: auto;
  }
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 100px minmax(150px, 250px) 110px 130px 140px 120px 100px;
  background: #fafafa;
  border-bottom: 2px solid #e8e8e8;
  padding: 16px;
  font-weight: 600;
  color: #8c8c8c;
  font-size: 12px;
  text-transform: uppercase;
  gap: 12px;
  
  @media (max-width: ${breakpoints.large}) {
    grid-template-columns: 80px minmax(120px, 200px) 100px 110px 120px 100px 80px;
    font-size: 11px;
    gap: 8px;
  }
  
  @media (max-width: ${breakpoints.tablet}) {
    min-width: 800px;
  }
`;

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 100px minmax(150px, 250px) 110px 130px 140px 120px 100px;
  padding: 16px;
  border-bottom: 1px solid #e8e8e8;
  align-items: center;
  transition: all 0.2s ease;
  gap: 12px;
  
  &:hover {
    background-color: #f8f9fa;
    border-left: 3px solid #1890ff;
    padding-left: 13px;
  }
  
  @media (max-width: ${breakpoints.large}) {
    grid-template-columns: 80px minmax(120px, 200px) 100px 110px 120px 100px 80px;
    gap: 8px;
  }
  
  @media (max-width: ${breakpoints.tablet}) {
    min-width: 800px;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

export const TicketId = styled.span`
  font-family: 'Courier New', monospace;
  font-weight: 600;
  color: #262626;
  font-size: 12px;
  
  @media (max-width: ${breakpoints.tablet}) {
    display: block;
    margin-bottom: 8px;
    
    &::before {
      content: 'Ticket ID: ';
      font-family: inherit;
      font-weight: 500;
      color: #8c8c8c;
      font-size: 11px;
      text-transform: uppercase;
    }
  }
`;

export const TicketTitle = styled.span`
  color: #262626;
  font-size: 14px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  
  @media (max-width: ${breakpoints.tablet}) {
    display: block;
    margin-bottom: 8px;
    font-size: 15px;
    font-weight: 600;
    white-space: normal;
  }
`;

export const LabelTag = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  display: inline-block;
  
  &.bug {
    background-color: #fff2e8;
    color: #fa541c;
  }
  
  &.feature {
    background-color: #e6f7ff;
    color: #1890ff;
  }
  
  &.task {
    background-color: #f9f0ff;
    color: #722ed1;
  }
  
  &.improvement {
    background-color: #f6ffed;
    color: #52c41a;
  }
  
  &.support {
    background-color: #fff7e6;
    color: #fa8c16;
  }
  
  @media (max-width: ${breakpoints.tablet}) {
    margin-bottom: 8px;
    
    &::before {
      content: 'Label: ';
      font-weight: 500;
      color: #8c8c8c;
      font-size: 11px;
      text-transform: uppercase;
      background: transparent;
      padding: 0;
      margin-right: 4px;
    }
  }
`;

export const StatusTag = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  display: inline-block;
  
  &.todo {
    background-color: #f0f0f0;
    color: #8c8c8c;
  }
  
  &.paused {
    background-color: #fff1f0;
    color: #cf1322;
  }
  
  &.in-progress {
    background-color: #e6f7ff;
    color: #1890ff;
  }
  
  &.pr-review {
    background-color: #f9f0ff;
    color: #722ed1;
  }
  
  &.ready-to-deploy {
    background-color: #fff7e6;
    color: #fa8c16;
  }
  
  &.deployed-done {
    background-color: #f6ffed;
    color: #52c41a;
  }
  
  @media (max-width: ${breakpoints.tablet}) {
    margin-bottom: 8px;
    
    &::before {
      content: 'Status: ';
      font-weight: 500;
      color: #8c8c8c;
      font-size: 11px;
      text-transform: uppercase;
      background: transparent;
      padding: 0;
      margin-right: 4px;
    }
  }
`;

export const UserName = styled.span`
  color: #262626;
  font-size: 13px;
  
  @media (max-width: ${breakpoints.tablet}) {
    display: block;
    margin-bottom: 8px;
    
    &:nth-of-type(1)::before {
      content: 'Assigned To: ';
      font-weight: 500;
      color: #8c8c8c;
      font-size: 11px;
      text-transform: uppercase;
    }
    
    &:nth-of-type(2)::before {
      content: 'Created By: ';
      font-weight: 500;
      color: #8c8c8c;
      font-size: 11px;
      text-transform: uppercase;
    }
  }
`;

export const ActionMenu = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  
  @media (max-width: ${breakpoints.tablet}) {
    margin-top: 8px;
    justify-content: flex-start;
  }
`;

export const ViewButton = styled(Button)`
  background-color: #1890ff;
  border-color: #1890ff;
  color: white;
  padding: 4px 8px;
  height: auto;
  
  &:hover {
    background-color: #40a9ff;
    border-color: #40a9ff;
  }
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