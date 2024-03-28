import vimeoIcon from "assets/images/vimeo.png";
import youTubeIcon from "assets/images/youtube.png";
import ImageFile from "components/admin/content/common/ImageFile";
import Input from "components/admin/content/common/Input";
import SliderCustom from "components/admin/content/common/SliderCustom";
import * as ThemeVariable from "components/admin/content/helper/ThemeVariables";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ImageGallery from "./../modal/imageGalleryModel/ImageGallery";
import ElementMarginPaddingValues from "./ElementMarginPaddingValues";
const ElementImage = (props) => {
    const [imageHVPosition, setImageHVPosition] = useState("");
    const [leftPadding, setLeftPadding] = useState("");
    const [topPadding, setTopPadding] = useState("");
    const [rightPadding, setRightPadding] = useState("");
    const [bottomPadding, setBottomPadding] = useState("");
    const [leftMargin, setLeftMargin] = useState("");
    const [topMargin, setTopMargin] = useState("");
    const [rightMargin, setRightMargin] = useState("");
    const [bottomMargin, setBottomMargin] = useState("");

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
    const [isCentered, setIsCentered] = useState(true);
    const [imageURL, setImageURL] = useState("");
    const [imageAlt, setImageAlt] = useState("");
    const [imageLink, setImageLink] = useState("");
    const [videoType, setVideoType] = useState("");
    const [imageOrVideo, setImageOrVideo] = useState("Image");
    const [videoUrl, setVideoUrl] = useState("");
    const [imagePosition, setImagePosition] = useState("");
    const [roundDisplay, setRoundDisplay] = useState(false);
    const [imageStyle, setImageStyle] = useState("");
    const [roundedSize, setRoundedSize] = useState("");
    const [imageSize, setImageSize] = useState("");
    const selectedObj = props.componentHtml.filter(
        (obj) => obj.uid == props.currentComponent
    );
    const [textEffect, setTextEffect] = useState("");
    const [transitionDuration, setTransitionDuration] = useState("");
    const [easeOption, setEaseOption] = useState("");
    const [transitionEffect, setTransitionEffect] = useState("");
    const [scaleOptionStart, setScaleOptionStart] = useState("");
    const [scaleOptionEnd, setScaleOptionEnd] = useState("");
    const [fadeOpacityStart, setFadeOpacityStart] = useState("");
    const [fadeOpacityEnd, setFadeOpacityEnd] = useState("");
    const [skewPosition, setSkewPosition] = useState("");
    const [rotatePosition, setRotatePosition] = useState("");
    const [translatePosition, setTranslatePosition] = useState("");
    const [imageTextPosition, setImageTextPosition] = useState("Top");

    const [imageHide, setImageHide] = useState(false);
    const [OpenImageModel, setOpenImageModel] = useState(false);

    const changeTransitionDuration = (value) => {
        setTransitionDuration(value);
        props.updateProperty(
            { type: "trasitionduration", value: value },
            bgPropertyName + "_transition_duration"
        );
    };

    const changeEaseOption = (event) => {
        setEaseOption(event.target.value);
        props.updateProperty(
            { type: "easeoption", value: event.target.value },
            bgPropertyName + "_ease_option"
        );
    };

    const changeTransitionEffect = (event) => {
        setTransitionEffect(event.target.value);
        props.updateProperty(
            { type: "transitioneffect", value: event.target.value },
            bgPropertyName + "_transition_effect"
        );
    };

    const changeScaleOptionStart = (value) => {
        setScaleOptionStart("scale-" + value);
        props.updateProperty(
            { type: "scaleoptionstart", value: "scale-" + value },
            bgPropertyName + "_scale_option_start"
        );
    };

    const changeScaleOptionEnd = (value) => {
        setScaleOptionEnd("scale-" + value);
        props.updateProperty(
            { type: "scaleoptionend", value: "scale-" + value },
            bgPropertyName + "_scale_option_end"
        );
    };

    const changeFadeOpacityStart = (value) => {
        setFadeOpacityStart("opacity-" + value);
        props.updateProperty(
            { type: "fadeopacitystart", value: "opacity-" + value },
            bgPropertyName + "_fade_opacity_start"
        );
    };

    const changeFadeOpacityEnd = (value) => {
        setFadeOpacityEnd("opacity-" + value);
        props.updateProperty(
            { type: "fadeopacityend", value: "opacity-" + value },
            bgPropertyName + "_fade_opacity_end"
        );
    };

    const changeSkewPosition = (event) => {
        setSkewPosition(event.target.value);
        props.updateProperty(
            { type: "skewposition", value: event.target.value },
            bgPropertyName + "_skew_position"
        );
    };

    const changeRotatePosition = (value) => {
        setRotatePosition("rotate-" + value);
        props.updateProperty(
            { type: "rotateposition", value: "rotate-" + value },
            bgPropertyName + "_rotate_position"
        );
    };

    const changeTranslatePosition = (event) => {
        setTranslatePosition(event.target.value);
        props.updateProperty(
            { type: "translateposition", value: event.target.value },
            bgPropertyName + "_translate_position"
        );
    };

    /* Function to set component with updated attributes values */

    useEffect(() => {
        setImageURL("");
        setImageAlt("");
        setImageLink("");
        if (selectedObj.length > 0) {
            if (
                selectedObj[0].selected_Values != undefined &&
                Object.keys(selectedObj[0].selected_Values).length > 0
            ) {
                let tmp;
                let tmpAlt;
                let tmpLink;
                let tmpPosition;
                let tmpVideo = false;
                let tmpVideoType;
                let tmpVideoUrl;
                let tmpSize;
                let tmpStyle;
                let tmpRoundSize;
                let tmpTransitionDuration;
                let tmpEaseOption;
                let tmpTransitionEffect;
                let tmpScaleOptionStart;
                let tmpScaleOptionEnd;
                let tmpFadeOpacityStart;
                let tmpFadeOpacityEnd;
                let tmpSkewPosition;
                let tmpRotatePosition;
                let tmpTranslatePosition;
                let tmpImageorVideo = "";
                let tmpLeftMargin;
                let tmpLeftPadding;
                let tmpRightMargin;
                let tmpRightPadding;
                let tmpBottomMargin;
                let tmpBottomPadding;
                let tmpTopMargin;
                let tmpTopPadding;
                let tmpIsCentered;
                console.log(selectedObj[0].selected_Values);
                Object.entries(selectedObj[0].selected_Values).map(([key, value]) => {
                    if (key == bgPropertyName) {
                        tmp = value;
                    }

                    if (key === bgPropertyName + "_image_text_position") {
                        setImageTextPosition(value.value);
                    }
                    if (key === bgPropertyName + "_image_hide") {
                        setImageHide(value.value);
                    }
                    if (key == bgPropertyName + "_alt") {
                        tmpAlt = value;
                    }
                    if (key == bgPropertyName + "_is_centered") {
                        setIsCentered(value.value);
                    }
                    if (key == bgPropertyName + "_image_or_video") {
                        tmpImageorVideo = value.value;
                    }
                    if (key == bgPropertyName + "_image_position") {
                        tmpPosition = value;
                    }
                    if (key == bgPropertyName + "_link") {
                        tmpLink = value;
                    }
                    if (key == bgPropertyName + "_video") {
                        tmpVideo = true;
                        tmpVideoType = value.type;
                        tmpVideoUrl = value.value;
                    }
                    if (key == bgPropertyName + "_image_size") {
                        tmpSize = value;
                    }
                    if (key == bgPropertyName + "_image_style") {
                        tmpStyle = value;
                    }
                    if (key == bgPropertyName + "_image_roundsize") {
                        tmpRoundSize = value;
                    }
                    if (key == bgPropertyName + "_transition_duration") {
                        tmpTransitionDuration = value;
                    }
                    if (key == bgPropertyName + "_ease_option") {
                        tmpEaseOption = value;
                    }
                    if (key == bgPropertyName + "_transition_effect") {
                        tmpTransitionEffect = value;
                    }
                    if (key == bgPropertyName + "_scale_option_start") {
                        tmpScaleOptionStart = value;
                    }
                    if (key == bgPropertyName + "_scale_option_end") {
                        tmpScaleOptionEnd = value;
                    }
                    if (key == bgPropertyName + "_fade_opacity_start") {
                        tmpFadeOpacityStart = value;
                    }
                    if (key == bgPropertyName + "_fade_opacity_end") {
                        tmpFadeOpacityEnd = value;
                    }
                    if (key == bgPropertyName + "_skew_position") {
                        tmpSkewPosition = value;
                    }
                    if (key == bgPropertyName + "_rotate_position") {
                        tmpRotatePosition = value;
                    }
                    if (key == bgPropertyName + "_translate_position") {
                        tmpTranslatePosition = value;
                    }

                    if (key == bgPropertyName + "_left_margin") {
                        setLeftMargin(value.value);
                    }
                    if (key == bgPropertyName + "_top_margin") {
                        setTopMargin(value.value);
                    }
                    if (key == bgPropertyName + "_bottom_margin") {
                        setBottomMargin(value.value);
                    }
                    if (key == bgPropertyName + "_right_margin") {
                        setRightMargin(value.value);
                    }
                    if (key == bgPropertyName + "_left_padding") {
                        setLeftPadding(value.value);
                    }
                    if (key == bgPropertyName + "_top_padding") {
                        setTopPadding(value.value);
                    }
                    if (key == bgPropertyName + "_bottom_padding") {
                        setBottomPadding(value.value);
                    }
                    if (key == bgPropertyName + "_right_padding") {
                        setRightPadding(value.value);
                    }
                    if (key == bgPropertyName + "_image_hv_position") {
                        setImageHVPosition(value.value);
                    }
                    if (key == bgPropertyName + "_aos_effect") {
                        setTextEffect(value.value);
                    }
                });

                if (tmpRoundSize != undefined) {
                    let attributes = tmpRoundSize;

                    setRoundedSize(attributes.value);
                    //onElementImageChange(attributes.value);
                } else {
                    setRoundedSize("");
                }

                if (tmpStyle != undefined) {
                    let attributes = tmpStyle;
                    setImageStyle(attributes.value);
                    if (attributes.value === "Round") {
                        setRoundDisplay(true);
                    }
                    //onElementImageChange(attributes.value);
                } else {
                    setImageStyle("");
                }

                if (tmp != undefined) {
                    let attributes = tmp;

                    setImageURL(attributes.value);
                    //onElementImageChange(attributes.value);
                } else {
                    setImageURL("");
                }

                if (tmpAlt != undefined) {
                    let attributes = tmpAlt;
                    setImageAlt(attributes.value);
                    updateAltTag(attributes.value);
                } else {
                    setImageAlt("");
                }

                if (tmpSize != undefined) {
                    let attributes = tmpSize;
                    setImageSize(attributes.value);
                } else {
                    setImageSize("");
                }

                if (tmpLink != undefined) {
                    let attributes = tmpLink;
                    setImageLink(attributes.value);
                    updateLink(attributes.value);
                } else {
                    setImageLink("");
                }

                if (tmpPosition != undefined) {
                    let attributes = tmpPosition;
                    setImagePosition(attributes.value);
                } else {
                    setImagePosition("");
                }

                if (tmpVideo && tmpImageorVideo === "Video") {
                    setImageOrVideo("Video");
                    setVideoType(tmpVideoType);
                    setVideoUrl(tmpVideoUrl);
                } else {
                    setImageOrVideo("Image");
                    setVideoType("");
                    setVideoUrl("");
                }

                if (tmpTransitionDuration) {
                    setTransitionDuration(tmpTransitionDuration.value);
                } else {
                    setTransitionDuration("");
                }

                if (tmpEaseOption) {
                    setEaseOption(tmpEaseOption.value);
                } else {
                    setEaseOption("");
                }

                if (tmpTransitionEffect) {
                    setTransitionEffect(tmpTransitionEffect.value);
                } else {
                    setTransitionEffect("");
                }

                if (tmpScaleOptionStart) {
                    setScaleOptionStart(tmpScaleOptionStart.value);
                } else {
                    setScaleOptionStart("");
                }

                if (tmpScaleOptionEnd) {
                    setScaleOptionEnd(tmpScaleOptionEnd.value);
                } else {
                    setScaleOptionEnd("");
                }

                if (tmpFadeOpacityStart) {
                    setFadeOpacityStart(tmpFadeOpacityStart.value);
                } else {
                    setFadeOpacityStart("");
                }

                if (tmpScaleOptionEnd) {
                    setFadeOpacityEnd(tmpScaleOptionEnd.value);
                } else {
                    setFadeOpacityEnd("");
                }

                if (tmpSkewPosition) {
                    setSkewPosition(tmpSkewPosition.value);
                } else {
                    setSkewPosition("");
                }

                if (tmpRotatePosition) {
                    setRotatePosition(tmpRotatePosition.value);
                } else {
                    setRotatePosition("");
                }

                if (tmpTranslatePosition) {
                    setTranslatePosition(tmpTranslatePosition.value);
                } else {
                    setTranslatePosition("");
                }
            } else {
                setImageURL("");
                setImageOrVideo("Image");
                //updateProperty({[bgPropertyName]: imageURL});
            }
        }
    }, [props.currentComponent]);

    const displayImageVideo = () => {
        let x = ReactDOM.findDOMNode(
            props.refArray.current[props.currentComponent]
        );
        if (x) {
            if (x.querySelectorAll("#" + bgPropertyName).length > 0) {
                if (imageOrVideo == "Image") {
                    if (imageHVPosition) {
                        if (
                            x.querySelectorAll("#" + bgPropertyName + "HVPosition").length > 0
                        ) {
                            x.querySelectorAll(
                                "#" + bgPropertyName + "HVPosition"
                            )[0].className =
                                "relative overflow-hidden lg:flex " + imageHVPosition;
                        }
                    }

                    let className = "";
                    let imgClass = "";
                    let tempImgSrc = "";

                    const currentElem = x.querySelectorAll(`#${bgPropertyName} img`);

                    if (currentElem && currentElem.length > 0) {
                        tempImgSrc = currentElem[0].src;
                    }

                    className += imagePosition;

                    if (leftMargin) {
                        className += " " + leftMargin;
                    }
                    if (topMargin) {
                        className += " " + topMargin;
                    }
                    if (rightMargin) {
                        className += " " + rightMargin;
                    }
                    if (bottomMargin) {
                        className += " " + bottomMargin;
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
                    //props.updateProperty({type: "finalclass", value: 'm m'}, bgPropertyName+"_final_class");
                    if (imageStyle == "Round")
                        imgClass += " rounded-[" + roundedSize + "px]";
                    x.querySelectorAll("#" + bgPropertyName)[0].className = className;
                    if (props.compprop.ImageAsBG) {
                        x.querySelectorAll("#" + bgPropertyName)[0].innerHTML =
                            '<div class="absolute inset-0 bg-cover" style="background-image: url(\'' +
                            imageURL +
                            "')\"></div>";
                    } else {
                        let imgStr = "";
                        if (imageURL != "")
                            imgStr +=
                                '<a href="javascript:void(0)" class="inline-block ' +
                                (selectedObj[0].component_Id === 15
                                    ? imageSize.trim() !== ""
                                        ? imageSize
                                        : "max-w-none"
                                    : imageSize) +
                                '" id="' +
                                bgPropertyName +
                                '_Link"><img className="' +
                                imgClass +
                                '" src="' +
                                imageURL +
                                '" alt="' +
                                imageAlt +
                                '" title="' +
                                imageAlt +
                                '" /> </a>';
                        else
                            imgStr += `
                <a href="javascript:void(0)" class="inline-block ${selectedObj[0].component_Id === 15
                                    ? imageSize.trim() !== ""
                                        ? imageSize
                                        : "max-w-none"
                                    : imageSize
                                }" id="${bgPropertyName}_Link">
                  <img class="${imgClass}" src="${tempImgSrc}" alt="${imageAlt}" title="${imageAlt}" />
                </a>`;

                        if (
                            x.querySelectorAll("#" + bgPropertyName + "Position").length > 0
                        ) {
                            let strText = x.querySelectorAll(
                                "#Text" + bgPropertyName + "Position"
                            )[0].innerHTML;
                            let finalHTML = "";
                            if (imageTextPosition === "Top") {
                                finalHTML +=
                                    '<div class="p-[15px]" id="Text' +
                                    bgPropertyName +
                                    'Position">';
                                finalHTML += strText;
                                finalHTML += "</div>";
                                finalHTML +=
                                    '<div class="' + className + '" id="' + bgPropertyName + '">';
                                finalHTML += imgStr;
                                finalHTML += "</div>";
                            } else {
                                finalHTML +=
                                    '<div class="' + className + '" id="' + bgPropertyName + '">';
                                finalHTML += imgStr;
                                finalHTML += "</div>";
                                finalHTML +=
                                    '<div class="p-[15px]" id="Text' +
                                    bgPropertyName +
                                    'Position">';
                                finalHTML += strText;
                                finalHTML += "</div>";
                            }
                            x.querySelectorAll(
                                "#" + bgPropertyName + "Position"
                            )[0].innerHTML = finalHTML;
                        } else {
                            // if (imgStr) {
                            x.querySelectorAll("#" + bgPropertyName)[0].innerHTML = imgStr;
                            // }
                        }
                    }

                    props.updateProperty(
                        { type: "link", value: imageLink },
                        bgPropertyName + "_link"
                    );
                    props.updateProperty(
                        { type: "alt", value: imageAlt },
                        bgPropertyName + "_alt"
                    );
                    props.updateProperty(
                        { type: "image", value: imageURL },
                        bgPropertyName
                    );
                } else if (imageOrVideo == "Video") {
                    if (videoType == "Youtube") {
                        x.querySelectorAll("#" + bgPropertyName)[0].innerHTML =
                            '<iframe className="w-full aspect-video" src="https://www.youtube.com/embed/' +
                            videoUrl +
                            '?rel=0" allow="autoplay; encrypted-media" frameborder="0"></iframe>';
                        props.updateProperty(
                            { type: "Youtube", value: videoUrl },
                            bgPropertyName + "_video"
                        );
                    } else if (videoType == "vimeo") {
                        x.querySelectorAll("#" + bgPropertyName)[0].innerHTML =
                            '<iframe src="https://player.vimeo.com/video/' +
                            videoUrl +
                            '?background=1" frameborder="0" allow="autoplay; fullscreen" allowfullscreen="" style="" className="w-full aspect-video"></iframe>';
                        props.updateProperty(
                            { type: "Vimeo", value: videoUrl },
                            bgPropertyName + "_video"
                        );
                    }
                }
            }
        }
    };

    const onElementImageChange = (url) => {
        setImageURL(url ? url + "?" + Math.random() : '');
        setImageHide(false);
        props.updateProperty(
            { type: "imagehide", value: false },
            bgPropertyName + "_image_hide"
        );
    };

    const updateAltTag = (val) => {
        props.updateProperty({ type: "alt", value: val }, bgPropertyName + "_alt");
        setImageAlt(val);
    };

    const changeImageSize = (event) => {
        setImageSize(event.target.value);
        props.updateProperty(
            { type: "imagesize", value: event.target.value },
            bgPropertyName + "_image_size"
        );
    };

    const updateLink = (val) => {
        setImageLink(val);
        props.updateProperty(
            { type: "link", value: val },
            bgPropertyName + "_link"
        );
        // if(imageOrVideo == "Image")
        // {
        //     let x = ReactDOM.findDOMNode(props.refArray.current[props.currentComponent]);
        //     x.querySelectorAll('#'+props.variable+"_Link")[0].href = val;

        // }
        // setTimeout(function () {displayImageVideo(); }, 1000);
        //x.querySelectorAll('#'+props.variable)[0].title = event.target.value;
    };

    const changeImageOrVideo = (event) => {
        props.updateProperty(
            { type: "imageorvideo", value: event.target.value },
            bgPropertyName + "_image_or_video"
        );
        setImageOrVideo(event.target.value);

        // setTimeout(function () {displayImageVideo(); }, 1000);
    };

    const updateVideoUrl = (val) => {
        setVideoUrl(val);
        //setTimeout(function () {displayImageVideo(); }, 1000);
    };

    const changeVideoType = (event) => {
        setVideoType(event.target.value);
    };

    useEffect(() => {
        displayImageVideo();
    }, [
        imageTextPosition,
        imageHVPosition,
        imageOrVideo,
        videoUrl,
        videoType,
        imageAlt,
        imageLink,
        imageURL,
        imageStyle,
        imagePosition,
        roundedSize,
        imageSize,
        leftMargin,
        leftPadding,
        rightMargin,
        rightPadding,
        topMargin,
        topPadding,
        bottomMargin,
        bottomPadding,
    ]);

    const changeImagePosition = (event) => {
        setImagePosition(event.target.value);
        props.updateProperty(
            { type: "imageposition", value: event.target.value },
            bgPropertyName + "_image_position"
        );
    };

    const changeImageStyle = (event) => {
        setImageStyle(event.target.value);
        if (event.target.value === "Round") {
            setRoundDisplay(true);
        } else {
            setRoundDisplay(false);
        }
        props.updateProperty(
            { type: "imagestyle", value: event.target.value },
            bgPropertyName + "_image_style"
        );
    };

    const changeImageHVPosition = (event) => {
        setImageHVPosition(event.target.value);
        props.updateProperty(
            { type: "imagehvposition", value: event.target.value },
            bgPropertyName + "_image_hv_position"
        );
    };

    const changeRoundedSize = (value) => {
        setRoundedSize(value);
        props.updateProperty(
            { type: "roundsize", value: value },
            bgPropertyName + "_image_roundsize"
        );
    };

    const changeLeftPadding = (event) => {
        setLeftPadding(event.target.value);
        props.updateProperty(
            { type: "leftpadding", value: event.target.value },
            bgPropertyName + "_left_padding"
        );
    };

    const changeTopPadding = (event) => {
        setTopPadding(event.target.value);
        props.updateProperty(
            { type: "toppadding", value: event.target.value },
            bgPropertyName + "_top_padding"
        );
    };

    const changeRightPadding = (event) => {
        setRightPadding(event.target.value);
        props.updateProperty(
            { type: "rightpadding", value: event.target.value },
            bgPropertyName + "_right_padding"
        );
    };

    const changeBottomPadding = (event) => {
        setBottomPadding(event.target.value);
        props.updateProperty(
            { type: "bottompadding", value: event.target.value },
            bgPropertyName + "_bottom_padding"
        );
    };

    const changeLeftMargin = (event) => {
        setLeftMargin(event.target.value);
        props.updateProperty(
            { type: "leftmargin", value: event.target.value },
            bgPropertyName + "_left_margin"
        );
    };

    const changeTopMargin = (event) => {
        setTopMargin(event.target.value);
        props.updateProperty(
            { type: "topmargin", value: event.target.value },
            bgPropertyName + "_top_margin"
        );
    };

    const changeRightMargin = (event) => {
        setRightMargin(event.target.value);
        props.updateProperty(
            { type: "rightmargin", value: event.target.value },
            bgPropertyName + "_right_margin"
        );
    };

    const changeBottomMargin = (event) => {
        setBottomMargin(event.target.value);
        props.updateProperty(
            { type: "bottommargin", value: event.target.value },
            bgPropertyName + "_bottom_margin"
        );
    };

    const changeIsCentered = (event) => {
        let x = ReactDOM.findDOMNode(
            props.refArray.current[props.currentComponent]
        );
        if (event.target.checked) {
            props.updateProperty(
                { type: "is_centered", value: true },
                bgPropertyName + "_is_centered"
            );
            setIsCentered(true);

            if (x.querySelectorAll("#is_centered").length > 0) {
                x.querySelectorAll("#is_centered")[0].classList.add("items-center");
                x.querySelectorAll("#right-section")[0].classList.remove(
                    "items-center"
                );
            }
        } else {
            props.updateProperty(
                { type: "is_centered", value: false },
                bgPropertyName + "_is_centered"
            );
            setIsCentered(false);
            if (x.querySelectorAll("#is_centered").length > 0) {
                x.querySelectorAll("#is_centered")[0].classList.remove("items-center");
                x.querySelectorAll("#right-section")[0].classList.add("items-center");
            }
        }
    };

    const changeImageTextPosition = (event) => {
        setImageTextPosition(event.target.value);
        props.updateProperty(
            { type: "imagetextposition", value: event.target.value },
            bgPropertyName + "_image_text_position"
        );
    };

    const changeImageHide = (event) => {
        setImageHide(event.target.checked);
        props.updateProperty(
            { type: "imagehide", value: event.target.checked },
            bgPropertyName + "_image_hide"
        );
    };

    const changeTextEffect = (event) => {
        props.updateProperty(
            { type: "aoseffect", value: event.target.value },
            bgPropertyName + "_aos_effect"
        );
        setTextEffect(event.target.value);
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
                    <span>{props.compprop.title ?? "Image"}</span>
                    <span className="material-icons-outlined">expand_more</span>
                </button>

                <div
                    className={`property-content bg-white border-y border-b-0 border-neutral-200 ${showHide ? "" : "hidden"}`}
                >
                    <div className="mx-2 text-sm">
                        <div className="py-2">
                            {props.compprop.video != undefined &&
                                props.compprop.video == true && (
                                    <div className="mb-3 last:mb-0">
                                        <div className="flex flex-wrap divide-x divide-neutral-300 border border-neutral-300 overflow-hidden">
                                            <button
                                                value="Image"
                                                onClick={changeImageOrVideo}
                                                className={`w-1/2 px-2 py-1.5 inline-flex justify-center items-center text-sm ${imageOrVideo === "Image" ? "bg-[#F1F5F9]" : "bg-white"}`}
                                                title="Image"
                                            >
                                                Image
                                            </button>
                                            <button
                                                value="Video"
                                                onClick={changeImageOrVideo}
                                                className={`w-1/2 px-2 py-1.5 inline-flex justify-center items-center text-sm ${imageOrVideo === "Video" ? "bg-[#F1F5F9]" : "bg-white"}`}
                                                title="Video"
                                            >
                                                Video
                                            </button>
                                        </div>
                                    </div>
                                )}

                            {imageOrVideo == "Image" && (
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
                                                from={"Element Image"}
                                                ImageUploadName={bgPropertyName}
                                                ImageUploadId={bgPropertyName}
                                                ImageUrl={imageURL}
                                            />
                                        )}
                                    </div>

                                    <div className="mb-3 last:mb-0">
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

                                    {props.compprop.iscenter && (
                                        <>
                                            <div className="mb-4 last:mb-0">
                                                <label
                                                    className="flex items-center"
                                                    htmlFor="no-follow-link-iscenter"
                                                >
                                                    <input
                                                        onChange={changeIsCentered}
                                                        type="checkbox"
                                                        id="no-follow-link-iscenter"
                                                        className="form-checkbox"
                                                        checked={isCentered}
                                                    />
                                                    <span className="text-sm font-medium ml-2">
                                                        Is Centered
                                                    </span>
                                                </label>
                                            </div>
                                        </>
                                    )}
                                    {props.compprop.imagehide && (
                                        <>
                                            <div className="mb-4 last:mb-0">
                                                <label
                                                    className="flex items-center"
                                                    htmlFor="no-follow-link-hide"
                                                >
                                                    <input
                                                        onChange={changeImageHide}
                                                        type="checkbox"
                                                        id="no-follow-link-hide"
                                                        className="form-checkbox"
                                                        checked={imageHide ? "checked" : ""}
                                                    />
                                                    <span className="text-sm font-medium ml-2">
                                                        Hide Image
                                                    </span>
                                                </label>
                                            </div>
                                        </>
                                    )}
                                    <div className="mb-3">
                                        <div className="flex justify-between items-center mb-1">
                                            <div className="">Loading Effect</div>
                                        </div>
                                        <div className="text-center relative overflow-hidden">
                                            <select
                                                onChange={changeTextEffect}
                                                value={textEffect}
                                                className="w-full grow text-sm bg-gray-100 text-gray-700 border border-gray-200 p-3 py-2 leading-tight focus:ring-0 focus:shadow-none focus:outline-none focus:bg-white"
                                            >
                                                <option value="">None</option>
                                                {ThemeVariable.aosEffect.map((value, index) => (
                                                    <option
                                                        key={index}
                                                        value={value.value}
                                                        className={value.value}
                                                    >
                                                        {value.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    {props.compprop.textposition && (
                                        <>
                                            <div className="mb-3">
                                                <div className="flex justify-between items-center mb-1">
                                                    <div>Image Text Position</div>
                                                </div>
                                                <div className="flex flex-wrap">
                                                    <div className="w-full flex flex-wrap divide-x divide-neutral-300 border border-neutral-300 overflow-hidden">
                                                        <select
                                                            onChange={changeImageTextPosition}
                                                            value={imageTextPosition}
                                                            className="w-full grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                                        >
                                                            <option value="Top">Top</option>
                                                            <option value="Bottom">Bottom</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {props.compprop.positionhvstyle && (
                                        <>
                                            <div className="mb-3 last:mb-0">
                                                <div className="mb-3">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <div>Position</div>
                                                    </div>
                                                    <div className="flex flex-wrap divide-x divide-neutral-300 border border-neutral-300 overflow-hidden">
                                                        {props.ThemeVariable.horizontalPosition.map(
                                                            (value, index) => (
                                                                <button
                                                                    key={index}
                                                                    value={value.value}
                                                                    onClick={changeImageHVPosition}
                                                                    className={`w-1/${props.ThemeVariable.horizontalPosition.length} px-2 py-1.5 inline-flex justify-center items-center text-sm ${value.value === imageHVPosition ? "bg-[#F1F5F9]" : "bg-white"}`}
                                                                    title={value.value}
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: value.icon,
                                                                    }}
                                                                />
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {props.compprop.positionstyle && (
                                        <>
                                            <div className="mb-3 last:mb-0">
                                                <div className="mb-3">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <div>Position</div>
                                                    </div>
                                                    <div className="flex flex-wrap divide-x divide-neutral-300 border border-neutral-300 overflow-hidden">
                                                        {props.ThemeVariable.FontAlignment.map(
                                                            (value, index) => (
                                                                <button
                                                                    key={index}
                                                                    value={value.value}
                                                                    onClick={changeImagePosition}
                                                                    className={`w-1/${props.ThemeVariable.FontAlignment.length} px-2 py-1.5 inline-flex justify-center items-center text-sm ${value.value === imagePosition ? "bg-[#F1F5F9]" : "bg-white"}`}
                                                                    title={value.value}
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: value.icon,
                                                                    }}
                                                                />
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mb-3 last:mb-0">
                                                <div className="mb-3">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <div>Style</div>
                                                    </div>
                                                    <div className="flex flex-wrap divide-x divide-neutral-300 border border-neutral-300 overflow-hidden">
                                                        {props.ThemeVariable.borderOptions.map(
                                                            (value, index) => (
                                                                <button
                                                                    key={index}
                                                                    value={value.value}
                                                                    onClick={changeImageStyle}
                                                                    className={`w-1/${props.ThemeVariable.borderOptions.length} px-2 py-1.5 inline-flex justify-center items-center text-sm ${value.value === imageStyle ? "bg-[#F1F5F9]" : "bg-white"}`}
                                                                    title={value.value}
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: value.icon,
                                                                    }}
                                                                />
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {roundDisplay && (
                                                <div className="mb-3 last:mb-0">
                                                    <div className="mb-3">
                                                        <div className="flex justify-between items-center mb-1">
                                                            <div>Rounded Size</div>
                                                        </div>
                                                        <div
                                                            className="flex flex-wrap mx-auto"
                                                            style={{ width: "95%" }}
                                                        >
                                                            <SliderCustom
                                                                dots={false}
                                                                min={0}
                                                                max={20}
                                                                step={1}
                                                                defaultValue={roundedSize}
                                                                onSliderChange={changeRoundedSize}
                                                                marks={[
                                                                    { value: 0, label: "0" },
                                                                    { value: 20, label: "20" },
                                                                ]}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="mb-3 last:mb-0">
                                                <div className="mb-3">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <div>Image Size</div>
                                                    </div>
                                                    <div className="flex flex-wrap">
                                                        <div className="w-full flex flex-wrap divide-x divide-neutral-300 border border-neutral-300 overflow-hidden">
                                                            {/* {props.ThemeVariable.imageSizes.map((value, index) => (
                                                                <button value={value.value} onClick={changeHeadlineWidth}  className={`w-1/${props.ThemeVariable.imageSizes.length} px-2 py-1.5 inline-flex justify-center items-center text-sm ${value.value === headlineWidth ? 'bg-[#F1F5F9]' : 'bg-white'}`} title={value.value} dangerouslySetInnerHTML={{ __html: value.icon }} />
                                                            ))} */}
                                                            <select
                                                                onChange={changeImageSize}
                                                                value={imageSize}
                                                                className="w-full grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                                            >
                                                                <option value="">Select</option>
                                                                {props.ThemeVariable.imageSizes.map(
                                                                    (value, index) => (
                                                                        <option key={index} value={value.value}>
                                                                            {value.label}
                                                                        </option>
                                                                    )
                                                                )}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </>
                            )}

                            {imageOrVideo == "Video" && (
                                <>
                                    {props.compprop.video != undefined &&
                                        props.compprop.video == true && (
                                            <>
                                                <div className="mb-3 last:mb-0">
                                                    <label htmlFor="" className="mb-1 block text-sm">
                                                        Video Type
                                                    </label>
                                                    <div className="flex flex-wrap divide-x divide-neutral-300 border border-neutral-300 overflow-hidden">
                                                        <button
                                                            value="Youtube"
                                                            onClick={changeVideoType}
                                                            className={`w-1/2 px-2 py-1.5 inline-flex justify-center items-center text-sm ${videoType === "Youtube" ? "bg-[#F1F5F9]" : "bg-white"}`}
                                                            title="Image"
                                                        >
                                                            <img src={youTubeIcon} />
                                                            <span className="ml-1  pointer-events-none">
                                                                Youtube
                                                            </span>
                                                        </button>
                                                        <button
                                                            value="Vimeo"
                                                            onClick={changeVideoType}
                                                            className={`w-1/2 px-2 py-1.5 inline-flex justify-center items-center text-sm ${videoType === "Vimeo" ? "bg-[#F1F5F9]" : "bg-white"}`}
                                                            title="Video"
                                                        >
                                                            <img src={vimeoIcon} />
                                                            <span className="ml-1  pointer-events-none">
                                                                Vimeo
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="mb-3 last:mb-0">
                                                    <div className="mb-3">
                                                        <div className="flex justify-between items-center mb-1">
                                                            <div>Video Url</div>
                                                        </div>
                                                        <div className="text-center relative overflow-hidden">
                                                            <div className="absolute left-1 top-1">
                                                                <span className="material-icons-outlined -rotate-45">
                                                                    link
                                                                </span>
                                                            </div>
                                                            <Input
                                                                onChange={(event) => {
                                                                    updateVideoUrl(event.target.value);
                                                                }}
                                                                type="text"
                                                                className="w-full grow text-sm bg-white text-gray-700 border border-gray-200 p-3 py-2 pl-8 leading-tight focus:ring-0 focus:shadow-none focus:outline-none"
                                                                defaultValue={videoUrl}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                </>
                            )}

                            {props.compprop.effects && (
                                <>
                                    <div className="mb-3 last:mb-0">
                                        <div className="mb-3">
                                            <label htmlFor="" className="mb-1 block text-sm">
                                                Transition Duration
                                            </label>
                                            <div
                                                className="flex flex-wrap mx-auto"
                                                style={{ width: "95%" }}
                                            >
                                                <SliderCustom
                                                    dots={true}
                                                    min={0}
                                                    max={700}
                                                    step={null}
                                                    defaultValue={transitionDuration}
                                                    onSliderChange={changeTransitionDuration}
                                                    marks={props.ThemeVariable.transitionDuration}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-3 last:mb-0">
                                        <div className="mb-3">
                                            <div className="flex justify-between items-center mb-1">
                                                <div>Ease Option</div>
                                            </div>
                                            <div className="flex flex-wrap divide-x divide-neutral-300 border border-neutral-300 overflow-hidden">
                                                {props.ThemeVariable.easeOptions.map((value, index) => (
                                                    <button
                                                        key={index}
                                                        value={value.value}
                                                        onClick={changeEaseOption}
                                                        className={`w-1/${props.ThemeVariable.easeOptions.length} px-2 py-1.5 inline-flex justify-center items-center text-sm ${value.value === easeOption ? "bg-[#F1F5F9]" : "bg-white"}`}
                                                        title={value.value}
                                                        dangerouslySetInnerHTML={{ __html: value.icon }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-3 last:mb-0">
                                        <div className="mb-3">
                                            <div className="flex justify-between items-center mb-1">
                                                <div>Transition Effects</div>
                                            </div>
                                            <div className="flex flex-wrap divide-x divide-neutral-300 border border-neutral-300 overflow-hidden">
                                                {props.ThemeVariable.transitionEffects.map(
                                                    (value, index) => (
                                                        <button
                                                            key={index}
                                                            value={value.value}
                                                            onClick={changeTransitionEffect}
                                                            className={`w-1/3 px-3 mb-3 text-center focus:ring-0 focus:shadow-none focus:outline-none`}
                                                            title={value.value}
                                                        >
                                                            <div
                                                                className={`border w-full py-3 mb-1 border-neutral-300 rounded-md overflow-hidden  pointer-events-none ${value.value === transitionEffect ? "bg-[#F1F5F9]" : "bg-white"}`}
                                                                dangerouslySetInnerHTML={{ __html: value.icon }}
                                                            />
                                                        </button>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {transitionEffect === "scale" && (
                                        <>
                                            <div className="mb-3 last:mb-0">
                                                <div className="mb-3">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <div>Scale (Starting)</div>
                                                    </div>
                                                    <div
                                                        className="flex flex-wrap mx-auto"
                                                        style={{ width: "95%" }}
                                                    >
                                                        <SliderCustom
                                                            dots={true}
                                                            max={150}
                                                            step={null}
                                                            defaultValue={scaleOptionStart.replace(
                                                                "scale-",
                                                                ""
                                                            )}
                                                            onSliderChange={changeScaleOptionStart}
                                                            marks={props.ThemeVariable.scaleOptions}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mb-3 last:mb-0">
                                                <div className="mb-3">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <div>Scale (End)</div>
                                                    </div>
                                                    <div
                                                        className="flex flex-wrap mx-auto"
                                                        style={{ width: "95%" }}
                                                    >
                                                        <SliderCustom
                                                            dots={true}
                                                            max={150}
                                                            step={null}
                                                            defaultValue={scaleOptionEnd.replace(
                                                                "scale-",
                                                                ""
                                                            )}
                                                            onSliderChange={changeScaleOptionEnd}
                                                            marks={props.ThemeVariable.scaleOptions}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {transitionEffect === "fade" && (
                                        <>
                                            <div className="mb-3 last:mb-0">
                                                <div className="mb-3">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <div>Opacity (Starting)</div>
                                                    </div>
                                                    <div
                                                        className="flex flex-wrap mx-auto"
                                                        style={{ width: "95%" }}
                                                    >
                                                        <SliderCustom
                                                            dots={true}
                                                            max={100}
                                                            step={null}
                                                            defaultValue={fadeOpacityStart.replace(
                                                                "opacity-",
                                                                ""
                                                            )}
                                                            onSliderChange={changeFadeOpacityStart}
                                                            marks={props.ThemeVariable.fadeOpacity}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mb-3 last:mb-0">
                                                <div className="mb-3">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <div>Opacity (End)</div>
                                                    </div>
                                                    <div
                                                        className="flex flex-wrap mx-auto"
                                                        style={{ width: "95%" }}
                                                    >
                                                        <SliderCustom
                                                            dots={true}
                                                            max={100}
                                                            step={null}
                                                            defaultValue={fadeOpacityEnd.replace(
                                                                "opacity-",
                                                                ""
                                                            )}
                                                            onSliderChange={changeFadeOpacityEnd}
                                                            marks={props.ThemeVariable.fadeOpacity}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {transitionEffect === "skew" && (
                                        <>
                                            <div className="mb-4 last:mb-0">
                                                <label htmlFor="" className="mb-1 block text-sm">
                                                    Skew Position
                                                </label>
                                                <div className="flex flex-wrap">
                                                    <select
                                                        value={skewPosition}
                                                        onChange={changeSkewPosition}
                                                        className="grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 "
                                                    >
                                                        <option value="">Select</option>
                                                        <option value="skew-x-0">x-0</option>
                                                        <option value="skew-x-1">x-1</option>
                                                        <option value="skew-x-2">x-2</option>
                                                        <option value="skew-x-3">x-3</option>
                                                        <option value="skew-x-4">x-4</option>
                                                        <option value="skew-x-5">x-5</option>
                                                        <option value="skew-x-6">x-6</option>
                                                        <option value="skew-x-7">x-7</option>
                                                        <option value="skew-x-8">x-8</option>
                                                        <option value="skew-x-9">x-9</option>
                                                        <option value="skew-x-10">x-10</option>
                                                        <option value="skew-x-11">x-11</option>
                                                        <option value="skew-x-12">x-12</option>
                                                        <option value="skew-y-0">y-0</option>
                                                        <option value="skew-y-1">y-1</option>
                                                        <option value="skew-y-2">y-2</option>
                                                        <option value="skew-y-3">y-3</option>
                                                        <option value="skew-y-4">y-4</option>
                                                        <option value="skew-y-5">y-5</option>
                                                        <option value="skew-y-6">y-6</option>
                                                        <option value="skew-y-7">y-7</option>
                                                        <option value="skew-y-8">y-8</option>
                                                        <option value="skew-y-9">y-9</option>
                                                        <option value="skew-y-10">y-10</option>
                                                        <option value="skew-y-11">y-11</option>
                                                        <option value="skew-y-12">y-12</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {transitionEffect === "rotate" && (
                                        <>
                                            <div className="mb-3 last:mb-0">
                                                <div className="mb-3">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <div>Rotate Position</div>
                                                    </div>
                                                    <div
                                                        className="flex flex-wrap mx-auto"
                                                        style={{ width: "95%" }}
                                                    >
                                                        <SliderCustom
                                                            dots={true}
                                                            max={180}
                                                            step={null}
                                                            defaultValue={rotatePosition.replace(
                                                                "rotate-",
                                                                ""
                                                            )}
                                                            onSliderChange={changeRotatePosition}
                                                            marks={props.ThemeVariable.rotatePosition}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-4 last:mb-0">
                                                <label htmlFor="" className="mb-1 block text-sm">
                                                    Rotate Position
                                                </label>
                                                <div className="flex flex-wrap">
                                                    <select
                                                        value={rotatePosition}
                                                        onChange={changeRotatePosition}
                                                        className="grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 "
                                                    >
                                                        <option value="">Select</option>
                                                        <option value="rotate-0">0</option>
                                                        <option value="rotate-1">1</option>
                                                        <option value="rotate-2">2</option>
                                                        <option value="rotate-3">3</option>
                                                        <option value="rotate-6">6</option>
                                                        <option value="rotate-12">12</option>
                                                        <option value="rotate-45">45</option>
                                                        <option value="rotate-90">90</option>
                                                        <option value="rotate-180">180</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {transitionEffect === "translate" && (
                                        <>
                                            <div className="mb-4 last:mb-0">
                                                <label htmlFor="" className="mb-1 block text-sm">
                                                    Translate Position
                                                </label>
                                                <div className="flex flex-wrap">
                                                    <select
                                                        value={translatePosition}
                                                        onChange={changeTranslatePosition}
                                                        className="grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 "
                                                    >
                                                        <option value="">Select</option>
                                                        <option value="translate-x-0">x-0</option>
                                                        <option value="translate-x-0.5">x-0.5</option>
                                                        <option value="translate-x-1">x-1</option>
                                                        <option value="translate-x-1.5">x-1.5</option>
                                                        <option value="translate-x-2">x-2</option>
                                                        <option value="translate-x-2.5">x-2.5</option>
                                                        <option value="translate-x-3">x-3</option>
                                                        <option value="translate-x-3.5">x-3.5</option>
                                                        <option value="translate-x-4">x-4</option>
                                                        <option value="translate-x-5">x-5</option>
                                                        <option value="translate-x-6">x-6</option>
                                                        <option value="translate-x-7">x-7</option>
                                                        <option value="translate-x-8">x-8</option>
                                                        <option value="translate-x-9">x-9</option>
                                                        <option value="translate-x-10">x-10</option>
                                                        <option value="translate-x-11">x-11</option>
                                                        <option value="translate-x-12">x-12</option>
                                                        <option value="translate-x-14">x-14</option>
                                                        <option value="translate-x-20">x-20</option>
                                                        <option value="translate-x-24">x-24</option>
                                                        <option value="translate-x-28">x-28</option>
                                                        <option value="translate-x-32">x-32</option>
                                                        <option value="translate-x-36">x-36</option>
                                                        <option value="translate-x-40">x-40</option>
                                                        <option value="translate-x-44">x-44</option>
                                                        <option value="translate-x-48">x-48</option>
                                                        <option value="translate-x-52">x-52</option>
                                                        <option value="translate-x-56">x-56</option>
                                                        <option value="translate-x-60">x-60</option>
                                                        <option value="translate-x-64">x-64</option>
                                                        <option value="translate-x-72">x-72</option>
                                                        <option value="translate-x-80">x-80</option>
                                                        <option value="translate-x-96">x-96</option>
                                                        <option value="translate-x-1/2">x-1/2</option>
                                                        <option value="translate-x-1/3">x-1/3</option>
                                                        <option value="translate-x-2/3">x-2/3</option>
                                                        <option value="translate-x-1/4">x-1/4</option>
                                                        <option value="translate-x-2/4">x-2/4</option>
                                                        <option value="translate-x-3/4">x-3/4</option>
                                                        <option value="translate-x-full">x-full</option>
                                                        <option value="translate-y-0">y-0</option>
                                                        <option value="translate-y-0.5">y-0.5</option>
                                                        <option value="translate-y-1">y-1</option>
                                                        <option value="translate-y-1.5">y-1.5</option>
                                                        <option value="translate-y-2">y-2</option>
                                                        <option value="translate-y-2.5">y-2.5</option>
                                                        <option value="translate-y-3">y-3</option>
                                                        <option value="translate-y-3.5">y-3.5</option>
                                                        <option value="translate-y-4">y-4</option>
                                                        <option value="translate-y-5">y-5</option>
                                                        <option value="translate-y-6">y-6</option>
                                                        <option value="translate-y-7">y-7</option>
                                                        <option value="translate-y-8">y-8</option>
                                                        <option value="translate-y-9">y-9</option>
                                                        <option value="translate-y-10">y-10</option>
                                                        <option value="translate-y-11">y-11</option>
                                                        <option value="translate-y-12">y-12</option>
                                                        <option value="translate-y-14">y-14</option>
                                                        <option value="translate-y-20">y-20</option>
                                                        <option value="translate-y-24">y-24</option>
                                                        <option value="translate-y-28">y-28</option>
                                                        <option value="translate-y-32">y-32</option>
                                                        <option value="translate-y-36">y-36</option>
                                                        <option value="translate-y-40">y-40</option>
                                                        <option value="translate-y-44">y-44</option>
                                                        <option value="translate-y-48">y-48</option>
                                                        <option value="translate-y-52">y-52</option>
                                                        <option value="translate-y-56">y-56</option>
                                                        <option value="translate-y-60">y-60</option>
                                                        <option value="translate-y-64">y-64</option>
                                                        <option value="translate-y-72">y-72</option>
                                                        <option value="translate-y-80">y-80</option>
                                                        <option value="translate-y-96">y-96</option>
                                                        <option value="translate-y-1/2">y-1/2</option>
                                                        <option value="translate-y-1/3">y-1/3</option>
                                                        <option value="translate-y-2/3">y-2/3</option>
                                                        <option value="translate-y-1/4">y-1/4</option>
                                                        <option value="translate-y-2/4">y-2/4</option>
                                                        <option value="translate-y-3/4">y-3/4</option>
                                                        <option value="translate-y-full">y-full</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </>
                            )}

                            {props.compprop.padding && (
                                <>
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
                                            noPropupdate={true}
                                            imagePosition={imagePosition}
                                        />
                                    }
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ElementImage;
