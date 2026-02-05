import { useState } from 'react';
import { Form, Input, message } from 'antd';
import { MailOutlined, LockOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/authService';
import {
  AuthPageWrapper,
  AuthCard,
  BrandTitle,
  BrandSubTitle,
  StyledForm,
  ForgotPasswordLink,
  SignInButton,
  DividerText,
  CreateAccountLink,
  ErrorAlert
} from './auth.styles';

const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    setErrorMessage('');
    
    try {
      const data = await loginUser(values.email, values.password);
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('username', data.username);
      localStorage.setItem('email', data.email);
      localStorage.setItem('roles', JSON.stringify(data.roles));
      
      message.success('Login successful! Welcome back.');
      navigate('/dashboard');
    } catch (error) {
      if (error.message) {
        setErrorMessage(error.message);
      } else if (error.fieldErrors) {
        const errorMessages = Object.values(error.fieldErrors).join(', ');
        setErrorMessage(errorMessages);
      } else {
        setErrorMessage('Unable to connect to the server. Please check your connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    setErrorMessage('Please fill in all required fields correctly.');
  };

  return (
    <AuthPageWrapper>
      <AuthCard>
        <BrandTitle>Welcome to TicketFlow!</BrandTitle>
        <BrandSubTitle>Sign in to manage your tasks and issues.</BrandSubTitle>
        
        {errorMessage && (
          <ErrorAlert>
            <CloseCircleOutlined className="error-icon" />
            <p className="error-message">{errorMessage}</p>
          </ErrorAlert>
        )}
        
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