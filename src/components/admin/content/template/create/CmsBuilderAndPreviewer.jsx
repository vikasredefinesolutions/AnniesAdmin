import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { v4 as uuid } from "uuid";
import CMSConfiguration from "services/admin/cmsConfiguration/CMSConfiguration";

import { ValidationMsgs } from "global/ValidationMessages";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";

import CategoryService from "services/admin/category/CategoryService";
import ComponentService from "services/admin/component/ComponentService";
import CategoryMasterService from "services/admin/master/store/categoryMaster/CategoryMasterService";
import StoreService from "services/admin/store/StoreService";
import TemplateService from "services/admin/template/TemplateService";
import TopicsDetailsServices from "services/admin/topics/TopicsDetailsServices";

import * as helper from "components/admin/content/helper/Helper";
import * as ThemeVariable from "components/admin/content/helper/ThemeVariables";
import PageEditTabHeader from "components/admin/content/page/edit/PageEditTabHeader";
import Messages from "components/common/alerts/messages/Index";

import LeftSideBar from "./LeftSideBar";
import TemplateFooter from "./TemplateFooter";
import TemplateHeader from "./TemplateHeader";
import Toolbar from "./Toolbar";
import ElementAccordionDisplay from "./elements/ElementAccordionDisplay";
import ElementCarouselDisplay from "./elements/ElementCarouselDisplay";

import { themeFontStyleOptions } from "dummy/Dummy";


const Create = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const permission = useSelector((store) => store.permission);
  const CompanyName = useSelector((store) => store?.CompanyConfiguration.data);
  const GlobalLoading = useSelector(
    (store) => store?.GlobalLoaderReducer?.toLoad
  );
  const GlobalLoadingHowMany = useSelector(
    (store) => store?.GlobalLoaderReducer?.howMany
  );
  const AdminAppConfigReducers = useSelector(
    (store) => store?.AdminAppConfigReducers
  );

  const [storeId, setStoreId] = useState(1);
  const [loadCSS, setLoadCSS] = useState(false);
  const [ClearCatchURL, setClearCatchURL] = useState("");
  const [fontsArray, setFontsArray] = useState([]);

  /* All Elements added after drop & Saved inside DB */
  const [addedComponent, setAddedComponent] = useState([]);

  const [componentHtml, setComponentHtml] = useState([]);
  const [accordArr, setAccordArr] = useState([]);
  const [currentComponent, setCurrentComponent] = useState("");
  const [tabNumber, setTabNumber] = useState(1);
  const [comProperties, setComProperties] = useState(null);
  const [newAddedComponent, setNewAddedComponent] = useState([]);
  const [postArr, setPostArr] = useState([]);
  const [postArr1, setPostArr1] = useState([]);
  const [clickedElementId, setClickedElementId] = useState(null);
  const [updateElementId, setUpdateElementId] = useState(false);
  const [properties, setProperties] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [storeURL, setStoreURL] = useState("");
  const [topicDetailsData, setTopicDetailsData] = useState({});

  // this variable will return all predefinedStaticHtml for dragable/leftside cms {Already added in db}
  const [componentList, setComponentList] = useState([]);

  // this variable is having the child object only which is sent from the backend {the predefined 32 and more draggable components}
  const [compArr, setCompArr] = useState([]);

  // this variable is having the child id only which is sent from the backend {the predefined 32 and more draggable components}
  const [cmpIdArr, setCmpIdArr] = useState([]);

  const [displayPublish, setDisplayPublish] = useState(false);
  const [name, setName] = useState("");
  const [q, setQ] = useState(null);
  const [fullWidthOfMainContent, setfullWidthOfMainContent] =
    useState(`w-full`);

  const refArray = useRef([]);
  const finalHtml = useRef(null);
  const firstLoaded = useRef(false);
  const { id } = useParams();

  const FolderPath = `/${CompanyName}/store/`;

  const getPageType = useMemo(() => {
    if (location?.pathname) {
      if (location.pathname.includes("Page/edit")) return "Page";
      else if (location.pathname.includes("Category/edit")) return "Category";
      else return "Template";
    } else return "Template";
  }, [location?.pathname]);

  /* Hiden Div Element */
  const updatePropertyFirstTime = useCallback(() => {
    if (componentHtml.length > 0) {
      firstLoaded.current = true;
      componentHtml.forEach((componentValue, index) => {
        if (componentValue?.selected_Values !== undefined) {
          helper.updateSetProperties(componentValue, index);
        }
      });
    }
  }, [componentHtml, helper]);

  const displayComponentSelectProperties = useCallback(() => {
    updatePropertyFirstTime();
    addedComponent.forEach((el) => {
      let element = compArr.filter((value) => value.id === el.component_Id);
      let checkIncludes = !newAddedComponent.includes(el.no);

      if (element?.length > 0 && checkIncludes === true) {
        let uid = uuid(); // "divNo"+len + "-"+element[0].id;
        setComponentHtml((previous) => {
          const newAr = [
            ...previous,
            {
              no: el.no ?? "",
              component_Id: el.component_Id,
              id: el.id,
              html: element[0].html,
              uid: uid,
              name: element[0].name,
              visibility: el.visibility,
              properties: JSON.parse(element[0].properties),
              selected_Values: JSON.parse(el.selected_Values) ?? {},
            },
          ];
          const ids = newAr.map(({ selected_Values }) =>
            JSON.stringify(selected_Values)
          );
          const filtered = newAr.filter(
            ({ selected_Values }, index) =>
              !ids.includes(JSON.stringify(selected_Values), index + 1)
          );
          return filtered;
        });
        setNewAddedComponent((previous1) => [...previous1, el.no]);
      }
    });
  }, [
    compArr,
    firstLoaded,
    addedComponent,
    newAddedComponent,
    updatePropertyFirstTime,
    componentHtml,
  ]);
  // kind of helper function which has a task to saparate element obj and element obj (predefined stored array of elements)
  const filterArr = useCallback(
    (allPredefinedComponents) => {
      allPredefinedComponents.forEach((el) => {
        el.child.forEach((elchild) => {
          if (cmpIdArr.indexOf(elchild.id) <= -1) {
            let tmpCmpArr = {
              no: elchild.no,
              id: elchild.id,
              html: elchild.html,
              name: elchild.name,
              properties: elchild.properties,
              selected_Values: elchild.selected_Values ?? {},
              visibility: elchild.visibility,
              extraHTML: elchild.extraHTML ?? "",
            };
            setCompArr((prev) => [...prev, tmpCmpArr]);
          }
          setCmpIdArr((prev) => [...prev, elchild.id]);
        });
      });

      setTimeout(function () {
        if (!firstLoaded.current && compArr.length > 0) {
          displayComponentSelectProperties();
        }
      }, 100);
    },
    [compArr, cmpIdArr, displayComponentSelectProperties, firstLoaded.current]
  );

  // this function is fetching all predefinedStaticHtml for dragable/leftside cms component {Already added in db}
  const getComponents = useCallback(() => {
    dispatch(setAddLoading(true));
    ComponentService.getComponents()
      .then((res) => {
        if (res?.data?.data) {
          setComponentList(res.data.data);
          filterArr(res.data.data);
          dispatch(setAddLoading(false));
        } else {
          dispatch(setAddLoading(false));
        }
      })
      .catch((error) => {
        dispatch(setAddLoading(false));
      });
  }, [filterArr]);

  const getTopicDetails = useCallback(() => {
    TopicsDetailsServices.getTopicDetails(id).then((res) => {
      dispatch(setAddLoading(true));
      if (res?.data?.success && res?.data?.data) {
        setTopicDetailsData(res?.data?.data);
        dispatch(setAddLoading(false));
      }
      let data = res.data.data;
      let tmpId = data.templateId;
      setStoreId(data.storeId);
      setName(data.title);
      setLoadCSS(true);
      if (res.data.data.publish_status !== undefined) {
        setDisplayPublish(res.data.data.publish_status);
      }
      StoreService.getStoreById(data?.storeId)
        .then((res) => {
          var response = res.data;
          dispatch(setAddLoading(true));
          if (response.success) {
            if (response?.data?.id === 5) {
              setStoreURL(response?.data?.url);
              setClearCatchURL(response?.data?.url + "/api/revalidate");
              dispatch(setAddLoading(false));
            } else {
              setStoreURL(response?.data?.url);
              setClearCatchURL(
                response?.data?.url + "/clearCache/category_id=0"
              );
              dispatch(setAddLoading(false));
            }
          }
        })
        .catch((err) => {
          dispatch(setAddLoading(false));
        });

      TopicsDetailsServices.getTopicComponent(id).then((res) => {
        dispatch(setAddLoading(true));
        if (res.data.data.length > 0) {
          dispatch(setAddLoading(false));
          setAddedComponent(res.data.data);
        } else {
          dispatch(setAddLoading(true));
          TemplateService.getTemplateComponents(tmpId).then((res) => {
            dispatch(setAddLoading(false));
            if (res.data.data !== null) {
              dispatch(setAddLoading(false));
              setAddedComponent(res.data.data);
            } else {
              dispatch(setAddLoading(false));
            }
          });
        }
      });

      CMSConfiguration.getConfiguration(data?.storeId, "main_theme_config")
        .then((response) => {

          if (response.data.success && response?.data?.data) {

            let content = JSON.parse(response.data.data.config_value);
            let fArray = ["--tw-theme-title-text-font-family",
              "--tw-theme-extra-large-text-font-family",
              "--tw-theme-large-text-font-family",
              "--tw-theme-medium-text-font-family",
              "--tw-theme-normal-text-font-family",
              "--tw-theme-default-text-font-family",
              "--tw-theme-extra-small-text-font-family",
              "--tw-theme-sub-text-font-family",
              "--tw-theme-small-text-font-family",
              "--tw-theme-body-font"];

            let tmpArray = [];
            fArray.forEach((el, index) => {

              if (Object.keys(
                content
              ).includes(el)) {
                tmpArray.push(content[el]);
              }
            });

            let finalFontArray = [];
            ThemeVariable.FontFamily.forEach((el, index) => {
              let sFont = themeFontStyleOptions.filter((value) => value.label === el.label);
              if (sFont[0]) {
                let sFont1 = tmpArray.filter((value) => value === sFont[0].value);
                if (sFont1[0]) {
                  console.log(el);
                  finalFontArray.push({ value: el.value, label: el.label })
                }
              }
            })
            setFontsArray(finalFontArray);


          }
          dispatch(setAddLoading(false));
        })
    });
  }, [id]);

  const getCategoryDetails = useCallback(() => {
    CategoryMasterService.getCategoryById(id, {}).then((res) => {
      let data = res.data.data;
      setStoreId(data.storeID);
      setName(data.name);
      setLoadCSS(true);
      CategoryService.getCategoryComponents(id).then((res) => {
        setAddedComponent(res.data.data);
      });
    });
  }, [id]);

  const getTemplateDetails = useCallback(() => {
    TemplateService.getTemplateDetails(id, {}).then((res) => {
      let data = res.data.data;
      setName(data.title);
      setLoadCSS(true);
      TemplateService.getTemplateComponents(id).then((res) => {
        if (res.data.data !== null) {
          setAddedComponent(res.data.data);
        }
      });
    });
  }, [id]);

  const singleSaveData = useCallback(
    (uid) => {
      dispatch(setAddLoading(true));

      let data = postArr1.filter((element) => element?.uid === uid)[0];

      if (getPageType === "Page") {
        let tmpData = [
          {
            id: data.id,
            page_Id: id,
            component_Id: data.component_Id,
            selected_Values: data.selected_Values,
            visibility: data.visibility,
          },
        ];
        TopicsDetailsServices.updateSingleTopicComponent(tmpData, id)
          .then((res) => {
            dispatch(
              setAlertMessage({
                type: "success",
                message: ValidationMsgs.topic.saveSuccess,
              })
            );
            setDisplayPublish(true);
            dispatch(setAddLoading(false));
          })
          .catch((error) => {
            dispatch(
              setAlertMessage({
                type: "success",
                message: ValidationMsgs.topic.saveError,
              })
            );
            dispatch(setAddLoading(false));
          });
      }
      if (getPageType === "Category") {
        let tmpData = [
          {
            id: data.id,
            category_Id: id,
            component_Id: data.component_Id,
            selected_Values: data.selected_Values,
            visibility: data.visibility,
          },
        ];
        CategoryService.updateSingleCategoryComponent(tmpData, id)
          .then((res) => {
            dispatch(
              setAlertMessage({
                type: "success",
                message: ValidationMsgs.topic.saveSuccess,
              })
            );
            dispatch(setAddLoading(false));
            setDisplayPublish(true);
          })
          .catch((error) => {
            dispatch(
              setAlertMessage({
                type: "success",
                message: ValidationMsgs.topic.saveError,
              })
            );
            dispatch(setAddLoading(false));
          });
      }
      if (getPageType === "Template") {
        let tmpData = [
          {
            id: data.id,
            template_Id: id,
            component_Id: data.component_Id,
            selected_Values: data.selected_Values,
            visibility: data.visibility,
          },
        ];
        TemplateService.updateSingleTopicComponent(tmpData, id)
          .then((res) => {
            dispatch(
              setAlertMessage({
                type: "success",
                message: ValidationMsgs.topic.saveSuccess,
              })
            );
            dispatch(setAddLoading(false));
            setDisplayPublish(false);
          })
          .catch((error) => {
            dispatch(
              setAlertMessage({
                type: "success",
                message: ValidationMsgs.topic.saveError,
              })
            );
            dispatch(setAddLoading(false));
          });
      }
    },
    [id, postArr1, getPageType]
  );

  const saveData = useCallback(() => {
    setCurrentComponent("");
    if (getPageType === "Page") {
      dispatch(setAddLoading(true));

      const ids = postArr.map(({ selected_Values }) => selected_Values);
      const filtered = postArr.filter(
        ({ selected_Values }, index) =>
          !ids.includes(selected_Values, index + 1)
      );
      TopicsDetailsServices.updateTopicComponent(filtered, id)
        .then((res) => {
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.topic.saveSuccess,
            })
          );
          if (tabNumber > 1) {
            setTabNumber(1);
          }
          dispatch(setAddLoading(false));
          setDisplayPublish(true);
        })
        .catch((error) => {
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.topic.saveError,
            })
          );
          dispatch(setAddLoading(false));
        });
    } else if (getPageType === "Category") {
      dispatch(setAddLoading(true));
      CategoryService.updateCategoryComponent(postArr, id)
        .then((res) => {
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.topic.saveSuccess,
            })
          );
          dispatch(setAddLoading(false));
          setDisplayPublish(true);
        })
        .catch((error) => {
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.topic.saveError,
            })
          );
          dispatch(setAddLoading(false));
        });
    } else if (getPageType === "Template") {
      dispatch(setAddLoading(true));

      TemplateService.updateTemplateComponents(postArr, id)
        .then((res) => {
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.topic.saveSuccess,
            })
          );
          dispatch(setAddLoading(false));
        })
        .catch((error) => {
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.topic.saveError,
            })
          );
          dispatch(setAddLoading(false));
        });
    }
  }, [getPageType, postArr, id, tabNumber]);

  /* Main Drop function where it will update content HTML array */
  const onDragEndHandler = useCallback(
    (result) => {
      if (!result.destination) {
        return;
      }
      const { source, destination } = result;

      if (source.droppableId !== destination.droppableId) {
        let index = `${source.index}`.replace("cmp", "");

        const element = compArr.filter(
          (value) => value.id.toString() === index
        );

        let uid = uuid(); // "divNo"+len + "-"+element[0].id;

        const componentHtmlNew = Array.from(componentHtml);
        componentHtmlNew.splice(destination.index, 0, {
          no: componentHtml.length + 1,
          id: 0,
          component_Id: element[0].id,
          html: element[0].html,
          uid: uid,
          name: element[0].name,
          visibility: "on",
          properties: JSON.parse(element[0].properties),
          selected_Values: element[0].selected_Values
            ? typeof element[0].selected_Values === "string"
              ? JSON.parse(element[0].selected_Values)
              : element[0].selected_Values
            : {},
          extraHTML: element[0].extraHTML ?? {},
        });
        console.log(483);
        setComponentHtml(componentHtmlNew);

        componentHtmlNew.forEach((componentValue, index) => {
          if (componentValue?.selected_Values !== undefined) {
            setTimeout(function () {
              helper.updateSetProperties(
                componentValue,
                AdminAppConfigReducers["azure:BlobUrl"]
              );
            }, 1000);
          }
        });
      } else {
        const componentHtmlNew = Array.from(componentHtml);
        const [removed] = componentHtmlNew.splice(source.index, 1);
        componentHtmlNew.splice(destination.index, 0, removed);
        console.log(504);
        setComponentHtml(componentHtmlNew);
        componentHtmlNew.forEach((componentValue, index) => {
          if (componentValue?.selected_Values !== undefined) {
            setTimeout(function () {
              helper.updateSetProperties(
                componentValue,
                AdminAppConfigReducers["azure:BlobUrl"]
              );
            }, 1000);
          }
        });
      }
    },
    [compArr, componentHtml]
  );

  /* Default component background pending settings load */
  const loadBackgroundDefault = useCallback((element) => {
    if (element?.selected_Values !== undefined) {
      if (Object.keys(element?.selected_Values).length > 0) {
        const bgPropertyName = Object.keys(element?.properties).find(
          (key) => key === "bg"
        );

        let attributes;
        Object.entries(element?.selected_Values).forEach(([key, value]) => {
          if (key === bgPropertyName) {
            attributes = value;
          }
        });

        if (attributes !== undefined && Object.keys(attributes).length > 0) {
          if (attributes.type === "color") {
            return attributes.value;
          } else if (attributes.type === "image") {
            return 'url("' + attributes.value + '")';
          } else if (attributes.type === "none") {
            return "none";
          }
        }
      }

      return "none";
    }
    return "none";
  }, []);

  const checkBackgroundRgb = (element) => {
    if (element?.selected_Values !== undefined) {
      if (Object.keys(element?.selected_Values).length > 0) {
        const bgPropertyName = Object.keys(element?.properties).find(
          (key) => key === "bg"
        );

        let attributes;
        let rgb;
        let opacity;
        Object.entries(element?.selected_Values).forEach(([key, value]) => {
          if (key === bgPropertyName) {
            attributes = value;
          }
          if (key === bgPropertyName + "_fixed_bg_color_rgb") {
            const str = value.value.split(",");
            rgb = {
              r: str[0],
              g: str[1],
              b: str[2],
            };
          }

          if (key === bgPropertyName + "_fixed_bg_color_opacity") {
            opacity = value.value;
          }
        });

        if (attributes !== undefined && Object.keys(attributes).length > 0) {
          if (attributes.type === "color") {
            return "";
          } else if (attributes.type === "image") {
            if (rgb) {
              return `inset 0 0 0 2000px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
            }
          } else if (attributes.type === "none") {
            return "";
          }
        }
      }
      return "";
    }
    return "";
  };

  const checkFixedBG = useCallback((element) => {
    if (element?.selected_Values !== undefined) {
      if (Object.keys(element?.selected_Values).length > 0) {
        const bgPropertyName = Object.keys(element?.properties).find(
          (key) => key === "bg"
        );

        let attributes;
        let fixedBg;
        Object.entries(element?.selected_Values).forEach(([key, value]) => {
          if (key === bgPropertyName) {
            attributes = value;
          }
          if (key === bgPropertyName + "_fixed_bg") {
            fixedBg = value;
          }
        });

        if (attributes !== undefined && Object.keys(attributes).length > 0) {
          if (attributes.type === "color") {
            return false;
          } else if (attributes.type === "image") {
            if (fixedBg && fixedBg.value) {
              return true;
            }
          } else if (attributes.type === "none") {
            return false;
          }
        }
      }
      return false;
    }
    return false;
  }, []);

  const loadBackgroundType = useCallback(
    (element) => {
      if (element?.selected_Values !== undefined) {
        if (Object.keys(element?.selected_Values).length > 0) {
          const bgPropertyName = "bg";

          let attributes;
          Object.entries(element?.selected_Values).forEach(([key, value]) => {
            if (key === bgPropertyName) {
              attributes = value;
            }
          });

          if (attributes !== undefined && Object.keys(attributes).length > 0) {
            return attributes.type;
          } else {
            return "";
          }
        }
        return "";
      }
      return "";
    },
    [currentComponent]
  );

  const loadBackgroundDefaultStyle = useCallback((element) => {
    if (element?.selected_Values !== undefined) {
      if (Object.keys(element?.selected_Values).length > 0) {
        const bgPropertyName = "bg";

        let attributes;
        Object.entries(element?.selected_Values).forEach(([key, value]) => {
          if (key === bgPropertyName + "_bg_style") {
            attributes = value;
          }
        });

        if (attributes !== undefined && Object.keys(attributes).length > 0) {
          if (attributes.value === "fullbg") {
            return "outer";
          } else {
            return "inner";
          }
        }
      }
      return "outer";
    }
    return "outer";
  }, []);

  const loadBackgroundImageClass = useCallback((element) => {
    if (element?.selected_Values !== undefined) {
      if (Object.keys(element?.selected_Values).length > 0) {
        const bgPropertyName = "bg";

        let attributes;
        Object.entries(element?.selected_Values).forEach(([key, value]) => {
          if (key === bgPropertyName) {
            attributes = value;
          }
        });

        let bgType = "";

        if (attributes !== undefined && Object.keys(attributes).length > 0) {
          if (attributes.type === "image") {
            bgType = "image";
          }
        }
        if (bgType === "image") {
          let imageClass = "";

          if ("bg_bg_image_style" in element?.selected_Values) {
            imageClass +=
              " " + element?.selected_Values.bg_bg_image_style.value;
          }
          if ("bg_bg_image_position" in element?.selected_Values) {
            imageClass +=
              " " + element?.selected_Values.bg_bg_image_position.value;
          }
          return imageClass;
        }
      }
      return "";
    }
    return "";
  }, []);

  /* Function for Accordion On/Off in Sidebar */
  const updateAccordion = useCallback(
    (id) => {
      if (accordArr.includes(id)) {
        setAccordArr((previous) =>
          previous.filter((data) => {
            return data !== id;
          })
        );
      } else {
        setAccordArr((previous) => [...previous, id]);
      }
    },
    [accordArr]
  );

  const getIdOfElement = useCallback((target) => {
    if (target) {
      setClickedElementId(target);
    } else {
      setClickedElementId("No Id Found");
    }
  }, []);

  /* Select current component */
  const selectCurrentComponent = useCallback(
    (uid, event) => {
      if (uid === currentComponent) {
        return;
      }

      if (!isDeleted) {
        setProperties(null);
        setCurrentComponent(uid);

        let element = componentHtml.filter((data) => {
          return data.uid === uid;
        });

        setComProperties(element[0].properties);
        getIdOfElement(event);
        setUpdateElementId((prev) => !prev);
      }
    },
    [currentComponent, isDeleted, componentHtml]
  );

  /* Clone Component */
  const cloneComponent = useCallback(
    (uid) => {
      let componentHtmlNew = [...componentHtml];
      let latestComponent = [];
      let newObj;
      componentHtmlNew.forEach((arr) => {
        latestComponent.push(arr);
        if (arr.uid === uid) {
          //arr.uid = uuid();
          let newuid = uuid();
          let sno = newuid; //Math.random();
          newObj = {
            no: sno,
            id: arr.id,
            component_Id: arr.component_Id,
            html: arr.html,
            uid: newuid,
            name: arr.name,
            visibility: "on",
            properties: arr.properties,
            selected_Values: arr.selected_Values ?? {},
            extraHTML: arr.extraHTML ?? {},
          };

          latestComponent.push({
            no: sno,
            id: arr.id,
            component_Id: arr.component_Id,
            html: arr.html,
            uid: newuid,
            name: arr.name,
            visibility: "on",
            properties: arr.properties,
            selected_Values: arr.selected_Values ?? {},
            extraHTML: arr.extraHTML ?? {},
          });
        }
      });
      setComponentHtml(latestComponent);
      setTimeout(function () {
        helper.updateSetProperties(
          newObj,
          AdminAppConfigReducers["azure:BlobUrl"]
        );
      }, 2000);
    },
    [componentHtml, helper]
  );

  /* Hide Component */
  const changeVisibility = useCallback(
    (uid) => {
      let componentHtmlNew = [...componentHtml];
      let latestComponent = [];
      let newObj;
      componentHtmlNew.forEach((arr) => {
        if (arr.uid === uid) {
          newObj = {
            no: arr.no,
            id: arr.id,
            html: arr.html,
            component_Id: arr.component_Id,
            uid: uuid(),
            name: arr.name,
            visibility: arr.visibility === "on" ? "off" : "on",
            properties: arr.properties,
            selected_Values: arr.selected_Values ?? {},
            extraHTML: arr.extraHTML ?? {},
          };
          latestComponent.push({
            no: arr.no,
            id: arr.id,
            component_Id: arr.component_Id,
            html: arr.html,
            uid: uuid(),
            name: arr.name,
            visibility: arr.visibility === "on" ? "off" : "on",
            properties: arr.properties,
            selected_Values: arr.selected_Values ?? {},
            extraHTML: arr.extraHTML ?? {},
          });
        } else {
          latestComponent.push(arr);
        }
      });
      setComponentHtml(latestComponent);
      setTimeout(function () {
        helper.updateSetProperties(
          newObj,
          AdminAppConfigReducers["azure:BlobUrl"]
        );
      }, 2000);
    },
    [componentHtml, helper]
  );

  /* Delete Component */
  const deleteComponent = useCallback((uid) => {
    //setIsDeleted(true);
    //setComProperties(null);
    //setProperties(null);
    setComponentHtml((previous) =>
      previous.filter((data) => {
        return data.uid !== uid;
      })
    );
    //setCurrentComponent(null);
  }, []);

  /* UPDATE selected attributes of component */
  const updateProperty = useCallback(
    (bgObj, propertyChange) => {
      const curObj = componentHtml.filter(
        (obj) => obj.uid === currentComponent
      );

      let attributes;
      if (propertyChange !== "" && curObj.length > 0) {
        if (curObj[0].selected_Values !== undefined) {
          let isProperty = false;
          Object.entries(curObj[0].selected_Values).forEach(([key, value]) => {
            if (key === propertyChange) {
              isProperty = true;
              attributes = { ...attributes, [key]: bgObj };
            } else {
              attributes = { ...attributes, [key]: value };
            }
          });
          if (!isProperty) {
            attributes = { ...attributes, [propertyChange]: bgObj };
          }
        } else {
          attributes = { [propertyChange]: bgObj };
        }
        const updatedObj = componentHtml.map((obj) => {
          if (obj.uid === currentComponent) {
            return { ...obj, selected_Values: attributes };
          } else {
            return { ...obj };
          }
        });
        setComponentHtml(updatedObj);
      }
    },
    [componentHtml, currentComponent]
  );


  const getNonDuplicatedValues = (arr) =>
    arr.filter((item, index) => {
      arr.splice(index, 1)
      const unique = !arr.includes(item)
      arr.splice(index, 0, item)
      return unique
    })



  const publishPage = () => {
    dispatch(setAddLoading(true));

    let componentHtml = {
      slug: topicDetailsData?.slug,
      htmlContent: finalHtml.current.innerHTML,
      metaDescription: topicDetailsData?.metaDescription,
      pageTitle: topicDetailsData?.topicTitle,
      metaKeywords: topicDetailsData?.metaKeywords,
      isbreadcrumbShow: topicDetailsData?.isbreadcrumbShow,
      menuType: topicDetailsData?.menuType,
      canonicalUrl: topicDetailsData?.canonical_Url,
    };

    let topicObj2 = {
      id: id,
      title: "string",
      pageType: "string",
      passRequired: "string",
      password: "string",
      pass_expiry_period: "string",
      author: "string",
      preview_As: "string",
      store_Id: 0,
      slug: "string",
      topic_Title: "string",
      meta_Description: "string",
      meta_Keywords: "string",
      template_Id: 0,
      head_Html: "string",
      footer_Html: "string",
      canonical_Url: "string",
      publishDuration: "string",
      publishDate: null,
      publish_Time: null,
      unpublishDate: null,
      unpublish_Time: null,
      scheduleUnpublish: "string",
      redirect_Page_Id: "string",
      created_By: "string",
      updated_By: "string",
      status: "string",
      created_At: null,
      updated_At: null,
      isHomePage: "string",
      page_Id: id,
      menu_Type: "string",
      storiesImage: "string",
      description: "string",
      productSku: "string",
      parentId: 0,
    };

    TopicsDetailsServices.publishPage(topicObj2)
      .then((res) => {
        let topicObj = {
          id: 0,
          page_Id: id,
        };
        TopicsDetailsServices.publishTopicComponents(topicObj)
          .then(async (res) => {
            const updateStore =
              await TopicsDetailsServices.updateStoreDetails(storeURL);
            if (updateStore) {
              dispatch(
                setAlertMessage({
                  type: "success",
                  message: ValidationMsgs.topic.publishSuccess,
                })
              );
              dispatch(setAddLoading(false));
              setDisplayPublish(false);
            } else {
              dispatch(
                setAlertMessage({
                  type: "success",
                  message: ValidationMsgs.topic.publishSuccess,
                })
              );
            }
          })
          .catch((error) => {
            dispatch(
              setAlertMessage({
                type: "success",
                message: ValidationMsgs.topic.publishError,
              })
            );
            dispatch(setAddLoading(false));
          });
      })
      .catch((error) => {
        dispatch(
          setAlertMessage({
            type: "success",
            message: ValidationMsgs.topic.publishError,
          })
        );
        dispatch(setAddLoading(false));
      });
  };

  useEffect(() => {
    setQ(searchParams.get("q"));
  }, [searchParams]);

  useEffect(() => {
    getComponents();
    if (getPageType === "Page") {
      getTopicDetails();
    } else if (getPageType === "Category") {
      getCategoryDetails();
    } else if (getPageType === "Template") {
      getTemplateDetails();
    }
  }, [location.pathname]);

  useEffect(() => {
    if (document.readyState === "complete") {
      displayComponentSelectProperties();
    }
  }, [displayComponentSelectProperties]);

  useEffect(() => {
    let tmpArr = [];
    let tmpArr1 = [];
    componentHtml.forEach((element, index) => {
      if (getPageType === "Page") {
        tmpArr = [
          ...tmpArr,
          {
            id: element?.id,
            page_Id: id,
            component_Id: element?.component_Id,
            selected_Values: JSON.stringify(element?.selected_Values),
            visibility: element?.visibility,
          },
        ];
        tmpArr1 = [
          ...tmpArr1,
          {
            id: element?.id,
            page_Id: id,
            uid: element?.uid,
            component_Id: element?.component_Id,
            selected_Values: JSON.stringify(element?.selected_Values),
            visibility: element?.visibility,
          },
        ];
      } else if (getPageType === "Category") {
        tmpArr = [
          ...tmpArr,
          {
            id: element?.id,
            category_Id: id,
            component_Id: element?.component_Id,
            selected_Values: JSON.stringify(element?.selected_Values),
            visibility: element?.visibility,
          },
        ];
        tmpArr1 = [
          ...tmpArr1,
          {
            id: element?.id,
            category_Id: id,
            uid: element?.uid,
            component_Id: element?.component_Id,
            selected_Values: JSON.stringify(element?.selected_Values),
            visibility: element?.visibility,
          },
        ];
      } else {
        tmpArr = [
          ...tmpArr,
          {
            id: element?.id,
            template_Id: id,
            component_Id: element?.component_Id,
            selected_Values: JSON.stringify(element?.selected_Values),
            visibility: element?.visibility,
          },
        ];
        tmpArr1 = [
          ...tmpArr1,
          {
            id: element?.id,
            template_Id: id,
            uid: element?.uid,
            component_Id: element?.component_Id,
            selected_Values: JSON.stringify(element?.selected_Values),
            visibility: element?.visibility,
          },
        ];
      }
    });
    setPostArr(tmpArr);
    setPostArr1(tmpArr1);
  }, [componentHtml]);

  useEffect(() => {
    let flag = false;

    if (!isDeleted && comProperties) {
      Object.entries(comProperties).forEach(([key, val]) => {
        if (val.id === clickedElementId) {
          setProperties({ [key]: val });
          flag = true;
        }
      });
      if (!flag) {
        setProperties(comProperties);
      }
    } else {
      setIsDeleted(false);
    }
  }, [clickedElementId, comProperties, updateElementId]);

  useEffect(() => {
    const head = document.querySelector("head");
    const script = document.createElement("link");

    script.setAttribute(
      "href",
      `${AdminAppConfigReducers["azure:BlobUrl"]}/${AdminAppConfigReducers["cdn:RootDirectory"]
      }/${1}/store/tailwin-css.css?${Math.random()}`
    );
    head.appendChild(script);
  }, []);

  const [isPreview, setIsPreview] = useState(false);

  const ifrm = useRef();
  const [fontValue, setFontValue] = useState({});

  useEffect(() => {
    if (isPreview && ifrm.current) {
      function sendMessage() {
        const el = ifrm.current;
        setTimeout(() => {
          const json = componentHtml.map((res) => ({
            ...res,
            selectedVal: JSON.stringify(res.selected_Values),
            properties: JSON.stringify(res.properties),
            selected_Values: null,
          }));
          const message = JSON.stringify({
            data: json,
            storeId: storeId,
          });
          el.contentWindow.postMessage(message, "*");
        }, 2000);
        // ifrm.current.contentWindow[1].postMessage("message --- ");
      }
      sendMessage();
    }
  }, [ifrm, isPreview, componentHtml]);

  // useEffect(() => {
  //   dispatch(setAddLoading(true));
  //   console.log("STRO", storeId);

  //     .catch(() => {
  //       dispatch(setAddLoading(false));
  //     });
  // }, []);

  const allFunctions = {
    getComponents: getComponents,
    deleteComponent: deleteComponent,
    currentComponent: currentComponent,
    setCurrentComponent: setCurrentComponent,
    refArray: refArray,
    componentHtml: componentHtml,
    componentList: componentList,
    setComponentHtml: setComponentHtml,
    changeVisibility: changeVisibility,
    cloneComponent: cloneComponent,
    selectCurrentComponent: selectCurrentComponent,
    updateAccordion: updateAccordion,
    clickedElementId: clickedElementId,
    updateElementId: updateElementId,
    accordArr: accordArr,
    setTabNumber: setTabNumber,
    tabNumber: tabNumber,
    comProperties: comProperties,
    setComProperties: setComProperties,
    updateProperty: updateProperty,
    // this single save data function is only for toolbar row save button
    singleSaveData: singleSaveData,
    type: getPageType,
    imagePath: FolderPath + storeId + `/images/`,
    storeId: storeId,
    helper: helper,
    updatePropertyFirstTime: updatePropertyFirstTime,
    ThemeVariable: ThemeVariable,
    properties: properties,
    getPageType: getPageType,
    //fontsArray: getNonDuplicatedValues(fontsArray),
    fontsArray: fontsArray,
  };

  return (
    <>

      {/* <link
        rel="stylesheet"
        type="text/css"
        href='/assets/css/fonts.css'
      /> */}
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Round|Material+Icons+Sharp|Material+Icons+Two+Tone"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,10..700,0..1,-50..200"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href={`${AdminAppConfigReducers["azure:BlobUrl"]}/${AdminAppConfigReducers["cdn:RootDirectory"]}/${1}/store/main.css`}
      />

      {loadCSS && (
        <>
          <link
            rel="stylesheet"
            type="text/css"
            href={`${AdminAppConfigReducers["azure:BlobUrl"]}/${AdminAppConfigReducers["cdn:RootDirectory"]}/${1}/store/${storeId}/css/${storeId}.css`}
          />
          <link
            rel="stylesheet"
            type="text/css"
            href={`${AdminAppConfigReducers["azure:BlobUrl"]}/${AdminAppConfigReducers["cdn:RootDirectory"]}/${1}/store/${storeId}/css/custom.css`}
          />
        </>
      )}
      <link
        rel="stylesheet"
        type="text/css"
        href={`${AdminAppConfigReducers["azure:BlobUrl"]}/${AdminAppConfigReducers["cdn:RootDirectory"]}/${1}/store/tailwin-css.css`}
      />

      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />

      <DragDropContext onDragEnd={(result) => onDragEndHandler(result)}>
        <div className="flex py-3 p-4 justify-between items-center bg-slate-800 sticky inset-0 bottom-auto z-60">
          <div className="flex items-center flex-wrap">
            <div className="relative inline-flex">
              {getPageType === "Category" ? (
                <>
                  {/* <Link to={`/admin/stores/ecommercestore/CorporateGear/${storeId}/category`} className="flex flex-wrap btn-sm px-4 py-[5px] bg-white hover:bg-indigo-500 text-indigo-500 hover:text-white mr-2">Exit</Link> */}
                  <Link
                    to={-1}
                    className="flex flex-wrap btn-sm px-4 py-[5px] bg-white hover:bg-indigo-500 text-indigo-500 hover:text-white mr-2"
                  >
                    Exit
                  </Link>
                </>
              ) : (
                <>
                  {q ? (
                    <button
                      className="flex flex-wrap btn-sm px-4 py-[5px] bg-white hover:bg-indigo-500 text-indigo-500 hover:text-white mr-2"
                      onClick={() => navigate(-1)}
                    >
                      Exit
                    </button>
                  ) : (
                    <Link
                      to={`/admin/Content/${getPageType}`}
                      className="flex flex-wrap btn-sm px-4 py-[5px] bg-white hover:bg-indigo-500 text-indigo-500 hover:text-white mr-2"
                    >
                      Exit
                    </Link>
                  )}
                </>
              )}

              <button
                type="button"
                className="px-4 py-[5px] btn-sm bg-indigo-500 hover:bg-indigo-600 text-white mr-2"
                onClick={saveData}
              >
                Save
              </button>
              <button
                className={`px-4 py-[5px] btn-sm bg-indigo-500 hover:bg-indigo-600 text-white mr-2 ${GlobalLoading
                  ? "bg-indigo-200 hover:bg-indigo-200"
                  : "cursor-pointer"
                  }`}
                type="button"
                href={ClearCatchURL}
                target="_blank"
              >
                {GlobalLoading && (
                  <span className="spinner-border spinner-border-sm mr-2"></span>
                )}
                Clear Cache
              </button>
            </div>
          </div>
          <div className="flex mx-auto">
            <span className="text-white">
              Edit {getPageType} - <strong>{name}</strong>
            </span>
          </div>
          <>
            <div>
              {getPageType === "Page" && displayPublish && (
                <button
                  type="button"
                  className="px-4 py-[5px] btn-sm bg-indigo-500 hover:bg-indigo-600 text-white ml-2"
                  onClick={publishPage}
                >
                  Publish
                </button>
              )}
              {componentHtml && componentHtml.length > 0 && (
                <button
                  type="button"
                  className="px-4 py-[5px] btn-sm bg-indigo-500 hover:bg-indigo-600 text-white ml-2"
                  onClick={() => {
                    setIsPreview(!isPreview);
                  }}
                >
                  {isPreview ? "Exit " : ""}Preview
                </button>
              )}
            </div>
          </>
        </div>

        {storeURL && componentHtml.length > 0 && (
          <iframe
            style={{
              width: "100%",
              height: "90vh",
              display: isPreview ? "" : "none",
            }}
            src={`${storeURL}/previewAdmin`}
            ref={ifrm}
          ></iframe>
        )}
        <div
          className={`flex justify-between border-solid border-b-gray-100 w-full ${isPreview ? " hidden" : ""
            } ${GlobalLoadingHowMany > 0 ? "max-h-[90vh] overflow-hidden" : ""}`}
        >
          <div className="w-full">
            {getPageType === "Page" && (
              <>
                <PageEditTabHeader activeTab={1} permission={permission} />
              </>
            )}

            <div className="flex flex-wrap mb-6 relative">
              {/* Left Side Panel Code Starts */}
              <div
                className={`fixed transition-all bg-slate-100 shadow-lg z-40 flex max-h-screen flex-col bottom-0 top-[50px] w-[16.337vw]`}
                id="left"
              >
                <LeftSideBar
                  {...allFunctions}
                  setfullWidthOfMainContent={setfullWidthOfMainContent}
                  fullWidthOfMainContent={fullWidthOfMainContent}
                  addedComponent={addedComponent}
                />
              </div>
              {/* Left Side Panel code Ends */}

              {/* Content Part code Starts */}
              <div
                id="right"
                className="transition-all relative grow w-[83.300vw] ml-[16.337vw]"
              >
                <Messages />

                {getPageType === "Template" && (
                  <>
                    <div className="inset-0 h-14 w-full collapse collapse-horizontal relative z-20">
                      <div className="block p-2 shadow-lg bg-white">
                        <div className="flex flex-wrap sm:auto-cols-max justify-start sm:justify-end gap-2">
                          <div className="flex">
                            <button
                              href={`/admin/Content/${getPageType}`}
                              target="_blank"
                              className="btn-xs border-indigo-300 hover:border-indigo-400 text-indigo-500 ml-2"
                            >
                              <span className="text-sm">Preview</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div
                  id="desktop_phone_view"
                  className={`relative z-10 mx-auto p-4 ${fullWidthOfMainContent}`}
                >
                  <TemplateHeader />

                  <div className="mt-5 h-full" ref={finalHtml}>
                    <Droppable droppableId={"1100"} key={"1100"} index={1100}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={`shadow relative p-5 border-g h-full min-h-[35vh] ${snapshot.isDraggingOver
                              ? "border-2 border-dashed border-neutral-200 bg-gray-50 rounded-sm"
                              : ""
                              }`}
                          >
                            {componentHtml.length > 0 ? (
                              componentHtml.map((componentValue, index) => {
                                let children;

                                // if (Object.keys(componentValue.properties).includes('socialshare')) {
                                // }
                                //  else

                                if (
                                  Object.keys(
                                    componentValue.selected_Values
                                  ).includes("carousel")
                                ) {
                                  children = (
                                    <div id="banner_display2">
                                      <ElementCarouselDisplay
                                        bannerArr={
                                          componentValue.selected_Values?.carousel
                                            .value
                                        }
                                      />
                                    </div>
                                  );
                                } else if (
                                  Object.keys(
                                    componentValue.selected_Values
                                  ).includes("FullAccordion")
                                ) {
                                  children = (
                                    <>
                                      {componentValue?.selected_Values?.Title
                                        ?.value && (
                                          <div
                                            class="text-box-h2 mb-4"
                                            id="Title"
                                          >
                                            {componentValue.selected_Values?.Title
                                              .value ?? ""}
                                          </div>
                                        )}
                                      <ElementAccordionDisplay
                                        selected_Values={
                                          componentValue.selected_Values
                                        }
                                        acValues={
                                          componentValue.selected_Values
                                            .FullAccordion.value
                                        }
                                      />
                                    </>
                                  );
                                } else if (
                                  Object.keys(
                                    componentValue.selected_Values
                                  ).includes("slickslider")
                                ) {
                                  children = (
                                    <ElementCarouselDisplay
                                      bannerArr={
                                        componentValue.selected_Values
                                          .slickslider.value
                                      }
                                    />
                                  );
                                }

                                // else if (
                                //   Object.keys(componentValue.properties).includes('BrandsAtoZ')
                                // ) {
                                // } else if (
                                //   Object.keys(componentValue.properties).includes('brandtabbing')
                                // ) {
                                // } else if (
                                //   Object.keys(componentValue.properties).includes('dynamicform')
                                // ) {
                                // } else if (
                                //   Object.keys(componentValue.properties).includes('lightboxgallery')
                                // ) {
                                // } else if (
                                //   Object.keys(componentValue.properties).includes('scrolllogos')
                                // ) {
                                // } else if (
                                //   Object.keys(componentValue.properties).includes('RightButtonLink')
                                // ) {
                                // }
                                else {
                                  children = (
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: componentValue?.html,
                                      }}
                                    />
                                  );
                                }

                                return (
                                  <Fragment key={index}>
                                    <Draggable
                                      key={componentValue?.uid}
                                      draggableId={`${componentValue?.uid}`}
                                      index={index}
                                    >
                                      {(provided) => {
                                        const backgroundDefault =
                                          loadBackgroundDefault(componentValue);
                                        const backgroundStyle =
                                          loadBackgroundDefaultStyle(
                                            componentValue
                                          );
                                        const backgroundImageClass =
                                          loadBackgroundImageClass(
                                            componentValue
                                          );
                                        const fixedBgDisplay =
                                          checkFixedBG(componentValue);
                                        const rgb =
                                          checkBackgroundRgb(componentValue);
                                        let additionalclass = "";
                                        let innerDivClass = "";

                                        if (
                                          componentValue?.selected_Values &&
                                          "additionalclass" in
                                          componentValue?.selected_Values
                                        ) {
                                          additionalclass +=
                                            componentValue?.selected_Values
                                              .additionalclass.value;
                                        }
                                        if (
                                          componentValue?.selected_Values &&
                                          "container" in
                                          componentValue?.selected_Values
                                        ) {
                                          if (
                                            componentValue?.selected_Values
                                              .container.value === "w-full"
                                          ) {
                                            additionalclass +=
                                              " container-fluid";
                                          } else {
                                            additionalclass +=
                                              " " +
                                              componentValue?.selected_Values
                                                .container.value +
                                              " mx-auto ";
                                          }
                                        } else {
                                          additionalclass +=
                                            " container mx-auto ";
                                        }

                                        if (
                                          componentValue?.selected_Values &&
                                          "container_left_padding" in
                                          componentValue?.selected_Values
                                        ) {
                                          innerDivClass +=
                                            " " +
                                            componentValue?.selected_Values
                                              .container_left_padding.value;
                                        }
                                        if (
                                          componentValue?.selected_Values &&
                                          "container_top_padding" in
                                          componentValue?.selected_Values
                                        ) {
                                          innerDivClass +=
                                            " " +
                                            componentValue?.selected_Values
                                              .container_top_padding.value;
                                        }
                                        if (
                                          componentValue?.selected_Values &&
                                          "container_right_padding" in
                                          componentValue?.selected_Values
                                        ) {
                                          innerDivClass +=
                                            " " +
                                            componentValue?.selected_Values
                                              .container_right_padding.value;
                                        }
                                        if (
                                          componentValue?.selected_Values &&
                                          "container_bottom_padding" in
                                          componentValue?.selected_Values
                                        ) {
                                          innerDivClass +=
                                            " " +
                                            componentValue?.selected_Values
                                              .container_bottom_padding.value;
                                        }
                                        if (
                                          componentValue?.selected_Values &&
                                          "container_left_margin" in
                                          componentValue?.selected_Values
                                        ) {
                                          innerDivClass +=
                                            " " +
                                            componentValue?.selected_Values
                                              .container_left_margin.value;
                                        }
                                        if (
                                          componentValue?.selected_Values &&
                                          "container_top_margin" in
                                          componentValue?.selected_Values
                                        ) {
                                          innerDivClass +=
                                            " " +
                                            componentValue?.selected_Values
                                              .container_top_margin.value;
                                        }
                                        if (
                                          componentValue?.selected_Values &&
                                          "container_right_margin" in
                                          componentValue?.selected_Values
                                        ) {
                                          innerDivClass +=
                                            " " +
                                            componentValue?.selected_Values
                                              .container_right_margin.value;
                                        }
                                        if (
                                          componentValue?.selected_Values &&
                                          "container_bottom_margin" in
                                          componentValue?.selected_Values
                                        ) {
                                          innerDivClass +=
                                            " " +
                                            componentValue?.selected_Values
                                              .container_bottom_margin.value;
                                        }
                                        return (
                                          <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                          >
                                            <div
                                              id={`div${componentValue?.no}`}
                                              ref={(ref) => {
                                                refArray.current[
                                                  componentValue?.uid
                                                ] = ref;
                                              }}
                                              onClick={() =>
                                                selectCurrentComponent(
                                                  componentValue?.uid,
                                                  `div${componentValue?.no}`
                                                )
                                              }
                                              className={`min-h-[20vh] component-selector py-2 mb-2g flex flex-wrap justify-center items-center relative mb-1
                                                 ${componentValue?.visibility ===
                                                  "off"
                                                  ? "hidden"
                                                  : ""
                                                } ${currentComponent ===
                                                  componentValue?.uid
                                                  ? "border border-red-500"
                                                  : "border border-dashed border-gray-400"
                                                } 
                                                ${backgroundStyle === "outer"
                                                  ? backgroundImageClass
                                                  : ""
                                                }`}
                                              style={
                                                loadBackgroundType(
                                                  componentValue
                                                ) === "image"
                                                  ? {
                                                    backgroundImage:
                                                      backgroundStyle ===
                                                        "outer"
                                                        ? backgroundDefault
                                                        : "none",
                                                    backgroundAttachment:
                                                      backgroundStyle ===
                                                        "outer"
                                                        ? fixedBgDisplay
                                                          ? "fixed"
                                                          : "inherit"
                                                        : "inherit",
                                                    boxShadow:
                                                      backgroundStyle ===
                                                        "outer"
                                                        ? rgb
                                                        : "none",
                                                  }
                                                  : {
                                                    background:
                                                      backgroundStyle ===
                                                        "outer"
                                                        ? backgroundDefault
                                                        : "none",
                                                  }
                                              }
                                            >
                                              <section
                                                className={`${additionalclass}`}
                                              >
                                                <div
                                                  id={`indiv${componentValue?.no}`}
                                                  className={`${innerDivClass} ${backgroundStyle === "inner"
                                                    ? backgroundImageClass
                                                    : ""
                                                    }`}
                                                  style={
                                                    loadBackgroundType(
                                                      componentValue
                                                    ) === "image"
                                                      ? {
                                                        backgroundImage:
                                                          backgroundStyle ===
                                                            "inner"
                                                            ? backgroundDefault
                                                            : "none",
                                                        backgroundAttachment:
                                                          backgroundStyle ===
                                                            "inner"
                                                            ? fixedBgDisplay
                                                              ? "fixed"
                                                              : "inherit"
                                                            : "inherit",
                                                        boxShadow:
                                                          backgroundStyle ===
                                                            "inner"
                                                            ? rgb
                                                            : "none",
                                                      }
                                                      : {
                                                        background:
                                                          backgroundStyle ===
                                                            "inner"
                                                            ? backgroundDefault
                                                            : "none",
                                                      }
                                                  }
                                                >
                                                  {currentComponent &&
                                                    currentComponent ===
                                                    componentValue?.uid && (
                                                      <>
                                                        <Toolbar
                                                          property={
                                                            allFunctions
                                                          }
                                                          uid={
                                                            componentValue?.uid
                                                          }
                                                          no={
                                                            componentValue?.no
                                                          }
                                                        />
                                                      </>
                                                    )}
                                                  {children}
                                                </div>
                                              </section>
                                            </div>
                                          </div>
                                        );
                                      }}
                                    </Draggable>
                                  </Fragment>
                                );
                              })
                            ) : (
                              <div
                                className={`flex justify-center items-center text-3xl font-bold bg-white shadow-lg rounded-md border select-none min-h-[35vh]`}
                              >
                                Drop Here
                              </div>
                            )}
                            {provided.placeholder}
                          </div>
                        );
                      }}
                    </Droppable>
                  </div>

                  <TemplateFooter />
                </div>
              </div>
              {/* Content Part Code Ends */}
            </div>
          </div>
        </div>
      </DragDropContext>
    </>
  );
};

export default Create;
