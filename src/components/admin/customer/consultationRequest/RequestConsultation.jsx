/*Component Name: RequestConsultation
Component Functional Details: User can create or update RequestConsultation master details from here.
Created By: Shrey Patel
Created Date: 02/28/2023`1
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import React, { useCallback, useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TitleNameHelper, serverError } from "services/common/helper/Helper";
import Messages from "components/common/alerts/messages/Index";
import Select from "components/common/formComponent/Select";
import StoreService from "services/admin/store/StoreService";
import { consultationTabs } from "global/Enum";
import Tabs from "components/common/Tabs";
import All from "./All";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import ConsultationRequestService from "services/admin/customer/ConsultationRequestService";
import FileSaver from "file-saver";
import { ValidationMsgs } from "global/ValidationMessages";
import { Fragment } from "react";

const RequestConsultation = () => {
  const permission = useSelector((store) => store.permission);
  const dispatch = useDispatch();
  const [storeFilter, setStoreFilter] = useState("0");
  const user = useSelector((store) => store?.user);
  const company = useSelector((store) => store?.CompanyConfiguration);
  const [exportCSVData, setExportCSVData] = useState({});
  const [activeTab, setActiveTab] = useState(0);
  const displayTabs = consultationTabs;
  const onTabClick = (e, index) => {
    setActiveTab(index);
  };

  const [stores, setStores] = useState([]);

  const getStoreDropdownData = useCallback(() => {
    if (user?.id && company?.id) {
      StoreService.getStoreByUserId({
        userid: user?.id,
        companyConfigurationId: company?.id,
        isSuperUser: user?.isSuperUser,
      })
        .then((response) => {
          if (response?.data?.data) {
            setStores([
              { value: "0", label: "All Stores" },
              ...response.data.data,
            ]);
          }
        })
        .catch((error) => { });
    }
  }, []);

  useEffect(() => {
    getStoreDropdownData();
  }, [getStoreDropdownData]);

  const ExportSampleFile = () => {
    dispatch(setAddLoading(true));
    ConsultationRequestService.ConsultationAndProofExport(exportCSVData)
      .then((response) => {
        if (response.data.success) {
          FileSaver.saveAs(response.data.data, "export.csv");
          // window.location.href = response.data.data;
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.product.export.exportSuccess,
            })
          );
        } else {
          dispatch(
            setAlertMessage({ type: "danger", message: serverError(response) })
          );
        }
        dispatch(setAddLoading(false));
      })
      .catch(() => {
        dispatch(setAddLoading(false));
      });
  };

  return (
    <>
      <title>
        {TitleNameHelper({ defaultTitleName: "Consultation Request" })}
      </title>
      <div className="py-4">
        <div className="px-4 sm:px-6 lg:px-8 w-full items-center flex justify-between sticky top-0 z-20 py-2 bg-slate-100">
          <div className="col-span-full w-full flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
              {TitleNameHelper({ defaultTitleName: "Consultation Request" })}
            </h1>
            <div className="flex flex-wrap sm:auto-cols-min gap-2">
              {(permission?.isEdit || permission?.isDelete) && (
                <button
                  type="button"
                  className="btn shadow-none text-indigo-500 hover:text-indigo-600 font-semibold"
                  onClick={() => ExportSampleFile()}
                >
                  <span>Export</span>
                </button>
              )}
              <Select
                name=""
                options={stores}
                defaultValue={storeFilter}
                onChange={(data) => {
                  setStoreFilter(data ? data.value : "0");
                }}
                classNames={"w-[270px]"}
                isClearable={false}
              />
            </div>
          </div>
        </div>
        <div className="px-4 sm:px-6 lg:px-8 w-full pt-7">
          <Messages />
          <div className="bg-white shadow-xxl rounded-md mb-8">
            <div className="col-span-full w-full bg-white shadow-xxl rounded-md mb-8 relative">
              <Tabs
                options={displayTabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onTabClick={onTabClick}
                isCount={false}
              />
              <div className="w-full">
                <div>
                  <div>
                    {consultationTabs.map((value, index) => {
                      if (index === activeTab) {
                        return (
                          <Fragment key={index}>
                            <All
                              key={value.componentname}
                              activeTab={activeTab}
                              filterData={value.filter}
                              storeFilter={storeFilter}
                              setStoreFilter={setStoreFilter}
                              tab={value}
                              setExportCSVData={setExportCSVData}
                            />
                          </Fragment>
                        );
                      } else {
                        return <Fragment key={index}></Fragment>;
                      }
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestConsultation;
