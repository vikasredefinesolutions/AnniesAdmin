import React, { useState, useEffect, Fragment } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { CKEditor } from "ckeditor4-react";

import ColorPicker from "components/admin/content/common/ColorPicker";
import ElementMarginPaddingValues from "./ElementMarginPaddingValues";
import TextStyleElement from "./TextStyleElement";
import * as helper from "components/admin/content/helper/Helper";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";

const ElementAccordion = (props) => {
    const dispatch = useDispatch();
    const [showHide, setShowHide] = useState(false);
    const [iconStyle, setIconStyle] = useState("caret");
    const [secureStatus, setSecureStatus] = useState("No");
    const [titleBgOption, setTitleBgOption] = useState("None");
    const selectedObj = props.componentHtml.filter(
        (obj) => obj.uid == props.currentComponent,
    );
    const [acTitle, setAcTitle] = useState("");
    const [acDesc, setAcDesc] = useState("");
    const [acValArr, setAcValArr] = useState([]);
    const [pos, setPos] = useState(null);
    const [editBtn, setEditBtn] = useState(false);
    const [addBtn, setAddBtn] = useState(false);
    const [openStatus, setOpenStatus] = useState("No");
    const [editEnabled, setEditEnabled] = useState(false);
    const [titleBg, setTitleBg] = useState("");
    const [descriptionBg, setDescriptionBg] = useState("");
    const [titleBorderType, setTitleBorderType] = useState("none");
    const [titleBorderColor, setTitleBorderColor] = useState("");
    const [titleBorderSize, setTitleBorderSize] = useState("");
    const [borderRadius, setBorderRadius] = useState("");
    const [headlineTag, setHeadlineTag] = useState("");
    const [editor, setEditor] = useState(null);
    const bgPropertyName = props.variable; //selectedObj.length > 0 ? Object.keys(selectedObj[0].properties).find(key => selectedObj[0].properties[key] === "background") : [];

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
    /* When click on any component background component will reload and we have called function to set default properties */
    useEffect(() => {
        if (acDesc != "Begin") {
            let editor1 = (
                <CKEditor
                    id={"description"}
                    name={"description"}
                    initData={acDesc}
                    config={{
                        toolbar: [
                            ["Source"],
                            ["Styles"],
                            ["Bold", "Italic", "Underline"],

                            ["About"],
                        ],
                        extraPlugins: [
                            /* 'wordcount'  */
                        ],
                        removePlugins: ["image"],
                        extraAllowedContent: "div(*)",
                        allowedContent: true,
                    }}
                    onChange={({ event, editor }) => {
                        setAcDesc(editor.getData());
                    }}
                />
            );
            setEditor(editor1);
        }
    }, [acDesc]);

    useEffect(() => {
        displayAccordion();
        props.updateProperty(
            { type: "accordion", value: acValArr },
            bgPropertyName,
        );
    }, [acValArr]);

    useEffect(() => {
        let tmpVal = acValArr.map((acValue, index) => {
            return {
                index: acValue.index,
                title: acValue.title,
                titleheadtag: acValue.titleheadtag,
                desc: acValue.desc,
                openstatus: acValue.openstatus,
                secure: acValue.secure,
                icon: iconStyle,
            };
        }, []);
        setAcValArr(tmpVal);
    }, [iconStyle]);

    useEffect(() => {
        if (selectedObj.length > 0) {
            let tmpVal;
            let tmpTitleBg;
            let tmpTitleBgOption;
            let tmpTitleBorderType;
            let tmpTitleBorderColor;
            let tmpTitleBorderSize;
            let tmpBorderRadius;
            let tmpDescriptionBg;
            Object.entries(selectedObj[0].selected_Values).map(([key, value]) => {
                if (key == bgPropertyName) {
                    tmpVal = value;
                }
                if (key == bgPropertyName + "_title_bg") {
                    tmpTitleBg = value;
                }
                if (key == bgPropertyName + "_title_bg_option") {
                    tmpTitleBgOption = value;
                }
                if (key == bgPropertyName + "_title_border_type") {
                    tmpTitleBorderType = value;
                }
                if (key == bgPropertyName + "_title_border_color") {
                    tmpTitleBorderColor = value;
                }
                if (key == bgPropertyName + "_title_border_size") {
                    tmpTitleBorderSize = value;
                }
                if (key == bgPropertyName + "_title_border_radius") {
                    tmpBorderRadius = value;
                }
                if (key === bgPropertyName + "_description_bg") {
                    tmpDescriptionBg = value;
                }
            });
            if (tmpVal != undefined) {
                let attributes = tmpVal;
                setAcValArr(attributes.value);
                attributes.value.map((acValue, index) => {
                    if (index == 0) {
                        setIconStyle(acValue.icon);
                    }
                });
            } else {
                setAcValArr([]);
            }
            if (tmpTitleBg != undefined) {
                let attributes = tmpTitleBg;
                setTitleBg(attributes.value);
            } else {
                setTitleBg("");
            }
            if (tmpDescriptionBg) {
                setDescriptionBg(tmpDescriptionBg.value);
            }
            if (tmpTitleBgOption != undefined) {
                let attributes = tmpTitleBgOption;
                setTitleBgOption(attributes.value);
            } else {
                setTitleBgOption("None");
            }
            if (tmpTitleBorderType != undefined) {
                let attributes = tmpTitleBorderType;
                setTitleBorderType(attributes.value);
            } else {
                setTitleBorderType("None");
            }
            if (tmpTitleBorderColor != undefined) {
                let attributes = tmpTitleBorderColor;
                setTitleBorderColor(attributes.value);
            } else {
                setTitleBorderColor("None");
            }
            if (tmpTitleBorderSize != undefined) {
                let attributes = tmpTitleBorderSize;
                setTitleBorderSize(attributes.value);
            } else {
                setTitleBorderSize("");
            }
            if (tmpBorderRadius != undefined) {
                let attributes = tmpBorderRadius;
                setBorderRadius(attributes.value);
            } else {
                setBorderRadius("");
            }
        } else {
            setAcValArr([]);
        }
    }, [props.currentComponent]);

    const changeIconStyle = (val) => {
        setIconStyle(val);
    };

    const changeAcTitle = (event) => {
        setAcTitle(event.target.value);
    };

    const saveAccordion = () => {
        if (acTitle == "") {
            dispatch(
                setAlertMessage({
                    type: "success",
                    message: "Please add Title",
                }),
            );
        } else if (acDesc == "") {
            dispatch(
                setAlertMessage({
                    type: "success",
                    message: "Please add Description",
                }),
            );
        } else {
            setEditEnabled(false);
            saveAcValues();
        }
    };

    const saveAcValues = () => {
        setAcValArr((previous) => [
            ...previous,
            {
                index: `item-${acValArr.length + 1}`,
                title: acTitle,
                titleheadtag: headlineTag,
                desc: acDesc,
                openstatus: openStatus,
                icon: iconStyle,
                secure: secureStatus,
            },
        ]);
        setEditor(null);
        setAcDesc("");
        setHeadlineTag("");
        setAcTitle("");
        setOpenStatus("No");
        setAddBtn(false);
        //setIconStyle("caret");
    };

    const updateAccordion = () => {
        setEditEnabled(false);
        let tmpVal = acValArr.map((acValue, index) => {
            if (acValue.index == pos) {
                return {
                    index: acValue.index,
                    title: acTitle,
                    titleheadtag: headlineTag,
                    desc: acDesc,
                    openstatus: openStatus,
                    icon: iconStyle,
                    secure: secureStatus,
                };
            } else {
                return acValue;
            }
        });

        setAcValArr(tmpVal);
        setEditBtn(false);
        setAddBtn(true);
        setEditor(null);
        setAcDesc("");
        setHeadlineTag("");
        setAcTitle("");
        setOpenStatus("No");
        setSecureStatus("No");
        setIconStyle("");
    };

    const deleteAcc = (element) => {
        let tmpVal = [];
        acValArr.map((acValue, index) => {
            if (acValue.title != element.title) {
                tmpVal.push(acValue);
            }
        });
        setAcValArr(tmpVal);
    };

    const displayAccordion = () => {
        let tmpTitleBg;
        let tmpTitleBgOption;
        let tmpTitleBorderType;
        let tmpTitleBorderColor;
        let tmpTitleBorderSize;
        let descClass;
        let titleClass;
        let liClass;
        let titleColor;
        let descColor;
        let tmpBorderRadius;
        if (selectedObj.length > 0) {
            Object.entries(selectedObj[0].selected_Values).map(([key, value]) => {
                if (key == bgPropertyName + "_title_bg") {
                    tmpTitleBg = value.value;
                }
                if (key == bgPropertyName + "_title_bg_option") {
                    tmpTitleBgOption = value.value;
                }
                if (key == bgPropertyName + "_title_border_type") {
                    tmpTitleBorderType = value.value;
                }
                if (key == bgPropertyName + "_title_border_color") {
                    tmpTitleBorderColor = value.value;
                }
                if (key == bgPropertyName + "_title_border_size") {
                    tmpTitleBorderSize = value.value;
                }
                if (key == "AccordionTitle_final_class") {
                    titleClass = value.value;
                }
                if (key == "AccordionDescription_final_class") {
                    descClass = value.value;
                }
                if (key == "AccordionContainer_final_class") {
                    liClass = value.value;
                }
                if (key == "AccordionDescription_font_color") {
                    descColor = value.value;
                }
                if (key == "AccordionTitle_font_color") {
                    titleColor = value.value;
                }
                if (key == bgPropertyName + "_border_radius") {
                    tmpBorderRadius = value.value;
                }
            });
        }

        let liStyle = "";
        let titleStyle = "";
        if (tmpTitleBorderType === "box")
            liClass += " border-[" + tmpTitleBorderSize + "px]";
        else if (tmpTitleBorderType === "single")
            liClass += " border-b-[" + tmpTitleBorderSize + "px]";

        if (tmpBorderRadius !== "")
            liClass += " rounded-[" + tmpBorderRadius + "px]";

        if (tmpTitleBgOption === "Color")
            titleStyle += "background: " + tmpTitleBg + "; ";
        if (tmpTitleBorderColor !== "")
            liStyle += "border-color: " + tmpTitleBorderColor + "; ";

        let strAcHTML = "";
        acValArr.forEach(function (acValue) {
            strAcHTML +=
                "<li class='mb-4 overflow-hidden last:mb-0 " +
                liClass +
                "' style='" +
                liStyle +
                "'>";
            strAcHTML +=
                "<button class='w-full flex justify-between items-center text-left " +
                titleClass +
                "' style='" +
                titleStyle +
                "; color: " +
                titleColor +
                ";'>";
            strAcHTML += "<div class='text-defaule-text'>" + acValue.title + "</div>";
            strAcHTML +=
                '<span class="material-icons-outlined ml-3">' +
                helper.getSymbol(acValue.icon, acValue.openstatus) +
                "</span>";
            strAcHTML += "</button>";
            if (acValue.openstatus == "Yes")
                strAcHTML += '<div class="' + descClass + '">';
            else strAcHTML += '<div class="hidden ' + descClass + '">';
            strAcHTML +=
                '<div class="text-descrition" style="color: ' + descColor + ';">';
            strAcHTML += acValue.desc;
            strAcHTML += "</div>";
            strAcHTML += "</div>";
            strAcHTML += "</li>";
        });
        let x = ReactDOM.findDOMNode(
            props.refArray.current[props.currentComponent],
        );
        if (x && x.querySelectorAll("#FullAccordion").length > 0)
            x.querySelectorAll("#FullAccordion")[0].innerHTML = strAcHTML;

        if (x && x.querySelectorAll("#accordion").length > 0)
            x.querySelectorAll("#accordion")[0].innerHTML = strAcHTML;
    };

    const changeOpenStatus = (event) => {
        if (event.target.checked) {
            setOpenStatus("Yes");
        } else {
            setOpenStatus("No");
        }
    };

    const changeTitleBackgroundColor = (color) => {
        setTitleBg(color.hex);
        props.updateProperty(
            { type: "titlebg", value: color.hex },
            bgPropertyName + "_title_bg",
        );
    };

    const changeDescriptionBackgroundColor = (color) => {
        setDescriptionBg(color.hex);
        props.updateProperty(
            { type: "descriptionbg", value: color.hex },
            bgPropertyName + "_description_bg",
        );
    };

    const changeBgOption = (event) => {
        setTitleBgOption(event.target.value);
        props.updateProperty(
            { type: "titlebgoption", value: event.target.value },
            bgPropertyName + "_title_bg_option",
        );
    };

    const changeTitleBorderType = (event) => {
        setTitleBorderType(event.target.value);
        props.updateProperty(
            { type: "titlebordertype", value: event.target.value },
            bgPropertyName + "_title_border_type",
        );
    };

    const changeTitleBorderColor = (color) => {
        setTitleBorderColor(color.hex);
        props.updateProperty(
            { type: "titlebordercolor", value: color.hex },
            bgPropertyName + "_title_border_color",
        );
    };

    const changeTitleBorderSize = (event) => {
        setTitleBorderSize(event.target.value);
        props.updateProperty(
            { type: "titlebordersize", value: event.target.value },
            bgPropertyName + "_title_border_size",
        );
    };

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
            acValArr,
            result.source.index,
            result.destination.index,
        );
        setAcValArr(reorderedItem);
    };

    const changeBorderRadius = (event) => {
        setBorderRadius(event.target.value);
        props.updateProperty(
            { type: "borderradius", value: event.target.value },
            bgPropertyName + "_border_radius",
        );
    };

    const changeSecureStatus = (event) => {
        if (event.target.checked) {
            setSecureStatus("Yes");
        } else {
            setSecureStatus("No");
        }
    };

    const changeHeadlineTag = (event) => {
        setHeadlineTag(event.target.value);
        props.updateProperty(
            { type: "headertag", value: event.target.value },
            bgPropertyName + "_header_tag",
        );
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
                    <span>{props.compprop.title ?? "Accordion"}</span>
                    <span className="material-icons-outlined">expand_more</span>
                </button>

                <div
                    className={`property-content bg-white border-y border-b-0 border-neutral-200 ${showHide ? "" : "hidden"}`}
                >
                    <div className="mx-2 text-sm">
                        <div className="py-2 px-3 w-full">
                            <div className="mb-3 last:mb-0">
                                <div className="flex justify-between items-center mb-1 font-semibold">
                                    <div>Accordions</div>
                                </div>
                            </div>
                            <div className="mb-3 last:mb-0">
                                <DragDropContext onDragEnd={onDragEnd}>
                                    <Droppable droppableId="AccordionDroppable">
                                        {(provided, snapshot) => (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                className="my-2"
                                                id="accordions_list"
                                            >
                                                {acValArr.map((acValue, index) => (
                                                    <Draggable
                                                        key={acValue.index}
                                                        draggableId={`${acValue.index}`}
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
                                                                        <div className="">{acValue.title}</div>
                                                                    </div>
                                                                    {!editEnabled && (
                                                                        <>
                                                                            <div>
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={() => {
                                                                                        setEditEnabled(true);
                                                                                        setAcTitle(acValue.title);
                                                                                        setHeadlineTag(
                                                                                            acValue.titleheadtag,
                                                                                        );
                                                                                        setEditor(null);
                                                                                        setAcDesc(acValue.desc);
                                                                                        setPos(acValue.index);
                                                                                        setIconStyle(acValue.icon);
                                                                                        setAddBtn(false);
                                                                                        setEditBtn(true);
                                                                                        setOpenStatus(acValue.openstatus);
                                                                                        setSecureStatus(acValue.secure);
                                                                                    }}
                                                                                >
                                                                                    <span className="material-icons-outlined ml-3">
                                                                                        mode_edit
                                                                                    </span>
                                                                                </button>
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={() => {
                                                                                        deleteAcc(acValue);
                                                                                    }}
                                                                                >
                                                                                    <span className="material-icons-outlined ml-3">
                                                                                        delete_outline
                                                                                    </span>
                                                                                </button>
                                                                            </div>
                                                                        </>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                            </div>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                            </div>
                            <div className="mb-3 last:mb-0">
                                {!addBtn && (
                                    <button
                                        className="btn bg-indigo-500 hover:bg-indigo-600 text-white w-full"
                                        onClick={(event) => {
                                            setAddBtn(true);
                                        }}
                                    >
                                        + Add Accordion
                                    </button>
                                )}
                            </div>

                            {(addBtn || editBtn) && (
                                <>
                                    <div className="mb-3 last:mb-0">
                                        <div className="mb-3">
                                            <div className="flex justify-between items-center mb-1">
                                                <div>Accordion Title</div>
                                            </div>
                                            <div className="text-center relative overflow-hidden">
                                                <input
                                                    type="text"
                                                    className="w-full grow text-sm bg-white text-gray-700 border border-neutral-300 p-3 py-2 leading-tight focus:ring-0 focus:shadow-none focus:outline-none"
                                                    value={acTitle}
                                                    onChange={changeAcTitle}
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <div className="flex justify-between items-center mb-1">
                                                <div>
                                                    Make it Secure (Only Logged in User) &nbsp;
                                                    <input
                                                        onChange={changeSecureStatus}
                                                        type="checkbox"
                                                        x-model="checked"
                                                        checked={secureStatus === "Yes"}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="flex justify-between items-center mb-1">
                                            <div className="">Header Tag</div>
                                        </div>
                                        <div className="text-center relative overflow-hidden">
                                            <select
                                                onChange={changeHeadlineTag}
                                                value={headlineTag}
                                                className="w-full grow text-sm bg-gray-100 text-gray-700 border border-gray-200 p-3 py-2 leading-tight focus:ring-0 focus:shadow-none focus:outline-none focus:bg-white"
                                            >
                                                <option value="">None</option>
                                                <option value="H1">H1</option>
                                                <option value="H2">H2</option>
                                                <option value="H3">H3</option>
                                                <option value="H4">H4</option>
                                                <option value="H5">H5</option>
                                                <option value="H6">H6</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mb-3 last:mb-0">
                                        <div className="mb-3">
                                            <div className="flex justify-between items-center mb-1">
                                                <div>Description</div>
                                            </div>
                                            <div>{editor}</div>
                                        </div>
                                    </div>
                                    <div className="mb-3 last:mb-0">
                                        <div className="mb-3">
                                            <div className="mr-5 px-2">
                                                <label className="text-gray-500 flex items-center">
                                                    <input
                                                        onChange={changeOpenStatus}
                                                        type="checkbox"
                                                        x-model="checked"
                                                        checked={openStatus == "Yes" ? "checked" : ""}
                                                    />
                                                    <span className="ml-2">Open By Default</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3 last:mb-0">
                                        {addBtn && (
                                            <button
                                                className="btn bg-indigo-500 hover:bg-indigo-600 text-white w-full"
                                                onClick={saveAccordion}
                                            >
                                                + Submit
                                            </button>
                                        )}
                                        {editBtn && (
                                            <button
                                                className="btn bg-indigo-500 hover:bg-indigo-600 text-white w-full"
                                                onClick={updateAccordion}
                                            >
                                                + Submit
                                            </button>
                                        )}
                                    </div>
                                </>
                            )}

                            <div className="mb-3 last:mb-0">
                                <div className="flex justify-between items-center mb-1 font-semibold">
                                    <div>Accordion Container Formatting</div>
                                </div>
                            </div>
                            <ElementMarginPaddingValues
                                {...props}
                                variable="AccordionContainer"
                                type="accordion"
                            />
                            <div className="mb-3 last:mb-0">
                                <label htmlFor="" className="mb-1 block text-sm">
                                    Border Type
                                </label>
                                <div className="flex flex-wrap">
                                    <select
                                        value={titleBorderType}
                                        onChange={changeTitleBorderType}
                                        className="grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
                                    >
                                        <option value="none">None</option>
                                        <option value="box">Box</option>
                                        <option value="single">Single</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3 last:mb-0">
                                <label htmlFor="" className="mb-1 block text-sm">
                                    Border Color
                                </label>
                                <div className="flex flex-wrap">
                                    <ColorPicker
                                        changeBackgroundColor={changeTitleBorderColor}
                                        value={titleBorderColor}
                                    />
                                </div>
                            </div>
                            <div className="mb-3 last:mb-0">
                                <label htmlFor="" className="mb-1 block text-sm">
                                    Border Size
                                </label>
                                <div className="flex flex-wrap">
                                    <select
                                        onChange={changeTitleBorderSize}
                                        value={titleBorderSize}
                                        className="grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
                                    >
                                        <option value="">Select Border Size</option>
                                        {Array(11)
                                            .fill(null)
                                            .map((value, index) => {
                                                return (
                                                    <Fragment key={index}>
                                                        {index > 0 && (
                                                            <option value={index} key={index}>
                                                                {index}
                                                            </option>
                                                        )}
                                                    </Fragment>
                                                );
                                            })}
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3 last:mb-0">
                                <label htmlFor="" className="mb-1 block text-sm">
                                    Rounded Size
                                </label>
                                <div className="flex flex-wrap">
                                    <select
                                        value={borderRadius}
                                        onChange={changeBorderRadius}
                                        className="grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
                                    >
                                        <option value="">Select Border Radius</option>
                                        {Array(101)
                                            .fill(null)
                                            .map((value, index) => {
                                                return (
                                                    <option value={index} key={index}>
                                                        {index}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3 last:mb-0">
                                <div className="flex justify-between items-center mb-1 font-semibold">
                                    <div>Accordion Title Formatting</div>
                                </div>
                            </div>

                            <div className="mb-3 last:mb-0">
                                <div className="flex justify-between items-center mb-1">
                                    Bakground
                                </div>
                                <div className="flex flex-wrap divide-x divide-neutral-300 border border-neutral-300 overflow-hidden">
                                    <button
                                        value="None"
                                        onClick={changeBgOption}
                                        className={`w-1/2 px-2 py-1.5 inline-flex justify-center items-center text-sm focus:ring-0 focus:shadow-none focus:outline-none ${titleBgOption === "None" ? "bg-[#F1F5F9]" : "bg-white"}`}
                                        title="None"
                                    >
                                        None
                                    </button>
                                    <button
                                        value="Color"
                                        onClick={changeBgOption}
                                        className={`w-1/2 px-2 py-1.5 inline-flex justify-center items-center text-sm focus:ring-0 focus:shadow-none focus:outline-none ${titleBgOption === "Color" ? "bg-[#F1F5F9]" : "bg-white"}`}
                                        title="Color"
                                    >
                                        Color
                                    </button>
                                </div>
                            </div>
                            {titleBgOption === "Color" && (
                                <>
                                    <div className="mb-3 last:mb-0">
                                        <div className="flex justify-between items-center mb-1">
                                            Bakground Color
                                        </div>
                                        <div className="flex flex-wrap">
                                            <ColorPicker
                                                changeBackgroundColor={changeTitleBackgroundColor}
                                                value={titleBg}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                            <TextStyleElement
                                {...props}
                                variable="AccordionTitle"
                                type="accordion"
                            />
                            <ElementMarginPaddingValues
                                {...props}
                                variable="AccordionTitle"
                                type="accordion"
                            />

                            <div className="mb-3 last:mb-0">
                                <div className="flex justify-between items-center mb-1 font-semibold">
                                    <div>Accordion Description Formatting</div>
                                </div>
                            </div>
                            <TextStyleElement
                                {...props}
                                variable="AccordionDescription"
                                type="accordion"
                            />
                            <div className="mb-3 last:mb-0">
                                <div className="flex justify-between items-center mb-1">
                                    Bakground Color
                                </div>
                                <div className="flex flex-wrap">
                                    <ColorPicker
                                        changeBackgroundColor={changeDescriptionBackgroundColor}
                                        value={descriptionBg}
                                    />
                                </div>
                            </div>
                            <ElementMarginPaddingValues
                                {...props}
                                variable="AccordionDescription"
                                type="accordion"
                            />
                            <div className="mb-3 last:mb-0">
                                <label htmlFor="" className="mb-1 block text-sm">
                                    Icon *
                                </label>
                                <div className="flex flex-wrap">
                                    <select
                                        value={iconStyle}
                                        onChange={(event) => {
                                            changeIconStyle(event.target.value);
                                        }}
                                        className="w-full grow text-sm bg-white text-gray-700 border border-neutral-300 p-3 py-2 leading-tight focus:ring-0 focus:shadow-none focus:outline-none"
                                    >
                                        <option value="caret">Caret</option>
                                        <option value="plus">Plus</option>
                                        <option value="add">Plus without Circle</option>
                                        <option value="addcircle">Filled Plus</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ElementAccordion;
