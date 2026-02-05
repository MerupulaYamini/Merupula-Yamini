import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import {
  PlusCircleOutlined,
  SearchOutlined,
  DeleteOutlined,
  EyeOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getAllTickets, deleteTicket, mapStatus, mapLabel } from '../../services/ticketService';
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
  
  // State for tickets
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0
  });
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [labelFilter, setLabelFilter] = useState('All');
  
  // Mock data for pending registrations (keep this as is for now)
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

  // Fetch tickets from API
  const fetchTickets = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.page,
        size: pagination.size,
        sort: 'createdAt,desc'
      };

      // Add filters if set
      if (searchTerm) params.search = searchTerm;
      if (statusFilter !== 'All') params.status = statusFilter;
      if (labelFilter !== 'All') params.label = labelFilter;

      const data = await getAllTickets(params);
      
      // Map backend data to frontend format
      const mappedTickets = data.content.map(ticket => ({
        id: ticket.id,
        title: ticket.title,
        label: ticket.label,
        labelType: mapLabel(ticket.label),
        status: ticket.status,
        statusType: mapStatus(ticket.status),
        assignedTo: ticket.assignedToName || 'Unassigned',
        createdBy: ticket.createdByName || 'Unknown',
        createdAt: ticket.createdAt,
        updatedAt: ticket.updatedAt
      }));

      setTickets(mappedTickets);
      setPagination({
        page: data.pageable.pageNumber,
        size: data.pageable.pageSize,
        totalElements: data.totalElements,
        totalPages: data.totalPages
      });
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
      message.error(error.message || 'Failed to load tickets');
    } finally {
      setLoading(false);
    }
  };

  // Fetch tickets on component mount and when filters change
  useEffect(() => {
    fetchTickets();
  }, [pagination.page, statusFilter, labelFilter]);

  // Handle search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== undefined) {
        fetchTickets();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleCreateTicket = () => {
    navigate('/create-ticket');
  };

  const handleDeleteTicket = async (ticketId) => {
    try {
      await deleteTicket(ticketId);
      message.success('Ticket deleted successfully');
      fetchTickets(); // Refresh the list
    } catch (error) {
      console.error('Delete ticket error:', error);
      message.error(error.message || 'Failed to delete ticket');
    }
  };

  const handleViewTicket = (ticketId) => {
    navigate(`/ticket/${ticketId}`);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setPagination(prev => ({ ...prev, page: 0 })); // Reset to first page
  };

  const handleLabelFilterChange = (e) => {
    setLabelFilter(e.target.value);
    setPagination(prev => ({ ...prev, page: 0 })); // Reset to first page
  };

  const handlePreviousPage = () => {
    if (pagination.page > 0) {
      setPagination(prev => ({ ...prev, page: prev.page - 1 }));
    }
  };

  const handleNextPage = () => {
    if (pagination.page < pagination.totalPages - 1) {
      setPagination(prev => ({ ...prev, page: prev.page + 1 }));
    }
  };

  const handleAccept = (userId) => {
    setPendingUsers(users => users.filter(user => user.id !== userId));
    message.success('User registration accepted');
  };

  const handleDecline = (userId) => {
    setPendingUsers(users => users.filter(user => user.id !== userId));
    message.success('User registration declined');
  };

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
              disabled={loading}
            />
            <FilterSelect 
              value={statusFilter} 
              onChange={handleStatusFilterChange}
              disabled={loading}
            >
              <option value="All">All Status</option>
              <option value="TODO">Todo</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="REVIEW">Review</option>
              <option value="READY_TO_DEPLOY">Ready To Deploy</option>
            </FilterSelect>
            <FilterSelect 
              value={labelFilter} 
              onChange={handleLabelFilterChange}
              disabled={loading}
            >
              <option value="All">All Labels</option>
              <option value="NEW_FEATURE">New Feature</option>
              <option value="BUG">Bug</option>
              <option value="IMPROVEMENT">Improvement</option>
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
          
          {loading ? (
            <NoTicketsMessage>
              Loading tickets...
            </NoTicketsMessage>
          ) : tickets.length === 0 ? (
            <NoTicketsMessage>
              No tickets found matching your criteria.
            </NoTicketsMessage>
          ) : (
            tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TicketId>TKT-{String(ticket.id).padStart(3, '0')}</TicketId>
                <TicketTitle>{ticket.title}</TicketTitle>
                <LabelTag className={ticket.labelType}>{ticket.label}</LabelTag>
                <StatusTag className={ticket.statusType}>{ticket.status.replace('_', ' ')}</StatusTag>
                <UserName>{ticket.assignedTo}</UserName>
                <UserName>{ticket.createdBy}</UserName>
                <ActionMenu>
                  <ViewButton 
                    icon={<EyeOutlined />}
                    size="small"
                    onClick={() => handleViewTicket(ticket.id)}
                    title="View Details"
                    disabled={loading}
                  />
                  <DeleteButton 
                    icon={<DeleteOutlined />}
                    size="small"
                    onClick={() => handleDeleteTicket(ticket.id)}
                    title="Delete Ticket"
                    disabled={loading}
                  />
                </ActionMenu>
              </TableRow>
            ))
          )}
        </TicketTable>
        
        {!loading && tickets.length > 0 && (
          <PaginationContainer>
            <ShowingText>
              Showing {pagination.page * pagination.size + 1}-{Math.min((pagination.page + 1) * pagination.size, pagination.totalElements)} of {pagination.totalElements} tickets
            </ShowingText>
            <PaginationButtons>
              <PaginationButton 
                size="small" 
                disabled={pagination.page === 0 || loading}
                onClick={handlePreviousPage}
              >
                Previous
              </PaginationButton>
              <PaginationButton 
                size="small" 
                disabled={pagination.page >= pagination.totalPages - 1 || loading}
                onClick={handleNextPage}
              >
                Next
              </PaginationButton>
            </PaginationButtons>
          </PaginationContainer>
        )}
      </TicketSection>
    </>
  );
};

export default DashboardContent;