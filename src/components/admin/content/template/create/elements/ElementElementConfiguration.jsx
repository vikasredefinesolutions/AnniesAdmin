import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ElementPaddingValues from "./ElementPaddingValues";
import ElementMarginValues from "./ElementMarginValues";
import { assignMultipleClass } from "components/admin/content/helper/Helper";
import ElementMarginPaddingValues from "./ElementMarginPaddingValues";
import ColorPicker from "components/admin/content/common/ColorPicker";

const ElementElementConfiguration = (props) => {
    const [showHide, setShowHide] = useState(false);
    const [bgColor, setBgColor] = useState("");
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
    const [imageDisplay, setImageDisplay] = useState("Yes");
    const [textDisplay, setTextDisplay] = useState("Yes");
    const [imagePosition, setImagePosition] = useState("Left");

    const selectedObj = props.componentHtml.filter(
        (obj) => obj.uid == props.currentComponent,
    );
    let attributes = {};

    const propertyName = props.variable;

    useEffect(() => {
        let x = ReactDOM.findDOMNode(
            props.refArray.current[props.currentComponent],
        );
        if (x) {
            x.querySelectorAll("#right-section")[0].style = "background: " + bgColor;
        }
    }, [bgColor]);

    const changeBackgroundColor = (color) => {
        props.updateProperty(
            { type: "bgcolor", value: color.hex },
            bgPropertyName + "_text_section_bg",
        );
        setBgColor(color.hex);
    };
    /* Function to set component with updated attributes values */

    useEffect(() => {
        if (selectedObj.length > 0) {
            if (
                selectedObj[0].selected_Values != undefined &&
                Object.keys(selectedObj[0].selected_Values).length > 0
            ) {
                let tmpPosition;
                let tmpImageDisplay;
                let tmpTextDisplay;
                Object.entries(selectedObj[0].selected_Values).map(([key, value]) => {
                    if (key == bgPropertyName + "_Image_position") {
                        tmpPosition = value;
                    }
                    if (key == bgPropertyName + "_Image_display") {
                        tmpImageDisplay = value;
                    }
                    if (key == bgPropertyName + "_Text_display") {
                        tmpTextDisplay = value;
                    }
                    if (key == bgPropertyName + "_text_section_bg") {
                        setBgColor(value.value);
                    }
                });
                if (tmpPosition != undefined) {
                    let attributes = tmpPosition;
                    setImagePosition(attributes.value);
                    changeImagePosition(attributes.value);
                } else {
                    setImagePosition("Left");
                    //                    changeImagePosition('Left');
                }

                if (tmpImageDisplay != undefined) {
                    let attributes = tmpImageDisplay;
                    setImageDisplay(attributes.value);
                } else {
                    setImageDisplay("Yes");
                    //                    changeImagePosition('Left');
                }

                if (tmpTextDisplay != undefined) {
                    let attributes = tmpTextDisplay;
                    setTextDisplay(attributes.value);
                } else {
                    setTextDisplay("Yes");
                    //                    changeImagePosition('Left');
                }
            }
        }
    }, [props.currentComponent]);

    const showHideImageTextSection = () => {
        if (imageDisplay === "No") {
            props.compprop.fields.Image.forEach((tmp1) => {
                document
                    .querySelectorAll("#LeftPanel" + tmp1)[0]
                    .classList.add("hidden");
            });
        } else {
            props.compprop &&
                props?.compprop?.fields &&
                props.compprop?.fields.Image.forEach((tmp1) => {
                    document
                        .querySelectorAll("#LeftPanel" + tmp1)[0]
                        .classList.remove("hidden");
                });
        }
        if (textDisplay === "No") {
            // if(props.compprop.fields.Image)
            // {
            //     document.querySelectorAll('#LeftPanel'+props.compprop.fields.Image).classList.remove("hidden");
            // }
            if (props.compprop.fields.Text) {
                props.compprop.fields.Text.forEach((tmp1) => {
                    document
                        .querySelectorAll("#LeftPanel" + tmp1)[0]
                        .classList.add("hidden");
                });
            }
        } else {
            props?.compprop?.fields &&
                props.compprop.fields.Text.forEach((tmp1) => {
                    document
                        .querySelectorAll("#LeftPanel" + tmp1)[0]
                        .classList.remove("hidden");
                });
        }
    };

    useEffect(() => {
        if (imageDisplay == "Yes") {
            if (document.querySelectorAll("#textDisplay").length > 0)
                document.querySelectorAll("#textDisplay")[0].classList.remove("hidden");

            if (document.querySelectorAll("#imagePosition").length > 0)
                document
                    .querySelectorAll("#imagePosition")[0]
                    .classList.remove("hidden");
        } else {
            if (document.querySelectorAll("#textDisplay").length > 0)
                document.querySelectorAll("#textDisplay")[0].classList.add("hidden");

            if (document.querySelectorAll("#imagePosition").length > 0)
                document.querySelectorAll("#imagePosition")[0].classList.add("hidden");
        }
    }, [imageDisplay]);

    const changeImageDisplay = (event) => {
        let val = event.target.value;
        let x = ReactDOM.findDOMNode(
            props.refArray.current[props.currentComponent],
        );
        if (val == "Yes") {
            if (document.querySelectorAll("#textDisplay").length > 0)
                document.querySelectorAll("#textDisplay")[0].classList.remove("hidden");
            if (document.querySelectorAll("#imagePosition").length > 0)
                document
                    .querySelectorAll("#imagePosition")[0]
                    .classList.remove("hidden");

            if (x) x.querySelectorAll("#left-section")[0].classList.remove("hidden");

            setAllWidthClass();
            removeOrderClass();
            if (x) {
                if (imagePosition == "Left" || imagePosition == "Top") {
                    x.querySelectorAll("#left-section")[0].classList.add("lg:order-1");
                    x.querySelectorAll("#right-section")[0].classList.add("lg:order-2");
                } else if (imagePosition == "Right" || imagePosition == "Bottom") {
                    x.querySelectorAll("#left-section")[0].classList.add("lg:order-2");
                    x.querySelectorAll("#right-section")[0].classList.add("lg:order-1");
                }

                if (imagePosition == "Top" || imagePosition == "Bottom") {
                    removeAllWidthClass();
                }
                if (imagePosition == "Left" || imagePosition == "Right") {
                    x.querySelectorAll("#right-section")[0].classList.add(
                        "lg:w-[" + (100 - findLayout()) + "%]",
                    );
                    x.querySelectorAll("#left-section")[0].classList.add(
                        "lg:w-[" + findLayout() + "%]",
                    );
                }
            }
        } else {
            removeAllWidthClass();
            if (document.querySelectorAll("#textDisplay").length > 0)
                document.querySelectorAll("#textDisplay")[0].classList.add("hidden");

            if (document.querySelectorAll("#imagePosition").length > 0)
                document.querySelectorAll("#imagePosition")[0].classList.add("hidden");
            if (x) {
                x.querySelectorAll("#left-section")[0].classList.add("hidden");
                //x.querySelectorAll('#left-section')[0].classList.add('lg:w-['+layout+'%]');
                x.querySelectorAll("#right-section")[0].classList.add("lg:w-[100%]");
            }
        }
        setImageDisplay(val);
        if (val === "No" && textDisplay === "No") {
            //setTimeout(function () { setTextDisplay('Yes'); }, 100);
            //setTimeout(function setTextDisplay('Yes');
            changeTextDisplay("Yes");
        }

        props.updateProperty(
            { type: "display", value: val },
            bgPropertyName + "_Image_display",
        );
    };

    useEffect(() => {
        showHideImageTextSection();
    }, [imageDisplay, textDisplay]);

    const findLayout = () => {
        let layout = "50";
        Object.entries(selectedObj[0].selected_Values).map(([key, value]) => {
            if (key == "Layout") {
                layout = value.value;
            }
        });
        if (!layout) layout = 50;
        return layout;
    };

    const removeAllWidthClass = () => {
        // let x = ReactDOM.findDOMNode(props.refArray.current[props.currentComponent]);
        // if (x && x.querySelectorAll('#right-section').length > 0) {
        //     x.querySelectorAll('#right-section')[0].style = "";
        //     x.querySelectorAll('#left-section')[0].classList.remove("lg:w-1/2");
        //     x.querySelectorAll('#right-section')[0].classList.remove("lg:w-2/3");
        //     x.querySelectorAll('#right-section')[0].classList.remove("lg:w-3/4");
        //     x.querySelectorAll('#right-section')[0].classList.remove("lg:w-[100%]");
        //     x.querySelectorAll('#right-section')[0].classList.remove("lg:w-[" + (100 - findLayout()) + "%]");
        // }
        // if (x && x.querySelectorAll('#left-section').length > 0) {
        //     //x.querySelectorAll('#left-section')[0].style = "";
        //     // x.querySelectorAll('#left-section')[0].remove("lg:w-1/2");
        //     x.querySelectorAll('#left-section')[0].classList.remove("lg:w-1/2");
        //     x.querySelectorAll('#left-section')[0].classList.remove("lg:w-1/3");
        //     x.querySelectorAll('#left-section')[0].classList.remove("lg:w-1/4");
        //     x.querySelectorAll('#left-section')[0].classList.remove("lg:w-[100%]");
        //     x.querySelectorAll('#left-section')[0].classList.remove("lg:w-[" + findLayout() + "%]");
        // }
    };

    const removeOrderClass = () => {
        let x = ReactDOM.findDOMNode(
            props.refArray.current[props.currentComponent],
        );
        if (x) {
            x.querySelectorAll("#left-section")[0].classList.remove("lg:order-1");
            x.querySelectorAll("#right-section")[0].classList.remove("lg:order-2");

            x.querySelectorAll("#left-section")[0].classList.remove("lg:order-2");
            x.querySelectorAll("#right-section")[0].classList.remove("lg:order-1");
        }
    };

    const setAllWidthClass = () => {
        let x = ReactDOM.findDOMNode(
            props.refArray.current[props.currentComponent],
        );
        let layout = findLayout();
        removeAllWidthClass();
        // if(imageDisplay === 'Yes')
        // {
        //     x.querySelectorAll('#left-section')[0].classList.add('lg:w-['+layout+'%]');

        // }
        // x.querySelectorAll('#right-section')[0].classList.add('lg:w-['+(100-layout)+'%]');
    };

    const setTextClass = () => {
        let addClassName = "flex flex-wrap ";
        if (imageDisplay === "No") addClassName += " w-full ";
        let addClassName1 = "";
        let addClass = false;
        if (imagePosition == "Left" || imagePosition == "Top") {
            addClassName += "lg:order-2";
        } else if (imagePosition == "Right" || imagePosition == "Bottom") {
            addClassName += "lg:order-1";
        }
        if (selectedObj.length > 0) {
            if (
                selectedObj[0].selected_Values != undefined &&
                Object.keys(selectedObj[0].selected_Values).length > 0
            ) {
                Object.entries(selectedObj[0].selected_Values).map(([key, value]) => {
                    if (key === bgPropertyName + "_left_padding") {
                        addClass = true;
                        addClassName += " " + value.value;
                    }
                    if (key === bgPropertyName + "_top_padding") {
                        addClass = true;
                        addClassName += " " + value.value;
                    }
                    if (key === bgPropertyName + "_right_padding") {
                        addClass = true;
                        addClassName += " " + value.value;
                    }
                    if (key === bgPropertyName + "_bottom_padding") {
                        addClass = true;
                        addClassName += " " + value.value;
                    }
                    if (key === bgPropertyName + "_left_margin") {
                        addClass = true;
                        addClassName += " " + value.value;
                    }
                    if (key === bgPropertyName + "_top_margin") {
                        addClass = true;
                        addClassName += " " + value.value;
                    }
                    if (key === bgPropertyName + "_right_margin") {
                        addClass = true;
                        addClassName += " " + value.value;
                    }
                    if (key === bgPropertyName + "_bottom_margin") {
                        addClass = true;
                        addClassName += " " + value.value;
                    }
                    if (key === "Layout") {
                        addClassName1 += " lg:w-[" + value.value + "%]";
                        addClassName += " lg:w-[" + (100 - value.value) + "%]";
                    }
                });
            }
        }
        if (addClassName !== "") {
            let x = ReactDOM.findDOMNode(
                props.refArray.current[props.currentComponent],
            );
            if (x) {
                if (addClass)
                    x.querySelectorAll("#right-section")[0].className = addClassName;
                else {
                    assignMultipleClass(
                        addClassName,
                        x.querySelectorAll("#right-section")[0],
                    );
                }
                props.updateProperty(
                    { type: "finalclass", value: addClassName },
                    bgPropertyName + "_final_class",
                );
                if (addClassName1 !== "" && imageDisplay === "Yes") {
                    //x.querySelectorAll('#left-section')[0].className = addClassName1;
                }
            }
        }
    };
    const changeTextDisplay = (val) => {
        let x = ReactDOM.findDOMNode(
            props.refArray.current[props.currentComponent],
        );
        if (x && val == "Yes") {
            x.querySelectorAll("#right-section")[0].classList.remove("hidden");

            if (document.querySelectorAll("#imageDisplay").length > 0)
                document
                    .querySelectorAll("#imageDisplay")[0]
                    .classList.remove("hidden");

            if (document.querySelectorAll("#imagePosition").length > 0)
                document
                    .querySelectorAll("#imagePosition")[0]
                    .classList.remove("hidden");

            //x.querySelectorAll('#textDisplay')[0].classList.remove("hidden");

            removeAllWidthClass();
            setAllWidthClass();

            removeOrderClass();

            if (imagePosition == "Left" || imagePosition == "Top") {
                x.querySelectorAll("#left-section")[0].classList.add("lg:order-1");
                x.querySelectorAll("#right-section")[0].classList.add("lg:order-2");
            } else if (imagePosition == "Right" || imagePosition == "Bottom") {
                x.querySelectorAll("#left-section")[0].classList.add("lg:order-2");
                x.querySelectorAll("#right-section")[0].classList.add("lg:order-1");
            }

            if (imagePosition == "Top" || imagePosition == "Bottom") {
                removeAllWidthClass();
                x.querySelectorAll("#left-section")[0].classList.add("lg:w-[100%]");
                x.querySelectorAll("#right-section")[0].classList.add("lg:w-[100%]");
            } else {
                x.querySelectorAll("#left-section")[0].classList.add(
                    "lg:w-[" + findLayout() + "%]",
                );
                x.querySelectorAll("#right-section")[0].classList.add(
                    "lg:w-[" + (100 - findLayout()) + "%]",
                );
            }
        } else {
            if (document.querySelectorAll("#imageDisplay").length > 0)
                document.querySelectorAll("#imageDisplay")[0].classList.add("hidden");

            if (document.querySelectorAll("#imagePosition").length > 0)
                document.querySelectorAll("#imagePosition")[0].classList.add("hidden");

            if (x) {
                x.querySelectorAll("#right-section")[0].classList.add("hidden");
                x.querySelectorAll("#left-section")[0].classList.add("lg:w-[100%]");
            }
            //            x.querySelectorAll('#right-section')[0].classList.add('lg:w-['+(100-layout)+'%]');
            // x.querySelectorAll('#right-section')[0].style = "width: 0%";
            // x.querySelectorAll('#left-section')[0].style = "width: 100%";
        }
        setTextDisplay(val);
        if (val === "No" && imageDisplay === "No") {
            changeImageDisplay("Yes");
            //setImageDisplay('Yes');
        }
        props.updateProperty(
            { type: "display", value: val },
            bgPropertyName + "_Text_display",
        );
    };

    const changeImagePosition = (val) => {
        let x = ReactDOM.findDOMNode(
            props.refArray.current[props.currentComponent],
        );

        removeOrderClass();

        if (x && val == "Left") {
            x.querySelectorAll("#left-section")[0].classList.add("lg:order-1");
            x.querySelectorAll("#right-section")[0].classList.add("lg:order-2");
            x.querySelectorAll("#right-section")[0].classList.add(
                "lg:w-[" + (100 - findLayout()) + "%]",
            );
            x.querySelectorAll("#left-section")[0].classList.add(
                "lg:w-[" + findLayout() + "%]",
            );
            setAllWidthClass();
        } else if (x && val == "Top") {
            removeAllWidthClass();

            x.querySelectorAll("#left-section")[0].classList.add("lg:order-1");
            x.querySelectorAll("#right-section")[0].classList.add("lg:order-2");
            x.querySelectorAll("#right-section")[0].classList.remove(
                "lg:w-[" + (100 - findLayout()) + "%]",
            );
            x.querySelectorAll("#left-section")[0].classList.remove(
                "lg:w-[" + findLayout() + "%]",
            );
            x.querySelectorAll("#right-section")[0].classList.add("lg:w-[100%]");
            x.querySelectorAll("#left-section")[0].classList.add("lg:w-[100%]");
        } else if (x && val == "Bottom") {
            removeAllWidthClass();

            x.querySelectorAll("#left-section")[0].classList.add("lg:order-2");
            x.querySelectorAll("#right-section")[0].classList.add("lg:order-1");
            x.querySelectorAll("#right-section")[0].classList.remove(
                "lg:w-[" + (100 - findLayout()) + "%]",
            );
            x.querySelectorAll("#left-section")[0].classList.remove(
                "lg:w-[" + findLayout() + "%]",
            );
            x.querySelectorAll("#right-section")[0].classList.add("lg:w-[100%]");
            x.querySelectorAll("#left-section")[0].classList.add("lg:w-[100%]");
        } else if (x) {
            x.querySelectorAll("#right-section")[0].classList.add("lg:order-1");
            x.querySelectorAll("#left-section")[0].classList.add("lg:order-2");
            removeAllWidthClass();
            x.querySelectorAll("#right-section")[0].classList.add(
                "lg:w-[" + (100 - findLayout()) + "%]",
            );
            x.querySelectorAll("#left-section")[0].classList.add(
                "lg:w-[" + findLayout() + "%]",
            );

            setAllWidthClass();
        }

        setImagePosition(val);
        props.updateProperty(
            { type: "position", value: val },
            bgPropertyName + "_Image_position",
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
                    <span>{props.compprop.title ?? "Element Configuration"}</span>
                    <span className="material-icons-outlined">expand_more</span>
                </button>

                <div
                    className={`property-content bg-white border-y border-b-0 border-neutral-200 ${showHide ? "" : "hidden"}`}
                >
                    <div className="mx-2 text-sm">
                        <div className="py-2">
                            <div className="mb-3 last:mb-0">
                                <div className="flex justify-between items-center mb-1">
                                    <div>Image Display</div>
                                </div>
                                <div className="flex flex-wrap divide-x divide-neutral-300 border border-neutral-300 overflow-hidden">
                                    <button
                                        value="Yes"
                                        onClick={changeImageDisplay}
                                        className={`w-1/2 px-2 py-1.5 inline-flex justify-center items-center text-sm ${imageDisplay === "Yes" ? "bg-[#F1F5F9]" : "bg-white"}`}
                                        title="Yes"
                                    >
                                        Yes
                                    </button>
                                    <button
                                        value="No"
                                        onClick={changeImageDisplay}
                                        className={`w-1/2 px-2 py-1.5 inline-flex justify-center items-center text-sm ${imageDisplay === "No" ? "bg-[#F1F5F9]" : "bg-white"}`}
                                        title="No"
                                    >
                                        No
                                    </button>
                                </div>
                            </div>

                            {imageDisplay == "Yes" && (
                                <>
                                    <div className="mb-3 last:mb-0" id="imagePosition">
                                        <div className="mb-3">
                                            <div className="flex justify-between items-center mb-1">
                                                <div>Image Position</div>
                                            </div>
                                            <div className="flex flex-wrap divide-x divide-neutral-300 border border-neutral-300 overflow-hidden">
                                                {props.ThemeVariable.imagePosition.map(
                                                    (value, index) => (
                                                        <button
                                                            key={index}
                                                            value={value.value}
                                                            onClick={(event) => {
                                                                changeImagePosition(event.target.value);
                                                            }}
                                                            className={`w-1/${props.ThemeVariable.imagePosition.length} px-2 py-1.5 inline-flex justify-center items-center text-sm ${value.value === imagePosition ? "bg-[#F1F5F9]" : "bg-white"}`}
                                                            title={value.value}
                                                            dangerouslySetInnerHTML={{ __html: value.icon }}
                                                        />
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            <div className="mb-3 last:mb-0">
                                <div className="flex justify-between items-center mb-1">
                                    <div>Text Display</div>
                                </div>
                                <div className="flex flex-wrap divide-x divide-neutral-300 border border-neutral-300 overflow-hidden">
                                    <button
                                        value="Yes"
                                        onClick={(event) => {
                                            changeTextDisplay(event.target.value);
                                        }}
                                        className={`w-1/2 px-2 py-1.5 inline-flex justify-center items-center text-sm ${textDisplay === "Yes" ? "bg-[#F1F5F9]" : "bg-white"}`}
                                        title="Yes"
                                    >
                                        Yes
                                    </button>
                                    <button
                                        value="No"
                                        onClick={(event) => {
                                            changeTextDisplay(event.target.value);
                                        }}
                                        className={`w-1/2 px-2 py-1.5 inline-flex justify-center items-center text-sm ${textDisplay === "No" ? "bg-[#F1F5F9]" : "bg-white"}`}
                                        title="No"
                                    >
                                        No
                                    </button>
                                </div>
                            </div>

                            <div className={`pt-2`}>
                                <div className="flex justify-between items-center mb-1">
                                    <div>Text Section Background</div>
                                </div>
                                <ColorPicker
                                    changeBackgroundColor={changeBackgroundColor}
                                    value={bgColor}
                                />
                            </div>

                            <ElementMarginPaddingValues
                                {...props}
                                variable={bgPropertyName}
                                setTextClass={setTextClass}
                            />

                            {/* <ElementPaddingValues {...props} setTextClass={setTextClass} title="Text Section Padding (T R B L)" />
                            <ElementMarginValues {...props} setTextClass={setTextClass} title="Text Section Margin (T R B L)" /> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ElementElementConfiguration;
