import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import ReactDOM from "react-dom";

import ColorPicker from "components/admin/content/common/ColorPicker";
import ImageFile from "components/admin/content/common/ImageFile";
import Input from "components/admin/content/common/Input";
import SliderCustom from "components/admin/content/common/SliderCustom";
import ToggleButton from "components/admin/content/common/ToggleButton";
import {
    displayCarousel,
    getImageHeightWidth,
    randomNumber,
} from "components/admin/content/helper/Helper";
import * as ThemeVariable from "components/admin/content/helper/ThemeVariables";
import CkEditorWithoutFormik from "components/common/formComponent/CkEditorWithoutFormik";
import ElementHeadlineColorOpacity from "./ElementHeadlineColorOpacity";

import ImageGallery from "./../modal/imageGalleryModel/ImageGallery";
import ElementMarginPaddingValues from "./ElementMarginPaddingValues";
import TextStyleElement from "./TextStyleElement";
import _ from 'lodash'

const ElementCarousel = (props) => {
    const [carouselStatus, setCarouselStatus] = useState("Off");
    const [showHide, setShowHide] = useState(false);
    const [indArr, setIndArr] = useState([]);
    const [headlineTag, setHeadlineTag] = useState("");
    const [headlineTag1, setHeadlineTag1] = useState("");
    const [srno, setSrNo] = useState(0);
    const [textBgColor, setTextBgColor] = useState("");
    const [bgOpacity, setBgOpacity] = useState(1);
    const [dataArr, setDataArr] = useState([]);
    const [textHPos, setTextHPos] = useState("items-center");
    const [textVPos, setTextVPos] = useState("justify-center");
    const [btnHPos, setBtnHPos] = useState("justify-center");
    const [imageVideoBackgroundColor, setImageVideoBackgroundColor] =
        useState("");

    const [showThumb, setshowThumb] = useState("Off");
    const [showArrow, setshowArrow] = useState("Off");
    const [infiniteLoop, setinfiniteLoop] = useState("Off");
    const [autoPlay, setautoPlay] = useState("Off");
    const [stopOnHover, setstopOnHover] = useState("Off");
    const [showStatus, setshowStatus] = useState("Off");
    const [showIndicators, setshowIndicators] = useState("Off");
    const [hexColor, setHexColor] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [imageAlt, setImageAlt] = useState("");
    const [imageLink, setImageLink] = useState("");
    const [iconImageURL, setIconImageURL] = useState("");
    const [imageAsBackground, setImageAsBackground] = useState(false);
    const [fixedBackground, setFixedBackground] = useState(false);
    const [headline1Display, setHeadline1Display] = useState(false);
    const [showHeadline1Display, setShowHeadline1Display] = useState("Off");
    const [headline2Display, setHeadline2Display] = useState(false);
    const [showHeadline2Display, setShowHeadline2Display] = useState("Off");
    const [descriptionDisplay, setDescriptionDisplay] = useState("Off");
    const [headline, setHeadline] = useState("");
    const [headlineTextEffect, setHeadlineTextEffect] = useState("");
    const [headlineWidth, setHeadlineWidth] = useState("");
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
    const [headlineHOffset, setHeadlineHOffset] = useState("");
    const [headlineVOffset, setHeadlineVOffset] = useState("");
    const [headlineBlur, setHeadlineBlur] = useState("");
    const [headlineShadowColor, setHeadlineShadowColor] = useState("");
    const [headlineShadowRGB, setHeadlineShadowRGB] = useState("");
    const [headlineShadowOpacity, setHeadlineShadowOpacity] = useState("");
    const [showData, setShowData] = useState(false);
    const [headline1, setHeadline1] = useState("");
    const [headline1TextEffect, setHeadline1TextEffect] = useState("");
    const [textTransform1, setTextTransform1] = useState("");
    const [fontSize1, setFontSize1] = useState("");
    const [fontFamily1, setFontFamily1] = useState("");
    const [fontColor1, setFontColor1] = useState("");
    const [lineHeight1, setLineHeight1] = useState("");
    const [letterSpacing1, setLetterSpacing1] = useState("");
    const [fontWeight1, setFontWeight1] = useState("");
    const [fontStyle1, setFontStyle1] = useState("");
    const [leftPadding1, setLeftPadding1] = useState("");
    const [topPadding1, setTopPadding1] = useState("");
    const [textDecoration1, setTextDecoration1] = useState("");
    const [textAlignment1, setTextAlignment1] = useState("");
    const [rightPadding1, setRightPadding1] = useState("");
    const [bottomPadding1, setBottomPadding1] = useState("");
    const [leftMargin1, setLeftMargin1] = useState("");
    const [topMargin1, setTopMargin1] = useState("");
    const [rightMargin1, setRightMargin1] = useState("");
    const [bottomMargin1, setBottomMargin1] = useState("");
    const [headlineHOffset1, setHeadlineHOffset1] = useState("");
    const [headlineVOffset1, setHeadlineVOffset1] = useState("");
    const [headlineBlur1, setHeadlineBlur1] = useState("");
    const [headlineShadowColor1, setHeadlineShadowColor1] = useState("");
    const [headlineShadowRGB1, setHeadlineShadowRGB1] = useState("");
    const [headlineShadowOpacity1, setHeadlineShadowOpacity1] = useState("");
    const [arrowType, setArrowType] = useState("");
    const [btnText, setBtnText] = useState("");
    const [btnEffect, setBtnEffect] = useState("");
    const [btnAlt, setBtnAlt] = useState("");
    const [btnTextTransform, setBtnTextTransform] = useState("");
    const [btnStyle, setBtnStyle] = useState("");
    const [btnSize, setBtnSize] = useState("");
    const [btnFontFamily, setBtnFontFamily] = useState("");
    const [btnFontSize, setBtnFontSize] = useState("");
    const [btnFontWeight, setBtnFontWeight] = useState("");
    const [btnFontLineHeight, setBtnFontLineHeight] = useState("");
    const [btnFontStyle, setBtnFontStyle] = useState("");
    const [btnTextAlignment, setBtnTextAlignment] = useState("");
    const [btnFontLetterSpacing, setBtnFontLetterSpacing] = useState("");
    const [btnTopPadding, setBtnTopPadding] = useState(
        "pt-[10px] sm:pt-[10px] lg:pt-[10px]"
    );
    const [btnRightPadding, setBtnRightPadding] = useState(
        "pr-[17px] sm:pr-[19px] lg:pr-[20px]"
    );
    const [btnBottomPadding, setBtnBottomPadding] = useState(
        "pb-[10px] sm:pb-[10px] lg:pb-[10px]"
    );
    const [btnLeftPadding, setBtnLeftPadding] = useState(
        "pl-[17px] sm:pl-[19px] lg:pl-[20px]"
    );
    const [btnTopMargin, setBtnTopMargin] = useState("");
    const [btnRightMargin, setBtnRightMargin] = useState("");
    const [btnBottomMargin, setBtnBottomMargin] = useState("");
    const [btnLeftMargin, setBtnLeftMargin] = useState("");
    const [btnHOffset, setBtnHOffset] = useState("");
    const [btnVOffset, setBtnVOffset] = useState("");
    const [btnBlur, setBtnBlur] = useState("");
    const [btnSpread, setBtnSpread] = useState("");
    const [btnShadowColor, setBtnShadowColor] = useState("");
    const [btnShadowRGB, setBtnShadowRGB] = useState("");
    const [btnShadowOpacity, setBtnShadowOpacity] = useState("");
    const [btnFontColor, setBtnFontColor] = useState("");
    const [btnWidth, setBtnWidth] = useState("");
    const [btnLink, setBtnLink] = useState("");
    const [btnLinkWindow, setBtnLinkWindow] = useState("_self");
    const [btnLinkFollow, setBtnLinkFollow] = useState("");
    const [btnDisplay, setBtnDisplay] = useState("No");

    /* Second Button */
    const [btnText1, setBtnText1] = useState("");
    const [btn1Effect, setBtn1Effect] = useState("");
    const [btnAlt1, setBtnAlt1] = useState("");
    const [btnTextTransform1, setBtnTextTransform1] = useState("");
    const [btnStyle1, setBtnStyle1] = useState("");
    const [btnSize1, setBtnSize1] = useState("");
    const [btnFontFamily1, setBtnFontFamily1] = useState("");
    const [btnFontSize1, setBtnFontSize1] = useState("");
    const [btnFontWeight1, setBtnFontWeight1] = useState("");
    const [btnFontLineHeight1, setBtnFontLineHeight1] = useState("");
    const [btnFontStyle1, setBtnFontStyle1] = useState("");
    const [btnTextAlignment1, setBtnTextAlignment1] = useState("");
    const [btnFontLetterSpacing1, setBtnFontLetterSpacing1] = useState("");
    const [btnTopPadding1, setBtnTopPadding1] = useState(
        "pt-[10px] sm:pt-[10px] lg:pt-[10px]"
    );
    const [btnRightPadding1, setBtnRightPadding1] = useState(
        "pr-[17px] sm:pr-[19px] lg:pr-[20px]"
    );
    const [btnBottomPadding1, setBtnBottomPadding1] = useState(
        "pb-[10px] sm:pb-[10px] lg:pb-[10px]"
    );
    const [btnLeftPadding1, setBtnLeftPadding1] = useState(
        "pl-[17px] sm:pl-[19px] lg:pl-[20px]"
    );
    const [btnTopMargin1, setBtnTopMargin1] = useState("");
    const [btnRightMargin1, setBtnRightMargin1] = useState("");
    const [btnBottomMargin1, setBtnBottomMargin1] = useState("");
    const [btnLeftMargin1, setBtnLeftMargin1] = useState("");
    const [btnHOffset1, setBtnHOffset1] = useState("");
    const [btnVOffset1, setBtnVOffset1] = useState("");
    const [btnBlur1, setBtnBlur1] = useState("");
    const [btnSpread1, setBtnSpread1] = useState("");
    const [btnShadowColor1, setBtnShadowColor1] = useState("");
    const [btnShadowRGB1, setBtnShadowRGB1] = useState("");
    const [btnShadowOpacity1, setBtnShadowOpacity1] = useState("");
    const [btnFontColor1, setBtnFontColor1] = useState("");
    const [btnWidth1, setBtnWidth1] = useState("");
    const [btnLink1, setBtnLink1] = useState("");
    const [btnLinkWindow1, setBtnLinkWindow1] = useState("_self");
    const [btnLinkFollow1, setBtnLinkFollow1] = useState("");
    const [btnDisplay1, setBtnDisplay1] = useState("No");
    const [imgArr, setImgArr] = useState([]);
    const [editBtn, setEditBtn] = useState(false);
    const [addBtn, setAddBtn] = useState(true);
    const [videoType, setVideoType] = useState("Youtube");
    const [imageOrVideo, setImageOrVideo] = useState("Image");
    const [videoUrl, setVideoUrl] = useState("");
    const [OpenImageIconModel, setOpenImageIconModel] = useState(false);
    const [OpenImageModel, setOpenImageModel] = useState(false);

    /* Description field code stars */
    const [acDesc, setAcDesc] = useState("");
    const [fontSize2, setFontSize2] = useState("");
    const [fontFamily2, setFontFamily2] = useState("");
    const [fontColor2, setFontColor2] = useState("");
    const [lineHeight2, setLineHeight2] = useState("");
    const [letterSpacing2, setLetterSpacing2] = useState("");
    const [fontWeight2, setFontWeight2] = useState("");
    const [fontStyle2, setFontStyle2] = useState("");
    const [textDecoration2, setTextDecoration2] = useState("");
    const [textTransform2, setTextTransform2] = useState("");
    const [textAlignment2, setTextAlignment2] = useState("");
    const [leftPadding2, setLeftPadding2] = useState("");
    const [topPadding2, setTopPadding2] = useState("");
    const [rightPadding2, setRightPadding2] = useState("");
    const [bottomPadding2, setBottomPadding2] = useState("");
    const [leftMargin2, setLeftMargin2] = useState("");
    const [topMargin2, setTopMargin2] = useState("");
    const [rightMargin2, setRightMargin2] = useState("");
    const [bottomMargin2, setBottomMargin2] = useState("");
    const selectedObj = props.componentHtml.filter(
        (obj) => obj.uid == props.currentComponent
    );

    const bgPropertyName = props.variable; //selectedObj.length > 0 ? Object.keys(selectedObj[0].properties).find(key => selectedObj[0].properties[key] === "background") : [];

    /* When click on any component background component will reload and
      we have called function to set default properties */
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

    const updateHeadline = (event) => {
        setHeadline(event.target.value);
    };

    const updateHeadline1 = (event) => {
        setHeadline1(event.target.value);
    };

    useEffect(() => {
        /* Here when change component,values are not retiNING */
        if (selectedObj.length > 0) {
            let tmpVal;
            Object.entries(selectedObj[0].selected_Values).map(([key, value]) => {
                if (key == bgPropertyName) {
                    tmpVal = value;
                }
            });
            if (tmpVal != undefined) {
                if (Object.keys(tmpVal.value).includes("showThumb")) {
                    setshowThumb(tmpVal.value.showThumb);
                    updateArrKey("showThumb", tmpVal.value.showThumb);
                }
                if (Object.keys(tmpVal.value).includes("showArrow")) {
                    setshowArrow(tmpVal.value.showArrow);
                    updateArrKey("showArrow", tmpVal.value.showArrow);
                }
                if (Object.keys(tmpVal.value).includes("infiniteLoop")) {
                    setinfiniteLoop(tmpVal.value.infiniteLoop);
                    updateArrKey("infiniteLoop", tmpVal.value.infiniteLoop);
                }
                if (Object.keys(tmpVal.value).includes("autoPlay")) {
                    setautoPlay(tmpVal.value.autoPlay);
                    updateArrKey("autoPlay", tmpVal.value.autoPlay);
                }
                if (Object.keys(tmpVal.value).includes("stopOnHover")) {
                    setstopOnHover(tmpVal.value.stopOnHover);
                    updateArrKey("stopOnHover", tmpVal.value.stopOnHover);
                }
                if (Object.keys(tmpVal.value).includes("showIndicators")) {
                    setshowIndicators(tmpVal.value.showIndicators);
                    updateArrKey("showIndicators", tmpVal.value.showIndicators);
                }
                if (Object.keys(tmpVal.value).includes("showStatus")) {
                    setshowStatus(tmpVal.value.showStatus);
                    updateArrKey("showStatus", tmpVal.value.showStatus);
                }
                if (Object.keys(tmpVal.value).includes("arrowType")) {
                    setArrowType(tmpVal.value.arrowType);
                    updateArrKey("arrowType", tmpVal.value.arrowType);
                }
                if (Object.keys(tmpVal.value).includes("images")) {
                    if (tmpVal.value.images.length > 1) {
                        setCarouselStatus('On');
                        updateArrKey("carouselStatus", 'On');
                    }
                    updateArrKey("images", tmpVal?.value?.images);
                    setImgArr(tmpVal.value.images);
                }
                setDataArr(tmpVal.value);
            }
        }
    }, [props.currentComponent]);

    useEffect(() => {
        if (btnDisplay1 === "Yes") {
            setBtnText1(btnText1);
            setBtn1Effect(btn1Effect);
            setBtnAlt1(btnAlt1);
            setBtnTextTransform1(btnTextTransform1 ?? btnTextTransform);
            setBtnStyle1(btnStyle1 ?? btnStyle);
            setBtnFontStyle1(btnFontStyle1 ?? btnFontStyle);
            setBtnSize1(btnSize1 ?? btnSize);
            setBtnFontFamily1(btnFontFamily1 ?? btnFontFamily);
            setBtnFontSize1(btnFontSize1 ?? btnFontSize);
            setBtnFontWeight1(btnFontWeight1 ?? btnFontWeight);
            setBtnFontLineHeight1(btnFontLineHeight1 ?? btnFontLineHeight);
            setBtnTextAlignment1(btnTextAlignment1 ?? btnTextAlignment);
            setBtnFontLetterSpacing1(btnFontLetterSpacing ?? btnFontLetterSpacing);
            setBtnTopPadding1(btnTopPadding1 ?? btnTopPadding);
            setBtnRightPadding1(btnRightPadding1 ?? btnRightPadding);
            setBtnBottomPadding1(btnBottomPadding1 ?? btnBottomPadding);
            setBtnLeftPadding1(btnLeftPadding1 ?? btnLeftPadding);
            setBtnTopMargin1(btnTopMargin1 ?? btnTopMargin);
            setBtnRightMargin1(btnRightMargin1 ?? btnRightMargin);
            setBtnBottomMargin1(btnBottomMargin1 ?? btnBottomMargin);
            setBtnLeftMargin1(btnLeftMargin1 ?? btnLeftMargin);
            setBtnHOffset1(btnHOffset1 ?? btnHOffset);
            setBtnVOffset1(btnVOffset1 ?? btnVOffset);
            setBtnBlur1(btnBlur1 ?? btnBlur);
            setBtnSpread1(btnSpread1 ?? btnSpread);
            setBtnShadowColor1(btnShadowColor1 ?? btnShadowColor);
            setBtnShadowRGB1(btnShadowRGB1 ?? btnShadowRGB);
            setBtnShadowOpacity1(btnShadowOpacity1 ?? btnShadowOpacity);
            setBtnFontColor1(btnFontColor1 ?? btnFontColor);
            setBtnWidth1(btnWidth1 ?? btnWidth);
            setBtnLink1(btnLink1 ?? btnLink);
            setBtnLinkWindow1(btnLinkWindow1 ?? btnLinkWindow);
            setBtnLinkFollow1(btnLinkFollow1 ?? btnLinkFollow);
        }
    }, [btnDisplay1]);

    const onElementImageChange = (url) => {
        setImageURL(url);
    };

    const onElementIconImageChange = (url) => {
        setIconImageURL(url);
    };

    const updateAltTag = (val) => {
        setImageAlt(val);
    };

    const updateLink = (val) => {
        setImageLink(val);
    };

    useEffect(() => {
        let strHTML = displayCarousel(
            showIndicators,
            showArrow,
            showStatus,
            showThumb,
            dataArr
        );

        let x = ReactDOM.findDOMNode(
            props.refArray.current[props.currentComponent]
        );
        if (x && x.querySelectorAll("#banner_display").length > 0) {
            x.querySelectorAll("#banner_display")[0].innerHTML = strHTML;
        }
        props.updateProperty({ type: "carousel", value: dataArr }, bgPropertyName);
        if (dataArr?.images && dataArr?.images?.length < 1) {
            changeCarouselStatus({
                target: {
                    checked: false,
                },
            });
        }
    }, [dataArr]);

    const saveData = () => {
        let tmpArr = updateDataArray();
        setImgArr((previous) => [...previous, tmpArr]);
        updateArrKey("images", [...imgArr, tmpArr]);

        setShowData(false);
        setDescriptionDisplay("Off");
    };

    const changeArrowType = (event) => {
        setArrowType(event.target.value);
        updateArrKey("arrowType", event.target.value);
    };

    const deleteData = (element) => {
        let tmpVal = [];
        imgArr.map((acValue, index) => {
            if (acValue.image_url != element.image_url) {
                tmpVal.push(acValue);
            }
        });
        setImgArr(tmpVal);
        updateArrKey("images", tmpVal);
    };

    const changeVisibility = (srno, status) => {
        let tmpVal = [];
        imgArr.map((acValue, index) => {
            let tmpArr = acValue;
            if (acValue.srno === srno) {
                Object.assign(tmpArr, { visibility: status });
            }
            tmpVal.push(tmpArr);
        });
        setImgArr(tmpVal);
        updateArrKey("images", tmpVal);
    };

    const viewBanner = (index) => {
        let strHTML = displayCarousel(
            showIndicators,
            showArrow,
            showStatus,
            showThumb,
            dataArr,
            index
        );

        let x = ReactDOM.findDOMNode(
            props.refArray.current[props.currentComponent]
        );
        if (x) x.querySelectorAll("#banner_display2")[0].innerHTML = strHTML;
        props.updateProperty({ type: "carousel", value: dataArr }, bgPropertyName);
    };

    const editData = (element) => {
        setShowData(true);
        setSrNo(element.srno);
        setImageOrVideo(element.image_or_video);
        setImageURL(element.image_url);
        setImageAlt(element.image_alt);
        setImageLink(element.image_link);
        setVideoType(element.video_type);
        setVideoUrl(element.video_url);
        setImageAsBackground(element.image_as_bg);
        setFixedBackground(element.fixed_background);
        setIconImageURL(element.icon_image_url);
        setImageVideoBackgroundColor(element.image_video_bg_color);
        setBtnDisplay(element.button_display);
        setBtnText(element.button_text);
        setBtnEffect(element.button_aos_effect);
        setBtnAlt(element.button_alt);
        setBtnTextTransform(element.button_text_transform);
        setBtnSize(element.button_size);
        setBtnStyle(element.button_style);
        setBtnLink(element.button_link);
        setBtnLinkFollow(element.button_link_follow);
        setBtnLinkWindow(element.button_link_window);
        setBtnFontColor(element.button_font_color);
        setBtnFontFamily(element.btn_font_family);
        setBtnFontSize(element.btn_font_size);
        setBtnFontWeight(element.btn_font_weight);
        setBtnFontLineHeight(element.btn_font_line_height);
        setBtnTextAlignment(element.button_text_alignment);
        setBtnFontLetterSpacing(element.button_letter_spacing);
        setBtnFontStyle(element.button_font_style);
        setHeadlineTag(element.headline_tag);

        setBtnTopPadding(element.btn_top_padding);
        setBtnRightPadding(element.btn_right_padding);
        setBtnBottomPadding(element.btn_bottom_padding);
        setBtnLeftPadding(element.btn_left_padding);
        setBtnTopMargin(element.btn_top_margin);
        setBtnRightMargin(element.btn_right_margin);
        setBtnBottomMargin(element.btn_bottom_margin);
        setBtnLeftMargin(element.btn_left_margin);
        setBtnHOffset(element.btn_box_hoffset);
        setBtnVOffset(element.btn_box_voffset);
        setBtnBlur(element.btn_box_blur);
        setBtnSpread(element.btn_box_spread);
        setBtnShadowColor(element.btn_box_shadowcolor);
        setBtnShadowRGB(element.btn_box_shadow_rgb);
        setBtnShadowOpacity(element.btn_shadow_opacity);
        setBtnWidth(element.button_width);

        /* Button 2 */
        setBtnDisplay1(element.button_display1);
        setBtnText1(element.button_text1);
        setBtnAlt1(element.button_alt1);
        setBtn1Effect(element.button1_aos_effect);
        setBtnTextTransform1(element.button_text_transform1);
        setBtnSize1(element.button_size1);
        setBtnStyle1(element.button_style1);
        setBtnLink1(element.button_link1);
        setBtnLinkFollow1(element.button_link_follow1);
        setBtnLinkWindow1(element.button_link_window1);
        setBtnFontColor1(element.button_font_color1);
        setBtnFontFamily1(element.btn_font_family1);
        setBtnFontSize1(element.btn_font_size1);
        setBtnFontWeight1(element.btn_font_weight1);
        setBtnFontLineHeight1(element.btn_font_line_height1);
        setBtnTextAlignment1(element.button_text_alignment1);
        setBtnFontLetterSpacing1(element.button_letter_spacing1);
        setBtnFontStyle1(element.button_font_style1);
        setHeadlineTag1(element.headline_tag1);
        setBtnWidth1(element.button_width1);

        setBtnTopPadding1(element.btn_top_padding1);
        setBtnRightPadding1(element.btn_right_padding1);
        setBtnBottomPadding1(element.btn_bottom_padding1);
        setBtnLeftPadding1(element.btn_left_padding1);
        setBtnTopMargin1(element.btn_top_margin1);
        setBtnRightMargin1(element.btn_right_margin1);
        setBtnBottomMargin1(element.btn_bottom_margin1);
        setBtnLeftMargin1(element.btn_left_margin1);
        setBtnHOffset1(element.btn_box_hoffset1);
        setBtnVOffset1(element.btn_box_voffset1);
        setBtnBlur1(element.btn_box_blur1);
        setBtnSpread1(element.btn_box_spread1);
        setBtnShadowColor1(element.btn_box_shadowcolor1);
        setBtnShadowRGB1(element.btn_box_shadow_rgb1);
        setBtnShadowOpacity1(element.btn_shadow_opacity1);

        if (element.headline1_display) {
            setHeadline1Display(true);
            setShowHeadline1Display("On");
        }

        if (element.headline2_display) {
            setHeadline2Display(true);
            setShowHeadline2Display("On");
        }

        if (element.description !== "") {
            setDescriptionDisplay("On");
        }

        setHeadline1Display(element.headline1_display);
        setHeadline2Display(element.headline2_display);
        setHeadline(element.headline);
        setHeadlineTextEffect(element.headline_aos_effect);
        //setHeadlineWidth(element.width);
        setTextTransform(element.text_transform);
        setFontSize(element.font_size);
        setFontFamily(element.font_family);
        setFontColor(element.font_color);
        setLineHeight(element.line_height);
        setLetterSpacing(element.letter_spacing);
        setFontWeight(element.font_weight);
        setFontStyle(element.font_style);
        setTextDecoration(element.text_decoration);
        setTextAlignment(element.text_align);
        setLeftPadding(element.left_padding);
        setTopPadding(element.top_padding);
        setRightPadding(element.right_padding);
        setBottomPadding(element.bottom_padding);
        setLeftMargin(element.left_margin);
        setTopMargin(element.top_margin);
        setRightMargin(element.right_margin);
        setBottomMargin(element.bottom_margin);
        setHeadlineHOffset(element.hoffset);
        setHeadlineVOffset(element.voffset);
        setHeadlineBlur(element.blur);
        setHeadlineShadowColor(element.shadowcolor);
        setHeadlineShadowRGB(element.shadowcolor_rgb);
        setHeadlineShadowOpacity(element.shadow_opacity);

        setHeadline2Display(element.headline2_display);
        setHeadline1(element.headline1);
        setHeadline1TextEffect(element.headline1_aos_effect);
        //setHeadline1Width(element.width1);
        setTextTransform1(element.text_transform1);
        setFontSize1(element.font_size1);
        setFontFamily1(element.font_family1);
        setFontColor1(element.font_color1);
        setLineHeight1(element.line_height1);
        setLetterSpacing1(element.letter_spacing1);
        setFontWeight1(element.font_weight1);
        setFontStyle1(element.font_style1);
        setTextDecoration1(element.text_decoration1);
        setTextAlignment1(element.text_align1);
        setLeftPadding1(element.left_padding1);
        setTopPadding1(element.top_padding1);
        setRightPadding1(element.right_padding1);
        setBottomPadding1(element.bottom_padding1);
        setLeftMargin1(element.left_margin1);
        setTopMargin1(element.top_margin1);
        setRightMargin1(element.right_margin1);
        setBottomMargin1(element.bottom_margin1);
        setHeadlineHOffset1(element.hoffset1);
        setHeadlineVOffset1(element.voffset1);
        setHeadlineBlur1(element.blur1);
        setHeadlineShadowColor1(element.shadowcolor1);
        setHeadlineShadowRGB1(element.shadowcolor_rgb1);
        setHeadlineShadowOpacity1(element.shadow_opacity1);
        setHeadlineTag1(element.headline_tag1);
        setDescriptionDisplay(element.description_display ? "On" : "Off");
        setAcDesc(element.description);
        setTextTransform2(element.text_transform2);
        setFontSize2(element.font_size2);
        setFontFamily2(element.font_family2);
        setFontColor2(element.font_color2);
        setLineHeight2(element.line_height2);
        setLetterSpacing2(element.letter_spacing2);
        setFontWeight2(element.font_weight2);
        setFontStyle2(element.font_style2);
        setTextDecoration2(element.text_decoration2);
        setTextAlignment2(element.text_align2);
        setLeftPadding2(element.left_padding2);
        setTopPadding2(element.top_padding2);
        setRightPadding2(element.right_padding2);
        setBottomPadding2(element.bottom_padding2);
        setLeftMargin2(element.left_margin2);
        setTopMargin2(element.top_margin2);
        setRightMargin2(element.right_margin2);
        setBottomMargin2(element.bottom_margin2);

        setAddBtn(false);
        setEditBtn(true);
        setTextHPos(element.text_hpos);
        setTextVPos(element.text_vpos);
        setBtnHPos(element.btn_hpos);

        setTextBgColor(element.text_bg_color);
        setBgOpacity(element.bg_opacity);
        setHexColor(element.bg_hex_color);
        setHeadlineWidth(element.headline_width);
    };

    const clearButton1Style = () => {
        setBtnText1("");
        setBtnAlt1("");
        setBtn1Effect("");
        setBtnTextTransform1("");
        setBtnSize1("");
        setBtnStyle1("");
        setBtnLink1("");
        setBtnLinkFollow1("");
        setBtnLinkWindow1("");
        setBtnFontColor1("");
        setBtnFontFamily1("");
        setBtnFontSize1("");
        setBtnFontWeight1("");
        setBtnFontLineHeight1("");
        setBtnTextAlignment1("");
        setBtnFontLetterSpacing1("");
        setBtnFontStyle1("");
        setHeadlineTag1("");
        setBtnWidth1("");

        setBtnTopPadding1("");
        setBtnRightPadding1("");
        setBtnBottomPadding1("");
        setBtnLeftPadding1("");
        setBtnTopMargin1("");
        setBtnRightMargin1("");
        setBtnBottomMargin1("");
        setBtnLeftMargin1("");
        setBtnHOffset1("");
        setBtnVOffset1("");
        setBtnBlur1("");
        setBtnSpread1("");
        setBtnShadowColor1("");
        setBtnShadowRGB1("");
        setBtnShadowOpacity1("");
    };
    const updateDataArray = () => {
        let tmpArr = {};
        let rndNumber = randomNumber(indArr);
        setIndArr((previous) => [...previous, rndNumber]);
        Object.assign(tmpArr, { srno: rndNumber });
        Object.assign(tmpArr, { image_url: imageURL });
        Object.assign(tmpArr, { image_link: imageLink });
        Object.assign(tmpArr, { image_alt: imageAlt });
        Object.assign(tmpArr, { image_as_bg: imageAsBackground });
        Object.assign(tmpArr, { fixed_background: fixedBackground });
        Object.assign(tmpArr, { icon_image_url: iconImageURL });
        Object.assign(tmpArr, { image_video_bg_color: imageVideoBackgroundColor });

        getImageHeightWidth(imageURL, async (err, img) => {
            let ImgData = await img;
            Object.assign(tmpArr, {
                image_height_width: {
                    height: ImgData.naturalHeight,
                    width: ImgData.naturalWidth,
                },
            });
        });

        Object.assign(tmpArr, { image_or_video: imageOrVideo });
        Object.assign(tmpArr, { video_type: videoType });
        Object.assign(tmpArr, { video_url: videoUrl });

        Object.assign(tmpArr, { button_display: btnDisplay });
        Object.assign(tmpArr, { button_text: btnText });
        Object.assign(tmpArr, { button_alt: btnAlt });
        Object.assign(tmpArr, { button_aos_effect: btnEffect });
        Object.assign(tmpArr, { button_text_transform: btnTextTransform });
        Object.assign(tmpArr, { button_style: btnStyle });
        Object.assign(tmpArr, { button_size: btnSize });
        Object.assign(tmpArr, { button_link: btnLink });
        Object.assign(tmpArr, { button_link_window: btnLinkWindow });
        Object.assign(tmpArr, { button_link_follow: btnLinkFollow });
        Object.assign(tmpArr, { button_font_color: btnFontColor });

        Object.assign(tmpArr, { btn_font_family: btnFontFamily });
        Object.assign(tmpArr, { btn_font_size: btnFontSize });
        Object.assign(tmpArr, { btn_font_weight: btnFontWeight });
        Object.assign(tmpArr, { button_text_alignment: btnTextAlignment });
        Object.assign(tmpArr, { button_letter_spacing: btnFontLetterSpacing });
        Object.assign(tmpArr, { button_font_style: btnFontStyle });
        Object.assign(tmpArr, { btn_font_line_height: btnFontLineHeight });
        Object.assign(tmpArr, { btn_top_padding: btnTopPadding });
        Object.assign(tmpArr, { btn_right_padding: btnRightPadding });
        Object.assign(tmpArr, { btn_bottom_padding: btnBottomPadding });
        Object.assign(tmpArr, { btn_left_padding: btnLeftPadding });
        Object.assign(tmpArr, { btn_top_margin: btnTopMargin });
        Object.assign(tmpArr, { btn_right_margin: btnRightMargin });
        Object.assign(tmpArr, { btn_bottom_margin: btnBottomMargin });
        Object.assign(tmpArr, { btn_left_margin: btnLeftMargin });
        Object.assign(tmpArr, { button_width: btnWidth });
        // Box Shadow
        Object.assign(tmpArr, { btn_box_hoffset: btnHOffset });
        Object.assign(tmpArr, { btn_box_voffset: btnVOffset });
        Object.assign(tmpArr, { btn_box_blur: btnBlur });
        Object.assign(tmpArr, { btn_box_spread: btnSpread });
        Object.assign(tmpArr, { btn_box_shadowcolor: btnShadowColor });
        Object.assign(tmpArr, { btn_box_shadow_rgb: btnShadowRGB });
        Object.assign(tmpArr, { btn_shadow_opacity: btnShadowOpacity });

        /* Second Button */
        Object.assign(tmpArr, { button_display1: btnDisplay1 });
        Object.assign(tmpArr, { button_text1: btnText1 });
        Object.assign(tmpArr, { button_alt1: btnAlt1 });
        Object.assign(tmpArr, { button1_aos_effect: btn1Effect });
        Object.assign(tmpArr, { button_text_transform1: btnTextTransform1 });
        Object.assign(tmpArr, { button_style1: btnStyle1 });
        Object.assign(tmpArr, { button_size1: btnSize1 });
        Object.assign(tmpArr, { button_link1: btnLink1 });
        Object.assign(tmpArr, { button_link_window1: btnLinkWindow1 });
        Object.assign(tmpArr, { button_link_follow1: btnLinkFollow1 });
        Object.assign(tmpArr, { button_font_color1: btnFontColor1 });
        Object.assign(tmpArr, { btn_font_family1: btnFontFamily1 });
        Object.assign(tmpArr, { btn_font_size1: btnFontSize1 });
        Object.assign(tmpArr, { btn_font_weight1: btnFontWeight1 });
        Object.assign(tmpArr, { button_text_alignment1: btnTextAlignment1 });
        Object.assign(tmpArr, { button_letter_spacing1: btnFontLetterSpacing1 });
        Object.assign(tmpArr, { button_font_style1: btnFontStyle1 });
        Object.assign(tmpArr, { btn_font_line_height1: btnFontLineHeight1 });
        Object.assign(tmpArr, { btn_top_padding1: btnTopPadding1 });
        Object.assign(tmpArr, { btn_right_padding1: btnRightPadding1 });
        Object.assign(tmpArr, { btn_bottom_padding1: btnBottomPadding1 });
        Object.assign(tmpArr, { btn_left_padding1: btnLeftPadding1 });
        Object.assign(tmpArr, { btn_top_margin1: btnTopMargin1 });
        Object.assign(tmpArr, { btn_right_margin1: btnRightMargin1 });
        Object.assign(tmpArr, { btn_bottom_margin1: btnBottomMargin1 });
        Object.assign(tmpArr, { btn_left_margin1: btnLeftMargin1 });
        Object.assign(tmpArr, { button_width1: btnWidth1 });
        // Box Shadow
        Object.assign(tmpArr, { btn_box_hoffset1: btnHOffset1 });
        Object.assign(tmpArr, { btn_box_voffset1: btnVOffset1 });
        Object.assign(tmpArr, { btn_box_blur1: btnBlur1 });
        Object.assign(tmpArr, { btn_box_spread1: btnSpread1 });
        Object.assign(tmpArr, { btn_box_shadowcolor1: btnShadowColor1 });
        Object.assign(tmpArr, { btn_box_shadow_rgb1: btnShadowRGB1 });
        Object.assign(tmpArr, { btn_shadow_opacity1: btnShadowOpacity1 });

        Object.assign(tmpArr, { headline1_display: headline1Display });
        Object.assign(tmpArr, { headline: headline });
        Object.assign(tmpArr, { headline_aos_effect: headlineTextEffect });
        //Object.assign(tmpArr, { "width": headlineWidth});
        Object.assign(tmpArr, { font_size: fontSize });
        Object.assign(tmpArr, { text_transform: textTransform });
        Object.assign(tmpArr, { font_family: fontFamily });
        Object.assign(tmpArr, { font_color: fontColor });
        Object.assign(tmpArr, { line_height: lineHeight });
        Object.assign(tmpArr, { letter_spacing: letterSpacing });
        Object.assign(tmpArr, { font_weight: fontWeight });
        Object.assign(tmpArr, { font_style: fontStyle });
        Object.assign(tmpArr, { text_decoration: textDecoration });
        Object.assign(tmpArr, { text_align: textAlignment });
        Object.assign(tmpArr, { left_padding: leftPadding1 });
        Object.assign(tmpArr, { top_padding: topPadding });
        Object.assign(tmpArr, { right_padding: rightPadding });
        Object.assign(tmpArr, { bottom_padding: bottomPadding });
        Object.assign(tmpArr, { left_margin: leftMargin });
        Object.assign(tmpArr, { top_margin: topMargin });
        Object.assign(tmpArr, { right_margin: rightMargin });
        Object.assign(tmpArr, { bottom_margin: bottomMargin });
        Object.assign(tmpArr, { headline_tag: headlineTag });

        /* Box Shadow */
        Object.assign(tmpArr, { hoffset: headlineHOffset });
        Object.assign(tmpArr, { voffset: headlineVOffset });
        Object.assign(tmpArr, { blur: headlineBlur });
        Object.assign(tmpArr, { shadowcolor: headlineShadowColor });
        Object.assign(tmpArr, { shadowcolor_rgb: headlineShadowRGB });
        Object.assign(tmpArr, { shadow_opacity: headlineShadowOpacity });

        let class1 = "";
        if (textTransform) {
            class1 += " " + textTransform;
        }
        if (fontSize) {
            class1 += " " + fontSize;
        }
        if (fontFamily) {
            class1 += " " + fontFamily;
        }
        if (lineHeight) {
            class1 += " " + lineHeight;
        }
        if (letterSpacing) {
            class1 += " tracking-[" + letterSpacing + "]";
        }
        if (fontWeight) {
            class1 += " " + fontWeight;
        }
        if (fontStyle) {
            class1 += " " + fontStyle;
        }
        if (textAlignment) {
            class1 += " " + textAlignment;
        }
        if (leftMargin) {
            class1 += " " + leftMargin;
        }
        if (topMargin) {
            class1 += " " + topMargin;
        }
        if (rightMargin) {
            class1 += " " + rightMargin;
        }
        if (bottomMargin) {
            class1 += " " + bottomMargin;
        }
        if (leftPadding) {
            class1 += " " + leftPadding;
        }
        if (rightPadding) {
            class1 += " " + rightPadding;
        }
        if (topPadding) {
            class1 += " " + topPadding;
        }
        if (bottomPadding) {
            class1 += " " + bottomPadding;
        }
        let headline1BoxShadow = "";
        if (headlineHOffset) {
            headline1BoxShadow += headlineHOffset + "px ";
        }
        if (headlineVOffset) {
            headline1BoxShadow += headlineVOffset + "px ";
        }
        if (headlineBlur) {
            headline1BoxShadow += headlineBlur + "px ";
        }
        if (headlineShadowRGB) {
            headline1BoxShadow +=
                " rgba(" +
                headlineShadowRGB +
                ", " +
                (headlineShadowOpacity ?? 1) +
                ")";
        }
        Object.assign(tmpArr, { headline1_box_shadow: headline1BoxShadow });
        Object.assign(tmpArr, { headline1_class: class1 });
        Object.assign(tmpArr, { headline1_aos_effect: headline1TextEffect });
        Object.assign(tmpArr, { headline2_display: headline2Display });
        Object.assign(tmpArr, { headline1: headline1 });
        Object.assign(tmpArr, { font_size1: fontSize1 });
        Object.assign(tmpArr, { text_transform1: textTransform1 });
        Object.assign(tmpArr, { font_family1: fontFamily1 });
        Object.assign(tmpArr, { font_color1: fontColor1 });
        Object.assign(tmpArr, { line_height1: lineHeight1 });
        Object.assign(tmpArr, { letter_spacing1: letterSpacing1 });
        Object.assign(tmpArr, { font_weight1: fontWeight1 });
        Object.assign(tmpArr, { font_style1: fontStyle1 });
        Object.assign(tmpArr, { text_decoration1: textDecoration1 });
        Object.assign(tmpArr, { text_align1: textAlignment1 });
        Object.assign(tmpArr, { left_padding1: leftPadding1 });
        Object.assign(tmpArr, { top_padding1: topPadding1 });
        Object.assign(tmpArr, { right_padding1: rightPadding1 });
        Object.assign(tmpArr, { bottom_padding1: bottomPadding1 });
        Object.assign(tmpArr, { left_margin1: leftMargin1 });
        Object.assign(tmpArr, { top_margin1: topMargin1 });
        Object.assign(tmpArr, { right_margin1: rightMargin1 });
        Object.assign(tmpArr, { bottom_margin1: bottomMargin1 });
        Object.assign(tmpArr, { headline_tag1: headlineTag1 });
        /* Box Shadow */
        Object.assign(tmpArr, { hoffset1: headlineHOffset1 });
        Object.assign(tmpArr, { voffset1: headlineVOffset1 });
        Object.assign(tmpArr, { blur1: headlineBlur1 });
        Object.assign(tmpArr, { shadowcolor1: headlineShadowColor1 });
        Object.assign(tmpArr, { shadowcolor_rgb1: headlineShadowRGB1 });
        Object.assign(tmpArr, { shadow_opacity1: headlineShadowOpacity1 });
        let class2 = "";
        if (textTransform1) {
            class2 += " " + textTransform1;
        }
        if (fontSize1) {
            class2 += " " + fontSize1;
        }
        if (fontFamily1) {
            class2 += " " + fontFamily1;
        }
        if (lineHeight1) {
            class2 += " " + lineHeight1;
        }
        if (letterSpacing1) {
            class2 += " tracking-[" + letterSpacing1 + "]";
        }
        if (fontWeight1) {
            class2 += " " + fontWeight1;
        }
        if (fontStyle1) {
            class2 += " " + fontStyle1;
        }
        if (textAlignment1) {
            class2 += " " + textAlignment1;
        }
        if (leftMargin1) {
            class2 += " " + leftMargin1;
        }
        if (topMargin1) {
            class2 += " " + topMargin1;
        }
        if (rightMargin1) {
            class2 += " " + rightMargin1;
        }
        if (bottomMargin1) {
            class2 += " " + bottomMargin1;
        }
        if (leftPadding1) {
            class2 += " " + leftPadding1;
        }
        if (rightPadding1) {
            class2 += " " + rightPadding1;
        }
        if (topPadding1) {
            class2 += " " + topPadding1;
        }
        if (bottomPadding1) {
            class2 += " " + bottomPadding1;
        }

        let headline2BoxShadow = "";
        if (headlineHOffset1) {
            headline2BoxShadow += headlineHOffset1 + "px ";
        }
        if (headlineVOffset1) {
            headline2BoxShadow += headlineVOffset1 + "px ";
        }
        if (headlineBlur1) {
            headline2BoxShadow += headlineBlur1 + "px ";
        }
        if (headlineShadowRGB) {
            headline2BoxShadow +=
                " rgba(" +
                headlineShadowRGB1 +
                ", " +
                (headlineShadowOpacity1 ?? 1) +
                ")";
        }
        Object.assign(tmpArr, { headline2_box_shadow: headline2BoxShadow });
        Object.assign(tmpArr, { headline2_class: class2 });

        /* Description Value */
        Object.assign(tmpArr, { description_display: descriptionDisplay === "On" });
        Object.assign(tmpArr, { description: acDesc });
        Object.assign(tmpArr, { font_size2: fontSize2 });
        Object.assign(tmpArr, { text_transform2: textTransform2 });
        Object.assign(tmpArr, { font_family2: fontFamily2 });
        Object.assign(tmpArr, { font_color2: fontColor2 });
        Object.assign(tmpArr, { line_height2: lineHeight2 });
        Object.assign(tmpArr, { letter_spacing2: letterSpacing2 });
        Object.assign(tmpArr, { font_weight2: fontWeight2 });
        Object.assign(tmpArr, { font_style2: fontStyle2 });
        Object.assign(tmpArr, { text_decoration2: textDecoration2 });
        Object.assign(tmpArr, { text_align2: textAlignment2 });
        Object.assign(tmpArr, { left_padding2: leftPadding2 });
        Object.assign(tmpArr, { top_padding2: topPadding2 });
        Object.assign(tmpArr, { right_padding2: rightPadding2 });
        Object.assign(tmpArr, { bottom_padding2: bottomPadding2 });
        Object.assign(tmpArr, { left_margin2: leftMargin2 });
        Object.assign(tmpArr, { top_margin2: topMargin2 });
        Object.assign(tmpArr, { right_margin2: rightMargin2 });
        Object.assign(tmpArr, { bottom_margin2: bottomMargin2 });

        let class3 = "";
        if (textTransform2) {
            class3 += " " + textTransform2;
        }
        if (fontSize2) {
            class3 += " " + fontSize2;
        }
        if (fontFamily2) {
            class3 += " " + fontFamily2;
        }
        if (lineHeight2) {
            class3 += " " + lineHeight2;
        }
        if (letterSpacing2) {
            class3 += " tracking-[" + letterSpacing2 + "]";
        }
        if (fontWeight2) {
            class3 += " " + fontWeight2;
        }
        if (fontStyle2) {
            class3 += " " + fontStyle2;
        }
        if (textAlignment2) {
            class3 += " " + textAlignment2;
        }
        if (leftMargin2) {
            class3 += " " + leftMargin2;
        }
        if (topMargin2) {
            class3 += " " + topMargin2;
        }
        if (rightMargin2) {
            class3 += " " + rightMargin2;
        }
        if (bottomMargin2) {
            class3 += " " + bottomMargin2;
        }
        if (leftPadding2) {
            class3 += " " + leftPadding2;
        }
        if (rightPadding2) {
            class3 += " " + rightPadding2;
        }
        if (topPadding2) {
            class3 += " " + topPadding2;
        }
        if (bottomPadding2) {
            class3 += " " + bottomPadding2;
        }

        Object.assign(tmpArr, { description_class: class3 });

        let btnClass = "text-center ";
        if (btnTextTransform) {
            btnClass += " " + btnTextTransform;
        }
        if (btnFontStyle) {
            btnClass += " " + btnFontStyle;
        }
        if (btnFontSize) {
            btnClass += " " + btnFontSize;
        }
        if (btnFontFamily) {
            btnClass += " " + btnFontFamily;
        }
        if (btnFontLineHeight) {
            btnClass += " " + btnFontLineHeight;
        }
        if (btnFontWeight) {
            btnClass += " " + btnFontWeight;
        }
        if (btnStyle) {
            btnClass += " " + btnStyle;
        }
        if (btnLeftMargin) {
            btnClass += " " + btnLeftMargin;
        }
        if (btnTopMargin) {
            btnClass += " " + btnTopMargin;
        }
        if (btnRightMargin) {
            btnClass += " " + btnRightMargin;
        }
        if (btnBottomMargin) {
            btnClass += " " + btnBottomMargin;
        }
        if (btnLeftPadding) {
            btnClass += " " + btnLeftPadding;
        }
        if (btnRightPadding) {
            btnClass += " " + btnRightPadding;
        }
        if (btnTopPadding) {
            btnClass += " " + btnTopPadding;
        }
        if (btnBottomPadding) {
            btnClass += " " + btnBottomPadding;
        }
        if (btnWidth) {
            btnClass += " " + btnWidth;
        }

        let btnBoxShadow = "";
        if (btnHOffset) {
            btnBoxShadow += btnHOffset + "px ";
        }
        if (btnVOffset) {
            btnBoxShadow += btnVOffset + "px ";
        }
        if (btnBlur) {
            btnBoxShadow += btnBlur + "px ";
        }
        if (btnSpread) {
            btnBoxShadow += btnSpread + "px ";
        }
        if (btnShadowRGB) {
            btnBoxShadow +=
                " rgba(" + btnShadowRGB + ", " + (btnShadowOpacity ?? 1) + ")";
        }
        Object.assign(tmpArr, { button_class: btnClass });
        Object.assign(tmpArr, { button_box_shadow: btnBoxShadow });

        let btnClass1 = "text-center ";
        if (btnTextTransform1) {
            btnClass1 += " " + btnTextTransform1;
        }
        if (btnFontSize1) {
            btnClass1 += " " + btnFontSize1;
        }
        if (btnFontStyle1) {
            btnClass1 += " " + btnFontStyle1;
        }
        if (btnFontFamily1) {
            btnClass1 += " " + btnFontFamily1;
        }
        if (btnFontLineHeight1) {
            btnClass1 += " " + btnFontLineHeight1;
        }
        if (btnFontWeight1) {
            btnClass1 += " " + btnFontWeight1;
        }
        if (btnStyle1) {
            btnClass1 += " " + btnStyle1;
        }
        if (btnLeftMargin1) {
            btnClass1 += " " + btnLeftMargin1;
        }
        if (btnTopMargin1) {
            btnClass1 += " " + btnTopMargin1;
        }
        if (btnRightMargin1) {
            btnClass1 += " " + btnRightMargin1;
        }
        if (btnBottomMargin1) {
            btnClass1 += " " + btnBottomMargin1;
        }
        if (btnLeftPadding1) {
            btnClass1 += " " + btnLeftPadding1;
        }
        if (btnRightPadding1) {
            btnClass1 += " " + btnRightPadding1;
        }
        if (btnTopPadding1) {
            btnClass1 += " " + btnTopPadding1;
        }
        if (btnBottomPadding1) {
            btnClass1 += " " + btnBottomPadding1;
        }
        if (btnWidth1) {
            btnClass1 += " " + btnWidth1;
        }

        let btnBoxShadow1 = "";
        if (btnHOffset1) {
            btnBoxShadow1 += btnHOffset1 + "px ";
        }
        if (btnVOffset1) {
            btnBoxShadow1 += btnVOffset1 + "px ";
        }
        if (btnBlur1) {
            btnBoxShadow1 += btnBlur1 + "px ";
        }
        if (btnSpread1) {
            btnBoxShadow1 += btnSpread1 + "px ";
        }
        if (btnShadowRGB1) {
            btnBoxShadow1 +=
                " rgba(" + btnShadowRGB1 + ", " + (btnShadowOpacity1 ?? 1) + ")";
        }
        Object.assign(tmpArr, { button_class1: btnClass1 });
        Object.assign(tmpArr, { button_box_shadow1: btnBoxShadow1 });
        Object.assign(tmpArr, { text_hpos: textHPos });
        Object.assign(tmpArr, { text_vpos: textVPos });
        Object.assign(tmpArr, { btn_hpos: btnHPos });
        Object.assign(tmpArr, { text_bg_color: textBgColor });
        Object.assign(tmpArr, { bg_opacity: bgOpacity });
        Object.assign(tmpArr, { bg_hex_color: hexColor });
        Object.assign(tmpArr, { headline_width: headlineWidth });

        setImageURL("");
        setIconImageURL("");
        setImageAlt("");
        setImageLink("");
        setHeadlineWidth("");
        setImageVideoBackgroundColor("");
        clearHeadline();
        clearHeadline1();
        clearDescription();
        clearButton();
        clearButton1();
        setVideoUrl("");
        setImageOrVideo("Image");
        setTextHPos("items-center");
        setTextVPos("justify-center");
        setBtnHPos("items-center");
        setTextBgColor("");
        setBgOpacity(1);
        setHexColor("");
        return tmpArr;
    };

    const updateData = () => {
        let tmpVal = [];
        imgArr.map((acValue, index) => {
            if (acValue.srno == srno) {
                let tmpArr = {};
                Object.assign(tmpArr, { srno: srno });
                Object.assign(tmpArr, { image_url: imageURL });
                Object.assign(tmpArr, { image_link: imageLink });
                Object.assign(tmpArr, { image_alt: imageAlt });
                Object.assign(tmpArr, { image_as_bg: imageAsBackground });
                Object.assign(tmpArr, { fixed_background: fixedBackground });
                Object.assign(tmpArr, { icon_image_url: iconImageURL });
                Object.assign(tmpArr, {
                    image_video_bg_color: imageVideoBackgroundColor,
                });
                getImageHeightWidth(imageURL, async (err, img) => {
                    let ImgData = await img;
                    Object.assign(tmpArr, {
                        image_height_width: {
                            height: ImgData.naturalHeight,
                            width: ImgData.naturalWidth,
                        },
                    });
                });
                Object.assign(tmpArr, { icon_image_url: iconImageURL });

                Object.assign(tmpArr, { image_or_video: imageOrVideo });
                Object.assign(tmpArr, { video_type: videoType });
                Object.assign(tmpArr, { video_url: videoUrl });
                Object.assign(tmpArr, { headline1_display: headline1Display });
                Object.assign(tmpArr, { headline: headline });
                Object.assign(tmpArr, { headline_aos_effect: headlineTextEffect });
                //Object.assign(tmpArr, { "width": headlineWidth});
                Object.assign(tmpArr, { font_size: fontSize });
                Object.assign(tmpArr, { text_transform: textTransform });
                Object.assign(tmpArr, { font_family: fontFamily });
                Object.assign(tmpArr, { font_color: fontColor });
                Object.assign(tmpArr, { line_height: lineHeight });
                Object.assign(tmpArr, { letter_spacing: letterSpacing });
                Object.assign(tmpArr, { font_weight: fontWeight });
                Object.assign(tmpArr, { font_style: fontStyle });
                Object.assign(tmpArr, { text_decoration: textDecoration });
                Object.assign(tmpArr, { text_align: textAlignment });
                Object.assign(tmpArr, { left_padding: leftPadding });
                Object.assign(tmpArr, { top_padding: topPadding });
                Object.assign(tmpArr, { right_padding: rightPadding });
                Object.assign(tmpArr, { bottom_padding: bottomPadding });
                Object.assign(tmpArr, { left_margin: leftMargin });
                Object.assign(tmpArr, { top_margin: topMargin });
                Object.assign(tmpArr, { right_margin: rightMargin });
                Object.assign(tmpArr, { bottom_margin: bottomMargin });
                Object.assign(tmpArr, { headline_tag: headlineTag });
                /* Box Shadow */
                Object.assign(tmpArr, { hoffset: headlineHOffset });
                Object.assign(tmpArr, { voffset: headlineVOffset });
                Object.assign(tmpArr, { blur: headlineBlur });
                Object.assign(tmpArr, { shadowcolor: headlineShadowColor });
                Object.assign(tmpArr, { shadowcolor_rgb: headlineShadowRGB });
                Object.assign(tmpArr, { shadow_opacity: headlineShadowOpacity });

                let class1 = "";
                if (textTransform) {
                    class1 += " " + textTransform;
                }
                if (fontSize) {
                    class1 += " " + fontSize;
                }
                if (fontFamily) {
                    class1 += " " + fontFamily;
                }

                if (lineHeight) {
                    class1 += " " + lineHeight;
                }
                if (letterSpacing) {
                    class1 += " tracking-[" + letterSpacing + "]";
                }
                if (fontWeight) {
                    class1 += " " + fontWeight;
                }
                if (fontStyle) {
                    class1 += " " + fontStyle;
                }
                if (textAlignment) {
                    class1 += " " + textAlignment;
                }
                if (leftMargin) {
                    class1 += " " + leftMargin;
                }
                if (topMargin) {
                    class1 += " " + topMargin;
                }
                if (rightMargin) {
                    class1 += " " + rightMargin;
                }
                if (bottomMargin) {
                    class1 += " " + bottomMargin;
                }
                if (leftPadding) {
                    class1 += " " + leftPadding;
                }
                if (rightPadding) {
                    class1 += " " + rightPadding;
                }
                if (topPadding) {
                    class1 += " " + topPadding;
                }
                if (bottomPadding) {
                    class1 += " " + bottomPadding;
                }
                let headline1BoxShadow = "";
                if (headlineHOffset) {
                    headline1BoxShadow += headlineHOffset + "px ";
                }
                if (headlineVOffset) {
                    headline1BoxShadow += headlineVOffset + "px ";
                }
                if (headlineBlur) {
                    headline1BoxShadow += headlineBlur + "px ";
                }
                if (headlineShadowRGB) {
                    headline1BoxShadow +=
                        " rgba(" +
                        headlineShadowRGB +
                        ", " +
                        (headlineShadowOpacity ?? 1) +
                        ")";
                }
                Object.assign(tmpArr, { headline1_box_shadow: headline1BoxShadow });
                Object.assign(tmpArr, { headline1_class: class1 });
                Object.assign(tmpArr, { headline2_display: headline2Display });
                Object.assign(tmpArr, { headline1: headline1 });
                Object.assign(tmpArr, { headline1_aos_effect: headline1TextEffect });
                //Object.assign(tmpArr, { "width1": headline1Width});
                Object.assign(tmpArr, { font_size1: fontSize1 });
                Object.assign(tmpArr, { text_transform1: textTransform1 });
                Object.assign(tmpArr, { font_family1: fontFamily1 });
                Object.assign(tmpArr, { font_color1: fontColor1 });
                Object.assign(tmpArr, { line_height1: lineHeight1 });
                Object.assign(tmpArr, { letter_spacing1: letterSpacing1 });
                Object.assign(tmpArr, { font_weight1: fontWeight1 });
                Object.assign(tmpArr, { font_style1: fontStyle1 });
                Object.assign(tmpArr, { text_decoration1: textDecoration1 });
                Object.assign(tmpArr, { text_align1: textAlignment1 });
                Object.assign(tmpArr, { left_padding1: leftPadding1 });
                Object.assign(tmpArr, { top_padding1: topPadding1 });
                Object.assign(tmpArr, { right_padding1: rightPadding1 });
                Object.assign(tmpArr, { bottom_padding1: bottomPadding1 });
                Object.assign(tmpArr, { left_margin1: leftMargin1 });
                Object.assign(tmpArr, { top_margin1: topMargin1 });
                Object.assign(tmpArr, { right_margin1: rightMargin1 });
                Object.assign(tmpArr, { bottom_margin1: bottomMargin1 });
                Object.assign(tmpArr, { headline_tag1: headlineTag1 });

                /* Box Shadow */
                Object.assign(tmpArr, { hoffset1: headlineHOffset1 });
                Object.assign(tmpArr, { voffset1: headlineVOffset1 });
                Object.assign(tmpArr, { blur1: headlineBlur1 });
                Object.assign(tmpArr, { shadowcolor1: headlineShadowColor1 });
                Object.assign(tmpArr, { shadowcolor_rgb1: headlineShadowRGB1 });
                Object.assign(tmpArr, { shadow_opacity1: headlineShadowOpacity1 });

                let class2 = "";
                if (textTransform1) {
                    class2 += " " + textTransform1;
                }
                if (fontSize1) {
                    class2 += " " + fontSize1;
                }
                if (fontFamily1) {
                    class2 += " " + fontFamily1;
                }
                if (lineHeight1) {
                    class2 += " " + lineHeight1;
                }
                if (letterSpacing1) {
                    class2 += " tracking-[" + letterSpacing1 + "]";
                }
                if (fontWeight1) {
                    class2 += " " + fontWeight1;
                }
                if (fontStyle1) {
                    class2 += " " + fontStyle1;
                }
                if (textAlignment1) {
                    class2 += " " + textAlignment1;
                }
                if (leftMargin1) {
                    class2 += " " + leftMargin1;
                }
                if (topMargin1) {
                    class2 += " " + topMargin1;
                }
                if (rightMargin1) {
                    class2 += " " + rightMargin1;
                }
                if (bottomMargin1) {
                    class2 += " " + bottomMargin1;
                }
                if (leftPadding1) {
                    class2 += " " + leftPadding1;
                }
                if (rightPadding1) {
                    class2 += " " + rightPadding1;
                }
                if (topPadding1) {
                    class2 += " " + topPadding1;
                }
                if (bottomPadding1) {
                    class2 += " " + bottomPadding1;
                }
                let headline2BoxShadow = "";
                if (headlineHOffset1) {
                    headline2BoxShadow += headlineHOffset1 + "px ";
                }
                if (headlineVOffset1) {
                    headline2BoxShadow += headlineVOffset1 + "px ";
                }
                if (headlineBlur1) {
                    headline2BoxShadow += headlineBlur1 + "px ";
                }
                if (headlineShadowRGB) {
                    headline2BoxShadow +=
                        " rgba(" +
                        headlineShadowRGB1 +
                        ", " +
                        (headlineShadowOpacity1 ?? 1) +
                        ")";
                }
                Object.assign(tmpArr, { headline2_box_shadow: headline2BoxShadow });
                Object.assign(tmpArr, { headline2_class: class2 });

                /* Description Value */
                Object.assign(tmpArr, {
                    description_display: descriptionDisplay === "On",
                });
                Object.assign(tmpArr, { description: acDesc });
                Object.assign(tmpArr, { font_size2: fontSize2 });
                Object.assign(tmpArr, { text_transform2: textTransform2 });
                Object.assign(tmpArr, { font_family2: fontFamily2 });
                Object.assign(tmpArr, { font_color2: fontColor2 });
                Object.assign(tmpArr, { line_height2: lineHeight2 });
                Object.assign(tmpArr, { letter_spacing2: letterSpacing2 });
                Object.assign(tmpArr, { font_weight2: fontWeight2 });
                Object.assign(tmpArr, { font_style2: fontStyle2 });
                Object.assign(tmpArr, { text_decoration2: textDecoration2 });
                Object.assign(tmpArr, { text_align2: textAlignment2 });
                Object.assign(tmpArr, { left_padding2: leftPadding2 });
                Object.assign(tmpArr, { top_padding2: topPadding2 });
                Object.assign(tmpArr, { right_padding2: rightPadding2 });
                Object.assign(tmpArr, { bottom_padding2: bottomPadding2 });
                Object.assign(tmpArr, { left_margin2: leftMargin2 });
                Object.assign(tmpArr, { top_margin2: topMargin2 });
                Object.assign(tmpArr, { right_margin2: rightMargin2 });
                Object.assign(tmpArr, { bottom_margin2: bottomMargin2 });

                let class3 = "";
                if (textTransform2) {
                    class3 += " " + textTransform2;
                }
                if (fontSize2) {
                    class3 += " " + fontSize2;
                }
                if (fontFamily2) {
                    class3 += " " + fontFamily2;
                }
                if (lineHeight2) {
                    class3 += " " + lineHeight2;
                }
                if (letterSpacing2) {
                    class3 += " tracking-[" + letterSpacing2 + "]";
                }
                if (fontWeight2) {
                    class3 += " " + fontWeight2;
                }
                if (fontStyle2) {
                    class3 += " " + fontStyle2;
                }
                if (textAlignment2) {
                    class3 += " " + textAlignment2;
                }
                if (leftMargin2) {
                    class3 += " " + leftMargin2;
                }
                if (topMargin2) {
                    class3 += " " + topMargin2;
                }
                if (rightMargin2) {
                    class3 += " " + rightMargin2;
                }
                if (bottomMargin2) {
                    class3 += " " + bottomMargin2;
                }
                if (leftPadding2) {
                    class3 += " " + leftPadding2;
                }
                if (rightPadding2) {
                    class3 += " " + rightPadding2;
                }
                if (topPadding2) {
                    class3 += " " + topPadding2;
                }
                if (bottomPadding2) {
                    class3 += " " + bottomPadding2;
                }
                Object.assign(tmpArr, { description_class: class3 });

                let btnClass = "text-center ";
                if (btnTextTransform) {
                    btnClass += " " + btnTextTransform;
                }
                if (btnFontSize) {
                    btnClass += " " + btnFontSize;
                }
                if (btnFontFamily) {
                    btnClass += " " + btnFontFamily;
                }
                if (btnFontLetterSpacing) {
                    btnClass += " tracking-[" + btnFontLetterSpacing + "]";
                }
                if (btnFontStyle) {
                    btnClass += " " + btnFontStyle;
                }
                if (btnFontLineHeight) {
                    btnClass += " " + btnFontLineHeight;
                }
                if (btnFontWeight) {
                    btnClass += " " + btnFontWeight;
                }
                if (btnStyle) {
                    btnClass += " " + btnStyle;
                }
                if (btnLeftMargin) {
                    btnClass += " " + btnLeftMargin;
                }
                if (btnTopMargin) {
                    btnClass += " " + btnTopMargin;
                }
                if (btnRightMargin) {
                    btnClass += " " + btnRightMargin;
                }
                if (btnBottomMargin) {
                    btnClass += " " + btnBottomMargin;
                }
                if (btnLeftPadding) {
                    btnClass += " " + btnLeftPadding;
                }
                if (btnRightPadding) {
                    btnClass += " " + btnRightPadding;
                }
                if (btnTopPadding) {
                    btnClass += " " + btnTopPadding;
                }
                if (btnBottomPadding) {
                    btnClass += " " + btnBottomPadding;
                }
                if (btnWidth) btnClass += " " + btnWidth;
                let btnBoxShadow = "";
                if (btnHOffset) {
                    btnBoxShadow += btnHOffset + "px ";
                }
                if (btnVOffset) {
                    btnBoxShadow += btnVOffset + "px ";
                }
                if (btnBlur) {
                    btnBoxShadow += btnBlur + "px ";
                }
                if (btnSpread) {
                    btnBoxShadow += btnSpread + "px ";
                }
                if (btnShadowRGB) {
                    btnBoxShadow +=
                        " rgba(" + btnShadowRGB + ", " + (btnShadowOpacity ?? 1) + ")";
                }
                Object.assign(tmpArr, { button_class: btnClass });
                Object.assign(tmpArr, { button_box_shadow: btnBoxShadow });

                let btnClass1 = "text-center ";
                if (btnTextTransform1) {
                    btnClass1 += " " + btnTextTransform1;
                }
                if (btnFontSize1) {
                    btnClass1 += " " + btnFontSize1;
                }
                if (btnFontStyle1) {
                    btnClass1 += " " + btnFontStyle1;
                }
                if (btnFontFamily1) {
                    btnClass1 += " " + btnFontFamily1;
                }
                if (btnFontLineHeight1) {
                    btnClass1 += " " + btnFontLineHeight1;
                }
                if (btnFontWeight1) {
                    btnClass1 += " " + btnFontWeight1;
                }
                if (btnStyle1) {
                    btnClass1 += " " + btnStyle1;
                }
                if (btnLeftMargin1) {
                    btnClass1 += " " + btnLeftMargin1;
                }
                if (btnTopMargin1) {
                    btnClass1 += " " + btnTopMargin1;
                }
                if (btnRightMargin1) {
                    btnClass1 += " " + btnRightMargin1;
                }
                if (btnBottomMargin1) {
                    btnClass1 += " " + btnBottomMargin1;
                }
                if (btnLeftPadding1) {
                    btnClass1 += " " + btnLeftPadding1;
                }
                if (btnRightPadding1) {
                    btnClass1 += " " + btnRightPadding1;
                }
                if (btnTopPadding1) {
                    btnClass1 += " " + btnTopPadding1;
                }
                if (btnBottomPadding1) {
                    btnClass1 += " " + btnBottomPadding1;
                }
                if (btnWidth1) btnClass1 += " " + btnWidth1;

                let btnBoxShadow1 = "";
                if (btnHOffset1) {
                    btnBoxShadow1 += btnHOffset1 + "px ";
                }
                if (btnVOffset1) {
                    btnBoxShadow1 += btnVOffset1 + "px ";
                }
                if (btnBlur1) {
                    btnBoxShadow1 += btnBlur1 + "px ";
                }
                if (btnSpread1) {
                    btnBoxShadow1 += btnSpread1 + "px ";
                }
                if (btnShadowRGB1) {
                    btnBoxShadow1 +=
                        " rgba(" + btnShadowRGB1 + ", " + (btnShadowOpacity1 ?? 1) + ")";
                }

                Object.assign(tmpArr, { button_class1: btnClass1 });
                Object.assign(tmpArr, { button_box_shadow1: btnBoxShadow1 });
                Object.assign(tmpArr, { button_display: btnDisplay });
                Object.assign(tmpArr, { button_text: btnText });
                Object.assign(tmpArr, { button_alt: btnAlt });
                Object.assign(tmpArr, { button_aos_effect: btnEffect });
                Object.assign(tmpArr, { button_text_transform: btnTextTransform });
                Object.assign(tmpArr, { button_style: btnStyle });
                Object.assign(tmpArr, { button_size: btnSize });
                Object.assign(tmpArr, { button_link: btnLink });
                Object.assign(tmpArr, { button_link_window: btnLinkWindow });
                Object.assign(tmpArr, { button_link_follow: btnLinkFollow });
                Object.assign(tmpArr, { button_font_color: btnFontColor });

                Object.assign(tmpArr, { btn_font_family: btnFontFamily });
                Object.assign(tmpArr, { btn_font_size: btnFontSize });
                Object.assign(tmpArr, { btn_font_weight: btnFontWeight });
                Object.assign(tmpArr, { button_text_alignment: btnTextAlignment });
                Object.assign(tmpArr, { button_letter_spacing: btnFontLetterSpacing });
                Object.assign(tmpArr, { button_font_style: btnFontStyle });
                Object.assign(tmpArr, { button_width: btnWidth });

                Object.assign(tmpArr, { btn_font_line_height: btnFontLineHeight });
                Object.assign(tmpArr, { btn_top_padding: btnTopPadding });
                Object.assign(tmpArr, { btn_right_padding: btnRightPadding });
                Object.assign(tmpArr, { btn_bottom_padding: btnBottomPadding });
                Object.assign(tmpArr, { btn_left_padding: btnLeftPadding });
                Object.assign(tmpArr, { btn_top_margin: btnTopMargin });
                Object.assign(tmpArr, { btn_right_margin: btnRightMargin });
                Object.assign(tmpArr, { btn_bottom_margin: btnBottomMargin });
                Object.assign(tmpArr, { btn_left_margin: btnLeftMargin });

                // Box Shadow
                Object.assign(tmpArr, { btn_box_hoffset: btnHOffset });
                Object.assign(tmpArr, { btn_box_voffset: btnVOffset });
                Object.assign(tmpArr, { btn_box_blur: btnBlur });
                Object.assign(tmpArr, { btn_box_spread: btnSpread });
                Object.assign(tmpArr, { btn_box_shadowcolor: btnShadowColor });
                Object.assign(tmpArr, { btn_box_shadow_rgb: btnShadowRGB });
                Object.assign(tmpArr, { btn_shadow_opacity: btnShadowOpacity });

                /* Second Button */
                Object.assign(tmpArr, { button_display1: btnDisplay1 });
                Object.assign(tmpArr, { button_text1: btnText1 });
                Object.assign(tmpArr, { button_alt1: btnAlt1 });
                Object.assign(tmpArr, { button1_aos_effect: btn1Effect });
                Object.assign(tmpArr, { button_text_transform1: btnTextTransform1 });
                Object.assign(tmpArr, { button_style1: btnStyle1 });
                Object.assign(tmpArr, { button_size1: btnSize1 });
                Object.assign(tmpArr, { button_link1: btnLink1 });
                Object.assign(tmpArr, { button_link_window1: btnLinkWindow1 });
                Object.assign(tmpArr, { button_link_follow1: btnLinkFollow1 });
                Object.assign(tmpArr, { button_font_color1: btnFontColor1 });
                Object.assign(tmpArr, { button_width1: btnWidth1 });
                Object.assign(tmpArr, { btn_font_family1: btnFontFamily1 });
                Object.assign(tmpArr, { btn_font_size1: btnFontSize1 });
                Object.assign(tmpArr, { btn_font_weight1: btnFontWeight1 });
                Object.assign(tmpArr, { button_text_alignment1: btnTextAlignment1 });
                Object.assign(tmpArr, {
                    button_letter_spacing1: btnFontLetterSpacing1,
                });
                Object.assign(tmpArr, { button_font_style1: btnFontStyle1 });
                Object.assign(tmpArr, { btn_font_line_height1: btnFontLineHeight1 });
                Object.assign(tmpArr, { btn_top_padding1: btnTopPadding1 });
                Object.assign(tmpArr, { btn_right_padding1: btnRightPadding1 });
                Object.assign(tmpArr, { btn_bottom_padding1: btnBottomPadding1 });
                Object.assign(tmpArr, { btn_left_padding1: btnLeftPadding1 });
                Object.assign(tmpArr, { btn_top_margin1: btnTopMargin1 });
                Object.assign(tmpArr, { btn_right_margin1: btnRightMargin1 });
                Object.assign(tmpArr, { btn_bottom_margin1: btnBottomMargin1 });
                Object.assign(tmpArr, { btn_left_margin1: btnLeftMargin1 });
                // Box Shadow
                Object.assign(tmpArr, { btn_box_hoffset1: btnHOffset1 });
                Object.assign(tmpArr, { btn_box_voffset1: btnVOffset1 });
                Object.assign(tmpArr, { btn_box_blur1: btnBlur1 });
                Object.assign(tmpArr, { btn_box_spread1: btnSpread1 });
                Object.assign(tmpArr, { btn_box_shadowcolor1: btnShadowColor1 });
                Object.assign(tmpArr, { btn_box_shadow_rgb1: btnShadowRGB1 });
                Object.assign(tmpArr, { btn_shadow_opacity1: btnShadowOpacity1 });

                Object.assign(tmpArr, { text_hpos: textHPos });
                Object.assign(tmpArr, { text_vpos: textVPos });
                Object.assign(tmpArr, { btn_hpos: btnHPos });

                Object.assign(tmpArr, { text_bg_color: textBgColor });
                Object.assign(tmpArr, { bg_opacity: bgOpacity });
                Object.assign(tmpArr, { bg_hex_color: hexColor });
                Object.assign(tmpArr, { headline_width: headlineWidth });

                tmpVal.push(tmpArr);
            } else {
                tmpVal.push(acValue);
            }
        });
        setAddBtn(true);
        setEditBtn(false);
        setImgArr(tmpVal);
        updateArrKey("images", tmpVal);

        setImageURL("");
        setImageAlt("");
        setImageLink("");
        setIconImageURL("");
        setImageVideoBackgroundColor("");

        clearHeadline();
        clearHeadline1();
        clearDescription();
        clearButton();
        clearButton1();

        setVideoUrl("");
        setImageOrVideo("Image");
        setShowData(false);
        setDescriptionDisplay("Off");
        setHeadline1Display(false);
        setHeadline2Display(false);
        setShowHeadline1Display("Off");
        setShowHeadline2Display("Off");
        setBtnDisplay("No");
    };

    const handleToggleChangeEvent = (data) => {
        let val;
        if (data.target.checked) val = "On";
        else val = "Off";
        if (data.target.name == "showThumb") {
            setshowThumb(val);
            updateArrKey("showThumb", val);
        } else if (data.target.name == "showArrow") {
            setshowArrow(val);
            updateArrKey("showArrow", val);
        } else if (data.target.name == "showStatus") {
            setshowStatus(val);
            updateArrKey("showStatus", val);
        } else if (data.target.name == "infiniteLoop") {
            setinfiniteLoop(val);
            updateArrKey("infiniteLoop", val);
        } else if (data.target.name == "autoPlay") {
            setautoPlay(val);
            updateArrKey("autoPlay", val);
        } else if (data.target.name == "stopOnHover") {
            setstopOnHover(val);
            updateArrKey("stopOnHover", val);
        } else if (data.target.name == "showIndicators") {
            setshowIndicators(val);
            updateArrKey("showIndicators", val);
        }
    };

    const clearHeadline = () => {
        setHeadline("");
        setHeadlineTag("");
        setHeadlineTextEffect("");
    };

    const clearHeadline1 = () => {
        setHeadline1("");
        setHeadlineTag1("");
        setHeadline1TextEffect("");
    };

    const clearDescription = () => {
        setHeadline1("");
        setAcDesc("");
    };

    const clearButton = () => {
        setBtnText("");
        setBtnLink("");
        setBtnWidth("");
        setBtnAlt("");
        setBtnEffect("");
    };

    const clearButton1 = () => {
        setBtnText1("");
        setBtnLink1("");
        setBtnWidth1("");
        setBtnAlt1("");
        setBtn1Effect("");
    };

    const updateArrKey = async (key, value) => {
        setDataArr((prev) => ({ ...prev, [key]: value }));
    };

    const updateArrKeyv2 = (object) => {
        let tmpArr = dataArr;
        for (const key in object) {
            Object.assign(tmpArr, { [key]: object[key] });
        }
        setDataArr(tmpArr);
    };

    const changeImageOrVideo = (event) => {
        setImageOrVideo(event.target.value);
    };

    const updateVideoUrl = (val) => {
        setVideoUrl(val);
    };

    const changeVideoType = (event) => {
        setVideoType(event.target.value);
    };

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

    const changeHeadlineHOffset = (event) => {
        setHeadlineHOffset(event.target.value);
    };

    const changeHeadlineVOffset = (event) => {
        setHeadlineVOffset(event.target.value);
    };

    const changeHeadlineBlur = (value) => {
        setHeadlineBlur(value);
    };

    const changeHeadlineShadowColor = (color) => {
        setHeadlineShadowColor(color.hex);
        setHeadlineShadowRGB(color.rgb.r + ", " + color.rgb.g + ", " + color.rgb.b);
    };

    const changeHeadlineShadowOpacity = (value) => {
        setHeadlineShadowOpacity(value);
    };

    /* Headline 2 functions */

    const changeHeadlineHOffset1 = (event) => {
        setHeadlineHOffset1(event.target.value);
    };

    const changeHeadlineVOffset1 = (event) => {
        setHeadlineVOffset1(event.target.value);
    };

    const changeHeadlineBlur1 = (value) => {
        setHeadlineBlur1(value);
    };

    const changeHeadlineShadowColor1 = (color) => {
        setHeadlineShadowColor1(color.hex);
        setHeadlineShadowRGB1(
            color.rgb.r + ", " + color.rgb.g + ", " + color.rgb.b
        );
    };

    const changeHeadlineShadowOpacity1 = (value) => {
        setHeadlineShadowOpacity1(value);
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

    const changeImageVideoBackgroundColor = (color) => {
        setImageVideoBackgroundColor(color.hex);
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

    /* Button Functions */
    const changeBtnWidth = (event) => {
        // console.log("new hello there");
        setBtnWidth(event.target.value);
        props.updateProperty(
            { type: "btn_width", value: event.target.value },
            bgPropertyName + "_btn_width"
        );
    };

    const buttonTextChange = (event) => {
        setBtnText(event.target.value);
    };

    const buttonAltChange = (event) => {
        setBtnAlt(event.target.value);
    };

    const changeButtonTextTransform = (event) => {
        setBtnTextTransform(event.target.value);
    };

    const changeBtnSize = (event) => {
        setBtnSize(event.target.value);
    };

    const changeBtnTextAlignment = (event) => {
        setBtnTextAlignment(event.target.value);
    };

    const changeBtnFontLetterSpacing = (event) => {
        setBtnFontLetterSpacing(event.target.value);
    };

    const changeBtnFontStyle = (event) => {
        setBtnFontStyle(event.target.value);
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
        if (event.target.checked) {
            setBtnLinkFollow(event.target.value);
        } else {
            setBtnLinkFollow("");
        }
    };

    const changeBtnStyle = (event) => {
        setBtnStyle(event.target.value);
    };

    const changeBtnHOffset = (event) => {
        setBtnHOffset(event.target.value);
    };

    const changeBtnVOffset = (event) => {
        setBtnVOffset(event.target.value);
    };

    const changeBtnBlur = (value) => {
        setBtnBlur(value);
    };

    const changeBtnSpread = (value) => {
        setBtnSpread(value);
    };

    const changeBtnShadowColor = (color) => {
        setBtnShadowColor(color.hex);
        setBtnShadowRGB(color.rgb.r + ", " + color.rgb.g + ", " + color.rgb.b);
    };

    const changeBtnBackgroundColor = (color) => {
        setBtnFontColor(color.hex);
    };

    const changeHeadlineTag = (event) => {
        setHeadlineTag(event.target.value);
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

    const changeBtnShadowOpacity = (value) => {
        setBtnShadowOpacity(value);
    };

    const changeBtnFontWeight = (event) => {
        setBtnFontWeight(event.target.value);
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

    /* Button 1 function */
    const changeBtnWidth1 = (event) => {
        // console.log("hello there");
        setBtnWidth1(event.target.value);
        props.updateProperty(
            { type: "btn_width", value: event.target.value },
            bgPropertyName + "_btn_width"
        );
    };

    const buttonTextChange1 = (event) => {
        setBtnText1(event.target.value);
    };

    const buttonAltChange1 = (event) => {
        setBtnAlt1(event.target.value);
    };

    const changeButtonTextTransform1 = (event) => {
        setBtnTextTransform1(event.target.value);
    };

    const changeBtnSize1 = (event) => {
        setBtnSize1(event.target.value);
    };

    const changeBtnTextAlignment1 = (event) => {
        setBtnTextAlignment1(event.target.value);
    };

    const changeBtnFontLetterSpacing1 = (event) => {
        setBtnFontLetterSpacing1(event.target.value);
    };

    const changeBtnFontStyle1 = (event) => {
        setBtnFontStyle1(event.target.value);
    };

    const changeLinkTarget1 = (event) => {
        if (event.target.checked) {
            setBtnLinkWindow1("_blank");
        } else {
            setBtnLinkWindow1("_self");
        }
    };

    const changeBtnLink1 = (event) => {
        setBtnLink1(event.target.value);
    };

    const changeLinkFollow1 = (event) => {
        if (event.target.checked) {
            setBtnLinkFollow1(event.target.value);
        } else {
            setBtnLinkFollow1("");
        }
    };

    const changeBtnStyle1 = (event) => {
        setBtnStyle1(event.target.value);
    };

    const changeBtnHOffset1 = (event) => {
        setBtnHOffset1(event.target.value);
    };

    const changeBtnVOffset1 = (event) => {
        setBtnVOffset1(event.target.value);
    };

    const changeBtnBlur1 = (value) => {
        setBtnBlur1(value);
    };

    const changeBtnSpread1 = (value) => {
        setBtnSpread1(value);
    };

    const changeBtnShadowColor1 = (color) => {
        setBtnShadowColor1(color.hex);
        setBtnShadowRGB1(color.rgb.r + ", " + color.rgb.g + ", " + color.rgb.b);
    };

    const changeBtnBackgroundColor1 = (color) => {
        setBtnFontColor1(color.hex);
    };

    const changeBtnFontFamily1 = (event) => {
        setBtnFontFamily1(event.target.value);
    };

    const changeBtnFontSize1 = (event) => {
        setBtnFontSize1(event.target.value);
    };

    const changeBtnFontLineHeight1 = (event) => {
        setBtnFontLineHeight1(event.target.value);
    };

    const changeBtnShadowOpacity1 = (value) => {
        setBtnShadowOpacity1(value);
    };

    const changeBtnFontWeight1 = (event) => {
        setBtnFontWeight1(event.target.value);
    };

    const changeBtnTopPadding1 = (event) => {
        setBtnTopPadding1(event.target.value);
    };

    const changeBtnBottomPadding1 = (event) => {
        setBtnBottomPadding1(event.target.value);
    };

    const changeBtnLeftPadding1 = (event) => {
        setBtnLeftPadding1(event.target.value);
    };

    const changeBtnRightPadding1 = (event) => {
        setBtnRightPadding1(event.target.value);
    };

    const changeBtnTopMargin1 = (event) => {
        setBtnTopMargin1(event.target.value);
    };

    const changeBtnBottomMargin1 = (event) => {
        setBtnBottomMargin1(event.target.value);
    };

    const changeBtnLeftMargin1 = (event) => {
        setBtnLeftMargin1(event.target.value);
    };

    const changeBtnRightMargin1 = (event) => {
        setBtnRightMargin1(event.target.value);
    };

    const changeHeadlineWidth = (event) => {
        setHeadlineWidth(event.target.value);
    };

    const changeCarouselStatus = async (event) => {
        if (event.target.checked) {
            setCarouselStatus("On");
        } else {
            if (dataArr?.images.length > 1) {
                alert(
                    `Please remove ${dataArr?.images.length - 1} Banner${dataArr?.images.length > 2 ? "s" : ""}. To switch off carousel controls.`
                );
                setCarouselStatus("On");
                return;
            }

            // if(dataArr)
            setCarouselStatus("Off");
            setshowArrow("Off");
            setshowThumb("Off");
            setinfiniteLoop("Off");
            setautoPlay("Off");
            setstopOnHover("Off");
            setshowStatus("Off");
            setshowIndicators("Off");
            updateArrKeyv2({
                showThumb: "Off",
                infiniteLoop: "Off",
                stopOnHover: "Off",
                showIndicators: "Off",
                showStatus: "Off",
                autoPlay: "Off",
                showArrow: "Off",
            });
        }
    };
    const changeFontSize2 = (event) => {
        setFontSize2(event.target.value);
    };

    const changeFontFamily2 = (event) => {
        setFontFamily2(event.target.value);
    };

    const changeTextTransform2 = (event) => {
        setTextTransform2(event.target.value);
    };

    const changeBackgroundColor2 = (color) => {
        setFontColor2(color.hex);
    };

    const changeLineHeight2 = (event) => {
        setLineHeight2(event.target.value);
    };

    const changeLetterSpacing2 = (event) => {
        setLetterSpacing2(event.target.value);
    };

    const changeFontStyle2 = (event) => {
        setFontStyle2(event.target.value);
    };

    const changeTextAlignment2 = (event) => {
        setTextAlignment2(event.target.value);
    };

    const changeFontWeight2 = (event) => {
        setFontWeight2(event.target.value);
    };

    const changeLeftPadding2 = (event) => {
        setLeftPadding2(event.target.value);
    };

    const changeTopPadding2 = (event) => {
        setTopPadding2(event.target.value);
    };

    const changeRightPadding2 = (event) => {
        setRightPadding2(event.target.value);
    };

    const changeBottomPadding2 = (event) => {
        setBottomPadding2(event.target.value);
    };

    const changeLeftMargin2 = (event) => {
        setLeftMargin2(event.target.value);
    };

    const changeTopMargin2 = (event) => {
        setTopMargin2(event.target.value);
    };

    const changeRightMargin2 = (event) => {
        setRightMargin2(event.target.value);
    };

    const changeBottomMargin2 = (event) => {
        setBottomMargin2(event.target.value);
    };

    const changeHeadlineTag1 = (event) => {
        setHeadlineTag1(event.target.value);
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
            dataArr?.images,
            result.source.index,
            result.destination.index
        );
        setDataArr({ ...dataArr, images: reorderedItem });
    };

    const changeImageAsBackground = (event) => {
        if (event.target.checked) {
            setImageAsBackground(true);
        } else {
            setImageAsBackground(false);
        }
    };

    const changeFixedBackground = (event) => {
        if (event.target.checked) {
            setFixedBackground(true);
        } else {
            setFixedBackground(false);
        }
    };

    /* Effect change handling functions */
    const changeHeadlineTextEffect = (event) => {
        setHeadlineTextEffect(event.target.value);
    };

    const changeHeadline1TextEffect = (event) => {
        setHeadline1TextEffect(event.target.value);
    };

    const changeBtnEffect = (event) => {
        setBtnEffect(event.target.value);
    };

    const changeBtn1Effect = (event) => {
        setBtn1Effect(event.target.value);
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
                    className={`property-content bg-white border-y border-b-0 border-neutral-200 ${showHide ? "" : "hidden"
                        }`}
                >
                    <div className="mx-2 text-sm">
                        {!showData && (
                            <div className="mb-4 last:mb-0">
                                <p className="font-bold">Added Data</p>
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
                                                    {dataArr.images != undefined &&
                                                        dataArr.images.length > 0 &&
                                                        dataArr.images.map((acValue, index) => {
                                                            return (
                                                                <Draggable
                                                                    key={`item-${index}`}
                                                                    draggableId={`item-${acValue.srno}`}
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
                                                                                    {acValue.image_or_video == "Image" ? (
                                                                                        <img src={acValue.image_url} />
                                                                                    ) : (
                                                                                        <>
                                                                                            <span className="material-icons-outlined">
                                                                                                play_circle
                                                                                            </span>
                                                                                        </>
                                                                                    )}
                                                                                </div>
                                                                                <div>
                                                                                    {acValue.visibility === undefined ||
                                                                                        acValue.visibility ? (
                                                                                        <button
                                                                                            type="button"
                                                                                            onClick={() => {
                                                                                                changeVisibility(
                                                                                                    acValue.srno,
                                                                                                    false
                                                                                                );
                                                                                            }}
                                                                                        >
                                                                                            <span
                                                                                                class="material-symbols-outlined text-primary ml-3"
                                                                                                style={{
                                                                                                    color: "green",
                                                                                                    fontSize: "30px",
                                                                                                }}
                                                                                            >
                                                                                                toggle_on
                                                                                            </span>
                                                                                        </button>
                                                                                    ) : (
                                                                                        <button
                                                                                            type="button"
                                                                                            onClick={() => {
                                                                                                changeVisibility(
                                                                                                    acValue.srno,
                                                                                                    true
                                                                                                );
                                                                                            }}
                                                                                        >
                                                                                            <span
                                                                                                class="material-symbols-outlined text-primary ml-3"
                                                                                                style={{
                                                                                                    color: "red",
                                                                                                    fontSize: "30px",
                                                                                                }}
                                                                                            >
                                                                                                toggle_off
                                                                                            </span>
                                                                                        </button>
                                                                                    )}
                                                                                    <button
                                                                                        type="button"
                                                                                        onClick={() => {
                                                                                            viewBanner(index);
                                                                                        }}
                                                                                    >
                                                                                        <span className="material-symbols-outlined ml-3">
                                                                                            visibility
                                                                                        </span>
                                                                                    </button>
                                                                                    <button
                                                                                        type="button"
                                                                                        onClick={() => {
                                                                                            editData(acValue);
                                                                                        }}
                                                                                    >
                                                                                        <span className="material-icons-outlined ml-3">
                                                                                            mode_edit
                                                                                        </span>
                                                                                    </button>
                                                                                    <button
                                                                                        type="button"
                                                                                        onClick={() => {
                                                                                            deleteData(acValue);
                                                                                        }}
                                                                                    >
                                                                                        <span className="material-icons-outlined ml-3 text-red">
                                                                                            delete
                                                                                        </span>
                                                                                    </button>
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
                        {!showData &&
                            (carouselStatus === "On" ||
                                (dataArr.images !== undefined &&
                                    dataArr.images.length < 1) || _.isArray(dataArr)) && (
                                <>
                                    <div className="mb-3 text-center last:mb-0">
                                        <button
                                            className="btn bg-indigo-500 hover:bg-indigo-600 text-white mt-2"
                                            onClick={(event) => {
                                                setShowData(true);
                                            }}
                                        >
                                            + Add New Banner
                                        </button>
                                    </div>
                                </>
                            )}
                        {showData && (
                            <>
                                <div className="mb-3 last:mb-0" id="imagePosition">
                                    <div className="flex flex-wrap divide-x divide-neutral-300 border border-neutral-300 overflow-hidden">
                                        <button
                                            value="Image"
                                            onClick={changeImageOrVideo}
                                            className={`w-1/2 px-2 py-1.5 inline-flex justify-center items-center text-sm ${imageOrVideo === "Image" ? "bg-[#F1F5F9]" : "bg-white"
                                                }`}
                                            title="Image"
                                        >
                                            Image
                                        </button>
                                        <button
                                            value="Video"
                                            onClick={changeImageOrVideo}
                                            className={`w-1/2 px-2 py-1.5 inline-flex justify-center items-center text-sm ${imageOrVideo === "Video" ? "bg-[#F1F5F9]" : "bg-white"
                                                }`}
                                            title="Video"
                                        >
                                            Video
                                        </button>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label for="" className="mb-1 block text-sm">
                                        Icon
                                    </label>
                                    <ImageFile
                                        type="file"
                                        className="sr-only"
                                        name={`image1`}
                                        id={`image1`}
                                        buttonName="Choose Image"
                                        folderpath={props.imagePath}
                                        ModelOpen={true}
                                        setOpenImageModel={setOpenImageIconModel}
                                        // onChange={onElementIconImageChange}
                                        edibtn={true}
                                        deleteImage={() => {
                                            onElementIconImageChange("");
                                        }}
                                        url={iconImageURL}
                                    />
                                </div>
                                {imageOrVideo === "Image" && (
                                    <>
                                        <div className="mb-3">
                                            <label for="" className="mb-1 block text-sm">
                                                Image
                                            </label>
                                            <ImageFile
                                                type="file"
                                                className="sr-only"
                                                name={`image`}
                                                id={`image`}
                                                buttonName="Choose Image"
                                                folderpath={props.imagePath}
                                                ModelOpen={true}
                                                setOpenImageModel={setOpenImageModel}
                                                // onChange={onElementImageChange}
                                                edibtn={true}
                                                url={imageURL}
                                                deleteImage={() => {
                                                    onElementImageChange("");
                                                }}
                                            />

                                            {(OpenImageModel || OpenImageIconModel) && (
                                                <ImageGallery
                                                    setOpenImageModel={
                                                        OpenImageIconModel
                                                            ? setOpenImageIconModel
                                                            : setOpenImageModel
                                                    }
                                                    onElementImageChange={
                                                        OpenImageIconModel
                                                            ? onElementIconImageChange
                                                            : onElementImageChange
                                                    }
                                                    folderpath={props.imagePath}
                                                    OpenImageModel={OpenImageModel || OpenImageIconModel}
                                                    from={"Element Carousel"}
                                                    ImageUploadName={
                                                        OpenImageIconModel ? "image1" : "image"
                                                    }
                                                    ImageUploadId={
                                                        OpenImageIconModel ? "image1" : "image"
                                                    }
                                                    ImageUrl={
                                                        OpenImageIconModel ? iconImageURL : imageURL
                                                    }
                                                />
                                            )}
                                        </div>
                                        {/* <div className="mb-4 last:mb-0">
                      <label
                        className="flex items-center"
                        htmlFor="no-follow-link"
                      >
                        <input
                          onChange={changeImageAsBackground}
                          type="checkbox"
                          id="no-follow-link"
                          className="form-checkbox"
                          checked={imageAsBackground ? "checked" : ""}
                        />
                        <span className="text-sm font-medium ml-2">
                          As Background
                        </span>
                      </label>
                    </div> */}
                                        {/* <div className="mb-4 last:mb-0">
                      <label
                        className="flex items-center"
                        htmlFor="no-follow-link"
                      >
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
                    </div> */}

                                        <div className="mb-3">
                                            <div className="flex justify-between items-center mb-1">
                                                <div className="">Alt Title</div>
                                            </div>
                                            <div className="text-center relative overflow-hidden">
                                                <Input
                                                    onChange={(event) => {
                                                        updateAltTag(event.target.value);
                                                    }}
                                                    type="text"
                                                    className="w-full grow text-sm bg-white text-gray-700 border border-neutral-300 p-3 py-2 leading-tight focus:ring-0 focus:shadow-none focus:outline-none"
                                                    defaultValue={imageAlt}
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <div className="flex justify-between items-center mb-1">
                                                <div className="">Link (optional)</div>
                                            </div>
                                            <div className="text-center relative overflow-hidden">
                                                <Input
                                                    onChange={(event) => {
                                                        updateLink(event.target.value);
                                                    }}
                                                    type="text"
                                                    className="w-full grow text-sm bg-white text-gray-700 border border-neutral-300 p-3 py-2 leading-tight focus:ring-0 focus:shadow-none focus:outline-none"
                                                    defaultValue={imageLink}
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}
                                {imageOrVideo === "Video" && (
                                    <>
                                        <div className="mb-4 last:mb-0">
                                            <label for="" className="mb-1 block text-sm">
                                                Video Type
                                            </label>
                                            <div className="flex flex-wrap">
                                                <select
                                                    value={videoType}
                                                    onChange={changeVideoType}
                                                    className="grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
                                                >
                                                    <option value="Youtube">Youtube</option>
                                                    <option value="Vimeo">Vimeo</option>
                                                    <option value="Custom">Custom</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="mb-4 last:mb-0">
                                            <label for="" className="mb-1 block text-sm">
                                                Video Url
                                            </label>
                                            <div className="flex flex-wrap">
                                                <Input
                                                    onChange={(event) => {
                                                        updateVideoUrl(event.target.value);
                                                    }}
                                                    type="text"
                                                    className="w-full grow text-sm bg-white text-gray-700 border border-neutral-300 p-3 py-2 leading-tight focus:ring-0 focus:shadow-none focus:outline-none"
                                                    defaultValue={videoUrl}
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}
                                {/* <div className="mb-4 last:mb-0">
                  <label htmlFor="" className="mb-1 block text-sm">
                    Image/Video Background Color
                  </label>
                  <div className="flex flex-wrap">
                    <ColorPicker
                      changeBackgroundColor={changeImageVideoBackgroundColor}
                      value={imageVideoBackgroundColor}
                    />
                  </div>
                </div> */}
                                {(headline1Display || headline2Display) && (
                                    <div className="py-2">
                                        <div className="mb-3">
                                            <div className="flex justify-between items-center mb-1 font-semibold">
                                                <div className="">Headline Apperance</div>
                                            </div>
                                        </div>
                                        <ElementHeadlineColorOpacity
                                            {...props}
                                            textBgColor={textBgColor}
                                            setTextBgColor={setTextBgColor}
                                            fontSize={fontSize}
                                            setFontSize={setFontSize}
                                            bgOpacity={bgOpacity}
                                            setBgOpacity={setBgOpacity}
                                            setTextHPos={setTextHPos}
                                            setTextVPos={setTextVPos}
                                            changeSectionWidth={changeHeadlineWidth}
                                            hexColor={hexColor}
                                            setHexColor={setHexColor}
                                            sectionWidth={headlineWidth}
                                            fntDisplay={false}
                                            textHPos={textHPos}
                                            textVPos={textVPos}
                                            hvBox={true}
                                        />

                                        <div className="mb-3 last:mb-0">
                                            <div className="flex justify-between items-center mb-1">
                                                <div>Button Section Horizontal Position</div>
                                            </div>
                                            <div className="flex flex-wrap divide-x divide-neutral-300 border border-neutral-300 overflow-hidden">
                                                {ThemeVariable.horizontalPosition.map(
                                                    (value, index) => (
                                                        <button
                                                            key={index}
                                                            value={value.value}
                                                            onClick={(event) => {
                                                                setBtnHPos(event.target.value);
                                                            }}
                                                            className={`w-1/${ThemeVariable.horizontalPosition.length
                                                                } px-2 py-[5px] inline-flex justify-center items-center text-sm ${value.value === btnHPos
                                                                    ? "bg-[#F1F5F9]"
                                                                    : "bg-white"
                                                                }`}
                                                            title={value.value}
                                                            dangerouslySetInnerHTML={{ __html: value.icon }}
                                                        />
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="py-2">
                                    <div className="grid grid-cols-12 gap-4 mb-4 last:mb-0">
                                        <div className="col-span-full sm:col-span-8 xl:col-span-8">
                                            <label className="text-gray-500">
                                                <strong>Show Headline 1</strong>
                                            </label>
                                        </div>
                                        <div className="col-span-full sm:col-span-4 xl:col-span-4">
                                            <div className="flex items-center">
                                                <ToggleButton
                                                    id={`showHeadlineDisplay`}
                                                    defaultValue={showHeadline1Display}
                                                    onChange={(data) => {
                                                        setHeadline1Display(data.target.checked);
                                                    }}
                                                    name={`showHeadline1Display`}
                                                    on={"On"}
                                                    off={"Off"}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {headline1Display && (
                                    <>
                                        <div className="sub-section-display">
                                            <div className="mb-3">
                                                <div className="flex justify-between items-center mb-1">
                                                    <div className="">Headline1 Text</div>
                                                </div>
                                                <div className="text-center relative overflow-hidden">
                                                    <input
                                                        type="text"
                                                        className="w-full grow text-sm bg-white text-gray-700 border border-neutral-300 p-3 py-2 leading-tight focus:ring-0 focus:shadow-none focus:outline-none"
                                                        value={headline}
                                                        onChange={updateHeadline}
                                                    />
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

                                            <div className="mb-3">
                                                <div className="flex justify-between items-center mb-1">
                                                    <div className="">Loading Effect</div>
                                                </div>
                                                <div className="text-center relative overflow-hidden">
                                                    <select
                                                        onChange={changeHeadlineTextEffect}
                                                        value={headlineTextEffect}
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

                                            <TextStyleElement
                                                {...props}
                                                variable="Headline"
                                                changeFontFamily={changeFontFamily}
                                                btnStyle={btnStyle}
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

                                            <div className="mb-4 last:mb-0">
                                                <label htmlFor="" className="mb-1 block text-sm">
                                                    <strong>Headline 1 Text Shadow</strong>
                                                </label>
                                            </div>
                                            <div className="mb-3 last:mb-0">
                                                <div className="flex justify-between items-center mb-1">
                                                    <div>Shadow Offset</div>
                                                </div>
                                                <div className="flex flex-wrap -mx-1.5">
                                                    <div className="w-1/2 px-1.5">
                                                        <div className="relative flex">
                                                            <button
                                                                type="button"
                                                                className="w-11 grow px-2 py-1 inline-flex items-center justify-center text-sm bg-[#F1F5F9] border border-neutral-300 border-r-0 outline-none focus:ring-0"
                                                            >
                                                                <span className="font-semibold">X</span>
                                                            </button>
                                                            <select
                                                                onChange={changeHeadlineHOffset}
                                                                value={headlineHOffset}
                                                                className="w-full grow text-sm bg-white text-gray-700 border border-neutral-300 p-3 py-2 leading-tight focus:ring-0 focus:shadow-none focus:outline-none"
                                                            >
                                                                <option value="">Select</option>
                                                                {Array(100)
                                                                    .fill(null)
                                                                    .map((value, index) => {
                                                                        return (
                                                                            <option key={index} value={index}>
                                                                                {index}
                                                                            </option>
                                                                        );
                                                                    })}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="w-1/2 px-1.5">
                                                        <div className="relative flex">
                                                            <button
                                                                type="button"
                                                                className="w-11 grow px-2 py-1 inline-flex items-center justify-center text-sm bg-[#F1F5F9] border border-neutral-300 border-r-0 outline-none focus:ring-0"
                                                            >
                                                                <span className="font-semibold">Y</span>
                                                            </button>
                                                            <select
                                                                onChange={changeHeadlineVOffset}
                                                                value={headlineVOffset}
                                                                className="w-full grow text-sm bg-white text-gray-700 border border-neutral-300 p-3 py-2 leading-tight focus:ring-0 focus:shadow-none focus:outline-none"
                                                            >
                                                                <option value="">Select</option>
                                                                {Array(100)
                                                                    .fill(null)
                                                                    .map((value, index) => {
                                                                        return (
                                                                            <option key={index} value={index}>
                                                                                {index}
                                                                            </option>
                                                                        );
                                                                    })}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mb-3 last:mb-0">
                                                <div className="mb-3">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <div className="mb-1">Select Blur</div>
                                                    </div>
                                                    <div className="flex flex-wrap">
                                                        <div className="w-full px-3">
                                                            <SliderCustom
                                                                dots={false}
                                                                min={0}
                                                                max={100}
                                                                step={1}
                                                                defaultValue={headlineBlur}
                                                                onSliderChange={changeHeadlineBlur}
                                                                marks={[
                                                                    { value: 0, label: "0" },
                                                                    { value: 25 },
                                                                    { value: 50 },
                                                                    { value: 75 },
                                                                    { value: 100, label: "100" },
                                                                ]}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mb-3 last:mb-0">
                                                <div className="mb-3">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <div className="mb-1">Shadow Opacity</div>
                                                    </div>
                                                    <div className="flex flex-wrap">
                                                        <div className="w-full mx-auto px-3">
                                                            <SliderCustom
                                                                dots={false}
                                                                min={0}
                                                                max={1}
                                                                step={0.1}
                                                                defaultValue={headlineShadowOpacity}
                                                                onSliderChange={changeHeadlineShadowOpacity}
                                                                marks={[
                                                                    { value: "0.1" },
                                                                    { value: "0.2" },
                                                                    { value: "0.3" },
                                                                    { value: "0.4" },
                                                                    { value: "0.5", label: "0.5" },
                                                                    { value: "0.6" },
                                                                    { value: "0.7" },
                                                                    { value: "0.8" },
                                                                    { value: "0.9" },
                                                                    { value: "1", label: "1" },
                                                                ]}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mb-4 last:mb-0">
                                                <label htmlFor="" className="mb-1 block text-sm">
                                                    Shadow Color
                                                </label>
                                                <div className="flex flex-wrap">
                                                    <ColorPicker
                                                        changeBackgroundColor={changeHeadlineShadowColor}
                                                        value={headlineShadowColor}
                                                    />
                                                </div>
                                            </div>

                                            {
                                                <ElementMarginPaddingValues
                                                    {...props}
                                                    variable={bgPropertyName}
                                                    btnStyle={btnStyle}
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
                                            }
                                        </div>
                                    </>
                                )}

                                <div className="py-2">
                                    <div className="grid grid-cols-12 gap-4 mb-4 last:mb-0">
                                        <div className="col-span-full sm:col-span-8 xl:col-span-8">
                                            <label className="text-gray-500">
                                                <strong>Show Headline 2</strong>
                                            </label>
                                        </div>
                                        <div className="col-span-full sm:col-span-4 xl:col-span-4">
                                            <div className="flex items-center">
                                                <ToggleButton
                                                    id={`showHeadline2Display`}
                                                    defaultValue={showHeadline2Display}
                                                    onChange={(data) => {
                                                        setHeadline2Display(data.target.checked);
                                                    }}
                                                    name={`showHeadline2Display`}
                                                    on={"On"}
                                                    off={"Off"}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {headline2Display && (
                                    <>
                                        <div className="sub-section-display">
                                            <div className="mb-3">
                                                <div className="flex justify-between items-center mb-1">
                                                    <div className="">Headline2 Text </div>
                                                </div>
                                                <div className="text-center relative overflow-hidden">
                                                    <input
                                                        type="text"
                                                        className="w-full grow text-sm bg-white text-gray-700 border border-neutral-300 p-3 py-2 leading-tight focus:ring-0 focus:shadow-none focus:outline-none"
                                                        value={headline1}
                                                        onChange={updateHeadline1}
                                                    />
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <div className="flex justify-between items-center mb-1">
                                                    <div className="">Header Tag</div>
                                                </div>
                                                <div className="text-center relative overflow-hidden">
                                                    <select
                                                        onChange={changeHeadlineTag1}
                                                        value={headlineTag1}
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

                                            <div className="mb-3">
                                                <div className="flex justify-between items-center mb-1">
                                                    <div className="">Loading Effect</div>
                                                </div>
                                                <div className="text-center relative overflow-hidden">
                                                    <select
                                                        onChange={changeHeadline1TextEffect}
                                                        value={headline1TextEffect}
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

                                            <TextStyleElement
                                                {...props}
                                                variable="Headline1"
                                                changeFontFamily={changeFontFamily1}
                                                btnStyle={btnStyle1}
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

                                            <div className="mb-4 last:mb-0">
                                                <label htmlFor="" className="mb-1 block text-sm">
                                                    <strong>Headline 2 Text Shadow</strong>
                                                </label>
                                            </div>
                                            <div className="mb-3 last:mb-0">
                                                <div className="flex justify-between items-center mb-1">
                                                    <div>Shadow Offset</div>
                                                </div>
                                                <div className="flex flex-wrap -mx-1.5">
                                                    <div className="w-1/2 px-1.5">
                                                        <div className="relative flex">
                                                            <button
                                                                type="button"
                                                                className="w-11 grow px-2 py-1 inline-flex items-center justify-center text-sm bg-[#F1F5F9] border border-neutral-300 border-r-0 outline-none focus:ring-0"
                                                            >
                                                                <span className="font-semibold">X</span>
                                                            </button>
                                                            <select
                                                                onChange={changeHeadlineHOffset1}
                                                                value={headlineHOffset1}
                                                                className="w-full grow text-sm bg-white text-gray-700 border border-neutral-300 p-3 py-2 leading-tight focus:ring-0 focus:shadow-none focus:outline-none"
                                                            >
                                                                <option value="">Select</option>
                                                                {Array(100)
                                                                    .fill(null)
                                                                    .map((value, index) => {
                                                                        return (
                                                                            <option key={index} value={index}>
                                                                                {index}
                                                                            </option>
                                                                        );
                                                                    })}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="w-1/2 px-1.5">
                                                        <div className="relative flex">
                                                            <button
                                                                type="button"
                                                                className="w-11 grow px-2 py-1 inline-flex items-center justify-center text-sm bg-[#F1F5F9] border border-neutral-300 border-r-0 outline-none focus:ring-0"
                                                            >
                                                                <span className="font-semibold">Y</span>
                                                            </button>
                                                            <select
                                                                onChange={changeHeadlineVOffset1}
                                                                value={headlineVOffset1}
                                                                className="w-full grow text-sm bg-white text-gray-700 border border-neutral-300 p-3 py-2 leading-tight focus:ring-0 focus:shadow-none focus:outline-none"
                                                            >
                                                                <option value="">Select</option>
                                                                {Array(100)
                                                                    .fill(null)
                                                                    .map((value, index) => {
                                                                        return (
                                                                            <option key={index} value={index}>
                                                                                {index}
                                                                            </option>
                                                                        );
                                                                    })}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mb-3 last:mb-0">
                                                <div className="mb-3">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <div className="mb-1">Select Blur</div>
                                                    </div>
                                                    <div className="flex flex-wrap">
                                                        <div className="w-full">
                                                            <SliderCustom
                                                                dots={false}
                                                                min={0}
                                                                max={100}
                                                                step={1}
                                                                defaultValue={headlineBlur1}
                                                                onSliderChange={changeHeadlineBlur1}
                                                                marks={[
                                                                    { value: 0, label: "0" },
                                                                    { value: 25 },
                                                                    { value: 50 },
                                                                    { value: 75 },
                                                                    { value: 100, label: "100" },
                                                                ]}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mb-3 last:mb-0">
                                                <div className="mb-3">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <div className="mb-1">Shadow Opacity</div>
                                                    </div>
                                                    <div className="flex flex-wrap">
                                                        <div className="w-full mx-auto p-3">
                                                            <SliderCustom
                                                                dots={false}
                                                                min={0}
                                                                max={1}
                                                                step={0.1}
                                                                defaultValue={headlineShadowOpacity1}
                                                                onSliderChange={changeHeadlineShadowOpacity1}
                                                                marks={[
                                                                    { value: "0.1" },
                                                                    { value: "0.2" },
                                                                    { value: "0.3" },
                                                                    { value: "0.4" },
                                                                    { value: "0.5", label: "0.5" },
                                                                    { value: "0.6" },
                                                                    { value: "0.7" },
                                                                    { value: "0.8" },
                                                                    { value: "0.9" },
                                                                    { value: "1", label: "1" },
                                                                ]}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mb-4 last:mb-0">
                                                <label htmlFor="" className="mb-1 block text-sm">
                                                    Shadow Color
                                                </label>
                                                <div className="flex flex-wrap">
                                                    <ColorPicker
                                                        changeBackgroundColor={changeHeadlineShadowColor1}
                                                        value={headlineShadowColor1}
                                                    />
                                                </div>
                                            </div>

                                            {
                                                <ElementMarginPaddingValues
                                                    {...props}
                                                    variable={bgPropertyName}
                                                    btnStyle={btnStyle}
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
                                            }
                                        </div>
                                    </>
                                )}

                                <div className="py-2">
                                    <div className="grid grid-cols-12 gap-4 mb-4 last:mb-0">
                                        <div className="col-span-full sm:col-span-8 xl:col-span-8">
                                            <label className="text-gray-500">
                                                <strong>Show Description</strong>
                                            </label>
                                        </div>
                                        <div className="col-span-full sm:col-span-4 xl:col-span-4">
                                            <div className="flex items-center">
                                                <ToggleButton
                                                    id={`descriptionDisplay`}
                                                    defaultValue={descriptionDisplay}
                                                    onChange={(e) => {
                                                        setDescriptionDisplay(
                                                            e.target.checked ? "On" : "Off"
                                                        );
                                                    }}
                                                    name={`descriptionDisplay`}
                                                    on={"On"}
                                                    off={"Off"}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {descriptionDisplay === "On" && (
                                    <>
                                        <div className="sub-section-display">
                                            <div className="mb-3">
                                                <div className="flex justify-between items-center mb-1">
                                                    <div className="">Description </div>
                                                </div>
                                                <div className="text-center relative overflow-hidden">
                                                    {/* {editor} */}
                                                    <CkEditorWithoutFormik
                                                        // type="simple"
                                                        name={"description"}
                                                        id="description"
                                                        maxLength={350}
                                                        defaultValue={acDesc}
                                                        // EditorData={acDesc}
                                                        setEditorData={setAcDesc}
                                                    />
                                                </div>
                                            </div>

                                            <TextStyleElement
                                                {...props}
                                                variable="Description"
                                                changeFontFamily={changeFontFamily2}
                                                changeFontSize={changeFontSize2}
                                                changeLineHeight={changeLineHeight2}
                                                changeFontWeight={changeFontWeight2}
                                                changeBackgroundColor={changeBackgroundColor2}
                                                changeTextTransform={changeTextTransform2}
                                                changeTextAlignment={changeTextAlignment2}
                                                changeFontStyle={changeFontStyle2}
                                                changeLetterSpacing={changeLetterSpacing2}
                                                fontSize={fontSize2}
                                                lineHeight={lineHeight2}
                                                fontWeight={fontWeight2}
                                                fontColor={fontColor2}
                                                textTransform={textTransform2}
                                                textAlignment={textAlignment2}
                                                letterSpacing={letterSpacing2}
                                                fontStyle={fontStyle2}
                                                fontFamily={fontFamily2}
                                                type="carousel"
                                                noPropupdate={true}
                                            />

                                            {
                                                <ElementMarginPaddingValues
                                                    {...props}
                                                    variable={bgPropertyName}
                                                    changeLeftMargin={changeLeftMargin2}
                                                    changeTopMargin={changeTopMargin2}
                                                    changeRightMargin={changeRightMargin2}
                                                    changeBottomMargin={changeBottomMargin2}
                                                    changeLeftPadding={changeLeftPadding2}
                                                    changeTopPadding={changeTopPadding2}
                                                    changeRightPadding={changeRightPadding2}
                                                    changeBottomPadding={changeBottomPadding2}
                                                    leftMargin={leftMargin2}
                                                    rightMargin={rightMargin2}
                                                    topMargin={topMargin2}
                                                    bottomMargin={bottomMargin2}
                                                    leftPadding={leftPadding2}
                                                    rightPadding={rightPadding2}
                                                    topPadding={topPadding2}
                                                    bottomPadding={bottomPadding2}
                                                    noPropupdate={true}
                                                />
                                            }
                                        </div>
                                    </>
                                )}

                                <div className="py-2">
                                    <div className="grid grid-cols-12 gap-4 mb-4 last:mb-0">
                                        <div className="col-span-full sm:col-span-8 xl:col-span-8">
                                            <label className="text-gray-500">
                                                <strong>Show Button</strong>
                                            </label>
                                        </div>

                                        <div className="col-span-full sm:col-span-4 xl:col-span-4">
                                            <div className="flex items-center">
                                                <ToggleButton
                                                    id={`btnDisplay`}
                                                    defaultValue={btnDisplay === "Yes" ? "On" : "Off"}
                                                    onChange={(data) => {
                                                        if (data.target.checked) setBtnDisplay("Yes");
                                                        else setBtnDisplay("No");
                                                    }}
                                                    name={`showBtnDisplay`}
                                                    on={"On"}
                                                    off={"Off"}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className={`btn-extra-info ${btnDisplay == "Yes" ? "" : "hidden"
                                        }`}
                                >
                                    <div className="mb-4 last:mb-0">
                                        <label for="" className="mb-1 block text-sm">
                                            Button Text
                                        </label>
                                        <div className="flex flex-wrap">
                                            <input
                                                onChange={buttonTextChange}
                                                value={btnText}
                                                type="text"
                                                className="grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4 last:mb-0">
                                        <label for="" className="mb-1 block text-sm">
                                            Button Alt
                                        </label>
                                        <div className="flex flex-wrap">
                                            <input
                                                onChange={buttonAltChange}
                                                value={btnAlt}
                                                type="text"
                                                className="grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="flex justify-between items-center mb-1">
                                            <div className="">Loading Effect</div>
                                        </div>
                                        <div className="text-center relative overflow-hidden">
                                            <select
                                                onChange={changeBtnEffect}
                                                value={btnEffect}
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

                                    <TextStyleElement
                                        {...props}
                                        variable={"Button1"}
                                        type="carousel"
                                        changeFontFamily={changeBtnFontFamily}
                                        btnStyle={btnStyle}
                                        changeFontSize={changeBtnFontSize}
                                        changeLineHeight={changeBtnFontLineHeight}
                                        changeFontWeight={changeBtnFontWeight}
                                        changeTextTransform={changeButtonTextTransform}
                                        changeBackgroundColor={changeBtnBackgroundColor}
                                        changeTextAlignment={changeBtnTextAlignment}
                                        changeFontStyle={changeBtnFontStyle}
                                        changeLetterSpacing={changeBtnFontLetterSpacing}
                                        fontSize={btnFontSize}
                                        lineHeight={btnFontLineHeight}
                                        fontWeight={btnFontWeight}
                                        fontColor={btnFontColor}
                                        textTransform={btnTextTransform}
                                        textAlignment={btnTextAlignment}
                                        letterSpacing={btnFontLetterSpacing}
                                        fontStyle={btnFontStyle}
                                        fontFamily={btnFontFamily}
                                        noPropupdate={true}
                                    //noTextAlignment={true}
                                    />

                                    <div className="mb-3 last:mb-0">
                                        <div className="flex justify-between items-center mb-1">
                                            <div>Button Style</div>
                                        </div>
                                        <div className="flex flex-wrap items-center">
                                            <div className="w-2/3">
                                                <select
                                                    value={btnStyle}
                                                    onChange={changeBtnStyle}
                                                    className="grow h-9 w-full px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                                >
                                                    <option value="">Select Button Style</option>
                                                    {ThemeVariable.buttonClasses.map((value, index) => (
                                                        <option key={index} value={value.value}>
                                                            {value.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="w-1/3 px-1.5">
                                                <button
                                                    className={`w-full ${btnStyle} pt-[6px] pb-[6px]`}
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
                                                {ThemeVariable.buttonWidthClass.map((value, index) => (
                                                    <option value={value.value} key={index}>
                                                        {value.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="mb-4 last:mb-0 hidden">
                                        <label for="" className="mb-1 block text-sm">
                                            Button Size
                                        </label>
                                        <div className="flex flex-wrap">
                                            <select
                                                value={btnSize}
                                                onChange={changeBtnSize}
                                                className="grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                            >
                                                <option value="btn-md">Regular</option>
                                                <option value="btn-xs">Small</option>
                                                <option value="btn-lg">Large</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="mb-4 last:mb-0">
                                        <label htmlFor="" className="mb-1 block text-sm">
                                            <strong>Button Box Shadow</strong>
                                        </label>
                                    </div>

                                    <div className="mb-3 last:mb-0">
                                        <div className="flex justify-between items-center mb-1">
                                            <div>Shadow Offset</div>
                                        </div>
                                        <div className="flex flex-wrap -mx-1.5">
                                            <div className="w-1/2 px-1.5">
                                                <div className="relative flex">
                                                    <button
                                                        type="button"
                                                        className="w-11 grow px-2 py-1 inline-flex items-center justify-center text-sm bg-[#F1F5F9] border border-neutral-300 border-r-0 outline-none focus:ring-0"
                                                    >
                                                        <span className="font-semibold">X</span>
                                                    </button>
                                                    <select
                                                        onChange={changeBtnHOffset}
                                                        value={btnHOffset}
                                                        className="w-full grow text-sm bg-white text-gray-700 border border-neutral-300 p-3 py-2 leading-tight focus:ring-0 focus:shadow-none focus:outline-none"
                                                    >
                                                        <option value="">Select</option>
                                                        {Array(100)
                                                            .fill(null)
                                                            .map((value, index) => {
                                                                return (
                                                                    <option key={index} value={index}>
                                                                        {index}
                                                                    </option>
                                                                );
                                                            })}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="w-1/2 px-1.5">
                                                <div className="relative flex">
                                                    <button
                                                        type="button"
                                                        className="w-11 grow px-2 py-1 inline-flex items-center justify-center text-sm bg-[#F1F5F9] border border-neutral-300 border-r-0 outline-none focus:ring-0"
                                                    >
                                                        <span className="font-semibold">Y</span>
                                                    </button>
                                                    <select
                                                        onChange={changeBtnVOffset}
                                                        value={btnVOffset}
                                                        className="w-full grow text-sm bg-white text-gray-700 border border-neutral-300 p-3 py-2 leading-tight focus:ring-0 focus:shadow-none focus:outline-none"
                                                    >
                                                        <option value="">Select</option>
                                                        {Array(100)
                                                            .fill(null)
                                                            .map((value, index) => {
                                                                return (
                                                                    <option key={index} value={index}>
                                                                        {index}
                                                                    </option>
                                                                );
                                                            })}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-3 last:mb-0">
                                        <div className="mb-3">
                                            <div className="flex justify-between items-center mb-1">
                                                <div className="mb-1">Select Blur</div>
                                            </div>
                                            <div className="flex flex-wrap">
                                                <div className="w-full">
                                                    <SliderCustom
                                                        dots={false}
                                                        min={0}
                                                        max={100}
                                                        step={1}
                                                        defaultValue={btnBlur}
                                                        onSliderChange={changeBtnBlur}
                                                        marks={[
                                                            { value: 0, label: "0" },
                                                            { value: 25 },
                                                            { value: 50 },
                                                            { value: 75 },
                                                            { value: 100, label: "100" },
                                                        ]}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-3 last:mb-0">
                                        <div className="mb-3">
                                            <div className="flex justify-between items-center mb-1">
                                                <div className="mb-1">Spread</div>
                                            </div>
                                            <div className="flex flex-wrap">
                                                <div className="w-full px-3">
                                                    <SliderCustom
                                                        dots={false}
                                                        min={0}
                                                        max={100}
                                                        step={1}
                                                        defaultValue={btnSpread}
                                                        onSliderChange={changeBtnSpread}
                                                        marks={[
                                                            { value: 0, label: "0" },
                                                            { value: 25 },
                                                            { value: 50 },
                                                            { value: 75 },
                                                            { value: 100, label: "100" },
                                                        ]}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-3 last:mb-0">
                                        <div className="mb-3">
                                            <div className="flex justify-between items-center mb-1">
                                                <div className="mb-1">Shadow Opacity</div>
                                            </div>
                                            <div className="flex flex-wrap">
                                                <div className="w-full mx-auto px-3">
                                                    <SliderCustom
                                                        dots={false}
                                                        min={0}
                                                        max={1}
                                                        step={0.1}
                                                        defaultValue={btnShadowOpacity}
                                                        onSliderChange={changeBtnShadowOpacity}
                                                        marks={[
                                                            { value: "0.1" },
                                                            { value: "0.2" },
                                                            { value: "0.3" },
                                                            { value: "0.4" },
                                                            { value: "0.5", label: "0.5" },
                                                            { value: "0.6" },
                                                            { value: "0.7" },
                                                            { value: "0.8" },
                                                            { value: "0.9" },
                                                            { value: "1", label: "1" },
                                                        ]}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-4 last:mb-0">
                                        <label htmlFor="" className="mb-1 block text-sm">
                                            Shadow Color
                                        </label>
                                        <div className="flex flex-wrap">
                                            <ColorPicker
                                                changeBackgroundColor={changeBtnShadowColor}
                                                value={btnShadowColor}
                                            />
                                        </div>
                                    </div>

                                    {
                                        <ElementMarginPaddingValues
                                            {...props}
                                            variable={bgPropertyName}
                                            btnStyle={btnStyle}
                                            changeLeftMargin={changeBtnLeftMargin}
                                            changeTopMargin={changeBtnTopMargin}
                                            changeRightMargin={changeBtnRightMargin}
                                            changeBottomMargin={changeBtnBottomMargin}
                                            changeLeftPadding={changeBtnLeftPadding}
                                            changeTopPadding={changeBtnTopPadding}
                                            changeRightPadding={changeBtnRightPadding}
                                            changeBottomPadding={changeBtnBottomPadding}
                                            leftMargin={btnLeftMargin}
                                            rightMargin={btnRightMargin}
                                            topMargin={btnTopMargin}
                                            bottomMargin={btnBottomMargin}
                                            leftPadding={btnLeftPadding}
                                            rightPadding={btnRightPadding}
                                            topPadding={btnTopPadding}
                                            bottomPadding={btnBottomPadding}
                                            isButton={true}
                                            noPropupdate={true}
                                        />
                                    }

                                    <div className="mb-4 last:mb-0 hidden">
                                        <label for="" className="mb-1 block text-sm">
                                            Button Link
                                        </label>
                                        <div className="flex flex-wrap">
                                            <select className="grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                                <option value="1">External</option>
                                                <option value="2">Content</option>
                                                <option value="3">File</option>
                                                <option value="4">Email address</option>
                                                <option value="5">Blog</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="mb-4 last:mb-0">
                                        <div className="flex flex-wrap justify-between items-center">
                                            <label for="" className="mb-1 block text-sm">
                                                Open link in new window
                                            </label>
                                            <div className="flex items-center">
                                                <div className="w-16 relative">
                                                    <input
                                                        onChange={changeLinkTarget}
                                                        type="checkbox"
                                                        x-model="checked"
                                                        checked={btnLinkWindow == "_blank" ? "checked" : ""}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-4 last:mb-0">
                                        <label for="" className="mb-1 block text-sm">
                                            URL
                                        </label>
                                        <div className="flex flex-wrap">
                                            <input
                                                onChange={changeBtnLink}
                                                type="text"
                                                value={btnLink}
                                                className="grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4 last:mb-0">
                                        <div className="flex flex-wrap justify-between items-center">
                                            <label for="" className="mb-1 block text-sm">
                                                No Follow
                                            </label>
                                            <div className="flex items-center">
                                                <div className="w-16 relative">
                                                    <input
                                                        onChange={changeLinkFollow}
                                                        type="checkbox"
                                                        checked={
                                                            btnLinkFollow == "nofollow" ? "checked" : ""
                                                        }
                                                        value="nofollow"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="py-2">
                                    <div className="grid grid-cols-12 gap-4 mb-4 last:mb-0">
                                        <div className="col-span-full sm:col-span-8 xl:col-span-8">
                                            <label className="text-gray-500">
                                                <strong>Show Button 1</strong>
                                            </label>
                                        </div>

                                        <div className="col-span-full sm:col-span-4 xl:col-span-4">
                                            <div className="flex items-center">
                                                <ToggleButton
                                                    id={`btnDisplay1`}
                                                    defaultValue={btnDisplay1 === "Yes" ? "On" : "Off"}
                                                    onChange={(data) => {
                                                        if (data.target.checked) setBtnDisplay1("Yes");
                                                        else setBtnDisplay1("No");
                                                        //clearButton1Style();
                                                    }}
                                                    name={`showBtnDisplay1`}
                                                    on={"On"}
                                                    off={"Off"}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className={`btn-extra-info1 ${btnDisplay1 == "Yes" ? "" : "hidden"
                                        }`}
                                >
                                    <div className="mb-4 last:mb-0">
                                        <label for="" className="mb-1 block text-sm">
                                            Button Text
                                        </label>
                                        <div className="flex flex-wrap">
                                            <input
                                                onChange={buttonTextChange1}
                                                value={btnText1}
                                                type="text"
                                                className="grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4 last:mb-0">
                                        <label for="" className="mb-1 block text-sm">
                                            Button Alt
                                        </label>
                                        <div className="flex flex-wrap">
                                            <input
                                                onChange={buttonAltChange1}
                                                value={btnAlt1}
                                                type="text"
                                                className="grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="flex justify-between items-center mb-1">
                                            <div className="">Loading Effect</div>
                                        </div>
                                        <div className="text-center relative overflow-hidden">
                                            <select
                                                onChange={changeBtn1Effect}
                                                value={btn1Effect}
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

                                    <TextStyleElement
                                        {...props}
                                        variable={"Button2"}
                                        type="carousel"
                                        changeFontFamily={changeBtnFontFamily1}
                                        btnStyle={btnStyle1}
                                        changeFontSize={changeBtnFontSize1}
                                        changeLineHeight={changeBtnFontLineHeight1}
                                        changeFontWeight={changeBtnFontWeight1}
                                        changeTextTransform={changeButtonTextTransform1}
                                        changeBackgroundColor={changeBtnBackgroundColor1}
                                        changeTextAlignment={changeBtnTextAlignment1}
                                        changeFontStyle={changeBtnFontStyle1}
                                        changeLetterSpacing={changeBtnFontLetterSpacing1}
                                        fontSize={btnFontSize1}
                                        lineHeight={btnFontLineHeight1}
                                        fontWeight={btnFontWeight1}
                                        fontColor={btnFontColor1}
                                        textTransform={btnTextTransform1}
                                        textAlignment={btnTextAlignment1}
                                        letterSpacing={btnFontLetterSpacing1}
                                        fontStyle={btnFontStyle1}
                                        fontFamily={btnFontFamily1}
                                        noPropupdate={true}
                                    //noTextAlignment={true}
                                    />

                                    <div className="mb-3 last:mb-0">
                                        <div className="flex justify-between items-center mb-1">
                                            <div>Button Style</div>
                                        </div>
                                        <div className="flex flex-wrap items-center">
                                            <div className="w-2/3">
                                                <select
                                                    value={btnStyle1}
                                                    onChange={changeBtnStyle1}
                                                    className="grow h-9 w-full px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                                >
                                                    <option value="">Select Button Style</option>
                                                    {ThemeVariable.buttonClasses.map((value, index) => (
                                                        <option key={index} value={value.value}>
                                                            {value.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="w-1/3 px-1.5">
                                                <button
                                                    className={`w-full ${btnStyle1} pt-[6px] pb-[6px]`}
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
                                                value={btnWidth1}
                                                onChange={changeBtnWidth1}
                                                className="grow h-9 w-full px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                            >
                                                <option value="">Auto</option>
                                                {ThemeVariable.buttonWidthClass.map((value, index) => (
                                                    <option value={value.value} key={index}>
                                                        {value.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="mb-4 last:mb-0 hidden">
                                        <label for="" className="mb-1 block text-sm">
                                            Button Size
                                        </label>
                                        <div className="flex flex-wrap">
                                            <select
                                                value={btnSize1}
                                                onChange={changeBtnSize1}
                                                className="grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                            >
                                                <option value="btn-md">Regular</option>
                                                <option value="btn-xs">Small</option>
                                                <option value="btn-lg">Large</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="mb-4 last:mb-0">
                                        <label htmlFor="" className="mb-1 block text-sm">
                                            <strong>Button Box Shadow</strong>
                                        </label>
                                    </div>

                                    <div className="mb-3 last:mb-0">
                                        <div className="flex justify-between items-center mb-1">
                                            <div>Shadow Offset</div>
                                        </div>
                                        <div className="flex flex-wrap -mx-1.5">
                                            <div className="w-1/2 px-1.5">
                                                <div className="relative flex">
                                                    <button
                                                        type="button"
                                                        className="w-11 grow px-2 py-1 inline-flex items-center justify-center text-sm bg-[#F1F5F9] border border-neutral-300 border-r-0 outline-none focus:ring-0"
                                                    >
                                                        <span className="font-semibold">X</span>
                                                    </button>
                                                    <select
                                                        onChange={changeBtnHOffset1}
                                                        value={btnHOffset1}
                                                        className="w-full grow text-sm bg-white text-gray-700 border border-neutral-300 p-3 py-2 leading-tight focus:ring-0 focus:shadow-none focus:outline-none"
                                                    >
                                                        <option value="">Select</option>
                                                        {Array(100)
                                                            .fill(null)
                                                            .map((value, index) => {
                                                                return (
                                                                    <option key={index} value={index}>
                                                                        {index}
                                                                    </option>
                                                                );
                                                            })}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="w-1/2 px-1.5">
                                                <div className="relative flex">
                                                    <button
                                                        type="button"
                                                        className="w-11 grow px-2 py-1 inline-flex items-center justify-center text-sm bg-[#F1F5F9] border border-neutral-300 border-r-0 outline-none focus:ring-0"
                                                    >
                                                        <span className="font-semibold">Y</span>
                                                    </button>
                                                    <select
                                                        onChange={changeBtnVOffset1}
                                                        value={btnVOffset1}
                                                        className="w-full grow text-sm bg-white text-gray-700 border border-neutral-300 p-3 py-2 leading-tight focus:ring-0 focus:shadow-none focus:outline-none"
                                                    >
                                                        <option value="">Select</option>
                                                        {Array(100)
                                                            .fill(null)
                                                            .map((value, index) => {
                                                                return (
                                                                    <option key={index} value={index}>
                                                                        {index}
                                                                    </option>
                                                                );
                                                            })}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-3 last:mb-0">
                                        <div className="mb-3">
                                            <div className="flex justify-between items-center mb-1">
                                                <div className="mb-1">Select Blur</div>
                                            </div>
                                            <div className="flex flex-wrap">
                                                <div className="w-full">
                                                    <SliderCustom
                                                        dots={false}
                                                        min={0}
                                                        max={100}
                                                        step={1}
                                                        defaultValue={btnBlur1}
                                                        onSliderChange={changeBtnBlur1}
                                                        marks={[
                                                            { value: 0, label: "0" },
                                                            { value: 25 },
                                                            { value: 50 },
                                                            { value: 75 },
                                                            { value: 100, label: "100" },
                                                        ]}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-3 last:mb-0">
                                        <div className="mb-3">
                                            <div className="flex justify-between items-center mb-1">
                                                <div className="mb-1">Spread</div>
                                            </div>
                                            <div className="flex flex-wrap">
                                                <div className="w-full px-3">
                                                    <SliderCustom
                                                        dots={false}
                                                        min={0}
                                                        max={100}
                                                        step={1}
                                                        defaultValue={btnSpread1}
                                                        onSliderChange={changeBtnSpread1}
                                                        marks={[
                                                            { value: 0, label: "0" },
                                                            { value: 25 },
                                                            { value: 50 },
                                                            { value: 75 },
                                                            { value: 100, label: "100" },
                                                        ]}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-3 last:mb-0">
                                        <div className="mb-3">
                                            <div className="flex justify-between items-center mb-1">
                                                <div className="mb-1">Shadow Opacity</div>
                                            </div>
                                            <div className="flex flex-wrap">
                                                <div className="w-full mx-auto px-3">
                                                    <SliderCustom
                                                        dots={false}
                                                        min={0}
                                                        max={1}
                                                        step={0.1}
                                                        defaultValue={btnShadowOpacity1}
                                                        onSliderChange={changeBtnShadowOpacity1}
                                                        marks={[
                                                            { value: "0.1" },
                                                            { value: "0.2" },
                                                            { value: "0.3" },
                                                            { value: "0.4" },
                                                            { value: "0.5", label: "0.5" },
                                                            { value: "0.6" },
                                                            { value: "0.7" },
                                                            { value: "0.8" },
                                                            { value: "0.9" },
                                                            { value: "1", label: "1" },
                                                        ]}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-4 last:mb-0">
                                        <label htmlFor="" className="mb-1 block text-sm">
                                            Shadow Color
                                        </label>
                                        <div className="flex flex-wrap">
                                            <ColorPicker
                                                changeBackgroundColor={changeBtnShadowColor1}
                                                value={btnShadowColor1}
                                            />
                                        </div>
                                    </div>

                                    {
                                        <ElementMarginPaddingValues
                                            {...props}
                                            variable={bgPropertyName}
                                            btnStyle={btnStyle1}
                                            changeLeftMargin={changeBtnLeftMargin1}
                                            changeTopMargin={changeBtnTopMargin1}
                                            changeRightMargin={changeBtnRightMargin1}
                                            changeBottomMargin={changeBtnBottomMargin1}
                                            changeLeftPadding={changeBtnLeftPadding1}
                                            changeTopPadding={changeBtnTopPadding1}
                                            changeRightPadding={changeBtnRightPadding1}
                                            changeBottomPadding={changeBtnBottomPadding1}
                                            leftMargin={btnLeftMargin1}
                                            rightMargin={btnRightMargin1}
                                            topMargin={btnTopMargin1}
                                            bottomMargin={btnBottomMargin1}
                                            leftPadding={btnLeftPadding1}
                                            rightPadding={btnRightPadding1}
                                            topPadding={btnTopPadding1}
                                            bottomPadding={btnBottomPadding1}
                                            isButton={true}
                                            noPropupdate={true}
                                        />
                                    }

                                    <div className="mb-4 last:mb-0 hidden">
                                        <label for="" className="mb-1 block text-sm">
                                            Button Link
                                        </label>
                                        <div className="flex flex-wrap">
                                            <select className="grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                                <option value="1">External</option>
                                                <option value="2">Content</option>
                                                <option value="3">File</option>
                                                <option value="4">Email address</option>
                                                <option value="5">Blog</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="mb-4 last:mb-0">
                                        <div className="flex flex-wrap justify-between items-center">
                                            <label for="" className="mb-1 block text-sm">
                                                Open link in new window
                                            </label>
                                            <div className="flex items-center">
                                                <div className="w-16 relative">
                                                    <input
                                                        onChange={changeLinkTarget1}
                                                        type="checkbox"
                                                        id="new-window-link"
                                                        x-model="checked"
                                                        checked={
                                                            btnLinkWindow1 == "_blank" ? "checked" : ""
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-4 last:mb-0">
                                        <label for="" className="mb-1 block text-sm">
                                            URL
                                        </label>
                                        <div className="flex flex-wrap">
                                            <input
                                                onChange={changeBtnLink1}
                                                type="text"
                                                value={btnLink1}
                                                className="grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4 last:mb-0">
                                        <div className="flex flex-wrap justify-between items-center">
                                            <label for="" className="mb-1 block text-sm">
                                                No Follow
                                            </label>
                                            <div className="flex items-center">
                                                <div className="w-16 relative">
                                                    <input
                                                        onChange={changeLinkFollow1}
                                                        type="checkbox"
                                                        x-model="checked"
                                                        checked={
                                                            btnLinkFollow1 == "nofollow" ? "checked" : ""
                                                        }
                                                        value="nofollow"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4 last:mb-0">
                                    {addBtn && (
                                        <button
                                            className="w-full py-[6px] rounded bg-indigo-500 hover:bg-indigo-600 text-white mt-2"
                                            onClick={saveData}
                                        >
                                            + Add
                                        </button>
                                    )}
                                    {editBtn && (
                                        <button
                                            className="w-full py-[6px] rounded bg-indigo-500 hover:bg-indigo-600 text-white mt-2"
                                            onClick={updateData}
                                        >
                                            + Update
                                        </button>
                                    )}
                                </div>
                            </>
                        )}

                        <div className="mb-3 mt-3 pb-10">
                            <div className="mb-3">
                                <div className="flex items-center justify-between">
                                    <div className="font-semibold">Carousel Controls</div>
                                    <div className="flex items-center">
                                        <div className="w-16 relative">
                                            <ToggleButton
                                                id={`carouselStatus`}
                                                allowInternalFunction={false}
                                                defaultValue={carouselStatus}
                                                disable={imgArr.length < 1}
                                                onChange={changeCarouselStatus}
                                                name={`carouselStatus`}
                                                on={"On"}
                                                off={"Off"}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {showArrow === "Off" &&
                                autoPlay === "Off" &&
                                dataArr?.images?.length > 1 && (
                                    <p style={{ color: "#e82020" }}>
                                        <strong>Note: </strong> You need to enable the arrow or
                                        auto-play to view the second slide.
                                    </p>
                                )}
                        </div>
                        {carouselStatus == "On" && (
                            <>
                                <div className="mb-3 last:mb-0">
                                    <div className="flex justify-between items-center mb-1">
                                        <div>Arrow Type</div>
                                    </div>
                                    <div className="flex flex-wrap items-center">
                                        <div className="w-2/3">
                                            <select
                                                value={arrowType}
                                                onChange={changeArrowType}
                                                className="grow h-9 w-full px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                            >
                                                <option value="">Select Arrow Type</option>
                                                <option value="Arrow1">Type 1</option>
                                                <option value="Arrow2">Type 2</option>
                                            </select>
                                        </div>
                                        {arrowType && (
                                            <div className="w-1/3 px-1.5">
                                                <img
                                                    src={`/images/cms/arrow-type-${arrowType.replace(
                                                        "Arrow",
                                                        ""
                                                    )}.png`}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="mb-3 mt-3 last:mb-0">
                                    <div className="mb-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center justify-between">
                                                <div className="bg-[#F1F5F9] rounded p-1 block h-8 w-9 text-center mr-1">
                                                    <span className="material-symbols-outlined">
                                                        swap_horiz
                                                    </span>
                                                </div>
                                                <div>Show Arrow</div>
                                            </div>
                                            <div
                                                className="flex items-center"
                                                x-data="{ checked: true }"
                                            >
                                                <div className="w-16 relative">
                                                    <ToggleButton
                                                        id={`showArrow`}
                                                        defaultValue={showArrow}
                                                        onChange={handleToggleChangeEvent}
                                                        name={`showArrow`}
                                                        on={"On"}
                                                        off={"Off"}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3 mt-3 last:mb-0">
                                    <div className="mb-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center justify-between">
                                                <div className="bg-[#F1F5F9] rounded p-1 block h-8 w-9 text-center mr-1">
                                                    <span className="material-icons-outlined">
                                                        all_inclusive
                                                    </span>
                                                </div>
                                                <div>Infinite Loop</div>
                                            </div>
                                            <div
                                                className="flex items-center"
                                                x-data="{ checked: true }"
                                            >
                                                <div className="w-16 relative">
                                                    <ToggleButton
                                                        id={`infiniteLoop`}
                                                        defaultValue={infiniteLoop}
                                                        onChange={handleToggleChangeEvent}
                                                        name={`infiniteLoop`}
                                                        on={"On"}
                                                        off={"Off"}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3 mt-3 last:mb-0">
                                    <div className="mb-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center justify-between">
                                                <div className="bg-[#F1F5F9] rounded p-1 block h-8 w-9 text-center mr-1">
                                                    <span className="material-icons-outlined">
                                                        play_arrow
                                                    </span>
                                                </div>
                                                <div>Auto Play</div>
                                            </div>
                                            <div
                                                className="flex items-center"
                                                x-data="{ checked: true }"
                                            >
                                                <div className="w-16 relative">
                                                    <ToggleButton
                                                        id={`autoPlay`}
                                                        defaultValue={autoPlay}
                                                        onChange={handleToggleChangeEvent}
                                                        name={`autoPlay`}
                                                        on={"On"}
                                                        off={"Off"}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3 mt-3 last:mb-0">
                                    <div className="mb-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center justify-between">
                                                <div className="bg-[#F1F5F9] rounded p-1 block h-8 w-9 text-center mr-1">
                                                    <span className="material-icons-outlined">
                                                        ads_click
                                                    </span>
                                                </div>
                                                <div>Stop on Hover</div>
                                            </div>
                                            <div
                                                className="flex items-center"
                                                x-data="{ checked: true }"
                                            >
                                                <div className="w-16 relative">
                                                    <ToggleButton
                                                        id={`stopOnHover`}
                                                        defaultValue={stopOnHover}
                                                        onChange={handleToggleChangeEvent}
                                                        name={`stopOnHover`}
                                                        on={"On"}
                                                        off={"Off"}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3 mt-3 last:mb-0">
                                    <div className="mb-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center justify-between">
                                                <div className="bg-[#F1F5F9] rounded p-1 block h-8 w-9 text-center mr-1">
                                                    <span className="material-symbol-outlined">123</span>
                                                </div>
                                                <div>Show Status</div>
                                            </div>
                                            <div
                                                className="flex items-center"
                                                x-data="{ checked: true }"
                                            >
                                                <div className="w-16 relative">
                                                    <ToggleButton
                                                        id={`showStatus`}
                                                        defaultValue={showStatus}
                                                        onChange={handleToggleChangeEvent}
                                                        name={`showStatus`}
                                                        on={"On"}
                                                        off={"Off"}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3 mt-3 pb-10">
                                    <div className="mb-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center justify-between">
                                                <div className="bg-[#F1F5F9] rounded p-1 block h-8 w-9 text-center mr-1">
                                                    <span className="material-icons-outlined">
                                                        hdr_weak
                                                    </span>
                                                </div>
                                                <div>Show Indicators</div>
                                            </div>
                                            <div
                                                className="flex items-center"
                                                x-data="{ checked: true }"
                                            >
                                                <div className="w-16 relative">
                                                    <ToggleButton
                                                        id={`showIndicators`}
                                                        defaultValue={showIndicators}
                                                        onChange={handleToggleChangeEvent}
                                                        name={`showIndicators`}
                                                        on={"On"}
                                                        off={"Off"}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="py-2 hidden">
                                    <div className="grid grid-cols-12 gap-4 mb-4 last:mb-0">
                                        <div className="col-span-full sm:col-span-8 xl:col-span-8">
                                            <label className="text-gray-500">Show Thumb</label>
                                        </div>
                                        <div className="col-span-full sm:col-span-4 xl:col-span-4">
                                            <div className="flex items-center">
                                                <ToggleButton
                                                    id={`showThumb`}
                                                    defaultValue={showThumb}
                                                    onChange={handleToggleChangeEvent}
                                                    name={`showThumb`}
                                                    on={"On"}
                                                    off={"Off"}
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

export default ElementCarousel;
