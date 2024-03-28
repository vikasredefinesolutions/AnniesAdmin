import React, { useState, useEffect, useCallback } from "react";
import { Formik, Form as FormikForm, ErrorMessage } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import { CheckboxMultiOrSingle, RecStatusValue, RecStatusValuebyName, anniesAnnualData } from "global/Enum";
import { ValidationMsgs } from "global/ValidationMessages";

import CategoryConfigDetailsService from "services/admin/productConfigDetail/ProductConfigDetailsService";
import productConfigDetailsService from "services/admin/productConfigDetail/ProductConfigDetailsService";
import productConfigServices from "services/admin/productConfigurator/ProductConfiguratorService";
import { serverError, TitleNameHelper } from "services/common/helper/Helper";

import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";

import DropDownComponent from "components/common/formComponent/Dropdown";
import FormErrorMessage from "components/common/alerts/FormErrorMessage";
import ToggleButton from "components/common/formComponent/ToggleButton";
import ConfirmDelete from "components/common/modals/ConfirmDelete";
import CreateFileHeader from "components/common/CreateFileHeader";
import Messages from "components/common/alerts/messages/Index";
import Status from "components/common/displayStatus/Status";
import Input from "components/common/formComponent/Input";
import Image from "components/common/formComponent/Image";

import AddSizeModel from "./AddSizeModel";

const Create = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { id } = useParams();

    const permission = useSelector(store => store.permission);
    const location = useSelector((store) => store?.location);

    const [data, setData] = useState({});
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [Product, setProduct] = useState([]);
    const [CategoryConfingDetailListData, setCategoryConfingDetailListData] = useState([]);
    const [openAddConfigModal, setopenAddConfigModal] = useState({ show: false, data: null });
    const [isDesabledAddProductSize, setisDesabledAddProductSize] = useState("");

    const isAddMode = !id;

    const initialValues = {
        id: data.id || 0,
        storeId: anniesAnnualData.storeId,
        fieldName: data?.fieldName || "",
        characterLimit: data?.characterLimit || 0,
        selectionType: data?.selectionType || "Single",
        isMandatory: false,
        displayOrder: data?.displayOrder || "",
        linkType: "",
        link: "",
        sename: data?.sename || "",
        isSearch: data?.isSearch || false,
        isShowOnFilter: data?.isShowOnFilter || false,
        isShowInAdmin: data?.isShowInAdmin || false,
        recStatus: data?.recStatus || RecStatusValuebyName.Active,
        rowVersion: data?.rowVersion || null,
    };

    const validationSchema = Yup.object({
        fieldName: Yup.string().trim().required(ValidationMsgs.ProductConfig.ProductConfigNameRequired),
        displayOrder: Yup.number()
            .typeError(ValidationMsgs.ProductConfig.displayOrderTypeError)
            .required(ValidationMsgs.ProductConfig.displayOrderRequired),
        recStatus: Yup.string().trim().required(ValidationMsgs.common.recStatusRequired),
    });

    const createCategoryConfigurator = (fields, resetForm) => {
        dispatch(setAddLoading(true))

        productConfigServices.createCategoryConfig({ ...fields, ...location })
            .then((response) => {
                dispatch(setAddLoading(false));

                if (response.data.success) {
                    setisDesabledAddProductSize(response.data.data.id);
                    navigate(`/admin/master/Configuration/productConfigurator/edit/${response.data.data.id}`);
                    dispatch(
                        setAlertMessage({
                            type: "success",
                            message: ValidationMsgs.ProductConfig.ProductConfigCreated,
                        })
                    );

                    resetForm({});
                } else {
                    dispatch(setAlertMessage({ type: "danger", message: serverError(response) }));
                }
            })
            .catch((errors) => {
                dispatch(
                    setAlertMessage({
                        type: "danger",
                        message: ValidationMsgs.ProductConfig.ProductConfigNotCreated,
                    })
                );
                dispatch(setAddLoading(false))
            });
    };

    const updateCategoryConfigurator = (fields) => {
        dispatch(setAddLoading(true))
        fields.id = Number(id);
        productConfigServices.updateProductConfig({ ...fields, ...location })
            .then((response) => {
                if (response?.data?.success) {
                    dispatch(
                        setAlertMessage({
                            type: "success",
                            message: ValidationMsgs.ProductConfig.ProductConfigUpdated,
                        })
                    );
                    getProductConfuratorData();
                } else {
                    dispatch(setAlertMessage({ type: "danger", message: serverError(response) }));
                }
                dispatch(setAddLoading(false));
            }).catch((errors) => {
                dispatch(
                    setAlertMessage({
                        type: "danger",
                        message: ValidationMsgs.ProductConfig.ProductConfigNotUpdated,
                    })
                );
                dispatch(setAddLoading(false))
            });
    };

    const onSubmit = (fields, { resetForm }) => {
        if (isAddMode) {
            createCategoryConfigurator(fields, resetForm);
        } else {
            updateCategoryConfigurator(fields, resetForm);
        }
    };

    const handleDelete = (productSize) => {
        var ids = [];
        dispatch(setAddLoading(true))

        if (Array.isArray(productSize)) {
            ids = productSize.map((value) => {
                return { item1: value.id, item2: value.rowVersion };
            });
        } else {
            ids = [{ item1: productSize.id, item2: productSize.rowVersion }];
        }
        productConfigDetailsService.updateMultipleStatus({
            idsRowVersion: ids,
            status: RecStatusValuebyName.Archived,
            ...location,
        })
            .then((response) => {
                if (response.data.data && response.data.success) {
                    dispatch(
                        setAlertMessage({
                            view: true,
                            type: "success",
                            message: ValidationMsgs.ProductConfig.ProductConfigDeleted,
                        })
                    );
                    setCategoryConfingDetailListDataBYId();
                } else {
                    dispatch(
                        setAlertMessage({
                            type: "danger",
                            message: serverError(response, true).replaceAll(",", ": ")
                        })
                    )
                }
                dispatch(setAddLoading(false))
            })
            .catch((errors) => {
                if (errors.response.data.Errors.Error) {
                    dispatch(
                        setAlertMessage({
                            message: errors.response.data.Errors.Error,
                            type: "danger",
                        })
                    );
                } else {
                    dispatch(
                        setAlertMessage({ message: ValidationMsgs.ProductConfig.sizeMasterNotDeleted, type: "danger" })
                    );
                }
                dispatch(setAddLoading(false))

            });
        setOpenDeleteModal(false);
    };

    const handleShowModel = (data) => {
        setopenAddConfigModal((prevState) => ({
            ...prevState,
            show: !prevState.show,
            data: data?.id,
        }));
    };

    const setCategoryConfingDetailListDataBYId = useCallback(() => {
        if (id) {
            dispatch(setAddLoading(true))
            CategoryConfigDetailsService.getCategoryByParentId(id)
                .then((res) => {
                    const response = res.data;
                    if (response.success) {
                        setCategoryConfingDetailListData(response.data);
                    }
                    dispatch(setAddLoading(false))

                })
                .catch((err) => {
                    console.log("error while fetching details", err);
                    dispatch(setAddLoading(false))

                });
            setopenAddConfigModal((prevState) => ({
                ...prevState,
                show: false,
            }));
        }
    }, [id]);

    const getProductConfuratorData = useCallback(() => {
        if (id) {
            setisDesabledAddProductSize(id);
            productConfigServices.getProductConfigByID(id)
                .then((res) => {
                    var response = res.data;
                    if (response.success) {
                        setData({ ...response.data });
                    }
                })
                .catch((err) => {
                    console.log("error while fetching Detail", err);
                });
        }
    }, [id])

    useEffect(() => {
        if (id) {
            getProductConfuratorData();
        }
    }, [id]);

    // this useEffect is for getting Product data based on id
    useEffect(() => {
        setCategoryConfingDetailListDataBYId();
    }, [id]);

    return (
        <>
            <title>
                {isAddMode ? "Add " : "Edit "} {TitleNameHelper({ defaultTitleName: "Products Configurator" })}
            </title>

            <Formik
                initialValues={initialValues}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                validateOnMount={true}
            >
                {({ setFieldValue, errors, values, validateForm }) => {
                    return (
                        <main className="responsive">
                            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full">
                                {/* Page header */}
                                <FormikForm>

                                    <CreateFileHeader module={`${isAddMode ? 'Add' : 'Edit'} ${TitleNameHelper({ defaultTitleName: "Product configurator" })}`} url="/admin/master/Configuration/productConfigurator" errors={errors} validateForm={validateForm} />
                                    {!openAddConfigModal?.show && <Messages />}

                                    <div className="grid grid-cols-12 gap-6">
                                        <div className="col-span-full xl:col-span-9">
                                            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white shadow-lg rounded-md border border-neutral-200 p-6 mb-6">
                                                <div className="w-full last:mb-0">
                                                    <label className="uppercase tracking-wide text-gray-500 text-xs font-bold mb-2 flex flex-wrap"
                                                        htmlFor="grid-first-name"
                                                    >
                                                        <span>
                                                            Field Name
                                                            <span className="text-rose-500 text-2xl leading-none">*</span>
                                                        </span>
                                                    </label>
                                                    <Input type="text" name={"fieldName"} />
                                                </div>
                                                <div className="w-full last:mb-0">
                                                    <div className="flex items-center">
                                                        <label className="uppercase tracking-wide text-gray-500 text-xs font-bold mb-2 flex flex-wrap">
                                                            <span>
                                                                Selection type
                                                                <span className="text-rose-500 text-2xl leading-none">*</span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <DropDownComponent
                                                        label="selectionType"
                                                        options={CheckboxMultiOrSingle}
                                                        isMulti={false}
                                                        isClearable={false}
                                                        // isDisabled={true}
                                                        name={"selectionType"}
                                                        className="bg-white border hover:border-neutral-300"
                                                        defaultValue={values.selectionType}
                                                        onChange={(e) => { setFieldValue("selectionType", e ? e.label : "") }}
                                                    />
                                                </div>
                                                <div className="w-full last:mb-0">
                                                    <div className="flex items-center">
                                                        <label className="uppercase tracking-wide text-gray-500 text-xs font-bold mb-2 flex flex-wrap">
                                                            <span>
                                                                Display Order
                                                                <span className="text-rose-500 text-2xl leading-none">*</span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <Input
                                                        type="text"
                                                        name="displayOrder"
                                                        maxLength={4}
                                                        onKeyPress={(event) => {
                                                            if (!/^\d*$/.test(event.key)) {
                                                                event.preventDefault();
                                                            }
                                                        }}
                                                    />
                                                </div>
                                                <div className="w-full last:mb-0">
                                                    <div className="flex items-center">
                                                        <label className="uppercase tracking-wide text-gray-500 text-xs font-bold mb-2 flex flex-wrap">
                                                            <span>
                                                                SE name
                                                                <span className="text-rose-500 text-2xl leading-none"></span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <Input
                                                        type="text"
                                                        name="sename"
                                                        disabled={true}
                                                    />
                                                </div>
                                                <div className="flex gap-8">
                                                    {/* <div className="">
                                                        <div className="flex items-center">
                                                            <label className="uppercase tracking-wide text-gray-500 text-xs font-bold mb-2 flex flex-wrap">
                                                                <span>is Mandatory
                                                                    <span className="text-rose-500 text-2xl leading-none"></span>
                                                                </span>
                                                            </label>
                                                        </div>
                                                        <ToggleButton
                                                            name="isMandatory"
                                                            id="isMandatory"
                                                            onChange={(e) => {
                                                                setFieldValue("isMandatory", e.target.checked)
                                                            }}
                                                            on="Yes"
                                                            off="No"
                                                            defaultValue={values.isMandatory}
                                                            setFieldValue={setFieldValue}
                                                        />
                                                    </div> */}

                                                    <div className="">
                                                        <div className="flex items-center">
                                                            <label className="uppercase tracking-wide text-gray-500 text-xs font-bold mb-2 flex flex-wrap">
                                                                <span>is Show On Filter
                                                                    <span className="text-rose-500 text-2xl leading-none"></span>
                                                                </span>
                                                            </label>
                                                        </div>
                                                        <ToggleButton
                                                            name="isShowOnFilter"
                                                            id="isShowOnFilter"
                                                            onChange={(e) => {
                                                                setFieldValue("isShowOnFilter", e.target.checked)
                                                            }}
                                                            on="Yes"
                                                            off="No"
                                                            defaultValue={values.isShowOnFilter}
                                                            setFieldValue={setFieldValue}
                                                        />
                                                    </div>
                                                    <div className="">
                                                        <div className="flex items-center">
                                                            <label className="uppercase tracking-wide text-gray-500 text-xs font-bold mb-2 flex flex-wrap">
                                                                <span>is Show In Admin
                                                                    <span className="text-rose-500 text-2xl leading-none"></span>
                                                                </span>
                                                            </label>
                                                        </div>
                                                        <ToggleButton
                                                            name="isShowInAdmin"
                                                            id="isShowInAdmin"
                                                            onChange={(e) => {
                                                                setFieldValue("isShowInAdmin", e.target.checked)
                                                            }}
                                                            on="Yes"
                                                            off="No"
                                                            defaultValue={values.isShowInAdmin}
                                                            setFieldValue={setFieldValue}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full bg-white shadow-lg rounded-md border border-neutral-200 mb-6">
                                                <div className="w-full mb-6 last:mb-0">
                                                    <div className="flex items-center justify-between p-6">
                                                        <div className="flex align-center justify-left">
                                                            <div>
                                                                <label className="flex flex-wrap uppercase tracking-wide text-gray-500 text-x font-bold mb-2">
                                                                    {data?.fieldName ? data?.fieldName : "Product Configurator Fields"}
                                                                    <span className="text-rose-500 text-2xl leading-none">*</span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                        {(permission?.isEdit || permission.isDelete) && <div>
                                                            <button
                                                                onClick={handleShowModel}
                                                                type="button"
                                                                title=""
                                                                data-modal-toggle="addsizeModal"
                                                                className="btn bg-indigo-500 hover:bg-indigo-600 text-white disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-gray-500"
                                                                disabled={!isDesabledAddProductSize}
                                                            >
                                                                <span className="material-icons-outlined">
                                                                    add_circle_outline
                                                                </span>
                                                                <span className="ml-1">Add</span>
                                                            </button>
                                                        </div>}
                                                    </div>
                                                    <div className="overflow-x-auto max-h-screen border-t border-neutral-200">
                                                        <table className="table-auto w-full text-sm text-[#191919] font-semibold mb-3">
                                                            <thead className="text-sm font-bold uppercase text-[#b3b3b3] border-b border-neutral-200">
                                                                <tr>
                                                                    <th className="px-2 first:pl-5 py-4">
                                                                        <div className="font-semibold text-left w-10 flex items-center">
                                                                            <span>Sr.</span>
                                                                        </div>
                                                                    </th>
                                                                    <th className="px-2 first:pl-5 py-4">
                                                                        <div className="font-semibold text-left max-w-xs flex items-center justify-center">
                                                                            <span>{data?.fieldName ? data?.fieldName : "Field Name"}</span>
                                                                        </div>
                                                                    </th>
                                                                    <th className="px-2 first:pl-5 py-3">
                                                                        <div className="font-semibold text-left max-w-xs flex items-center">
                                                                            <span>Display Order</span>
                                                                        </div>
                                                                    </th>
                                                                    <th className="px-2 first:pl-5 py-3">
                                                                        <div className="font-semibold text-left max-w-xs flex items-center">
                                                                            <span> Default Value</span>
                                                                        </div>
                                                                    </th>
                                                                    <th className="px-2 first:pl-5 py-4">
                                                                        <span>Status</span>
                                                                    </th>
                                                                    {(permission.isEdit || permission.isDelete) &&
                                                                        <th className="px-2 first:pl-5 py-4">
                                                                            <span>Action</span>
                                                                        </th>}
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {CategoryConfingDetailListData.length > 0 ? CategoryConfingDetailListData.map((data, index) => {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td className="px-2 first:pl-5 py-3">
                                                                                <div>{index + 1}</div>
                                                                            </td>
                                                                            <td className="px-2 first:pl-5 py-3">
                                                                                <div className="flex">
                                                                                    <div>
                                                                                        <div className="h-16 w-16 mr-8 flex items-center justify-center overflow-hidden  rounded-full border bg-white">
                                                                                            {data?.iconCode ?
                                                                                                <span className="h-24 w-40 p-2 border border-neutral-200 flex justify-center items-center bg-gray-500" dangerouslySetInnerHTML={{ __html: data?.iconCode }}></span> :
                                                                                                <Image
                                                                                                    src={data?.imagePath}
                                                                                                    containerHeight={""}
                                                                                                    className="max-h-full"
                                                                                                />
                                                                                            }
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="flex items-center justify-center">{data?.fieldValue}</div>
                                                                                </div>
                                                                            </td>
                                                                            <td className="px-2 first:pl-5 py-3">
                                                                                <div>
                                                                                    {data?.displayOrderFieldValue}
                                                                                </div>
                                                                            </td>
                                                                            <td className="px-2 first:pl-5 py-3">
                                                                                <div>
                                                                                    {data?.isDefault ? "Yes" : "No"}
                                                                                </div>
                                                                            </td>
                                                                            <td className="px-2 first:pl-5 py-3">
                                                                                <div>
                                                                                    <Status type={data?.recStatus} />
                                                                                </div>
                                                                            </td>
                                                                            <td className="px-2 first:pl-5 py-3 ">
                                                                                {(permission?.isEdit || permission?.isDelete) && <div className="flex text-center">
                                                                                    <button
                                                                                        className="text-indigo-500 material-icons-outlined "
                                                                                        data-modal-toggle="editsizeModal"
                                                                                        type="button"
                                                                                        onClick={() => {
                                                                                            handleShowModel(data);
                                                                                        }}
                                                                                    >
                                                                                        <span className="material-icons-outlined">
                                                                                            edit
                                                                                        </span>
                                                                                    </button>
                                                                                    {permission.isDelete && <button
                                                                                        type="button"
                                                                                        className="text-rose-500 text-2xl font-semibold material-icons-outlined"
                                                                                        onClick={() => {
                                                                                            setProduct(data);
                                                                                            setOpenDeleteModal(true);
                                                                                        }}
                                                                                    >
                                                                                        <span className="material-icons-outlined">
                                                                                            close
                                                                                        </span>
                                                                                    </button>}
                                                                                </div>}
                                                                            </td>
                                                                        </tr>
                                                                    );
                                                                }) :
                                                                    <tr className="text-rose-500 text-center">
                                                                        <td colSpan={6} className={`text-center`}>
                                                                            <span className="text-rose-500 text-2xl mr-2"></span>
                                                                            No Data yet , please add some !
                                                                        </td>
                                                                    </tr>
                                                                }
                                                            </tbody>
                                                        </table>
                                                        <ErrorMessage
                                                            name={"catalogChanges"}
                                                            component={FormErrorMessage}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col col-span-full xl:col-span-3">
                                            <div className="w-full bg-white shadow-xxl rounded-md">
                                                <div className="border-b-2 border-neutral-200 p-6">
                                                    <div className="block uppercase tracking-wide text-gray-500 text-base font-bold mb-2">
                                                        Category Status
                                                    </div>
                                                    <DropDownComponent
                                                        label="category Status"
                                                        options={RecStatusValue}
                                                        isMulti={false}
                                                        isClearable={false}
                                                        name={"recStatus"}
                                                        className="bg-white border hover:border-neutral-300"
                                                        defaultValue={values.recStatus}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </FormikForm>
                            </div>
                        </main>
                    );
                }}
            </Formik >

            <ConfirmDelete
                handleDelete={handleDelete}
                data={Product}
                message="Deleting these Data will permanently remove this record from your account. This can't be undone"
                title={"Delete"}
                openDeleteModal={openDeleteModal}
                setOpenDeleteModal={setOpenDeleteModal}
            />

            {openAddConfigModal.show && (
                <AddSizeModel
                    handleShowModel={handleShowModel}
                    sizeId={openAddConfigModal?.data}
                    sizeMasterID={isDesabledAddProductSize}
                    setCategoryConfingDetailListDataBYId={setCategoryConfingDetailListDataBYId}
                />
            )}
        </>
    );
};

export default Create;
