/*Component Name: Media
Component Functional Details: User can create or update Media details from here.
Created By: Shrey Patel
Created Date: 10/12/2023
Modified By: <Modified By Name>
Modified Date: <Modified Date> */
import Input from "components/common/formComponent/Input";
import React, { useState, useEffect, useCallback } from "react";
import { Formik, Form as FormikForm, useFormikContext } from "formik";
import ImageFile from "components/common/formComponent/ImageFile";
import * as Yup from "yup";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { useDispatch, useSelector } from "react-redux";
import { serverError } from "services/common/helper/Helper";
import { Fragment } from "react";
import { anniesAnnualData, blobFolder, defaultImage, ProductAttributeTypeValues, RecStatusValuebyName } from "global/Enum";
import { productType } from "dummy/Dummy";
import { ValidationMsgs } from "global/ValidationMessages";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import UnsavedFormHandler from "./UnsavedFormHandler";
import StoreAttributeImageService from "services/admin/master/store/product/attribute/AttributeImageService";
import MediaVideoServicesCls from "services/admin/master/store/product/MediaServices";
import Image from "components/common/formComponent/Image";
import ConfirmDelete from "components/common/modals/ConfirmDelete";
import FileInput from "components/common/formComponent/FileInput";
import VideoPlayer from "components/common/VIdeoPlayer";

const Media = ({
    values,
    readOnly,
    type,
    user,
    productId,
    getProductReadinessData,
    setsaveUnSavedFields,
    setWishedToChangeTab,
    clearCacheForBrandCategory,
}) => {
    const dispatch = useDispatch();
    const location = useSelector((store) => store?.location);
    const valueByID = values;
    const permission = useSelector((store) => store.permission);
    const [ImageData, setImageData] = useState([]);
    const GlobalLoading = useSelector((store) => store?.GlobalLoaderReducer?.toLoad);
    const AdminAppConfigReducers = useSelector((store) => store?.AdminAppConfigReducers);
    const [VideoId, setVideoId] = useState("");
    const [DeleteData, setDeleteData] = useState({});
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openAddVideoModal, setOpenAddVideoModal] = useState({
        show: false,
        data: null,
    });

    const getMediaVideoData = useCallback(() => {
        dispatch(setAddLoading(true));
        MediaVideoServicesCls.getMediaVideoData(productId).then((response) => {
            if (response.data.success) {
                setImageData(response.data.data);
            }
            dispatch(setAddLoading(false));
        }).catch((errors) => {
            dispatch(setAddLoading(false));
        });
    }, []);

    const DeleteMediaVideoById = (value) => {
        dispatch(setAddLoading(true))
        MediaVideoServicesCls.MediaVideoDeleteById({
            args: {
                id: value?.id,
                rowVersion: value?.rowVersion,
                status: RecStatusValuebyName.Archived,
                ...location
            }
        }).then((response) => {
            if (response.data.success) {
                dispatch(
                    setAlertMessage({
                        type: "success",
                        message: "Attribute Video Deleted Successfully.",
                    })
                );
                getMediaVideoData();
            } else {
                dispatch(setAlertMessage({ type: "danger", message: serverError(response) }));
            }
            dispatch(setAddLoading(false))
        }).catch((errors) => {
            dispatch(
                setAlertMessage({
                    type: "danger",
                    message: "Attribute Video not deleted.",
                })
            );
            dispatch(setAddLoading(false))
        });
        setOpenDeleteModal(false);
    }

    useEffect(() => {
        setWishedToChangeTab(false);
        getMediaVideoData();
    }, []);

    const handleShowModel = (data) => {
        setOpenAddVideoModal((prevState) => ({
            ...prevState,
            show: !prevState.show,
            data: VideoId,
        }));
    };

    return (
        <>
            <title>Media</title>
            <div className="border-t-2 border-neutral-200">
                <div className="w-full p-6 pb-0 flex flex-wrap items-center justify-between mb-6">
                    <div className="block uppercase tracking-wide text-gray-500 text-lg font-bold">
                        Media Videos
                    </div>
                    {(permission?.isEdit || permission?.isDelete) && (
                        <>
                            {GlobalLoading ? (
                                <span className="spinner-border spinner-border-sm mr-2"></span>
                            ) : (<button
                                // disabled={GlobalLoading}
                                type="button"
                                onClick={handleShowModel}
                                className={`btn px-6 bg-indigo-500 hover:bg-indigo-600 text-white`}
                            >
                                Add
                            </button>
                            )}
                        </>
                    )}
                </div>
            </div>
            <div className="overflow-x-auto max-h-screen border-t border-neutral-200">
                <table className="table-auto w-full text-sm text-[#191919] font-semibold overflow-scroll">
                    <tbody className="text-sm divide-y divide-slate-200">
                        <TR
                            imageData={ImageData ? ImageData : []}
                            setVideoId={setVideoId}
                            permission={permission}
                            setDeleteData={setDeleteData}
                            handleShowModel={handleShowModel}
                            setOpenDeleteModal={setOpenDeleteModal}
                            AdminAppConfigReducers={AdminAppConfigReducers}
                        />
                    </tbody>
                </table>
            </div>
            {openAddVideoModal.show && (
                <AddVideoModel
                    ImageData={ImageData}
                    handleShowModel={handleShowModel}
                    VideoId={VideoId}
                    setVideoId={setVideoId}
                    productId={productId}
                    getMediaVideoData={getMediaVideoData}
                />
            )}

            <ConfirmDelete
                handleDelete={DeleteMediaVideoById}
                data={DeleteData}
                message={ValidationMsgs.ProductConfig.ProductConfigPermanentDelete}
                title={"Delete"}
                openDeleteModal={openDeleteModal}
                setOpenDeleteModal={setOpenDeleteModal}
            />
        </>
    )
};

export default Media;

const AddVideoModel = ({
    ImageData,
    handleShowModel,
    productId,
    getMediaVideoData,
    VideoId,
    setVideoId,
}) => {
    const dispatch = useDispatch();
    const [data, setData] = useState(null);
    const CompanyId = useSelector((store) => store?.CompanyConfiguration.id)
    const location = useSelector((store) => store?.location)
    const GlobalLoading = useSelector((store) => store?.GlobalLoaderReducer?.toLoad);
    const FolderPath = `/${blobFolder.temp}/${CompanyId}/${blobFolder.media}`
    const isAddMode = !VideoId;

    const gettMediaVideoDetailsByID = useCallback(() => {
        if (VideoId > 0) {
            dispatch(setAddLoading(true))
            MediaVideoServicesCls.getMediaVideoDataById(VideoId)
                .then((res) => {
                    var response = res.data;
                    if (response.success) {
                        setData({ ...response.data });
                    }
                    dispatch(setAddLoading(false))
                }).catch((err) => {
                    dispatch(setAddLoading(false))
                });
        }
    }, [VideoId]);

    useEffect(() => {
        gettMediaVideoDetailsByID();
    }, [VideoId]);

    const initialValues = {
        id: VideoId || 0,
        productId: productId,
        videoUrl: data?.videoUrl || "",
        videoImagePath: data?.videoImagePath || "",
        attributeOptionId: 0,
        altTag: data?.altTag || "",
        displayOrder: data?.displayOrder || ImageData && ImageData?.length > 0 ? ImageData?.length + 1 : "",
        recStatus: data?.recStatus || RecStatusValuebyName.Active,
        rowVersion: data?.rowVersion || null,
    };

    const isYouTubeUrl = (url) => {
        const youtubeRegex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/)?)([\w\-]+)(\S+)?$/;
        return youtubeRegex.test(url);
    };

    const isVimeoUrl = (url) => {
        const vimeoRegex = /(?:http|https)?:?\/?\/?(?:www\.)?(?:player\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|video\/|)(\d+)(?:|\/\?)/;
        return vimeoRegex.test(url);
    };

    const isValidUrl = (url) => {
        return isYouTubeUrl(url) || isVimeoUrl(url);
    };

    const validationSchema = Yup.object({
        videoUrl: Yup.string().trim().test("is-url-valid", "URL is not valid! Please Enter Vimeo/Youtube URL", (value) => {
            return isValidUrl(value);
        }).required("Video URL is required"),
        // videoImagePath: Yup.string().trim().required("Video is required"),
        altTag: Yup.string().trim().required("Alt Tag is required"),
        displayOrder: Yup.number().typeError(ValidationMsgs.ProductConfig.displayOrderTypeError)
            .required(ValidationMsgs.ProductConfig.displayOrderRequired),
    });

    const createSizeDetails = (fields, resetForm) => {
        dispatch(setAddLoading(true))
        MediaVideoServicesCls.createMediaVideo({ storeProductAttributeVideosModel: { ...fields, ...location } })
            .then((response) => {
                if (response.data.success) {
                    dispatch(
                        setAlertMessage({
                            type: "success",
                            message: "Attribute Video Added Successfully.",
                        })
                    );
                    resetForm();
                    setVideoId("");
                    getMediaVideoData();
                    handleShowModel();
                } else {
                    dispatch(setAlertMessage({ type: "danger", message: serverError(response) }));
                }
                dispatch(setAddLoading(false))
            }).catch((errors) => {
                dispatch(
                    setAlertMessage({
                        type: "danger",
                        message: "Attribute Video is not added.",
                    })
                );
                dispatch(setAddLoading(false))
            });
    };

    const updateSizeDetails = (fields) => {
        dispatch(setAddLoading(true))
        MediaVideoServicesCls.updateMediaVideo({ storeProductAttributeVideosModel: { ...fields, ...location } })
            .then((response) => {
                if (response.data.success) {
                    dispatch(
                        setAlertMessage({
                            type: "success",
                            message: "Attribute Video updated successfully.",
                        })
                    );
                    handleShowModel();
                    getMediaVideoData();
                    setVideoId("");
                } else {
                    dispatch(setAlertMessage({ type: "danger", message: serverError(response) }));
                }
                dispatch(setAddLoading(false))
            }).catch((errors) => {
                dispatch(
                    setAlertMessage({
                        type: "danger",
                        message: "Attribute Video is not updated.",
                    })
                );
                dispatch(setAddLoading(false))
            });
    };

    const onSubmit = (fields, { resetForm }) => {
        if (VideoId) {
            updateSizeDetails(fields, resetForm);
        } else {
            createSizeDetails(fields, resetForm);
        }
    };

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ setFieldValue, errors, values }) => {
                    return (
                        <FormikForm>
                            <div id="ManageLocationModal"
                                className=" overflow-y-auto overflow-x-hidden fixed inset-0 z-30 justify-center items-center h-modal max-h-screen"
                            >
                                <div className="w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                                    <div className="relative w-full max-w-2xl">
                                        <div className="relative bg-white rounded-lg shadow ">
                                            <div className="flex justify-between items-start p-5 rounded-t border-b  sticky top-0 left-0 bg-white">
                                                <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl ">
                                                    {isAddMode ? "Add Sub Product Field" : "Edit Sub Product Field"}
                                                </h3>
                                                <button type="button"
                                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                                                    data-modal-toggle="managestoreModal"
                                                    onClick={() => {
                                                        setVideoId("");
                                                        setData({});
                                                        handleShowModel();
                                                    }}
                                                >
                                                    <svg className="w-5 h-5"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                            {/* <Messages /> */}
                                            <div className="p-6">
                                                <div className="mb-2">
                                                    <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                                                        Video URL :
                                                        <span className="text-rose-500 text-lg leading-none">*</span>
                                                    </label>
                                                    <Input name="videoUrl" />
                                                </div>

                                                <div className="mb-2">
                                                    <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                                                        Display Order :
                                                        <span className="text-rose-500 text-lg leading-none">*</span>
                                                    </label>
                                                    <Input
                                                        name="displayOrder"
                                                        maxLength={4}
                                                        onKeyPress={(event) => {
                                                            if (!/^\d*$/.test(event.key)) {
                                                                event.preventDefault();
                                                            }
                                                        }}
                                                    />
                                                </div>

                                                <div className="mb-6">
                                                    <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                                                        Upload Video/Image :
                                                        {/* <span className="text-rose-500 text-lg leading-none">*</span> */}
                                                    </label>
                                                    <div>
                                                        <FileInput
                                                            type="file"
                                                            className="sr-only"
                                                            name="videoImagePath"
                                                            id="videoImagePath"
                                                            buttonName="Add"
                                                            acceptType={"image/jpeg, image/png, image/gif, video/mp4, video/ogg, video/3gp, video/mov, video/wmv, video/avi, video/avchd, video/flv, video/f4v, video/swf, video/mkv, video/webm"}
                                                            folderpath={`${FolderPath}`}
                                                            onChange={(value) => {
                                                                setFieldValue("videoImagePath", value);
                                                            }}
                                                            fileSize={10000000}
                                                            url={values.videoImagePath}
                                                        />

                                                    </div>
                                                    {/* <div className="text-sm mt-2">
                                        Recommended size for icon logo is 1920 x 600 pixel and it's mandatory for
                                        user to compress logo via &nbsp;
                                        <a
                                            href="https://tinypng.com/"
                                            title="www.tinypng.com"
                                            className="text-indigo-500"
                                            target="_blank"
                                        >
                                            www.tinypng.com &nbsp;
                                        </a>
                                        and then upload.
                                    </div> */}
                                                </div>
                                                <div className="mb-2">
                                                    <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                                                        Alt Tag :
                                                        <span className="text-rose-500 text-lg leading-none">*</span>
                                                    </label>
                                                    <Input name="altTag" />
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-end p-6 space-x-2 rounded-b border-t border-gray-200 ">
                                                <button
                                                    data-modal-toggle="ManageLocationModal"
                                                    type="button"
                                                    className="btn bg-white border-neutral-200 text-gray-500 hover:text-gray-700"
                                                    onClick={() => {
                                                        setVideoId("");
                                                        setData({});
                                                        handleShowModel();
                                                    }}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    data-modal-toggle="ManageLocationModal"
                                                    disabled={GlobalLoading}
                                                    className={`flex justify-center btn px-6 bg-indigo-500 hover:bg-indigo-600 text-white ${(GlobalLoading) ? "bg-indigo-200 hover:bg-indigo-200" : "cursor-pointer"}`}
                                                >
                                                    <div className={`w-full flex justify-center align-middle `}>
                                                        {GlobalLoading && (
                                                            <span className="spinner-border spinner-border-sm mr-2"></span>
                                                        )}
                                                        Save
                                                    </div>
                                                </button>
                                            </div>
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

const TR = ({
    imageData,
    setVideoId,
    permission,
    setDeleteData,
    handleShowModel,
    setOpenDeleteModal,
    AdminAppConfigReducers,
}) => {
    return (
        <tr role="row">
            <td colSpan={6}>
                <div className="w-full py-2 px-4">
                    <div className="grid grid-cols-12 gap-3">
                        {imageData.length > 0 ? imageData.map((value, i) => {
                            return (
                                value.recStatus !== RecStatusValuebyName.Archived && (
                                    <div className="col-span-full lg:col-span-2 relative" key={value.id} >
                                        {/* <div className="flex flex-wrap mt-1 gap-2 break-words">
                                            <span>Video URL</span>
                                            <label>{value?.videoUrl}</label>
                                        </div> */}
                                        {(permission?.isEdit || permission?.isDelete) && (
                                            <div className="flex flex-wrap mt-1 mb-2 gap-1 justify-end">
                                                {permission?.isEdit && (
                                                    <span className="text-indigo-500 material-icons-outlined cursor-pointer" onClick={() => { setVideoId(value.id); handleShowModel(); }}>edit</span>
                                                )}
                                                {permission?.isDelete && (
                                                    <span className="text-rose-500 material-icons-outlined cursor-pointer" onClick={() => { setDeleteData(value); setOpenDeleteModal(true); }}>delete</span>
                                                )}
                                            </div>
                                        )}
                                        <div className="border-2 border-neutral-200 rounded-md shadow relative h-[350px] flex items-center justify-center">
                                            <VideoPlayer videoUrl={value?.videoUrl} onErrorImage={value?.videoImagePath} />
                                        </div>
                                        {/* <div className="flex mt-2 gap-2">
                                            <label>{value?.altTag}</label>
                                            <label>{value?.displayOrder}</label>
                                        </div> */}
                                    </div>
                                ));
                        }) : <div className="text-rose-500 text-sm text-center justify-center">No Data Found!</div>}
                    </div >
                </div >
            </td >
        </tr >
    );
};
