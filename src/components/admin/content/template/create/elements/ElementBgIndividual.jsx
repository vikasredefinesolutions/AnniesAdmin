import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import ImageFile from "components/admin/content/common/ImageFile";
import ColorPicker from "components/admin/content/common/ColorPicker";
import ToggleButton from "components/admin/content/common/ToggleButton";
import ImageGallery from "../modal/imageGalleryModel/ImageGallery";
import { v4 as uuid } from "uuid";

const ElementBgIndividual = (props) => {
    const selectedObj = props.componentHtml.filter(
        (obj) => obj.uid == props.currentComponent,
    );
    const [showHide, setShowHide] = useState(false);
    const [imageURL, setImageURL] = useState("");
    const [bgColor, setBgColor] = useState("");
    const [imageOrBg, setImageOrBg] = useState("Color");
    const [textColor, setTextColor] = useState("");
    const [textLink, setTextLink] = useState("");
    const [hoverSectionHide] = useState(props.compprop.hoveroption ?? true);
    const [linkOption] = useState(props.compprop.linkoption ?? true);
    const [hoverImageURL, setHoverImageURL] = useState("");
    const [hoverBgColor, setHoverBgColor] = useState(
        selectedObj.length &&
            selectedObj[0]?.selected_Values?.leftBoxBg_hover_option?.value
            ? selectedObj[0]?.selected_Values?.leftBoxBg_hover_option?.value
            : "",
    );
    const [hoverImageOrBg, setHoverImageOrBg] = useState("Color");
    const [hoverTextColor, setHoverTextColor] = useState(
        selectedObj.length &&
            selectedObj[0]?.selected_Values?.leftBoxBg_hover_option?.value
            ? selectedObj[0]?.selected_Values?.leftBoxBg_text_color_hover?.value
            : "",
    );
    const [showDetailOnHover, setShowDetailOnHover] = useState("Off");
    const [OpenImageModel, setOpenImageModel] = useState(false);
    const bgPropertyName = props.variable; //selectedObj.length > 0 ? Object.keys(selectedObj[0].properties).find(key => selectedObj[0].properties[key] === "background") : [];
    let attributes = {};

    /* When click on any component background component will reload and we have called function to set default properties */
    useEffect(() => {
        if (selectedObj.length > 0) {
            if (
                selectedObj[0] &&
                selectedObj[0].selected_Values != undefined &&
                Object.keys(selectedObj[0].selected_Values).length > 0
            ) {
                let tmpBgType;
                let tmpHoverBGType;
                let tmpHoverBg;
                let tmpTextColor;
                let tmpHoverTextColor;
                let tmpLink;
                let tmpShowDetailOnHover;
                Object.entries(selectedObj[0].selected_Values).map(([key, value]) => {
                    if (key == bgPropertyName) {
                        attributes = value;
                    }
                    if (key == bgPropertyName + "_bg_type") {
                        tmpBgType = value;
                    }
                    if (key == bgPropertyName + "_hover_option") {
                        tmpHoverBg = value;
                    }
                    if (key == bgPropertyName + "_bg_type_hover") {
                        tmpHoverBGType = value;
                    }
                    if (key == bgPropertyName + "_text_color") {
                        tmpTextColor = value;
                    }
                    if (key == bgPropertyName + "_text_color_hover") {
                        tmpHoverTextColor = value;
                    }
                    if (key == bgPropertyName + "_link") {
                        tmpLink = value;
                    }
                    if (key == bgPropertyName + "_showDetailOnHover") {
                        tmpShowDetailOnHover = value;
                    }
                });

                if (attributes != undefined && Object.keys(attributes).length > 0) {
                    setBgColor(attributes.value);
                    setImageURL(attributes.value);
                }
                if (tmpBgType != undefined && Object.keys(tmpBgType).length > 0) {
                    setImageOrBg(tmpBgType.value);
                    if (tmpBgType.value === "Color") setImageURL("");
                    else if (tmpBgType.value === "Image") setBgColor("");
                } else {
                    setImageOrBg("Color");
                }

                if (
                    tmpHoverBGType != undefined &&
                    Object.keys(tmpHoverBGType).length > 0
                ) {
                    setHoverImageOrBg(tmpHoverBg.value);
                    if (tmpHoverBGType.value === "Color") {
                        setHoverImageURL("");
                        setHoverBgColor(tmpHoverBg.value);
                    } else if (tmpHoverBGType.value === "Image") {
                        setHoverBgColor("");
                        setHoverImageURL(tmpHoverBg.value);
                    }
                } else {
                    if (tmpHoverBg != undefined && Object.keys(tmpHoverBg).length > 0) {
                        setHoverBgColor(tmpHoverBg.value);
                        if (tmpHoverBg.value.includes("http")) {
                            setHoverImageOrBg("Image");
                        } else {
                            setHoverImageOrBg("Color");
                        }
                    } else {
                        setHoverImageOrBg("Color");
                    }
                }

                if (tmpLink != undefined && Object.keys(tmpLink).length > 0) {
                    setTextLink(tmpLink.value);
                }
                if (tmpShowDetailOnHover) {
                    setShowDetailOnHover(tmpShowDetailOnHover.value);
                }

                if (tmpHoverTextColor) {
                    setHoverTextColor(tmpHoverTextColor);
                }
            } else {
                setBgColor("");
                setHoverBgColor("");
                setImageURL("");
                setHoverImageURL("");
                setImageOrBg("Color");
                setHoverImageOrBg("Color");
            }
        }
    }, [props.currentComponent]);

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

    /* Function to set component with updated attributes values */
    const changeBackgroundColor = (color) => {
        props.updateProperty(
            { type: "individualbg", value: color.hex },
            bgPropertyName,
        );
        setBgColor(color.hex);
    };

    const changeBackgroundColor1 = (color) => {
        props.updateProperty(
            { type: "individualhoverbg", value: color.hex },
            bgPropertyName + "_hover_option",
        );
        setHoverBgColor(color.hex);
    };

    const changeTextColor = (color) => {
        props.updateProperty(
            { type: "textcolor", value: color.hex },
            bgPropertyName + "_text_color",
        );
        setTextColor(color.hex);
    };

    const changeShowDetailOnHover = (showDetails) => {
        if (showDetails) setShowDetailOnHover("On");
        else {
            setShowDetailOnHover("Off");
        }
        props.updateProperty(
            { type: "showDetailOnHover", value: showDetails ? "On" : "Off" },
            bgPropertyName + "_showDetailOnHover",
        );
    };

    const changeHoverTextColor = (color) => {
        props.updateProperty(
            { type: "textcolor_hover", value: color.hex },
            bgPropertyName + "_text_color_hover",
        );
        setHoverTextColor(color.hex);
    };

    useEffect(() => {
        applyBackground();
    }, [bgColor, imageURL, hoverBgColor, hoverImageURL, hoverTextColor]);

    const applyBackground = () => {
        console.log("bgPropertyName ", bgPropertyName);
        if (selectedObj[0]) {
            let x = ReactDOM.findDOMNode(
                props.refArray.current[props.currentComponent],
            );
            if (x && x.querySelectorAll("#" + props.variable).length > 0) {
                if (imageOrBg === "Color") {
                    x.querySelectorAll("#" + bgPropertyName)[0].style =
                        "background: " + bgColor;
                } else if (imageOrBg === "Image") {
                    x.querySelectorAll("#" + bgPropertyName)[0].style =
                        "background-image: url('" + imageURL + "')";
                }
                if (hoverSectionHide) {
                    if (hoverImageOrBg === "Color") {
                        x.querySelectorAll("#" + bgPropertyName + "Hover")[0].style =
                            "background: " + hoverBgColor;
                    } else if (hoverImageOrBg === "Image") {
                        x.querySelectorAll("#" + bgPropertyName + "Hover")[0].style =
                            "background-image: url('" + hoverImageURL + "')";
                    }
                }
                if (hoverTextColor) {
                    let pName = bgPropertyName.replace("Bg", "");
                    x.querySelectorAll("#" + pName)[0].style =
                        `--hover-color: ${hoverTextColor.value}`;
                    // x.querySelectorAll('#' + bgPropertyName)[0].appendChild()
                }
            }
        }
    };

    const changeImageOrBg = (event) => {
        setImageOrBg(event.target.value);
        props.updateProperty(
            { type: "individualbgtype", value: event.target.value },
            bgPropertyName + "_bg_type",
        );
        setBgColor("");
        setImageURL("");
    };

    const changeHoverImageOrBg = (event) => {
        setHoverImageOrBg(event.target.value);
        props.updateProperty(
            { type: "individualbgtype_hover", value: event.target.value },
            bgPropertyName + "_bg_type_hover",
        );
        setHoverBgColor("");
        setHoverImageURL("");
    };

    const onElementImageChange = (url) => {
        setImageURL(url);
        props.updateProperty({ type: "individualbg", value: url }, bgPropertyName);
    };

    const onElementHoverImageChange = (url) => {
        setHoverImageURL(url);
        props.updateProperty(
            { type: "individualbg_hover", value: url },
            bgPropertyName + "_hover_option",
        );
    };

    const changeTextLink = (event) => {
        setTextLink(event.target.value);
        props.updateProperty(
            { type: "individualbg_hover", value: event.target.value },
            bgPropertyName + "_link",
        );
        if (selectedObj[0]) {
            let x = ReactDOM.findDOMNode(
                props.refArray.current[props.currentComponent],
            );
            if (x && x.querySelectorAll("#" + bgPropertyName + "Link").length > 0) {
                //x.querySelectorAll('#'+bgPropertyName+"Link")[0].href = event.target.value;
            }
        }
    };

    useEffect(() => {
        let x = ReactDOM.findDOMNode(
            props.refArray.current[props.currentComponent],
        );
        if (showDetailOnHover === "On") {
            if (
                x.querySelectorAll("#" + bgPropertyName + "TextColor").length > 0 &&
                x.querySelectorAll("#" + bgPropertyName + "TextColor")[0].innerHTML !==
                ""
            ) {
                x.querySelectorAll("#" + bgPropertyName + "Hover")[0].innerHTML =
                    x.querySelectorAll("#" + bgPropertyName + "TextColor")[0].innerHTML;
                x.querySelectorAll("#" + bgPropertyName + "TextColor")[0].innerHTML =
                    "";
            }
        } else {
            if (
                x.querySelectorAll("#" + bgPropertyName + "Hover").length > 0 &&
                x.querySelectorAll("#" + bgPropertyName + "Hover")[0].innerHTML !== ""
            ) {
                x.querySelectorAll("#" + bgPropertyName + "TextColor")[0].innerHTML =
                    x.querySelectorAll("#" + bgPropertyName + "Hover")[0].innerHTML;
                x.querySelectorAll("#" + bgPropertyName + "Hover")[0].innerHTML = "";
            }
        }
    }, [showDetailOnHover]);
    return (
        <>
            <div className="relative border-b border-neutral-00">
                <button
                    onClick={() => {
                        showHideProperties();
                    }}
                    className="flex w-full flex-wrap justify-between items-center text-sm px-3 py-4 bg-white border-0 font-bold"
                >
                    <span>{props.compprop.title ?? "Background"}</span>
                    <span className="material-icons-outlined">expand_more</span>
                </button>

                <div
                    className={`property-content bg-white border-y border-b-0 border-neutral-200 ${showHide ? "" : "hidden"}`}
                >
                    <div className="w-full py-2 px-3">
                        {linkOption && (
                            <div className="mb-4 last:mb-0">
                                <label htmlFor="" className="mb-1 block text-sm">
                                    Link{" "}
                                </label>
                                <div className="flex flex-wrap">
                                    <input
                                        onChange={changeTextLink}
                                        type="text"
                                        value={textLink}
                                        className="grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="mb-3">
                            <div className="flex justify-between items-center mb-1">
                                <div>Background Type</div>
                            </div>
                            <div className="flex flex-wrap">
                                <select
                                    value={imageOrBg}
                                    onChange={changeImageOrBg}
                                    className="grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
                                >
                                    <option value="">Select</option>
                                    <option value="Color">Color</option>
                                    <option value="Image">Image</option>
                                </select>
                            </div>
                        </div>

                        {imageOrBg === "Color" ? (
                            <>
                                <div className="mb-3 last:mb-0">
                                    <ColorPicker
                                        changeBackgroundColor={changeBackgroundColor}
                                        value={bgColor}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="mb-3" x-data="{ modalOpen: false }">
                                    <ImageFile
                                        type="file"
                                        className="sr-only"
                                        name={bgPropertyName}
                                        id={bgPropertyName}
                                        buttonName="Choose Image"
                                        folderpath={props.imagePath}
                                        ModelOpen={true}
                                        setOpenImageModel={setOpenImageModel}
                                        // onChange={onElementImageChange}
                                        edibtn={true}
                                        url={imageURL}
                                        deleteImage={() => {
                                            onElementImageChange('');
                                        }}
                                    />

                                    {OpenImageModel && (
                                        <ImageGallery
                                            setOpenImageModel={setOpenImageModel}
                                            onElementImageChange={onElementImageChange}
                                            folderpath={props.imagePath}
                                            OpenImageModel={OpenImageModel}
                                            from={"Element BgIndividual"}
                                            ImageUploadName={bgPropertyName}
                                            ImageUploadId={bgPropertyName}
                                            ImageUrl={imageURL}
                                        />
                                    )}
                                </div>
                            </>
                        )}

                        {hoverSectionHide && (
                            <>
                                <div className="mb-3 last:mb-0 hidden">
                                    <label htmlFor="" className="mb-1 block text-sm">
                                        Text Color
                                    </label>
                                    <ColorPicker
                                        changeBackgroundColor={changeTextColor}
                                        value={textColor}
                                    />
                                </div>
                                <div className="mb-3">
                                    <div className="flex justify-between items-center mb-1">
                                        <div>Hover Background Type</div>
                                    </div>
                                    <div className="flex flex-wrap">
                                        <select
                                            value={hoverImageOrBg}
                                            onChange={changeHoverImageOrBg}
                                            className="grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
                                        >
                                            <option value="">Select</option>
                                            <option value="Color">Color</option>
                                            <option value="Image">Image</option>
                                        </select>
                                    </div>
                                </div>

                                {hoverImageOrBg === "Color" ? (
                                    <>
                                        <div className="mb-3 last:mb-0">
                                            <ColorPicker
                                                changeBackgroundColor={changeBackgroundColor1}
                                                value={hoverBgColor}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="mb-3" x-data="{ modalOpen: false }">
                                            <ImageFile
                                                type="file"
                                                className="sr-only"
                                                name={bgPropertyName + "_hover"}
                                                id={bgPropertyName + "_hover"}
                                                buttonName="Choose Image"
                                                folderpath={props.imagePath}
                                                ModelOpen={true}
                                                setOpenImageModel={setOpenImageModel}
                                                // onChange={onElementHoverImageChange}
                                                edibtn={true}
                                                url={hoverImageURL}
                                                deleteImage={() => {
                                                    onElementHoverImageChange('')
                                                }}
                                            />

                                            {OpenImageModel && (
                                                <ImageGallery
                                                    setOpenImageModel={setOpenImageModel}
                                                    onElementImageChange={onElementHoverImageChange}
                                                    folderpath={props.imagePath}
                                                    OpenImageModel={OpenImageModel}
                                                    from={"Element BgIndividual"}
                                                    ImageUploadName={bgPropertyName}
                                                    ImageUploadId={bgPropertyName}
                                                    ImageUrl={hoverImageURL}
                                                />
                                            )}
                                        </div>
                                    </>
                                )}
                                <div className="mb-3 last:mb-0">
                                    <label htmlFor="" className="mb-1 block text-sm">
                                        Hover Text Color
                                    </label>
                                    <ColorPicker
                                        changeBackgroundColor={changeHoverTextColor}
                                        value={hoverTextColor}
                                    />
                                </div>
                                <div className="py-2">
                                    <div className="grid grid-cols-12 gap-4 mb-4 last:mb-0">
                                        <div className="col-span-full sm:col-span-8 xl:col-span-8">
                                            <label className="text-gray-500">
                                                <strong>Show Info on Hover</strong>
                                            </label>
                                        </div>
                                        <div className="col-span-full sm:col-span-4 xl:col-span-4">
                                            <div className="flex items-center">
                                                <ToggleButton
                                                    id={`${bgPropertyName}_showDetailOnHover`}
                                                    defaultValue={showDetailOnHover}
                                                    onChange={(data) => {
                                                        changeShowDetailOnHover(data.target.checked);
                                                    }}
                                                    name={`${bgPropertyName}_showDetailOnHover`}
                                                    on={"Yes"}
                                                    off={"No"}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ElementBgIndividual;
