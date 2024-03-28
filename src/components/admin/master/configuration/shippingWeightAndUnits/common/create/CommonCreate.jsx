import React, { useState, useEffect, useCallback, useRef } from "react";
import { Formik, Form as FormikForm, FieldArray } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";

import { CurrencySymbolByCode, RecStatusValue, RecStatusValuebyName, anniesAnnualData } from "global/Enum";
import { serverError } from "services/common/helper/Helper";

import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import AddRangePriceModel from "./AddRangePriceModel"
import InputNumber from "components/common/formComponent/InputNumber";
import Dropdown from "components/common/formComponent/Dropdown";
import Messages from "components/common/alerts/messages/Index";
import ConfirmDelete from "components/common/modals/ConfirmDelete";
import Status from "components/common/displayStatus/Status";
import { ValidationMsgs } from "global/ValidationMessages";

const Create = ({
  title,
  ByWeight,
  listUrl,
  editURL,
  CreateShippingWeightAndUnitAPI,
  GetShippingWeightAndUnitAPI,
  UpdateShippingWeightAndUnitAPI,
  RangePriceDetailsAPI,
  RangePriceDetailsDeleteAPI,
}) => {
  const { id } = useParams();
  const isAddMode = !id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [DeleteData, setDeleteData] = useState({});
  const [RangePriceListData, setRangePriceListData] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAddConfigModal, setOpenAddRangePriceModal] = useState({
    show: false,
    data: null,
  });

  const permission = useSelector((store) => store.permission);
  const GlobalLoading = useSelector(
    (store) => store?.GlobalLoaderReducer?.toLoad
  );
  const location = useSelector((store) => store?.location);

  const getShippingAndUnitsData = useCallback(() => {
    dispatch(setAddLoading(true));

    GetShippingWeightAndUnitAPI(id)
      .then((res) => {
        var response = res.data;
        if (response.success) {
          setData(response.data);
        }
        dispatch(setAddLoading(false));
      })
      .catch((err) => {
        dispatch(setAddLoading(false));
      });
  }, [id]);

  const getShippingAndUnitsDetailData = useCallback(() => {
    dispatch(setAddLoading(true));

    RangePriceDetailsAPI(id)
      .then((res) => {
        var response = res.data;
        if (response.success) {
          setRangePriceListData(response.data);
        }
        dispatch(setAddLoading(false));
      })
      .catch((err) => {
        dispatch(setAddLoading(false));
      });
  }, [id]);

  const handleShowModel = (data) => {
    setOpenAddRangePriceModal((prevState) => ({
      ...prevState,
      show: !prevState.show,
      data: data?.id,
    }));
  };

  function CreateShippingAndUnits(fields, resetForm) {
    dispatch(setAddLoading(true));

    CreateShippingWeightAndUnitAPI({
      shippingRatesPlantsWeightMasterModel: { ...fields, ...location },
    })
      .then((response) => {
        if (response.data.success) {
          dispatch(
            setAlertMessage({
              type: "success",
              message: `${title} is created Successfully.`,
            })
          );
          resetForm({});
          navigate(`${editURL}/${response.data.data.id}`);
        } else {
          dispatch(
            setAlertMessage({ type: "danger", message: serverError(response) })
          );
        }
        dispatch(setAddLoading(false));
      })
      .catch((errors) => {
        dispatch(
          setAlertMessage({
            type: "danger",
            message: `${title} is not created.`,
          })
        );
        dispatch(setAddLoading(false));
      });
  }

  function updateShippingAndUnits(fields) {
    dispatch(setAddLoading(true));

    UpdateShippingWeightAndUnitAPI({
      shippingRatesPlantsWeightMasterModel: { ...fields, ...location },
    })
      .then((response) => {
        if (response.data.success) {
          dispatch(
            setAlertMessage({
              type: "success",
              message: `${title} is updated Successfully.`,
            })
          );
          getShippingAndUnitsData();
        } else {
          dispatch(
            setAlertMessage({ type: "danger", message: serverError(response) })
          );
        }
        dispatch(setAddLoading(false));
      })
      .catch((errors) => {
        dispatch(
          setAlertMessage({
            type: "danger",
            message: `${title} is not updated.`,
          })
        );
        dispatch(setAddLoading(false));
      });
  }

  function handleDelete(fields) {
    dispatch(setAddLoading(true));
   
    RangePriceDetailsDeleteAPI({
      args: {
        idsRowVersion: [{
            item1: fields.id,
            item2: fields.rowVersion
          }],
        status: RecStatusValuebyName.Archived,
      ...location
      }
    }).then((response) => {
        if (response.data.success) {
          dispatch(
            setAlertMessage({
              type: "success",
              message: `${title} detail is deleted Successfully.`,
            })
          );
          getShippingAndUnitsDetailData();
        } else {
          dispatch(
            setAlertMessage({ type: "danger", message: serverError(response) })
          );
        }
        dispatch(setAddLoading(false));
      }).catch((errors) => {
        dispatch(
          setAlertMessage({
            type: "danger",
            message: `${title} detail is not deleted.`,
          })
        );
        dispatch(setAddLoading(false));
      });
  }

  const validationSchema = Yup.object().shape({
    fromRange: Yup.number().required("From Range is Required!."),
    toRange: Yup.number().required("To Range is Required!.").test(
      'is-greater-than-fromRange',
      'To Range must be greater than From Range',
      function (value) {
        const { fromRange } = this.parent;
        return value > fromRange;
      }
    ),
  });

  const onSubmit = (fields, { resetForm }) => {
    if (isAddMode) {
      CreateShippingAndUnits(fields, resetForm);
    } else {
      updateShippingAndUnits(fields);
    }
  };

  const initialValues = {
    id: data?.id || 0,
    storeId: anniesAnnualData.storeId,
    fromRange: data?.fromRange || "",
    toRange: data?.toRange || "",
    isShippingRatesPlants: !ByWeight ? true : false,
    isShippingRatesWeight: ByWeight ? true : false,
    recStatus: data?.recStatus || RecStatusValuebyName.Active,
    rowVersion: data?.rowVersion || null,
  };

  useEffect(() => {
    if (id) {
      getShippingAndUnitsData();
      getShippingAndUnitsDetailData();
    }
  }, [isAddMode, id]);

  return (
    <>
      <title>
        {isAddMode ? `Add ` : `Edit `} {title}
      </title>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnChange={true}
        validateOnBlur={false}
        validateOnMount={true}
      >
        {({ errors, setFieldValue, values }) => {
          return (
            <FormikForm>
              <div className="px-4 sm:px-6 lg:px-8 pt-8 w-full">
                <div className="flex mb-8 justify-between">
                  <div className="flex items-center">
                    <NavLink
                      to={listUrl}
                      className="btn border-neutral-200 hover:border-neutral-400 text-gray-500 hover:text-gray-700 flex items-center mr-2"
                    >
                      <span className="material-icons-outlined">west</span>
                    </NavLink>
                    <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
                      {isAddMode ? `Add ` : `Edit `} {title}
                    </h1>
                  </div>
                  {(permission?.isEdit || permission?.isDelete) && (
                    <div className="flex flex-wrap space-x-2">
                      <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="btn bg-white border-neutral-200 text-gray-500 hover:text-gray-700"
                      >
                        Cancel
                      </button>
                      <button
                        disabled={GlobalLoading}
                        type="submit"
                        className={`flex justify-center btn px-6 bg-indigo-500 hover:bg-indigo-600 text-white ${
                          GlobalLoading
                            ? "bg-indigo-200 hover:bg-indigo-200"
                            : "cursor-pointer"
                        }`}
                        onClick={() => {
                          dispatch(
                            setAlertMessage({
                              type: "danger",
                              message: serverError({
                                data: { errors: errors },
                              }),
                            })
                          );
                        }}
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
                  )}
                </div>
                {openAddConfigModal.show === false && <Messages />}
                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-full xl:col-span-9">
                    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white shadow-lg rounded-md border border-neutral-200 p-6 mb-6">
                      <div className="w-full last:mb-0">
                        <label
                          className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                          htmlFor="grid-first-name"
                        >
                          {"From Range"}
                          <span className="text-rose-500 text-2xl leading-none">*</span>
                        </label>
                        <InputNumber
                          displayError={true}
                          name="fromRange"
                          defaultValue={values.fromRange}
                          value={values.fromRange}
                          className={`block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md`}
                          onKeyPress={(event) => {
                            if (ByWeight == false) {
                              if (!/^\d*$/.test(event.key)) {
                                event.preventDefault();
                              }
                            }
                          }}
                          onChange={(e) => {
                            setFieldValue(e.target.name, e.target.value);
                          }}
                          maxLength={5}
                          allowNegative={false}
                        />
                      </div>
                      <div className="w-full last:mb-0">
                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                          htmlFor="grid-first-name"
                        >
                          To Range
                          <span className="text-rose-500 text-2xl leading-none">*</span>
                        </label>
                        <div className="w-full relative pr-7">
                          <InputNumber
                            displayError={true}
                            name="toRange"
                            defaultValue={values.toRange}
                            value={values.toRange}
                            className={`block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md`}
                            onKeyPress={(event) => {
                              if (ByWeight == false) {
                                if (!/^\d*$/.test(event.key)) {
                                  event.preventDefault();
                                }
                              }
                            }}
                            onChange={(e) => {
                              setFieldValue(e.target.name, e.target.value);
                            }}
                            maxLength={5}
                            allowNegative={false}
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
                                Product Range Price
                                <span className="text-rose-500 text-2xl leading-none">*</span>
                              </label>
                            </div>
                          </div>
                          {(permission?.isEdit || permission?.isDelete) && (
                            <div>
                              <button
                                onClick={handleShowModel}
                                type="button"
                                data-modal-toggle="addRangePriceModal"
                                className="btn bg-indigo-500 hover:bg-indigo-600 text-white disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-gray-500"
                                disabled={isAddMode}
                              >
                                <span className="material-icons-outlined">add_circle_outline</span>
                                <span className="ml-1">Add</span>
                              </button>
                            </div>
                          )}
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
                                  <div className="font-semibold text-left max-w-xs flex items-center">
                                    <span>State Name</span>
                                  </div>
                                </th>
                                <th className="px-2 first:pl-5 py-3">
                                  <div className="font-semibold text-left max-w-xs flex items-center">
                                    <span>State Code</span>
                                  </div>
                                </th>
                                <th className="px-2 first:pl-5 py-3">
                                  <div className="font-semibold text-left max-w-xs flex items-center">
                                    <span>
                                      Price ({CurrencySymbolByCode.USD})
                                    </span>
                                  </div>
                                </th>
                                <th className="px-2 first:pl-5 py-4">
                                  <span>Status</span>
                                </th>
                                {(permission?.isEdit ||
                                  permission?.isDelete) && (
                                  <th className="px-2 first:pl-5 py-4">
                                    <span>Action</span>
                                  </th>
                                )}
                              </tr>
                            </thead>
                            <tbody>
                              {RangePriceListData.length > 0 ? (
                                RangePriceListData.map((data, index) => {
                                  return (
                                    <tr key={index}>
                                      <td className="px-2 first:pl-5 py-3">
                                        <div>{index + 1}</div>
                                      </td>
                                      <td className="px-2 first:pl-5 py-3">
                                        <div>{data?.stateName}</div>
                                      </td>
                                      <td className="px-2 first:pl-5 py-3">
                                        <div>{data?.stateCode}</div>
                                      </td>
                                      <td className="px-2 first:pl-5 py-3">
                                        <div>{data?.price.toFixed(2)}</div>
                                      </td>
                                      <td className="px-2 first:pl-5 py-3">
                                        <div>
                                          <Status type={data?.recStatus} />
                                        </div>
                                      </td>
                                      <td className="px-2 first:pl-5 py-3 ">
                                        {(permission?.isEdit ||
                                          permission?.isDelete) && (
                                          <div className="flex text-center">
                                            <button
                                              className="text-indigo-500 material-icons-outlined "
                                              data-modal-toggle="editRangePriceModal"
                                              type="button"
                                              onClick={() => {
                                                handleShowModel(data);
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
                                                  setDeleteData(data);
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
                                  );
                                })
                              ) : (
                                <tr className="text-rose-500 text-center">
                                  <td colSpan={6} className={`text-center`}>
                                    <span className="text-rose-500 text-2xl mr-2"></span>
                                    {ValidationMsgs.common.noDataFound}
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                          {/* <ErrorMessage
                              name={"catalogChanges"}
                              component={FormErrorMessage}
                            /> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col col-span-full xl:col-span-3">
                    <div className="w-full bg-white shadow-xxl rounded-md">
                      <div className="border-b-2 border-neutral-200 p-6">
                        <div className="block uppercase tracking-wide text-gray-500 text-base font-bold mb-2">
                          {`${title} Status`}
                          <span className="text-rose-500 text-2xl leading-none">*</span>
                        </div>
                        <Dropdown
                          isMulti={false}
                          isClearable={false}
                          defaultValue={values.recStatus}
                          name={"recStatus"}
                          optionStyle={{ padding: "1px" }}
                          options={RecStatusValue}
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
        data={DeleteData}
        message="Deleting these Data will permanently remove this record from your account. This can't be undone"
        title={"Delete"}
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
      />

      {openAddConfigModal.show && (
        <AddRangePriceModel
          title={title}
          handleShowModel={handleShowModel}
          RangeDetailId={openAddConfigModal?.data}
          RangeDetailMasterId={id}
          getShippingAndUnitsDetailData={getShippingAndUnitsDetailData}
        />
      )}
    </>
  );
};

export default Create;
