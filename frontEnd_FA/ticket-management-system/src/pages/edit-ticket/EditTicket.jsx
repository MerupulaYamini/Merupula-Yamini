import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import MainLayout from '../../components/layout/MainLayout';
import { getTicketById, updateTicket } from '../../services/ticketService';
import { getAllUsers } from '../../services/authService';
import {
  EditTicketContainer,
  EditTicketCard,
  EditTicketTitle,
  EditTicketSubtitle,
  FormSection,
  FormLabel,
  StyledInput,
  StyledTextArea,
  StyledSelect,
  ActionButtons,
  CancelButton,
  SaveButton
} from './edit-ticket.styles';

const EditTicket = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [ticket, setTicket] = useState(null);
  const [users, setUsers] = useState([]);
  
  // Form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [label, setLabel] = useState('');
  const [assignedToUserId, setAssignedToUserId] = useState('');

  useEffect(() => {
    fetchData();
  }, [ticketId]);

  const fetchData = async () => {
    setLoading(true);
    try {
      console.log('Fetching ticket and users...');
      // Fetch ticket and users in parallel
      const [ticketData, usersData] = await Promise.all([
        getTicketById(ticketId),
        getAllUsers()
      ]);
      
      console.log('Ticket data:', ticketData);
      console.log('Users data:', usersData);
      
      setTicket(ticketData);
      setUsers(usersData);
      
      // Pre-fill form
      setTitle(ticketData.title || '');
      setDescription(ticketData.description || '');
      setLabel(ticketData.label || '');
      setAssignedToUserId(ticketData.assignedToId ? String(ticketData.assignedToId) : '');
      
      console.log('Users state set to:', usersData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      message.error(error.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    console.log('=== SAVE BUTTON CLICKED ===');
    console.log('1. Current form values:', { title, description, label, assignedToUserId });
    console.log('2. Original ticket values:', { 
      title: ticket.title, 
      description: ticket.description, 
      label: ticket.label, 
      assignedToId: ticket.assignedToId 
    });
    
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

    console.log('3. Building updates object...');
    setSaving(true);
    try {
      // Build update object with only changed fields
      const updates = {};
      if (title !== ticket.title) {
        console.log('   - Title changed:', ticket.title, '->', title);
        updates.title = title;
      }
      if (description !== ticket.description) {
        console.log('   - Description changed');
        updates.description = description;
      }
      if (label !== ticket.label) {
        console.log('   - Label changed:', ticket.label, '->', label);
        updates.label = label;
      }
      if (assignedToUserId && String(assignedToUserId) !== String(ticket.assignedToId)) {
        console.log('   - Assigned user changed:', ticket.assignedToId, '->', assignedToUserId);
        updates.assignedToUserId = parseInt(assignedToUserId);
      }

      console.log('4. Final updates object:', updates);
      console.log('5. Number of changes:', Object.keys(updates).length);

      if (Object.keys(updates).length === 0) {
        console.log('WARNING: No changes detected');
        message.info('No changes to save');
        navigate(`/ticket/${ticketId}`);
        return;
      }

      console.log('6. Calling updateTicket API...');
      console.log('   - Ticket ID:', ticketId);
      console.log('   - Updates:', JSON.stringify(updates, null, 2));
      
      const result = await updateTicket(ticketId, updates);
      
      console.log('7. API Response:', result);
      console.log('SUCCESS: Ticket updated!');
      message.success('Ticket updated successfully!');
      navigate(`/ticket/${ticketId}`);
    } catch (error) {
      console.error('ERROR: Update failed');
      console.error('Error details:', error);
      message.error(error.message || 'Failed to update ticket');
    } finally {
      setSaving(false);
      console.log('=== SAVE PROCESS COMPLETE ===');
    }
  };

  const handleCancel = () => {
    navigate(`/ticket/${ticketId}`);
  };

  if (loading) {
    return (
      <MainLayout>
        <EditTicketContainer>
          <div>Loading ticket data...</div>
        </EditTicketContainer>
      </MainLayout>
    );
  }

  if (!ticket) {
    return (
      <MainLayout>
        <EditTicketContainer>
          <div>Ticket not found</div>
        </EditTicketContainer>
      </MainLayout>
    );
  }

  console.log('Rendering with users:', users);
  console.log('Users array length:', users.length);

  return (
    <MainLayout>
      <EditTicketContainer>
        <EditTicketCard>
          <EditTicketTitle>Edit Ticket</EditTicketTitle>
          <EditTicketSubtitle>Update the details to modify this task or issue.</EditTicketSubtitle>

          <form onSubmit={handleSave}>
            <FormSection>
              <FormLabel>Ticket Title *</FormLabel>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Briefly describe the ticket"
                disabled={saving}
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
              <FormLabel>Description</FormLabel>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                placeholder="Provide a detailed explanation of the issue or task"
                disabled={saving}
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
              <FormLabel>Label</FormLabel>
              <select
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                disabled={saving}
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
              <FormLabel>Assigned To</FormLabel>
              <select
                value={assignedToUserId}
                onChange={(e) => setAssignedToUserId(e.target.value)}
                disabled={saving}
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
              <div style={{ fontSize: '12px', color: '#8c8c8c', marginTop: '4px' }}>
                Currently assigned to: {ticket.assignedToName || 'Unassigned'}
              </div>
            </FormSection>

            <ActionButtons>
              <button 
                type="button" 
                onClick={handleCancel} 
                disabled={saving}
                style={{
                  padding: '8px 24px',
                  height: '40px',
                  borderRadius: '6px',
                  border: '1.5px solid #d9d9d9',
                  fontSize: '14px',
                  fontWeight: '500',
                  backgroundColor: 'white',
                  cursor: saving ? 'not-allowed' : 'pointer'
                }}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={saving}
                style={{
                  padding: '8px 24px',
                  height: '40px',
                  backgroundColor: '#1890ff',
                  border: '1.5px solid #1890ff',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: 'white',
                  cursor: saving ? 'not-allowed' : 'pointer'
                }}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </ActionButtons>
          </form>
        </EditTicketCard>
      </EditTicketContainer>
    </MainLayout>
  );
};

export default EditTicket;
