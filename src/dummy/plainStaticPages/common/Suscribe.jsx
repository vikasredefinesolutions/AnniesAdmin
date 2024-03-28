import React from 'react';

const Suscribe = () => {
    return (
        <>
            <section className="w-full bg-[#EEF3FF]" style={{ backgroundImage: "url('https://ystore.us/HTML/Annies-Annuals/images/subscribe-flowers-bg.png')", "background-position": "bottom center", "background-repeat": "no-repeat", "background-size": "cover" }}>
                <div className="container mx-auto max-w-3xl">
                    <div className="lg:pt-[50px] pb-[240px] pt-[20px] pb- text-center">
                        <div className="text-[18px] sm:text-[24px] lg:text-[36px] font-bold text-anchor pb-[20px] font-sub">Subscribe To Our Newsletter</div>
                        <div className="text-[13px] sm:text-[17px] lg:text-[18px] font-semibold text-anchor pb-[20px] font-sub">Get the newest product updates and upcoming sales</div>
                        <div className="flex max-w-[480px] mt-0 mx-auto gap-[0px] justify-center font-sub pb-[20px]">
                            <input autoComplete="email" className="w-full bg-transparent border border-anchor rounded-tl-[15px] py-2 px-4 text-[12px] text-anchor italic placeholder-anchor sm:max-w-sm outline-none" id name="email-address" placeholder="Enter your E-Mail Address" type="email" /> <button type="button" className="relative bg-primary uppercase text-[12px] lg:text-[14px] z-10 flex items-center font-semibold pt-[11px] pb-[10px] pl-[20px] pr-[20px] font-sub primary-link hover:primary-link-hover outline-none rounded-br-[15px]" >subscribe</button>
                        </div>
                        <div className="text-[13px] sm:text-[16px] lg:text-[16px] font-normal text-anchor pb-[20px] max-w-sm mx-auto">
                            <label className="cursor-pointer">
                                <input type="checkbox" id className="mr-[5px]" /> I would like to receive emails about local events happening in our Nursery</label>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Suscribe;
