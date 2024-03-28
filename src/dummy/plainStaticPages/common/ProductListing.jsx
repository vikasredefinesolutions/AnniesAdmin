import React from "react";

const ProductListing = () => {
    return (
        <>
            <section className="bg-tertiary bg-top bg-contain bg-no-repeat overflow-x-hidden 2xl:overflow-x-visible" style={{ background: `url("https://ystore.us/HTML/Annies-Annuals/images/results-section-top-floral.png")` }}>
                <div className="bg-bottom bg-contain bg-no-repeat" style={{ background: `url("https://ystore.us/HTML/Annies-Annuals/images/results-section-bottom-floral.png")` }}>
                    <div className="container mx-auto relative">
                        <div className="pt-[20px]">
                            <div className>
                                <ul className="flex flex-wrap items-center gap-[10px] text-[14px] font-semibold font-sub">
                                    <li className>
                                        <a href="javasript:void(0);" className="text-anchor">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="21.621"
                                                height="19.897"
                                                viewBox="0 0 21.621 19.897"
                                            >
                                                <path
                                                    id="Path_48756"
                                                    data-name="Path 48756"
                                                    d="M2.25,12,11.2,3.045a1.126,1.126,0,0,1,1.591,0L21.75,12M4.5,9.75V19.875A1.125,1.125,0,0,0,5.625,21H9.75V16.125A1.125,1.125,0,0,1,10.875,15h2.25a1.125,1.125,0,0,1,1.125,1.125V21h4.125A1.125,1.125,0,0,0,19.5,19.875V9.75M8.25,21H16.5"
                                                    transform="translate(-1.189 -1.853)"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="1.5"
                                                />
                                            </svg>
                                        </a>
                                    </li>
                                    <li className>/</li>
                                    <li className>Perennial Plants for Your Garden</li>
                                </ul>
                            </div>
                        </div>
                        <div className="absolute left-[-12%] top-[13%]  2xl:inline-block">
                            <img src="https://ystore.us/HTML/Annies-Annuals/images/butterfly-1.png" alt />
                        </div>
                        <div className="absolute left-[-3%] bottom-[18%]  2xl:inline-block">
                            <img src="https://ystore.us/HTML/Annies-Annuals/images/bee-small.png" alt />
                        </div>
                        <div className="md:flex flex-wrap justify-between items-center w-full py-[20px] lg:pb-[15px] ">
                            <div className="font-sub font-bold text-2xl-text py-2 sm:py-0">
                                998 Results
                            </div>
                            <div className="py-2 sm:py-0">
                                <div
                                    x-data="{ open: false, selected: 0 }"
                                    className="relative inline-block text-left z-10"
                                >
                                    <div className="flex items-center">
                                        <button
                                            type="button"
                                            className="group inline-flex items-center justify-between text-default-text bg-tertiary w-[250px] px-2 py-3 leading-none border border-primary rounded-xs"
                                            id="menu-button"
                                        >
                                            <span>
                                                <span>Sort by:</span>
                                                <span>Most Popular</span>
                                            </span>
                                            <span className="material-icons-outlined text-lg leading-none">
                                                expand_more
                                            </span>
                                        </button>
                                    </div>
                                    <div
                                        className="origin-top-right absolute right-0 mt-0 w-[250px] border border-primary bg-tertiary ring-1 ring-black ring-opacity-5 focus:outline-none rounded-xs"
                                        style={{ display: "none" }}
                                    >
                                        <div className="py-1" x-ref="options">
                                            <button
                                                type="button"
                                                className="w-full text-left px-2 py-1 text-default-text flex items-center gap-2 text-black"
                                            >
                                                <span className="material-icons-outlined text-default-text text-default">
                                                    check
                                                </span>
                                                <span>Most Popular</span>
                                            </button>
                                            <button
                                                type="button"
                                                className="w-full text-left px-2 py-1 text-default-text flex items-center gap-2 text-black"
                                            >
                                                <span className="material-icons-outlined text-default-text text-default opacity-0">
                                                    check
                                                </span>
                                                <span>Price ($ - $$$)</span>
                                            </button>
                                            <button
                                                type="button"
                                                className="w-full text-left px-2 py-1 text-default-text flex items-center gap-2 text-black"
                                            >
                                                <span className="material-icons-outlined text-default-text text-default opacity-0">
                                                    check
                                                </span>
                                                <span>Price ($$$ - $)</span>
                                            </button>
                                            <button
                                                type="button"
                                                className="w-full text-left px-2 py-1 text-default-text flex items-center gap-2 text-black"
                                            >
                                                <span className="material-icons-outlined text-default-text text-default opacity-0">
                                                    check
                                                </span>
                                                <span>Name (A - Z)</span>
                                            </button>
                                            <button
                                                type="button"
                                                className="w-full text-left px-2 py-1 text-default-text flex items-center gap-2 text-black"
                                            >
                                                <span className="material-icons-outlined text-default-text text-default opacity-0">
                                                    check
                                                </span>
                                                <span>Highest Rated</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap mx-[-15px]">
                            <div className="md:w-4/12 xl:w-3/12 w-full px-[15px]">
                                <div className="w-full">
                                    <div className="md:hidden p-2 sticky top-0 left-0 mb-[20px]">
                                        <div className="mt-[20px] bg-bottom bg-cover bg-no-repeat" style={{ background: `url("https://ystore.us/HTML/Annies-Annuals/images/results-section-bottom-floral.png")` }}>
                                            <div className="font-sub font-bold text-[16px] py-2">
                                                998 Results
                                            </div>
                                            <div className="font-sub font-bold mb-[10px] text-[14px] capitalize">
                                                Applied Filters
                                            </div>
                                            <div className="flex flex-wrap items-center gap-[5px]">
                                                <div className="flex flex-wrap items-center gap-[10px] bg-[#FCEEFF] rounded-sm px-[10px] py-[5px] text-[#634B91] border border-[#694D84]">
                                                    <a
                                                        href="javascript:void(0);"
                                                        className="text-[12px] capitalize"
                                                    >
                                                        Summer
                                                    </a>
                                                    <span className="material-icons-outlined text-[12px] leading-none">
                                                        close
                                                    </span>
                                                </div>
                                                <div className="flex flex-wrap items-center gap-[10px] bg-[#FCEEFF] rounded-sm px-[10px] py-[5px] text-[#634B91] border border-[#694D84]">
                                                    <a
                                                        href="javascript:void(0);"
                                                        className="text-[12px] capitalize"
                                                    >
                                                        Low Water
                                                    </a>
                                                    <span className="material-icons-outlined text-[12px] leading-none">
                                                        close
                                                    </span>
                                                </div>
                                                <a
                                                    href="javascript:void(0);"
                                                    className="text-[12px] text-[#634B91] uppercase"
                                                >
                                                    Clear All
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative md:block">
                                        <div className="pb-[20px] text-normal-text font-sub font-bold">
                                            Filter by:
                                        </div>
                                        <div className="w-full px-[15px] md:px-0">
                                            <div className="border border-transparent border-b border-b-gray-border mb-[20px] p-[15px] bg-[#EDFBFF] !border-[#D4D4D4] rounded-tl-sm rounded-br-sm">
                                                <button type="button" className="flex items-center justify-between w-full group">
                                                    <div className="text-default-text font-semibold block text-primary mb-[15px] font-sub">
                                                        Zone
                                                    </div>
                                                </button>
                                                <div className="text-default-text mb-[15px]">
                                                    <div
                                                        x-data="{ open: false}"
                                                        className="relative text-left z-10 mb-[15px]"
                                                    >
                                                        <div className="flex items-center">
                                                            <button
                                                                type="button"
                                                                className="group inline-flex items-center justify-between text-default-text bg-[#EDFBFF] w-full px-2 py-3 leading-none border border-primary rounded-xs"
                                                                id="menu-button1"
                                                            >
                                                                <span>
                                                                    <span>All</span>
                                                                </span>
                                                                <span className="material-icons-outlined text-lg leading-none">
                                                                    expand_more
                                                                </span>
                                                            </button>
                                                        </div>
                                                        <div
                                                            className="origin-top-right absolute right-0 mt-0 w-full border border-primary bg-[#EDFBFF] ring-1 ring-black ring-opacity-5 focus:outline-none rounded-xs"
                                                            style={{ display: "none" }}
                                                        >
                                                            <div className="p-[15px]" x-ref="options">
                                                                <ul className="max-h-[400px] overflow-y-auto">
                                                                    <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                        <div className="flex items-center">
                                                                            <input
                                                                                id="Zone-0"
                                                                                name="Zone[]"
                                                                                defaultValue
                                                                                type="radio"
                                                                                className="h-5 w-5 border-gray-300 rounded"
                                                                            />
                                                                            <label
                                                                                htmlFor="Zone-0"
                                                                                className="ml-[10px] font-sub text-small-text font-semibold"
                                                                            >
                                                                                1a
                                                                            </label>
                                                                        </div>
                                                                        <div className="font-sub text-small-text font-semibold mr-[5px]">
                                                                            <span className="text-[#7D826C]">
                                                                                (1)
                                                                            </span>
                                                                        </div>
                                                                    </li>
                                                                    <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                        <div className="flex items-center">
                                                                            <input
                                                                                id="Zone-1"
                                                                                name="Zone[]"
                                                                                defaultValue
                                                                                type="radio"
                                                                                className="h-5 w-5 border-gray-300 rounded"
                                                                            />
                                                                            <label
                                                                                htmlFor="Zone-1"
                                                                                className="ml-[10px] font-sub text-small-text font-semibold"
                                                                            >
                                                                                1b
                                                                            </label>
                                                                        </div>
                                                                        <div className="font-sub text-small-text font-semibold mr-[5px]">
                                                                            <span className="text-[#7D826C]">
                                                                                (1)
                                                                            </span>
                                                                        </div>
                                                                    </li>
                                                                    <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                        <div className="flex items-center">
                                                                            <input
                                                                                id="Zone-2"
                                                                                name="Zone[]"
                                                                                defaultValue
                                                                                type="radio"
                                                                                className="h-5 w-5 border-gray-300 rounded"
                                                                            />
                                                                            <label
                                                                                htmlFor="Zone-2"
                                                                                className="ml-[10px] font-sub text-small-text font-semibold"
                                                                            >
                                                                                2a
                                                                            </label>
                                                                        </div>
                                                                        <div className="font-sub text-small-text font-semibold mr-[5px]">
                                                                            <span className="text-[#7D826C]">
                                                                                (1)
                                                                            </span>
                                                                        </div>
                                                                    </li>
                                                                    <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                        <div className="flex items-center">
                                                                            <input
                                                                                id="Zone-3"
                                                                                name="Zone[]"
                                                                                defaultValue
                                                                                type="radio"
                                                                                className="h-5 w-5 border-gray-300 rounded"
                                                                            />
                                                                            <label
                                                                                htmlFor="Zone-3"
                                                                                className="ml-[10px] font-sub text-small-text font-semibold"
                                                                            >
                                                                                2b
                                                                            </label>
                                                                        </div>
                                                                        <div className="font-sub text-small-text font-semibold mr-[5px]">
                                                                            <span className="text-[#7D826C]">
                                                                                (1)
                                                                            </span>
                                                                        </div>
                                                                    </li>
                                                                    <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                        <div className="flex items-center">
                                                                            <input
                                                                                id="Zone-4"
                                                                                name="Zone[]"
                                                                                defaultValue
                                                                                type="radio"
                                                                                className="h-5 w-5 border-gray-300 rounded"
                                                                            />
                                                                            <label
                                                                                htmlFor="Zone-4"
                                                                                className="ml-[10px] font-sub text-small-text font-semibold"
                                                                            >
                                                                                3a
                                                                            </label>
                                                                        </div>
                                                                        <div className="font-sub text-small-text font-semibold mr-[5px]">
                                                                            <span className="text-[#7D826C]">
                                                                                (1)
                                                                            </span>
                                                                        </div>
                                                                    </li>
                                                                    <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                        <div className="flex items-center">
                                                                            <input
                                                                                id="Zone-5"
                                                                                name="Zone[]"
                                                                                defaultValue
                                                                                type="radio"
                                                                                className="h-5 w-5 border-gray-300 rounded"
                                                                            />
                                                                            <label
                                                                                htmlFor="Zone-5"
                                                                                className="ml-[10px] font-sub text-small-text font-semibold"
                                                                            >
                                                                                3b
                                                                            </label>
                                                                        </div>
                                                                        <div className="font-sub text-small-text font-semibold mr-[5px]">
                                                                            <span className="text-[#7D826C]">
                                                                                (1)
                                                                            </span>
                                                                        </div>
                                                                    </li>
                                                                    <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                        <div className="flex items-center">
                                                                            <input
                                                                                id="Zone-6"
                                                                                name="Zone[]"
                                                                                defaultValue
                                                                                type="radio"
                                                                                className="h-5 w-5 border-gray-300 rounded"
                                                                            />
                                                                            <label
                                                                                htmlFor="Zone-6"
                                                                                className="ml-[10px] font-sub text-small-text font-semibold"
                                                                            >
                                                                                4a
                                                                            </label>
                                                                        </div>
                                                                        <div className="font-sub text-small-text font-semibold mr-[5px]">
                                                                            <span className="text-[#7D826C]">
                                                                                (1)
                                                                            </span>
                                                                        </div>
                                                                    </li>
                                                                    <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                        <div className="flex items-center">
                                                                            <input
                                                                                id="Zone-7"
                                                                                name="Zone[]"
                                                                                defaultValue
                                                                                type="radio"
                                                                                className="h-5 w-5 border-gray-300 rounded"
                                                                            />
                                                                            <label
                                                                                htmlFor="Zone-7"
                                                                                className="ml-[10px] font-sub text-small-text font-semibold"
                                                                            >
                                                                                4b
                                                                            </label>
                                                                        </div>
                                                                        <div className="font-sub text-small-text font-semibold mr-[5px]">
                                                                            <span className="text-[#7D826C]">
                                                                                (1)
                                                                            </span>
                                                                        </div>
                                                                    </li>
                                                                    <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                        <div className="flex items-center">
                                                                            <input
                                                                                id="Zone-8"
                                                                                name="Zone[]"
                                                                                defaultValue
                                                                                type="radio"
                                                                                className="h-5 w-5 border-gray-300 rounded"
                                                                            />
                                                                            <label
                                                                                htmlFor="Zone-8"
                                                                                className="ml-[10px] font-sub text-small-text font-semibold"
                                                                            >
                                                                                5a
                                                                            </label>
                                                                        </div>
                                                                        <div className="font-sub text-small-text font-semibold mr-[5px]">
                                                                            <span className="text-[#7D826C]">
                                                                                (1)
                                                                            </span>
                                                                        </div>
                                                                    </li>
                                                                    <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                        <div className="flex items-center">
                                                                            <input
                                                                                id="Zone-9"
                                                                                name="Zone[]"
                                                                                defaultValue
                                                                                type="radio"
                                                                                className="h-5 w-5 border-gray-300 rounded"
                                                                            />
                                                                            <label
                                                                                htmlFor="Zone-9"
                                                                                className="ml-[10px] font-sub text-small-text font-semibold"
                                                                            >
                                                                                5b
                                                                            </label>
                                                                        </div>
                                                                        <div className="font-sub text-small-text font-semibold mr-[5px]">
                                                                            <span className="text-[#7D826C]">
                                                                                (1)
                                                                            </span>
                                                                        </div>
                                                                    </li>
                                                                    <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                        <div className="flex items-center">
                                                                            <input
                                                                                id="Zone-10"
                                                                                name="Zone[]"
                                                                                defaultValue
                                                                                type="radio"
                                                                                className="h-5 w-5 border-gray-300 rounded"
                                                                            />
                                                                            <label
                                                                                htmlFor="Zone-10"
                                                                                className="ml-[10px] font-sub text-small-text font-semibold"
                                                                            >
                                                                                6a
                                                                            </label>
                                                                        </div>
                                                                        <div className="font-sub text-small-text font-semibold mr-[5px]">
                                                                            <span className="text-[#7D826C]">
                                                                                (1)
                                                                            </span>
                                                                        </div>
                                                                    </li>
                                                                    <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                        <div className="flex items-center">
                                                                            <input
                                                                                id="Zone-11"
                                                                                name="Zone[]"
                                                                                defaultValue
                                                                                type="radio"
                                                                                className="h-5 w-5 border-gray-300 rounded"
                                                                            />
                                                                            <label
                                                                                htmlFor="Zone-11"
                                                                                className="ml-[10px] font-sub text-small-text font-semibold"
                                                                            >
                                                                                6b
                                                                            </label>
                                                                        </div>
                                                                        <div className="font-sub text-small-text font-semibold mr-[5px]">
                                                                            <span className="text-[#7D826C]">
                                                                                (1)
                                                                            </span>
                                                                        </div>
                                                                    </li>
                                                                    <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                        <div className="flex items-center">
                                                                            <input
                                                                                id="Zone-12"
                                                                                name="Zone[]"
                                                                                defaultValue
                                                                                type="radio"
                                                                                className="h-5 w-5 border-gray-300 rounded"
                                                                            />
                                                                            <label
                                                                                htmlFor="Zone-12"
                                                                                className="ml-[10px] font-sub text-small-text font-semibold"
                                                                            >
                                                                                7a
                                                                            </label>
                                                                        </div>
                                                                        <div className="font-sub text-small-text font-semibold mr-[5px]">
                                                                            <span className="text-[#7D826C]">
                                                                                (1)
                                                                            </span>
                                                                        </div>
                                                                    </li>
                                                                    <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                        <div className="flex items-center">
                                                                            <input
                                                                                id="Zone-13"
                                                                                name="Zone[]"
                                                                                defaultValue
                                                                                type="radio"
                                                                                className="h-5 w-5 border-gray-300 rounded"
                                                                            />
                                                                            <label
                                                                                htmlFor="Zone-13"
                                                                                className="ml-[10px] font-sub text-small-text font-semibold"
                                                                            >
                                                                                7b
                                                                            </label>
                                                                        </div>
                                                                        <div className="font-sub text-small-text font-semibold mr-[5px]">
                                                                            <span className="text-[#7D826C]">
                                                                                (1)
                                                                            </span>
                                                                        </div>
                                                                    </li>
                                                                    <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                        <div className="flex items-center">
                                                                            <input
                                                                                id="Zone-14"
                                                                                name="Zone[]"
                                                                                defaultValue
                                                                                type="radio"
                                                                                className="h-5 w-5 border-gray-300 rounded"
                                                                            />
                                                                            <label
                                                                                htmlFor="Zone-14"
                                                                                className="ml-[10px] font-sub text-small-text font-semibold"
                                                                            >
                                                                                8a
                                                                            </label>
                                                                        </div>
                                                                        <div className="font-sub text-small-text font-semibold mr-[5px]">
                                                                            <span className="text-[#7D826C]">
                                                                                (1)
                                                                            </span>
                                                                        </div>
                                                                    </li>
                                                                    <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                        <div className="flex items-center">
                                                                            <input
                                                                                id="Zone-15"
                                                                                name="Zone[]"
                                                                                defaultValue
                                                                                type="radio"
                                                                                className="h-5 w-5 border-gray-300 rounded"
                                                                            />
                                                                            <label
                                                                                htmlFor="Zone-16"
                                                                                className="ml-[10px] font-sub text-small-text font-semibold"
                                                                            >
                                                                                8b
                                                                            </label>
                                                                        </div>
                                                                        <div className="font-sub text-small-text font-semibold mr-[5px]">
                                                                            <span className="text-[#7D826C]">
                                                                                (1)
                                                                            </span>
                                                                        </div>
                                                                    </li>
                                                                    <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                        <div className="flex items-center">
                                                                            <input
                                                                                id="Zone-17"
                                                                                name="Zone[]"
                                                                                defaultValue
                                                                                type="radio"
                                                                                className="h-5 w-5 border-gray-300 rounded"
                                                                            />
                                                                            <label
                                                                                htmlFor="Zone-17"
                                                                                className="ml-[10px] font-sub text-small-text font-semibold"
                                                                            >
                                                                                9a
                                                                            </label>
                                                                        </div>
                                                                        <div className="font-sub text-small-text font-semibold mr-[5px]">
                                                                            <span className="text-[#7D826C]">
                                                                                (1)
                                                                            </span>
                                                                        </div>
                                                                    </li>
                                                                    <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                        <div className="flex items-center">
                                                                            <input
                                                                                id="Zone-18"
                                                                                name="Zone[]"
                                                                                defaultValue
                                                                                type="radio"
                                                                                className="h-5 w-5 border-gray-300 rounded"
                                                                            />
                                                                            <label
                                                                                htmlFor="Zone-18"
                                                                                className="ml-[10px] font-sub text-small-text font-semibold"
                                                                            >
                                                                                9b
                                                                            </label>
                                                                        </div>
                                                                        <div className="font-sub text-small-text font-semibold mr-[5px]">
                                                                            <span className="text-[#7D826C]">
                                                                                (1)
                                                                            </span>
                                                                        </div>
                                                                    </li>
                                                                    <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                        <div className="flex items-center">
                                                                            <input
                                                                                id="Zone-19"
                                                                                name="Zone[]"
                                                                                defaultValue
                                                                                type="radio"
                                                                                className="h-5 w-5 border-gray-300 rounded"
                                                                            />
                                                                            <label
                                                                                htmlFor="Zone-19"
                                                                                className="ml-[10px] font-sub text-small-text font-semibold"
                                                                            >
                                                                                10a
                                                                            </label>
                                                                        </div>
                                                                        <div className="font-sub text-small-text font-semibold mr-[5px]">
                                                                            <span className="text-[#7D826C]">
                                                                                (1)
                                                                            </span>
                                                                        </div>
                                                                    </li>
                                                                    <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                        <div className="flex items-center">
                                                                            <input
                                                                                id="Zone-20"
                                                                                name="Zone[]"
                                                                                defaultValue
                                                                                type="radio"
                                                                                className="h-5 w-5 border-gray-300 rounded"
                                                                            />
                                                                            <label
                                                                                htmlFor="Zone-20"
                                                                                className="ml-[10px] font-sub text-small-text font-semibold"
                                                                            >
                                                                                10b
                                                                            </label>
                                                                        </div>
                                                                        <div className="font-sub text-small-text font-semibold mr-[5px]">
                                                                            <span className="text-[#7D826C]">
                                                                                (1)
                                                                            </span>
                                                                        </div>
                                                                    </li>
                                                                    <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                        <div className="flex items-center">
                                                                            <input
                                                                                id="Zone-21"
                                                                                name="Zone[]"
                                                                                defaultValue
                                                                                type="radio"
                                                                                className="h-5 w-5 border-gray-300 rounded"
                                                                            />
                                                                            <label
                                                                                htmlFor="Zone-21"
                                                                                className="ml-[10px] font-sub text-small-text font-semibold"
                                                                            >
                                                                                11a
                                                                            </label>
                                                                        </div>
                                                                        <div className="font-sub text-small-text font-semibold mr-[5px]">
                                                                            <span className="text-[#7D826C]">
                                                                                (1)
                                                                            </span>
                                                                        </div>
                                                                    </li>
                                                                    <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                        <div className="flex items-center">
                                                                            <input
                                                                                id="Zone-22"
                                                                                name="Zone[]"
                                                                                defaultValue
                                                                                type="radio"
                                                                                className="h-5 w-5 border-gray-300 rounded"
                                                                            />
                                                                            <label
                                                                                htmlFor="Zone-22"
                                                                                className="ml-[10px] font-sub text-small-text font-semibold"
                                                                            >
                                                                                11b
                                                                            </label>
                                                                        </div>
                                                                        <div className="font-sub text-small-text font-semibold mr-[5px]">
                                                                            <span className="text-[#7D826C]">
                                                                                (1)
                                                                            </span>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <a
                                                            href="javascript:void(0);"
                                                            className="text-default-text text-primary underline font-sub"
                                                        >
                                                            FIND MY ZONE
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="border border-transparent border-b border-b-gray-border mb-[20px]">
                                                <button type="button" className="flex items-center justify-between w-full group">
                                                    <div className="text-default-text font-semibold block text-primary mb-[15px] font-sub">
                                                        In Stock
                                                    </div>
                                                    <span className="material-icons-outlined text-default-text font-semibold mb-[15px]">
                                                        add
                                                    </span>
                                                    <span
                                                        className="material-icons-outlined text-default-text font-semibold mb-[15px]"
                                                        style={{ display: "none" }}
                                                    >
                                                        remove
                                                    </span>
                                                </button>
                                                <div
                                                    className="text-default-text"
                                                    style={{ display: "none" }}
                                                >
                                                    <div className>
                                                        <ul className>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="Yes"
                                                                        type="radio"
                                                                        defaultValue
                                                                        name="list-radio"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <label
                                                                        htmlFor="LifeSpan-0"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Yes
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(1)</span>
                                                                </div>
                                                            </li>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="No"
                                                                        type="radio"
                                                                        defaultValue
                                                                        name="list-radio"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <label
                                                                        htmlFor="LifeSpan-1"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        No
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(1)</span>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="border border-transparent border-b border-b-gray-border mb-[20px]">
                                                <button type="button" className="flex items-center justify-between w-full group">
                                                    <div className="text-default-text font-semibold block text-primary mb-[15px] font-sub">
                                                        Bloom Time
                                                    </div>
                                                    <span className="material-icons-outlined text-default-text font-semibold mb-[15px]">
                                                        add
                                                    </span>
                                                    <span
                                                        className="material-icons-outlined text-default-text font-semibold mb-[15px]"
                                                        style={{ display: "none" }}
                                                    >
                                                        remove
                                                    </span>
                                                </button>
                                                <div
                                                    className="text-default-text"
                                                    style={{ display: "none" }}
                                                >
                                                    <div className>
                                                        <ul className>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="BloomTime-0"
                                                                        name="BloomTime[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <label
                                                                        htmlFor="BloomTime-0"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Spring
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(43)</span>
                                                                </div>
                                                            </li>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="BloomTime-1"
                                                                        name="BloomTime[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <label
                                                                        htmlFor="BloomTime-1"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Summer
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(47)</span>
                                                                </div>
                                                            </li>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="BloomTime-2"
                                                                        name="BloomTime[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <label
                                                                        htmlFor="BloomTime-2"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Fall
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(19)</span>
                                                                </div>
                                                            </li>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="BloomTime-3"
                                                                        name="BloomTime[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <label
                                                                        htmlFor="BloomTime-3"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Winter
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(19)</span>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="border border-transparent border-b border-b-gray-border mb-[20px]">
                                                <button type="button" className="flex items-center justify-between w-full group">
                                                    <div className="text-default-text font-semibold block text-primary mb-[15px] font-sub">
                                                        Life Span
                                                    </div>
                                                    <span className="material-icons-outlined text-default-text font-semibold mb-[15px]">
                                                        add
                                                    </span>
                                                    <span
                                                        className="material-icons-outlined text-default-text font-semibold mb-[15px]"
                                                        style={{ display: "none" }}
                                                    >
                                                        remove
                                                    </span>
                                                </button>
                                                <div
                                                    className="text-default-text"
                                                    style={{ display: "none" }}
                                                >
                                                    <div className>
                                                        <ul className>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="LifeSpan-0"
                                                                        name="LifeSpan[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <label
                                                                        htmlFor="LifeSpan-0"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Annual
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(43)</span>
                                                                </div>
                                                            </li>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="LifeSpan-1"
                                                                        name="LifeSpan[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <label
                                                                        htmlFor="LifeSpan-1"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Perennial
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(47)</span>
                                                                </div>
                                                            </li>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="LifeSpan-2"
                                                                        name="LifeSpan[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <label
                                                                        htmlFor="LifeSpan-2"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Biennial
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(19)</span>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="border border-transparent border-b border-b-gray-border mb-[20px]">
                                                <button type="button" className="flex items-center justify-between w-full group">
                                                    <div className="text-default-text font-semibold block text-primary mb-[15px] font-sub">
                                                        Water Needs
                                                    </div>
                                                    <span className="material-icons-outlined text-default-text font-semibold mb-[15px]">
                                                        add
                                                    </span>
                                                    <span
                                                        className="material-icons-outlined text-default-text font-semibold mb-[15px]"
                                                        style={{ display: "none" }}
                                                    >
                                                        remove
                                                    </span>
                                                </button>
                                                <div
                                                    className="text-default-text"
                                                    style={{ display: "none" }}
                                                >
                                                    <div className>
                                                        <ul className>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="WaterNeeds-0"
                                                                        name="WaterNeeds[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <label
                                                                        htmlFor="WaterNeeds-0"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Drought Tolerant
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(43)</span>
                                                                </div>
                                                            </li>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="WaterNeeds-1"
                                                                        name="WaterNeeds[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <label
                                                                        htmlFor="WaterNeeds-1"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Low Water
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(47)</span>
                                                                </div>
                                                            </li>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="WaterNeeds-2"
                                                                        name="WaterNeeds[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <label
                                                                        htmlFor="WaterNeeds-2"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        No Summer Water
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(19)</span>
                                                                </div>
                                                            </li>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="WaterNeeds-3"
                                                                        name="WaterNeeds[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <label
                                                                        htmlFor="WaterNeeds-3"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Avg Water
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(19)</span>
                                                                </div>
                                                            </li>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="WaterNeeds-4"
                                                                        name="WaterNeeds[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <label
                                                                        htmlFor="WaterNeeds-4"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Moist
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(19)</span>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="border border-transparent border-b border-b-gray-border mb-[20px]">
                                                <button type="button" className="flex items-center justify-between w-full group">
                                                    <div className="text-default-text font-semibold block text-primary mb-[15px] font-sub">
                                                        Sun Exposure
                                                    </div>
                                                    <span className="material-icons-outlined text-default-text font-semibold mb-[15px]">
                                                        add
                                                    </span>
                                                    <span
                                                        className="material-icons-outlined text-default-text font-semibold mb-[15px]"
                                                        style={{ display: "none" }}
                                                    >
                                                        remove
                                                    </span>
                                                </button>
                                                <div
                                                    className="text-default-text"
                                                    style={{ display: "none" }}
                                                >
                                                    <div className>
                                                        <ul className>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="SunExposure-0"
                                                                        name="SunExposure[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <label
                                                                        htmlFor="SunExposure-0"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Sun
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(43)</span>
                                                                </div>
                                                            </li>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="SunExposure-1"
                                                                        name="SunExposure[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <label
                                                                        htmlFor="SunExposure-1"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Part Sun
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(47)</span>
                                                                </div>
                                                            </li>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="SunExposure-2"
                                                                        name="SunExposure[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <label
                                                                        htmlFor="SunExposure-2"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Shade
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(19)</span>
                                                                </div>
                                                            </li>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="SunExposure-3"
                                                                        name="SunExposure[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <label
                                                                        htmlFor="SunExposure-3"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Part Shade
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(19)</span>
                                                                </div>
                                                            </li>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="SunExposure-4"
                                                                        name="SunExposure[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <label
                                                                        htmlFor="SunExposure-4"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Bright Shade
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(19)</span>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="border border-transparent border-b border-b-gray-border mb-[20px]">
                                                <button type="button" className="flex items-center justify-between w-full group">
                                                    <div className="text-default-text font-semibold block text-primary mb-[15px] font-sub">
                                                        Color
                                                    </div>
                                                    <span className="material-icons-outlined text-default-text font-semibold mb-[15px]">
                                                        add
                                                    </span>
                                                    <span
                                                        className="material-icons-outlined text-default-text font-semibold mb-[15px]"
                                                        style={{ display: "none" }}
                                                    >
                                                        remove
                                                    </span>
                                                </button>
                                                <div
                                                    className="text-default-text"
                                                    style={{ display: "none" }}
                                                >
                                                    <div className>
                                                        <ul className>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="Color-0"
                                                                        name="Color[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <span className="bg-[#3F18C2] border border-gray-border rounded-full w-[22px] h-[22px] ml-[10px]" />
                                                                    <label
                                                                        htmlFor="Color-0"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Blue-Purple
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(43)</span>
                                                                </div>
                                                            </li>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="Color-1"
                                                                        name="Color[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <span className="bg-default border border-gray-border rounded-full w-[22px] h-[22px] ml-[10px]" />
                                                                    <label
                                                                        htmlFor="Color-1"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Green
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(47)</span>
                                                                </div>
                                                            </li>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="Color-2"
                                                                        name="Color[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <span className="bg-[#73000F] border border-gray-border rounded-full w-[22px] h-[22px] ml-[10px]" />
                                                                    <label
                                                                        htmlFor="Color-2"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Maroon-Black
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(19)</span>
                                                                </div>
                                                            </li>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="Color-3"
                                                                        name="Color[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <span className="bg-gradient-to-bl from-orange-700 via-slate-500 to-fuchsia-400 border border-gray-border rounded-full w-[22px] h-[22px] ml-[10px]" />
                                                                    <label
                                                                        htmlFor="Color-3"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Mixed
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(19)</span>
                                                                </div>
                                                            </li>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="Color-4"
                                                                        name="Color[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <span className="bg-[#D00A24] border border-gray-border rounded-full w-[22px] h-[22px] ml-[10px]" />
                                                                    <label
                                                                        htmlFor="Color-4"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Orange-Red
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(19)</span>
                                                                </div>
                                                            </li>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="Color-5"
                                                                        name="Color[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <span className="bg-[#A8007B] border border-gray-border rounded-full w-[22px] h-[22px] ml-[10px]" />
                                                                    <label
                                                                        htmlFor="Color-5"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Pink-Magenta
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(19)</span>
                                                                </div>
                                                            </li>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="Color-6"
                                                                        name="Color[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <span className="bg-[#D4D4D4] border border-gray-border rounded-full w-[22px] h-[22px] ml-[10px]" />
                                                                    <label
                                                                        htmlFor="Color-6"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Silver Foliage
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(19)</span>
                                                                </div>
                                                            </li>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="Color-7"
                                                                        name="Color[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <span className="bg-[#ffffff] border border-gray-border rounded-full w-[22px] h-[22px] ml-[10px]" />
                                                                    <label
                                                                        htmlFor="Color-7"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        White
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(19)</span>
                                                                </div>
                                                            </li>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="Color-8"
                                                                        name="Color[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <span className="bg-quaternary border border-gray-border rounded-full w-[22px] h-[22px] ml-[10px]" />
                                                                    <label
                                                                        htmlFor="Color-8"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Yellow
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(19)</span>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="border border-transparent border-b border-b-gray-border mb-[20px]">
                                                <button type="button" className="flex items-center justify-between w-full group">
                                                    <div className="text-default-text font-semibold block text-primary mb-[15px] font-sub">
                                                        Uses
                                                    </div>
                                                    <span className="material-icons-outlined text-default-text font-semibold mb-[15px]">
                                                        add
                                                    </span>
                                                    <span
                                                        className="material-icons-outlined text-default-text font-semibold mb-[15px]"
                                                        style={{ display: "none" }}
                                                    >
                                                        remove
                                                    </span>
                                                </button>
                                                <div
                                                    className="text-default-text"
                                                    style={{ display: "none" }}
                                                >
                                                    <div className>
                                                        <ul className>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="Uses-0"
                                                                        name="Uses[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <label
                                                                        htmlFor="Uses-0"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Edible
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(43)</span>
                                                                </div>
                                                            </li>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="Uses-1"
                                                                        name="Uses[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <label
                                                                        htmlFor="Uses-1"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Great for Shade
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(47)</span>
                                                                </div>
                                                            </li>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="Uses-2"
                                                                        name="Uses[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <label
                                                                        htmlFor="Uses-2"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Great for Containers
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(19)</span>
                                                                </div>
                                                            </li>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="Uses-3"
                                                                        name="Uses[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <label
                                                                        htmlFor="Uses-3"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Groundcovers
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(19)</span>
                                                                </div>
                                                            </li>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="Uses-4"
                                                                        name="Uses[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <label
                                                                        htmlFor="Uses-4"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Hanging Baskets
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(19)</span>
                                                                </div>
                                                            </li>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="Uses-5"
                                                                        name="Uses[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <label
                                                                        htmlFor="Uses-5"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Hot and Dry Climates
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(19)</span>
                                                                </div>
                                                            </li>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="Uses-6"
                                                                        name="Uses[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <label
                                                                        htmlFor="Uses-6"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Hot and Humid Climates
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(19)</span>
                                                                </div>
                                                            </li>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="Uses-7"
                                                                        name="Uses[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <label
                                                                        htmlFor="Uses-7"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Plants for Cutting
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(19)</span>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="border border-transparent border-b border-b-gray-border mb-[20px]">
                                                <button type="button" className="flex items-center justify-between w-full group">
                                                    <div className="text-default-text font-semibold block text-primary mb-[15px] font-sub">
                                                        Features
                                                    </div>
                                                    <span className="material-icons-outlined text-default-text font-semibold mb-[15px]">
                                                        add
                                                    </span>
                                                    <span
                                                        className="material-icons-outlined text-default-text font-semibold mb-[15px]"
                                                        style={{ display: "none" }}
                                                    >
                                                        remove
                                                    </span>
                                                </button>
                                                <div
                                                    className="text-default-text"
                                                    style={{ display: "none" }}
                                                >
                                                    <div className>
                                                        <ul className>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="Features-0"
                                                                        name="Features[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <label
                                                                        htmlFor="Features-0"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Attracts Bees
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(43)</span>
                                                                </div>
                                                            </li>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="Features-1"
                                                                        name="Features[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <label
                                                                        htmlFor="Features-1"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Attracts Butterflies
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(47)</span>
                                                                </div>
                                                            </li>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="Features-2"
                                                                        name="Features[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <label
                                                                        htmlFor="Features-2"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Attracts Hummingbirds
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(19)</span>
                                                                </div>
                                                            </li>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="Features-3"
                                                                        name="Features[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <label
                                                                        htmlFor="Features-3"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Bulb
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(19)</span>
                                                                </div>
                                                            </li>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="Features-4"
                                                                        name="Features[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <label
                                                                        htmlFor="Features-4"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        CA Native
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(19)</span>
                                                                </div>
                                                            </li>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="Features-5"
                                                                        name="Features[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <label
                                                                        htmlFor="Features-5"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Clay Tolerant
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(19)</span>
                                                                </div>
                                                            </li>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="Features-6"
                                                                        name="Features[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <label
                                                                        htmlFor="Features-6"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Deer Resistant
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(19)</span>
                                                                </div>
                                                            </li>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="Features-7"
                                                                        name="Features[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <label
                                                                        htmlFor="Features-7"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Easy Reseeders
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(19)</span>
                                                                </div>
                                                            </li>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="Features-8"
                                                                        name="Features[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <label
                                                                        htmlFor="Features-8"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Evergreen
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(19)</span>
                                                                </div>
                                                            </li>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="Features-9"
                                                                        name="Features[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <label
                                                                        htmlFor="Features-9"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Fire Resistant
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(19)</span>
                                                                </div>
                                                            </li>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="Features-10"
                                                                        name="Features[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <label
                                                                        htmlFor="Features-10"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Flowering
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(19)</span>
                                                                </div>
                                                            </li>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="Features-11"
                                                                        name="Features[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <label
                                                                        htmlFor="Features-11"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Fragrant
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(19)</span>
                                                                </div>
                                                            </li>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="Features-12"
                                                                        name="Features[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <label
                                                                        htmlFor="Features-12"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Good For Wildlife
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(19)</span>
                                                                </div>
                                                            </li>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="Features-13"
                                                                        name="Features[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <label
                                                                        htmlFor="Features-13"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Gopher Resistant
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(19)</span>
                                                                </div>
                                                            </li>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="Features-14"
                                                                        name="Features[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <label
                                                                        htmlFor="Features-14"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Indestructible
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(19)</span>
                                                                </div>
                                                            </li>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="Features-15"
                                                                        name="Features[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <label
                                                                        htmlFor="Features-15"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Long Blooming
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(19)</span>
                                                                </div>
                                                            </li>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="Features-16"
                                                                        name="Features[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <label
                                                                        htmlFor="Features-16"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Rare
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(19)</span>
                                                                </div>
                                                            </li>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="Features-17"
                                                                        name="Features[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-gray-300 rounded"
                                                                    />
                                                                    <label
                                                                        htmlFor="Features-17"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Slug and Snail Resistant
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(19)</span>
                                                                </div>
                                                            </li>
                                                            <li className="flex justify-between items-center border-b border-[#e9dfcc] last:border-0 pb-[10px] mb-[10px] last:mb-0">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        id="Features-18"
                                                                        name="Features[]"
                                                                        defaultValue
                                                                        type="checkbox"
                                                                        className="h-4 w-4 border-[gray-300] rounded"
                                                                    />
                                                                    <label
                                                                        htmlFor="Features-18"
                                                                        className="ml-[10px] font-sub text-small-text font-semibold"
                                                                    >
                                                                        Under Oaks
                                                                    </label>
                                                                </div>
                                                                <div className="font-sub text-small-text font-semibold">
                                                                    <span className="text-[#7D826C]">(19)</span>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="md:w-8/12 xl:w-9/12 w-full px-[15px]">
                                <div className="md:flex flex-wrap items-center gap-[5px] pb-[20px] ">
                                    <div className="flex flex-wrap items-center gap-[5px] bg-[#FCEEFF] rounded-sm px-[10px] py-[5px] text-[#634B91] border border-[#694D84]">
                                        <a
                                            href="javascript:void(0);"
                                            className="text-[12px] capitalize"
                                        >
                                            Summer
                                        </a>
                                        <span className="material-icons-outlined text-[12px] leading-none">
                                            close
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-[10px] bg-[#FCEEFF] rounded-sm px-[10px] py-[5px] text-[#634B91] border border-[#694D84]">
                                        <a
                                            href="javascript:void(0);"
                                            className="text-[12px] capitalize"
                                        >
                                            Low Water
                                        </a>
                                        <span className="material-icons-outlined text-[12px] leading-none">
                                            close
                                        </span>
                                    </div>
                                    <a
                                        href="javascript:void(0);"
                                        className="text-[12px] text-[#634B91] uppercase"
                                    >
                                        Clear All
                                    </a>
                                </div>
                                <div className="flex flex-wrap mx-[-8px] lg:mx-[-15px]">
                                    <div
                                        className="w-6/12 md:w-6/12 lg:w-4/12 pb-[20px] lg:pb-[30px] px-[8px] lg:px-[15px] divmore"
                                        style={{ display: "block" }}
                                    >
                                        <div className="relative overflow-hidden rounded-tl-lg rounded-br-lg group">
                                            <div className>
                                                <a href="javasript:void(0);">
                                                    <img
                                                        src="https://ystore.us/HTML/Annies-Annuals/images/products/skull-dotd-tshirt-cutout.png"
                                                        className="group-hover:scale-125 transition-all duration-700"
                                                        alt
                                                    />
                                                </a>
                                            </div>
                                            <div className="absolute left-4 top-4 cursor-pointer">
                                                <img
                                                    src="https://ystore.us/HTML/Annies-Annuals/images/wishlist-selected.png"
                                                    alt="Wishlist Selected"
                                                    title="Wishlist Selected"
                                                />
                                            </div>
                                            <div className="absolute right-[-1px] top-4 cursor-pointer">
                                                <img
                                                    src="https://ystore.us/HTML/Annies-Annuals/images/new-icon.png"
                                                    alt="New Product"
                                                    title="New Product"
                                                />
                                            </div>
                                            <div className="sm:absolute relative sm:p-[15px] px-[10px] py-[15px] bg-[#634B91] sm:bg-opacity-80 bg-opacity-100 group-hover:bg-opacity-100 inset-x-0 bottom-0 transition-all duration-700">
                                                <div className="h-full w-full">
                                                    <div>
                                                        <a
                                                            href="javasript:void(0);"
                                                            className="text-normal-text text-white font-bold font-sub w-full truncate overflow-hidden"
                                                        >
                                                            Annie's Day of the Dead T-Shirt
                                                        </a>
                                                    </div>
                                                    <div className="text-default-text text-white mb-[10px] w-full">
                                                        ‘Unisex’
                                                    </div>
                                                    <div className="flex flex-wrap w-full">
                                                        <div className="mr-[10px]">
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star_border
                                                            </span>
                                                        </div>
                                                        <div className="w-full sm:w-auto">
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="text-white text-extra-small-text"
                                                            >
                                                                101 Reviews
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap justify-between items-center w-full">
                                                        <div className="text-default-text text-white font-bold">
                                                            $29.95
                                                        </div>
                                                        <div className>
                                                            <a
                                                                href="javasript:void(0);"
                                                                className="h-[25px] w-[25px] flex justify-center items-center text-white bg-[#000000] bg-opacity-20 group-hover:bg-opacity-100 rounded-full"
                                                            >
                                                                <span className="material-icons-outlined">
                                                                    chevron_right
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="w-6/12 md:w-6/12 lg:w-4/12 pb-[20px] lg:pb-[30px] px-[8px] lg:px-[15px] divmore"
                                        style={{ display: "block" }}
                                    >
                                        <div className="relative overflow-hidden rounded-tl-lg rounded-br-lg group">
                                            <div className>
                                                <a href="javasript:void(0);">
                                                    <img
                                                        src="https://ystore.us/HTML/Annies-Annuals/images/products/product-listing-2.png"
                                                        className="group-hover:scale-125 transition-all duration-700"
                                                        alt
                                                    />
                                                </a>
                                            </div>
                                            <div className="absolute left-4 top-4 cursor-pointer">
                                                <img
                                                    src="https://ystore.us/HTML/Annies-Annuals/images/wishlist-selected.png"
                                                    alt="Wishlist Selected"
                                                    title="Wishlist Selected"
                                                />
                                            </div>
                                            <div className="sm:absolute relative sm:p-[15px] px-[10px] py-[15px] bg-[#A8007B] sm:bg-opacity-80 bg-opacity-100 group-hover:bg-opacity-100 inset-x-0 bottom-0 transition-all duration-700">
                                                <div className="h-full w-full">
                                                    <div>
                                                        <a
                                                            href="javasript:void(0);"
                                                            className="text-normal-text text-white font-bold font-sub w-full truncate overflow-hidden"
                                                        >
                                                            Delphinium Elatum
                                                        </a>
                                                    </div>
                                                    <div className="text-default-text text-white md:mb-[10px] mb-[5px] w-full">
                                                        ‘Purple Passion’
                                                    </div>
                                                    <div className="flex flex-wrap w-full">
                                                        <div className="mr-[10px]">
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star_border
                                                            </span>
                                                        </div>
                                                        <div className="w-full sm:w-auto">
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="text-white text-extra-small-text"
                                                            >
                                                                66 Reviews
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap justify-between items-center w-full">
                                                        <div className="text-default-text text-white font-bold">
                                                            $35.00
                                                        </div>
                                                        <div className>
                                                            <a
                                                                href="javasript:void(0);"
                                                                className="h-[25px] w-[25px] flex justify-center items-center text-white bg-[#000000] bg-opacity-20 group-hover:bg-opacity-100 rounded-full"
                                                            >
                                                                <span className="material-icons-outlined">
                                                                    chevron_right
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="w-6/12 md:w-6/12 lg:w-4/12 pb-[20px] lg:pb-[30px] px-[8px] lg:px-[15px] divmore"
                                        style={{ display: "block" }}
                                    >
                                        <div className="relative overflow-hidden rounded-tl-lg rounded-br-lg group">
                                            <div className>
                                                <a href="javasript:void(0);">
                                                    <img
                                                        src="https://ystore.us/HTML/Annies-Annuals/images/products/product-listing-3.png"
                                                        className="group-hover:scale-125 transition-all duration-700"
                                                        alt
                                                    />
                                                </a>
                                            </div>
                                            <div className="absolute left-4 top-4 cursor-pointer">
                                                <img
                                                    src="https://ystore.us/HTML/Annies-Annuals/images/wishlist.png"
                                                    alt="Wishlist"
                                                    title="Wishlist"
                                                />
                                            </div>
                                            <div className="absolute right-[-1px] top-4 cursor-pointer">
                                                <img
                                                    src="https://ystore.us/HTML/Annies-Annuals/images/new-icon.png"
                                                    alt="New Product"
                                                    title="New Product"
                                                />
                                            </div>
                                            <div className="sm:absolute relative sm:p-[15px] px-[10px] py-[15px] bg-default sm:bg-opacity-80 bg-opacity-100 group-hover:bg-opacity-100 inset-x-0 bottom-0 transition-all duration-700">
                                                <div className="h-full w-full">
                                                    <div>
                                                        <a
                                                            href="javasript:void(0);"
                                                            className="text-normal-text text-white font-bold font-sub w-full truncate overflow-hidden"
                                                        >
                                                            Agastache Rugosa
                                                        </a>
                                                    </div>
                                                    <div className="text-default-text text-white mb-[10px] w-full">
                                                        ‘Heronswood Mist’
                                                    </div>
                                                    <div className="flex flex-wrap w-full">
                                                        <div className="mr-[10px]">
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star_border
                                                            </span>
                                                        </div>
                                                        <div className="w-full sm:w-auto">
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="text-white text-extra-small-text"
                                                            >
                                                                55 Reviews
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap justify-between items-center w-full">
                                                        <div className="text-default-text text-white font-bold">
                                                            $35.00
                                                        </div>
                                                        <div className>
                                                            <a
                                                                href="javasript:void(0);"
                                                                className="h-[25px] w-[25px] flex justify-center items-center text-white bg-[#000000] bg-opacity-20 group-hover:bg-opacity-100 rounded-full"
                                                            >
                                                                <span className="material-icons-outlined">
                                                                    chevron_right
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="w-6/12 md:w-6/12 lg:w-4/12 pb-[20px] lg:pb-[30px] px-[8px] lg:px-[15px] divmore"
                                        style={{ display: "block" }}
                                    >
                                        <div className="relative overflow-hidden rounded-tl-lg rounded-br-lg group">
                                            <div className>
                                                <a href="javasript:void(0);">
                                                    <img
                                                        src="https://ystore.us/HTML/Annies-Annuals/images/products/product-listing-4.png"
                                                        className="group-hover:scale-125 transition-all duration-700"
                                                        alt
                                                    />
                                                </a>
                                            </div>
                                            <div className="absolute left-4 top-4 cursor-pointer">
                                                <img
                                                    src="https://ystore.us/HTML/Annies-Annuals/images/wishlist.png"
                                                    alt="Wishlist"
                                                    title="Wishlist"
                                                />
                                            </div>
                                            <div className="sm:absolute relative sm:p-[15px] px-[10px] py-[15px] bg-[#9C331C] sm:bg-opacity-80 bg-opacity-100 group-hover:bg-opacity-100 inset-x-0 bottom-0 transition-all duration-700">
                                                <div className="h-full w-full">
                                                    <div>
                                                        <a
                                                            href="javasript:void(0);"
                                                            className="text-normal-text text-white font-bold font-sub w-full truncate overflow-hidden"
                                                        >
                                                            Eriogonum Umbellatum
                                                        </a>
                                                    </div>
                                                    <div className="text-default-text text-white mb-[10px] w-full">
                                                        ‘Kannah Creek’
                                                    </div>
                                                    <div className="flex flex-wrap w-full">
                                                        <div className="mr-[10px]">
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star_border
                                                            </span>
                                                        </div>
                                                        <div className="w-full sm:w-auto">
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="text-white text-extra-small-text"
                                                            >
                                                                101 Reviews
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap justify-between items-center w-full">
                                                        <div className="text-default-text text-white font-bold">
                                                            $13.95
                                                        </div>
                                                        <div className>
                                                            <a
                                                                href="javasript:void(0);"
                                                                className="h-[25px] w-[25px] flex justify-center items-center text-white bg-[#000000] bg-opacity-20 group-hover:bg-opacity-100 rounded-full"
                                                            >
                                                                <span className="material-icons-outlined">
                                                                    chevron_right
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="w-6/12 md:w-6/12 lg:w-4/12 pb-[20px] lg:pb-[30px] px-[8px] lg:px-[15px] divmore"
                                        style={{ display: "block" }}
                                    >
                                        <div className="relative overflow-hidden rounded-tl-lg rounded-br-lg group">
                                            <div className>
                                                <a href="javasript:void(0);">
                                                    <img
                                                        src="https://ystore.us/HTML/Annies-Annuals/images/products/product-listing-5.png"
                                                        className="group-hover:scale-125 transition-all duration-700"
                                                        alt
                                                    />
                                                </a>
                                            </div>
                                            <div className="absolute left-4 top-4 cursor-pointer">
                                                <img
                                                    src="https://ystore.us/HTML/Annies-Annuals/images/wishlist.png"
                                                    alt="Wishlist"
                                                    title="Wishlist"
                                                />
                                            </div>
                                            <div className="sm:absolute relative sm:p-[15px] px-[10px] py-[15px] bg-primary sm:bg-opacity-80 bg-opacity-100 group-hover:bg-opacity-100 inset-x-0 bottom-0 transition-all duration-700">
                                                <div className="h-full w-full">
                                                    <div>
                                                        <a
                                                            href="javasript:void(0);"
                                                            className="text-normal-text text-white font-bold font-sub w-full truncate overflow-hidden"
                                                        >
                                                            Hollyhock
                                                        </a>
                                                    </div>
                                                    <div className="text-default-text text-white mb-[10px] w-full">
                                                        ‘Crème De Cassis’
                                                    </div>
                                                    <div className="flex flex-wrap w-full">
                                                        <div className="mr-[10px]">
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star_border
                                                            </span>
                                                        </div>
                                                        <div className="w-full sm:w-auto">
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="text-white text-extra-small-text"
                                                            >
                                                                70 Reviews
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap justify-between items-center w-full">
                                                        <div className="text-default-text text-white font-bold">
                                                            $13.95
                                                        </div>
                                                        <div className>
                                                            <a
                                                                href="javasript:void(0);"
                                                                className="h-[25px] w-[25px] flex justify-center items-center text-white bg-[#000000] bg-opacity-20 group-hover:bg-opacity-100 rounded-full"
                                                            >
                                                                <span className="material-icons-outlined">
                                                                    chevron_right
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="w-6/12 md:w-6/12 lg:w-4/12 pb-[20px] lg:pb-[30px] px-[8px] lg:px-[15px] divmore"
                                        style={{ display: "block" }}
                                    >
                                        <div className="relative overflow-hidden rounded-tl-lg rounded-br-lg group">
                                            <div className="bg-[#ffffffad] bg-opacity-70 absolute w-full h-full z-20">
                                                <div className="w-full">
                                                    <div className="bg-[#ffffff] w-full text-center text-anchor text-normal-text font-semibold uppercase p-[10px] font-sub absolute top-[40%] -translate-y-1/2">
                                                        Sold Out
                                                    </div>
                                                    <div className="w-full text-center my-[10px] absolute top-[50%] -translate-y-1/2 mx-auto">
                                                        <a
                                                            href="javasript:void(0);"
                                                            data-modal-toggle="NotifywhenAvailable"
                                                            title="Notify when Available"
                                                        >
                                                            <img
                                                                src="https://ystore.us/HTML/Annies-Annuals/images/notify-me.png"
                                                                alt="Notify when Available"
                                                                title="Notify when Available"
                                                                className="mx-auto mt-[20px]"
                                                            />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className>
                                                <a href="javasript:void(0);">
                                                    <img
                                                        src="https://ystore.us/HTML/Annies-Annuals/images/products/product-listing-6.png"
                                                        className="group-hover:scale-125 transition-all duration-700"
                                                        alt
                                                    />
                                                </a>
                                            </div>
                                            <div className="absolute left-4 top-4 cursor-pointer">
                                                <img
                                                    src="https://ystore.us/HTML/Annies-Annuals/images/wishlist.png"
                                                    alt="Wishlist"
                                                    title="Wishlist"
                                                />
                                            </div>
                                            <div className="sm:absolute relative sm:p-[15px] px-[10px] py-[15px] bg-secondary sm:bg-opacity-80 bg-opacity-100 group-hover:bg-opacity-100 inset-x-0 bottom-0 transition-all duration-700">
                                                <div className="h-full w-full">
                                                    <div>
                                                        <a
                                                            href="javasript:void(0);"
                                                            className="text-normal-text text-white font-bold font-sub w-full truncate overflow-hidden"
                                                        >
                                                            Lantana Camara
                                                        </a>
                                                    </div>
                                                    <div className="text-default-text text-white mb-[10px] w-full">
                                                        ‘Bandana Pink’
                                                    </div>
                                                    <div className="flex flex-wrap w-full">
                                                        <div className="mr-[10px]">
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star_border
                                                            </span>
                                                        </div>
                                                        <div className="w-full sm:w-auto">
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="text-white text-extra-small-text"
                                                            >
                                                                66 Reviews
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap justify-between items-center w-full">
                                                        <div className="text-default-text text-white font-bold">
                                                            $13.95
                                                        </div>
                                                        <div className>
                                                            <a
                                                                href="javasript:void(0);"
                                                                className="h-[25px] w-[25px] flex justify-center items-center text-white bg-[#000000] bg-opacity-20 group-hover:bg-opacity-100 rounded-full"
                                                            >
                                                                <span className="material-icons-outlined">
                                                                    chevron_right
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="w-6/12 md:w-6/12 lg:w-4/12 pb-[20px] lg:pb-[30px] px-[8px] lg:px-[15px] divmore"
                                        style={{ display: "block" }}
                                    >
                                        <div className="relative overflow-hidden rounded-tl-lg rounded-br-lg group">
                                            <div className>
                                                <a href="javasript:void(0);">
                                                    <img
                                                        src="https://ystore.us/HTML/Annies-Annuals/images/products/product-listing-7.png"
                                                        className="group-hover:scale-125 transition-all duration-700"
                                                        alt
                                                    />
                                                </a>
                                            </div>
                                            <div className="absolute left-4 top-4 cursor-pointer">
                                                <img
                                                    src="https://ystore.us/HTML/Annies-Annuals/images/wishlist.png"
                                                    alt="Wishlist"
                                                    title="Wishlist"
                                                />
                                            </div>
                                            <div className="sm:absolute relative sm:p-[15px] px-[10px] py-[15px] bg-[#1B6074] sm:bg-opacity-80 bg-opacity-100 group-hover:bg-opacity-100 inset-x-0 bottom-0 transition-all duration-700">
                                                <div className="h-full w-full">
                                                    <div>
                                                        <a
                                                            href="javasript:void(0);"
                                                            className="text-normal-text text-white font-bold font-sub w-full truncate overflow-hidden"
                                                        >
                                                            Marrubium Supinum
                                                        </a>
                                                    </div>
                                                    <div className="text-default-text text-white mb-[10px] w-full">
                                                        “Horehound”
                                                    </div>
                                                    <div className="flex flex-wrap w-full">
                                                        <div className="mr-[10px]">
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star_border
                                                            </span>
                                                        </div>
                                                        <div className="w-full sm:w-auto">
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="text-white text-extra-small-text"
                                                            >
                                                                101 Reviews
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap justify-between items-center w-full">
                                                        <div className="text-default-text text-white font-bold">
                                                            $13.95
                                                        </div>
                                                        <div className>
                                                            <a
                                                                href="javasript:void(0);"
                                                                className="h-[25px] w-[25px] flex justify-center items-center text-white bg-[#000000] bg-opacity-20 group-hover:bg-opacity-100 rounded-full"
                                                            >
                                                                <span className="material-icons-outlined">
                                                                    chevron_right
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="w-6/12 md:w-6/12 lg:w-4/12 pb-[20px] lg:pb-[30px] px-[8px] lg:px-[15px] divmore"
                                        style={{ display: "block" }}
                                    >
                                        <div className="relative overflow-hidden rounded-tl-lg rounded-br-lg group">
                                            <div className>
                                                <a href="javasript:void(0);">
                                                    <img
                                                        src="https://ystore.us/HTML/Annies-Annuals/images/products/product-listing-8.png"
                                                        className="group-hover:scale-125 transition-all duration-700"
                                                        alt
                                                    />
                                                </a>
                                            </div>
                                            <div className="absolute left-4 top-4 cursor-pointer">
                                                <img
                                                    src="https://ystore.us/HTML/Annies-Annuals/images/wishlist.png"
                                                    alt="Wishlist"
                                                    title="Wishlist"
                                                />
                                            </div>
                                            <div className="sm:absolute relative sm:p-[15px] px-[10px] py-[15px] bg-[#9F2D3C] sm:bg-opacity-80 bg-opacity-100 group-hover:bg-opacity-100 inset-x-0 bottom-0 transition-all duration-700">
                                                <div className="h-full w-full">
                                                    <div>
                                                        <a
                                                            href="javasript:void(0);"
                                                            className="text-normal-text text-white font-bold font-sub w-full truncate overflow-hidden"
                                                        >
                                                            Penstemon Heterophy
                                                        </a>
                                                    </div>
                                                    <div className="text-default-text text-white mb-[10px] w-full">
                                                        ‘David’s Red’
                                                    </div>
                                                    <div className="flex flex-wrap w-full">
                                                        <div className="mr-[10px]">
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star_border
                                                            </span>
                                                        </div>
                                                        <div className="w-full sm:w-auto">
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="text-white text-extra-small-text"
                                                            >
                                                                94 Reviews
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap justify-between items-center w-full">
                                                        <div className="text-default-text text-white font-bold">
                                                            $13.95
                                                        </div>
                                                        <div className>
                                                            <a
                                                                href="javasript:void(0);"
                                                                className="h-[25px] w-[25px] flex justify-center items-center text-white bg-[#000000] bg-opacity-20 group-hover:bg-opacity-100 rounded-full"
                                                            >
                                                                <span className="material-icons-outlined">
                                                                    chevron_right
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="w-6/12 md:w-6/12 lg:w-4/12 pb-[20px] lg:pb-[30px] px-[8px] lg:px-[15px] divmore"
                                        style={{ display: "block" }}
                                    >
                                        <div className="relative overflow-hidden rounded-tl-lg rounded-br-lg group">
                                            <div className>
                                                <a href="javasript:void(0);">
                                                    <img
                                                        src="https://ystore.us/HTML/Annies-Annuals/images/products/product-listing-9.png"
                                                        className="group-hover:scale-125 transition-all duration-700"
                                                        alt
                                                    />
                                                </a>
                                            </div>
                                            <div className="absolute left-4 top-4 cursor-pointer">
                                                <img
                                                    src="https://ystore.us/HTML/Annies-Annuals/images/wishlist.png"
                                                    alt="Wishlist"
                                                    title="Wishlist"
                                                />
                                            </div>
                                            <div className="sm:absolute relative sm:p-[15px] px-[10px] py-[15px] bg-default sm:bg-opacity-80 bg-opacity-100 group-hover:bg-opacity-100 inset-x-0 bottom-0 transition-all duration-700">
                                                <div className="h-full w-full">
                                                    <div>
                                                        <a
                                                            href="javasript:void(0);"
                                                            className="text-normal-text text-white font-bold font-sub w-full truncate overflow-hidden"
                                                        >
                                                            Myosotis Palustris
                                                        </a>
                                                    </div>
                                                    <div className="text-default-text text-white mb-[10px] w-full">
                                                        ‘David’s Red’
                                                    </div>
                                                    <div className="flex flex-wrap w-full">
                                                        <div className="mr-[10px]">
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star_border
                                                            </span>
                                                        </div>
                                                        <div className="w-full sm:w-auto">
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="text-white text-extra-small-text"
                                                            >
                                                                101 Reviews
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap justify-between items-center w-full">
                                                        <div className="text-default-text text-white font-bold">
                                                            $13.95
                                                        </div>
                                                        <div className>
                                                            <a
                                                                href="javasript:void(0);"
                                                                className="h-[25px] w-[25px] flex justify-center items-center text-white bg-[#000000] bg-opacity-20 group-hover:bg-opacity-100 rounded-full"
                                                            >
                                                                <span className="material-icons-outlined">
                                                                    chevron_right
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="w-6/12 md:w-6/12 lg:w-4/12 pb-[20px] lg:pb-[30px] px-[8px] lg:px-[15px] divmore"
                                        style={{ display: "block" }}
                                    >
                                        <div className="relative overflow-hidden rounded-tl-lg rounded-br-lg group">
                                            <div className>
                                                <a href="javasript:void(0);">
                                                    <img
                                                        src="https://ystore.us/HTML/Annies-Annuals/images/products/product-listing-10.png"
                                                        className="group-hover:scale-125 transition-all duration-700"
                                                        alt
                                                    />
                                                </a>
                                            </div>
                                            <div className="absolute left-4 top-4 cursor-pointer">
                                                <img
                                                    src="https://ystore.us/HTML/Annies-Annuals/images/wishlist.png"
                                                    alt="Wishlist"
                                                    title="Wishlist"
                                                />
                                            </div>
                                            <div className="sm:absolute relative sm:p-[15px] px-[10px] py-[15px] bg-[#A62152] sm:bg-opacity-80 bg-opacity-100 group-hover:bg-opacity-100 inset-x-0 bottom-0 transition-all duration-700">
                                                <div className="h-full w-full">
                                                    <div>
                                                        <a
                                                            href="javasript:void(0);"
                                                            className="text-normal-text text-white font-bold font-sub w-full truncate overflow-hidden"
                                                        >
                                                            Abutilon
                                                        </a>
                                                    </div>
                                                    <div className="text-default-text text-white mb-[10px] w-full">
                                                        ‘David’s Red’
                                                    </div>
                                                    <div className="flex flex-wrap w-full">
                                                        <div className="mr-[10px]">
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star_border
                                                            </span>
                                                        </div>
                                                        <div className="w-full sm:w-auto">
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="text-white text-extra-small-text"
                                                            >
                                                                66 Reviews
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap justify-between items-center w-full">
                                                        <div className="text-default-text text-white font-bold">
                                                            $13.95
                                                        </div>
                                                        <div className>
                                                            <a
                                                                href="javasript:void(0);"
                                                                className="h-[25px] w-[25px] flex justify-center items-center text-white bg-[#000000] bg-opacity-20 group-hover:bg-opacity-100 rounded-full"
                                                            >
                                                                <span className="material-icons-outlined">
                                                                    chevron_right
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="w-6/12 md:w-6/12 lg:w-4/12 pb-[20px] lg:pb-[30px] px-[8px] lg:px-[15px] divmore"
                                        style={{ display: "block" }}
                                    >
                                        <div className="relative overflow-hidden rounded-tl-lg rounded-br-lg group">
                                            <div className>
                                                <a href="javasript:void(0);">
                                                    <img
                                                        src="https://ystore.us/HTML/Annies-Annuals/images/products/product-listing-11.png"
                                                        className="group-hover:scale-125 transition-all duration-700"
                                                        alt
                                                    />
                                                </a>
                                            </div>
                                            <div className="absolute left-4 top-4 cursor-pointer">
                                                <img
                                                    src="https://ystore.us/HTML/Annies-Annuals/images/wishlist.png"
                                                    alt="Wishlist"
                                                    title="Wishlist"
                                                />
                                            </div>
                                            <div className="sm:absolute relative sm:p-[15px] px-[10px] py-[15px] bg-[#3B5697] sm:bg-opacity-80 bg-opacity-100 group-hover:bg-opacity-100 inset-x-0 bottom-0 transition-all duration-700">
                                                <div className="h-full w-full">
                                                    <div>
                                                        <a
                                                            href="javasript:void(0);"
                                                            className="text-normal-text text-white font-bold font-sub w-full truncate overflow-hidden"
                                                        >
                                                            Abutilon
                                                        </a>
                                                    </div>
                                                    <div className="text-default-text text-white mb-[10px] w-full">
                                                        ‘David’s Red’
                                                    </div>
                                                    <div className="flex flex-wrap w-full">
                                                        <div className="mr-[10px]">
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star_border
                                                            </span>
                                                        </div>
                                                        <div className="w-full sm:w-auto">
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="text-white text-extra-small-text"
                                                            >
                                                                50 Reviews
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap justify-between items-center w-full">
                                                        <div className="text-default-text text-white font-bold">
                                                            $13.95
                                                        </div>
                                                        <div className>
                                                            <a
                                                                href="javasript:void(0);"
                                                                className="h-[25px] w-[25px] flex justify-center items-center text-white bg-[#000000] bg-opacity-20 group-hover:bg-opacity-100 rounded-full"
                                                            >
                                                                <span className="material-icons-outlined">
                                                                    chevron_right
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="w-6/12 md:w-6/12 lg:w-4/12 pb-[20px] lg:pb-[30px] px-[8px] lg:px-[15px] divmore"
                                        style={{ display: "block" }}
                                    >
                                        <div className="relative overflow-hidden rounded-tl-lg rounded-br-lg group">
                                            <div className>
                                                <a href="javasript:void(0);">
                                                    <img
                                                        src="https://ystore.us/HTML/Annies-Annuals/images/products/product-listing-12.png"
                                                        className="group-hover:scale-125 transition-all duration-700"
                                                        alt
                                                    />
                                                </a>
                                            </div>
                                            <div className="absolute left-4 top-4 cursor-pointer">
                                                <img
                                                    src="https://ystore.us/HTML/Annies-Annuals/images/wishlist.png"
                                                    alt="Wishlist"
                                                    title="Wishlist"
                                                />
                                            </div>
                                            <div className="sm:absolute relative sm:p-[15px] px-[10px] py-[15px] bg-secondary sm:bg-opacity-80 bg-opacity-100 group-hover:bg-opacity-100 inset-x-0 bottom-0 transition-all duration-700">
                                                <div className="h-full w-full">
                                                    <div>
                                                        <a
                                                            href="javasript:void(0);"
                                                            className="text-normal-text text-white font-bold font-sub w-full truncate overflow-hidden"
                                                        >
                                                            Silene Dioica
                                                        </a>
                                                    </div>
                                                    <div className="text-default-text text-white mb-[10px] w-full">
                                                        ‘David’s Red’
                                                    </div>
                                                    <div className="flex flex-wrap w-full">
                                                        <div className="mr-[10px]">
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star_border
                                                            </span>
                                                        </div>
                                                        <div className="w-full sm:w-auto">
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="text-white text-extra-small-text"
                                                            >
                                                                101 Reviews
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap justify-between items-center w-full">
                                                        <div className="text-default-text text-white font-bold">
                                                            $13.95
                                                        </div>
                                                        <div className>
                                                            <a
                                                                href="javasript:void(0);"
                                                                className="h-[25px] w-[25px] flex justify-center items-center text-white bg-[#000000] bg-opacity-20 group-hover:bg-opacity-100 rounded-full"
                                                            >
                                                                <span className="material-icons-outlined">
                                                                    chevron_right
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="w-6/12 md:w-6/12 lg:w-4/12 pb-[20px] lg:pb-[30px] px-[8px] lg:px-[15px] divmore"
                                        style={{ display: "block" }}
                                    >
                                        <div className="relative overflow-hidden rounded-tl-lg rounded-br-lg group">
                                            <div className>
                                                <a href="javasript:void(0);">
                                                    <img
                                                        src="https://ystore.us/HTML/Annies-Annuals/images/products/product-listing-13.png"
                                                        className="group-hover:scale-125 transition-all duration-700"
                                                        alt
                                                    />
                                                </a>
                                            </div>
                                            <div className="absolute left-4 top-4 cursor-pointer">
                                                <img
                                                    src="https://ystore.us/HTML/Annies-Annuals/images/wishlist.png"
                                                    alt="Wishlist"
                                                    title="Wishlist"
                                                />
                                            </div>
                                            <div className="sm:absolute relative sm:p-[15px] px-[10px] py-[15px] bg-[#1B6074] sm:bg-opacity-80 bg-opacity-100 group-hover:bg-opacity-100 inset-x-0 bottom-0 transition-all duration-700">
                                                <div className="h-full w-full">
                                                    <div>
                                                        <a
                                                            href="javasript:void(0);"
                                                            className="text-normal-text text-white font-bold font-sub w-full truncate overflow-hidden"
                                                        >
                                                            Cantua Buxifolia
                                                        </a>
                                                    </div>
                                                    <div className="text-default-text text-white mb-[10px] w-full">
                                                        ‘Tricolor’
                                                    </div>
                                                    <div className="flex flex-wrap w-full">
                                                        <div className="mr-[10px]">
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star_border
                                                            </span>
                                                        </div>
                                                        <div className="w-full sm:w-auto">
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="text-white text-extra-small-text"
                                                            >
                                                                44 Reviews
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap justify-between items-center w-full">
                                                        <div className="text-default-text text-white font-bold">
                                                            $13.95
                                                        </div>
                                                        <div className>
                                                            <a
                                                                href="javasript:void(0);"
                                                                className="h-[25px] w-[25px] flex justify-center items-center text-white bg-[#000000] bg-opacity-20 group-hover:bg-opacity-100 rounded-full"
                                                            >
                                                                <span className="material-icons-outlined">
                                                                    chevron_right
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="w-6/12 md:w-6/12 lg:w-4/12 pb-[20px] lg:pb-[30px] px-[8px] lg:px-[15px] divmore"
                                        style={{ display: "block" }}
                                    >
                                        <div className="relative overflow-hidden rounded-tl-lg rounded-br-lg group">
                                            <div className>
                                                <a href="javasript:void(0);">
                                                    <img
                                                        src="https://ystore.us/HTML/Annies-Annuals/images/products/product-listing-14.png"
                                                        className="group-hover:scale-125 transition-all duration-700"
                                                        alt
                                                    />
                                                </a>
                                            </div>
                                            <div className="absolute left-4 top-4 cursor-pointer">
                                                <img
                                                    src="https://ystore.us/HTML/Annies-Annuals/images/wishlist.png"
                                                    alt="Wishlist"
                                                    title="Wishlist"
                                                />
                                            </div>
                                            <div className="sm:absolute relative sm:p-[15px] px-[10px] py-[15px] bg-[#694D84] sm:bg-opacity-80 bg-opacity-100 group-hover:bg-opacity-100 inset-x-0 bottom-0 transition-all duration-700">
                                                <div className="h-full w-full">
                                                    <div>
                                                        <a
                                                            href="javasript:void(0);"
                                                            className="text-normal-text text-white font-bold font-sub w-full truncate overflow-hidden"
                                                        >
                                                            Verbascum Hybrid
                                                        </a>
                                                    </div>
                                                    <div className="text-default-text text-white mb-[10px] w-full">
                                                        ‘Southern Charm’
                                                    </div>
                                                    <div className="flex flex-wrap w-full">
                                                        <div className="mr-[10px]">
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star_border
                                                            </span>
                                                        </div>
                                                        <div className="w-full sm:w-auto">
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="text-white text-extra-small-text"
                                                            >
                                                                87 Reviews
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap justify-between items-center w-full">
                                                        <div className="text-default-text text-white font-bold">
                                                            $13.95
                                                        </div>
                                                        <div className>
                                                            <a
                                                                href="javasript:void(0);"
                                                                className="h-[25px] w-[25px] flex justify-center items-center text-white bg-[#000000] bg-opacity-20 group-hover:bg-opacity-100 rounded-full"
                                                            >
                                                                <span className="material-icons-outlined">
                                                                    chevron_right
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="w-6/12 md:w-6/12 lg:w-4/12 pb-[20px] lg:pb-[30px] px-[8px] lg:px-[15px] divmore"
                                        style={{ display: "block" }}
                                    >
                                        <div className="relative overflow-hidden rounded-tl-lg rounded-br-lg group">
                                            <div className>
                                                <a href="javasript:void(0);">
                                                    <img
                                                        src="https://ystore.us/HTML/Annies-Annuals/images/products/product-listing-15.png"
                                                        className="group-hover:scale-125 transition-all duration-700"
                                                        alt
                                                    />
                                                </a>
                                            </div>
                                            <div className="absolute left-4 top-4 cursor-pointer">
                                                <img
                                                    src="https://ystore.us/HTML/Annies-Annuals/images/wishlist.png"
                                                    alt="Wishlist"
                                                    title="Wishlist"
                                                />
                                            </div>
                                            <div className="sm:absolute relative sm:p-[15px] px-[10px] py-[15px] bg-[#9C331C] sm:bg-opacity-80 bg-opacity-100 group-hover:bg-opacity-100 inset-x-0 bottom-0 transition-all duration-700">
                                                <div className="h-full w-full">
                                                    <div>
                                                        <a
                                                            href="javasript:void(0);"
                                                            className="text-normal-text text-white font-bold font-sub w-full truncate overflow-hidden"
                                                        >
                                                            Thunbergia Alata
                                                        </a>
                                                    </div>
                                                    <div className="text-default-text text-white mb-[10px] w-full">
                                                        ‘Spanish Eyes’
                                                    </div>
                                                    <div className="flex flex-wrap w-full">
                                                        <div className="mr-[10px]">
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star_border
                                                            </span>
                                                        </div>
                                                        <div className="w-full sm:w-auto">
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="text-white text-extra-small-text"
                                                            >
                                                                42 Reviews
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap justify-between items-center w-full">
                                                        <div className="text-default-text text-white font-bold">
                                                            $13.95
                                                        </div>
                                                        <div className>
                                                            <a
                                                                href="javasript:void(0);"
                                                                className="h-[25px] w-[25px] flex justify-center items-center text-white bg-[#000000] bg-opacity-20 group-hover:bg-opacity-100 rounded-full"
                                                            >
                                                                <span className="material-icons-outlined">
                                                                    chevron_right
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="w-6/12 md:w-6/12 lg:w-4/12 pb-[20px] lg:pb-[30px] px-[8px] lg:px-[15px] divmore"
                                        style={{ display: "none" }}
                                    >
                                        <div className="relative overflow-hidden rounded-tl-lg rounded-br-lg group">
                                            <div className>
                                                <a href="javasript:void(0);">
                                                    <img
                                                        src="https://ystore.us/HTML/Annies-Annuals/images/products/product-listing-1.png"
                                                        className="group-hover:scale-125 transition-all duration-700"
                                                        alt
                                                    />
                                                </a>
                                            </div>
                                            <div className="absolute left-4 top-4 cursor-pointer">
                                                <img
                                                    src="https://ystore.us/HTML/Annies-Annuals/images/wishlist-selected.png"
                                                    alt="Wishlist Selected"
                                                    title="Wishlist Selected"
                                                />
                                            </div>
                                            <div className="absolute right-[-1px] top-4 cursor-pointer">
                                                <img
                                                    src="https://ystore.us/HTML/Annies-Annuals/images/new-icon.png"
                                                    alt="New Product"
                                                    title="New Product"
                                                />
                                            </div>
                                            <div className="sm:absolute relative sm:p-[15px] px-[10px] py-[15px] bg-[#634B91] sm:bg-opacity-80 bg-opacity-100 group-hover:bg-opacity-100 inset-x-0 bottom-0 transition-all duration-700">
                                                <div className="h-full w-full">
                                                    <div>
                                                        <a
                                                            href="javasript:void(0);"
                                                            className="text-normal-text text-white font-bold font-sub w-full truncate overflow-hidden"
                                                        >
                                                            Abutilon
                                                        </a>
                                                    </div>
                                                    <div className="text-default-text text-white mb-[10px] w-full">
                                                        ‘David’s Red’
                                                    </div>
                                                    <div className="flex flex-wrap w-full">
                                                        <div className="mr-[10px]">
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star_border
                                                            </span>
                                                        </div>
                                                        <div className="w-full sm:w-auto">
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="text-white text-extra-small-text"
                                                            >
                                                                101 Reviews
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap justify-between items-center w-full">
                                                        <div className="text-default-text text-white font-bold">
                                                            $13.95
                                                        </div>
                                                        <div className>
                                                            <a
                                                                href="javasript:void(0);"
                                                                className="h-[25px] w-[25px] flex justify-center items-center text-white bg-[#000000] bg-opacity-20 group-hover:bg-opacity-100 rounded-full"
                                                            >
                                                                <span className="material-icons-outlined">
                                                                    chevron_right
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="w-6/12 md:w-6/12 lg:w-4/12 pb-[20px] lg:pb-[30px] px-[8px] lg:px-[15px] divmore"
                                        style={{ display: "none" }}
                                    >
                                        <div className="relative overflow-hidden rounded-tl-lg rounded-br-lg group">
                                            <div className>
                                                <a href="javasript:void(0);">
                                                    <img
                                                        src="https://ystore.us/HTML/Annies-Annuals/images/products/product-listing-2.png"
                                                        className="group-hover:scale-125 transition-all duration-700"
                                                        alt
                                                    />
                                                </a>
                                            </div>
                                            <div className="absolute left-4 top-4 cursor-pointer">
                                                <img
                                                    src="https://ystore.us/HTML/Annies-Annuals/images/wishlist-selected.png"
                                                    alt="Wishlist Selected"
                                                    title="Wishlist Selected"
                                                />
                                            </div>
                                            <div className="sm:absolute relative sm:p-[15px] px-[10px] py-[15px] bg-[#A8007B] sm:bg-opacity-80 bg-opacity-100 group-hover:bg-opacity-100 inset-x-0 bottom-0 transition-all duration-700">
                                                <div className="h-full w-full">
                                                    <div>
                                                        <a
                                                            href="javasript:void(0);"
                                                            className="text-normal-text text-white font-bold font-sub w-full truncate overflow-hidden"
                                                        >
                                                            Delphinium Elatum
                                                        </a>
                                                    </div>
                                                    <div className="text-default-text text-white md:mb-[10px] mb-[5px] w-full">
                                                        ‘Purple Passion’
                                                    </div>
                                                    <div className="flex flex-wrap w-full">
                                                        <div className="mr-[10px]">
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star_border
                                                            </span>
                                                        </div>
                                                        <div className="w-full sm:w-auto">
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="text-white text-extra-small-text"
                                                            >
                                                                66 Reviews
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap justify-between items-center w-full">
                                                        <div className="text-default-text text-white font-bold">
                                                            $13.95
                                                        </div>
                                                        <div className>
                                                            <a
                                                                href="javasript:void(0);"
                                                                className="h-[25px] w-[25px] flex justify-center items-center text-white bg-[#000000] bg-opacity-20 group-hover:bg-opacity-100 rounded-full"
                                                            >
                                                                <span className="material-icons-outlined">
                                                                    chevron_right
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="w-6/12 md:w-6/12 lg:w-4/12 pb-[20px] lg:pb-[30px] px-[8px] lg:px-[15px] divmore"
                                        style={{ display: "none" }}
                                    >
                                        <div className="relative overflow-hidden rounded-tl-lg rounded-br-lg group">
                                            <div className>
                                                <a href="javasript:void(0);">
                                                    <img
                                                        src="https://ystore.us/HTML/Annies-Annuals/images/products/product-listing-3.png"
                                                        className="group-hover:scale-125 transition-all duration-700"
                                                        alt
                                                    />
                                                </a>
                                            </div>
                                            <div className="absolute left-4 top-4 cursor-pointer">
                                                <img
                                                    src="https://ystore.us/HTML/Annies-Annuals/images/wishlist.png"
                                                    alt="Wishlist"
                                                    title="Wishlist"
                                                />
                                            </div>
                                            <div className="absolute right-[-1px] top-4 cursor-pointer">
                                                <img
                                                    src="https://ystore.us/HTML/Annies-Annuals/images/new-icon.png"
                                                    alt="New Product"
                                                    title="New Product"
                                                />
                                            </div>
                                            <div className="sm:absolute relative sm:p-[15px] px-[10px] py-[15px] bg-default sm:bg-opacity-80 bg-opacity-100 group-hover:bg-opacity-100 inset-x-0 bottom-0 transition-all duration-700">
                                                <div className="h-full w-full">
                                                    <div>
                                                        <a
                                                            href="javasript:void(0);"
                                                            className="text-normal-text text-white font-bold font-sub w-full truncate overflow-hidden"
                                                        >
                                                            Agastache Rugosa
                                                        </a>
                                                    </div>
                                                    <div className="text-default-text text-white mb-[10px] w-full">
                                                        ‘Heronswood Mist’
                                                    </div>
                                                    <div className="flex flex-wrap w-full">
                                                        <div className="mr-[10px]">
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star_border
                                                            </span>
                                                        </div>
                                                        <div className="w-full sm:w-auto">
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="text-white text-extra-small-text"
                                                            >
                                                                55 Reviews
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap justify-between items-center w-full">
                                                        <div className="text-default-text text-white font-bold">
                                                            $13.95
                                                        </div>
                                                        <div className>
                                                            <a
                                                                href="javasript:void(0);"
                                                                className="h-[25px] w-[25px] flex justify-center items-center text-white bg-[#000000] bg-opacity-20 group-hover:bg-opacity-100 rounded-full"
                                                            >
                                                                <span className="material-icons-outlined">
                                                                    chevron_right
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="w-6/12 md:w-6/12 lg:w-4/12 pb-[20px] lg:pb-[30px] px-[8px] lg:px-[15px] divmore"
                                        style={{ display: "none" }}
                                    >
                                        <div className="relative overflow-hidden rounded-tl-lg rounded-br-lg group">
                                            <div className>
                                                <a href="javasript:void(0);">
                                                    <img
                                                        src="https://ystore.us/HTML/Annies-Annuals/images/products/product-listing-4.png"
                                                        className="group-hover:scale-125 transition-all duration-700"
                                                        alt
                                                    />
                                                </a>
                                            </div>
                                            <div className="absolute left-4 top-4 cursor-pointer">
                                                <img
                                                    src="https://ystore.us/HTML/Annies-Annuals/images/wishlist.png"
                                                    alt="Wishlist"
                                                    title="Wishlist"
                                                />
                                            </div>
                                            <div className="sm:absolute relative sm:p-[15px] px-[10px] py-[15px] bg-[#9C331C] sm:bg-opacity-80 bg-opacity-100 group-hover:bg-opacity-100 inset-x-0 bottom-0 transition-all duration-700">
                                                <div className="h-full w-full">
                                                    <div>
                                                        <a
                                                            href="javasript:void(0);"
                                                            className="text-normal-text text-white font-bold font-sub w-full truncate overflow-hidden"
                                                        >
                                                            Eriogonum Umbellatum
                                                        </a>
                                                    </div>
                                                    <div className="text-default-text text-white mb-[10px] w-full">
                                                        ‘Kannah Creek’
                                                    </div>
                                                    <div className="flex flex-wrap w-full">
                                                        <div className="mr-[10px]">
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star_border
                                                            </span>
                                                        </div>
                                                        <div className="w-full sm:w-auto">
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="text-white text-extra-small-text"
                                                            >
                                                                101 Reviews
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap justify-between items-center w-full">
                                                        <div className="text-default-text text-white font-bold">
                                                            $13.95
                                                        </div>
                                                        <div className>
                                                            <a
                                                                href="javasript:void(0);"
                                                                className="h-[25px] w-[25px] flex justify-center items-center text-white bg-[#000000] bg-opacity-20 group-hover:bg-opacity-100 rounded-full"
                                                            >
                                                                <span className="material-icons-outlined">
                                                                    chevron_right
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="w-6/12 md:w-6/12 lg:w-4/12 pb-[20px] lg:pb-[30px] px-[8px] lg:px-[15px] divmore"
                                        style={{ display: "none" }}
                                    >
                                        <div className="relative overflow-hidden rounded-tl-lg rounded-br-lg group">
                                            <div className>
                                                <a href="javasript:void(0);">
                                                    <img
                                                        src="https://ystore.us/HTML/Annies-Annuals/images/products/product-listing-5.png"
                                                        className="group-hover:scale-125 transition-all duration-700"
                                                        alt
                                                    />
                                                </a>
                                            </div>
                                            <div className="absolute left-4 top-4 cursor-pointer">
                                                <img
                                                    src="https://ystore.us/HTML/Annies-Annuals/images/wishlist.png"
                                                    alt="Wishlist"
                                                    title="Wishlist"
                                                />
                                            </div>
                                            <div className="sm:absolute relative sm:p-[15px] px-[10px] py-[15px] bg-primary sm:bg-opacity-80 bg-opacity-100 group-hover:bg-opacity-100 inset-x-0 bottom-0 transition-all duration-700">
                                                <div className="h-full w-full">
                                                    <div>
                                                        <a
                                                            href="javasript:void(0);"
                                                            className="text-normal-text text-white font-bold font-sub w-full truncate overflow-hidden"
                                                        >
                                                            Hollyhock
                                                        </a>
                                                    </div>
                                                    <div className="text-default-text text-white mb-[10px] w-full">
                                                        ‘Crème De Cassis’
                                                    </div>
                                                    <div className="flex flex-wrap w-full">
                                                        <div className="mr-[10px]">
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star_border
                                                            </span>
                                                        </div>
                                                        <div className="w-full sm:w-auto">
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="text-white text-extra-small-text"
                                                            >
                                                                70 Reviews
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap justify-between items-center w-full">
                                                        <div className="text-default-text text-white font-bold">
                                                            $13.95
                                                        </div>
                                                        <div className>
                                                            <a
                                                                href="javasript:void(0);"
                                                                className="h-[25px] w-[25px] flex justify-center items-center text-white bg-[#000000] bg-opacity-20 group-hover:bg-opacity-100 rounded-full"
                                                            >
                                                                <span className="material-icons-outlined">
                                                                    chevron_right
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="w-6/12 md:w-6/12 lg:w-4/12 pb-[20px] lg:pb-[30px] px-[8px] lg:px-[15px] divmore"
                                        style={{ display: "none" }}
                                    >
                                        <div className="relative overflow-hidden rounded-tl-lg rounded-br-lg group">
                                            <div className="bg-[#ffffff] bg-opacity-70 absolute w-full h-full z-20">
                                                <div className="w-full">
                                                    <div className="bg-[#ffffff] w-full text-center text-anchor text-normal-text font-semibold uppercase p-[10px] font-sub absolute top-[40%] -translate-y-1/2">
                                                        Sold Out
                                                    </div>
                                                    <div className="w-full text-center my-[10px] absolute top-[50%] -translate-y-1/2 mx-auto">
                                                        <a
                                                            href="javasript:void(0);"
                                                            data-modal-toggle="NotifywhenAvailable"
                                                            title="Notify when Available"
                                                        >
                                                            <img
                                                                src="https://ystore.us/HTML/Annies-Annuals/images/notify-me.png"
                                                                alt="Notify when Available"
                                                                title="Notify when Available"
                                                                className="mx-auto mt-[20px]"
                                                            />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className>
                                                <a href="javasript:void(0);">
                                                    <img
                                                        src="https://ystore.us/HTML/Annies-Annuals/images/products/product-listing-6.png"
                                                        className="group-hover:scale-125 transition-all duration-700"
                                                        alt
                                                    />
                                                </a>
                                            </div>
                                            <div className="absolute left-4 top-4 cursor-pointer">
                                                <img
                                                    src="https://ystore.us/HTML/Annies-Annuals/images/wishlist.png"
                                                    alt="Wishlist"
                                                    title="Wishlist"
                                                />
                                            </div>
                                            <div className="sm:absolute relative sm:p-[15px] px-[10px] py-[15px] bg-secondary sm:bg-opacity-80 bg-opacity-100 group-hover:bg-opacity-100 inset-x-0 bottom-0 transition-all duration-700">
                                                <div className="h-full w-full">
                                                    <div>
                                                        <a
                                                            href="javasript:void(0);"
                                                            className="text-normal-text text-white font-bold font-sub w-full truncate overflow-hidden"
                                                        >
                                                            Lantana Camara
                                                        </a>
                                                    </div>
                                                    <div className="text-default-text text-white mb-[10px] w-full">
                                                        ‘Bandana Pink’
                                                    </div>
                                                    <div className="flex flex-wrap w-full">
                                                        <div className="mr-[10px]">
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star_border
                                                            </span>
                                                        </div>
                                                        <div className="w-full sm:w-auto">
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="text-white text-extra-small-text"
                                                            >
                                                                66 Reviews
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap justify-between items-center w-full">
                                                        <div className="text-default-text text-white font-bold">
                                                            $13.95
                                                        </div>
                                                        <div className>
                                                            <a
                                                                href="javasript:void(0);"
                                                                className="h-[25px] w-[25px] flex justify-center items-center text-white bg-[#000000] bg-opacity-20 group-hover:bg-opacity-100 rounded-full"
                                                            >
                                                                <span className="material-icons-outlined">
                                                                    chevron_right
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="w-6/12 md:w-6/12 lg:w-4/12 pb-[20px] lg:pb-[30px] px-[8px] lg:px-[15px] divmore"
                                        style={{ display: "none" }}
                                    >
                                        <div className="relative overflow-hidden rounded-tl-lg rounded-br-lg group">
                                            <div className>
                                                <a href="javasript:void(0);">
                                                    <img
                                                        src="https://ystore.us/HTML/Annies-Annuals/images/products/product-listing-7.png"
                                                        className="group-hover:scale-125 transition-all duration-700"
                                                        alt
                                                    />
                                                </a>
                                            </div>
                                            <div className="absolute left-4 top-4 cursor-pointer">
                                                <img
                                                    src="https://ystore.us/HTML/Annies-Annuals/images/wishlist.png"
                                                    alt="Wishlist"
                                                    title="Wishlist"
                                                />
                                            </div>
                                            <div className="sm:absolute relative sm:p-[15px] px-[10px] py-[15px] bg-[#1B6074] sm:bg-opacity-80 bg-opacity-100 group-hover:bg-opacity-100 inset-x-0 bottom-0 transition-all duration-700">
                                                <div className="h-full w-full">
                                                    <div>
                                                        <a
                                                            href="javasript:void(0);"
                                                            className="text-normal-text text-white font-bold font-sub w-full truncate overflow-hidden"
                                                        >
                                                            Marrubium Supinum
                                                        </a>
                                                    </div>
                                                    <div className="text-default-text text-white mb-[10px] w-full">
                                                        “Horehound”
                                                    </div>
                                                    <div className="flex flex-wrap w-full">
                                                        <div className="mr-[10px]">
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star_border
                                                            </span>
                                                        </div>
                                                        <div className="w-full sm:w-auto">
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="text-white text-extra-small-text"
                                                            >
                                                                101 Reviews
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap justify-between items-center w-full">
                                                        <div className="text-default-text text-white font-bold">
                                                            $13.95
                                                        </div>
                                                        <div className>
                                                            <a
                                                                href="javasript:void(0);"
                                                                className="h-[25px] w-[25px] flex justify-center items-center text-white bg-[#000000] bg-opacity-20 group-hover:bg-opacity-100 rounded-full"
                                                            >
                                                                <span className="material-icons-outlined">
                                                                    chevron_right
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="w-6/12 md:w-6/12 lg:w-4/12 pb-[20px] lg:pb-[30px] px-[8px] lg:px-[15px] divmore"
                                        style={{ display: "none" }}
                                    >
                                        <div className="relative overflow-hidden rounded-tl-lg rounded-br-lg group">
                                            <div className>
                                                <a href="javasript:void(0);">
                                                    <img
                                                        src="https://ystore.us/HTML/Annies-Annuals/images/products/product-listing-8.png"
                                                        className="group-hover:scale-125 transition-all duration-700"
                                                        alt
                                                    />
                                                </a>
                                            </div>
                                            <div className="absolute left-4 top-4 cursor-pointer">
                                                <img
                                                    src="https://ystore.us/HTML/Annies-Annuals/images/wishlist.png"
                                                    alt="Wishlist"
                                                    title="Wishlist"
                                                />
                                            </div>
                                            <div className="sm:absolute relative sm:p-[15px] px-[10px] py-[15px] bg-[#9F2D3C] sm:bg-opacity-80 bg-opacity-100 group-hover:bg-opacity-100 inset-x-0 bottom-0 transition-all duration-700">
                                                <div className="h-full w-full">
                                                    <div>
                                                        <a
                                                            href="javasript:void(0);"
                                                            className="text-normal-text text-white font-bold font-sub w-full truncate overflow-hidden"
                                                        >
                                                            Penstemon Heterophy
                                                        </a>
                                                    </div>
                                                    <div className="text-default-text text-white mb-[10px] w-full">
                                                        ‘David’s Red’
                                                    </div>
                                                    <div className="flex flex-wrap w-full">
                                                        <div className="mr-[10px]">
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star_border
                                                            </span>
                                                        </div>
                                                        <div className="w-full sm:w-auto">
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="text-white text-extra-small-text"
                                                            >
                                                                94 Reviews
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap justify-between items-center w-full">
                                                        <div className="text-default-text text-white font-bold">
                                                            $13.95
                                                        </div>
                                                        <div className>
                                                            <a
                                                                href="javasript:void(0);"
                                                                className="h-[25px] w-[25px] flex justify-center items-center text-white bg-[#000000] bg-opacity-20 group-hover:bg-opacity-100 rounded-full"
                                                            >
                                                                <span className="material-icons-outlined">
                                                                    chevron_right
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="w-6/12 md:w-6/12 lg:w-4/12 pb-[20px] lg:pb-[30px] px-[8px] lg:px-[15px] divmore"
                                        style={{ display: "none" }}
                                    >
                                        <div className="relative overflow-hidden rounded-tl-lg rounded-br-lg group">
                                            <div className>
                                                <a href="javasript:void(0);">
                                                    <img
                                                        src="https://ystore.us/HTML/Annies-Annuals/images/products/product-listing-9.png"
                                                        className="group-hover:scale-125 transition-all duration-700"
                                                        alt
                                                    />
                                                </a>
                                            </div>
                                            <div className="absolute left-4 top-4 cursor-pointer">
                                                <img
                                                    src="https://ystore.us/HTML/Annies-Annuals/images/wishlist.png"
                                                    alt="Wishlist"
                                                    title="Wishlist"
                                                />
                                            </div>
                                            <div className="sm:absolute relative sm:p-[15px] px-[10px] py-[15px] bg-default sm:bg-opacity-80 bg-opacity-100 group-hover:bg-opacity-100 inset-x-0 bottom-0 transition-all duration-700">
                                                <div className="h-full w-full">
                                                    <div>
                                                        <a
                                                            href="javasript:void(0);"
                                                            className="text-normal-text text-white font-bold font-sub w-full truncate overflow-hidden"
                                                        >
                                                            Myosotis Palustris
                                                        </a>
                                                    </div>
                                                    <div className="text-default-text text-white mb-[10px] w-full">
                                                        ‘David’s Red’
                                                    </div>
                                                    <div className="flex flex-wrap w-full">
                                                        <div className="mr-[10px]">
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star_border
                                                            </span>
                                                        </div>
                                                        <div className="w-full sm:w-auto">
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="text-white text-extra-small-text"
                                                            >
                                                                101 Reviews
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap justify-between items-center w-full">
                                                        <div className="text-default-text text-white font-bold">
                                                            $13.95
                                                        </div>
                                                        <div className>
                                                            <a
                                                                href="javasript:void(0);"
                                                                className="h-[25px] w-[25px] flex justify-center items-center text-white bg-[#000000] bg-opacity-20 group-hover:bg-opacity-100 rounded-full"
                                                            >
                                                                <span className="material-icons-outlined">
                                                                    chevron_right
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="w-6/12 md:w-6/12 lg:w-4/12 pb-[20px] lg:pb-[30px] px-[8px] lg:px-[15px] divmore"
                                        style={{ display: "none" }}
                                    >
                                        <div className="relative overflow-hidden rounded-tl-lg rounded-br-lg group">
                                            <div className>
                                                <a href="javasript:void(0);">
                                                    <img
                                                        src="https://ystore.us/HTML/Annies-Annuals/images/products/product-listing-10.png"
                                                        className="group-hover:scale-125 transition-all duration-700"
                                                        alt
                                                    />
                                                </a>
                                            </div>
                                            <div className="absolute left-4 top-4 cursor-pointer">
                                                <img
                                                    src="https://ystore.us/HTML/Annies-Annuals/images/wishlist.png"
                                                    alt="Wishlist"
                                                    title="Wishlist"
                                                />
                                            </div>
                                            <div className="sm:absolute relative sm:p-[15px] px-[10px] py-[15px] bg-[#A62152] sm:bg-opacity-80 bg-opacity-100 group-hover:bg-opacity-100 inset-x-0 bottom-0 transition-all duration-700">
                                                <div className="h-full w-full">
                                                    <div>
                                                        <a
                                                            href="javasript:void(0);"
                                                            className="text-normal-text text-white font-bold font-sub w-full truncate overflow-hidden"
                                                        >
                                                            Abutilon
                                                        </a>
                                                    </div>
                                                    <div className="text-default-text text-white mb-[10px] w-full">
                                                        ‘David’s Red’
                                                    </div>
                                                    <div className="flex flex-wrap w-full">
                                                        <div className="mr-[10px]">
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star_border
                                                            </span>
                                                        </div>
                                                        <div className="w-full sm:w-auto">
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="text-white text-extra-small-text"
                                                            >
                                                                66 Reviews
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap justify-between items-center w-full">
                                                        <div className="text-default-text text-white font-bold">
                                                            $13.95
                                                        </div>
                                                        <div className>
                                                            <a
                                                                href="javasript:void(0);"
                                                                className="h-[25px] w-[25px] flex justify-center items-center text-white bg-[#000000] bg-opacity-20 group-hover:bg-opacity-100 rounded-full"
                                                            >
                                                                <span className="material-icons-outlined">
                                                                    chevron_right
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="w-6/12 md:w-6/12 lg:w-4/12 pb-[20px] lg:pb-[30px] px-[8px] lg:px-[15px] divmore"
                                        style={{ display: "none" }}
                                    >
                                        <div className="relative overflow-hidden rounded-tl-lg rounded-br-lg group">
                                            <div className>
                                                <a href="javasript:void(0);">
                                                    <img
                                                        src="https://ystore.us/HTML/Annies-Annuals/images/products/product-listing-11.png"
                                                        className="group-hover:scale-125 transition-all duration-700"
                                                        alt
                                                    />
                                                </a>
                                            </div>
                                            <div className="absolute left-4 top-4 cursor-pointer">
                                                <img
                                                    src="https://ystore.us/HTML/Annies-Annuals/images/wishlist.png"
                                                    alt="Wishlist"
                                                    title="Wishlist"
                                                />
                                            </div>
                                            <div className="sm:absolute relative sm:p-[15px] px-[10px] py-[15px] bg-[#3B5697] sm:bg-opacity-80 bg-opacity-100 group-hover:bg-opacity-100 inset-x-0 bottom-0 transition-all duration-700">
                                                <div className="h-full w-full">
                                                    <div>
                                                        <a
                                                            href="javasript:void(0);"
                                                            className="text-normal-text text-white font-bold font-sub w-full truncate overflow-hidden"
                                                        >
                                                            Abutilon
                                                        </a>
                                                    </div>
                                                    <div className="text-default-text text-white mb-[10px] w-full">
                                                        ‘David’s Red’
                                                    </div>
                                                    <div className="flex flex-wrap w-full">
                                                        <div className="mr-[10px]">
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star_border
                                                            </span>
                                                        </div>
                                                        <div className="w-full sm:w-auto">
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="text-white text-extra-small-text"
                                                            >
                                                                50 Reviews
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap justify-between items-center w-full">
                                                        <div className="text-default-text text-white font-bold">
                                                            $13.95
                                                        </div>
                                                        <div className>
                                                            <a
                                                                href="javasript:void(0);"
                                                                className="h-[25px] w-[25px] flex justify-center items-center text-white bg-[#000000] bg-opacity-20 group-hover:bg-opacity-100 rounded-full"
                                                            >
                                                                <span className="material-icons-outlined">
                                                                    chevron_right
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="w-6/12 md:w-6/12 lg:w-4/12 pb-[20px] lg:pb-[30px] px-[8px] lg:px-[15px] divmore"
                                        style={{ display: "none" }}
                                    >
                                        <div className="relative overflow-hidden rounded-tl-lg rounded-br-lg group">
                                            <div className>
                                                <a href="javasript:void(0);">
                                                    <img
                                                        src="https://ystore.us/HTML/Annies-Annuals/images/products/product-listing-12.png"
                                                        className="group-hover:scale-125 transition-all duration-700"
                                                        alt
                                                    />
                                                </a>
                                            </div>
                                            <div className="absolute left-4 top-4 cursor-pointer">
                                                <img
                                                    src="https://ystore.us/HTML/Annies-Annuals/images/wishlist.png"
                                                    alt="Wishlist"
                                                    title="Wishlist"
                                                />
                                            </div>
                                            <div className="sm:absolute relative sm:p-[15px] px-[10px] py-[15px] bg-secondary sm:bg-opacity-80 bg-opacity-100 group-hover:bg-opacity-100 inset-x-0 bottom-0 transition-all duration-700">
                                                <div className="h-full w-full">
                                                    <div>
                                                        <a
                                                            href="javasript:void(0);"
                                                            className="text-normal-text text-white font-bold font-sub w-full truncate overflow-hidden"
                                                        >
                                                            Silene Dioica
                                                        </a>
                                                    </div>
                                                    <div className="text-default-text text-white mb-[10px] w-full">
                                                        ‘David’s Red’
                                                    </div>
                                                    <div className="flex flex-wrap w-full">
                                                        <div className="mr-[10px]">
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star_border
                                                            </span>
                                                        </div>
                                                        <div className="w-full sm:w-auto">
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="text-white text-extra-small-text"
                                                            >
                                                                101 Reviews
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap justify-between items-center w-full">
                                                        <div className="text-default-text text-white font-bold">
                                                            $13.95
                                                        </div>
                                                        <div className>
                                                            <a
                                                                href="javasript:void(0);"
                                                                className="h-[25px] w-[25px] flex justify-center items-center text-white bg-[#000000] bg-opacity-20 group-hover:bg-opacity-100 rounded-full"
                                                            >
                                                                <span className="material-icons-outlined">
                                                                    chevron_right
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="w-6/12 md:w-6/12 lg:w-4/12 pb-[20px] lg:pb-[30px] px-[8px] lg:px-[15px] divmore"
                                        style={{ display: "none" }}
                                    >
                                        <div className="relative overflow-hidden rounded-tl-lg rounded-br-lg group">
                                            <div className>
                                                <a href="javasript:void(0);">
                                                    <img
                                                        src="https://ystore.us/HTML/Annies-Annuals/images/products/product-listing-13.png"
                                                        className="group-hover:scale-125 transition-all duration-700"
                                                        alt
                                                    />
                                                </a>
                                            </div>
                                            <div className="absolute left-4 top-4 cursor-pointer">
                                                <img
                                                    src="https://ystore.us/HTML/Annies-Annuals/images/wishlist.png"
                                                    alt="Wishlist"
                                                    title="Wishlist"
                                                />
                                            </div>
                                            <div className="sm:absolute relative sm:p-[15px] px-[10px] py-[15px] bg-[#1B6074] sm:bg-opacity-80 bg-opacity-100 group-hover:bg-opacity-100 inset-x-0 bottom-0 transition-all duration-700">
                                                <div className="h-full w-full">
                                                    <div>
                                                        <a
                                                            href="javasript:void(0);"
                                                            className="text-normal-text text-white font-bold font-sub w-full truncate overflow-hidden"
                                                        >
                                                            Cantua Buxifolia
                                                        </a>
                                                    </div>
                                                    <div className="text-default-text text-white mb-[10px] w-full">
                                                        ‘Tricolor’
                                                    </div>
                                                    <div className="flex flex-wrap w-full">
                                                        <div className="mr-[10px]">
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star_border
                                                            </span>
                                                        </div>
                                                        <div className="w-full sm:w-auto">
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="text-white text-extra-small-text"
                                                            >
                                                                44 Reviews
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap justify-between items-center w-full">
                                                        <div className="text-default-text text-white font-bold">
                                                            $13.95
                                                        </div>
                                                        <div className>
                                                            <a
                                                                href="javasript:void(0);"
                                                                className="h-[25px] w-[25px] flex justify-center items-center text-white bg-[#000000] bg-opacity-20 group-hover:bg-opacity-100 rounded-full"
                                                            >
                                                                <span className="material-icons-outlined">
                                                                    chevron_right
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="w-6/12 md:w-6/12 lg:w-4/12 pb-[20px] lg:pb-[30px] px-[8px] lg:px-[15px] divmore"
                                        style={{ display: "none" }}
                                    >
                                        <div className="relative overflow-hidden rounded-tl-lg rounded-br-lg group">
                                            <div className>
                                                <a href="javasript:void(0);">
                                                    <img
                                                        src="https://ystore.us/HTML/Annies-Annuals/images/products/product-listing-14.png"
                                                        className="group-hover:scale-125 transition-all duration-700"
                                                        alt
                                                    />
                                                </a>
                                            </div>
                                            <div className="absolute left-4 top-4 cursor-pointer">
                                                <img
                                                    src="https://ystore.us/HTML/Annies-Annuals/images/wishlist.png"
                                                    alt="Wishlist"
                                                    title="Wishlist"
                                                />
                                            </div>
                                            <div className="sm:absolute relative sm:p-[15px] px-[10px] py-[15px] bg-[#694D84] sm:bg-opacity-80 bg-opacity-100 group-hover:bg-opacity-100 inset-x-0 bottom-0 transition-all duration-700">
                                                <div className="h-full w-full">
                                                    <div>
                                                        <a
                                                            href="javasript:void(0);"
                                                            className="text-normal-text text-white font-bold font-sub w-full truncate overflow-hidden"
                                                        >
                                                            Verbascum Hybrid
                                                        </a>
                                                    </div>
                                                    <div className="text-default-text text-white mb-[10px] w-full">
                                                        ‘Southern Charm’
                                                    </div>
                                                    <div className="flex flex-wrap w-full">
                                                        <div className="mr-[10px]">
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star_border
                                                            </span>
                                                        </div>
                                                        <div className="w-full sm:w-auto">
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="text-white text-extra-small-text"
                                                            >
                                                                87 Reviews
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap justify-between items-center w-full">
                                                        <div className="text-default-text text-white font-bold">
                                                            $13.95
                                                        </div>
                                                        <div className>
                                                            <a
                                                                href="javasript:void(0);"
                                                                className="h-[25px] w-[25px] flex justify-center items-center text-white bg-[#000000] bg-opacity-20 group-hover:bg-opacity-100 rounded-full"
                                                            >
                                                                <span className="material-icons-outlined">
                                                                    chevron_right
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="w-6/12 md:w-6/12 lg:w-4/12 pb-[20px] lg:pb-[30px] px-[8px] lg:px-[15px] divmore"
                                        style={{ display: "none" }}
                                    >
                                        <div className="relative overflow-hidden rounded-tl-lg rounded-br-lg group">
                                            <div className>
                                                <a href="javasript:void(0);">
                                                    <img
                                                        src="https://ystore.us/HTML/Annies-Annuals/images/products/product-listing-15.png"
                                                        className="group-hover:scale-125 transition-all duration-700"
                                                        alt
                                                    />
                                                </a>
                                            </div>
                                            <div className="absolute left-4 top-4 cursor-pointer">
                                                <img
                                                    src="https://ystore.us/HTML/Annies-Annuals/images/wishlist.png"
                                                    alt="Wishlist"
                                                    title="Wishlist"
                                                />
                                            </div>
                                            <div className="sm:absolute relative sm:p-[15px] px-[10px] py-[15px] bg-[#9C331C] sm:bg-opacity-80 bg-opacity-100 group-hover:bg-opacity-100 inset-x-0 bottom-0 transition-all duration-700">
                                                <div className="h-full w-full">
                                                    <div>
                                                        <a
                                                            href="javasript:void(0);"
                                                            className="text-normal-text text-white font-bold font-sub w-full truncate overflow-hidden"
                                                        >
                                                            Thunbergia Alata
                                                        </a>
                                                    </div>
                                                    <div className="text-default-text text-white mb-[10px] w-full">
                                                        ‘Spanish Eyes’
                                                    </div>
                                                    <div className="flex flex-wrap w-full">
                                                        <div className="mr-[10px]">
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star
                                                            </span>
                                                            <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                                                                star_border
                                                            </span>
                                                        </div>
                                                        <div className="w-full sm:w-auto">
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="text-white text-extra-small-text"
                                                            >
                                                                42 Reviews
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap justify-between items-center w-full">
                                                        <div className="text-default-text text-white font-bold">
                                                            $13.95
                                                        </div>
                                                        <div className>
                                                            <a
                                                                href="javasript:void(0);"
                                                                className="h-[25px] w-[25px] flex justify-center items-center text-white bg-[#000000] bg-opacity-20 group-hover:bg-opacity-100 rounded-full"
                                                            >
                                                                <span className="material-icons-outlined">
                                                                    chevron_right
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="w-full text-center pb-[30px] px-[15px]"
                                        id="more"
                                    >
                                        <a
                                            href="javasript:void(0);"
                                            className="btn btn-primary btn-sm uppercase !font-sub"
                                        >
                                            Load More
                                        </a>
                                    </div>
                                    <div className="w-full px-[15px] pb-[30px]">
                                        <ul className>
                                            <li
                                                className="mb-[10px] last:mb-0 bg-white rounded-tl-lg rounded-br-lg overflow-hidden drop-shadow-md"
                                                x-data="{ open: true }"
                                            >
                                                <button type="button" className="w-full flex justify-between items-center text-left font-bold font-heading p-[20px] border-0 hover:border-0">
                                                    <div className="font-bold font-sub text-normal-text">
                                                        What Is A Perennial?
                                                    </div>
                                                    <span
                                                        className="material-icons-outlined"
                                                        style={{ display: "none" }}
                                                    >
                                                        add
                                                    </span>
                                                    <span className="material-icons-outlined">
                                                        remove
                                                    </span>
                                                </button>
                                                <div className="text-default-text p-[30px] pt-0">
                                                    <p className="last:mb-0">
                                                        perennial, any plant that persists for several
                                                        years, usually with new herbaceous growth from a
                                                        part that survives from growing season to growing
                                                        season. Trees and shrubs, including all gymnosperms
                                                        (cone-bearing plants), are perennials, as are some
                                                        herbaceous (nonwoody) flowering plants and
                                                        vegetative ground covers.
                                                    </p>
                                                    <p className="last:mb-0">
                                                        Once they grow, they start to bear flowers, produce
                                                        fruits, seeds and the cycle continues for a longer
                                                        period of time.
                                                    </p>
                                                </div>
                                            </li>
                                            <li
                                                className="mb-[10px] last:mb-0 bg-white rounded-tl-lg rounded-br-lg overflow-hidden drop-shadow-md"
                                                x-data="{ open: false }"
                                            >
                                                <button type="button" className="w-full flex justify-between items-center text-left font-bold font-heading p-[20px] border-0 hover:border-0">
                                                    <div className="font-bold font-sub text-normal-text">
                                                        How Are Perennials Useful In My Garden?
                                                    </div>
                                                    <span className="material-icons-outlined">add</span>
                                                    <span
                                                        className="material-icons-outlined"
                                                        style={{ display: "none" }}
                                                    >
                                                        remove
                                                    </span>
                                                </button>
                                                <div
                                                    className="text-default-text p-[30px] pt-0"
                                                    style={{ display: "none" }}
                                                >
                                                    <p className="last:mb-0">
                                                        perennial, any plant that persists for several
                                                        years, usually with new herbaceous growth from a
                                                        part that survives from growing season to growing
                                                        season. Trees and shrubs, including all gymnosperms
                                                        (cone-bearing plants), are perennials, as are some
                                                        herbaceous (nonwoody) flowering plants and
                                                        vegetative ground covers.
                                                    </p>
                                                    <p className="last:mb-0">
                                                        Once they grow, they start to bear flowers, produce
                                                        fruits, seeds and the cycle continues for a longer
                                                        period of time.
                                                    </p>
                                                </div>
                                            </li>
                                            <li
                                                className="mb-[10px] last:mb-0 bg-white rounded-tl-lg rounded-br-lg overflow-hidden drop-shadow-md"
                                                x-data="{ open: false }"
                                            >
                                                <button type="button" className="w-full flex justify-between items-center text-left font-bold font-heading p-[20px] border-0 hover:border-0">
                                                    <div className="font-bold font-sub text-normal-text">
                                                        Are Perennials Easy To Grow?
                                                    </div>
                                                    <span className="material-icons-outlined">add</span>
                                                    <span
                                                        className="material-icons-outlined"
                                                        style={{ display: "none" }}
                                                    >
                                                        remove
                                                    </span>
                                                </button>
                                                <div
                                                    className="text-default-text p-[30px] pt-0"
                                                    style={{ display: "none" }}
                                                >
                                                    <p className="last:mb-0">
                                                        perennial, any plant that persists for several
                                                        years, usually with new herbaceous growth from a
                                                        part that survives from growing season to growing
                                                        season. Trees and shrubs, including all gymnosperms
                                                        (cone-bearing plants), are perennials, as are some
                                                        herbaceous (nonwoody) flowering plants and
                                                        vegetative ground covers.
                                                    </p>
                                                    <p className="last:mb-0">
                                                        Once they grow, they start to bear flowers, produce
                                                        fruits, seeds and the cycle continues for a longer
                                                        period of time.
                                                    </p>
                                                </div>
                                            </li>
                                            <li
                                                className="mb-[10px] last:mb-0 bg-white rounded-tl-lg rounded-br-lg overflow-hidden drop-shadow-md"
                                                x-data="{ open: false }"
                                            >
                                                <button type="button" className="w-full flex justify-between items-center text-left font-bold font-heading p-[20px] border-0 hover:border-0">
                                                    <div className="font-bold font-sub text-normal-text">
                                                        Do Perennials Support Wildlife?
                                                    </div>
                                                    <span className="material-icons-outlined">add</span>
                                                    <span
                                                        className="material-icons-outlined"
                                                        style={{ display: "none" }}
                                                    >
                                                        remove
                                                    </span>
                                                </button>
                                                <div
                                                    className="text-default-text p-[30px] pt-0"
                                                    style={{ display: "none" }}
                                                >
                                                    <p className="last:mb-0">
                                                        perennial, any plant that persists for several
                                                        years, usually with new herbaceous growth from a
                                                        part that survives from growing season to growing
                                                        season. Trees and shrubs, including all gymnosperms
                                                        (cone-bearing plants), are perennials, as are some
                                                        herbaceous (nonwoody) flowering plants and
                                                        vegetative ground covers.
                                                    </p>
                                                    <p className="last:mb-0">
                                                        Once they grow, they start to bear flowers, produce
                                                        fruits, seeds and the cycle continues for a longer
                                                        period of time.
                                                    </p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProductListing;
