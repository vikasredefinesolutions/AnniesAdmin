import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ImageFile from "components/admin/content/common/ImageFile";
import Input from "components/admin/content/common/Input";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { randomNumber } from "components/admin/content/helper/Helper";
import * as helper from "components/admin/content/helper/Helper";
import ToggleButton from "components/admin/content/common/ToggleButton";
import * as ThemeVariable from "components/admin/content/helper/ThemeVariables";
import ImageGallery from "./../modal/imageGalleryModel/ImageGallery";

const ElementTabbing = (props) => {
    const [showHide, setShowHide] = useState(false);
    const [showData, setShowData] = useState(false);
    const [showBannerData, setShowBannerData] = useState(false);
    const [addBannerBtn, setAddBannerBtn] = useState(false);
    const [editBannerBtn, setEditBannerBtn] = useState(false);
    const [addBtn, setAddBtn] = useState(false);
    const [editBtn, setEditBtn] = useState(false);
    const [tabPos, setTabPos] = useState(0);
    const [tabImagePos, setTabImagePos] = useState(0);
    const [indArr, setIndArr] = useState([]);

    const [perRow, setPerRow] = useState(4);

    const [tabName, setTabName] = useState("");
    const [bgStyle, setBgStyle] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [imageAlt, setImageAlt] = useState("");
    const [imageLink, setImageLink] = useState("");
    const [bottomTabbing, setBottomTabbing] = useState("On");
    const [tabs, setTabs] = useState([]);
    const [tabContents, setTabContents] = useState([]);
    const [OpenImageModel, setOpenImageModel] = useState(false);

    const changeBgStyle = (event) => {
        setBgStyle(event.target.value);
    };

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

    const selectedObj = props.componentHtml.filter(
        (obj) => obj.uid == props.currentComponent,
    );
    let attributes = {};

    const bgPropertyName = props.variable; //selectedObj.length > 0 ? Object.keys(selectedObj[0].properties).find(key => selectedObj[0].properties[key] === "background") : [];

    useEffect(() => {
        /* Here when change component,values are not retiNING */
        if (selectedObj.length > 0) {
            let tmpVal;
            let tmpBottomTabbing;
            Object.entries(selectedObj[0].selected_Values).map(([key, value]) => {
                if (key == bgPropertyName) {
                    tmpVal = value;
                }
                if (key == bgPropertyName + "_bottom_tabbing") {
                    setBottomTabbing(value.value);
                }
            });
            if (tmpVal != undefined) {
                setTabs(tmpVal.value);
            }
        }
    }, [props.currentComponent]);

    const onElementImageChange = (url) => {
        setImageURL(url);
    };

    const updateAltTag = (val) => {
        setImageAlt(val);
    };

    const updateLink = (val) => {
        setImageLink(val);
    };

    const saveTab = () => {
        let tmpArr = updateTabArray();
        setTabs((previous) => [...previous, tmpArr]);
        setShowData(false);
        setTabName("");
        setBgStyle("");
    };

    useEffect(() => {
        props.updateProperty(
            { type: "dynamictabdata", value: tabs },
            bgPropertyName,
        );
        let x = ReactDOM.findDOMNode(
            props.refArray.current[props.currentComponent],
        );
        helper.displayTabbing(tabs, x, bottomTabbing);
    }, [tabs, bottomTabbing, tabContents]);

    const updateTabArray = () => {
        let tmpArr = {};
        let rndNumber = randomNumber(indArr);
        setIndArr((previous) => [...previous, rndNumber]);
        Object.assign(tmpArr, { index: rndNumber });
        Object.assign(tmpArr, { title: tabName });
        Object.assign(tmpArr, { perRow: perRow });
        Object.assign(tmpArr, { color: bgStyle });
        return tmpArr;
    };

    const deleteData = (element) => {
        let tmpVal = [];
        tabs.map((acValue, index) => {
            if (acValue.title != element.title) {
                tmpVal.push(acValue);
            }
        });
        setTabs(tmpVal);
    };

    const editData = (element) => {
        setShowData(true);
        setTabPos(element.index);
        setTabName(element.title);
        setBgStyle(element.color);
        setPerRow(element.perRow);
        setAddBtn(false);
        setEditBtn(true);

        setTabContents(element.contents ?? []);
    };

    const updateTab = () => {
        setEditBtn(false);
        setShowData(false);
        let tmpVal = tabs.map((acValue, index) => {
            if (acValue.index == tabPos) {
                return {
                    index: acValue.index,
                    title: tabName,
                    color: bgStyle,
                    contents: tabContents,
                    perRow: perRow,
                };
            } else {
                return acValue;
            }
        });
        setTabs(tmpVal);
        setTabName("");
        setBgStyle("");
        setPerRow(4);
        setTabContents([]);
    };

    /* Description field code ends */

    const reOrder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        const reorderedItem = reOrder(
            tabs,
            result.source.index,
            result.destination.index,
        );
        setTabs(reorderedItem);
    };

    const onDragImageEnd = (result) => {
        if (!result.destination) {
            return;
        }
        const reorderedItem = reOrder(
            tabContents,
            result.source.index,
            result.destination.index,
        );
        setTabContents(reorderedItem);
    };

    const changeTabName = (event) => {
        setTabName(event.target.value);
    };

    const editImageData = (element) => {
        setShowBannerData(true);
        setTabImagePos(element.index);
        setImageAlt(element.alt);
        setImageLink(element.link);
        setImageURL(element.image);
        setEditBannerBtn(true);
    };

    const deleteImageData = (element) => {
        let tmpVal = [];
        tabContents.map((acValue, index) => {
            if (acValue.index != element.index) {
                tmpVal.push(acValue);
            }
        });

        setTabContents(tmpVal);
    };

    const updateImage = () => {
        setEditBannerBtn(false);
        setShowBannerData(false);
        let tmpVal = tabContents.map((acValue, index) => {
            if (acValue.index == tabImagePos) {
                return {
                    index: acValue.index,
                    image: imageURL,
                    alt: imageAlt,
                    link: imageLink,
                };
            } else {
                return acValue;
            }
        });

        setTabContents(tmpVal);

        setImageAlt("");
        setImageLink("");
        setImageURL("");
    };

    const saveImage = () => {
        let tmpArr = updateImageArray();
        setTabContents((previous) => [...previous, tmpArr]);
        setShowBannerData(false);
        setAddBannerBtn(false);
        setEditBannerBtn(false);
        setImageURL("");
        setImageAlt("");
        setImageLink("");
    };

    const updateImageArray = () => {
        let tmpArr = {};
        let rndNumber = randomNumber(indArr);
        setIndArr((previous) => [...previous, rndNumber]);
        Object.assign(tmpArr, { index: rndNumber });
        Object.assign(tmpArr, { image: imageURL });
        Object.assign(tmpArr, { alt: imageAlt });
        Object.assign(tmpArr, { link: imageLink });
        return tmpArr;
    };

    const handleToggleChangeEvent = (data) => {
        let val;
        if (data.target.checked) val = "On";
        else val = "Off";
        props.updateProperty(
            { type: "bottomtabbing", value: val },
            bgPropertyName + "_bottom_tabbing",
        );
        setBottomTabbing(val);
    };

    const changePerRow = (event) => {
        setPerRow(event.target.value);
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
                    <span className="">
                        {props.compprop.title ?? "Dynamic Properties"}
                    </span>
                    <span className="material-icons-outlined">expand_more</span>
                </button>
                <div
                    className={`property-content bg-white border-y border-b-0 border-neutral-200 ${showHide ? "" : "hidden"}`}
                >
                    <div className="mx-2 text-sm">
                        <div className="mb-3 mt-5">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <strong>Show Bototm Tabbing</strong>
                                    </div>
                                </div>
                                <div className="flex items-center" x-data="{ checked: true }">
                                    <div className="w-16 relative">
                                        <ToggleButton
                                            id={`bottomTabbing`}
                                            defaultValue={bottomTabbing}
                                            onChange={handleToggleChangeEvent}
                                            name={`bototmTabbing`}
                                            on={"On"}
                                            off={"Off"}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {!showData && (
                            <div className="mb-4 last:mb-0">
                                {tabs.length > 0 && <p className="font-bold">Added Data</p>}
                                <div className="mb-3 last:mb-0">
                                    <DragDropContext onDragEnd={onDragEnd}>
                                        <Droppable droppableId="Draggable-banner">
                                            {(provided, snapshot) => (
                                                <div
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                    className="my-2"
                                                    id="htmlData"
                                                >
                                                    {tabs != undefined &&
                                                        tabs.length > 0 &&
                                                        tabs.map((acValue, index) => {
                                                            return (
                                                                <Draggable
                                                                    key={`item-${acValue.index}`}
                                                                    draggableId={`item-${acValue.index}`}
                                                                    index={index}
                                                                >
                                                                    {(provided, snapshot) => (
                                                                        <div
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            className="p-2 border border-neutral-200 border-b-0 last:border-b flex items-center justify-between"
                                                                        >
                                                                            <div className="flex items-center justify-between w-full">
                                                                                <div className="flex items-center">
                                                                                    <span className="material-icons-outlined">
                                                                                        drag_indicator
                                                                                    </span>
                                                                                    {acValue.title}
                                                                                    <span
                                                                                        className={acValue.color}
                                                                                        style={{
                                                                                            width: "50px",
                                                                                            height: "10px",
                                                                                            marginLeft: "5px",
                                                                                        }}
                                                                                    ></span>
                                                                                </div>
                                                                                <div>
                                                                                    <a
                                                                                        href="javascript:void(0)"
                                                                                        onClick={() => {
                                                                                            editData(acValue);
                                                                                        }}
                                                                                    >
                                                                                        <span className="material-icons-outlined ml-3">
                                                                                            mode_edit
                                                                                        </span>
                                                                                    </a>
                                                                                    <a
                                                                                        href="javascript:void(0)"
                                                                                        onClick={() => {
                                                                                            deleteData(acValue);
                                                                                        }}
                                                                                    >
                                                                                        <span className="material-icons-outlined ml-3 text-red">
                                                                                            delete
                                                                                        </span>
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </Draggable>
                                                            );
                                                        })}
                                                </div>
                                            )}
                                        </Droppable>
                                    </DragDropContext>
                                </div>
                            </div>
                        )}
                        {!showData && (
                            <>
                                <div className="mb-3 text-center last:mb-0">
                                    <button
                                        className="btn bg-indigo-500 hover:bg-indigo-600 text-white mt-2"
                                        onClick={(event) => {
                                            setShowData(true);
                                            setAddBtn(true);
                                        }}
                                    >
                                        + Add New Tab
                                    </button>
                                </div>
                            </>
                        )}

                        {showData && (
                            <>
                                <div className="mb-3">
                                    <div className="flex justify-between items-center mb-1">
                                        <div>Tab Name</div>
                                    </div>

                                    <div className="text-center relative overflow-hidden">
                                        <input
                                            type="text"
                                            className="w-full grow text-sm bg-white text-gray-700 border border-neutral-300 p-3 py-2 leading-tight focus:ring-0 focus:shadow-none focus:outline-none"
                                            defaultValue={tabName}
                                            onChange={changeTabName}
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <div className="flex justify-between items-center mb-1">
                                        <div>Number of Image per Row</div>
                                    </div>

                                    <div className="text-center relative overflow-hidden">
                                        <select
                                            value={perRow}
                                            onChange={changePerRow}
                                            className="grow h-9 w-full px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                        >
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-3 last:mb-0">
                                    <label htmlFor="" className="mb-1 block text-sm">
                                        Tab Color
                                    </label>
                                    <div className="flex flex-wrap">
                                        <div className="w-2/3">
                                            <select
                                                value={bgStyle}
                                                onChange={changeBgStyle}
                                                className="grow h-9 w-full px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                            >
                                                <option value="">Select Background Style</option>
                                                {ThemeVariable.bgClasses.map((value, index) => (
                                                    <option value={value.value} key={index}>
                                                        {value.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="w-1/3 px-1.5">
                                            <button className={`w-full ${bgStyle} pt-[6px] pb-[6px]`}>
                                                Sample
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {editBtn && (
                                    <>
                                        {!showBannerData && tabContents.length > 0 && (
                                            <div className="mb-4 last:mb-0">
                                                <p className="font-bold">Tab Content</p>
                                                <div className="mb-3 last:mb-0">
                                                    <DragDropContext onDragEnd={onDragImageEnd}>
                                                        <Droppable droppableId="Draggable-banner">
                                                            {(provided, snapshot) => (
                                                                <div
                                                                    {...provided.droppableProps}
                                                                    ref={provided.innerRef}
                                                                    className="my-2"
                                                                    id="htmlData"
                                                                >
                                                                    {tabContents != undefined &&
                                                                        tabContents.length > 0 &&
                                                                        tabContents.map((acValue, index) => {
                                                                            return (
                                                                                <Draggable
                                                                                    key={`item-${acValue.index}`}
                                                                                    draggableId={`item-${acValue.index}`}
                                                                                    index={index}
                                                                                >
                                                                                    {(provided, snapshot) => (
                                                                                        <div
                                                                                            ref={provided.innerRef}
                                                                                            {...provided.draggableProps}
                                                                                            {...provided.dragHandleProps}
                                                                                            className="p-2 border border-neutral-200 border-b-0 last:border-b flex items-center justify-between"
                                                                                        >
                                                                                            <div className="flex items-center justify-between w-full">
                                                                                                <div className="flex items-center">
                                                                                                    <span className="material-icons-outlined">
                                                                                                        drag_indicator
                                                                                                    </span>
                                                                                                    <img
                                                                                                        src={acValue.image}
                                                                                                        style={{
                                                                                                            maxWidth: "100px",
                                                                                                            maxHeight: "100px",
                                                                                                        }}
                                                                                                    />
                                                                                                </div>
                                                                                                <div>
                                                                                                    <a
                                                                                                        href="javascript:void(0)"
                                                                                                        onClick={() => {
                                                                                                            editImageData(acValue);
                                                                                                        }}
                                                                                                    >
                                                                                                        <span className="material-icons-outlined ml-3">
                                                                                                            mode_edit
                                                                                                        </span>
                                                                                                    </a>
                                                                                                    <a
                                                                                                        href="javascript:void(0)"
                                                                                                        onClick={() => {
                                                                                                            deleteImageData(acValue);
                                                                                                        }}
                                                                                                    >
                                                                                                        <span className="material-icons-outlined ml-3 text-red">
                                                                                                            delete
                                                                                                        </span>
                                                                                                    </a>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    )}
                                                                                </Draggable>
                                                                            );
                                                                        })}
                                                                </div>
                                                            )}
                                                        </Droppable>
                                                    </DragDropContext>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}

                                {editBtn && !showBannerData && (
                                    <>
                                        <div className="mb-3 text-center last:mb-0">
                                            <button
                                                className="btn bg-indigo-500 hover:bg-indigo-600 text-white mt-2"
                                                onClick={(event) => {
                                                    setShowBannerData(true);
                                                    setAddBannerBtn(true);
                                                }}
                                            >
                                                + Add New Image
                                            </button>
                                        </div>
                                    </>
                                )}

                                {showBannerData && (
                                    <>
                                        <div className="mb-3">
                                            <div className="flex justify-between items-center mb-1">
                                                <div>Image</div>
                                            </div>

                                            <div className="text-center relative overflow-hidden">
                                                <ImageFile
                                                    type="file"
                                                    className="sr-only"
                                                    name={`image1`}
                                                    id={`image1`}
                                                    buttonName="Choose Image"
                                                    folderpath={props.imagePath}
                                                    ModelOpen={true}
                                                    setOpenImageModel={setOpenImageModel}
                                                    deleteImage={() => {
                                                        onElementImageChange('')
                                                    }}
                                                    // onChange={onElementImageChange}
                                                    edibtn={true}
                                                    url={imageURL}
                                                />

                                                {OpenImageModel && (
                                                    <ImageGallery
                                                        setOpenImageModel={setOpenImageModel}
                                                        onElementImageChange={onElementImageChange}
                                                        folderpath={props.imagePath}
                                                        OpenImageModel={OpenImageModel}
                                                        from={"Element Tabbing"}
                                                        ImageUploadName={"image1"}
                                                        ImageUploadId={"image1"}
                                                        ImageUrl={imageURL}
                                                    />
                                                )}
                                            </div>
                                        </div>

                                        <div className="mb-3 last:mb-0">
                                            <label htmlFor="" className="mb-1 block text-sm">
                                                Image Alt
                                            </label>
                                            <div className="text-center relative overflow-hidden">
                                                <Input
                                                    onChange={(event) => {
                                                        updateAltTag(event.target.value);
                                                    }}
                                                    type="text"
                                                    className="w-full grow text-sm bg-white text-gray-700 border border-gray-200 p-3 py-2 leading-tight focus:ring-0 focus:shadow-none focus:outline-none"
                                                    defaultValue={imageAlt}
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-3 last:mb-0">
                                            <div className="mb-3">
                                                <div className="flex justify-between items-center mb-1">
                                                    <div>Link (optional)</div>
                                                </div>
                                                <div className="text-center relative overflow-hidden">
                                                    <Input
                                                        onChange={(event) => {
                                                            updateLink(event.target.value);
                                                        }}
                                                        type="text"
                                                        className="w-full grow text-sm bg-white text-gray-700 border border-gray-200 p-3 py-2 leading-tight focus:ring-0 focus:shadow-none focus:outline-none"
                                                        defaultValue={imageLink}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-4 last:mb-0">
                                            {addBannerBtn && (
                                                <button
                                                    className="w-full py-[6px] bg-green-500 hover:bg-indigo-600 text-white mt-2"
                                                    onClick={saveImage}
                                                >
                                                    + Add Image
                                                </button>
                                            )}
                                            {editBannerBtn && (
                                                <button
                                                    className="w-full py-[6px] bg-green-500 hover:bg-indigo-600 text-white mt-2"
                                                    onClick={updateImage}
                                                >
                                                    + Update Image
                                                </button>
                                            )}
                                        </div>
                                    </>
                                )}

                                <div className="mb-4 last:mb-0">
                                    {addBtn && (
                                        <button
                                            className="w-full py-[6px] bg-indigo-500 hover:bg-indigo-600 text-white mt-2"
                                            onClick={saveTab}
                                        >
                                            + Add
                                        </button>
                                    )}
                                    {editBtn && (
                                        <button
                                            className="w-full py-[6px] bg-indigo-500 hover:bg-indigo-600 text-white mt-2"
                                            onClick={updateTab}
                                        >
                                            + Update
                                        </button>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ElementTabbing;
