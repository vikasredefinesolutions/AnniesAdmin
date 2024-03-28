/*Component Name: Bundle
Component Functional Details: User can create or update Bundle master details from here.
Created By: <Your Name>
Created Date: <Creation Date>
Modified By: chandan
Modified Date: Sept/28/2022 */

import ReactTable from 'components/common/table/ReactTableServerSide';
import { productType } from 'dummy/Dummy';
import { defaultImage, paginationDetails } from 'global/Enum';
import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Image from 'components/common/formComponent/Image';
import BundleStoreService from 'services/admin/master/store/product/BundleService';
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { useDispatch, useSelector } from "react-redux";

const Bundle = ({ type, productId, values, readOnly, isAddMode, setFormSubmit, activeTab }) => {
    const dispatch = useDispatch();
    const AdminAppConfigReducers = useSelector((store) => store?.AdminAppConfigReducers);

    const COLUMNS = [
        {
            id: "",
            Header: "",
            accessor: "productImage",
            column_name: "",
            disableSortBy: true,
            Cell: ({ value, row }) => {
                return row ? (
                    <>
                        {/* {row.original.subRows === undefined && (
                            <> */}
                                {value !== null ? (
                                    <>
                                        <div className="w-14 h-14 shrink-0 mr-2 sm:mr-3  rounded-full text-center">
                                            <div className="h-14 w-14 flex items-center justify-center overflow-hidden  box-content border bg-white">
                                                <Image src={value} containerHeight={""} className="max-h-full" />
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-14 h-14 shrink-0 mr-2 sm:mr-3  rounded-full text-center">
                                            <div className="h-14 w-14 flex items-center justify-center overflow-hidden  box-content border bg-white">
                                                <Image src={defaultImage} containerHeight={""} className="max-h-full" />
                                            </div>
                                        </div>
                                    </>
                                )}
                            {/* </>
                        )} */}
                    </>
                ) : (
                    "-"
                );
            },
        },
        {
            id: "name",
            Header: "Name",
            accessor: "name",
            column_name: "name",
            Cell: ({ value, row }) => {
                return row ? (
                    <>
                        <div
                            className="w-full flex justify-start items-center group"
                            style={{ width: "200px" }}
                        >
                            {/* <div  >
                                <Image src={`${AdminAppConfigReducers["azure:BlobUrl"]}${value.storeImage}`} />
                            </div> */}
                            <div >
                                {value}
                            </div>
                        </div>
                    </>
                ) : (
                    "-"
                );
            },
        },
        {
            id: "store",
            Header: "Store",
            accessor: "storeImage",
            column_name: "store",
            Cell: ({ value, row }) => {
                return row ? (
                    <>{type == productType.MC &&
                        <>
                            {
                                row.original.subRows !== undefined && (
                                    <>
                                        {value !== null ? (
                                            <>
                                                <div  >
                                                    <img className={'w-12 h-12 border border-neutral-200 rounded-full box-content items-center'} src={`${AdminAppConfigReducers["azure:BlobUrl"]}${value}`} />
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div  >
                                                    <Image src={defaultImage} />
                                                </div>
                                            </>
                                        )}
                                    </>
                                )
                            }
                        </>
                    }
                    </>
                ) : (
                    "-"
                );
            },
        },
        {
            id: "sku",
            Header: "SKU",
            accessor: "ourSKU",
            column_name: "SKU",
            Cell: ({ value, row }) => {
                return row ? (
                    <>
                        <div className="w-full flex justify-start items-center group mr-8">
                            <div >
                                {value}
                            </div>
                        </div>
                    </>
                ) : (
                    "-"
                );
            },
        },
        {
            id: "salePrice",
            Header: "Sale Price",
            accessor: "salePrice",
            column_name: "salePrice",
            Cell: ({ value, row }) => {
                return row ? (
                    <>
                        <div className="w-full flex justify-start items-center group mr-8">
                            <div >
                                {value}
                            </div>
                        </div>
                    </>
                ) : (
                    "-"
                );
            },
        },
        {
            id: "msrp",
            Header: "MSRP",
            accessor: "msrp",
            column_name: "MSRP",
            Cell: ({ value, row }) => {
                return row ? (
                    <>
                        <div className="w-full flex justify-start items-center group mr-8">
                            <div >
                                {value}
                            </div>
                        </div>
                    </>
                ) : (
                    "-"
                );
            },
        },
        {
            id: "quantity",
            Header: "Quantity",
            accessor: "quantity",
            column_name: "quantity",
            Cell: ({ value, row }) => {
                return row ? (
                    <>
                        <div className="w-full flex justify-start items-center group mr-8">
                            <div >
                                {value}
                            </div>
                        </div>
                    </>
                ) : (
                    "-"
                );
            },
        },
        // {
        //     id: "color",
        //     Header: "color",
        //     accessor: "color",
        //     column_name: "color",
        //     Cell: ({ value, row }) => {
        //         return row ? (
        //             <>
        //                 <div className="w-full flex justify-start items-center group">
        //                     <div >
        //                         {value}
        //                     </div>
        //                 </div>
        //             </>
        //         ) : (
        //             "-"
        //         );
        //     },
        // },
    ];

    useEffect(() => {
        setFormSubmit(null)
    }, [])

    const [Data, setData] = useState([]);
    const [sortingOptions, setSortingOptions] = useState([{
            field: "name",
            direction: 0,
            priority: 0,
        }]);
    const [paginationData, setPaginationData] = useState({
        ...paginationDetails,
    });
    const [filteringOptions, setColumnFilteringOptions] = useState([]);
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
    const getBundleData = /* useCallback( */
        (pageIndex = 1) => {
            dispatch(setAddLoading(true))
                BundleStoreService.getBundleProducts(productId)
                    .then((response) => {
                        const StoreBundleProduct = response?.data;
                        setData(StoreBundleProduct?.data);
                        dispatch(setAddLoading(false))
                    });
        }/* ,
        [filteringOptions, paginationData.pageSize, sortingOptions, paginationData.pageIndex]
    ); */
    useEffect(() => {
        if (activeTab === 10) {
            getBundleData();
        }
    }, [filteringOptions, paginationData.pageSize, sortingOptions, paginationData.pageIndex, activeTab])


    return (
        <div className="col-span-full w-full rounded-md">
            <ReactTable
                COLUMNS={COLUMNS}
                DATA={Data}
                // {...paginationData}
                setTablePageSize={(value) =>
                    setPaginationDataFunc("pageSize", value)
                }
                fetchData={() => { }}
                sortingOptions={sortingOptions}
                setSortingOptions={setSortingOptionHandler}
                hiddenColumns={['rowSelection', [productType.EcommerceStore, productType.CorporateStore].includes(type) && 'store']}
                tablePadding={'px-4 pb-4'}
                displaySearch={false}
                expandedRows={useMemo(() => false, [])}

            />
        </div>
    );
};

export default Bundle;
