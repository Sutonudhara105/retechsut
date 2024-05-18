import { useState } from "react";

const Alert = ({ message, closeAction }) => {
  // const [show, setShow] = useState(true);

  // if (!show) {
  //   return null;
  // }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        paddingRight: "1%",
        paddingLeft: "1%",
      }}
    >
      <p style={{ color: "black", fontWeight: "bold" }}>{message}</p>
      <button
        style={{
          background: "none",
          color: "inherit",
          border: "none",
          padding: 0,
          font: "inherit",
          cursor: "pointer",
        }}
        onClick={closeAction}
      >
        <span>&times;</span>
      </button>
    </div>
  );
};

export default Alert;
