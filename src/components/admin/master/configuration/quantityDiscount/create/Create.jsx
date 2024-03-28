import { Formik, Form as FormikForm } from "formik";
import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import Dropdown from "components/common/formComponent/Dropdown";
import Messages from "components/common/alerts/messages/Index";
import {
  RecStatusValue,
  RecStatusValuebyName,
  anniesAnnualData,
} from "global/Enum";
import Input from "components/common/formComponent/Input";
import ToggleButton from "components/common/formComponent/ToggleButton";
import DiscountDetail from "./DiscountDetail";
import QuantityDiscountService from "services/admin/quantityDiscount/QuantityDiscountService";
import { ValidationMsgs } from "global/ValidationMessages";
import { useDispatch, useSelector } from "react-redux";
import { serverError, TitleNameHelper } from "services/common/helper/Helper";
import CreateFileHeader from "components/common/CreateFileHeader";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";

const Create = () => {
  const { id } = useParams();
  const isAddMode = !id;
  const dispatch = useDispatch();
  const location = useSelector((store) => store?.location);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [showDetailModal, setShowDetailModal] = useState({
    toDisable: false,
    state: false,
  });

  const getQuantityData = useCallback(() => {
    if (id > 0) {
      dispatch(setAddLoading(true));
      QuantityDiscountService.getQuantityDiscountById(id)
        .then((res) => {
          var response = res.data;
          if (response.success) {
            setData({
              id: response.data.id,
              brandId: response.data.brandId,
              storeId: response.data.storeId,
              vendorId: response.data.vendorId,
              name: response.data.name,
              recStatus: response.data.recStatus,
              rowVersion: response.data.rowVersion,
              isBundle:
                response.data.brandId === 0 && response.data.vendorId === 0
                  ? true
                  : false,
              isDefault: response.data.isDefault,
            });
          }
          dispatch(setAddLoading(false));
        })
        .catch((err) => {
          dispatch(setAddLoading(false));
        });
    }
  }, [id]);

  useEffect(() => {
    getQuantityData();
  }, [id, isAddMode, getQuantityData]);

  const validationSchema = Yup.object({
    brandId: Yup.string()
      .trim()
      .when("isBundle", {
        is: (val) => (val == true ? false : true),
        then: Yup.string()
          .trim()
          .required(ValidationMsgs.common.brandIdRequired),
      }),
    storeId: Yup.string()
      .trim()
      .required(ValidationMsgs.quantityDiscount.storeIdRequired),
    vendorId: Yup.string()
      .trim()
      .when("isBundle", {
        is: (val) => (val == true ? false : true),
        then: Yup.string()
          .trim()
          .required(ValidationMsgs.common.vendorIdRequired),
      }),
    name: Yup.string()
      .trim()
      .required(ValidationMsgs.quantityDiscount.nameRequired),
    recStatus: Yup.string()
      .trim()
      .required(ValidationMsgs.common.recStatusRequired),
  });

  const onSubmit = (fields, { resetForm }) => {
    if (isAddMode) {
      createQuantityDiscount(fields, resetForm);
    } else {
      updateQuantityDiscount(fields, resetForm);
    }
  };

  const createQuantityDiscount = (fields, resetForm) => {
    dispatch(setAddLoading(true));
    QuantityDiscountService.createQuantityDiscount({
      quantityDiscountModel: { ...fields, ...location },
    })
      .then((response) => {
        if (response.data.success) {
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.quantityDiscount.quantityDiscountCreated,
            })
          );
          resetForm({});
          navigate(
            `/admin/master/Configuration/Quantitydiscount/edit/${response.data.data.id}`
          );
          getQuantityData();
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
            message: ValidationMsgs.quantityDiscount.quantityDiscountNotCreated,
          })
        );
        dispatch(setAddLoading(false));
      });
  };

  const updateQuantityDiscount = (fields) => {
    dispatch(setAddLoading(true));

    QuantityDiscountService.updateQuantityDiscount({
      quantityDiscountModel: { ...fields, ...location },
    })
      .then((response) => {
        dispatch(setAddLoading(false));
        if (response.data.success) {
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.quantityDiscount.quantityDiscountUpdated,
            })
          );
          getQuantityData();
        } else {
          dispatch(
            setAlertMessage({ type: "danger", message: serverError(response) })
          );
        }
      })
      .catch((errors) => {
        dispatch(
          setAlertMessage({
            type: "danger",
            message: ValidationMsgs.quantityDiscount.quantityDiscountNotUpdated,
          })
        );
        dispatch(setAddLoading(false));
      });
  };

  return (
    <>
      <title>
        {isAddMode ? "Add " : "Edit "}
        {TitleNameHelper({ defaultTitleName: "Quantity Discount" })}
      </title>
      <Formik
        enableReinitialize={true}
        initialValues={{
          id: data?.id || 0,
          storeId: anniesAnnualData.storeId,
          brandId: anniesAnnualData.brandId,
          vendorId: anniesAnnualData.vendorId,
          name: data?.name || "",
          recStatus: data?.recStatus || RecStatusValuebyName.Active,
          rowVersion: data?.rowVersion || null,
          isBundle: false,
          isDefault: data?.isDefault || false,
        }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnMount={true}
      >
        {({ errors, setFieldValue, values, validateForm }) => {
          return (
            <FormikForm>
              <div className="px-4 sm:px-6 lg:px-8 py-8 w-full">
                <CreateFileHeader
                  url="/admin/master/Configuration/Quantitydiscount"
                  module={`${isAddMode ? "Create" : "Edit"} ${TitleNameHelper({
                    defaultTitleName: "Quantity Discount",
                  })}`}
                  errors={errors}
                  validateForm={validateForm}
                />
                {!showDetailModal.state && <Messages />}
                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-full xl:col-span-9">
                    <div className="w-full flex flex-wrap gap-6 bg-white shadow-lg rounded-md border border-neutral-200 p-6 mb-6">
                      <div className="last:mb-0 w-full lg:w-[50%]">
                        <label
                          className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                          htmlFor="grid-first-name"
                        >
                          {"Name"}
                          <span className="text-rose-500 text-2xl leading-none">
                            *
                          </span>
                        </label>
                        <Input name={"name"} maxLength={200} />
                      </div>

                      <div className="last:mb-0 w-full lg:w-[50%]">
                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                          Default
                        </label>
                        <ToggleButton
                          name="isDefault"
                          id="isDefault"
                          onChange={(e) =>
                            setFieldValue(
                              "isDefault",
                              e.target.checked ? true : false
                            )
                          }
                          defaultValue={
                            values.isDefault === true ? true : false
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col col-span-full xl:col-span-3">
                    <div className="w-full bg-white shadow-xxl rounded-md">
                      <div className="border-b-2 border-neutral-200 p-6">
                        <div className="block uppercase tracking-wide text-gray-500 text-base font-bold mb-2">
                          {"Quantity Discount Status"}
                          <span className="text-rose-500 text-2xl leading-none">
                            *
                          </span>
                        </div>
                        <Dropdown
                          isMulti={false}
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
      <DiscountDetail
        quantityId={data.id}
        isAddMode={isAddMode}
        showDetailModal={showDetailModal}
        setShowDetailModal={setShowDetailModal}
      />
    </>
  );
};

export default Create;
