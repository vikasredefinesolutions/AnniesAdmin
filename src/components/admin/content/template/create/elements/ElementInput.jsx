import { fontSizeClassOption } from "global/Enum";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import * as ThemeVariable from "components/admin/content/helper/ThemeVariables";

import ElementMarginPaddingValues from "./ElementMarginPaddingValues";
import TextStyleElement from "./TextStyleElement";

const ElementInput = (props) => {
    const [showHide, setShowHide] = useState(false);
    const [textEffect, setTextEffect] = useState("");
    const [headlineTag, setHeadlineTag] = useState("");
    const [headline, setHeadline] = useState("");

    let bgPropertyName = props.variable;
    const selectedObj = props.componentHtml.filter(
        (obj) => obj.uid == props.currentComponent,
    );

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

    const changeTextEffect = (event) => {
        props.updateProperty(
            { type: "aoseffect", value: event.target.value },
            bgPropertyName + "_aos_effect",
        );
        setTextEffect(event.target.value);
    };

    const updateHeadline = (event) => {
        if (
            bgPropertyName != "additionalclass" &&
            bgPropertyName != "componentname"
        ) {
            let x = ReactDOM.findDOMNode(
                props.refArray.current[props.currentComponent],
            );
            if (x) {
                if (x.querySelectorAll("#" + props.variable).length > 0) {
                    x.querySelectorAll("#" + props.variable)[0].innerHTML =
                        event.target.value;
                    if (event.target.value != "")
                        x.querySelectorAll("#" + props.variable)[0].classList.remove(
                            "hidden",
                        );
                    else
                        x.querySelectorAll("#" + props.variable)[0].classList.add("hidden");
                }
            }
        }
        props.updateProperty(
            { type: "text", value: event.target.value },
            bgPropertyName,
        );
        setHeadline(event.target.value);
    };

    const changeFontSize = (value) => {
        let x = ReactDOM.findDOMNode(
            props.refArray.current[props.currentComponent],
        );
        if (x) {
            fontSizeClassOption.map((element, index) => {
                if (x.querySelectorAll("#" + props.variable).length > 0)
                    x.querySelectorAll("#" + props.variable)[0].classList.remove(
                        element.class,
                    );
            });
            if (x.querySelectorAll("#" + props.variable).length > 0)
                props.helper.assignMultipleClass(
                    value,
                    x.querySelectorAll("#" + props.variable)[0],
                );

            props.updateProperty(
                { type: "fontsize", value: value },
                bgPropertyName + "_font_size",
            );
        }
    };

    const changeHeadlineTag = (event) => {
        setHeadlineTag(event.target.value);
        props.updateProperty(
            { type: "headertag", value: event.target.value },
            bgPropertyName + "_header_tag",
        );
    };

    /* Function to set component with updated attributes values */
    useEffect(() => {
        if (selectedObj.length > 0) {
            if (
                selectedObj[0].selected_Values != undefined &&
                Object.keys(selectedObj[0].selected_Values).length > 0
            ) {
                let tmp;
                let tmpTextTransform;
                let tmpFontSize;

                Object.entries(selectedObj[0].selected_Values).map(([key, value]) => {
                    if (key == bgPropertyName) {
                        tmp = value;
                    }
                    if (key == bgPropertyName + "_text_transform") {
                        tmpTextTransform = value;
                    }
                    if (key == bgPropertyName + "_font_size") {
                        tmpFontSize = value;
                    }
                    if (key == bgPropertyName + "_header_tag") {
                        setHeadlineTag(value.value);
                    }
                    if (key == bgPropertyName + "_aos_effect") {
                        setTextEffect(value.value);
                    }
                });

                if (tmp != undefined) {
                    let attributes = tmp;
                    setHeadline(attributes.value);
                } else {
                    setHeadline("");
                }

                if (tmpFontSize != undefined) {
                    let attributes = tmpFontSize;
                    changeFontSize(attributes.value);
                }
            } else {
                setHeadline("");
            }
        }
    }, [props.currentComponent]);

    return (
        <>
            <div className="relative border-b border-neutral-00">
                <button
                    onClick={() => {
                        showHideProperties();
                    }}
                    className="flex w-full flex-wrap justify-between items-center text-sm px-3 py-4 bg-white border-0 font-bold"
                >
                    <span>{props.compprop.title ?? "Headline"}</span>
                    <span className="material-icons-outlined">expand_more</span>
                </button>

                <div
                    className={`property-content bg-white border-y border-b-0 border-neutral-200 ${showHide ? "" : "hidden"}`}
                >
                    <div className="mx-2 text-sm">
                        <div className="py-2">
                            <div className="mb-3">
                                {/* {bgPropertyName != 'componentname' && <>
                                    <div className="flex justify-between items-center mb-1">
                                        <div>{bgPropertyName == "additionalclass" ? "Additional Class" : "Headline Text"}</div>
                                    </div>
                                </>} */}

                                <div className="text-center relative overflow-hidden">
                                    <input
                                        type="text"
                                        className="w-full grow text-sm bg-white text-gray-700 border border-neutral-300 p-3 py-2 leading-tight focus:ring-0 focus:shadow-none focus:outline-none"
                                        value={headline}
                                        onChange={updateHeadline}
                                    />
                                </div>
                            </div>

                            {props.compprop.padding ? (
                                <>
                                    {" "}
                                    <div className="mb-3">
                                        <div className="flex justify-between items-center mb-1">
                                            <div className="">Header Tag</div>
                                        </div>
                                        <div className="text-center relative overflow-hidden">
                                            <select
                                                onChange={changeHeadlineTag}
                                                value={headlineTag}
                                                className="w-full grow text-sm bg-gray-100 text-gray-700 border border-gray-200 p-3 py-2 leading-tight focus:ring-0 focus:shadow-none focus:outline-none focus:bg-white"
                                            >
                                                <option value="">None</option>
                                                <option value="H1">H1</option>
                                                <option value="H2">H2</option>
                                                <option value="H3">H3</option>
                                                <option value="H4">H4</option>
                                                <option value="H5">H5</option>
                                                <option value="H6">H6</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="flex justify-between items-center mb-1">
                                            <div className="">Loading Effect</div>
                                        </div>
                                        <div className="text-center relative overflow-hidden">
                                            <select
                                                onChange={changeTextEffect}
                                                value={textEffect}
                                                className="w-full grow text-sm bg-gray-100 text-gray-700 border border-gray-200 p-3 py-2 leading-tight focus:ring-0 focus:shadow-none focus:outline-none focus:bg-white"
                                            >
                                                <option value="">None</option>
                                                {ThemeVariable.aosEffect.map((value, index) => (
                                                    <option
                                                        key={index}
                                                        value={value.value}
                                                        className={value.value}
                                                    >
                                                        {value.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <></>
                            )}

                            {props.compprop.fontsize && (
                                <>
                                    <TextStyleElement {...props} variable={bgPropertyName} />
                                </>
                            )}
                            {props.compprop.padding && (
                                <>
                                    <ElementMarginPaddingValues
                                        {...props}
                                        variable={bgPropertyName}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ElementInput;
