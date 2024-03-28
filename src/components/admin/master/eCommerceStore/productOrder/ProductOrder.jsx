/*Component Name: ProductOrder
Component Functional Details: User can create or update ProductOrder master details from here.
Created By: Happy
Created Date: 17/11/02022
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Formik, Form as FormikForm } from "formik";
import Dropdown from "components/common/formComponent/Dropdown";
import CategoryMasterService from "services/admin/master/store/categoryMaster/CategoryMasterService";
import { useCallback } from "react";
import ProductOrderService from "services/admin/master/store/productOrder/ProductOrderService";
import { ValidationMsgs } from "global/ValidationMessages";
import { serverError, TitleNameHelper } from "services/common/helper/Helper";
import { useDispatch, useSelector } from "react-redux";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { RecStatusValuebyName } from "global/Enum";
import Messages from "components/common/alerts/messages/Index";

import { ListManager } from "react-beautiful-dnd-grid";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import InputNumber from "components/common/formComponent/InputNumber";
import ToolTipComponent from "components/common/ToolTips";
import { ToolTipsMessages } from "global/ToolTipsMessages";
import Import from "./Import"

const ProductOrder = ({ showBrandDD }) => {
    const [Data, setData] = useState([]);
    const [CategoryList, setCategoryList] = useState([]);
    const [SelectedBrand, setSelectedBrand] = useState(0);
    const [SelectedCategory, setSelectedCategory] = useState(0);
    const [openImportModal, setOpenImportModal] = useState(false);
    const { storeID } = useParams();
    const location = useSelector((store) => store?.location);
    const dispatch = useDispatch();
    const AdminAppConfigReducers = useSelector((store) => store?.AdminAppConfigReducers);

    let Services = !showBrandDD ? CategoryMasterService.getCategoryByOptionsForStoreBuilder : CategoryMasterService.getCategoryForProductOrder

    const getAllCategory = () => {
        if (Services && typeof Services === "function") {
            dispatch(setAddLoading(true))
            Services(-1, storeID).then((response) => {
                setCategoryList(() => {
                    return response.data.data;
                });
                dispatch(setAddLoading(false))
            }).catch(() => {
                dispatch(setAddLoading(false))
            })
        }
    };

    const handleShowModal = () => {
        setOpenImportModal((prev) => !prev);
    };

    useEffect(() => {
        getCategoryDropdownData();
    }, []);

    const getCategoryDropdownData = useCallback((e) => {
        dispatch(setAddLoading(true))
        if (e && e?.value !== undefined) {
            CategoryMasterService.getCategoryByBrandDropdownOptions(
                e.value,
                storeID
            ).then((response) => {
                if (response.data.data.length > 0) {
                    setCategoryList(() => {
                        return response.data.data;
                    });
                }
                else {
                    setCategoryList([])
                    setSelectedCategory(0);
                }

                dispatch(setAddLoading(false))
            }).catch(() => {
                dispatch(setAddLoading(false))
            })
        } else {
            getAllCategory();
            dispatch(setAddLoading(false));
        }
    }, []);

    const getProductOrderList = useCallback(() => {
        dispatch(setAddLoading(true))

        ProductOrderService.getProductOrderList({
            productDisplayOrderModel: {
                storeID: storeID,
                categoryId: SelectedCategory || 0,
                brandId: 0,
            },
        })
            .then((response) => {
                if (response.data.success) {
                    setData(response?.data?.data);
                    // dispatch(
                    //     setAlertMessage({
                    //         view: true,
                    //         type: "success",
                    //         message: ValidationMsgs.store.productOrder.productFound,
                    //     })
                    // );
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
    }, [SelectedCategory]);

    useEffect(() => {
        if (SelectedCategory > 0) {
            getProductOrderList();
        }
    }, [SelectedCategory]);

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
                <div className="w-full p-3 bg-white">
                    <div className="border border-gray-300 p-3 mt-3 text-center h-full">
                        <div className="flex items-center justify-center" >
                            {item.image ? (
                                <img
                                    src={`${AdminAppConfigReducers["azure:BlobUrl"]}${item.image}`}
                                    title=""
                                    alt=""
                                    style={{
                                        maxWidth: "300px",
                                        maxHeight: "410px",
                                        // minWidth: "300px"
                                    }}
                                />
                            ) : (
                                <div className="bg-sky-400/10 ">
                                    <img src={`/noImage.png`} alt={"not available"} style={{ maxWidth: "300px", minHeight: "410px" }} />
                                </div>
                                // <Image
                                //     src={defaultImage}
                                //     className="min-h-[410px] min-w-[300px]"
                                // />
                            )}
                        </div>
                        <div className="mt-5 h-[80px] max-w-xs mx-auto">{item.productName}</div>
                        <div className="mt-2 text-sm">
                            Price : <span >${item.salePrice}</span>
                        </div>
                        {/* <div className="mt-2 text-sm">
                            Our sku : <span >{item.ourSku}</span>
                        </div> */}
                        <div className="flex items-center justify-center mt-2 text-sm">
                            Display Order :{" "}
                            <InputNumber
                                className="w-20"
                                name={`displayOrder${item.productId}`}
                                defaultValue={item?.displayOrder}
                                onBlur={(e) => {
                                    if (e) {
                                        reorderList(item?.displayOrder - 1, e.target.value - 1);
                                    }
                                }}
                                onKeyPress={(event) => {
                                    if (!/^\d*\.?\d*$/.test(event.key) || (event.target.value <= 0 ? event.key === "0" : false) || event.key === ".") {
                                        event.preventDefault();
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            )
        );
    };

    function reorderList(sourceIndex, destinationIndex) {
        dispatch(setAddLoading(true))

        if (destinationIndex === undefined || destinationIndex === sourceIndex || destinationIndex < 0) {
            dispatch(setAddLoading(false))
            return;
        }

        const items = reorder(Data?.subRow, sourceIndex, destinationIndex);

        ProductOrderService.getProductOrderUpdate({
            productDisplayModel: {
                storeID: storeID,
                categoryId: SelectedCategory || 0,
                brandId: SelectedBrand || 0,
                ...location,
                recStatus: RecStatusValuebyName.Active,
                subRow: items.filter((obj) => obj["productId"] > 0),
            },
        }).then((response) => {
            if (response.data.success) {
                dispatch(
                    setAlertMessage({
                        view: true,
                        type: "success",
                        message: ValidationMsgs.store.productOrder.orderChanged,
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

    // const exportFile = () => {
    //     if (storeID && SelectedCategory !== 0) {
    //         dispatch(setAddLoading(true));
    //         ProductOrderService.productOrderExportList({
    //             productDisplayOrderModel: {
    //                 storeId: storeID,
    //                 categoryId: SelectedCategory,
    //                 brandId: 0,
    //             },
    //         })
    //             .then((response) => {
    //                 if (response.data.success && response.data.data) {
    //                     window.location.href = response.data.data;
    //                     dispatch(
    //                         setAlertMessage({
    //                             type: "success",
    //                             message: ValidationMsgs.product.export.exportSuccess,
    //                         })
    //                     );
    //                 } else {
    //                     dispatch(
    //                         setAlertMessage({
    //                             type: "danger",
    //                             message: ValidationMsgs.product.export.exportFailed,
    //                         })
    //                     );
    //                 }
    //                 dispatch(setAddLoading(false));
    //             })
    //             .catch((errors) => {
    //                 dispatch(setAddLoading(false));
    //             });
    //     } else {
    //         dispatch(
    //             setAlertMessage({
    //                 type: "danger",
    //                 message: ValidationMsgs.common.categoryIdRequired,
    //             })
    //         );
    //     }
    // };

    return (
        <>
            <title>{TitleNameHelper({ defaultTitleName: "Product Order" })}</title>
            <div className="w-full mx-auto">
                <div className="sm:flex sm:justify-between sm:items-center mb-8">
                    <div className="col-span-full w-full flex justify-between items-center">
                        <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
                            {TitleNameHelper({ defaultTitleName: "Product Order" })}
                        </h1>
                    </div>
                </div>

                {!openImportModal && <Messages />}

                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        brandId: -1,
                        storeID: storeID,
                        categoryId: -1,
                    }}
                >
                    {({ errors, touched, setFieldValue, values }) => {
                        return (
                            <FormikForm>
                                <div className="bg-white shadow-xxl rounded-md mb-8">
                                    <div className="p-6 flex-wrap">
                                        <div className="flex flex-wrap items-center gap-2 justify-between">
                                            <div className="flex items-center">
                                                Total Products : <span> {Data && Data?.totalProducts || " 0"}</span> {Data && Data?.totalProducts && <ToolTipComponent
                                                    id="productSequence"
                                                    message={`${ToolTipsMessages.productSequence.validSequence} ${(Data && Data?.totalProducts) ? Data?.totalProducts : 0}`}
                                                />}
                                            </div>
                                            <div className="flex flex-wrap items-center gap-2 justify-between">
                                                {/* <button type="button" className="text-indigo-500 pr-3" onClick={() => exportFile()}>Export</button> */}
                                                {/* <button type="button" className="text-indigo-500 pr-3" onClick={() => handleShowModal()}>Import</button> */}
                                                {/* {
                                                    showBrandDD && <div className="flex gap-2 items-center">
                                                        <div >Select Brand :</div>
                                                        <Dropdown
                                                            name={`brandId`}
                                                            options={BrandList}
                                                            defaultValue={values.brandId}
                                                            className="focus:ring-neutral-300 focus:shadow-lg py-1 w-64"
                                                            onChange={(e) => {
                                                                if (e) {
                                                                    setFieldValue(`brandId`, e.value);
                                                                    setFieldValue(`categoryId`, "");
                                                                    setSelectedBrand(e.value);
                                                                    setSelectedCategory(0)
                                                                } else {
                                                                    setFieldValue(`brandId`, 0);
                                                                    setSelectedBrand(0);
                                                                    setData([])
                                                                }
                                                                // getCategoryDropdownData(e);
                                                            }}
                                                        />
                                                    </div>
                                                } */}

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
                                                                setFieldValue(`brandId`, "");
                                                                setSelectedCategory(data.value);
                                                                setSelectedBrand(0)
                                                            } else {
                                                                setFieldValue(`categoryId`, 0);
                                                                setSelectedCategory(0);
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {
                                    ((SelectedBrand > 0 || SelectedCategory > 0) && Data?.subRow?.length > 0) ?
                                        <div className="bg-white shadow-xxl rounded-md mb-8">
                                            <div className="p-6 " id={`__react-beautyful-dnd-wrap`}>
                                                {Data?.subRow && (
                                                    <ListManager
                                                        items={Data?.subRow}
                                                        direction="horizontal"
                                                        maxItems={6}
                                                        render={(item) => {
                                                            return item ? <ListElement item={item} /> : "";
                                                        }}
                                                        onDragEnd={reorderList}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        : ((SelectedBrand === 0 && SelectedCategory === 0)) ?
                                            <p className="flex justify-center items-center p-5 rounded-t border-b sticky top-0 left-0 text-red-600 bg-white">First, You have to select brand.</p>
                                            :
                                            <p className="flex justify-center items-center p-5 rounded-t border-b sticky top-0 left-0 text-red-600 bg-white">No data found.</p>
                                }

                            </FormikForm>
                        );
                    }}
                </Formik>
            </div>
            {openImportModal && (
                <Import handleShowModal={handleShowModal} SelectedCategory={SelectedCategory} storeID={storeID} openImportModal={openImportModal} />
            )}
        </>
    );
};

export default ProductOrder;
