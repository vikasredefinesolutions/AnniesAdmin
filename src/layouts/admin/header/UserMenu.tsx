/*Component Name: UserMenu
Component Functional Details: Login User menu.
Created By: -
Created Date: -
Modified By: Pradip
Modified Date: 6-1-2022 */
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import UserAvatar from "assets/images/userAvatar.jpg";
import Transition from "utils/Transition";

import AuthService from "services/admin/auth/AuthService";

import { setSelectedSidebarMenu } from "redux/GetMenuListByUserRole/MenuListByUserRoleActions";
import { logout } from "redux/auth/AuthAction";

import { __AllStoresObj } from "typeDefination/app.type";

function UserMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const AdminAppConfigReducers = useSelector((store: __AllStoresObj) => store?.AdminAppConfigReducers);
  const { data: MenuList } = useSelector((store: __AllStoresObj) => store.MenuListByUserRoleReducers)
  const permission = useSelector((store: __AllStoresObj) => store?.permission);
  const location = useSelector((store: __AllStoresObj) => store?.location);
  let currentUser = useSelector((store: __AllStoresObj) => store?.user);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuItems, setMenuItems] = useState({})

  const trigger = useRef(null);
  const dropdown = useRef(null);

  const logoutHandler = () => {
    AuthService.logout({ ...location }).then((response) => {
      dispatch(logout());
      setDropdownOpen(!dropdownOpen);
      navigate("/login");
    }).catch(() => {

    })
  }

  useEffect(() => {
    const settingsMenu = MenuList.find(
      (menu) => menu.name.toLowerCase() === "settings"
    );
    const temp = {}
    settingsMenu?.subRows.forEach((m) => { temp[m.name] = m.id })
    setMenuItems(temp)
  }, [MenuList]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [dropdownOpen]);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [dropdownOpen]);


  return (
    <div className="relative inline-flex userProfileContainer">
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <div className="h-10 w-10 flex items-center justify-center overflow-hidden rounded-full">
          <img
            src={
              currentUser?.userPhoto !== "" && currentUser?.userPhoto !== "string" && currentUser?.userPhoto !== undefined  ? `${AdminAppConfigReducers["azure:BlobUrl"]}${currentUser?.userPhoto}` : UserAvatar
            }
            alt="user avatar"
          />
        </div>
        <div className="flex items-center truncate">
          <span className="truncate ml-2 text-sm font-medium group-hover:text-gray-800">
            {currentUser?.firstname ? currentUser.firstname : ""}&nbsp;
            {currentUser?.lastname ? currentUser.lastname : ""}
          </span>
          <svg
            className="w-3 h-3 flex-shrink-0 ml-1 fill-current text-gray-400"
            viewBox="0 0 12 12"
          >
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </button>

      <Transition
        className="z-50 absolute top-8 right-0 min-w-44 bg-white border border-gray-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        appear={undefined}>
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-neutral-200">
            <div className="font-medium text-gray-800">
              {currentUser?.firstname ? currentUser.firstname : ""}{" "}
              {currentUser?.lastname ? currentUser.lastname : ""}
            </div>
            <div className="text-xs text-gray-500 italic">
              {currentUser?.role ? currentUser.roleName : ""}
            </div>
          </div>
          <ul>
            {permission?.allPermission[
              "/admin/Settings/profile".toLowerCase()
            ] && (
                <li>
                  <NavLink
                    className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                    to={`/admin/Settings/profile/`}
                    onClick={() => {
                      setDropdownOpen(!dropdownOpen);
                      dispatch(setSelectedSidebarMenu(menuItems["Profile"]))
                      localStorage.setItem("selectedMenu", menuItems["Profile"]);
                    }}
                  >
                    Profile
                  </NavLink>
                </li>
              )}
            {permission?.allPermission[
              "/admin/Settings/user".toLowerCase()
            ] && (
                <li>
                  <NavLink
                    className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                    to="/admin/Settings/user"
                    onClick={() => {
                      setDropdownOpen(!dropdownOpen);
                      dispatch(setSelectedSidebarMenu(menuItems["Users"]))
                      localStorage.setItem("selectedMenu", menuItems["Users"]);
                    }}
                  >
                    User
                  </NavLink>
                </li>
              )}
            {permission?.allPermission[
              "/admin/Settings/system/log".toLowerCase()
            ] && (
                <li>
                  <NavLink
                    className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                    to="/admin/Settings/system/log"
                    onClick={() => {
                      setDropdownOpen(!dropdownOpen)
                      dispatch(setSelectedSidebarMenu(menuItems["System Log"]))
                      localStorage.setItem("selectedMenu", menuItems["System Log"])
                    }}
                  >
                    System Logs
                  </NavLink>
                </li>
              )}

            <li className="mt-1 pt-1 border-t border-neutral-200">
              <span
                className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3 cursor-pointer"
                onClick={logoutHandler}
              >
                Sign Out
              </span>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  );
}

export default UserMenu;
