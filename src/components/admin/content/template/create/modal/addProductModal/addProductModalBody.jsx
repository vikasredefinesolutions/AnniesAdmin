import React, { useCallback, useEffect, Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { debounce } from "lodash";

import ProductService from "services/admin/master/store/product/ProductService";

import { CircularProgress, Pagination } from "@mui/material";

const ProductModalBody = ({
  handleClose,
  storeId,
  checkedProducts,
  setCheckedProducts,
  setLoading,
  loading,
}) => {
  const AdminAppConfigReducers = useSelector(
    (store) => store?.AdminAppConfigReducers,
  );

  const [activeTab, setActiveTab] = useState(1);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(6);
  const [count, setCount] = useState(10);
  const [pageSelected, setPageSelected] = useState(1);
  const [countSelected, setCountSelected] = useState(10);
  const [search, setSearchQuery] = useState("");

  const fetchAllProducts = async (searchInput = "") => {
    const data = {
      args: {
        pageIndex: page,
        pageSize: rowsPerPage,
        pagingStrategy: 0,
        sortingOptions: [
          {
            field: "name",
            direction: 0,
            priority: 0,
          },
        ],
        filteringOptions: [
          {
            field: search || searchInput ? "global" : "recStatus",
            operator: 0,
            value: search ? search : searchInput ? searchInput : "A",
          },
        ],
      },
      storeId: storeId,
    };
    const res = await ProductService.getStoreProductsWithoutSubrows(data);
    // if (res.data.data.totalPages < 10) {
    // }
    setCount(res.data?.data?.totalPages);
    setProducts(res?.data?.data);
    setLoading(false);
  };

  const debouncedSearch = useCallback(
    debounce(async (value) => {
      await fetchAllProducts(value);
      setSearchQuery(value);
    }, 1000),
    [],
  );

  async function handleSearch(e) {
    debouncedSearch(e.target.value);
  }

  const handleChecked = (event, product) => {
    if (!event.target.checked) {
      let filterdProducts = checkedProducts.filter((prod, index) => {
        if (prod.id !== product.id) {
          return prod;
        }
      });
      setCheckedProducts(filterdProducts);
      let totalCount = Math.ceil(filterdProducts.length / rowsPerPage);
      if (totalCount < 10) {
        setCountSelected(totalCount);
      }
    } else {
      setCheckedProducts((previous) => [...previous, product]);
      let totalCount = Math.ceil(product.length / rowsPerPage);
      if (totalCount < 10) {
        setCountSelected(totalCount);
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchAllProducts();
  }, [page]);

  useEffect(() => {
    let totalCount = Math.ceil(checkedProducts.length / rowsPerPage);
    if (totalCount < 10 && totalCount) {
      setCountSelected(totalCount);
    }
  }, [checkedProducts]);

  return (
    <>
      <div className="bg-white rounded shadow-lg overflow-auto max-w-4xl w-full max-h-full">
        <div className="px-5 py-3 border-b border-neutral-200">
          <div className="flex justify-between items-center">
            <div className="font-semibold text-gray-800">Browse Products</div>
            <button
              className="text-gray-400 hover:text-gray-500"
              type="button"
              onClick={handleClose}
            >
              <div className="sr-only">Close</div>
              <svg className="w-4 h-4 fill-current">
                <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z"></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="px-5 pt-4 pb-1">
          <div className="mb-4">
            Choose up to 10 products from your catalog to display.
          </div>
          <div className="w-full flex flex-wrap sm:auto-cols-max justify-between gap-2 pb-7">
            <div className="grow flex">
              <div className="relative w-full">
                <div className="absolute h-10 mt-0 left-0 top-0 flex items-center">
                  <svg
                    className="h-4 pl-4 fill-current text-gray-600"
                    viewBox="0 0 20 20"
                  >
                    <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
                  </svg>
                </div>
                <input
                  type="search"
                  disabled={activeTab == 2 || loading ? true : false}
                  placeholder="Search by name or product ID"
                  className="block w-full bg-[#f7f7fa] border-neutral-200 hover:border-neutral-300 focus:border-neutral-100 focus:ring-neutral-300 focus:shadow-lg pl-10 pr-2 py-2 rounded-md"
                  onChange={handleSearch}
                />
              </div>
            </div>

            {/* <!-- End --> */}
          </div>
          {/* <!-- tab --> */}
          {loading && (
            <div
              style={{
                width: "750px",
                height: "460px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress color="secondary" />
            </div>
          )}
          {!loading && (
            <div className="w-full">
              <ul className="w-full flex border-b border-b-neutral-200">
                <li className="pl-6">
                  {" "}
                  <a
                    href="javascript:void(0);"
                    onClick={() => setActiveTab(1)}
                    className={`${activeTab === 1
                      ? "tab block hover:text-black focus:outline-none text-black border-b-2 font-bold border-red-500"
                      : "tab bg-transparent text-[#BDBDC2] block hover:text-red-500 focus:outline-none border-b-2 rounded-sm font-bold border-transparent hover:border-red-500"
                      }`}
                  >
                    All Products
                  </a>{" "}
                </li>
                <li className="pl-6">
                  {" "}
                  <a
                    href="javascript:void(0);"
                    onClick={() => setActiveTab(2)}
                    className={`${activeTab === 2
                      ? "tab block hover:text-black focus:outline-none text-black border-b-2 font-bold border-red-500"
                      : "tab bg-transparent text-[#BDBDC2] block hover:text-red-500 focus:outline-none border-b-2 rounded-sm font-bold border-transparent hover:border-red-500"
                      }`}
                  >
                    Selected Products ({checkedProducts.length}){" "}
                  </a>{" "}
                </li>
              </ul>
              <div className="w-full">
                <div
                  className={`panel-01 tab-content ${activeTab != 1 ? "hidden" : ""
                    }`}
                >
                  <div className="p-3">
                    <div className="flex flex-wrap -mx-3 mb-3">
                      {!loading &&
                        products &&
                        products?.items &&
                        products?.items.map((product, index) => {
                          return (
                            <Fragment key={index}>
                              <div
                                key={product?.id}
                                className="w-full md:w-1/2 px-3 py-2 border-b border-neutral-300"
                              >
                                <div className="flex justify-start items-center">
                                  <div className="mr-3">
                                    <label className="inline-flex leading-none w-5 h-5">
                                      <input
                                        checked={checkedProducts.find(
                                          (prod) => prod?.id == product?.id,
                                        )}
                                        className="table-item form-checkbox"
                                        type="checkbox"
                                        onChange={(event) =>
                                          handleChecked(event, product)
                                        }
                                      />
                                    </label>
                                  </div>
                                  <div className="w-16 h-16 mr-3 border-3 border-neutral-300 text-center flex items-center justify-center p-2">
                                    <img
                                      src={`${AdminAppConfigReducers["azure:BlobUrl"]}${product?.productImage[0]}`}
                                      className="inline-block"
                                    />
                                  </div>
                                  <div>
                                    <div className="font-semibold">
                                      {product?.name}
                                    </div>
                                    <div>
                                      <span className="font-semibold text-sm">
                                        SKU:{" "}
                                      </span>{" "}
                                      {product?.ourSKU}
                                    </div>
                                    <div>
                                      <span className="font-semibold text-sm">
                                        MSRP:{" "}
                                      </span>{" "}
                                      {product?.msrp}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Fragment>
                          );
                        })}
                    </div>
                    <nav
                      className="flex justify-end mb-3"
                      role="navigation"
                      aria-label="Navigation"
                    >
                      <Pagination
                        count={count}
                        color="primary"
                        page={page}
                        onChange={(event, value) => {
                          return setPage(value);
                        }}
                        shape="rounded"
                        variant="outlined"
                      />
                    </nav>
                  </div>
                </div>
                <div
                  x-show="activeTab === 02"
                  className={`panel-02 tab-content ${activeTab != 2 ? "hidden" : ""
                    }`}
                >
                  <div className="p-3">
                    <div className="flex flex-wrap -mx-3 mb-3">
                      {checkedProducts &&
                        checkedProducts
                          ?.slice(
                            (pageSelected - 1) * rowsPerPage,
                            pageSelected * rowsPerPage,
                          )
                          ?.map((product, index) => {
                            return (
                              <Fragment key={index}>
                                <div className="w-full md:w-1/2 px-3 py-2 border-b border-neutral-300">
                                  <div className="flex justify-start items-center">
                                    <div className="mr-3">
                                      <label className="inline-flex leading-none w-5 h-5">
                                        <input
                                          className="table-item form-checkbox"
                                          type="checkbox"
                                          checked
                                          onChange={(event) =>
                                            handleChecked(event, product)
                                          }
                                        />
                                      </label>
                                    </div>
                                    <div className="w-16 h-16 mr-3 border-3 border-neutral-300 text-center flex items-center justify-center p-2">
                                      <img
                                        src={`${AdminAppConfigReducers["azure:BlobUrl"]}${product?.productImage[0]}`}
                                        className="inline-block"
                                      />
                                    </div>
                                    <div>
                                      <div className="font-semibold">
                                        {product?.name}
                                      </div>
                                      <div>
                                        <span className="font-semibold text-sm">
                                          SKU:{" "}
                                        </span>{" "}
                                        {product?.ourSKU}
                                      </div>
                                      <div>
                                        <span className="font-semibold text-sm">
                                          MSRP:{" "}
                                        </span>{" "}
                                        {product?.msrp}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Fragment>
                            );
                          })}
                    </div>
                    {checkedProducts.length && (
                      <nav
                        className="flex justify-end mb-3"
                        role="navigation"
                        aria-label="Navigation"
                      >
                        <Pagination
                          count={countSelected}
                          color="primary"
                          page={pageSelected}
                          onChange={(event, value) => {
                            return setPageSelected(value);
                          }}
                          shape="rounded"
                          variant="outlined"
                          totalPages={count}
                        />
                      </nav>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductModalBody;
