import React, { useState, useEffect, useCallback } from "react";
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";
import DropDownComponent from "components/common/formComponent/Dropdown";
import { useNavigate, useParams } from "react-router-dom";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import Input from "components/common/formComponent/Input";
import categoryConfiguratorservices from "../../../../../../services/admin/categoryConfigurator/CategoryConfiguratorService";
import Messages from "components/common/alerts/messages/Index";
import { ErrorMessage } from "formik";
import FormErrorMessage from "components/common/alerts/FormErrorMessage";
import AddCategoryConfigModel from "./AddCategoryConfigModel";
import ConfirmDelete from "components/common/modals/ConfirmDelete";
import { RecStatusValue, RecStatusValuebyName, anniesAnnualData } from "global/Enum";
import { ValidationMsgs } from "global/ValidationMessages";
import { useDispatch, useSelector } from "react-redux";
import Status from "components/common/displayStatus/Status";
import { serverError, TitleNameHelper } from "services/common/helper/Helper";
import CreateFileHeader from "components/common/CreateFileHeader";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import CategoryConfigDetailsService from "services/admin/categoryConfigDetail/CategoryConfigDetailsService";
import ToggleButton from "components/common/formComponent/ToggleButton";
import DropdownService from 'services/common/dropdown/DropdownService';

const Create = () => {
    const permission = useSelector(store => store.permission);
    let navigate = useNavigate();
    const { id } = useParams();
    const isAddMode = !id;
    const dispatch = useDispatch();
    const location = useSelector((store) => store?.location);
    const [data, setData] = useState({});
    const [cantrolTypeData, setCantrolTypeData] = useState([])
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [Product, setProduct] = useState([]);
    const [CategoryConfingDetailListData, setCategoryConfingDetailListData] = useState([]);
    const [openAddSizeModal, setopenAddSizeModal] = useState({
        show: false,
        data: null,
    });
    const [isDesabledAddProductSize, setisDesabledAddProductSize] = useState("");
    const [refresh, setrefresh] = useState("");

    const initialValues = {
        id: data.id || 0,
        storeId: anniesAnnualData.storeId,
        categoryCustomFieldName: data?.categoryCustomFieldName || "",
        characterLimit: data?.characterLimit || 0,
        categoryCustomFieldType: data?.categoryCustomFieldType || "",
        isMandatory: data?.isMandatory || false,
        displayOrder: data?.displayOrder || "",
        recStatus: data?.recStatus || RecStatusValuebyName.Active,
        rowVersion: data?.rowVersion || null,
    };

    const validationSchema = Yup.object({
        categoryCustomFieldName: Yup.string().trim().required(ValidationMsgs.CategoryConfig.CategoryConfigNameRequired),
        categoryCustomFieldType: Yup.string().required(ValidationMsgs.CategoryConfig.CategoryConfigDropdownrequired),
        displayOrder: Yup.number()
            .typeError(ValidationMsgs.CategoryConfig.displayOrderTypeError)
            .required(ValidationMsgs.CategoryConfig.displayOrderRequired),
        recStatus: Yup.string().trim().required(ValidationMsgs.common.recStatusRequired),
    });

    const createCategoryConfigurator = (fields, resetForm) => {
        dispatch(setAddLoading(true))

        categoryConfiguratorservices.createCategoryConfig({
            ...fields,
            characterLimit: fields.characterLimit === "" ? 0 : fields.characterLimit,
            ...location
        }).then((response) => {
            dispatch(setAddLoading(false));

            if (response.data.success) {
                setisDesabledAddProductSize(response.data.data.id);
                navigate(`/admin/master/Configuration/categoryConfigurator/edit/${response.data.data.id}`);
                dispatch(
                    setAlertMessage({ type: "success", message: ValidationMsgs.CategoryConfig.CategoryConfigCreated, })
                );
                resetForm({});
            } else {
                dispatch(setAlertMessage({ type: "danger", message: serverError(response) }));
            }
        }).catch((errors) => {
            dispatch(
                setAlertMessage({ type: "danger", message: ValidationMsgs.CategoryConfig.CategoryConfigNotCreated, })
            );
            dispatch(setAddLoading(false))
        });
    };

    const updateCategoryConfigurator = (fields) => {
        dispatch(setAddLoading(true))
        fields.id = Number(id);
        categoryConfiguratorservices.updateCategoryConfig({
            ...fields,
            characterLimit: fields.characterLimit === "" ? 0 : fields.characterLimit,
            ...location
        }).then((response) => {
            if (response?.data?.success) {
                dispatch(
                    setAlertMessage({ type: "success", message: ValidationMsgs.CategoryConfig.CategoryConfigUpdated, })
                );
                getCategoryConfigurationDataById();
            } else {
                dispatch(setAlertMessage({ type: "danger", message: serverError(response) }));
            }
            dispatch(setAddLoading(false));
        }).catch((errors) => {
            dispatch(
                setAlertMessage({ type: "danger", message: ValidationMsgs.CategoryConfig.CategoryConfigNotUpdated, })
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

        let API = ids.length > 1 ? categoryConfiguratorservices : CategoryConfigDetailsService
        API.updateMultipleStatus({
            idsRowVersion: ids,
            status: RecStatusValuebyName.Archived,
            ...location,
        }).then((response) => {
            if (response.data.data) {
                dispatch(
                    setAlertMessage({
                        view: true,
                        type: "success",
                        message: ValidationMsgs.CategoryConfig.CategoryConfigDeleted,
                    })
                );
                setCategoryConfingDetailListDataBYId();
            } else {
                dispatch(
                    setAlertMessage({
                        view: true,
                        type: "danger",
                        message: ValidationMsgs.CategoryConfig.CategoryConfigNotDeleted,
                    })
                );
            }
            dispatch(setAddLoading(false))
        }).catch((errors) => {
            if (errors.response.data.Errors.Error) {
                dispatch(
                    setAlertMessage({
                        message: errors.response.data.Errors.Error,
                        type: "danger",
                    })
                );
            } else {
                dispatch(
                    setAlertMessage({ message: ValidationMsgs.CategoryConfig.CategoryConfigNotDeleted, type: "danger" })
                );
            }
            dispatch(setAddLoading(false))

        });
        setOpenDeleteModal(false);
    };

    const handleShowModel = (data) => {
        setopenAddSizeModal((prevState) => ({
            ...prevState,
            show: !prevState.show,
            data: data?.id,
        }));
    };

    const getCategoryConfigurationDataById = useCallback(() => {
        categoryConfiguratorservices.getCategoryConfigByID(id)
            .then((res) => {
                var response = res.data;
                if (response.success) {
                    setData({ ...response.data });
                }
            }).catch((err) => {
                console.log("error while fetching Detail", err);
            });
    }, [id]);

    useEffect(() => {
        if (id) {
            setisDesabledAddProductSize(id);
            getCategoryConfigurationDataById();
        }
    }, [id]);

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
                    console.log("error while fetching Details", err);
                    dispatch(setAddLoading(false))
                });
            setopenAddSizeModal((prevState) => ({
                ...prevState,
                show: false,
            }));
        }
    }, [id]);

    useEffect(() => {
        setCategoryConfingDetailListDataBYId();
    }, [id]);

    useEffect(() => {
        DropdownService.getDropdownValues("controltype").then((response) => {
            let ContoltypeData = response.data.data.length > 0 && response.data.data.map((data) => {
                return {
                    label: data.label,
                    value: data.label
                }
            })
            setCantrolTypeData(ContoltypeData);
        });
    }, []);

    return (
        <>
            <title>
                {isAddMode ? "Add " : "Edit "} {TitleNameHelper({ defaultTitleName: "Category Configurator" })}
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
                                    <CreateFileHeader module={`${isAddMode ? 'Add' : 'Edit'} ${TitleNameHelper({ defaultTitleName: "Category Configurator" })}`} url="/admin/master/Configuration/categoryConfigurator" errors={errors} validateForm={validateForm} />
                                    {!openAddSizeModal?.show && <Messages />}

                                    <div className="grid grid-cols-12 gap-6">
                                        <div className="col-span-full xl:col-span-9">
                                            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white shadow-lg rounded-md border border-neutral-200 p-6 mb-6">
                                                <div className="w-full last:mb-0">
                                                    <label
                                                        className="uppercase tracking-wide text-gray-500 text-xs font-bold mb-2 flex flex-wrap"
                                                        htmlFor="grid-first-name"
                                                    >
                                                        <span>
                                                            Category Name
                                                            <span className="text-rose-500 text-2xl leading-none">
                                                                *
                                                            </span>
                                                        </span>
                                                    </label>
                                                    <Input type="text" name={"categoryCustomFieldName"} />
                                                </div>
                                                <div className="w-full last:mb-0">
                                                    <div className="flex items-center">
                                                        <label className="uppercase tracking-wide text-gray-500 text-xs font-bold mb-2 flex flex-wrap">
                                                            <span>
                                                                Control type
                                                                <span className="text-rose-500 text-2xl leading-none">
                                                                    *
                                                                </span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <DropDownComponent
                                                        label="categoryCustomFieldType"
                                                        options={cantrolTypeData}
                                                        isMulti={false}
                                                        isClearable={false}
                                                        name={"categoryCustomFieldType"}
                                                        className="bg-white border hover:border-neutral-300"
                                                        defaultValue={values.categoryCustomFieldType}
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
                                                        maxLength={5}
                                                        onKeyPress={(event) => {
                                                            if (!/^\d*$/.test(event.key)) {
                                                                event.preventDefault();
                                                            }
                                                        }}
                                                    />
                                                </div>
                                                {(values?.categoryCustomFieldType.toLowerCase() === "textbox") &&
                                                    <div className="w-full last:mb-0">
                                                        <div className="flex items-center">
                                                            <label className="uppercase tracking-wide text-gray-500 text-xs font-bold mb-2 flex flex-wrap">
                                                                <span>characterLimit</span>
                                                            </label>
                                                        </div>
                                                        <Input
                                                            type="text"
                                                            name="characterLimit"
                                                            maxLength={4}
                                                            onKeyPress={(event) => {
                                                                if (!/^\d*$/.test(event.key)) {
                                                                    event.preventDefault();
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                }
                                                <div className="w-full last:mb-0">
                                                    <div className="flex items-center">
                                                        <label className="uppercase tracking-wide text-gray-500 text-xs font-bold mb-2 flex flex-wrap">
                                                            <span>
                                                                is Mandatory ?

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
                                                </div>
                                            </div>
                                            {((values?.categoryCustomFieldType.toLowerCase() === "dropdown" || values?.categoryCustomFieldType.toLowerCase() === "multidropdown" || values?.categoryCustomFieldType.toLowerCase() === "checkbox" || values?.categoryCustomFieldType.toLowerCase() === "radio") && !isAddMode) &&
                                                <div className="w-full bg-white shadow-lg rounded-md border border-neutral-200 mb-6">
                                                    <div className="w-full mb-6 last:mb-0">
                                                        <div className="flex items-center justify-between p-6">
                                                            <div className="flex align-center justify-left">
                                                                <div>
                                                                    <label className="flex flex-wrap uppercase tracking-wide text-gray-500 text-x font-bold mb-2">
                                                                        Category
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
                                                                            <div className="font-semibold text-left w-10 flex items-center justify-center">
                                                                                <span>Sr.</span>
                                                                            </div>
                                                                        </th>
                                                                        <th className="px-2 first:pl-5 py-4">
                                                                            <div className="font-semibold text-left max-w-xs flex items-center">
                                                                                <span>Category Name</span>
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
                                                                        const color = data?.categoryCustomFieldsValue && `${data?.categoryCustomFieldsValue.slice(7, data?.categoryCustomFieldsValue.length - 1)}`;
                                                                        return (
                                                                            <tr key={index}>
                                                                                <td className="px-2 first:pl-5 py-3">
                                                                                    <div>{index + 1}</div>
                                                                                </td>
                                                                                <td className="px-2 first:pl-5 py-3">
                                                                                    {data?.categoryCustomFieldsValue && data?.categoryCustomFieldsValue.includes("color") ? 
                                                                                    <>  
                                                                                        <div className="flex gap-6 items-center">
                                                                                            <span>{data?.categoryCustomFieldsValue}</span>
                                                                                            <div className="inline-flex items-center justify-center rounded-full border-click w-8 h-8 border-2"
                                                                                                style={{ background: color }}/>
                                                                                        </div>
                                                                                    </>
                                                                                    : data.categoryCustomFieldsValue}
                                                                                </td>
                                                                                <td className="px-2 first:pl-5 py-3">
                                                                                    <div>
                                                                                        {data.displayOrderCategoryCustomFieldsValue}
                                                                                    </div>
                                                                                </td>
                                                                                <td className="px-2 first:pl-5 py-3">
                                                                                    <div>
                                                                                        {data.isDefault ? "Yes" : "No"}
                                                                                    </div>
                                                                                </td>
                                                                                <td className="px-2 first:pl-5 py-3">
                                                                                    <div>
                                                                                        <Status type={data.recStatus} />
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
                                            }
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
                message="Deleting these data will permanently remove this record from your account. This can't be undone"
                title={"Delete"}
                openDeleteModal={openDeleteModal}
                setOpenDeleteModal={setOpenDeleteModal}
            />

            {openAddSizeModal.show && (
                <AddCategoryConfigModel
                    handleShowModel={handleShowModel}
                    sizeId={openAddSizeModal?.data}
                    parentID={isDesabledAddProductSize}
                    setrefresh={setrefresh}
                    setCategoryConfingDetailListDataBYId={setCategoryConfingDetailListDataBYId}
                />
            )
            }
        </>
    );
};

export default Create;
