import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useEffect } from "react";

const ElementPlainText = (props) => {
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
    const [textCode, setTextCode] = useState("");
    let bgPropertyName = props.variable;

    const selectedObj = props.componentHtml.filter(
        (obj) => obj.uid == props.currentComponent,
    );
    let attributes = {};

    const propertyName = props.variable;

    /* Function to set component with updated attributes values */

    useEffect(() => {
        if (selectedObj.length > 0) {
            if (
                selectedObj[0].selected_Values != undefined &&
                Object.keys(selectedObj[0].selected_Values).length > 0
            ) {
                let tmp;
                let tmpAlt;
                let tmpLink;
                Object.entries(selectedObj[0].selected_Values).map(([key, value]) => {
                    if (key == bgPropertyName) {
                        tmp = value;
                    }
                });

                if (tmp != undefined) {
                    let attributes = tmp;
                    setTextCode(attributes.value);
                } else {
                    setTextCode("");
                }
            } else {
                setTextCode("");
                //updateProperty({[bgPropertyName]: imageURL});
            }
        }
    }, [props.currentComponent]);

    useEffect(() => {
        // let x = ReactDOM.findDOMNode(props.refArray.current[props.currentComponent]);
        // x.querySelectorAll('#' + bgPropertyName)[0].innerHTML= textCode;
    }, [textCode]);

    const saveTextCode = (event) => {
        let x = ReactDOM.findDOMNode(
            props.refArray.current[props.currentComponent],
        );
        if (x) x.querySelectorAll("#" + bgPropertyName)[0].innerHTML = textCode;
        props.updateProperty(
            { type: "plaintext", value: textCode },
            bgPropertyName,
        );
    };

    const changeTextCode = (event) => {
        setTextCode(event.target.value);
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
                    <span>{props.compprop.title ?? "Layout Options"}</span>
                    <span className="material-icons-outlined">expand_more</span>
                </button>

                <div
                    className={`property-content bg-white border-y border-b-0 border-neutral-200 ${showHide ? "" : "hidden"}`}
                >
                    <div className="mx-2 text-sm">
                        <div className="mb-3 pb-3">
                            <div className="mb-3">
                                <div className="flex flex-wrap">
                                    <div className="w-full flex flex-wrap divide-x divide-neutral-300 border border-neutral-300 overflow-hidden">
                                        <textarea
                                            onChange={changeTextCode}
                                            value={textCode}
                                            className="w-full grow h-100 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                            rows="30"
                                        ></textarea>
                                    </div>
                                    <div className="mb-3 text-center last:mb-0 w-full">
                                        <button
                                            className="btn bg-indigo-500 hover:bg-indigo-600 text-white mt-2"
                                            onClick={saveTextCode}
                                        >
                                            + Add Code
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ElementPlainText;
