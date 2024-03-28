import React from "react";
import Input from "components/common/formComponent/Input";

const CheckBoxComponent = ({
  enableDefaultField,
  name,
  disabled,
  ...rest
}) => {
  return (
    <>
      <label className={"w-4 inline-flex"}>
        <Input
          name={name}
          type="checkbox"
          disabled={disabled}
          className={`table-item form-checkbox checkboxCheck cursor-pointer ${(disabled) && "opacity-90 bg-gray-100 cursor-not-allowed"} ${!enableDefaultField && "hidden"}`}
          {...rest}
        />
      </label>
    </>
  );
};

export default CheckBoxComponent;
