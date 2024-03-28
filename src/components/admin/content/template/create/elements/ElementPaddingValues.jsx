import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import * as ThemeVariable from "components/admin/content/helper/ThemeVariables";

const ElementPaddingValues = (props) => {
    let bgPropertyName = props.variable;

    const selectedObj = props.componentHtml.filter(
        (obj) => obj.uid == props.currentComponent,
    );

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
        let addClassName = "";
        if (selectedObj.length > 0) {
            if (
                selectedObj[0].selected_Values != undefined &&
                Object.keys(selectedObj[0].selected_Values).length > 0
            ) {
                Object.entries(selectedObj[0].selected_Values).map(([key, value]) => {
                    if (key == bgPropertyName + "_text_transform") {
                        addClassName += " " + value.value;
                    }
                    if (key == bgPropertyName + "_font_size") {
                        addClassName += " " + value.value;
                    }
                    if (key == bgPropertyName + "_font_family") {
                        addClassName += " " + value.value;
                    }
                    if (key == bgPropertyName + "_line_height") {
                        addClassName += " " + value.value;
                    }
                    if (key == bgPropertyName + "_letter_spacing") {
                        addClassName += " tracking-[" + value.value + "]";
                    }
                    if (key == bgPropertyName + "_font_weight") {
                        addClassName += " " + value.value;
                    }
                    if (key == bgPropertyName + "_font_style") {
                        addClassName += " " + value.value;
                    }
                    if (key == bgPropertyName + "_text_alignment") {
                        addClassName += " " + value.value;
                    }
                    if (key === bgPropertyName + "_left_margin") {
                        addClassName += " " + value.value;
                    }
                    if (key === bgPropertyName + "_top_margin") {
                        addClassName += " " + value.value;
                    }
                    if (key === bgPropertyName + "_right_margin") {
                        addClassName += " " + value.value;
                    }
                    if (key === bgPropertyName + "_bottom_margin") {
                        addClassName += " " + value.value;
                    }
                });
            }
        }

        let x = ReactDOM.findDOMNode(
            props.refArray.current[props.currentComponent],
        );
        let className = "";
        className += addClassName;
        if (leftPadding !== "") {
            className += " " + setLeftPadding;
        }
        if (rightPadding !== "") {
            className += " " + rightPadding;
        }
        if (topPadding !== "") {
            className += " " + topPadding;
        }
        if (bottomPadding !== "") {
            className += " " + bottomPadding;
        }

        if (
            className !== "" &&
            x &&
            x.querySelectorAll("#" + props.variable).length > 0
        ) {
            x.querySelectorAll("#" + props.variable)[0].className = className;
        }
        props.updateProperty(
            { type: "finalclass", value: className },
            bgPropertyName + "_final_class",
        );

        if (props.setTextClass) {
            props.setTextClass();
        }
    };

    useEffect(() => {
        if (bgPropertyName !== "container") {
            applyFinalClasses();
        }
    }, [leftPadding, rightPadding, topPadding, bottomPadding]);

    return (
        <div className="mb-4 last:mb-0">
            <label htmlFor="" className="mb-1 block text-sm">
                {props?.title ?? "Padding (T R B L)"}
            </label>
            <div className="flex flex-wrap">
                <select
                    onChange={changeTopPadding}
                    value={topPadding}
                    className="grow h-9 mr-2 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
                >
                    {(props.isButton
                        ? ThemeVariable.btnTopPadding
                        : ThemeVariable.topPadding
                    ).map((value, index) => (
                        <option key={index} value={value.value}>
                            {value.label}
                        </option>
                    ))}
                </select>
                <select
                    onChange={changeRightPadding}
                    value={rightPadding}
                    className="grow h-9 mr-2 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
                >
                    {(props.isButton
                        ? ThemeVariable.btnRightPadding
                        : ThemeVariable.rightPadding
                    ).map((value, index) => (
                        <option key={index} value={value.value}>
                            {value.label}
                        </option>
                    ))}
                </select>
                <select
                    onChange={changeBottomPadding}
                    value={bottomPadding}
                    className="grow mr-2 h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
                >
                    {(props.isButton
                        ? ThemeVariable.btnBottomPadding
                        : ThemeVariable.bottomPadding
                    ).map((value, index) => (
                        <option key={index} value={value.value}>
                            {value.label}
                        </option>
                    ))}
                </select>
                <select
                    onChange={changeLeftPadding}
                    value={leftPadding}
                    className="grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
                >
                    {(props.isButton
                        ? ThemeVariable.btnLeftPadding
                        : ThemeVariable.leftPadding
                    ).map((value, index) => (
                        <option key={index} value={value.value}>
                            {value.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default ElementPaddingValues;
