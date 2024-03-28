import React from "react";
import { useSelector } from "react-redux";

function CheckBoxAction({
  selectedFlatRows,
  setOpenDeleteModal,
  setProductCustomFields,
  ...rest
}) {
  const permission = useSelector(store => store.permission);
  const handleonClick = () => {
    setOpenDeleteModal((prev) => !prev);
    setProductCustomFields(() => {
      return selectedFlatRows.map((row) => row.original);
    });
  };
  return (
    <>
      <div className="flex">
        {permission?.isDelete && <button
          className="text-xs btn-xs mx-1 bg-white border-rose-300 hover:border-rose-400 text-rose-500 flex items-center"
          onClick={handleonClick}
        >
          Delete
        </button>}
      </div>
    </>
  );
}

export default CheckBoxAction;
