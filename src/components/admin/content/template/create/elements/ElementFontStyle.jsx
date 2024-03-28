import { fontSizeClassOption } from "global/Enum";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import * as ThemeVariable from "components/admin/content/helper/ThemeVariables";
import ColorPicker from "components/admin/content/common/ColorPicker";
import { Fragment } from "react";

const ElementFontStyle = (props) => {
    let bgPropertyName = props.variable;

    const selectedObj = props.componentHtml.filter(
        (obj) => obj.uid == props.currentComponent,
    );
    let attributes = {};

    const propertyName = props.variable;
    const [textTransform, setTextTransform] = useState("");
    const [fontSize, setFontSize] = useState("");
    const [fontFamily, setFontFamily] = useState("");
    const [fontColor, setFontColor] = useState("");
    const [lineHeight, setLineHeight] = useState("");
    const [letterSpacing, setLetterSpacing] = useState("");
    const [fontWeight, setFontWeight] = useState("");
    const [fontStyle, setFontStyle] = useState("");
    const [textDecoration, setTextDecoration] = useState("");
    const [textAlignment, setTextAlignment] = useState("");

    /* Function to set component with updated attributes values */

    useEffect(() => {
        if (selectedObj.length > 0) {
            if (
                selectedObj[0].selected_Values != undefined &&
                Object.keys(selectedObj[0].selected_Values).length > 0
            ) {
                let tmpTextTransform;
                let tmpFontSize;
                let tmpFontFamily;
                let tmpFontColor;
                let tmpLineHeight;
                let tmpLetterSpacing;
                let tmpFontWeight;
                let tmpFontStyle;
                let tmpTextDecoration;
                let tmpTextAlignment;

                //     //console.log("SA", selectedObj[0].selected_Values);
                Object.entries(selectedObj[0].selected_Values).map(([key, value]) => {
                    if (key == bgPropertyName + "_text_transform") {
                        tmpTextTransform = value;
                    }
                    if (key == bgPropertyName + "_font_size") {
                        tmpFontSize = value;
                    }
                    if (key == bgPropertyName + "_font_family") {
                        tmpFontFamily = value;
                    }
                    if (key == bgPropertyName + "_font_color") {
                        tmpFontColor = value;
                    }
                    if (key == bgPropertyName + "_line_height") {
                        tmpLineHeight = value;
                    }
                    if (key == bgPropertyName + "_letter_spacing") {
                        tmpLetterSpacing = value;
                    }
                    if (key == bgPropertyName + "_font_weight") {
                        tmpFontWeight = value;
                    }
                    if (key == bgPropertyName + "_font_style") {
                        tmpFontStyle = value;
                    }
                    if (key == bgPropertyName + "_text_alignment") {
                        tmpTextAlignment = value;
                    }
                });

                if (tmpTextTransform != undefined) {
                    let attributes = tmpTextTransform;
                    setTextTransform(attributes.value);
                } else {
                    setTextTransform("");
                }

                if (tmpFontSize != undefined) {
                    let attributes = tmpFontSize;
                    setFontSize(attributes.value);
                    //changeFontSize(attributes.value);
                } else {
                    setFontSize("");
                }

                if (tmpFontFamily != undefined) {
                    let attributes = tmpFontFamily;
                    setFontFamily(attributes.value);
                    //changeFontSize(attributes.value);
                } else {
                    setFontFamily("");
                }

                if (tmpFontColor != undefined) {
                    let attributes = tmpFontColor;
                    setFontColor(attributes.value);
                    //changeFontSize(attributes.value);
                } else {
                    setFontColor("");
                }

                if (tmpLineHeight != undefined) {
                    let attributes = tmpLineHeight;
                    setLineHeight(attributes.value);
                    //changeFontSize(attributes.value);
                } else {
                    setLineHeight("");
                }

                if (tmpLetterSpacing != undefined) {
                    let attributes = tmpLetterSpacing;
                    setLetterSpacing(attributes.value);
                    //changeFontSize(attributes.value);
                } else {
                    setLetterSpacing("");
                }

                if (tmpFontWeight != undefined) {
                    let attributes = tmpFontWeight;
                    setFontWeight(attributes.value);
                    //changeFontSize(attributes.value);
                } else {
                    setFontWeight("");
                }

                if (tmpFontStyle != undefined) {
                    let attributes = tmpFontStyle;
                    setFontStyle(attributes.value);
                    //changeFontSize(attributes.value);
                } else {
                    setFontStyle("");
                }

                if (tmpTextDecoration != undefined) {
                    let attributes = tmpTextDecoration;
                    setTextDecoration(attributes.value);
                    //changeFontSize(attributes.value);
                } else {
                    setTextDecoration("");
                }

                if (tmpTextAlignment != undefined) {
                    let attributes = tmpTextAlignment;
                    setTextAlignment(attributes.value);
                    //changeFontSize(attributes.value);
                } else {
                    setTextAlignment("");
                }
            } else {
                //setHeadline('');
                //updateProperty({[bgPropertyName]: imageURL});
            }
        }
    }, [props.currentComponent]);

    const changeFontSize = (event) => {
        setFontSize(event.target.value);
        props.updateProperty(
            { type: "fontsize", value: event.target.value },
            bgPropertyName + "_font_size",
        );
        //applyFinalClasses();
    };

    const changeFontFamily = (event) => {
        setFontFamily(event.target.value);
        props.updateProperty(
            { type: "fontfamily", value: event.target.value },
            bgPropertyName + "_font_family",
        );
        //applyFinalClasses();
    };

    const changeTextTransform = (event) => {
        setTextTransform(event.target.value);
        props.updateProperty(
            { type: "transform", value: event.target.value },
            bgPropertyName + "_text_transform",
        );
        //applyFinalClasses();
    };

    const changeBackgroundColor = (color) => {
        setFontColor(color.hex);
        props.updateProperty(
            { type: "fontcolor", value: color.hex },
            bgPropertyName + "_font_color",
        );
        // console.log(color);
        //applyFinalClasses();
    };

    const changeLineHeight = (event) => {
        setLineHeight(event.target.value);
        props.updateProperty(
            { type: "lineheight", value: event.target.value },
            bgPropertyName + "_line_height",
        );
        //applyFinalClasses();
    };

    const changeLetterSpacing = (event) => {
        setLetterSpacing(event.target.value);
        props.updateProperty(
            { type: "letterspace", value: event.target.value },
            bgPropertyName + "_letter_spacing",
        );
        //applyFinalClasses();
    };

    const changeFontStyle = (event) => {
        setFontStyle(event.target.value);
        props.updateProperty(
            { type: "fontstyle", value: event.target.value },
            bgPropertyName + "_font_style",
        );
        //applyFinalClasses();
    };

    const changeTextAlignment = (event) => {
        setTextAlignment(event.target.value);
        props.updateProperty(
            { type: "alignment", value: event.target.value },
            bgPropertyName + "_text_alignment",
        );
        //applyFinalClasses();
    };

    const changeFontWeight = (event) => {
        setFontWeight(event.target.value);
        props.updateProperty(
            { type: "font_weight", value: event.target.value },
            bgPropertyName + "_font_weight",
        );
        //applyFinalClasses();
    };

    const applyFinalClasses = () => {
        let addClassName = "";
        if (selectedObj.length > 0) {
            if (
                selectedObj[0].selected_Values != undefined &&
                Object.keys(selectedObj[0].selected_Values).length > 0
            ) {
                Object.entries(selectedObj[0].selected_Values).map(([key, value]) => {
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
        if (fontSize !== "") {
            className += " " + fontSize;
        }
        if (fontFamily !== "") {
            className += " " + fontFamily;
        }
        if (letterSpacing !== "") {
            className += " tracking-[" + letterSpacing + "]";
        }
        if (lineHeight !== "") {
            className += " " + lineHeight;
        }
        if (fontWeight !== "") {
            className += " " + fontWeight;
        }
        if (textAlignment !== "") {
            className += " " + textAlignment;
        }
        if (fontStyle !== "") {
            className += " " + fontStyle;
        }
        if (textTransform !== "") {
            className += " " + textTransform;
        }
        props.updateProperty(
            { type: "finalclass", value: className },
            bgPropertyName + "_final_class",
        );
        if (x && className !== "") {
            if (
                props.type !== undefined &&
                (props.type === "accordion" ||
                    props.type === "carousel" ||
                    props.type === "dynamic")
            ) {
            } else x.querySelectorAll("#" + props.variable)[0].className = className;
        }
        //    console.log("Font Color");
        if (x && fontColor !== "") {
            if (
                props.type !== undefined &&
                (props.type === "accordion" ||
                    props.type === "carousel" ||
                    props.type === "dynamic")
            ) {
            } else
                x.querySelectorAll("#" + props.variable)[0].style.color = fontColor;
        }

        // text decpration is pending
    };

    useEffect(() => {
        applyFinalClasses();
    }, [
        fontSize,
        fontColor,
        fontFamily,
        letterSpacing,
        lineHeight,
        fontWeight,
        textAlignment,
        fontStyle,
        textTransform,
    ]);

    useEffect(() => { }, []);

    return (
        <>
            <div className="mb-4 last:mb-0">
                <label htmlFor="" className="mb-1 block text-sm">
                    {props.title ?? ""} Font Size
                </label>
                <div className="flex flex-wrap">
                    <select
                        onChange={changeFontSize}
                        value={fontSize}
                        className="grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
                    >
                        <option value="">Select Font Size</option>
                        {ThemeVariable.FontSize.map((value, index) => (
                            <option key={index} value={value.value}>
                                {value.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="mb-4 last:mb-0">
                <label htmlFor="" className="mb-1 block text-sm">
                    {props.title ?? ""} Font Family
                </label>
                <div className="flex flex-wrap">
                    <select
                        onChange={changeFontFamily}
                        value={fontFamily}
                        className="grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
                    >
                        <option value="">Select Font Family</option>
                        {ThemeVariable.FontFamily.map((value, index) => (
                            <option key={index} value={value.value} className={value.value}>
                                {value.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="mb-4 last:mb-0">
                <label htmlFor="" className="mb-1 block text-sm">
                    {props.title ?? ""} Font Color
                </label>
                <div className="flex flex-wrap">
                    <ColorPicker
                        changeBackgroundColor={changeBackgroundColor}
                        value={fontColor}
                    />
                </div>
            </div>

            <div className="mb-4 last:mb-0">
                <label htmlFor="" className="mb-1 block text-sm">
                    {props.title ?? ""} Line Height
                </label>
                <div className="flex flex-wrap">
                    <select
                        onChange={changeLineHeight}
                        value={lineHeight}
                        className="grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
                    >
                        <option value="">Select Line Height</option>
                        {Array(100)
                            .fill(null)
                            .map((value, index) => {
                                return index > 9 ? (
                                    <option key={index} value={index}>
                                        {index}
                                    </option>
                                ) : (
                                    <Fragment key={index}></Fragment>
                                );
                            })}
                    </select>
                </div>
            </div>

            <div className="mb-4 last:mb-0">
                <label htmlFor="" className="mb-1 block text-sm">
                    {props.title ?? ""} Letter Spacing
                </label>
                <div className="flex flex-wrap">
                    <select
                        onChange={changeLetterSpacing}
                        value={letterSpacing}
                        className="grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
                    >
                        <option value="">Select Letter Spacing</option>
                        {ThemeVariable.LetterSpacing.map((value, index) => (
                            <option key={index} value={value.value}>
                                {value.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="mb-4 last:mb-0">
                <label htmlFor="" className="mb-1 block text-sm">
                    {props.title ?? ""} Font Weight
                </label>
                <div className="flex flex-wrap">
                    <select
                        onChange={changeFontWeight}
                        value={fontWeight}
                        className="grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
                    >
                        <option value="">Select Font Weight</option>
                        {ThemeVariable.FontWeight.map((value, index) => (
                            <option key={index} value={value.value}>
                                {value.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="mb-4 last:mb-0">
                <label htmlFor="" className="mb-1 block text-sm">
                    {props.title ?? ""} Font Style
                </label>
                <div className="flex flex-wrap">
                    <select
                        onChange={changeFontStyle}
                        value={fontStyle}
                        className="grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
                    >
                        <option value="">Select Font Style</option>
                        {ThemeVariable.FontStyle.map((value, index) => (
                            <option key={index} value={value.value}>
                                {value.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="mb-4 last:mb-0">
                <label htmlFor="" className="mb-1 block text-sm">
                    {props.title ?? ""} Text Transform
                </label>
                <div className="flex flex-wrap">
                    <select
                        onChange={changeTextTransform}
                        value={textTransform}
                        className="grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
                    >
                        <option value="">Select Text Transform</option>
                        {ThemeVariable.TextTransform.map((value, index) => (
                            <option key={index} value={value.value}>
                                {value.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="mb-4 last:mb-0">
                <label htmlFor="" className="mb-1 block text-sm">
                    {props.title ?? ""} Text Alignment
                </label>
                <div className="flex flex-wrap">
                    <select
                        onChange={changeTextAlignment}
                        value={textAlignment}
                        className="grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
                    >
                        <option value="">Select Text Alignmnt</option>
                        {ThemeVariable.FontAlignment.map((value, index) => (
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

export default ElementFontStyle;
