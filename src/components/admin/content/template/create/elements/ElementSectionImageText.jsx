import { CKEditor } from "ckeditor4-react";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";

import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";

import ImageFile from "components/admin/content/common/ImageFile";
import Input from "components/admin/content/common/Input";
import ImageGallery from "./../modal/imageGalleryModel/ImageGallery";
import ElementMarginPaddingValues from "./ElementMarginPaddingValues";
import TextStyleElement from "./TextStyleElement";

const ElementSectionImageText = (props) => {
    const dispatch = useDispatch();

    const [loaderDisplay, setLoaderDisplay] = useState(false);
    const [editor, setEditor] = useState(null);
    const [showHide, setShowHide] = useState(false);
    const showHideProperties = () => {
        if (showHide == true) setShowHide(false);
        else {
            const allWithClass = Array.from(
                document.querySelectorAll("div.property-content")
            );
            allWithClass.forEach((element) => {
                element.classList.add("hidden");
            });
            setShowHide(true);
        }
    };

    let bgPropertyName = props.variable;

    const [sectionType, setSectionType] = useState("");
    const [selectionClass, setSelectionClass] = useState("hidden");

    const [imageURL, setImageURL] = useState("");
    const [imageAlt, setImageAlt] = useState("");
    const [imageLink, setImageLink] = useState("");
    const [headline, setHeadline] = useState("");
    const [sectionDisplay, setSectionDisplay] = useState("Yes");
    const [contentType, setContentType] = useState("Text");
    const [finalArr, setFinalArr] = useState({});

    const [textTransform, setTextTransform] = useState("");
    const [fontSize, setFontSize] = useState("");
    const [fontFamily, setFontFamily] = useState("");
    const [fontColor, setFontColor] = useState("");
    const [lineHeight, setLineHeight] = useState("");
    const [letterSpacing, setLetterSpacing] = useState("");
    const [fontWeight, setFontWeight] = useState("");
    const [fontStyle, setFontStyle] = useState("");
    const [textDecoration, setTextDecoration] = useState("");
    const [textAlignment, setTextAlignment] = useState("");
    const [leftPadding, setLeftPadding] = useState("");
    const [topPadding, setTopPadding] = useState("");
    const [rightPadding, setRightPadding] = useState("");
    const [bottomPadding, setBottomPadding] = useState("");
    const [leftMargin, setLeftMargin] = useState("");
    const [topMargin, setTopMargin] = useState("");
    const [rightMargin, setRightMargin] = useState("");
    const [bottomMargin, setBottomMargin] = useState("");

    const [textTransform1, setTextTransform1] = useState("");
    const [fontSize1, setFontSize1] = useState("");
    const [fontFamily1, setFontFamily1] = useState("");
    const [fontColor1, setFontColor1] = useState("");
    const [lineHeight1, setLineHeight1] = useState("");
    const [letterSpacing1, setLetterSpacing1] = useState("");
    const [fontWeight1, setFontWeight1] = useState("");
    const [fontStyle1, setFontStyle1] = useState("");
    const [textDecoration1, setTextDecoration1] = useState("");
    const [textAlignment1, setTextAlignment1] = useState("");
    const [leftPadding1, setLeftPadding1] = useState("");
    const [topPadding1, setTopPadding1] = useState("");
    const [rightPadding1, setRightPadding1] = useState("");
    const [bottomPadding1, setBottomPadding1] = useState("");
    const [leftMargin1, setLeftMargin1] = useState("");
    const [topMargin1, setTopMargin1] = useState("");
    const [rightMargin1, setRightMargin1] = useState("");
    const [bottomMargin1, setBottomMargin1] = useState("");
    const [OpenImageModel, setOpenImageModel] = useState(false);

    const selectedObj = props.componentHtml.filter(
        (obj) => obj.uid == props.currentComponent
    );

    const [editorText, setEditorText] = useState("");

    const changeFontSize = (event) => {
        setFontSize(event.target.value);
    };

    const changeFontFamily = (event) => {
        setFontFamily(event.target.value);
    };

    const changeTextTransform = (event) => {
        setTextTransform(event.target.value);
    };

    const changeBackgroundColor = (color) => {
        setFontColor(color.hex);
    };

    const changeLineHeight = (event) => {
        setLineHeight(event.target.value);
    };

    const changeLetterSpacing = (event) => {
        setLetterSpacing(event.target.value);
    };

    const changeFontStyle = (event) => {
        setFontStyle(event.target.value);
    };

    const changeTextAlignment = (event) => {
        setTextAlignment(event.target.value);
    };

    const changeFontWeight = (event) => {
        setFontWeight(event.target.value);
    };

    const changeLeftPadding = (event) => {
        setLeftPadding(event.target.value);
    };

    const changeTopPadding = (event) => {
        setTopPadding(event.target.value);
    };

    const changeRightPadding = (event) => {
        setRightPadding(event.target.value);
    };

    const changeBottomPadding = (event) => {
        setBottomPadding(event.target.value);
    };

    const changeLeftMargin = (event) => {
        setLeftMargin(event.target.value);
    };

    const changeTopMargin = (event) => {
        setTopMargin(event.target.value);
    };

    const changeRightMargin = (event) => {
        setRightMargin(event.target.value);
    };

    const changeBottomMargin = (event) => {
        setBottomMargin(event.target.value);
    };

    const changeFontSize1 = (event) => {
        setFontSize1(event.target.value);
    };

    const changeFontFamily1 = (event) => {
        setFontFamily1(event.target.value);
    };

    const changeTextTransform1 = (event) => {
        setTextTransform1(event.target.value);
    };

    const changeBackgroundColor1 = (color) => {
        setFontColor1(color.hex);
    };

    const changeLineHeight1 = (event) => {
        setLineHeight1(event.target.value);
    };

    const changeLetterSpacing1 = (event) => {
        setLetterSpacing1(event.target.value);
    };

    const changeFontStyle1 = (event) => {
        setFontStyle1(event.target.value);
    };

    const changeTextAlignment1 = (event) => {
        setTextAlignment1(event.target.value);
    };

    const changeFontWeight1 = (event) => {
        setFontWeight1(event.target.value);
    };

    const changeLeftPadding1 = (event) => {
        setLeftPadding1(event.target.value);
    };

    const changeTopPadding1 = (event) => {
        setTopPadding1(event.target.value);
    };

    const changeRightPadding1 = (event) => {
        setRightPadding1(event.target.value);
    };

    const changeBottomPadding1 = (event) => {
        setBottomPadding1(event.target.value);
    };

    const changeLeftMargin1 = (event) => {
        setLeftMargin1(event.target.value);
    };

    const changeTopMargin1 = (event) => {
        setTopMargin1(event.target.value);
    };

    const changeRightMargin1 = (event) => {
        setRightMargin1(event.target.value);
    };

    const changeBottomMargin1 = (event) => {
        setBottomMargin1(event.target.value);
    };

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
                    setFinalArr(attributes.value);
                }
            } else {
            }
        }
    }, [props.currentComponent]);

    const generateCKEditor = (value) => {
        // let elProps =
        let displayData = finalArr?.[value]?.description;
        setEditor(null);
        if (displayData === undefined) {
            displayData = "";
            // setEditorText("<p></p>");
        }

        const editor1 = (
            <CKEditor
                id={`description${value}`}
                // onInstanceReady={(editor) => { setckdata(editor.editor); }}
                initData={displayData}
                // value={editorText}
                config={{
                    // toolbar: [
                    //     ['Source'],
                    //     ['Styles'],
                    //     ['Bold', 'Italic', 'Underline'],

                    //     ['About']
                    // ],

                    // extraPlugins: [/* 'wordcount'  */],
                    extraPlugins: "embed,autoembed,image2",
                    removePlugins: ["image"],
                    extraAllowedContent: "div(*)",
                    allowedContent: true,
                }}
                onChange={({ event, editor }) => {
                    setEditorText(editor.getData());
                }}
            />
        );
        setLoaderDisplay(true);
        setTimeout(function () {
            setLoaderDisplay(false);
            setEditor(editor1);
        }, 2000);
    };

    const displaySection = (obj, side) => {
        let strHTML = "";
        if (obj.contentType == "Image") {
            strHTML += '<div class="w-full">';
            strHTML += '<p class="hrefurl no-underline">';
            strHTML += '<div class="' + obj?.description_class + '">';
            strHTML +=
                '<img class="w-full" src="' +
                obj.image +
                '" alt="' +
                obj.image_alt +
                '" title="' +
                obj.image_alt +
                '">';
            strHTML += "</div>";
            if (obj?.headline_class && obj.headline) {
                strHTML += '<div class="text-center w-full bg-gray-50">';
                strHTML +=
                    '<div class="' +
                    obj?.headline_class +
                    '" style="color: ' +
                    obj?.color +
                    '">' +
                    obj.headline +
                    "</div>";
                strHTML += "</div>";
            }

            //strHTML += '</div>';
            strHTML += "</p>";
            strHTML += "</div>";
        } else {
            strHTML += '<div class="p-4 lg:p-8 flex w-full items-center">';
            strHTML += '<div class="w-full">';
            strHTML +=
                '<div class="' +
                obj?.headline_class +
                '" style="color: ' +
                obj?.color +
                '">' +
                obj.headline +
                "</div>";
            strHTML +=
                '<div class="' +
                obj?.description_class +
                '" style="color: ' +
                obj?.color1 +
                '">' +
                obj.description +
                "</div>";
            strHTML += "</div>";
            strHTML += "</div>";
        }
        let x = ReactDOM.findDOMNode(
            props.refArray.current[props.currentComponent]
        );
        if (x) x.querySelectorAll("#section" + side)[0].innerHTML = strHTML;
    };

    const findClass = () => {
        let column = 0;
        if (!Object.keys(finalArr).includes("Right")) {
            column = column + 1;
        } else if (finalArr.Right.display == "Yes") {
            column = column + 1;
        }

        if (!Object.keys(finalArr).includes("Center")) {
            column = column + 1;
        } else if (finalArr.Center.display == "Yes") {
            column = column + 1;
        }

        if (!Object.keys(finalArr).includes("Left")) {
            column = column + 1;
        } else if (finalArr.Left.display == "Yes") {
            column = column + 1;
        }
        if (column == 3) {
            return ["lg:w-1/3", "px-3", "md:w-1/2"];
        } else if (column == 2) {
            return ["lg:w-1/2", "px-3", "md:w-1/2"];
        } else if (column == 1) {
            return [];
        }
        return [];
    };

    //section 1 - image/text
    const onElementImageChange = (url) => {
        setImageURL(url);
        // let x = ReactDOM.findDOMNode(props.refArray.current[props.currentComponent]);
        // x.querySelectorAll('#'+props.variable)[0].src = url;
        // // props.refArray.current[props.currentComponent].style='background: url("'+url+'");';
        // props.updateProperty({type: "image", value: url}, bgPropertyName);
    };

    const updateAltTag = (val) => {
        setImageAlt(val);
    };

    const updateLink = (val) => {
        setImageLink(val);
    };

    const changeSections = (value) => {
        if (value == "") {
            setSelectionClass("hidden");
        } else {
            setSelectionClass("");
            //generateCKEditor();
            // setEditor(null);
            // setEditor(null);
            if (Object.keys(finalArr).includes(value)) {
                let elProps = finalArr[value];

                setSectionDisplay(elProps.display);
                setContentType(elProps.contentType);
                setHeadline(elProps.headline);

                setTextTransform(elProps.textTransform);
                setFontSize(elProps.fontSize);
                setFontFamily(elProps.fontFamily);
                setFontColor(elProps.color);
                setLineHeight(elProps.lineHeight);
                setLetterSpacing(elProps.letterSpacing);
                setFontWeight(elProps.fontWeight);
                setFontStyle(elProps.fontStyle);
                setTextDecoration(elProps.textDecoration);
                setTextAlignment(elProps.textAlignment);

                setLeftMargin(elProps.leftMargin);
                setTopMargin(elProps.topMargin);
                setRightMargin(elProps.rightMargin);
                setBottomMargin(elProps.bottomMargin);

                setLeftPadding(elProps.leftPadding);
                setTopPadding(elProps.topPadding);
                setRightPadding(elProps.rightPadding);
                setBottomPadding(elProps.bottomPadding);

                setTextTransform1(elProps.textTransform1);
                setFontSize1(elProps.fontSize1);
                setFontFamily1(elProps.fontFamily1);
                setFontColor1(elProps.color1);
                setLineHeight1(elProps.lineHeight1);
                setLetterSpacing1(elProps.letterSpacing1);
                setFontWeight1(elProps.fontWeight1);
                setFontStyle1(elProps.fontStyle1);
                setTextDecoration1(elProps.textDecoration1);
                setTextAlignment1(elProps.textAlignment1);

                setLeftMargin1(elProps.leftMargin1);
                setTopMargin1(elProps.topMargin1);
                setRightMargin1(elProps.rightMargin1);
                setBottomMargin1(elProps.bottomMargin1);

                setLeftPadding1(elProps.leftPadding1);
                setTopPadding1(elProps.topPadding1);
                setRightPadding1(elProps.rightPadding1);
                setBottomPadding1(elProps.bottomPadding1);

                setEditorText(elProps.description);
                setImageURL(elProps.image);
                setImageAlt(elProps.image_alt);
                setImageLink(elProps.image_link);
            } else {
                setImageURL("");
                setImageLink("");
                setImageAlt("");
                setHeadline("");
                setEditorText("");

                setTextTransform("");
                setFontSize("");
                setFontFamily("");
                setFontColor("");
                setLineHeight("");
                setLetterSpacing("");
                setFontWeight("");
                setFontStyle("");
                setTextDecoration("");
                setTextAlignment("");

                setLeftMargin("");
                setTopMargin("");
                setRightMargin("");
                setBottomMargin("");

                setLeftPadding("");
                setTopPadding("");
                setRightPadding("");
                setBottomPadding("");

                setTextTransform1("");
                setFontSize1("");
                setFontFamily1("");
                setFontColor1("");
                setLineHeight1("");
                setLetterSpacing1("");
                setFontWeight1("");
                setFontStyle1("");
                setTextDecoration1("");
                setTextAlignment1("");

                setLeftMargin1("");
                setTopMargin1("");
                setRightMargin1("");
                setBottomMargin1("");

                setLeftPadding1("");
                setTopPadding1("");
                setRightPadding1("");
                setBottomPadding1("");

                //changeSections('');
            }

            generateCKEditor(value);
        }
        setSectionType(value);
    };

    const changeSectionDisplay = (event) => {
        setSectionDisplay(event.target.value);
        setEditor(null);
        if (event.target.value === "Yes") {
            const allWithClass = Array.from(
                document.querySelectorAll("div#imagetextdiv")
            );
            allWithClass.forEach((element) => {
                element.classList.remove("hidden");
            });

            // generateCKEditor();
        } else {
            const allWithClass = Array.from(
                document.querySelectorAll("div#imagetextdiv")
            );
            allWithClass.forEach((element) => {
                element.classList.add("hidden");
            });
        }
        generateCKEditor();
    };

    const changeContentType = (event) => {
        setContentType(event.target.value);
    };

    const updateHeadline = (event) => {
        setHeadline(event.target.value);
    };

    const saveData = () => {
        if (sectionType != "") {
            /* Headline Class */
            let addClassName = "";
            if (textTransform) {
                addClassName += " " + textTransform;
            }
            if (fontSize) {
                addClassName += " " + fontSize;
            }
            if (fontFamily) {
                addClassName += " " + fontFamily;
            }
            if (lineHeight) {
                addClassName += " " + lineHeight;
            }
            if (letterSpacing) {
                addClassName += " tracking-[" + letterSpacing + "]";
            }
            if (fontWeight) {
                addClassName += " " + fontWeight;
            }
            if (fontStyle) {
                addClassName += " " + fontStyle;
            }
            if (textAlignment) {
                addClassName += " " + textAlignment;
            }
            if (leftMargin) {
                addClassName += " " + leftMargin;
            }
            if (topMargin) {
                addClassName += " " + topMargin;
            }
            if (rightMargin) {
                addClassName += " " + rightMargin;
            }
            if (bottomMargin) {
                addClassName += " " + bottomMargin;
            }
            if (leftPadding) {
                addClassName += " " + leftPadding;
            }
            if (rightPadding) {
                addClassName += " " + rightPadding;
            }
            if (topPadding) {
                addClassName += " " + topPadding;
            }
            if (bottomPadding) {
                addClassName += " " + bottomPadding;
            }

            let addClassName1 = "";
            if (textTransform1) {
                addClassName1 += " " + textTransform1;
            }
            if (fontSize1) {
                addClassName1 += " " + fontSize1;
            }
            if (fontFamily1) {
                addClassName1 += " " + fontFamily1;
            }
            if (lineHeight1) {
                addClassName1 += " " + lineHeight1;
            }
            if (letterSpacing1) {
                addClassName1 += " tracking-[" + letterSpacing1 + "]";
            }
            if (fontWeight1) {
                addClassName1 += " " + fontWeight1;
            }
            if (fontStyle1) {
                addClassName1 += " " + fontStyle1;
            }
            if (textAlignment1) {
                addClassName1 += " " + textAlignment1;
            }
            if (leftMargin1) {
                addClassName1 += " " + leftMargin1;
            }
            if (topMargin1) {
                addClassName1 += " " + topMargin1;
            }
            if (rightMargin1) {
                addClassName1 += " " + rightMargin1;
            }
            if (bottomMargin1) {
                addClassName1 += " " + bottomMargin1;
            }
            if (leftPadding1) {
                addClassName1 += " " + leftPadding1;
            }
            if (rightPadding1) {
                addClassName1 += " " + rightPadding1;
            }
            if (topPadding1) {
                addClassName1 += " " + topPadding1;
            }
            if (bottomPadding1) {
                addClassName1 += " " + bottomPadding1;
            }

            let saveObj = {
                display: sectionDisplay,
                contentType: contentType,
                headline: headline,
                description: editorText,
                image: imageURL,
                image_alt: imageAlt,
                image_link: imageLink,
                fontSize: fontSize,
                fontFamily: fontFamily,
                letterSpacing: letterSpacing,
                lineHeight: lineHeight,
                fontWeight: fontWeight,
                textAlignment: textAlignment,
                fontStyle: fontStyle,
                textTransform: textTransform,
                color: fontColor,
                leftMargin: leftMargin,
                topMargin: topMargin,
                rightMargin: rightMargin,
                bottomMargin: bottomMargin,
                leftPadding: leftPadding,
                topPadding: topPadding,
                rightPadding: rightPadding,
                bottomPadding: bottomPadding,
                headline_class: addClassName,
                fontSize1: fontSize1,
                fontFamily1: fontFamily1,
                letterSpacing1: letterSpacing1,
                lineHeight1: lineHeight1,
                fontWeight1: fontWeight1,
                textAlignment1: textAlignment1,
                fontStyle1: fontStyle1,
                textTransform1: textTransform1,
                color1: fontColor1,
                leftMargin1: leftMargin1,
                topMargin1: topMargin1,
                rightMargin1: rightMargin1,
                bottomMargin1: bottomMargin1,
                leftPadding1: leftPadding1,
                topPadding1: topPadding1,
                rightPadding1: rightPadding1,
                bottomPadding1: bottomPadding1,
                description_class: addClassName1,
            };

            let tmpArr = {};
            if (Object.keys(finalArr).includes(sectionType)) {
                Object.keys(finalArr).map((dkey, index) => {
                    if (dkey == sectionType) {
                        Object.assign(tmpArr, { [sectionType]: saveObj });
                    } else Object.assign(tmpArr, { [dkey]: finalArr[dkey] });
                });
                setFinalArr(tmpArr);
                displayHTML(tmpArr);
                props.updateProperty(
                    { type: "dynamic", value: tmpArr },
                    bgPropertyName
                );
            } else {
                Object.assign(finalArr, { [sectionType]: saveObj });
                displayHTML(finalArr);
                props.updateProperty(
                    { type: "dynamic", value: finalArr },
                    bgPropertyName
                );
            }

            setImageURL("");
            setImageLink("");
            setImageAlt("");
            setHeadline("");
            setEditorText("");
            changeSections("");
            setContentType("Text");
            setTextTransform("");
            setFontSize("");
            setFontFamily("");
            setFontColor("");
            setLineHeight("");
            setLetterSpacing("");
            setFontWeight("");
            setFontStyle("");
            setTextDecoration("");
            setTextAlignment("");

            setLeftMargin("");
            setTopMargin("");
            setRightMargin("");
            setBottomMargin("");

            setLeftPadding("");
            setTopPadding("");
            setRightPadding("");
            setBottomPadding("");
            //setEditor(null);
            dispatch(
                setAlertMessage({
                    type: "success",
                    message: "Data Saved successfully",
                })
            );
            //            setTimeout(displayHTML(), 1000);
        }
        setEditor(null);
        generateCKEditor();
    };

    const displayClass = (divid, classArr) => {
        let x = ReactDOM.findDOMNode(
            props.refArray.current[props.currentComponent]
        );
        if (x) {
            x.querySelectorAll("#" + divid)[0].classList.remove("lg:w-1/3");
            x.querySelectorAll("#" + divid)[0].classList.remove("px-3");
            x.querySelectorAll("#" + divid)[0].classList.remove("md:w-1/2");
            x.querySelectorAll("#" + divid)[0].classList.remove("lg:w-1/2");
            classArr.forEach((value) => {
                x.querySelectorAll("#" + divid)[0].classList.add(value);
            });
        }
    };

    const displayHTML = (arr) => {
        let className = findClass();
        let x = ReactDOM.findDOMNode(
            props.refArray.current[props.currentComponent]
        );

        if (x) {
            if (Object.keys(arr).includes("Left")) {
                if (arr.Left.display === "Yes") {
                    displayClass("sectionLeft", className);
                    displaySection(arr.Left, "Left");
                    x.querySelectorAll("#sectionLeft")[0].classList.remove("hidden");
                } else {
                    x.querySelectorAll("#sectionLeft")[0].classList.add("hidden");
                }
            } else {
                x.querySelectorAll("#sectionLeft")[0].innerHTML =
                    '<div className="p-4 lg:p-8 flex w-full items-center"></div>';
            }

            if (Object.keys(arr).includes("Center")) {
                if (arr.Center.display == "Yes") {
                    displayClass("sectionCenter", className);
                    displaySection(arr.Center, "Center");
                    x.querySelectorAll("#sectionCenter")[0].classList.remove("hidden");
                } else {
                    x.querySelectorAll("#sectionCenter")[0].classList.add("hidden");
                }
            } else {
                x.querySelectorAll("#sectionCenter")[0].innerHTML =
                    '<div className="p-4 lg:p-8 flex w-full items-center"></div>';
            }
            if (Object.keys(arr).includes("Right")) {
                if (arr.Right.display == "Yes") {
                    displayClass("sectionRight", className);
                    displaySection(arr.Right, "Right");
                    x.querySelectorAll("#sectionRight")[0].classList.remove("hidden");
                } else {
                    x.querySelectorAll("#sectionRight")[0].classList.add("hidden");
                }
            } else {
                x.querySelectorAll("#sectionRight")[0].innerHTML =
                    '<div className="p-4 lg:p-8 flex w-full items-center"></div>';
            }
        }
    };

    useEffect(() => {
        setTimeout(function () {
            displayHTML(finalArr);

            //props.updateProperty({ type: "dynamic", value: finalArr }, bgPropertyName);
        }, 2000);
    }, [finalArr]);

    return (
        <>
            <div className="relative border-b border-neutral-00">
                <button
                    onClick={() => {
                        showHideProperties();
                    }}
                    className="flex w-full flex-wrap justify-between items-center text-sm px-3 py-4 bg-white border-0 font-bold"
                >
                    <span>{props.compprop.title ?? "Image"}</span>
                    <span className="material-icons-outlined">expand_more</span>
                </button>

                <div
                    className={`property-content bg-white border-y border-b-0 border-neutral-200 ${showHide ? "" : "hidden"}`}
                >
                    <div className="mx-2 text-sm">
                        <div className="py-2">
                            <div className="mb-3">
                                <div className="flex justify-between items-center mb-1"></div>
                                <div className="flex flex-wrap divide-x divide-neutral-200 border border-neutral-300 overflow-hidden">
                                    <button
                                        value="Left"
                                        onClick={(event) => {
                                            changeSections(event.target.value);
                                        }}
                                        className={`w-1/3 px-2 py-[5px] inline-flex justify-center items-center text-sm focus:ring-0 focus:shadow-none focus:outline-none ${sectionType === "Left" ? "bg-[#F1F5F9]" : ""}`}
                                        title="Left"
                                    >
                                        <span className="material-icons-outlined  pointer-events-none">
                                            format_align_left
                                        </span>
                                    </button>
                                    <button
                                        value="Center"
                                        onClick={(event) => {
                                            changeSections(event.target.value);
                                        }}
                                        className={`w-1/3 px-2 py-[5px] inline-flex justify-center items-center text-sm focus:ring-0 focus:shadow-none focus:outline-none ${sectionType === "Center" ? "bg-[#F1F5F9]" : ""}`}
                                        title="Left"
                                    >
                                        <span className="material-icons-outlined  pointer-events-none">
                                            format_align_center
                                        </span>
                                    </button>
                                    <button
                                        value="Right"
                                        onClick={(event) => {
                                            changeSections(event.target.value);
                                        }}
                                        className={`w-1/3 px-2 py-[5px] inline-flex justify-center items-center text-sm focus:ring-0 focus:shadow-none focus:outline-none ${sectionType === "Right" ? "bg-[#F1F5F9]" : ""}`}
                                        title="Left"
                                    >
                                        <span className="material-icons-outlined  pointer-events-none">
                                            format_align_right
                                        </span>
                                    </button>
                                </div>
                            </div>

                            <div className={`py-2 ${selectionClass}`} id="selections">
                                <div className="mb-3 last:mb-0">
                                    <div className="flex justify-between items-center mb-1">
                                        <div>Display Section</div>
                                    </div>
                                    <div className="flex flex-wrap divide-x divide-neutral-300 border border-neutral-300 overflow-hidden">
                                        <button
                                            value="Yes"
                                            onClick={changeSectionDisplay}
                                            className={`w-1/2 px-2 py-1.5 inline-flex justify-center items-center text-sm ${sectionDisplay === "Yes" ? "bg-[#F1F5F9]" : "bg-white"}`}
                                            title="Yes"
                                        >
                                            Yes
                                        </button>
                                        <button
                                            value="No"
                                            onClick={changeSectionDisplay}
                                            className={`w-1/2 px-2 py-1.5 inline-flex justify-center items-center text-sm ${sectionDisplay === "No" ? "bg-[#F1F5F9]" : "bg-white"}`}
                                            title="No"
                                        >
                                            No
                                        </button>
                                    </div>
                                </div>

                                <div
                                    id="imagetextdiv"
                                    className={sectionDisplay == "No" ? "hidden" : ""}
                                >
                                    <div className="mb-3 last:mb-0">
                                        <div className="flex justify-between items-center mb-1">
                                            <div>Content Type</div>
                                        </div>
                                        <div className="flex flex-wrap divide-x divide-neutral-300 border border-neutral-300 overflow-hidden">
                                            <button
                                                value="Text"
                                                onClick={changeContentType}
                                                className={`w-1/2 px-2 py-1.5 inline-flex justify-center items-center text-sm ${contentType === "Text" ? "bg-[#F1F5F9]" : "bg-white"}`}
                                                title="Text"
                                            >
                                                <span className="material-icons-outlined pointer-events-none">
                                                    view_headline
                                                </span>
                                            </button>
                                            <button
                                                value="Image"
                                                onClick={changeContentType}
                                                className={`w-1/2 px-2 py-1.5 inline-flex justify-center items-center text-sm ${contentType === "Image" ? "bg-[#F1F5F9]" : "bg-white"}`}
                                                title="Image"
                                            >
                                                <span className="material-icons-outlined pointer-events-none">
                                                    image
                                                </span>
                                            </button>
                                        </div>
                                    </div>

                                    <div
                                        id="textdiv"
                                        className={contentType == "Text" ? "" : "hidden"}
                                    >
                                        <div className="mx-2 text-sm">
                                            <label htmlFor="" className="mb-1 block text-sm">
                                                Description
                                            </label>
                                            {loaderDisplay && <div className="py-2">Loading...</div>}
                                            <div className="py-2">{editor}</div>
                                        </div>
                                        <TextStyleElement
                                            {...props}
                                            variable="Headline1"
                                            changeFontFamily={changeFontFamily1}
                                            changeFontSize={changeFontSize1}
                                            changeLineHeight={changeLineHeight1}
                                            changeFontWeight={changeFontWeight1}
                                            changeBackgroundColor={changeBackgroundColor1}
                                            changeTextTransform={changeTextTransform1}
                                            changeTextAlignment={changeTextAlignment1}
                                            changeFontStyle={changeFontStyle1}
                                            changeLetterSpacing={changeLetterSpacing1}
                                            fontSize={fontSize1}
                                            lineHeight={lineHeight1}
                                            fontWeight={fontWeight1}
                                            fontColor={fontColor1}
                                            textTransform={textTransform1}
                                            textAlignment={textAlignment1}
                                            letterSpacing={letterSpacing1}
                                            fontStyle={fontStyle1}
                                            fontFamily={fontFamily1}
                                            type="carousel"
                                            noPropupdate={true}
                                        />
                                        <ElementMarginPaddingValues
                                            {...props}
                                            variable={bgPropertyName}
                                            changeLeftMargin={changeLeftMargin1}
                                            changeTopMargin={changeTopMargin1}
                                            changeRightMargin={changeRightMargin1}
                                            changeBottomMargin={changeBottomMargin1}
                                            changeLeftPadding={changeLeftPadding1}
                                            changeTopPadding={changeTopPadding1}
                                            changeRightPadding={changeRightPadding1}
                                            changeBottomPadding={changeBottomPadding1}
                                            leftMargin={leftMargin1}
                                            rightMargin={rightMargin1}
                                            topMargin={topMargin1}
                                            bottomMargin={bottomMargin1}
                                            leftPadding={leftPadding1}
                                            rightPadding={rightPadding1}
                                            topPadding={topPadding1}
                                            bottomPadding={bottomPadding1}
                                            noPropupdate={true}
                                        />
                                    </div>

                                    <div
                                        id="imagediv"
                                        className={contentType == "Image" ? "" : "hidden"}
                                    >
                                        <div className="mb-3">
                                            <ImageFile
                                                type="file"
                                                className="sr-only"
                                                name="image1"
                                                id="image1"
                                                buttonName="Add"
                                                folderpath={props.imagePath}
                                                ModelOpen={true}
                                                setOpenImageModel={setOpenImageModel}
                                                // onChange={onElementImageChange}
                                                deleteImage={() => {
                                                    onElementImageChange('')
                                                }}
                                                edibtn={true}
                                                url={imageURL}
                                            />

                                            {OpenImageModel && (
                                                <ImageGallery
                                                    setOpenImageModel={setOpenImageModel}
                                                    onElementImageChange={onElementImageChange}
                                                    folderpath={props.imagePath}
                                                    OpenImageModel={OpenImageModel}
                                                    from={"Element Section Image Text"}
                                                    ImageUploadName={"image1"}
                                                    ImageUploadId={"image1"}
                                                    ImageUrl={imageURL}
                                                />
                                            )}
                                        </div>

                                        <ElementMarginPaddingValues
                                            {...props}
                                            variable={bgPropertyName}
                                            changeLeftMargin={changeLeftMargin1}
                                            changeTopMargin={changeTopMargin1}
                                            changeRightMargin={changeRightMargin1}
                                            changeBottomMargin={changeBottomMargin1}
                                            changeLeftPadding={changeLeftPadding1}
                                            changeTopPadding={changeTopPadding1}
                                            changeRightPadding={changeRightPadding1}
                                            changeBottomPadding={changeBottomPadding1}
                                            leftMargin={leftMargin1}
                                            rightMargin={rightMargin1}
                                            topMargin={topMargin1}
                                            bottomMargin={bottomMargin1}
                                            leftPadding={leftPadding1}
                                            rightPadding={rightPadding1}
                                            topPadding={topPadding1}
                                            bottomPadding={bottomPadding1}
                                            noPropupdate={true}
                                        />

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
                                                    className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded p-3 py-2 leading-tight focus:outline-none focus:bg-white"
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
                                                    className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded p-3 py-2 leading-tight focus:outline-none focus:bg-white"
                                                    defaultValue={imageLink}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="flex justify-between items-center mb-1">
                                            <div>Headline Text</div>
                                        </div>
                                        <div className="text-center relative overflow-hidden">
                                            <input
                                                type="text"
                                                className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded p-3 py-2 leading-tight focus:outline-none focus:bg-white"
                                                value={headline}
                                                onChange={updateHeadline}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-3 last:mb-0">
                                        <div className="flex justify-between font-semibold items-center mb-1">
                                            <div>Headline Formatting</div>
                                        </div>
                                    </div>

                                    <TextStyleElement
                                        {...props}
                                        variable="Headline2"
                                        changeFontFamily={changeFontFamily}
                                        changeFontSize={changeFontSize}
                                        changeLineHeight={changeLineHeight}
                                        changeFontWeight={changeFontWeight}
                                        changeBackgroundColor={changeBackgroundColor}
                                        changeTextTransform={changeTextTransform}
                                        changeTextAlignment={changeTextAlignment}
                                        changeFontStyle={changeFontStyle}
                                        changeLetterSpacing={changeLetterSpacing}
                                        fontSize={fontSize}
                                        lineHeight={lineHeight}
                                        fontWeight={fontWeight}
                                        fontColor={fontColor}
                                        textTransform={textTransform}
                                        textAlignment={textAlignment}
                                        letterSpacing={letterSpacing}
                                        fontStyle={fontStyle}
                                        fontFamily={fontFamily}
                                        type="carousel"
                                        noPropupdate={true}
                                    />

                                    <ElementMarginPaddingValues
                                        {...props}
                                        variable={bgPropertyName}
                                        changeLeftMargin={changeLeftMargin}
                                        changeTopMargin={changeTopMargin}
                                        changeRightMargin={changeRightMargin}
                                        changeBottomMargin={changeBottomMargin}
                                        changeLeftPadding={changeLeftPadding}
                                        changeTopPadding={changeTopPadding}
                                        changeRightPadding={changeRightPadding}
                                        changeBottomPadding={changeBottomPadding}
                                        leftMargin={leftMargin}
                                        rightMargin={rightMargin}
                                        topMargin={topMargin}
                                        bottomMargin={bottomMargin}
                                        leftPadding={leftPadding}
                                        rightPadding={rightPadding}
                                        topPadding={topPadding}
                                        bottomPadding={bottomPadding}
                                        noPropupdate={true}
                                    />
                                </div>
                                <div className="mb-4 last:mb-0">
                                    <button
                                        className="w-full py-[6px] bg-indigo-500 hover:bg-indigo-600 text-white mt-2"
                                        onClick={saveData}
                                    >
                                        + Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ElementSectionImageText;
