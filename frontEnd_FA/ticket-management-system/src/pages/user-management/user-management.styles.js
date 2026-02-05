import styled from 'styled-components';

export const PlaceholderContent = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  text-align: center;
  color: #8c8c8c;
  line-height: 1.6;
`;

export const StatusTag = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid transparent;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  transition: all 0.2s ease;
  
  &.active {
    background-color: #f6ffed;
    color: #52c41a;
    border-color: #b7eb8f;
  }
  
  &.pending {
    background-color: #fff7e6;
    color: #fa8c16;
    border-color: #ffd591;
  }
`;

export const RoleTag = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid transparent;
  font-size: 11px;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &.admin {
    background-color: #e6f7ff;
    color: #1890ff;
    border-color: #91d5ff;
  }
  
  &.employee {
    background-color: #f0f0f0;
    color: #8c8c8c;
    border-color: #d9d9d9;
  }
`;

export const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const SectionDescription = styled.p`
  color: #8c8c8c;
  margin: 4px 0 0 0;
  font-size: 14px;
`;

export const PaginationFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: #fafafa;
  border-top: 2px solid #e8e8e8;
  color: #8c8c8c;
  font-size: 14px;
`;

export const PaginationInfo = styled.span`
  color: #8c8c8c;
  font-size: 14px;
`;

export const PaginationControls = styled.div`
  display: flex;
  gap: 8px;
`;

export const PaginationBtn = styled.button`
  padding: 4px 12px;
  border: 1.5px solid #d9d9d9;
  background: white;
  border-radius: 4px;
  cursor: not-allowed;
  color: #d9d9d9;
  transition: all 0.2s ease;
  
  &:disabled {
    cursor: not-allowed;
    color: #d9d9d9;
  }
  
  &:not(:disabled) {
    cursor: pointer;
    color: #262626;
    
    &:hover {
      border-color: #1890ff;
      color: #1890ff;
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
    }
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

// Enhanced User Management Table Styles
export const UserManagementTable = styled.div`
  background: white;
  border-radius: 8px;
  border: 1.5px solid #d9d9d9;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  
  &:hover {
    border-color: #1890ff;
    box-shadow: 0 4px 12px rgba(24, 144, 255, 0.1);
  }
`;

export const UserTableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 120px 120px 150px 80px 80px;
  background: #fafafa;
  border-bottom: 2px solid #e8e8e8;
  padding: 16px;
  font-weight: 600;
  color: #8c8c8c;
  font-size: 12px;
  text-transform: uppercase;
  
  @media (max-width: 1200px) {
    grid-template-columns: 1.5fr 1.5fr 100px 100px 120px 70px 70px;
    font-size: 11px;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

export const UserTableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 120px 120px 150px 80px 80px;
  padding: 16px;
  border-bottom: 1px solid #e8e8e8;
  align-items: center;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #f8f9fa;
    border-left: 3px solid #1890ff;
    padding-left: 13px;
  }
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: 1200px) {
    grid-template-columns: 1.5fr 1.5fr 100px 100px 120px 70px 70px;
  }
  
  @media (max-width: 768px) {
    display: block;
    padding: 16px;
    border-bottom: 2px solid #f0f0f0;
  }
`;