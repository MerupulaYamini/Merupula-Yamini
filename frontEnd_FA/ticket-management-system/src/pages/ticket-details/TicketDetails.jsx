import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Tag, Avatar, message } from 'antd';
import { ArrowLeftOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import MainLayout from '../../components/layout/MainLayout';
import {
  TicketDetailsContainer,
  TicketHeader,
  BackButton,
  TicketTitle,
  TicketId,
  ActionButtons,
  EditButton,
  DeleteButton,
  TicketContent,
  InfoSection,
  InfoRow,
  InfoLabel,
  InfoValue,
  StatusTag,
  LabelTag,
  UserInfo,
  UserAvatar,
  UserName,
  DescriptionSection,
  SectionTitle,
  DescriptionText,
  NotFoundMessage
} from './ticket-details.styles';

const TicketDetails = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock ticket data - in real app, this would come from API
  const mockTickets = {
    'TKT-001': {
      id: 'TKT-001',
      title: 'Implement user authentication',
      description: 'We need to implement a comprehensive user authentication system that includes login, registration, password reset, and session management. The system should be secure and follow best practices for authentication.',
      label: 'New Feature',
      labelType: 'new-feature',
      status: 'In Progress',
      statusType: 'in-progress',
      assignedTo: 'Alice Johnson',
      createdBy: 'Admin User',
      createdDate: '2024-02-01',
      priority: 'High',
      estimatedHours: '40',
      actualHours: '25'
    },
    'TKT-002': {
      id: 'TKT-002',
      title: 'Fix database connection issue',
      description: 'Users are experiencing intermittent database connection timeouts. This is affecting the application performance and user experience. We need to investigate and fix the root cause.',
      label: 'Bug',
      labelType: 'bug',
      status: 'Todo',
      statusType: 'todo',
      assignedTo: 'Bob Williams',
      createdBy: 'Alice Johnson',
      createdDate: '2024-02-03',
      priority: 'Critical',
      estimatedHours: '16',
      actualHours: '0'
    },
    'TKT-003': {
      id: 'TKT-003',
      title: 'Refactor ticket detail page component',
      description: 'The current ticket detail page component has become complex and hard to maintain. We should refactor it into smaller, more manageable components and improve the code structure.',
      label: 'Improvement',
      labelType: 'improvement',
      status: 'Review',
      statusType: 'review',
      assignedTo: 'Charlie Brown',
      createdBy: 'Admin User',
      createdDate: '2024-02-02',
      priority: 'Medium',
      estimatedHours: '24',
      actualHours: '20'
    },
    'TKT-004': {
      id: 'TKT-004',
      title: 'Add file upload support in comments',
      description: 'Users should be able to attach files to their comments on tickets. This will help provide better context and documentation for issues and feature requests.',
      label: 'New Feature',
      labelType: 'new-feature',
      status: 'Ready To Deploy',
      statusType: 'ready-to-deploy',
      assignedTo: 'Alice Johnson',
      createdBy: 'Bob Williams',
      createdDate: '2024-01-30',
      priority: 'Low',
      estimatedHours: '32',
      actualHours: '30'
    }
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundTicket = mockTickets[ticketId];
      setTicket(foundTicket);
      setLoading(false);
    }, 500);
  }, [ticketId]);

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleEdit = () => {
    message.info('Edit functionality will be implemented with API');
  };

  const handleDelete = () => {
    message.success('Ticket deleted successfully');
    navigate('/dashboard');
  };

  const getAvatarColor = (name) => {
    const colors = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae', '#87d068'];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return '#ff4d4f';
      case 'High': return '#fa8c16';
      case 'Medium': return '#1890ff';
      case 'Low': return '#52c41a';
      default: return '#8c8c8c';
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <TicketDetailsContainer>
          <div>Loading ticket details...</div>
        </TicketDetailsContainer>
      </MainLayout>
    );
  }

  if (!ticket) {
    return (
      <MainLayout>
        <TicketDetailsContainer>
          <NotFoundMessage>
            <h2>Ticket Not Found</h2>
            <p>The ticket with ID "{ticketId}" could not be found.</p>
            <BackButton onClick={handleBack}>
              <ArrowLeftOutlined /> Back to Dashboard
            </BackButton>
          </NotFoundMessage>
        </TicketDetailsContainer>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <TicketDetailsContainer>
        <TicketHeader>
          <div>
            <BackButton onClick={handleBack}>
              <ArrowLeftOutlined /> Back to Dashboard
            </BackButton>
            <TicketTitle>{ticket.title}</TicketTitle>
            <TicketId>{ticket.id}</TicketId>
          </div>
          
          <ActionButtons>
            <EditButton icon={<EditOutlined />} onClick={handleEdit}>
              Edit
            </EditButton>
            <DeleteButton icon={<DeleteOutlined />} onClick={handleDelete}>
              Delete
            </DeleteButton>
          </ActionButtons>
        </TicketHeader>

        <TicketContent>
          <InfoSection>
            <InfoRow>
              <InfoLabel>Status:</InfoLabel>
              <InfoValue>
                <StatusTag className={ticket.statusType}>{ticket.status}</StatusTag>
              </InfoValue>
            </InfoRow>
            
            <InfoRow>
              <InfoLabel>Label:</InfoLabel>
              <InfoValue>
                <LabelTag className={ticket.labelType}>{ticket.label}</LabelTag>
              </InfoValue>
            </InfoRow>
            
            <InfoRow>
              <InfoLabel>Priority:</InfoLabel>
              <InfoValue>
                <Tag color={getPriorityColor(ticket.priority)}>{ticket.priority}</Tag>
              </InfoValue>
            </InfoRow>
            
            <InfoRow>
              <InfoLabel>Assigned To:</InfoLabel>
              <InfoValue>
                <UserInfo>
                  <UserAvatar bgcolor={getAvatarColor(ticket.assignedTo)}>
                    {ticket.assignedTo.charAt(0)}
                  </UserAvatar>
                  <UserName>{ticket.assignedTo}</UserName>
                </UserInfo>
              </InfoValue>
            </InfoRow>
            
            <InfoRow>
              <InfoLabel>Created By:</InfoLabel>
              <InfoValue>
                <UserInfo>
                  <UserAvatar bgcolor={getAvatarColor(ticket.createdBy)}>
                    {ticket.createdBy.charAt(0)}
                  </UserAvatar>
                  <UserName>{ticket.createdBy}</UserName>
                </UserInfo>
              </InfoValue>
            </InfoRow>
            
            <InfoRow>
              <InfoLabel>Created Date:</InfoLabel>
              <InfoValue>{ticket.createdDate}</InfoValue>
            </InfoRow>
            
            <InfoRow>
              <InfoLabel>Estimated Hours:</InfoLabel>
              <InfoValue>{ticket.estimatedHours}h</InfoValue>
            </InfoRow>
            
            <InfoRow>
              <InfoLabel>Actual Hours:</InfoLabel>
              <InfoValue>{ticket.actualHours}h</InfoValue>
            </InfoRow>
          </InfoSection>

          <DescriptionSection>
            <SectionTitle>Description</SectionTitle>
            <DescriptionText>{ticket.description}</DescriptionText>
          </DescriptionSection>
        </TicketContent>
      </TicketDetailsContainer>
    </MainLayout>
  );
};

export default TicketDetails;