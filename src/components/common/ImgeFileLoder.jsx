import React from "react";

export default function TableLoading({ className, ...rest }) {

  return (
    <>
      <div className="absolute w-full h-full bg-[#f1f5f9] opacity-75 z-50 overflow-hidden flex justify-center align-middle animate-pulse">
        <div className={`text-center z-60 w-full items-center flex justify-center align-middle ${className ? className : ""}`}>
          <div className="loadingio-spinner-spinner-xe2hhkdtzbj">
            <div className="ldio-yoj2w479tp">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
