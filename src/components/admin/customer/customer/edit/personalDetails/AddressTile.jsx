/*Component Name: AddressTile
Component Functional Details:  AddressTile .
Created By: PK Kher
Created Date: <Creation Date>
Modified By: PK Kher
Modified Date: <Modified Date> */

import Toggle from "components/common/formComponent/Toggle";
import { ValidationMsgs } from "global/ValidationMessages";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import CustomerService from "services/admin/customer/CustomerService";
import { serverError } from "services/common/helper/Helper";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";

const AddressTile = ({
  details,
  customerId,
  getCustomerData,
  setOpenDeleteModal,
  setDelAddressInfo,
  setShippingAddressModal,
  setBillingAddressModal,
  setEditAddressModalData,
  customerInfo,
}) => {
  const permission = useSelector(store => store.permission);
  const [defaultValue, setDefaultValue] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setDefaultValue(details.isDefault);
  }, [details]);
  const onChangeHandler = (e) => {
    dispatch(setAddLoading(true));

    setDefaultValue(e.target.checked);
    CustomerService.updateCustomerDefaultAddress({
      isDefault: e.target.checked,
      addressId: details.id,
      customerId: customerId,
      addressType: details.addressType,
    })
      .then((response) => {
        if (response.data.success && response.data.data) {
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.customer.defaultAddress,
            })
          );
          getCustomerData();
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
            message: ValidationMsgs.customer.defaultNotAddress,
          })
        );
        dispatch(setAddLoading(false));
      });
  };
  return (
    <>
      <div
        className="col-span-full xl:col-span-6 2xl:col-span-4 flex relative" /* id={`div_${details.id}`} */
      >
        <div
          className={`w-full inline-block bg-white shadow-md rounded-lg  ${!details.isDefault ? "border-slate-200" : "border-green-500"
            }`}
          style={{ borderWidth: "1px" }}
          htmlFor="address1"
        >
          <div className="text-sm text-gray-600 p-5">
            <div className="mb-3 flex justify-between items-center">
              <h3 className="text-lg text-slate-800 font-semibold">
                {details?.firstname} {details?.lastName}
              </h3>
              <div className="flex items-center">
                <div className="mr-1 text-sm">Default</div>
                <div className="w-16 relative">
                  <Toggle
                    name={`default_${details.id}`}
                    id={`default_${details.id}`}
                    defaultValue={defaultValue}
                    onChange={onChangeHandler}
                    disabled={defaultValue}
                  />
                </div>
              </div>
            </div>
            {/* <div className="text-sm text-slate-800">
              <span className="font-semibold"> Company Name :</span> <span className="">{customerInfo?.companyName}</span>
            </div> */}
            <div>
              {(details?.address1 !== " " && details?.address1 !== "" && details?.address1 !== undefined) ? details?.address1 + "," : ""} <br />
              {(details?.address2 !== " " && details?.address2 !== "" && details?.address2 !== undefined) ? <>{details?.address2},<br /></> : ""}
              {details?.city ? details?.city + "," : ""}
              {details?.state ? details?.state + "," : ""}
              {details?.postalCode ? details?.postalCode + "," : ""}
              {/* {details?.countryCode ? details?.countryCode + "," : ""} */}
              <br />
              {details.countryName}
            </div>
            <div className="mt-3 flex items-center">
              <div className="mr-2">Mobile :</div>
              <div>{details?.countryCode && `(${details.countryCode})`} {details.phone}</div>
            </div>
            {(!defaultValue && permission?.isDelete) && (
              <div className="absolute bottom-3 right-3">
                <div className="flex items-center">
                  <div className="relative"></div>
                  <span
                    className="material-icons-outlined cursor-pointer inline-block text-red-500"
                    onClick={() => {
                      setDelAddressInfo({ ...details, recStatus: "R" });
                      setOpenDeleteModal(true);
                    }}
                  >
                    delete
                  </span>
                </div>
              </div>
            )}
            {(!defaultValue && permission?.isEdit) && (
              <div className="absolute bottom-3 right-12">
                <div className="flex items-center">
                  <div className="relative"></div>
                  <span
                    className="material-icons-outlined cursor-pointer inline-block text-indigo-500"
                    onClick={() => {
                      if (details?.addressType === "S") {
                        setShippingAddressModal(true);
                        setEditAddressModalData(details);
                      } else {
                        setBillingAddressModal(true);
                        setEditAddressModalData(details);
                      }
                    }}
                  >
                    edit
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressTile;
