import React, { Fragment, useState, useEffect } from "react";
import ReactDOM from "react-dom";

const ElementLayout = (props) => {
    const [showHide, setShowHide] = useState(false);
    const [layoutOption, setLayoutOption] = useState("");
    const [isDisable, setIsDisable] = useState(false);
    const [position, setPosition] = useState('Left');
    const bgPropertyName = props.variable;
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

    const changeLayoutOption = (val) => {
        setLayoutOption(val);
        let x = ReactDOM.findDOMNode(
            props.refArray.current[props.currentComponent],
        );
        if (x) {
            if (x.querySelectorAll("#right-section")[0]) {
                x.querySelectorAll("#right-section")[0].classList.remove(
                    "lg:w-[" + (100 - layoutOption) + "%]",
                );
            }

            if (x.querySelectorAll("#left-section")[0]) {
                x.querySelectorAll("#left-section")[0].classList.remove(
                    "lg:w-[" + layoutOption + "%]",
                );
            }
        }
        props.updateProperty({ type: "layout", value: val }, bgPropertyName);
    };

    /* Function to set component with updated attributes values */

    useEffect(() => {
        if (selectedObj.length > 0) {
            if (
                selectedObj[0].selected_Values != undefined &&
                Object.keys(selectedObj[0].selected_Values).length > 0
            ) {
                let tmp;

                Object.entries(selectedObj[0].selected_Values).map(([key, value]) => {
                    if (key == bgPropertyName) {
                        tmp = value;
                    }
                    if (key === "ElementConfiguration_Image_position") {
                        setPosition(value.value);
                        if (value.value === "Left" || value.value === "Right") {
                            setIsDisable(false);
                        } else {
                            setIsDisable(true);
                        }
                    }
                });

                if (tmp != undefined) {
                    let attributes = tmp;
                    setLayoutOption(attributes.value);
                } else {
                    changeLayoutOption("50");
                }
            } else {
                changeLayoutOption("50");
            }
        }
    }, [props.currentComponent, selectedObj]);

    useEffect(() => {
        let x = ReactDOM.findDOMNode(
            props.refArray.current[props.currentComponent],
        );
        if (
            x &&
            layoutOption !== "" &&
            x.querySelectorAll("#right-section").length > 0 && position
        ) {
            if (position === 'Left' || position === 'Right') {
                x.querySelectorAll("#right-section")[0].classList.add(
                    "lg:w-[" + (100 - layoutOption) + "%]",
                );
                x.querySelectorAll("#left-section")[0].classList.add(
                    "lg:w-[" + layoutOption + "%]",
                );
            }
        }
    }, [layoutOption, position]);

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
                    className={`property-content bg-white border-y border-b-0 border-neutral-200 ${showHide ? "" : "hidden"
                        }`}
                >
                    <div className="mx-2 text-sm">
                        <div className="py-2">
                            <div className="mb-4 last:mb-0">
                                <label htmlFor="" className="mb-1 block text-sm">
                                    Image Section Width (%)
                                </label>
                                <div className="flex flex-wrap">
                                    <select
                                        disabled={isDisable}
                                        onChange={(event) => changeLayoutOption(event.target.value)}
                                        value={layoutOption}
                                        className="grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                    >
                                        <option value="">Select Width</option>
                                        {Array(100)
                                            .fill(null)
                                            .map((value, index) => (
                                                <Fragment key={index}>
                                                    {index > 19 && index <= 80 ? (
                                                        <option value={index}>{index}</option>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </Fragment>
                                            ))}
                                    </select>
                                    {isDisable && (
                                        <p style={{ color: "red", marginTop: "10px" }}>
                                            Note: As you selected the image position is Top or Bottom
                                            then you can not set the image section width.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ElementLayout;
