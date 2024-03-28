import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const ElementColumnDisplay = (props) => {
    const [showHide, setShowHide] = useState(false);
    const [columnCount, setColumnCount] = useState(3);
    const [largeImage, setLargeImage] = useState("Left");
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

    /* Function to set component with updated attributes values */
    const changeLargeImage = (event) => {
        setLargeImage(event.target.value);
        props.updateProperty(
            { type: "largeimage", value: event.target.value },
            bgPropertyName + "_large_image",
        );
    };

    useEffect(() => {
        if (selectedObj.length > 0) {
            if (
                selectedObj[0].selected_Values != undefined &&
                Object.keys(selectedObj[0].selected_Values).length > 0
            ) {
                let tmpSide;
                let tmpLargeImage;
                Object.entries(selectedObj[0].selected_Values).map(([key, value]) => {
                    if (key == bgPropertyName) {
                        tmpSide = value;
                        setColumnCount(value.value);
                    }
                    if (key === bgPropertyName + "_large_image") {
                        setLargeImage(value.value);
                    }
                });
            }
        }
    }, [props.currentComponent]);

    const changeDisplay = () => {
        let x = ReactDOM.findDOMNode(
            props.refArray.current[props.currentComponent],
        );
        if (columnCount == "3") {
            if (
                x &&
                (x.querySelectorAll("#centerContent").length > 0 ||
                    x.querySelectorAll("#centerContentNew").length > 0)
            ) {
                if (x.querySelectorAll("#centerContent").length > 0)
                    x.querySelectorAll("#centerContent")[0].classList.remove("hidden");

                if (x.querySelectorAll("#centerContentNew").length > 0)
                    x.querySelectorAll("#centerContentNew")[0].classList.remove("hidden");

                x.querySelectorAll("#leftContent")[0].classList.remove("lg:w-1/2");
                x.querySelectorAll("#rightContent")[0].classList.remove("lg:w-1/2");
                x.querySelectorAll("#leftContent")[0].classList.remove("lg:w-1/3");
                x.querySelectorAll("#rightContent")[0].classList.remove("lg:w-1/3");
                x.querySelectorAll("#leftContent")[0].classList.remove("lg:w-2/3");
                x.querySelectorAll("#rightContent")[0].classList.remove("lg:w-2/3");

                x.querySelectorAll("#leftContent")[0].classList.add("lg:w-1/3");
                x.querySelectorAll("#rightContent")[0].classList.add("lg:w-1/3");

                if (document.querySelectorAll("#LeftPanelImage2").length > 0)
                    document
                        .querySelectorAll("#LeftPanelImage2")[0]
                        .classList.remove("hidden");

                if (document.querySelectorAll("#LeftPanelHeadline2").length > 0)
                    document
                        .querySelectorAll("#LeftPanelHeadline2")[0]
                        .classList.remove("hidden");

                if (document.querySelectorAll("#LeftPanelSubHeadline2").length > 0)
                    document
                        .querySelectorAll("#LeftPanelSubHeadline2")[0]
                        .classList.remove("hidden");

                if (document.querySelectorAll("#LeftPanelSubHeadline21").length > 0)
                    document
                        .querySelectorAll("#LeftPanelSubHeadline21")[0]
                        .classList.remove("hidden");

                if (document.querySelectorAll("#LeftPanelDescription2").length > 0)
                    document
                        .querySelectorAll("#LeftPanelDescription2")[0]
                        .classList.remove("hidden");

                if (document.querySelectorAll("#LeftPanelButton2").length > 0)
                    document
                        .querySelectorAll("#LeftPanelButton2")[0]
                        .classList.remove("hidden");
            }
            if (x && x.querySelectorAll("#centerBox").length > 0) {
                x.querySelectorAll("#centerBox")[0].classList.remove("hidden");
                x.querySelectorAll("#leftBox")[0].classList.add("lg:w-1/3");
                x.querySelectorAll("#rightBox")[0].classList.add("lg:w-1/3");

                x.querySelectorAll("#leftBox")[0].classList.remove("lg:w-1/2");
                x.querySelectorAll("#rightBox")[0].classList.remove("lg:w-1/2");

                if (document.querySelectorAll("#LeftPanelcenterBoxBg").length > 0)
                    document
                        .querySelectorAll("#LeftPanelcenterBoxBg")[0]
                        .classList.remove("hidden");

                if (document.querySelectorAll("#LeftPanelCHeadline1").length > 0)
                    document
                        .querySelectorAll("#LeftPanelCHeadline1")[0]
                        .classList.remove("hidden");

                if (document.querySelectorAll("#LeftPanelCHeadline2").length > 0)
                    document
                        .querySelectorAll("#LeftPanelCHeadline2")[0]
                        .classList.remove("hidden");

                if (document.querySelectorAll("#LeftPanelCDescription1").length > 0)
                    document
                        .querySelectorAll("#LeftPanelCDescription1")[0]
                        .classList.remove("hidden");
            }
        } else {
            if (
                x &&
                (x.querySelectorAll("#centerContent").length > 0 ||
                    x.querySelectorAll("#centerContentNew").length > 0)
            ) {
                if (document.querySelectorAll("#LeftPanelImage2").length > 0)
                    document
                        .querySelectorAll("#LeftPanelImage2")[0]
                        .classList.add("hidden");

                if (document.querySelectorAll("#LeftPanelHeadline2").length > 0)
                    document
                        .querySelectorAll("#LeftPanelHeadline2")[0]
                        .classList.add("hidden");

                if (document.querySelectorAll("#LeftPanelSubHeadline2").length > 0)
                    document
                        .querySelectorAll("#LeftPanelSubHeadline2")[0]
                        .classList.add("hidden");

                if (document.querySelectorAll("#LeftPanelSubHeadline21").length > 0)
                    document
                        .querySelectorAll("#LeftPanelSubHeadline21")[0]
                        .classList.add("hidden");

                if (document.querySelectorAll("#LeftPanelDescription2").length > 0)
                    document
                        .querySelectorAll("#LeftPanelDescription2")[0]
                        .classList.add("hidden");

                if (document.querySelectorAll("#LeftPanelButton2").length > 0)
                    document
                        .querySelectorAll("#LeftPanelButton2")[0]
                        .classList.add("hidden");

                if (x.querySelectorAll("#centerContentNew").length > 0) {
                    x.querySelectorAll("#centerContentNew")[0].classList.add("hidden");

                    x.querySelectorAll("#leftContent")[0].classList.add("lg:w-1/2");
                    x.querySelectorAll("#rightContent")[0].classList.add("lg:w-1/2");
                    x.querySelectorAll("#leftContent")[0].classList.add("md:w-1/2");
                    x.querySelectorAll("#rightContent")[0].classList.add("md:w-1/2");
                    x.querySelectorAll("#leftContent")[0].classList.remove("lg:w-1/3");
                    x.querySelectorAll("#rightContent")[0].classList.remove("lg:w-1/3");
                    x.querySelectorAll("#leftContent")[0].classList.remove("lg:w-2/3");
                    x.querySelectorAll("#rightContent")[0].classList.remove("lg:w-2/3");
                    if (largeImage === "Left") {
                        x.querySelectorAll("#leftContent")[0].classList.add("lg:w-2/3");
                        x.querySelectorAll("#rightContent")[0].classList.add("lg:w-1/3");
                    } else {
                        x.querySelectorAll("#leftContent")[0].classList.add("lg:w-1/3");
                        x.querySelectorAll("#rightContent")[0].classList.add("lg:w-2/3");
                    }
                } else {
                    x.querySelectorAll("#centerContent")[0].classList.add("hidden");
                    x.querySelectorAll("#leftContent")[0].classList.add("lg:w-1/2");
                    x.querySelectorAll("#rightContent")[0].classList.add("lg:w-1/2");

                    x.querySelectorAll("#leftContent")[0].classList.remove("lg:w-1/3");
                    x.querySelectorAll("#rightContent")[0].classList.remove("lg:w-1/3");
                }
            }

            if (x && x.querySelectorAll("#centerBox").length > 0) {
                x.querySelectorAll("#centerBox")[0].classList.add("hidden");
                x.querySelectorAll("#leftBox")[0].classList.add("lg:w-1/2");
                x.querySelectorAll("#rightBox")[0].classList.add("lg:w-1/2");

                x.querySelectorAll("#leftBox")[0].classList.remove("lg:w-1/3");
                x.querySelectorAll("#rightBox")[0].classList.remove("lg:w-1/3");

                document
                    .querySelectorAll("#LeftPanelcenterBoxBg")[0]
                    .classList.add("hidden");
                document
                    .querySelectorAll("#LeftPanelCHeadline1")[0]
                    .classList.add("hidden");
                document
                    .querySelectorAll("#LeftPanelCHeadline2")[0]
                    .classList.add("hidden");
                document
                    .querySelectorAll("#LeftPanelCDescription1")[0]
                    .classList.add("hidden");
            }
        }
    };

    useEffect(() => {
        changeDisplay();
    }, [columnCount, largeImage]);

    const changeColumnCount = (event) => {
        setColumnCount(event.target.value);
        props.updateProperty(
            { type: "colcount", value: event.target.value },
            bgPropertyName,
        );
        changeDisplay();
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
                    <span>{props.compprop.title ?? "Change Side"}</span>
                    <span className="material-icons-outlined">expand_more</span>
                </button>

                <div
                    className={`property-content bg-white border-y border-b-0 border-neutral-200 ${showHide ? "" : "hidden"}`}
                >
                    <div className="mx-2 text-sm">
                        <div className="py-2">
                            <div className="mb-3 last:mb-0">
                                <div className="flex justify-between items-center mb-1">
                                    <div className="font-semibold">Column Display</div>
                                </div>
                                <div className="flex flex-wrap divide-x divide-neutral-300 border border-neutral-300 overflow-hidden mb-3">
                                    <div className="w-full flex flex-wrap divide-x divide-neutral-300 border border-neutral-300 overflow-hidden">
                                        <select
                                            value={columnCount}
                                            onChange={changeColumnCount}
                                            className="w-full grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                        >
                                            <option value="3">3</option>
                                            <option value="2">2</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {columnCount == "2" && props.compprop?.smalllargeimage && (
                            <div className="py-2">
                                <div className="mb-3 last:mb-0">
                                    <div className="flex justify-between items-center mb-1">
                                        <div className="font-semibold">Large Image</div>
                                    </div>
                                    <div className="flex flex-wrap divide-x divide-neutral-300 border border-neutral-300 overflow-hidden mb-3">
                                        <div className="w-full flex flex-wrap divide-x divide-neutral-300 border border-neutral-300 overflow-hidden">
                                            <select
                                                value={largeImage}
                                                onChange={changeLargeImage}
                                                className="w-full grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                            >
                                                <option value="Left">Left</option>
                                                <option value="Right">Right</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ElementColumnDisplay;
