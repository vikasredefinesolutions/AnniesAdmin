import React from 'react';
import { useSelector } from "react-redux";

function CheckBoxAction({ selectedFlatRows, setOpenDeleteModal, setProduct }) {
    const permission = useSelector(store => store.permission);
    const handleonClick = () => {
        setOpenDeleteModal(prev => !prev);
        setProduct(() => {
            return selectedFlatRows.map((row) => row.original);
        });
    }
    return (
        <>
            {permission.isDelete &&
                <div className="flex">
                    {/* <button className="text-xs btn-xs mx-1 bg-white border-indigo-300 hover:border-indigo-400 text-indigo-500 flex items-center">Active</button>
            <button className="text-xs btn-xs mx-1 bg-white border-indigo-300 hover:border-indigo-400 text-indigo-500 flex items-center">Inactive</button> */}
                    <button className="text-xs btn-xs mx-1 bg-white border-rose-300 hover:border-rose-400 text-rose-500 flex items-center" onClick={handleonClick}>Delete</button>
                </div>
            }
        </>
    )
}

export default CheckBoxAction;