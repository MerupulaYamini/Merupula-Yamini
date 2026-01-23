import { Card, Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { signup } from "../utils/auth";

const Signup = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    signup({
      email: values.email,
      password: values.password,
    });
    message.success("Signup successful. Please login.");
    navigate("/login");
  };

  return (
    <Card title="Signup" style={{ maxWidth: 400, margin: "auto" }}>
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

        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Passwords do not match")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Signup
        </Button>
      </Form>
    </Card>
  );
};

export default Signup;
