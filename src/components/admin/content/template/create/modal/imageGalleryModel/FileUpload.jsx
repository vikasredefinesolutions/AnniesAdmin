import React from "react";
import ImageFile from "components/admin/content/common/ImageFile";

const FileUpload = ({
    activeTab,
    folderpath,
    onElementImageChange,
    setOpenImageModel,
    ImageUploadName,
    ImageUploadId,
    ImageUrl,
    backProp,
}) => {
    return (
        <>
            <div className="px-4 pb-4 pt-4">
                <ImageFile
                    type="file"
                    className="sr-only"
                    name={ImageUploadName}
                    id={ImageUploadId}
                    buttonName="Select Image"
                    folderpath={folderpath}
                    setOpenImageModel={setOpenImageModel}
                    onChange={onElementImageChange}
                    UploadImage={activeTab == 1 ? true : false}
                    edibtn={true}
                    backProp={backProp}
                // url={ImageUrl}
                />
            </div>
        </>
    );
};

export default FileUpload;
