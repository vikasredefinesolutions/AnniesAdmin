import React, { useState, useEffect } from "react";
import { ErrorMessage } from "formik";
import FormErrorMessage from "components/common/alerts/FormErrorMessage";
import ImgeFileLoder from "components/common/ImgeFileLoder";
import ImageUpload from "services/common/imageUpload/ImageUpload";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import FilePreview from "./FilePreview";

const FileInput = ({
  type,
  name,
  className,
  divClass,
  label,
  buttonName = "Add",
  folderpath,
  url = null,
  onChange,
  id,
  acceptType,
  fileSize = 5000114.441, //in bytes
  ...rest
}) => {
  const permission = useSelector((store) => store.permission);
  const [message, setMessage] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const [UploadLoading, setUploadLoading] = useState(false);
  const AdminAppConfigReducers = useSelector(
    (store) => store?.AdminAppConfigReducers
  );
  const [imageError, setImageError] = useState("");

  useEffect(() => {
    if (url) {
      const arr = url.split(".");
      setFileUrl(`${AdminAppConfigReducers["azure:BlobUrl"]}${url}`);
    }
  }, [url]);

  const upload = (e) => {
    const formData = new FormData();
    const currentFile = e.target.files[0];
    const fileExt = currentFile?.name.split(".");
    const currentExt = fileExt[fileExt.length - 1];

    const currentImagName = `${uuidv4()}.${currentExt}`;

    formData.append("files", e.target.files[0], currentImagName);
    formData.append("name", fileExt[0]);

    if (currentFile && currentFile?.size > fileSize) {
      setImageError("File size should not be greater then 10mb.");
      return;
    } else {
      setImageError("");
    }
    setUploadLoading(true);

    ImageUpload.uploadImage(folderpath, formData)
      .then((response) => {
        if (response.data.success) {
          onChange(response.data.data);
          setMessage(false);
        } else {
          setMessage("File does't upload successfully");
        }
        setUploadLoading(false);
      })
      .catch((error) => {
        setMessage("File does't upload successfully");
        setUploadLoading(false);
      });
  };
  const deleteFile = (e) => {
    e.stopPropagation();
    setFileUrl(null);
    if (onChange instanceof Function) {
      onChange("");
    }
    return;
  };
  return (
    <>
      <div className="border-2 border-dashed border-neutral-200 rounded-xl shadow h-52">
        {UploadLoading ? (
          <div className="relative w-full h-full">
            <ImgeFileLoder className="absolute" />
          </div>
        ) : url !== null &&
          url !== "" &&
          url !== AdminAppConfigReducers["azure:BlobUrl"] ? (
          <div className="relative w-full h-full flex justify-center items-center">
            {!rest.disabled && (permission?.isEdit || permission?.isDelete) && (
              <div
                className="inline-block w-6 h-6 text-rose-500 cursor-pointer absolute top-0 right-0"
                onClick={deleteFile}
              >
                <span className="material-icons-outlined">delete</span>
              </div>
            )}
            <FilePreview url={fileUrl} />
          </div>
        ) : (
          <div className="h-full w-full flex justify-center items-center">
            {!rest.disabled && (permission?.isEdit || permission?.isDelete) && (
              <>
                <label
                  htmlFor={name}
                  className="btn bg-blue-500 text-white justify-center cursor-pointer"
                  style={{ backgroundColor: "#6366f1" }}
                >
                  {buttonName}
                </label>
                <input
                  type="file"
                  name={name}
                  id={name}
                  accept={acceptType}
                  {...rest}
                  onChange={upload}
                  className={`${className ? className : ""
                    } block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md`}
                />
              </>
            )}
          </div>
        )}

        {name && <ErrorMessage name={name} component={FormErrorMessage} />}
        {imageError && <FormErrorMessage>{imageError}</FormErrorMessage>}
        {message && <FormErrorMessage>{message}</FormErrorMessage>}
      </div>
    </>
  );
};

export default FileInput;
