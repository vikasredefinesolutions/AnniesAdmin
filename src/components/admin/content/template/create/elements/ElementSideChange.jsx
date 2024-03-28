
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const ElementSideChange = (props) => {

    const [showHide, setShowHide] = useState(false);
    const [sideClassArr, setSideClassArr] = useState({});
    const [imagePos, setImagePos] = useState('');
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
                Object.entries(selectedObj[0].selected_Values).map(([key, value]) => {
                    if (key == bgPropertyName) {
                        tmpSide = value;
                    }
                });

                if (tmpSide != undefined) {
                    let attributes = tmpSide;
                    setSideClassArr(attributes.value);
                }
                else {
                    setSideClassArr({ "left": "lg:order-1", "right": "lg:order-2" });
                }
            }
        }
    }, [props.currentComponent]);

    useEffect(() => {
        let x = ReactDOM.findDOMNode(props.refArray.current[props.currentComponent]);
        if (Object.keys(sideClassArr).length > 0) {
            x.querySelectorAll('#left-section')[0].classList.add(sideClassArr.left);
            x.querySelectorAll('#right-section')[0].classList.add(sideClassArr.right);
        }
    }, [sideClassArr]);

    const sideChange = (event) => {
        let x = ReactDOM.findDOMNode(props.refArray.current[props.currentComponent]);
        let sideArr = {};
        if (x && x.querySelectorAll('#left-section')[0].classList.contains("lg:order-1")) {
            setImagePos('Right');
            x.querySelectorAll('#right-section')[0].classList.remove("lg:order-1");
            x.querySelectorAll('#left-section')[0].classList.remove("lg:order-1");
            x.querySelectorAll('#right-section')[0].classList.remove("lg:order-2");
            x.querySelectorAll('#left-section')[0].classList.remove("lg:order-2");

            sideArr = { "left": "lg:order-2", "right": "lg:order-1" };
        }
        else if (x && x.querySelectorAll('#left-section')[0].classList.contains("lg:order-2")) {
            setImagePos('Left');
            x.querySelectorAll('#right-section')[0].classList.remove("lg:order-1");
            x.querySelectorAll('#left-section')[0].classList.remove("lg:order-1");
            x.querySelectorAll('#right-section')[0].classList.remove("lg:order-2");
            x.querySelectorAll('#left-section')[0].classList.remove("lg:order-2");

            sideArr = { "left": "lg:order-1", "right": "lg:order-2" };
        }
        else {
            if (x) {
                x.querySelectorAll('#right-section')[0].classList.remove("lg:order-1");
                x.querySelectorAll('#left-section')[0].classList.remove("lg:order-1");
                x.querySelectorAll('#right-section')[0].classList.remove("lg:order-2");
                x.querySelectorAll('#left-section')[0].classList.remove("lg:order-2");


            }
            sideArr = { "left": "lg:order-1", "right": "lg:order-2" };

        }
        setSideClassArr(sideArr);
        props.updateProperty({ type: "side_change", value: sideArr }, bgPropertyName);

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
                                    <div className="font-semibold">Image Position</div>
                                </div>
                                <div className="flex flex-wrap divide-x divide-neutral-300 border border-neutral-300 overflow-hidden mb-3">
                                    {props.ThemeVariable.sideChange.map((value, index) => (
                                        <button key={index} value={value.value} onClick={sideChange} className={`w-1/${props.ThemeVariable.sideChange.length} px-2 py-[7px] inline-flex justify-center items-center text-sm focus:ring-0 focus:shadow-none focus:outline-none ${value.value === imagePos ? 'bg-[#F1F5F9]' : 'bg-white'}`} title={value.value} dangerouslySetInnerHTML={{ __html: value.icon }} />
                                    ))}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ElementSideChange;
