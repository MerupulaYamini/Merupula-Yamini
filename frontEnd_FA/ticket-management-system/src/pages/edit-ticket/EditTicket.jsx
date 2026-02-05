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
      const [ticketData, usersData] = await Promise.all([
        getTicketById(ticketId),
        getAllUsers()
      ]);
      
      setTicket(ticketData);
      setUsers(usersData);
      
      setTitle(ticketData.title || '');
      setDescription(ticketData.description || '');
      setLabel(ticketData.label || '');
      setAssignedToUserId(ticketData.assignedToId ? String(ticketData.assignedToId) : '');
    } catch (error) {
      message.error(error.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      message.error('Title is required');
      return;
    }

    if (title.length > 150) {
      message.error('Title cannot exceed 150 characters');
      return;
    }

    setSaving(true);
    try {
      const updates = {};
      if (title !== ticket.title) {
        updates.title = title;
      }
      if (description !== ticket.description) {
        updates.description = description;
      }
      if (label !== ticket.label) {
        updates.label = label;
      }
      if (assignedToUserId && String(assignedToUserId) !== String(ticket.assignedToId)) {
        updates.assignedToUserId = parseInt(assignedToUserId);
      }

      if (Object.keys(updates).length === 0) {
        message.info('No changes to save');
        navigate(`/ticket/${ticketId}`);
        return;
      }
      
      const result = await updateTicket(ticketId, updates);
      message.success('Ticket updated successfully!');
      navigate(`/ticket/${ticketId}`);
    } catch (error) {
      message.error(error.message || 'Failed to update ticket');
    } finally {
      setSaving(false);
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
