import React from 'react';
import { useSelector } from 'react-redux';

const Checkbox = ({ className, name, label, disabled, usedBy, ...res }) => {
  const permission = useSelector(store => store.permission);

  return (
    <>
      <input type="checkbox" name={name} {...res} className={` form-checkbox ${((usedBy && usedBy === "coreProductFeed") ? (!permission?.isView && !permission?.isEdit && !permission?.isDelete) : (permission?.isEdit && !permission?.isDelete)) ? "opacity-90 bg-gray-100 cursor-not-allowed" : "cursor-pointer"}`} disabled={disabled || ((usedBy && usedBy === "coreProductFeed") ? (!permission?.isView && !permission?.isEdit && !permission?.isDelete) : (!permission?.isEdit && !permission?.isDelete))} />
      <span className="ml-2">{label}</span>
    </>
  )
}

export default Checkbox;