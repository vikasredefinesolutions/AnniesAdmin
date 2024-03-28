import React, { useState, useEffect, useCallback } from "react";
import { NavLink, Route, Navigate, useLocation, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import MyAccount from "./MyAccount";
import MyNotification from "./MyNotification";
import Activity from "./Activity";
import UserPermission from "./UserPermission";
import AccountActivity from "./AccountActivity";
import Messages from "components/common/alerts/messages/Index";
import Routes from "routes/Routes";
import UserService from "services/admin/user/UserService";
import RoleServices from "services/admin/role/RoleServices";
import SaveAsTemplateModal from "components/common/modals/saveAsTemplate";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { useSelector, useDispatch } from "react-redux";
import { TitleNameHelper, serverError } from "services/common/helper/Helper";
import { ValidationMsgs } from "global/ValidationMessages";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import DropdownService from "services/common/dropdown/DropdownService";
import { useRef } from "react";

const Profile = () => {
  const permission = useSelector(store => store.permission);
  const [FormSubmit, setFormSubmit] = useState(null);
  const [userId, setUserId] = useState("");
  const [SelectedRole, setSelectedRole] = useState("")
  const [subtitle, setSubtitle] = useState("");
  const [Data, setData] = useState([]);
  const [moduleSubmoduleDataWithPermission, setmoduleSubmoduleDataWithPermission] = useState([]);
  const [openIsDefaultTemplateModal, setOpenIsDefaultTemplateModal] = useState(false);
  const [formErrors, setFormErrors] = useState([]);
  const [DefaultTemplate, setDefaultTemplate] = useState({
    saveAsTemplate: false,
    roleName: "",
    submitForm: false,
    showError: false
  })
  const [roles, setRoles] = useState([]);
  const param = useParams();

  const [AssignOldRoleModuleData, setAssignOldRoleModuleData] = useState(false);

  const crntLocation = useLocation();

  const getCurrentParam = param["*"]
  const getLastParam = getCurrentParam ? getCurrentParam.split("/") : []

  const getCurrentUserId = parseInt(getLastParam[getLastParam.length - 1])

  let tempModifiendPermission = [];
  let tempModifiendPermissionCurrent = useRef([])

  const location = useSelector((store) => store?.location);
  const dispatch = useDispatch();
  const CompanyId = useSelector((store) => store?.CompanyConfiguration?.id)
  const reduxUserId = useSelector((store) => store?.user.id)
  const CurrentUserObject = useSelector((store) => store?.user)

  const getAdminRoleData = useCallback(() => {
    dispatch(setAddLoading(true))

    UserService.getAdminUserRolePermission({
      companyconfigurationid: CompanyId,
      userId,
      isSuperUser: CurrentUserObject?.isSuperUser || false

    }).then((response) => {
      if (response.data.data) {
        // fetchDifferentRole(response.data.data.roleId)

        setData(response.data.data)
        if (response.data.data.roleId === 0) {
          setSelectedRole(-1)
        } else {
          setSelectedRole(response.data.data.roleId)
        }
        setmoduleSubmoduleDataWithPermission(response.data.data.modules)

      }
      dispatch(setAddLoading(false))
    }).catch((error) => {
      dispatch(setAddLoading(false))
    });
  }, [userId, CompanyId, crntLocation.pathname]);

  useEffect(() => {
    if (userId && (crntLocation?.pathname?.includes("Settings/user/profile/permission/") || crntLocation?.pathname?.includes("admin/Settings/profile/permission/"))) {
      getAdminRoleData()
    }
  }, [userId, CompanyId, crntLocation?.pathname]);

  const fetchDifferentRole = (SelectedRole) => {
    if (SelectedRole && userId !== reduxUserId) {
      dispatch(setAddLoading(true))

      // set a state for assigning old module of role data object inside new user collection
      RoleServices.getAdminRolePermissionByRoleId(SelectedRole, CompanyId).then((response) => {
        if (response.data.data) {
          setData(response.data.data)

          setmoduleSubmoduleDataWithPermission(response.data.data.modules)
          setAssignOldRoleModuleData(true)
          dispatch(setAddLoading(false))
        }
      }).catch((error) => {
        dispatch(setAddLoading(false))
      });
    }
  }

  const findNestedObject = (userRolePermission, moduleIndex) => {


    const action = (actionObject) => ({
      isEnable: actionObject?.enable || false,
      isDefault: actionObject?.default || false,
      isView: actionObject?.view || false,
      isEdit: actionObject?.edit || false,
      isDelete: actionObject?.delete || false,
    })

    userRolePermission.map((userRolePermissionModule, ModuleSubModuleDataIndex) => {

      const actionObject = userRolePermissionModule.actions[0]
      const currentModuleIdParent = `${moduleIndex ? moduleIndex + "_" : ""}${ModuleSubModuleDataIndex}`

      tempModifiendPermission.unshift({
        id: currentModuleIdParent,
        modules: {
          "rolePermissionID": userRolePermissionModule.rolePermissionId,
          "moduleId": userRolePermissionModule.isNavigation ? userRolePermissionModule.navId : userRolePermissionModule.extId,
          "parentId": userRolePermissionModule.parentId,
          "isNavigation": userRolePermissionModule.isNavigation,
          "rowVersion": "",
          "recStatus": "A",
          ...action(actionObject),
        }
      })

      if (userRolePermissionModule.subRows && userRolePermissionModule.subRows.length > 0) {
        userRolePermissionModule.subRows.map((modSubData, childIndex) => {
          const actionObject = modSubData.actions[0]
          const currentModuleId = `${currentModuleIdParent ? currentModuleIdParent + "_" : ""}${childIndex}`

          tempModifiendPermission.unshift({
            id: currentModuleId,
            modules: {
              "rolePermissionID": modSubData.rolePermissionId,
              "moduleId": modSubData.isNavigation ? modSubData.navId : modSubData.extId,
              "parentId": modSubData.parentId,
              "isNavigation": modSubData.isNavigation,
              "rowVersion": "",
              "recStatus": "A",
              ...action(actionObject),
            }
          })

          if (modSubData.subRows && modSubData.subRows.length > 0) {
            findNestedObject(modSubData.subRows, currentModuleId, ModuleSubModuleDataIndex)
          }
        })
      }

      tempModifiendPermissionCurrent.current = tempModifiendPermission

    })
  }

  const getRoleDropDown = useCallback(() => {
    DropdownService.getDropdownValues("adminrole")
      .then((res) => {
        if (res.data.success) {
          setRoles(() => {
            return res.data.data;
          });
        }
      })
      .catch((err) => { });
  }, [])

  useEffect(() => {
    getRoleDropDown()
  }, []);


  useEffect(() => {
    if (AssignOldRoleModuleData && moduleSubmoduleDataWithPermission && moduleSubmoduleDataWithPermission.length) {
      findNestedObject(moduleSubmoduleDataWithPermission, null, "0")
    }
  }, [AssignOldRoleModuleData, moduleSubmoduleDataWithPermission, Data]);

  const submitHandler = useCallback((values) => {
    if (tempModifiendPermissionCurrent.current && tempModifiendPermissionCurrent.current.length > 0) {
      dispatch(setAddLoading(true))

      // if (AssignOldRoleModuleData || tempModifiendPermissionCurrent.current.length <= 0) {
      //   tempModifiendPermissionCurrent.current = [];
      //   findNestedObject(moduleSubmoduleDataWithPermission)
      // }

      const { browser, ...AllLocation } = location

      const AdminUserRolePermissionObj = {
        "adminUserRolePermissionModel": {
          "roleId": !DefaultTemplate.roleName ? Data.roleId : 0,
          "userId": userId,
          "modules": tempModifiendPermissionCurrent.current.map((allModifiedPermission) => allModifiedPermission.modules),
          ...AllLocation,
          // "location": "string",
          // "ipAddress": "192.168.1.1",
          // "macAddress": "00-00-00-00-00-00",
          "isDefaultTemplate": DefaultTemplate.saveAsTemplate,
          "roleName": DefaultTemplate.roleName
        }
      }

      UserService.updateAdminUserRolePermission(AdminUserRolePermissionObj).then((res) => {
        if (res.data.success && res.data.data) {
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.profile.myAccount.roleUpdated,
            })
          );
          dispatch(setAddLoading(false))

          getAdminRoleData()
          setAssignOldRoleModuleData(false)
          getRoleDropDown()

          setDefaultTemplate({
            saveAsTemplate: false,
            roleName: "",
            submitForm: false,
            showError: false
          })
        } else {
          dispatch(
            setAlertMessage({ type: "danger", message: serverError(res) })
          );
          dispatch(setAddLoading(false))

          setAssignOldRoleModuleData(false)
          // setmoduleSubmoduleDataWithPermission([])
        }
        tempModifiendPermission = []
        tempModifiendPermissionCurrent.current = []

      }).catch((errors) => {
        if (errors) {
          dispatch(
            setAlertMessage({
              message: "Error While Updating Role",
              type: "danger",
            })
          );
          dispatch(setAddLoading(false))

          setAssignOldRoleModuleData(false)
          // setmoduleSubmoduleDataWithPermission([])
        }
        tempModifiendPermission = []
        tempModifiendPermissionCurrent.current = []
      });

    } else {
      dispatch(
        setAlertMessage({ type: "warning", message: "Please make some changes so that we can update the permission." })
      );
    }
  }, [tempModifiendPermissionCurrent.current, moduleSubmoduleDataWithPermission])

  return (
    <>
      {/* <title>User Profile</title> */}
      <title>{TitleNameHelper({ defaultTitleName: `User Profile` })}</title>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="sm:flex sm:justify-between sm:items-center mb-2">
          <div className="col-span-full w-full flex justify-between items-center">
            <h1 className="flex">
              {permission && permission.allPermission["/admin/settings/user"] ?
                <NavLink
                  to={"/admin/settings/user"}
                  className="btn border-neutral-200 hover:border-neutral-400 text-gray-500 hover:text-gray-700 flex items-center mr-2"
                >
                  <span className="material-icons-outlined">west</span>
                </NavLink> : ""}
              {/* <span className="text-2xl md:text-3xl text-gray-800 font-bold">
                User Profile
              </span> */}
              <span className="text-2xl md:text-3xl text-gray-800 font-bold">
                {TitleNameHelper({ defaultTitleName: `User Profile` })}
              </span>
            </h1>

            {FormSubmit && (permission?.isEdit || permission?.isDelete) && <div className="flex flex-wrap space-x-2">
              {permission && permission.allPermission["/admin/settings/user"] ?
                <NavLink to={`/admin/settings/user`} className="btn bg-white border-neutral-200 text-gray-500 hover:text-gray-700">
                  Cancel
                </NavLink> : ""}

              <button
                type="submit"
                // disabled={(userId === reduxUserId || Data.isSuperUser)}
                onClick={() => {
                  FormSubmit.handleSubmit();
                  if (userId !== reduxUserId && crntLocation.pathname === `/admin/Settings/user/profile/permission/${userId}`) {
                    setOpenIsDefaultTemplateModal(true)
                  }
                  dispatch(setAlertMessage({ type: "danger", message: serverError({ data: { errors: formErrors } }) }));
                }}
                // className={`flex justify-center btn px-6 bg-indigo-500 hover:bg-indigo-600 text-white ${((userId === reduxUserId || Data.isSuperUser)) ? "bg-indigo-200 hover:bg-indigo-200" : "cursor-pointer"}`}
                className={`flex justify-center btn px-6 bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer`}
              >
                <div className={`w-full flex justify-center align-middle `}>
                  Save
                </div>
              </button>
            </div>}
          </div>
        </div>
        <div className="sm:flex sm:justify-between sm:items-center mb-8">
          <div className="col-span-full w-full flex justify-between items-center">
            {/* sub Title */}
            <h3 className="flex"><span className="text-sm text-gray-800">{subtitle}</span></h3>
          </div>
        </div>
        <Messages />
        <div className="bg-white shadow-xxl rounded-b-md p-6 mb-6 overflow-auto">
          <div className="flex flex-col md:flex-row md:-mr-px">
            <Sidebar userId={userId ? userId : getCurrentUserId ? getCurrentUserId : 0} />
            <div className="grow">
              <Routes>
                <Route
                  path="/"
                  element={<Navigate to={`myAccount/${reduxUserId}`} replace />}
                />
                <Route
                  path="myAccount/:id"
                  element={
                    <MyAccount
                      setUserId={setUserId}
                      userId={userId}
                      setFormSubmit={setFormSubmit}
                      setFormErrors={setFormErrors}
                      isReadOnly={userId === reduxUserId}
                    />
                  }
                />

                <Route
                  path="myNotification/:id"
                  element={<MyNotification setUserId={setUserId} setFormSubmit={setFormSubmit} setFormErrors={setFormErrors} />}
                />
                <Route
                  path="activity/:id"
                  element={<Activity setUserId={setUserId} setFormSubmit={setFormSubmit} />}
                />

                <Route
                  path="permission/:id"
                  element={<UserPermission setUserId={setUserId} setFormSubmit={setFormSubmit} setSubtitle={setSubtitle} ModuleSubModuleData={moduleSubmoduleDataWithPermission} recCount={1} userPermissionData={Data} SelectedRole={SelectedRole} setSelectedRole={setSelectedRole} DefaultTemplate={DefaultTemplate} setDefaultTemplate={setDefaultTemplate} tempModifiendPermission={tempModifiendPermission} fetchDifferentRole={fetchDifferentRole} isReadOnly={userId === reduxUserId || Data.isSuperUser} roles={roles} setAssignOldRoleModuleData={setAssignOldRoleModuleData} setmoduleSubmoduleDataWithPermission={setmoduleSubmoduleDataWithPermission} tempModifiendPermissionCurrent={tempModifiendPermissionCurrent} />}
                />
                <Route
                  path="account/activity/:id"
                  element={<AccountActivity setUserId={setUserId} setFormSubmit={setFormSubmit} />}
                />
              </Routes>
            </div>
          </div>
        </div>
        <SaveAsTemplateModal
          handleConfirmation={() => { }} z
          openIsDefaultTemplateModal={openIsDefaultTemplateModal}
          setOpenIsDefaultTemplateModal={setOpenIsDefaultTemplateModal}
          DefaultTemplate={DefaultTemplate}
          setDefaultTemplate={setDefaultTemplate}
          submitHandler={submitHandler}
          setAssignOldRoleModuleData={setAssignOldRoleModuleData}
          {...module}
        />
      </div>
    </>
  );
};
export default Profile;
