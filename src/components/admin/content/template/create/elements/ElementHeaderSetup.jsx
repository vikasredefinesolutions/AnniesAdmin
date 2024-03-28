import React, { useState } from "react";
import { useFormikContext } from "formik";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { optionForHeaderIcon, CmdBackgroundColorObj } from "global/Enum";
import { HeaderIconSetting } from "dummy/Dummy";
import Transition from "utils/Transition";

import header1 from "assets/images/svgImages/header-3.svg";
import header2 from "assets/images/svgImages/header-4.svg";
import header3 from "assets/images/svgImages/header-5.svg";
import header4 from "assets/images/svgImages/header-6.svg";
import header5 from "assets/images/svgImages/header-7.svg";
import header6 from "assets/images/svgImages/header-3.svg";
import header7 from "assets/images/svgImages/header-4.svg";
import header8 from "assets/images/svgImages/header-5.svg";
import header9 from "assets/images/svgImages/header-6.svg";
import header10 from "assets/images/svgImages/header-7.svg";

import Radiobutton from "components/common/formComponent/RadioButtonGroup";
import ImageFile from "components/common/formComponent/ImageFile";
import Dropdown from "components/common/formComponent/Dropdown";
import FormCkEditor from "components/common/formComponent/CKEditor";
import ColorPicker from "components/common/formComponent/ColorPicker";
import Checkbox from "components/common/formComponent/Checkbox";

const ElementHeaderSetup = ({ values, setFieldValue }) => {
    const [showHide, setShowHide] = useState({ isVisible: false, whichRow: 0 });

    const [showInnerElem, setshowInnerElem] = useState({
        isVisible: false,
        whichRow: 0,
    });

    const onChangeLayout = (layout) => {
        setFieldValue("template_Id", layout);
    };

    return (
        <>
            <div className="relative border-b border-neutral-00">
                <button
                    type="button"
                    onClick={() => {
                        setShowHide((prevData) => ({
                            isVisible: prevData.whichRow === 0 ? !prevData.isVisible : true,
                            whichRow: 0,
                        }));
                    }}
                    className="flex w-full flex-wrap justify-between items-center text-sm px-3 py-4 bg-white border-0 font-bold"
                >
                    <span>{"Header"}</span>
                    <span className="material-icons-outlined">expand_more</span>
                </button>

                <div
                    className={`property-content bg-white border-y border-b-0 border-neutral-200 ${showHide.isVisible && showHide.whichRow === 0 ? "" : "hidden"}`}
                >
                    <div className="py-4 px-3">
                        {/* Layout Properties  */}
                        <div className="last:mb-0 flex flex-wrap justify-between items-center">
                            <label htmlFor="" className="mb-1 block text-sm font-bold">
                                Layout Select
                            </label>
                            <div className="grid grid-cols-3 gap-2 mb-5">
                                <div
                                    className={`border-2 rounded-md overflow-hidden focus:ring-indigo-500 focus:border-indigo-500 ${values?.template_Id == 1 ? "border-blue-500" : "border-gray-300"}`}
                                    onClick={onChangeLayout.bind(null, "1")}
                                >
                                    <img alt="" src={header1} />
                                </div>
                                <div
                                    className={`border-2 rounded-md overflow-hidden focus:ring-indigo-500 focus:border-indigo-500 ${values?.template_Id == 2 ? "border-blue-500" : "border-gray-300"}`}
                                    onClick={onChangeLayout.bind(null, "2")}
                                >
                                    <img alt="" src={header2} />
                                </div>
                                <div
                                    className={`border-2 rounded-md overflow-hidden focus:ring-indigo-500 focus:border-indigo-500 ${values?.template_Id == 3 ? "border-blue-500" : "border-gray-300"}`}
                                    onClick={onChangeLayout.bind(null, "3")}
                                >
                                    <img alt="" src={header3} />
                                </div>
                                <div
                                    className={`border-2 rounded-md overflow-hidden focus:ring-indigo-500 focus:border-indigo-500 ${values?.template_Id == 4 ? "border-blue-500" : "border-gray-300"}`}
                                    onClick={onChangeLayout.bind(null, "4")}
                                >
                                    <img alt="" src={header4} />
                                </div>
                                <div
                                    className={`border-2 rounded-md overflow-hidden focus:ring-indigo-500 focus:border-indigo-500 ${values?.template_Id == 5 ? "border-blue-500" : "border-gray-300"}`}
                                    onClick={onChangeLayout.bind(null, "5")}
                                >
                                    <img alt="" src={header5} />
                                </div>

                                <div
                                    className={`border-2 rounded-md overflow-hidden focus:ring-indigo-500 focus:border-indigo-500 ${values?.template_Id == 6 ? "border-blue-500" : "border-gray-300"}`}
                                    onClick={onChangeLayout.bind(null, "6")}
                                >
                                    <img alt="" src={header6} />
                                </div>
                                <div
                                    className={`border-2 rounded-md overflow-hidden focus:ring-indigo-500 focus:border-indigo-500 ${values?.template_Id == 7 ? "border-blue-500" : "border-gray-300"}`}
                                    onClick={onChangeLayout.bind(null, "7")}
                                >
                                    <img alt="" src={header7} />
                                </div>
                                <div
                                    className={`border-2 rounded-md overflow-hidden focus:ring-indigo-500 focus:border-indigo-500 ${values?.template_Id == 8 ? "border-blue-500" : "border-gray-300"}`}
                                    onClick={onChangeLayout.bind(null, "8")}
                                >
                                    <img alt="" src={header8} />
                                </div>
                                <div
                                    className={`border-2 rounded-md overflow-hidden focus:ring-indigo-500 focus:border-indigo-500 ${values?.template_Id == 9 ? "border-blue-500" : "border-gray-300"}`}
                                    onClick={onChangeLayout.bind(null, "9")}
                                >
                                    <img alt="" src={header9} />
                                </div>
                                <div
                                    className={`border-2 rounded-md overflow-hidden focus:ring-indigo-500 focus:border-indigo-500 ${values?.template_Id == 10 ? "border-blue-500" : "border-gray-300"}`}
                                    onClick={onChangeLayout.bind(null, "10")}
                                >
                                    <img alt="" src={header10} />
                                </div>
                            </div>
                        </div>

                        {/* Color (BG and Text) Properties  */}
                        <div className="">
                            <div className="mb-4 last:mb-0 flex flex-wrap flex-col justify-between border-t border-gray-300 pt-4">
                                <label className="block text-sm font-bold mb-1">
                                    {" "}
                                    Header Bg color{" "}
                                </label>
                                <div className="flex flex-wrap">
                                    <ColorPicker
                                        name="header_bg_color"
                                        changeBackgroundColor={(color) => {
                                            setFieldValue("header_bg_color", color.hex);
                                        }}
                                        value={values?.header_bg_color}
                                    />
                                </div>
                                <div className="mt-6 mb-6">
                                    <label className="text-gray-500 inline-flex items-center">
                                        <Checkbox
                                            name="header_transparent"
                                            label="Is Header Transparent"
                                            id="header_transparent"
                                            checked={
                                                values?.header_transparent == true ? true : false
                                            }
                                            onChange={(e) => {
                                                setFieldValue("header_transparent", e.target.checked);
                                            }}
                                        />
                                    </label>
                                </div>
                            </div>
                            <div className="mb-4 last:mb-0 flex flex-wrap flex-col justify-between border-t border-gray-300 pt-4">
                                <label className="block text-sm font-bold mb-1">
                                    {" "}
                                    Header Text color{" "}
                                </label>
                                <div className="flex flex-wrap">
                                    <ColorPicker
                                        name="header_text_color"
                                        value={values?.header_text_color}
                                        changeBackgroundColor={(color) => {
                                            setFieldValue("header_text_color", color.hex);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Header Icons Settings */}
                        <div>
                            <HeaderIconsSetting
                                setFieldValue={setFieldValue}
                                values={values}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative border-b border-neutral-00">
                <button
                    type="button"
                    onClick={() => {
                        setShowHide((prevData) => ({
                            isVisible: prevData.whichRow === 1 ? !prevData.isVisible : true,
                            whichRow: 1,
                        }));
                    }}
                    className="flex w-full flex-wrap justify-between items-center text-sm px-3 py-4 bg-white border-0 font-bold"
                >
                    <span>{"Announcement"}</span>
                    <span className="material-icons-outlined">expand_more</span>
                </button>

                <div
                    className={`property-content bg-white border-y border-b-0 border-neutral-200 ${showHide.isVisible && showHide.whichRow === 1 ? "" : "hidden"}`}
                >
                    <div className="py-4 px-3">
                        <div className={`flex relative -ml-6`}>
                            <div className="relative w-full px-4">
                                <button
                                    onClick={() =>
                                        setshowInnerElem((prevData) => ({
                                            isVisible:
                                                prevData.whichRow === 0 ? !prevData.isVisible : true,
                                            whichRow: 0,
                                        }))
                                    }
                                    type="button"
                                    className="flex w-full flex-wrap justify-between items-center text-sm px-3 py-4 bg-white border-0 font-medium"
                                >
                                    <span className="ml-1">{`Announcement row 1`}</span>
                                    <span className="material-icons-outlined">
                                        {showInnerElem.isVisible && showInnerElem.whichRow === 0
                                            ? "expand_less"
                                            : "expand_more"}
                                    </span>
                                </button>
                                <Transition
                                    className="bg-white border-y border-b-0 border-neutral-200 overflow-visible"
                                    show={
                                        showInnerElem.isVisible && showInnerElem.whichRow === 0
                                            ? true
                                            : false
                                    }
                                    tag="div"
                                    enter="transition ease-out duration-200 transform"
                                    enterStart="opacity-0 -translate-y-2"
                                    enterEnd="opacity-100 translate-y-0"
                                    leave="transition ease-out duration-200"
                                    leaveStart="opacity-100"
                                    leaveEnd="opacity-0"
                                >
                                    <div className="text-sm m-1">
                                        {showInnerElem.isVisible &&
                                            showInnerElem.whichRow === 0 && (
                                                <div className="bg-white py-4 px-3">
                                                    {/* Left Side Promotianal Text */}
                                                    <div>
                                                        <label className="text-sm mb-1 flex flex-wrap font-bold">
                                                            <span>Left Side Promotional Text</span>
                                                        </label>
                                                        <FormCkEditor
                                                            id={`announcementRow[0]["leftSideText"]`}
                                                            name={`someName`}
                                                            defaultValue={
                                                                values.announcementRow[0].leftSideText
                                                            }
                                                            onChange={(value) => {
                                                                setFieldValue(
                                                                    `announcementRow[0]["leftSideText"]`,
                                                                    value,
                                                                );
                                                            }}
                                                            type="simple"
                                                        />
                                                    </div>

                                                    {/* Right Side Promotianal Text */}
                                                    <div>
                                                        <label className="text-sm mb-1 flex flex-wrap font-bold">
                                                            <span>Right Side Contact Details</span>
                                                        </label>
                                                        <FormCkEditor
                                                            id={`announcementRow[0]["rightSideText"]`}
                                                            name={`announcementRow[0]["rightSideText"]`}
                                                            defaultValue={
                                                                values.announcementRow[0].rightSideText
                                                            }
                                                            onChange={(value) => {
                                                                setFieldValue(
                                                                    `announcementRow[0]["rightSideText"]`,
                                                                    value,
                                                                );
                                                            }}
                                                            type="simple"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="text-sm mb-1 flex flex-wrap font-bold">
                                                            <span>Background Color</span>
                                                        </label>
                                                        <Dropdown
                                                            isMulti={false}
                                                            defaultValue={
                                                                values?.announcementRow[0]["backgroundColor"]
                                                                    ? values?.announcementRow[0][
                                                                    "backgroundColor"
                                                                    ]
                                                                    : ""
                                                            }
                                                            name={`announcementRow[0]["backgroundColor"]`}
                                                            options={CmdBackgroundColorObj}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                    </div>
                                </Transition>
                            </div>

                            <div className="text-center flex justify-between items-center absolute top-4 right-0">
                                <button
                                    type="button"
                                    className="inline-block leading-none w-6 h-6"
                                    onClick={() => {
                                        setFieldValue(
                                            `announcementRow[0].isVisible`,
                                            !values?.announcementRow[0]?.isVisible,
                                        );
                                    }}
                                >
                                    <span className="material-icons-outlined text-base">
                                        {values?.announcementRow[0]?.isVisible
                                            ? "visibility_off"
                                            : "visibility"}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className={`property-content bg-white border-y border-b-0 border-neutral-200 ${showHide.isVisible && showHide.whichRow === 1 ? "" : "hidden"}`}
                >
                    <div className="py-4 px-3">
                        <div className={`flex relative -ml-6`}>
                            <div className="relative w-full px-4">
                                <button
                                    onClick={() =>
                                        setshowInnerElem((prevData) => ({
                                            isVisible:
                                                prevData.whichRow === 1 ? !prevData.isVisible : true,
                                            whichRow: 1,
                                        }))
                                    }
                                    type="button"
                                    className="flex w-full flex-wrap justify-between items-center text-sm px-3 py-4 bg-white border-0 font-medium"
                                >
                                    <span className="ml-1">{`Announcement row 2`}</span>
                                    <span className="material-icons-outlined">
                                        {showInnerElem.isVisible && showInnerElem.whichRow === 1
                                            ? "expand_less"
                                            : "expand_more"}
                                    </span>
                                </button>
                                <Transition
                                    className="bg-white border-y border-b-0 border-neutral-200 overflow-visible"
                                    show={
                                        showInnerElem.isVisible && showInnerElem.whichRow === 1
                                            ? true
                                            : false
                                    }
                                    tag="div"
                                    enter="transition ease-out duration-200 transform"
                                    enterStart="opacity-0 -translate-y-2"
                                    enterEnd="opacity-100 translate-y-0"
                                    leave="transition ease-out duration-200"
                                    leaveStart="opacity-100"
                                    leaveEnd="opacity-0"
                                >
                                    <div className="text-sm m-1">
                                        {showInnerElem.isVisible &&
                                            showInnerElem.whichRow === 1 && (
                                                <div className="bg-white py-4 px-3">
                                                    {/* Left Side Promotianal Text */}
                                                    <div className="mt-2">
                                                        <label className="text-sm mb-1 flex flex-wrap font-bold">
                                                            <span>Left Side Promotianal Text</span>
                                                        </label>
                                                        <FormCkEditor
                                                            id={`announcementRow[1]["leftSideText"]`}
                                                            name={`announcementRow[1]["leftSideText"]`}
                                                            defaultValue={
                                                                values.announcementRow[1].leftSideText
                                                            }
                                                            onChange={(value) => {
                                                                setFieldValue(
                                                                    `announcementRow[1]["leftSideText"]`,
                                                                    value,
                                                                );
                                                            }}
                                                        />
                                                    </div>

                                                    {/* Right Side Promotianal Text */}
                                                    <div className="mt-2">
                                                        <label className="text-sm mb-1 flex flex-wrap font-bold">
                                                            <span>Right Side Contact Details</span>
                                                        </label>
                                                        <FormCkEditor
                                                            id={`announcementRow[1]["rightSideText"]`}
                                                            name={`announcementRow[1]["rightSideText"]`}
                                                            defaultValue={
                                                                values.announcementRow[1].rightSideText
                                                            }
                                                            onChange={(value) => {
                                                                setFieldValue(
                                                                    `announcementRow[1]["rightSideText"]`,
                                                                    value,
                                                                );
                                                            }}
                                                        />
                                                    </div>

                                                    <div className="mt-2">
                                                        <label className="text-sm mb-1 flex flex-wrap font-bold">
                                                            <span>Background Color</span>
                                                        </label>

                                                        <ColorPicker
                                                            name={`announcementRow[1]["backgroundColor"]`}
                                                            value={values?.announcementRow[1].backgroundColor}
                                                            transformCss={`-translate-y-[350px] -translate-x-[20px]`}
                                                        />
                                                    </div>

                                                    <div className="mt-6 ">
                                                        <label className="text-sm mb-1 flex flex-wrap font-bold">
                                                            <span>Text Color</span>
                                                        </label>

                                                        <ColorPicker
                                                            maxLength={12}
                                                            isDisabled={true}
                                                            defaultValue={values.hexCode}
                                                            name={`announcementRow[${1}]["textColor"]`}
                                                            value={values?.announcementRow[1].textColor}
                                                            transformCss={`-translate-y-[350px] -translate-x-[20px]`}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                    </div>
                                </Transition>
                            </div>

                            <div className="text-center flex justify-between items-center absolute top-4 right-0">
                                <button
                                    type="button"
                                    className="inline-block leading-none w-6 h-6"
                                    onClick={() => {
                                        setFieldValue(
                                            `announcementRow[1].isVisible`,
                                            !values?.announcementRow[1]?.isVisible,
                                        );
                                    }}
                                >
                                    <span className="material-icons-outlined text-base">
                                        {values?.announcementRow[1]?.isVisible
                                            ? "visibility_off"
                                            : "visibility"}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ElementHeaderSetup;

const SingleSettingAttribute = ({
    attribute = {},
    index,
    show,
    setShow,
    initialValues,
    ...rest
}) => {
    const { id } = useParams();
    const CompanyName = useSelector((store) => store?.CompanyConfiguration.data);
    const { values, setFieldValue } = useFormikContext();
    const imagePath = `/${CompanyName}/content/headerimage/${id}/images/`;

    return (
        <>
            <div className="relative w-full px-4">
                <button
                    onClick={() =>
                        setShow(() => ({
                            isVisible: attribute.id !== show.isVisible ? attribute.id : "",
                            whichRow: index,
                        }))
                    }
                    type="button"
                    className="flex border-b border-neutral-200 w-full flex-wrap justify-between items-center text-sm px-3 py-4 bg-white border-0 font-medium"
                >
                    <span className="ml-1">{attribute?.label}</span>
                    <span className="material-icons-outlined">
                        {show.isVisible === attribute.id && show.whichRow === index
                            ? "expand_less"
                            : "expand_more"}
                    </span>
                </button>
                <Transition
                    className="bg-white border-y border-b-0 border-neutral-200 overflow-visible"
                    show={
                        show.isVisible === attribute.id && show.whichRow === index
                            ? true
                            : false
                    }
                    tag="div"
                    enter="transition ease-out duration-200 transform"
                    enterStart="opacity-0 -translate-y-2"
                    enterEnd="opacity-100 translate-y-0"
                    leave="transition ease-out duration-200"
                    leaveStart="opacity-100"
                    leaveEnd="opacity-0"
                >
                    <div className="text-sm m-1">
                        <div className="bg-white py-4 px-3">
                            {attribute?.components &&
                                attribute.components.map((value, index) => {
                                    const { ...Properties } = value;

                                    let imageUrl = `${value.name}['customimage']`;
                                    let fontAwesomeString = `${value.name}['fontawesome']`;

                                    const fieldName = value.name;
                                    const fontswasomestring =
                                        values && fieldName && values[fieldName]
                                            ? `${values[fieldName]["fontawesome"]}`
                                            : "";

                                    return (
                                        <div key={index}>
                                            <Radiobutton
                                                {...Properties}
                                                name={`${value.name}['iconType']`}
                                                key={index}
                                                initialValues={initialValues}
                                                {...rest}
                                            />

                                            <div className="my-2">
                                                {values[value.name]?.iconType == "customimage" ? (
                                                    <ImageFile
                                                        type="file"
                                                        className="sr-only"
                                                        name={imageUrl}
                                                        id={imageUrl}
                                                        buttonName="Add"
                                                        folderpath={imagePath}
                                                        onChange={(value) => {
                                                            setFieldValue(imageUrl, value);
                                                        }}
                                                        url={values[value.name]["customimage"]}
                                                        deleteImage={() => {
                                                            setFieldValue(imageUrl, '')
                                                        }}
                                                    />
                                                ) : (
                                                    <Dropdown
                                                        isMulti={false}
                                                        hidecheckbox={false}
                                                        defaultValue={fontswasomestring}
                                                        name={fontAwesomeString}
                                                        options={optionForHeaderIcon}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </Transition>
            </div>
        </>
    );
};

const HeaderIconsSetting = ({ setFieldValue, values }) => {
    const [show, setShow] = useState({
        isVisible: false,
        whichRow: 0,
    });

    return (
        <>
            <div className="w-full py-4">
                <label className="mb-2 block border-t border-gray-300 text-sm font-bold pt-4">
                    Header icon Setting{" "}
                </label>

                {HeaderIconSetting.map((singleHeaderIconObj, index) => {
                    return (
                        <div className="flex relative -ml-6" key={index}>
                            <SingleSettingAttribute
                                attribute={singleHeaderIconObj}
                                index={index}
                                show={show}
                                setShow={setShow}
                                setFieldValue={setFieldValue}
                                initialValues={{}}
                            />
                            <div className="text-center flex justify-between items-center absolute top-4 right-0">
                                <button
                                    type="button"
                                    className="inline-block leading-none w-6 h-6"
                                    onClick={() => {
                                        setFieldValue(
                                            singleHeaderIconObj.title,
                                            !values[singleHeaderIconObj.title],
                                        );
                                    }}
                                >
                                    <span className="material-icons-outlined text-base">
                                        {values[singleHeaderIconObj.title]
                                            ? "visibility_off"
                                            : "visibility"}
                                    </span>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};
