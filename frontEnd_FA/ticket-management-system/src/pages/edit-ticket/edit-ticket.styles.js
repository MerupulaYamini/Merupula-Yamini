import styled from 'styled-components';
import { Form, Input, Select, Radio, Button } from 'antd';

export const EditTicketContainer = styled.div`
  width: 1184px;
  height: 869px;
  background: transparent;
  margin: 0 auto;
  padding: 0;
`;

export const EditTicketCard = styled.div`
  background: #FFFFFF;
  border-radius: 8px;
  border: 1px solid #DCE0E5;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  padding: 40px;
  width: 100%;
  height: 100%;
`;

export const EditTicketTitle = styled.h1`
  color: #262626;
  font-size: 28px;
  font-weight: 600;
  margin: 0 0 8px 0;
  text-align: center;
`;

export const EditTicketSubtitle = styled.p`
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
  border: 1px solid #d9d9d9;
  font-size: 14px;
  
  &:hover {
    border-color: #40a9ff;
  }
  
  &:focus {
    border-color: #1890ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
  
  &::placeholder {
    color: #bfbfbf;
  }
`;

export const StyledTextArea = styled(Input.TextArea)`
  padding: 12px 16px;
  border-radius: 6px;
  border: 1px solid #d9d9d9;
  font-size: 14px;
  resize: vertical;
  
  &:hover {
    border-color: #40a9ff;
  }
  
  &:focus {
    border-color: #1890ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
  
  &::placeholder {
    color: #bfbfbf;
  }
`;

export const StyledSelect = styled(Select)`
  .ant-select-selector {
    padding: 8px 12px !important;
    border-radius: 6px !important;
    border: 1px solid #d9d9d9 !important;
    height: 48px !important;
    
    &:hover {
      border-color: #40a9ff !important;
    }
  }
  
  &.ant-select-focused .ant-select-selector {
    border-color: #1890ff !important;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2) !important;
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

export const AttachmentInput = styled(Input)`
  padding: 12px 16px;
  border-radius: 6px;
  border: 1px solid #d9d9d9;
  font-size: 14px;
  margin-bottom: 16px;
  
  &:hover {
    border-color: #40a9ff;
  }
  
  &:focus {
    border-color: #1890ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
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
  font-size: 14px;
  font-weight: 500;
  
  &:hover {
    color: #1890ff;
    border-color: #1890ff;
  }
`;

export const SaveButton = styled(Button)`
  padding: 8px 24px;
  height: 40px;
  background-color: #1890ff;
  border-color: #1890ff;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  
  &:hover {
    background-color: #40a9ff;
    border-color: #40a9ff;
  }
  
  &:focus {
    background-color: #40a9ff;
    border-color: #40a9ff;
  }
`;