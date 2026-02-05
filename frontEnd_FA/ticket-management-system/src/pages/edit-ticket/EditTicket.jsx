import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Select, Radio, Upload, Button, message } from 'antd';
import { PaperClipOutlined, UploadOutlined } from '@ant-design/icons';
import MainLayout from '../../components/layout/MainLayout';
import {
  EditTicketContainer,
  EditTicketCard,
  EditTicketTitle,
  EditTicketSubtitle,
  StyledForm,
  FormSection,
  FormRow,
  FormLabel,
  StyledInput,
  StyledTextArea,
  StyledSelect,
  RadioGroup,
  AttachmentSection,
  AttachmentInput,
  FileUploadArea,
  ActionButtons,
  CancelButton,
  SaveButton
} from './edit-ticket.styles';

const { TextArea } = Input;
const { Option } = Select;

const EditTicket = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [ticket, setTicket] = useState(null);

  // Mock ticket data - in real app, this would come from API
  const mockTickets = {
    'TKT-001': {
      id: 'TKT-001',
      title: 'Implement user authentication',
      ticketTitle: 'Implement User Profile Screen with Password Change',
      description: 'The user profile screen needs to allow users to update their username, display picture, and biography. Additionally, a dedicated section for changing their password must be included. Frontend validations for all fields are required to ensure data integrity and security.',
      assignedTo: 'alice-johnson',
      ticketType: 'New Feature',
      status: 'In Progress',
      attachments: 'https://example.com/mockup-video.mp4'
    },
    'TKT-002': {
      id: 'TKT-002',
      title: 'Fix database connection issue',
      ticketTitle: 'Database Connection Timeout Issues',
      description: 'Users are experiencing intermittent database connection timeouts. This is affecting the application performance and user experience. We need to investigate and fix the root cause.',
      assignedTo: 'bob-williams',
      ticketType: 'Bug',
      status: 'Todo',
      attachments: ''
    }
  };

  useEffect(() => {
    // Simulate API call to fetch ticket data
    setTimeout(() => {
      const foundTicket = mockTickets[ticketId];
      if (foundTicket) {
        setTicket(foundTicket);
        // Pre-fill form with existing data
        form.setFieldsValue({
          ticketTitle: foundTicket.ticketTitle,
          description: foundTicket.description,
          assignedTo: foundTicket.assignedTo,
          ticketType: foundTicket.ticketType,
          status: foundTicket.status,
          attachments: foundTicket.attachments
        });
      }
      setLoading(false);
    }, 500);
  }, [ticketId, form]);

  const handleSave = async (values) => {
    setLoading(true);
    
    // Console log the updated values for now
    console.log('Updated ticket values:', {
      ticketId,
      ...values
    });
    
    // Simulate API call delay
    setTimeout(() => {
      setLoading(false);
      message.success('Ticket updated successfully!');
      navigate(`/ticket/${ticketId}`);
    }, 1000);
  };

  const handleCancel = () => {
    navigate(`/ticket/${ticketId}`);
  };

  const uploadProps = {
    beforeUpload: (file) => {
      const isValidType = file.type.startsWith('image/') || 
                         file.type.startsWith('video/') || 
                         file.type === 'application/pdf';
      if (!isValidType) {
        message.error('You can only upload image, video, or PDF files!');
        return false;
      }
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        message.error('File must be smaller than 10MB!');
        return false;
      }
      return false; // Prevent auto upload
    },
    showUploadList: false,
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

          <StyledForm
            form={form}
            layout="vertical"
            onFinish={handleSave}
            autoComplete="off"
          >
            <FormSection>
              <FormLabel>Ticket Title</FormLabel>
              <Form.Item
                name="ticketTitle"
                rules={[
                  { required: true, message: 'Please input the ticket title!' }
                ]}
              >
                <StyledInput 
                  placeholder="Briefly describe the ticket"
                  disabled={loading}
                />
              </Form.Item>
            </FormSection>

            <FormSection>
              <FormLabel>Description</FormLabel>
              <Form.Item
                name="description"
                rules={[
                  { required: true, message: 'Please input the description!' }
                ]}
              >
                <StyledTextArea
                  rows={6}
                  placeholder="Provide a detailed explanation of the issue or task"
                  disabled={loading}
                />
              </Form.Item>
            </FormSection>

            <FormRow>
              <div>
                <FormLabel>Assigned To</FormLabel>
                <Form.Item
                  name="assignedTo"
                  rules={[
                    { required: true, message: 'Please select an assignee!' }
                  ]}
                >
                  <StyledSelect 
                    placeholder="Select an assignee"
                    disabled={loading}
                  >
                    <Option value="alice-johnson">Alice Johnson</Option>
                    <Option value="bob-williams">Bob Williams</Option>
                    <Option value="charlie-brown">Charlie Brown</Option>
                    <Option value="admin-user">Admin User</Option>
                  </StyledSelect>
                </Form.Item>
              </div>

              <div>
                <FormLabel>Ticket Type</FormLabel>
                <Form.Item
                  name="ticketType"
                  rules={[
                    { required: true, message: 'Please select a ticket type!' }
                  ]}
                >
                  <RadioGroup disabled={loading}>
                    <Radio value="Bug">Bug</Radio>
                    <Radio value="New Feature">New Feature</Radio>
                    <Radio value="Task">Task</Radio>
                    <Radio value="Improvement">Improvement</Radio>
                    <Radio value="Support Request">Support Request</Radio>
                  </RadioGroup>
                </Form.Item>
              </div>
            </FormRow>

            <FormSection>
              <FormLabel>Ticket Status</FormLabel>
              <Form.Item
                name="status"
                rules={[
                  { required: true, message: 'Please select a status!' }
                ]}
              >
                <StyledSelect 
                  placeholder="Select status"
                  disabled={loading}
                >
                  <Option value="Todo">Todo</Option>
                  <Option value="In Progress">In Progress</Option>
                  <Option value="Review">Review</Option>
                  <Option value="Ready To Deploy">Ready To Deploy</Option>
                </StyledSelect>
              </Form.Item>
            </FormSection>

            <AttachmentSection>
              <FormLabel>Attachments</FormLabel>
              <Form.Item name="attachments">
                <AttachmentInput
                  placeholder="Paste attachment URL (e.g., image, video, document link)"
                  prefix={<PaperClipOutlined />}
                  disabled={loading}
                />
              </Form.Item>
              
              <Upload {...uploadProps}>
                <FileUploadArea>
                  <UploadOutlined />
                  <span>Or drag and drop files here (visual placeholder)</span>
                </FileUploadArea>
              </Upload>
            </AttachmentSection>

            <ActionButtons>
              <CancelButton onClick={handleCancel} disabled={loading}>
                Cancel
              </CancelButton>
              <SaveButton 
                type="primary" 
                htmlType="submit" 
                loading={loading}
              >
                Save Changes
              </SaveButton>
            </ActionButtons>
          </StyledForm>
        </EditTicketCard>
      </EditTicketContainer>
    </MainLayout>
  );
};

export default EditTicket;