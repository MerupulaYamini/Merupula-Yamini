import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { PageTitle, PageSubtitle } from '../dashboard/dashboard.styles';
import { PlaceholderContent } from './create-ticket.styles';

const CreateTicket = () => {
  return (
    <MainLayout>
      <PageTitle>Create Ticket</PageTitle>
      <PageSubtitle>
        Create new tickets and track issues in your TicketFlow system.
      </PageSubtitle>
      
      <PlaceholderContent>
        Create Ticket page content will be implemented here.
        <br />
        This page uses the same header and sidebar as the Dashboard.
      </PlaceholderContent>
    </MainLayout>
  );
};

export default CreateTicket;