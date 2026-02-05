import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Select, Radio, Upload, Button, message } from 'antd';
import { PaperClipOutlined, UploadOutlined } from '@ant-design/icons';
import MainLayout from '../../components/layout/MainLayout';
import {
  CreateTicketContainer,
  CreateTicketCard,
  CreateTicketTitle,
  CreateTicketSubtitle,
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
  CreateButton
} from './create-ticket.styles';

const { TextArea } = Input;
const { Option } = Select;

const CreateTicket = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleCreate = async (values) => {
    setLoading(true);
    
    // Console log the form values for now
    console.log('Create ticket values:', values);
    
    // Simulate API call delay
    setTimeout(() => {
      setLoading(false);
      message.success('Ticket created successfully!');
      navigate('/dashboard');
    }, 1000);
  };

  const handleCancel = () => {
    navigate('/dashboard');
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

  return (
    <MainLayout>
      <CreateTicketContainer>
        <CreateTicketCard>
          <CreateTicketTitle>Create New Ticket</CreateTicketTitle>
          <CreateTicketSubtitle>Fill in the details to create a new task or issue.</CreateTicketSubtitle>

          <StyledForm
            form={form}
            layout="vertical"
            onFinish={handleCreate}
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
              <FormLabel>Ticket Status To</FormLabel>
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
              <CreateButton 
                type="primary" 
                htmlType="submit" 
                loading={loading}
              >
                Create Ticket
              </CreateButton>
            </ActionButtons>
          </StyledForm>
        </CreateTicketCard>
      </CreateTicketContainer>
    </MainLayout>
  );
};

export default CreateTicket;