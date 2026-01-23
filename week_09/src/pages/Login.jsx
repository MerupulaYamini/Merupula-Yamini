import { Card, Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/auth";

const Login = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    const result = login(values.email, values.password);

    if (result.status === "NO_USER") {
      message.warning("User not found. Please signup first.");
      setTimeout(() => navigate("/signup"), 800);
    } 
    else if (result.status === "INVALID_CREDENTIALS") {
      message.error("Invalid email or password");
    } 
    else {
      message.success("Login successful");
      navigate("/");
    }
  };

  return (
    <Card title="Login" style={{ maxWidth: 400, margin: "auto" }}>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please enter email" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please enter password" }]}
        >
          <Input.Password />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Login
        </Button>

        <Button
          type="link"
          block
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </Button>
      </Form>
    </Card>
  );
};

export default Login;
