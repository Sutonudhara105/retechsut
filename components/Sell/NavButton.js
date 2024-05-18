import React from "react";

const NavButton = ({ text, child }) => {
  return (
    <div style={{ display: "flex", marginBottom: "15%" }}>
      {child}
      <button
        style={{
          fontSize: "20px",
          marginLeft: "2%",
          background: "none",
          color: "inherit",
          border: "none",
          padding: 0,
          font: "inherit",
          cursor: "pointer",
        }}
      >
        {text}
      </button>
    </div>
  );
};

export default NavButton;
