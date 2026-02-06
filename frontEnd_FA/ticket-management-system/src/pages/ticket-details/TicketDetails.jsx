import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { message, Modal } from 'antd';
import { 
  ArrowLeftOutlined, 
  EditOutlined, 
  DeleteOutlined,
  FileTextOutlined,
  PaperClipOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  LinkOutlined
} from '@ant-design/icons';
import MainLayout from '../../components/layout/MainLayout';
import { getTicketById, deleteTicket, updateTicketStatus, addComment, mapStatus, mapLabel, getTicketAttachmentUrl, downloadTicketAttachment } from '../../services/ticketService';
import { getCurrentUser } from '../../services/authService';
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
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [commentSubmitting, setCommentSubmitting] = useState(false);
  const [textAreaRef, setTextAreaRef] = useState(null);

  // Check if current user is admin
  const currentUser = getCurrentUser();
  const isAdmin = currentUser.roles && currentUser.roles.includes('ADMIN');

  // Fetch ticket details on component mount
  useEffect(() => {
    fetchTicketDetails();
  }, [ticketId]);

  const fetchTicketDetails = async () => {
    setLoading(true);
    try {
      const data = await getTicketById(ticketId);
      
      // Parse attachmentMeta from backend format: "filename|contentType"
      if (data.attachmentMeta && Array.isArray(data.attachmentMeta)) {
        data.attachmentMeta = data.attachmentMeta.map((metaString) => {
          const [filename, contentType] = metaString.split('|');
          return {
            filename: filename || 'Unknown file',
            contentType: contentType || 'application/octet-stream'
          };
        });
      }
      
      setTicket(data);
      setSelectedStatus(data.status);
    } catch (error) {
      message.error(error.message || 'Failed to load ticket details');
    } finally {
      setLoading(false);
    }
  };

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

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleEdit = () => {
    navigate(`/edit-ticket/${ticketId}`);
  };

  const handleDelete = () => {
    Modal.confirm({
      title: 'Delete Ticket',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to delete this ticket? This action cannot be undone.',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await deleteTicket(ticketId);
          message.success('Ticket deleted successfully');
          navigate('/dashboard');
        } catch (error) {
          message.error(error.message || 'Failed to delete ticket');
        }
      }
    });
  };

  const handleStatusUpdate = async () => {
    if (!selectedStatus || selectedStatus === ticket.status) {
      message.warning('Please select a different status');
      return;
    }

    setStatusUpdating(true);
    try {
      const updatedTicket = await updateTicketStatus(ticketId, selectedStatus);
      setTicket(updatedTicket);
      setSelectedStatus(updatedTicket.status);
      message.success('Ticket status updated successfully');
    } catch (error) {
      message.error(error.message || 'Failed to update ticket status');
    } finally {
      setStatusUpdating(false);
    }
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getAttachmentIcon = (contentType) => {
    if (!contentType) return <PaperClipOutlined />;
    
    if (contentType.startsWith('image/')) return '🖼️';
    if (contentType.startsWith('video/')) return '🎥';
    if (contentType.includes('pdf')) return '📄';
    if (contentType.includes('word') || contentType.includes('document')) return '📝';
    if (contentType.includes('excel') || contentType.includes('spreadsheet')) return '📊';
    if (contentType.includes('zip') || contentType.includes('rar')) return '📦';
    return '📎';
  };

  const handleAttachmentClick = async (attachment, index) => {
    try {
      await downloadTicketAttachment(ticketId, index, attachment.filename);
      message.success(`Downloading ${attachment.filename}...`);
    } catch (error) {
      if (error.status === 401) {
        message.error('You are not allowed to access this attachment');
      } else if (error.status === 404) {
        message.error('Attachment not found');
      } else {
        message.error(error.message || 'Failed to download attachment');
      }
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      message.warning('Please enter a comment');
      return;
    }

    if (newComment.length > 5000) {
      message.error('Comment cannot exceed 5000 characters');
      return;
    }

    setCommentSubmitting(true);
    try {
      const updatedTicket = await addComment(ticketId, newComment.trim());
      setTicket(updatedTicket);
      setNewComment('');
      message.success('Comment added successfully');
    } catch (error) {
      message.error(error.message || 'Failed to add comment');
    } finally {
      setCommentSubmitting(false);
    }
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const insertFormatting = (prefix, suffix = '') => {
    if (!textAreaRef) return;
    
    const start = textAreaRef.selectionStart;
    const end = textAreaRef.selectionEnd;
    const selectedText = newComment.substring(start, end);
    
    // Require text selection for better UX - prevents accidental empty formatting
    if (!selectedText) {
      message.info('Please select text first to apply formatting');
      return;
    }
    
    const beforeText = newComment.substring(0, start);
    const afterText = newComment.substring(end);
    
    const newText = beforeText + prefix + selectedText + suffix + afterText;
    setNewComment(newText);
    
    // Keep the formatted text selected so user can see what was applied
    setTimeout(() => {
      textAreaRef.focus();
      textAreaRef.setSelectionRange(start, start + prefix.length + selectedText.length + suffix.length);
    }, 0);
  };

  const handleFormatToggle = (format) => {
    switch (format) {
      case 'bold':
        insertFormatting('**', '**');
        break;
      case 'italic':
        insertFormatting('*', '*');
        break;
      case 'underline':
        insertFormatting('__', '__');
        break;
      default:
        break;
    }
  };

  const insertList = (type) => {
    if (!textAreaRef) return;
    
    const start = textAreaRef.selectionStart;
    const end = textAreaRef.selectionEnd;
    const selectedText = newComment.substring(start, end);
    const beforeText = newComment.substring(0, start);
    const afterText = newComment.substring(end);
    
    if (selectedText) {
      // If text is selected, convert each line to a list item
      const lines = selectedText.split('\n');
      const listItems = lines.map((line, index) => {
        if (line.trim()) {
          return type === 'ordered' ? `${index + 1}. ${line}` : `- ${line}`;
        }
        return line;
      }).join('\n');
      
      const newText = beforeText + listItems + afterText;
      setNewComment(newText);
      
      setTimeout(() => {
        textAreaRef.focus();
        textAreaRef.setSelectionRange(start, start + listItems.length);
      }, 0);
    } else {
      // If no selection, just insert a list item at cursor
      const listPrefix = type === 'ordered' ? '1. ' : '- ';
      const needsNewline = beforeText && !beforeText.endsWith('\n');
      const newText = beforeText + (needsNewline ? '\n' : '') + listPrefix + afterText;
      
      setNewComment(newText);
      
      setTimeout(() => {
        const newCursorPos = start + (needsNewline ? 1 : 0) + listPrefix.length;
        textAreaRef.focus();
        textAreaRef.setSelectionRange(newCursorPos, newCursorPos);
      }, 0);
    }
  };

  const insertLink = () => {
    if (!textAreaRef) return;
    
    const start = textAreaRef.selectionStart;
    const end = textAreaRef.selectionEnd;
    const selectedText = newComment.substring(start, end);
    const beforeText = newComment.substring(0, start);
    const afterText = newComment.substring(end);
    
    const linkText = selectedText || 'link text';
    const linkFormat = `[${linkText}](url)`;
    const newText = beforeText + linkFormat + afterText;
    
    setNewComment(newText);
    
    setTimeout(() => {
      // Select "url" part for easy replacement
      const urlStart = start + linkText.length + 3;
      const urlEnd = urlStart + 3;
      textAreaRef.focus();
      textAreaRef.setSelectionRange(urlStart, urlEnd);
    }, 0);
  };

  const renderFormattedComment = (text) => {
    if (!text) return text;
    
    // Convert markdown-style formatting to HTML
    let formatted = text;
    
    // Bold: **text** -> <strong>text</strong>
    formatted = formatted.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    
    // Italic: *text* -> <em>text</em>
    formatted = formatted.replace(/\*(.+?)\*/g, '<em>$1</em>');
    
    // Underline: __text__ -> <u>text</u>
    formatted = formatted.replace(/__(.+?)__/g, '<u>$1</u>');
    
    // Links: [text](url) -> <a>text</a>
    formatted = formatted.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: #1890ff; text-decoration: underline;">$1</a>');
    
    // Unordered lists: - item -> <li>item</li>
    formatted = formatted.replace(/^- (.+)$/gm, '<li style="margin-left: 20px;">$1</li>');
    
    // Ordered lists: 1. item -> <li>item</li>
    formatted = formatted.replace(/^\d+\. (.+)$/gm, '<li style="margin-left: 20px; list-style-type: decimal;">$1</li>');
    
    // Line breaks
    formatted = formatted.replace(/\n/g, '<br/>');
    
    return formatted;
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

  if (loading) {
    return (
      <MainLayout>
        <TicketDetailsContainer>
          <NotFoundMessage>
            <h2>Loading ticket details...</h2>
          </NotFoundMessage>
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
            <TicketId>TKT-{String(ticket.id).padStart(3, '0')}</TicketId>
          </div>
          
          {isAdmin && (
            <ActionButtons>
              <EditButton icon={<EditOutlined />} onClick={handleEdit}>
                Edit
              </EditButton>
              <DeleteButton icon={<DeleteOutlined />} onClick={handleDelete}>
                Delete
              </DeleteButton>
            </ActionButtons>
          )}
        </TicketHeader>

        <TicketContent>
          <LeftColumn>
            <InfoSection>
              <InfoRow>
                <InfoLabel>Status:</InfoLabel>
                <InfoValue>
                  <StatusTag className={mapStatus(ticket.status)}>
                    {ticket.status.replace('_', ' ')}
                  </StatusTag>
                </InfoValue>
              </InfoRow>
              
              <InfoRow>
                <InfoLabel>Label:</InfoLabel>
                <InfoValue>
                  <LabelTag className={mapLabel(ticket.label)}>
                    {ticket.label.replace('_', ' ')}
                  </LabelTag>
                </InfoValue>
              </InfoRow>
              
              <InfoRow>
                <InfoLabel>Assigned To:</InfoLabel>
                <InfoValue>
                  <UserInfo>
                    <UserName>{ticket.assignedToName || 'Unassigned'}</UserName>
                  </UserInfo>
                </InfoValue>
              </InfoRow>
              
              <InfoRow>
                <InfoLabel>Created By:</InfoLabel>
                <InfoValue>
                  <UserInfo>
                    <UserName>{ticket.createdByName || 'Unknown'}</UserName>
                  </UserInfo>
                </InfoValue>
              </InfoRow>
              
              <InfoRow>
                <InfoLabel>Created Date:</InfoLabel>
                <InfoValue>{formatDate(ticket.createdAt)}</InfoValue>
              </InfoRow>
              
              <InfoRow>
                <InfoLabel>Last Updated:</InfoLabel>
                <InfoValue>{formatDate(ticket.updatedAt)}</InfoValue>
              </InfoRow>
            </InfoSection>

            <UpdateStatusSection>
              <UpdateStatusTitle>Update Status</UpdateStatusTitle>
              <StatusSelectLabel>Change Status</StatusSelectLabel>
              <StatusSelect 
                value={selectedStatus} 
                onChange={handleStatusChange}
                disabled={statusUpdating}
              >
                <option value="TODO">Todo</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="PAUSED">Paused</option>
                <option value="PR_REVIEW">PR Review</option>
                <option value="READY_TO_DEPLOY">Ready To Deploy</option>
                <option value="DEPLOYED_DONE">Deployed/Done</option>
              </StatusSelect>
              <UpdateStatusButton 
                onClick={handleStatusUpdate}
                disabled={statusUpdating || selectedStatus === ticket.status}
                loading={statusUpdating}
              >
                {statusUpdating ? 'Updating...' : 'Update Status'}
              </UpdateStatusButton>
            </UpdateStatusSection>

            <StatusHistorySection>
              <StatusHistoryTitle>
                <ClockCircleOutlined className="history-icon" />
                Status History
              </StatusHistoryTitle>
              <StatusHistoryList>
                {ticket.statusHistory && ticket.statusHistory.length > 0 ? (
                  ticket.statusHistory.map((history) => (
                    <StatusHistoryItem key={history.id}>
                      <StatusHistoryDot />
                      <StatusHistoryContent>
                        <StatusHistoryText>
                          Status changed from "{history.fromStatus.replace('_', ' ')}" to "{history.toStatus.replace('_', ' ')}" by {history.updatedByName}
                        </StatusHistoryText>
                        <StatusHistoryTime>{formatDate(history.updatedAt)}</StatusHistoryTime>
                      </StatusHistoryContent>
                    </StatusHistoryItem>
                  ))
                ) : (
                  <StatusHistoryText>No status history available</StatusHistoryText>
                )}
              </StatusHistoryList>
            </StatusHistorySection>
          </LeftColumn>

          <RightColumn>
            <DescriptionSection>
              <TicketTitleSection>
                <TicketTitleDisplay>{ticket.title}</TicketTitleDisplay>
              </TicketTitleSection>
              
              <SectionTitle>Description</SectionTitle>
              <DescriptionText>{ticket.description || 'No description provided'}</DescriptionText>
              
              {ticket.attachmentMeta && ticket.attachmentMeta.length > 0 && (
                <AttachmentsSection>
                  <AttachmentsTitle>
                    <PaperClipOutlined style={{ marginRight: '8px' }} />
                    Attachments ({ticket.attachmentMeta.length})
                  </AttachmentsTitle>
                  <AttachmentsList>
                    {ticket.attachmentMeta.map((attachment, index) => (
                      <AttachmentItem 
                        key={index}
                        onClick={() => handleAttachmentClick(attachment, index)}
                        style={{ cursor: 'pointer' }}
                      >
                        <AttachmentIcon>
                          {getAttachmentIcon(attachment.contentType)}
                        </AttachmentIcon>
                        <AttachmentInfo>
                          <AttachmentName>{attachment.filename}</AttachmentName>
                          <AttachmentSize>Click to download</AttachmentSize>
                        </AttachmentInfo>
                      </AttachmentItem>
                    ))}
                  </AttachmentsList>
                </AttachmentsSection>
              )}
              
              {ticket.attachmentUrls && ticket.attachmentUrls.length > 0 && (
                <AttachmentsSection>
                  <AttachmentsTitle>
                    <LinkOutlined style={{ marginRight: '8px' }} />
                    External Links ({ticket.attachmentUrls.length})
                  </AttachmentsTitle>
                  <AttachmentsList>
                    {ticket.attachmentUrls.map((url, index) => (
                      <AttachmentItem 
                        key={index}
                        onClick={() => window.open(url, '_blank')}
                        style={{ cursor: 'pointer' }}
                      >
                        <AttachmentIcon>🔗</AttachmentIcon>
                        <AttachmentInfo>
                          <AttachmentName style={{ 
                            color: '#1890ff', 
                            textDecoration: 'underline',
                            wordBreak: 'break-all'
                          }}>
                            {url}
                          </AttachmentName>
                          <AttachmentSize>Click to open in new tab</AttachmentSize>
                        </AttachmentInfo>
                      </AttachmentItem>
                    ))}
                  </AttachmentsList>
                </AttachmentsSection>
              )}
            </DescriptionSection>

            <CommentsSection>
              <CommentsSectionTitle>Comments</CommentsSectionTitle>
              
              <CommentsTimeline>
                {ticket.comments && ticket.comments.length > 0 ? (
                  ticket.comments.map((comment, index) => (
                    <CommentItem key={comment.id} className={index === 0 ? 'highlighted' : ''}>
                      <CommentHeader>
                        <CommentAuthor>
                          <AuthorName>{comment.authorName}</AuthorName>
                          <OnlineIndicator />
                        </CommentAuthor>
                        <CommentTimestamp>{formatDate(comment.createdAt)}</CommentTimestamp>
                      </CommentHeader>
                      <CommentContent 
                        dangerouslySetInnerHTML={{ __html: renderFormattedComment(comment.content) }}
                      />
                    </CommentItem>
                  ))
                ) : (
                  <CommentContent>No comments yet. Be the first to comment!</CommentContent>
                )}
              </CommentsTimeline>

              <CommentForm>
                <RichTextToolbar>
                  <ToolbarButton 
                    onClick={() => handleFormatToggle('bold')}
                    title="Bold - Select text first"
                    disabled={commentSubmitting}
                  >
                    <BoldOutlined />
                  </ToolbarButton>
                  <ToolbarButton 
                    onClick={() => handleFormatToggle('italic')}
                    title="Italic - Select text first"
                    disabled={commentSubmitting}
                  >
                    <ItalicOutlined />
                  </ToolbarButton>
                  <ToolbarButton 
                    onClick={() => handleFormatToggle('underline')}
                    title="Underline - Select text first"
                    disabled={commentSubmitting}
                  >
                    <UnderlineOutlined />
                  </ToolbarButton>
                  <ToolbarButton 
                    onClick={() => insertList('unordered')}
                    title="Bullet List"
                    disabled={commentSubmitting}
                  >
                    <UnorderedListOutlined />
                  </ToolbarButton>
                  <ToolbarButton 
                    onClick={() => insertList('ordered')}
                    title="Numbered List"
                    disabled={commentSubmitting}
                  >
                    <OrderedListOutlined />
                  </ToolbarButton>
                  <ToolbarButton 
                    onClick={insertLink}
                    title="Insert Link - Select text first"
                    disabled={commentSubmitting}
                  >
                    <LinkOutlined />
                  </ToolbarButton>
                </RichTextToolbar>
                
                <CommentTextArea
                  ref={(ref) => setTextAreaRef(ref)}
                  value={newComment}
                  onChange={handleCommentChange}
                  placeholder="Add your comment here... (max 5000 characters)

💡 Tip: Select text and use the toolbar buttons above to format it!"
                  rows={6}
                  disabled={commentSubmitting}
                  maxLength={5000}
                />
                
                {newComment && (
                  <div style={{ 
                    padding: '12px 16px', 
                    background: '#f9f9f9', 
                    borderTop: '1px solid #f0f0f0',
                    fontSize: '12px',
                    color: '#8c8c8c'
                  }}>
                    <strong>Preview:</strong>
                    <div 
                      style={{ 
                        marginTop: '8px', 
                        padding: '8px', 
                        background: 'white', 
                        borderRadius: '4px',
                        fontSize: '14px',
                        color: '#262626',
                        minHeight: '40px'
                      }}
                      dangerouslySetInnerHTML={{ __html: renderFormattedComment(newComment) }}
                    />
                  </div>
                )}
                
                <CommentActions>
                  <span style={{ color: '#8c8c8c', fontSize: '12px' }}>
                    {newComment.length}/5000 characters
                  </span>
                  <AddCommentButton 
                    onClick={handleAddComment}
                    disabled={!newComment.trim() || commentSubmitting}
                    loading={commentSubmitting}
                  >
                    {commentSubmitting ? 'Adding...' : 'Add Comment'}
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