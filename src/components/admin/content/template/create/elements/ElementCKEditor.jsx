/*Component Name: ElementCKEditor
Component Functional Details: Element for Component ElementCKEditor  
Created By: Vikas Patel
Created Date: 07/07/2022
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import React, { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import { CKEditor } from "ckeditor4-react";

import ElementMarginPaddingValues from "./ElementMarginPaddingValues";
import TextStyleElement from "./TextStyleElement";

const ElementCKEditor = (props) => {
    const [editor, setEditor] = useState(null);
    const [showHide, setShowHide] = useState(false);

    const showHideProperties = () => {
        if (showHide === true) setShowHide(false);
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

    /* Update background properties related to element */
    const updateProperty = useCallback(
        (bgObj, propertyChange) => {
            let attributes;
            if (propertyChange !== "") {
                props.setComponentHtml((prev) =>
                    prev.map((obj) => {
                        const curObj = prev.filter(
                            (singleComponentHtml) =>
                                singleComponentHtml.uid === props.currentComponent,
                        );

                        if (curObj[0].selected_Values !== undefined) {
                            let isProperty = false;
                            Object.entries(curObj[0].selected_Values).map(([key, value]) => {
                                if (value) {
                                    if (key === propertyChange) {
                                        isProperty = true;
                                        attributes = { ...attributes, [key]: bgObj };
                                    } else {
                                        attributes = { ...attributes, [key]: value };
                                    }
                                }
                            });
                            if (!isProperty) {
                                attributes = { ...attributes, [propertyChange]: bgObj };
                            }
                        } else {
                            attributes = { [propertyChange]: bgObj };
                        }

                        if (obj.uid === props.currentComponent) {
                            return { ...obj, selected_Values: attributes };
                        } else {
                            return { ...obj };
                        }
                    }),
                );
            }
        },
        [props.currentComponent, props.setComponentHtml, props.componentHtml],
    );

    const onChangeHandler = useCallback(
        (text) => {
            let x = ReactDOM.findDOMNode(
                props.refArray.current[props.currentComponent],
            );

            if (x !== undefined) {
                if (x.querySelectorAll("#" + props.variable)[0] !== undefined) {
                    x.querySelectorAll("#" + props.variable)[0].innerHTML = text;
                    updateProperty({ type: "text", value: text }, props.variable);
                }
            }
        },
        [props.variable, props.refArray, props.currentComponent],
    );

    /* Function to set component with updated attributes values */
    useEffect(() => {
        const selectedObj = props.componentHtml.filter(
            (obj) => obj.uid === props.currentComponent,
        );

        if (selectedObj[0]?.selected_Values) {
            let attributes = selectedObj[0]?.selected_Values[`${props.variable}`] || {
                type: "text",
                value: "",
            };

            setEditor(null);
            let editor1 = (
                <CKEditor
                    id={"description"}
                    name={"description"}
                    // onInstanceReady={(editor) => { setckdata(editor.editor); }}
                    initData={attributes?.value || ""}
                    // value={editorText}
                    config={{
                        // toolbar: [
                        //     ['Source'],
                        //     ['Styles'],
                        //     ['Insert'],
                        //     ['Bold', 'Italic', 'Underline'],
                        //     ['NumberedList','BulletedList'],
                        //     ['List', 'Indent', 'Blocks', 'Align'],

                        // ],
                        extraPlugins: "embed,autoembed,image2,iframe",
                        removePlugins: ["image"],
                        extraAllowedContent: "div(*)",
                        allowedContent: true,
                    }}
                    onChange={({ event, editor }) => {
                        onChangeHandler(editor.getData());
                    }}
                />
            );
            setEditor(editor1);
        }
    }, [
        JSON.stringify(props.currentComponent),
        JSON.stringify(props.componentHtml),
        props.variable,
    ]);

    return (
        <>
            <div className="relative border-b border-neutral-00">
                <button
                    onClick={() => {
                        showHideProperties();
                    }}
                    className="flex w-full flex-wrap justify-between items-center text-sm px-3 py-4 bg-white border-0 font-bold"
                >
                    <span>{props.compprop.title ?? "Text"}</span>
                    <span className="material-icons-outlined">expand_more</span>
                </button>

                <div
                    className={`property-content bg-white border-y border-b-0 border-neutral-200 ${showHide ? "" : "hidden"}`}
                >
                    <div className="mx-2 text-sm">
                        <div className="py-4">{editor}</div>
                        {props.compprop.fontsize && (
                            <>
                                <TextStyleElement {...props} variable={props.variable} />
                            </>
                        )}
                        {props.compprop.padding && (
                            <>
                                <div className="mt-3">
                                    <ElementMarginPaddingValues {...props} />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ElementCKEditor;
