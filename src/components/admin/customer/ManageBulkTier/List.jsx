import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form as FormikForm } from "formik";
import ReactTable from "components/common/table/ReactTableServerSide";
import { paginationDetails } from "global/Enum";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import Select from "components/common/formComponent/Select";
import ManageBulkTierService from "services/admin/customer/ManageBulkTierService";
import { useSelector } from "react-redux";
// import StoreService from "services/admin/store/StoreService";
import Messages from "components/common/alerts/messages/Index";
import { DateTimeFormat, serverError, TitleNameHelper } from "services/common/helper/Helper";
import Status from "components/common/displayStatus/Status";
import { RecStatusValueForForm } from "global/Enum";
import DropdownService from "services/common/dropdown/DropdownService";
import Input from "components/common/formComponent/Input";
import Dropdown from "components/common/formComponent/Dropdown";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { ValidationMsgs } from "global/ValidationMessages";
import * as Yup from "yup";
import { Link, useLocation } from "react-router-dom";
import StoreBuilderService from "services/admin/storeBuilder/StoreBuilderService";

const List = () => {
  const permission = useSelector((store) => store.permission);
  const user = useSelector((store) => store?.user);
  const company = useSelector((store) => store?.CompanyConfiguration);
  const dispatch = useDispatch();
  const [storeData, setStoreData] = useState([]);
  const [Data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [userNameValues, setUserNameValues] = useState([]);
  const [tierData, setTierData] = useState([]);

  const GlobalLoading = useSelector(
    (store) => store?.GlobalLoaderReducer?.toLoad
  );
  const location = useSelector((store) => store?.location);
  const [navCustomerIdFilter, setNavCustomerIdFilter] = useState("");

  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "name",
      direction: 0,
      priority: 0,
    },
  ]);
  const [filteringOptions, setColumnFilteringOptions] = useState([]);
  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
  });

  const setPaginationDataFunc = (key, value) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const setSortingOptionHandler = (column, direction) => {
    setSortingOptions([
      {
        field: column,
        direction: direction,
        priority: 0,
      },
    ]);
  };
  const getManageBulkTierData = useCallback(
    (pageIndex = 1) => {
      dispatch(setAddLoading(true));
      ManageBulkTierService.getManageBulkTier({
        args: {
          pageSize: paginationData.pageSize,
          pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
          sortingOptions,
          filteringOptions,
        },
        // storeId: store?.value ? store?.value : 0,
      }).then((response) => {
        if (response?.data?.success && response?.data?.data) {
          setData(response.data.data.items);
          setPaginationData((prevState) => ({
            ...prevState,
            pageIndex: response.data.data.pageIndex,
            pageSize: response.data.data.pageSize,
            totalCount: response.data.data.totalCount,
            totalPages: response.data.data.totalPages,
            hasPreviousPage: response.data.data.hasPreviousPage,
            hasNextPage: response.data.data.hasNextPage,
          }));
        }
        dispatch(setAddLoading(false));
      }).catch(() => {
        dispatch(setAddLoading(false));
      })
    },
    [
      filteringOptions,
      paginationData.pageSize,
      sortingOptions,
      paginationData.pageIndex,
    ]
  );

  const updateManageBulkTier = (fields, resetForm) => {
    dispatch(setAddLoading(true));
    ManageBulkTierService.updateManageBulkTier({
      updateBatchTierModel: { ...fields, ...location },
    })
      .then((response) => {
        if (response?.data?.success) {
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.manageBulkTier.updated,
            })
          );
          getManageBulkTierData();
          // dispatch(setAddLoading(false));
          resetForm({});
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
      .catch((errors) => {
        dispatch(
          setAlertMessage({
            type: "danger",
            message: ValidationMsgs.manageBulkTier.notUpdated,
          })
        );
        dispatch(setAddLoading(false));
      });
  };

  const onSubmit = (fields, { resetForm }) => {
    updateManageBulkTier(fields, resetForm);
  };
  useEffect(() => {
    getManageBulkTierData();
  }, []);

  const getStoreDropdownData = useCallback(() => {
    // if (user?.id && company?.id) {
    //   StoreService.getStoreByUserId({
    //     userid: user?.id,
    //     companyConfigurationId: company?.id,
    //     isSuperUser: user?.isSuperUser,
    //   })
    //     .then((response) => {
    //       if (response?.data?.data) {
    //         setStoreData(() => {
    //           return response.data.data;
    //         });
    //         // if (response?.data?.data?.length > 0) {
    //         //   setStore(response?.data?.data[0]);
    //         // }
    //       }
    //     })
    //     .catch((error) => { });
    // }

    if (user?.id && company?.id) {
      StoreBuilderService.storeAndFormBuilderDashboardDropdownList({
        userid: user?.id,
        storeTypeId: 2,
        companyConfigurationId: company?.id,
        isSuperUser: user?.isSuperUser,
        orderBy: 0
      }).then((response) => {
        if (response?.data?.data) {
          let data = response?.data?.data;
          setStoreData([...data]);
        }
      })
        .catch((error) => { });
    }

  }, []);

  useEffect(() => {
    getStoreDropdownData();
  }, []);

  useEffect(() => {
    DropdownService.getDropdownValues("adminuser").then((response) => {
      setUserNameValues(response?.data?.data);
    });
  }, []);

  const getTierData = (storeId) => {
    DropdownService.getDropdownValues("tier", false, storeId).then((response) => {
      setTierData(response?.data?.data);
    });
  };

  // useEffect(() => {
  //   if (storeId > 0) {
  //     getTierData(storeId)
  //   }
  // }, [storeId])


  useEffect(() => {
    if (navCustomerIdFilter) {
      setColumnFilteringOptions([
        {
          field: "navCustomerId",
          operator: 0,
          value: navCustomerIdFilter,
        },
      ]);
    } else if (navCustomerIdFilter === "") {
      setColumnFilteringOptions([
        {
          field: "",
          operator: 0,
          value: "",
        },
      ]);
    }
  }, [navCustomerIdFilter]);

  const COLUMNS = [
    // {
    //   id: "customerId",
    //   Header: "Customer Number (Nav Id)",
    //   accessor: "customerId",
    //   column_name: "customerId",
    //   Cell: ({ value }) => {
    //     return value ? (
    //       <>
    //         <div>{value}</div>
    //       </>
    //     ) : (
    //       ""
    //     );
    //   },
    // },

    {
      id: "storeName",
      Header: "Store Name",
      accessor: "storeName",
      column_name: "storeName",
      Cell: ({ value }) => {
        return value ? (
          <>
            <div>{value}</div>
          </>
        ) : (
          ""
        );
      },
    },

    {
      id: "companyName",
      Header: "Company Name",
      accessor: "companyName",
      column_name: "companyName",
      Cell: ({ value }) => {
        return value ? (
          <>
            <div>{value}</div>
          </>
        ) : (
          ""
        );
      },
    },



    {
      id: "navCustomerId",
      Header: "Customer Number (Nav Id)",
      accessor: "navCustomerId",
      column_name: "navCustomerId",
      Cell: ({ value }) => {
        return value ? (
          <>
            <div>{value}</div>
          </>
        ) : (
          ""
        );
      },
    },

    {
      id: "customerName",
      Header: "Customer Name",
      accessor: "customerName",
      column_name: "customerName",
      Cell: ({ value, row }) => {
        return value ? (
          <>
            <Link to={`/admin/Customer/customer/edit/${row.original.customerId}?tab=5`} className={`font-bold`}>{value}</Link>
          </>
        ) : (
          ""
        );
      },
    },

    {
      id: "currentTier",
      Header: "Current Tier",
      accessor: "currentTier",
      column_name: "currentTier",
      Cell: ({ value }) => {
        return value ? (
          <>
            <div>{value}</div>
          </>
        ) : (
          ""
        );
      },
    },
    {
      id: "oldTier",
      Header: "Old Tier",
      accessor: "oldTier",
      column_name: "oldTier",
      Cell: ({ value }) => {
        return value ? (
          <>
            <div>{value}</div>
          </>
        ) : (
          ""
        );
      },
    },
    {
      id: "createdDate",
      Header: "Created Date",
      accessor: "createdDate",
      column_name: "createdDate",
      Cell: ({ value }) => {
        return value ? (
          <>
            <div>{DateTimeFormat(value).date} </div>
            <div className="text-[#707070] text-xs font-normal">
              {DateTimeFormat(value).time}
            </div>
          </>
        ) : (
          ""
        );
      },
    },
    {
      id: "createdName",
      Header: "Created By",
      accessor: "createdName",
      column_name: "createdName",
    },
    {
      id: "updatedDate",
      Header: "Updated Date",
      accessor: "modifiedDate",
      column_name: "modifiedDate",
      Cell: ({ value }) => {
        return value ? (
          <>
            <div>{DateTimeFormat(value).date} </div>
            <div className="text-[#707070] text-xs font-normal">
              {DateTimeFormat(value).time}
            </div>
          </>
        ) : (
          ""
        );
      },
    },
    {
      id: "updatedBy",
      Header: "Updated By",
      accessor: "modifiedName",
      column_name: "modifiedName",
    },
    {
      id: "status",
      Header: "Status",
      accessor: "recStatus",
      column_name: "recStatus",
      Cell: ({ value }) => {
        if (value !== undefined) {
          return <Status type={value} />;
        } else {
          return "";
        }
      },
    },
  ];
  const moreFilterOption = useMemo(() => [
    {
      name: "Store Name",
      options: storeData,
      columnName: "storeId",
      type: "radio",
    },
    {
      name: "Created By",
      options: userNameValues,
      columnName: "createdBy",
      type: "checkbox",
    },
    {
      name: "Created Date",
      columnName: "createddate",
      options: [],
      type: "date",
    },
    {
      name: "Updated By",
      options: userNameValues,
      columnName: "modifiedBy",
      type: "checkbox",
    },
    {
      name: "Updated Date",
      columnName: "modifiedDate",
      options: [],
      type: "date",
    },
    {
      name: "Status",
      columnName: "recStatus",
      options: RecStatusValueForForm,
      type: "radio",
      conditionalSearch: true,
    },
  ]);
  const { pathname } = useLocation();

  const initialValues = {
    navCustomerId: "",
    currentTier: "",
    storeId: 0,
  };

  const validationSchema = Yup.object({
    navCustomerId: Yup.number().required(
      ValidationMsgs.manageBulkTier.navCustomerId
    ),
    currentTier: Yup.string().trim().required(
      ValidationMsgs.manageBulkTier.currentTier
    ),
    storeId: Yup.number().required(
      ValidationMsgs.common.storeIdRequired
    ),
  });

  return (
    <>
      <title>{TitleNameHelper({ defaultTitleName: "Manage Bulk Tier" })} </title>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full mx-auto">
        <div className="flex justify-between mb-8">
          <div className="flex items-center">
            <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
              {TitleNameHelper({ defaultTitleName: "Manage Bulk Tier" })}
            </h1>
          </div>
        </div>
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ setFieldValue, values }) => {
            return (
              <FormikForm>
                <Messages />
                <div className="p-6">
                  {(permission?.isEdit || permission?.isDelete) && (
                    <div className="grid grid-cols-12 gap-6">
                      <div className="col-span-full lg:col-span-2">
                        <label
                          className="flex uppercase tracking-wide text-gray-500 text-xs font-bold mb-2 min-h-10 items-end"
                          htmlFor="grid-first-name"
                        >
                          {"Customer Number (Nav Id)"}
                          <span className="text-rose-500 text-2xl leading-none">
                            *
                          </span>
                        </label>
                        <Input
                          type={"number"}
                          name="navCustomerId"
                          maxLength={500}
                          defaultValue={navCustomerIdFilter}
                          onChange={(data) => {
                            setFieldValue("navCustomerId", data.target.value);
                            setNavCustomerIdFilter(data.target.value);
                          }}
                        />
                      </div>
                      <div className="col-span-full lg:col-span-2">
                        <label
                          className="flex uppercase tracking-wide text-gray-500 text-xs font-bold mb-2 min-h-10 items-end"
                          htmlFor="grid-first-name"
                        >
                          {"Store Name"}
                          <span className="text-rose-500 text-2xl leading-none">
                            *
                          </span>
                        </label>
                        <Select
                          name={`storeId`}
                          onChange={(e) => {
                            if (e) {
                              setFieldValue("storeId", e.value);
                              getTierData(e.value)
                            } else {
                              setFieldValue("storeId", 0)
                            }
                          }}
                          isClearable={false}
                          defaultValue={values.storeId}
                          options={storeData}
                          isMulti={false}
                        />
                      </div>
                      {/* {(permission?.isEdit || permission?.isDelete) && ( */}
                      <div className="col-span-full lg:col-span-2">
                        <label
                          className="flex uppercase tracking-wide text-gray-500 text-xs font-bold mb-2 min-h-10 items-end"
                          htmlFor="grid-first-name"
                        >
                          {"Tier"}
                          <span className="text-rose-500 text-2xl leading-none">
                            *
                          </span>
                        </label>
                        <Dropdown
                          label="currentTier"
                          name={"currentTier"}
                          options={tierData}
                          isMulti={false}
                          defaultValue={values.currentTier}
                          placeholder="Select Tier"
                          isDisabled={values?.storeId !== 0 ? false : true}
                        />
                      </div>
                      {/* )}   */}
                      {/* {(permission?.isEdit || permission?.isDelete) && ( */}
                      <div className="pt-1 mt-1 col-span-full lg:col-span-2">
                        <div className="flex items-center justify-start p-6 space-x-2 rounded-b h-[80px]">
                          <button
                            disabled={GlobalLoading}
                            type="Submit"
                            className={`flex justify-center btn px-6 bg-indigo-500 hover:bg-indigo-600 text-white`}
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
                  )}
                </div>
              </FormikForm>
            );
          }}
        </Formik>

        <div className="bg-white shadow-xxl rounded-md mb-8">
          <div className="overflow-x-auto max-h-screen">
            <ReactTable
              COLUMNS={COLUMNS}
              DATA={Data}
              {...paginationData}
              setTablePageSize={(value) =>
                setPaginationDataFunc("pageSize", value)
              }
              fetchData={getManageBulkTierData}
              sortingOptions={sortingOptions}
              setSortingOptions={setSortingOptionHandler}
              setColumnFilteringOptions={setColumnFilteringOptions}
              moreFilterOption={moreFilterOption}
              editColumnFilter={true}
              setSelectedRows={setSelectedRows}
              selectedRows={selectedRows}
              filteringOptions={filteringOptions}
              moreFilter={true}
              hiddenColumns={useMemo(() => ["rowSelection"], [])}
              // saveFilter={{
              //   show: true,
              //   tabName: pathname + "_" + "manageBulkTier",
              // }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default List;
