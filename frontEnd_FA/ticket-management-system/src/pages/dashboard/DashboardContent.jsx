import React, { useState } from 'react';
import { message, Input, Avatar } from 'antd';
import {
  PlusCircleOutlined,
  SearchOutlined,
  DeleteOutlined,
  EyeOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import {
  PageTitle,
  PageSubtitle,
  PendingCard,
  UserItem,
  UserInfo,
  UserDetails,
  ActionButtons,
  AcceptButton,
  DeclineButton,
  PaginationContainer,
  ShowingText,
  PaginationButtons,
  PaginationButton,
  TicketSection,
  SectionTitle,
  TicketHeader,
  CreateTicketButton,
  TicketFilters,
  SearchInput,
  FilterSelect,
  TicketTable,
  TableHeader,
  TableRow,
  TicketId,
  TicketTitle,
  LabelTag,
  StatusTag,
  UserName,
  ActionMenu,
  DeleteButton,
  ViewButton,
  NoTicketsMessage,
  UserAvatarColored
} from './dashboard.styles';

const DashboardContent = () => {
  const navigate = useNavigate();
  // Mock data for pending registrations
  const [pendingUsers, setPendingUsers] = useState([
    {
      id: 1,
      name: 'Frank Green',
      email: 'frank.g@example.com',
      avatar: 'F'
    },
    {
      id: 2,
      name: 'Grace Hall',
      email: 'grace.h@example.com',
      avatar: 'G'
    },
    {
      id: 3,
      name: 'Harry King',
      email: 'harry.k@example.com',
      avatar: 'H'
    }
  ]);

  // Mock data for tickets
  const [tickets, setTickets] = useState([
    {
      id: 'TKT-001',
      title: 'Implement user authentication',
      label: 'New Feature',
      labelType: 'new-feature',
      status: 'In Progress',
      statusType: 'in-progress',
      assignedTo: 'Alice Johnson',
      createdBy: 'Admin User'
    },
    {
      id: 'TKT-002',
      title: 'Fix database connection issue',
      label: 'Bug',
      labelType: 'bug',
      status: 'Todo',
      statusType: 'todo',
      assignedTo: 'Bob Williams',
      createdBy: 'Alice Johnson'
    },
    {
      id: 'TKT-003',
      title: 'Refactor ticket detail page component',
      label: 'Improvement',
      labelType: 'improvement',
      status: 'Review',
      statusType: 'review',
      assignedTo: 'Charlie Brown',
      createdBy: 'Admin User'
    },
    {
      id: 'TKT-004',
      title: 'Add file upload support in comments',
      label: 'New Feature',
      labelType: 'new-feature',
      status: 'Ready To Deploy',
      statusType: 'ready-to-deploy',
      assignedTo: 'Alice Johnson',
      createdBy: 'Bob Williams'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [labelFilter, setLabelFilter] = useState('All');

  const handleAccept = (userId) => {
    setPendingUsers(users => users.filter(user => user.id !== userId));
    message.success('User registration accepted');
  };

  const handleDecline = (userId) => {
    setPendingUsers(users => users.filter(user => user.id !== userId));
    message.success('User registration declined');
  };

  const handleCreateTicket = () => {
    message.info('Create ticket functionality will be implemented with API');
  };

  const handleDeleteTicket = (ticketId) => {
    setTickets(tickets => tickets.filter(ticket => ticket.id !== ticketId));
    message.success('Ticket deleted successfully');
  };

  const handleViewTicket = (ticketId) => {
    navigate(`/ticket/${ticketId}`);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || ticket.status === statusFilter;
    const matchesLabel = labelFilter === 'All' || ticket.label === labelFilter;
    
    return matchesSearch && matchesStatus && matchesLabel;
  });

  const getAvatarColor = (name) => {
    const colors = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae', '#87d068'];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <>
      <PageTitle>Dashboard</PageTitle>
      <PageSubtitle>
        Welcome back, Admin User! Here's an overview of your TicketFlow system.
      </PageSubtitle>

      <PendingCard title="Pending Registrations">
        {pendingUsers.map((user) => (
          <UserItem key={user.id}>
            <UserInfo>
              <UserAvatarColored bgcolor={getAvatarColor(user.name)}>
                {user.avatar}
              </UserAvatarColored>
              <UserDetails>
                <p className="user-name">{user.name}</p>
                <p className="user-email">{user.email}</p>
              </UserDetails>
            </UserInfo>
            
            <ActionButtons>
              <AcceptButton 
                size="small"
                onClick={() => handleAccept(user.id)}
              >
                Accept
              </AcceptButton>
              <DeclineButton 
                size="small"
                onClick={() => handleDecline(user.id)}
              >
                Decline
              </DeclineButton>
            </ActionButtons>
          </UserItem>
        ))}
        
        <PaginationContainer>
          <ShowingText>
            Showing 1-3 of {pendingUsers.length} Users
          </ShowingText>
          <PaginationButtons>
            <PaginationButton size="small" disabled>
              Previous
            </PaginationButton>
            <PaginationButton size="small" disabled>
              Next
            </PaginationButton>
          </PaginationButtons>
        </PaginationContainer>
      </PendingCard>

      <TicketSection>
        <SectionTitle>Ticket Management</SectionTitle>
        
        <TicketHeader>
          <CreateTicketButton 
            type="primary" 
            icon={<PlusCircleOutlined />}
            onClick={handleCreateTicket}
          >
            Create New Ticket
          </CreateTicketButton>
          
          <TicketFilters>
            <SearchInput
              placeholder="Search tickets..."
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <FilterSelect 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Review">Review</option>
              <option value="Ready To Deploy">Ready To Deploy</option>
            </FilterSelect>
            <FilterSelect 
              value={labelFilter} 
              onChange={(e) => setLabelFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="New Feature">New Feature</option>
              <option value="Bug">Bug</option>
              <option value="Improvement">Improvement</option>
            </FilterSelect>
          </TicketFilters>
        </TicketHeader>

        <TicketTable>
          <TableHeader>
            <div>Ticket ID</div>
            <div>Title</div>
            <div>Label</div>
            <div>Status</div>
            <div>Assigned To</div>
            <div>Created By</div>
            <div>Actions</div>
          </TableHeader>
          
          {filteredTickets.map((ticket) => (
            <TableRow key={ticket.id}>
              <TicketId>{ticket.id}</TicketId>
              <TicketTitle>{ticket.title}</TicketTitle>
              <LabelTag className={ticket.labelType}>{ticket.label}</LabelTag>
              <StatusTag className={ticket.statusType}>{ticket.status}</StatusTag>
              <UserName>{ticket.assignedTo}</UserName>
              <UserName>{ticket.createdBy}</UserName>
              <ActionMenu>
                <ViewButton 
                  icon={<EyeOutlined />}
                  size="small"
                  onClick={() => handleViewTicket(ticket.id)}
                  title="View Details"
                />
                <DeleteButton 
                  icon={<DeleteOutlined />}
                  size="small"
                  onClick={() => handleDeleteTicket(ticket.id)}
                  title="Delete Ticket"
                />
              </ActionMenu>
            </TableRow>
          ))}
        </TicketTable>
        
        {filteredTickets.length === 0 && (
          <NoTicketsMessage>
            No tickets found matching your criteria.
          </NoTicketsMessage>
        )}
      </TicketSection>
    </>
  );
};

export default DashboardContent;