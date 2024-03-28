/*Component Name: SaveFilter
Component Functional Details:  SaveFilter .
Created By: PK Kher
Created Date: <Creation Date>
Modified By: PK Kher
Modified Date: <Modified Date> */

import React from 'react';

const SaveFilter = ({ saveFilterOptionsHandler, ShowSaveActive }) => {
    return (
        <>
            <div className="relative inline-flex mr-1">
                <button className={`flex flex-wrap items-center text-sm px-3 py-2 bg-white border border-neutral-200 rounded-md shadow-sm ${ShowSaveActive ? "text-green-500 hover:text-green-700" : "text-gray-500 hover:text-gray-700"} `}
                    onClick={saveFilterOptionsHandler}>
                    <span className="material-icons">grade</span>
                    <span className="ml-1">{'Save'}
                    </span>
                    <wbr />
                </button>
            </div>
        </>
    );
};

export default React.memo(SaveFilter);
