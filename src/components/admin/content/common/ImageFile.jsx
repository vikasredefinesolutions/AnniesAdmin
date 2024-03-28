import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import ImageUpload from "services/common/imageUpload/ImageUpload";
import { getAssetsLibraryData } from "redux/tempData/tempDataAction";
import { v4 as uuid } from 'uuid';
import ImageFileLoader from "components/common/ImgeFileLoder";

const ImageFile = ({
  type,
  name,
  className,
  divClass,
  label,
  buttonName,
  folderpath,
  url,
  backProp,
  onChange = () => { },
  editOff,
  InnerCompo,
  edibtn,
  ModelOpen = false,
  UploadImage = false,
  setOpenImageModel,
  deleteImage = () => {},
  ...rest
}) => {
  const dispatch = useDispatch();
  const [UploadLoading, setUploadLoading] = useState(false)
  const AdminAppConfigReducers = useSelector((store) => store?.AdminAppConfigReducers);

  const [message, setMessage] = useState(false);
  const [image, setImage] = useState(`${url}`);
  const uid = uuid();

  useEffect(() => {
    setImage(`${url}`);
  }, [url, setImage, backProp]);

  const upload = async (e) => {
    if (e?.target?.files && e?.target?.files.length && e.target.files[0]?.name) {
      let ImageDataValue = e.target.files[0];
      let CheckMulti = ImageDataValue.name.split(".");
      let changedImageName = `${CheckMulti[0] + uid + "." + CheckMulti[1]}`

      const formData = new FormData();
      setUploadLoading(true)
      const res = await getAssetsLibraryData(`/${AdminAppConfigReducers["cdn:RootDirectory"]}${folderpath}${ImageDataValue.name}`, dispatch)

      if (res?.data?.data?.result?.length) {
        var blob = ImageDataValue.slice(0, ImageDataValue.size, ImageDataValue.type);
        var newFile = new File([blob], changedImageName, { type: ImageDataValue.type });
        formData.append("files", newFile);
      } else {
        formData.append("files", ImageDataValue);
      }

      // if (!res?.data?.data?.result?.length) {
      ImageUpload.uploadImage(folderpath, formData)
        .then(async (response) => {
          if (response.data.success === true) {
            if (response.data.data) {
              onChange(`${AdminAppConfigReducers["azure:BlobUrl"]}` + response.data.data);
              setImage(`${AdminAppConfigReducers["azure:BlobUrl"]}` + response.data.data);
              setMessage(false);
              setOpenImageModel(false);
            }
          } else {
            setMessage("File does't upload successfully");
          }
          setUploadLoading(false);
        })
        .catch((error) => {
          setMessage("File does't upload successfully");
          setUploadLoading(false)
          onChange("");
          setImage("");

        });
      // } else {
      //   setUploadLoading(false)
      //   onChange("");
      //   setImage("");
      //   setMessage("You can not upload same file again and again.");
      //   setCheckMultiImage(true);
      // }
    } else {
      setUploadLoading(false)
      onChange("");
      setImage("");
      setMessage("Please select a valid file.");
    }
  };


  ;
  // const deleteImage = () => {
  //   setImage("");
  //   if (onChange instanceof Function) {
  //     onChange("");
  //   }
  // };
  return (
    <>
      <div className="col-span-full border-2 border-dashed border-neutral-200 shadow relative">
        <div
          className={`${divClass ? divClass : " w-full flex flex-wrap items-center h-56 bg-center bg-no-repeat bg-contain"
            }`}
          style={{ backgroundImage: image !== '' ? `url("${image}?${Math.random(5)}")` : '' }}
        >
          {UploadLoading ? (
            <ImageFileLoader className={"absolute"} />
          ) : (
            <>
              <div className="w-full text-center justify-center inset-0">
                <div >
                  {(image !== '' && image !== `${process.env.REACT_APP_API_BLOB}`) ? (
                    <div className="absolute top-0 right-0 text-sm p-1 text-center items-center">
                      {(edibtn && ModelOpen) ? (
                        <>
                          <label
                            htmlFor={name}
                            className="inline-block w-6 h-6 text-indigo-500 cursor-pointer"
                          >
                            <span className="material-icons-outlined"
                              onClick={() => setOpenImageModel(true)}
                            >
                              edit
                            </span>
                          </label>
                        </>
                      ) : edibtn && (
                        <label
                          htmlFor={name}
                          className="inline-block w-6 h-6 text-indigo-500 cursor-pointer"
                        >
                          <span className="material-icons-outlined"
                          >
                            edit
                          </span>
                        </label>
                      )}
                      <label
                        className="inline-block w-6 h-6 text-rose-500 cursor-pointer"
                        onClick={deleteImage}
                      >
                        <span className="material-icons-outlined">delete</span>
                      </label>
                    </div>
                  ) : (
                    <>
                      {(buttonName && ModelOpen) ? (
                        <label
                          htmlFor={name}
                          className="btn bg-blue-500 text-white justify-center cursor-pointer"
                          style={{ backgroundColor: "#6366f1" }}
                          onClick={() => setOpenImageModel(true)}
                        >
                          {buttonName}
                        </label>
                      ) : buttonName && (
                        <label
                          htmlFor={name}
                          className="btn bg-blue-500 text-white justify-center cursor-pointer"
                          style={{ backgroundColor: "#6366f1" }}
                        >
                          {buttonName}
                        </label>
                      )
                      }
                      {InnerCompo && <InnerCompo />}
                    </>
                  )}
                  {UploadImage &&
                    <input
                      type="file"
                      name={name}
                      accept="image/png, image/gif, image/jpeg"
                      {...rest}
                      onChange={upload}
                      className={`${className ? className : ""
                        }  block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2`}
                    />
                  }
                </div>
                {message && <p>{message}</p>}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ImageFile;
