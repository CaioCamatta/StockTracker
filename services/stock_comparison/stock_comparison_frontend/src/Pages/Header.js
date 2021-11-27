import React from "react";

export default function Header() {
  return (
    <div style={{ backgroundColor: "#7749F8", height: "60px", color: "white" }}>
      <div
        style={{
          marginLeft: "140px",
          fontSize: "23px",
          fontWeight: "500",
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        Stock Tracker
      </div>
    </div>
  );
}
