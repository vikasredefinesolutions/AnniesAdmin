import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import ElementHeadlineColorOpacity from "./ElementHeadlineColorOpacity";

const ElementTextAppearance = (props) => {
    const [showHide, setShowHide] = useState(false);
    const [onBottom, setOnBottom] = useState(false);
    const [onTop, setOnTop] = useState(false);
    const [textBgColor, setTextBgColor] = useState("");
    const [bgOpacity, setBgOpacity] = useState("1");
    const [fontSize, setFontSize] = useState("");
    const [textPos, setTextPos] = useState("");
    const [textHPos, setTextHPos] = useState("items-center");
    const [textVPos, setTextVPos] = useState("justify-center");
    const [hexColor, setHexColor] = useState("");
    const [sectionWidth, setSectionWidth] = useState("");

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

    /* Function to set component with updated attributes values */
    const changeSectionWidth = (event) => {
        setSectionWidth(event.target.value);
    };

    const showFieldApperance = () => {
        if (props.compprop.fields) {
            let fields = props.compprop.fields.split(",");
            let x = ReactDOM.findDOMNode(
                props.refArray.current[props.currentComponent],
            );
            fields.forEach((element) => {
                if (x && x.querySelectorAll("#" + element + "_pos").length > 0) {
                    x.querySelectorAll("#" + element + "_bg")[0].style =
                        "background: rgb(" +
                        textBgColor +
                        ", " +
                        bgOpacity +
                        "); padding: 20px";
                    x.querySelectorAll("#" + element + "_pos")[0].className =
                        "flex absolute  inset-0 p-1 lg:p-4 text-white " +
                        textHPos +
                        " " +
                        textVPos;
                    x.querySelectorAll("#" + element + "_bg")[0].className =
                        "p-[20px] w-full " + sectionWidth;
                }
            });
        }
    };

    const changeOnBottom = (event) => {
        if (event.target.checked) {
            props.updateProperty(
                { type: "on_bottom", value: true },
                bgPropertyName + "_on_bottom",
            );
            setOnBottom(true);
            //     setOnTop(false);
            //     props.updateProperty({ type: "on_top", value: false }, bgPropertyName + "_on_top");
            //
        } else {
            props.updateProperty(
                { type: "on_bottom", value: false },
                bgPropertyName + "_on_bottom",
            );
            setOnBottom(false);
        }
    };

    const changeOnTop = (event) => {
        if (event.target.checked) {
            props.updateProperty(
                { type: "on_top", value: true },
                bgPropertyName + "_on_top",
            );
            setOnTop(true);
            // setOnBottom(false);
            // props.updateProperty({ type: "on_bottom", value: false }, bgPropertyName + "_on_bottom");
        } else {
            props.updateProperty(
                { type: "on_top", value: false },
                bgPropertyName + "_on_top",
            );
            setOnTop(false);
        }
    };

    useEffect(() => {
        let tmp = {};
        Object.assign(tmp, { text_bg_color: textBgColor });
        Object.assign(tmp, { hex_color: hexColor });
        Object.assign(tmp, { bg_opacity: bgOpacity });
        Object.assign(tmp, { font_size: fontSize });
        Object.assign(tmp, { text_pos: (onTop ? "top" : "bottom") });
        Object.assign(tmp, { text_hpos: textHPos });
        Object.assign(tmp, { text_vpos: textVPos });
        Object.assign(tmp, { section_width: sectionWidth });

        //if(textBgColor !== "" &&  textPos !== "" && hexColor !== "")
        // {
        props.updateProperty({ type: "appearance", value: tmp }, bgPropertyName);
        //}

        let x = ReactDOM.findDOMNode(
            props.refArray.current[props.currentComponent],
        );

        if (props.compprop.fields != undefined) {
            let fields = props.compprop.fields.split(",");
            fields.forEach((element) => {
                if (x && x.querySelectorAll("#" + element + "_pos").length > 0) {
                    // x.querySelectorAll('#' + element + "_pos")[0].className = "flex items-center absolute " + fontSize + " inset-0 p-1 lg:p-4 text-white justify-" + textPos;
                    x.querySelectorAll("#" + element + "_bg")[0].style =
                        "background: rgb(" +
                        textBgColor +
                        ", " +
                        bgOpacity +
                        "); padding: 20px";
                    //x.querySelectorAll('#' + element)[0].className = "pb-2";
                }
            });
        }
    }, [
        textBgColor,
        bgOpacity,
        textPos,
        onTop,
        onBottom,
        hexColor,
        fontSize,
        textHPos,
        textVPos,
        sectionWidth,
    ]);

    useEffect(() => {
        if (selectedObj.length > 0) {
            if (
                selectedObj[0].selected_Values != undefined &&
                Object.keys(selectedObj[0].selected_Values).length > 0
            ) {
                let tmpApperance;

                Object.entries(selectedObj[0].selected_Values).map(([key, value]) => {
                    if (key == bgPropertyName) {
                        tmpApperance = value;
                    }
                    if (key == bgPropertyName + "_on_bottom") {
                        setOnBottom(value.value);
                    }
                    if (key == bgPropertyName + "_on_top") {
                        setOnTop(value.value);
                    }
                });
                if (tmpApperance != undefined) {
                    let attributes = tmpApperance;
                    setSectionWidth(attributes.value.section_width ?? "max-3-xl");
                    setTextBgColor(attributes.value.text_bg_color ?? "");
                    setHexColor(attributes.value.hex_color ?? "");
                    setBgOpacity(attributes.value.bg_opacity ?? "1");
                    setFontSize(attributes.value.font_size ?? "");
                    setTextPos(attributes.value.text_pos ?? "center");
                    setTextHPos(attributes.value.text_hpos ?? "justify-center");
                    setTextVPos(attributes.value.text_vpos ?? "items-center");
                }
            }
        }
    }, [props.currentComponent]);

    useEffect(() => {
        showFieldApperance();
    }, [
        showFieldApperance,
        textHPos,
        textVPos.textBgColor,
        bgOpacity,
        sectionWidth,
    ]);

    useEffect(() => {
        if (onBottom) {
            setOnTop(false);
            props.updateProperty(
                { type: "on_top", value: false },
                bgPropertyName + "_on_top",
            );
        }
    }, [onBottom]);

    useEffect(() => {
        if (onTop) {
            setOnBottom(false);
            props.updateProperty(
                { type: "on_bottom", value: false },
                bgPropertyName + "_on_bottom",
            );
        }
    }, [onTop]);
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
                            {!props.compprop.hidetopbottom && (
                                <>
                                    <div className="mb-4 last:mb-0">
                                        <label
                                            className="flex items-center"
                                            htmlFor="no-follow-link"
                                        >
                                            <input
                                                onChange={changeOnBottom}
                                                type="checkbox"
                                                id="no-follow-link"
                                                className="form-checkbox"
                                                checked={onBottom ? "checked" : ""}
                                            />
                                            <span className="text-sm font-medium ml-2">
                                                Display on Bottom
                                            </span>
                                        </label>
                                    </div>

                                    <div className="mb-4 last:mb-0">
                                        <label
                                            className="flex items-center"
                                            htmlFor="no-follow-link"
                                        >
                                            <input
                                                onChange={changeOnTop}
                                                type="checkbox"
                                                id="no-follow-link"
                                                className="form-checkbox"
                                                checked={onTop ? "checked" : ""}
                                            />
                                            <span className="text-sm font-medium ml-2">
                                                Display on Top
                                            </span>
                                        </label>
                                    </div>
                                </>
                            )}

                            {props.compprop.hvbox ? (
                                <ElementHeadlineColorOpacity
                                    {...props}
                                    textBgColor={textBgColor}
                                    setTextBgColor={setTextBgColor}
                                    fontSize={fontSize}
                                    setFontSize={setFontSize}
                                    bgOpacity={bgOpacity}
                                    setBgOpacity={setBgOpacity}
                                    setTextHPos={setTextHPos}
                                    setTextVPos={setTextVPos}
                                    hexColor={hexColor}
                                    setHexColor={setHexColor}
                                    fntDisplay={false}
                                    textHPos={textHPos}
                                    textVPos={textVPos}
                                    changeSectionWidth={changeSectionWidth}
                                    sectionWidth={sectionWidth}
                                    hvBox={true}
                                />
                            ) : (
                                <ElementHeadlineColorOpacity
                                    {...props}
                                    textBgColor={textBgColor}
                                    setTextBgColor={setTextBgColor}
                                    fontSize={fontSize}
                                    setFontSize={setFontSize}
                                    bgOpacity={bgOpacity}
                                    setBgOpacity={setBgOpacity}
                                    textPos={textPos}
                                    setTextPos={setTextPos}
                                    hexColor={hexColor}
                                    setHexColor={setHexColor}
                                    fntDisplay={props.compprop?.fontsize ?? false}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ElementTextAppearance;
