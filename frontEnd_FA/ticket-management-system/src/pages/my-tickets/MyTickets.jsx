import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import {
  SearchOutlined,
  EyeOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import { getMyTickets, mapStatus, mapLabel } from '../../services/ticketService';
import {
  PageTitle,
  PageSubtitle,
  PaginationContainer,
  ShowingText,
  PaginationButtons,
  PaginationButton,
  TicketSection,
  SectionTitle,
  TicketHeader,
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
  ViewButton,
  NoTicketsMessage
} from '../dashboard/dashboard.styles';

const MyTickets = () => {
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
  const [statusFilter, setStatusFilter] = useState('All');
  const [labelFilter, setLabelFilter] = useState('All');

  // Fetch my tickets from API
  const fetchMyTickets = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.page,
        size: pagination.size,
        sort: 'createdAt,desc'
      };

      const data = await getMyTickets(params);
      
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
      message.error(error.message || 'Failed to load my tickets');
    } finally {
      setLoading(false);
    }
  };

  // Fetch tickets on component mount and when page changes
  useEffect(() => {
    fetchMyTickets();
  }, [pagination.page]);

  const handleViewTicket = (ticketId) => {
    navigate(`/ticket/${ticketId}`);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setPagination(prev => ({ ...prev, page: 0 }));
  };

  const handleLabelFilterChange = (e) => {
    setLabelFilter(e.target.value);
    setPagination(prev => ({ ...prev, page: 0 }));
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

  // Apply local filters
  const filteredTickets = tickets.filter(ticket => {
    const matchesStatus = statusFilter === 'All' || ticket.status === statusFilter;
    const matchesLabel = labelFilter === 'All' || ticket.label === labelFilter;
    return matchesStatus && matchesLabel;
  });

  return (
    <MainLayout>
      <PageTitle>My Tickets</PageTitle>
      <PageSubtitle>
        View all tickets assigned to you.
      </PageSubtitle>

      <TicketSection>
        <SectionTitle>Assigned to Me</SectionTitle>
        
        <TicketHeader>
          <TicketFilters>
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
          ) : filteredTickets.length === 0 ? (
            <NoTicketsMessage>
              No tickets assigned to you.
            </NoTicketsMessage>
          ) : (
            filteredTickets.map((ticket) => (
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
                </ActionMenu>
              </TableRow>
            ))
          )}
        </TicketTable>
        
        {!loading && filteredTickets.length > 0 && (
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
    </MainLayout>
  );
};

export default MyTickets;
