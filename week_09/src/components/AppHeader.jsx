import React, { memo, useState, useEffect } from "react";
import { Layout, Button, Space } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { isAuthenticated, logout } from "../utils/auth";

const { Header } = Layout;

const AppHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(isAuthenticated());

  // update header when route changes (login/logout)
  useEffect(() => {
    setLoggedIn(isAuthenticated());
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <Header
      style={{
        background: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 24px",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      <h1
        style={{ margin: 0, color: "#1677ff", cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        Product Management
      </h1>

      <Space>
        {!loggedIn ? (
          <>
            <Button onClick={() => navigate("/login")}>Login</Button>
            <Button type="primary" onClick={() => navigate("/signup")}>
              Signup
            </Button>
          </>
        ) : (
          <Button danger onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Space>
    </Header>
  );
};

export default memo(AppHeader);
