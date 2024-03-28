import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ColorPicker from "components/admin/content/common/ColorPicker";
import ImageFile from "components/admin/content/common/ImageFile";
import Input from "components/admin/content/common/Input";
import { displayCarousel } from "components/admin/content/helper/Helper";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { object } from "yup";
import ReactDOMServer from "react-dom/server";
import * as helper from "components/admin/content/helper/Helper";
import ToggleButton from "components/admin/content/common/ToggleButton";
import ElementCarouselDisplay from "components/admin/content/template/create/elements/ElementCarouselDisplay";
import ElementHeadlineColorOpacity from "./ElementHeadlineColorOpacity";
import { randomNumber } from "components/admin/content/helper/Helper";
import ElementFontStyle from "./ElementFontStyle";
import ElementPaddingValues from "./ElementPaddingValues";
import ElementMarginValues from "./ElementMarginValues";
import * as ThemeVariable from "components/admin/content/helper/ThemeVariables";
import TextStyleElement from "./TextStyleElement";
import ElementMarginPaddingValues from "./ElementMarginPaddingValues";
import SliderCustom from "components/admin/content/common/SliderCustom";
import { CKEditor } from "ckeditor4-react";
import ImageGallery from "./../modal/imageGalleryModel/ImageGallery";

const ElementFullSlider = (props) => {
    const [carouselStatus, setCarouselStatus] = useState("Off");
    const [showHide, setShowHide] = useState(false);
    const [indArr, setIndArr] = useState([]);
    const [headlineTag, setHeadlineTag] = useState("");
    const [headlineTag1, setHeadlineTag1] = useState("");
    const [srno, setSrNo] = useState(0);
    const [textBgColor, setTextBgColor] = useState("");
    const [bgOpacity, setBgOpacity] = useState(1);
    const [dataArr, setDataArr] = useState([]);
    //const [fontSize, setFontSize] = useState('text-base');
    //const [fontSize1, setFontSize1] = useState('text-base');
    const [textHPos, setTextHPos] = useState("items-center");
    const [textVPos, setTextVPos] = useState("justify-center");
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
    const [descriptionDisplay, setDescriptionDisplay] = useState(false);
    const [showDescriptionDisplay, setShowDescriptionDisplay] = useState("Off");

    const [headline, setHeadline] = useState("");
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
    const [headlineClass, setHeadlineClass] = useState("");
    const [headlineHOffset, setHeadlineHOffset] = useState("");
    const [headlineVOffset, setHeadlineVOffset] = useState("");
    const [headlineBlur, setHeadlineBlur] = useState("");
    const [headlineShadowColor, setHeadlineShadowColor] = useState("");
    const [headlineShadowRGB, setHeadlineShadowRGB] = useState("");
    const [headlineShadowOpacity, setHeadlineShadowOpacity] = useState("");

    const [showData, setShowData] = useState(false);

    const [headline1, setHeadline1] = useState("");
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
    const [headlineClass1, setHeadlineClass1] = useState("");
    const [headlineHOffset1, setHeadlineHOffset1] = useState("");
    const [headlineVOffset1, setHeadlineVOffset1] = useState("");
    const [headlineBlur1, setHeadlineBlur1] = useState("");
    const [headlineShadowColor1, setHeadlineShadowColor1] = useState("");
    const [headlineShadowRGB1, setHeadlineShadowRGB1] = useState("");
    const [headlineShadowOpacity1, setHeadlineShadowOpacity1] = useState("");

    const [showHeadline, setShowHeadline] = useState(false);

    const [btnText, setBtnText] = useState("");
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
    const [btnHOffset, setBtnHOffset] = useState("");
    const [btnVOffset, setBtnVOffset] = useState("");
    const [btnBlur, setBtnBlur] = useState("");
    const [btnSpread, setBtnSpread] = useState("");
    const [btnShadowColor, setBtnShadowColor] = useState("");
    const [btnShadowRGB, setBtnShadowRGB] = useState("");
    const [btnShadowOpacity, setBtnShadowOpacity] = useState("");
    const [btnFontColor, setBtnFontColor] = useState("");

    const [btnLink, setBtnLink] = useState("");
    const [btnLinkWindow, setBtnLinkWindow] = useState(false);
    const [btnLinkFollow, setBtnLinkFollow] = useState("");
    const [btnDisplay, setBtnDisplay] = useState("No");
    const [imgArr, setImgArr] = useState([]);

    const [editBtn, setEditBtn] = useState(false);
    const [addBtn, setAddBtn] = useState(true);

    const [videoType, setVideoType] = useState("Youtube");
    const [imageOrVideo, setImageOrVideo] = useState("Image");

    const [videoUrl, setVideoUrl] = useState("");
    const [OpenImageIconModel, setOpenImageIconModel] = useState(false);
    const [OpenImageModel, setOpenImageModel] = useState(false);
    /* Description field code stars */
    const [editor, setEditor] = useState(null);
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
        (obj) => obj.uid == props.currentComponent,
    );
    const bgPropertyName = props.variable; //selectedObj.length > 0 ? Object.keys(selectedObj[0].properties).find(key => selectedObj[0].properties[key] === "background") : [];

    /* When click on any component background component will reload and
      we have called function to set default properties */

    const updateHeadline = (event) => {
        setHeadline(event.target.value);
    };

    const updateHeadline1 = (event) => {
        setHeadline1(event.target.value);
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

    const onElementImageChange = (url) => {
        // console.log("abcd1234", url);
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

    const saveData = () => {
        let tmpArr = updateDataArray();
        setImgArr((previous) => [...previous, tmpArr]);
        setShowData(false);
    };

    const deleteData = (element) => {
        let tmpVal = [];
        imgArr.forEach((acValue) => {
            if (acValue.image_url != element.image_url) {
                tmpVal.push(acValue);
            }
        });
        setImgArr(tmpVal);
    };

    const viewBanner = (index) => {
        let strHTML = displayCarousel(
            showIndicators,
            showArrow,
            showStatus,
            showThumb,
            dataArr,
            index,
        );

        let x = ReactDOM.findDOMNode(
            props.refArray.current[props.currentComponent],
        );
        if (x && x.querySelectorAll("#banner_display").length) {
            x.querySelectorAll("#banner_display")[0].innerHTML = strHTML;
        }
        props.updateProperty({ type: "carousel", value: dataArr }, bgPropertyName);
    };

    const editData = (element) => {
        setShowData(true);

        setSrNo(element.srno);
        setImageOrVideo(element.image_or_video ? "Image" : "");
        setImageURL(element.image_url);
        setImageAlt(element.image_alt);
        setImageLink(element.image_link);
        setVideoType(element.video_type);
        setVideoUrl(element.video_url);
        setImageAsBackground(element.image_as_bg);
        setFixedBackground(element.fixed_background);
        setIconImageURL(element.icon_image_url);

        setBtnDisplay(element.button_display);
        setBtnText(element.button_text);
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

        if (element.headline !== "") {
            setHeadline1Display(true);
            setShowHeadline1Display("On");
        }

        if (element.headline1 !== "") {
            setHeadline2Display(true);
            setShowHeadline2Display("On");
        }

        if (element.description !== "") {
            setDescriptionDisplay(true);
            setShowDescriptionDisplay("On");
        }

        setHeadline1Display(element.headline1_display);
        setHeadline(element.headline);
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
        setDescriptionDisplay(element.description_display);
        setEditor(null);
        setAcDesc(element.description);
        //setHeadline1Width(element.width1);
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
        //setFontSize(element.headline_font_size);
        //setFontSize1(element.headline1_font_size);
        setTextHPos(element.text_hpos);
        setTextVPos(element.text_vpos);

        setTextBgColor(element.text_bg_color);
        setBgOpacity(element.bg_opacity);
        setHexColor(element.bg_hex_color);
        setHeadlineWidth(element.headline_width);
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

        Object.assign(tmpArr, { image_or_video: imageOrVideo });
        Object.assign(tmpArr, { video_type: videoType });
        Object.assign(tmpArr, { video_url: videoUrl });

        Object.assign(tmpArr, { button_display: btnDisplay });
        Object.assign(tmpArr, { button_text: btnText });
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
        // Box Shadow
        Object.assign(tmpArr, { btn_box_hoffset: btnHOffset });
        Object.assign(tmpArr, { btn_box_voffset: btnVOffset });
        Object.assign(tmpArr, { btn_box_blur: btnBlur });
        Object.assign(tmpArr, { btn_box_spread: btnSpread });
        Object.assign(tmpArr, { btn_box_shadowcolor: btnShadowColor });
        Object.assign(tmpArr, { btn_box_shadow_rgb: btnShadowRGB });
        Object.assign(tmpArr, { btn_shadow_opacity: btnShadowOpacity });

        Object.assign(tmpArr, { headline1_display: headline1Display });
        Object.assign(tmpArr, { headline: headline });
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

        Object.assign(tmpArr, { headline2_display: headline2Display });
        Object.assign(tmpArr, { headline1: headline1 });
        Object.assign(tmpArr, { font_size1: fontSize1 });
        //Object.assign(tmpArr, { "width1": headline1Width});
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
        Object.assign(tmpArr, { description_display: descriptionDisplay });
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

        let btnClass = "";
        if (btnTextTransform) {
            btnClass += " " + btnTextTransform;
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

        Object.assign(tmpArr, { text_hpos: textHPos });
        Object.assign(tmpArr, { text_vpos: textVPos });
        Object.assign(tmpArr, { text_bg_color: textBgColor });
        Object.assign(tmpArr, { bg_opacity: bgOpacity });
        Object.assign(tmpArr, { bg_hex_color: hexColor });
        Object.assign(tmpArr, { headline_width: headlineWidth });

        setImageURL("");
        setIconImageURL("");
        setImageAlt("");
        setImageLink("");
        setHeadlineWidth("");
        clearHeadline();
        clearHeadline1();
        clearDescription();
        clearButton();

        setVideoUrl("");
        setImageOrVideo("Image");
        setTextHPos("items-center");
        setTextVPos("justify-center");
        setTextBgColor("");
        setBgOpacity(1);
        setHexColor("");
        return tmpArr;
    };

    console.log("hello there");

    const updateData = () => {
        let tmpVal = [];

        imgArr.forEach((acValue, index) => {
            if (acValue.srno == srno) {
                let tmpArr = {};
                Object.assign(tmpArr, { srno: srno });
                Object.assign(tmpArr, { image_url: imageURL });
                Object.assign(tmpArr, { image_link: imageLink });
                Object.assign(tmpArr, { image_alt: imageAlt });
                Object.assign(tmpArr, { image_as_bg: imageAsBackground });
                Object.assign(tmpArr, { fixed_background: fixedBackground });
                Object.assign(tmpArr, { icon_image_url: iconImageURL });

                Object.assign(tmpArr, { image_or_video: imageOrVideo });
                Object.assign(tmpArr, { video_type: videoType });
                Object.assign(tmpArr, { video_url: videoUrl });

                Object.assign(tmpArr, { headline1_display: headline1Display });
                Object.assign(tmpArr, { headline: headline });
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
                let headline1BoxShadow = "";

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
                Object.assign(tmpArr, { description_display: descriptionDisplay });
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

                let btnClass = "";
                let btnBoxShadow = "";

                if (btnTextTransform) {
                    btnClass += " " + btnTextTransform;
                }
                if (btnFontSize) {
                    btnClass += " " + btnFontSize;
                }
                if (btnFontFamily) {
                    btnClass += " " + btnFontFamily;
                }
                if (btnTextAlignment) {
                    btnClass += " " + btnTextAlignment;
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
                Object.assign(tmpArr, { button_display: btnDisplay });
                Object.assign(tmpArr, { button_text: btnText });
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

                // Box Shadow
                Object.assign(tmpArr, { btn_box_hoffset: btnHOffset });
                Object.assign(tmpArr, { btn_box_voffset: btnVOffset });
                Object.assign(tmpArr, { btn_box_blur: btnBlur });
                Object.assign(tmpArr, { btn_box_spread: btnSpread });
                Object.assign(tmpArr, { btn_box_shadowcolor: btnShadowColor });
                Object.assign(tmpArr, { btn_box_shadow_rgb: btnShadowRGB });
                Object.assign(tmpArr, { btn_shadow_opacity: btnShadowOpacity });

                Object.assign(tmpArr, { text_hpos: textHPos });
                Object.assign(tmpArr, { text_vpos: textVPos });
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
        setImageURL("");
        setImageAlt("");
        setImageLink("");
        setIconImageURL("");
        clearHeadline();
        clearHeadline1();
        clearDescription();
        clearButton();
        setVideoUrl("");
        setImageOrVideo("");
        setShowData(false);
        setHeadline1Display(false);
        setHeadline2Display(false);
        setShowHeadline1Display("Off");
        setShowHeadline2Display("Off");
        setBtnDisplay("No");
    };

    const updateArrKey = (key, value) => {
        console.log(
            "dataArr Object.keys(dataArr)",
            dataArr,
            Object.keys(dataArr),
            key,
            value,
        );
        if (Object.keys(dataArr).includes(key)) {
            let tmpArr = {};
            Object.keys(dataArr).forEach((dkey) => {
                if (dkey == key) {
                    tmpArr[key] = value;
                } else {
                    tmpArr[dkey] = dataArr[dkey];
                }
            });
            setDataArr(tmpArr);
        } else {
            let tmpArr = { ...dataArr };
            tmpArr[key] = value;
            setDataArr(tmpArr);
        }
    };

    const handleToggleChangeEvent = (event) => {
        let val = event.target.checked ? "On" : "Off";
        console.log(
            "event.target.checked event.target.name",
            val,
            event.target.name,
        );
        updateArrKey(event.target.name, val);

        if (event.target.name == "showThumb") {
            setshowThumb(val);
        }
        if (event.target.name == "showArrow") {
            setshowArrow(val);
        }
        if (event.target.name == "showStatus") {
            setshowStatus(val);
        }
        if (event.target.name == "infiniteLoop") {
            setinfiniteLoop(val);
        }
        if (event.target.name == "autoPlay") {
            setautoPlay(val);
        }
        if (event.target.name == "stopOnHover") {
            setstopOnHover(val);
        }
        if (event.target.name == "showIndicators") {
            setshowIndicators(val);
        }
    };

    const clearHeadline = () => {
        setHeadline("");
        setHeadlineTag("");
        //setHeadlineWidth("");
        // setTextTransform("");
        // setFontSize("");
        // setFontFamily("");
        // setFontColor("");
        // setLineHeight("");
        // setLetterSpacing("");
        // setFontWeight("");
        // setFontStyle("");
        // setTextDecoration("");
        // setTextAlignment("");
        // setLeftPadding('');
        // setTopPadding('');
        // setRightPadding('');
        // setBottomPadding('');
        // setLeftMargin('');
        // setTopMargin('');
        // setRightMargin('');
        // setBottomMargin('');
        // setHeadlineHOffset('');
        // setHeadlineVOffset('');
        // setHeadlineBlur('');
        // setHeadlineShadowColor('');
        // setHeadlineShadowRGB('');
        // setHeadlineShadowOpacity('');
    };

    const clearHeadline1 = () => {
        // setTextTransform1("");
        setHeadline1("");
        setHeadlineTag1("");
        // setHeadline1Width("");
        // setFontSize1("");
        // setFontFamily1("");
        // setFontColor1("");
        // setLineHeight1("");
        // setLetterSpacing1("");
        // setFontWeight1("");
        // setFontStyle1("");
        // setTextDecoration1("");
        // setTextAlignment1("");
        // setLeftPadding1('');
        // setTopPadding1('');
        // setRightPadding1('');
        // setBottomPadding1('');
        // setLeftMargin1('');
        // setTopMargin1('');
        // setRightMargin1('');
        // setBottomMargin1('');
        // setHeadlineHOffset1('');
        // setHeadlineVOffset1('');
        // setHeadlineBlur1('');
        // setHeadlineShadowColor1('');
        // setHeadlineShadowRGB1('');
        // setHeadlineShadowOpacity1('');
    };

    const clearDescription = () => {
        // setTextTransform1("");
        setHeadline1("");
        setEditor(null);
        setAcDesc("");
        // setHeadline1Width("");
        // setFontSize1("");
        // setFontFamily1("");
        // setFontColor1("");
        // setLineHeight1("");
        // setLetterSpacing1("");
        // setFontWeight1("");
        // setFontStyle1("");
        // setTextDecoration1("");
        // setTextAlignment1("");
        // setLeftPadding1('');
        // setTopPadding1('');
        // setRightPadding1('');
        // setBottomPadding1('');
        // setLeftMargin1('');
        // setTopMargin1('');
        // setRightMargin1('');
        // setBottomMargin1('');
        // setHeadlineHOffset1('');
        // setHeadlineVOffset1('');
        // setHeadlineBlur1('');
        // setHeadlineShadowColor1('');
        // setHeadlineShadowRGB1('');
        // setHeadlineShadowOpacity1('');
    };

    const clearButton = () => {
        setBtnText("");
        // setBtnTextTransform('');
        // setBtnStyle('');
        // setBtnSize('');
        setBtnLink("");
        // setBtnLinkWindow(false);
        // setBtnLinkFollow('');
        // setBtnDisplay('No');

        // setBtnFontFamily('');
        // setBtnFontSize('');
        // setBtnFontWeight('');
        // setBtnFontLineHeight('');
        // setBtnTextAlignment('');
        // setBtnFontStyle('');
        // setBtnFontLetterSpacing('');
        // setBtnTopPadding('');
        // setBtnRightPadding('');
        // setBtnBottomPadding('');
        // setBtnLeftPadding('');
        // setBtnTopMargin('');
        // setBtnRightMargin('');
        // setBtnBottomMargin('');
        // setBtnLeftMargin('');
        // setBtnHOffset('');
        // setBtnVOffset('');
        // setBtnBlur('');
        // setBtnSpread('');
        // setBtnShadowColor('');
        // setBtnShadowRGB('');
        // setBtnFontColor('');
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
            color.rgb.r + ", " + color.rgb.g + ", " + color.rgb.b,
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
    const buttonTextChange = (event) => {
        setBtnText(event.target.value);
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
        setBtnLinkFollow(event.target.value);
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

    const changeHeadlineWidth = (event) => {
        setHeadlineWidth(event.target.value);
    };

    const changeCarouselStatus = (event) => {
        if (event.target.checked) {
            setCarouselStatus("On");
        } else {
            setCarouselStatus("Off");
            setshowArrow("Off");
            setshowThumb("Off");
            setinfiniteLoop("Off");
            setautoPlay("Off");
            setstopOnHover("Off");
            setshowStatus("Off");
            setshowIndicators("Off");
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
        setBottomMargin(event.target.value);
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
            result.destination.index,
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
    // { console.log("acherefv", props.compprop) }

    useEffect(() => {
        /* Here when change component,values are not retiNING */
        if (selectedObj.length > 0) {
            let tmpVal;

            Object.entries(selectedObj[0].selected_Values).forEach(([key, value]) => {
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
                if (Object.keys(tmpVal.value).includes("images")) {
                    setImgArr(tmpVal.value.images);
                    if (tmpVal.value.images.length > 1) setCarouselStatus("On");
                }
                setDataArr(tmpVal.value);
            }

            // console.log("selectedObj[0].selected_Values ", selectedObj[0].selected_Values, tmpVal);
        }
    }, [JSON.stringify(props.currentComponent)]);

    useEffect(() => {
        let strHTML = displayCarousel(
            showIndicators,
            showArrow,
            showStatus,
            showThumb,
            dataArr,
        );

        let x = ReactDOM.findDOMNode(
            props.refArray.current[props.currentComponent],
        );
        if (x && x.querySelectorAll("#banner_display").length) {
            x.querySelectorAll("#banner_display")[0].innerHTML = strHTML;
        }
        props.updateProperty({ type: "carousel", value: dataArr }, bgPropertyName);
    }, [JSON.stringify(dataArr)]);

    useEffect(() => {
        let elementArr = {};
        if (Object.keys(dataArr).includes("images")) {
            Object.keys(dataArr).forEach((dkey, index) => {
                if (dkey != "images") {
                    Object.assign(elementArr, { [dkey]: dataArr[dkey] });
                } else {
                    Object.assign(elementArr, { images: imgArr });
                }
            });
        } else {
            elementArr = dataArr;
            Object.assign(elementArr, { images: imgArr });
        }

        setDataArr(elementArr);
    }, [imgArr, JSON.stringify(dataArr)]);

    useEffect(() => {
        if (acDesc != "Begin") {
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
    }, [acDesc]);

    return (
        <>
            <div className="relative border-b border-neutral-00">
                {console.log(
                    "imageOrVideo ",
                    imageOrVideo,
                    showData,
                    headline1Display,
                    headline2Display,
                    carouselStatus,
                    dataArr,
                )}

                {/* Slider Info  */}
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
                        {!showData && (
                            <div className="mb-4 last:mb-0">
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
                                                    {dataArr.images &&
                                                        dataArr.images.length > 0 &&
                                                        dataArr.images.map((acValue, index) => {
                                                            return (
                                                                <Draggable
                                                                    key={`item-${acValue.srno}`}
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
                                                                                <div className="flex flex-col">
                                                                                    <p
                                                                                        onClick={() => {
                                                                                            viewBanner(index);
                                                                                        }}
                                                                                    >
                                                                                        <span className="material-symbols-outlined ml-3">
                                                                                            visibility
                                                                                        </span>
                                                                                    </p>
                                                                                    <p
                                                                                        onClick={() => {
                                                                                            editData(acValue);
                                                                                        }}
                                                                                    >
                                                                                        <span className="material-icons-outlined ml-3">
                                                                                            mode_edit
                                                                                        </span>
                                                                                    </p>
                                                                                    <p
                                                                                        onClick={() => {
                                                                                            deleteData(acValue);
                                                                                        }}
                                                                                    >
                                                                                        <span className="material-icons-outlined ml-3 text-red">
                                                                                            delete
                                                                                        </span>
                                                                                    </p>
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
                                (dataArr.images && dataArr.images.length < 1)) && (
                                <>
                                    <div className="mb-3 text-center last:mb-0">
                                        <button
                                            className="btn bg-indigo-500 hover:bg-indigo-600 text-white mt-2"
                                            onClick={() => {
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
                                        deleteImage={() => {
                                            onElementIconImageChange('')
                                        }}
                                        // onChange={onElementIconImageChange}
                                        edibtn={true}
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
                                                deleteImage={() => {
                                                    onElementImageChange('')
                                                }}
                                                // onChange={onElementImageChange}
                                                edibtn={true}
                                                url={imageURL}
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
                                                    OpenImageModel={OpenImageModel}
                                                    from={"Element Full Slider"}
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
                                        <div className="mb-4 last:mb-0">
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
                                        </div>
                                        <div className="mb-4 last:mb-0">
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
                                        </div>

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
                                                    onChange={(event) => {
                                                        if (event.target.checked) setHeadline1Display(true);
                                                        else {
                                                            setHeadline1Display(false);
                                                        }
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
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="w-11 grow px-2 py-1 inline-flex items-center justify-center text-sm bg-[#F1F5F9] border border-neutral-300 border-r-0 outline-none focus:ring-0"
                                                            >
                                                                <span className="font-semibold">X</span>
                                                            </a>
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
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="w-11 grow px-2 py-1 inline-flex items-center justify-center text-sm bg-[#F1F5F9] border border-neutral-300 border-r-0 outline-none focus:ring-0"
                                                            >
                                                                <span className="font-semibold">Y</span>
                                                            </a>
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

                                            {/* <div className="mb-4 last:mb-0">
                                        <label htmlFor="" className="mb-1 block text-sm">Headline1 Margin (T R B L)</label>
                                        <div className="flex flex-wrap">
                                            <select onChange={changeTopMargin} value={topMargin} className="grow h-9 mr-2 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                                <option value="">None</option>
                                                {helper.generateRange(-100, 202).map((value, index) => 
                                                            {
                                                                return <option value={value}>{value}</option>
                                                            }
                                                    )}
                                            </select>
                                            <select onChange={changeRightMargin} value={rightMargin} className="grow h-9 mr-2 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                                <option value="">None</option>
                                                {helper.generateRange(-100, 202).map((value, index) => 
                                                            {
                                                                return <option value={value}>{value}</option>
                                                            }
                                                    )}
                                            </select>
                                            <select onChange={changeBottomMargin} value={bottomMargin} className="grow h-9 mr-2 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                                <option value="">None</option>
                                                {helper.generateRange(-100, 202).map((value, index) => 
                                                            {
                                                                return <option value={value}>{value}</option>
                                                            }
                                                    )}
                                            </select>
                                            <select onChange={changeLeftMargin} value={leftMargin} className="grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                                <option value="">None</option>
                                                {helper.generateRange(-100, 202).map((value, index) => 
                                                        {
                                                            return <option value={value}>{value}</option>
                                                        }
                                                )}
                                            </select>
                                        </div>
                                    </div>


                                    <div className="mb-4 last:mb-0">
                                        <label htmlFor="" className="mb-1 block text-sm">Headline1 Padding (T R B L)</label>
                                        <div className="flex flex-wrap">
                                            <select onChange={changeTopPadding} value={topPadding} className="grow h-9 mr-2 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                                <option value="">None</option>
                                                {helper.generateRange(-100, 202).map((value, index) => 
                                                            {
                                                                return <option value={value}>{value}</option>
                                                            }
                                                    )}
                                            </select>
                                            <select onChange={changeRightPadding} value={rightPadding} className="grow h-9 mr-2 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                                <option value="">None</option>
                                                {helper.generateRange(-100, 202).map((value, index) => 
                                                            {
                                                                return <option value={value}>{value}</option>
                                                            }
                                                    )}
                                            </select>
                                            <select onChange={changeBottomPadding} value={bottomPadding} className="grow mr-2 h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                                <option value="">None</option>
                                                {helper.generateRange(-100, 202).map((value, index) => 
                                                            {
                                                                return <option value={value}>{value}</option>
                                                            }
                                                    )}
                                            </select>
                                            <select onChange={changeLeftPadding} value={leftPadding} className="grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                                <option value="">None</option>
                                                {helper.generateRange(-100, 202).map((value, index) => 
                                                        {
                                                            return <option value={value}>{value}</option>
                                                        }
                                                )}
                                            </select>
                                        </div>
                                    </div>  */}
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
                                                    onChange={(event) => {
                                                        if (event.target.checked) setHeadline2Display(true);
                                                        else setHeadline2Display(false);
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

                                            <TextStyleElement
                                                {...props}
                                                variable="Headline1"
                                                changeFontFamily={changeFontFamily1}
                                                btnStyle={btnStyle}
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
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="w-11 grow px-2 py-1 inline-flex items-center justify-center text-sm bg-[#F1F5F9] border border-neutral-300 border-r-0 outline-none focus:ring-0"
                                                            >
                                                                <span className="font-semibold">X</span>
                                                            </a>
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
                                                            <a
                                                                href="javascript:void(0);"
                                                                className="w-11 grow px-2 py-1 inline-flex items-center justify-center text-sm bg-[#F1F5F9] border border-neutral-300 border-r-0 outline-none focus:ring-0"
                                                            >
                                                                <span className="font-semibold">Y</span>
                                                            </a>
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

                                            {/* <div className="mb-4 last:mb-0">
                                        <label htmlFor="" className="mb-1 block text-sm">Headline2 Margin (T R B L)</label>
                                        <div className="flex flex-wrap">
                                            <select onChange={changeTopMargin1} value={topMargin1} className="grow h-9 mr-2 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                                <option value="">None</option>
                                                {helper.generateRange(-100, 202).map((value, index) => 
                                                            {
                                                                return <option value={value}>{value}</option>
                                                            }
                                                    )}
                                            </select>
                                            <select onChange={changeRightMargin1} value={rightMargin1} className="grow h-9 mr-2 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                                <option value="">None</option>
                                                {helper.generateRange(-100, 202).map((value, index) => 
                                                            {
                                                                return <option value={value}>{value}</option>
                                                            }
                                                    )}
                                            </select>
                                            <select onChange={changeBottomMargin1} value={bottomMargin1} className="grow h-9 mr-2 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                                <option value="">None</option>
                                                {helper.generateRange(-100, 202).map((value, index) => 
                                                            {
                                                                return <option value={value}>{value}</option>
                                                            }
                                                    )}
                                            </select>
                                            <select onChange={changeLeftMargin1} value={leftMargin1} className="grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                                <option value="">None</option>
                                                {helper.generateRange(-100, 202).map((value, index) => 
                                                        {
                                                            return <option value={value}>{value}</option>
                                                        }
                                                )}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="mb-4 last:mb-0">
                                        <label htmlFor="" className="mb-1 block text-sm">Headline2 Padding (T R B L)</label>
                                        <div className="flex flex-wrap">
                                        <select onChange={changeTopPadding1} value={topPadding1} className="grow h-9 mr-2 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                                <option value="">None</option>
                                                {helper.generateRange(-100, 202).map((value, index) => 
                                                            {
                                                                return <option value={value}>{value}</option>
                                                            }
                                                    )}
                                            </select>
                                            <select onChange={changeRightPadding1} value={rightPadding1} className="grow h-9 mr-2 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                                <option value="">None</option>
                                                {helper.generateRange(-100, 202).map((value, index) => 
                                                            {
                                                                return <option value={value}>{value}</option>
                                                            }
                                                    )}
                                            </select>
                                            <select onChange={changeBottomPadding1} value={bottomPadding1} className="grow h-9 mr-2 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                                <option value="">None</option>
                                                {helper.generateRange(-100, 202).map((value, index) => 
                                                            {
                                                                return <option value={value}>{value}</option>
                                                            }
                                                    )}
                                            </select>
                                            <select onChange={changeLeftPadding1} value={leftPadding1} className="grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                                <option value="">None</option>
                                                {helper.generateRange(-100, 202).map((value, index) => 
                                                        {
                                                            return <option value={value}>{value}</option>
                                                        }
                                                )}
                                            </select>
                                        </div>
                                    </div>  */}

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
                                                    id={`showDescriptionDisplay`}
                                                    defaultValue={showDescriptionDisplay}
                                                    onChange={(event) => {
                                                        if (event.target.checked)
                                                            setDescriptionDisplay(true);
                                                        else {
                                                            setDescriptionDisplay(false);
                                                        }
                                                    }}
                                                    name={`showDescriptionDisplay`}
                                                    on={"On"}
                                                    off={"Off"}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {descriptionDisplay && (
                                    <>
                                        <div className="sub-section-display">
                                            <div className="mb-3">
                                                <div className="flex justify-between items-center mb-1">
                                                    <div className="">Description </div>
                                                </div>
                                                <div className="text-center relative overflow-hidden">
                                                    {editor}
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
                                                    onChange={(event) => {
                                                        if (event.target.checked) setBtnDisplay("Yes");
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
                                    className={`btn-extra-info ${btnDisplay == "Yes" ? "" : "hidden"}`}
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
                                    <TextStyleElement
                                        {...props}
                                        variable={bgPropertyName}
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
                                        fontFamily={fontFamily}
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
                                                    <a
                                                        href="javascript:void(0);"
                                                        className="w-11 grow px-2 py-1 inline-flex items-center justify-center text-sm bg-[#F1F5F9] border border-neutral-300 border-r-0 outline-none focus:ring-0"
                                                    >
                                                        <span className="font-semibold">X</span>
                                                    </a>
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
                                                    <a
                                                        href="javascript:void(0);"
                                                        className="w-11 grow px-2 py-1 inline-flex items-center justify-center text-sm bg-[#F1F5F9] border border-neutral-300 border-r-0 outline-none focus:ring-0"
                                                    >
                                                        <span className="font-semibold">Y</span>
                                                    </a>
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

                                    {/* <div className="mb-4 last:mb-0">
                                <label htmlFor="" className="mb-1 block text-sm">Button Margin (T R B L)</label>
                                <div className="flex flex-wrap">
                                    <select onChange={changeBtnTopMargin} value={btnTopMargin} className="grow h-9 mr-2 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                        <option value="">None</option>
                                        {helper.generateRange(-100, 202).map((value, index) => 
                                                    {
                                                        return <option value={value}>{value}</option>
                                                    }
                                            )}
                                    </select>
                                    <select onChange={changeBtnRightMargin} value={btnRightMargin} className="grow h-9 mr-2 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                        <option value="">None</option>
                                        {helper.generateRange(-100, 202).map((value, index) => 
                                                    {
                                                        return <option value={value}>{value}</option>
                                                    }
                                            )}
                                    </select>
                                    <select onChange={changeBtnBottomMargin} value={btnBottomMargin} className="grow h-9 mr-2 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                        <option value="">None</option>
                                        {helper.generateRange(-100, 202).map((value, index) => 
                                                    {
                                                        return <option value={value}>{value}</option>
                                                    }
                                            )}
                                    </select>
                                    <select onChange={changeBtnLeftMargin} value={btnLeftMargin} className="grow h-9 mr-2 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                        <option value="">None</option>
                                        {helper.generateRange(-100, 202).map((value, index) => 
                                                {
                                                    return <option value={value}>{value}</option>
                                                }
                                        )}
                                    </select>
                                </div>
                            </div>

                            <div className="mb-4 last:mb-0">
                                <label htmlFor="" className="mb-1 block text-sm">Button Padding (T R B L)</label>
                                <div className="flex flex-wrap">
                                    <select onChange={changeBtnTopPadding} value={btnTopPadding} className="grow h-9 mr-2 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                        <option value="">None</option>
                                        {helper.generateRange(-100, 202).map((value, index) => 
                                                    {
                                                        return <option value={value}>{value}</option>
                                                    }
                                            )}
                                    </select>
                                    <select onChange={changeBtnRightPadding} value={btnRightPadding} className="grow h-9 mr-2 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                        <option value="">None</option>
                                        {helper.generateRange(-100, 202).map((value, index) => 
                                                    {
                                                        return <option value={value}>{value}</option>
                                                    }
                                            )}
                                    </select>
                                    <select onChange={changeBtnBottomPadding} value={btnBottomPadding} className="grow h-9 mr-2 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                        <option value="">None</option>
                                        {helper.generateRange(-100, 202).map((value, index) => 
                                                    {
                                                        return <option value={value}>{value}</option>
                                                    }
                                            )}
                                    </select>
                                    <select onChange={changeBtnLeftPadding} value={btnLeftPadding} className="grow h-9 mr-2 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                        <option value="">None</option>
                                        {helper.generateRange(-100, 202).map((value, index) => 
                                                {
                                                    return <option value={value}>{value}</option>
                                                }
                                        )}
                                    </select>
                                </div>
                            </div>    */}
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
                                                Open link in new window
                                            </label>
                                            <div className="flex items-center">
                                                <div className="w-16 relative">
                                                    <input
                                                        onChange={changeLinkTarget}
                                                        type="checkbox"
                                                        id="new-window-link"
                                                        x-model="checked"
                                                        checked={btnLinkWindow == "_blank" ? "checked" : ""}
                                                    />
                                                    {/* <label className="text-gray-500 lef text-center h-7 cursor-pointer flex items-center justify-center rounded leading-5 bg-green-600 bg-slate-600 hidden" for="new-window-link"> 
                                                        <span className="bg-white shadow-sm w-6 h-6 transition-all absolute rounded left-0.5" aria-hidden="true"></span> 
                                                        <span className="text-white text-xs inline-block absolute right-2 opacity-0 opacity-100" x-text="checked ? 'ON' : 'OFF'">OFF</span> 
                                                        <span className="text-white text-xs inline-block absolute left-2 opacity-1 opacity-0" x-text="checked ? 'ON' : 'OFF'">OFF</span> 
                                                    </label>  */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-4 last:mb-0">
                                        <label for="" className="mb-1 block text-sm">
                                            Link Type
                                        </label>
                                        <label className="flex items-center" for="no-follow-link_1">
                                            <input
                                                onChange={changeLinkFollow}
                                                type="checkbox"
                                                id="no-follow-link_1"
                                                className="form-checkbox"
                                                checked={btnLinkFollow == "nofollow" ? "checked" : ""}
                                            />
                                            <span className="text-sm font-medium ml-2">
                                                No Follow
                                            </span>
                                        </label>
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

                        <div className="mb-3">
                            <div className="flex items-center justify-between">
                                <div className="font-semibold">Carousel Controls</div>
                                <div className="flex items-center">
                                    <div className="w-16 relative">
                                        <ToggleButton
                                            id={`carouselStatus`}
                                            defaultValue={carouselStatus}
                                            onChange={changeCarouselStatus}
                                            name={`carouselStatus`}
                                            on={"On"}
                                            off={"Off"}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {carouselStatus == "On" && (
                            <>
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

export default ElementFullSlider;
