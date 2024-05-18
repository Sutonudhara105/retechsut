import Layout from "@/components/Layout";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DeleteProductPage() {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState();
  const { id } = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/yourproducts?id=" + id).then((response) => {
      setProductInfo(response.data);
    });
  }, [id]);
  function goBack() {
    router.push("/yourproducts");
  }
  async function deleteProduct() {
    await axios.delete("/api/yourproducts?id=" + id);
    goBack();
  }
  return (
    <div>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Do you really want to delete &nbsp;&quot;{productInfo?.title}&quot;?</h1>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
          padding: "1rem",
          backgroundColor: "#ffffff",
          borderRadius: "0.5rem",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <button
          onClick={deleteProduct}
          style={{
            padding: "10px 20px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#ef4444",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 2px 4px rgba(239, 68, 68, 0.3)",
          }}
        >
          Yes
        </button>
        <button
          onClick={goBack}
          style={{
            padding: "10px 20px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            backgroundColor: "#ffffff",
            color: "#374151",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          No
        </button>
      </div>
    </div>
  );
}
