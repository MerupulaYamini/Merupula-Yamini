import React, { memo, useCallback } from "react";
import { Modal, Form, Input, InputNumber, Button, Select, Rate } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const AddProductModal = ({ open, setOpen }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleNext = useCallback((values) => {
    setOpen(false);
    form.resetFields();
    navigate("/confirm", { state: values });
  }, [navigate, setOpen, form]);

  return (
    <Modal
      title="Add New Product"
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      centered
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleNext}
        initialValues={{ rating: 3 }}
      >
        <Form.Item name="title" label="Product Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="price" label="Price" rules={[{ required: true }]}>
          <InputNumber style={{ width: "100%" }} min={1} />
        </Form.Item>

        <Form.Item name="category" label="Category" rules={[{ required: true }]}>
          <Select>
            <Option value="beauty">Beauty</Option>
            <Option value="fragrances">Fragrances</Option>
            <Option value="groceries">Groceries</Option>
            <Option value="furniture">Furniture</Option>
          </Select>
        </Form.Item>

        <Form.Item name="rating" label="Rating">
          <Rate />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <Input.TextArea rows={3} />
        </Form.Item>

        <div className="btn-group">
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button type="primary" htmlType="submit">Next →</Button>
        </div>
      </Form>
    </Modal>
  );
};

export default memo(AddProductModal);
