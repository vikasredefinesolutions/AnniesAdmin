import React, { useState } from 'react'

const Sidebar = ({children,showSidebar,setShowSideBar}) => {
    return (
        <>
            <div className="transition-all h-screen bg-slate-100 overflow-x-hidden shadow-lg inset-0 bottom-auto z-50 top-[56px] lg:w-1/4">
                <div className="p-1 bg-slate-100 border-b border-b-solid border-b-slate-300 text-right w-full"> 
                    <button className="pr-1" onClick={()=>setShowSideBar((prev)=> !prev)}>
                        <span className="material-icons-outlined text-sm">{showSidebar ? 'arrow_back_ios' : 'arrow_forward_ios'}</span>
                    </button>
                </div>
                <div className={`${showSidebar ? '' : 'hidden'}`}>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Sidebar