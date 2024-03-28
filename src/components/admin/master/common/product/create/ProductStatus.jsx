/*Component Name: ProductStatus
Component Functional Details: User can create or update ProductStatus master details from here.
Created By: Chandan
Created Date: 13-06-2022
Modified By: Chandan
Modified Date: 13-06-2022 */

import React, { useState, useEffect } from "react";
import { Formik, Form as FormikForm } from "formik";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import ToggleButton from "components/common/formComponent/ToggleButton";
import { ProductStatusData, BundleProductStatusData, productType, } from "dummy/Dummy";
import { useDispatch } from "react-redux";
import { serverError } from "services/common/helper/Helper";
import { ValidationMsgs } from "global/ValidationMessages";
import Basic from "components/common/modals/Basic";
import DiscontinuedModel from "./forms/DiscontinueModel";
import { useSelector } from "react-redux";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
const ProductStatus = ({
  data,
  updateStatus,
  type,
  getProductData
}) => {

  const permission = useSelector(store => store.permission);
  const id = data.id;
  const dispatch = useDispatch();
  const [StatusData, setStatusData] = useState(ProductStatusData);

  const [discontinuedModel, setDiscontinuedModel] = useState(false);
  const [discontinuedSecondModel, setDiscontinuedSecondModel] = useState(false);

  const [dataDiscontinue, setDataDiscontinue] = useState(
    data?.isDiscontinue || false
  );
  const [dataIsFeatured, setDataIsFeatured] = useState(
    data?.isFeatured || false
  );

  useEffect(() => {
    setDataDiscontinue(data?.isDiscontinue);
    setDataIsFeatured(data?.isFeatured);
  }, [data]);

  useEffect(() => {
    if (type === productType.Bundle) {
      setStatusData(BundleProductStatusData);
    }
  }, []);

  const handleProductStatusToggle = (data) => {
    if (!permission?.isEdit && !permission?.isDelete) {
      return;
    }
    const obj = [
      {
        path: `/${data.target.name}`,
        op: "Replace",
        value: data.target.checked,
        from: "",
      },
    ];
    dispatch(setAddLoading(true));
    updateStatus(id, obj)
      .then((response) => {
        if (response.data.success) {
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.product.statusUpdated,
            })
          );
        } else {
          dispatch(
            setAlertMessage({ type: "danger", message: serverError(response) })
          );
        }
        getProductData();
        dispatch(setAddLoading(false));
      })
      .catch((errors) => {
        dispatch(
          setAlertMessage({
            type: "danger",
            message: ValidationMsgs.product.statusNotUpdated,
          })
        );
        dispatch(setAddLoading(false));
      });
  };

  const handleCancelOfBasic = () => {
    setDataDiscontinue((prev) => !prev)
    setDiscontinuedModel(false)
  }

  const handleCancelOfDiscontinue = () => {
    setDataDiscontinue((prev) => !prev);
    setDiscontinuedSecondModel(false);
  }

  return (
    <>
      <div className="w-full bg-white shadow-lg rounded-md border border-neutral-200 mb-6">
        <Formik>
          {({ setFieldValue, errors, values }) => {
            return (
              <FormikForm>
                <div className="p-6">
                  <div className="block uppercase tracking-wide text-gray-500 text-base font-bold mb-2">
                    Product Flag
                  </div>

                  <div >
                    <div className="overflow-auto max-h-screen">
                      {StatusData.map((productStatus, index) => (
                        <div
                          className="grid grid-cols-12 gap-4 mb-4 last:mb-0"
                          key={index}
                        >
                          <div className="col-span-full sm:col-span-8 xl:col-span-8">
                            <label className="text-gray-500">
                              {productStatus.name}
                            </label>
                          </div>
                          <div className="col-span-full sm:col-span-4 xl:col-span-4">
                            <div className="flex items-center">
                              <ToggleButton
                                id={`productStatus${index}`}
                                onChange={(e) => handleProductStatusToggle(e)}
                                defaultValue={data[productStatus.dbfield]}
                                name={productStatus.dbfield}
                                on={"Yes"}
                                off={"No"}
                                setFieldValue={setFieldValue}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      {/* <div className="grid grid-cols-12 gap-4 mb-4 last:mb-0">
                        <div className="col-span-full sm:col-span-8 xl:col-span-8">
                          <label className="text-gray-500">
                            Featured
                          </label>
                        </div>
                        <ToggleButton
                          id={"isFeatured"}
                          onChange={(e) => handleProductStatusToggle(e)}
                          defaultValue={dataIsFeatured}
                          name={"isFeatured"}
                          on={"Yes"}
                          off={"No"}
                          disabled={data.isDiscontinue === true ? true : false}
                        />
                      </div> */}
                      {/* {displayFieldElement(fields, "isDiscontinue") && (
                        <>
                          <div className="grid grid-cols-12 gap-4 mb-4 last:mb-0">
                            <div className="col-span-full sm:col-span-8 xl:col-span-8">
                              <label className="text-gray-500">
                                {fetchFieldProperty(
                                  "displayname",
                                  "isDiscontinue"
                                )}
                              </label>
                            </div>
                            <div className="col-span-full sm:col-span-4 xl:col-span-4">
                              <div className="flex items-center">
                                <ToggleButton
                                  id={"isDiscontinue"}
                                  onChange={(e) => {
                                    handleProductStatusToggle(e);
                                    setDataDiscontinue(e.target.checked);
                                    if (e.target.checked) {
                                      setDiscontinuedSecondModel(true);
                                    } else {
                                      // setDiscontinuedModel(true)
                                    }
                                  }}
                                  name="isDiscontinue"
                                  defaultValue={
                                    data.isDiscontinue === true
                                      ? true
                                      : dataDiscontinue
                                  }
                                  on={"Yes"}
                                  off={"No"}
                                  disabled={data.isFeatured === true ? true : false}
                                />
                                {data.isDiscontinue && (
                                  <button
                                    type="button"
                                    className="btn border-indigo-300 hover:border-indigo-400 text-indigo-500 ml-4 -mr-6"
                                    onClick={() => {
                                      setDiscontinuedSecondModel(true);
                                    }}
                                  >
                                    Edit
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </>
                      )} */}
                    </div>

                    {/* For Continue Product Model */}

                    <Basic
                      title={"Continue Product"}
                      message={
                        "Are you sure you want to continue this product?"
                      }
                      setOpenModal={handleCancelOfBasic}
                      openModal={discontinuedModel}
                      handleConfirmation={() => {
                        handleProductStatusToggle({
                          target: { checked: false, name: "isDiscontinue" },
                        });
                        setDiscontinuedModel((prev) => !prev);
                      }}
                    />

                    {/* For Discontinue Product Model */}
                    <DiscontinuedModel
                      data={data}
                      title={"Discontinue Product"}
                      message={
                        "This product is already cloned in below store. Please share related Product SKU"
                      }
                      type={type}
                      setOpenModal={handleCancelOfDiscontinue}
                      openModal={discontinuedSecondModel}
                      handleConfirmation={() =>
                        setDiscontinuedSecondModel(false)
                      }
                    />

                  </div>
                </div>
              </FormikForm>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default ProductStatus;
