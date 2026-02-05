import styled from 'styled-components';
import { Button, Avatar } from 'antd';

// Breakpoints
const breakpoints = {
  mobile: '576px',
  tablet: '768px',
  desktop: '992px',
  large: '1200px'
};

export const TicketDetailsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: ${breakpoints.large}) {
    max-width: 100%;
  }
`;

export const TicketHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
  
  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    gap: 16px;
  }
`;

export const BackButton = styled(Button)`
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1.5px solid #d9d9d9;
  transition: all 0.2s ease;
  
  &:hover {
    color: #1890ff;
    border-color: #1890ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
  }
`;

export const TicketTitle = styled.h1`
  color: #262626;
  font-size: 28px;
  font-weight: 600;
  margin: 0 0 8px 0;
  line-height: 1.2;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 24px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 20px;
  }
`;

export const TicketId = styled.span`
  font-family: 'Courier New', monospace;
  font-weight: 600;
  color: #8c8c8c;
  font-size: 14px;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 12px;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  
  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
    justify-content: flex-start;
  }

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    
    button {
      width: 100%;
      justify-content: center;
    }
  }
`;

export const EditButton = styled(Button)`
  background-color: #1890ff;
  border: 1.5px solid #1890ff;
  color: white;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #40a9ff;
    border-color: #40a9ff;
    box-shadow: 0 2px 4px rgba(24, 144, 255, 0.2);
  }
`;

export const DeleteButton = styled(Button)`
  background-color: #ff4d4f;
  border: 1.5px solid #ff4d4f;
  color: white;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #ff7875;
    border-color: #ff7875;
    box-shadow: 0 2px 4px rgba(255, 77, 79, 0.2);
  }
`;

export const TicketContent = styled.div`
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 32px;
  max-width: 100%;
  
  @media (max-width: ${breakpoints.large}) {
    grid-template-columns: 350px 1fr;
    gap: 24px;
  }
  
  @media (max-width: ${breakpoints.desktop}) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    gap: 16px;
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0; /* Prevents overflow */
`;

export const InfoSection = styled.div`
  width: 100%;
  background: #FFFFFF;
  border-radius: 8px;
  border: 1.5px solid #d9d9d9;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.07), 0px 0px 0px rgba(23, 26, 31, 0);
  padding: 24px;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #1890ff;
    box-shadow: 0 4px 12px rgba(24, 144, 255, 0.1);
  }

  @media (max-width: ${breakpoints.tablet}) {
    padding: 20px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 16px;
  }
`;

export const UpdateStatusSection = styled.div`
  width: 100%;
  background: #FFFFFF;
  border-radius: 8px;
  border: 1.5px solid #d9d9d9;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.07), 0px 0px 0px rgba(23, 26, 31, 0);
  padding: 24px;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #1890ff;
    box-shadow: 0 4px 12px rgba(24, 144, 255, 0.1);
  }

  @media (max-width: ${breakpoints.tablet}) {
    padding: 20px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 16px;
  }
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
  border: 1.5px solid #d9d9d9;
  border-radius: 6px;
  background: white;
  color: #262626;
  font-size: 14px;
  margin-bottom: 16px;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #40a9ff;
  }
  
  &:focus {
    outline: none;
    border-color: #1890ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
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
  width: 100%;
  height: 330px;
  background: #FFFFFF;
  border-radius: 8px;
  border: 1.5px solid #d9d9d9;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08), 0px 0px 0px rgba(23, 26, 31, 0);
  padding: 24px;
  overflow-y: auto;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #1890ff;
    box-shadow: 0 4px 12px rgba(24, 144, 255, 0.1);
  }
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
  width: 100%;
  background: #FFFFFF;
  border-radius: 8px;
  border: 1.5px solid #d9d9d9;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.07), 0px 0px 0px rgba(23, 26, 31, 0);
  padding: 24px;
  min-width: 0; /* Prevents overflow */
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #1890ff;
    box-shadow: 0 4px 12px rgba(24, 144, 255, 0.1);
  }
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

// Comments Section Components
export const CommentsSection = styled.div`
  width: 100%;
  background: #FFFFFF;
  border-radius: 8px;
  border: 1.5px solid #d9d9d9;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.07), 0px 0px 0px rgba(23, 26, 31, 0);
  padding: 24px;
  min-width: 0; /* Prevents overflow */
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #1890ff;
    box-shadow: 0 4px 12px rgba(24, 144, 255, 0.1);
  }
`;

export const CommentsSectionTitle = styled.h3`
  color: #262626;
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 24px 0;
`;

export const CommentsTimeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
  max-height: 400px;
  overflow-y: auto;
  padding-right: 8px;
  
  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const CommentItem = styled.div`
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 16px;
  position: relative;
  
  &.highlighted {
    border-color: #1890ff;
    background: #f0f8ff;
  }
`;

export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const CommentAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const AuthorName = styled.span`
  color: #262626;
  font-weight: 600;
  font-size: 14px;
`;

export const OnlineIndicator = styled.div`
  width: 8px;
  height: 8px;
  background-color: #52c41a;
  border-radius: 50%;
`;

export const CommentTimestamp = styled.span`
  color: #8c8c8c;
  font-size: 12px;
`;

export const CommentContent = styled.div`
  color: #595959;
  font-size: 14px;
  line-height: 1.6;
  
  strong {
    font-weight: 600;
    color: #262626;
  }
  
  em {
    font-style: italic;
  }
  
  u {
    text-decoration: underline;
  }
  
  ul, ol {
    margin: 8px 0;
    padding-left: 20px;
  }
  
  a {
    color: #1890ff;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const CommentForm = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  background: white;
`;

export const RichTextToolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
  background: #fafafa;
  border-radius: 8px 8px 0 0;
`;

export const ToolbarButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #595959;
  font-size: 14px;
  font-weight: 600;
  
  &:hover {
    background: #e6f7ff;
    color: #1890ff;
  }
  
  &.active {
    background: #1890ff;
    color: white;
  }
`;

export const CommentTextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  border: none;
  padding: 16px;
  font-size: 14px;
  line-height: 1.6;
  resize: vertical;
  outline: none;
  font-family: inherit;
  
  &::placeholder {
    color: #bfbfbf;
  }
`;

export const CommentActions = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 12px 16px;
  border-top: 1px solid #f0f0f0;
  background: #fafafa;
  border-radius: 0 0 8px 8px;
`;

export const AddCommentButton = styled(Button)`
  background-color: #1890ff;
  border-color: #1890ff;
  color: white;
  
  &:hover {
    background-color: #40a9ff;
    border-color: #40a9ff;
  }
  
  &:disabled {
    background-color: #f5f5f5;
    border-color: #d9d9d9;
    color: #bfbfbf;
  }
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