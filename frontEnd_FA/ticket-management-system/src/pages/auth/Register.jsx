import React, { useState } from 'react';
import { Form, Input, Upload, message } from 'antd';
import { 
  MailOutlined, 
  LockOutlined, 
  UserOutlined, 
  UploadOutlined, 
  InfoCircleOutlined 
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../../services/authService';
import {
  AuthPageWrapper,
  AuthCard,
  BrandTitle,
  BrandSubTitle,
  StyledForm,
  AlertBox,
  PasswordStrengthIndicator,
  FileUploadArea,
  CreateAccountButton,
  SignInLink,
  StyledTextArea,
  DividerText
} from './auth.styles';

const { TextArea } = Input;

const Register = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [passwordStrength, setPasswordStrength] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const registerMutation = useMutation({
    mutationFn: (formData) => registerUser(formData),
    onSuccess: () => {
      message.success('Registration submitted! Pending administrator approval.');
      form.resetFields();
      setSelectedFile(null);
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    },
    onError: (error) => {
      if (error.fieldErrors) {
        Object.entries(error.fieldErrors).forEach(([field, errorMsg]) => {
          message.error(`${field}: ${errorMsg}`);
        });
      } else {
        message.error(error.message || 'Registration failed. Please try again.');
      }
    }
  });

  const checkPasswordStrength = (password) => {
    if (!password) return '';
    
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[@$!%*?&]/.test(password);
    
    const criteriaCount = [hasMinLength, hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar].filter(Boolean).length;
    
    if (criteriaCount < 3) return 'weak';
    if (criteriaCount < 5) return 'medium';
    return 'strong';
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPasswordStrength(checkPasswordStrength(password));
  };

  const uploadProps = {
    beforeUpload: (file) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG files!');
        return false;
      }
      if (!isLt2M) {
        message.error('Image must be smaller than 2MB!');
        return false;
      }

      setSelectedFile(file);
      form.setFieldsValue({ displayPicture: file });
      return false; // Prevent auto upload
    },
    showUploadList: false,
    accept: '.jpg,.jpeg,.png',
  };

  const onFinish = (values) => {
    if (!selectedFile) {
      message.error('Profile picture is required');
      return;
    }
    
    const formData = new FormData();
    formData.append('username', values.username);
    formData.append('email', values.email);
    formData.append('password', values.password);
    
    if (values.bio) {
      formData.append('bio', values.bio);
    }
    
    formData.append('profilePicture', selectedFile);
    
    registerMutation.mutate(formData);
  };

  const onFinishFailed = (errorInfo) => {
  };

  const getStrengthText = (strength) => {
    switch (strength) {
      case 'weak':
        return 'Weak';
      case 'medium':
        return 'Medium';
      case 'strong':
        return 'Strong';
      default:
        return '';
    }
  };

  return (
    <AuthPageWrapper>
      <AuthCard>
        <BrandTitle>Create Your Account</BrandTitle>
        <BrandSubTitle>Join TicketFlow to start managing tasks and issues.</BrandSubTitle>
        
        <AlertBox>
          <InfoCircleOutlined />
          <div>
            <strong>Important!</strong><br />
            Your registration will be pending administrator approval after submission. You will be notified once activated.
          </div>
        </AlertBox>

        <StyledForm
          form={form}
          name="register"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Email Address"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email address!',
              },
              {
                type: 'email',
                message: 'Please enter a valid email address!',
              },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="john.doe@example.com"
              size="large"
              disabled={registerMutation.isPending}
            />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
              {
                min: 3,
                message: 'Username must be at least 3 characters long!',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="john.doe"
              size="large"
              disabled={registerMutation.isPending}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                min: 8,
                message: 'Password must be at least 8 characters long!',
              },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                message: 'Password must contain uppercase, lowercase, number, and special character!',
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Min 8 chars with uppercase, lowercase, number & special char"
              size="large"
              disabled={registerMutation.isPending}
              onChange={handlePasswordChange}
            />
          </Form.Item>

          {passwordStrength && (
            <PasswordStrengthIndicator className={passwordStrength}>
              {getStrengthText(passwordStrength)}
            </PasswordStrengthIndicator>
          )}

          <Form.Item
            label="Display Picture"
            name="displayPicture"
            rules={[
              {
                required: true,
                message: 'Please upload your display picture!',
              },
            ]}
          >
            <Upload {...uploadProps}>
              <FileUploadArea>
                <div className="upload-icon">
                  <UploadOutlined />
                </div>
                <div className="upload-text">
                  {selectedFile ? 'Change file' : 'Choose a file (JPG, PNG)'}
                </div>
                <div className="upload-hint">
                  Drag & drop or click to select • Max 2MB
                </div>
                {selectedFile && (
                  <div className="selected-file">
                    Selected: {selectedFile.name}
                  </div>
                )}
              </FileUploadArea>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Bio (Optional)"
            name="bio"
            rules={[
              {
                max: 500,
                message: 'Bio cannot exceed 500 characters!',
              },
            ]}
          >
            <StyledTextArea
              placeholder="Tell us a bit about yourself (e.g., your role, interests)..."
              rows={4}
              disabled={registerMutation.isPending}
              showCount
              maxLength={500}
            />
          </Form.Item>

          <Form.Item>
            <CreateAccountButton
              type="primary"
              htmlType="submit"
              loading={registerMutation.isPending}
              disabled={registerMutation.isPending}
            >
              Create Account
            </CreateAccountButton>
          </Form.Item>
        </StyledForm>

        <DividerText>
          <span>Already have an account? <SignInLink as={Link} to="/login">Sign In</SignInLink></span>
        </DividerText>
      </AuthCard>
    </AuthPageWrapper>
  );
};

export default Register;