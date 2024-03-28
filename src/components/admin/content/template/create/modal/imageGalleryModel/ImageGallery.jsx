import Tabs from "components/common/Tabs";
import React from "react";
import { useState, useEffect } from "react";
import Messages from "components/common/alerts/messages/Index";
import ImageLibrary from "./ImageLibrary";
import UploadImage from "./FileUpload";

const ImageGallery = ({
    setOpenImageModel,
    OpenImageModel,
    folderpath,
    ImageUploadName,
    ImageUploadId,
    ImageUrl,
    onElementImageChange,
    backProp,
    from,
}) => {
    const [activeTab, setActiveTab] = useState(0);

    const onTabClick = (e, index) => {
        e.preventDefault();
        setActiveTab(index);
    };

    const componentsForm = {
        ImageLibrary: ImageLibrary,
        UploadImage: UploadImage,
    };

    const displayTabs = [
        {
            id: 0,
            label: "Image Library",
            value: "Image Library",
            componentname: "ImageLibrary",
        },
        {
            id: 1,
            label: "Upload Image",
            value: "Upload Image",
            componentname: "UploadImage",
        },
    ];

    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!OpenImageModel || keyCode !== 27) return;
            setOpenImageModel(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    });

    return (
        <>
            <div
                className="fixed inset-0 bg-slate-900 bg-opacity-30 z-30 transition-opacity"
                onClick={() => setOpenImageModel(false)}
            />
            <div className="fixed inset-0 z-30 overflow-hidden flex items-center my-4 justify-center transform px-4 sm:px-6 ">
                <div className="relative bg-white rounded shadow-lg overflow-auto max-w-[62vw] w-full h-full max-h-[82vh] z-30">
                    <div className="flex justify-between items-start p-5 rounded-t border-b sticky top-0 left-0 bg-white z-40">
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                            data-modal-toggle="customerModal"
                            onClick={() => setOpenImageModel(false)}
                        >
                            <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    className="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                ></path>
                            </svg>
                        </button>
                    </div>

                    <div className="col-span-full xl:col-span-9">
                        {
                            <div className="w-full bg-white rounded-md mb-6">
                                <div className="sticky top-[62px] bg-white z-10">
                                    <Tabs
                                        options={displayTabs}
                                        activeTab={activeTab}
                                        setActiveTab={setActiveTab}
                                        onTabClick={onTabClick}
                                    />
                                </div>
                                <Messages />
                                <div className="w-full">
                                    <>
                                        {displayTabs.map((tab, index) => {
                                            const Component = componentsForm[tab.componentname];
                                            return (
                                                <div
                                                    className={`${index === activeTab ? "" : "hidden"
                                                        } w-full rounded-md tab-content text-sm`}
                                                    key={index}
                                                >
                                                    <Component
                                                        activeTab={activeTab}
                                                        index={index}
                                                        setActiveTab={setActiveTab}
                                                        folderpath={folderpath}
                                                        onElementImageChange={onElementImageChange}
                                                        setOpenImageModel={setOpenImageModel}
                                                        ImageUploadName={ImageUploadName}
                                                        ImageUploadId={ImageUploadId}
                                                        ImageUrl={ImageUrl}
                                                        backProp={backProp}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default ImageGallery;
