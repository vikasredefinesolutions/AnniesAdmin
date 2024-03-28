import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  Fragment,
} from "react";
import { ValidationMsgs } from "global/ValidationMessages";
import { useDispatch, useSelector } from "react-redux";
import { UpdateJsonDetails, serverError } from "services/common/helper/Helper";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import CategoryService from "services/admin/master/store/categoryMaster/CategoryMasterService";
import ImageFile from "components/common/formComponent/ImageFile";
import Input from "components/common/formComponent/Input";
import InputNumber from "components/common/formComponent/InputNumber";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";
import Status from "components/common/displayStatus/Status";
import { RecStatusValuebyName, UpdateMessage, anniesAnnualData, blobFolder } from "global/Enum";
import ToggleButton from "components/common/formComponent/ToggleButton";
import ConfirmDelete from "components/common/modals/ConfirmDelete";
import Image from "components/common/formComponent/Image";
import CategoryServiceCls from "services/admin/category/CategoryService";
import TopicsDetailsServicesCls from "services/admin/topics/TopicsDetailsServices";

const CategoryImages = ({
  mainCategoryId,
  storeId,
  setFormSubmit,
  index,
  activeTab,
}) => {
  const dispatch = useDispatch();
  const formRef = useRef();
  const permission = useSelector((store) => store.permission);
  const CompanyId = useSelector((store) => store?.CompanyConfiguration.id);
  const FolderPath = `/${blobFolder.temp}/${CompanyId}/${blobFolder.category}${!mainCategoryId ? "/0" : `/${mainCategoryId}`
    }`;
  const GlobalLoading = useSelector(
    (store) => store?.GlobalLoaderReducer?.toLoad
  );
  const location = useSelector((store) => store?.location);

  const [imagesList, setImagesList] = useState([]);
  const [openAddImageModal, setOpenAddImageModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [editImageData, setEditImageData] = useState({});
  const [deleteImageData, setDeleteImageData] = useState({});

  const getImagesList = useCallback(() => {
    dispatch(setAddLoading(true));

    CategoryService.imagesList({
      categoryId: mainCategoryId,
    })
      .then((response) => {
        if (response.data.success && response.data.data) {
          setImagesList(response.data.data);
        }
        dispatch(setAddLoading(false));
      })
      .catch((error) => {
        dispatch(setAddLoading(false));
      });
  }, [storeId, mainCategoryId]);

  const handleShowModel = () => {
    setOpenAddImageModal((prev) => !prev);
  };

  const handleDelete = () => {
    if (deleteImageData?.id) {
      dispatch(setAddLoading(true));
      CategoryService.deleteImage({
        args: {
          id: deleteImageData?.id || 0,
          rowVersion: deleteImageData?.rowVersion || "",
          status: RecStatusValuebyName.Archived,
          ...location,
        },
      })
        .then((response) => {
          if (response?.data?.success && response?.data?.data) {
            UpdateJsonDetails(dispatch,UpdateMessage.imageDeleted.message)
            getImagesList();
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
          dispatch(setAddLoading(false));
          dispatch(
            setAlertMessage({
              type: "danger",
              message: ValidationMsgs.category.imageNotDeleted,
            })
          );
        });
    }
  };

  useEffect(() => {
    if (storeId && mainCategoryId) {
      getImagesList();
    }
  }, [storeId, mainCategoryId]);

  useEffect(() => {
    if (activeTab == index) {
      setFormSubmit(formRef.current);
    }
  }, [formRef, setFormSubmit, activeTab]);

  return (
    <>
      <div className="w-full mb-6 last:mb-0">
        <div className="flex items-center justify-between p-6">
          <div className="flex align-center justify-left">
            <label className="flex flex-wrap uppercase tracking-wide text-gray-500 text-x font-bold mb-2">
              Images
            </label>
          </div>
          {(permission?.isEdit || permission.isDelete) && (
            <div>
              <button
                className="btn bg-indigo-500 hover:bg-indigo-600 text-white disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-gray-500"
                onClick={() => {
                  handleShowModel();
                  setEditImageData({});
                }}
              >
                <span className="material-icons-outlined">
                  add_circle_outline
                </span>
                <span>Add Images</span>
              </button>
            </div>
          )}
        </div>
        <div className="overflow-x-auto max-h-screen border-t border-neutral-200">
          <table className="table-auto w-full text-sm text-[#191919] font-semibold mb-3">
            <thead className="text-sm font-bold uppercase text-[#b3b3b3] border-b border-neutral-200">
              <tr>
                <td className="px-2 first:pl-5 py-4">SR.</td>
                <td className="px-2 first:pl-5 py-4">Images</td>
                <td className="px-2 first:pl-5 py-4">Display Order</td>
                <td className="px-2 first:pl-5 py-4">Title Tag</td>
                <td className="px-2 first:pl-5 py-4">Alt Tag</td>
                <td className="px-2 first:pl-5 py-4">Status</td>
                {(permission.isEdit || permission.isDelete) && (
                  <th className="px-2 first:pl-5 py-4">
                    <span>Action</span>
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {imagesList && imagesList.length ? (
                imagesList.map((images, index) => {
                  return (
                    <Fragment key={index}>
                      <tr>
                        <td className="px-2 first:pl-5 py-3">{index + 1}</td>
                        <td className="px-2 first:pl-5 py-3">
                          <Image
                            className="w-20"
                            containerHeight={"h-20"}
                            src={images?.categoryImage}
                          />
                        </td>
                        <td className="px-2 first:pl-5 py-3">
                          {images?.displayOrder}
                        </td>
                        <td className="px-2 first:pl-5 py-3">
                          {images?.titleTag}
                        </td>
                        <td className="px-2 first:pl-5 py-3">
                          {images?.altTag}
                        </td>
                        <td className="px-2 first:pl-5 py-3">
                          <Status type={images?.recStatus} />
                        </td>
                        <td className="px-2 first:pl-5 py-3">
                          {(permission?.isEdit || permission?.isDelete) && (
                            <div className="flex text-center">
                              <button
                                className="text-indigo-500 material-icons-outlined "
                                data-modal-toggle="editsizeModal"
                                type="button"
                                onClick={() => {
                                  handleShowModel();
                                  setEditImageData(images);
                                }}
                              >
                                <span className="material-icons-outlined">
                                  edit
                                </span>
                              </button>

                              {permission.isDelete && (
                                <button
                                  type="button"
                                  className="text-rose-500 text-2xl font-semibold material-icons-outlined"
                                  onClick={() => {
                                    setDeleteImageData(images);
                                    setOpenDeleteModal(true);
                                  }}
                                >
                                  <span className="material-icons-outlined">
                                    close
                                  </span>
                                </button>
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                    </Fragment>
                  );
                })
              ) : (
                <tr className="text-rose-500 text-center">
                  <td colspan="6" className="text-center">
                    <span className="text-rose-500 text-2xl mr-2"></span>
                    {ValidationMsgs.common.noDataFound}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmDelete
        handleDelete={handleDelete}
        data={deleteImageData}
        message="Deleting these Image will permanently remove this record from your account. This can't be undone"
        title={"Delete"}
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
      />

      {openAddImageModal && (
        <AddImagesModel
          handleShowModel={handleShowModel}
          editImageData={editImageData}
          getImagesList={getImagesList}
          location={location}
          mainCategoryId={mainCategoryId}
          FolderPath={FolderPath}
          GlobalLoading={GlobalLoading}
          CategoryService={CategoryService}
        />
      )}
    </>
  );
};

export default CategoryImages;

export const AddImagesModel = ({
  handleShowModel,
  getImagesList,
  location,
  mainCategoryId,
  FolderPath,
  GlobalLoading,
  editImageData,
}) => {
  const dispatch = useDispatch();
  const [editData, setEditData] = useState({});

  const initialValues = {
    id: editData?.id || 0,
    rowVersion: editData?.rowVersion || "",
    categoryId: mainCategoryId,
    categoryImage: editData?.categoryImage || "",
    displayOrder: editData?.displayOrder || "",
    recStatus: editData?.recStatus || RecStatusValuebyName.Active,
    altTag: editData?.altTag || "",
    titleTag: editData?.titleTag || "",
  };

  const validationSchema = Yup.object({
    categoryImage: Yup.string().required("Image is required."),
    displayOrder: Yup.number().required("Display order is required."),
  });

  const getImageByIdData = useCallback(() => {
    if (editImageData?.id) {
      dispatch(setAddLoading(true));
      CategoryService.getImageById(editImageData?.id)
        .then((response) => {
          if (response.data.success && response.data.data) {
            setEditData(response.data.data);
          }
          dispatch(setAddLoading(false));
        })
        .catch((error) => {
          dispatch(setAddLoading(false));
        });
    }
  }, [editImageData?.id]);

  const onSubmit = (fields) => {
    if (!editImageData?.id) {
      createCategoryImage(fields);
    } else {
      updateCategoryImage(fields);
    }
  };

  const createCategoryImage = (fields) => {
    dispatch(setAddLoading(true));
    CategoryService.createMultipleImages({
      multipleCategoryImagesModel: [{ ...fields, ...location }],
    })
      .then((response) => {
        if (response.data.success && response.data.data) {
          UpdateJsonDetails(dispatch,UpdateMessage.imageCreated.message)
          getImagesList();
          handleShowModel();
        } else {
          dispatch(
            setAlertMessage({ type: "danger", message: serverError(response) })
          );
        }
        dispatch(setAddLoading(false));
      })
      .catch((error) => {
        dispatch(
          setAlertMessage({
            type: "danger",
            message: ValidationMsgs.category.imageNotCreated,
          })
        );
        dispatch(setAddLoading(false));
      });
  };

  const updateCategoryImage = (fields) => {
    dispatch(setAddLoading(true));
    CategoryService.updateMultipleImages({
      multipleCategoryImagesModel: { ...fields, ...location },
    })
      .then((response) => {
        if (response.data.success && response.data.data) {
          UpdateJsonDetails(dispatch,UpdateMessage.imageUpdated.message)
          getImagesList();
          handleShowModel();
        } else {
          dispatch(
            setAlertMessage({ type: "danger", message: serverError(response) })
          );
        }
        dispatch(setAddLoading(false));
      })
      .catch((error) => {
        dispatch(
          setAlertMessage({
            type: "danger",
            message: ValidationMsgs.category.imageNotUpdated,
          })
        );
        dispatch(setAddLoading(false));
      });
  };

  useEffect(() => {
    if (editImageData?.id) {
      getImageByIdData();
    }
  }, [editImageData?.id]);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ setFieldValue, values }) => {
        return (
          <FormikForm>
            <div
              id="ImagesModel"
              className=" overflow-y-auto overflow-x-hidden fixed inset-0 z-30 justify-center items-center h-modal max-h-screen"
            >
              <div className="w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                <div className="relative w-full max-w-2xl">
                  <div className="relative bg-white rounded-lg shadow">
                    <div className="flex justify-between items-start p-5 rounded-t border-b  sticky top-0 left-0 bg-white">
                      <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl ">
                        Add Category Image
                        {/* {isAddMode
                          ? "Add Product Availability"
                          : "Edit Product Availability"} */}
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
                      <div className="mb-4">
                        <label
                          className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                          htmlFor=""
                        >
                          Category Image :
                          <span className="text-rose-500 text-2xl leading-none">
                            *
                          </span>
                        </label>
                        <ImageFile
                          type="file"
                          className="sr-only"
                          name="categoryImage"
                          id="categoryImage"
                          buttonName="Add"
                          folderpath={`${FolderPath}`}
                          onChange={(value) => {
                            setFieldValue("categoryImage", value);
                          }}
                          url={values.categoryImage}
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                          htmlFor=""
                        >
                          Display Order :
                          <span className="text-rose-500 text-2xl leading-none">
                            *
                          </span>
                        </label>
                        <InputNumber
                          name={`displayOrder`}
                          placeholder="Display Order"
                          value={values?.displayOrder}
                          displayError={true}
                          type={"number"}
                          onKeyPress={(event) => {
                            if (!/^\d*$/.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                          onChange={(e) => {
                            setFieldValue(`displayOrder`, e.target.value);
                          }}
                        />
                      </div>

                      <div className="mb-4">
                        <label
                          className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                          htmlFor=""
                        >
                          Title Tag :
                        </label>
                        <Input id={"titleTag"} name={"titleTag"} />
                      </div>

                      <div className="mb-4">
                        <label
                          className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                          htmlFor=""
                        >
                          Alt Tag :
                        </label>
                        <Input id={"altTag"} name={"altTag"} />
                      </div>

                      <div className="mb-4">
                        <label
                          className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                          htmlFor=""
                        >
                          Status :
                        </label>
                        <ToggleButton
                          name="recStatus"
                          id="recStatus"
                          onChange={(e) => {
                            setFieldValue(
                              "recStatus",
                              e.target.checked
                                ? RecStatusValuebyName.Active
                                : RecStatusValuebyName.Inactive
                            );
                          }}
                          size="m"
                          on="Active"
                          off="Inactive"
                          defaultValue={
                            values.recStatus === RecStatusValuebyName.Active
                              ? true
                              : false
                          }
                          setFieldValue={setFieldValue}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-end p-6 space-x-2 rounded-b border-t border-gray-200 ">
                      <button
                        data-modal-toggle="ManageLocationModal"
                        type="button"
                        className="btn bg-white border-neutral-200 text-gray-500 hover:text-gray-700"
                        onClick={handleShowModel}
                      >
                        Cancel
                      </button>
                      <button
                        data-modal-toggle="ManageLocationModal"
                        disabled={GlobalLoading}
                        type="submit"
                        className={`flex justify-center btn px-6 bg-indigo-500 hover:bg-indigo-600 text-white ${
                          GlobalLoading
                            ? "bg-indigo-200 hover:bg-indigo-200"
                            : "cursor-pointer"
                        }`}
                      >
                        <div
                          className={`w-full flex justify-center align-middle `}
                        >
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
  );
};
