import ColorPicker, {
    rgba2hex,
} from "components/admin/content/common/ColorPicker";
import ImageFile from "components/admin/content/common/ImageFile";
import SliderCustom from "components/admin/content/common/SliderCustom";
import { useEffect, useState } from "react";
import ImageGallery from "./../modal/imageGalleryModel/ImageGallery";

var rgbTmp = null;

const ElementBackground = (props) => {
    const [showHide, setShowHide] = useState(false);
    const [imageURL, setImageURL] = useState("");
    const [bgColor, setBgColor] = useState("");
    const [bgImagePosition, setBgImagePosition] = useState("");
    const [bgImageStyle, setBgImageStyle] = useState("");
    const [fixedBackground, setFixedBackground] = useState(false);
    const [isTransparent, setIsTransparent] = useState(false);
    const [bgColorOpacity, setBgColorOpacity] = useState(1);
    const [rgbClr, setRgbClr] = useState(null);
    const [isDeleted, setIsDeleted] = useState(false);

    useEffect(() => {
        rgbTmp = null;
    }, []);

    const changeBgOpacity = (val) => {
        setBgColorOpacity(val);
        props.updateProperty(
            { type: "fixed_bg_opacity_color_opacity", value: val },
            bgPropertyName + "_fixed_bg_color_opacity",
        );
    };

    const setTranspgarentBG = (event) => {
        if (event.target.checked) {
            setIsTransparent(true);
        } else {
            rgbTmp = null;
            props.updateProperty(
                { type: "fixed_bg_opacity_color_hex", value: "" },
                bgPropertyName + "_fixed_bg_color_hex",
            );
            setTimeout(() => {
                props.updateProperty(
                    { type: "fixed_bg_opacity_color_rbg", value: "" },
                    bgPropertyName + "_fixed_bg_color_rgb",
                );
            }, 1000);
            setIsDeleted(true);
            setIsTransparent(false);
            setRgbClr(null);
        }
    };

    const changeTextBackgroundColor = async (color) => {
        if (!color) {
            setIsDeleted(true);
            setRgbClr(null);
            rgbTmp = null;
            await props.updateProperty(
                { type: "fixed_bg_opacity_color_hex", value: "" },
                bgPropertyName + "_fixed_bg_color_hex",
            );
            setTimeout(async () => {
                await props.updateProperty(
                    { type: "fixed_bg_opacity_color_rbg", value: "" },
                    bgPropertyName + "_fixed_bg_color_rgb",
                );
            }, 1000);
            rgbTmp = null;
        } else {
            setIsDeleted(false);
            let obj = color.rgb;
            setRgbClr(color.rgb);
            await props.updateProperty(
                { type: "fixed_bg_opacity_color_hex", value: color.hex },
                bgPropertyName + "_fixed_bg_color_hex",
            );
            setTimeout(async () => {
                await props.updateProperty(
                    {
                        type: "fixed_bg_opacity_color_rbg",
                        value: obj.r + ", " + obj.g + ", " + obj.b,
                    },
                    bgPropertyName + "_fixed_bg_color_rgb",
                );
            }, 1000);
        }
        //props.updateProperty({ type: "fixed_bg", value: false }, bgPropertyName + "_fixed_bg");
    };

    // useEffect(() => {
    // }, [hexColor]);

    const changeFixedBackground = (event) => {
        // let x = ReactDOM.findDOMNode(props.refArray.current[props.currentComponent]);
        if (event.target.checked) {
            //     x.querySelectorAll('#' + props.variable)[0].rel = "nofollow";
            props.updateProperty(
                { type: "fixed_bg", value: true },
                bgPropertyName + "_fixed_bg",
            );
            setFixedBackground(true);
        } else {
            //     x.querySelectorAll('#' + props.variable)[0].rel = "";
            props.updateProperty(
                { type: "fixed_bg", value: false },
                bgPropertyName + "_fixed_bg",
            );
            setFixedBackground(false);
        }
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

    const [backAttributes, setBackAttributes] = useState({});
    const selectedObj = props.componentHtml.filter(
        (obj) => obj.uid == props.currentComponent,
    );
    const [backProp, selectBackProp] = useState({ type: "none", value: "" });
    const [colorOption, changeColorOption] = useState("");
    const [bgStyle, setBgStyle] = useState("fullbg");
    const [OpenImageModel, setOpenImageModel] = useState(false);

    let attributes = {};

    const bgPropertyName = props.variable; //selectedObj.length > 0 ? Object.keys(selectedObj[0].properties).find(key => selectedObj[0].properties[key] === "background") : [];

    /* When click on any component background component will reload and
      we have called function to set default properties */

    useEffect(() => {
        if (backProp.type == "image") {
            setImageURL(backProp.value);
        }
    }, [backProp]);

    useEffect(() => {
        if (selectedObj.length > 0) {
            if (
                selectedObj[0] &&
                selectedObj[0].selected_Values != undefined &&
                Object.keys(selectedObj[0].selected_Values).length > 0
            ) {
                let tmpBgStyle;
                let tmpBgPos;
                let tmpBgImgStyle;
                let tmpRGB;
                Object.entries(selectedObj[0].selected_Values).map(([key, value]) => {
                    if (key == bgPropertyName) {
                        attributes = value;
                    }
                    if (key == bgPropertyName + "_bg_style") {
                        tmpBgStyle = value;
                    }
                    if (key == bgPropertyName + "_bg_image_position") {
                        tmpBgPos = value;
                    }
                    if (key == bgPropertyName + "_bg_image_style") {
                        tmpBgImgStyle = value;
                    }
                    if (key == bgPropertyName + "_fixed_bg") {
                        setFixedBackground(value.value);
                    }
                    // code for save value on load
                    if (key == bgPropertyName + "_fixed_bg_color_opacity") {
                        setBgColorOpacity(value.value);
                    }

                    if (key === bgPropertyName + "_fixed_bg_color_rgb") {
                        if (value.value) {
                            tmpRGB = value.value;
                            setIsTransparent(true);
                        } else {
                            rgbTmp = null;
                        }
                    }

                    if (key === bgPropertyName + "_fixed_bg_color_rgb") {
                        if (value.value) {
                            tmpRGB = value.value;
                        } else {
                            rgbTmp = null;
                        }
                    }
                });

                if (tmpRGB !== undefined && Object.keys(tmpRGB).length > 0) {
                    const str = tmpRGB.split(",");
                    const a = {
                        r: str[0],
                        g: str[1],
                        b: str[2],
                    };
                    rgbTmp = a;
                } else {
                    rgbTmp = null;
                }

                if (attributes != undefined && Object.keys(attributes).length > 0) {
                    selectBackProp(attributes, attributes.type);
                    if (attributes.type) setBackgroundValue(attributes.type);
                    //loadBackgroundDefault(attributes);
                }

                if (tmpBgStyle !== undefined && Object.keys(tmpBgStyle).length > 0) {
                    setBgStyle(tmpBgStyle.value);
                }

                if (tmpBgPos !== undefined && Object.keys(tmpBgPos).length > 0) {
                    setBgImagePosition(tmpBgPos.value);
                }

                if (
                    tmpBgImgStyle !== undefined &&
                    Object.keys(tmpBgImgStyle).length > 0
                ) {
                    setBgImageStyle(tmpBgImgStyle.value);
                }
            } else {
                setBackgroundType("none");
                selectBackProp({ type: "none", value: "" });
            }
        }
    }, [props.currentComponent, selectedObj]);

    // const loadBackgroundDefault = (obj) => {
    //     if(obj.type == "color")
    //     {
    //         props.refArray.current[props.currentComponent].style='background: '+obj.value+';';
    //     }
    //     else if(obj.type == "image")
    //     {
    //         props.refArray.current[props.currentComponent].style='background: url("'+obj.value+'");';
    //     }
    //     else if(obj.type == "none")
    //     {
    //         props.refArray.current[props.currentComponent].style='background: none;';
    //     }
    // }

    /* Function to set component with updated attributes values */
    useEffect(() => {
        if (Object.keys(backAttributes).length > 0) {
            props.setComponentHtml(backAttributes);
        }
    }, [backAttributes]);

    const changeBackgroundColor = (color) => {
        // props.refArray.current[props.currentComponent]
        selectBackProp({ type: "color", value: color.hex });
        props.refArray.current[props.currentComponent].style =
            "background: " + color.hex + ";";
        props.updateProperty({ type: "color", value: color.hex }, bgPropertyName);
        setBgColor(color.hex);
        //setCurrentApp({ ...currentApp, [e.target.id]: e.target.value, ["hospitalID"]: id.hospitalID })
    };

    const [backgroundValue, setBackgroundValue] = useState("none");

    /* Background image change function */
    const onBackgroundImageChange = (url) => {
        // props.refArray.current[props.currentComponent].style.backgroundImage = 'url("' + url + '");';
        props.updateProperty({ type: "image", value: url }, bgPropertyName);
    };

    const onBackgroundImageChangev2 = (url) => {
        props.updateProperty({ type: "image", value: null }, bgPropertyName);
        setTranspgarentBG({
            target: {
                checked: false,
            },
        });
        setImageURL("");
    };

    const changeBGStyle = (event) => {
        setBgStyle(event.target.value);
        props.updateProperty(
            { type: "bgstyle", value: event.target.value },
            bgPropertyName + "_bg_style",
        );
    };

    const changeBGImagePosition = (event) => {
        setBgImagePosition(event.target.value);
        props.updateProperty(
            { type: "bgimageposition", value: event.target.value },
            bgPropertyName + "_bg_image_position",
        );
    };

    const changeBGImageStyle = (event) => {
        setBgImageStyle(event.target.value);
        props.updateProperty(
            { type: "bgimagestyle", value: event.target.value },
            bgPropertyName + "_bg_image_style",
        );
    };
    /* Function to set background type */
    const changeBackgroundType = (event) => {
        if (event.target.value !== backgroundValue) {
            setBackgroundType(event.target.value);
        }
    };
    const setBackgroundType = (val) => {
        const curObj = props.componentHtml.filter(
            (obj) => obj.uid == props.currentComponent,
        );
        if (val == "none") {
            props.refArray.current[props.currentComponent].style = "background: none";
        }
        selectBackProp({ type: val, value: "" });
        props.updateProperty({ type: val, value: "" }, bgPropertyName);
        setBackgroundValue(val);
        if (backProp.type == "image") {
            setImageURL(backProp.value);
        } else {
            setImageURL("");
        }
    };

    useEffect(() => {
        applyBackground();
    }, [
        bgStyle,
        bgImagePosition,
        bgImageStyle,
        bgColor,
        backgroundValue,
        rgbClr,
        bgColorOpacity,
        rgbTmp,
        imageURL,
    ]);

    const removeAllImagePosition = (tmpObj) => {
        tmpObj.classList.remove("bg-center");
        tmpObj.classList.remove("bg-top");
        tmpObj.classList.remove("bg-left");
        tmpObj.classList.remove("bg-right");
        tmpObj.classList.remove("bg-left-top");
        tmpObj.classList.remove("bg-right-top");
        tmpObj.classList.remove("bg-left-bottom");
        tmpObj.classList.remove("bg-right-bottom");
    };

    const applyBackground = () => {
        if (selectedObj[0]) {
            let obj = document.querySelectorAll("#div" + selectedObj[0].no)[0];
            let obj1 = document.querySelectorAll("#indiv" + selectedObj[0].no)[0];
            removeAllImagePosition(obj);
            removeAllImagePosition(obj1);
            if (backgroundValue) {
                if (bgStyle === "fullbg") {
                    obj.classList.remove("bg-contain");
                    obj.classList.remove("bg-cover");

                    if (backgroundValue === "color") {
                        obj.style = "background: " + backProp.value;
                    } else if (backgroundValue === "image") {
                        obj.style = 'background-image: url("' + backProp.value + '")';
                        if (!isDeleted && (rgbClr || rgbTmp)) {
                            const rgb = rgbClr || rgbTmp;
                            obj.style.boxShadow = `inset 0 0 0 2000px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${bgColorOpacity})`;
                        } else {
                            obj.style.boxShadow = `none`;
                        }
                        // obj.style.backgroundImage = 'url("' + backProp.value + '")'
                        if (bgImageStyle) {
                            obj.classList.add(bgImageStyle);
                        }
                    } else obj.style = "background: none";
                    if (bgImagePosition) obj.classList.add(bgImagePosition);
                    // if(bgImageStyle)
                    //     obj.classList.add(bgImageStyle);
                    obj1.style = "";
                    obj1.classList.remove("bg-contain");
                    obj1.classList.remove("bg-cover");
                } else {
                    obj1.classList.remove("bg-contain");
                    obj1.classList.remove("bg-cover");
                    if (backgroundValue === "color") {
                        obj1.style = "background: " + backProp.value;
                    } else if (backgroundValue === "image") {
                        obj1.style = 'background-image: url("' + backProp.value + '")';
                        if (!isDeleted && (rgbClr || rgbTmp)) {
                            const rgb = rgbClr || rgbTmp;
                            obj1.style.boxShadow = `inset 0 0 0 2000px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${bgColorOpacity})`;
                        } else {
                            obj1.style.boxShadow = `none`;
                        }
                        // obj1.style.backgroundImage = 'url("' + backProp.value + '")'
                        if (bgImageStyle) {
                            obj1.classList.add(bgImageStyle);
                        }
                    } else obj1.style = "background: none";
                    if (bgImagePosition) obj1.classList.add(bgImagePosition);
                    // if(bgImageStyle)
                    //     obj1.classList.add(bgImageStyle);

                    obj.style = "";
                    obj.classList.remove("bg-contain");
                    obj.classList.remove("bg-cover");
                }
            }
        }
    };

    /* Update background properties related to element */
    // const updateProperty = (bgObj) => {
    //     const curObj = props.componentHtml.filter(obj => obj.uid == props.currentComponent);

    //     if(bgPropertyName != "")
    //     {
    //         if(curObj[0].selected_Values)
    //         {
    //             attributes = Object.entries(curObj[0].selected_Values).map(([key, value]) => {
    //                 if(key == bgPropertyName)
    //                     return ({[key]: bgObj});
    //                 else
    //                     return ({key: value});
    //             })[0];
    //         }
    //         else
    //         {
    //              attributes = {[bgPropertyName]:  bgObj};
    //         }

    //         const updatedObj = props.componentHtml.map((obj) => {
    //             if(obj.uid == props.currentComponent)
    //             {
    //                 return {...obj, selected_Values: attributes};
    //             }
    //             else{
    //                 return {...obj};
    //             }

    //         });

    //         setBackAttributes(updatedObj);

    //     }
    // }

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
                    <div className="mx-2 text-sm">
                        <div className="py-2">
                            <div className="mb-3 last:mb-0">
                                <div className="flex justify-between items-center mb-1">
                                    <div>Background Style</div>
                                </div>
                                <div className="flex flex-wrap divide-x divide-neutral-300 border border-neutral-300 overflow-hidden">
                                    <button
                                        value="fullbg"
                                        onClick={changeBGStyle}
                                        className={`w-1/2 px-2 py-1.5 inline-flex justify-center items-center text-sm ${bgStyle === "fullbg" ? "bg-[#F1F5F9]" : "bg-white"}`}
                                        title="fullbg"
                                    >
                                        Full Background
                                    </button>
                                    <button
                                        value="boxedbg"
                                        onClick={changeBGStyle}
                                        className={`w-1/2 px-2 py-1.5 inline-flex justify-center items-center text-sm ${bgStyle === "boxedbg" ? "bg-[#F1F5F9]" : "bg-white"}`}
                                        title="boxedbg"
                                    >
                                        Box Background
                                    </button>
                                </div>
                            </div>

                            <div className="mb-3 last:mb-0 flex flex-wrap -mx-1.5">
                                <div className="w-1/2 px-1.5">
                                    <div className="flex justify-between items-center mb-1">
                                        <div>Background Type</div>
                                    </div>
                                    <div className="flex flex-wrap divide-x divide-neutral-300 border border-neutral-300 overflow-hidden">
                                        {props.ThemeVariable.bgOptions.map((value, index) => (
                                            <button
                                                key={index}
                                                value={value.value}
                                                onClick={changeBackgroundType}
                                                className={`w-1/3 px-2 py-[5px] inline-flex justify-center items-center text-sm focus:ring-0 focus:shadow-none focus:outline-none ${value.value === backgroundValue ? "bg-[#F1F5F9]" : "bg-white"}`}
                                                title={value.value}
                                                dangerouslySetInnerHTML={{ __html: value.icon }}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div
                                    className={`w-1/2 px-1.5 ${backgroundValue == "image" ? "" : "hidden"}`}
                                >
                                    <div className="flex justify-between items-center mb-1">
                                        <div>Image Style</div>
                                    </div>
                                    <div className="flex flex-wrap divide-x divide-neutral-300 border border-neutral-300 overflow-hidden">
                                        <button
                                            value="bg-cover"
                                            onClick={changeBGImageStyle}
                                            className={`w-1/2 px-2 py-[5px] inline-flex justify-center items-center text-sm focus:ring-0 focus:shadow-none focus:outline-none ${"bg-cover" === bgImageStyle ? "bg-[#F1F5F9]" : "bg-white"}`}
                                            title="Cover"
                                        >
                                            <span className="material-icons pointer-events-none">
                                                rectangle
                                            </span>
                                        </button>
                                        <button
                                            value="bg-contain"
                                            onClick={changeBGImageStyle}
                                            className={`w-1/2 px-2 py-[5px] inline-flex justify-center items-center text-sm focus:ring-0 focus:shadow-none focus:outline-none ${"bg-contain" === bgImageStyle ? "bg-[#F1F5F9]" : "bg-white"}`}
                                            title="Contain"
                                        >
                                            <span className="material-icons pointer-events-none">
                                                width_wide
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div
                                className={`pt-2 ${backgroundValue == "image" ? "" : "hidden"}`}
                            >
                                <div className="mb-4 last:mb-0">
                                    <label className="flex items-center" htmlFor="no-follow-link">
                                        <input
                                            onChange={changeFixedBackground}
                                            type="checkbox"
                                            id="no-follow-link"
                                            className="form-checkbox"
                                            checked={fixedBackground ? "checked" : ""}
                                        />
                                        <span className="text-sm font-medium ml-2">
                                            Fixed Background
                                        </span>
                                    </label>
                                </div>
                                <div className="mb-3 last:mb-0">
                                    <ImageFile
                                        type="file"
                                        className="sr-only"
                                        name="backgroundImage"
                                        id="backgroundImage"
                                        buttonName="Add"
                                        folderpath={props.imagePath}
                                        ModelOpen={true}
                                        setOpenImageModel={setOpenImageModel}
                                        onChange={onBackgroundImageChangev2}
                                        edibtn={true}
                                        url={imageURL}
                                        backProp={backProp}
                                        showDelete={false}
                                        deleteImage={() => {
                                            onBackgroundImageChange('')
                                        }}
                                    />
                                    {OpenImageModel && (
                                        <ImageGallery
                                            setOpenImageModel={setOpenImageModel}
                                            onElementImageChange={onBackgroundImageChange}
                                            folderpath={props.imagePath}
                                            OpenImageModel={OpenImageModel}
                                            from={"Element Background"}
                                            ImageUploadName={"backgroundImage"}
                                            ImageUploadId={"backgroundImage"}
                                            ImageUrl={imageURL}
                                            backProp={backProp}
                                        />
                                    )}
                                </div>

                                <div className="mb-3 last:mb-0">
                                    <div className="flex justify-between items-center mb-1">
                                        <div>Image Position</div>
                                    </div>
                                    <div className="relative">
                                        <div
                                            id="margin-border"
                                            className="border-2 border-[#CDD7E3] bg-[#CDD7E3] border-dashed mx-5 my-[17px] px-5 py-4 absolute inset-0 z-10"
                                        >
                                            {/* <div id="padding-container" className="bg-[#CDD7E3] mx-7 p-5">
                                                  <div id="padding-border" className="h-20 border-2 border-white border-dashed bg-[#CDD7E3] mx-auto w-28 px-5">
  
                                                  </div>
                                              </div> */}
                                        </div>
                                        <div className="flex flex-wrap justify-around mb-[20px] last:mb-0 relative z-20">
                                            <button
                                                onClick={changeBGImagePosition}
                                                value="bg-left-top"
                                                className={`w-1/3 px-1 py-1 inline-flex justify-center items-center text-sm focus:ring-0 focus:shadow-none focus:outline-none border border-neutral-300 overflow-hidden leading-tight ${"bg-left-top" === bgImagePosition ? "bg-[#F1F5F9]" : "bg-white"}`}
                                                title="Top Left"
                                            >
                                                Top Left
                                            </button>
                                            <button
                                                onClick={changeBGImagePosition}
                                                value="bg-top"
                                                className={`w-1/4 px-1 py-1 inline-flex justify-center items-center text-sm focus:ring-0 focus:shadow-none focus:outline-none border border-neutral-300 overflow-hidden leading-tight ${"bg-top" === bgImagePosition ? "bg-[#F1F5F9]" : "bg-white"}`}
                                                title="Top"
                                            >
                                                Top
                                            </button>
                                            <button
                                                onClick={changeBGImagePosition}
                                                value="bg-right-top"
                                                className={`w-1/3 px-1 py-1 inline-flex justify-center items-center text-sm focus:ring-0 focus:shadow-none focus:outline-none border border-neutral-300 overflow-hidden leading-tight ${"bg-right-top" === bgImagePosition ? "bg-[#F1F5F9]" : "bg-white"}`}
                                                title="Top Right"
                                            >
                                                Top Right
                                            </button>
                                        </div>
                                        <div className="flex flex-wrap justify-around mb-[20px] last:mb-0 relative z-20">
                                            <button
                                                onClick={changeBGImagePosition}
                                                value="bg-left"
                                                className={`w-1/4 px-1 py-1 inline-flex justify-center items-center text-sm focus:ring-0 focus:shadow-none focus:outline-none border border-neutral-300 overflow-hidden leading-tight ${"bg-left" === bgImagePosition ? "bg-[#F1F5F9]" : "bg-white"}`}
                                                title="Left"
                                            >
                                                Left
                                            </button>
                                            <button
                                                onClick={changeBGImagePosition}
                                                value="bg-center"
                                                className={`w-1/4 px-1 py-1 inline-flex justify-center items-center text-sm focus:ring-0 focus:shadow-none focus:outline-none border border-neutral-300 overflow-hidden leading-tight ${"bg-center" === bgImagePosition ? "bg-[#F1F5F9]" : "bg-white"}`}
                                                title="Center"
                                            >
                                                Center
                                            </button>
                                            <button
                                                onClick={changeBGImagePosition}
                                                value="bg-right"
                                                className={`w-1/4 px-1 py-1 inline-flex justify-center items-center text-sm focus:ring-0 focus:shadow-none focus:outline-none border border-neutral-300 overflow-hidden leading-tight ${"bg-right" === bgImagePosition ? "bg-[#F1F5F9]" : "bg-white"}`}
                                                title="Right"
                                            >
                                                Right
                                            </button>
                                        </div>
                                        <div className="flex flex-wrap justify-around mb-[20px] last:mb-0 relative z-20">
                                            <button
                                                onClick={changeBGImagePosition}
                                                value="bg-left-bottom"
                                                className={`w-1/3 px-1 py-1 inline-flex justify-center items-center text-sm focus:ring-0 focus:shadow-none focus:outline-none border border-neutral-300 overflow-hidden leading-tight ${"bg-left-bottom" === bgImagePosition ? "bg-[#F1F5F9]" : "bg-white"}`}
                                                title="Bottom Left"
                                            >
                                                Bottom Left
                                            </button>
                                            <button
                                                onClick={changeBGImagePosition}
                                                value="bg-bottom"
                                                className={`w-1/4 px-1 py-1 inline-flex justify-center items-center text-sm focus:ring-0 focus:shadow-none focus:outline-none border border-neutral-300 overflow-hidden leading-tight ${"bg-bottom" === bgImagePosition ? "bg-[#F1F5F9]" : "bg-white"}`}
                                                title="Bottom"
                                            >
                                                Bottom
                                            </button>
                                            <button
                                                onClick={changeBGImagePosition}
                                                value="bg-right-bottom"
                                                className={`w-1/3 px-1 py-1 inline-flex justify-center items-center text-smfocus:ring-0 focus:shadow-none focus:outline-none border border-neutral-300 overflow-hidden leading-tight ${"bg-right-bottom" === bgImagePosition ? "bg-[#F1F5F9]" : "bg-white"}`}
                                                title="Bottom Right"
                                            >
                                                Bottom Right
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap">
                                    <label
                                        className="flex items-center"
                                        htmlFor="new-window-link2"
                                    >
                                        <input
                                            id="new-window-link2"
                                            x-model="checked"
                                            onChange={setTranspgarentBG}
                                            type="checkbox"
                                            checked={isTransparent ? true : false}
                                        />{" "}
                                        <span className="pl-2">Set Overlay Color</span>
                                    </label>
                                </div>
                                {isTransparent && (
                                    <div className="mt-3 flex flex-wrap">
                                        <ColorPicker
                                            changeBackgroundColor={changeTextBackgroundColor}
                                            value={!isDeleted ? rgbClr || rgbTmp : ""}
                                        />
                                    </div>
                                )}

                                {isTransparent && (
                                    <div className="mt-3 mb-3 last:mb-0">
                                        <div className="mb-3">
                                            <div className="flex justify-between items-center mb-1">
                                                <div className="mb-1">Background Opacity</div>
                                            </div>
                                            <div className="flex flex-wrap">
                                                <div className="w-2/12 px-1.5">
                                                    <div
                                                        className="w-[30px] h-[30px]"
                                                        style={{
                                                            backgroundColor: !isDeleted
                                                                ? rgba2hex(rgbClr || rgbTmp)
                                                                : "" ?? "#cccccc",
                                                            opacity: bgColorOpacity,
                                                        }}
                                                    ></div>
                                                </div>
                                                <div className="w-10/12 px-1.5">
                                                    <div className="w-full">
                                                        <SliderCustom
                                                            dots={false}
                                                            min={0}
                                                            max={1}
                                                            step={0.1}
                                                            defaultValue={bgColorOpacity}
                                                            onSliderChange={(val) => {
                                                                changeBgOpacity(val);
                                                            }}
                                                            marks={[
                                                                { value: 0, label: "0" },
                                                                { value: 0.1 },
                                                                { value: 0.2 },
                                                                { value: 0.3 },
                                                                { value: 0.4 },
                                                                { value: 0.5 },
                                                                { value: 0.6 },
                                                                { value: 0.7 },
                                                                { value: 0.8 },
                                                                { value: 0.9 },
                                                                { value: 1, label: "1" },
                                                            ]}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div
                                className={`pt-2 ${backgroundValue == "color" ? "" : "hidden"}`}
                            >
                                <ColorPicker
                                    changeBackgroundColor={changeBackgroundColor}
                                    value={backProp.type == "color" ? backProp.value : ""}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ElementBackground;
