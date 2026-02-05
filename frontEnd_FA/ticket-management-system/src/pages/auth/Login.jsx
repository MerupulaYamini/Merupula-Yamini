import React, { useState } from 'react';
import { Form, Input } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import {
  AuthPageWrapper,
  AuthCard,
  BrandTitle,
  BrandSubTitle,
  StyledForm,
  ForgotPasswordLink,
  SignInButton,
  DividerText,
  CreateAccountLink
} from './auth.styles';

const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    
    // Console log the form values for now
    console.log('Login form values:', values);
    
    // Simulate API call delay
    setTimeout(() => {
      setLoading(false);
      // TODO: Implement actual login API call here
    }, 1000);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <AuthPageWrapper>
      <AuthCard>
        <BrandTitle>Welcome to TicketFlow!</BrandTitle>
        <BrandSubTitle>Sign in to manage your tasks and issues.</BrandSubTitle>
        
        <StyledForm
          form={form}
          name="login"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
              {
                type: 'email',
                message: 'Please enter a valid email address!',
              },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Enter your email"
              size="large"
              disabled={loading}
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
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
              size="large"
              disabled={loading}
            />
          </Form.Item>

          <ForgotPasswordLink href="#forgot-password">
            Forgot password?
          </ForgotPasswordLink>

          <Form.Item>
            <SignInButton
              type="primary"
              htmlType="submit"
              loading={loading}
              disabled={loading}
            >
              Sign In
            </SignInButton>
          </Form.Item>
        </StyledForm>

        <DividerText>
          <span>OR</span>
        </DividerText>

        <CreateAccountLink as={Link} to="/register">
          Create an Account
        </CreateAccountLink>
      </AuthCard>
    </AuthPageWrapper>
  );
};

export default Login;