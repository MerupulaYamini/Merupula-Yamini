import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { PageTitle, PageSubtitle } from '../dashboard/dashboard.styles';
import { PlaceholderContent } from './user-management.styles';

const UserManagement = () => {
  return (
    <MainLayout>
      <PageTitle>User Management</PageTitle>
      <PageSubtitle>
        Manage users, roles, and permissions in your TicketFlow system.
      </PageSubtitle>
      
      <PlaceholderContent>
        User Management page content will be implemented here.
        <br />
        This page uses the same header and sidebar as the Dashboard.
      </PlaceholderContent>
    </MainLayout>
  );
};

export default UserManagement;