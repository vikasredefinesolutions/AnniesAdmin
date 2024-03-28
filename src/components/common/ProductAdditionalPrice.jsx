import React, { useCallback, useState, useEffect, useRef } from "react";
import { Formik, Form as FormikForm } from "formik";
import Input from "components/common/formComponent/Input";
import Checkbox from "components/common/formComponent/Checkbox";
import { useParams } from "react-router-dom";
import StoreBuilderService from "services/admin/storeBuilder/StoreBuilderService";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { RecStatusValuebyName, storeBuilderRequireFields } from "global/Enum";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { serverError } from "services/common/helper/Helper";
import { ValidationMsgs } from "global/ValidationMessages";
import InputNumber from "components/common/formComponent/InputNumber";
import Textarea from "components/common/formComponent/Textarea";
import EditProductAdditionalModal from "./AddProductAdditionalPriceModel";
import ConfirmDelete from "components/common/modals/ConfirmDelete";

const CustomFieldForm = ({ activeTab, index, setFormSubmit, storeId }) => {
  const dispatch = useDispatch();
  const param = useParams();
  const formRef = useRef();
  const [customFieldList, setcustomFieldList] = useState([]);
  const location = useSelector((store) => store?.location);
  const [OpenEditPriceModal, setOpenEditPriceModal] = useState(false);
  const [OpenDeleteModal, setOpenDeleteModal] = useState(false);
  const [PriceDeleteData, setPriceDeleteData] = useState([]);
  const [EditData, setEditData] = useState({});
  const permission = useSelector((store) => store.permission);

  useEffect(() => {
    if (activeTab === index) {
      setFormSubmit(formRef.current);
    }
  }, [formRef, setFormSubmit, activeTab]);

  const submitHandler = (fields, { resetForm }) => {
    createProductAdditionalPrice(fields, resetForm);
  };

  const getCustomFieldList = useCallback(() => {
    if (storeId) {
      dispatch(setAddLoading(true));
      StoreBuilderService.getProductAdditionalPriceList({
        storeId: storeId,
        productId: param?.id
      })
        .then((res) => {
          setcustomFieldList(res.data.data);
          dispatch(setAddLoading(false));
        })
        .catch(() => {
          dispatch(setAddLoading(false));
        });
    }
  }, []);

  const createProductAdditionalPrice = (fields, resetForm) => {
    dispatch(setAddLoading(true));
    StoreBuilderService.createProductAdditionalPrice({
      sbStoreProductAdditionPriceModel: { ...fields, ...location },
    })
      .then((res) => {
        if (res.data.success) {
          dispatch(
            setAlertMessage({
              type: "success",
              message:
                ValidationMsgs.storeBuilder.ProductAdditionalPrice
                  .ProAddPriceCreated,
            })
          );
          resetForm({});
          getCustomFieldList();
        } else {
          dispatch(
            setAlertMessage({ type: "danger", message: serverError(res) })
          );
          dispatch(setAddLoading(false));
        }
        dispatch(setAddLoading(false));
      })
      .catch(() => {
        dispatch(
          setAlertMessage({
            type: "danger",
            message:
              ValidationMsgs.storeBuilder.ProductAdditionalPrice
                .ProAddPriceNotCreated,
          })
        );
        dispatch(setAddLoading(false));
      });
  };

  const deleteProductAdditionalPrice = (PriceDeleteData) => {
    StoreBuilderService.updateProductAdditionalPrice({
      sbStoreProductAdditionPriceModel: {
        id: PriceDeleteData.id,
        storeId: PriceDeleteData.storeId,
        productId: PriceDeleteData.productId,
        name: PriceDeleteData.name,
        amount: PriceDeleteData.amount,
        description: PriceDeleteData.description,
        hideForCustomer: PriceDeleteData.hideForCustomer,
        fundRaising: PriceDeleteData.fundRaising,
        recStatus: RecStatusValuebyName.Archived,
        rowVersion: PriceDeleteData.rowVersion,
        ...location,
      },
    })
      .then((res) => {
        if (res.data.success) {
          dispatch(
            setAlertMessage({
              type: "success",
              message:
                ValidationMsgs.storeBuilder.ProductAdditionalPrice
                  .ProAddPriceDeleted,
            })
          );
          getCustomFieldList();
        } else {
          dispatch(
            setAlertMessage({ type: "danger", message: serverError(res) })
          );
          dispatch(setAddLoading(false));
        }
      })
      .catch(() => {
        dispatch(
          setAlertMessage({
            type: "danger",
            message:
              ValidationMsgs.storeBuilder.ProductAdditionalPrice
                .ProAddPriceNotDeleted,
          })
        );
        dispatch(setAddLoading(false));
      });
  };

  const schema = Yup.object().shape({
    name: Yup.string().trim().required(
      ValidationMsgs.storeBuilder.ProductAdditionalPrice.nameRequired
    ),
    amount: Yup.string().trim().required(
      ValidationMsgs.storeBuilder.ProductAdditionalPrice.ProAddPriceAmountRequired
    ),
  });

  useEffect(() => {
    getCustomFieldList();
  }, []);
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        id: 0,
        storeId: storeId,
        productId: param.id,
        name: "",
        amount: "",
        description: "",
        hideForCustomer: false,
        fundRaising: false,
        recStatus: RecStatusValuebyName.Active,
        rowVersion: "",
      }}
      onSubmit={submitHandler}
      validationSchema={schema}
      innerRef={formRef}
    >
      {({ values, setFieldValue }) => {
        return (
          <>
            {/* <Messages /> */}
            <FormikForm>
              <div className="col-span-12 lg:col-span-6">
                <div className="w-full bg-white mb-6 p-6">
                  <div className="flex justify-between items-center">
                    <div className="block uppercase tracking-wide text-gray-500 text-lg font-bold mb-6">
                      Product Additional Price
                    </div>
                  </div>
                  <div>
                    <div className="grid grid-cols-12 gap-6">
                      <div className="col-span-12">
                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                          Name
                          <span className="text-rose-500 text-xl leading-none">
                            *
                          </span>
                        </label>
                        <Input name={"name"} defaultValue={values.name} />
                      </div>
                      <div className="col-span-12">
                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                          Amount
                          <span className="text-rose-500 text-xl leading-none">
                            *
                          </span>
                        </label>
                        <InputNumber
                          displayError={true}
                          name="amount"
                          defaultValue={values.amount}
                          value={values.amount}
                          onChange={(e) => {
                            setFieldValue(e.target.name, e.target.value);
                          }}
                          maxLength={5}
                          allowNegative={false}
                        />
                      </div>
                      <div className="col-span-12">
                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                          Description
                        </label>
                        <Textarea
                          name={"description"}
                          maxLength="160"
                          className={`block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md`}
                          defaultValue={values.description}
                          onChange={(e) => {
                            setFieldValue(e.target.name, e.target.value);
                          }}
                        />
                      </div>
                      <div className="col-span-12">
                        <label className="text-gray-500 inline-flex items-center">
                          <Checkbox
                            name="hideForCustomer"
                            label="Hide From customer"
                            id="hideForCustomer"
                            checked={values?.hideForCustomer}
                            onChange={(e) => {
                              setFieldValue(
                                "hideForCustomer",
                                e.target.checked
                              );
                            }}
                          />
                        </label>
                      </div>
                      <div className="col-span-12">
                        <label className="text-gray-500 inline-flex items-center">
                          <Checkbox
                            name="fundRaising"
                            label="Fund Raising"
                            id="fundRaising"
                            checked={values?.fundRaising}
                            onChange={(e) => {
                              setFieldValue("fundRaising", e.target.checked);
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="overflow-x-auto max-h-screen border-t border-neutral-200 mt-5">
                    <table className="table-auto w-full text-sm text-[#191919] font-semibold overflow-scroll">
                      <thead className="text-sm font-bold uppercase text-[#b3b3b3] border-b border-neutral-200">
                        <tr>
                          <th className="px-2 first:pl-5 py-4">
                            <div className="font-semibold text-left flex items-center">
                              <span>Name</span>
                            </div>
                          </th>
                          <th className="px-2 first:pl-5 py-4">
                            <div className="font-semibold text-left flex items-center">
                              <span>Amount</span>
                            </div>
                          </th>
                          <th className="px-2 first:pl-5 py-4">
                            <div className="font-semibold text-left flex items-center">
                              <span>Description</span>
                            </div>
                          </th>
                          <th className="px-2 first:pl-5 py-4">
                            <div className="font-semibold text-left flex items-center">
                              <span>Hide From customer</span>
                            </div>
                          </th>
                          <th className="px-2 first:pl-5 py-4">
                            <div className="font-semibold text-left flex items-center">
                              <span>Fund Raising</span>
                            </div>
                          </th>
                          <th className="px-2 first:pl-5 py-4">
                            <div className="font-semibold text-left flex items-center">
                              <span>Action</span>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {customFieldList && customFieldList.length > 0 ? (
                          customFieldList.map((val, index) => {
                            return (
                              <tr key={index}>
                                <td className="px-2 first:pl-5 py-4">
                                  <div>{val.name}</div>
                                </td>
                                <td className="px-2 first:pl-5 py-4">
                                  <div>{val.amount}</div>
                                </td>
                                <td className="px-2 first:pl-5 py-4">
                                  <div>{val.description}</div>
                                </td>
                                <td className="px-2 first:pl-5 py-4">
                                  <div>
                                    {val.hideForCustomer === true
                                      ? `${storeBuilderRequireFields.yes}`
                                      : `${storeBuilderRequireFields.no}`}
                                  </div>
                                </td>
                                <td className="px-2 first:pl-5 py-4">
                                  <div>
                                    {val.fundRaising === true
                                      ? `${storeBuilderRequireFields.yes}`
                                      : `${storeBuilderRequireFields.no}`}
                                  </div>
                                </td>
                                <td className="px-2 first:pl-5 py-4">
                                  <button
                                    type="button"
                                    className="inline-block w-6 h-6 text-indigo-500 cursor-pointer"
                                    onClick={() => {
                                      setOpenEditPriceModal((prev) => !prev);
                                      setEditData(val);
                                    }}
                                  >
                                    <span className="material-icons-outlined">
                                      edit
                                    </span>
                                  </button>
                                  {(permission.isEdit || permission.isDelete) && (
                                    <button
                                      type="button"
                                      className="inline-block w-6 h-6 text-rose-500 cursor-pointer"
                                      onClick={() => {
                                        setPriceDeleteData(val);
                                        setOpenDeleteModal(true);
                                      }}
                                    >
                                      <span className="material-icons-outlined">
                                        delete
                                      </span>
                                    </button>
                                  )}
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td
                              className="py-4 text-rose-500 text-center"
                              colSpan={6}
                            >
                              <p>{ValidationMsgs.common.noDataFound}</p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </FormikForm>
            {OpenEditPriceModal && (
              <EditProductAdditionalModal
                setOpenEditPriceModal={setOpenEditPriceModal}
                OpenEditPriceModal={OpenEditPriceModal}
                storeId={storeId}
                EditData={EditData}
                setEditData={setEditData}
                getCustomFieldList={getCustomFieldList}
              />
            )}
            <ConfirmDelete
              handleDelete={deleteProductAdditionalPrice}
              data={PriceDeleteData}
              message="Deleting this Page will permanently remove this record from your account. This can't be undone"
              title={"Delete"}
              openDeleteModal={OpenDeleteModal}
              setOpenDeleteModal={setOpenDeleteModal}
            />
          </>
        );
      }}
    </Formik>
  );
};

export default CustomFieldForm;
