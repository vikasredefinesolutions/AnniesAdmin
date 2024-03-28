import React, { useState } from "react";
import { useEffect } from "react";

const FilePreview = ({ url }) => {
  const [fileType, setFileType] = useState(null);

  useEffect(() => {
    if (url) {
      const arr = url.split(".");
      const extension = arr[arr.length - 1].toLowerCase();
      if (["png", "jpg", "jpeg"].includes(extension)) {
        setFileType("image");
      } else if (["mp4", "ogg", "3gp", "mov", "wmv", "avi", "avchd", "flv", "f4v", "swf", "mkv", "webm"].includes(extension)) {
        setFileType("mp4");
      } else if (extension === "pdf") {
        setFileType("pdf");
      } else if (extension === "dst") {
        setFileType("dst");
      }
    }
  }, [url]);

  const renderPreview = (type) => {
    switch (type) {
      case "image":
        return <img src={url} className="w-full h-full object-contain" />;
      case "mp4":
        return <video className="w-3/5 h-full object-contain" controls autoplay loop preload="auto">
          <source src={url} type="video/mp4" />
          <source src={url} type="video/ogg" />
          <source src={url} type="video/webm" />
          <source src={url} type="video/3gp" />
          <source src={url} type="video/mkv" />
          <source src={url} type="video/mov" />
        </video>
      case "pdf":
        return <a className="text-blue-500" href={url} target="blank" > Open Pdf Link</a>;
      case 'dst':
        return (
          <a className="text-blue-500" href={url} target="blank"> Download Dst File</a>
        )
    }
  };
  return <>{fileType && renderPreview(fileType)}</>;
};

export default FilePreview;
