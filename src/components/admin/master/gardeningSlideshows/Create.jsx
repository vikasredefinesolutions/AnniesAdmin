import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";

import { RecStatusValuebyName, anniesAnnualData, blobFolder } from "global/Enum";
import { ValidationMsgs } from "global/ValidationMessages";

import SlideShowServices from "services/admin/SlideShowMaster/SlideShowServices";
import { serverError } from "services/common/helper/Helper";

import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";

import CreateFileHeader from "components/common/CreateFileHeader";
import Messages from "components/common/alerts/messages/Index";
// import ImageFile from "components/common/formComponent/ImageFile";
import ConfirmDelete from "components/common/modals/ConfirmDelete";
import Input from "components/common/formComponent/Input";
import InputNumber from 'components/common/formComponent/InputNumber';
import Image from "components/common/formComponent/Image";

import AddSlidesModal from "./AddSlidesModal";

const Create = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    let navigate = useNavigate();

    // const CompanyId = useSelector((store) => store?.CompanyConfiguration.id)
    const location = useSelector((store) => store?.location);

    const [data, setData] = useState([]);
    const [SlideShowListData, setSlideShowListData] = useState([]);
    const [singleSlideData, setSingleSlideData] = useState(null);
    const [openAddSlidesModal, setopenAddSlidesModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const isAddMode = !id;

    const storeId = anniesAnnualData.storeId;

    // const FolderPath = `/${blobFolder.temp}/${CompanyId}/${blobFolder.SlideShowMaster}`

    const initialValues = {
        id: data?.id || 0,
        storeId: storeId,
        displayOrder: data?.displayOrder || 0,
        rowVersion: data?.rowVersion || "",
        recStatus: data?.recStatus || RecStatusValuebyName.Active,
        title: data?.title || "",
        description: data?.description || "",
        slides: data?.slides || 0,
        imagePath: data?.imagePath || "",
        author: data?.author || "",
    };

    const getGardeningSlideShowDataById = useCallback(() => {
        dispatch(setAddLoading(true))

        SlideShowServices.listSlideShowById(id).then((res) => {
            var response = res.data;
            if (response.success) {
                setData(response.data);
            } else {
                dispatch(setAlertMessage({
                    type: 'danger',
                    message: ValidationMsgs.SlideShow.notFound
                }));
                navigate('/admin/Master/GardeningSlideshows');
            }
            dispatch(setAddLoading(false))
        }).catch((err) => {
            dispatch(setAddLoading(false));
        });
    }, [id]);

    const getAllSlideDetailaData = useCallback((pageIndex = 1) => {
        dispatch(setAddLoading(true));
        SlideShowServices.getAllSlidesDetails({
            args: {
                pageSize: 0,
                pageIndex: 1,
                pagingStrategy: 0,
                sortingOptions: [],
                filteringOptions: [],
                storeId: storeId
            },
            slideMasterId: id
        }).then((response) => {
            if (response?.data?.success && response?.data?.data) {
                const sortedBasedOnDisplayOrder = response.data?.data?.items.sort(function (a, b) {
                    return a.displayOrder - b.displayOrder;
                })
                setSlideShowListData(sortedBasedOnDisplayOrder);
            }
            dispatch(setAddLoading(false));
        });
    }, [id]);

    const validationSchema = Yup.object({
        title: Yup.string().min(3, ValidationMsgs.SlideShow.minThree).required(ValidationMsgs.SlideShow.title),
        author: Yup.string().min(3, ValidationMsgs.SlideShow.minThree).required(ValidationMsgs.SlideShow.author),
    });

    const onSubmit = (fields) => {
        if (isAddMode) {
            createSlideShow(fields);
        } else {
            updateSlideShow(fields);
        }
    };

    const createSlideShow = (fields) => {
        dispatch(setAddLoading(true));
        SlideShowServices.createSlideShow({
            slideShowMasterModel: {
                ...fields,
                ...location,
            },
        }).then((response) => {
            if (response?.data?.success && response?.data?.data) {
                dispatch(
                    setAlertMessage({
                        type: "success",
                        message: ValidationMsgs.SlideShow.created,
                    })
                );
                navigate(
                    `/admin/Master/GardeningSlideshows/edit/${response?.data?.data?.id}`
                );
            } else {
                dispatch(
                    setAlertMessage({
                        type: "danger",
                        message: serverError(response),
                    })
                );
            }
            dispatch(setAddLoading(false));
        }).catch((error) => {
            dispatch(
                setAlertMessage({
                    type: "danger",
                    message: ValidationMsgs.SlideShow.notCreated,
                })
            );
            dispatch(setAddLoading(false));
        });
    };

    const updateSlideShow = (fields) => {
        dispatch(setAddLoading(true));
        SlideShowServices.updateSlideShow({
            slideShowMasterModel: {
                ...fields,
                ...location,
            },
        })
            .then((response) => {
                if (response?.data?.success && response?.data?.data) {
                    dispatch(
                        setAlertMessage({
                            type: "success",
                            message: ValidationMsgs.SlideShow.updated,
                        })
                    );
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
            .catch((error) => {
                dispatch(
                    setAlertMessage({
                        type: "danger",
                        message: ValidationMsgs.SlideShow.notUpdated,
                    })
                );
                dispatch(setAddLoading(false));
            });
    };

    const handleAddSlidesModel = () => {
        setSingleSlideData(null)
        setopenAddSlidesModal((prev) => !prev)
    }

    const handleEditSlideDetail = (data) => {
        handleAddSlidesModel();
        setSingleSlideData(data)
    }

    const handleDeleteSlideDetail = (data) => {
        setOpenDeleteModal(true)
        setSingleSlideData(data)
    }

    const DeleteSlideDetailFunc = useCallback((data) => {
        dispatch(setAddLoading(true))
        console.log("data ", data, singleSlideData);
        SlideShowServices.updateSlideDetailStatus({
            "args": {
                "id": data?.id,
                "rowVersion": data?.rowVersion,
                "status": RecStatusValuebyName.Archived,
                ...location,
            }
        })
            .then((response) => {
                if (response.data.success) {
                    dispatch(
                        setAlertMessage({
                            type: "success",
                            message: ValidationMsgs.SlideShow.SlidesDeleted,
                        })
                    );
                    getAllSlideDetailaData()
                } else {
                    dispatch(
                        setAlertMessage({ type: "danger", message: serverError(response) })
                    );
                }
                dispatch(setAddLoading(false))

            })
            .catch((errors) => {
                dispatch(
                    setAlertMessage({
                        type: "danger",
                        message: ValidationMsgs.SlideShow.SlidesNotDeleted,
                    })
                );
                dispatch(setAddLoading(false))

            });
    }, []);

    useEffect(() => {
        if (id) {
            getGardeningSlideShowDataById()
            getAllSlideDetailaData()
        }
    }, [id])

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
                            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full">
                                {/* PAGE HEADER */}
                                <CreateFileHeader
                                    url={`/admin/Master/GardeningSlideshows`}
                                    module={
                                        isAddMode ? "Create Gardening Slideshows" : "Edit Gardening Slideshows"
                                    }
                                    errors={errors}
                                />
                                <Messages />
                                <div className="w-full bg-white shadow rounded-md border border-neutral-200 p-6 mb-6">
                                    <div className="block uppercase tracking-wide text-gray-500 text-lg font-bold mb-4"> Gardening Slideshows Information </div>
                                    {/* <div className="w-full mb-6 last:mb-0">
                                        <div className="col-span-full lg:col-span-6">
                                            <label
                                                className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                                                htmlFor="#"
                                            >
                                                GARDENING SLIDESHOWS IMAGE

                                            </label>
                                            <div className="grid grid-cols-12 gap-6 w-full">
                                                <ImageFile
                                                    type="file"
                                                    className="sr-only"
                                                    name="imagePath"
                                                    id="imagePath"
                                                    buttonName="Add"
                                                    onChange={(value) => {
                                                        setFieldValue("imagePath", value);
                                                    }}
                                                    folderpath={`${FolderPath}`}
                                                    url={values.imagePath}
                                                />
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="w-full mb-6 last:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"> Title <span className="text-rose-500 text-2xl leading-none" >*</span> </label>
                                        <Input name="title" id="title" type="text" maxLength={60} placeholder="Add Title" />
                                    </div>
                                    <div className="w-full mb-6 last:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">Slides</label>
                                        <InputNumber name={'slides'} allowNegative={false} value={values.slides} displayError={true} onChange={(e) => { setFieldValue('slides', e.target.value) }} placeholder="Add Slides as number only" />
                                    </div>
                                    <div className="w-full mb-6 last:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">Author<span className="text-rose-500 text-2xl leading-none">*</span></label>
                                        <Input name="author" id="author" type="text" maxLength={60} placeholder="Add Author" />
                                    </div>
                                    <div className="w-full p-6 flex flex-wrap items-center justify-between">
                                        <label className="block uppercase tracking-wide text-gray-500 text-lg font-bold mb-4">Slides Details</label>
                                        <div className="">
                                            <button type="button" disabled={!id} data-modal-toggle="addSlideModal" className="btn bg-indigo-500 hover:bg-indigo-600 text-white" onClick={handleAddSlidesModel}>
                                                <span className="material-icons-outlined">add_circle_outline</span>
                                                <span className="ml-1">Add Slide</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="w-full pt-0" x-data="handler()">
                                        <div className="overflow-x-auto max-h-screen border-t border-neutral-200">
                                            {(SlideShowListData && Array.isArray(SlideShowListData) && SlideShowListData.length > 0) ? <table className="table-auto w-full text-sm text-[#191919] font-semibold">
                                                {/* Table header */}
                                                <thead className="text-sm font-bold uppercase text-[#b3b3b3] border-b border-neutral-200">
                                                    <tr>
                                                        <th className="first:pl-5  py-4 whitespace-nowrap text-center">
                                                            <div className="font-semibold ">
                                                                <span>Sr.</span>
                                                            </div>
                                                        </th>
                                                        <th className="w-[8vw] py-4 whitespace-nowrap text-center flex justify-center">
                                                            <div className=" font-semibold">
                                                                <span>Slides Image</span>
                                                            </div>
                                                        </th>
                                                        <th className="w-[30%] py-4 whitespace-nowrap">
                                                            <div className=" font-semibold ">
                                                                <span>Slides Name</span>
                                                            </div>
                                                        </th>
                                                        <th className="w-[30%] py-4 whitespace-nowrap">
                                                            <div className=" font-semibold ">
                                                                <span>Slides Link</span>
                                                            </div>
                                                        </th>
                                                        <th className="w-[10%] py-4 whitespace-nowrap text-center">
                                                            <div className="font-semibold ">
                                                                <span>Display Order</span>
                                                            </div>
                                                        </th>
                                                        <th className="w-[10%] py-4 whitespace-nowrap"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        SlideShowListData.map((singleSlideShowListData, index) => {
                                                            return (<tr key={index}>
                                                                <td className="first:pl-5 py-3 text-center">
                                                                    <div>{index + 1}.</div>
                                                                </td>
                                                                <td className="w-[8vw] py-3 flex justify-center cursor-pointer" onClick={() => handleEditSlideDetail(singleSlideShowListData)}>
                                                                    <div className="h-14 w-14 flex items-center justify-center overflow-hidden  box-content rounded-full border bg-white">
                                                                        <Image
                                                                            className="max-h-full"
                                                                            src={singleSlideShowListData?.imagePath}
                                                                            alt={singleSlideShowListData?.imagePath}
                                                                        />
                                                                    </div>
                                                                </td>
                                                                <td className="w-[30%] py-3 cursor-pointer" onClick={() => handleEditSlideDetail(singleSlideShowListData)}>
                                                                    <div className="p-2">{singleSlideShowListData?.name}</div>
                                                                </td>
                                                                <td className="w-[30%] py-3">
                                                                    <div className=" p-2">{singleSlideShowListData?.slideLink}</div>
                                                                </td>
                                                                <td className="w-[10%] py-3 text-center">
                                                                    <div className="p-2">{singleSlideShowListData?.displayOrder}</div>
                                                                </td>
                                                                <td className="w-[10%] py-3 text-right">
                                                                    <div>
                                                                        <button
                                                                            className="text-indigo-500"
                                                                            data-modal-toggle="editcatalogModal"
                                                                            type="button"
                                                                            onClick={() => handleEditSlideDetail(singleSlideShowListData)}
                                                                        >
                                                                            <span className="material-icons-outlined">
                                                                                edit
                                                                            </span>
                                                                        </button>

                                                                        <button
                                                                            type="button"
                                                                            className="text-rose-500 text-2xl font-semibold"
                                                                            onClick={() => handleDeleteSlideDetail(singleSlideShowListData)}
                                                                        >
                                                                            <span className="material-icons-outlined">
                                                                                close
                                                                            </span>
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>)
                                                        })
                                                    }
                                                </tbody>
                                            </table> : <div className="flex w-full uppercase font-bold text-sm mb-1 ml-8 text-rose-500 justify-center items-center mt-8 "><span className="text-rose-500 text-2xl mr-2 ">*</span>No Slides Added Till Now!</div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FormikForm>
                    );
                }}
            </Formik>

            {
                openAddSlidesModal && (
                    <AddSlidesModal
                        handleShowModel={handleAddSlidesModel}
                        singleSlideData={singleSlideData}
                        slideShowMasterId={id}
                        SlideShowListData={SlideShowListData}
                        getAllSlideDetailaData={getAllSlideDetailaData}
                    />
                )
            }

            <ConfirmDelete
                handleDelete={DeleteSlideDetailFunc}
                data={singleSlideData}
                message="Deleting this Slide will permanently remove this record from your account. This can't be undone"
                title={"Delete"}
                openDeleteModal={openDeleteModal}
                setOpenDeleteModal={setOpenDeleteModal}
            />

        </>
    );
};

export default Create;
