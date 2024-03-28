/*Component Name: RightSideBar
Component Functional Details: User can create or update RightSideBar master details from here.
Created By: chandan
Created Date: <Creation Date>
Modified By: chandan
Modified Date: <Modified Date> */

import React, { Fragment } from 'react';
import { Droppable, Draggable } from "react-beautiful-dnd";

import { defaultImage } from "global/Enum";
import Image from "components/common/formComponent/Image";

const RightSideBar = ({ ShowRightSideBar, handleRightSideBar, DashBoardWidgets, HandleAddWidget, setshowListing }) => {
    return (
        <>
            <div className={`sidemanu select-none ${ShowRightSideBar ? "" : "hidden"}`} >
                <div className="h-full fixed right-0 p-4 pt-0 bg-slate-100 border-l border-neutral-200 z-50 w-72 overflow-y-scroll lg:overflow-y-auto scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-slate-200">
                    <div className="">
                        <div className="pb-16">
                            <div className="flex items-center justify-between sticky top-0 bg-slate-100 z-50 pt-4">
                                <div className="font-semibold text-xl text-gray-700 mb-3">Dashboard Widget</div>
                                <div className="text-right">
                                    <button type="button" onClick={handleRightSideBar} className=""><span className="material-icons-outlined">close</span></button>
                                </div>
                            </div>
                            {/* dragable and dropable element will come here  */}
                            <Droppable droppableId={"all_widgets"} isDropDisabled={true}>
                                {(provided, snapshot) => {
                                    return <div ref={provided.innerRef}
                                        {...provided.droppableProps}>
                                        {
                                            (DashBoardWidgets && DashBoardWidgets.length > 0) ? <div>
                                                {/* here widgets are the allWidgets what we have to drag and drop to show upon dashboard */}
                                                {
                                                    DashBoardWidgets.map((WidgetData, index) => {
                                                        WidgetData.order = WidgetData.displayOrder

                                                        const foundObj = (DashBoardWidgets && DashBoardWidgets.length) ? DashBoardWidgets.some((myObj) => (myObj.codeName === WidgetData.codeName && myObj.isVisibleAtDashboard)) : false

                                                        return <Fragment key={index}>

                                                            <Draggable
                                                                key={`${WidgetData.widgetId}`}
                                                                draggableId={`${WidgetData.widgetId}`}
                                                                index={WidgetData.id}
                                                                // i have to pass conditional disable logic based on the elements are on the dashboard
                                                                isDragDisabled={foundObj}
                                                            >
                                                                {(provided, snapshot) => {
                                                                    if (snapshot.isDragging) {
                                                                        setshowListing(true)
                                                                    }
                                                                    if (snapshot.isDropAnimating) {
                                                                        setshowListing(false)
                                                                    }


                                                                    // if (provided && provided.draggableProps) {
                                                                    //     if (snapshot.isDragging, provided.draggableProps.style, provided.draggableProps.style.transition) {
                                                                    //         if (snapshot.isDropAnimating && !snapshot.draggingOver) {
                                                                    //             // console.log(`provided.draggableProps["style"]["transform"]`, provided.draggableProps);
                                                                    //             // setShowRightSideBar(false)
                                                                    //             // provided.draggableProps["style"]["transform"] = "translate(50%, 50%)"
                                                                    //             // provided.draggableProps.style.transition = ""
                                                                    //         }
                                                                    //     }
                                                                    // }

                                                                    return <>
                                                                        <div className={` ${snapshot.isDragging ? "border-2 border-dashed" : ""}`} ref={provided.innerRef}
                                                                            id={WidgetData.codeName}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}

                                                                        >
                                                                            <label className={`mb-2 border bg-white border-gray-300 shadow-lg py-3 hover:border-indigo-500 flex flex-col flex-wrap justify-center item-center  ${foundObj ? " cursor-default" : "cursor-grab"}  relative `}>
                                                                                <div className="flex justify-center items-center mb-1">
                                                                                    <div className="mr-2 flex flex-col items-center">
                                                                                        {/* <div className="mb-1 mt-1">
                                                                                            <Checkbox
                                                                                            name={`isVisibleAtDashboard`}
                                                                                            id={`item0${index}`}
                                                                                            onChange={(e) => {
                                                                                                HandleAddWidget(WidgetData )}}
                                                                                            checked={WidgetData.isVisibleAtDashboard}
                                                                                            className={"form-checkbox ml-2"}
                                                                                            /> 
                                                                                        </div> */}
                                                                                        <div className={`mt-1 mb-1 ${WidgetData.isVisibleAtDashboard ? "cursor-default" : " cursor-grab"} `}>
                                                                                            <span className={`text-gray-700 ${WidgetData.isVisibleAtDashboard ? "cursor-default" : " cursor-grab"} `}><span className="material-icons-outlined">drag_indicator</span></span>
                                                                                        </div>

                                                                                        {
                                                                                            WidgetData.isVisibleAtDashboard && <div className="mt-1 mb-1 ">
                                                                                                <div type="button" className="text-red-600 cursor-pointer" onClick={(e) => {
                                                                                                    e.preventDefault()
                                                                                                    e.stopPropagation()
                                                                                                    HandleAddWidget(WidgetData, "delete")
                                                                                                }
                                                                                                }><span className="material-icons-outlined">delete</span></div>
                                                                                            </div>
                                                                                        }

                                                                                    </div>
                                                                                    <div className="flex items-center justify-center overflow-hidden box-content">
                                                                                        <Image src={WidgetData.widgetImagePath ? WidgetData.widgetImagePath : defaultImage} alt="" />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="text-center text-gray-700 font-semibold text-base ml-2 mr-2">
                                                                                    {WidgetData ? WidgetData.name : ''}
                                                                                </div>
                                                                            </label>
                                                                        </div>

                                                                        {
                                                                            snapshot.isDragging && (
                                                                                <>
                                                                                    <label className={`mb-2 border bg-white border-gray-300 shadow-lg px-3 py-3 hover:border-indigo-500 flex flex-wrap justify-center  ${foundObj ? " cursor-default" : "cursor-grab"} relative`}>
                                                                                        <div className="flex justify-between items-center mb-1 -ml-6">
                                                                                            <div className="mr-2 flex flex-col items-center">

                                                                                                <div className={`mt-1 mb-1 ${WidgetData.isVisibleAtDashboard ? "cursor-default" : " cursor-grab"} `}>
                                                                                                    <span className={`text-gray-700 ${WidgetData.isVisibleAtDashboard ? "cursor-default" : " cursor-grab"} `}><span className="material-icons-outlined">drag_indicator</span></span>
                                                                                                </div>

                                                                                                {
                                                                                                    WidgetData.isVisibleAtDashboard && <div className="mt-1 mb-1" >
                                                                                                        <div type="button" className="text-red-600"
                                                                                                        // onClick={(e) => {
                                                                                                        //     e.preventDefault()
                                                                                                        //     e.stopPropagation()
                                                                                                        //     // HandleAddWidget(WidgetData, "delete")
                                                                                                        // }}
                                                                                                        >
                                                                                                            <span className="material-icons-outlined">delete</span>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                }
                                                                                            </div>
                                                                                            <div className="flex items-center justify-center overflow-hidden box-content">
                                                                                                <Image src={WidgetData.widgetImagePath ? WidgetData.widgetImagePath : defaultImage} alt="" />
                                                                                            </div>                                          </div>
                                                                                        <div className="text-center text-gray-700 font-semibold text-base">
                                                                                            {WidgetData ? WidgetData.name : ''}
                                                                                        </div>
                                                                                    </label>
                                                                                </>
                                                                            )
                                                                        }
                                                                    </>
                                                                }}
                                                            </Draggable>
                                                        </Fragment>

                                                    })
                                                }
                                            </div> : <div className='flex items-center justify-center text-2xl font-bold align-center text-center py-10'>No Widgets found. <br /> <br /> Please contact to admin to add some Widgets.</div>
                                        }
                                    </div>
                                }}
                            </Droppable>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

const RightSideBarMain = React.memo(RightSideBar);

export default RightSideBarMain;
