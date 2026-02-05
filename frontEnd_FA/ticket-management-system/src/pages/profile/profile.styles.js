import styled from 'styled-components';
import { Form, Input, Button, Avatar } from 'antd';

const { TextArea } = Input;

export const ProfileContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  overflow: hidden;
`;

export const ProfileHeader = styled.div`
  padding: 24px 32px;
  border-bottom: 1px solid #d9d9d9;
  background: #fafafa;
  border: 1px solid #e8e8e8;
  border-bottom: 2px solid #d9d9d9;
`;

export const ProfileTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #262626;
  margin: 0 0 8px 0;
`;

export const ProfileSubtitle = styled.p`
  font-size: 14px;
  color: #8c8c8c;
  margin: 0;
`;

export const ProfileContent = styled.div`
  padding: 0;
`;

export const ProfileSection = styled.div`
  padding: 32px;
  border-bottom: 2px solid #e8e8e8;
  border-left: 1px solid #f0f0f0;
  border-right: 1px solid #f0f0f0;
  background: #fff;
  
  &:last-child {
    border-bottom: 1px solid #d9d9d9;
  }
  
  &:hover {
    background: #fafafa;
    border-left: 2px solid #1890ff;
    transition: all 0.3s ease;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #262626;
  margin: 0 0 8px 0;
`;

export const SectionSubtitle = styled.p`
  font-size: 14px;
  color: #8c8c8c;
  margin: 0 0 24px 0;
`;

export const ProfileForm = styled(Form)`
  .ant-form-item {
    margin-bottom: 0;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 24px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const FormLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #262626;
  margin-bottom: 8px;
`;

export const FormInput = styled(Input)`
  border-radius: 6px;
  border: 1.5px solid #d9d9d9;
  
  &:focus,
  &:hover {
    border-color: #1890ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
  }
`;

export const FormTextArea = styled(TextArea)`
  border-radius: 6px;
  border: 1.5px solid #d9d9d9;
  
  &:focus,
  &:hover {
    border-color: #1890ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
  }
`;

export const PasswordInput = styled(Input.Password)`
  border-radius: 6px;
  border: 1.5px solid #d9d9d9;
  
  &:focus,
  &:hover {
    border-color: #1890ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
  }
`;

export const AvatarSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border: 1px dashed #d9d9d9;
  border-radius: 8px;
  background: #fafafa;
`;

export const AvatarContainer = styled.div`
  flex-shrink: 0;
`;

export const ProfileAvatar = styled(Avatar)`
  background-color: #1890ff;
  border: 2px solid #d9d9d9;
  
  &:hover {
    border-color: #1890ff;
  }
`;

export const UploadButton = styled(Button)`
  border-radius: 6px;
  margin-bottom: 8px;
  border: 1.5px solid #d9d9d9;
  
  &:hover {
    border-color: #1890ff;
    color: #1890ff;
  }
`;

export const UploadHint = styled.p`
  font-size: 12px;
  color: #8c8c8c;
  margin: 0;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #e8e8e8;
`;

export const CancelButton = styled(Button)`
  border-radius: 6px;
  border: 1.5px solid #d9d9d9;
  
  &:hover {
    border-color: #ff4d4f;
    color: #ff4d4f;
  }
`;

export const PrimaryButton = styled(Button)`
  border-radius: 6px;
  border: 1.5px solid #1890ff;
  
  &:hover {
    border-color: #40a9ff;
    box-shadow: 0 2px 4px rgba(24, 144, 255, 0.2);
  }
`;

export const DangerButton = styled(Button)`
  border-radius: 6px;
  border: 1.5px solid #ff4d4f;
  background-color: #ff4d4f;
  color: white;
  
  &:hover {
    border-color: #ff7875;
    background-color: #ff7875;
    box-shadow: 0 2px 4px rgba(255, 77, 79, 0.2);
  }
`;

export const AdminSection = styled(ProfileSection)`
  background: #fff2f0;
  border-left: 4px solid #ff4d4f;
  
  &:hover {
    background: #fff1f0;
    border-left: 4px solid #ff4d4f;
  }
`;