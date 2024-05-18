import Header from "@/components/Header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "@/components/ProductForm";
import Spinner from "@/components/Spinner";

export default function EditProductPage() {
  const [productInfo, setProductInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    setIsLoading(true);
    axios
      .get("/api/yourproducts?id=" + id)
      .then((response) => {
        console.log("Response", response.data);
        setProductInfo(response.data);
        setIsLoading(false);
      })
      .catch(() => {
        console.log("Here");
      });
  }, [id]);
  return (
    <div>
      <Header />
      <div style={{ display: "flex" }}>
        <h1 style={{ marginLeft: "5%" }}>Edit product</h1>
      </div>
      {isLoading && <Spinner />}
      {productInfo && <ProductForm {...productInfo} />}
    </div>
  );
}
