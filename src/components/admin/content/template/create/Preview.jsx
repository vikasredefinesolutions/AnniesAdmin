import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";

import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";

import TemplateService from "services/admin/template/TemplateService";
import TopicsDetailsServices from "services/admin/topics/TopicsDetailsServices";

import * as helper from "components/admin/content/helper/Helper";
import ElementCarouselDisplay from "./elements/ElementCarouselDisplay";
import ElementAccordionDisplay from "./elements/ElementAccordionDisplay";
import ElementTailwindAccordionDisplay from "./elements/ElementTailwindAccordionDisplay";
import TemplateHeader from "./TemplateHeader";
import TemplateFooter from "./TemplateFooter";

const Preview = () => {
  const dispatch = useDispatch();
  const AdminAppConfigReducers = useSelector(
    (store) => store?.AdminAppConfigReducers,
  );

  const { id } = useParams();
  const refArray = useRef([]);

  const [compArr, setCompArr] = useState([]);
  const [componentList] = useState([]);
  const [componentHtml, setComponentHtml] = useState([]);
  const [componentHtmlNew, setComponentHtmlNew] = useState([]);

  const [storeId, setStoreId] = useState(1);

  const getPageType = () => {
    if (window.location.href.includes("Page/")) return "Page";
    else return "Template";
  };

  const getTopicDetails = () => {
    TopicsDetailsServices.getTopicDetails(id, {})
      .then((res) => {
        let data = res.data.data;
        setStoreId(data.store_id);
      })
      .catch((error) => { });
  };

  useEffect(() => {
    if (getPageType === "Page") {
      TopicsDetailsServices.getPublishTopicComponent(id, "preview")
        .then((res) => {
          if (res.data !== null) setComponentHtml(res.data.data);

          getTopicDetails();
        })
        .catch((error) => { });
    } else if (getPageType === "Template") {
      TemplateService.getTemplateComponents(1)
        .then((res) => {
          let data = res.data.data;
          setStoreId(data.storeId);
        })
        .catch((error) => { });
    }
  }, []);

  const filterArr = () => {
    componentList.forEach((elchild) => {
      // setCompArr(...compArr, {[elchild.id]: elchild.html});
      if (elchild.visibility !== "off") {
        setCompArr((compArr) => [
          ...compArr,
          {
            no: elchild.no,
            uid: elchild.uuid,
            id: elchild.id,
            html: elchild.html,
            name: elchild.name,
            properties: elchild.properties,
            selected_Values: JSON.parse(elchild.selectedVal) ?? {},
            visibility: elchild.visibility,
            extraHTML: elchild.extraHTML ?? {},
          },
        ]);
      }
    });
  };

  useEffect(() => {
    filterArr();
  }, [componentList]);

  useEffect(() => {
    dispatch(setAddLoading(false));
  }, [compArr]);

  /* Default component background pending settings load */
  const loadBackgroundDefault = (element) => {
    if (element.selected_Values !== undefined) {
      if (Object.keys(element.selected_Values).length > 0) {
        const bgPropertyName = "bg";

        let attributes;
        Object.entries(element.selected_Values).forEach(([key, value]) => {
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
  };

  const loadBackgroundType = (element) => {
    if (element.selected_Values !== undefined) {
      if (Object.keys(element.selected_Values).length > 0) {
        const bgPropertyName = "bg";
        // Object.keys(JSON.parse(element.properties)).find(
        //   (key) => JSON.parse(element.properties)[key] === 'background',
        // );

        let attributes;
        Object.entries(element.selected_Values).forEach(([key, value]) => {
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
  };

  const loadBackgroundDefaultStyle = (element) => {
    if (element.selected_Values !== undefined) {
      if (Object.keys(element.selected_Values).length > 0) {
        const bgPropertyName = "bg";

        let attributes;
        Object.entries(element.selected_Values).forEach(([key, value]) => {
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
  };

  const loadBackgroundImageClass = (element) => {
    if (element.selected_Values !== undefined) {
      if (Object.keys(element.selected_Values).length > 0) {
        const bgPropertyName = "bg";

        let attributes;
        Object.entries(element.selected_Values).forEach(([key, value]) => {
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

          if ("bg_bg_image_style" in element.selected_Values) {
            imageClass += " " + element.selected_Values.bg_bg_image_style.value;
          }
          if ("bg_bg_image_position" in element.selected_Values) {
            imageClass +=
              " " + element.selected_Values.bg_bg_image_position.value;
          }
          return imageClass;
        }
      }

      return "";
    }
    return "";
  };

  useEffect(() => {
    componentHtml.forEach((elchild, index) => {
      setComponentHtmlNew((componentHtmlNew) => [
        ...componentHtmlNew,
        {
          no: elchild.no,
          uid: elchild.uuid,
          id: elchild.id,
          html: elchild.html,
          name: elchild.name,
          properties: elchild.properties,
          selected_Values: JSON.parse(elchild.selectedVal) ?? {},
          visibility: elchild.visibility,
          extraHTML: elchild.extraHTML ?? {},
        },
      ]);
    });
  }, [componentHtml]);

  useEffect(() => {
    componentHtmlNew.forEach((element) => {
      helper.updateSetProperties(
        element,
        AdminAppConfigReducers["azure:BlobUrl"],
      );
    });
  }, [componentHtmlNew]);

  return (
    <>
      <link
        rel="stylesheet"
        type="text/css"
        href={`${AdminAppConfigReducers["azure:BlobUrl"]}/${AdminAppConfigReducers["cdn:RootDirectory"]}/${1}/store/${storeId}/css/${storeId}.css`}
      />
      <link
        rel="stylesheet"
        type="text/css"
        href={`https://ystore.us/HTML/RedefineCommerce/Ecom-front/corporategear/tailwin-css.css`}
      />

      <div className="font-inter antialiased bg-slate-100 text-gray-500">
        <TemplateHeader />
        <main>
          {componentHtmlNew.length > 0 ? (
            componentHtmlNew.forEach((componentValue, index) => {
              const backgroundDefault = loadBackgroundDefault(componentValue);
              const backgroundStyle =
                loadBackgroundDefaultStyle(componentValue);
              const backgroundImageClass =
                loadBackgroundImageClass(componentValue);

              let additionalclass = "";
              let innerDivClass = "";
              if (
                componentValue.selected_Values &&
                "additionalclass" in componentValue.selected_Values
              ) {
                additionalclass =
                  componentValue.selected_Values.additionalclass.value;
              }
              if (
                componentValue.selected_Values &&
                "container" in componentValue.selected_Values
              ) {
                if (componentValue.selected_Values.container.value === "w-full")
                  additionalclass += " container-fluid";
                else
                  additionalclass +=
                    " " +
                    componentValue.selected_Values.container.value +
                    " mx-auto ";
              } else {
                additionalclass += " container mx-auto ";
              }
              if (
                componentValue.selected_Values &&
                "container_left_padding" in componentValue.selected_Values
              ) {
                innerDivClass +=
                  " " +
                  componentValue.selected_Values.container_left_padding.value;
              }
              if (
                componentValue.selected_Values &&
                "container_top_padding" in componentValue.selected_Values
              ) {
                innerDivClass +=
                  " " +
                  componentValue.selected_Values.container_top_padding.value;
              }
              if (
                componentValue.selected_Values &&
                "container_right_padding" in componentValue.selected_Values
              ) {
                innerDivClass +=
                  " " +
                  componentValue.selected_Values.container_right_padding.value;
              }
              if (
                componentValue.selected_Values &&
                "container_bottom_padding" in componentValue.selected_Values
              ) {
                innerDivClass +=
                  " " +
                  componentValue.selected_Values.container_bottom_padding.value;
              }
              if (
                componentValue.selected_Values &&
                "container_left_margin" in componentValue.selected_Values
              ) {
                innerDivClass +=
                  " " +
                  componentValue.selected_Values.container_left_margin.value;
              }
              if (
                componentValue.selected_Values &&
                "container_top_margin" in componentValue.selected_Values
              ) {
                innerDivClass +=
                  " " +
                  componentValue.selected_Values.container_top_margin.value;
              }
              if (
                componentValue.selected_Values &&
                "container_right_margin" in componentValue.selected_Values
              ) {
                innerDivClass +=
                  " " +
                  componentValue.selected_Values.container_right_margin.value;
              }
              if (
                componentValue.selected_Values &&
                "container_bottom_margin" in componentValue.selected_Values
              ) {
                innerDivClass +=
                  " " +
                  componentValue.selected_Values.container_bottom_margin.value;
              }

              return (
                <div
                  key={index}
                  className={`w-full mx-auto ${componentValue.visibility === "off" ? "hidden" : ""
                    } ${backgroundStyle === "outer" ? backgroundImageClass : ""}`}
                  style={
                    loadBackgroundType(componentValue) === "image"
                      ? {
                        backgroundImage:
                          backgroundStyle === "outer"
                            ? backgroundImageClass
                            : "none",
                      }
                      : {
                        background:
                          backgroundStyle === "outer"
                            ? backgroundImageClass
                            : "none",
                      }
                  }
                  id={`div${componentValue.no}`}
                  ref={(ref) => {
                    refArray.current[componentValue.uuid] = ref; // took this from your guide's example.
                  }}
                >
                  <section className={`${additionalclass}`}>
                    <div
                      className={`${innerDivClass} ${backgroundStyle === "inner" ? backgroundImageClass : ""}`}
                      style={
                        loadBackgroundType(componentValue) === "image"
                          ? {
                            backgroundImage:
                              backgroundStyle === "inner"
                                ? backgroundDefault
                                : "none",
                          }
                          : {
                            background:
                              backgroundStyle === "inner"
                                ? backgroundDefault
                                : "none",
                          }
                      }
                    >
                      {Object.keys(componentValue.selected_Values).includes(
                        "carousel",
                      ) ? (
                        <>
                          <ElementCarouselDisplay
                            bannerArr={
                              componentValue.selected_Values.carousel.value
                            }
                          />
                        </>
                      ) : (
                        <>
                          {Object.keys(componentValue.selected_Values).includes(
                            "FullAccordion",
                          ) ? (
                            <>
                              <ul className="mt-4 w-full">
                                <ElementAccordionDisplay
                                  selected_Values={
                                    componentValue.selected_Values
                                  }
                                  acValues={
                                    componentValue.selected_Values.FullAccordion
                                      .value
                                  }
                                />
                              </ul>
                            </>
                          ) : "Accordion" in componentValue.selected_Values ? (
                            <>
                              <ElementTailwindAccordionDisplay
                                html={componentValue.html}
                                values={
                                  componentValue.selected_Values.Accordion.value
                                }
                                id={uuid()}
                              />
                            </>
                          ) : (
                            <>
                              <div className="text-center w-full">
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: componentValue.html,
                                  }}
                                ></div>
                              </div>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </section>
                </div>
              );
            })
          ) : (
            <>
              <div className="text-center p-5 border my-2">
                <section className="mainsection taillwind_content_block_22"></section>
              </div>
            </>
          )}
        </main>
        <TemplateFooter />
      </div>
    </>
  );
};
export default Preview;
