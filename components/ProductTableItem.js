import React, { useState } from "react";
import { useRouter } from "next/router";

const ProductTableItem = ({ product }) => {
  const [editHover, setEditHover] = useState(false);
  const [deleteHover, setDeleteHover] = useState(false);
  const router = useRouter();

  const editClick = () => {
    router.push("/yourproducts/edit/" + product._id);
  };

  const deleteClick = () => {
    router.push("yourproducts/delete/" + product._id);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "5%",
        marginLeft: "5%",
        marginRight: "5%",
        marginTop: "2%",
        borderColor: "black",
        borderWidth: "1px",
      }}
    >
      <div style={{ alignSelf: "center" }}>{product.title}</div>
      <div style={{ display: "flex" }}>
        <button
          style={buttonStyles}
          onClick={editClick}
          onMouseEnter={() => setEditHover(true)}
          onMouseLeave={() => setEditHover(false)}
        >
          <span style={editHover ? buttonHoverStyles : { alignSelf: "center" }}>
            Edit
          </span>
          <div
            style={
              editHover
                ? { ...buttonBeforeStyles, ...buttonHoverBeforeStyles }
                : buttonBeforeStyles
            }
          ></div>
        </button>

        <button
          style={deleteButtonStyles}
          onClick={deleteClick}
          onMouseEnter={() => setDeleteHover(true)}
          onMouseLeave={() => setDeleteHover(false)}
        >
          <span
            style={deleteHover ? deleteHoverStyles : { alignSelf: "center" }}
          >
            Delete
          </span>
          <div
            style={
              deleteHover
                ? { ...buttonBeforeStyles, ...buttonHoverBeforeStyles }
                : buttonBeforeStyles
            }
          ></div>
        </button>
      </div>
    </div>
  );
};

const deleteButtonStyles = {
  "--color": "red",
  fontFamily: "inherit",
  display: "inline-block",
  width: "5.5em",
  height: "2.6em",
  lineHeight: "2.5em",
  overflow: "hidden",
  cursor: "pointer",
  margin: "20px",
  fontSize: "17px",
  zIndex: "1",
  color: "white",
  border: "2px solid var(--color)",
  borderRadius: "6px",
  position: "relative",
  textAlign: "center",
  background: "var(--color)",
};

const buttonStyles = {
  "--color": "#222",
  fontFamily: "inherit",
  display: "inline-block",
  width: "5.5em",
  height: "2.6em",
  lineHeight: "2.5em",
  overflow: "hidden",
  cursor: "pointer",
  margin: "20px",
  fontSize: "17px",
  zIndex: "1",
  color: "white",
  border: "2px solid var(--color)",
  borderRadius: "6px",
  position: "relative",
  textAlign: "center",
  background: "var(--color)",
};

const buttonHoverStyles = {
  color: "#222",
};

const deleteHoverStyles = {
  color: "red",
};

const buttonBeforeStyles = {
  position: "absolute",
  content: '""',
  background: "white",
  width: "150px",
  height: "200px",
  zIndex: "-1",
  borderRadius: "50%",
};

const buttonHoverBeforeStyles = {
  top: "-30px",
  left: "-30px",
  transition: "0.3s all",
};

export default ProductTableItem;
