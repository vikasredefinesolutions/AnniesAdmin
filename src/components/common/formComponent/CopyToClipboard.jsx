import React, { useEffect } from "react";
import copy from "copy-to-clipboard";

const CopyToClipboard = ({ copyText, isCopied, setIsCopied }) => {
  const copyToClipboard = () => {
    copy(copyText);
    setIsCopied(copyText);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCopied("");
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex justify-center">
      <button
        className={"btn bg-indigo-400 hover:bg-indigo-500 text-white"}
        onClick={copyToClipboard}
      >
        <span className="material-icons-outlined">content_copy</span>
        <span>Click To Copy</span>
      </button>
      {copyText === isCopied && (
        <p className="absolute -top-6 text-xs font-medium border border-green-300 bg-green-100 text-green-600 rounded-md text-center px-2.5 py-1 w-28">
          Copied
        </p>
      )}
    </div>
  );
};

export default CopyToClipboard;
