import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Spinner from "@/components/Spinner";
import Alert from "./Alert";
import { ReactSortable } from "react-sortablejs";

const DEFAULT_NON_ERROR = "";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  category: assignedCategory,
  properties: assignedProperties,
  soldBy: assignedSoldBy,
}) {
  const [error, setError] = useState("");
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [category, setCategory] = useState(assignedCategory || "");
  const [productProperties, setProductProperties] = useState(
    assignedProperties || {}
  );
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState(existingImages || []);
  const [goToProducts, setGoToProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const router = useRouter();
  console.log("REACHED HERERRRRRR");
  useEffect(() => {
    setCategoriesLoading(true);
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
      setCategoriesLoading(false);
    });
  }, []);
  async function saveProduct(ev) {
    ev.preventDefault();
    const data = {
      title,
      description,
      price,
      images,
      category,
      properties: productProperties,
    };
    if (category === "") {
      setError("Product must have a category");
      return;
    }
    if (_id) {
      //update
      await axios.put("/api/yourproducts", { ...data, _id });
    } else {
      //create
      await axios.post("/api/yourproducts", data);
    }
    setGoToProducts(true);
  }
  if (goToProducts) {
    router.push("/yourproducts");
  }
  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post("/api/upload", data);
      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
      setIsUploading(false);
    }
  }
  function updateImagesOrder(images) {
    setImages(images);
  }
  function setProductProp(propName, value) {
    setProductProperties((prev) => {
      const newProductProps = { ...prev };
      newProductProps[propName] = value;
      return newProductProps;
    });
  }

  const propertiesToFill = [];
  if (categories.length > 0 && category) {
    let catInfo = categories.find(({ _id }) => _id === category);
    propertiesToFill.push(...catInfo.properties);
    while (catInfo?.parent?._id) {
      const parentCat = categories.find(
        ({ _id }) => _id === catInfo?.parent?._id
      );
      propertiesToFill.push(...parentCat.properties);
      catInfo = parentCat;
    }
  }

  return (
    <>
      {error !== DEFAULT_NON_ERROR && (
        <Alert
          message={error}
          closeAction={() => setError(DEFAULT_NON_ERROR)}
        />
      )}
      {/* <form onSubmit={saveProduct}>
        <label>Product name</label>
        <input
          type="text"
          placeholder="product name"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <label>Category</label>
        <select
          value={category}
          onChange={(ev) => setCategory(ev.target.value)}
        >
          <option value="">Uncategorized</option>
          {categories.length > 0 &&
            categories.map((c) => <option value={c._id}>{c.name}</option>)}
        </select>
        {categoriesLoading && <Spinner />}
        {propertiesToFill.length > 0 &&
          propertiesToFill.map((p) => (
            <div className="">
              <label>{p.name[0].toUpperCase() + p.name.substring(1)}</label>
              <div>
                <select
                  value={productProperties[p.name]}
                  onChange={(ev) => setProductProp(p.name, ev.target.value)}
                >
                  {p.values.map((v) => (
                    <option value={v}>{v}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        <label>Photos</label>
        <div className="mb-2 flex flex-wrap gap-1">
          <ReactSortable
            list={images}
            className="flex flex-wrap gap-1"
            setList={updateImagesOrder}
          >
            {!!images?.length &&
              images.map((link) => (
                <div
                  key={link}
                  className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200"
                >
                  <img src={link} alt="" className="rounded-lg" />
                </div>
              ))}
          </ReactSortable>
          {isUploading && (
            <div className="h-24 flex items-center">
              <Spinner />
            </div>
          )}
          <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            <div>Add image</div>
            <input type="file" onChange={uploadImages} className="hidden" />
          </label>
        </div>
        <label>Description</label>
        <textarea
          placeholder="description"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        <label>Price (in USD)</label>
        <input
          type="number"
          placeholder="price"
          value={price}
          onChange={(ev) => setPrice(ev.target.value)}
        />
        <button type="submit" className="btn-primary">
          Save
        </button>
      </form> */}
      <form
        onSubmit={saveProduct}
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ marginBottom: "5%", marginRight: "5%" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Product name
          </label>
          <input
            type="text"
            placeholder="Product name"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Category
          </label>
          <select
            value={category}
            onChange={(ev) => setCategory(ev.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">Uncategorized</option>
            {categories.length > 0 &&
              categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
          {categoriesLoading && <Spinner />}
        </div>

        {propertiesToFill.length > 0 &&
          propertiesToFill.map((p) => (
            <div key={p.name} style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                {p.name[0].toUpperCase() + p.name.substring(1)}
              </label>
              <select
                value={productProperties[p.name]}
                onChange={(ev) => setProductProp(p.name, ev.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              >
                {p.values.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          ))}

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Photos
          </label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            <ReactSortable list={images} setList={updateImagesOrder}>
              {!!images?.length &&
                images.map((link) => (
                  <div
                    key={link}
                    style={{
                      width: "120px",
                      height: "120px",
                      padding: "5px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  >
                    <img
                      src={link}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "4px",
                      }}
                    />
                  </div>
                ))}
            </ReactSortable>
            {isUploading && <Spinner />}
            <label
              style={{
                width: "120px",
                height: "120px",
                padding: "5px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#0077ff",
                background: "#ffffff",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                style={{ marginBottom: "5px" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
              <span>Add image</span>
              <input
                type="file"
                onChange={uploadImages}
                style={{ display: "none" }}
              />
            </label>
          </div>
        </div>

        <div style={{ marginBottom: "5%", marginRight: "5%" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Description
          </label>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ marginBottom: "5%", marginRight: "5%" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Price (in USD)
          </label>
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(ev) => setPrice(ev.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "black",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Save
        </button>
      </form>
    </>
  );
}
