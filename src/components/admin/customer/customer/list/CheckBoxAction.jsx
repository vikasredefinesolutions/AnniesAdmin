import React from 'react';

function CheckBoxAction({ selectedFlatRows }) {
    return (
        <>
            <div className="flex">
                <button className="text-xs btn-xs mx-1 bg-white border-rose-300 hover:border-rose-400 text-rose-500 flex items-center">Delete</button>
            </div>
        </>
    )
}

export default CheckBoxAction;