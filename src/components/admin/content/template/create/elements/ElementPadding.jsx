import { fontSizeClassOption } from "global/Enum";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import * as ThemeVariable from "components/admin/content/helper/ThemeVariables";
import ColorPicker from "components/admin/content/common/ColorPicker";
import ElementPaddingValues from "./ElementPaddingValues";

const ElementPadding = (props) => {
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

    const selectedObj = props.componentHtml.filter(
        (obj) => obj.uid == props.currentComponent,
    );
    let attributes = {};

    const propertyName = props.variable;
    const [leftPadding, setLeftPadding] = useState("");
    const [topPadding, setTopPadding] = useState("");
    const [rightPadding, setRightPadding] = useState("");
    const [bottomPadding, setBottomPadding] = useState("");

    /* Function to set component with updated attributes values */

    useEffect(() => {
        if (selectedObj.length > 0) {
            if (
                selectedObj[0].selected_Values != undefined &&
                Object.keys(selectedObj[0].selected_Values).length > 0
            ) {
                let tmpLeftPadding;
                let tmpTopPadding;
                let tmpRightPadding;
                let tmpBottomPadding;

                Object.entries(selectedObj[0].selected_Values).map(([key, value]) => {
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
                });

                if (tmpLeftPadding != undefined) {
                    let attributes = tmpLeftPadding;
                    setLeftPadding(attributes.value);
                } else {
                    setLeftPadding("");
                }

                if (tmpTopPadding != undefined) {
                    let attributes = tmpTopPadding;
                    setTopPadding(attributes.value);
                } else {
                    setTopPadding("");
                }

                if (tmpRightPadding != undefined) {
                    let attributes = tmpRightPadding;
                    setRightPadding(attributes.value);
                } else {
                    setRightPadding("");
                }

                if (tmpBottomPadding != undefined) {
                    let attributes = tmpBottomPadding;
                    setBottomPadding(attributes.value);
                } else {
                    setBottomPadding("");
                }
            } else {
                //setHeadline('');
                //updateProperty({[bgPropertyName]: imageURL});
            }
        }
    }, [props.currentComponent]);

    const changeLeftPadding = (event) => {
        setLeftPadding(event.target.value);
        props.updateProperty(
            { type: "left_padding", value: event.target.value },
            bgPropertyName + "_left_padding",
        );
    };

    const changeTopPadding = (event) => {
        setTopPadding(event.target.value);
        props.updateProperty(
            { type: "top_padding", value: event.target.value },
            bgPropertyName + "_top_padding",
        );
    };

    const changeRightPadding = (event) => {
        setRightPadding(event.target.value);
        props.updateProperty(
            { type: "right_padding", value: event.target.value },
            bgPropertyName + "_right_padding",
        );
    };

    const changeBottomPadding = (event) => {
        setBottomPadding(event.target.value);
        props.updateProperty(
            { type: "bottom_padding", value: event.target.value },
            bgPropertyName + "_bottom_padding",
        );
    };

    const applyFinalClasses = (event) => {
        // let x = ReactDOM.findDOMNode(props.refArray.current[props.currentComponent]);
        // fontSizeClassOption.map((element, index) => {
        //     x.querySelectorAll('#' + props.variable)[0].classList.remove(element.class);
        // })
        // x.querySelectorAll('#' + props.variable)[0].classList.add(value);
    };

    return (
        <>
            {bgPropertyName === "container" && (
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
                                    <ElementPaddingValues {...props} />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default ElementPadding;
