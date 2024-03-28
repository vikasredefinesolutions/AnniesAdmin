/*Component Name: ViewCartModel
Component Functional Details: User can create or update ViewCartModel master details from here.
Created By: Shrey Patel
Created Date: Currunt Date
Modified By: <Modified By Name>
Modified Date: <Modified Date> */
import React, { useState, useEffect, useRef } from "react";
import { CurrencySymbolByCode, defaultImage, paginationDetails } from "global/Enum";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from 'react-to-print';
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import ReactTableServerSide from "components/common/table/ReactTableServerSide";
import Transition from "utils/Transition";
import ImageComponent from "../../../common/formComponent/Image";
import AbandonedShoppingCartService from "services/admin/customer/AbandonedShoppingCartService";

const ViewCartModel = ({ title, CustomerId, ShowViewCart, setShowViewCart }) => {
    const dispatch = useDispatch();
    const permission = useSelector(store => store.permission);
    const [data, setData] = useState([]);
    const print = useRef();

    const [sortingOptions, setSortingOptions] = useState([
        {
            field: "name",
            direction: 0,
            priority: 0,
        },
    ]);
    const [filteringOptions, setColumnFilteringOptions] = useState([]);
    const [paginationData, setPaginationData] = useState({
        ...paginationDetails,
    });

    const setPaginationDataFunc = (key, value) => {
        setPaginationData((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };
    const setSortingOptionHandler = (column, direction) => {
        setSortingOptions([
            {
                field: column,
                direction: direction,
                priority: 0,
            },
        ]);
    };

    const getAbandonedCartProducts = () => {
        if (CustomerId !== 0) {
            dispatch(setAddLoading(true));
            AbandonedShoppingCartService.getAbandonedShoppingCartProducts(CustomerId).then((response) => {
                setData(response.data.data);
                dispatch(setAddLoading(false));
            });
        }
    }

    const COLUMNS = [
        {
            id: "image",
            Header: "Image",
            accessor: "productImage",
            column_name: "image",
            disableSortBy: true,
            Cell: ({ value, row }) => {
                return value ? (
                    <>
                        <div
                            className="flex  items-center"
                            style={{ width: "100px" }}
                        >
                            <ImageComponent
                                className="w-20" containerHeight={"h-16"}
                                src={value}
                                alt="not available"
                            />
                        </div>
                    </>
                ) : (
                    <div className="flex -space-x-9 items-center">
                        <ImageComponent
                            src={defaultImage}
                            className="w-16" containerHeight={"h-16"}
                        />
                    </div>
                );
            },
        },
        {
            id: "productName",
            Header: "Product Name",
            accessor: "productName",
            column_name: "productName",
            Cell: ({ value }) => {
                return value ? (
                    <>
                        <div className="font-semibold text-left">{value}</div>
                    </>
                ) : (
                    "-"
                );
            },
            Footer: "Total",
        },
        {
            id: "sku",
            Header: "SKU",
            accessor: "sku",
            column_name: "sku",
            Cell: ({ value }) => {
                return value ? (
                    <>
                        <div className="font-semibold text-left">{value}</div>
                    </>
                ) : (
                    "-"
                );
            },
        },
        {
            id: "unitSold",
            Header: "UNIT SOLD",
            accessor: "unitSold",
            column_name: "unitSold",
            Cell: ({ value, row }) => {
                return value ? (
                    <>
                        <div className="font-semibold text-left">{value}</div>
                    </>
                ) : (
                    "-"
                );
            },
        },
        {
            id: "shippingCost",
            Header: `SHIPPING COST (${CurrencySymbolByCode.USD})`,
            accessor: "shippingCost",
            column_name: "shippingCost",
            Cell: ({ value }) => {
                return value ? (
                    <>
                        <div className="font-semibold text-left">{parseInt(value).toFixed(2)}</div>
                    </>
                ) : (
                    "0.00"
                );
            },
            Footer: () => {
                return (
                    <>
                        {CurrencySymbolByCode.USD}
                    </>
                );
            },
        },
        {
            id: "salesTax",
            Header: `SALES TAX (${CurrencySymbolByCode.USD})`,
            accessor: "salesTex",
            column_name: "salesTax",
            Cell: ({ value }) => {
                return value ? (
                    <>
                        <div className="font-semibold text-left">{parseInt(value).toFixed(2)}</div>
                    </>
                ) : (
                    "0.00"
                );
            },
            Footer: () => {
                return (
                    <>
                        {CurrencySymbolByCode.USD}
                    </>
                );
            },
        },
        {
            id: "revenue",
            Header: `REVENUE (${CurrencySymbolByCode.USD})`,
            accessor: "revenue",
            column_name: "revenue",
            Cell: ({ value }) => {
                return value ? (
                    <>
                        <div className="font-semibold text-left">{parseInt(value).toFixed(2)}</div>
                    </>
                ) : (
                    "0.00"
                );
            },
            Footer: () => {
                return (
                    <>
                        {CurrencySymbolByCode.USD}
                    </>
                );
            },
        },
    ];

    useEffect(() => {
        if (CustomerId !== 0) {
            getAbandonedCartProducts()
        }
    }, [CustomerId])

    const handlePrint = useReactToPrint({
        content: () => print.current,
    });

    return (
        <>
            <title>View Cart</title>
            <Transition
                className="fixed inset-0 bg-slate-600 bg-opacity-95 z-40 transition-opacity"
                show={ShowViewCart}
                tag="div"
                enter="transition ease-out duration-200 transform"
                enterStart="opacity-0 -translate-y-2"
                enterEnd="opacity-100 translate-y-0"
                leave="transition ease-out duration-200"
                leaveStart="opacity-100"
                leaveEnd="opacity-0"
                onClick={() => setShowViewCart(false)}
            ></Transition><Transition
                className="fixed inset-0 z-40 overflow-hidden flex items-center justify-center transform px-4 sm:px-6"
                show={ShowViewCart}
                tag="div"
                id="basic-modal"
                enter="transition ease-out duration-200 transform"
                enterStart="opacity-0 -translate-y-2"
                enterEnd="opacity-100 translate-y-0"
                leave="transition ease-out duration-200"
                leaveStart="opacity-100"
                leaveEnd="opacity-0"
            >
                <>
                    <div className="bg-white rounded shadow-lg overflow-auto max-h-[calc(100%-4rem)] w-full lg:max-w-[80vw]">
                        <div className="px-5 py-3 border-b border-neutral-200 sticky top-0 left-0 right-0 z-10 bg-white">
                            <div className="flex justify-between items-center">
                                <div className="font-bold text-black">
                                    {title ? title : "Confirmation"}
                                </div>
                                <button type="button"
                                    className="text-black hover:text-gray-400"
                                    onClick={() => setShowViewCart(false)}
                                >
                                    <div className="sr-only">Close</div>
                                    <svg className="w-4 h-4 fill-current">
                                        <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <ReactTableServerSide
                            COLUMNS={COLUMNS}
                            DATA={data}
                            {...paginationData}
                            setTablePageSize={(value) =>
                                setPaginationDataFunc("pageSize", value)
                            }
                            sortingOptions={sortingOptions}
                            fetchData={getAbandonedCartProducts}
                            displaySearch={false}
                            hiddenColumns={["rowSelection"]}
                            tablePadding={true}
                            filters={false}
                        />

                        <div className="flex items-center justify-end p-6 space-x-2 rounded-b border-t border-gray-200">
                            <button
                                type="button"
                                className="btn bg-white border-neutral-200 text-gray-500 hover:text-gray-700"
                                onClick={() => setShowViewCart(false)}
                            >
                                Cancel
                            </button>
                            {(permission?.isEdit || permission?.isDelete) && <button
                                type="Submit"
                                className={`flex justify-center btn px-6 bg-indigo-500 hover:bg-indigo-600 text-white "bg-indigo-200 cursor-pointer"}`}
                                onClick={() => handlePrint()}
                            >
                                <div className={`w-full flex justify-center align-middle`}>
                                    <span className="">
                                        Print
                                    </span>
                                </div>
                            </button>}
                        </div>
                    </div >
                </>
            </Transition >
        </>
    );
};

export default ViewCartModel;