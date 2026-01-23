import { Card, Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../utils/auth";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    const success = resetPassword(values.email, values.newPassword);

    if (!success) {
      message.error("Email not found. Please signup.");
      navigate("/signup");
    } else {
      message.success("Password reset successful. Please login.");
      navigate("/login");
    }
  };

  return (
    <Card title="Reset Password" style={{ maxWidth: 400, margin: "auto" }}>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please enter email" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="newPassword"
          label="New Password"
          rules={[{ required: true, message: "Please enter new password" }]}
        >
          <Input.Password />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Reset Password
        </Button>
      </Form>
    </Card>
  );
};

export default ForgotPassword;
