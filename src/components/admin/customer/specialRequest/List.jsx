import React, { useCallback, useEffect, useState } from "react";
import Select from "components/common/formComponent/Select";
import { DateTimeFormat, TitleNameHelper } from "services/common/helper/Helper";
import StoreService from "services/admin/store/StoreService";
import { useSelector, useDispatch } from "react-redux";
import { setstoreIdFromDropDown } from "redux/tempData/tempDataAction";
import { paginationDetails, defaultImage } from "global/Enum";
import ReactTable from "components/common/table/ReactTableServerSide";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import SpecialRequest from "services/admin/customer/SpecialRequest";
import Image from "components/common/formComponent/Image";

const List = () => {
  const [Data, setData] = useState([]);
  const [storeData, setStoreData] = useState([]);
  const [openSpecialRequestModal, setOpenSpecialRequestModal] = useState(false);
  const [modalInformation, setModalInformation] = useState({});
  const handleShowModal = () => {
    setOpenSpecialRequestModal((prev) => !prev);
  };
  const dispatch = useDispatch();

  const user = useSelector((store) => store?.user);
  const company = useSelector((store) => store?.CompanyConfiguration);

  const storeIdFromDropDown = useSelector(
    (store) => store?.TempDataReducer?.order?.storeIdFromDropDown
  );

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

  useEffect(() => {
    if (user?.id && company?.id) {
      StoreService.getStoreByUserId({
        userid: user?.id,
        companyConfigurationId: company?.id,
        isSuperUser: user?.isSuperUser,
      })
        .then((response) => {
          if (response?.data?.data && response?.data?.success) {
            if (response?.data?.data && response?.data?.data.length > 0) {
              setStoreData([...response?.data?.data]);
            }
          }
        })
        .catch((error) => { });
    }
  }, []);

  const getSpecialRequestData = useCallback(
    (pageIndex = 1) => {
      if (storeIdFromDropDown && storeIdFromDropDown.length > 0) {
        dispatch(setAddLoading(true));
        SpecialRequest.getSpecialRequest({
          args: {
            pageSize: paginationData.pageSize,
            pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
            sortingOptions,
            filteringOptions: [
              ...filteringOptions,
              {
                field: "storeId",
                operator: 1,
                // value: storeFilter,
                value: storeIdFromDropDown[0].value,
              },
            ],
          },
        }).then((response) => {
          if (response?.data?.success && response?.data?.data) {
            setData(response.data.data.items);
            setPaginationData((prevState) => ({
              ...prevState,
              pageIndex: response?.data?.data?.pageIndex,
              pageSize: response?.data?.data?.pageSize,
              totalCount: response?.data?.data?.totalCount,
              totalPages: response?.data?.data?.totalPages,
              hasPreviousPage: response?.data?.data?.hasPreviousPage,
              hasNextPage: response?.data?.data?.hasNextPage,
            }));
          }
          dispatch(setAddLoading(false));
        });
      }
    },
    [
      storeIdFromDropDown,
      paginationData.pageSize,
      sortingOptions,
      paginationData.pageIndex,
      filteringOptions,
    ]
  );

  useEffect(() => {
    if (storeIdFromDropDown && storeIdFromDropDown.length) {
      getSpecialRequestData();
    }
  }, [storeIdFromDropDown]);

  const COLUMNS = [
    {
      id: "firstName",
      Header: "Frist Name",
      accessor: "firstName",
      column_name: "firstName",
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
      id: "lastName",
      Header: "Last Name",
      accessor: "lastName",
      column_name: "lastName",
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
      id: "email",
      Header: "Email",
      accessor: "email",
      column_name: "email",
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
      id: "phone",
      Header: "Phone",
      accessor: "phone",
      column_name: "phone",
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
      Header: "created Date",
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
      Header: "VIEW",
      accessor: "view",
      column_name: "view",
      Cell: ({ value, row }) => {
        return (
          <>
            <a className="text-indigo-500">
              <span
                className="material-icons-outlined cursor-pointer"
                onClick={() => {
                  handleShowModal();
                  setModalInformation(row?.original);
                  // getVarientDataFunc(row?.original);
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

  return (
    <>
      <title>{TitleNameHelper({ defaultTitleName: "Special Request" })}</title>
      <div className="py-4">
        <div className="px-4 sm:px-6 lg:px-8 w-full items-center flex justify-between sticky top-0 z-20 py-2 bg-slate-100">
          <div className="col-span-full w-full flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
              {TitleNameHelper({ defaultTitleName: "Special Request" })}
            </h1>
            <div className="flex flex-wrap sm:auto-cols-min gap-2">
              <Select
                name=""
                options={storeData}
                isClearable={false}
                // defaultValue={storeFilter}
                defaultValue={
                  storeIdFromDropDown && storeIdFromDropDown.length
                    ? storeIdFromDropDown[0].value
                    : -1
                }
                onChange={(data) => {
                  if (data) {
                    dispatch(setstoreIdFromDropDown([data]));
                  }
                }}
                classNames={"w-[270px]"}
              />
            </div>
          </div>
        </div>
        <div className="px-4 sm:px-6 lg:px-8 w-full pt-7">
          <div className="col-span-full w-full bg-white shadow-xxl rounded-md mb-8 relative">
            <ReactTable
              COLUMNS={COLUMNS}
              DATA={Data}
              {...paginationData}
              fetchData={getSpecialRequestData}
              sortingOptions={sortingOptions}
              setSortingOptions={setSortingOptionHandler}
              setTablePageSize={(value) =>
                setPaginationDataFunc("pageSize", value)
              }
              editColumnFilter={true}
              filteringOptions={filteringOptions}
              setColumnFilteringOptions={setColumnFilteringOptions}
              hiddenColumns={["rowSelection"]}
              morefilter={true}
            />
          </div>
        </div>
      </div>
      {openSpecialRequestModal && (
        <SpecialRequestDataModal
          handleShowModal={handleShowModal}
          modalInformation={modalInformation}
        />
      )}
    </>
  );
};

export default List;

const SpecialRequestDataModal = ({ handleShowModal, modalInformation }) => {
  return (
    <>
      <div
        id="specialRequestModal"
        className="overflow-y-auto overflow-x-hidden fixed z-30 right-0 left-0 top-4 justify-center items-center h-modal md:h-full md:inset-0"
      >
        <div className="w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="relative px-4 w-full max-w-7xl h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow max-h-screen overflow-y-auto">
              <div className="flex justify-between items-start p-5 rounded-t border-b sticky top-0 left-0 bg-white">
                <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl">
                  {"Special Request"}
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                  data-modal-toggle="actionModal"
                  onClick={handleShowModal}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className="gap-6 p-6">
                <div>
                  <div className="flex flex-wrap gap-1 mb-4 items-center">
                    <label className="w-1/4">Store Name : </label>
                    <div className="pl-7 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[12px] pb-[12px] grow">
                      {modalInformation?.storeName}
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-4 items-center">
                  <label className="w-1/4">Customer Name : </label>
                  <div className="pl-7 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[12px] pb-[12px] grow">
                    {`${modalInformation?.firstName} ${modalInformation?.lastName}`}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-4 items-center">
                  <label className="w-1/4"> Email : </label>
                  <div className="pl-7 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[12px] pb-[12px] grow">
                    {modalInformation?.email}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-4 items-center">
                  <label className="w-1/4"> Ship Customer Name : </label>
                  <div className="pl-7 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[12px] pb-[12px] grow">
                    {`${modalInformation?.shipFirstName} ${modalInformation?.shipLastName}`}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-4 items-center">
                  <label className="w-1/4"> Ship To Address : </label>
                  <div className="pl-7 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[12px] pb-[12px] grow">
                    {modalInformation?.shipAddress1 ? (
                      <>
                        {modalInformation?.shipAddress1 + ","}
                        <br />
                      </>
                    ) : (
                      ""
                    )}
                    {modalInformation?.shipAddress2 ? (
                      <>
                        {modalInformation?.shipAddress2 + ","}
                        <br />
                      </>
                    ) : (
                      ""
                    )}
                    {modalInformation?.shipCity
                      ? modalInformation?.shipCity + ","
                      : ""}
                    {modalInformation?.stateName
                      ? modalInformation?.stateName + ","
                      : ""}
                    {modalInformation?.shipZipCode ? (
                      <>
                        {modalInformation?.shipZipCode + ","}
                        <br />
                      </>
                    ) : (
                      ""
                    )}
                    {modalInformation?.countryName}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-4 items-center">
                  <label className="w-1/4"> Item Name : </label>
                  <div className="pl-7 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[12px] pb-[12px] grow">
                    {modalInformation?.itemName}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-4 items-center">
                  <label className="w-1/4"> Item Color : </label>
                  <div className="pl-7 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[12px] pb-[12px] grow">
                    {modalInformation?.color}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-4 items-center">
                  <label className="w-1/4"> Size & Quantity Requested : </label>
                  <div className="pl-7 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[12px] pb-[12px] grow">
                    {modalInformation?.quantity}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-4 items-center">
                  <label className="w-1/4"> Special Request : </label>
                  <div className="pl-7 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[12px] pb-[12px] grow">
                    {modalInformation?.specialRequest}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-4 items-center">
                  <label className="w-1/4"> Before InHandDate : </label>
                  <div className="pl-7 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[12px] pb-[12px] grow">
                    <span className="pr-2">
                      {DateTimeFormat(modalInformation?.beforeInHandDate).date}
                    </span>
                    <span>
                      {DateTimeFormat(modalInformation?.beforeInHandDate).time}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-4 items-center">
                  <label className="w-1/4"> Need-By Date : </label>
                  <div className="pl-7 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[12px] pb-[12px] grow">
                    <span className="pr-2">
                      {DateTimeFormat(modalInformation?.inHandDate).date}
                    </span>
                    <span>
                      {DateTimeFormat(modalInformation?.inHandDate).time}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-4 items-center">
                  <label className="w-1/4"> Company Phone Number : </label>
                  <div className="pl-7 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[12px] pb-[12px] grow">
                    {modalInformation?.phone}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-4 items-center">
                  <label className="w-1/4"> Company Name : </label>
                  <div className="pl-7 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[12px] pb-[12px] grow">
                    {modalInformation?.organizationName}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-4 items-center">
                  <label className="w-1/4">
                    Reason For Give Away Purpose :
                  </label>
                  <div className="pl-7 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[12px] pb-[12px] grow">
                    {modalInformation?.reasonForGiveAwayPurpose}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-4 items-center">
                  <label className="w-1/4">
                    Additional Comments Or Request :
                  </label>
                  <div className="pl-7 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[12px] pb-[12px] grow">
                    {modalInformation?.additionalCommentsOrRequest}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-4 items-center">
                  <label className="w-1/4">
                    Ideas Particular Items Of Interest :
                  </label>
                  <div className="pl-7 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[12px] pb-[12px] grow">
                    {modalInformation?.ideasParticularItemsOfInterest}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-4 items-center">
                  <label className="w-1/4"> Event Name : </label>
                  <div className="pl-7 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[12px] pb-[12px] grow">
                    {modalInformation?.eventName}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-4 items-center">
                  <label className="w-1/4"> Target Audience : </label>
                  <div className="pl-7 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[12px] pb-[12px] grow">
                    {modalInformation?.targetAudience}
                  </div>
                </div>
                <div className="flex flex-wrap mb-4 items-center">
                  <label className="w-1/4"> Message : </label>
                  <div className="w-3/4">
                    <div className="pl-7 ml-1 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[12px] pb-[12px] break-words">
                      {modalInformation?.message}
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-4 items-center">
                  <label className="w-1/4"> Reason : </label>
                  <div className="pl-7 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[12px] pb-[12px] grow">
                    {modalInformation?.reason}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-4 items-center">
                  <label className="w-1/4"> Sport : </label>
                  <div className="pl-7 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[12px] pb-[12px] grow">
                    {modalInformation?.sport}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-4 items-center">
                  <label className="w-1/4"> Budget : </label>
                  <div className="pl-7 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[12px] pb-[12px] grow">
                    {modalInformation?.budget}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-4 items-center">
                  <label className="w-1/4"> Request GiveAway : </label>
                  <div className="pl-7 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[12px] pb-[12px] grow">
                    {modalInformation?.requestGiveAway === true ? "Yes" : "No"}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-4 items-center">
                  <label className="w-1/4"> Desired Branding Uniti Logo : </label>
                  <div className="pl-7 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[12px] pb-[12px] grow">
                    {modalInformation?.isDesiredBrandingUnitiLogo === true ? "Yes" : "No"}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-4 items-center">
                  <label className="w-1/4"> Desired Branding Other Existing Logo : </label>
                  <div className="pl-7 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[12px] pb-[12px] grow">
                    {modalInformation?.isDesiredBrandingOtherExistingLogo === true ? "Yes" : "No"}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-4 items-center">
                  <label className="w-1/4"> Desired Branding New Logo Or Graphic : </label>
                  <div className="pl-7 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[12px] pb-[12px] grow">
                    {modalInformation?.isDesiredBrandingNewLogoOrGraphic === true ? "Yes" : "No"}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-4 items-center">
                  <label className="w-1/4"> Brand Preference : </label>
                  <div className="pl-7 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[12px] pb-[12px] grow">
                    {modalInformation?.brandPreference}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-4 items-center">
                  <label className="w-1/4"> Logo : </label>
                  <div className="pl-7 font-bold flex items-center justify-center border-spacing-1 border-dashed border-2 border-neutral-200 rounded-lg h-36 w-[400px] text-center grow">
                    <div className="flex items-center h-40">
                      <Image
                        src={modalInformation?.logo}
                        className="w-40"
                        containerHeight={"h-20"}
                      />
                    </div>
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
