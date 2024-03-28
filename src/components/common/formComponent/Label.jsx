import React from "react";

const Label = ({ labelValue, Required }) => {
  return (
    <>
      <div>
        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
          {labelValue}
          { Required ? <span className="text-rose-500 text-2xl leading-none">*</span> : '' } 
        </label>

      </div>
    </>
  );
};

export default Label;
