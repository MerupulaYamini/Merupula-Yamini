import React, { memo } from "react";
import { Layout } from "antd";

const { Header } = Layout;


const AppHeader = () => {
  return (
    <Header style={{
        background: "#fff",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
        <h1 style={{ margin: 0, color: "#1677ff" }}>Product Management
      </h1>
    </Header>
  );
};

export default memo(AppHeader);
