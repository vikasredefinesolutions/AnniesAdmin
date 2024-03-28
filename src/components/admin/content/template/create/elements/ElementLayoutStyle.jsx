import React, { useState } from "react";
import { useEffect } from "react";
import { object } from "yup";
import ElementPaddingValues from "./ElementPaddingValues";
import ElementMarginValues from "./ElementMarginValues";
import ElementMarginPaddingValues from "./ElementMarginPaddingValues";

const ElementLayoutStyle = (props) => {
    const [showHide, setShowHide] = useState(false);
    const [layoutStyle, setLayoutStyle] = useState("container");
    const showHideProperties = () => {
        if (showHide == true) setShowHide(false);
        else {
            const allWithClass = Array.from(
                document.querySelectorAll("div.property-content"),
            );
            allWithClass.forEach((element) => {
                element.classList.add("hidden");
            });

            setShowHide(true);
        }
    };

    const selectedObj = props.componentHtml.filter(
        (obj) => obj.uid == props.currentComponent,
    );

    let attributes = {};

    const bgPropertyName = props.variable; //selectedObj.length > 0 ? Object.keys(selectedObj[0].properties).find(key => selectedObj[0].properties[key] === "background") : [];

    /* When click on any component background component will reload and
      we have called function to set default properties */

    useEffect(() => {
        if (selectedObj.length > 0) {
            if (
                selectedObj[0].selected_Values != undefined &&
                Object.keys(selectedObj[0].selected_Values).length > 0
            ) {
                let tmp;
                Object.entries(selectedObj[0].selected_Values).map(([key, value]) => {
                    if (key == bgPropertyName) tmp = value;
                });

                if (tmp != undefined) {
                    let attributes = tmp;
                    setLayoutStyle(attributes.value);
                }
            } else {
                setLayoutStyle("");
            }
        }
    }, [props.currentComponent]);

    const changeLayoutStyle = (event) => {
        setLayoutStyle(event.target.value);
        props.updateProperty(
            { type: "layoutstyle", value: event.target.value },
            bgPropertyName,
        );
    };

    return (
        <>
            <div className="relative border-b border-neutral-00">
                <button
                    onClick={() => {
                        showHideProperties();
                    }}
                    className="flex w-full flex-wrap justify-between items-center text-sm px-3 py-4 bg-white border-0 font-bold"
                >
                    <span>{props.compprop.title ?? "Layout Style"}</span>
                    <span className="material-icons-outlined">expand_more</span>
                </button>

                <div
                    className={`property-content bg-white border-y border-b-0 border-neutral-200 ${showHide ? "" : "hidden"}`}
                >
                    <div className="mx-2 text-sm">
                        <div className="py-2 px-3 w-full text-gray-700">
                            <div className="mb-3 last:mb-0">
                                <div className="flex flex-wrap divide-x divide-neutral-300 border border-neutral-300 overflow-hidden">
                                    <button
                                        value="w-full"
                                        onClick={changeLayoutStyle}
                                        className={`w-1/2 px-2 py-1.5 inline-flex justify-center items-center text-sm ${layoutStyle === "w-full" ? "bg-[#F1F5F9]" : "bg-white"}`}
                                        title="Image"
                                    >
                                        Full Layout
                                    </button>
                                    <button
                                        value="container"
                                        onClick={changeLayoutStyle}
                                        className={`w-1/2 px-2 py-1.5 inline-flex justify-center items-center text-sm ${layoutStyle === "container" ? "bg-[#F1F5F9]" : "bg-white"}`}
                                        title="Video"
                                    >
                                        Box Layout
                                    </button>
                                </div>
                            </div>
                            {/* <div className="mb-4 last:mb-0">
                                <div className="flex flex-wrap">
                                    <select onChange={changeLayoutStyle} value={layoutStyle} className="grow h-9 mr-2 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md">
                                        <option value="">Select</option>
                                        <option value="w-full">Full Layout</option>
                                        <option value="container">Box Layout</option>
                                    </select>
                                </div>
                            </div> */}
                            <ElementMarginPaddingValues
                                {...props}
                                variable={bgPropertyName}
                            />
                            {/* <ElementPaddingValues {...props} variable={bgPropertyName} />
                            <ElementMarginValues {...props} variable={bgPropertyName} /> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ElementLayoutStyle;
