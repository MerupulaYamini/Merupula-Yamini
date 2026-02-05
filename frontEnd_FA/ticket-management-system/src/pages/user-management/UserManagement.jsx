import React, { useState } from 'react';
import { message, Avatar } from 'antd';
import {
  SearchOutlined,
  DeleteOutlined,
  EyeOutlined
} from '@ant-design/icons';
import MainLayout from '../../components/layout/MainLayout';
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
  // Mock data for users
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice.j@example.com',
      role: 'Admin',
      status: 'ACTIVE'
    },
    {
      id: 2,
      name: 'Bob Williams',
      email: 'bob.w@example.com',
      role: 'Employee',
      status: 'PENDING'
    },
    {
      id: 3,
      name: 'Charlie Brown',
      email: 'charlie.b@example.com',
      role: 'Employee',
      status: 'ACTIVE'
    },
    {
      id: 4,
      name: 'Diana Prince',
      email: 'diana.p@example.com',
      role: 'Admin',
      status: 'ACTIVE'
    },
    {
      id: 5,
      name: 'Eve Adams',
      email: 'eve.a@example.com',
      role: 'Employee',
      status: 'PENDING'
    },
    {
      id: 6,
      name: 'Frank Miller',
      email: 'frank.m@example.com',
      role: 'Employee',
      status: 'ACTIVE'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');

  const handleDeleteUser = (userId) => {
    setUsers(users => users.filter(user => user.id !== userId));
    message.success('User deleted successfully');
  };

  const handleViewUser = (userId) => {
    message.info(`Viewing user details for ID: ${userId}`);
    // In a real app, this would navigate to user details page
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
    const matchesRole = roleFilter === 'All' || user.role === roleFilter;
    
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
              <option value="Admin">Admin</option>
              <option value="Employee">Employee</option>
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
          
          {filteredUsers.map((user) => (
            <UserTableRow key={user.id}>
              <UserInfoContainer>
                <UserAvatarColored bgcolor={getAvatarColor(user.name)} size={32}>
                  {user.name.charAt(0)}
                </UserAvatarColored>
                <UserName>{user.name}</UserName>
              </UserInfoContainer>
              <UserName>{user.email}</UserName>
              {getRoleTag(user.role)}
              {getStatusTag(user.status)}
              <ActionMenu>
                <ViewButton 
                  icon={<EyeOutlined />}
                  size="small"
                  onClick={() => handleViewUser(user.id)}
                  title="View User Details"
                />
                <DeleteButton 
                  icon={<DeleteOutlined />}
                  size="small"
                  onClick={() => handleDeleteUser(user.id)}
                  title="Delete User"
                />
              </ActionMenu>
              <div></div>
              <div></div>
            </UserTableRow>
          ))}
        </UserManagementTable>
        
        {filteredUsers.length === 0 && (
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