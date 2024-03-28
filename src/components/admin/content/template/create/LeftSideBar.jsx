import React, { Fragment, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { API } from "helpers/API";
import { ValidationMsgs } from "global/ValidationMessages";

import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";

import { serverError } from "services/common/helper/Helper";

import ConfirmDelete from "components/common/modals/ConfirmDelete";

import ElementBackground from "./elements/ElementBackground";
import ElementImage from "./elements/ElementImage";
import ElementText from "./elements/ElementText";
import ElementCKEditor from "./elements/ElementCKEditor";
import ElementButton from "./elements/ElementButton";
import ElementLayout from "./elements/ElementLayout";
import ElementInput from "./elements/ElementInput";
import ElementElementConfiguration from "./elements/ElementElementConfiguration";
import ElementAccordion from "./elements/ElementAccordion";
import ElementSideChange from "./elements/ElementSideChange";
import ElementDynamic from "./elements/ElementDynamic";
// import ElementHeader from "./elements/ElementHeader";
import ElementCarousel from "./elements/ElementCarousel";
import ElementSectionImageText from "./elements/ElementSectionImageText";
import ElementIcon from "./elements/ElementIcon";
import ElementTextAppearance from "./elements/ElementTextAppearance";
import ElementFeaturedProducts from "./elements/ElementFeaturedProducts";
import ElementSocialShare from "./elements/ElementSocialShare";
import ElementPadding from "./elements/ElementPadding";
import ElementLayoutStyle from "./elements/ElementLayoutStyle";
import ElementWidth from "./elements/ElementWidth";
import ElementPlainText from "./elements/ElementPlainText";
import ElementColumnDisplay from "./elements/ElementColumnDisplay";
import ElementBgIndividual from "./elements/ElementBgIndividual";
import ElementElementBG from "./elements/ElementElementBG";
import ElementFullSlider from "./elements/ElementFullSlider";
import ElementTabbing from "./elements/ElementTabbing";
import ElementScrollLogo from "./elements/ElementScrollLogo";

const LeftSideBar = (props) => {
  const dispatch = useDispatch();

  const { setfullWidthOfMainContent, fullWidthOfMainContent } = props;

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [RecordId, setRecordId] = useState(null);

  const propertyComponent = {
    background: ElementBackground,
    image: ElementImage,
    textsingle: ElementText,
    ckeditor: ElementCKEditor,
    button: ElementButton,
    layout: ElementLayout,
    input: ElementInput,
    elementconfiguration: ElementElementConfiguration,
    accordion: ElementAccordion,
    sidechange: ElementSideChange,
    dynamic: ElementDynamic,
    header: null,
    carousel: ElementCarousel,
    section3: ElementSectionImageText,
    icon: ElementIcon,
    appearance: ElementTextAppearance,
    featuredproducts: ElementFeaturedProducts,
    socialshare: ElementSocialShare,
    padding: ElementPadding,
    layoutstyle: ElementLayoutStyle,
    width: ElementWidth,
    plaintextbox: ElementPlainText,
    colcount: ElementColumnDisplay,
    individalbg: ElementBgIndividual,
    sectionbg: ElementElementBG,
    slickslider: ElementCarousel,
    brandtabbing: ElementTabbing,
    BrandsAtoZ: null,
    scroll: ElementScrollLogo,
    lightbox: null,
    dynamicform: null,
  };

  const changeDisplayView = useCallback(
    (type) => {
      if (type === "D" && fullWidthOfMainContent !== "w-full") {
        setfullWidthOfMainContent("w-full");
      } else if (type === "M" && fullWidthOfMainContent !== "w-450") {
        setfullWidthOfMainContent("w-450");
      }
    },
    [fullWidthOfMainContent],
  );

  const reOrder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const reorderedItem = reOrder(
      props.componentHtml,
      result.source.index,
      result.destination.index,
    );
    props.setComponentHtml(reorderedItem);
    // props.updatePropertyFirstTime();
    setTimeout(function () {
      props.updatePropertyFirstTime();
    }, 1000);
  };

  const handleDelete = (topic) => {
    dispatch(setAddLoading(true));

    const url = `/CmsComponents/delete/${RecordId}.json`;
    API.get(url)
      .then((response) => {
        if (response.data.success) {
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs?.template?.deletedSuccessFully,
            }),
          );
          setOpenDeleteModal(false);
          props.getComponents();
        } else {
          dispatch(
            setAlertMessage({
              type: "danger",
              message: serverError(response),
            }),
          );
        }
        dispatch(setAddLoading(false));
      })
      .catch((error) => {
        dispatch(setAddLoading(false));
        dispatch(
          setAlertMessage({
            type: "danger",
            message: serverError(error),
          }),
        );
      });
  };

  return (
    <div id="left-main">
      <div className="bg-white pt-2">
        <div className="pl-2 pb-1 flex justify-between">
          <div className="text-2xl flex justify-center items-center">{`Edit  ${props.getPageType}`}</div>
          <div>
            <div className="relative inline-flex mr-2">
              <button
                type="button"
                onClick={() => {
                  changeDisplayView("D");
                }}
                className="flex flex-wrap items-center text-sm px-2 py-1 border border-indigo-300 hover:border-indigo-400 text-indigo-500 rounded-l"
              >
                <span className="material-icons-outlined text-sm">
                  desktop_mac
                </span>
              </button>
              <button
                type="button"
                onClick={() => {
                  changeDisplayView("M");
                }}
                className="flex flex-wrap items-center text-sm px-2 py-1 border border-indigo-300 hover:border-indigo-400 text-indigo-500 rounded-r"
              >
                <span className="material-icons-outlined text-sm">
                  phone_iphone
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="theme-tab" className="w-full bg-slate-100">
        <ul className="w-full flex justify-between bg-slate-100 items-center overflow-hidden select-none">
          <li className="text-center flex-1 ">
            <p
              className={`w-full ${props.tabNumber === 1
                ? "tab py-4 px-6 block hover:text-blue-500 focus:outline-none text-blue-500 font-medium bg-slate-200"
                : "tab text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none font-medium hover:bg-slate-200 cursor-pointer"
                }`}
              onClick={() => {
                props.setTabNumber(1);
              }}
            >
              Add
            </p>
          </li>
          <li className="text-center flex-1">
            <p
              className={`w-full ${props.tabNumber === 2
                ? "tab py-4 px-6 block hover:text-blue-500 focus:outline-none text-blue-500 font-medium bg-slate-200"
                : "tab text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none font-medium hover:bg-slate-200 cursor-pointer"
                }`}
              onClick={() => {
                props.setTabNumber(2);
              }}
            >
              Contents
            </p>
          </li>
          <li className="text-center flex-1">
            <p
              className={`w-full ${props.tabNumber === 3
                ? "tab py-4 px-6 block hover:text-blue-500 focus:outline-none text-blue-500 font-medium bg-slate-200"
                : "tab text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none font-medium hover:bg-slate-200 cursor-pointer"
                }`}
              onClick={() => {
                props.setTabNumber(3);
              }}
            >
              Design
            </p>
          </li>
        </ul>

        {/* Add tab { props.tabNumber 1 } */}
        <div
          className={`panel-01 tab-content p-2 bg-slate-200 m-1 max-h-[85vh] overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-300 ${props.tabNumber !== 1 ? "hidden" : ""}`}
        >
          {props.componentList.length > 0 &&
            props.componentList.map((value, index) => (
              <Fragment key={index}>
                <div
                  className={`w-full bg-white z-20 p-2 rounded shadow-lg mb-2 ${index > 0 ? "mt-2" : ""}`}
                  onClick={() => {
                    props.updateAccordion(value.id);
                  }}
                >
                  <button
                    className="w-full font-semibold px-2 flex flex-wrap justify-between items-center"
                    type="button"
                  >
                    <span>
                      {value.name}
                      <span className="ml-1">({value.child.length})</span>
                    </span>
                    <span className="material-icons-outlined">expand_more</span>
                  </button>
                </div>
                <Droppable
                  droppableId={`${index}`}
                  index={index}
                  isDropDisabled={true}
                >
                  {(provided, snapshot) => {
                    const WishlistItemsFromBackend = value.child;
                    const catName = value.name;
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`flex flex-wrap items-center -mx-2 px-2 ${props.accordArr.includes(value.id) ? "" : "hidden"}`}
                      >
                        {WishlistItemsFromBackend.map((value, i) => (
                          <Fragment key={i}>
                            <Draggable
                              key={`cmp${value.id}`}
                              draggableId={`cmp${value.id}`}
                              index={value.id}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="w-1/2 mb-2 px-2"
                                  >
                                    <div className="bg-white text-center border border-solid border-neutral-200 cursor-grab">
                                      <div className="h-6 border-b border-b-slate-300">
                                        <span className="material-icons-outlined rotate-90">
                                          drag_indicator
                                        </span>
                                      </div>
                                      <div className="h-16">
                                        <img
                                          className="max-h-16 w-full"
                                          src={value.image}
                                          alt=""
                                        />
                                      </div>

                                      <div
                                        className={`p-2 text-xs border-t border-t-slate-300 ${value?.isDeleted && catName === "Saved Component" ? "justify-between flex" : ""}`}
                                      >
                                        {value.name}{" "}
                                        {value?.isDeleted &&
                                          catName === "Saved Component" && (
                                            <button type="button">
                                              {" "}
                                              <span
                                                onClick={() => {
                                                  setOpenDeleteModal(true);
                                                  setRecordId(value.id);
                                                }}
                                                className="material-icons text-[14px] items-center"
                                                style={{ color: "red" }}
                                              >
                                                delete
                                              </span>
                                            </button>
                                          )}
                                      </div>
                                    </div>

                                    {/* test */}
                                  </div>
                                );
                              }}
                            </Draggable>
                          </Fragment>
                        ))}
                      </div>
                    );
                  }}
                </Droppable>
              </Fragment>
            ))}
        </div>
        {/*End of Add tab { props.tabNumber 1 } */}

        {/* Content tab { props.tabNumber 2 } */}
        <div
          className={`panel-01 tab-content p-2 m-1 bg-slate-200 max-h-[85vh] overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-300 ${props.tabNumber !== 2 ? "hidden" : ""}`}
        >
          <div className="mb-3">
            <div className="font-semibold p-3">Website Headers</div>
          </div>

          <div className="mb-3">
            <div className="font-semibold p-3">Main Content</div>
            <div
              style={{ height: `calc(48px * ${props.componentHtml.length})` }}
            >
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="mainContent" index={0}>
                  {(provided, snapshot) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {props.componentHtml.map((comp, index) => (
                        <Draggable
                          key={index}
                          draggableId={`item-${comp?.id}`}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="last:mb-0 border-2 bg-indigo-100 border-neutral-200 cursor-default hover:border-indigo-400 hover:bg-indigo-200 rounded-md mx-1 mb-1"
                            >
                              <div className="flex items-center justify-between w-full h-full cursor-grab px-2 py-2">
                                <div
                                  className={`block text-gray-200 hover:text-white truncate transition duration-150`}
                                >
                                  <div className="flex items-center text-gray-500">
                                    <span className="material-icons-outlined mr-1">
                                      drag_indicator
                                    </span>
                                    <span className="material-icons-outlined">
                                      article
                                    </span>
                                    <span className="text-sm font-medium ml-3 text-gray-500">
                                      {comp?.name}
                                    </span>
                                  </div>
                                </div>
                                <div className="text-center flex justify-center">
                                  <button
                                    type="button"
                                    className="ml-1 inline-block leading-none"
                                  >
                                    <span
                                      className="material-icons-outlined"
                                      onClick={(e) => {
                                        props.changeVisibility(comp?.uid);
                                      }}
                                    >
                                      {comp?.visibility === "on"
                                        ? "visibility"
                                        : "visibility_off"}
                                    </span>
                                  </button>
                                  <button
                                    type="button"
                                    className="text-rose-500 ml-1 inline-block leading-none"
                                    onClick={() =>
                                      props.deleteComponent(comp?.uid)
                                    }
                                  >
                                    <span className="material-icons-outlined">
                                      delete
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </div>

          <div>
            <div className="font-semibold p-3">Website Footers</div>
          </div>
        </div>
        {/* End of Content tab { props.tabNumber 2 } */}

        {/* Design tab { props.tabNumber 3 } */}
        {/* Page Header Design Properties  */}
        <div
          className={`panel-01 tab-content p-2 bg-slate-200 theme-contentbox all-properties max-h-[85vh] h-screen overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-300 ${props.tabNumber !== 3 ? "hidden" : ""}`}
        >
          {props.comProperties &&
            props.properties &&
            Object.keys(props.properties).length > 0 && (
              <>
                {Object.entries(props.properties).map(([key, val], index) => {
                  const Component = propertyComponent[val.type];
                  return Component ? (
                    <div key={index} id={`LeftPanel${val.id ?? ""}`}>
                      <Component {...props} variable={key} compprop={val} />
                    </div>
                  ) : (
                    <Fragment key={index}></Fragment>
                  );
                })}
              </>
            )}
        </div>
        {/* End of Design tab { props.tabNumber 3 } */}

        <ConfirmDelete
          handleDelete={handleDelete}
          data={null}
          message="Deleting this Template will permanently remove this record from your account. This can't be undone"
          title={"Delete"}
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
        />
      </div>
    </div>
  );
};

export default LeftSideBar;
