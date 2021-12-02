import React from "react";

export default function Header() {
  return (
    <div style={{ backgroundColor: "#7749F8", height: "60px", color: "white" }}>
      <a
        href={`${window.location.protocol}//${window.location.hostname}:80`}
        style={{
          marginLeft: "140px",
          fontSize: "23px",
          fontWeight: "500",
          height: "100%",
          display: "flex",
          alignItems: "center",
          color: "inherit",
          textDecoration: "inherit"
        }}
      >
        Stock Tracker
      </a>
    </div>
  );
}
