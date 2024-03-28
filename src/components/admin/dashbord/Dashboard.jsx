import React, { useEffect, useState, Fragment, useCallback } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";

import { ValidationMsgs } from "global/ValidationMessages";
import { DurationFilter, anniesAnnualData } from "global/Enum";

import DashboardWidgetServices from "services/admin/dashboardWidget/DashboardWidgetServices";
import { serverError, RowCreaterHelper, TitleNameHelper } from "services/common/helper/Helper";

import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";

import Messages from "components/common/alerts/messages/Index";
import Select from "components/common/formComponent/Select";

import SingleWidgetReturner from "./subComponents/SingleWidgetReturner"
import RightSideBar from "./subComponents/RightSideBar"
import Cards from "./Cards";

const Dashboard = () => {
  const dispatch = useDispatch();

  const permission = useSelector((store) => store?.permission);
  const userData = useSelector((store) => store?.user);
  const location = useSelector((store) => store?.location);

  const [extraDropDownData, setExtraDropDownData] = useState("1");
  const [extraDataFromDate, setExtraDataFromDate] = useState("Last 24 Hours");
  const [showListing, setshowListing] = useState(false);
  const [DashBoardWidgets, setDashBoardWidgets] = useState([]);
  const [draggedData, setDraggedData] = useState({ row_1: [] });
  const [ShowRightSideBar, setShowRightSideBar] = useState(false)

  const store = anniesAnnualData.storeId;

  const getDashBoardWidgetsList = () => {
    dispatch(setAddLoading(true))

    DashboardWidgetServices.getWidgetListByUserId({ id: userData.id, isSuperUser: userData.isSuperUser }).then((res) => {
      dispatch(setAddLoading(false))
      if (res.data.success && res.data.data) {
        let DATA = res.data.data.sort(function (a, b) {
          return a.displayOrder - b.displayOrder;
        });

        // this api is going to take 2 paremeter , 
        // first sorted array based on the widget array and based on its sequence 
        // second a setter function which will set the splitted rows inside that and make the dropable area object
        RowCreaterHelper(DATA, setDraggedData)
        setDashBoardWidgets(DATA);
      }
    }).catch(() => {
      dispatch(setAddLoading(false))
    })
  }

  const HandleAddWidget = (WidgetData, whatToDo) => {
    const ourPayload = {
      id: WidgetData?.source?.index || 0,
      widgetId: WidgetData?.draggableId || 0,
      isVisibleAtDashboard: true,
      displayOrder: 1,
      position: "",
      rowVersion: ""
    }

    if (whatToDo === "delete") {
      ourPayload["id"] = WidgetData.id;
      ourPayload["isVisibleAtDashboard"] = false
      ourPayload["widgetId"] = WidgetData.widgetId
    }

    dispatch(setAddLoading(true))

    DashboardWidgetServices.createWidgetUserLink({
      widgetModel: {
        userId: userData.id,
        ...location,
        widgetList: [ourPayload]
      },
      isSuperUser: userData.isSuperUser
    }).then((res) => {
      if (res.data.success) {
        dispatch(
          setAlertMessage({
            type: "success",
            message: `Widget ${whatToDo === "delete" ? "deleted" : "added"} successfully.`,
          })
        );
        getDashBoardWidgetsList();
      } else {
        dispatch(
          setAlertMessage({ type: "danger", message: serverError(res) })
        );
      }
      dispatch(setAddLoading(false))
    }).catch((errors) => {
      dispatch(
        setAlertMessage({ type: "danger", message: "Widget not added successfully" })
      );
      dispatch(setAddLoading(false))
    })
  }

  const tilesVisible = (url) => {
    url = '/' + url.replace(/^\/+|\/+$/g, '');
    if (permission && permission?.allPermission?.[url?.toLowerCase()]) {
      return permission?.allPermission?.[url?.toLowerCase()];
    }
  };

  const handleRightSideBar = () => {
    setShowRightSideBar((prevState) => !prevState)
  }

  // a little function to help us with reordering the result
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;

    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    const widgetDataOnDemend = result.draggableId.split("_")

    if (!destination) { return }

    switch (source.droppableId) {
      case destination.droppableId:
        setDraggedData((prevData) => ({
          ...prevData,
          [destination.droppableId]:
            reorder(
              draggedData[source.droppableId],
              source.index,
              destination.index
            )
        }));

        orderChangeHandler(widgetDataOnDemend[1], widgetDataOnDemend[2], widgetDataOnDemend[3], destination.index)

        break;

      case 'all_widgets':
        HandleAddWidget(result, "add")
        break;

      default:
        setDraggedData((prevData) => ({
          ...prevData, ...move(
            draggedData[source.droppableId],
            draggedData[destination.droppableId],
            source,
            destination
          )
        }));

        orderChangeHandler(widgetDataOnDemend[1], widgetDataOnDemend[2], widgetDataOnDemend[3], destination.index)

        break;
    }
  };

  const orderChangeHandler = (widgetId, userId, oldSequence, newSequence) => {
    dispatch(setAddLoading(true))

    const newSequenceIndex = newSequence

    DashboardWidgetServices.changeSequence({
      "widgetModel": {
        id: widgetId,
        userId: userId,
        rowVersion: "string",
        ...location,
        oldSequence: parseInt(oldSequence),
        newSequence: newSequenceIndex,
      }
    }).then((response) => {
      if (response.data.data) {
        dispatch(
          setAlertMessage({
            type: "success",
            message: ValidationMsgs.navigation.sequenceChanged,
          })
        );
        getDashBoardWidgetsList();
      } else {
        dispatch(
          setAlertMessage({
            type: "danger",
            message: serverError(response),
          })
        );
      }
      dispatch(setAddLoading(false))

    }).catch(() => {
      dispatch(
        setAlertMessage({
          type: "danger",
          message: ValidationMsgs.navigation.sequenceNotChanged,
        })
      )
      dispatch(setAddLoading(false))
    });
  }

  useEffect(() => {
    getDashBoardWidgetsList()
  }, [])

  return (
    <>
      <title className="col-span-4">{TitleNameHelper({ defaultTitleName: "Dashboard" })}</title>
      <div >
        <Messages />
        <div id="contentbody" className="relative w-full max-h-[calc(100%-4rem)] flex flex-col flex-1" >
          <DragDropContext onDragEnd={onDragEnd}>
            <main className={`flex`} >
              <div className="px-4 sm:px-6 lg:px-8 py-8 w-full mx-auto grow">
                <div className="flex flex-wrap justify-end mb-6 gap-2 sticky top-0 z-20 pb-2 pt-2 bg-slate-100 ">
                  <div className="flex flex-wrap items-center gap-2">
                    <Select
                      className="w-[250px] font-semibold"
                      options={DurationFilter}
                      onChange={(e) => {
                        setExtraDropDownData(e.value);
                        setExtraDataFromDate(e.label);
                      }}
                      name="Duration Filter"
                      defaultValue={extraDropDownData}
                      isClearable={false}
                    />
                  </div>
                  <button type="button" className="btn bg-indigo-500 hover:bg-indigo-600 text-white rounded-md" onClick={handleRightSideBar}>
                    <span>Add Dashboard Widget</span>
                  </button>
                </div>
                {/* <!-- Cards --> */}
                <div className="grid grid-cols-12 gap-4 mb-6">
                  <Cards tilesVisible={tilesVisible} />
                </div>

                <div className="w-full min-h-[43vh]">
                  {Object.keys(draggedData).map((currentRow, rowIdIndex) => {
                    return <Fragment key={rowIdIndex}>
                      <Droppable droppableId={currentRow} direction="horizontal" key={currentRow}>
                        {(provided, snapshot) => (
                          <div ref={provided.innerRef}
                            className={`w-full grid grid-cols-12 p-4 border-dashed border-2 border-gray-150 -mt-[2px]  ${snapshot.isDraggingOver ? " bg-gray-50" : "border-neutral-200"}`}
                            {...provided.droppableProps}
                          >
                            {showListing ?
                              <>
                                {
                                  (rowIdIndex === 0 && snapshot.isDraggingOver || true) ? <div className="flex justify-center items-center min-h-[43vh] mt-4 col-span-12 text-3xl font-bold">Drop Here</div> : <></>
                                }
                              </> :
                              draggedData[currentRow].length > 0 ? draggedData[currentRow].filter((obj) => obj?.isVisibleAtDashboard).map((currentWidgetFromDb, index) => {

                                if (!currentWidgetFromDb.widgetWidth) {
                                  currentWidgetFromDb.widgetWidth = 6
                                }

                                return (
                                  <Fragment key={index}>
                                    <Draggable key={`${currentWidgetFromDb.codeName}_${currentWidgetFromDb.id}`} draggableId={`${currentWidgetFromDb.codeName}_${currentWidgetFromDb.id}_${currentWidgetFromDb.userId}_${currentWidgetFromDb.displayOrder}`} index={currentWidgetFromDb.uniqIndex}>
                                      {(provided) => (
                                        <div className={`select-none grid-cols-3 overflow-x-hidden border-dashed pr-4 pl-4 border-b-0 border-r-2 border-gray-150 flex ${currentWidgetFromDb.className}`}
                                          style={{
                                            gridColumn: `span ${currentWidgetFromDb.widgetWidth} / span ${currentWidgetFromDb.widgetWidth}`
                                          }}
                                        >
                                          <SingleWidgetReturner store={store} item={currentWidgetFromDb} provided={provided} DashBoardWidgets={DashBoardWidgets} extraDropDownData={extraDropDownData} extraDataFromDate={extraDataFromDate} />
                                        </div>
                                      )}
                                    </Draggable>
                                  </Fragment>
                                )
                              }) : <>
                                {(Object.keys(draggedData).length === 1 && draggedData[currentRow].length <= 0) && <div className={`flex justify-center items-center min-h-[43vh] col-span-12 text-3xl font-bold bg-white shadow-lg rounded-md border select-none ${snapshot.isDraggingOver ? " bg-gray-50 " : "border-neutral-200"}`} >
                                  Drop Here
                                </div>
                                }
                              </>
                            }
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </Fragment>
                  })
                  }
                </div>
              </div>

              {/* right side bar */}
              <Fragment>
                <RightSideBar ShowRightSideBar={ShowRightSideBar} handleRightSideBar={handleRightSideBar} DashBoardWidgets={DashBoardWidgets} HandleAddWidget={HandleAddWidget} showListing={showListing} setshowListing={setshowListing} />
              </Fragment>
            </main >
          </DragDropContext>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
