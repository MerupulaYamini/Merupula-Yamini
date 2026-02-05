import styled from 'styled-components';
import { Form, Input, Select, Radio, Button } from 'antd';

export const CreateTicketContainer = styled.div`
  width: 1184px;
  height: 869px;
  background: transparent;
  margin: 0 auto;
  padding: 0;
`;

export const CreateTicketCard = styled.div`
  background: #FFFFFF;
  border-radius: 8px;
  border: 1.5px solid #d9d9d9;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  padding: 40px;
  width: 100%;
  height: 100%;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #1890ff;
    box-shadow: 0 4px 12px rgba(24, 144, 255, 0.1);
  }
`;

export const CreateTicketTitle = styled.h1`
  color: #262626;
  font-size: 28px;
  font-weight: 600;
  margin: 0 0 8px 0;
  text-align: center;
`;

export const CreateTicketSubtitle = styled.p`
  color: #8c8c8c;
  font-size: 16px;
  margin: 0 0 32px 0;
  text-align: center;
`;

export const StyledForm = styled(Form)`
  .ant-form-item {
    margin-bottom: 0;
  }
  
  .ant-form-item-label {
    padding-bottom: 4px;
  }
  
  .ant-form-item-label > label {
    color: #262626;
    font-weight: 500;
    font-size: 14px;
  }
`;

export const FormSection = styled.div`
  margin-bottom: 24px;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const FormLabel = styled.label`
  color: #262626;
  font-weight: 500;
  font-size: 14px;
  display: block;
  margin-bottom: 8px;
`;

export const StyledInput = styled(Input)`
  padding: 12px 16px;
  border-radius: 6px;
  border: 1.5px solid #d9d9d9;
  font-size: 14px;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #40a9ff;
  }
  
  &:focus {
    border-color: #1890ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
  }
  
  &::placeholder {
    color: #bfbfbf;
  }
`;

export const StyledTextArea = styled(Input.TextArea)`
  padding: 12px 16px;
  border-radius: 6px;
  border: 1.5px solid #d9d9d9;
  font-size: 14px;
  resize: vertical;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #40a9ff;
  }
  
  &:focus {
    border-color: #1890ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
  }
  
  &::placeholder {
    color: #bfbfbf;
  }
`;

export const StyledSelect = styled(Select)`
  .ant-select-selector {
    padding: 8px 12px !important;
    border-radius: 6px !important;
    border: 1.5px solid #d9d9d9 !important;
    height: 48px !important;
    transition: all 0.2s ease !important;
    
    &:hover {
      border-color: #40a9ff !important;
    }
  }
  
  &.ant-select-focused .ant-select-selector {
    border-color: #1890ff !important;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1) !important;
  }
  
  .ant-select-selection-placeholder {
    color: #bfbfbf;
    line-height: 32px;
  }
`;

export const RadioGroup = styled(Radio.Group)`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  
  .ant-radio-wrapper {
    color: #262626;
    font-size: 14px;
    
    &:hover .ant-radio-inner {
      border-color: #1890ff;
    }
  }
  
  .ant-radio-checked .ant-radio-inner {
    border-color: #1890ff;
    background-color: #1890ff;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
  }
`;

export const AttachmentSection = styled.div`
  margin-bottom: 32px;
`;

export const AttachmentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
`;

export const AttachmentItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #fafafa;
  border: 1.5px solid #d9d9d9;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    border-color: #1890ff;
    background: #f0f8ff;
  }
`;

export const AttachmentIcon = styled.div`
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1890ff;
`;

export const AttachmentInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const AttachmentName = styled.div`
  color: #262626;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const AttachmentSize = styled.div`
  color: #8c8c8c;
  font-size: 12px;
  margin-top: 2px;
`;

export const RemoveAttachmentButton = styled.button`
  padding: 6px 12px;
  background: transparent;
  border: 1.5px solid #ff4d4f;
  border-radius: 4px;
  color: #ff4d4f;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background: #ff4d4f;
    color: white;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const AttachmentInput = styled(Input)`
  padding: 12px 16px;
  border-radius: 6px;
  border: 1.5px solid #d9d9d9;
  font-size: 14px;
  margin-bottom: 16px;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #40a9ff;
  }
  
  &:focus {
    border-color: #1890ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
  }
  
  &::placeholder {
    color: #bfbfbf;
  }
`;

export const FileUploadArea = styled.div`
  border: 2px dashed #d9d9d9;
  border-radius: 6px;
  padding: 24px;
  text-align: center;
  background-color: #fafafa;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #8c8c8c;
  font-size: 14px;
  
  &:hover {
    border-color: #1890ff;
    background-color: #f0f8ff;
    color: #1890ff;
  }
  
  .anticon {
    font-size: 24px;
    margin-bottom: 8px;
    display: block;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #f0f0f0;
`;

export const CancelButton = styled(Button)`
  padding: 8px 24px;
  height: 40px;
  border-radius: 6px;
  border: 1.5px solid #d9d9d9;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    color: #1890ff;
    border-color: #1890ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
  }
`;

export const CreateButton = styled(Button)`
  padding: 8px 24px;
  height: 40px;
  background-color: #1890ff;
  border: 1.5px solid #1890ff;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #40a9ff;
    border-color: #40a9ff;
    box-shadow: 0 2px 4px rgba(24, 144, 255, 0.2);
  }
  
  &:focus {
    background-color: #40a9ff;
    border-color: #40a9ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
  }
`;

export const PlaceholderContent = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  text-align: center;
  color: #8c8c8c;
  line-height: 1.6;
`;