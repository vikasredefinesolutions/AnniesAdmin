/*Component Name: List
Component Functional Details: User can create or update List master details from here.
Created By: chandan
Created Date: 01-07-2022
Modified By: chandan
Modified Date: 04-07-2022 */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { MasterProductStatusTabs } from "global/Enum";

import DropdownService from "services/common/dropdown/DropdownService";
import CategoryService from "services/admin/category/CategoryService";
import { TitleNameHelper } from "services/common/helper/Helper";
import StoreService from "services/admin/store/StoreService";

import { addActiveTab } from "redux/searchQueryForMGS/SearchQueryAction";

import Tabs from "components/common/Tabs";
import Messages from "components/common/alerts/messages/Index";
import SyncInventoryList from "components/common/others/admin/SyncInventoryList";
import ExportImportInventory from "components/common/others/admin/ExportInventory";

import All from "../views/All";

const List = ({ changeTab }) => {
  const dispatch = useDispatch();

  const user = useSelector((store) => store?.user);
  const company = useSelector((store) => store?.CompanyConfiguration);
  const permission = useSelector((store) => store.permission);
  const { toFill, currentTab } = useSelector((store) => store?.SearchQueryReducers);

  const [activeTab, setActiveTab] = useState(toFill ? currentTab : changeTab);
  const displayTabs = MasterProductStatusTabs;
  const [selectedData, setSelectedData] = useState([]);
  const [openAttributeCloneModal, setOpenAttributeCloneModal] = useState(false);
  const [ShowInventoryList, setShowInventoryList] = useState(false);
  const [ShowImportExportInventory, setShowImportExportInventory] = useState(false);
  const [InventoryTypeId] = useState(false);
  const [InventoryName] = useState(false);
  const [stores, setStores] = useState([]);
  const [moreFilterOptions, setMoreFilterOptions] = useState({
    category: [],
    adminUsers: []
  });

  const onTabClick = (e, index) => { setActiveTab(index); dispatch(addActiveTab(index)) };

  useEffect(() => {
    CategoryService.getCategoryDropdownOptions(-1).then((response) => {
      setMoreFilterOptions((prev) => {
        return { ...prev, category: response.data.data };
      });
    });
    DropdownService.getDropdownValues("adminuser").then((response) => {
      setMoreFilterOptions((prev) => {
        return { ...prev, adminUsers: response.data.data };
      });
    });
  }, []);

  useEffect(() => {
    if (user?.id && company?.id) {
      StoreService.getStoreByUserId({
        userid: user?.id,
        companyConfigurationId: company?.id,
        isSuperUser: user?.isSuperUser
      }).then((response) => {
        if (response.data.data) {
          setStores(response.data.data);
        }
      }).catch((error) => { })
    }
  }, [user, company])

  // const navSyncHandler = () => {
  //   if (selectedData && selectedData.length <= 0) {
  //     dispatch(
  //       setAlertMessage({
  //         view: true,
  //         type: "danger",
  //         message: ValidationMsgs.product.navSyncProductRequired,
  //       })
  //     );
  //   } else {
  //     dispatch(setAddLoading(true));

  //     let productId = selectedData.map(value => value.original.id);
  //     ProductService.productsyncwithnav({
  //       productId: productId
  //     })
  //       .then((response) => {
  //         if (response.data.success) {
  //           dispatch(
  //             setAlertMessage({
  //               view: true,
  //               type: "success",
  //               message: ValidationMsgs.product.navSyncSuccess,
  //             })
  //           );
  //           getDataFunction(1, MasterProductStatusTabs[activeTab].filter);
  //         } else {
  //           dispatch(
  //             setAlertMessage({
  //               view: true,
  //               type: "danger",
  //               message: serverError(response),
  //             })
  //           );
  //         }
  //         dispatch(setAddLoading(false));
  //       })
  //       .catch((errors) => {
  //         dispatch(
  //           setAlertMessage({
  //             view: true,
  //             type: "danger",
  //             message: ValidationMsgs.product.navSyncFailed,
  //           })
  //         );
  //         dispatch(setAddLoading(false));
  //       });
  //   }
  // };
  // const attrClone = () => {
  //   if (selectedData && selectedData.length === 1) {
  //     setOpenAttributeCloneModal((prev) => !prev);
  //   } else {
  //     dispatch(
  //       setAlertMessage({
  //         view: true,
  //         type: "danger",
  //         message: ValidationMsgs.product.productCloneRequired,
  //       })
  //     );
  //   }
  // };
  return (
    <>
      <title>
        {TitleNameHelper({ defaultTitleName: "Product" })}
      </title>
      {!ShowInventoryList ? (
        <>
          <div className="py-4">
            <div className="px-4 sm:px-6 lg:px-8 w-full items-center flex justify-between sticky top-0 z-20 py-2 bg-slate-100">
              {/* Page Title */}
              <div className="col-span-full w-full flex flex-wrap justify-between items-center">
                {/* Title */}
                <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
                  {`Annies Annual & Perennials ${TitleNameHelper({ defaultTitleName: "Product" })}`}
                </h1>
                <div className="flex flex-wrap space-x-2 items-center">
                  {/* <Select
                    options={stores}
                    classNames="w-52 -top-1"
                    placeholder="Select Store"
                    name={"store"}
                    defaultValue={""}
                    onChange={(e) => {
                      dispatch(setSelectedSidebarMenu(e.id));
                      localStorage.setItem("selectedMenu", e.id);
                      navigate(e.value, { replace: true });
                    }}
                  /> */}
                  {/* <NavLink
                    to={"export"}
                    className="btn shadow-none text-indigo-500 hover:text-indigo-600 font-semibold mb-2 "
                  >
                    <span>Export</span>
                  </NavLink> */}
                  {(permission?.isEdit || permission?.isDelete) && (
                    <>
                      {/* <NavLink
                        to="import"
                        type="button"
                        className="btn shadow-none text-indigo-500 hover:text-indigo-600 font-semibold mb-2"
                      >
                        <span>Import</span>
                      </NavLink> */}
                      <NavLink
                        to={`/admin/master/master/create`}
                        className="items-center btn bg-indigo-500 hover:bg-indigo-600 text-white rounded mb-2"
                      >
                        <span className="material-icons-outlined text-[12px]">
                          add
                        </span>
                        <span className="ml-1">Add Product</span>
                      </NavLink>

                      {/* {(MasterProductStatusTabs[activeTab].value ===
                        "Synced with NAV" ||
                        MasterProductStatusTabs[activeTab].value === "All") && (
                          <button
                            type="button"
                            className="items-center btn bg-indigo-500 hover:bg-indigo-600 text-white rounded mb-2"
                            onClick={attrClone}
                          >
                            <span className="material-icons-outlined text-[12px]">
                              add
                            </span>
                            Create Listing / Clone
                          </button>
                        )}
                      
                      {(MasterProductStatusTabs[activeTab].value ===
                        "NAVSyncPending" ||
                        MasterProductStatusTabs[activeTab].value ===
                        "ResyncwithNAV") && (
                          <button
                            type="button"
                            className="items-center btn bg-indigo-500 hover:bg-indigo-600 text-white rounded mb-2"
                            onClick={navSyncHandler}
                          >
                            Sync with NAV
                          </button>
                        )}
                      <button
                        className="items-center btn bg-indigo-500 hover:bg-indigo-600 text-white rounded mb-2"
                        onClick={() => {
                          setShowInventoryList(true);
                          setInventoryTypeId(
                            InventoryTypeForMasterCatalog.SanMarInventoryUpdate
                          );
                          setInventoryName("Sanmar");
                        }}
                      >
                        Sync Sanmar Inventory
                      </button>
                      <button
                        type="button"
                        className="items-center btn bg-indigo-500 hover:bg-indigo-600 text-white rounded mb-2"
                        onClick={() => {
                          setShowInventoryList(true);
                          setInventoryTypeId(
                            InventoryTypeForMasterCatalog.AlphaBorderInventoryUpdate
                          );
                          setInventoryName("Alpha");
                        }}
                      >
                        Sync Alpha Inventory
                      </button>
                      <button
                        type="button"
                        className="items-center btn bg-indigo-500 hover:bg-indigo-600 text-white rounded mb-2"
                        onClick={() => {
                          setShowInventoryList(true);
                          setInventoryTypeId(
                            InventoryTypeForMasterCatalog.ResParkInventoryUpdate
                          );
                          setInventoryName("RepSpark");
                        }}
                      >
                        Sync RepSpark Inventory
                      </button> */}
                      {/* <button
                        type="button"
                        className="items-center btn bg-indigo-500 hover:bg-indigo-600 text-white rounded mb-2"
                        onClick={() => {
                          setShowInventoryList(true);
                          setInventoryTypeId(
                            InventoryTypeForMasterCatalog.NavInventoryUpdate
                          );
                          setInventoryName("NAV");
                        }}
                      >
                        Sync NAV Inventory
                      </button> */}
                    </>
                  )}
                </div>
              </div>
            </div>
            {/* Product Filter */}
            <div className="px-4 sm:px-6 lg:px-8 w-full">
              <Messages />
              <>
                <div className="bg-white shadow-xxl rounded-md mb-8">
                  <div className="col-span-full w-full bg-white shadow-xxl rounded-md mb-8 relative">
                    <div className="lg:sticky z-10 lg:top-[57px] lg:bg-white">
                      <Tabs
                        options={displayTabs}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        onTabClick={onTabClick}
                      />
                    </div>
                    <div className="w-full">
                      {MasterProductStatusTabs.map((value, index) => {
                        if (index === activeTab) {
                          return (
                            <All
                              key={value.componentname}
                              activeTab={activeTab}
                              tab={value}
                              selectedData={selectedData}
                              setSelectedData={setSelectedData}
                              moreFilterOptions={moreFilterOptions}
                              openAttributeCloneModal={openAttributeCloneModal}
                              setOpenAttributeCloneModal={
                                setOpenAttributeCloneModal
                              }
                              stores={stores}
                            />
                          );
                        } else {
                          return "";
                        }
                      })}
                    </div>
                  </div>
                </div>
              </>
            </div></div>
        </>
      ) : (
        <>
          {ShowImportExportInventory ? (
            <ExportImportInventory
              setShowImportExportInventory={setShowImportExportInventory}
              setShowInventoryList={setShowInventoryList}
              InventoryTypeId={InventoryTypeId}
              InventoryName={InventoryName}
            />
          ) : (
            <SyncInventoryList
              setShowInventoryList={setShowInventoryList}
              InventoryTypeId={InventoryTypeId}
              InventoryName={InventoryName}
              setShowImportExportInventory={setShowImportExportInventory}
              ShowImportExportInventory={ShowImportExportInventory}
            />
          )}
        </>
      )}
    </>
  );
};

export default List;
