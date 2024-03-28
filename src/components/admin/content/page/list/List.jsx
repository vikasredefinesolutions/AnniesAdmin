import React, { useEffect, useState, useCallback, Fragment } from 'react'
import { useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom'

import { ContentPageStatus, paginationDetails, contentTabs, anniesAnnualData } from "global/Enum";
import { API } from 'helpers/API';
import { ValidationMsgs } from "global/ValidationMessages";

import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";

import TopicsDetailsServices from "services/admin/topics/TopicsDetailsServices";
import { DateTimeFormat, TitleNameHelper } from "services/common/helper/Helper";
import { serverError } from "services/common/helper/Helper";

import ConfirmDelete from 'components/common/modals/ConfirmDelete';
import Tabs from "components/common/Tabs";
import Messages from "components/common/alerts/messages/Index";

import Actions from "./Actions";
import Blog from './views/Blog';
import WebSitePage from './views/WebSitePage';
import LandingPage from './views/LandingPage';
import ListSideBar from './ListSideBar';
import CreatePopup from '../create/CreatePopup';


const List = () => {
  const dispatch = useDispatch()

  const [activeTab, setActiveTab] = useState(0);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [topic, setTopic] = useState(0);
  const [domainId, setDomainId] = useState("");
  const [deleted, setDeleted] = useState(false)
  const [Data, setData] = useState([]);
  const [, setAllStoreId] = useState([]);
  const [paginationData, setPaginationData] = useState({ ...paginationDetails });
  const [filteringOptions, setColumnFilteringOptions] = useState([{ field: "pageType", operator: 0, value: "website" }]);

  const displayTabs = contentTabs;

  const onTabClick = (e, index) => {
    setActiveTab(index);
  };

  const componentsList = {
    website_page: WebSitePage,
    landing_page: LandingPage,
    blog: Blog,
  }

  const setPaginationDataFunc = (key, value) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "name",
      direction: 0,
      priority: 0,
    },
  ]);

  const setSortingOptionHandler = (column, direction) => {

    setSortingOptions([
      {
        field: column,
        direction: direction,
        priority: 0,
      },
    ]);
  };

  const handleClone = (id) => {
    dispatch(setAddLoading(true))
    TopicsDetailsServices.cloneTopic({
      storeId: [anniesAnnualData.storeId],
      topicId: id,
    })
      .then((response) => {
        if (response.data.success && response.data.data) {
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.pageEditSetting.topic.cloneSuccess,
            })
          );
        } else {
          dispatch(
            setAlertMessage({ type: "danger", message: serverError(response) })
          );
        }
        dispatch(setAddLoading(false))
        getContentTabsData()
      })
      .catch((err) => {
        dispatch(
          setAlertMessage({
            type: "danger",
            message: ValidationMsgs.pageEditSetting.topic.topicNotClone,
          })
        );
        dispatch(setAddLoading(false))
      });
  }

  const handleDelete = (topic) => {
    const url = `/CmsTopics/deleteCmsTopicsById/${topic?.original?.id}.json`
    dispatch(setAddLoading(true))
    // API.get(url).then(() => setDeleted(true)
    API.get(url).then((response) => {
      if (response.data.success && response.data.data) {
        dispatch(
          setAlertMessage({
            type: "success",
            message: ValidationMsgs.pageEditSetting.topic.topicDeleted,
          })
        );
      } else {
        dispatch(
          setAlertMessage({ type: "danger", message: serverError(response) })
        );
      }
      dispatch(setAddLoading(false))
      getContentTabsData()
    })
      .catch((err) => {
        dispatch(
          setAlertMessage({
            type: "danger",
            message: ValidationMsgs.pageEditSetting.topic.topicNotDeleted,
          })
        );
        dispatch(setAddLoading(false))
      });
  };

  const getContentTabsData = useCallback(() => {
    if (domainId !== 0 && domainId !== "") {
      dispatch(setAddLoading(true))

      const params = {
        "args": {
          "pageSize": paginationData.pageSize,
          "pageIndex": paginationData.pageIndex,
          "pagingStrategy": 0,
          "sortingOptions": [...sortingOptions],
          "filteringOptions": [...filteringOptions]
        },
        "storeId": domainId
      }

      TopicsDetailsServices.getTopicsListWithFilter(params)
        .then((res) => {
          if (res?.data?.data?.items) {
            setData(res?.data?.data?.items);
          } else {
            setData([])
          }
          dispatch(setAddLoading(false))
          setDeleted(false)

          const productResponse = res.data.data

          setPaginationData((prevState) => ({
            ...prevState,
            pageIndex: productResponse.pageIndex,
            pageSize: productResponse.pageSize,
            totalCount: productResponse.totalCount,
            totalPages: productResponse.totalPages,
            hasPreviousPage: productResponse.hasPreviousPage,
            hasNextPage: productResponse.hasNextPage,
          }));

        }).catch((err) => {
          dispatch(setAddLoading(false))
        })
    }
  }, [domainId, activeTab, paginationData.pageSize, paginationData.pageIndex, filteringOptions, sortingOptions])

  const handleFetchData = (Data) => {
    if (Data >= 1) {
      setPaginationDataFunc("pageIndex", Data)
    }
  }

  const COLUMNS = [
    {
      id: "title",
      Header: "Name and URL",
      accessor: "title",
      column_name: "title",
      Cell: ({ value, row }) => {
        return value !== null && value !== "" && value !== undefined ? (
          <>
            <div>
              <NavLink
                to={`/admin/Content/Page/edit/setting/${row?.original?.id}`}
              >
                {value}
              </NavLink>

            </div>
            <div className='text-[#707070] text-xs font-normal'>
              <NavLink
                to={`/admin/Content/Page/edit/setting/${row?.original?.id}`}
              >{row?.original?.slug}</NavLink>
            </div>
          </>
        ) : (
          <>
            <div>{value}</div>
            <div className='text-[#707070] text-xs font-normal'>
              <NavLink
                to="/demoLink"
              >demoLink</NavLink>
            </div>
          </>
        );
      }
    },
    {
      id: "status",
      Header: "Publish Status",
      accessor: "status",
      column_name: "status",
      Cell: ({ value }) => {
        return (
          value === 'P'
            ?
            <div className="text-xs inline-block font-medium border border-green-300 bg-green-100 text-green-600 rounded-md text-center px-2.5 py-1 w-28">
              {ContentPageStatus.Publish}
            </div>
            :
            <div className="text-xs inline-block font-medium border border-yellow-300 bg-yellow-100 text-yellow-600 rounded-md text-center px-2.5 py-1 w-28">
              {ContentPageStatus.Draft}
            </div>
        )
      },
    },
    {
      id: "createdAt",
      Header: "Created Date",
      accessor: "createdAt",
      column_name: "createdAt",
      Cell: ({ value }) => {

        return value ? (
          <>
            <div >{DateTimeFormat(value).date} </div>
            <div className="text-[#707070] text-xs font-normal">
              {DateTimeFormat(value).time}
            </div>
          </>
        ) : (
          "-"
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
      id: "updatedAT",
      Header: "Updated Date",
      accessor: "updatedAT",
      column_name: "updatedAT",
      Cell: ({ value }) => {
        return value ? (
          <>
            <div >{DateTimeFormat(value).date} </div>
            <div className="text-[#707070] text-xs font-normal">
              {DateTimeFormat(value).time}
            </div>
          </>
        ) : (
          "-"
        );
      },
    },
    {
      id: "modifiedName",
      Header: "Updated By",
      accessor: "modifiedName",
      column_name: "modifiedName",
    },
    {
      id: "domainName",
      Header: "Domain",
      accessor: "domainName",
      column_name: "domainName",
    },
    {
      id: "publishDate",
      Header: "Publish Date",
      accessor: "publishDate",
      column_name: "publishDate",
      Cell: ({ value }) => {
        return value ? (
          <>
            <div >{DateTimeFormat(value).date} </div>
            <div className="text-[#707070] text-xs font-normal">
              {DateTimeFormat(value).time}
            </div>
          </>
        ) : (
          "-"
        );
      },
    },

    {
      id: "action",
      Header: "",
      accessor: "id",
      column_name: "action",
      Cell: ({ value, row }) => {
        return (
          <>
            <Actions
              id={value}
              row={row}
              setTopic={setTopic}
              setOpenDeleteModal={setOpenDeleteModal}
              handleClone={handleClone}
            />
          </>
        );
      },
      disableSortBy: true,
      disableShowHide: true,
    },
  ];

  useEffect(() => {
    setDomainId(anniesAnnualData.storeId)
  }, [])

  useEffect(() => {
    getContentTabsData();
  }, [domainId, paginationData.pageSize, paginationData.pageIndex, filteringOptions, sortingOptions]);

  useEffect(() => {
    const currentTabName = (activeTab === 0) ? "website" : (activeTab === 1) ? "landing" : "blog"

    const check = filteringOptions.findIndex((obj) => obj.value === currentTabName)
    if (check < 0) {
      setColumnFilteringOptions([{
        field: "pageType",
        operator: 1,
        value: currentTabName
      }])
    }
    handleFetchData(1)
  }, [activeTab]);

  useEffect(() => {
    if (deleted) {
      getContentTabsData();
    }
  }, [deleted])

  return (
    <>
      <title>{TitleNameHelper({ defaultTitleName: "Content Master" })}</title>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="sm:flex sm:justify-between sm:items-center mb-8">
          <div className="col-span-full w-full flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
              {TitleNameHelper({ defaultTitleName: "Content Master" })}
            </h1>
            {domainId !== 0 &&
              <div className="relative inline-flex">
                <CreatePopup domainId={domainId} />
              </div>
            }
          </div>
        </div>
        <Messages />
        <div className="col-span-full w-full bg-white shadow-xxl rounded-md mb-8 pt-8">
          <Tabs
            options={displayTabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onTabClick={onTabClick}
          />
          <div className='flex flex-col md:flex-row'>
            <ListSideBar activeTab={activeTab} domainId={domainId} setDomainId={setDomainId} setAllStoreId={setAllStoreId} />
            {
              displayTabs.map((tab, index) => {
                const Component = componentsList[tab.componentname];

                return (
                  <Fragment key={index}>{activeTab === index &&
                    <div className={`${activeTab !== index && "hidden"} rounded-md mb-8 tab-content text-sm overflow-x-auto w-full`} key={index}>
                      <div className="overflow-x-auto grow">
                        <Component
                          setTopic={setTopic}
                          setOpenDeleteModal={setOpenDeleteModal}
                          columns={COLUMNS}
                          domainId={domainId}
                          deleted={deleted}
                          setDeleted={setDeleted}
                          handleFetchData={handleFetchData}
                          getContentTabsData={getContentTabsData}
                          Data={Data}

                          sortingOptions={sortingOptions}
                          setSortingOptionHandler={setSortingOptionHandler}

                          paginationData={paginationData}
                          setPaginationDataFunc={setPaginationDataFunc}

                          filteringOptions={filteringOptions}
                          setColumnFilteringOptions={setColumnFilteringOptions}
                        />

                      </div>
                      {/* columns,
                     getContentTabsData,
                      Data,
                       setSortingOptionHandler, 
                       sortingOptions, paginationData, 
                       setPaginationDataFunc, filteringOptions,
                        setColumnFilteringOptions */}
                    </div>
                  }
                  </Fragment>
                )
              })
            }
          </div>
          <ConfirmDelete
            handleDelete={handleDelete}
            data={topic}
            message="Deleting this Page will permanently remove this record from your account. This can't be undone"
            title={"Delete"}
            openDeleteModal={openDeleteModal}
            setOpenDeleteModal={setOpenDeleteModal}
          />
        </div>
      </div>
    </>
  )
}

export default List;