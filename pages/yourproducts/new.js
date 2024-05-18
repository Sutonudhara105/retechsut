import ProductForm from "@/components/ProductForm";
import Header from "@/components/Header";

export default function NewProduct() {
  return (
    <div>
      <Header />
      <div style={{ display: "flex" }}>
        <h1 style={{ marginLeft: "5%" }}>New Product</h1>
      </div>
      <ProductForm />
    </div>
  );
}
