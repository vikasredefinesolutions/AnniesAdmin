import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import * as ThemeVariable from "components/admin/content/helper/ThemeVariables";

const ElementMarginValues = (props) => {
    let bgPropertyName = props.variable;

    const selectedObj = props.componentHtml.filter(
        (obj) => obj.uid == props.currentComponent,
    );
    let attributes = {};

    const propertyName = props.variable;
    const [leftMargin, setLeftMargin] = useState("");
    const [topMargin, setTopMargin] = useState("");
    const [rightMargin, setRightMargin] = useState("");
    const [bottomMargin, setBottomMargin] = useState("");

    /* Function to set component with updated attributes values */

    useEffect(() => {
        if (selectedObj.length > 0) {
            if (
                selectedObj[0].selected_Values != undefined &&
                Object.keys(selectedObj[0].selected_Values).length > 0
            ) {
                let tmpLeftMargin;
                let tmpTopMargin;
                let tmpRightMargin;
                let tmpBottomMargin;

                Object.entries(selectedObj[0].selected_Values).map(([key, value]) => {
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
                });

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
            } else {
                //setHeadline('');
                //updateProperty({[bgPropertyName]: imageURL});
            }
        }
    }, [props.currentComponent]);

    const changeLeftMargin = (event) => {
        setLeftMargin(event.target.value);
        props.updateProperty(
            { type: "left_margin", value: event.target.value },
            bgPropertyName + "_left_margin",
        );
    };

    const changeTopMargin = (event) => {
        setTopMargin(event.target.value);
        props.updateProperty(
            { type: "top_margin", value: event.target.value },
            bgPropertyName + "_top_margin",
        );
    };

    const changeRightMargin = (event) => {
        setRightMargin(event.target.value);
        props.updateProperty(
            { type: "right_margin", value: event.target.value },
            bgPropertyName + "_right_margin",
        );
    };

    const changeBottomMargin = (event) => {
        setBottomMargin(event.target.value);
        props.updateProperty(
            { type: "bottom_margin", value: event.target.value },
            bgPropertyName + "_bottom_margin",
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
                    if (key === bgPropertyName + "_left_padding") {
                        addClassName += " " + value.value;
                    }
                    if (key === bgPropertyName + "_top_padding") {
                        addClassName += " " + value.value;
                    }
                    if (key === bgPropertyName + "_right_padding") {
                        addClassName += " " + value.value;
                    }
                    if (key === bgPropertyName + "_bottom_padding") {
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
        if (leftMargin !== "") {
            className += " " + leftMargin;
        }
        if (rightMargin !== "") {
            className += " " + rightMargin;
        }
        if (topMargin !== "") {
            className += " " + topMargin;
        }
        if (bottomMargin !== "") {
            className += " " + bottomMargin;
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
        applyFinalClasses();
    }, [leftMargin, rightMargin, topMargin, bottomMargin]);

    return (
        <>
            <div className="mb-4 last:mb-0">
                <label htmlFor="" className="mb-1 block text-sm">
                    {props?.title ?? "Margin (T R B L)"}
                </label>
                <div className="flex flex-wrap">
                    <select
                        onChange={changeTopMargin}
                        value={topMargin}
                        className="grow h-9 mr-2 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
                    >
                        {(props.isButton
                            ? ThemeVariable.btnTopMargin
                            : ThemeVariable.topMargin
                        ).map((value, index) => (
                            <option key={index} value={value.value}>
                                {value.label}
                            </option>
                        ))}
                    </select>
                    <select
                        onChange={changeRightMargin}
                        value={rightMargin}
                        className="grow h-9 mr-2 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
                    >
                        {(props.isButton
                            ? ThemeVariable.btnRightMargin
                            : ThemeVariable.rightMargin
                        ).map((value, index) => (
                            <option key={index} value={value.value}>
                                {value.label}
                            </option>
                        ))}
                    </select>
                    <select
                        onChange={changeBottomMargin}
                        value={bottomMargin}
                        className="grow h-9 mr-2 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
                    >
                        {(props.isButton
                            ? ThemeVariable.btnBottomMargin
                            : ThemeVariable.bottomMargin
                        ).map((value, index) => (
                            <option key={index} value={value.value}>
                                {value.label}
                            </option>
                        ))}
                    </select>
                    <select
                        onChange={changeLeftMargin}
                        value={leftMargin}
                        className="grow h-9 mr-2 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
                    >
                        {(props.isButton
                            ? ThemeVariable.btnLeftMargin
                            : ThemeVariable.leftMargin
                        ).map((value, index) => (
                            <option key={index} value={value.value}>
                                {value.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    );
};

export default ElementMarginValues;
