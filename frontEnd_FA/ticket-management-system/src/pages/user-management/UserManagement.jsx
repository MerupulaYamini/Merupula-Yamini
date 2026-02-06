import React, { useState, useEffect } from 'react';
import { message, Modal } from 'antd';
import {
  SearchOutlined,
  DeleteOutlined,
  EyeOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import { getAllUsers, getUserById, deleteUser, updateUserRole } from '../../services/authService';
import {
  PageTitle,
  PageSubtitle,
  TicketSection,
  SectionTitle,
  TicketHeader,
  TicketFilters,
  SearchInput,
  FilterSelect,
  UserName,
  ActionMenu,
  DeleteButton,
  ViewButton,
  NoTicketsMessage,
  UserAvatarColored
} from '../dashboard/dashboard.styles';
import { StatusTag, RoleTag, UserInfoContainer, SectionDescription, PaginationFooter, PaginationInfo, PaginationControls, PaginationBtn, TitleContainer, UserManagementTable, UserTableHeader, UserTableRow } from './user-management.styles';

const UserManagement = () => {
  const navigate = useNavigate();
  // State for users
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const usersData = await getAllUsers();
      
      const usersWithRoles = await Promise.all(
        usersData.map(async (user) => {
          try {
            const userDetails = await getUserById(user.id);
            return {
              ...user,
              roles: userDetails.roles || ['EMPLOYEE']
            };
          } catch (error) {
            return {
              ...user,
              roles: ['EMPLOYEE']
            };
          }
        })
      );
      
      setUsers(usersWithRoles);
    } catch (error) {
      message.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = (userId, username) => {
    Modal.confirm({
      title: 'Delete User',
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to delete user "${username}"? This action cannot be undone.`,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await deleteUser(userId);
          message.success('User deleted successfully');
          fetchUsers();
        } catch (error) {
          message.error(error.message || 'Failed to delete user');
        }
      }
    });
  };

  const handleRoleChange = (userId, username, currentRole, newRole) => {
    Modal.confirm({
      title: 'Update User Role',
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to change "${username}"'s role from ${currentRole} to ${newRole}?`,
      okText: 'Update Role',
      okType: 'primary',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await updateUserRole(userId, newRole);
          message.success(`User role updated to ${newRole} successfully`);
          fetchUsers();
        } catch (error) {
          message.error(error.message || 'Failed to update user role');
        }
      }
    });
  };

  const handleViewUser = (userId) => {
    navigate(`/profile/${userId}`);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
    const matchesRole = roleFilter === 'All' || (user.roles && user.roles.includes(roleFilter));
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  const getAvatarColor = (name) => {
    const colors = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae', '#87d068'];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const getStatusTag = (status) => {
    return (
      <StatusTag className={status.toLowerCase()}>
        {status}
      </StatusTag>
    );
  };

  const getRoleTag = (role) => {
    return (
      <RoleTag className={role.toLowerCase()}>
        {role}
      </RoleTag>
    );
  };

  return (
    <MainLayout>
      <PageTitle>User Management</PageTitle>
      <PageSubtitle>
        Manage users, roles, and permissions in your TicketFlow system.
      </PageSubtitle>

      <TicketSection>
        <TicketHeader>
          <TitleContainer>
            <SectionTitle>All Users</SectionTitle>
            <SectionDescription>
              Manage your team's access and roles.
            </SectionDescription>
          </TitleContainer>
          
          <TicketFilters>
            <SearchInput
              placeholder="Search users by name or email..."
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <FilterSelect 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">Filter Status</option>
              <option value="ACTIVE">Active</option>
              <option value="PENDING">Pending</option>
            </FilterSelect>
            <FilterSelect 
              value={roleFilter} 
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="All">Filter Role</option>
              <option value="ADMIN">Admin</option>
              <option value="EMPLOYEE">Employee</option>
            </FilterSelect>
          </TicketFilters>
        </TicketHeader>

        <UserManagementTable>
          <UserTableHeader>
            <div>Name</div>
            <div>Email</div>
            <div>Role</div>
            <div>Status</div>
            <div>Actions</div>
            <div></div>
            <div></div>
          </UserTableHeader>
          
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#8c8c8c' }}>
              Loading users...
            </div>
          ) : (
            filteredUsers.map((user) => {
              const isAdmin = user.roles && user.roles.includes('ADMIN');
              return (
                <UserTableRow key={user.id}>
                  <UserInfoContainer>
                    <UserAvatarColored bgcolor={getAvatarColor(user.username)} size={32}>
                      {user.username.charAt(0).toUpperCase()}
                    </UserAvatarColored>
                    <UserName>{user.username}</UserName>
                  </UserInfoContainer>
                  <UserName>{user.email}</UserName>
                  <FilterSelect 
                    value={isAdmin ? 'ADMIN' : 'EMPLOYEE'}
                    onChange={(e) => {
                      const newRole = e.target.value;
                      const currentRole = isAdmin ? 'ADMIN' : 'EMPLOYEE';
                      if (newRole !== currentRole) {
                        handleRoleChange(user.id, user.username, currentRole, newRole);
                      }
                    }}
                    disabled={loading}
                    style={{ 
                      minWidth: '120px',
                      backgroundColor: isAdmin ? '#e6f7ff' : '#f6ffed',
                      color: isAdmin ? '#1890ff' : '#52c41a',
                      fontWeight: '500',
                      border: isAdmin ? '1px solid #91d5ff' : '1px solid #b7eb8f'
                    }}
                  >
                    <option value="EMPLOYEE">Employee</option>
                    <option value="ADMIN">Admin</option>
                  </FilterSelect>
                  {getStatusTag(user.status)}
                  <ActionMenu>
                    <ViewButton 
                      icon={<EyeOutlined />}
                      size="small"
                      onClick={() => handleViewUser(user.id)}
                      title="View User Details"
                      disabled={loading}
                    />
                    {!isAdmin && (
                      <DeleteButton 
                        icon={<DeleteOutlined />}
                        size="small"
                        onClick={() => handleDeleteUser(user.id, user.username)}
                        title="Delete User"
                        disabled={loading}
                      />
                    )}
                  </ActionMenu>
                  <div></div>
                  <div></div>
                </UserTableRow>
              );
            })
          )}
        </UserManagementTable>
        
        {!loading && filteredUsers.length === 0 && (
          <NoTicketsMessage>
            No users found matching your criteria.
          </NoTicketsMessage>
        )}

        <PaginationFooter>
          <PaginationInfo>
            Showing 1-{filteredUsers.length} of {users.length} users
          </PaginationInfo>
          <PaginationControls>
            <PaginationBtn disabled>
              Previous
            </PaginationBtn>
            <PaginationBtn disabled>
              Next
            </PaginationBtn>
          </PaginationControls>
        </PaginationFooter>
      </TicketSection>
    </MainLayout>
  );
};

export default UserManagement;