import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const ElementScrollLogo = (props) => {
    const [showHide, setShowHide] = useState(false);

    const [countDisplay, setCountDisplay] = useState(5);
    const [columnSpacing, setColumnSpacing] = useState('30');
    const showHideProperties = () => {
        if (showHide == true)
            setShowHide(false);
        else {
            const allWithClass = Array.from(
                document.querySelectorAll('div.property-content')
            );
            allWithClass.forEach(element => {
                element.classList.add("hidden");
            });
            setShowHide(true);
        }
    }

    let bgPropertyName = props.variable;

    const selectedObj = props.componentHtml.filter(obj => obj.uid == props.currentComponent);
    let attributes = {};

    const propertyName = props.variable;

    /* Function to set component with updated attributes values */

    useEffect(() => {
        if (selectedObj.length > 0) {
            if (selectedObj[0].selected_Values != undefined && Object.keys(selectedObj[0].selected_Values).length > 0) {
                let tmpSide;
                let tmpLargeImage;
                Object.entries(selectedObj[0].selected_Values).map(([key, value]) => {
                    if (key == bgPropertyName + "_count_display") {
                        setCountDisplay(value.value);
                    }
                    if (key === bgPropertyName + "_column_spacing") {
                        setColumnSpacing(value.value);
                    }
                });
            }
        }
    }, [props.currentComponent]);

    const changeCountDisplay = (event) => {
        setCountDisplay(event.target.value);
        props.updateProperty({ type: "countdisplay", value: event.target.value }, bgPropertyName + "_count_display");
        //changeDisplay();
    }

    const changeColumnSpacing = (event) => {
        setColumnSpacing(event.target.value);
        props.updateProperty({ type: "columnspacing", value: event.target.value }, bgPropertyName + "_column_spacing");
        //changeDisplay();
    }

    return (
        <>
            <div className="relative border-b border-neutral-00">
                <button onClick={() => { showHideProperties() }}
                    className="flex w-full flex-wrap justify-between items-center text-sm px-3 py-4 bg-white border-0 font-bold">
                    <span >{props.compprop.title ?? "Change Side"}</span>
                    <span className="material-icons-outlined">expand_more</span>
                </button>

                <div className={`property-content bg-white border-y border-b-0 border-neutral-200 ${showHide ? "" : "hidden"}`}>
                    <div className="mx-2 text-sm">
                        <div className="py-2">
                            <div className="mb-3 last:mb-0">
                                <div className="flex justify-between items-center mb-1">
                                    <div className="font-semibold">Column Display</div>
                                </div>
                                <div className="flex flex-wrap divide-x divide-neutral-300 border border-neutral-300 overflow-hidden mb-3">
                                    <div className="w-full flex flex-wrap divide-x divide-neutral-300 border border-neutral-300 overflow-hidden">
                                        <select value={countDisplay} onChange={changeCountDisplay} className="w-full grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                            <option value="8">8</option>
                                            <option value="7">7</option>
                                            <option value="6">6</option>
                                            <option value="5">5</option>
                                            <option value="4">4</option>
                                            <option value="3">3</option>
                                            <option value="2">2</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3 last:mb-0">
                                <div className="flex justify-between items-center mb-1">
                                    <div className="font-semibold">Column Spacing</div>
                                </div>
                                <div className="flex flex-wrap divide-x divide-neutral-300 border border-neutral-300 overflow-hidden mb-3">
                                    <div className="w-full flex flex-wrap divide-x divide-neutral-300 border border-neutral-300 overflow-hidden">
                                        <select value={columnSpacing} onChange={changeColumnSpacing} className="w-full grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                            <option value="100">100</option>
                                            <option value="90">90</option>
                                            <option value="80">80</option>
                                            <option value="70">70</option>
                                            <option value="60">60</option>
                                            <option value="50">50</option>
                                            <option value="40">40</option>
                                            <option value="30">30</option>
                                            <option value="20">20</option>
                                            <option value="10">10</option>
                                        </select>
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

export default ElementScrollLogo;
