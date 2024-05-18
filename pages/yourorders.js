import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";
import Header from "@/components/Header";
import ProductTableItem from "@/components/ProductTableItem";
import AddProductButton from "@/components/AddProduct";
import Order from "@/components/Order";

export default function YourOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios.get("/api/yourorders").then((response) => {
      setOrders(response.data);
      setIsLoading(false);
    });
  }, []);
  return (
    <div>
      <Header />
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <h1 style={{ marginLeft: "5%" }}>Your Orders</h1>
      </div>
      {!isLoading && orders.length > 0 ? (
        <div
          style={{
            backgroundColor: "white",
            marginLeft: "5%",
            marginRight: "5%",
            boxShadow:
              "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.04)",
          }}
        >
          {orders.map((order, index) => {
            const orderedBy = order.orderedBy;
            return (
              <div key={index}>
                {orderedBy.map((orderee, index) => {
                  return (
                    <Order
                      name={order.title}
                      picture={order.images[0]}
                      email={orderee.email}
                      quantity={orderee.quantity}
                      key={index}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              alignSelf: "center",
              justifySelf: "center",
            }}
          >
            You don&apos;t have any orders
          </div>
        </div>
      )}
    </div>
  );
}
