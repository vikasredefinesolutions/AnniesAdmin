import React, { useState, useEffect } from "react";
import ColorPicker from "components/admin/content/common/ColorPicker";
import ReactDOM from "react-dom";
import ElementMarginPaddingValues from "./ElementMarginPaddingValues";

const ElementElementBG = (props) => {
    const [leftPadding, setLeftPadding] = useState("");
    const [topPadding, setTopPadding] = useState("");
    const [rightPadding, setRightPadding] = useState("");
    const [bottomPadding, setBottomPadding] = useState("");
    const [leftMargin, setLeftMargin] = useState("");
    const [topMargin, setTopMargin] = useState("");
    const [rightMargin, setRightMargin] = useState("");
    const [bottomMargin, setBottomMargin] = useState("");

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

    const selectedObj = props.componentHtml.filter(
        (obj) => obj.uid == props.currentComponent,
    );
    let attributes = {};
    const bgPropertyName = props.variable; //selectedObj.length > 0 ? Object.keys(selectedObj[0].properties).find(key => selectedObj[0].properties[key] === "background") : [];

    const changeLeftPadding = (event) => {
        setLeftPadding(event.target.value);
        props.updateProperty(
            { type: "leftpadding", value: event.target.value },
            bgPropertyName + "_left_padding",
        );
    };

    const changeTopPadding = (event) => {
        setTopPadding(event.target.value);
        props.updateProperty(
            { type: "toppadding", value: event.target.value },
            bgPropertyName + "_top_padding",
        );
    };

    const changeRightPadding = (event) => {
        setRightPadding(event.target.value);
        props.updateProperty(
            { type: "rightpadding", value: event.target.value },
            bgPropertyName + "_right_padding",
        );
    };

    const changeBottomPadding = (event) => {
        setBottomPadding(event.target.value);
        props.updateProperty(
            { type: "bottompadding", value: event.target.value },
            bgPropertyName + "_bottom_padding",
        );
    };

    const changeLeftMargin = (event) => {
        setLeftMargin(event.target.value);
        props.updateProperty(
            { type: "leftmargin", value: event.target.value },
            bgPropertyName + "_left_margin",
        );
    };

    const changeTopMargin = (event) => {
        setTopMargin(event.target.value);
        props.updateProperty(
            { type: "topmargin", value: event.target.value },
            bgPropertyName + "_top_margin",
        );
    };

    const changeRightMargin = (event) => {
        setRightMargin(event.target.value);
        props.updateProperty(
            { type: "rightmargin", value: event.target.value },
            bgPropertyName + "_right_margin",
        );
    };

    const changeBottomMargin = (event) => {
        setBottomMargin(event.target.value);
        props.updateProperty(
            { type: "bottommargin", value: event.target.value },
            bgPropertyName + "_bottom_margin",
        );
    };
    /* When click on any component background component will reload and
      we have called function to set default properties */
    useEffect(() => {
        if (selectedObj.length > 0) {
            if (
                selectedObj[0] &&
                selectedObj[0].selected_Values != undefined &&
                Object.keys(selectedObj[0].selected_Values).length > 0
            ) {
                let tmpBgColor;
                let tmpLeftMargin;
                let tmpLeftPadding;
                let tmpRightMargin;
                let tmpRightPadding;
                let tmpBottomMargin;
                let tmpBottomPadding;
                let tmpTopMargin;
                let tmpTopPadding;

                Object.entries(selectedObj[0].selected_Values).map(([key, value]) => {
                    if (key == bgPropertyName) {
                        setBgColor(value.value);
                    }
                    if (key == bgPropertyName + "_left_margin") {
                        setLeftMargin(value.value);
                    }
                    if (key == bgPropertyName + "_top_margin") {
                        setTopMargin(value.value);
                    }
                    if (key == bgPropertyName + "_bottom_margin") {
                        setBottomMargin(value.value);
                    }
                    if (key == bgPropertyName + "_right_margin") {
                        setRightMargin(value.value);
                    }
                    if (key == bgPropertyName + "_left_padding") {
                        setLeftPadding(value.value);
                    }
                    if (key == bgPropertyName + "_top_padding") {
                        setTopPadding(value.value);
                    }
                    if (key == bgPropertyName + "_bottom_padding") {
                        setBottomPadding(value.value);
                    }
                    if (key == bgPropertyName + "_right_padding") {
                        setRightPadding(value.value);
                    }
                });

                // if (attributes != undefined && Object.keys(attributes).length > 0) {
                //     setBgColor(attributes.value);
                //     setImageURL(attributes.value);
                // }
            } else {
                setBgColor("");
            }
        }
    }, [props.currentComponent]);

    /* Function to set component with updated attributes values */
    const changeBackgroundColor = (color) => {
        setBgColor(color.hex);
        props.updateProperty(
            { type: "sectionbgcolor", value: color.hex },
            bgPropertyName,
        );
    };

    useEffect(() => {
        applyBackground();
    }, [
        bgColor,
        leftPadding,
        leftMargin,
        rightPadding,
        rightMargin,
        topPadding,
        topMargin,
        bottomPadding,
        bottomMargin,
    ]);

    const applyBackground = () => {
        if (selectedObj[0]) {
            let x = ReactDOM.findDOMNode(
                props.refArray.current[props.currentComponent],
            );

            let className = "w-full ";
            if (x && x.querySelectorAll("#" + props.variable).length > 0) {
                x.querySelectorAll("#" + bgPropertyName)[0].style =
                    "background: " + bgColor;
            }
            if (leftMargin) {
                className += " " + leftMargin;
            }
            if (topMargin) {
                className += " " + topMargin;
            }
            if (rightMargin) {
                className += " " + rightMargin;
            }
            if (bottomMargin) {
                className += " " + bottomMargin;
            }
            if (leftPadding) {
                className += " " + leftPadding;
            }
            if (rightPadding) {
                className += " " + rightPadding;
            }
            if (topPadding) {
                className += " " + topPadding;
            }
            if (bottomPadding) {
                className += " " + bottomPadding;
            }
            props.updateProperty(
                { type: "finalclass", value: className },
                bgPropertyName + "_final_class",
            );
            x.querySelectorAll("#" + bgPropertyName)[0].className = className;
        }
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
                    <span>{props.compprop.title ?? "Background"}</span>
                    <span className="material-icons-outlined">expand_more</span>
                </button>

                <div
                    className={`property-content bg-white border-y border-b-0 border-neutral-200 ${showHide ? "" : "hidden"}`}
                >
                    <div className="w-full py-2 px-3">
                        <label htmlFor="" className="mb-1 block text-sm">
                            Background Color
                        </label>
                        <div className="mb-3 last:mb-0">
                            <ColorPicker
                                changeBackgroundColor={changeBackgroundColor}
                                value={bgColor}
                            />
                        </div>
                    </div>
                    {
                        <ElementMarginPaddingValues
                            {...props}
                            variable={bgPropertyName}
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
                            noPropupdate={true}
                        />
                    }
                </div>
            </div>
        </>
    );
};

export default ElementElementBG;
