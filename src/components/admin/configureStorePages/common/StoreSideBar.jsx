/*Component Name: LeftAsideBar
Component Functional Details: User can create or update LeftAsideBar master details from here.
Created By: chandan
Created Date: <Creation Date>
Modified By: chandan
Modified Date: <Modified Date> */

import React from 'react';

const LeftAsideBar = ({ children, showSidebar, setShowSideBar }) => {
    return (
        <div className='w-full'>
            <div className=" bg-slate-100 border-b border-b-solid border-b-slate-300 text-right w-full">
                <button type='button' className="pr-1" onClick={() => setShowSideBar((prev) => !prev)}>
                    <span className="material-icons-outlined text-sm">{showSidebar ? 'arrow_back_ios' : 'arrow_forward_ios'}</span>
                </button>
            </div>
            <div className={`${showSidebar ? '' : 'hidden'} pt-4 w-full`}>
                {children}
            </div>
        </div >
    );
};

export default LeftAsideBar;
