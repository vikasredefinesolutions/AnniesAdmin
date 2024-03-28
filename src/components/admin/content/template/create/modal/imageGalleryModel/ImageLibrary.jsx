import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import Image from "components/common/formComponent/Image";
import ImageUpload from "services/common/imageUpload/ImageUpload";

const ImageLibrary = ({
    folderpath,
    onElementImageChange,
    setOpenImageModel,
}) => {
    const dispatch = useDispatch();
    const [SearchedData, setSearchedData] = useState([]);
    const [Data, setData] = useState([]);
    const [Temp, setTemp] = useState(Data);
    const AdminAppConfigReducers = useSelector(
        (store) => store?.AdminAppConfigReducers,
    );

    const { activePage, nextPage, previousPage, totalPages, totalItems, items } =
        usePagination(Temp);

    const getFileByRootNameListData = useCallback(() => {
        dispatch(setAddLoading(true));
        ImageUpload.getFileNameByRootPath(
            `/${AdminAppConfigReducers["cdn:RootDirectory"]}` + folderpath,
        )
            .then((response) => {
                if (response.data.success) {
                    let data = response.data.data.result.filter((item) =>
                        item.name.includes([
                            ".jpeg",
                            ".jpg",
                            ".jfif",
                            ".pjpeg",
                            ".pjp",
                            ".png",
                            ".apng",
                            ".avif",
                            ".gif",
                            "	.svg",
                            ".webp",
                            ".mp4",
                        ]),
                    );
                    setData(response.data.data.result);
                }
                dispatch(setAddLoading(false));
            })
            .catch(() => {
                dispatch(setAddLoading(false));
            });
    }, [folderpath]);

    const searchStore = (e) => {
        var search = e.target.value.trim();
        if (search !== "") {
            setSearchedData(() => {
                return Data.filter((value) =>
                    value.name.toLowerCase().includes(search.toLowerCase()),
                );
            });
        } else {
            setSearchedData(Data);
        }
    };

    useEffect(() => {
        if (SearchedData.length) {
            setTemp(SearchedData);
        } else {
            setTemp(Data);
        }
    }, [SearchedData, Data]);

    useEffect(() => {
        getFileByRootNameListData();
    }, [folderpath]);

    return (
        <>
            <div className="grow">
                <div className="space-y-6 px-6 pb-2 pt-2">
                    <div className="py-2 border-b border-neutral-200">
                        <input
                            type="text"
                            onChange={searchStore}
                            className="block w-full bg-slate-100 border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md"
                            placeholder="Search Store"
                        />
                    </div>
                    <div className="grid grid-cols-5 gap-4 content-start">
                        {items.length
                            ? items.map((ImagesData, index) => {
                                return (
                                    <>
                                        <div className="h-full" key={index}>
                                            <div className="h-full">
                                                <div
                                                    className="col-span-full sm:col-span-6 xl:col-span-3 bg-white shadow-lg rounded-sm border-2 border-dashed border-spacing-1 hover:border-indigo-500 border-neutral-200 overflow-hidden h-full"
                                                    onClick={() => {
                                                        onElementImageChange(ImagesData?.uri);
                                                        setOpenImageModel(false);
                                                    }}
                                                >
                                                    <div className="h-40 border-b flex justify-center items-center">
                                                        <Image
                                                            className="border border-white h-full"
                                                            containerHeight={"h-full"}
                                                            imageContainerBorderCls={"h-full w-full"}
                                                            src={ImagesData?.filePath}
                                                            alt={ImagesData?.name}
                                                        />
                                                    </div>
                                                    <div className="break-words p-2 text-center font-semibold">
                                                        {ImagesData?.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                );
                            })
                            : ""}
                    </div>
                    {items.length == 0 && (
                        <p className="flex w-full justify-center items-center p-5 rounded-t border-t border-b sticky top-0 left-0 text-red-600 bg-white">
                            No data found as of now.
                        </p>
                    )}
                    {items.length > 0 && (
                        <div className="py-2 bottom-0 sticky bg-white">
                            <div className={"flex w-full justify-end"}>
                                <nav
                                    className="mb-4 sm:mb-0 sm:order-1 flex ml-5"
                                    role="navigation"
                                    aria-label="Navigation"
                                >
                                    <div className="mr-2">
                                        <button
                                            disabled={activePage == 1}
                                            onClick={previousPage}
                                            className={`inline-flex items-center justify-center rounded leading-5 px-2.5 py-2 ${activePage !== 1
                                                    ? "bg-white border border-slate-200 text-slate-600 hover:bg-indigo-500  hover:text-white shadow-sm"
                                                    : "bg-white border border-slate-200 text-slate-300"
                                                }`}
                                        >
                                            <span className="sr-only">Previous</span>
                                            <wbr />
                                            <svg className="h-4 w-4 fill-current" viewBox="0 0 16 16">
                                                <path d="M9.4 13.4l1.4-1.4-4-4 4-4-1.4-1.4L4 8z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="items-center pt-2 text-lg">
                                        (Page <span className="text-indigo-500">{activePage}</span>{" "}
                                        / {totalPages})
                                    </div>
                                    <div className="ml-2">
                                        <button
                                            disabled={activePage == totalPages}
                                            onClick={nextPage}
                                            className={`inline-flex items-center justify-center rounded leading-5 px-2.5 py-2 ${activePage !== totalPages
                                                    ? "bg-white hover:bg-indigo-500 border border-slate-200 text-slate-600 hover:text-white shadow-sm"
                                                    : "bg-white border border-slate-200 text-slate-300"
                                                }`}
                                        >
                                            <span className="sr-only">Next</span>
                                            <wbr />
                                            <svg className="h-4 w-4 fill-current" viewBox="0 0 16 16">
                                                <path d="M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </nav>
                                <div className="items-center pt-1 text-lg">
                                    <span className="font-semibold">Total Records : </span>
                                    <span>{totalItems}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ImageLibrary;

const usePagination = (items, page = 1, perPage = 20) => {
    const [activePage, setActivePage] = useState(page);
    const totalPages = Math.ceil(items.length / perPage);
    const offset = perPage * (activePage - 1);
    const paginatedItems = items.slice(offset, perPage * activePage);

    return {
        activePage,
        nextPage: () => setActivePage((p) => (p < totalPages ? p + 1 : p)),
        previousPage: () => setActivePage((p) => (p > 1 ? p - 1 : p)),
        totalPages,
        totalItems: items.length,
        items: paginatedItems,
    };
};
