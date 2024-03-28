import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { ErrorMessage } from "formik";
import { v4 as uuidv4 } from "uuid";

import ImageUpload from "services/common/imageUpload/ImageUpload";

import FormErrorMessage from "components/common/alerts/FormErrorMessage";
import ImgeFileLoder from "components/common/ImgeFileLoder";

const ImageFile = ({ type, name, className, divClass, label, buttonName = "Add", folderpath, url = "", onChange, editOff, InnerCompo, id, fileSize = 5000114.441, svgImage = false, blogProductSection = false, checkImageDimensions = false, width = 0, height = 0, ...rest }) => {
  const AdminAppConfigReducers = useSelector((store) => store?.AdminAppConfigReducers);
  const permission = useSelector((store) => store.permission);

  const [message, setMessage] = useState(false);
  const [image, setImage] = useState("");
  const [UploadLoading, setUploadLoading] = useState(false);
  const [imageError, setImageError] = useState("");

  const ourRandomNum = useMemo(() => Math.random(5), [])

  useEffect(() => {
    if (url) {
      setImage(`${AdminAppConfigReducers["azure:BlobUrl"]}${url}`);
    }
  }, [url, AdminAppConfigReducers]);

  const imageSizeCheck = (currentFile, e) => {
    let img = new Image();
    let _URl = window.URL || window.webkitURL;

    img.src = _URl.createObjectURL(currentFile);

    img.onload = function () {
      const formData = new FormData();

      // if image width or height is not sufficient than this block will return true 
      // which means we need to stop further execution
      // and in that case show a message to user to upload a specific height or width image
      if (width >= this.width || height >= this.height || !checkImageDimensions) {

        const fileExt = currentFile?.name?.split(".");
        const currentExt = fileExt[fileExt.length - 1];

        const currentImagName = `${uuidv4()}.${currentExt}`;

        formData.append("files", e.target.files[0], currentImagName);
        formData.append("name", fileExt[0]);
        let FileExtension = fileExt.pop();
        if (
          svgImage === true
            ? ![
              "jpg",
              "jpeg",
              "png",
              "gif",
              "JPG",
              "JPEG",
              "PNG",
              "GIF",
              "svg",
            ].includes(FileExtension)
            : !["jpg", "jpeg", "png", "gif", "JPG", "JPEG", "PNG", "GIF"].includes(
              FileExtension
            )
        ) {
          if (svgImage === true) {
            return setImageError(
              "Please Select proper image type like jpg, jpeg, png, gif, svg."
            );
          } else {
            return setImageError(
              "Please Select proper image type like jpg, jpeg, png, gif."
            );
          }
        } else {
          setImageError("");
        }
        if (currentFile && currentFile?.size > fileSize) {
          setImageError("File size should not be greater then 5mb.");
        } else {
          setImageError("");
        }

        if (folderpath) {
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
        } else {

          if (e.target.files && e.target.files.length) {
            setImage(URL.createObjectURL(e.target.files[0]))
          }
        }
      } else {
        setMessage(`we accept logo under max width of 260 px or max height of 160px`);
        setImage("");
        onChange("")
      }
    }

    img.onerror = function () {
      setImage("");
    }

  }

  const upload = (e) => {
    const currentFile = e.target.files[0];
    imageSizeCheck(currentFile, e)
  };

  const deleteImage = (e) => {
    setImage("");
    if (onChange instanceof Function) {
      onChange("");
    }
  };

  return (
    <>
      {!blogProductSection && (
        <div className={`${rest.uprdivclass ? rest.uprdivclass : ""} col-span-full border-2 border-dashed border-neutral-200 rounded-xl shadow relative`}>
          <div
            className={`${divClass
              ? divClass
              : " w-full flex flex-wrap items-center h-56 bg-center bg-no-repeat bg-contain"
              }`}
            style={{ backgroundImage: `url(${image}${folderpath ? `?${ourRandomNum}` : ""})` }}
          >
            {UploadLoading ? (
              <ImgeFileLoder className={"absolute"} />
            ) : (
              <>
                <div className="w-full text-center justify-center inset-0">
                  <div>
                    {url !== null &&
                      url !== "" &&
                      url !== AdminAppConfigReducers["azure:BlobUrl"] ? (
                      <div className="absolute top-0 right-0 text-sm p-1 text-center items-center">
                        {false && (
                          <>
                            {!rest.disabled &&
                              (permission?.isEdit || permission?.isDelete) && (
                                <label
                                  htmlFor={name ? name : id || "myImage"}
                                  className="inline-block w-6 h-6 text-indigo-500 cursor-pointer"
                                >
                                  <span className="material-icons-outlined">
                                    edit
                                  </span>
                                </label>
                              )}
                          </>
                        )}
                        {!rest.disabled &&
                          (permission?.isEdit || permission?.isDelete) && (
                            <label
                              className="inline-block w-6 h-6 text-rose-500 cursor-pointer"
                              onClick={deleteImage}
                            >
                              <span className="material-icons-outlined">
                                delete
                              </span>
                            </label>
                          )}
                      </div>
                    ) : (
                      <>
                        {!rest.disabled &&
                          (permission?.isEdit || permission?.isDelete) && (
                            <label
                              htmlFor={name ? name : id || "myImage"}
                              className="btn bg-blue-500 text-white justify-center cursor-pointer"
                              style={{ backgroundColor: "#6366f1" }}
                            >
                              {image ? "Add New" : buttonName}
                            </label>
                          )}

                        {InnerCompo && <InnerCompo />}
                      </>
                    )}
                    <input
                      type="file"
                      name={name || "myImage"}
                      id={id ? id : name || "myImage"}
                      accept={`${svgImage === true
                        ? "image/png, image/gif, image/jpeg, image/svg+xml"
                        : "image/png, image/gif, image/jpeg"
                        }`}
                      {...rest}
                      onChange={upload}
                      className={`${className ? className : ""
                        } block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md`}
                    />
                  </div>

                  {name && (
                    <ErrorMessage name={name} component={FormErrorMessage} />
                  )}
                  {imageError && (
                    <FormErrorMessage>{imageError}</FormErrorMessage>
                  )}
                  {message && <FormErrorMessage>{message}</FormErrorMessage>}
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {blogProductSection && (
        <div>
          {url ? (
            <div className="flex">
              <img src={image} alt="img" width={120} height={120} />
              <label
                className="inline-block w-4 h-4 text-rose-500 cursor-pointer ml-1"
                onClick={deleteImage}
              >
                <span className="material-icons-outlined">delete</span>
              </label></div>

          ) : (
            <label
              htmlFor={name || "myImage"}
              className="btn bg-blue-500 text-white justify-center cursor-pointer"
              style={{ backgroundColor: "#6366f1" }}
            >
              {image ? "Add New" : buttonName}
            </label>
          )}

          <input
            type="file"
            name={name || "myImage"}
            id={id ? id : name || "myImage"}
            accept={`${svgImage === true
              ? "image/png, image/gif, image/jpeg, image/svg+xml"
              : "image/png, image/gif, image/jpeg"
              }`}
            {...rest}
            onChange={upload}
            className={`${className ? className : ""}
            // } block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md`}
          />
        </div>
      )}
    </>
  );
};

export default ImageFile;
