import React from "react";

const General = ({ type, navSync, className, ...rest }) => {
    return (
        <>
            {type && <div className={`border text-xs inline-block font-medium rounded-md text-center px-2.5 py-1 break-words w-32  ${className ? className : 'border-sky-300 bg-sky-100 text-sky-600'}`} {...rest}>
                {type && type?.toUpperCase()}
            </div>}
        </>
    );
};

export default General;
