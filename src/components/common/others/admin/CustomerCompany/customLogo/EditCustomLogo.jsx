/*Component Name: EditcustomLogo
Component Functional Details: User can create or update EditcustomLogo master details from here.
Created By: Shrey Patel
Created Date: 12/29/2022
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import React, { useEffect, useState, Fragment } from "react";
import { Form as FormikForm, Formik, useFormikContext } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import { blobFolder, RecStatusValuebyName } from "global/Enum";
import { ValidationMsgs } from "global/ValidationMessages";
import Transition from "utils/Transition";

import { serverError } from "services/common/helper/Helper";
import CustomerLogoService from "services/admin/customerLogo/CustomerLogoService";

import FileComponent from "components/common/formComponent/File";
import Input from "components/common/formComponent/Input";
import Textarea from "components/common/formComponent/Textarea";
import Checkbox from "components/common/formComponent/Checkbox";

import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";

const EditcustomLogo = ({ setEditCustomLogo, CustomLogoId, Data, customerInfo, customerId }) => {
    const dispatch = useDispatch();

    const CompanyId = useSelector((store) => store?.CompanyConfiguration.id);
    const location = useSelector((store) => store?.location);
    const AdminId = useSelector((store) => store?.user?.id);
    const permission = useSelector((store) => store?.permission);

    const [APIType, setAPIType] = useState("SubmitFeedBack");
    const [CustomerLogoDetails, setCustomerLogoDetails] = useState([]);
    const [DigitalLogoData, setDigitalLogoData] = useState({});
    const [SewOutLogoData, setSewOutLogoData] = useState({});
    const [JpegLogoData, setJpegLogoData] = useState({});
    const [ShowDigital, setShowDigital] = useState(false);
    const [ShowSewOutLogo, setShowSewOutLogo] = useState(false);
    const [ShowJpegLogo, setShowJpegLogo] = useState(false);

    const getAllCustomerLogDetailsById = () => {
        dispatch(setAddLoading(true));
        CustomerLogoService.getAllCustomerLogoById(CustomLogoId)
            .then((response) => {
                if (response.data.success) {
                    setCustomerLogoDetails(response.data.data);
                }
                dispatch(setAddLoading(false));
            })
            .catch((errors) => {
                dispatch(setAddLoading(false));
            });
    };

    const submitFeedBack = (values, resetForm) => {
        if (APIType === "ApproveLogo") {
            dispatch(setAddLoading(true));
            CustomerLogoService.ApproveLogo({
                customeradminlogodescriptionrequestmodel: { ...values, ...location },
            })
                .then((response) => {
                    if (response.data.success) {
                        if (values?.PantoneDetails.length > 0 && response?.data?.data?.id) {
                            values.PantoneDetails.splice(0, 1);
                            let PantonData = values?.PantoneDetails.map(
                                (PantonData, index) => {
                                    return {
                                        ...PantonData,
                                        customerAdminLogoDescriptionId: response?.data?.data?.id,
                                        pentonesCode: PantonData?.pentonesCode,
                                        colorCode: PantonData?.colorCode,
                                        recStatus: RecStatusValuebyName.Active,
                                        ...location,
                                    };
                                }
                            );
                            CustomerLogoService.CreateCustomerLogoXPentones({
                                customerlogoxpentonesrequestmodel: PantonData,
                            })
                                .then((response) => {
                                    if (response.data.success) {
                                        dispatch(
                                            setAlertMessage({
                                                type: "success",
                                                message: ValidationMsgs.customer.customLogo.feedBackSubmitted
                                            })
                                        );
                                        getAllCustomerLogDetailsById();
                                        resetForm({});
                                    } else {
                                        dispatch(
                                            setAlertMessage({
                                                type: "danger",
                                                message: serverError(response),
                                            })
                                        );
                                    }
                                    dispatch(setAddLoading(false));
                                })
                                .catch((errors) => {
                                    dispatch(
                                        setAlertMessage({
                                            type: "danger",
                                            message: ValidationMsgs.customer.customLogo.logoNotApproved,
                                        })
                                    );
                                    dispatch(setAddLoading(false));
                                });
                        }
                        // dispatch(
                        //     setAlertMessage({ type: "success", message: ValidationMsgs.customer.customLogo.feedBackSubmitted})
                        // )
                        // getAllCustomerLogDetailsById()
                        // resetForm({})
                    } else {
                        dispatch(
                            setAlertMessage({
                                type: "danger",
                                message: serverError(response),
                            })
                        );
                    }
                    dispatch(setAddLoading(false));
                })
                .catch((errors) => {
                    dispatch(
                        setAlertMessage({ type: "danger", message: ValidationMsgs.customer.customLogo.logoNotApproved })
                    );
                    dispatch(setAddLoading(false));
                });
        } else {
            dispatch(setAddLoading(true));
            CustomerLogoService.SubmitFeedBack({
                customeradminlogodescriptionrequestmodel: { ...values, ...location },
            })
                .then((response) => {
                    if (response.data.success) {
                        if (values?.PantoneDetails.length > 0 && response?.data?.data?.id) {
                            values.PantoneDetails.splice(0, 1);
                            let PantonData = values?.PantoneDetails.map(
                                (PantonData, index) => {
                                    return {
                                        ...PantonData,
                                        customerAdminLogoDescriptionId: response?.data?.data?.id,
                                        pentonesCode: PantonData?.pentonesCode,
                                        colorCode: PantonData?.colorCode,
                                        recStatus: RecStatusValuebyName.Active,
                                        ...location,
                                    };
                                }
                            );
                            CustomerLogoService.CreateCustomerLogoXPentones({
                                customerlogoxpentonesrequestmodel: PantonData,
                            })
                                .then((response) => {
                                    if (response.data.success) {
                                        dispatch(
                                            setAlertMessage({
                                                type: "success",
                                                message: ValidationMsgs.customer.customLogo.feedBackSubmitted,
                                            })
                                        );
                                        getAllCustomerLogDetailsById();
                                        resetForm({});
                                    } else {
                                        dispatch(
                                            setAlertMessage({
                                                type: "danger",
                                                message: serverError(response),
                                            })
                                        );
                                    }
                                    dispatch(setAddLoading(false));
                                })
                                .catch((errors) => {
                                    dispatch(
                                        setAlertMessage({
                                            type: "danger",
                                            message: ValidationMsgs.customer.customLogo.feedBackNotSubmitted,
                                        })
                                    );
                                    dispatch(setAddLoading(false));
                                });
                        }
                        // dispatch(
                        //     setAlertMessage({ type: "success", message: ValidationMsgs.customer.customLogo.feedBackSubmitted })
                        // )
                        // getAllCustomerLogDetailsById()
                        // resetForm({})
                    } else {
                        dispatch(
                            setAlertMessage({
                                type: "danger",
                                message: serverError(response),
                            })
                        );
                    }
                    dispatch(setAddLoading(false));
                })
                .catch((errors) => {
                    dispatch(
                        setAlertMessage({
                            type: "danger",
                            message: ValidationMsgs.customer.customLogo.feedBackNotSubmitted,
                        })
                    );
                    dispatch(setAddLoading(false));
                });
        }
    };

    const onSubmit = (fields, { resetForm }) => {
        submitFeedBack(fields, resetForm);
    };

    const LogoDetailsData = () => {
        setDigitalLogoData(
            CustomerLogoDetails.find((DigitalLogoDetails) => {
                return DigitalLogoDetails.name === "digital logo";
            })
        );
        setSewOutLogoData(
            CustomerLogoDetails.find((sewOutLogo) => {
                return sewOutLogo?.name.includes("sew-out logo");
            })
        );
        setJpegLogoData(
            CustomerLogoDetails.find((jpegLogo) => {
                return jpegLogo?.name.includes("jpeg logo");
            })
        );
    };

    useEffect(() => {
        getAllCustomerLogDetailsById();
    }, [getAllCustomerLogDetailsById]);

    const validationSchema = Yup.object({
        logoSize: Yup.string().trim().required(ValidationMsgs.customer.customLogo.logoSize),
        longDescription: Yup.string().trim().required(
            ValidationMsgs.customer.customLogo.CustomLogoMessage
        ),
    });

    return (
        <>
            <div className="flex justify-between pl-6">
                <div className="flex items-center">
                    <button
                        onClick={() => {
                            setEditCustomLogo(false);
                        }}
                        className="btn border-neutral-200 hover:border-neutral-400 text-gray-500 hover:text-gray-700 flex items-center mr-2"
                    >
                        <span className="material-icons-outlined">west</span>
                    </button>
                    <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">Back</h1>
                </div>
            </div>
            <div className="">
                <div className="p-6">
                    {CustomerLogoDetails.find((jpegLogo) => {
                        return jpegLogo?.name.includes("jpeg logo");
                    }) ? (
                        <>
                            {(DigitalLogoData?.isApproved && DigitalLogoData?.isSewOut) && (
                                <SewOutLogo
                                    CustomerId={customerId}
                                    CustomLogoId={CustomLogoId}
                                    validationSchema={validationSchema}
                                    Data={Data}
                                    CompanyId={CompanyId}
                                    AdminId={AdminId}
                                    permission={permission}
                                    onSubmit={() => onSubmit}
                                    ShowSewOutLogo={ShowSewOutLogo}
                                    setShowSewOutLogo={setShowSewOutLogo}
                                    SewOutLogoData={SewOutLogoData}
                                    CustomerLogoDetails={CustomerLogoDetails}
                                    LogoDetailsData={() => LogoDetailsData()}
                                    setAPIType={setAPIType}
                                />
                            )}
                            {JpegLogoData.isApproved && (
                                <DigitalLogo
                                    CustomerId={customerId}
                                    CustomLogoId={CustomLogoId}
                                    validationSchema={validationSchema}
                                    Data={Data}
                                    CompanyId={CompanyId}
                                    AdminId={AdminId}
                                    permission={permission}
                                    onSubmit={() => onSubmit}
                                    ShowDigital={ShowDigital}
                                    setShowDigital={setShowDigital}
                                    DigitalLogoData={DigitalLogoData}
                                    CustomerLogoDetails={CustomerLogoDetails}
                                    LogoDetailsData={() => LogoDetailsData()}
                                    setAPIType={setAPIType}
                                />
                            )}
                            {JpegLogoData !== "" && (
                                <JpegLogo
                                    CustomerId={customerId}
                                    customerInfo={customerInfo}
                                    CustomLogoId={CustomLogoId}
                                    validationSchema={validationSchema}
                                    Data={Data}
                                    CompanyId={CompanyId}
                                    AdminId={AdminId}
                                    permission={permission}
                                    onSubmit={() => onSubmit}
                                    ShowJpegLogo={ShowJpegLogo}
                                    setShowJpegLogo={setShowJpegLogo}
                                    JpegLogoData={JpegLogoData}
                                    CustomerLogoDetails={CustomerLogoDetails}
                                    LogoDetailsData={() => LogoDetailsData()}
                                    setAPIType={setAPIType}
                                    submitFeedBack={submitFeedBack}
                                />
                            )}
                        </>
                    ) : (
                        <label
                            className={`cursor-pointer block bg-white shadow-lg rounded-md border border-neutral-200 p-6`}
                        >
                            <div>
                                <div className="font-semibold text-red-400 text-lg">
                                    {" "}
                                    No Data Found! Please Order First
                                </div>
                            </div>
                        </label>
                    )}
                </div>
            </div>
        </>
    );
};

export default EditcustomLogo;

const SewOutLogo = ({
    CustomerId,
    CustomLogoId,
    Data,
    CompanyId,
    AdminId,
    permission,
    onSubmit,
    ShowSewOutLogo,
    setShowSewOutLogo,
    CustomerLogoDetails,
    SewOutLogoData,
    LogoDetailsData,
    setAPIType,
    validationSchema,
}) => {
    const FolderPath = `/${blobFolder.temp}/${CompanyId}/${blobFolder.customLogo
        }${!CustomerId ? "/0" : `/${CustomerId}`}/logoImageName`;

    const [ShowDigitalLogo, setShowDigitalLogo] = useState(""); // For Embroidery color
    const [ShowLogoApproved, setShowLogoApproved] = useState({});
    const AdminAppConfigReducers = useSelector(
        (store) => store?.AdminAppConfigReducers
    );

    useEffect(() => {
        // if (ShowDigitalLogo !== "") {
        //     let getEmbroideryColor = ShowDigitalLogo?.split(",").map(
        //         (item, index) => {
        //             return { id: index, hexCode: item };
        //         }
        //     );
        // }
        LogoDetailsData();
    }, [CustomerLogoDetails, ShowDigitalLogo]);

    useEffect(() => {
        setShowSewOutLogo(ShowLogoApproved.isApproved === true ? true : false);
    }, [ShowLogoApproved]);

    const PantoneGetData = SewOutLogoData?.customerLogoXPentonesViewModels.map(
        (data) => {
            return {
                ...data,
                id: 0,
                customerAdminLogoDescriptionId: 0,
                recStatus: RecStatusValuebyName.Active,
                rowVersion: "",
            };
        }
    );

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    // hexCode: "",
                    // EmbrodaryColor: [],
                    // embroideryColor: ColorData,
                    id: 0,
                    rowVersion: "",
                    customerId: CustomerId,
                    customerLogoId: CustomLogoId || 0,
                    adminId: AdminId,
                    longDescription: "",
                    logoImageName: SewOutLogoData?.imageUrl || "",
                    isApproved: ShowLogoApproved?.ApproveLogo || false,
                    approvedDate: "",
                    logoType: 2,
                    isAdmin: 1,
                    logoSize: ShowLogoApproved?.logoSize || "",
                    parentId: ShowLogoApproved.id,
                    PantoneDetails: [
                        {
                            id: 0,
                            customerAdminLogoDescriptionId: 0,
                            pentonesCode: "",
                            colorCode: "",
                            recStatus: RecStatusValuebyName.Active,
                            rowVersion: "",
                        },
                        ...(SewOutLogoData?.customerLogoXPentonesViewModels
                            ? PantoneGetData
                            : []),
                    ],
                }}
                onSubmit={onSubmit()}
                validationSchema={validationSchema}
                validateOnMount={true}
            >
                {({ setFieldValue, values }) => {
                    let catalogFileUrl = values.logoImageName.split("/");
                    return (
                        <FormikForm>
                            <div className="manage-logo-detail text-gray-500 mb-10 last:mb-4">
                                <div className="text-2xl text-gray-800 font-bold mb-5">
                                    Sew-out
                                </div>
                                <div className="border border-neutral-200 grid grid-cols-3 gap-x-6 rounded-md">
                                    <div className="left-side-box col-span-3 xl:col-span-1 p-6 pr-0">
                                        <div className="relative">
                                            <div className="">
                                                {values &&
                                                    values.logoImageName.includes(
                                                        `/${AdminAppConfigReducers["cdn:RootDirectory"]}/`
                                                    ) ? (
                                                    // <img
                                                    //     className="flex justify-center border-spacing-1 border-dashed border-2 border-neutral-200 rounded-lg h-96 w-full text-center"
                                                    //     src={`${AdminAppConfigReducers["azure:BlobUrl"]}${values.logoImageName}`}
                                                    //     alt={"not available"}
                                                    // />
                                                    <div className="h-96 p-2 border-spacing-1 border-dashed border-2 border-neutral-200 rounded-lg flex justify-center items-center">
                                                        <div className="flex justify-center items-center undefined col-span-full lg:col-span-6 rounded-md font-normal max-h-96">
                                                            <img
                                                                className="max-undefined"
                                                                src={`${AdminAppConfigReducers["azure:BlobUrl"]}${values.logoImageName}`}
                                                                name="custom logo"
                                                                alt="not available"
                                                            />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    // <img
                                                    //     className="flex justify-center border-spacing-1 border-dashed border-2 border-neutral-200 rounded-lg h-96 w-full text-center bg-sky-400/10"
                                                    //     alt="not available"
                                                    // />
                                                    <div className="h-96 p-2 border-spacing-1 border-dashed border-2 border-neutral-200 rounded-lg flex justify-center items-center bg-sky-400/10">
                                                        <div className="flex justify-center items-center undefined col-span-full lg:col-span-6 rounded-md font-normal max-h-96">
                                                            <img className="max-undefined" src="/noImage.png" name="custom logo" alt="not available" />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-3 xl:col-span-2 bg-gray-50 p-6 rounded-r-md text-sm">
                                        <div className="">
                                            <div className="flex items-center justify-between gap-2 mb-3">
                                                <div className="w-1/3 min-w-44 font-bold">
                                                    {Data?.logoName}
                                                </div>
                                                <div className=""></div>
                                            </div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="w-1/3 min-w-44 font-semibold">
                                                    Logo uploaded on:
                                                </div>
                                                {/* <div className="">{DateTimeFormat(Data?.uploadDate, "MMMM dd, yyyy").date}</div> */}
                                            </div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="w-1/3 min-w-44 font-semibold">
                                                    Logo size:
                                                </div>
                                                <div className="">
                                                    <Input
                                                        readOnly={ShowSewOutLogo}
                                                        className={`w-1/2 rounded-md ${ShowSewOutLogo ? "bg-slate-200" : ""
                                                            } `}
                                                        type="text"
                                                        name="logoSize"
                                                        placeholder={`2x2"`}
                                                        defaultValue={values?.logoSize}
                                                        onChange={(e) =>
                                                            setFieldValue("logoSize", e.target.value)
                                                        }
                                                        maxLength={10}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1 mb-1">
                                                <div className="col-span-full sm:col-span-6 xl:col-span-8">
                                                    <div className="flex flex-wrap gap-1 mb-4 items-center">
                                                        <label className="w-1/3 flex flex-wrap min-w-44 font-semibold">
                                                            Pantone color:
                                                        </label>
                                                        <div className="items-center">
                                                            <RangeValues
                                                                LogoApproved={ShowLogoApproved?.isApproved}
                                                                permission={permission}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* {colors && colors?.length > 0 && colors.map((color, index) => {
                                                    return (
                                                        <div key={index} className="relative">
                                                            {setColorData(FinalData = !FinalData ? FinalData.concat(color.hexCode) : FinalData.concat(",", color.hexCode))}
                                                            {(permission?.isEdit || permission?.isDelete) &&
                                                                <>
                                                                    {ShowSewOutLogo ? "" :
                                                                        <>
                                                                            {((color.recStatus !== RecStatusValuebyName.Archived) && (check === index)) && (
                                                                                <button
                                                                                    id={index}
                                                                                    onMouseLeave={() => MouseHoverEvent(undefined)}
                                                                                    type="button"
                                                                                    className="inline-block w-6 h-6 cursor-pointer absolute border border-gray-500 text-red-600 bg-gray-300"
                                                                                    onClick={() => {
                                                                                        deleteColor(index)
                                                                                    }}
                                                                                >
                                                                                    <span className="material-icons">delete</span>
                                                                                </button>
                                                                            )}
                                                                        </>}
                                                                </>}
                                                            <div
                                                                key={index}
                                                                id={index}
                                                                className="flex justify-center items-center text-white border border-gray-500 h-6 w-6"
                                                                onMouseEnter={(e) => MouseHoverEvent(e.target.id)}
                                                                style={{
                                                                    backgroundColor: color.hexCode,
                                                                    borderColor: "black",
                                                                }}
                                                            />
                                                        </div>
                                                    );
                                                })}
                                                {(permission?.isEdit || permission?.isDelete) &&
                                                    <>
                                                        {ShowSewOutLogo ? "" :
                                                            <>
                                                                <div className="col-span-full sm:col-span-6 xl:col-span-8">
                                                                    <div className="max-w-sm mx-auto">
                                                                        <div className="">
                                                                            <div className="flex items-center">
                                                                                <ColorPicker
                                                                                    name="hexCode"
                                                                                    maxLength={12}
                                                                                    isDisabled={true}
                                                                                    defaultValue={values.hexCode}
                                                                                />
                                                                                <div className="ml-1"><button className="btn btn-sm bg-indigo-500 hover:bg-indigo-600 text-white" type="button" onClick={() => addColor(values)}>Add</button></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>}
                                                    </>} */}
                                            </div>
                                            <div className="font-semibold">Comment:</div>
                                            <div className="overflow-auto max-h-screen border border-neutral-200 mb-4 rounded-md">
                                                <table className="table-auto w-full text-sm text-[#191919]">
                                                    <tbody className="text-sm divide-y divide-slate-200">
                                                        {SewOutLogoData?.comments
                                                            ? SewOutLogoData?.comments.length > 0 &&
                                                            SewOutLogoData?.comments.map(
                                                                (comment, index) => {
                                                                    setShowLogoApproved(
                                                                        SewOutLogoData?.comments[
                                                                        SewOutLogoData?.comments.length - 1
                                                                        ]
                                                                    );
                                                                    setShowDigitalLogo(
                                                                        SewOutLogoData?.comments[
                                                                            SewOutLogoData?.comments?.length - 1
                                                                        ].embroideryColor
                                                                    );
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td className="px-2 first:pl-5 py-3 font-semibold first-letter:capitalize">
                                                                                {" "}
                                                                                {comment?.senderName} :
                                                                                <div className="font-semibold first-letter:capitalize">
                                                                                    ({comment?.senderType})
                                                                                </div>
                                                                            </td>
                                                                            <td className="px-2  py-3">
                                                                                {/* <div className="font-semibold">{DateTimeFormat(comment?.date, "MMMM dd, yyyy").date}</div> */}
                                                                                <div className="text-gray-500">
                                                                                    {comment?.message}
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    );
                                                                }
                                                            )
                                                            : "Please add some comments"}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="mb-4">
                                                {ShowSewOutLogo ? (
                                                    <div className="w-full px-2 py-1 text-lg leading-7 bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md">
                                                        {catalogFileUrl
                                                            ? catalogFileUrl[catalogFileUrl.length - 1]
                                                            : ""}
                                                    </div>
                                                ) : (
                                                    <>
                                                        {(permission?.isEdit || permission?.isDelete) && (
                                                            <>
                                                                <FileComponent
                                                                    type="file"
                                                                    className="w-full px-2 py-1 text-sm leading-7 bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
                                                                    folderpath={`${FolderPath}`}
                                                                    name="logoImageName"
                                                                    // filePath={'files'}
                                                                    // isChangeDefaultName={true}
                                                                    value={
                                                                        catalogFileUrl
                                                                            ? catalogFileUrl[
                                                                            catalogFileUrl.length - 1
                                                                            ]
                                                                            : ""
                                                                    }
                                                                    onChange={(imgUrl) => {
                                                                        setFieldValue("logoImageName", imgUrl);
                                                                    }}
                                                                />
                                                            </>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                            {(permission?.isEdit || permission?.isDelete) && (
                                                <>
                                                    {ShowSewOutLogo ? (
                                                        ""
                                                    ) : (
                                                        <>
                                                            <div className="">
                                                                <Textarea
                                                                    name={`longDescription`}
                                                                    maxLength="160"
                                                                    id="longDescription"
                                                                    value={values?.longDescription}
                                                                    placeholder="Your feedback"
                                                                    rows="3"
                                                                    className={`block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md`}
                                                                />
                                                            </div>
                                                            <div className="flex items-center justify-center mt-4">
                                                                <div className="grow">
                                                                    <button
                                                                        type="submit"
                                                                        className={`btn block text-center px-6 bg-indigo-500 hover:bg-indigo-600 text-white w-full ${ShowSewOutLogo ? "w-1/4 float-right" : ""
                                                                            }`}
                                                                        onClick={() => {
                                                                            ShowSewOutLogo
                                                                                ? setFieldValue("isApproved", true)
                                                                                : setFieldValue("isApproved", false);
                                                                        }}
                                                                    >
                                                                        Submit Your feedback
                                                                    </button>
                                                                </div>
                                                                <div className="mx-2">OR</div>
                                                                <div className="grow">
                                                                    <button
                                                                        type="submit"
                                                                        className="btn block text-center px-6 bg-indigo-500 hover:bg-indigo-600 text-white w-full"
                                                                        onClick={() => {
                                                                            setAPIType("ApproveLogo");
                                                                            setFieldValue("isApproved", true);
                                                                        }}
                                                                    >
                                                                        Approve logo
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FormikForm>
                    );
                }}
            </Formik >
        </>
    );
};

const DigitalLogo = ({
    CustomerId,
    CustomLogoId,
    Data,
    CompanyId,
    AdminId,
    permission,
    onSubmit,
    ShowDigital,
    setShowDigital,
    CustomerLogoDetails,
    DigitalLogoData,
    LogoDetailsData,
    setAPIType,
    validationSchema,
}) => {
    const FolderPath = `/${blobFolder.temp}/${CompanyId}/${blobFolder.customLogo}${!CustomerId ? "/0" : `/${CustomerId}`}/logoImageName`;

    const [ShowDigitalLogo, setShowDigitalLogo] = useState(""); // For Embroidery color
    const [ShowLogoApproved, setShowLogoApproved] = useState({});

    const [colors, setColors] = useState([]);
    const AdminAppConfigReducers = useSelector(
        (store) => store?.AdminAppConfigReducers
    );

    // const MouseHoverEvent = (MouseHoverId) => {
    //     setCheck(MouseHoverId)
    // }

    // const addColor = (values, index) => {
    //     if (values.haxCode !== "") {
    //         let newColor = { id: index, hexCode: values.hexCode };
    //         setColors([...colors, newColor]);
    //     } else {
    //         setColors(ColorData);
    //     }
    // };

    // const deleteColor = (index) => {
    //     let copy_color = [...colors];
    //     copy_color.splice(index, 1);

    //     setColors(copy_color);
    // };

    useEffect(() => {
        if (ShowDigitalLogo !== "") {
            let getEmbroideryColor = ShowDigitalLogo?.split(",").map(
                (item, index) => {
                    return { id: index, hexCode: item };
                }
            );
            setColors(getEmbroideryColor);
        }
        LogoDetailsData();
    }, [CustomerLogoDetails, ShowDigitalLogo]);

    useEffect(() => {
        setShowDigital(ShowLogoApproved.isApproved === true ? true : false);
    }, [ShowLogoApproved]);

    const PantoneGetData = DigitalLogoData?.customerLogoXPentonesViewModels.map(
        (data) => {
            return {
                ...data,
                id: 0,
                customerAdminLogoDescriptionId: 0,
                recStatus: RecStatusValuebyName.Active,
                rowVersion: "",
            };
        }
    );

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    hexCode: "",
                    // EmbrodaryColor: [],
                    // embroideryColor: ColorData,
                    id: 0,
                    rowVersion: "",
                    customerId: CustomerId,
                    customerLogoId: CustomLogoId || 0,
                    adminId: AdminId,
                    longDescription: "",
                    logoImageName: DigitalLogoData?.imageUrl || "",
                    isApproved: ShowLogoApproved?.ApproveLogo || false,
                    approvedDate: "",
                    logoType: 1,
                    isAdmin: 1,
                    logoSize: ShowLogoApproved?.logoSize || "",
                    parentId: ShowLogoApproved.id,
                    PantoneDetails: [
                        {
                            id: 0,
                            customerAdminLogoDescriptionId: 0,
                            pentonesCode: "",
                            colorCode: "",
                            recStatus: RecStatusValuebyName.Active,
                            rowVersion: "",
                        },
                        ...(DigitalLogoData?.customerLogoXPentonesViewModels
                            ? PantoneGetData
                            : []),
                    ],
                }}
                onSubmit={onSubmit()}
                validationSchema={validationSchema}
                validateOnMount={true}
            >
                {({ setFieldValue, values }) => {
                    let catalogFileUrl = values.logoImageName.split("/");
                    return (
                        <FormikForm>
                            <div className="manage-logo-detail text-gray-500 mb-10 last:mb-4">
                                <div className="text-2xl text-gray-800 font-bold mb-5">
                                    Digital Logo
                                </div>
                                <div className="border border-neutral-200 grid grid-cols-3 gap-x-6 rounded-md">
                                    <div className="left-side-box col-span-3 xl:col-span-1 p-6 pr-0">
                                        <div className="relative">
                                            <div className="">
                                                {values &&
                                                    values.logoImageName.includes(
                                                        `/${AdminAppConfigReducers["cdn:RootDirectory"]}/`
                                                    ) ? (
                                                    // <img
                                                    //     className="flex justify-center border-spacing-1 border-dashed border-2 border-neutral-200 rounded-lg max-h-96 max-w-full text-center"
                                                    //     src={`${AdminAppConfigReducers["azure:BlobUrl"]}${values.logoImageName}`}
                                                    //     alt={"not available"}
                                                    //     />
                                                    <div className="h-96 p-2 border-spacing-1 border-dashed border-2 border-neutral-200 rounded-lg flex justify-center items-center">
                                                        <div className="flex justify-center items-center undefined col-span-full lg:col-span-6 rounded-md font-normal max-h-96">
                                                            <img
                                                                className="max-undefined"
                                                                src={`${AdminAppConfigReducers["azure:BlobUrl"]}${values.logoImageName}`}
                                                                name="custom logo"
                                                                alt="not available"
                                                            />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    // <img
                                                    //     className="flex justify-center border-spacing-1 border-dashed border-2 border-neutral-200 rounded-lg h-96 w-full text-center bg-sky-400/10"
                                                    //     alt="not available"
                                                    // />
                                                    <div className="h-96 p-2 border-spacing-1 border-dashed border-2 border-neutral-200 rounded-lg flex justify-center items-center bg-sky-400/10">
                                                        <div className="flex justify-center items-center undefined col-span-full lg:col-span-6 rounded-md font-normal max-h-96">
                                                            <img
                                                                className="max-undefined"
                                                                src="/noImage.png"
                                                                name="custom logo"
                                                                alt="not available"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-3 xl:col-span-2 bg-gray-50 p-6 rounded-r-md text-sm">
                                        <div className="">
                                            <div className="flex items-center justify-between gap-2 mb-3">
                                                <div className="w-1/3 min-w-44 font-bold">
                                                    {Data?.logoName}
                                                </div>
                                                <div className=""></div>
                                            </div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="w-1/3 min-w-44 font-semibold">
                                                    Logo uploaded on:
                                                </div>
                                                {/* <div className="">{DateTimeFormat(ShowLogoApproved?.date, "MMMM dd, yyyy").date}</div> */}
                                            </div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="w-1/3 min-w-44 font-semibold">
                                                    Logo size:
                                                </div>
                                                <div className="">
                                                    <Input
                                                        readOnly={ShowDigital}
                                                        className={`w-1/2 rounded-md ${ShowDigital ? "bg-slate-200" : ""
                                                            } `}
                                                        type="text"
                                                        name="logoSize"
                                                        placeholder={`2x2"`}
                                                        defaultValue={values?.logoSize}
                                                        onChange={(e) =>
                                                            setFieldValue("logoSize", e.target.value)
                                                        }
                                                        maxLength={10}
                                                    />
                                                </div>
                                            </div>
                                            <div className="items-center gap-1 mb-1">
                                                {/* {!ShowDigital && ( */}
                                                <div className="col-span-full sm:col-span-6 xl:col-span-8">
                                                    <div className="flex flex-wrap gap-1 mb-4 items-center max-h-[400px] overflow-auto">
                                                        <label className="w-1/3 flex flex-wrap min-w-44 font-semibold">
                                                            Pantone color:
                                                        </label>
                                                        <div className="items-center">
                                                            <RangeValues
                                                                LogoApproved={ShowLogoApproved?.isApproved}
                                                                permission={permission}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* )} */}
                                                {/* {colors && colors?.length > 0 && colors.map((color, index) => {
                                                    return (
                                                        <div key={index} className="relative">
                                                            {setColorData(FinalData = !FinalData ? FinalData.concat(color.hexCode) : FinalData.concat(",", color.hexCode))}
                                                            {(permission?.isEdit || permission?.isDelete) &&
                                                                <>
                                                                    {ShowDigital ? "" :
                                                                        <>
                                                                            {((color.recStatus !== RecStatusValuebyName.Archived) && (check === index)) && (
                                                                                <button
                                                                                    id={index}
                                                                                    onMouseLeave={() => MouseHoverEvent(undefined)}
                                                                                    type="button"
                                                                                    className="inline-block w-6 h-6 cursor-pointer absolute border border-gray-500 text-red-600 bg-gray-300"
                                                                                // onClick={() => {
                                                                                //     deleteColor(index)
                                                                                // }}
                                                                                >
                                                                                    <span className="material-icons">delete</span>
                                                                                </button>
                                                                            )}
                                                                        </>
                                                                    }
                                                                </>
                                                            }
                                                            <div
                                                                key={index}
                                                                id={index}
                                                                className="flex justify-center items-center text-white border border-gray-500 h-6 w-6"
                                                                onMouseEnter={(e) => MouseHoverEvent(e.target.id)}
                                                                style={{
                                                                    backgroundColor: color.hexCode,
                                                                    borderColor: "black",
                                                                }}
                                                            />
                                                        </div>
                                                    );
                                                })} */}
                                                {/* {(permission?.isEdit || permission?.isDelete) &&
                                                    <>
                                                        {ShowDigital ? "" :
                                                            <>
                                                                <div className="col-span-full sm:col-span-6 xl:col-span-8">-
                                                                    <div className="max-w-sm mx-auto">
                                                                        <div className="">
                                                                            <div className="flex items-center">
                                                                                <ColorPicker
                                                                                    name="hexCode"
                                                                                    maxLength={12}
                                                                                    isDisabled={true}
                                                                                    defaultValue={values.hexCode}
                                                                                // value={values.hexCode}
                                                                                />
                                                                                <div className="ml-1"><button className="btn btn-sm bg-indigo-500 hover:bg-indigo-600 text-white" type="button" onClick={() => addColor(values)}>Add</button></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        }
                                                    </>
                                                } */}
                                            </div>
                                            <div className="font-semibold">Comment:</div>
                                            <div className="overflow-auto max-h-[400px] border border-neutral-200 mb-4 rounded-md ">
                                                <table className="table-auto w-full text-sm text-[#191919]">
                                                    <tbody className="text-sm divide-y divide-slate-200">
                                                        {DigitalLogoData?.comments
                                                            ? DigitalLogoData?.comments.length > 0 &&
                                                            DigitalLogoData?.comments.map(
                                                                (comment, index) => {
                                                                    setShowLogoApproved(
                                                                        DigitalLogoData?.comments[
                                                                        DigitalLogoData?.comments?.length - 1
                                                                        ]
                                                                    );
                                                                    // setShowDigitalLogo(DigitalLogoData?.comments[DigitalLogoData?.comments?.length - 1].embroideryColor)
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td className="px-2 first:pl-5 py-3 font-semibold first-letter:capitalize">
                                                                                {" "}
                                                                                {comment?.senderName} :
                                                                                <div className="font-semibold first-letter:capitalize">
                                                                                    ({comment?.senderType})
                                                                                </div>
                                                                            </td>
                                                                            <td className="px-2  py-3">
                                                                                {/* <div className="font-semibold">{DateTimeFormat(comment?.date, "MMMM dd, yyyy").date}</div> */}
                                                                                <div className="text-gray-500">
                                                                                    {comment?.message}
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    );
                                                                }
                                                            )
                                                            : "Please add some comments"}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="mb-4">
                                                {ShowDigital ? (
                                                    <div className="w-full px-2 py-1 text-lg leading-7 bg-slate-200 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md">
                                                        {catalogFileUrl
                                                            ? catalogFileUrl[catalogFileUrl.length - 1]
                                                            : ""}
                                                    </div>
                                                ) : (
                                                    <>
                                                        {(permission?.isEdit || permission?.isDelete) && (
                                                            <>
                                                                <FileComponent
                                                                    type="file"
                                                                    className="w-full px-2 py-1 text-sm leading-7 bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
                                                                    folderpath={`${FolderPath}`}
                                                                    name="logoImageName"
                                                                    // filePath={'files'}
                                                                    // isChangeDefaultName={true}
                                                                    value={
                                                                        catalogFileUrl
                                                                            ? catalogFileUrl[
                                                                            catalogFileUrl.length - 1
                                                                            ]
                                                                            : ""
                                                                    }
                                                                    onChange={(imgUrl) => {
                                                                        setFieldValue("logoImageName", imgUrl);
                                                                    }}
                                                                />
                                                            </>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                            {(permission?.isEdit || permission?.isDelete) && (
                                                <>
                                                    {ShowDigital ? (
                                                        ""
                                                    ) : (
                                                        <>
                                                            <div className="">
                                                                <Textarea
                                                                    name={`longDescription`}
                                                                    maxLength="160"
                                                                    id="longDescription"
                                                                    value={values?.longDescription}
                                                                    placeholder="Your feedback"
                                                                    rows="3"
                                                                    className={`block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md`}
                                                                />
                                                            </div>
                                                            <div className="flex items-center justify-center mt-4">
                                                                <div className="grow">
                                                                    <button
                                                                        type="submit"
                                                                        className="btn block text-center px-6 bg-indigo-500 hover:bg-indigo-600 text-white w-full"
                                                                    >
                                                                        Add Comments
                                                                    </button>
                                                                </div>
                                                                <div className="mx-2">OR</div>
                                                                <div className="grow">
                                                                    <button
                                                                        type="submit"
                                                                        className="btn block text-center px-6 bg-indigo-500 hover:bg-indigo-600 text-white w-full"
                                                                        onClick={() => {
                                                                            setAPIType("ApproveLogo");
                                                                            setFieldValue("isApproved", true);
                                                                        }}
                                                                    >
                                                                        Approve logo
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FormikForm>
                    );
                }}
            </Formik>
        </>
    );
};

const JpegLogo = ({
    CustomerId,
    customerInfo,
    CustomLogoId,
    Data,
    CompanyId,
    AdminId,
    permission,
    onSubmit,
    ShowJpegLogo,
    setShowJpegLogo,
    CustomerLogoDetails,
    JpegLogoData,
    LogoDetailsData,
    setAPIType,
    validationSchema,
    submitFeedBack,
}) => {
    const FolderPath = `/${blobFolder.temp}/${CompanyId}/${blobFolder.customLogo
        }${!CustomerId ? "/0" : `/${CustomerId}`}/logoImageName`;

    const [ShowDigitalLogo, setShowDigitalLogo] = useState(""); // For Embroidery color
    const [ShowLogoApproved, setShowLogoApproved] = useState({});
    const AdminAppConfigReducers = useSelector(
        (store) => store?.AdminAppConfigReducers
    );

    const [ColorData, setColorData] = useState("");
    const [colors, setColors] = useState([]);
    const [check, setCheck] = useState(undefined);
    const [openBasicModal, setOpenBasicModal] = useState(false);

    const MouseHoverEvent = (MouseHoverId) => {
        setCheck(MouseHoverId);
    };

    // const addColor = (values, index) => {
    //     if (values.haxCode !== "") {
    //         let newColor = { id: index, hexCode: values.hexCode };
    //         setColors([...colors, newColor]);
    //     } else {
    //         setColors(ColorData);
    //     }
    // };

    // const deleteColor = (index) => {
    //     let copy_color = [...colors];
    //     copy_color.splice(index, 1);

    //     setColors(copy_color);
    // };

    useEffect(() => {
        if (ShowDigitalLogo !== "") {
            let getEmbroideryColor = ShowDigitalLogo?.split(",").map(
                (item, index) => {
                    return { id: index, hexCode: item };
                }
            );
            setColors(getEmbroideryColor);
        }
        LogoDetailsData();
    }, [CustomerLogoDetails, ShowDigitalLogo, ShowLogoApproved]);

    useEffect(() => {
        setShowJpegLogo(ShowLogoApproved.isApproved === true ? true : false);
    }, [ShowLogoApproved]);

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    hexCode: "",
                    EmbrodaryColor: [],
                    embroideryColor: ColorData,
                    id: 0,
                    rowVersion: "",
                    customerId: CustomerId,
                    customerLogoId: CustomLogoId || 0,
                    adminId: AdminId,
                    longDescription: "",
                    logoImageName: JpegLogoData?.imageUrl || "",
                    isApproved: false,
                    approvedDate: "",
                    logoType: 0,
                    isAdmin: 1,
                    logoSize: ShowLogoApproved?.logoSize || "",
                    parentId: ShowLogoApproved.id,
                    PantoneDetails: [
                        {
                            id: 0,
                            customerAdminLogoDescriptionId: 0,
                            pentonesCode: "",
                            colorCode: "",
                            recStatus: RecStatusValuebyName.Active,
                            rowVersion: "",
                        } /* , ...(data?.promotionsrangemodellist ? [...data?.promotionsrangemodellist] : []) */,
                    ],
                }}
                onSubmit={onSubmit()}
                validationSchema={validationSchema}
                validateOnMount={true}
            >
                {({ setFieldValue, values }) => {
                    let catalogFileUrl = values.logoImageName.split("/");
                    return (
                        <FormikForm>
                            <div className="manage-logo-detail text-gray-500 mb-10 last:mb-0">
                                <div className="text-2xl text-gray-800 font-bold mb-5">
                                    Jpeg Logo
                                </div>
                                <div className="border border-neutral-200 grid grid-cols-3 gap-x-6 rounded-md">
                                    <div className="left-side-box col-span-3 xl:col-span-1 p-6 pr-0">
                                        <div className="relative">
                                            <div className="">
                                                {values &&
                                                    values.logoImageName.includes(
                                                        `/${AdminAppConfigReducers["cdn:RootDirectory"]}/`
                                                    ) ? (
                                                    // <img
                                                    //     className="flex justify-center border-spacing-1 border-dashed border-2 border-neutral-200 rounded-lg h-96 w-full text-center"
                                                    //     src={`${AdminAppConfigReducers["azure:BlobUrl"]}${values.logoImageName}`}
                                                    //     alt={"not available"}
                                                    // />
                                                    <div className="h-96 p-2 border-spacing-1 border-dashed border-2 border-neutral-200 rounded-lg flex justify-center items-center">
                                                        <div className="flex justify-center items-center undefined col-span-full lg:col-span-6 rounded-md font-normal max-h-96">
                                                            <img
                                                                className="max-undefined"
                                                                src={`${AdminAppConfigReducers["azure:BlobUrl"]}${values.logoImageName}`}
                                                                name="custom logo"
                                                                alt="not available"
                                                            />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    // <img
                                                    //     className="flex justify-center border-spacing-1 border-dashed border-2 border-neutral-200 rounded-lg h-96 w-full text-center bg-sky-400/10"
                                                    //     alt="not available"
                                                    // />
                                                    <div className="h-96 p-2 border-spacing-1 border-dashed border-2 border-neutral-200 rounded-lg flex justify-center items-center bg-sky-400/10">
                                                        <div className="flex justify-center items-center undefined col-span-full lg:col-span-6 rounded-md font-normal max-h-96">
                                                            <img className="max-undefined" src="/noImage.png" name="custom logo" alt="not available" />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-3 xl:col-span-2 bg-gray-50 p-6 rounded-r-md text-sm">
                                        <div className="">
                                            <div className="flex items-center justify-between gap-2 mb-3">
                                                <div className="w-1/3 min-w-44 font-bold">
                                                    {Data?.logoName}
                                                </div>
                                                <div className=""></div>
                                            </div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="w-1/3 min-w-44 font-semibold">
                                                    Logo uploaded on:
                                                </div>
                                                {/* <div className="">{DateTimeFormat(Data?.uploadDate, "MMMM dd, yyyy").date}</div> */}
                                            </div>
                                            {/* <div className="flex items-center gap-2 mb-1">
                                                <div className="w-1/3 min-w-44 font-semibold">Logo size:</div>
                                                <div className="">
                                                    <Input readOnly={ShowJpegLogo} className={`w-1/2 rounded-md ${ShowJpegLogo ? "bg-slate-200" : ""} `} type="text" name="logoSize" placeholder={`2x2"`} defaultValue={values?.logoSize} onChange={(e) => setFieldValue("logoSize", e.target.value)} maxLength={10} />
                                                </div>
                                            </div> */}
                                            {/* <div className="flex items-center gap-1 mb-1"> */}
                                            {/* {ShowJpegLogo &&
                                                    <div className="col-span-full sm:col-span-6 xl:col-span-8">
                                                        <div className="flex flex-wrap gap-1 mb-4 items-center">
                                                            <label className="w-1/3 flex flex-wrap min-w-44 font-semibold">Pantone color:</label>
                                                            <div className="items-center">
                                                                <RangeValues ShowLogoApproved={ShowLogoApproved} ShowJpegLogo={ShowJpegLogo} permission={permission} />
                                                            </div></div>
                                                    </div>
                                                } */}
                                            {/* {colors && colors?.length > 0 && colors.map((color, index) => {
                                                    return (
                                                        <div key={index} className="relative">
                                                            {setColorData(FinalData = !FinalData ? FinalData.concat(color.hexCode) : FinalData.concat(",", color.hexCode))}
                                                            {(permission?.isEdit || permission?.isDelete) &&
                                                                <>
                                                                    {ShowJpegLogo ? "" :
                                                                        <>
                                                                            {((color.recStatus !== RecStatusValuebyName.Archived) && (check === index)) && (
                                                                                <button
                                                                                    readOnly={ShowJpegLogo}
                                                                                    id={index}
                                                                                    onMouseLeave={() => MouseHoverEvent(undefined)}
                                                                                    type="button"
                                                                                    className="inline-block w-6 h-6 cursor-pointer absolute border border-gray-500 text-red-600 bg-gray-300"
                                                                                    onClick={() => {
                                                                                        deleteColor(index)
                                                                                    }}
                                                                                >
                                                                                    <span className="material-icons">delete</span>
                                                                                </button>
                                                                            )}
                                                                        </>
                                                                    }
                                                                </>
                                                            }
                                                            <div
                                                                key={index}
                                                                id={index}
                                                                className="flex justify-center items-center text-white border border-gray-500 h-6 w-6"
                                                                onMouseEnter={(e) => MouseHoverEvent(e.target.id)}
                                                                style={{
                                                                    backgroundColor: color.hexCode,
                                                                    borderColor: "black",
                                                                }}
                                                            />
                                                        </div>
                                                    );
                                                })}
                                                {(permission?.isEdit || permission?.isDelete) &&
                                                    <>
                                                        {ShowJpegLogo ? "" :
                                                            <div className="col-span-full sm:col-span-6 xl:col-span-8">
                                                                <div className="max-w-sm mx-auto">
                                                                    <div className="">
                                                                        <div className="flex items-center">
                                                                            <ColorPicker
                                                                                name="hexCode"
                                                                                maxLength={12}
                                                                                isDisabled={true}
                                                                                defaultValue={values.hexCode}
                                                                            // value={values.hexCode}
                                                                            />
                                                                            <div className="ml-1"><button className="btn btn-sm bg-indigo-500 hover:bg-indigo-600 text-white" type="button" onClick={() => addColor(values)}>Add</button></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                    </>
                                                } */}
                                            {/* </div> */}
                                            <div className="font-semibold">Comment:</div>
                                            <div className="overflow-auto max-h-screen border border-neutral-200 mb-4 rounded-md">
                                                <table className="table-auto w-full text-sm text-[#191919]">
                                                    <tbody className="text-sm divide-y divide-slate-200">
                                                        {JpegLogoData?.comments
                                                            ? JpegLogoData?.comments.length > 0 &&
                                                            JpegLogoData?.comments.map((comment, index) => {
                                                                setShowLogoApproved(
                                                                    JpegLogoData?.comments[
                                                                    JpegLogoData?.comments?.length - 1
                                                                    ]
                                                                );
                                                                // setShowDigitalLogo(JpegLogoData?.comments[JpegLogoData?.comments?.length - 1].embroideryColor)
                                                                return (
                                                                    <tr key={index}>
                                                                        <td className="px-2 first:pl-5 py-3 font-semibold first-letter:capitalize">
                                                                            {" "}
                                                                            {comment?.senderName} :
                                                                            <div className="font-semibold first-letter:capitalize">
                                                                                ({comment?.senderType})
                                                                            </div>
                                                                        </td>
                                                                        <td className="px-2 first:pl-5 py-3">
                                                                            {/* <div className="font-semibold">{DateTimeFormat(comment?.date, "MMMM dd, yyyy").date}</div> */}
                                                                            <div className="text-gray-500">
                                                                                {comment?.message}
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            })
                                                            : "Please add some comments"}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="mb-4">
                                                {ShowJpegLogo ? (
                                                    <div className="w-full px-2 py-1 text-lg leading-7 bg-slate-200 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md">
                                                        {catalogFileUrl
                                                            ? catalogFileUrl[catalogFileUrl.length - 1]
                                                            : ""}
                                                    </div>
                                                ) : (
                                                    <>
                                                        {(permission?.isEdit || permission?.isDelete) && (
                                                            <>
                                                                <FileComponent
                                                                    type="file"
                                                                    className="w-full px-2 py-1 text-sm leading-7 bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
                                                                    folderpath={`${FolderPath}`}
                                                                    name="logoImageName"
                                                                    value={
                                                                        catalogFileUrl
                                                                            ? catalogFileUrl[
                                                                            catalogFileUrl.length - 1
                                                                            ]
                                                                            : ""
                                                                    }
                                                                    onChange={(imgUrl) => {
                                                                        setFieldValue("logoImageName", imgUrl);
                                                                    }}
                                                                />
                                                            </>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                            {(permission?.isEdit || permission?.isDelete) && (
                                                <>
                                                    {ShowJpegLogo ? (
                                                        ""
                                                    ) : (
                                                        <>
                                                            <div className="">
                                                                <Textarea
                                                                    readOnly={ShowJpegLogo}
                                                                    name={`longDescription`}
                                                                    // maxLength="160"
                                                                    id="longDescription"
                                                                    value={values?.longDescription}
                                                                    placeholder="Your feedback"
                                                                    rows="3"
                                                                    className={`block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md`}
                                                                />
                                                            </div>
                                                            {/* <div className="flex items-center justify-center mt-4">
                                                                <div className="grow"><button type="submit" className="btn block text-center px-6 bg-indigo-500 hover:bg-indigo-600 text-white w-1/4 float-right" onClick={() => { setFieldValue("logoType", 0); }} >Add Comments</button></div>
                                                            </div> */}
                                                            <div className="flex items-center justify-center mt-4">
                                                                <div className="grow">
                                                                    <button
                                                                        type="submit"
                                                                        className={`btn block text-center px-6 bg-indigo-500 hover:bg-indigo-600 text-white w-full ${ShowJpegLogo ? "w-1/4 float-right" : ""
                                                                            }`}
                                                                        onClick={() => {
                                                                            setAPIType("SubmitFeedBack");
                                                                            setFieldValue("isApproved", false);
                                                                        }}
                                                                    >
                                                                        Add Comments
                                                                    </button>
                                                                </div>
                                                                {ShowJpegLogo ? (
                                                                    ""
                                                                ) : (
                                                                    <>
                                                                        <div className="mx-2">OR</div>
                                                                        <div className="grow">
                                                                            <button
                                                                                type="button"
                                                                                className="btn block text-center px-6 bg-indigo-500 hover:bg-indigo-600 text-white w-full"
                                                                                onClick={() => {
                                                                                    setOpenBasicModal(true);
                                                                                    setAPIType("ApproveLogo");
                                                                                    setFieldValue("isApproved", true);
                                                                                }}
                                                                            >
                                                                                Approve logo
                                                                            </button>
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ConformationModal
                                handleConfirmation={submitFeedBack}
                                data={values}
                                message={`Are you approving this Jpeg Logo behalf of ${customerInfo?.name}?`}
                                openModal={openBasicModal}
                                setOpenModal={setOpenBasicModal}
                                ButtonName={"Approve"}
                            />
                        </FormikForm>
                    );
                }}
            </Formik>
        </>
    );
};

const ConformationModal = ({
    data,
    message,
    title,
    handleConfirmation,
    openModal,
    setOpenModal,
    ButtonName,
    displayCancelButton,
    cancelButtonName,
    cancelButtonAction,
}) => {
    const [ApproveValue, setApproveValue] = useState(true);
    // esc hide modal
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!openModal || keyCode !== 27) return;
            setOpenModal(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    });

    const confirmation = () => {
        if (handleConfirmation instanceof Function) {
            handleConfirmation(data);
        } else {
            setOpenModal(false);
        }
    };
    const cancelFunction = () => {
        if (cancelButtonAction instanceof Function) {
            cancelButtonAction();
        }
        setOpenModal(false);
    };
    return (
        <>
            <Transition
                className="fixed inset-0 bg-slate-900 bg-opacity-95 z-30 transition-opacity"
                show={openModal}
                tag="div"
                enter="transition ease-out duration-200 transform"
                enterStart="opacity-0 -translate-y-2"
                enterEnd="opacity-100 translate-y-0"
                leave="transition ease-out duration-200"
                leaveStart="opacity-100"
                leaveEnd="opacity-0"
                onClick={() => setOpenModal(false)}
            ></Transition>
            <Transition
                className="fixed inset-0 z-30 overflow-hidden flex items-center my-4 justify-center transform px-4 sm:px-6"
                show={openModal}
                tag="div"
                id="basic-modal"
                enter="transition ease-out duration-200 transform"
                enterStart="opacity-0 -translate-y-2"
                enterEnd="opacity-100 translate-y-0"
                leave="transition ease-out duration-200"
                leaveStart="opacity-100"
                leaveEnd="opacity-0"
            >
                <div className="bg-white rounded shadow-lg overflow-auto max-w-lg w-full max-h-full">
                    <div className="px-5 py-3 border-b border-neutral-200 ">
                        <div className="flex justify-between items-center">
                            <div className="font-bold text-black">
                                {title ? title : "Confirmation"}
                            </div>
                            <button
                                type="button"
                                className="text-black hover:text-gray-400"
                                onClick={() => setOpenModal(false)}
                            >
                                <div className="sr-only">Close</div>
                                <svg className="w-4 h-4 fill-current">
                                    <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="px-5 pt-4 pb-1">
                        <div className="text-sm">
                            <div className="space-y-2">
                                <p className="mb-2">
                                    {/* <CheckBox /> */}
                                    <Checkbox
                                        name="approval"
                                        label={message}
                                        id="approval"
                                        checked={ApproveValue}
                                        onChange={(e) => {
                                            setApproveValue(e.target.checked);
                                        }}
                                    />
                                    {/* &nbsp;&nbsp;
                                    {message
                                        ? message
                                        : `Are you approving this Jpeg Logo behalf of <customer>?`} */}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="px-5 py-4">
                        <div className="flex flex-wrap justify-end space-x-2">
                            {(displayCancelButton === true ||
                                displayCancelButton === undefined) && (
                                    <button
                                        type="button"
                                        className="btn border-gray-300 hover:border-neutral-400 text-gray-500"
                                        onClick={() => cancelFunction()}
                                    >
                                        {cancelButtonName ? cancelButtonName : "Cancel"}
                                    </button>
                                )}
                            <button
                                type="button"
                                onClick={confirmation}
                                className={
                                    ApproveValue
                                        ? "btn bg-indigo-500 hover:bg-indigo-600 text-white"
                                        : "btn bg-gray-500 text-white cursor-not-allowed opacity-60 hover:bg-gray-500"
                                }
                                disabled={!ApproveValue}
                            >
                                {ButtonName ? ButtonName : "Approve"}
                            </button>
                        </div>
                    </div>
                </div>
            </Transition>
        </>
    );
};

const RangeValues = ({
    LogoApproved,
    PantoneDetails = [{}],
    permission,
}) => {
    const { values, setFieldValue } = useFormikContext();
    const [rangeErrorMessage, setRangeErrorMessage] = useState(false);
    const addRange = () => {
        if (
            values.PantoneDetails[0].pentonesCode !== "" ||
            values.PantoneDetails[0].colorCode !== ""
        ) {
            setRangeErrorMessage(false);
            setFieldValue("PantoneDetails", [
                {
                    id: 0,
                    customerAdminLogoDescriptionId: 0,
                    pentonesCode: "",
                    colorCode: "",
                    recStatus: RecStatusValuebyName.Active,
                    rowVersion: "",
                },
                ...values.PantoneDetails,
            ]);
        } else {
            setRangeErrorMessage(true);
        }
    };

    useEffect(() => {
        if (LogoApproved === true) {
            values.PantoneDetails.splice(0, 1)
        }
    }, [values.PantoneDetails, LogoApproved])

    return (
        <>
            {values?.PantoneDetails.map((value, index) => {
                if (value.recStatus === RecStatusValuebyName.Active) {
                    return (
                        <Fragment key={index}>
                            <div className={`flex`}>
                                <div className="py-1">
                                    <div className="relative">
                                        <Input
                                            className={`form-input w-full rounded-md border-neutral-200 hover:border-neutral-300 focus:border-neutral-500 focus:ring-neutral-300 focus:shadow-lg ${index > 0 || LogoApproved ? "bg-slate-200" : ""
                                                }`}
                                            type="text"
                                            name={`PantoneDetails.[${index}].pentonesCode`}
                                            defaultValue={PantoneDetails.pentonesCode}
                                            placeholder={"Pantone Name"}
                                            disabled={index > 0 || LogoApproved}
                                            displayError={true}
                                            value={values?.PantoneDetails[index]?.pentonesCode}
                                            onChange={(e) => {
                                                setFieldValue(e.target.name, e.target.value);
                                            }}
                                            maxLength={15}
                                            allowNegative={false}
                                        />
                                    </div>
                                </div>

                                <div className="py-1 ml-4">
                                    <div className="relative">
                                        <Input
                                            className={`form-input w-full rounded-md border-neutral-200 hover:border-neutral-300 focus:border-neutral-500 focus:ring-neutral-300 focus:shadow-lg ${index > 0 || LogoApproved ? "bg-slate-200" : ""
                                                }`}
                                            type="text"
                                            name={`PantoneDetails.[${index}].colorCode`}
                                            defaultValue={PantoneDetails.colorCode}
                                            placeholder={"ex. #22fc45"}
                                            disabled={index > 0 || LogoApproved}
                                            displayError={true}
                                            value={values.PantoneDetails[index].colorCode}
                                            onChange={(e) => {
                                                setFieldValue(e.target.name, e.target.value);
                                            }}
                                            maxLength={15}
                                            allowNegative={false}
                                        />
                                    </div>
                                </div>
                                <div
                                    className={`relative h-9 w-6 ml-1 mt-1 border rounded-md`} style={{
                                        "background-color": values.PantoneDetails[index].colorCode
                                            ? values.PantoneDetails[index].colorCode
                                            : "bg-white",
                                    }} >
                                    <div className="absolute inset-y-0 left-0 w-2"></div>
                                </div>
                                {!LogoApproved && (
                                    <div className="px-2 first:pl-5 py-1">
                                        <div className="relative gap-2 pt-2 text-right">
                                            {(index === 0 && (permission?.isEdit || permission?.isDelete)) ? (
                                                <button
                                                    type="button"
                                                    className={`btn btn-sm bg-indigo-500 hover:bg-indigo-600 w-12 h-6 text-white`}
                                                    onClick={addRange}
                                                >
                                                    Add
                                                </button>
                                            ) : (
                                                <>
                                                    {/* {(index === 1 || values.PantoneDetails.length - 1 === index) ? ( */}
                                                    <button
                                                        type="button"
                                                        className={`w-6 h-6 text-rose-500`}
                                                        onClick={() => {
                                                            setFieldValue(
                                                                "PantoneDetails",
                                                                values.PantoneDetails.map((value, index1) => {
                                                                    if (index === index1) {
                                                                        return {
                                                                            ...value,
                                                                            recStatus: RecStatusValuebyName.Archived,
                                                                        };
                                                                    }
                                                                    return value;
                                                                })
                                                            );
                                                        }}
                                                    >
                                                        <span className="material-icons-outlined cursor-pointer">
                                                            close
                                                        </span>
                                                    </button>
                                                    {/* ) : <span className="ml-6"></span>} */}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}
                                <div className="px-2 first:pl-5 py-1">
                                    <div className="relative gap-2 text-right"></div>
                                </div>
                            </div>
                            {
                                rangeErrorMessage && index === 0 ? (
                                    <div className={"text-rose-500 pb-5"}>
                                        {ValidationMsgs.promotions.rangeErrorMessage}
                                    </div>
                                ) : (
                                    ""
                                )
                            }
                        </Fragment >
                    );
                }
                return "";
            })}
        </>
    );
};
