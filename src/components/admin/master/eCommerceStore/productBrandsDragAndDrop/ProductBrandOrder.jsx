/*Component Name: ProductOrder
Component Functional Details: User can create or update ProductOrder master details from here.
Created By: Happy
Created Date: 17/11/02022
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import { NavLink, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Formik, Form as FormikForm } from "formik";
import { useCallback } from "react";
import { ValidationMsgs } from "global/ValidationMessages";
import { serverError, TitleNameHelper } from "services/common/helper/Helper";
import { useDispatch, useSelector } from "react-redux";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { RecStatusValuebyName } from "global/Enum";

import { ListManager } from "react-beautiful-dnd-grid";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import InputNumber from "components/common/formComponent/InputNumber";
import BrandService from "services/admin/master/store/brand/BrandService";

const ProductBrandOrder = () => {
    const [Data, setData] = useState([]);
    const { storeId, storeName, storeType } = useParams();
    const location = useSelector((store) => store?.location);
    const dispatch = useDispatch();
    const GlobalLoading = useSelector((store) => store?.GlobalLoaderReducer?.toLoad);
    const AdminAppConfigReducers = useSelector((store) => store?.AdminAppConfigReducers);

    const getProductOrderList = useCallback(() => {
        dispatch(setAddLoading(true))

        BrandService.getDragAndDropBrandsList({
            storeid: storeId
        }).then((response) => {
            if (response.data.success) {
                setData(response?.data?.data?.subRow);
                dispatch(setAddLoading(false))
            } else {
                setData([]);
                dispatch(setAddLoading(false))
            }
            dispatch(setAddLoading(false))
        })
            .catch((error) => {
                dispatch(setAddLoading(false))
            });
    }, []);

    useEffect(() => {
        getProductOrderList();
    }, []);

    const reorder = (list, startIndex, endIndex) => {
        let temp = [];
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        result.map((item, i) => {
            temp = [...temp, { ...item, displayOrder: i + 1 }];
        });

        return temp;
    };

    const ListElement = ({ item }) => {
        return (
            item && (
                <div className="w-full p-3">
                    <div className="border border-gray-300 p-3 mt-3 text-center h-full">
                        <div >
                            {item.blackAndWhiteLogo ? (
                                <div className="h-96 w-96 p-2 border-spacing-1 border-dashed border-2 border-neutral-200 rounded-lg flex justify-center items-center">
                                    <div className="flex justify-center items-center col-span-full lg:col-span-6 rounded-md font-normal max-h-96">
                                        <img
                                            className="max-h-80"
                                            src={`${AdminAppConfigReducers["azure:BlobUrl"]}${item.blackAndWhiteLogo}`}
                                            name="Brand logo"
                                            alt="not available"
                                        />
                                    </div>
                                </div>
                                // <img
                                //     src={`${AdminAppConfigReducers["azure:BlobUrl"]}${item.image}`}
                                //     title=""
                                //     alt=""
                                //     style={{
                                //         height: "450px",
                                //         width: "450px",
                                //     }}
                                // />
                            ) : (
                                <div className="h-96 w-96 p-2 border-spacing-1 border-dashed border-2 border-neutral-200 rounded-lg flex justify-center items-center bg-sky-400/10">
                                    <div className="flex justify-center items-center col-span-full lg:col-span-6 rounded-md font-normal max-h-96">
                                        <img
                                            className="max-h-96"
                                            src="/noImage.png"
                                            name="Brand logo"
                                            alt="not available"
                                        />
                                    </div>
                                </div>
                                // <Image
                                //     src={defaultImage}
                                //     // className="min-h-[450px] min-w-[450px]"
                                //     className="min-h-full min-w-full"
                                // />
                            )}
                        </div>
                        <div className="mt-5">{item.name}</div>
                        <div className="mt-2 text-sm">
                            <NavLink
                                to={`/admin/stores/${storeType}/${storeName}/${storeId}/brandingOrder/edit/${item.id}`}
                            >
                                <span>Products : {item.name}</span>
                            </NavLink>
                        </div>
                        <div className="flex items-center justify-center mt-2 text-sm">
                            Display Order :{" "}
                            <InputNumber
                                className="w-20"
                                name={`displayOrder${item.id}`}
                                defaultValue={item?.displayOrder}
                                onBlur={(e) => {
                                    reorderList(item?.displayOrder - 1, e.target.value - 1);
                                }}
                            />
                        </div>
                    </div>
                </div >
            )
        );
    };

    function reorderList(sourceIndex, destinationIndex) {
        dispatch(setAddLoading(true))

        if (destinationIndex === undefined || destinationIndex === sourceIndex) {
            dispatch(setAddLoading(false))
            return;
        }

        const items = reorder(Data, sourceIndex, destinationIndex);

        const DataForAPI = items.length > 0 && items.map((APIdata, index) => {
            return (
                { ...APIdata, brandId: APIdata.id }
            )
        })

        BrandService.getProductBrandOrderUpdate({
            storeBrandDisplayOrderModel: {
                storeId: storeId,
                ...location,
                recStatus: RecStatusValuebyName.Active,
                subRow: DataForAPI,
            },
        })
            .then((response) => {
                if (response.data.success) {
                    dispatch(
                        setAlertMessage({
                            view: true,
                            type: "success",
                            message: ValidationMsgs.store.brandOrder.orderChanged,
                        })
                    );
                } else {
                    dispatch(
                        setAlertMessage({ type: "danger", message: serverError(response) })
                    );
                }
                getProductOrderList();
                dispatch(setAddLoading(false))
            })
            .catch((error) => {
                dispatch(setAddLoading(false))
            });

        setData((prev) => {
            return {
                ...prev,
                subRow: items,
            };
        });
    }

    return (
        <>
            <title>{TitleNameHelper({ defaultTitleName: "Product Order" })}</title>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full mx-auto">
                <div className="sm:flex sm:justify-between sm:items-center mb-8">
                    <div className="col-span-full w-full flex justify-between items-center">
                        <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
                            {TitleNameHelper({ defaultTitleName: "Product Order" })}
                        </h1>
                    </div>
                </div>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        storeID: storeId,
                    }}
                >
                    {({ errors, touched, setFieldValue, values }) => {
                        return (
                            <FormikForm>
                                <div className="bg-white shadow-xxl rounded-md mb-8">
                                    <div className="p-6 flex-wrap">
                                        <div className="flex flex-wrap items-center gap-2 justify-between">
                                            <div >
                                                Total Brand -
                                                <span >{Data && Data?.length || 0}</span>
                                            </div>
                                            {/* <div className="flex flex-wrap items-center gap-2 justify-between">
                                                <div className="flex gap-2 items-center">
                                                    <div >Select Brand :</div>
                                                    <Dropdown
                                                        name={`brandId`}
                                                        options={BrandList}
                                                        defaultValue={values.brandId}
                                                        className="focus:ring-neutral-300 focus:shadow-lg py-1 w-64"
                                                        onChange={(e) => {
                                                            if (e) {
                                                                setFieldValue(`brandId`, e.value);
                                                                setSelectedBrand(e.value);
                                                            } else {
                                                                setFieldValue(`brandId`, 0);
                                                                setSelectedBrand(0);
                                                                setData([])
                                                            }
                                                            getCategoryDropdownData(e);
                                                        }}
                                                    />
                                                </div>
                                                <div className="flex gap-2 items-center">
                                                    <div >Select Category :</div>
                                                    <Dropdown
                                                        name={`categoryId`}
                                                        options={CategoryList}
                                                        defaultValue={values.categoryId}
                                                        className="focus:ring-neutral-300 focus:shadow-lg py-1 w-64"
                                                        onChange={(data) => {
                                                            if (data) {
                                                                setFieldValue(`categoryId`, data.value);
                                                                setSelectedCategory(data.value);
                                                            } else {
                                                                setFieldValue(`categoryId`, 0);
                                                                setSelectedCategory(0);
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                                {Data?.length > 0 ?
                                    <div className="bg-white shadow-xxl rounded-md mb-8">
                                        <div className="p-6">
                                            {Data && (
                                                <ListManager
                                                    items={Data}
                                                    direction="horizontal"
                                                    maxItems={5}
                                                    render={(item) => {
                                                        return item ? <ListElement item={item} /> : "";
                                                    }}
                                                    onDragEnd={reorderList}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    :
                                    <p className="flex justify-center items-center p-5 rounded-t border-b sticky top-0 left-0 text-red-600 bg-white">No data found.</p>
                                }

                            </FormikForm>
                        );
                    }}
                </Formik>
            </div>
        </>
    );
};

export default ProductBrandOrder;
