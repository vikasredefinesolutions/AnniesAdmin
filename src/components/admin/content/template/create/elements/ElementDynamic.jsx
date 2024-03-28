import React, { Fragment, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { CKEditor } from "ckeditor4-react";

import ColorPicker from "components/admin/content/common/ColorPicker";
import ImageFile from "components/admin/content/common/ImageFile";
import Input from "components/admin/content/common/Input";
import SliderCustom from "components/admin/content/common/SliderCustom";
import * as dynamicFunctions from "components/admin/content/helper/DynamicFunctions";
import { randomNumber } from "components/admin/content/helper/Helper";
import * as ThemeVariable from "components/admin/content/helper/ThemeVariables";

import ElementPaddingValues from "./ElementPaddingValues";
import ElementMarginValues from "./ElementMarginValues";
import TextStyleElement from "./TextStyleElement";
import ElementIconBrowser from "./ElementIconBrowser";
import ImageGallery from "./../modal/imageGalleryModel/ImageGallery";

const ElementDynamic = (props) => {
    const [iconFontSize, setIconFontSize] = useState("");
    const [iconFontColor, setIconFontColor] = useState("");
    const [iconFontWeight, setIconFontWeight] = useState("");
    const [iconAlignment, setIconAlignment] = useState("");

    const [editor, setEditor] = useState(null);
    const [acDesc, setAcDesc] = useState("");
    const [letterSpacing, setLetterSpacing] = useState("");
    const [showHide, setShowHide] = useState(false);
    const [indArr, setIndArr] = useState([]);
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

    useEffect(() => {
        if (acDesc != "Begin" && editor === null) {
            let editor1 = (
                <CKEditor
                    id={"description1"}
                    name={"description1"}
                    // onInstanceReady={(editor) => { setckdata(editor.editor); }}
                    initData={acDesc === "start" ? "" : acDesc}
                    // value={editorText}
                    config={{
                        // toolbar: [
                        //     ['Source'],
                        //     ['Styles'],
                        //     ['Bold', 'Italic', 'Underline'],

                        //     ['About']
                        // ],
                        extraPlugins: "embed,autoembed,image2",
                        //extraPlugins: [/* 'wordcount'  */],
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
    }, [acDesc, editor]);

    const [showModal, setShowModal] = useState(false);

    const [btnWidth, setBtnWidth] = useState("");
    const [perRow, setPerRow] = useState(2);
    const [dynamicType, setDynamicType] = useState("");
    const selectedObj = props.componentHtml.filter(
        (obj) => obj.uid == props.currentComponent,
    );
    const [groupFields, setGroupFields] = useState({});

    const [dataArr, setDataArr] = useState([]);

    const [imageURL, setImageURL] = useState("");
    const [imageAlt, setImageAlt] = useState("");
    const [imageLink, setImageLink] = useState("");

    const [btnText, setBtnText] = useState("");
    const [btnAlt, setBtnAlt] = useState("");
    const [btnTextTransform, setBtnTextTransform] = useState("");
    const [btnStyle, setBtnStyle] = useState("inline-block custbtn-primary");
    const [btnSize, setBtnSize] = useState("");
    const [btnLink, setBtnLink] = useState("");
    const [btnLinkWindow, setBtnLinkWindow] = useState(false);
    const [btnLinkFollow, setBtnLinkFollow] = useState("");
    const [btnDisplay, setBtnDisplay] = useState("Yes");
    const [btnFontFamily, setBtnFontFamily] = useState("");
    const [btnFontSize, setBtnFontSize] = useState("");
    const [btnFontWeight, setBtnFontWeight] = useState("");
    const [btnFontLineHeight, setBtnFontLineHeight] = useState("");
    const [btnAlignment, setBtnAlignment] = useState("");

    const [btnTopPadding, setBtnTopPadding] = useState(
        "pt-[10px] sm:pt-[10px] lg:pt-[10px]",
    );
    const [btnRightPadding, setBtnRightPadding] = useState(
        "pr-[17px] sm:pr-[19px] lg:pr-[20px]",
    );
    const [btnBottomPadding, setBtnBottomPadding] = useState(
        "pb-[10px] sm:pb-[10px] lg:pb-[10px]",
    );
    const [btnLeftPadding, setBtnLeftPadding] = useState(
        "pl-[17px] sm:pl-[19px] lg:pl-[20px]",
    );

    const [btnTopMargin, setBtnTopMargin] = useState("");
    const [btnRightMargin, setBtnRightMargin] = useState("");
    const [btnBottomMargin, setBtnBottomMargin] = useState("");
    const [btnLeftMargin, setBtnLeftMargin] = useState("");

    const [staticFields, setStaticFields] = useState({});
    const [headline, setHeadline] = useState("");

    const [editBtn, setEditBtn] = useState(false);
    const [addBtn, setAddBtn] = useState(true);
    const [pos, setPos] = useState(0);
    const [imageOrNumber, setImageOrNumber] = useState("Number");
    const [bgColor, setBgColor] = useState("");
    const [OpenImageModel, setOpenImageModel] = useState(false);

    const [iconType, setIconType] = useState("");
    const [iconSymbol, setIconSymbol] = useState("");
    const [hoverColor, setHoverColor] = useState("");

    const bgPropertyName = props.variable; //selectedObj.length > 0 ? Object.keys(selectedObj[0].properties).find(key => selectedObj[0].properties[key] === "background") : [];

    /* When click on any component background component will reload and
      we have called function to set default properties */

    useEffect(() => {
        let flds;
        setDynamicType(props.compprop.html);
        Object.entries(props.compprop.fields).map(([key, val]) => {
            if (key == "single") {
                setStaticFields(val);
            }
            if (key == "group") {
                setGroupFields(val);
            }
        });
    }, []);

    const changePerRow = (value) => {
        setPerRow(value);
        props.updateProperty(
            { type: "text", value: value },
            bgPropertyName + "_perRow",
        );
        // if (dynamicType != "") {
        //     let strHTML = dynamicFunctions[dynamicType](dataArr, (selectedObj.length > 0 ? selectedObj[0] : {}));
        //     let x = ReactDOM.findDOMNode(props.refArray.current[props.currentComponent]);
        //     if (x)
        //         x.querySelectorAll("#" + dynamicType)[0].innerHTML = strHTML;
        //    // props.updateProperty({ type: "dynamic", value: dataArr }, bgPropertyName);
        // }
    };

    const updateHeadline = (event) => {
        setHeadline(event.target.value);
    };

    useEffect(() => {
        let tdataArr = dataArr;
        setDataArr([]);
        tdataArr.forEach(function (item) {
            let tmpArr = {};
            Object.keys(item).map((key, index) => {
                if (key == "colcount") {
                    Object.assign(tmpArr, { colcount: perRow });
                } else {
                    Object.assign(tmpArr, { [key]: item[key] });
                }
            });
            setDataArr((previous) => [...previous, tmpArr]);
        });
        //        setDataArr(tmpArr);
    }, [perRow]);

    useEffect(() => {
        /* Here when change component,values are not retiNING */
        if (
            selectedObj[0] &&
            selectedObj[0].selected_Values != undefined &&
            Object.keys(selectedObj[0].selected_Values).length > 0
        ) {
            let tmpVal;
            let tmpPerRow;
            Object.entries(selectedObj[0].selected_Values).map(([key, value]) => {
                if (key == bgPropertyName) {
                    tmpVal = value;
                }
                if (key == bgPropertyName + "_perRow") {
                    tmpPerRow = value;
                    setPerRow(value.value);
                }
            });
            if (tmpVal != undefined) {
                setDataArr(tmpVal.value);
            } else {
                setDataArr([]);
            }
        } else {
            setDataArr([]);
        }
    }, [props.currentComponent]);

    const onElementImageChange = (url) => {
        setImageURL(url);
    };

    const changeImageNumberDisplay = (event) => {
        setImageOrNumber(event.target.value);
    };

    const updateAltTag = (val) => {
        setImageAlt(val);
    };

    const updateLink = (val) => {
        setImageLink(val);
    };

    const buttonTextChange = (event) => {
        setBtnText(event.target.value);
    };

    const buttonAltChange = (event) => {
        setBtnAlt(event.target.value);
    };

    const changeTextTransform = (event) => {
        setBtnTextTransform(event.target.value);
    };

    const changeLinkTarget = (event) => {
        if (event.target.checked) {
            setBtnLinkWindow("_blank");
        } else {
            setBtnLinkWindow("_self");
        }
    };

    const changeBtnLink = (event) => {
        setBtnLink(event.target.value);
    };

    const changeLinkFollow = (event) => {
        setBtnLinkFollow(event.target.checked);
    };

    const changeBtnStyle = (event) => {
        setBtnStyle(event.target.value);
    };

    const changeBtnDisplay = (event) => {
        if (event.target.value == "Yes") {
            const allWithClass = Array.from(
                document.querySelectorAll("div.btn-extra-info"),
            );
            allWithClass.forEach((element) => {
                element.classList.remove("hidden");
            });
        } else {
            const allWithClass = Array.from(
                document.querySelectorAll("div.btn-extra-info"),
            );
            allWithClass.forEach((element) => {
                element.classList.add("hidden");
            });
        }
        setBtnDisplay(event.target.value);
    };

    const saveData = () => {
        if (groupFields) {
            const data = Object.keys(groupFields).find((key) => groupFields[key] == "image")
            if (data && !imageURL) {
                alert("Please choose a Image to Add data.");
                return;
            }
        }
        let tmpArr = updateDataArray();
        let rndNumber = randomNumber(indArr);
        setIndArr((previous) => [...previous, rndNumber]);
        Object.assign(tmpArr, { index: rndNumber });
        setDataArr((previous) => [...previous, tmpArr]);
        console.log(tmpArr);
        setImageURL("");
        setImageAlt("");
        setImageLink("");
        setBtnText("");
        setBtnAlt("");
        setBtnTextTransform("");
        setBtnStyle("inline-block custbtn-primary");
        setBtnSize("");
        setBtnLink("");
        setBtnLinkWindow(false);
        setBtnLinkFollow("");
        setBtnDisplay("Yes");
        setHeadline("");
        setEditor(null);
        setAcDesc("");
        setBgColor("");
        setHoverColor("");
        setImageOrNumber("Number");
        setLetterSpacing("");

        setBtnWidth("");
        setBtnFontFamily("");
        setBtnFontSize("");
        setBtnFontWeight("");
        setBtnFontLineHeight("");
        setBtnTopPadding("");
        setBtnRightPadding("");
        setBtnBottomPadding("");
        setBtnLeftPadding("");
        setBtnTopMargin("");
        setBtnRightMargin("");
        setBtnBottomMargin("");
        setBtnLeftMargin("");
    };

    useEffect(() => {
        if (dynamicType != "") {
            let strHTML = dynamicFunctions[dynamicType](
                dataArr,
                selectedObj.length > 0 ? selectedObj[0] : {},
            );
            let x = ReactDOM.findDOMNode(
                props.refArray.current[props.currentComponent],
            );
            if (x) {
                if (x.querySelectorAll("#" + dynamicType).length > 0) {
                    x.querySelectorAll("#" + dynamicType)[0].innerHTML = "";
                    x.querySelectorAll("#" + dynamicType)[0].innerHTML = strHTML;
                }
            }
            props.updateProperty({ type: "dynamic", value: dataArr }, bgPropertyName);
        }
    }, [dataArr]);

    const editData = (element) => {
        setPos(element.index);
        setEditBtn(true);
        setAddBtn(false);
        Object.keys(groupFields).map((key, value) => {
            let newKey;
            if (groupFields[key] == "image") {
                setImageURL(element[key]);
                setImageAlt(element[key + "_alt"]);
                setImageLink(element[key + "_link"]);
            }

            if (groupFields[key] == "imagenumber") {
                setImageOrNumber(element[key]);
                setImageURL(element[key + "_image"]);
                setIconSymbol(element[key + "_icon_symbol"] ?? "");
                setIconType(element[key + "_icon_type"] ?? "");

                setIconFontColor(element[key + "_icon_color"]);
                setIconFontSize(element[key + "_icon_font_size"]);
                setIconFontWeight(element[key + "_icon_font_weight"]);
            }

            if (groupFields[key] == "bgcolor") {
                setBgColor(element[key]);
            }

            if (groupFields[key] == "hoverColor") {
                setHoverColor(element[key] ?? "");
            }

            if (groupFields[key] == "button") {
                setBtnDisplay(element[key + "_display"]);
                setBtnText(element[key + "_text"]);
                setBtnAlt(element[key + "_alt"]);
                setBtnTextTransform(element[key + "_transform"]);
                setBtnStyle(element[key + "_style"]);
                setBtnSize(element[key + "_size"]);
                setBtnLink(element[key + "_link"]);
                setBtnLinkFollow(element[key + "_link_follow"]);
                setBtnLinkWindow(element[key + "_link_window"]);
                setBtnAlignment(element[key + "_alignment"]);
                setBtnWidth(element[key + "_btn_width"]);

                setBtnFontFamily(element[key + "_font_family"]);
                setBtnFontSize(element[key + "_font_size"]);
                setBtnFontWeight(element[key + "_font_weight"]);
                setBtnFontLineHeight(element[key + "_font_line_height"]);
                setBtnTopPadding(element[key + "_top_padding"]);
                setBtnRightPadding(element[key + "_right_padding"]);
                setBtnBottomPadding(element[key + "_bottom_padding"]);
                setBtnLeftPadding(element[key + "_left_padding"]);
                setBtnTopMargin(element[key + "_top_margin"]);
                setBtnRightMargin(element[key + "_right_margin"]);
                setBtnBottomMargin(element[key + "_bottom_margin"]);
                setBtnLeftMargin(element[key + "_left_margin"]);
                setLetterSpacing(element[key + "_letter_spacing"]);
            }

            if (groupFields[key] == "text") {
                setHeadline(element[key]);
            }

            if (groupFields[key] == "description") {
                setEditor(null);
                setAcDesc(element[key] || "start");
            }
        });
    };

    const deleteData = (element) => {
        let tmpVal = [];
        dataArr.map((acValue, index) => {
            if (acValue.index != element.index) {
                tmpVal.push(acValue);
            }
        });
        setDataArr(tmpVal);
    };

    const updateDataArray = () => {
        let tmpArr = {};
        let rndNumber = randomNumber(indArr);

        setIndArr((previous) => [...previous, rndNumber]);

        Object.assign(tmpArr, { index: rndNumber });
        Object.assign(tmpArr, { colcount: perRow });
        Object.keys(groupFields).map((key, value) => {
            if (groupFields[key] == "image") {
                Object.assign(tmpArr, { [key]: imageURL });

                let newKey = key + "_link";
                Object.assign(tmpArr, { [newKey]: imageLink });

                newKey = key + "_alt";
                Object.assign(tmpArr, { [newKey]: imageAlt });
            }

            if (groupFields[key] == "imagenumber") {
                Object.assign(tmpArr, { [key]: imageOrNumber });

                if (imageOrNumber === "Image") {
                    let newKey = key + "_image";
                    Object.assign(tmpArr, { [newKey]: imageURL });
                }

                if (imageOrNumber === "Icon") {
                    let newKey = key + "_icon_symbol";
                    Object.assign(tmpArr, { [newKey]: iconSymbol });

                    let newKey1 = key + "_icon_type";
                    Object.assign(tmpArr, { [newKey1]: iconType });

                    let newKey2 = key + "_icon_color";
                    Object.assign(tmpArr, { [newKey2]: iconFontColor });

                    let newKey3 = key + "_icon_font_size";
                    Object.assign(tmpArr, { [newKey3]: iconFontSize });

                    let newKey4 = key + "_icon_alignment";
                    Object.assign(tmpArr, { [newKey4]: iconAlignment });

                    let newKey5 = key + "_icon_font_weight";
                    Object.assign(tmpArr, { [newKey5]: iconFontWeight });
                }
            }

            if (groupFields[key] == "bgcolor") {
                Object.assign(tmpArr, { [key]: bgColor });
            }

            if (groupFields[key] == "hoverColor") {
                Object.assign(tmpArr, { [key]: hoverColor });
            }

            if (groupFields[key] == "button") {
                let newKey = key + "_display";
                Object.assign(tmpArr, { [newKey]: btnDisplay });

                newKey = key + "_text";
                Object.assign(tmpArr, { [newKey]: btnText });

                newKey = key + "_alt";
                Object.assign(tmpArr, { [newKey]: btnAlt });

                newKey = key + "_btn_width";
                Object.assign(tmpArr, { [newKey]: btnWidth });

                newKey = key + "_transform";
                Object.assign(tmpArr, { [newKey]: btnTextTransform });

                newKey = key + "_letter_spacing";
                Object.assign(tmpArr, { [newKey]: letterSpacing });

                newKey = key + "_style";
                Object.assign(tmpArr, { [newKey]: btnStyle });

                newKey = key + "_size";
                Object.assign(tmpArr, { [newKey]: btnSize });

                newKey = key + "_link";
                Object.assign(tmpArr, { [newKey]: btnLink });

                newKey = key + "_link_follow";
                Object.assign(tmpArr, { [newKey]: btnLinkFollow });

                newKey = key + "_alignment";
                Object.assign(tmpArr, { [newKey]: btnAlignment });

                newKey = key + "_link_window";
                Object.assign(tmpArr, { [newKey]: btnLinkWindow });

                newKey = key + "_font_family";
                Object.assign(tmpArr, { [newKey]: btnFontFamily });

                newKey = key + "_font_size";
                Object.assign(tmpArr, { [newKey]: btnFontSize });

                newKey = key + "_font_line_height";
                Object.assign(tmpArr, { [newKey]: btnFontLineHeight });

                newKey = key + "_font_weight";
                Object.assign(tmpArr, { [newKey]: btnFontWeight });

                newKey = key + "_left_padding";
                Object.assign(tmpArr, { [newKey]: btnLeftPadding });

                newKey = key + "_right_padding";
                Object.assign(tmpArr, { [newKey]: btnRightPadding });

                newKey = key + "_top_padding";
                Object.assign(tmpArr, { [newKey]: btnTopPadding });

                newKey = key + "_bottom_padding";
                Object.assign(tmpArr, { [newKey]: btnBottomPadding });

                newKey = key + "_left_margin";
                Object.assign(tmpArr, { [newKey]: btnLeftMargin });

                newKey = key + "_right_margin";
                Object.assign(tmpArr, { [newKey]: btnRightMargin });

                newKey = key + "_top_margin";
                Object.assign(tmpArr, { [newKey]: btnTopMargin });

                newKey = key + "_bottom_margin";
                Object.assign(tmpArr, { [newKey]: btnBottomMargin });

                newKey = key + "_alignment";
                Object.assign(tmpArr, { [newKey]: btnAlignment });

                let btnClass = "";
                if (btnTextTransform !== "") {
                    btnClass += " " + btnTextTransform;
                }
                if (btnAlignment !== "") {
                    btnClass += " " + btnAlignment;
                }
                if (btnWidth !== "") {
                    btnClass += " " + btnWidth;
                }
                if (letterSpacing !== "") {
                    btnClass += " " + letterSpacing;
                }
                if (btnFontSize !== "") {
                    btnClass += " " + btnFontSize;
                }
                if (btnFontFamily !== "") {
                    btnClass += " " + btnFontFamily;
                }
                if (btnFontLineHeight !== "") {
                    btnClass += " " + btnFontLineHeight;
                }
                if (btnFontWeight !== "") {
                    btnClass += " " + btnFontWeight;
                }
                if (btnStyle !== "") {
                    btnClass += " " + btnStyle;
                }
                if (btnLeftMargin !== "") {
                    btnClass += " " + btnLeftMargin;
                }
                if (btnTopMargin !== "") {
                    btnClass += " " + btnTopMargin;
                }
                if (btnRightMargin !== "") {
                    btnClass += " " + btnRightMargin;
                }
                if (btnBottomMargin !== "") {
                    btnClass += " " + btnBottomMargin;
                }
                if (btnLeftPadding !== "") {
                    btnClass += " " + btnLeftPadding;
                }
                if (btnRightPadding !== "") {
                    btnClass += " " + btnRightPadding;
                }
                if (btnTopPadding !== "") {
                    btnClass += " " + btnTopPadding;
                }
                if (btnBottomPadding !== "") {
                    btnClass += " " + btnBottomPadding;
                }
                newKey = key + "_class";
                Object.assign(tmpArr, { [newKey]: btnClass });
            }

            if (groupFields[key] == "text") {
                let newKey = key;
                Object.assign(tmpArr, { [newKey]: headline });
            }

            if (groupFields[key] == "description") {
                let newKey = key;
                Object.assign(tmpArr, { [newKey]: acDesc });
            }
        });

        return tmpArr;
    };

    const changeBackgroundColor = (color) => {
        setBgColor(color.hex);
    };

    const updateData = () => {
        if (groupFields) {
            const data = Object.keys(groupFields).find((key) => groupFields[key] == "image")
            if (data && !imageURL) {
                alert("Please choose a Image to Update data.");
                return;
            }
        }
        let tmpVal = dataArr.map((acValue, index) => {
            if (acValue.index == pos) {
                let tmpArr = updateDataArray();
                Object.assign(tmpArr, { index: pos });
                return tmpArr;
            } else {
                return acValue;
            }
        });
        setDataArr(tmpVal);
        setEditBtn(false);
        setAddBtn(true);

        setImageURL("");
        setImageAlt("");
        setImageLink("");
        setBtnText("");
        setBtnAlt("");
        setBtnTextTransform("");
        setBtnStyle("inline-block custbtn-primary");
        setBtnSize("");
        setBtnLink("");
        setBtnLinkWindow(false);
        setBtnLinkFollow("");
        setBtnDisplay("Yes");
        setHeadline("");
        setEditor(null);
        setAcDesc("");
        setBgColor("");
        setHoverColor("");
        setImageOrNumber("Number");
        setLetterSpacing("");

        setBtnWidth("");
        setBtnFontFamily("");
        setBtnFontSize("");
        setBtnFontWeight("");
        setBtnFontLineHeight("");
        setBtnTopPadding("");
        setBtnRightPadding("");
        setBtnBottomPadding("");
        setBtnLeftPadding("");
        setBtnTopMargin("");
        setBtnRightMargin("");
        setBtnBottomMargin("");
        setBtnLeftMargin("");
    };

    const changeBtnFontFamily = (event) => {
        setBtnFontFamily(event.target.value);
    };

    const changeBtnFontSize = (event) => {
        setBtnFontSize(event.target.value);
    };

    const changeBtnFontLineHeight = (event) => {
        setBtnFontLineHeight(event.target.value);
    };

    const changeBtnFontWeight = (event) => {
        setBtnFontWeight(event.target.value);
    };

    const changeBtnAlignment = (event) => {
        setBtnAlignment(event.target.value);
    };

    const changeBtnTopPadding = (event) => {
        setBtnTopPadding(event.target.value);
    };

    const changeBtnBottomPadding = (event) => {
        setBtnBottomPadding(event.target.value);
    };

    const changeBtnLeftPadding = (event) => {
        setBtnLeftPadding(event.target.value);
    };

    const changeBtnRightPadding = (event) => {
        setBtnRightPadding(event.target.value);
    };

    const changeBtnTopMargin = (event) => {
        setBtnTopMargin(event.target.value);
    };

    const changeBtnBottomMargin = (event) => {
        setBtnBottomMargin(event.target.value);
    };

    const changeBtnLeftMargin = (event) => {
        setBtnLeftMargin(event.target.value);
    };

    const changeBtnRightMargin = (event) => {
        setBtnRightMargin(event.target.value);
    };

    const updateFont = (type, value) => {
        props.updateProperty({ type: "iconclass", value: value }, bgPropertyName);
        setIconType(type);
        setIconSymbol(value);
    };

    const changeHOverColor = (event) => {
        setHoverColor(event.target.value);
    };

    const changeLetterSpacing = (event) => {
        setLetterSpacing(event.target.value);
        props.updateProperty(
            { type: "btn_letter_spacing", value: event.target.value },
            bgPropertyName + "_letter_spacing",
        );
    };

    const changeIconAlignment = (event) => {
        setIconAlignment(event.target.value);
        // props.updateProperty(
        //     { type: "alignment", value: event.target.value },
        //     bgPropertyName + "_text_alignment"
        // );

        //applyFinalClasses();
    };

    const changeBackgroundColor1 = (color) => {
        setIconFontColor(color.hex);
    };

    const changeIconFontSize = (event) => {
        setIconFontSize(event.target.value);
    };

    const changeIconFontWeight = (event) => {
        setIconFontWeight(event.target.value);
    };

    const changeBtnWidth = (event) => {
        setBtnWidth(event.target.value);
        props.updateProperty(
            { type: "btn_width", value: event.target.value },
            bgPropertyName + "_width",
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
                    <span>{props.compprop.title ?? "Dynamic Properties"}</span>
                    <span className="material-icons-outlined">expand_more</span>
                </button>

                <div
                    className={`property-content bg-white border-y border-b-0 border-neutral-200 ${showHide ? "" : "hidden"}`}
                >
                    <div className="mx-2 text-sm">
                        <div className="py-2">
                            {Object.keys(staticFields).length > 0 && (
                                <>
                                    {Object.keys(staticFields).map((key, index) => {
                                        return (
                                            <Fragment key={index}>
                                                {key == "perRow" && (
                                                    <>
                                                        <div className="mb-3 last:mb-0">
                                                            <div className="mb-3">
                                                                <div className="flex justify-between items-center mb-1">
                                                                    <div>Per Row</div>
                                                                </div>
                                                                <div
                                                                    className="flex flex-wrap mx-auto"
                                                                    style={{ width: "95%" }}
                                                                >
                                                                    <SliderCustom
                                                                        dots={false}
                                                                        min={2}
                                                                        max={4}
                                                                        step={null}
                                                                        defaultValue={perRow}
                                                                        onSliderChange={changePerRow}
                                                                        marks={[
                                                                            { value: 2, label: "2" },
                                                                            { value: 3, label: "3" },
                                                                            { value: 4, label: "4" },
                                                                        ]}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </Fragment>
                                        );
                                    })}
                                </>
                            )}

                            <div className="mb-4 last:mb-0">
                                <p className="font-bold">Added Data</p>
                                <ul className="my-2" id="htmlData">
                                    {dataArr.length > 0 &&
                                        dataArr.map((acValue, index) => {
                                            return (
                                                <Fragment key={index}>
                                                    <li className="p-2 border border-neutral-200 border-b-0 last:border-b flex items-center justify-between">
                                                        <div className="flex items-center justify-between w-full">
                                                            <div className="flex items-center">
                                                                <div className="grow ml-2">{index + 1}</div>
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
                                                                    <span className="material-icons-outlined ml-3">
                                                                        delete_outline
                                                                    </span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </Fragment>
                                            );
                                        })}
                                </ul>
                            </div>
                            {Object.keys(groupFields).length > 0 && (
                                <>
                                    {Object.keys(groupFields).map((key, index) => {
                                        return (
                                            <Fragment key={index}>
                                                {groupFields[key] == "image" && (
                                                    <>
                                                        <div className="mb-3" x-data="{ modalOpen: false }">
                                                            <label htmlFor="" className="mb-1 block text-sm">
                                                                Image
                                                            </label>
                                                            <ImageFile
                                                                type="file"
                                                                className="sr-only"
                                                                name={key}
                                                                id={key}
                                                                buttonName="Choose Image"
                                                                folderpath={props.imagePath}
                                                                ModelOpen={true}
                                                                setOpenImageModel={setOpenImageModel}
                                                                deleteImage={() => {
                                                                    onElementImageChange('')
                                                                }}
                                                                // onChange={}
                                                                edibtn={true}
                                                                url={imageURL}
                                                            />
                                                            {OpenImageModel && (
                                                                <ImageGallery
                                                                    setOpenImageModel={setOpenImageModel}
                                                                    onElementImageChange={onElementImageChange}
                                                                    folderpath={props.imagePath}
                                                                    OpenImageModel={OpenImageModel}
                                                                    from={"Element Image"}
                                                                    ImageUploadName={key}
                                                                    ImageUploadId={key}
                                                                    ImageUrl={imageURL}
                                                                />
                                                            )}
                                                        </div>

                                                        <div className="mb-3">
                                                            <div className="flex justify-between items-center mb-1">
                                                                <div>Alt Title</div>
                                                            </div>
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
                                                    </>
                                                )}
                                                {groupFields[key] == "text" && (
                                                    <>
                                                        <div className="mb-3">
                                                            <div className="flex justify-between items-center mb-1">
                                                                <div>Headline Text</div>
                                                            </div>
                                                            <div className="text-center relative overflow-hidden">
                                                                <input
                                                                    type="text"
                                                                    className="w-full grow text-sm bg-white text-gray-700 border border-gray-200 p-3 py-2 leading-tight focus:ring-0 focus:shadow-none focus:outline-none"
                                                                    value={headline}
                                                                    onChange={updateHeadline}
                                                                />
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                                {groupFields[key] == "description" && (
                                                    <>
                                                        <div className="mb-3">
                                                            <div className="flex justify-between items-center mb-1">
                                                                <div>Description</div>
                                                            </div>
                                                            <div className="text-center relative overflow-hidden">
                                                                {editor}
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                                {groupFields[key] == "imagenumber" && (
                                                    <>
                                                        <div className="mb-3">
                                                            <div className="flex justify-between items-center mb-1">
                                                                <div>Image or Number</div>
                                                            </div>
                                                            <div className="flex flex-wrap">
                                                                <select
                                                                    value={imageOrNumber}
                                                                    onChange={changeImageNumberDisplay}
                                                                    className="grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
                                                                >
                                                                    <option value="Image">Image</option>
                                                                    <option value="Number">Number</option>
                                                                    <option value="Icon">Icon</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        {imageOrNumber === "Image" && (
                                                            <div className="mb-3">
                                                                <label
                                                                    htmlFor=""
                                                                    className="mb-1 block text-sm"
                                                                >
                                                                    Image
                                                                </label>
                                                                <ImageFile
                                                                    type="file"
                                                                    className="sr-only"
                                                                    name={key}
                                                                    id={key}
                                                                    buttonName="Choose Image"
                                                                    folderpath={props.imagePath}
                                                                    ModelOpen={true}
                                                                    setOpenImageModel={setOpenImageModel}
                                                                    // onChange={onElementImageChange}
                                                                    edibtn={true}
                                                                    deleteImage={() => {
                                                                        onElementImageChange('')
                                                                    }}
                                                                    url={imageURL}
                                                                />
                                                                {OpenImageModel && (
                                                                    <ImageGallery
                                                                        setOpenImageModel={setOpenImageModel}
                                                                        onElementImageChange={onElementImageChange}
                                                                        folderpath={props.imagePath}
                                                                        OpenImageModel={OpenImageModel}
                                                                        from={"Element Image"}
                                                                        ImageUploadName={key}
                                                                        ImageUploadId={key}
                                                                        ImageUrl={imageURL}
                                                                    />
                                                                )}
                                                            </div>
                                                        )}
                                                        {imageOrNumber === "Icon" && (
                                                            <>
                                                                <div className="mb-4 last:mb-0 flex justify-between">
                                                                    <label
                                                                        htmlFor=""
                                                                        className="mb-1 block text-sm"
                                                                    >
                                                                        Icon Style
                                                                    </label>
                                                                    <div className="flex flex-wrap">
                                                                        <span id="icon_style"></span>
                                                                        <a
                                                                            href="javascript:void(0)"
                                                                            onClick={() => setShowModal(true)}
                                                                        >
                                                                            Change
                                                                        </a>
                                                                    </div>
                                                                    <ElementIconBrowser
                                                                        showModal={showModal}
                                                                        setShowModal={setShowModal}
                                                                        defaultIcon=""
                                                                        updateFont={updateFont}
                                                                    />
                                                                </div>
                                                                <div className="mb-4 last:mb-0 flex flex-wrap -mx-1.5">
                                                                    <div className="w-1/2 px-1.5">
                                                                        <div className="flex justify-between items-center mb-1">
                                                                            <div>Font Size</div>
                                                                        </div>
                                                                        <div className="relative flex flex-wrap">
                                                                            <select
                                                                                onChange={changeIconFontSize}
                                                                                value={iconFontSize}
                                                                                className="grow text-sm bg-gray-100 text-gray-700 border border-gray-200 p-3 py-2 leading-tight focus:ring-0 focus:shadow-none focus:outline-none focus:bg-white"
                                                                            >
                                                                                <option value="None">None</option>
                                                                                {ThemeVariable.FontSize.map(
                                                                                    (value, index) => (
                                                                                        <option
                                                                                            key={index}
                                                                                            value={value.value}
                                                                                        >
                                                                                            {value.label}
                                                                                        </option>
                                                                                    ),
                                                                                )}
                                                                            </select>
                                                                            <a
                                                                                href="javascript:void(0);"
                                                                                className="w-11 px-2 py-1 inline-flex items-center justify-center text-sm bg-[#F1F5F9] border border-neutral-200 border-l-0 outline-none focus:ring-0 "
                                                                            >
                                                                                <span className="font-semibold">
                                                                                    PX
                                                                                </span>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                    <div className="w-1/2 px-1.5">
                                                                        <div className="flex justify-between items-center mb-1">
                                                                            <div>Font Weight</div>
                                                                        </div>
                                                                        <div className="relative flex flex-wrap">
                                                                            <select
                                                                                onChange={changeIconFontWeight}
                                                                                value={iconFontWeight}
                                                                                className="grow text-sm bg-gray-100 text-gray-700 border border-gray-200 p-3 py-2  leading-tight focus:ring-0 focus:shadow-none focus:outline-none focus:bg-white"
                                                                            >
                                                                                <option value="None">None</option>
                                                                                {ThemeVariable.FontWeight.map(
                                                                                    (value, index) => (
                                                                                        <option
                                                                                            key={index}
                                                                                            value={value.value}
                                                                                        >
                                                                                            {value.label}
                                                                                        </option>
                                                                                    ),
                                                                                )}
                                                                            </select>
                                                                            <a
                                                                                href="javascript:void(0);"
                                                                                className="w-11 px-2 py-1 inline-flex items-center justify-center text-sm bg-[#F1F5F9] border border-neutral-200 border-l-0 outline-none focus:ring-0 "
                                                                            >
                                                                                <span className="material-icons-outlined">
                                                                                    format_bold
                                                                                </span>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="mb-4 last:mb-0">
                                                                    <div className="flex justify-between items-center mb-1">
                                                                        <div>Alignment</div>
                                                                    </div>
                                                                    <div className="flex flex-wrap divide-x divide-neutral-200 border border-neutral-200 overflow-hidden">
                                                                        {ThemeVariable.FontAlignment.map(
                                                                            (alignment, index) => (
                                                                                <button
                                                                                    key={index}
                                                                                    value={alignment.value}
                                                                                    onClick={changeIconAlignment}
                                                                                    className={`w-1/4 px-2 py-1 inline-flex justify-center items-center text-sm focus:ring-0 focus:shadow-none focus:outline-none ${iconAlignment === alignment.value ? "bg-[#F1F5F9]" : "bg-white"}`}
                                                                                    dangerouslySetInnerHTML={{
                                                                                        __html: alignment.icon,
                                                                                    }}
                                                                                />
                                                                            ),
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div className="mb-4 last:mb-0">
                                                                    <label
                                                                        htmlFor=""
                                                                        className="mb-1 block text-sm"
                                                                    >
                                                                        Icon Color
                                                                    </label>
                                                                    <div className="flex flex-wrap">
                                                                        <ColorPicker
                                                                            changeBackgroundColor={
                                                                                changeBackgroundColor1
                                                                            }
                                                                            value={iconFontColor}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )}
                                                    </>
                                                )}
                                                {groupFields[key] == "bgcolor" && (
                                                    <>
                                                        <div className="form-check form-check-inline pb-2">
                                                            <label className="form-check-label inline-block text-gray-800">
                                                                BG Color
                                                            </label>
                                                        </div>

                                                        <div className={`pt-2`}>
                                                            <ColorPicker
                                                                changeBackgroundColor={changeBackgroundColor}
                                                                value={bgColor}
                                                            />
                                                        </div>
                                                    </>
                                                )}
                                                {groupFields[key] == "hoverColor" && (
                                                    <>
                                                        <div className="mb-3 last:mb-0">
                                                            <div className="flex justify-between items-center mb-1">
                                                                <div>Hover Color Style</div>
                                                            </div>
                                                            <div className="flex flex-wrap items-center">
                                                                <div className="w-2/3">
                                                                    <select
                                                                        value={hoverColor}
                                                                        onChange={changeHOverColor}
                                                                        className="grow h-9 w-full px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                                                    >
                                                                        <option value="">
                                                                            Select Button Style
                                                                        </option>
                                                                        {ThemeVariable.hoverClass.map(
                                                                            (value, index) => (
                                                                                <option key={index} value={value.value}>
                                                                                    {value.label}
                                                                                </option>
                                                                            ),
                                                                        )}
                                                                    </select>
                                                                </div>
                                                                <div className="w-1/3 px-1.5">
                                                                    <button
                                                                        className={`w-full ${hoverColor.replace("hover:custbg", "custbtn")} pt-[6px] pb-[6px]`}
                                                                    >
                                                                        &nbsp;
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                                {groupFields[key] == "button" && (
                                                    <>
                                                        <div className="mb-3 last:mb-0">
                                                            <div className="flex justify-between items-center mb-1">
                                                                <div>Button Display</div>
                                                            </div>
                                                            <div className="flex flex-wrap divide-x divide-neutral-300 border border-neutral-300 overflow-hidden">
                                                                <button
                                                                    value="Yes"
                                                                    onClick={changeBtnDisplay}
                                                                    className={`w-1/2 px-2 py-1.5 inline-flex justify-center items-center text-sm ${btnDisplay === "Yes" ? "bg-[#F1F5F9]" : "bg-white"}`}
                                                                    title="Yes"
                                                                >
                                                                    Yes
                                                                </button>
                                                                <button
                                                                    value="No"
                                                                    onClick={changeBtnDisplay}
                                                                    className={`w-1/2 px-2 py-1.5 inline-flex justify-center items-center text-sm ${btnDisplay === "No" ? "bg-[#F1F5F9]" : "bg-white"}`}
                                                                    title="No"
                                                                >
                                                                    No
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <div
                                                            className={`btn-extra-info ${btnDisplay == "Yes" ? "" : "hidden"}`}
                                                        >
                                                            <div className="mb-4 last:mb-0">
                                                                <label
                                                                    htmlFor=""
                                                                    className="mb-1 block text-sm"
                                                                >
                                                                    Button Text
                                                                </label>
                                                                <div className="flex flex-wrap">
                                                                    <input
                                                                        onChange={buttonTextChange}
                                                                        value={btnText}
                                                                        type="text"
                                                                        className="w-full grow text-sm bg-white text-gray-700 border border-gray-200 p-3 py-2 leading-tight focus:ring-0 focus:shadow-none focus:outline-none"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="mb-4 last:mb-0">
                                                                <label
                                                                    htmlFor=""
                                                                    className="mb-1 block text-sm"
                                                                >
                                                                    Button Alt
                                                                </label>
                                                                <div className="flex flex-wrap">
                                                                    <input
                                                                        onChange={buttonAltChange}
                                                                        value={btnAlt}
                                                                        type="text"
                                                                        className="w-full grow text-sm bg-white text-gray-700 border border-gray-200 p-3 py-2 leading-tight focus:ring-0 focus:shadow-none focus:outline-none"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="mb-3 last:mb-0">
                                                                <div className="flex justify-between items-center mb-1">
                                                                    <div>Button Style</div>
                                                                </div>
                                                                <div className="flex flex-wrap">
                                                                    <div className="w-2/3 px-1.5">
                                                                        <select
                                                                            value={btnStyle}
                                                                            onChange={changeBtnStyle}
                                                                            className="grow h-9 w-full px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                                                        >
                                                                            <option value="">
                                                                                Select Button Style
                                                                            </option>
                                                                            {ThemeVariable.buttonClasses.map(
                                                                                (value, index) => (
                                                                                    <option
                                                                                        key={index}
                                                                                        value={value.value}
                                                                                    >
                                                                                        {value.label}
                                                                                    </option>
                                                                                ),
                                                                            )}
                                                                        </select>
                                                                    </div>
                                                                    <div className="w-1/3 px-1.5">
                                                                        <button
                                                                            className={`btn ${btnStyle} pt-[6px] pb-[6px]`}
                                                                        >
                                                                            Sample
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="mb-3 last:mb-0">
                                                                <div className="flex justify-between items-center mb-1">
                                                                    <div>Button Width</div>
                                                                </div>
                                                                <div className="flex flex-wrap items-center">
                                                                    <select
                                                                        value={btnWidth}
                                                                        onChange={changeBtnWidth}
                                                                        className="grow h-9 w-full px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                                                    >
                                                                        <option value="">Auto</option>
                                                                        {ThemeVariable.buttonWidthClass.map(
                                                                            (value, index) => (
                                                                                <option value={value.value} key={index}>
                                                                                    {value.label}
                                                                                </option>
                                                                            ),
                                                                        )}
                                                                    </select>
                                                                </div>
                                                            </div>

                                                            <div className="mb-3 last:mb-0">
                                                                <div className="flex justify-between items-center mb-1">
                                                                    <div>Button Alignment</div>
                                                                </div>
                                                                <div className="flex flex-wrap divide-x divide-neutral-300 border border-neutral-300 overflow-hidden">
                                                                    {props.ThemeVariable.FontAlignment.map(
                                                                        (value, index) =>
                                                                            value.label !== "None" && (
                                                                                <button
                                                                                    key={index}
                                                                                    value={value.value}
                                                                                    onClick={changeBtnAlignment}
                                                                                    className={`w-1/3 px-2 py-1.5 inline-flex justify-center items-center text-sm ${value.value === btnAlignment ? "bg-[#F1F5F9]" : "bg-white"}`}
                                                                                    title={value.value}
                                                                                    dangerouslySetInnerHTML={{
                                                                                        __html: value.icon,
                                                                                    }}
                                                                                />
                                                                            ),
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <div className="mb-3 last:mb-0">
                                                                <div className="flex justify-between items-center mb-1 font-semibol">
                                                                    <div>Text</div>
                                                                </div>
                                                            </div>

                                                            <div className="mb-4 last:mb-0">
                                                                <div className="flex justify-between items-center mb-1">
                                                                    <div>Font Family</div>
                                                                </div>

                                                                <div className="flex flex-wrap">
                                                                    <select
                                                                        onChange={changeBtnFontFamily}
                                                                        value={btnFontFamily}
                                                                        className="w-full grow text-sm bg-gray-100 text-gray-700 border border-gray-200 p-3 py-2 leading-tight focus:ring-0 focus:shadow-none focus:outline-none focus:bg-white"
                                                                    >
                                                                        <option value="">Select Font Family</option>
                                                                        {ThemeVariable.FontFamily.map(
                                                                            (value, index) => (
                                                                                <option
                                                                                    key={index}
                                                                                    value={value.value}
                                                                                    className={value.value}
                                                                                >
                                                                                    {value.label}
                                                                                </option>
                                                                            ),
                                                                        )}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="mb-4 last:mb-0 flex flex-wrap -mx-1.5">
                                                                <div className="w-1/2 px-1.5">
                                                                    <div className="flex justify-between items-center mb-1">
                                                                        <div>Font Size</div>
                                                                    </div>
                                                                    <div className="relative flex flex-wrap">
                                                                        <select
                                                                            onChange={changeBtnFontSize}
                                                                            value={btnFontSize}
                                                                            className="grow text-sm bg-gray-100 text-gray-700 border border-gray-200 p-3 py-2 leading-tight focus:ring-0 focus:shadow-none focus:outline-none focus:bg-white"
                                                                        >
                                                                            <option value="">None</option>
                                                                            {ThemeVariable.FontSize.map(
                                                                                (value, index) => (
                                                                                    <option
                                                                                        key={index}
                                                                                        value={value.value}
                                                                                    >
                                                                                        {value.label}
                                                                                    </option>
                                                                                ),
                                                                            )}
                                                                        </select>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="w-11 px-2 py-1 inline-flex items-center justify-center text-sm bg-[#F1F5F9] border border-neutral-200 border-l-0 outline-none focus:ring-0 "
                                                                        >
                                                                            <span className="font-semibold">PX</span>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                                <div className="w-1/2 px-1.5">
                                                                    <div className="flex justify-between items-center mb-1">
                                                                        <div>Font Weight</div>
                                                                    </div>
                                                                    <div className="relative flex flex-wrap">
                                                                        <select
                                                                            onChange={changeBtnFontWeight}
                                                                            value={btnFontWeight}
                                                                            className="grow text-sm bg-gray-100 text-gray-700 border border-gray-200 p-3 py-2  leading-tight focus:ring-0 focus:shadow-none focus:outline-none focus:bg-white"
                                                                        >
                                                                            <option value="">None</option>
                                                                            {ThemeVariable.FontWeight.map(
                                                                                (value, index) => (
                                                                                    <option
                                                                                        key={index}
                                                                                        value={value.value}
                                                                                    >
                                                                                        {value.label}
                                                                                    </option>
                                                                                ),
                                                                            )}
                                                                        </select>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="w-11 px-2 py-1 inline-flex items-center justify-center text-sm bg-[#F1F5F9] border border-neutral-200 border-l-0 outline-none focus:ring-0 "
                                                                        >
                                                                            <span className="material-icons-outlined">
                                                                                format_bold
                                                                            </span>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="mb-4 last:mb-0 flex flex-wrap -mx-1.5">
                                                                <div className="w-1/2 px-1.5">
                                                                    <div className="flex justify-between items-center mb-1">
                                                                        <div>Line Height</div>
                                                                    </div>
                                                                    <div className="relative flex flex-wrap">
                                                                        <select
                                                                            onChange={changeBtnFontLineHeight}
                                                                            value={btnFontLineHeight}
                                                                            className="grow text-sm bg-gray-100 text-gray-700 border border-gray-200 p-3 py-2  leading-tight focus:ring-0 focus:shadow-none focus:outline-none focus:bg-white"
                                                                        >
                                                                            <option value="">None</option>
                                                                            {ThemeVariable.lineHeight.map(
                                                                                (value, index) => (
                                                                                    <option
                                                                                        key={index}
                                                                                        value={value.value}
                                                                                    >
                                                                                        {value.label}
                                                                                    </option>
                                                                                ),
                                                                            )}
                                                                        </select>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="w-11 px-2 py-1 inline-flex items-center justify-center text-sm bg-[#F1F5F9] border border-neutral-200 border-l-0 outline-none focus:ring-0 "
                                                                        >
                                                                            <span className="material-icons-outlined">
                                                                                format_line_spacing
                                                                            </span>
                                                                        </a>
                                                                    </div>
                                                                </div>

                                                                <div className="w-1/2 px-1.5">
                                                                    <div className="flex justify-between items-center mb-1">
                                                                        <div>Letter Spacing</div>
                                                                    </div>
                                                                    <div className="relative flex flex-wrap">
                                                                        <select
                                                                            onChange={changeLetterSpacing}
                                                                            value={letterSpacing}
                                                                            className="grow text-sm bg-gray-100 text-gray-700 border border-gray-200 p-3 py-2  leading-tight focus:ring-0 focus:shadow-none focus:outline-none focus:bg-white"
                                                                        >
                                                                            <option value="">None</option>
                                                                            {ThemeVariable.LetterSpacing.map(
                                                                                (value, index) => (
                                                                                    <option
                                                                                        key={index}
                                                                                        value={value.value}
                                                                                    >
                                                                                        {value.label}
                                                                                    </option>
                                                                                ),
                                                                            )}
                                                                        </select>
                                                                        <a
                                                                            href="javascript:void(0);"
                                                                            className="w-11 px-2 py-1 inline-flex items-center justify-center text-sm bg-[#F1F5F9] border border-neutral-200 border-l-0 outline-none focus:ring-0 "
                                                                        >
                                                                            <span className="material-symbols-outlined">
                                                                                format_letter_spacing
                                                                            </span>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="mb-4 last:mb-0">
                                                                <div className="flex justify-between items-center mb-1">
                                                                    <div>Text Transform</div>
                                                                </div>
                                                                <div className="flex flex-wrap divide-x divide-neutral-200 border border-neutral-200 overflow-hidden">
                                                                    {ThemeVariable.TextTransform.map(
                                                                        (transform, index) => (
                                                                            <button
                                                                                key={index}
                                                                                value={transform.value}
                                                                                onClick={changeTextTransform}
                                                                                className={`w-1/4 px-2 py-1 inline-flex justify-center items-center text-sm bg-[#F1F5F9] focus:ring-0 focus:shadow-none focus:outline-none ${btnTextTransform === transform.value ? "bg-[#F1F5F9]" : "bg-white"}`}
                                                                            >
                                                                                <span
                                                                                    className={`pointer-events-none ${transform.icon === "block"
                                                                                        ? "material-icons-outlined"
                                                                                        : "font-semibold"
                                                                                        }`}
                                                                                >
                                                                                    {transform.icon}
                                                                                </span>
                                                                            </button>
                                                                        ),
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <div className="mb-4 last:mb-0">
                                                                <label
                                                                    htmlFor=""
                                                                    className="mb-1 block text-sm"
                                                                >
                                                                    Button Margin (T R B L)
                                                                </label>
                                                                <div className="flex flex-wrap">
                                                                    <select
                                                                        onChange={changeBtnTopMargin}
                                                                        value={btnTopMargin}
                                                                        className="grow h-9 mr-2 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
                                                                    >
                                                                        {ThemeVariable.btnTopMargin.map(
                                                                            (value, index) => (
                                                                                <option key={index} value={value.value}>
                                                                                    {value.label}
                                                                                </option>
                                                                            ),
                                                                        )}
                                                                    </select>
                                                                    <select
                                                                        onChange={changeBtnRightMargin}
                                                                        value={btnRightMargin}
                                                                        className="grow h-9 mr-2 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
                                                                    >
                                                                        {ThemeVariable.btnRightMargin.map(
                                                                            (value, index) => (
                                                                                <option key={index} value={value.value}>
                                                                                    {value.label}
                                                                                </option>
                                                                            ),
                                                                        )}
                                                                    </select>
                                                                    <select
                                                                        onChange={changeBtnBottomMargin}
                                                                        value={btnBottomMargin}
                                                                        className="grow h-9 mr-2 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
                                                                    >
                                                                        {ThemeVariable.btnBottomMargin.map(
                                                                            (value, index) => (
                                                                                <option key={index} value={value.value}>
                                                                                    {value.label}
                                                                                </option>
                                                                            ),
                                                                        )}
                                                                    </select>
                                                                    <select
                                                                        onChange={changeBtnLeftMargin}
                                                                        value={btnLeftMargin}
                                                                        className="grow h-9 mr-2 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
                                                                    >
                                                                        {ThemeVariable.btnLeftMargin.map(
                                                                            (value, index) => (
                                                                                <option key={index} value={value.value}>
                                                                                    {value.label}
                                                                                </option>
                                                                            ),
                                                                        )}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="mb-4 last:mb-0">
                                                                <label
                                                                    htmlFor=""
                                                                    className="mb-1 block text-sm"
                                                                >
                                                                    Button Padding (T R B L)
                                                                </label>
                                                                <div className="flex flex-wrap">
                                                                    <select
                                                                        onChange={changeBtnTopPadding}
                                                                        value={btnTopPadding}
                                                                        className="grow h-9 mr-2 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
                                                                    >
                                                                        {ThemeVariable.btnTopPadding.map(
                                                                            (value, index) => (
                                                                                <option key={index} value={value.value}>
                                                                                    {value.label}
                                                                                </option>
                                                                            ),
                                                                        )}
                                                                    </select>
                                                                    <select
                                                                        onChange={changeBtnRightPadding}
                                                                        value={btnRightPadding}
                                                                        className="grow h-9 mr-2 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
                                                                    >
                                                                        {ThemeVariable.btnRightPadding.map(
                                                                            (value, index) => (
                                                                                <option key={index} value={value.value}>
                                                                                    {value.label}
                                                                                </option>
                                                                            ),
                                                                        )}
                                                                    </select>
                                                                    <select
                                                                        onChange={changeBtnBottomPadding}
                                                                        value={btnBottomPadding}
                                                                        className="grow h-9 mr-2 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
                                                                    >
                                                                        {ThemeVariable.btnBottomPadding.map(
                                                                            (value, index) => (
                                                                                <option key={index} value={value.value}>
                                                                                    {value.label}
                                                                                </option>
                                                                            ),
                                                                        )}
                                                                    </select>
                                                                    <select
                                                                        onChange={changeBtnLeftPadding}
                                                                        value={btnLeftPadding}
                                                                        className="grow h-9 mr-2 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
                                                                    >
                                                                        {ThemeVariable.btnLeftPadding.map(
                                                                            (value, index) => (
                                                                                <option key={index} value={value.value}>
                                                                                    {value.label}
                                                                                </option>
                                                                            ),
                                                                        )}
                                                                    </select>
                                                                </div>
                                                            </div>

                                                            <div className="mb-4 last:mb-0 hidden">
                                                                <label
                                                                    htmlFor=""
                                                                    className="mb-1 block text-sm"
                                                                >
                                                                    Button Link
                                                                </label>
                                                                <div className="flex flex-wrap">
                                                                    <select className="grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md">
                                                                        <option value="1">External</option>
                                                                        <option value="2">Content</option>
                                                                        <option value="3">File</option>
                                                                        <option value="4">Email address</option>
                                                                        <option value="5">Blog</option>
                                                                    </select>
                                                                </div>
                                                            </div>

                                                            <div className="mb-4 last:mb-0">
                                                                <label
                                                                    htmlFor=""
                                                                    className="mb-1 block text-sm"
                                                                >
                                                                    URL
                                                                </label>
                                                                <div className="flex flex-wrap">
                                                                    <input
                                                                        onChange={changeBtnLink}
                                                                        type="text"
                                                                        value={btnLink}
                                                                        className="w-full grow text-sm bg-white text-gray-700 border border-gray-200 p-3 py-2 leading-tight focus:ring-0 focus:shadow-none focus:outline-none"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="mb-4 last:mb-0">
                                                                <div className="flex flex-wrap justify-between items-center">
                                                                    <label
                                                                        htmlFor=""
                                                                        className="mb-1 block text-sm"
                                                                    >
                                                                        Open link in new window
                                                                    </label>
                                                                    <div className="flex items-center">
                                                                        <div className="w-16 relative">
                                                                            <input
                                                                                onChange={changeLinkTarget}
                                                                                type="checkbox"
                                                                                id="new-window-link"
                                                                                x-model="checked"
                                                                                checked={
                                                                                    btnLinkWindow == "_blank"
                                                                                        ? "checked"
                                                                                        : ""
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="mb-4 last:mb-0">
                                                                <label
                                                                    htmlFor=""
                                                                    className="mb-1 block text-sm"
                                                                >
                                                                    Link Type
                                                                </label>
                                                                <label
                                                                    className="flex items-center"
                                                                    htmlFor={`no-follow-link-${bgPropertyName}`}
                                                                >
                                                                    <input
                                                                        onChange={changeLinkFollow}
                                                                        type="checkbox"
                                                                        id={`no-follow-link-${bgPropertyName}`}
                                                                        className="form-checkbox"
                                                                        checked={btnLinkFollow}
                                                                    />
                                                                    <span className="text-sm font-medium ml-2">
                                                                        No Follow
                                                                    </span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </Fragment>
                                        );
                                    })}
                                    <div className="mb-4 last:mb-0">
                                        {addBtn && (
                                            <button
                                                className="w-full py-[6px] bg-indigo-500 hover:bg-indigo-600 text-white mt-2"
                                                onClick={saveData}
                                            >
                                                + Add
                                            </button>
                                        )}
                                        {editBtn && (
                                            <button
                                                className="w-full py-[6px] bg-indigo-500 hover:bg-indigo-600 text-white mt-2"
                                                onClick={updateData}
                                            >
                                                + Update
                                            </button>
                                        )}
                                    </div>
                                </>
                            )}
                            {props.compprop.formatting && (
                                <>
                                    <div className="mb-4 last:mb-0">
                                        <label htmlFor="" className="mb-1 block text-sm">
                                            <strong>Text Formatting</strong>
                                        </label>
                                        <TextStyleElement
                                            {...props}
                                            variable="Headline"
                                            type="dynamic"
                                        />
                                        <ElementPaddingValues
                                            {...props}
                                            variable="Headline"
                                            type="dynamic"
                                        />
                                        <ElementMarginValues
                                            {...props}
                                            variable="Headline"
                                            type="dynamic"
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ElementDynamic;
