import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";
import Header from "@/components/Header";
import ProductTableItem from "@/components/ProductTableItem";
import Layout from "@/components/Layout";
import NavButton from "@/components/Sell/NavButton";
import AddProductButton from "@/components/AddProduct";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios.get("/api/yourproducts").then((response) => {
      setProducts(response.data);
      setIsLoading(false);
    });
  }, []);
  return (
    <div>
      <Header />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ marginLeft: "5%" }}>Your Products</h1>
        <AddProductButton />
      </div>
      {!isLoading && products.length > 0 ? (
        <div
          style={{
            backgroundColor: "white",
            marginLeft: "5%",
            marginRight: "5%",
            boxShadow:
              "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.04)",
          }}
        >
          {products.map((product, index) => {
            return <ProductTableItem product={product} key={index} />;
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
            You don&apos;t have any products which you sell
          </div>
        </div>
      )}
    </div>
  );
}
