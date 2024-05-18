import React, { useState } from "react";
import { useRouter } from "next/router";

const buttonStyles = {
  display: "flex",
  alignItems: "center",
  fontFamily: "inherit",
  fontWeight: "500",
  fontSize: "16px",
  height: "2.6em",
  width: "5.5em",
  alignSelf: "center",
  padding: "0.7em 1.4em 0.7em 1.1em",
  color: "white",
  background:
    "linear-gradient(0deg, rgba(20,167,62,1) 0%, rgba(102,247,113,1) 100%)",
  border: "none",
  boxShadow: "0 0.7em 1.5em -0.5em #14a73e98",
  letterSpacing: "0.05em",
  marginRight: "5%",
  cursor: "pointer",
};

const buttonHoverStyles = {
  display: "flex",
  alignItems: "center",
  fontFamily: "inherit",
  fontWeight: "500",
  fontSize: "16px",
  height: "2.6em",
  width: "5.5em",
  alignSelf: "center",
  padding: "0.7em 1.4em 0.7em 1.1em",
  color: "white",
  background:
    "linear-gradient(0deg, rgba(20,167,62,1) 0%, rgba(102,247,113,1) 100%)",
  border: "none",
  letterSpacing: "0.05em",
  marginRight: "5%",
  cursor: "pointer",
  boxShadow: "0 0.5em 1.5em -0.5em #14a73e98",
};

const buttonActiveStyles = {
  boxShadow: "0 0.3em 1em -0.5em #14a73e98",
};

const svgStyles = {
  marginRight: "6px",
};

const AddProductButton = () => {
  const [hover, setHover] = useState(false);
  const router = useRouter();

  const addClick = () => {
    router.push("/yourproducts/new");
  };

  return (
    <button
      style={hover ? buttonHoverStyles : buttonStyles}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseDown={() => setHover(true)}
      onMouseUp={() => setHover(false)}
      onClick={addClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        style={svgStyles}
      >
        <path fill="none" d="M0 0h24v24H0z"></path>
        <path fill="currentColor" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"></path>
      </svg>
      <span>Add</span>
    </button>
  );
};

export default AddProductButton;
