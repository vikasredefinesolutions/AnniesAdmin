import React, { useRef, useState, useEffect, useCallback, Fragment } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { sessionStorageCleanerHelper } from "services/common/helper/Helper"

import { setSelectedSidebarMenu, getMenuListForSideBar } from "redux/GetMenuListByUserRole/MenuListByUserRoleActions";
import { addActiveTab, setSearchQuery, fillSerchQuery, } from "redux/searchQueryForMGS/SearchQueryAction";

import SidebarLinkGroup from "./SidebarLinkGroup.jsx";

import { __AllStoresObj } from "typeDefination/app.type.js";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const user = useSelector((store: __AllStoresObj) => store?.user);
  const CompanyId = useSelector((store: __AllStoresObj) => store?.CompanyConfiguration.id);
  const { data: MenuList } = useSelector((store: __AllStoresObj) => store.MenuListByUserRoleReducers)

  const sidebar = useRef(null);

  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(0);

  const { pathname } = location;

  const startResizing = useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback((mouseMoveEvent: any) => {
    if (isResizing) {
      setSidebarWidth(
        mouseMoveEvent.clientX -
        sidebar.current.getBoundingClientRect().left
      );
    }
  }, [isResizing]);

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);


  useEffect(() => {
    if (user?.id && CompanyId) {
      dispatch(getMenuListForSideBar({ userId: user.id, isSuperUser: user.isSuperUser, CompanyId }))
    }
  }, [user, CompanyId, dispatch]);

  useEffect(() => {
    if (sidebarWidth > 0) {
      localStorage.setItem("sidebar-expanded", JSON.stringify({
        isExpended: sidebarExpanded,
        currentWidth: sidebarWidth
      }));
      if (sidebarExpanded) {
        document.querySelector("body").classList.add("sidebar-expanded");
      } else {
        document.querySelector("body").classList.remove("sidebar-expanded");
      }
    }

  }, [sidebarExpanded, sidebarWidth]);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current) return;
      if (!sidebarOpen || sidebar.current.contains(target)) return;
      //   setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {

    const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");

    let currentExpObj = null
    if (storedSidebarExpanded) {
      currentExpObj = JSON.parse(storedSidebarExpanded)
    }

    setTimeout(() => {
      setSidebarExpanded(window.innerWidth > 1058 ? true : currentExpObj?.isExpended ? Boolean(currentExpObj.isExpended) : true)
      setSidebarWidth(currentExpObj?.currentWidth ? currentExpObj?.currentWidth : 240)
    }, 0);
  }, [])

  const findSelectedMenu = (menuList) => {
    let menuUrl = menuList.navigationurl.startsWith("/")
      ? menuList.navigationurl
      : "/" + menuList.navigationurl;
    if (
      menuList.navigationurl &&
      menuList.navigationurl !== "" &&
      pathname.toLowerCase().startsWith(menuUrl.toLowerCase())
    ) {
      return true;
    } else if (menuList.subRows && menuList.subRows.length > 0) {
      var temp = false;
      for (let index = 0; index < menuList.subRows.length; index++) {
        temp = findSelectedMenu(menuList.subRows[index]);
        if (temp) {
          break;
        }
      }
      return temp;
    } else {
      return false;
    }
  };

  const resetSerchQueryRedux = () => {
    dispatch(setSearchQuery(""));
    dispatch(fillSerchQuery(false));
    dispatch(addActiveTab(0));
  };

  const handleMenuSelection = (menu: { name: string }, currentLocation: string) => {
    if (currentLocation !== location.pathname) {
      resetSerchQueryRedux();
      navigate(currentLocation)
      dispatch(setSelectedSidebarMenu(menu))
      sessionStorage.setItem("ActiveMenuName", JSON.stringify({ menuName: menu.name, currentLocation }))
    }
  };

  const createSubmenu = (menu: any, index: any, background: any) => {
    let menuUrl = menu.navigationurl.startsWith("/")
      ? menu.navigationurl
      : "/" + menu.navigationurl;

    var currentUrl = pathname.toLowerCase().startsWith(menuUrl.toLowerCase());
    if (menuUrl.toLowerCase() === pathname.toLowerCase()) {
      sessionStorageCleanerHelper(pathname, "ActiveMenuName", menu.name, menuUrl, "sidebar")
    }

    // var currentUrl = (menu.navigationurl !== '' && !pathname.toLowerCase().includes("storebuilder") ? pathname.toLowerCase().startsWith(menuUrl.toLowerCase()) : pathname.toLowerCase().endsWith(menuUrl.toLowerCase()));
    // var currentUrl = selectedMenu === menu.id;
    var iconColor = menu.isNavigation ? findSelectedMenu(menu) : true ? false : currentUrl;
    // var iconColor = selectedMenu===menu.id
    if (!menu.subRows || menu.subRows.length <= 0) {
      return (
        <Fragment key={index}>
          {menu.parentId === 0 ? (
            <Fragment key={index}>
              <li className={`px-3 pt-2 pb-2 rounded-sm mb-1 last:mb-0`}>
                <span
                  className={`block text-lightpurple-700 hover:text-lightpurple-900 truncate transition duration-150 font-bold cursor-pointer ${currentUrl && background ? "font-bold" : "font-semibold"
                    } ${currentUrl && menu.isNavigation
                      ? "bg-red-500  px-1 py-2 rounded-md"
                      : ""
                    }`}
                  onClick={(e) => {
                    handleMenuSelection(menu, menuUrl)
                  }}
                >
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {menu.menuicon && menu.menuicon !== "" && (
                        <span
                          className={`material-icons-outlined ${iconColor ? "text-red-500" : "text-[#b8b8bc]"
                            } ${menu.isNavigation && currentUrl ? "text-white" : ""
                            }`}
                        >
                          {menu.menuicon}
                        </span>
                      )}
                      <span
                        className={`text-sm ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 duration-200 ${currentUrl && background
                          ? "font-bold"
                          : "font-semibold"
                          } ${menu.isNavigation && currentUrl ? "text-white" : ""
                          }`}
                      >
                        {menu.name}
                      </span>
                    </div>
                  </div>
                </span>
              </li>
            </Fragment>
          ) : (
            <Fragment key={index}>
              <li
                className={`${menu.parentId === 0
                  ? "px-3 py-2 rounded-sm mb-1 last:mb-0"
                  : ""
                  }`}
              >
                <span
                  className={`block text-lightpurple-700 hover:text-lightpurple-900 transition duration-150  px-3 py-2 rounded-md cursor-pointer ${currentUrl && background
                    ? "bg-red-500 font-bold"
                    : " rounded-md text-lightpurple-700 hover:text-lightpurple-900"
                    }`}
                  onClick={() => {
                    handleMenuSelection(menu, menuUrl)
                  }}
                >
                  {/* {(menu.menuicon && menu.menuicon !== '') && <span className={`material-icons-outlined mr-3 ${pathname.startsWith(menu.navigationurl) ? "text-white" : "text-[#b8b8bc]"}`}>{menu.menuicon}</span>} */}
                  <div
                    className={`text-sm lg:opacity-0 lg:sidebar-expanded:opacity-100 duration-200 break-words ${currentUrl ? "text-white" : ""
                      }`}
                  >
                    {menu.name}
                  </div>
                </span>
              </li>
            </Fragment>
          )}
        </Fragment>
      );
    }
    if (menu.subRows) {
      return (
        <SidebarLinkGroup
          activecondition={iconColor}
          key={index}
          type={menu.parentId === 0}
        >
          {(handleClick, open) => {
            return (
              <Fragment>
                <button
                  className={`${menu.parentId !== 0 ? "py-2" : ""
                    } block w-full text-lightpurple-700 hover:text-lightpurple-900 transition duration-150 ${currentUrl && "hover:text-lightpurple-700"
                    }`}
                  onClick={(e) => {
                    e.preventDefault();
                    sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {menu.menuicon && menu.menuicon !== "" && (
                        <span
                          className={`material-icons-outlined ${menu.parentId !== 0 && "ml-3"
                            } ${iconColor ? "text-red-500" : "text-[#b8b8bc]"}`}
                        >
                          {menu.menuicon}
                        </span>
                      )}
                      <span
                        className={`text-sm ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 duration-200 break-words ${currentUrl ? "font-bold" : "font-semibold"
                          }`}
                      >
                        {menu.name}
                      </span>
                    </div>
                    {/* Icon */}
                    <div className="flex shrink-0 ml-2 lg:opacity-0 lg:sidebar-expanded:opacity-100 duration-200">
                      <svg
                        className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${open && "transform rotate-180"
                          }`}
                        viewBox="0 0 12 12"
                      >
                        <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                      </svg>
                    </div>
                  </div>
                </button>
                <div className="lg:hidden lg:sidebar-expanded:block">
                  <ul
                    className={`${menu.menuicon && menu.menuicon !== "" ? "pl-9" : "pl-3"
                      } mt-2 ${!open && "hidden"}`}
                  >
                    {menu.subRows.map((menu, index) => {
                      return createSubmenu(menu, index, (background = true));
                    })}
                  </ul>
                </div>
              </Fragment>
            );
          }}
        </SidebarLinkGroup>
      );
    }
  };

  return (
    <>
      <div className={`app-container ${sidebarExpanded === false ? "w-20" : ""} h-[calc(100vh-4rem)] sticky top-16 bottom-0 bg-opacity-30 z-40 lg:hidden lg:z-auto`}>
        <div
          id="sidebar"
          ref={sidebar}
          className={`app-sidebar mr-1 ${sidebarExpanded === false ? "!w-20" : "min-w-[250px]"} fixed ${sidebarOpen ? "left-0 top-16 bottom-0" : "!-left-96"}  lg:static bg-slate-100 border-r border-dashed z-60 left-0 h-full lg:left-auto scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-slate-200`}
          style={{ width: sidebarWidth }}
          onMouseDown={(e) => e.preventDefault()}
        >

          <div className={`grow flex flex-col ${sidebarExpanded === false ? "w-full" : ""}`}>
            <div className="w-full">
              <ul className="mt-3">
                {MenuList.map((menu, index) => {
                  return createSubmenu(menu, index, false);
                })}
              </ul>
            </div>

            {/* Expand / collapse button   */}
            <div className="pt-3 lg:inline-flex justify-end mt-auto">
              <div className="px-3 py-2">
                <button onClick={() => setSidebarExpanded((prev) => !prev)}>
                  <span className="sr-only">Expand / collapse sidebar</span>
                  <svg
                    className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
                    viewBox="0 0 24 24"
                  >
                    <path
                      className="text-lightpurple-500"
                      d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                    ></path>
                    <path className="text-gray-600" d="M3 23H1V1h2z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-2/4 -right-[0.55rem] text-slate-300"><span className="material-icons-outlined">more_vert</span></div>
          {sidebarExpanded === true ? <div className="app-sidebar-resizer absolute p-[3px] right-0 top-0 bottom-0 w-[6px]" onMouseDown={startResizing} /> : ""}
        </div>
      </div>
    </>
  );
}
