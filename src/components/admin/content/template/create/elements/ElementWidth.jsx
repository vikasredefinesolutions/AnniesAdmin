import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import { el } from "date-fns/locale";

const ElementWidth = (props) => {
    const [showHide, setShowHide] = useState(false);
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

    let bgPropertyName = props.variable;
    const [sectionWidth, setSectionWidth] = useState("");

    const selectedObj = props.componentHtml.filter(
        (obj) => obj.uid == props.currentComponent,
    );
    let attributes = {};

    const propertyName = props.variable;

    /* Function to set component with updated attributes values */

    useEffect(() => {
        if (selectedObj.length > 0) {
            if (
                selectedObj[0].selected_Values != undefined &&
                Object.keys(selectedObj[0].selected_Values).length > 0
            ) {
                let tmp;
                let tmpAlt;
                let tmpLink;
                Object.entries(selectedObj[0].selected_Values).map(([key, value]) => {
                    if (key == bgPropertyName) {
                        tmp = value;
                    }
                });

                if (tmp != undefined) {
                    let attributes = tmp;
                    setSectionWidth(attributes.value);
                } else {
                    setSectionWidth("");
                }
            } else {
                setSectionWidth("");
                //updateProperty({[bgPropertyName]: imageURL});
            }
        }
    }, [props.currentComponent]);

    useEffect(() => {
        let x = ReactDOM.findDOMNode(
            props.refArray.current[props.currentComponent],
        );
        if (x && sectionWidth !== "") {
            props.ThemeVariable.imageSizes.forEach((element) => {
                if (element.value)
                    x.querySelectorAll("#BrandSectionWidth")[0].classList.remove(
                        element.value,
                    );
            });
            if (sectionWidth)
                x.querySelectorAll("#BrandSectionWidth")[0].classList.add(sectionWidth);
        }
    }, [sectionWidth]);

    const changeSectionWidth = (event) => {
        setSectionWidth(event.target.value);
        props.updateProperty(
            { type: "width", value: event.target.value },
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
                    <span>{props.compprop.title ?? "Layout Opitons"}</span>
                    <span className="material-icons-outlined">expand_more</span>
                </button>

                <div
                    className={`property-content bg-white border-y border-b-0 border-neutral-200 ${showHide ? "" : "hidden"}`}
                >
                    <div className="mx-2 text-sm">
                        <div className="py-2">
                            <div className="mb-3">
                                <div className="flex justify-between items-center mb-1">
                                    <div>Max Width</div>
                                </div>
                                <div className="flex flex-wrap">
                                    <div className="w-full flex flex-wrap divide-x divide-neutral-300 border border-neutral-300 overflow-hidden">
                                        <select
                                            onChange={changeSectionWidth}
                                            value={sectionWidth}
                                            className="w-full grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                        >
                                            <option value="">Select</option>
                                            {props.ThemeVariable.imageSizes.map((value, index) => (
                                                <option key={index} value={value.value}>
                                                    {value.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ElementWidth;
