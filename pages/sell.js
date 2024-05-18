import React, { useState } from "react";
import Header from "@/components/Header";
import NavButton from "@/components/Sell/NavButton";

const Sell = () => {
  const [pageState, setPageState] = useState({
    showProducts: true,
    editProduct: "",
    addProduct: "",
    showOrders: false,
    showCategories: false,
  });

  return (
    <div>
      <Header />
      <div style={{ display: "flex", height: "100%" }}>
        <aside
          className={
            "-left-full" +
            " top-0 text-gray-500 p-4 fixed w-full bg-bgGray h-full md:static md:w-auto transition-all"
          }
          style={{ backgroundColor: "red", width: "20%" }}
        >
          <NavButton
            text={"Your products"}
            child={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                style={{ height: "5%", width: "10%" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                />
              </svg>
            }
          />
          <NavButton
            text={"Your orders"}
            child={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                style={{ height: "5%", width: "10%" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
                />
              </svg>
            }
          />
          <NavButton
            text={"Categories"}
            child={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                style={{ height: "5%", width: "10%" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            }
          />
        </aside>
        <div style={{ backgroundColor: "blue", width: "100%" }}>Hello</div>
      </div>
    </div>
  );
};

export default React.memo(Sell);
