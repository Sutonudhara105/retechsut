import React from "react";

const Order = ({ name, email, picture, quantity }) => {
  return (
    <div
      style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
    >
      <img
        src={picture}
        alt="User"
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          marginRight: "5%",
          marginLeft: "5%",
        }}
      />
      <div>
        <h3>{name}</h3>
        <p>Ordered By: {email}</p>
        <p>Quantity: {quantity}</p>
      </div>
    </div>
  );
};

export default Order;
