import React, { useEffect, useState, useCallback } from "react";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { useDispatch, useSelector } from "react-redux";
import CryptoJS from "crypto-js";
import BiometricAlAnalysisService from "services/admin/customer/BiometricALAnalysisServices";

import {
  DateTimeFormat,
  TitleNameHelper,
  serverError,
} from "services/common/helper/Helper";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { ValidationMsgs } from "global/ValidationMessages";
import { __AllStoresObj } from "typeDefination/app.type";

const BiometricALAnalysis = ({ customerInfo, StoreData }) => {
  const dispatch = useDispatch();
  const { id, email } = useSelector((store: __AllStoresObj) => store?.user);
  const [encrptedData, setEncrptedData] = useState({
    userId: "",
    userEmail: "",
    customerId: "",
    customerEmail: "",
  });

  const [Data, setData] = useState([
    {
      reportName: "",
      reportID: "",
      pdfReport: "",
      reportGenerateDate: "",
      surveyReport: "",
    },
  ]);

  const secretPass = "XkhZG4fW2t2W";

  const encryptedData = () => {
    let finalCustomerId = customerInfo && customerInfo?.id;
    let finalCustomerEmail = customerInfo && customerInfo?.email;

    if (id && email && finalCustomerId && finalCustomerEmail) {
      const userId = CryptoJS.AES.encrypt(
        JSON.stringify(id),
        secretPass
      ).toString();

      const userEmail = CryptoJS.AES.encrypt(
        JSON.stringify(email),
        secretPass
      ).toString();

      const customerId = CryptoJS.AES.encrypt(
        JSON.stringify(finalCustomerId),
        secretPass
      ).toString();

      const customerEmail = CryptoJS.AES.encrypt(
        JSON.stringify(finalCustomerEmail),
        secretPass
      ).toString();

      setEncrptedData({
        userId,
        userEmail,
        customerId,
        customerEmail,
      });
    }
  };

  const getBiometricALAnalysisData = useCallback(() => {
    if (customerInfo && customerInfo.id) {
      dispatch(setAddLoading(true));
      BiometricAlAnalysisService.getgetBiometricALAnalysis(customerInfo.id)
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
  }, [customerInfo.id]);

  const downloadCreateImagesDetails = () => {
    if (customerInfo.id) {
      dispatch(setAddLoading(true));
      BiometricAlAnalysisService.createImagesDetails(customerInfo.id)
        .then((response) => {
          if (response?.data?.success && response?.data?.data) {
            dispatch(
              setAlertMessage({
                type: "success",
                message: response?.data?.data,
              })
            );
            getBiometricALAnalysisData();
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
              message: ValidationMsgs.commonExport.failed,
            })
          );
          dispatch(setAddLoading(false));
        });
    }
  };

  useEffect(() => {
    if (customerInfo.id) {
      getBiometricALAnalysisData();
    }
    encryptedData();
  }, [customerInfo.id]);

  return (
    <>
      <title>
        {TitleNameHelper({ defaultTitleName: `Biometric-AL Analysis` })}
      </title>
      <div className="p-6 pb-0 mb-6">
        <div>
          <div className="flex flex-wrap items-center justify-between mb-6 pt-6">
            <div className="text-2xl text-gray-800 font-bold">
              {customerInfo && customerInfo.name}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <button
                  className="btn text-white bg-indigo-500 hover:bg-indigo-600 cursor-pointer"
                  onClick={() => downloadCreateImagesDetails()}
                >
                  Get Latest Report
                </button>
              </div>
              <div>
                <a
                  href={`${StoreData.url}?consid=${encrptedData.userId}&consemail=${encrptedData.userEmail}&custid=${encrptedData.customerId}&custemail=${encrptedData.customerEmail}`}
                  className="btn text-white bg-indigo-500 hover:bg-indigo-600 cursor-pointer"
                  target="_blank"
                >
                  Place New Order
                </a>
              </div>
            </div>
          </div>
          <div>
            <div className="overflow-auto max-h-screen border-t border-neutral-200">
              <table className="table-auto w-full text-sm text-[#191919]">
                <thead className="text-sm font-bold uppercase text-[#b3b3b3] border-b border-neutral-200">
                  <tr>
                    <th className="px-2 first:pl-5 py-4">
                      <div className="font-semibold text-left max-w-xs flex items-center">
                        Report Name
                      </div>
                    </th>
                    <th className="px-2 first:pl-5 py-4">
                      <div className="font-semibold text-left max-w-xs flex items-center">
                        Generate Date
                      </div>
                    </th>
                    <th className="px-2 first:pl-5 py-4">
                      <div className="font-semibold text-left max-w-xs flex items-center">
                        Download
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-200">
                  {Data.length ? (
                    Data.map((value, index) => {
                      return (
                        <>
                          <tr key={index}>
                            <td className="px-2 first:pl-5 py-3 relative">
                              {value?.reportName}
                            </td>
                            <td className="px-2 first:pl-5 py-3">
                              {value.reportGenerateDate && (
                                <>
                                  <span className="pr-3">
                                    {
                                      DateTimeFormat(value.reportGenerateDate)
                                        .date
                                    }
                                  </span>
                                  <span>
                                    {
                                      DateTimeFormat(value.reportGenerateDate)
                                        .time
                                    }
                                  </span>
                                </>
                              )}
                            </td>
                            <td className="px-2 first:pl-5 py-3">
                              <div>
                                <a
                                  href={value?.surveyReport}
                                  className="material-icons-outlined"
                                  target="_blank"
                                >
                                  download
                                </a>
                                <a
                                  href={value?.pdfReport}
                                  className="material-icons-outlined"
                                  target="_blank"
                                >
                                  picture_as_pdf
                                </a>
                              </div>
                            </td>
                          </tr>
                        </>
                      );
                    })
                  ) : (
                    <tr>
                      <td></td>
                      <td>
                        <div className="flex justify-center items-center p-5 rounded-t border-b sticky top-0 left-0 text-red-600 bg-white">
                          {ValidationMsgs.common.noDataFound}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BiometricALAnalysis;
