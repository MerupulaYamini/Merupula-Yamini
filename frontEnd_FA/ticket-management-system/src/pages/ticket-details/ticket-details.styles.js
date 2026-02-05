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
  width: 344px;
  height: 226px;
  background: #FFFFFF;
  border-radius: 4px;
  border: 1px solid #DCE0E5;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.07), 0px 0px 0px rgba(23, 26, 31, 0);
  padding: 24px;
  height: fit-content;
`;

export const UpdateStatusSection = styled.div`
  width: 344px;
  background: #FFFFFF;
  border-radius: 4px;
  border: 1px solid #DCE0E5;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.07), 0px 0px 0px rgba(23, 26, 31, 0);
  padding: 24px;
  margin-top: 16px;
`;

export const UpdateStatusTitle = styled.h3`
  color: #262626;
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 16px 0;
`;

export const StatusSelectLabel = styled.label`
  color: #8c8c8c;
  font-size: 14px;
  font-weight: 500;
  display: block;
  margin-bottom: 8px;
`;

export const StatusSelect = styled.select`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  background: white;
  color: #262626;
  font-size: 14px;
  margin-bottom: 16px;
  
  &:hover {
    border-color: #40a9ff;
  }
  
  &:focus {
    outline: none;
    border-color: #1890ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
`;

export const UpdateStatusButton = styled(Button)`
  width: 100%;
  height: 40px;
  background-color: #1890ff;
  border-color: #1890ff;
  color: white;
  font-size: 16px;
  font-weight: 500;
  
  &:hover {
    background-color: #40a9ff;
    border-color: #40a9ff;
  }
`;

export const StatusHistorySection = styled.div`
  width: 386px;
  height: 330px;
  background: #FFFFFF;
  border-radius: 8px;
  border: 1px solid #DCE0E5;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08), 0px 0px 0px rgba(23, 26, 31, 0);
  padding: 24px;
  margin-top: 16px;
  overflow-y: auto;
`;

export const StatusHistoryTitle = styled.h3`
  color: #262626;
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 20px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  
  .history-icon {
    color: #8c8c8c;
    font-size: 20px;
  }
`;

export const StatusHistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const StatusHistoryItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

export const StatusHistoryDot = styled.div`
  width: 12px;
  height: 12px;
  background-color: #1890ff;
  border-radius: 50%;
  margin-top: 4px;
  flex-shrink: 0;
`;

export const StatusHistoryContent = styled.div`
  flex: 1;
`;

export const StatusHistoryText = styled.div`
  color: #262626;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
  margin-bottom: 4px;
`;

export const StatusHistoryTime = styled.div`
  color: #8c8c8c;
  font-size: 12px;
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
`;

export const UserName = styled.span`
  color: #262626;
  font-size: 14px;
  background-color: #f5f5f5;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #e8e8e8;
`;

export const DescriptionSection = styled.div`
  width: 720px;
  height: 471px;
  background: #FFFFFF;
  border-radius: 4px;
  border: 1px solid #DCE0E5;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.07), 0px 0px 0px rgba(23, 26, 31, 0);
  padding: 24px;
  overflow-y: auto;
`;

export const TicketTitleSection = styled.div`
  margin-bottom: 24px;
`;

export const TicketTitleDisplay = styled.h2`
  color: #262626;
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 16px 0;
  line-height: 1.3;
`;

export const SectionTitle = styled.h3`
  color: #262626;
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 12px 0;
`;

export const DescriptionText = styled.p`
  color: #595959;
  font-size: 14px;
  line-height: 1.6;
  margin: 0 0 24px 0;
`;

export const AttachmentsSection = styled.div`
  margin-top: 24px;
`;

export const AttachmentsTitle = styled.h4`
  color: #262626;
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 16px 0;
`;

export const AttachmentsContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;
`;

export const AttachmentPreview = styled.div`
  width: 327px;
  height: 204px;
  border-radius: 4px;
  border: 1px solid #e8e8e8;
  background: #fafafa;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-direction: column;
  gap: 8px;
  
  .preview-icon {
    font-size: 48px;
    color: #8c8c8c;
  }
  
  .preview-text {
    color: #8c8c8c;
    font-size: 14px;
    text-align: center;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
`;

export const AttachmentsList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const AttachmentItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e9ecef;
  
  &:hover {
    background: #e9ecef;
  }
`;

export const AttachmentIcon = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1890ff;
  border-radius: 4px;
  color: white;
  font-size: 16px;
`;

export const AttachmentInfo = styled.div`
  flex: 1;
`;

export const AttachmentName = styled.div`
  color: #1890ff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const AttachmentSize = styled.div`
  color: #8c8c8c;
  font-size: 12px;
  margin-top: 2px;
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