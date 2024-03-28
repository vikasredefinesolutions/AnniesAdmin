import React, { useCallback, useEffect, useState } from "react";
import { Formik, Form as FormikForm } from "formik";
import CreateFileHeader from "components/common/CreateFileHeader";
import Dropdown from "../../../../../common/formComponent/Dropdown";
import {
  RecStatusValue,
  RecStatusValuebyName,
  anniesAnnualData,
} from "global/Enum";
import Input from "components/common/formComponent/Input";
import ProductCustomFieldsServices from "services/admin/productCustomFields/ProductCustomFieldsServices";
import { useDispatch, useSelector } from "react-redux";
import DropdownServiceCls from "services/common/dropdown/DropdownService";
import ToggleButton from "components/common/formComponent/ToggleButton";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { TitleNameHelper, serverError } from "services/common/helper/Helper";
import Messages from "components/common/alerts/messages/Index";
import { useNavigate, useParams } from "react-router-dom";
import Status from "components/common/displayStatus/Status";
import AddProductCustomFieldModel from "./AddProductCustomFieldModel";
import ConfirmDelete from "components/common/modals/ConfirmDelete";
import { ValidationMsgs } from "global/ValidationMessages";
import * as Yup from "yup";

const Create = () => {
  const { id } = useParams();
  const isAddMode = !id;
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const permission = useSelector((store) => store.permission);
  const location = useSelector((store) => store?.location);
  const [controlTypeOptions, setControlTypeOptions] = useState([]);
  const [data, setData] = useState({});
  const [customFieldsValue, setCustomFieldsValue] = useState([]);
  const [deleteFieldsData, setDeleteFieldsData] = useState({});
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAddFieldsModal, setOpenAddFieldsModal] = useState(false);
  const [editFieldsData, setEditFieldsData] = useState({});

  const storeId = anniesAnnualData.storeId;

  const initialValues = {
    id: data?.id || 0,
    customFieldName: data?.customFieldName || "",
    characterLimit: data?.characterLimit || 0,
    customFieldType: data?.customFieldType || "",
    storeId: storeId,
    isMandatory: data?.isMandatory || false,
    displayOrder: data?.displayOrder || 0,
    ...location,
    rowVersion: data?.rowVersion || "",
    recStatus: data?.recStatus || RecStatusValuebyName.Active,
  };

  const validationSchema = Yup.object({
    customFieldName: Yup.string().required(
      ValidationMsgs.productCustomFields.nameRequired
    ),
    customFieldType: Yup.string().required(
      ValidationMsgs.productCustomFields.controlType
    ),
    displayOrder: Yup.number().required(
      ValidationMsgs.productCustomFields.displayOrderNumber
    ),
  });

  const onSubmit = (fields) => {
    if (isAddMode) {
      createProductCustomFields(fields);
    } else {
      updateProductCustomFields(fields);
    }
  };

  const createProductCustomFields = (fields) => {
    dispatch(setAddLoading(true));
    ProductCustomFieldsServices.createProductCustomFields({
      masterFilterCustomFieldsModel: {
        ...fields,
        characterLimit: fields.characterLimit == "" ? 0 : fields.characterLimit,
      },
    })
      .then((response) => {
        if (response?.data?.success && response?.data?.data) {
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.productCustomFields.created,
            })
          );
          navigate(
            `/admin/Master/Configuration/ProductCustom/edit/${response?.data?.data?.id}`
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
            message: ValidationMsgs.productCustomFields.notCreated,
          })
        );
        dispatch(setAddLoading(false));
      });
  };

  const updateProductCustomFields = (fields) => {
    dispatch(setAddLoading(true));
    ProductCustomFieldsServices.updateProductCustomFields({
      masterFilterCustomFieldsModel: {
        ...fields,
        characterLimit: fields.characterLimit == "" ? 0 : fields.characterLimit,
      },
    })
      .then((response) => {
        if (response?.data?.success && response?.data?.data) {
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.productCustomFields.updated,
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
            message: ValidationMsgs.productCustomFields.notUpdated,
          })
        );
        dispatch(setAddLoading(false));
      });
  };

  const getProductCustomFieldsByIdData = () => {
    if (id) {
      dispatch(setAddLoading(true));
      ProductCustomFieldsServices.getProductCustomFieldsById(id)
        .then((response) => {
          if (response?.data?.success && response?.data?.data) {
            setData(response.data.data);
          }
          dispatch(setAddLoading(false));
        })
        .catch((error) => {
          dispatch(setAddLoading(false));
        });
    }
  };

  const MasterFilterCustomFieldsValue = useCallback(() => {
    if (id) {
      dispatch(setAddLoading(true));
      ProductCustomFieldsServices.getCustomFieldList(id)
        .then((response) => {
          if (response.data.success && response.data.data) {
            setCustomFieldsValue(response.data.data);
          }
          dispatch(setAddLoading(false));
        })
        .catch((error) => {
          dispatch(setAddLoading(false));
        });
    }
  }, [id]);

  const handleDelete = () => {
    if (deleteFieldsData?.id) {
      dispatch(setAddLoading(true));
      ProductCustomFieldsServices.deleteMasterFilterCustomFieldsValue({
        args: {
          id: deleteFieldsData?.id || 0,
          rowVersion: deleteFieldsData?.rowVersion || "",
          status: RecStatusValuebyName.Archived,
          ...location,
        },
      })
        .then((response) => {
          if (response?.data?.success && response?.data?.data) {
            dispatch(
              setAlertMessage({
                type: "success",
                message: ValidationMsgs.productCustomFields.deleted,
              })
            );
            MasterFilterCustomFieldsValue();
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
              message: ValidationMsgs.productCustomFields.notDeleted,
            })
          );
        });
    }
  };

  const handleShowModel = () => {
    setOpenAddFieldsModal((prev) => !prev);
  };

  useEffect(() => {
    if (id) {
      getProductCustomFieldsByIdData();
      MasterFilterCustomFieldsValue();
    }
  }, [id]);

  useEffect(() => {
    DropdownServiceCls.getDropdownValues("controltype").then((response) => {
      if (response.data.success && response.data.data) {
        const finalData = response.data.data.map((value) => ({
          label: value.label,
          value: value.label,
        }));
        setControlTypeOptions(finalData);
      }
    });
  }, []);

  return (
    <>
      <title>
        {isAddMode ? "Add " : "Edit "} {TitleNameHelper({ defaultTitleName: "Product Custom" })}
      </title>

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
                  url={`/admin/Master/Configuration/ProductCustom`}
                  module={`${isAddMode ? 'Add' : 'Edit'} ${TitleNameHelper({ defaultTitleName: "Product Custom" })}`}
                  errors={errors}
                />
                {!openAddFieldsModal && <Messages />}
                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-full xl:col-span-9">
                    <div className="w-full bg-white shadow rounded-md p-6 mb-6">
                      <div className="flex flex-wrap mx-[-15px]">
                        <div className="w-full lg:w-1/2 mb-6 px-[15px] relative">
                          <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                            Configurator Name
                            <span className="text-rose-500 text-2xl leading-none">
                              *
                            </span>
                          </label>
                          <Input
                            type={"text"}
                            name={`customFieldName`}
                            className={`block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md`}
                          />
                        </div>

                        <div className="w-full lg:w-1/2 mb-6 px-[15px] relative">
                          <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                            Control Type
                            <span className="text-rose-500 text-2xl leading-none">
                              *
                            </span>
                          </label>
                          <Dropdown
                            label="customFieldType"
                            defaultValue={values.customFieldType}
                            isMulti={false}
                            name="customFieldType"
                            options={controlTypeOptions}
                            isSearchable={false}
                          />
                        </div>
                        <br />

                        <div className="w-full lg:w-1/2 mb-6 px-[15px] relative">
                          <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                            Display Order
                            <span className="text-rose-500 text-2xl leading-none">
                              *
                            </span>
                          </label>
                          <Input
                            type={"text"}
                            name={`displayOrder`}
                            id="displayOrder"
                            className={`block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md`}
                          />
                        </div>

                        {values.customFieldType.toLowerCase() === "textbox" && (
                          <div className="w-full lg:w-1/2 mb-6 px-[15px] relative">
                            <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                              Character Limit
                              <span className="text-rose-500 text-2xl leading-none"></span>
                            </label>
                            <Input
                              type={"text"}
                              name={`characterLimit`}
                              id="characterLimit"
                              className={`block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md`}
                            />
                          </div>
                        )}

                        <div className="w-full lg:w-1/2 mb-6 px-[15px] relative">
                          <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                            is Mandatory
                            <span className="text-rose-500 text-2xl leading-none"></span>
                          </label>
                          <ToggleButton
                            name="isMandatory"
                            id="isMandatory"
                            onChange={(e) =>
                              setFieldValue("isMandatory", e.target.checked)
                            }
                            defaultValue={values.isMandatory}
                            setFieldValue={setFieldValue}
                          />
                        </div>
                      </div>

                      {(values.customFieldType.toLowerCase() === "dropdown" ||
                        values.customFieldType.toLowerCase() === "multidropdown" ||
                        values.customFieldType.toLowerCase() === "checkbox" ||
                        values.customFieldType.toLowerCase() === "radio") && (
                          <div className="w-full bg-white shadow-lg rounded-md border border-neutral-200 mb-6">
                            <div className="w-full mb-6 last:mb-0">
                              <div className="flex items-center justify-between p-6">
                                <div className="flex align-center justify-left">
                                  <div>
                                    <label className="flex flex-wrap uppercase tracking-wide text-gray-500 text-x font-bold mb-2">
                                      Product Custom Fields
                                      <span className="text-rose-500 text-2xl leading-none">
                                        *
                                      </span>
                                    </label>
                                  </div>
                                </div>

                                {(permission?.isEdit || permission.isDelete) && (
                                  <div>
                                    <button
                                      onClick={() => {
                                        handleShowModel();
                                        setEditFieldsData({});
                                      }}
                                      type="button"
                                      title=""
                                      data-modal-toggle="addsizeModal"
                                      className="btn bg-indigo-500 hover:bg-indigo-600 text-white disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-gray-500"
                                      disabled={isAddMode}
                                    >
                                      <span className="material-icons-outlined">
                                        add_circle_outline
                                      </span>
                                      <span className="ml-1">
                                        Add Product Custom Field
                                      </span>
                                    </button>
                                  </div>
                                )}
                              </div>

                              <div className="overflow-x-auto max-h-screen border-t border-neutral-200">
                                {isAddMode ? (
                                  <div className="flex flex-wrap uppercase font-bold text-sm mt-2 mb-1 ml-8 text-rose-500">
                                    <div rowSpan={5}>
                                      <span className="text-rose-500 text-2xl mr-2 ">
                                        *
                                      </span>
                                      {
                                        "Add Above Data First To Add Product Custom Field Data"
                                      }
                                    </div>
                                  </div>
                                ) : (
                                  <table className="table-auto w-full text-sm text-[#191919] font-semibold mb-3">
                                    <thead className="text-sm font-bold uppercase text-[#b3b3b3] border-b border-neutral-200">
                                      <tr>
                                        <th className="px-2 first:pl-5 py-4">
                                          <div className="font-semibold text-left w-10 flex items-center">
                                            <span>Sr.</span>
                                          </div>
                                        </th>
                                        <th className="px-2 first:pl-5 py-4">
                                          <div className="font-semibold text-left w-screen max-w-xs flex items-center">
                                            <span>
                                              Select Product Availability
                                            </span>
                                          </div>
                                        </th>
                                        <th className="px-2 first:pl-5 py-3">
                                          <div className="font-semibold text-left w-screen max-w-xs flex items-center">
                                            <span>Display Order</span>
                                          </div>
                                        </th>
                                        <th className="px-2 first:pl-5 py-3">
                                          <div className="font-semibold text-left w-screen max-w-xs flex items-center">
                                            <span>Default Value</span>
                                          </div>
                                        </th>
                                        <th className="px-2 first:pl-5 py-4">
                                          <span>Status</span>
                                        </th>
                                        {(permission.isEdit ||
                                          permission.isDelete) && (
                                            <th className="px-2 first:pl-5 py-4">
                                              <span>Action</span>
                                            </th>
                                          )}
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {customFieldsValue && customFieldsValue.length ? ( customFieldsValue.map((fieldsValue, index) => {
                                            const color = fieldsValue?.customFieldsValue && `${fieldsValue?.customFieldsValue.slice(7, fieldsValue?.customFieldsValue.length - 1)}`;
                                            return (
                                              <tr key={index}>
                                                <td className="px-2 first:pl-5 py-3">
                                                  <div>{index + 1}</div>
                                                </td>
                                                <td className="px-2 first:pl-5 py-3">
                                                  <div>
                                                    {fieldsValue?.customFieldsValue && fieldsValue?.customFieldsValue.includes("color") ?
                                                      <>
                                                        <div className="flex gap-6 items-center">
                                                          <span>{fieldsValue?.customFieldsValue}</span>
                                                          <div className="inline-flex items-center justify-center rounded-full border-click w-8 h-8 border-2"
                                                            style={{ background: color }} />
                                                        </div>
                                                      </>
                                                      : fieldsValue.customFieldsValue}
                                                    {/* {fieldsValue.customFieldsValue} */}
                                                  </div>
                                                </td>
                                                <td className="px-2 first:pl-5 py-3">
                                                  <div>
                                                    {fieldsValue.displayOrderCustomFieldsValue}
                                                  </div>
                                                </td>
                                                <td className="px-2 first:pl-5 py-3">
                                                  <div>
                                                    {fieldsValue?.isDefault ? "Yes" : "No"}
                                                  </div>
                                                </td>
                                                <td className="px-2 first:pl-5 py-3">
                                                  <div>
                                                    <Status type={fieldsValue.recStatus} />
                                                  </div>
                                                </td>
                                                <td className="px-2 first:pl-5 py-3 ">
                                                  {(permission?.isEdit ||
                                                    permission?.isDelete) && (
                                                      <div className="flex text-center">
                                                        <button
                                                          className="text-indigo-500 material-icons-outlined "
                                                          data-modal-toggle="editsizeModal"
                                                          type="button"
                                                          onClick={() => {
                                                            handleShowModel();
                                                            setEditFieldsData(
                                                              fieldsValue
                                                            );
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
                                                              setDeleteFieldsData(
                                                                fieldsValue
                                                              );
                                                              setOpenDeleteModal(
                                                                true
                                                              );
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
                                            );
                                          }
                                        )
                                      ) : (
                                        <tr className="text-rose-500 text-center">
                                          <td
                                            colSpan={6}
                                            className={`text-center`}
                                          >
                                            <span className="text-rose-500 text-2xl mr-2 ">
                                              *
                                            </span>
                                            No Data yet , please add some !
                                          </td>
                                        </tr>
                                      )}
                                    </tbody>
                                  </table>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                    </div>
                  </div>

                  <div className="flex flex-col col-span-full xl:col-span-3">
                    <div className="w-full bg-white shadow-xxl rounded-md mb-6">
                      {/* Category status field */}
                      <div className="border-b-2 border-neutral-200 p-6">
                        <div className="block uppercase tracking-wide text-gray-500 text-base font-bold mb-2">
                          Configurator Status
                          <span className="text-rose-500 text-lg leading-none">
                            *
                          </span>
                        </div>
                        <Dropdown
                          className="block w-full bg-white focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md"
                          label="recStatus"
                          defaultValue={values.recStatus}
                          isMulti={false}
                          name="recStatus"
                          options={RecStatusValue}
                          isSearchable={false}
                          isClearable={false}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FormikForm>
          );
        }}
      </Formik>

      <ConfirmDelete
        handleDelete={handleDelete}
        data={deleteFieldsData}
        message="Deleting these Size will permanently remove this record from your account. This can't be undone"
        title={"Delete"}
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
      />

      {openAddFieldsModal && (
        <AddProductCustomFieldModel
          handleShowModel={handleShowModel}
          MasterFilterCustomFieldsValue={MasterFilterCustomFieldsValue}
          editFieldsData={editFieldsData?.id}
          masterFilterCustomFieldsId={data && data?.id}
        />
      )}
    </>
  );
};

export default Create;
