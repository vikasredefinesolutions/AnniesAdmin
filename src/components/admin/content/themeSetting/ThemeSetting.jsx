
import React, { useState, useEffect } from "react";
import Sidebar from "components/admin/content/common/sidebar/Sidebar";
import Breadcrumbs from "./Breadcrumbs";
import Settings from "./Settings";
import { contentThemeSettingAttributeDate } from "dummy/Dummy";
import { useParams, useNavigate } from "react-router-dom";
import StoreService from "services/admin/store/StoreService";
import { useDispatch } from "react-redux";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import ThemeSettingBody from "./ThemeSettingBody";
import { useSelector } from "react-redux";
import Messages from "components/common/alerts/messages/Index";
import StoreEditHeader from "../page/edit/StoreEditHeader";

const ThemeSetting = () => {
  const AdminAppConfigReducers = useSelector((store) => store?.AdminAppConfigReducers);

  const [themeSettingData, setThemeSettingData] = useState(
    contentThemeSettingAttributeDate
  );
  const [update, setUpdate] = useState(false)
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [showSidebar, setShowSideBar] = useState(true);

  const onThemeSubmitHandler = () => {
    console.log("Save Theme Clicked");
  };

  const onNestedAttributeClickHandler = (attribute) => {
    setBreadcrumbs([...breadcrumbs, attribute]);
    setThemeSettingData([attribute]);
  };
  const { storeid } = useParams();
  const [store, setStore] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const link = document.createElement('link')
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('href', `${AdminAppConfigReducers["azure:BlobUrl"]}/${AdminAppConfigReducers["cdn:RootDirectory"]}/${1}/store/${storeid}/css/${storeid}.css?${Math.random()}`)
    document.getElementsByTagName("head")[0].appendChild(link);
  }, [update])

  useEffect(() => {
    dispatch(setAddLoading(true));
    StoreService.getStoreById(storeid).then((response) => {
      if (response?.data?.success && response?.data?.data) {
        setStore(response?.data?.data);
      }
      dispatch(setAddLoading(false));
    }).catch(() => {
      dispatch(setAddLoading(false));
    })
  }, [storeid]);

  return (
    <>
      <title>Configure Theme</title>

      <StoreEditHeader activeTab={2} />
      <MainHeader store={store} />
      <Messages />

      <div className="flex justify-between border-solid border-b-gray-100 w-full" >
        <div className="w-full">
          <div className="flex flex-wrap mb-6 relative">
            <Sidebar showSidebar={showSidebar} setShowSideBar={setShowSideBar}>
              <Breadcrumbs
                setThemeSettingData={setThemeSettingData}
                ThemeData={contentThemeSettingAttributeDate}
                breadcrumbs={breadcrumbs}
                setBreadcrumbs={setBreadcrumbs}
              />
              <div className=" bg-white pt-2">
                <div className="pl-2 pb-2 flex justify-between hover:underline">
                  <div className="text-2xl">Theme Setting</div>
                </div>
              </div>
              <Settings
                onThemeSubmitHandler={onThemeSubmitHandler}
                AttributeData={themeSettingData}
                onNestedAttributeClickHandler={onNestedAttributeClickHandler}
                setUpdate={setUpdate}
                update={update}
                storeData={store && store}
              />
            </Sidebar>

            <ThemeSettingBody showSidebar={showSidebar} />
          </div>
        </div>
      </div>

    </>
  );
};

export default ThemeSetting;

const MainHeader = ({ store }) => {

  const navigate = useNavigate()
  return (
    <>
      <div className="flex py-3 p-4 justify-between items-center bg-slate-800 sticky inset-0 bottom-auto z-60">
        <div className="flex items-center flex-wrap">
          <div className="relative inline-flex">
            <button
              type="button"
              className="flex flex-wrap btn-sm px-4 py-[5px] bg-white hover:bg-indigo-500 text-indigo-500 hover:text-white mr-2"
              onClick={() => navigate(-1)}
            >
              <span >Exit</span>
            </button>
            {/* <button className="px-4 py-[5px] btn-sm bg-indigo-500 hover:bg-indigo-600 text-white mr-2">
              Save
            </button> */}
          </div>
        </div>
        <div className="text-white flex items-center text-sm justify-between font-normal">
          {store?.name || ''}
        </div>
        <div >
          {/* <span className="px-4 py-[5px] btn-sm bg-rose-500 hover:bg-rose-600 text-white ml-2">
            Unpublish
          </span>

          <span className="px-4 py-[5px] btn-sm bg-indigo-500 hover:bg-indigo-600 text-white ml-2">
            Update
          </span> */}
        </div>
      </div>
    </>
  );
};
