import React, { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";

import UserAvatar from "assets/images/userAvatar.jpg";
import { HeaderIconSetting } from "dummy/Dummy";
import { CmdBackgroundColorValue } from "services/common/helper/Helper";

const TemplateHeader = ({ values }) => {
  const AdminAppConfigReducers = useSelector(
    (store) => store?.AdminAppConfigReducers,
  );

  const [currentColor, setCurrentColor] = useState({
    backgroundColor: "",
    color: "",
  });

  useEffect(() => {
    if (values?.announcementRow[0]?.backgroundColor) {
      setCurrentColor(
        CmdBackgroundColorValue(values?.announcementRow[0]?.backgroundColor),
      );
    }
  }, [values?.announcementRow[0]?.backgroundColor]);

  return (
    <>
      {values?.announcementRow[0]?.isVisible && (
        <section id="announcementbox" className="mb-2">
          <div className="mx-auto ">
            <div className="group">
              <div className="w-full relative border-solid border-transparent">
                <div
                  className={`bg-blue-500 text-white text-base ${values?.announcementRow[0]?.backgroundColor}`}
                  style={{
                    background: currentColor.backgroundColor,
                    color: currentColor.color,
                  }}
                >
                  <div className="flex items-center justify-between text-center px-8 max-h-10 relative overflow-hidden">
                    <div className="flex items-center">
                      <span className="material-icons top-header-icon text-xl mr-1">
                        verified
                      </span>{" "}
                      <span
                        dangerouslySetInnerHTML={{
                          __html: values?.announcementRow[0]?.leftSideText,
                        }}
                      ></span>{" "}
                    </div>
                    <div className="flex items-center">
                      <span className="material-icons top-header-phone-icon text-xl mr-1">
                        phone
                      </span>{" "}
                      <span
                        dangerouslySetInnerHTML={{
                          __html: values?.announcementRow[0]?.rightSideText,
                        }}
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {values?.announcementRow[1]?.isVisible && (
        <section id="announcementbox" className="mb-2">
          <div className="mx-auto">
            <div className="group">
              <div className="w-full relative border-solid border-transparent">
                <div
                  className={`bg-orange-500 text-white text-base ${values?.announcementRow[1]?.backgroundColor}`}
                  style={{
                    background: values?.announcementRow[1]?.backgroundColor,
                    color: values?.announcementRow[1]?.textColor,
                  }}
                >
                  <div className="flex items-center justify-between text-center px-8 max-h-10 relative overflow-hidden">
                    <div className="flex items-center">
                      {" "}
                      <span
                        dangerouslySetInnerHTML={{
                          __html: values?.announcementRow[1]?.leftSideText,
                        }}
                      ></span>{" "}
                    </div>
                    <div className="flex items-center">
                      <span className="material-icons top-header-phone-icon text-xl mr-1">
                        phone
                      </span>{" "}
                      <span
                        dangerouslySetInnerHTML={{
                          __html: values?.announcementRow[1]?.rightSideText,
                        }}
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <header className="flex justify-center items-center w-full sticky inset-0 bottom-auto z-60 group">
        <div className="w-full relative">
          <div className="absolute inset-0 bg-opacity-50 bg-orange-400 items-center justify-center z-20 hidden group-hover:flex cursor-pointer">
            {/* <span className="material-icons-outlined">mode_edit</span> */}
          </div>
          <div className="text-xl text-white w-full">
            <nav
              className={`shadow border border-neutral-200"`}
              style={{
                background: values?.header_bg_color || "#67798E",
                color: values?.header_text_color || "white",
              }}
            >
              <div className="mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex justify-between h-16">
                  <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                      aria-controls="mobile-menu"
                      aria-expanded="false"
                    >
                      <span className="sr-only">Open main menu</span>
                      <svg
                        className="block h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                      </svg>
                      <svg
                        className="hidden h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </button>
                  </div>

                  <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="flex-shrink-0 flex items-center">
                      <img
                        className="block lg:hidden h-8 w-auto"
                        src="https://storagemedia.corporategear.com/storagemedia/1/store/cms/demo-logo-black.png"
                        alt="Logo"
                      />
                      <img
                        className="hidden lg:block h-8 w-auto"
                        src="https://storagemedia.corporategear.com/storagemedia/1/store/cms/demo-logo-black.png"
                        alt="Logo"
                      />
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                      <a
                        href="#"
                        className="border-indigo-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                      >
                        Dashboard{" "}
                      </a>
                      <a
                        href="#"
                        className="border-transparent  hover:border-neutral-400 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                      >
                        Team{" "}
                      </a>
                      <a
                        href="#"
                        className="border-transparent  hover:border-neutral-400 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                      >
                        Projects{" "}
                      </a>
                      <a
                        href="#"
                        className="border-transparent  hover:border-neutral-400 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                      >
                        Contact{" "}
                      </a>
                      <a
                        href="#"
                        className="border-transparent  hover:border-neutral-400 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                      >
                        {values?.template_Id}
                      </a>
                    </div>
                  </div>

                  {HeaderIconSetting &&
                    HeaderIconSetting.length &&
                    HeaderIconSetting.map((singleHeaderIconObj, index) => {
                      return (
                        <Fragment key={index}>
                          {values && values[singleHeaderIconObj.title] && (
                            <div
                              className={`absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 w-6 overflow-hidden`}
                            >
                              {values[singleHeaderIconObj.components[0].name]
                                ?.iconType == "customimage" ? (
                                <img
                                  alt=""
                                  src={`${AdminAppConfigReducers["azure:BlobUrl"]}${values[singleHeaderIconObj.components[0].name]?.customimage}`}
                                />
                              ) : (
                                <span className="material-icons-outlined">
                                  {
                                    values[
                                      singleHeaderIconObj.components[0].name
                                    ]?.fontawesome
                                  }
                                </span>
                              )}
                            </div>
                          )}
                        </Fragment>
                      );
                    })}

                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6  sm:pr-0">
                    <div className="ml-3 relative">
                      <div>
                        <button
                          type="button"
                          className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          id="user-menu-button"
                          aria-expanded="false"
                          aria-haspopup="true"
                        >
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={UserAvatar}
                            alt=""
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="sm:hidden"
                id="mobile-menu"
                x-show="open"
                style={{ display: "none" }}
              >
                <div className="pt-2 pb-4 space-y-1">
                  <a
                    href="#"
                    className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                  >
                    Dashboard
                  </a>
                  <a
                    href="#"
                    className="border-transparent  hover:bg-gray-50 hover:border-neutral-400 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                  >
                    Team
                  </a>
                  <a
                    href="#"
                    className="border-transparent  hover:bg-gray-50 hover:border-neutral-400 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                  >
                    Projects
                  </a>
                  <a
                    href="#"
                    className="border-transparent  hover:bg-gray-50 hover:border-neutral-400 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                  >
                    Contact
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default TemplateHeader;
