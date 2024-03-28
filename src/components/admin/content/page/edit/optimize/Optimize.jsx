import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import PageEditTabHeader from '../PageEditTabHeader'
import PageEditMainHeader from '../PageEditMainHeader'
import TopicsDetailsServices from 'services/admin/topics/TopicsDetailsServices'
import LeftBar from './LeftBar';

import * as helper from "components/admin/content/helper/Helper";
import ElementCarouselDisplay from "components/admin/content/template/create/elements/ElementCarouselDisplay";
import ElementAccordionDisplay from "components/admin/content/template/create/elements/ElementAccordionDisplay";

const Optimize = () => {
  const location = useLocation();

  const permission = useSelector(store => store.permission);
  const refArray = React.useRef([]);
  const [seoScore, setSeoScore] = useState(0);
  const { id } = useParams();
  const [componentHtml, setComponentHtml] = useState([]);
  const [componentHtmlNew, setComponentHtmlNew] = useState([]);

  const [originalText, setOriginalText] = useState("");
  const [loadComplete, setLoadComplete] = useState(false);

  const [storeId, setStoreId] = useState(1);
  const [relatedStr, setRelatedStr] = useState("");
  const [tag, setTag] = useState('h1')

  useEffect(() => {
    if (document.readyState === "complete") {
      let x = document.getElementById("right1");
      if (originalText === "") {
        setOriginalText(x);
        setLoadComplete(true);
      }
    }
  }, []);

  const getTopicDetails = () => {
    TopicsDetailsServices.getTopicDetails(id, {})
      .then((res) => {
        let data = res.data.data;
        setStoreId(data.store_id);
      }).catch((error) => {
      });
  };


  useEffect(() => {
    TopicsDetailsServices.getPublishTopicComponent(id, 'preview')
      .then((res) => {
        if (res.data !== null)
          setComponentHtml(res.data.data);

        getTopicDetails();
      }).catch((error) => {
      });

  }, [location.pathname])

  const loadBackgroundDefault = (element) => {

    if (element.selected_Values !== undefined) {
      if (Object.keys(element.selected_Values).length > 0) {
        const bgPropertyName = 'bg';

        let attributes;
        Object.entries(element.selected_Values).forEach(
          ([key, value]) => {

            if (key === bgPropertyName) {
              attributes = value;
            }
          }
        );


        if (attributes !== undefined && Object.keys(attributes).length > 0) {
          if (attributes.type === 'color') {
            return attributes.value;
          } else if (attributes.type === 'image') {
            return 'url("' + attributes.value + '")';
          } else if (attributes.type === 'none') {
            return 'none';
          }
        }
      }

      return 'none';
    }
    return 'none';
  }

  const loadBackgroundDefaultStyle = (element) => {

    if (element.selected_Values !== undefined) {
      if (Object.keys(element.selected_Values).length > 0) {
        const bgPropertyName = 'bg';

        let attributes;
        Object.entries(element.selected_Values).forEach(
          ([key, value]) => {

            if (key === bgPropertyName + "_bg_style") {
              attributes = value;
            }
          }
        );


        if (attributes !== undefined && Object.keys(attributes).length > 0) {
          if (attributes.value === "fullbg") {
            return "outer";
          }
          else {
            return "inner";
          }
        }
      }

      return 'outer';
    }
    return 'outer';
  }

  const loadBackgroundImageClass = (element) => {

    if (element.selected_Values !== undefined) {
      if (Object.keys(element.selected_Values).length > 0) {
        const bgPropertyName = 'bg';

        let attributes;
        Object.entries(element.selected_Values).forEach(
          ([key, value]) => {

            if (key === bgPropertyName) {
              attributes = value;
            }
          }
        );

        let bgType = "";

        if (attributes !== undefined && Object.keys(attributes).length > 0) {
          if (attributes.type === 'image') {
            bgType = "image";
          }
        }
        if (bgType === "image") {
          let imageClass = "";

          if ("bg_bg_image_style" in element.selected_Values) {
            imageClass += " " + element.selected_Values.bg_bg_image_style.value;
          }
          if ("bg_bg_image_position" in element.selected_Values) {
            imageClass += " " + element.selected_Values.bg_bg_image_position.value;
          }
          return imageClass;
        }
      }

      return '';
    }
    return '';
  }


  useEffect(() => {
    if (componentHtml && componentHtml.length) {
      componentHtml.forEach((elchild, index) => {
        setComponentHtmlNew(componentHtmlNew => [...componentHtmlNew, { no: elchild.no, uid: elchild.uuid, id: elchild.id, html: elchild.html, name: elchild.name, properties: elchild.properties, selected_Values: JSON.parse(elchild.selectedVal) ?? {}, visibility: elchild.visibility, extraHTML: elchild.extraHTML ?? {} }]);
        helper.updateSetProperties(elchild, index);
      })
    }
  }, [componentHtml]);

  const handleHighlightClicked = (event) => {

    if (event.target.className === 'highlighted' && relatedStr) {
      event.target.outerHTML = `<${tag} style='display : inline' className='highlighted'>${event.target.innerHTML}</${tag}>`
    }
  }

  const handleTag = (event) => {
    setTag(event.target.value)
  }

  const handleRelatedStr = (event) => {
    setRelatedStr(event.target.value)
  }

  const allFunctions = {
    seoScore: seoScore,
    setSeoScore: setSeoScore,
    // searchKeywords: searchKeywords,
    // setSearchKeywords: setSearchKeywords,
    originalText: originalText,
    loadComplete: loadComplete,
    tag: tag,
    handleRelatedStr: handleRelatedStr,
    relatedStr: relatedStr,
    handleTag: handleTag
  };

  return (
    <>
      <link
        rel="stylesheet"
        type="text/css"
        href={`${process.env.REACT_APP_API_BLOB}/${process.env.REACT_APP_BLOB_CONTAINER}/${1}/store/${storeId}/css/${storeId}.css`}
      />
      <link
        rel="stylesheet"
        type="text/css"
        href={`https://ystore.us/HTML/RedefineCommerce/Ecom-front/corporategear/tailwin-css.css`}
      />

      <div className="bg-gray-100">
        <PageEditMainHeader permission={permission} />
        <PageEditTabHeader permission={permission} activeTab={3} />
        <div className="panel-01 tab-content bg-white mt-5">
          <div className="flex flex-wrap mb-6 relative">
            <div id="left1" className='absolute transition-all h-screen bg-slate-100 overflow-x-hidden shadow-lg' style={{ width: "350px" }}>
              <LeftBar {...allFunctions} />
            </div>
            <div onClick={(event) => handleHighlightClicked(event)}>
              <div id="right1" className="transition-all relative ml-380">
                <div className="p-6">
                  <div className='border border-dashed border-neutral-200'>
                    <div className='p-4'>
                      {componentHtmlNew && componentHtmlNew.length > 0 ?
                        componentHtmlNew.map((componentValue, index) => {

                          const backgroundDefault = loadBackgroundDefault(componentValue);
                          const backgroundStyle = loadBackgroundDefaultStyle(componentValue);
                          const backgroundImageClass = loadBackgroundImageClass(componentValue);
                          let additionalclass = "";
                          if (componentValue.selected_Values && "additionalclass" in componentValue.selected_Values) {
                            additionalclass = componentValue.selected_Values.additionalclass.value;
                          }
                          if (componentValue.selected_Values && "container" in componentValue.selected_Values) {
                            additionalclass += " " + componentValue.selected_Values.container.value;
                          }
                          else {
                            additionalclass += " container mx-auto ";
                          }
                          if (componentValue.selected_Values && "container_left_padding" in componentValue.selected_Values) {
                            additionalclass += " " + 'pl-[' + componentValue.selected_Values.container_left_padding.value + 'px]';
                          }
                          if (componentValue.selected_Values && "container_top_padding" in componentValue.selected_Values) {
                            additionalclass += " " + 'pt-[' + componentValue.selected_Values.container_top_padding.value + 'px]';
                          }
                          if (componentValue.selected_Values && "container_right_padding" in componentValue.selected_Values) {
                            additionalclass += " " + 'pr-[' + componentValue.selected_Values.container_right_padding.value + 'px]';
                          }
                          if (componentValue.selected_Values && "container_bottom_padding" in componentValue.selected_Values) {
                            additionalclass += " " + 'pb-[' + componentValue.selected_Values.container_bottom_padding.value + 'px]';
                          }
                          if (componentValue.selected_Values && "container_left_margin" in componentValue.selected_Values) {
                            additionalclass += " " + 'ml-[' + componentValue.selected_Values.container_left_margin.value + 'px]';
                          }
                          if (componentValue.selected_Values && "container_top_margin" in componentValue.selected_Values) {
                            additionalclass += " " + 'mt-[' + componentValue.selected_Values.container_top_margin.value + 'px]';
                          }
                          if (componentValue.selected_Values && "container_right_margin" in componentValue.selected_Values) {
                            additionalclass += " " + 'mr-[' + componentValue.selected_Values.container_right_margin.value + 'px]';
                          }
                          if (componentValue.selected_Values && "container_bottom_margin" in componentValue.selected_Values) {
                            additionalclass += " " + 'mb-[' + componentValue.selected_Values.container_bottom_margin.value + 'px]';
                          }
                          return (
                            <div key={index} className={`w-full mx-auto ${componentValue.visibility === "off" ? "hidden" : ""} ${backgroundStyle === 'outer' ? backgroundImageClass : ''}`} style={{ background: backgroundStyle === "outer" ? backgroundDefault : "none" }} id={`div${componentValue.no}`}
                              ref={ref => {
                                refArray.current[componentValue.uuid] = ref; // took this from your guide's example.
                              }} >
                              <section className={`mx-auto ${additionalclass} ${backgroundStyle === 'inner' ? backgroundImageClass : ''}`} style={{ background: backgroundStyle === "inner" ? backgroundDefault : "none" }} >
                                {Object.keys(componentValue.selected_Values).includes("carousel") ? <>
                                  <ElementCarouselDisplay bannerArr={componentValue.selected_Values.carousel.value} />
                                </> :
                                  <>

                                    {Object.keys(componentValue.selected_Values).includes("FullAccordion") ? <>
                                      <ul className="mt-4 w-full">
                                        <ElementAccordionDisplay selected_Values={componentValue.selected_Values} acValues={componentValue.selected_Values.FullAccordion.value} />
                                      </ul>
                                    </> :
                                      <>
                                        <div className="text-center w-full">
                                          <div dangerouslySetInnerHTML={{ __html: componentValue.html }}></div>
                                        </div>
                                      </>
                                    }
                                  </>
                                }
                              </section>
                            </div>

                          )
                        }) : <>
                          <div className="text-center p-5 border my-2"><section className="mainsection taillwind_content_block_22">
                          </section></div></>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Optimize