import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";

import { RecStatusValuebyName, blobFolder, anniesAnnualData } from "global/Enum";

import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";

import { ValidationMsgs } from "global/ValidationMessages";

import SlidesServices from "services/admin/SlideShowMaster/SlideShowServices";
import { serverError } from "services/common/helper/Helper";

import Input from "components/common/formComponent/Input";
import ImageFile from "components/common/formComponent/ImageFile";
import InputNumber from 'components/common/formComponent/InputNumber';

const AddSlidesModal = ({ singleSlideData, handleShowModel, slideShowMasterId, SlideShowListData, getAllSlideDetailaData }) => {
  const dispatch = useDispatch();

  const CompanyId = useSelector((store) => store?.CompanyConfiguration.id)

  const [data, setData] = useState(null);

  const FolderPath = `/${blobFolder.temp}/${CompanyId}/${blobFolder.SlideShowMaster}/${blobFolder.slides}`

  const initialValues = {
    name: data?.name || "",
    slideImagePath: data?.imagePath || "",
    displayOrder: data?.displayOrder || SlideShowListData[SlideShowListData?.length - 1]?.displayOrder + 1 || 1,
    slideLink: data?.slideLink || "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().trim().required(ValidationMsgs.SlideShow.SlideName),
    slideImagePath: Yup.string().trim().required(ValidationMsgs.SlideShow.SlideImagePath),
    displayOrder: Yup.number().required(ValidationMsgs.SlideShow.SlidedisplayOrder),
    slideLink: Yup.string().required(ValidationMsgs.SlideShow.SlideSlideLink),
  });

  const CreateSlides = ({ slideImagePath, ...fields }, resetForm) => {

    const payload = {
      "id": 0,
      "rowVersion": "",
      "name": "string",
      "description": "",
      "slideLink": "",
      "displayOrder": SlideShowListData[SlideShowListData?.length - 1]?.displayOrder + 1,
      "storeId": anniesAnnualData.storeId,
      "slideShowMasterId": slideShowMasterId || 0,
      "recStatus": RecStatusValuebyName.Active
    }

    dispatch(setAddLoading(true))

    SlidesServices.createSlides({ slideShowDetailsModel: { ...payload, ...fields, imagePath: slideImagePath } }).then((response) => {
      if (response.data.success) {
        dispatch(
          setAlertMessage({
            type: "success",
            message: ValidationMsgs.SlideShow.SlidesCreated,
          })
        );
        resetForm({});
        handleShowModel();
        getAllSlideDetailaData();
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
            message: ValidationMsgs.SlideShow.SlidesNotCreated,
          })
        );
        dispatch(setAddLoading(false))

      });
  };

  const UpdateSlides = ({ slideImagePath, ...fields }, resetForm) => {

    const payload = {
      "id": data?.id || 0,
      "rowVersion": data?.rowVersion || "",
      "name": data?.name || "",
      "description": "",
      "slideLink": data?.slideLink || "",
      "displayOrder": parseInt(data?.slideLink) || 1,
      "storeId": data?.storeId,
      "slideShowMasterId": data?.slideShowMasterId || 0,
      "recStatus": RecStatusValuebyName.Active
    }

    dispatch(setAddLoading(true))

    SlidesServices.updateSlides({ slideShowDetailsModel: { ...payload, ...fields, imagePath: slideImagePath } })
      .then((response) => {
        if (response.data.success) {
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.SlideShow.SlidesUpdated,
            })
          );
          resetForm({});
          handleShowModel();
          getAllSlideDetailaData()
        } else {
          dispatch(
            setAlertMessage({ type: "danger", message: serverError(response) })
          );
        }
        dispatch(setAddLoading(false))

      })
      .catch((errors) => {
        console.log("error ", errors);
        dispatch(
          setAlertMessage({
            type: "danger",
            message: ValidationMsgs.SlideShow.SlidesNotUpdated,
          })
        );
        dispatch(setAddLoading(false))

      });
  };

  const getSlidesById = useCallback(() => {
    dispatch(setAddLoading(true))

    SlidesServices.getSlidesById(singleSlideData?.id)
      .then((res) => {
        var response = res.data;
        if (response.success) {
          setData({ ...response.data });
        }
        dispatch(setAddLoading(false))
      })
      .catch((err) => {
        dispatch(setAddLoading(false))
      });
  }, [singleSlideData?.id])

  const onSubmit = (fields, { resetForm }) => {
    if (singleSlideData?.id) {
      UpdateSlides(fields, resetForm);
    } else {
      CreateSlides(fields, resetForm);
    }
  };

  useEffect(() => {
    if (singleSlideData?.id) {
      getSlidesById();
    }
  }, [singleSlideData?.id]);

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ setFieldValue, values }) => {
          return (
            <FormikForm>
              <div className="overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center h-modal max-h-screen">
                <div className="w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="relative w-full max-w-2xl">
                    <div className="relative bg-white rounded-lg shadow ">
                      <div className="flex justify-between items-start p-5 rounded-t border-b  sticky top-0 left-0 bg-white">
                        <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl ">
                          Add Slides
                        </h3>
                        <button
                          type="button"
                          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                          data-modal-toggle="managestoreModal"
                          onClick={handleShowModel}
                        >
                          <svg
                            className="w-5 h-5"
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
                      <div className="p-6">
                        <div className="col-span-full lg:col-span-6 mb-6">
                          <label
                            className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                            htmlFor="#"
                          >
                            Image <span className="text-rose-500 text-2xl leading-none" >*</span>
                          </label>
                          <div className="grid grid-cols-12 gap-6 w-full">
                            <ImageFile
                              type="file"
                              className="sr-only"
                              name="slideImagePath"
                              id="slideImagePath"
                              buttonName="Add"
                              onChange={(value) => {
                                setFieldValue("slideImagePath", value);
                              }}
                              folderpath={`${FolderPath}`}
                              url={values.slideImagePath}
                            />
                          </div>
                        </div>

                        <div className="w-full mb-6 last:mb-0">
                          <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"> Name <span className="text-rose-500 text-2xl leading-none" >*</span> </label>
                          <Input name="name" id="name" type="text" placeholder="Add Name" />
                        </div>
                        <div className="w-full mb-6 last:mb-0">
                          <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"> Link <span className="text-rose-500 text-2xl leading-none" >*</span> </label>
                          <Input name="slideLink" id="slideLink" type="text" placeholder="Add Slide Link" target="_blank" />
                        </div>
                        <div className="w-full mb-6 last:mb-0">
                          <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"> Display Order <span className="text-rose-500 text-2xl leading-none" >*</span> </label>
                          <InputNumber name={'displayOrder'} allowNegative={false} value={values.displayOrder} displayError={true} onChange={(e) => { setFieldValue('displayOrder', e.target.value) }} placeholder="Display Order in Number Only Like: 1" />
                        </div>

                      </div>
                      <div className="flex items-center justify-end p-6 space-x-2 rounded-b border-t border-gray-200 ">
                        <button
                          type="button"
                          className="btn bg-white border-neutral-200 text-gray-500 hover:text-gray-700"
                          onClick={handleShowModel}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className={`flex justify-center btn px-6 bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer`}
                        >
                          <div className={`w-full flex justify-center align-middle `}>
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

export default AddSlidesModal;
