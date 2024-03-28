/*Component Name: ElementImage
Component Functional Details: Element for Component Background  
Created By: Vikas Patel
Created Date: 07/07/2022
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import * as ThemeVariable from "components/admin/content/helper/ThemeVariables";
import { Fragment, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { hideAlertMessage } from "redux/alertMessage/AlertMessageActions";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import ElementMarginPaddingValues from "./ElementMarginPaddingValues";
import TextStyleElement from "./TextStyleElement";

const ElementButton = (props) => {
    const dispatch = useDispatch();

    let bgPropertyName = props.variable;
    const [textEffect, setTextEffect] = useState("");
    const [showHide, setShowHide] = useState(false);
    const [btnText, setBtnText] = useState("");
    const [btnTextTransform, setBtnTextTransform] = useState("");
    const [btnStyle, setBtnStyle] = useState("inline-block custbtn-primary");
    const [btnLink, setBtnLink] = useState("");
    const [btnAlignment, setBtnAlignment] = useState("text-left");
    const [btnLinkWindow, setBtnLinkWindow] = useState(false);
    const [btnLinkFollow, setBtnLinkFollow] = useState("");
    const [btnDisplay, setBtnDisplay] = useState("Yes");
    const [btnFontFamily, setBtnFontFamily] = useState("");
    const [btnFontSize, setBtnFontSize] = useState("");
    const [btnFontStyle, setBtnFontStyle] = useState("");
    const [btnFontWeight, setBtnFontWeight] = useState("");
    const [btnFontLineHeight, setBtnFontLineHeight] = useState("");
    const [leftPadding, setLeftPadding] = useState(
        "pl-[17px] sm:pl-[19px] lg:pl-[20px]",
    );
    const [topPadding, setTopPadding] = useState(
        "pt-[10px] sm:pt-[10px] lg:pt-[10px]",
    );
    const [rightPadding, setRightPadding] = useState(
        "pr-[17px] sm:pr-[19px] lg:pr-[20px]",
    );
    const [bottomPadding, setBottomPadding] = useState(
        "pb-[10px] sm:pb-[10px] lg:pb-[10px]",
    );
    const [leftMargin, setLeftMargin] = useState("");
    const [topMargin, setTopMargin] = useState("");
    const [rightMargin, setRightMargin] = useState("");
    const [bottomMargin, setBottomMargin] = useState("");
    const [letterSpacing, setLetterSpacing] = useState("");
    const [btnWidth, setBtnWidth] = useState("");
    const [btnAlt, setBtnAlt] = useState("");
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

    const buttonTextChange = (event) => {
        let x = ReactDOM.findDOMNode(
            props.refArray.current[props.currentComponent],
        );
        if (x) {
            x.querySelectorAll("#" + props.variable)[0].innerHTML =
                event.target.value;
        }
        setBtnText(event.target.value);
        props.updateProperty(
            { type: "text", value: event.target.value },
            bgPropertyName,
        );

        if (!event.target.value) {
            props.updateProperty({ type: "text", value: "Button" }, bgPropertyName);
            dispatch(
                setAlertMessage({
                    type: "warning",
                    message:
                        "Add some button name else you will see a default name as 'Button'",
                }),
            );
        } else {
            dispatch(hideAlertMessage());
        }
    };

    const changeButtonAlignment = (event) => {
        setBtnAlignment(event.target.value);
        props.updateProperty(
            { type: "btn_alignment", value: event.target.value },
            bgPropertyName + "_alignment",
        );
    };

    const changeBtnWidth = (event) => {
        setBtnWidth(event.target.value);
        props.updateProperty(
            { type: "btn_width", value: event.target.value },
            bgPropertyName + "_btn_width",
        );
    };

    const changeLinkTarget = (event) => {
        if (event.target.checked) {
            setBtnLinkWindow("_blank");
            props.updateProperty(
                { type: "btn_link_target", value: "_blank" },
                bgPropertyName + "_window",
            );
        } else {
            setBtnLinkWindow("_self");
            props.updateProperty(
                { type: "btn_link_target", value: "_self" },
                bgPropertyName + "_window",
            );
        }
    };

    const changeBtnLink = (event) => {
        setBtnLink(event.target.value);
        props.updateProperty(
            { type: "btn_link", value: event.target.value },
            bgPropertyName + "_link",
        );
    };

    const changeLinkFollow = (event) => {
        if (event.target.checked) {
            props.updateProperty(
                { type: "btn_link_rel", value: event.target.value },
                bgPropertyName + "_follow",
            );
            setBtnLinkFollow("nofollow");
        } else {
            props.updateProperty(
                { type: "btn_link_rel", value: "" },
                bgPropertyName + "_follow",
            );
            setBtnLinkFollow("");
        }
    };

    const changeBtnStyle = (event) => {
        setBtnStyle(event.target.value);
        props.updateProperty(
            { type: "btn_style", value: event.target.value },
            bgPropertyName + "_style",
        );
    };

    const changeBtnDisplay = (event) => {
        let x = ReactDOM.findDOMNode(
            props.refArray.current[props.currentComponent],
        );
        if (event.target.value == "Yes") {
            if (x.querySelectorAll("#" + props.variable + "Parent").length > 0) {
                x.querySelectorAll("#" + props.variable + "Parent")[0].classList.remove(
                    "hidden",
                );
            }
            if (x.querySelectorAll("#" + props.variable).length > 0) {
                x.querySelectorAll("#" + props.variable)[0].classList.remove("hidden");
            }
            const allWithClass = Array.from(
                document.querySelectorAll("div." + props.variable),
            );
            allWithClass.forEach((element) => {
                element.classList.remove("hidden");
            });
        } else {
            if (x.querySelectorAll("#" + props.variable + "Parent").length > 0) {
                x.querySelectorAll("#" + props.variable + "Parent")[0].classList.add("hidden");
            }
            if (x.querySelectorAll("#" + props.variable).length > 0) {
                x.querySelectorAll("#" + props.variable)[0].classList.remove("hidden");
            }
            const allWithClass = Array.from(
                document.querySelectorAll("div." + props.variable),
            );
            allWithClass.forEach((element) => {
                element.classList.add("hidden");
            });
        }
        setBtnDisplay(event.target.value);
        props.updateProperty(
            { type: "btn_display", value: event.target.value },
            bgPropertyName + "_display",
        );
    };

    /* Padding - Marging Event Handler */
    const changeLeftPadding = (event) => {
        setLeftPadding(event.target.value);
        props.updateProperty(
            { type: "btn_left_padding", value: event.target.value },
            bgPropertyName + "_left_padding",
        );
    };

    const changeTopPadding = (event) => {
        setTopPadding(event.target.value);
        props.updateProperty(
            { type: "btn_top_padding", value: event.target.value },
            bgPropertyName + "_top_padding",
        );
    };

    const changeRightPadding = (event) => {
        setRightPadding(event.target.value);
        props.updateProperty(
            { type: "btn_right_padding", value: event.target.value },
            bgPropertyName + "_right_padding",
        );
    };

    const changeBottomPadding = (event) => {
        setBottomPadding(event.target.value);
        props.updateProperty(
            { type: "btn_bottom_padding", value: event.target.value },
            bgPropertyName + "_bottom_padding",
        );
    };

    const changeLeftMargin = (event) => {
        setLeftMargin(event.target.value);
        props.updateProperty(
            { type: "btn_left_margin", value: event.target.value },
            bgPropertyName + "_left_margin",
        );
    };

    const changeTopMargin = (event) => {
        setTopMargin(event.target.value);
        props.updateProperty(
            { type: "btn_top_margin", value: event.target.value },
            bgPropertyName + "_top_margin",
        );
    };

    const changeRightMargin = (event) => {
        setRightMargin(event.target.value);
        props.updateProperty(
            { type: "btn_right_margin", value: event.target.value },
            bgPropertyName + "_right_margin",
        );
    };

    const changeBottomMargin = (event) => {
        setBottomMargin(event.target.value);
        props.updateProperty(
            { type: "btn_bottom_margin", value: event.target.value },
            bgPropertyName + "_bottom_margin",
        );
    };

    const changeBtnView = () => {
        console.log("here third", btnTextTransform);
        console.log("TXT", btnTextTransform);
        let btnClass = "";
        let x = ReactDOM.findDOMNode(
            props.refArray.current[props.currentComponent],
        );
        if (x && x.querySelectorAll("#" + props.variable).length > 0) {
            // Follow
            if (btnLinkFollow) {
                x.querySelectorAll("#" + props.variable)[0].rel = "nofollow";
            } else {
                x.querySelectorAll("#" + props.variable)[0].rel = "";
            }
            // Link
            if (btnDisplay != "Yes") {
                btnClass += "hidden";
            }
            // target
            if (btnLinkWindow === "_blank") {
                x.querySelectorAll("#" + props.variable)[0].target = "_blank";
            } else {
                x.querySelectorAll("#" + props.variable)[0].target = "_self";
            }

            btnClass += " " + btnStyle;
            if (btnWidth !== "") btnClass += " " + btnWidth;
            if (leftPadding !== "") btnClass += " " + leftPadding;
            if (topPadding !== "") btnClass += " " + topPadding;
            if (rightPadding !== "") btnClass += " " + rightPadding;
            if (bottomPadding !== "") btnClass += " " + bottomPadding;
            if (leftMargin !== "") btnClass += " " + leftMargin;
            if (topMargin !== "") btnClass += " " + topMargin;
            if (rightMargin !== "") btnClass += " " + rightMargin;
            if (btnTextTransform !== "") btnClass += " " + btnTextTransform;
            if (bottomMargin !== "") btnClass += " " + bottomMargin;
            if (btnFontSize !== "") btnClass += " " + btnFontSize;
            if (btnFontStyle !== "") btnClass += " " + btnFontStyle;
            if (btnFontFamily !== "") btnClass += " " + btnFontFamily;
            if (btnFontLineHeight !== "") btnClass += " " + btnFontLineHeight;
            if (btnAlignment !== "") btnClass += " text-center";// + btnAlignment;
            if (letterSpacing !== "") btnClass += " tracking-[" + letterSpacing + "]";
            if (btnFontWeight !== "") btnClass += " " + btnFontWeight;
            console.log("final class", btnClass);
            props.updateProperty(
                { type: "finalclass", value: btnClass },
                bgPropertyName + "_final_class",
            );
            //console.log(btnClass, " - ", btnTextTransform, " - ", props.variable);
            x.querySelectorAll("#" + props.variable)[0].className = btnClass;
        }
    };

    const buttonAltChange = (event) => {
        let x = ReactDOM.findDOMNode(
            props.refArray.current[props.currentComponent],
        );
        if (x)
            x.querySelectorAll("#" + props.variable)[0].title = event.target.value;
        setBtnAlt(event.target.value);
        props.updateProperty(
            { type: "btn_alt", value: event.target.value },
            bgPropertyName + "_alt",
        );
    };

    const changeBtnFontFamily = (event) => {
        setBtnFontFamily(event.target.value);
        props.updateProperty(
            { type: "btn_font_family", value: event.target.value },
            bgPropertyName + "_font_family",
        );
    };

    const changeBtnFontSize = (event) => {
        setBtnFontSize(event.target.value);
        props.updateProperty(
            { type: "btn_font_size", value: event.target.value },
            bgPropertyName + "_font_size",
        );
    };

    const changeBtnFontLineHeight = (event) => {
        setBtnFontLineHeight(event.target.value);
        props.updateProperty(
            { type: "btn_line_height", value: event.target.value },
            bgPropertyName + "_line_height",
        );
    };

    const changeBtnFontWeight = (event) => {
        setBtnFontWeight(event.target.value);
        props.updateProperty(
            { type: "btn_font_weight", value: event.target.value },
            bgPropertyName + "_font_weight",
        );
    };

    const changeLetterSpacing = (event) => {
        setLetterSpacing(event.target.value);
        props.updateProperty(
            { type: "btn_letter_spacing", value: event.target.value },
            bgPropertyName + "_letter_spacing",
        );
    };


    const changeParentView = () => {
        let btnClass = "";
        let x = ReactDOM.findDOMNode(
            props.refArray.current[props.currentComponent],
        );
        btnClass += btnAlignment;
        if (x && x.querySelectorAll("#" + props.variable + "Parent").length > 0) {
            x.querySelectorAll("#" + props.variable + "Parent")[0].className =
                btnClass;
        }
    };

    const changeBtnTextTransform = (event) => {
        setBtnTextTransform(event.target.value);
        props.updateProperty(
            { type: "btn_text_transform", value: event.target.value },
            bgPropertyName + "_text_transform",
        );



    }
    const changeBtnFontStyle = (event) => {
        setBtnFontStyle(event.target.value);
        props.updateProperty(
            { type: "btn_font_style", value: event.target.value },
            bgPropertyName + "_font_style",
        );



    }

    useEffect(() => {
        changeBtnView();
    }, [
        btnFontFamily,
        btnFontStyle,
        btnAlignment,
        btnFontSize,
        btnFontLineHeight,
        btnFontWeight,
        btnLinkWindow,
        btnLinkFollow,
        btnLink,
        btnStyle,
        btnTextTransform,
        leftMargin,
        topMargin,
        rightMargin,
        bottomMargin,
        leftPadding,
        topPadding,
        rightPadding,
        bottomPadding,
        btnWidth
    ]);

    /* Function to set component with updated attributes values */
    useEffect(() => {
        if (selectedObj.length > 0) {
            if (
                selectedObj[0] &&
                selectedObj[0].selected_Values != undefined &&
                Object.keys(selectedObj[0].selected_Values).length > 0
            ) {
                let tmp;
                let tmpTextTransform;
                let tmpStyle;
                let tmpAlignment;
                let tmpLink;
                let tmpLinkWindow;
                let tmpLinkFollow;
                let tmpDisplay;
                let tmpLeftPadding;
                let tmpTopPadding;
                let tmpRightPadding;
                let tmpBottomPadding;
                let tmpLeftMargin;
                let tmpTopMargin;
                let tmpRightMargin;
                let tmpBottomMargin;
                let tmpFontFamily;
                let tmpFontSize;
                let tmpFontWeight;
                let tmpFontLineHeight;
                let tmpLetterSpacing;
                let tmpFontStyle;

                Object.entries(selectedObj[0].selected_Values).map(([key, value]) => {
                    if (key == bgPropertyName) {
                        tmp = value;
                    }
                    if (key == bgPropertyName + "_text_transform") {
                        tmpTextTransform = value;
                    }
                    if (key == bgPropertyName + "_font_style") {
                        tmpFontStyle = value;
                    }
                    if (key == bgPropertyName + "_alt") {
                        setBtnAlt(value.value);
                    }
                    if (key == bgPropertyName + "_style") {
                        tmpStyle = value;
                    }
                    if (key == bgPropertyName + "_alignment") {
                        tmpAlignment = value;
                    }
                    if (key == bgPropertyName + "_link") {
                        tmpLink = value;
                    }
                    if (key == bgPropertyName + "_window") {
                        tmpLinkWindow = value;
                    }
                    if (key == bgPropertyName + "_follow") {
                        tmpLinkFollow = value;
                    }
                    if (key == bgPropertyName + "_display") {
                        tmpDisplay = value;
                    }
                    if (key == bgPropertyName + "_left_margin") {
                        tmpLeftMargin = value;
                    }
                    if (key == bgPropertyName + "_top_margin") {
                        tmpTopMargin = value;
                    }
                    if (key == bgPropertyName + "_right_margin") {
                        tmpRightMargin = value;
                    }
                    if (key == bgPropertyName + "_bottom_margin") {
                        tmpBottomMargin = value;
                    }
                    if (key == bgPropertyName + "_left_padding") {
                        tmpLeftPadding = value;
                    }
                    if (key == bgPropertyName + "_top_padding") {
                        tmpTopPadding = value;
                    }
                    if (key == bgPropertyName + "_right_padding") {
                        tmpRightPadding = value;
                    }
                    if (key == bgPropertyName + "_bottom_padding") {
                        tmpBottomPadding = value;
                    }
                    if (key == bgPropertyName + "_font_family") {
                        tmpFontFamily = value;
                    }
                    if (key == bgPropertyName + "_font_size") {
                        tmpFontSize = value;
                    }
                    if (key == bgPropertyName + "_line_height") {
                        tmpFontLineHeight = value;
                    }
                    if (key == bgPropertyName + "_font_weight") {
                        tmpFontWeight = value;
                    }
                    if (key == bgPropertyName + "_letter_spacing") {
                        tmpLetterSpacing = value;
                    }
                    if (key == bgPropertyName + "_btn_width") {
                        setBtnWidth(value.value);
                    }
                    if (key == bgPropertyName + "_aos_effect") {
                        setTextEffect(value.value);
                    }
                });
                if (tmp != undefined) {
                    let attributes = tmp;
                    setBtnText(attributes.value);
                } else {
                    setBtnText("");
                }
                if (tmpStyle != undefined) {
                    let attributes = tmpStyle;
                    setBtnStyle(attributes.value);
                } else {
                    setBtnStyle("inline-block custbtn-primary");
                }
                if (tmpFontStyle != undefined) {
                    let attributes = tmpFontStyle;
                    setBtnFontStyle(attributes.value);
                }

                if (tmpTextTransform != undefined) {
                    let attributes = tmpTextTransform;
                    setBtnTextTransform(attributes.value);
                } else {
                    setBtnTextTransform("");
                }

                if (tmpAlignment != undefined) {
                    let attributes = tmpAlignment;
                    setBtnAlignment(attributes.value);
                } else {
                    setBtnAlignment("");
                }

                if (tmpLinkWindow != undefined) {
                    let attributes = tmpLinkWindow;
                    setBtnLinkWindow(attributes.value);
                } else {
                    setBtnLinkWindow("");
                }

                if (tmpLink != undefined) {
                    let attributes = tmpLink;
                    setBtnLink(attributes.value);
                } else {
                    setBtnLink("");
                }

                if (tmpLinkFollow != undefined) {
                    let attributes = tmpLinkFollow;
                    setBtnLinkFollow(attributes.value);
                } else {
                    setBtnLinkFollow("");
                }

                if (tmpDisplay != undefined) {

                    let attributes = tmpDisplay;
                    setBtnDisplay(attributes.value);
                } else {
                    setBtnDisplay("Yes");
                }

                if (tmpLeftPadding != undefined) {
                    let attributes = tmpLeftPadding;
                    setLeftPadding(attributes.value);
                } else {
                    setLeftPadding("pl-[17px] sm:pl-[19px] lg:pl-[20px]");
                }

                if (tmpTopPadding != undefined) {
                    let attributes = tmpTopPadding;
                    setTopPadding(attributes.value);
                } else {
                    setTopPadding("pt-[10px] sm:pt-[10px] lg:pt-[10px]");
                }

                if (tmpRightPadding != undefined) {
                    let attributes = tmpRightPadding;
                    setRightPadding(attributes.value);
                } else {
                    setRightPadding("pr-[17px] sm:pr-[19px] lg:pr-[20px]");
                }

                if (tmpBottomPadding != undefined) {
                    let attributes = tmpBottomPadding;
                    setBottomPadding(attributes.value);
                } else {
                    setBottomPadding("pb-[10px] sm:pb-[10px] lg:pb-[10px]");
                }

                if (tmpLeftMargin != undefined) {
                    let attributes = tmpLeftMargin;
                    setLeftMargin(attributes.value);
                } else {
                    setLeftMargin("");
                }

                if (tmpTopMargin != undefined) {
                    let attributes = tmpTopMargin;
                    setTopMargin(attributes.value);
                } else {
                    setTopMargin("");
                }

                if (tmpRightMargin != undefined) {
                    let attributes = tmpRightMargin;
                    setRightMargin(attributes.value);
                } else {
                    setRightMargin("");
                }

                if (tmpBottomMargin != undefined) {
                    let attributes = tmpBottomMargin;
                    setBottomMargin(attributes.value);
                } else {
                    setBottomMargin("");
                }

                if (tmpFontFamily != undefined) {
                    let attributes = tmpFontFamily;
                    setBtnFontFamily(attributes.value);
                } else {
                    setBtnFontFamily("");
                }

                if (tmpFontSize != undefined) {
                    let attributes = tmpFontSize;
                    setBtnFontSize(attributes.value);
                } else {
                    setBtnFontSize("");
                }

                if (tmpFontLineHeight != undefined) {
                    let attributes = tmpFontLineHeight;
                    setBtnFontLineHeight(attributes.value);
                } else {
                    setBtnFontLineHeight("");
                }

                if (tmpFontWeight != undefined) {
                    let attributes = tmpFontWeight;
                    setBtnFontWeight(attributes.value);
                } else {
                    setBtnFontWeight("");
                }

                if (tmpLetterSpacing) {
                    let attributes = tmpLetterSpacing;
                    setLetterSpacing(attributes.value);
                } else {
                    setLetterSpacing("");
                }
            } else {
                setBtnText("");
                setBtnAlignment("");
                setBtnLink("");
                setBtnLinkWindow("");
                setBtnLinkFollow("");
                setBtnDisplay("Yes");
            }
        }
    }, [props.currentComponent]);

    useEffect(() => {
        changeParentView();
    }, [btnAlignment]);

    return (
        <>
            <div className="relative border-b border-neutral-00">
                <button
                    onClick={() => {
                        showHideProperties();
                    }}
                    className="flex w-full flex-wrap justify-between items-center text-sm px-3 py-4 bg-white border-0 font-bold"
                >
                    <span>{props.compprop.title ?? "Button"}</span>
                    <span className="material-icons-outlined">expand_more</span>
                </button>
                <div
                    className={`property-content bg-white border-y border-b-0 border-neutral-200 ${showHide ? "" : "hidden"}`}
                >
                    <div className="w-full py-2 px-3">
                        <div className="mb-3 last:mb-0">
                            <div className="flex justify-between items-center mb-1">
                                <div>Button Display</div>
                            </div>
                            <div className="flex flex-wrap divide-x divide-neutral-300 border border-neutral-300 overflow-hidden">
                                <button
                                    value="Yes"
                                    onClick={changeBtnDisplay}
                                    className={`w-1/2 px-2 py-1.5 inline-flex justify-center items-center text-sm ${btnDisplay === "Yes" ? "bg-[#F1F5F9]" : "bg-white"}`}
                                    title="Yes"
                                >
                                    Yes
                                </button>
                                <button
                                    value="No"
                                    onClick={changeBtnDisplay}
                                    className={`w-1/2 px-2 py-1.5 inline-flex justify-center items-center text-sm ${btnDisplay === "No" ? "bg-[#F1F5F9]" : "bg-white"}`}
                                    title="No"
                                >
                                    No
                                </button>
                            </div>
                        </div>
                        <div
                            className={`${props.variable} btn-extra-info ${btnDisplay == "Yes" ? "" : "hidden"}`}
                        >
                            <div className="mb-3 last:mb-0">
                                <div className="flex justify-between items-center mb-1">
                                    <div>Button Text</div>
                                </div>
                                <div className="text-center relative overflow-hidden">
                                    <input
                                        onChange={buttonTextChange}
                                        value={btnText}
                                        type="text"
                                        className="w-full grow text-sm bg-white text-gray-700 border border-neutral-300 p-3 py-2 leading-tight focus:ring-0 focus:shadow-none focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div className="mb-3 last:mb-0">
                                <div className="flex justify-between items-center mb-1">
                                    <div>Button Alt</div>
                                </div>
                                <div className="text-center relative overflow-hidden">
                                    <input
                                        onChange={buttonAltChange}
                                        value={btnAlt}
                                        type="text"
                                        className="w-full grow text-sm bg-white text-gray-700 border border-neutral-300 p-3 py-2 leading-tight focus:ring-0 focus:shadow-none focus:outline-none"
                                    />
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
                            <div className="mb-3 last:mb-0">
                                <div className="flex justify-between items-center mb-1">
                                    <div>Button Width</div>
                                </div>
                                <div className="flex flex-wrap items-center">
                                    <select
                                        value={btnWidth}
                                        onChange={changeBtnWidth}
                                        className="grow h-9 w-full px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                    >
                                        <option value="">Auto</option>
                                        {ThemeVariable.buttonWidthClass.map((value, index) => (
                                            <option value={value.value} hey={value.label} key={index}>
                                                {value.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3 last:mb-0">
                                <div className="flex justify-between items-center mb-1">
                                    <div>Button Style</div>
                                </div>
                                <div className="flex flex-wrap items-center">
                                    <div className="w-2/3">
                                        <select
                                            value={btnStyle}
                                            onChange={changeBtnStyle}
                                            className="grow h-9 w-full px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                        >
                                            <option value="">Select Button Style</option>
                                            {ThemeVariable.buttonClasses.map((value, index) => (
                                                <option value={value.value} key={index}>
                                                    {value.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="w-1/3 px-1.5">
                                        <button className={`w-full ${btnStyle} pt-[6px] pb-[6px]`}>
                                            Sample
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3 last:mb-0">
                                <div className="flex justify-between items-center mb-1">
                                    <div>Button Alignment</div>
                                </div>
                                <div className="flex flex-wrap divide-x divide-neutral-300 border border-neutral-300 overflow-hidden">
                                    {props.ThemeVariable.FontAlignment.map((value, index) =>
                                        value.label !== "None" ? (
                                            <button
                                                key={index}
                                                value={value.value}
                                                onClick={changeButtonAlignment}
                                                className={`w-1/3 px-2 py-1.5 inline-flex justify-center items-center text-sm ${value.value === btnAlignment ? "bg-[#F1F5F9]" : "bg-white"}`}
                                                title={value.value}
                                                dangerouslySetInnerHTML={{ __html: value.icon }}
                                            />
                                        ) : (
                                            <Fragment key={index}></Fragment>
                                        ),
                                    )}
                                </div>
                            </div>
                            <div className="mb-3 last:mb-0">
                                <div className="flex justify-between items-center mb-1 font-semibol">
                                    <div>Text</div>
                                </div>
                            </div>
                            <TextStyleElement
                                {...props}
                                variable={bgPropertyName}
                                changeFontFamily={changeBtnFontFamily}
                                btnStyle={btnStyle}
                                changeFontSize={changeBtnFontSize}
                                changeLineHeight={changeBtnFontLineHeight}
                                changeFontWeight={changeBtnFontWeight}
                                changeLetterSpacing={changeLetterSpacing}
                                changeTextTransform={changeBtnTextTransform}
                                changeFontStyle={changeBtnFontStyle}
                                fontSize={btnFontSize}
                                lineHeight={btnFontLineHeight}
                                fontWeight={btnFontWeight}
                                textTransform={btnTextTransform}
                                fontFamily={btnFontFamily}
                                fontStyle={btnFontStyle}
                                type='button'
                                noTextAlignment={true}
                            />
                            {
                                <ElementMarginPaddingValues
                                    {...props}
                                    variable={bgPropertyName}
                                    btnStyle={btnStyle}
                                    changeLeftMargin={changeLeftMargin}
                                    changeTopMargin={changeTopMargin}
                                    changeRightMargin={changeRightMargin}
                                    changeBottomMargin={changeBottomMargin}
                                    changeLeftPadding={changeLeftPadding}
                                    changeTopPadding={changeTopPadding}
                                    changeRightPadding={changeRightPadding}
                                    changeBottomPadding={changeBottomPadding}
                                    leftMargin={leftMargin}
                                    rightMargin={rightMargin}
                                    topMargin={topMargin}
                                    bottomMargin={bottomMargin}
                                    leftPadding={leftPadding}
                                    rightPadding={rightPadding}
                                    topPadding={topPadding}
                                    bottomPadding={bottomPadding}
                                    isButton={true}
                                    noPropupdate={true}
                                />
                            }
                            <div className="mb-4 last:mb-0 hidden">
                                <label htmlFor="" className="mb-1 block text-sm">
                                    Button Link
                                </label>
                                <div className="flex flex-wrap">
                                    <select className="grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md">
                                        <option value="1">External</option>
                                        <option value="2">Content</option>
                                        <option value="3">File</option>
                                        <option value="4">Email address</option>
                                        <option value="5">Blog</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-4 last:mb-0">
                                <label htmlFor="" className="mb-1 block text-sm">
                                    URL
                                </label>
                                <div className="flex flex-wrap">
                                    <input
                                        onChange={changeBtnLink}
                                        type="text"
                                        value={btnLink}
                                        className="grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
                                    />
                                </div>
                            </div>
                            <div className="mb-4 last:mb-0">
                                <div className="flex flex-wrap justify-between items-center">
                                    <label htmlFor="" className="mb-1 block text-sm">
                                        Open link in new window
                                    </label>
                                    <div className="flex items-center">
                                        <div className="w-16 relative">
                                            <input
                                                onChange={changeLinkTarget}
                                                type="checkbox"
                                                id="new-window-link"
                                                checked={btnLinkWindow == "_blank" ? "checked" : ""}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4 last:mb-0">
                                <label htmlFor="" className="mb-1 block text-sm">
                                    Link Type
                                </label>
                                <label className="flex items-center" htmlFor="no-follow-link">
                                    <input
                                        onChange={changeLinkFollow}
                                        type="checkbox"
                                        id="no-follow-link"
                                        className="form-checkbox"
                                        checked={btnLinkFollow == "nofollow" ? "checked" : ""}
                                    />
                                    <span className="text-sm font-medium ml-2">No Follow</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ElementButton;
