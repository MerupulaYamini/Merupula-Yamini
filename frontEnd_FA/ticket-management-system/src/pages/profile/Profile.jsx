import React, { useState, useEffect } from 'react';
import { Form, Input, Upload, message } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import { getUserById, getCurrentUser } from '../../services/authService';
import {
  ProfileContainer,
  ProfileHeader,
  ProfileTitle,
  ProfileSubtitle,
  ProfileContent,
  ProfileSection,
  SectionTitle,
  SectionSubtitle,
  ProfileForm,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextArea,
  AvatarSection,
  AvatarContainer,
  ProfileAvatar,
  UploadButton,
  UploadHint,
  ButtonGroup,
  CancelButton,
  PrimaryButton,
  PasswordInput,
  DangerButton,
  AdminSection
} from './profile.styles';

const Profile = () => {
  const { userId: urlUserId } = useParams(); // Get userId from URL if viewing another user
  const navigate = useNavigate();
  const [profileForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [adminPasswordForm] = Form.useForm();
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [adminPasswordLoading, setAdminPasswordLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isOwnProfile, setIsOwnProfile] = useState(true);
  const [isCurrentUserAdmin, setIsCurrentUserAdmin] = useState(false);

  // User data from API
  const [userData, setUserData] = useState({
    id: null,
    username: '',
    email: '',
    bio: '',
    status: '',
    roles: [],
    createdAt: '',
    avatar: null
  });

  // Fetch user profile data
  useEffect(() => {
    fetchUserProfile();
  }, [urlUserId]);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      // Get current logged-in user
      const currentUser = getCurrentUser();
      const currentUserId = currentUser.userId;
      
      // Determine which user to fetch
      const targetUserId = urlUserId || currentUserId;
      
      console.log('Current user ID:', currentUserId);
      console.log('Target user ID:', targetUserId);
      console.log('Is own profile:', !urlUserId || urlUserId === currentUserId);
      
      if (!currentUserId) {
        message.error('User not logged in');
        navigate('/login');
        return;
      }

      // Check if viewing own profile
      const viewingOwnProfile = !urlUserId || urlUserId === currentUserId;
      setIsOwnProfile(viewingOwnProfile);
      
      // Check if current user is admin
      const currentUserRoles = currentUser.roles || [];
      const isAdmin = currentUserRoles.includes('ADMIN');
      setIsCurrentUserAdmin(isAdmin);

      let userDetails;

      // If viewing own profile and not admin, use localStorage data
      if (viewingOwnProfile && !isAdmin) {
        console.log('Using localStorage data for employee profile');
        userDetails = {
          id: currentUser.userId,
          username: currentUser.username,
          email: currentUser.email,
          bio: '', // Not stored in localStorage
          status: 'ACTIVE', // Assume active if logged in
          roles: currentUserRoles,
          createdAt: new Date().toISOString() // Not available
        };
      } else {
        // Admin viewing any profile or viewing another user's profile
        console.log('Fetching user details from API');
        userDetails = await getUserById(targetUserId);
        console.log('User profile fetched:', userDetails);
      }
      
      setUserData({
        id: userDetails.id,
        username: userDetails.username,
        email: userDetails.email,
        bio: userDetails.bio || '',
        status: userDetails.status,
        roles: userDetails.roles || [],
        createdAt: userDetails.createdAt,
        avatar: null // Backend doesn't return avatar URL yet
      });

      // Set form values
      profileForm.setFieldsValue({
        username: userDetails.username,
        bio: userDetails.bio || ''
      });
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      message.error('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSave = async (values) => {
    setProfileLoading(true);
    console.log('Profile update values:', values);
    
    setTimeout(() => {
      setProfileLoading(false);
      message.success('Profile updated successfully!');
    }, 1000);
  };

  const handlePasswordUpdate = async (values) => {
    setPasswordLoading(true);
    console.log('Password update values:', {
      currentPassword: values.currentPassword,
      newPassword: values.newPassword
    });
    
    setTimeout(() => {
      setPasswordLoading(false);
      message.success('Password updated successfully!');
      passwordForm.resetFields();
    }, 1000);
  };

  const handleProfileCancel = () => {
    profileForm.setFieldsValue({
      username: userData.username,
      bio: userData.bio
    });
    message.info('Changes cancelled');
  };

  const handlePasswordCancel = () => {
    passwordForm.resetFields();
    message.info('Password change cancelled');
  };

  const handleAdminPasswordReset = async (values) => {
    setAdminPasswordLoading(true);
    console.log('Admin password reset values:', {
      targetUserId: values.targetUserId,
      newPassword: values.newUserPassword
    });
    
    setTimeout(() => {
      setAdminPasswordLoading(false);
      message.success(`Password reset successfully for user: ${values.targetUserId}`);
      adminPasswordForm.resetFields();
    }, 1000);
  };

  const handleAdminPasswordCancel = () => {
    adminPasswordForm.resetFields();
    message.info('Admin password reset cancelled');
  };

  const uploadProps = {
    beforeUpload: (file) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJpgOrPng) {
        message.error('You can only upload JPG, PNG, or GIF files!');
        return false;
      }
      if (!isLt2M) {
        message.error('Image must be smaller than 2MB!');
        return false;
      }

      message.success('Profile picture uploaded successfully!');
      return false;
    },
    showUploadList: false,
  };

  return (
    <MainLayout>
      <ProfileContainer>
        <ProfileHeader>
          <ProfileTitle>User Profile</ProfileTitle>
          <ProfileSubtitle>Manage your personal information and account settings.</ProfileSubtitle>
        </ProfileHeader>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#8c8c8c' }}>
            Loading profile...
          </div>
        ) : (
          <ProfileContent>
          {/* Profile Information Section */}
          <ProfileSection>
            <SectionTitle>
              {isOwnProfile ? 'Profile Information' : `${userData.username}'s Profile`}
            </SectionTitle>
            <SectionSubtitle>
              {isOwnProfile 
                ? "Update your account's profile information and display picture."
                : 'View user profile information.'}
            </SectionSubtitle>

            <ProfileForm
              form={profileForm}
              layout="vertical"
              onFinish={handleProfileSave}
            >
              <FormGroup>
                <FormLabel>Username</FormLabel>
                <Form.Item
                  name="username"
                  rules={[
                    { required: true, message: 'Please input your username!' },
                    { min: 3, message: 'Username must be at least 3 characters!' }
                  ]}
                >
                  <FormInput 
                    placeholder="employee.user"
                    disabled={!isOwnProfile || profileLoading}
                  />
                </Form.Item>
              </FormGroup>

              <FormGroup>
                <FormLabel>Email</FormLabel>
                <FormInput 
                  value={userData.email}
                  disabled
                  style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                />
                <UploadHint>Email cannot be changed</UploadHint>
              </FormGroup>

              {!isOwnProfile && (
                <>
                  <FormGroup>
                    <FormLabel>Status</FormLabel>
                    <FormInput 
                      value={userData.status}
                      disabled
                      style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Role</FormLabel>
                    <FormInput 
                      value={userData.roles && userData.roles.includes('ADMIN') ? 'Admin' : 'Employee'}
                      disabled
                      style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Member Since</FormLabel>
                    <FormInput 
                      value={new Date(userData.createdAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                      disabled
                      style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                    />
                  </FormGroup>
                </>
              )}

              {isOwnProfile && (
                <FormGroup>
                  <FormLabel>Change Display Picture</FormLabel>
                  <AvatarSection>
                    <AvatarContainer>
                      <ProfileAvatar 
                        size={64} 
                        icon={<UserOutlined />}
                        src={userData.avatar}
                      />
                    </AvatarContainer>
                    <div>
                      <Upload {...uploadProps}>
                        <UploadButton 
                          icon={<UploadOutlined />} 
                          disabled={profileLoading}
                        >
                          Upload Avatar
                        </UploadButton>
                      </Upload>
                      <UploadHint>Upload a new avatar. Max file size: 2MB. (PNG, JPG, GIF)</UploadHint>
                    </div>
                  </AvatarSection>
                </FormGroup>
              )}

              {!isOwnProfile && (
                <FormGroup>
                  <FormLabel>Display Picture</FormLabel>
                  <AvatarSection>
                    <AvatarContainer>
                      <ProfileAvatar 
                        size={64} 
                        icon={<UserOutlined />}
                        src={userData.avatar}
                      />
                    </AvatarContainer>
                  </AvatarSection>
                </FormGroup>
              )}

              <FormGroup>
                <FormLabel>Bio</FormLabel>
                <Form.Item
                  name="bio"
                  rules={[
                    { max: 500, message: 'Bio cannot exceed 500 characters!' }
                  ]}
                >
                  <FormTextArea
                    rows={4}
                    placeholder="Tell us about yourself..."
                    disabled={!isOwnProfile || profileLoading}
                    showCount={isOwnProfile}
                    maxLength={500}
                  />
                </Form.Item>
              </FormGroup>

              {isOwnProfile && (
                <ButtonGroup>
                  <CancelButton onClick={handleProfileCancel} disabled={profileLoading}>
                    Cancel
                  </CancelButton>
                  <PrimaryButton 
                    type="primary" 
                    htmlType="submit" 
                    loading={profileLoading}
                  >
                    Save Changes
                  </PrimaryButton>
                </ButtonGroup>
              )}
            </ProfileForm>
          </ProfileSection>

          {/* Change Password Section - Only show for own profile */}
          {isOwnProfile && (
          <ProfileSection>
            <SectionTitle>Change Password</SectionTitle>
            <SectionSubtitle>Update your password. Requires your current password for security.</SectionSubtitle>

            <ProfileForm
              form={passwordForm}
              layout="vertical"
              onFinish={handlePasswordUpdate}
            >
              <FormGroup>
                <FormLabel>Current Password</FormLabel>
                <Form.Item
                  name="currentPassword"
                  rules={[
                    { required: true, message: 'Please input your current password!' }
                  ]}
                >
                  <PasswordInput
                    placeholder="Enter current password"
                    disabled={passwordLoading}
                  />
                </Form.Item>
              </FormGroup>

              <FormGroup>
                <FormLabel>New Password</FormLabel>
                <Form.Item
                  name="newPassword"
                  rules={[
                    { required: true, message: 'Please input your new password!' },
                    { min: 6, message: 'Password must be at least 6 characters!' }
                  ]}
                >
                  <PasswordInput
                    placeholder="Enter new password"
                    disabled={passwordLoading}
                  />
                </Form.Item>
              </FormGroup>

              <FormGroup>
                <FormLabel>Confirm New Password</FormLabel>
                <Form.Item
                  name="confirmPassword"
                  dependencies={['newPassword']}
                  rules={[
                    { required: true, message: 'Please confirm your new password!' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('newPassword') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('The two passwords do not match!'));
                      },
                    }),
                  ]}
                >
                  <PasswordInput
                    placeholder="Confirm new password"
                    disabled={passwordLoading}
                  />
                </Form.Item>
              </FormGroup>

              <ButtonGroup>
                <CancelButton onClick={handlePasswordCancel} disabled={passwordLoading}>
                  Cancel
                </CancelButton>
                <PrimaryButton 
                  type="primary" 
                  htmlType="submit" 
                  loading={passwordLoading}
                >
                  Update Password
                </PrimaryButton>
              </ButtonGroup>
            </ProfileForm>
          </ProfileSection>
          )}

          {/* Admin: Manage User Passwords Section - Only show for admin users viewing own profile */}
          {isOwnProfile && userData.roles && userData.roles.includes('ADMIN') && (
            <AdminSection>
              <SectionTitle>Admin: Manage User Passwords</SectionTitle>
              <SectionSubtitle>As an Admin, you can reset passwords for other users.</SectionSubtitle>

              <ProfileForm
                form={adminPasswordForm}
                layout="vertical"
                onFinish={handleAdminPasswordReset}
              >
                <FormGroup>
                  <FormLabel>Target User ID</FormLabel>
                  <Form.Item
                    name="targetUserId"
                    rules={[
                      { required: true, message: 'Please input the user ID to reset password!' },
                      { min: 3, message: 'User ID must be at least 3 characters!' }
                    ]}
                  >
                    <FormInput
                      placeholder="Enter user ID to reset password"
                      disabled={adminPasswordLoading}
                    />
                  </Form.Item>
                </FormGroup>

                <FormGroup>
                  <FormLabel>New Password for User</FormLabel>
                  <Form.Item
                    name="newUserPassword"
                    rules={[
                      { required: true, message: 'Please input the new password for user!' },
                      { min: 6, message: 'Password must be at least 6 characters!' }
                    ]}
                  >
                    <PasswordInput
                      placeholder="Enter new password for user"
                      disabled={adminPasswordLoading}
                    />
                  </Form.Item>
                </FormGroup>

                <FormGroup>
                  <FormLabel>Confirm New Password</FormLabel>
                  <Form.Item
                    name="confirmUserPassword"
                    dependencies={['newUserPassword']}
                    rules={[
                      { required: true, message: 'Please confirm the new password for user!' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('newUserPassword') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('The two passwords do not match!'));
                        },
                      }),
                    ]}
                  >
                    <PasswordInput
                      placeholder="Confirm new password for user"
                      disabled={adminPasswordLoading}
                    />
                  </Form.Item>
                </FormGroup>

                <ButtonGroup>
                  <CancelButton onClick={handleAdminPasswordCancel} disabled={adminPasswordLoading}>
                    Cancel
                  </CancelButton>
                  <DangerButton 
                    htmlType="submit" 
                    loading={adminPasswordLoading}
                  >
                    Reset User Password
                  </DangerButton>
                </ButtonGroup>
              </ProfileForm>
            </AdminSection>
          )}
        </ProfileContent>
        )}
      </ProfileContainer>
    </MainLayout>
  );
};

export default Profile;