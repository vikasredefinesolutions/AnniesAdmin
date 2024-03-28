/*Component Name: Pagination
Component Functional Details:  Pagination .
Created By: PK Kher
Created Date: 7-14-2022
Modified By: PK Kher
Modified Date: 7-14-2022 */

import React from 'react';
// import { useAsyncDebounce } from 'react-table';
import DropdownClassic from "./DropdownClassic";
import { paginationOptions } from "global/Enum";

const Pagination = ({ totalCount, pageIndex, totalPages, pageSize, setTablePageSize, hasPreviousPage, hasNextPage, fetchData, hasPageSize }) => {
    // const [MyPageIndex, setMyPageIndex] = useState(pageIndex);
    // const onChange = useAsyncDebounce(value => {
    //     const page = value ? Number(value) : 1
    //     if (page <= totalPages) {
    //         fetchData(page)
    //     }
    // }, 1000)

    // useEffect(() => {
    //     onChange(MyPageIndex);
    // }, [MyPageIndex])

    return (
        <>
            {totalCount > 0 ? (
                <div className="col-span-full p-5 sticky bottom-0 bg-white">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div
                            className="text-sm text-gray-500 text-center sm:text-left hidden"
                            style={{ visibility: "" }}
                        >
                            Showing
                            <span className="font-medium text-gray-600">
                                &nbsp;{pageIndex === 1 ? 1 : (pageIndex - 1) * pageSize + 1}
                            </span>
                            &nbsp;to
                            <span className="font-medium text-gray-600">
                                &nbsp;
                                {pageIndex * pageSize <= totalCount
                                    ? pageIndex * pageSize
                                    : totalCount}
                            </span>
                            &nbsp;of
                            <span className="font-medium text-gray-600">
                                &nbsp;{totalCount}
                            </span>
                            &nbsp;results
                        </div>
                        {hasPageSize &&
                            <>
                                <div
                                    className="text-sm text-gray-500 text-center sm:text-left "
                                    style={{ visibility: "" }}
                                >
                                    <DropdownClassic
                                        options={paginationOptions}
                                        value={pageSize}
                                        onChangeHandler={(value) => setTablePageSize(value)}
                                    />
                                </div>
                                <div className='ml-10'>
                                    Total Records : {totalCount}
                                </div>
                            </>
                        }
                        <div className={"flex grow justify-end"}>
                            {/* {totalPages > 1 &&
                                <div className="flex items-center justify-between">
                                    <label className="block tracking-wide text-gray-500 text-md ml-4 mr-2">  Go to page: </label>
                                    <div className="flex items-center">
                                        <div className="w-20 relative">
                                            <input
                                                className="w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md"
                                                type={"number"}
                                                name="goToPage"
                                                placeholder={"Page"}
                                                value={MyPageIndex}
                                                onChange={(e) => {
                                                    let finalValue = e.target.value;
                                                    if (e.target.value > totalPages) {
                                                        finalValue = finalValue.slice(0, -1);
                                                    }
                                                    setMyPageIndex(finalValue);
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            } */}
                            <nav
                                className="mb-4 sm:mb-0 sm:order-1 flex ml-5"
                                role="navigation"
                                aria-label="Navigation"
                            >
                                <div className="mr-2">
                                    <button
                                        disabled={!hasPreviousPage}
                                        onClick={() => {
                                            fetchData(pageIndex - 1);
                                        }}
                                        className={`inline-flex items-center justify-center rounded leading-5 px-2.5 py-2 ${hasPreviousPage
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
                                <ul className="flex justify-center">
                                    {(() => {
                                        var count = 0;
                                        var display = true;
                                        return [...Array(totalPages)].map((elementInArray, i) => {
                                            var index = i + 1;
                                            var totalPage = totalPages;
                                            if (totalPage < 7) {
                                                display = true;
                                                return (
                                                    <li
                                                        key={index}
                                                        onClick={() => {
                                                            fetchData(index);
                                                        }}
                                                        pk={index + 1}
                                                        className="cursor-pointer"
                                                    >
                                                        <span
                                                            className={`inline-flex items-center justify-center rounded leading-5 px-3.5 py-2 bg-white border border-slate-200 ${pageIndex === index
                                                                ? "text-indigo-500"
                                                                : "hover:bg-indigo-500  hover:text-white"
                                                                }`}
                                                        >
                                                            {i + 1}
                                                        </span>
                                                    </li>
                                                );
                                            }
                                            if (
                                                index === pageIndex - 1 ||
                                                index === pageIndex ||
                                                index === pageIndex + 1 ||
                                                index === 0 ||
                                                index === totalPage - 1 ||
                                                (pageIndex === 0 && index === pageIndex + 2) ||
                                                (pageIndex === totalPage - 1 &&
                                                    index === pageIndex - 2) || index === totalPage || index === 1
                                            ) {
                                                display = true;
                                                return (
                                                    <li
                                                        key={index}
                                                        onClick={() => {
                                                            fetchData(index);
                                                        }}
                                                        className="cursor-pointer"
                                                    >
                                                        <span
                                                            className={`inline-flex items-center justify-center rounded leading-5 px-3.5 py-2 bg-white border border-slate-200 ${pageIndex === index
                                                                ? "text-indigo-500"
                                                                : "hover:bg-indigo-500  hover:text-white"
                                                                }`}
                                                        >
                                                            {i + 1}
                                                        </span>
                                                    </li>
                                                );
                                            }
                                            if (
                                                index !== 0 &&
                                                index !== totalPage - 1 &&
                                                pageIndex - 1 !== pageIndex - 2 &&
                                                count < 2 &&
                                                display
                                            ) {
                                                display = false;
                                                count++;
                                                return (
                                                    <li key={index} className="cursor-pointer">
                                                        <span
                                                            className={`inline-flex items-center justify-center rounded leading-5 px-3.5 py-2 bg-white border border-slate-200 ${pageIndex === index ? "text-indigo-500" : ""
                                                                }`}
                                                        >
                                                            {"..."}
                                                        </span>
                                                    </li>
                                                );
                                            }
                                            return "";
                                        });
                                    })()}
                                </ul>
                                <div className="ml-2">
                                    <button
                                        disabled={!hasNextPage}
                                        onClick={() => fetchData(pageIndex + 1)}
                                        className={`inline-flex items-center justify-center rounded leading-5 px-2.5 py-2 ${hasNextPage
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
                        </div>
                    </div>
                </div>
            ) : ''}
        </>
    );
};

export default Pagination;
