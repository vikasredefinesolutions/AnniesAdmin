import React, { Fragment, useState } from 'react'
import Messages from "components/common/alerts/messages/Index";
import ReactTable from 'components/common/table/ReactTableServerSide';
import { paginationDetails, AssetLibraryBasePath } from 'global/Enum';
import { useCallback } from 'react';
import BlobUploadService from 'services/common/blobUpload/BlobUploadService';
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { useDispatch, useSelector } from "react-redux";
import { TitleNameHelper } from "services/common/helper/Helper";
import ImageGallery from '../../template/create/modal/imageGalleryModel/ImageGallery';
import CopyToClipboard from 'components/common/formComponent/CopyToClipboard';

const List = () => {

    const dispatch = useDispatch();
    const searchQuery = useSelector((store) => store?.SearchQueryReducers);
    const AdminAppConfigReducers = useSelector((store) => store?.AdminAppConfigReducers);
    const [OpenImageModel, setOpenImageModel] = useState(false);
    const [isCopied, setIsCopied] = useState("");

    const COLUMNS = [
        {
            id: "name",
            Header: "Name",
            accessor: "name",
            column_name: "name",
            Cell: ({ value, row }) => {
                return value !== null && value !== "" && value !== undefined && row.original.contentType === 'Folder' ? (
                    <>
                        <div className="flex items-center cursor-pointer" onDoubleClick={() => getAssetsLibraryData(row.original.filePath)}>
                            <div className="h-10 w-10 mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ fill: '#000' }}>
                                    <path fill="#FFA000" d="M40,12H22l-4-4H8c-2.2,0-4,1.8-4,4v8h40v-4C44,13.8,42.2,12,40,12z"></path>
                                    <path fill="#FFCA28" d="M40,12H8c-2.2,0-4,1.8-4,4v20c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V16C44,13.8,42.2,12,40,12z"> </path>
                                </svg>
                            </div>
                            <span >{value}</span>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex">
                            <img className="h-10 w-10 mr-4" src={row?.original?.uri} alt="" />
                            <span className="font-medium leading-10">{value}</span>
                        </div>
                    </>
                );
            }
        },
        {
            id: "uri",
            Header: (headerData) => {
                 const foundAFile = headerData.data.some((obj)=> obj.contentType === "File")
                return (
                    <div className="w-32">
                        {foundAFile ? "Copy URL To Clipboard" : ""}
                    </div>
                )
            },
            accessor: "uri",
            column_name: "uri",
            disableSortBy: true,
            Cell : ({value, row}) => <div className="w-32">{row?.original?.contentType === "File" ? <CopyToClipboard copyText={value} isCopied={isCopied} setIsCopied={setIsCopied}/> : ""}</div>
        },
        {
            id: "contentType",
            Header: "Type",
            accessor: "contentType",
            column_name: "contentType",
        },
    ];

    const GRIDCOLUMNS = [
        {
            id: "name",
            Header: "Name",
            accessor: "name",
            column_name: "name",
            Cell: ({ value, row }) => {
                return value !== null && value !== "" && value !== undefined && row.values.contentType === 'Folder' ? (
                    <>
                        <label htmlFor="items01" className="mb-2 border border-gray-300 shadow-lg px-4 py-4 hover:border-indigo-500 flex flex-wrap justify-center cursor-pointer relative" onDoubleClick={() => getAssetsLibraryData(row.original.filePath)}>
                            <div>
                                <span className="text-center w-full">
                                    <svg className="w-full h-36" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48 48" style={{ fill: '#000000' }}>
                                        <path fill="#FFA000" d="M40,12H22l-4-4H8c-2.2,0-4,1.8-4,4v8h40v-4C44,13.8,42.2,12,40,12z"></path>
                                        <path fill="#FFCA28" d="M40,12H8c-2.2,0-4,1.8-4,4v20c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V16C44,13.8,42.2,12,40,12z"></path>
                                    </svg>
                                </span>
                                <div className="block text-center pt-2">{value}</div>
                            </div>
                        </label>
                    </>
                ) : (
                    <>
                        <label htmlFor="item05" className="mb-2 border border-gray-300 shadow-lg px-4 py-4 hover:border-indigo-500 flex flex-wrap justify-center cursor-pointer relative">
                            {/* <div className="absolute right-2 top-1">
                                <label htmlFor="color_logo" className="inline-block w-6 h-6 text-indigo-500 cursor-pointer">
                                    <span className="material-icons-outlined">edit</span>
                                </label>
                            </div> */}
                            <div>
                                <img className="max-w-full h-36" src={row?.original?.uri} alt="" />
                                <div className="text-center pt-2">{value}</div>
                                <div className="text-center pt-2">{row?.original?.contentType === "File" ? <CopyToClipboard copyText={value} isCopied={isCopied} setIsCopied={setIsCopied}/> : ""}</div>
                            </div>
                        </label>
                    </>
                );
            }
        },
        {
            id: "contentType",
            Header: "Type",
            accessor: "contentType",
            column_name: "contentType",
        },
    ];

    const BasePath = `/${AdminAppConfigReducers["cdn:RootDirectory"]}${AssetLibraryBasePath}`;
    const [Data, setData] = useState([]);
    const [currentPath, setCurrentPath] = useState('');
    const [paginationData, setPaginationData] = useState({ ...paginationDetails });
    const [filteringOptions, setColumnFilteringOptions] = useState([]);
    const [hiddenColumns, setHiddenColumns] = useState(['rowSelection', 'visibility', 'size']);

    const [GridView, setGridView] = useState(false);
    const setPaginationDataFunc = (key, value) => {
        setPaginationData((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    // console.log(currentPath,"currentPath", currentPath.replace(BasePath, ''))

    const [sortingOptions, setSortingOptions] = useState([
        {
            field: "name",
            direction: 0,
            priority: 0,
        },
    ]);

    // const handleShowModel = () => {
    //     setOpenImageModel((prev) => !prev);
    //   };

    const setSortingOptionHandler = (column, direction) => {
        setSortingOptions([
            {
                field: column,
                direction: direction,
                priority: 0,
            },
        ]);
    };

    const getAssetsLibraryData = useCallback((pathName = BasePath + searchQuery?.searchQuery) => {
        dispatch(setAddLoading(true))

        // console.log("pathName ", pathName);
// const currentBredCrum = pathName.replace(`${BasePath}/`, '')
        setCurrentPath(pathName);
        BlobUploadService.getAndCheckFilesByFolderPath(pathName)
            .then((res) => {
                setData(res.data.data.result);
                dispatch(setAddLoading(false))
            })
            .catch((err) => {
                dispatch(setAddLoading(false))
            })
    }, [searchQuery?.searchQuery]);

    return (
        <>
            <title>{TitleNameHelper({ defaultTitleName: "Asset Library" })}</title>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full">
                <div className="grid grid-cols-12">
                    <div className="col-span-full w-full flex justify-between mb-8">
                        <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
                            {TitleNameHelper({ defaultTitleName: "Asset Library" })}
                        </h1>
                        <div className="flex items-center gap-2">
                            <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                                onClick={()=> setOpenImageModel(true)}
                            >
                                <span className="material-icons-outlined">add</span>
                                <span className="ml-1"> Image Library </span>
                            </button>
                        </div>                        
                        <div className="flex-wrap sm:auto-cols-min gap-2 hidden">
                            <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                                <span className="material-icons-outlined text-sm">file_upload</span>
                                <span className="ml-1">Upload files</span>
                            </button>
                            <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                                <span className="ml-1">Create folder</span>
                            </button>
                        </div>
                    </div>
                </div>
                <Messages />
                <div className="col-span-full w-full bg-white shadow-xxl rounded-md mb-8 relative">
                    <BreadCrumb currentPath={currentPath} BasePath={BasePath} getAssetsLibraryData={getAssetsLibraryData} />
                    <ReactTable
                        COLUMNS={GridView ? GRIDCOLUMNS : COLUMNS}
                        DATA={Data}
                        {...paginationData}
                        setTablePageSize={(value) =>
                            setPaginationDataFunc("pageSize", value)
                        }
                        fetchData={getAssetsLibraryData}
                        sortingOptions={sortingOptions}
                        setSortingOptions={setSortingOptionHandler}
                        editColumnFilter={GridView ? false : true}
                        filteringOptions={filteringOptions}
                        setColumnFilteringOptions={setColumnFilteringOptions}
                        hiddenColumns={hiddenColumns}
                        setHiddenColumns={setHiddenColumns}

                        // Grid View Props start
                        // pageSize={GridView? 30 : paginationData.pageSize}
                        // hasPageSize={GridView? false : paginationData.hasPageSize}
                        GridView={GridView}
                        colSpan={6}
                        Gap={6}
                        // Grid View Props end

                        extraFilter={[
                            // { Component : ExportButton },
                            { Component: viewButton, setGridView, GridView, setHiddenColumns },
                            // { Component : TrashButton }
                        ]}

                    />
                </div>
            </div>
            {OpenImageModel && 
                <ImageGallery 
                    setOpenImageModel={setOpenImageModel}
                    onElementImageChange={()=>{}}
                    folderpath={"/1/store/5/images/"}
                    OpenImageModel={OpenImageModel}
                    from={"Element Background"}
                    ImageUploadName={"backgroundImage"}
                    ImageUploadId={"backgroundImage"}
                    ImageUrl={"imageURL"}
                    backProp={"backProp"}
                />
            }
        </> 
    )
}

export default List

const viewButton = ({ setGridView, GridView, setHiddenColumns }) => {
    return (
        <>
            <div className="inline-flex shadow-sm border-gray-300 text-gray-600 ml-1" role="group">
                <div onClick={() => { setGridView(true); setHiddenColumns(['rowSelection', 'contentType']) }} className={`flex flex-wrap rounded-l items-center text-sm px-3 py-2 leading-6 bg-white border hover:text-indigo-500 hover:border-indigo-300 ${GridView ? "text-indigo-500 border-indigo-300" : "border-gray-300"} cursor-pointer`}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="fill-current w-4 h-4 mr-2"
                    >
                        <rect x="3" y="3" width="7" height="7"></rect>
                        <rect x="14" y="3" width="7" height="7"></rect>
                        <rect x="14" y="14" width="7" height="7"></rect>
                        <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
                    <span>Grid</span>
                </div>
                <div onClick={() => { setGridView(false); setHiddenColumns(['rowSelection', 'visibility', 'size']) }} className={`flex flex-wrap rounded-r items-center text-sm px-3 py-2 leading-6 bg-white border hover:text-indigo-500 hover:border-indigo-300 ${!GridView ? "text-indigo-500 border-indigo-300" : "border-gray-300"}  text-gray-600 cursor-pointer`}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="fill-current w-4 h-4 mr-2"
                    >
                        <line x1="8" y1="6" x2="21" y2="6"></line>
                        <line x1="8" y1="12" x2="21" y2="12"></line>
                        <line x1="8" y1="18" x2="21" y2="18"></line>
                        <line x1="3" y1="6" x2="3.01" y2="6"></line>
                        <line x1="3" y1="12" x2="3.01" y2="12"></line>
                        <line x1="3" y1="18" x2="3.01" y2="18"></line>
                    </svg>
                    <span>List</span>
                </div>
            </div>
        </>
    );
}

const BreadCrumb = ({ currentPath, BasePath, getAssetsLibraryData }) => {
    let breadCrumbArr = currentPath.replace(BasePath, '').split('/');
    let redirectPath = BasePath;
    return (
        <>
            <div className="bg-white px-5 pt-5">
                <div className="flex">
                    <span className='text-sm py-1 pr-1 text-gray-500 hover:text-indigo-600 flex items-center cursor-pointer'
                        onClick={() => getAssetsLibraryData(BasePath)}>
                        <span className="material-icons-outlined text-sm">home</span>
                        <span className="ml-1">Home</span>
                    </span>

                    {
                        breadCrumbArr &&
                        breadCrumbArr.length > 0 &&
                        breadCrumbArr.map((element, index, row) => {
                            redirectPath = redirectPath + element + '/';
                            let pathData = redirectPath;
                            return (element ? (
                                <span
                                    className='text-sm py-1 pr-1 text-gray-500 hover:text-indigo-600 flex items-center cursor-pointer last:cursor-default last:text-indigo-600'
                                    key={index}
                                    onClick={() => (row.length !== index + 1) ? getAssetsLibraryData(pathData) : ''}>

                                    <span className="text-sm py-1 px-1 text-gray-500" >/</span>
                                    <span className="text-sm py-1 px-1">
                                        {element}
                                    </span>
                                </span>
                            ) : (
                                <Fragment key={index}></Fragment>
                            )
                            );
                        })
                    }
                </div>
            </div>
        </>
    )
}