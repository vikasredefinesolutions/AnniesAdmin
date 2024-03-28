/*Component Name: Breadcrum
Component Functional Details:  Breadcrum .
Created By: PK Kher
Created Date: <Creation Date>
Modified By: PK Kher
Modified Date: <Modified Date> */

import React from 'react';

const Breadcrumb = ({ breadCrumbType }) => {
    return (
        <>
            <section id="breadcrumbsbox" className="my-3">
                <div className="mx-auto">
                    <div className="group">
                        <div className="w-full border-2 relative border-solid border-transparent">
                        {breadCrumbType && <img src={`${process.env.PUBLIC_URL}/images/breadCrumbTemplateId/large/${breadCrumbType}.png`} /> }
                         
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Breadcrumb;
