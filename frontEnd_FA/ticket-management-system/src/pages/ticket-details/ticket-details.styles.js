import styled from 'styled-components';
import { Button, Avatar } from 'antd';

export const TicketDetailsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const TicketHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

export const BackButton = styled(Button)`
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    color: #1890ff;
    border-color: #1890ff;
  }
`;

export const TicketTitle = styled.h1`
  color: #262626;
  font-size: 28px;
  font-weight: 600;
  margin: 0 0 8px 0;
  line-height: 1.2;
`;

export const TicketId = styled.span`
  font-family: 'Courier New', monospace;
  font-weight: 600;
  color: #8c8c8c;
  font-size: 14px;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
  }
`;

export const EditButton = styled(Button)`
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

export const DeleteButton = styled(Button)`
  background-color: #ff4d4f;
  border-color: #ff4d4f;
  color: white;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background-color: #ff7875;
    border-color: #ff7875;
  }
`;

export const TicketContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 32px;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

export const InfoSection = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  height: fit-content;
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const InfoLabel = styled.span`
  color: #8c8c8c;
  font-weight: 500;
  min-width: 120px;
  font-size: 14px;
`;

export const InfoValue = styled.div`
  color: #262626;
  font-size: 14px;
  display: flex;
  align-items: center;
`;

export const StatusTag = styled.span`
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
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

export const LabelTag = styled.span`
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
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

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const UserAvatar = styled(Avatar)`
  background-color: ${props => props.bgcolor || '#1890ff'};
  font-size: 12px;
`;

export const UserName = styled.span`
  color: #262626;
  font-size: 14px;
`;

export const DescriptionSection = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

export const SectionTitle = styled.h3`
  color: #262626;
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 16px 0;
`;

export const DescriptionText = styled.p`
  color: #595959;
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
`;

export const NotFoundMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  
  h2 {
    color: #262626;
    margin-bottom: 8px;
  }
  
  p {
    color: #8c8c8c;
    margin-bottom: 24px;
  }
`;