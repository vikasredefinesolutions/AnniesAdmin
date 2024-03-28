/*Component Name: BannerBox3
Component Functional Details:  BannerBox3 .
Created By: PK Kher
Created Date: <Creation Date>
Modified By: PK Kher
Modified Date: <Modified Date> */

import React from 'react';

const BannerBox3 = () => {
    return (
        <>
            <section id="bannerBox3">
                <div className="w-full border-2 relative border-solid border-transparent">
                    <div className="section">
                        <div className="container mx-auto">
                            <div className="flex flex-wrap items-center p-6 lg:p-16 bg-gray-100">
                                <div className="w-full flex gap-2 h-full justify-around pr-0 lg:pr-10">
                                    <div className="h-full w-full"><img className="object-cover" alt
                                        src="https://www.pkhealthgear.com/images/brand/patagonia.png" /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default BannerBox3;
