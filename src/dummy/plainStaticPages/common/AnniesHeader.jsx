import React from 'react';

const AnniesHeader = () => {
    return (
        <>
            <div
                className="lg:bg-gradient-to-l lg:from-90% lg:from-[#634B91] lg:via-[#FFEDD1] lg:to-[#FFF3E0] bg-transparent py-[3px] lg:relative lg:top-0 lg:right-0 absolute top-[25px] right-0 z-10">
                <div className="container mx-auto">
                    <div className="flex items-center justify-end">
                        <div className="w-full lg:w-1/4 lg:inline-block" />
                        <div className="w-full lg:w-3/4 flex items-center justify-between">
                            <div className="w-full lg:w-auto lg:inline-block">
                                <div className="font-extrabold xl:text-[12px] text-[10px] uppercase">Online Plant-Only | Sale! June 9th - 19th | 20% off All plants</div>
                            </div>
                            <div className="w-full lg:w-auto">
                                <div className="flex items-center justify-end lg:gap-[10px] gap-[7px]">
                                    <div className="text-[14px] sm:flex items-center mr-[10px] lg:gap-[7px] gap-[5px]">
                                        <div className>Ship to</div><a href="javasript:void(0);" data-modal-toggle="ShiptoZipModal"
                                            className="inline-block font-extrabold text-primary uppercase underline">Add zip</a>
                                    </div>
                                    <div className="md:inline-block">
                                        <ul className="flex items-center text-[12px] font-semibold gap-[15px] mr-[5px]">
                                            <li className><a href="javasript:void(0);" className="text-primary">Events</a></li>
                                            <li className><a href="javasript:void(0);" className="text-primary">Blog</a></li>
                                        </ul>
                                    </div>
                                    <div className>
                                        <div className="flex relative" ><a
                                            className="text-[#ffffff] flex items-center justify-center" href="javasript:void(0);"
                                        ><span
                                            className="inline-flex items-center justify-center w-[26px] h-[26px] bg-[#1B6074] rounded-full"><img
                                                    src="https://ystore.us/HTML/Annies-Annuals/images/icon-header-user.png" className="max-h-full mx-auto"
                                                    alt /></span></a>
                                            <div className="text-xs absolute right-0 top-full z-50 w-[270px] bg-[#F6EDFF] rounded-[5px] border border-[#D4D4D4] py-[8px] px-[20px]"
                                                style={{ "display": "none" }}>
                                                <div
                                                    className="border-b border-[#B3B3B3] py-2 gap-2.5 flex items-center text-default-text font-[600]">
                                                    Welcome, John Mechew</div>
                                                <ul className>
                                                    <li className><a href="javasript:void(0);"
                                                        className="flex items-center py-2 gap-2.5 text-default-text font-[600]"><svg
                                                            xmlns="http://www.w3.org/2000/svg" width="19.767" height="19.5"
                                                            viewBox="0 0 19.767 19.5">
                                                            <path id="Path_49050" data-name="Path 49050"
                                                                d="M17.982,18.725a7.5,7.5,0,0,0-11.964,0m11.963,0a9,9,0,1,0-11.963,0m11.963,0a9,9,0,0,1-11.963,0M15,9.75a3,3,0,1,1-3-3A3,3,0,0,1,15,9.75Z"
                                                                transform="translate(-2.116 -2.25)" fill="none" stroke="#634b91"
                                                                strokeLinecap="round" strokeLinejoin="round"
                                                                strokeWidth="1.5" />
                                                        </svg> <span className="!font-[#273721]">Account</span></a></li>
                                                    <li className><a href="javasript:void(0);"
                                                        className="flex items-center py-2 gap-2.5 text-default-text font-[600]"><svg
                                                            xmlns="http://www.w3.org/2000/svg" width={18} height={18}
                                                            viewBox="0 0 18 18">
                                                            <path id="Path_49051" data-name="Path 49051"
                                                                d="M16.5,3.75V16.5L12,14.25,7.5,16.5V3.75m9,0H18A2.25,2.25,0,0,1,20.25,6V18A2.25,2.25,0,0,1,18,20.25H6A2.25,2.25,0,0,1,3.75,18V6A2.25,2.25,0,0,1,6,3.75H7.5m9,0h-9"
                                                                transform="translate(-3 -3)" fill="none" stroke="#634b91"
                                                                strokeLinecap="round" strokeLinejoin="round"
                                                                strokeWidth="1.5" />
                                                        </svg> <span className="!font-[#273721]">Wishlist</span></a></li>
                                                    <li className><a href="javasript:void(0);"
                                                        className="flex items-center py-2 gap-2.5 text-default-text font-[600]"><svg
                                                            xmlns="http://www.w3.org/2000/svg" width="18.005" height="19.641"
                                                            viewBox="0 0 18.005 19.641">
                                                            <g id="Cube_projected" data-name="Cube projected"
                                                                transform="translate(-6.5 -3.5)">
                                                                <path id="Path_49052" data-name="Path 49052"
                                                                    d="M15.158,3.576a.818.818,0,0,1,.688,0l8.184,3.79a.818.818,0,0,1,.475.743v9.476a.818.818,0,0,1-.408.708l-8.184,4.738a.818.818,0,0,1-.82,0L6.908,18.293a.818.818,0,0,1-.408-.708V8.109a.818.818,0,0,1,.474-.743ZM8.137,9.435l6.547,3.285V20.9l-6.547-3.79ZM16.321,20.9l6.547-3.79V9.435L16.321,12.72ZM15.5,11.3l6.3-3.161L15.5,5.22,9.2,8.138Z"
                                                                    transform="translate(0 0)" fill="#634b91"
                                                                    fillRule="evenodd" />
                                                            </g>
                                                        </svg> <span className="!font-[#273721]">Orders &amp; Returns</span></a>
                                                    </li>
                                                    <li className><a href="javasript:void(0);"
                                                        className="flex items-center py-2 gap-2.5 text-default-text font-[600]"><svg
                                                            xmlns="http://www.w3.org/2000/svg" width={21} height="16.5"
                                                            viewBox="0 0 21 16.5">
                                                            <path id="Path_49053" data-name="Path 49053"
                                                                d="M2.25,8.25h19.5M2.25,9h19.5M5.25,14.25h6m-6,2.25h3m-3.75,3h15a2.25,2.25,0,0,0,2.25-2.25V6.75A2.25,2.25,0,0,0,19.5,4.5H4.5A2.25,2.25,0,0,0,2.25,6.75v10.5A2.25,2.25,0,0,0,4.5,19.5Z"
                                                                transform="translate(-1.5 -3.75)" fill="none" stroke="#634b91"
                                                                strokeLinecap="round" strokeLinejoin="round"
                                                                strokeWidth="1.5" />
                                                        </svg> <span className="!font-[#273721]">Payment Methods</span></a></li>
                                                    <li className><a href="javasript:void(0);"
                                                        className="flex items-center py-2 gap-2.5 text-default-text font-[600]"><svg
                                                            xmlns="http://www.w3.org/2000/svg" width="20.968" height="16.501"
                                                            viewBox="0 0 20.968 16.501">
                                                            <path id="Path_49054" data-name="Path 49054"
                                                                d="M15.717,18.75a1.5,1.5,0,1,0,3,0m-3,0a1.5,1.5,0,1,1,3,0m-3,0h-6m9,0h1.875a1.125,1.125,0,0,0,1.125-1.125V14.25m-17.25,4.5a1.5,1.5,0,1,0,3,0m-3,0a1.5,1.5,0,1,1,3,0m-3,0H3.342a1.072,1.072,0,0,1-1.09-1.124A17.9,17.9,0,0,1,5.465,8.433a2.056,2.056,0,0,1,1.58-.86H9.717M7.467,18.75h2.25m0-11.177V6.615A1.105,1.105,0,0,1,10.7,5.509a48.554,48.554,0,0,1,10.026,0,1.106,1.106,0,0,1,.987,1.106V14.25m-12-6.677V14.25m0,4.5v-4.5m0,0h12"
                                                                transform="translate(-1.5 -4.499)" fill="none" stroke="#634b91"
                                                                strokeLinecap="round" strokeLinejoin="round"
                                                                strokeWidth="1.5" />
                                                        </svg> <span className="!font-[#273721]">Shipping Info</span></a></li>
                                                    <li className><a href="javasript:void(0);"
                                                        className="flex items-center py-2 gap-2.5 text-default-text font-[600]"><svg
                                                            xmlns="http://www.w3.org/2000/svg" width={21} height={18}
                                                            viewBox="0 0 21 18">
                                                            <path id="Path_49055" data-name="Path 49055"
                                                                d="M12,3.75v16.5M2.25,12h19.5M6.375,17.25a4.875,4.875,0,0,0,4.875-4.875V12m6.375,5.25a4.875,4.875,0,0,1-4.875-4.875V12m-9,8.25h16.5a1.5,1.5,0,0,0,1.5-1.5V5.25a1.5,1.5,0,0,0-1.5-1.5H3.75a1.5,1.5,0,0,0-1.5,1.5v13.5A1.5,1.5,0,0,0,3.75,20.25Zm12.621-9.44c-1.409,1.41-4.242,1.061-4.242,1.061s-.349-2.833,1.06-4.242a2.25,2.25,0,1,1,3.182,3.182Zm-5.6-3.18c1.409,1.409,1.06,4.242,1.06,4.242S9,12.22,7.592,10.811a2.25,2.25,0,0,1,3.182-3.182Z"
                                                                transform="translate(-1.5 -3)" fill="none" stroke="#634b91"
                                                                strokeLinecap="round" strokeLinejoin="round"
                                                                strokeWidth="1.5" />
                                                        </svg> <span className="!font-[#273721]">Redeem a Gift Card</span></a>
                                                    </li>
                                                </ul>
                                                <div
                                                    className="border-t border-[#B3B3B3] py-2 gap-2.5 flex items-center text-default-text font-[600]">
                                                    <a href="javasript:void(0);"
                                                        className="flex items-center py-2 gap-2.5 text-default-text font-[600]"><svg
                                                            xmlns="http://www.w3.org/2000/svg" width={18} height="19.5"
                                                            viewBox="0 0 18 19.5">
                                                            <path id="Path_49056" data-name="Path 49056"
                                                                d="M15.75,9V5.25A2.25,2.25,0,0,0,13.5,3h-6A2.25,2.25,0,0,0,5.25,5.25v13.5A2.25,2.25,0,0,0,7.5,21h6a2.25,2.25,0,0,0,2.25-2.25V15M12,9,9,12m0,0,3,3M9,12H21.75"
                                                                transform="translate(-4.5 -2.25)" fill="none" stroke="#634b91"
                                                                strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                                                        </svg> <span className="!font-[#273721]">Log Out</span></a></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex relative"><a className="text-[#ffffff] flex items-center justify-center"
                                        href="javasript:void(0);"><span
                                            className="inline-flex items-center justify-center w-[26px] h-[26px] bg-[#9F2D3C] rounded-full"><img
                                                src="https://ystore.us/HTML/Annies-Annuals/images/icon-header-wishlist.png" className="max-h-full mx-auto"
                                                alt /></span></a></div>
                                    <div className="flow-root relative"><a
                                        className="text-[#ffffff] group flex items-center relative" href="javasript:void(0);"
                                    ><span
                                        className="inline-flex items-center justify-center w-[26px] h-[26px] bg-[#2E631D] rounded-full"><img
                                                src="https://ystore.us/HTML/Annies-Annuals/images/icon-header-cart.png" className="max-h-full mx-auto"
                                                alt /></span></a></div>
                                </div>
                            </div>
                        </div >
                    </div >
                </div >
            </div >
        </>
    );
};

export default AnniesHeader;
