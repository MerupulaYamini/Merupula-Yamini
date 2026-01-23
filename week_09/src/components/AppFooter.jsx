import { Layout } from "antd";
import React, { memo } from "react";

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer
      style={{
        textAlign: "center",
        background: "#001529",
        color: "#fff",
      }}
    >
      <div>
        © 2024 Product Management. All rights reserved.
      </div>
      <div style={{ marginTop: 8 }}>
        Privacy Policy | Terms of Service | Contact Us
      </div>
    </Footer>
  );
};

export default memo(AppFooter);
