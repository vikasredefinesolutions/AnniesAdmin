import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import ReactTable from "components/common/table/ReactTableServerSide";
import { DateTimeFormat, TitleNameHelper } from "services/common/helper/Helper";
import { paginationDetails, anniesAnnualData } from "global/Enum";
import Status from "components/common/displayStatus/Status";
import { useLocation } from "react-router";
import CustomreportServices from "services/admin/reports/customReports/CustomReports";
import StateService from "services/admin/state/StateService";
import VarientProductModal from "components/admin/master/common/product/create/forms/VarientProductModal";
import CountryService from "services/admin/country/CountryService";

const ContactUs = () => {
  const { pathname } = useLocation();
  const [Data, setData] = useState([]);
  const dispatch = useDispatch();
  const [selectedRows, setSelectedRows] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [openVarientModal, setOpenVarientModal] = useState({
    name: "",
    data: [{}],
    toShow: false,
  });
  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "name",
      direction: 0,
      priority: 0,
    },
  ]);
  const [,setdataForVarientProducts] = useState([]);
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

  const getContactUs = useCallback(
    (pageIndex = 1) => {
      dispatch(setAddLoading(true));
      CustomreportServices.getInquiriesList({
        args: {
          pageSize: paginationData.pageSize,
          pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
          sortingOptions,
          filteringOptions,
        },
        storeId: [anniesAnnualData.storeId],
        startDate: null,
        endDate: null,
      }).then((response) => {
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
        dispatch(setAddLoading(false));
      });
    },
    [
      filteringOptions,
      paginationData.pageSize,
      sortingOptions,
      paginationData.pageIndex,
    ]
  );

  const getCountriesOptions = useCallback(() => {
    CountryService.getCountry()
      .then((res) => {
        if (res?.data?.success && res?.data?.data) {
          setCountries(res.data.data);
        }
      })
      .catch((err) => {});
  }, []);

  const getStatesOptions = useCallback(() => {
    StateService.getState()
      .then((res) => {
        if (res?.data?.success && res?.data?.data) {
          setStates(res.data.data);
        }
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    getStatesOptions();
    getCountriesOptions();
  }, []);

  const getVarientDataFunc = (currentRowData, pageIndex) => {
    setOpenVarientModal(() => ({
      data: [currentRowData],
      toShow: true,
    }));
  };

  const COLUMNS = [
    {
      id: "name",
      Header: "Name",
      accessor: "name",
      column_name: "name",
      Cell: ({ value }) => {
        return value ? (
          <>
            <div className="text-left">{value}</div>
          </>
        ) : (
          "-"
        );
      },
    },
    {
      id: "email",
      Header: "Email",
      accessor: "email",
      column_name: "email",
      disableShowHide: true,
      Cell: ({ value }) => {
        return value ? (
          <>
            <div className="w-52">
              <div>
                <div className="text-sm font-normal">{value ? value : ""}</div>
              </div>
            </div>
          </>
        ) : (
          ""
        );
      },
    },
    {
      id: "subject",
      Header: "Subject",
      accessor: "subject",
      column_name: "subject",
      Cell: ({ value }) => {
        return value ? (
          <>
            <div className="text-left">{value}</div>
          </>
        ) : (
          "-"
        );
      },
    },
    // {
    //   id: "country",
    //   Header: "country",
    //   accessor: "country",
    //   column_name: "country",
    //   disableSortBy: true,
    //   Cell: ({ value }) => {
    //     return value ? (
    //       <>
    //         <div className="text-left">{value}</div>
    //       </>
    //     ) : (
    //       ""
    //     );
    //   },
    // },
    // {
    //   id: "state",
    //   Header: "state",
    //   accessor: "state",
    //   column_name: "state",
    //   disableSortBy: true,
    //   Cell: ({ value }) => {
    //     return value ? (
    //       <>
    //         <div className="text-left">{value}</div>
    //       </>
    //     ) : (
    //       ""
    //     );
    //   },
    // },
    {
      id: "createdDate",
      Header: "Request Date",
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
      id: "view",
      Header: "View",
      accessor: "view",
      column_name: "view",
      disableSortBy: true,
      Cell: ({ value, row }) => {
        return (
          <>
            <a className="text-indigo-500">
              <span
                className="material-icons-outlined cursor-pointer"
                onClick={() => {
                  getVarientDataFunc(row?.original);
                }}
              >
                visibility
              </span>
            </a>
          </>
        );
      },
    },
  ];
  const viewColumn = [
    {
      id: "name",
      Header: "Name",
      accessor: "name",
      column_name: "name",
      disableSortBy: true,
      Cell: ({ value }) => {
        return value ? (
          <>
            <div className="font-semibold text-left">{value}</div>
          </>
        ) : (
          "-"
        );
      },
    },
    {
      id: "email",
      Header: "Email",
      accessor: "email",
      column_name: "email",
      disableSortBy: true,
      Cell: ({ value }) => {
        return value ? (
          <>
            <div className="font-semibold text-left">{value}</div>
          </>
        ) : (
          "-"
        );
      },
    },
    {
      id: "subject",
      Header: "Subject",
      accessor: "subject",
      column_name: "subject",
      disableSortBy: true,
      Cell: ({ value }) => {
        return value ? (
          <>
            <div className="font-semibold text-left">{value}</div>
          </>
        ) : (
          "-"
        );
      },
    },
    // {
    //   id: "address",
    //   Header: "address",
    //   accessor: "address",
    //   column_name: "address",
    //   disableSortBy: true,
    //   Cell: ({ value }) => {
    //     return value ? (
    //       <>
    //         <div className="font-semibold text-left">{value}</div>
    //       </>
    //     ) : (
    //       ""
    //     );
    //   },
    // },
    // {
    //   id: "city",
    //   Header: "city",
    //   accessor: "city",
    //   column_name: "city",
    //   disableSortBy: true,
    //   Cell: ({ value }) => {
    //     return value ? (
    //       <>
    //         <div className="font-semibold text-left">{value}</div>
    //       </>
    //     ) : (
    //       ""
    //     );
    //   },
    // },
    // {
    //   id: "state",
    //   Header: "state",
    //   accessor: "state",
    //   column_name: "state",
    //   disableSortBy: true,
    //   Cell: ({ value }) => {
    //     return value ? (
    //       <>
    //         <div className="font-semibold text-left">{value}</div>
    //       </>
    //     ) : (
    //       ""
    //     );
    //   },
    // },
    // {
    //   id: "country",
    //   Header: "country",
    //   accessor: "country",
    //   column_name: "country",
    //   disableSortBy: true,
    //   Cell: ({ value }) => {
    //     return value ? (
    //       <>
    //         <div className="font-semibold text-left">{value}</div>
    //       </>
    //     ) : (
    //       ""
    //     );
    //   },
    // },
    // {
    //   id: "zipCode",
    //   Header: "zipCode",
    //   accessor: "zipCode",
    //   column_name: "zipCode",
    //   disableSortBy: true,
    //   Cell: ({ value }) => {
    //     return value ? (
    //       <>
    //         <div className="font-semibold text-left">{value}</div>
    //       </>
    //     ) : (
    //       ""
    //     );
    //   },
    // },
    // {
    //   id: "phone",
    //   Header: "phone",
    //   accessor: "phone",
    //   column_name: "phone",
    //   disableSortBy: true,
    //   Cell: ({ value }) => {
    //     return value ? (
    //       <>
    //         <div className="font-semibold text-left">{value}</div>
    //       </>
    //     ) : (
    //       ""
    //     );
    //   },
    // },
    {
      id: "comment",
      Header: "comment",
      accessor: "comment",
      column_name: "comment",
      disableSortBy: true,
      Cell: ({ value }) => {
        return value ? (
          <>
            <div className="font-semibold text-left">{value}</div>
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
      disableSortBy: true,
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
      id: "status",
      Header: "Status",
      accessor: "recStatus",
      column_name: "recStatus",
      disableSortBy: true,
      Cell: ({ value }) => {
        return (
          value && (
            <>
              {value !== " " && value !== undefined && value !== null ? (
                <Status type={value} />
              ) : (
                ""
              )}
            </>
          )
        );
      },
    },
  ];

  const moreFilterOption = useMemo(() => [
    {
      name: "Country",
      options: countries,
      columnName: "country",
      type: "checkbox",
    },
    {
      name: "States",
      options: states,
      columnName: "state",
      type: "checkbox",
    },
  ]);
  return (
    <>
      <title>{TitleNameHelper({ defaultTitleName: "Contact Us" })}</title>
      <div className="py-4">
        <div className="px-4 sm:px-6 lg:px-8 w-full items-center flex justify-between sticky top-0 z-20 py-2 bg-slate-100">
          <div className="flex items-center">
            <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
              {TitleNameHelper({ defaultTitleName: "Contact Us" })}
            </h1>
          </div>
        </div>
        <div className="px-4 sm:px-6 lg:px-8 w-full pt-7">
          <div className="col-span-full w-full bg-white shadow-xxl rounded-md mb-8 relative">
            <ReactTable
              COLUMNS={COLUMNS}
              DATA={Data}
              {...paginationData}
              setTablePageSize={(value) =>
                setPaginationDataFunc("pageSize", value)
              }
              fetchData={getContactUs}
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
              saveFilter={{ show: true, tabName: pathname + "_" + "contactUs" }}
            />
          </div>
        </div>
      </div>
      <VarientProductModal
        title={"View"}
        openModal={openVarientModal}
        setOpenModal={setOpenVarientModal}
        COLUMNS={viewColumn}
        DATA={openVarientModal.data}
        setdataForVarientProducts={setdataForVarientProducts} 
      />
    </>
  );
};

export default ContactUs;
