import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ElementIconBrowser from "./ElementIconBrowser";
import * as ThemeVariable from "components/admin/content/helper/ThemeVariables";
import ElementMarginPaddingValues from "./ElementMarginPaddingValues";
import ColorPicker from "components/admin/content/common/ColorPicker";
import ImageFile from "components/admin/content/common/ImageFile";
import ImageGallery from "./../modal/imageGalleryModel/ImageGallery";

const ElementIcon = (props) => {
    const [imageOrIcon, setImageOrIcon] = useState("Icon");
    const [iconImageURL, setIconImageURL] = useState("");
    const [showHide, setShowHide] = useState(false);
    const [fontSize, setFontSize] = useState("");
    const [fontColor, setFontColor] = useState("");
    const [fontWeight, setFontWeight] = useState("");
    const [textAlignment, setTextAlignment] = useState("");
    const [leftMargin, setLeftMargin] = useState("");
    const [rightMargin, setRightMargin] = useState("");
    const [topMargin, setTopMargin] = useState("");
    const [bottomMargin, setBottomMargin] = useState("");

    const [leftPadding, setLeftPadding] = useState("");
    const [rightPadding, setRightPadding] = useState("");
    const [topPadding, setTopPadding] = useState("");
    const [bottomPadding, setBottomPadding] = useState("");

    const [iconStyle, setIconStyle] = useState("");
    const [iconType, setIconType] = useState("");
    const [OpenImageModel, setOpenImageModel] = useState(false);

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
    const [iconSymbol, setIconSymbol] = useState("");
    const [showModal, setShowModal] = useState(false);
    const selectedObj = props.componentHtml.filter(
        (obj) => obj.uid == props.currentComponent,
    );
    let attributes = {};

    const propertyName = props.variable;

    const changeImageOrIcon = async (event) => {

        setTimeout(async () => {
            await props.updateProperty(
                { type: "iconclass", value: "" },
                bgPropertyName,
            );

            await props.updateProperty(
                { type: "imageoricon", value: event.target.value },
                bgPropertyName + "_image_or_icon",
            );

        }, 1000);
        setIconImageURL('');
        setImageOrIcon(event.target.value);









        if (event.target.value == 'Icon')
            setIconSymbol('');
        else {




        }

        // setIconType('');

        let x = ReactDOM.findDOMNode(
            props.refArray.current[props.currentComponent],
        );
        if (x) {
            x.querySelectorAll("#" + bgPropertyName)[0].classList.add('hidden');
        }


        // setTimeout(function () {displayImageVideo(); }, 1000);
    };

    const displayIcon = () => {

        let className = "";

        if (imageOrIcon === "Icon") {
            props.updateProperty(
                { type: "icon_type", value: iconType },
                bgPropertyName + "_type",
            );
            if (iconType == "fontawesome") {
                className += "";
            } else if (iconType == "googlematerial") {
                className += "material-icons-outlined";
            } else if (iconType == "googlesymbol") {
                className += "material-symbols-outlined";
            }
            if (fontSize) {
                className += " " + fontSize;
            }
            if (fontWeight) {
                className += " " + fontWeight;
            }
        }

        if (leftPadding) {
            className += " " + leftPadding;
        }
        if (rightPadding) {
            className += " " + rightPadding;
        }
        if (topPadding) {
            className += " " + topPadding;
        }
        if (bottomPadding) {
            className += " " + bottomPadding;
        }
        if (leftMargin) {
            className += " " + leftMargin;
        }
        if (rightMargin) {
            className += " " + rightMargin;
        }
        if (topMargin) {
            className += " " + topMargin;
        }
        if (bottomMargin) {
            className += " " + bottomMargin;
        }
        let iconStr = "";
        if (imageOrIcon === "Icon") {
            if (iconSymbol.indexOf('http://') >= 0 || iconSymbol.indexOf('https://') >= 0) {
                iconStr = '';
            }
            else {
                iconStr =
                    '<span class="' +
                    (iconSymbol === "local_offer"
                        ? className.replace("-outlined", "")
                        : className) +
                    '"';
                if (fontColor) iconStr += ' style="color: ' + fontColor + ';"';
                iconStr += ">" + iconSymbol + "</span>";

            }
        } else {
            iconStr = '<span class="' + className + '"';
            iconStr += '><img src="' + iconImageURL + '" /></span>';
        }
        let x = ReactDOM.findDOMNode(
            props.refArray.current[props.currentComponent],
        );
        if (x) {
            x.querySelectorAll("#" + bgPropertyName)[0].classList.remove('hidden');
            x.querySelectorAll("#" + bgPropertyName)[0].innerHTML = iconStr;
            if (textAlignment) {
                x.querySelectorAll("#" + bgPropertyName)[0].className = textAlignment;
            }
        }
    };
    /* Function to set component with updated attributes values */
    const changeLeftMargin = (event) => {
        setLeftMargin(event.target.value);
        props.updateProperty(
            { type: "leftmargin", value: event.target.value },
            bgPropertyName + "_left_margin",
        );
    };

    const changeRightMargin = (event) => {
        setRightMargin(event.target.value);
        props.updateProperty(
            { type: "rightmargin", value: event.target.value },
            bgPropertyName + "_right_margin",
        );
    };

    const changeTopMargin = (event) => {
        setTopMargin(event.target.value);
        props.updateProperty(
            { type: "topmargin", value: event.target.value },
            bgPropertyName + "_top_margin",
        );
    };

    const changeBottomMargin = (event) => {
        setBottomMargin(event.target.value);
        props.updateProperty(
            { type: "bottommargin", value: event.target.value },
            bgPropertyName + "_bottom_margin",
        );
    };

    const changeLeftPadding = (event) => {
        setLeftPadding(event.target.value);
        props.updateProperty(
            { type: "leftpadding", value: event.target.value },
            bgPropertyName + "_left_padding",
        );
    };

    const changeRightPadding = (event) => {
        setRightPadding(event.target.value);
        props.updateProperty(
            { type: "rightpadding", value: event.target.value },
            bgPropertyName + "_right_padding",
        );
    };

    const changeTopPadding = (event) => {
        setTopPadding(event.target.value);
        props.updateProperty(
            { type: "toppadding", value: event.target.value },
            bgPropertyName + "_top_padding",
        );
    };

    const changeBottomPadding = (event) => {
        setBottomPadding(event.target.value);
        props.updateProperty(
            { type: "bottompadding", value: event.target.value },
            bgPropertyName + "_bottom_padding",
        );
    };

    const changeFontSize = (event) => {
        setFontSize(event.target.value);
        props.updateProperty(
            { type: "fontsize", value: event.target.value },
            bgPropertyName + "_font_size",
        );
    };

    const changeFontWeight = (event) => {
        setFontWeight(event.target.value);
        props.updateProperty(
            { type: "fontweight", value: event.target.value },
            bgPropertyName + "_font_weight",
        );
    };

    useEffect(() => {
        if (selectedObj.length > 0) {
            if (
                selectedObj[0].selected_Values != undefined &&
                Object.keys(selectedObj[0].selected_Values).length > 0
            ) {
                let tmp;
                let tmpFontSize;
                let tmpFontWeight;
                let tmpTextAlignment;
                let tmpFontColor;
                let tmpLeftMargin;
                let tmpRightMargin;
                let tmpTopMargin;
                let tmpBottomMargin;
                let tmpLeftPadding;
                let tmpRightPadding;
                let tmpTopPadding;
                let tmpBottomPadding;
                let tmpIconType;
                let tmpImageOrIcon;
                Object.entries(selectedObj[0].selected_Values).map(([key, value]) => {
                    if (key == bgPropertyName) {
                        setIconSymbol(value.value);
                        setIconImageURL(value.value);
                    }
                    if (key == bgPropertyName + "_type") {
                        setIconType(value.value);
                    }
                    if (key == bgPropertyName + "_image_or_icon") {
                        setImageOrIcon(value.value);
                    }
                    if (key == bgPropertyName + "_font_color") {
                        setFontColor(value.value);
                    }
                    if (key == bgPropertyName + "_font_size") {
                        setFontSize(value.value);
                    }
                    if (key == bgPropertyName + "_font_weight") {
                        setFontWeight(value.value);
                    }
                    if (key == bgPropertyName + "_text_alignment") {
                        setTextAlignment(value.value);
                    }
                    if (key == bgPropertyName + "_left_margin") {
                        setLeftMargin(value.value);
                    }
                    if (key == bgPropertyName + "_right_margin") {
                        setRightMargin(value.value);
                    }
                    if (key == bgPropertyName + "_top_margin") {
                        setTopMargin(value.value);
                    }
                    if (key == bgPropertyName + "_bottom_margin") {
                        setBottomMargin(value.value);
                    }
                    if (key == bgPropertyName + "_left_padding") {
                        setLeftPadding(value.value);
                    }
                    if (key == bgPropertyName + "_right_padding") {
                        setRightPadding(value.value);
                    }
                    if (key == bgPropertyName + "_top_padding") {
                        setTopPadding(value.value);
                    }
                    if (key == bgPropertyName + "_bottom_padding") {
                        setBottomPadding(value.value);
                    }
                });
            } else {
                setIconSymbol("");
                //updateProperty({[bgPropertyName]: imageURL});
            }
        }

        if (imageOrIcon === "Image") {
            setIconImageURL(iconSymbol);
        }
    }, [props.currentComponent]);

    const updateFont = (type, value) => {
        props.updateProperty({ type: "iconclass", value: value }, bgPropertyName);
        setIconType(type);
        setIconSymbol(value);
    };

    useEffect(() => {
        displayIcon();
    }, [
        iconImageURL,
        imageOrIcon,
        iconSymbol,
        iconType,
        leftMargin,
        leftPadding,
        rightMargin,
        rightPadding,
        topMargin,
        topPadding,
        bottomMargin,
        bottomPadding,
        fontColor,
        fontSize,
        textAlignment,
        fontWeight,
    ]);

    const changeBackgroundColor = (color) => {
        setFontColor(color.hex);
        props.updateProperty(
            { type: "fontcolor", value: color.hex },
            bgPropertyName + "_font_color",
        );

        //applyFinalClasses();
    };

    const changeTextAlignment = (event) => {
        setTextAlignment(event.target.value);
        props.updateProperty(
            { type: "alignment", value: event.target.value },
            bgPropertyName + "_text_alignment",
        );

        //applyFinalClasses();
    };

    const onElementIconImageChange = (url) => {
        setIconImageURL(url);
        props.updateProperty({ type: "iconclass", value: url }, bgPropertyName);
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
                    <span>{props.compprop.title ?? "Icon"}</span>
                    <span className="material-icons-outlined">expand_more</span>
                </button>

                <div
                    className={`property-content bg-white border-y border-b-0 border-neutral-200 ${showHide ? "" : "hidden"}`}
                >
                    <div className="mx-2 text-sm">
                        <div className="py-2">
                            <div className="mb-3 last:mb-0">
                                <div className="flex flex-wrap divide-x divide-neutral-300 border border-neutral-300 overflow-hidden">
                                    <button
                                        value="Icon"
                                        onClick={changeImageOrIcon}
                                        className={`w-1/2 px-2 py-1.5 inline-flex justify-center items-center text-sm ${imageOrIcon === "Icon" ? "bg-[#F1F5F9]" : "bg-white"}`}
                                        title="Image"
                                    >
                                        Icon
                                    </button>
                                    <button
                                        value="Image"
                                        onClick={changeImageOrIcon}
                                        className={`w-1/2 px-2 py-1.5 inline-flex justify-center items-center text-sm ${imageOrIcon === "Image" ? "bg-[#F1F5F9]" : "bg-white"}`}
                                        title="Icon"
                                    >
                                        Image
                                    </button>
                                </div>
                            </div>

                            {imageOrIcon === "Image" && (
                                <>
                                    <div className="mb-3">
                                        <label for="" className="mb-1 block text-sm">
                                            Icon
                                        </label>
                                        <ImageFile
                                            type="file"
                                            className="sr-only"
                                            name={`image${bgPropertyName}`}
                                            id={`image${bgPropertyName}`}
                                            buttonName="Choose Image"
                                            folderpath={props.imagePath}
                                            ModelOpen={true}
                                            setOpenImageModel={setOpenImageModel}
                                            // onChange={onElementIconImageChange}
                                            edibtn={true}
                                            deleteImage={() => {
                                                onElementIconImageChange('')
                                            }}
                                            url={iconImageURL}
                                        />
                                        {OpenImageModel && (
                                            <ImageGallery
                                                setOpenImageModel={setOpenImageModel}
                                                onElementImageChange={onElementIconImageChange}
                                                folderpath={props.imagePath}
                                                OpenImageModel={OpenImageModel}
                                                from={"Element Icon"}
                                                ImageUploadName={`image${bgPropertyName}`}
                                                ImageUploadId={`image${bgPropertyName}`}
                                                ImageUrl={iconImageURL}
                                            />
                                        )}
                                    </div>
                                </>
                            )}

                            {imageOrIcon === "Icon" && (
                                <>
                                    <div className="mb-4 last:mb-0 flex justify-between">
                                        <label htmlFor="" className="mb-1 block text-sm">
                                            Icon Style
                                        </label>
                                        <div className="flex flex-wrap">
                                            <span
                                                id="icon_style"
                                                className="text-center"
                                                style={{ marginRight: "10px" }}
                                            >
                                                <span
                                                    className={`${iconType === "googlematerial" ? "material-icons-outlined" : iconType === "googlesymbol" ? "material-symbols-outlined" : ""}`}
                                                >
                                                    {iconSymbol}
                                                </span>
                                            </span>
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
                                                    onChange={changeFontSize}
                                                    value={fontSize}
                                                    className="grow text-sm bg-gray-100 text-gray-700 border border-gray-200 p-3 py-2 leading-tight focus:ring-0 focus:shadow-none focus:outline-none focus:bg-white"
                                                >
                                                    <option value="None">None</option>
                                                    {ThemeVariable.FontSize.map((value, index) => (
                                                        <option key={index} value={value.value}>
                                                            {value.label}
                                                        </option>
                                                    ))}
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
                                                    onChange={changeFontWeight}
                                                    value={fontWeight}
                                                    className="grow text-sm bg-gray-100 text-gray-700 border border-gray-200 p-3 py-2  leading-tight focus:ring-0 focus:shadow-none focus:outline-none focus:bg-white"
                                                >
                                                    <option value="None">None</option>
                                                    {ThemeVariable.FontWeight.map((value, index) => (
                                                        <option key={index} value={value.value}>
                                                            {value.label}
                                                        </option>
                                                    ))}
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
                                        <label htmlFor="" className="mb-1 block text-sm">
                                            Icon Color
                                        </label>
                                        <div className="flex flex-wrap">
                                            <ColorPicker
                                                changeBackgroundColor={changeBackgroundColor}
                                                value={fontColor}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            <div className="mb-4 last:mb-0">
                                <div className="flex justify-between items-center mb-1">
                                    <div>Alignment</div>
                                </div>
                                <div className="flex flex-wrap divide-x divide-neutral-200 border border-neutral-200 overflow-hidden">
                                    {ThemeVariable.FontAlignment.map((alignment) => (
                                        <button
                                            value={alignment.value}
                                            onClick={changeTextAlignment}
                                            className={`w-1/4 px-2 py-1 inline-flex justify-center items-center text-sm focus:ring-0 focus:shadow-none focus:outline-none ${textAlignment === alignment.value ? "bg-[#F1F5F9]" : "bg-white"}`}
                                            dangerouslySetInnerHTML={{ __html: alignment.icon }}
                                        />
                                    ))}
                                </div>
                            </div>

                            {
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
                                    type="ca"
                                    noPropupdate={true}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ElementIcon;
