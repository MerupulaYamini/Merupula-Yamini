import styled from 'styled-components';
import { Form, Button, Input } from 'antd';

export const AuthPageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  padding: 20px;
`;

export const AuthCard = styled.div`
  background: white;
  border-radius: 8px;
  border: 1.5px solid #d9d9d9;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 400px;
  text-align: center;
  transition: all 0.2s ease;

  &:hover {
    border-color: #1890ff;
    box-shadow: 0 6px 16px rgba(24, 144, 255, 0.15);
  }

  @media (max-width: 768px) {
    padding: 30px 20px;
    margin: 0 10px;
  }
`;

export const BrandTitle = styled.h1`
  color: #1890ff;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 8px;
  margin-top: 0;
`;

export const BrandSubTitle = styled.p`
  color: #8c8c8c;
  font-size: 16px;
  margin-bottom: 32px;
  margin-top: 0;
`;

export const StyledForm = styled(Form)`
  .ant-form-item {
    margin-bottom: 20px;
    text-align: left;
  }

  .ant-form-item:last-child {
    margin-bottom: 0;
  }

  .ant-form-item-label > label {
    color: #262626;
    font-weight: 500;
  }

  .ant-input-affix-wrapper {
    padding: 12px 16px;
    border-radius: 6px;
    border: 1.5px solid #d9d9d9;
    height: 48px;
    transition: all 0.2s ease;
    
    &:hover {
      border-color: #40a9ff;
    }
    
    &:focus-within {
      border-color: #1890ff;
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
    }
  }

  .ant-input {
    border: none;
    padding: 0;
    
    &:focus {
      box-shadow: none;
    }
  }
`;

export const ForgotPasswordLink = styled.a`
  color: #1890ff;
  text-decoration: none;
  font-size: 14px;
  display: block;
  text-align: right;
  margin-bottom: 24px;
  
  &:hover {
    color: #40a9ff;
    text-decoration: underline;
  }
`;

export const SignInButton = styled(Button)`
  width: 100%;
  height: 48px;
  background-color: #1890ff;
  border: 1.5px solid #1890ff;
  border-radius: 6px;
  font-size: 16px;
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

export const DividerText = styled.div`
  position: relative;
  text-align: center;
  margin: 24px 0;
  color: #8c8c8c;
  font-size: 14px;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background-color: #f0f0f0;
  }
  
  span {
    background-color: white;
    padding: 0 16px;
    position: relative;
    z-index: 1;
  }
`;

export const CreateAccountLink = styled.a`
  color: #1890ff;
  text-decoration: none;
  font-size: 14px;
  
  &:hover {
    color: #40a9ff;
    text-decoration: underline;
  }
`;

// Register Page Components
export const AlertBox = styled.div`
  background-color: #e6f7ff;
  border: 1.5px solid #91d5ff;
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 24px;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    border-color: #1890ff;
    box-shadow: 0 2px 8px rgba(24, 144, 255, 0.1);
  }

  .ant-typography {
    margin: 0;
    color: #0050b3;
    font-size: 14px;
    line-height: 1.5;
  }

  .anticon {
    color: #1890ff;
    font-size: 16px;
    margin-top: 2px;
  }
`;

export const PasswordStrengthIndicator = styled.div`
  margin-top: 8px;
  margin-bottom: 16px;
  font-size: 12px;
  font-weight: 500;
  
  &.weak {
    color: #ff4d4f;
  }
  
  &.medium {
    color: #fa8c16;
  }
  
  &.strong {
    color: #52c41a;
  }
`;

export const FileUploadArea = styled.div`
  border: 2px dashed #d9d9d9;
  border-radius: 6px;
  padding: 20px;
  text-align: center;
  background-color: #fafafa;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #1890ff;
    background-color: #f0f8ff;
  }
  
  &.dragover {
    border-color: #1890ff;
    background-color: #f0f8ff;
  }
  
  .upload-icon {
    font-size: 24px;
    color: #8c8c8c;
    margin-bottom: 8px;
  }
  
  .upload-text {
    color: #595959;
    font-size: 14px;
    margin-bottom: 4px;
  }
  
  .upload-hint {
    color: #8c8c8c;
    font-size: 12px;
  }
  
  .selected-file {
    color: #1890ff;
    font-weight: 500;
    margin-top: 8px;
  }
`;

export const CreateAccountButton = styled(Button)`
  width: 100%;
  height: 48px;
  background-color: #1890ff;
  border-color: #1890ff;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  margin-top: 8px;
  
  &:hover {
    background-color: #40a9ff;
    border-color: #40a9ff;
  }
  
  &:focus {
    background-color: #40a9ff;
    border-color: #40a9ff;
  }
`;

export const SignInLink = styled.a`
  color: #1890ff;
  text-decoration: none;
  font-size: 14px;
  
  &:hover {
    color: #40a9ff;
    text-decoration: underline;
  }
`;

export const StyledTextArea = styled(Input.TextArea)`
  border-radius: 6px;
  border: 1px solid #d9d9d9;
  padding: 12px 16px;
  
  &:hover {
    border-color: #40a9ff;
  }
  
  &:focus {
    border-color: #1890ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
`;


export const ErrorAlert = styled.div`
  background-color: #fff2f0;
  border: 1.5px solid #ffccc7;
  border-radius: 6px;
  padding: 12px 16px;
  margin-bottom: 20px;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    border-color: #ff4d4f;
    box-shadow: 0 2px 8px rgba(255, 77, 79, 0.1);
  }

  .error-icon {
    color: #ff4d4f;
    font-size: 16px;
    margin-top: 2px;
  }

  .error-message {
    color: #cf1322;
    font-size: 14px;
    line-height: 1.5;
    margin: 0;
    text-align: left;
  }
`;
