import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { PaperClipOutlined, UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import MainLayout from '../../components/layout/MainLayout';
import { createTicket } from '../../services/ticketService';
import { getAllUsers } from '../../services/authService';
import {
  CreateTicketContainer,
  CreateTicketCard,
  CreateTicketTitle,
  CreateTicketSubtitle,
  FormSection,
  FormLabel,
  AttachmentSection,
  FileUploadArea,
  ActionButtons,
  CancelButton,
  CreateButton,
  AttachmentsList,
  AttachmentItem,
  AttachmentIcon,
  AttachmentInfo,
  AttachmentName,
  AttachmentSize,
  RemoveAttachmentButton
} from './create-ticket.styles';

const CreateTicket = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  
  // Form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [label, setLabel] = useState('');
  const [assignedToUserId, setAssignedToUserId] = useState('');
  const [attachmentUrl, setAttachmentUrl] = useState('');
  const [attachmentUrls, setAttachmentUrls] = useState([]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    console.log('=== CREATE TICKET: Component Mounted ===');
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    console.log('=== FETCHING USERS ===');
    try {
      const usersData = await getAllUsers();
      console.log('Users fetched successfully:', usersData);
      console.log('Number of users:', usersData.length);
      setUsers(usersData);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      console.error('Error status:', error.status);
      console.error('Error message:', error.message);
      
      if (error.status === 403) {
        message.error('Access denied. Only admins can create tickets.');
      } else {
        message.error('Failed to load users');
      }
    }
  };

  const validateFiles = (selectedFiles) => {
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    const MAX_TOTAL_SIZE = 10 * 1024 * 1024; // 10MB

    // Check individual file sizes
    for (let file of selectedFiles) {
      if (file.size > MAX_FILE_SIZE) {
        throw new Error(`File "${file.name}" exceeds 10MB limit`);
      }
    }

    // Check total size
    const totalSize = selectedFiles.reduce((sum, file) => sum + file.size, 0);
    if (totalSize > MAX_TOTAL_SIZE) {
      throw new Error(`Total file size (${(totalSize / 1024 / 1024).toFixed(2)}MB) exceeds 10MB limit`);
    }

    return true;
  };

  const handleFileSelect = (e) => {
    console.log('=== FILE SELECT EVENT ===');
    const selectedFiles = Array.from(e.target.files);
    console.log('Selected files:', selectedFiles);
    console.log('Number of files:', selectedFiles.length);
    
    if (selectedFiles.length === 0) {
      console.log('No files selected');
      return;
    }

    try {
      // Validate new files
      const allFiles = [...files, ...selectedFiles];
      console.log('All files (existing + new):', allFiles);
      validateFiles(allFiles);
      
      console.log('Validation passed, updating state');
      setFiles(allFiles);
      console.log('Files state updated');
      e.target.value = ''; // Reset input
    } catch (error) {
      console.error('File validation error:', error);
      message.error(error.message);
      e.target.value = '';
    }
  };

  const handleRemoveFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddUrl = () => {
    if (!attachmentUrl.trim()) {
      message.warning('Please enter a URL');
      return;
    }
    
    // Basic URL validation
    try {
      new URL(attachmentUrl);
      setAttachmentUrls(prev => [...prev, attachmentUrl.trim()]);
      setAttachmentUrl('');
    } catch (error) {
      message.error('Please enter a valid URL');
    }
  };

  const handleRemoveUrl = (index) => {
    setAttachmentUrls(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return '🖼️';
    if (type.startsWith('video/')) return '🎥';
    if (type.includes('pdf')) return '📄';
    if (type.includes('word') || type.includes('document')) return '📝';
    if (type.includes('excel') || type.includes('spreadsheet')) return '📊';
    return '📎';
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    console.log('=== CREATE TICKET BUTTON CLICKED ===');
    
    // Validation
    console.log('1. Validating form fields...');
    console.log('   - Title:', title);
    console.log('   - Description:', description);
    console.log('   - Label:', label);
    console.log('   - Assigned User ID:', assignedToUserId);
    console.log('   - Files:', files);
    console.log('   - Attachment URLs:', attachmentUrls);
    
    if (!title.trim()) {
      console.log('ERROR: Title is empty');
      message.error('Title is required');
      return;
    }
    
    if (title.length > 150) {
      console.log('ERROR: Title too long:', title.length);
      message.error('Title cannot exceed 150 characters');
      return;
    }
    
    if (!description.trim()) {
      console.log('ERROR: Description is empty');
      message.error('Description is required');
      return;
    }
    
    if (!label) {
      console.log('ERROR: Label not selected');
      message.error('Label is required');
      return;
    }
    
    if (!assignedToUserId) {
      console.log('ERROR: Assigned user not selected');
      message.error('Assigned user is required');
      return;
    }

    console.log('2. All validations passed');
    setLoading(true);
    
    try {
      const ticketData = {
        title: title.trim(),
        description: description.trim(),
        label,
        assignedToUserId: parseInt(assignedToUserId),
        attachments: files,
        attachmentUrls
      };

      console.log('3. Ticket data prepared:');
      console.log('   - Title:', ticketData.title);
      console.log('   - Description length:', ticketData.description.length);
      console.log('   - Label:', ticketData.label);
      console.log('   - Assigned User ID:', ticketData.assignedToUserId);
      console.log('   - Number of files:', ticketData.attachments.length);
      console.log('   - Number of URLs:', ticketData.attachmentUrls.length);
      
      console.log('4. Calling createTicket API...');
      const result = await createTicket(ticketData);
      
      console.log('5. SUCCESS! Ticket created:', result);
      message.success('Ticket created successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('6. ERROR: Create ticket failed');
      console.error('   - Error object:', error);
      console.error('   - Status:', error.status);
      console.error('   - Message:', error.message);
      console.error('   - Field errors:', error.fieldErrors);
      
      // Handle field errors
      if (error.fieldErrors) {
        Object.entries(error.fieldErrors).forEach(([field, errorMsg]) => {
          console.error(`   - Field error [${field}]:`, errorMsg);
          message.error(`${field}: ${errorMsg}`);
        });
      } else {
        message.error(error.message || 'Failed to create ticket');
      }
    } finally {
      setLoading(false);
      console.log('=== CREATE TICKET PROCESS COMPLETE ===');
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  const totalFileSize = files.reduce((sum, file) => sum + file.size, 0);
  const totalSizeMB = (totalFileSize / 1024 / 1024).toFixed(2);

  return (
    <MainLayout>
      <CreateTicketContainer>
        <CreateTicketCard>
          <CreateTicketTitle>Create New Ticket</CreateTicketTitle>
          <CreateTicketSubtitle>Fill in the details to create a new task or issue.</CreateTicketSubtitle>

          <form onSubmit={handleCreate}>
            <FormSection>
              <FormLabel>Ticket Title *</FormLabel>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Briefly describe the ticket"
                disabled={loading}
                maxLength={150}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '6px',
                  border: '1.5px solid #d9d9d9',
                  fontSize: '14px'
                }}
              />
              <div style={{ fontSize: '12px', color: '#8c8c8c', marginTop: '4px' }}>
                {title.length}/150 characters
              </div>
            </FormSection>

            <FormSection>
              <FormLabel>Description *</FormLabel>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                placeholder="Provide a detailed explanation of the issue or task"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '6px',
                  border: '1.5px solid #d9d9d9',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
              />
            </FormSection>

            <FormSection>
              <FormLabel>Label *</FormLabel>
              <select
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '6px',
                  border: '1.5px solid #d9d9d9',
                  fontSize: '14px',
                  backgroundColor: 'white'
                }}
              >
                <option value="">Select a label</option>
                <option value="BUG">Bug</option>
                <option value="FEATURE">Feature</option>
                <option value="TASK">Task</option>
                <option value="IMPROVEMENT">Improvement</option>
                <option value="SUPPORT">Support</option>
              </select>
            </FormSection>

            <FormSection>
              <FormLabel>Assigned To *</FormLabel>
              <select
                value={assignedToUserId}
                onChange={(e) => setAssignedToUserId(e.target.value)}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '6px',
                  border: '1.5px solid #d9d9d9',
                  fontSize: '14px',
                  backgroundColor: 'white'
                }}
              >
                <option value="">Select a user</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.username} ({user.email})
                  </option>
                ))}
              </select>
            </FormSection>

            <AttachmentSection>
              <FormLabel>
                <PaperClipOutlined /> Attachments (Optional)
              </FormLabel>
              
              {/* Attachment URLs */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '12px', color: '#8c8c8c', marginBottom: '8px' }}>
                  External URLs (e.g., Google Drive, Dropbox)
                </div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <input
                    type="url"
                    value={attachmentUrl}
                    onChange={(e) => setAttachmentUrl(e.target.value)}
                    placeholder="https://example.com/document.pdf"
                    disabled={loading}
                    style={{
                      flex: 1,
                      padding: '12px 16px',
                      borderRadius: '6px',
                      border: '1.5px solid #d9d9d9',
                      fontSize: '14px'
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddUrl}
                    disabled={loading}
                    style={{
                      padding: '12px 24px',
                      borderRadius: '6px',
                      border: '1.5px solid #1890ff',
                      backgroundColor: 'white',
                      color: '#1890ff',
                      fontSize: '14px',
                      cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                  >
                    Add URL
                  </button>
                </div>
                
                {attachmentUrls.length > 0 && (
                  <AttachmentsList>
                    {attachmentUrls.map((url, index) => (
                      <AttachmentItem key={index}>
                        <AttachmentIcon>🔗</AttachmentIcon>
                        <AttachmentInfo>
                          <AttachmentName>{url}</AttachmentName>
                          <AttachmentSize>External URL</AttachmentSize>
                        </AttachmentInfo>
                        <RemoveAttachmentButton
                          onClick={() => handleRemoveUrl(index)}
                          disabled={loading}
                        >
                          <DeleteOutlined />
                        </RemoveAttachmentButton>
                      </AttachmentItem>
                    ))}
                  </AttachmentsList>
                )}
              </div>

              {/* File Uploads */}
              <div>
                <div style={{ fontSize: '12px', color: '#8c8c8c', marginBottom: '8px' }}>
                  Upload Files (Max 10MB total)
                </div>
                
                {files.length > 0 && (
                  <div style={{ marginBottom: '12px' }}>
                    <AttachmentsList>
                      {files.map((file, index) => (
                        <AttachmentItem key={index}>
                          <AttachmentIcon>{getFileIcon(file.type)}</AttachmentIcon>
                          <AttachmentInfo>
                            <AttachmentName>{file.name}</AttachmentName>
                            <AttachmentSize>{formatFileSize(file.size)}</AttachmentSize>
                          </AttachmentInfo>
                          <RemoveAttachmentButton
                            onClick={() => handleRemoveFile(index)}
                            disabled={loading}
                          >
                            <DeleteOutlined />
                          </RemoveAttachmentButton>
                        </AttachmentItem>
                      ))}
                    </AttachmentsList>
                    <div style={{ 
                      fontSize: '12px', 
                      color: totalFileSize > 10 * 1024 * 1024 ? '#ff4d4f' : '#8c8c8c',
                      marginTop: '8px'
                    }}>
                      Total size: {totalSizeMB} MB / 10 MB
                    </div>
                  </div>
                )}
                
                <FileUploadArea onClick={() => document.getElementById('file-input').click()}>
                  <UploadOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
                  <div style={{ marginTop: '8px', color: '#262626', fontWeight: '500' }}>
                    Click to upload files or drag and drop
                  </div>
                  <div style={{ fontSize: '12px', color: '#8c8c8c', marginTop: '4px' }}>
                    Supports: Images, Videos, Documents, PDFs (Max 10MB per file)
                  </div>
                </FileUploadArea>
                <input
                  id="file-input"
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  disabled={loading}
                  style={{ display: 'none' }}
                />
              </div>
            </AttachmentSection>

            <ActionButtons>
              <button
                type="button"
                onClick={handleCancel}
                disabled={loading}
                style={{
                  padding: '8px 24px',
                  height: '40px',
                  borderRadius: '6px',
                  border: '1.5px solid #d9d9d9',
                  fontSize: '14px',
                  fontWeight: '500',
                  backgroundColor: 'white',
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: '8px 24px',
                  height: '40px',
                  backgroundColor: '#1890ff',
                  border: '1.5px solid #1890ff',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: 'white',
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? 'Creating...' : 'Create Ticket'}
              </button>
            </ActionButtons>
          </form>
        </CreateTicketCard>
      </CreateTicketContainer>
    </MainLayout>
  );
};

export default CreateTicket;