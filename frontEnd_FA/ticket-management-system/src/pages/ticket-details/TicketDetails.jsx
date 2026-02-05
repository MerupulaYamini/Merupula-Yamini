import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Tag, message } from 'antd';
import { 
  ArrowLeftOutlined, 
  EditOutlined, 
  DeleteOutlined,
  FileTextOutlined,
  VideoCameraOutlined,
  PaperClipOutlined,
  ClockCircleOutlined,
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  LinkOutlined
} from '@ant-design/icons';
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
  LeftColumn,
  RightColumn,
  InfoSection,
  InfoRow,
  InfoLabel,
  InfoValue,
  StatusTag,
  LabelTag,
  UserInfo,
  UserName,
  DescriptionSection,
  TicketTitleSection,
  TicketTitleDisplay,
  SectionTitle,
  DescriptionText,
  AttachmentsSection,
  AttachmentsTitle,
  AttachmentsContainer,
  AttachmentPreview,
  AttachmentsList,
  AttachmentItem,
  AttachmentIcon,
  AttachmentInfo,
  AttachmentName,
  AttachmentSize,
  NotFoundMessage,
  UpdateStatusSection,
  UpdateStatusTitle,
  StatusSelectLabel,
  StatusSelect,
  UpdateStatusButton,
  StatusHistorySection,
  StatusHistoryTitle,
  StatusHistoryList,
  StatusHistoryItem,
  StatusHistoryDot,
  StatusHistoryContent,
  StatusHistoryText,
  StatusHistoryTime,
  CommentsSection,
  CommentsSectionTitle,
  CommentsTimeline,
  CommentItem,
  CommentHeader,
  CommentAuthor,
  AuthorName,
  OnlineIndicator,
  CommentTimestamp,
  CommentContent,
  CommentForm,
  RichTextToolbar,
  ToolbarButton,
  CommentTextArea,
  CommentActions,
  AddCommentButton
} from './ticket-details.styles';

const TicketDetails = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false
  });

  // Mock ticket data - in real app, this would come from API
  const mockTickets = {
    'TKT-001': {
      id: 'TKT-001',
      title: 'Implement user authentication',
      ticketTitle: 'Implement User Profile Screen with Password Change',
      description: 'The user profile screen needs to allow users to update their username, display picture, and biography. Additionally, a dedicated section for changing their password must be included. Frontend validations for all fields are required to ensure data integrity and security. Admin users can also update passwords directly from the User Management screen, but this screen focuses on self-management.',
      label: 'New Feature',
      labelType: 'new-feature',
      status: 'In Progress',
      statusType: 'in-progress',
      assignedTo: 'Alice Johnson',
      createdBy: 'Admin User',
      createdDate: '2024-02-01',
      priority: 'High',
      estimatedHours: '40',
      actualHours: '25',
      attachments: [
        {
          id: 1,
          name: 'Profile Screen Mockup Video',
          type: 'video',
          size: '15.2 MB',
          url: '/attachments/profile-mockup.mp4'
        },
        {
          id: 2,
          name: 'User Profile Requirements Document',
          type: 'document',
          size: '2.8 MB',
          url: '/attachments/requirements.pdf'
        }
      ],
      statusHistory: [
        {
          id: 1,
          action: 'Ticket created by Sarah Lee',
          timestamp: '2023-10-25 09:00 AM'
        },
        {
          id: 2,
          action: 'Status changed to "In Progress" by Alex Johnson',
          timestamp: '2023-10-26 10:30 AM'
        },
        {
          id: 3,
          action: 'Assigned to John Smith by Alex Johnson',
          timestamp: '2023-10-26 10:45 AM'
        },
        {
          id: 4,
          action: 'Status changed to "PR Review" by John Smith',
          timestamp: '2023-10-28 02:15 PM'
        }
      ],
      comments: [
        {
          id: 1,
          author: 'Alice Johnson',
          content: 'Initial wireframes for the user profile screen have been completed. Please find them attached. Seeking feedback on the layout and functionality of the password change section.',
          timestamp: '2023-10-26 10:40 AM',
          isOnline: true
        },
        {
          id: 2,
          author: 'Admin User',
          content: 'Great, I\'ll review the wireframes and get back to you with feedback by end of day.',
          timestamp: '2023-10-27 09:30 AM',
          isOnline: false
        },
        {
          id: 3,
          author: 'Admin User',
          content: 'Looks good so far. Ensure password validation rules are clearly communicated to the user.',
          timestamp: '2023-10-28 02:15 PM',
          isOnline: false
        }
      ]
    },
    'TKT-002': {
      id: 'TKT-002',
      title: 'Fix database connection issue',
      ticketTitle: 'Database Connection Timeout Issues',
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
      actualHours: '0',
      attachments: [],
      statusHistory: [
        {
          id: 1,
          action: 'Ticket created by Alice Johnson',
          timestamp: '2024-02-03 08:15 AM'
        },
        {
          id: 2,
          action: 'Assigned to Bob Williams by Admin User',
          timestamp: '2024-02-03 08:30 AM'
        }
      ],
      comments: [
        {
          id: 1,
          author: 'Alice Johnson',
          content: 'I\'ve noticed this issue occurring during peak hours. The connection pool might be exhausted.',
          timestamp: '2024-02-03 09:15 AM',
          isOnline: true
        },
        {
          id: 2,
          author: 'Bob Williams',
          content: 'I\'ll investigate the connection pool settings and monitor the database performance.',
          timestamp: '2024-02-03 11:30 AM',
          isOnline: false
        }
      ]
    },
    'TKT-003': {
      id: 'TKT-003',
      title: 'Refactor ticket detail page component',
      ticketTitle: 'Component Refactoring for Better Maintainability',
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
      actualHours: '20',
      attachments: [],
      statusHistory: [
        {
          id: 1,
          action: 'Ticket created by Admin User',
          timestamp: '2024-02-02 11:00 AM'
        },
        {
          id: 2,
          action: 'Status changed to "In Progress" by Charlie Brown',
          timestamp: '2024-02-02 02:30 PM'
        },
        {
          id: 3,
          action: 'Status changed to "Review" by Charlie Brown',
          timestamp: '2024-02-05 04:15 PM'
        }
      ],
      comments: [
        {
          id: 1,
          author: 'Charlie Brown',
          content: 'Started breaking down the component into smaller pieces. The main areas to focus on are:\n• State management\n• Event handlers\n• UI rendering logic',
          timestamp: '2024-02-02 03:45 PM',
          isOnline: true
        }
      ]
    },
    'TKT-004': {
      id: 'TKT-004',
      title: 'Add file upload support in comments',
      ticketTitle: 'File Upload Feature Implementation',
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
      actualHours: '30',
      attachments: [],
      statusHistory: [
        {
          id: 1,
          action: 'Ticket created by Bob Williams',
          timestamp: '2024-01-30 09:45 AM'
        },
        {
          id: 2,
          action: 'Assigned to Alice Johnson by Admin User',
          timestamp: '2024-01-30 10:00 AM'
        },
        {
          id: 3,
          action: 'Status changed to "In Progress" by Alice Johnson',
          timestamp: '2024-01-31 09:15 AM'
        },
        {
          id: 4,
          action: 'Status changed to "Ready To Deploy" by Alice Johnson',
          timestamp: '2024-02-04 03:30 PM'
        }
      ],
      comments: [
        {
          id: 1,
          author: 'Alice Johnson',
          content: 'File upload functionality has been implemented and tested. Ready for deployment to staging environment.',
          timestamp: '2024-02-04 03:45 PM',
          isOnline: true
        }
      ]
    }
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundTicket = mockTickets[ticketId];
      setTicket(foundTicket);
      if (foundTicket) {
        setSelectedStatus(foundTicket.status);
        setComments(foundTicket.comments || []);
      }
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

  const handleStatusUpdate = () => {
    setTicket(prev => ({ ...prev, status: selectedStatus }));
    message.success('Ticket status updated successfully');
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
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

  const getAttachmentIcon = (type) => {
    switch (type) {
      case 'video': return <VideoCameraOutlined />;
      case 'document': return <FileTextOutlined />;
      default: return <PaperClipOutlined />;
    }
  };

  const handleAttachmentClick = (attachment) => {
    message.info(`Opening ${attachment.name}...`);
    // In real app, this would open/download the file
  };

  const handleAddComment = () => {
    if (!newComment.trim()) {
      message.warning('Please enter a comment');
      return;
    }

    const comment = {
      id: comments.length + 1,
      author: 'Current User', // In real app, this would come from auth context
      content: newComment,
      timestamp: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      isOnline: true
    };

    setComments([comment, ...comments]); // Add to top for latest first
    setNewComment('');
    message.success('Comment added successfully');
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleFormatToggle = (format) => {
    setActiveFormats(prev => ({
      ...prev,
      [format]: !prev[format]
    }));
    // In a real implementation, this would apply formatting to selected text
  };

  const insertList = (type) => {
    const listText = type === 'ordered' ? '1. List item\n2. List item' : '• List item\n• List item';
    setNewComment(prev => prev + (prev ? '\n' : '') + listText);
  };

  const insertLink = () => {
    const linkText = '[Link text](https://example.com)';
    setNewComment(prev => prev + linkText);
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
          <LeftColumn>
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
                    <UserName>{ticket.assignedTo}</UserName>
                  </UserInfo>
                </InfoValue>
              </InfoRow>
              
              <InfoRow>
                <InfoLabel>Created By:</InfoLabel>
                <InfoValue>
                  <UserInfo>
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

            <UpdateStatusSection>
              <UpdateStatusTitle>Update Status</UpdateStatusTitle>
              <StatusSelectLabel>Change Status</StatusSelectLabel>
              <StatusSelect 
                value={selectedStatus} 
                onChange={handleStatusChange}
              >
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Review">Review</option>
                <option value="Ready To Deploy">Ready To Deploy</option>
              </StatusSelect>
              <UpdateStatusButton onClick={handleStatusUpdate}>
                Update Status
              </UpdateStatusButton>
            </UpdateStatusSection>

            <StatusHistorySection>
              <StatusHistoryTitle>
                <ClockCircleOutlined className="history-icon" />
                Status History
              </StatusHistoryTitle>
              <StatusHistoryList>
                {ticket.statusHistory.map((historyItem) => (
                  <StatusHistoryItem key={historyItem.id}>
                    <StatusHistoryDot />
                    <StatusHistoryContent>
                      <StatusHistoryText>{historyItem.action}</StatusHistoryText>
                      <StatusHistoryTime>{historyItem.timestamp}</StatusHistoryTime>
                    </StatusHistoryContent>
                  </StatusHistoryItem>
                ))}
              </StatusHistoryList>
            </StatusHistorySection>
          </LeftColumn>

          <RightColumn>
            <DescriptionSection>
              <TicketTitleSection>
                <TicketTitleDisplay>{ticket.ticketTitle}</TicketTitleDisplay>
              </TicketTitleSection>
              
              <SectionTitle>Description</SectionTitle>
              <DescriptionText>{ticket.description}</DescriptionText>
              
              {ticket.attachments && ticket.attachments.length > 0 && (
                <AttachmentsSection>
                  <AttachmentsTitle>Attachments</AttachmentsTitle>
                  <AttachmentsContainer>
                    <AttachmentPreview>
                      <VideoCameraOutlined className="preview-icon" />
                      <div className="preview-text">Profile Screen Mockup Video</div>
                    </AttachmentPreview>
                    
                    <AttachmentsList>
                      {ticket.attachments.map((attachment) => (
                        <AttachmentItem 
                          key={attachment.id}
                          onClick={() => handleAttachmentClick(attachment)}
                        >
                          <AttachmentIcon>
                            {getAttachmentIcon(attachment.type)}
                          </AttachmentIcon>
                          <AttachmentInfo>
                            <AttachmentName>{attachment.name}</AttachmentName>
                            <AttachmentSize>{attachment.size}</AttachmentSize>
                          </AttachmentInfo>
                        </AttachmentItem>
                      ))}
                    </AttachmentsList>
                  </AttachmentsContainer>
                </AttachmentsSection>
              )}
            </DescriptionSection>

            <CommentsSection>
              <CommentsSectionTitle>Comments</CommentsSectionTitle>
              
              <CommentsTimeline>
                {comments.map((comment, index) => (
                  <CommentItem key={comment.id} className={index === 0 ? 'highlighted' : ''}>
                    <CommentHeader>
                      <CommentAuthor>
                        <AuthorName>{comment.author}</AuthorName>
                        {comment.isOnline && <OnlineIndicator />}
                      </CommentAuthor>
                      <CommentTimestamp>{comment.timestamp}</CommentTimestamp>
                    </CommentHeader>
                    <CommentContent>
                      {comment.content.split('\n').map((line, lineIndex) => (
                        <div key={lineIndex}>
                          {line.startsWith('•') ? (
                            <ul><li>{line.substring(1).trim()}</li></ul>
                          ) : line.match(/^\d+\./) ? (
                            <ol><li>{line.replace(/^\d+\.\s*/, '')}</li></ol>
                          ) : (
                            line
                          )}
                        </div>
                      ))}
                    </CommentContent>
                  </CommentItem>
                ))}
              </CommentsTimeline>

              <CommentForm>
                <RichTextToolbar>
                  <ToolbarButton
                    className={activeFormats.bold ? 'active' : ''}
                    onClick={() => handleFormatToggle('bold')}
                    title="Bold"
                  >
                    <BoldOutlined />
                  </ToolbarButton>
                  <ToolbarButton
                    className={activeFormats.italic ? 'active' : ''}
                    onClick={() => handleFormatToggle('italic')}
                    title="Italic"
                  >
                    <ItalicOutlined />
                  </ToolbarButton>
                  <ToolbarButton
                    className={activeFormats.underline ? 'active' : ''}
                    onClick={() => handleFormatToggle('underline')}
                    title="Underline"
                  >
                    <UnderlineOutlined />
                  </ToolbarButton>
                  <ToolbarButton
                    onClick={() => insertList('unordered')}
                    title="Bullet List"
                  >
                    <UnorderedListOutlined />
                  </ToolbarButton>
                  <ToolbarButton
                    onClick={() => insertList('ordered')}
                    title="Numbered List"
                  >
                    <OrderedListOutlined />
                  </ToolbarButton>
                  <ToolbarButton
                    onClick={insertLink}
                    title="Insert Link"
                  >
                    <LinkOutlined />
                  </ToolbarButton>
                </RichTextToolbar>
                
                <CommentTextArea
                  value={newComment}
                  onChange={handleCommentChange}
                  placeholder="Add your rich-text comment here..."
                  rows={4}
                />
                
                <CommentActions>
                  <AddCommentButton 
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                  >
                    Add Comment
                  </AddCommentButton>
                </CommentActions>
              </CommentForm>
            </CommentsSection>
          </RightColumn>
        </TicketContent>
      </TicketDetailsContainer>
    </MainLayout>
  );
};

export default TicketDetails;