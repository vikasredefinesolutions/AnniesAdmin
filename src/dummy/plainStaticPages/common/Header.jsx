import React from 'react';

const Header = () => {
    return (
        <>
            <header className="relative"><nav aria-label="Top"><div className="bg-[#FFF3E0]"><div className="container mx-auto"><div><div className=" relative left-0 top-[25px] h-8 w-8 z-10">

                <button type="button" className="text-[#295B4C] mobile-menu-btn hidden"><span className="sr-only">Open menu
                </span> <svg className="h-8 w-8" x-description="Heroicon name: outline/menu" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
                </button>
            </div><div className="flex justify-between"><div className="w-[120px] mx-auto lg:mx-0 lg:flex lg:items-center lg:w-[25%] relative z-10">
                <a title="Annie`s Annuals and Perennials" className="max-w-[310px] w-full lg:inline-block block lg:mt-[-40px] mt-[-25px]" href="javascript:void(0)"><div className="brand-logo w-full">
                    <img alt src="https://ystore.us/HTML/Annies-Annuals/images/logo.png" className="max-h-full" />
                </div></a>
            </div><div className="lg:flex lg:items-end lg:w-1/3"><div className="mt-[8px]">
                <a href="javascript:void(0)" title>
                    <img src="https://ystore.us/HTML/Annies-Annuals/images/digital-catalog-top.svg" alt /></a>
            </div>
                    </div><div className="w-full lg:w-1/3 lg:flex items-center justify-end"><form action="#" className="w-full"><div className="w-full"><div className="border border-[#295B4C] rounded-tl-sm rounded-br-sm pt-[9px] pb-[9px] pl-[15px] pr-[30px] relative bg-[#ffffff]">
                        <input name="text" min={1} id="txtSearch" placeholder="Search our store…" className="bg-opacity-20 outline-none w-full border-0 focus:ring-0 text-[15px] text-[#273721] bg-[#ffffff]" autoComplete="off" maxLength={255} />

                        <button type="button" className="flex items-center justify-center"><span className="w-[17px] h-[17px] inline-block absolute right-[8px] top-1/2 -translate-y-1/2">
                            <img src="https://ystore.us/HTML/Annies-Annuals/images/icon-header-search.png" className="max-h-full mx-auto" alt />
                        </span>
                        </button>
                    </div>
                    </div></form>
                    </div>
                </div>
                {/* <div className="">
                    <form action="#"><div className="py-[10px]"><div className="border border-[#295B4C] rounded-tl-sm rounded-br-sm pt-[9px] pb-[9px] pl-[15px] pr-[30px] relative bg-white">
                    <input name="text" min={1} id="txtSearch" placeholder="Search our store…" className="bg-transparent outline-none w-full border-0 focus:ring-0 text-[15px] text-[#273721]" autoComplete="off" maxLength={255} />

                    <button  type="button" className="flex items-center justify-center"><span className="w-[17px] h-[17px] inline-block absolute right-[8px] top-1/2 -translate-y-1/2">
                        <img src="https://ystore.us/HTML/Annies-Annuals/images/icon-header-search.png" className="max-h-full mx-auto" alt />
                    </span>
                    </button>
                </div>
                </div></form>
                </div> */}
            </div>
            </div>
            </div><div className="bg-[#FFF3E0]"><div className="container mx-auto"><div className="h-full lg:block"><div><div className="h-full grid grid-flow-col justify-items-stretch header-nav gap-[1px]" x-data="{menu1: false,menu2: false,menu3: false,menu4: false,menu5: false,menu6: false,menu7: false,menu9: false,menu10: false}"><div className="relative bg-[#295B4C] hover:bg-opacity-80 focus:bg-opacity-80 first:rounded-tl-sm last:rounded-br-sm" >
                <a title href="javascript:void(0)" className="relative text-[12px] xl:text-[14px] z-10 flex justify-center items-center font-semibold pt-[11px] pb-[8px] px-[5px] xl:px-[10px] font-sub primary-link hover:primary-link-hover">Perennials &amp; Biennials</a>
            </div><div className="absolute top-full left-0 right-0 sm:text-[14px] z-50 border-t border-t-[#295B4C]" x-show="menu1" style={{ "display": "none" }}><div className="relative bg-[#EDFFFA]"><div className="container mx-auto"><div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-6 pt-[37px] pb-[60px]"><div className="col-span-1"><div className="text-[18px] font-bold font-sub">Perennials &amp; Biennials
            </div><ul className="text-[13px] lg:text-[14px] font-sub font-semibold"><li className="pt-[20px]">
                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">New</a></li><li className="pt-[20px]">
                        <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">CA Natives</a></li><li className="pt-[20px]">
                        <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Good for Poliantors &amp; Wildlife</a></li><li className="pt-[20px]">
                        <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Drought Tolerant</a></li><li className="pt-[20px]">
                        <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Deer Resistant</a></li><li className="pt-[20px]">
                        <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Sale</a></li></ul><div className="mt-[30px]">
                    <a className="inline-flex flex-wrap items-center px-[32px] py-[16px] bg-primary text-white text-[14px] font-extrabold rounded-xs uppercase" title href="javascript:void(0)">shop all</a>
                </div>
            </div><div className="col-span-1 lg:col-span-2 xl:col-span-4"><div className="text-[18px] font-bold font-sub">Popular
            </div><ul className="text-[13px] lg:text-[14px] font-sub font-semibold grid grid-cols-1 lg:grid-cols-3"><li className="pt-[20px]">
                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Achillea</a></li><li className="pt-[20px]">
                            <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Alstroemeria</a></li><li className="pt-[20px]">
                            <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Aquilegia</a></li><li className="pt-[20px]">
                            <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Asclepias (Milkweed)</a></li><li className="pt-[20px]">
                            <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Cuphea</a></li><li className="pt-[20px]">
                            <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Dahlia</a></li><li className="pt-[20px]">
                            <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Delphinium</a></li><li className="pt-[20px]">
                            <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Dianthus</a></li><li className="pt-[20px]">
                            <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Digitalis (Fox Glove)</a></li><li className="pt-[20px]">
                            <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Eriogonum</a></li><li className="pt-[20px]">
                            <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Eschscholzia</a></li><li className="pt-[20px]">
                            <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Fragaria (Strawberry)</a></li><li className="pt-[20px]">
                            <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Geum</a></li><li className="pt-[20px]">
                            <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Geranium</a></li><li className="pt-[20px]">
                            <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Helleborus</a></li><li className="pt-[20px]">
                            <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Heuchera</a></li><li className="pt-[20px]">
                            <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Hollyhock</a></li><li className="pt-[20px]">
                            <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Lupinus</a></li><li className="pt-[20px]">
                            <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Osetopermum</a></li><li className="pt-[20px]">
                            <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Penstemon</a></li><li className="pt-[20px]">
                            <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Salvia</a></li><li className="pt-[20px]">
                            <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Scabiosa</a></li><li className="pt-[20px]">
                            <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Verbascum</a></li><li className="pt-[20px]">
                            <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Verbena</a></li></ul>
                </div><div className="col-span-1"><div className="text-[18px] font-bold font-sub">Best Selling
                </div><div className="mt-[20px]">
                        <img className="rounded-tl-xl rounded-br-xl overflow-hidden" src="https://ystore.us/HTML/Annies-Annuals/images/image-nav-perennials-biennials.png" alt />
                    </div><div className="mt-[15px]">
                        <a className="inline-block text-[16px] font-bold font-sub text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Brachyscome iberidifolia</a>
                    </div>
                </div>
            </div>
            </div>
            </div>
                </div><div className="relative bg-[#9C331C] hover:bg-opacity-80 focus:bg-opacity-80 first:rounded-tl-sm last:rounded-br-sm" >
                    <a title href="javascript:void(0)" className="relative text-[12px] xl:text-[14px] z-10 flex justify-center items-center font-semibold pt-[11px] pb-[8px] px-[5px] xl:px-[10px] font-sub primary-link hover:primary-link-hover">Annuals</a>
                </div><div className="absolute top-full left-0 right-0 sm:text-[14px] z-50 border-t border-t-[#9C331C]" x-show="menu2" style={{ "display": "none" }}><div className="relative bg-[#FFF0ED]"><div className="container mx-auto"><div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-6 pt-[37px] pb-[60px]"><div className="col-span-1"><div className="text-[18px] font-bold font-sub">Annuals
                </div><ul className="text-[13px] lg:text-[14px] font-sub font-semibold"><li className="pt-[20px]">
                    <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">New</a></li><li className="pt-[20px]">
                            <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">CA Natives</a></li><li className="pt-[20px]">
                            <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Good for Poliantors &amp; Wildlife</a></li><li className="pt-[20px]">
                            <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Drought Tolerant</a></li><li className="pt-[20px]">
                            <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Deer Resistant</a></li><li className="pt-[20px]">
                            <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Sale</a></li></ul><div className="mt-[30px]">
                        <a className="inline-flex flex-wrap items-center px-[32px] py-[16px] bg-primary text-white text-[14px] font-extrabold rounded-xs uppercase" title href="javascript:void(0)">shop all</a>
                    </div>
                </div><div className="col-span-1 lg:col-span-2 xl:col-span-3"><div className="text-[18px] font-bold font-sub">Popular
                </div><ul className="text-[13px] lg:text-[14px] font-sub font-semibold grid grid-cols-1 lg:grid-cols-2"><li className="pt-[20px]">
                    <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Antirrhinum (Snap Dragon)</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Basil</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Calendula</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Centaurea</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Clarkia</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Convolvulus</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Cosmos</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Gilia</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Lathyrus (Sweet Pea)</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Layia</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Lobelia</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Marigold</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Nemophila</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Papaver (poppy)</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Sunflower</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Zinnia</a></li></ul>
                    </div><div className="col-span-1 xl:col-span-2"><div className="text-[18px] font-bold font-sub">Best Selling
                    </div><div className="grid grid-cols-1 lg:grid-cols-2 gap-[27px]"><div className="col-span-1 lg:col-span-1"><div className="mt-[20px]">
                        <img className="rounded-tl-xl rounded-br-xl overflow-hidden" src="https://ystore.us/HTML/Annies-Annuals/images/image-nav-annuals-1.png" alt />
                    </div><div className="mt-[15px]">
                            <a className="inline-block text-[16px] font-bold font-sub text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Brachyscome iberidifolia</a>
                        </div>
                    </div><div className="col-span-1 lg:col-span-1"><div className="mt-[20px]">
                        <img className="rounded-tl-xl rounded-br-xl overflow-hidden" src="https://ystore.us/HTML/Annies-Annuals/images/image-nav-annuals-2.png" alt />
                    </div><div className="mt-[15px]">
                                    <a className="inline-block text-[16px] font-bold font-sub text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Brachyscome iberidifolia</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                </div>
                </div><div className="relative bg-[#8A2C9B] hover:bg-opacity-80 focus:bg-opacity-80 first:rounded-tl-sm last:rounded-br-sm" >
                    <a title href="javascript:void(0)" className="relative text-[12px] xl:text-[14px] z-10 flex justify-center items-center font-semibold pt-[11px] pb-[8px] px-[5px] xl:px-[10px] font-sub primary-link hover:primary-link-hover">Ground Covers</a>
                </div><div className="absolute top-full left-0 right-0 sm:text-[14px] z-50 border-t border-t-[#8A2C9B]" x-show="menu3" style={{ "display": "none" }}><div className="relative bg-[#F6EDFF]"><div className="container mx-auto"><div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-6 pt-[37px] pb-[60px]"><div className="col-span-1"><div className="text-[18px] font-bold font-sub">Ground Covers
                </div><ul className="text-[13px] lg:text-[14px] font-sub font-semibold"><li className="pt-[20px]">
                    <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">New</a></li><li className="pt-[20px]">
                            <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">CA Natives</a></li><li className="pt-[20px]">
                            <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Good for Poliantors &amp; Wildlife</a></li><li className="pt-[20px]">
                            <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Drought Tolerant</a></li><li className="pt-[20px]">
                            <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Deer Resistant</a></li><li className="pt-[20px]">
                            <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Sale</a></li></ul><div className="mt-[30px]">
                        <a className="inline-flex flex-wrap items-center px-[32px] py-[16px] bg-primary text-white text-[14px] font-extrabold rounded-xs uppercase" title href="javascript:void(0)">shop all</a>
                    </div>
                </div><div className="col-span-1 lg:col-span-2 xl:col-span-3"><div className="text-[18px] font-bold font-sub">Popular
                </div><ul className="text-[13px] lg:text-[14px] font-sub font-semibold grid grid-cols-1 lg:grid-cols-2"><li className="pt-[20px]">
                    <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Ajuga</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Campanula</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Convolvulus</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Delosperma</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Dianthus</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Fragaria</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Geranuium</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Heuchera</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Lobelia</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Nasturtium</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Nemophila</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Oregano</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Oxalis</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Sedum</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Sisyrinchium</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Zauschneria</a></li></ul>
                    </div><div className="col-span-1 xl:col-span-2"><div className="text-[18px] font-bold font-sub">Best Selling
                    </div><div className="grid grid-cols-1 lg:grid-cols-2 gap-[27px]"><div className="col-span-1 lg:col-span-1"><div className="mt-[20px]">
                        <img className="rounded-tl-xl rounded-br-xl overflow-hidden" src="https://ystore.us/HTML/Annies-Annuals/images/image-nav-group-cover-1.png" alt />
                    </div><div className="mt-[15px]">
                            <a className="inline-block text-[16px] font-bold font-sub text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Brachyscome iberidifolia</a>
                        </div>
                    </div><div className="col-span-1 lg:col-span-1"><div className="mt-[20px]">
                        <img className="rounded-tl-xl rounded-br-xl overflow-hidden" src="https://ystore.us/HTML/Annies-Annuals/images/image-nav-group-cover-2.png" alt />
                    </div><div className="mt-[15px]">
                                    <a className="inline-block text-[16px] font-bold font-sub text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Brachyscome iberidifolia</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                </div>
                </div><div className="relative bg-[#1B6074] hover:bg-opacity-80 focus:bg-opacity-80 first:rounded-tl-sm last:rounded-br-sm" >
                    <a title href="javascript:void(0)" className="relative text-[12px] xl:text-[14px] z-10 flex justify-center items-center font-semibold pt-[11px] pb-[8px] px-[5px] xl:px-[10px] font-sub primary-link hover:primary-link-hover">Shrubs &amp; Trees</a>
                </div><div className="absolute top-full left-0 right-0 sm:text-[14px] z-50 border-t border-t-[#1B6074]" x-show="menu4" style={{ "display": "none" }}><div className="relative bg-[#EDFBFF]"><div className="container mx-auto"><div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-6 pt-[37px] pb-[60px]"><div className="col-span-1"><div className="text-[18px] font-bold font-sub">Shrubs &amp; Trees
                </div><ul className="text-[13px] lg:text-[14px] font-sub font-semibold"><li className="pt-[20px]">
                    <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">New</a></li><li className="pt-[20px]">
                            <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">CA Natives</a></li><li className="pt-[20px]">
                            <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Good for Poliantors &amp; Wildlife</a></li><li className="pt-[20px]">
                            <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Drought Tolerant</a></li><li className="pt-[20px]">
                            <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Deer Resistant</a></li><li className="pt-[20px]">
                            <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Sale</a></li></ul><div className="mt-[30px]">
                        <a className="inline-flex flex-wrap items-center px-[32px] py-[16px] bg-primary text-white text-[14px] font-extrabold rounded-xs uppercase" title href="javascript:void(0)">shop all</a>
                    </div>
                </div><div className="col-span-1 lg:col-span-2 xl:col-span-3"><div className="text-[18px] font-bold font-sub">Popular
                </div><ul className="text-[13px] lg:text-[14px] font-sub font-semibold grid grid-cols-1 lg:grid-cols-2"><li className="pt-[20px]">
                    <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Abutilon</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Brugmansia</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Buddleja (Butterfly Bush)</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Ceanothus</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Cuphea</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Echium</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Euphorbia</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Fuchsia</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Hibiscus</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Impatiens</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Lampranthes</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Lavandula (Lavender)</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Mimulus</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Ribes</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Rosa</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Salvia</a></li></ul>
                    </div><div className="col-span-1 xl:col-span-2"><div className="text-[18px] font-bold font-sub">Best Selling
                    </div><div className="grid grid-cols-1 lg:grid-cols-2 gap-[27px]"><div className="col-span-1 lg:col-span-1"><div className="mt-[20px]">
                        <img className="rounded-tl-xl rounded-br-xl overflow-hidden" src="https://ystore.us/HTML/Annies-Annuals/images/image-nav-scrubs-trees-1.png" alt />
                    </div><div className="mt-[15px]">
                            <a className="inline-block text-[16px] font-bold font-sub text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Brachyscome iberidifolia</a>
                        </div>
                    </div><div className="col-span-1 lg:col-span-1"><div className="mt-[20px]">
                        <img className="rounded-tl-xl rounded-br-xl overflow-hidden" src="https://ystore.us/HTML/Annies-Annuals/images/image-nav-scrubs-trees-2.png" alt />
                    </div><div className="mt-[15px]">
                                    <a className="inline-block text-[16px] font-bold font-sub text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Brachyscome iberidifolia</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                </div></div > <div className="relative bg-[#2E631D] hover:bg-opacity-80 focus:bg-opacity-80 first:rounded-tl-sm last:rounded-br-sm" >
                    <a title href="javascript:void(0)" className="relative text-[12px] xl:text-[14px] z-10 flex justify-center items-center font-semibold pt-[11px] pb-[8px] px-[5px] xl:px-[10px] font-sub primary-link hover:primary-link-hover">Grasses and Foliage</a></div > <div className="absolute top-full left-0 right-0 sm:text-[14px] z-50 border-t border-t-[#2E631D]" x-show="menu5" style={{ "display": "none" }
                    }> <div className="relative bg-[#F1FFED]"><div className="container mx-auto"><div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-6 pt-[37px] pb-[60px]"><div className="col-span-1"><div className="text-[18px] font-bold font-sub">Grasses and Foliage
                    </div><ul className="text-[13px] lg:text-[14px] font-sub font-semibold"><li className="pt-[20px]">
                        <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">New</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">CA Natives</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Good for Poliantors &amp; Wildlife</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Drought Tolerant</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Deer Resistant</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Sale</a></li></ul><div className="mt-[30px]">
                            <a className="inline-flex flex-wrap items-center px-[32px] py-[16px] bg-primary text-white text-[14px] font-extrabold rounded-xs uppercase" title href="javascript:void(0)">shop all</a>
                        </div>
                    </div><div className="col-span-1 lg:col-span-2 xl:col-span-3"><div className="text-[18px] font-bold font-sub">Popular
                    </div><ul className="text-[13px] lg:text-[14px] font-sub font-semibold grid grid-cols-1 lg:grid-cols-2"><li className="pt-[20px]">
                        <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Aeonium</a></li><li className="pt-[20px]">
                                    <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Agave</a></li><li className="pt-[20px]">
                                    <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Carex</a></li><li className="pt-[20px]">
                                    <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Coleus</a></li><li className="pt-[20px]">
                                    <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Crassula</a></li><li className="pt-[20px]">
                                    <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Euphorbia</a></li><li className="pt-[20px]">
                                    <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Festuca</a></li><li className="pt-[20px]">
                                    <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Muhlenbergia</a></li><li className="pt-[20px]">
                                    <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Oregano</a></li><li className="pt-[20px]">
                                    <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Stipa (Needle Grass)</a></li><li className="pt-[20px]">
                                    <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Tanacetum</a></li></ul>
                        </div><div className="col-span-1 xl:col-span-2"><div className="text-[18px] font-bold font-sub">Best Selling
                        </div><div className="grid grid-cols-1 lg:grid-cols-2 gap-[27px]"><div className="col-span-1 lg:col-span-1"><div className="mt-[20px]">
                            <img className="rounded-tl-xl rounded-br-xl overflow-hidden" src="https://ystore.us/HTML/Annies-Annuals/images/image-nav-grasses-foliage-1.png" alt />
                        </div><div className="mt-[15px]">
                                <a className="inline-block text-[16px] font-bold font-sub text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Brachyscome iberidifolia</a>
                            </div>
                        </div><div className="col-span-1 lg:col-span-1"><div className="mt-[20px]">
                            <img className="rounded-tl-xl rounded-br-xl overflow-hidden" src="https://ystore.us/HTML/Annies-Annuals/images/image-nav-grasses-foliage-2.png" alt />
                        </div><div className="mt-[15px]">
                                        <a className="inline-block text-[16px] font-bold font-sub text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Brachyscome iberidifolia</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    </div></div > <div className="relative bg-[#A62152] hover:bg-opacity-80 focus:bg-opacity-80 first:rounded-tl-sm last:rounded-br-sm"  >
                    <a title href="javascript:void(0)" className="relative text-[12px] xl:text-[14px] z-10 flex justify-center items-center font-semibold pt-[11px] pb-[8px] px-[5px] xl:px-[10px] font-sub primary-link hover:primary-link-hover">Vines</a></div > <div className="absolute top-full left-0 right-0 sm:text-[14px] z-50 border-t border-t-[#A62152]" x-show="menu6" style={{ "display": "none" }}> <div className="relative bg-[#FFF4F8]"><div className="container mx-auto"><div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-6 pt-[37px] pb-[60px]"><div className="col-span-1"><div className="text-[18px] font-bold font-sub">Vines
                    </div><ul className="text-[13px] lg:text-[14px] font-sub font-semibold"><li className="pt-[20px]">
                        <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">New</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">CA Natives</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Good for Poliantors &amp; Wildlife</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Drought Tolerant</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Deer Resistant</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Sale</a></li></ul><div className="mt-[30px]">
                            <a className="inline-flex flex-wrap items-center px-[32px] py-[16px] bg-primary text-white text-[14px] font-extrabold rounded-xs uppercase" title href="javascript:void(0)">shop all</a>
                        </div>
                    </div><div className="col-span-1 lg:col-span-2 xl:col-span-3"><div className="text-[18px] font-bold font-sub">Popular
                    </div><ul className="text-[13px] lg:text-[14px] font-sub font-semibold grid grid-cols-1"><li className="pt-[20px]">
                        <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Clematis</a></li><li className="pt-[20px]">
                                    <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Convulus</a></li><li className="pt-[20px]">
                                    <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Lathyrus (Sweet Pea)</a></li><li className="pt-[20px]">
                                    <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Passiflora</a></li><li className="pt-[20px]">
                                    <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Rosa</a></li><li className="pt-[20px]">
                                    <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Euphorbia</a></li><li className="pt-[20px]">
                                    <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Thunbergia</a></li></ul>
                        </div><div className="col-span-1 xl:col-span-2"><div className="text-[18px] font-bold font-sub">Best Selling
                        </div><div className="grid grid-cols-1 lg:grid-cols-2 gap-[27px]"><div className="col-span-1 lg:col-span-1"><div className="mt-[20px]">
                            <img className="rounded-tl-xl rounded-br-xl overflow-hidden" src="https://ystore.us/HTML/Annies-Annuals/images/image-nav-grasses-foliage-1.png" alt />
                        </div><div className="mt-[15px]">
                                <a className="inline-block text-[16px] font-bold font-sub text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Brachyscome iberidifolia</a>
                            </div>
                        </div><div className="col-span-1 lg:col-span-1"><div className="mt-[20px]">
                            <img className="rounded-tl-xl rounded-br-xl overflow-hidden" src="https://ystore.us/HTML/Annies-Annuals/images/image-nav-grasses-foliage-2.png" alt />
                        </div><div className="mt-[15px]">
                                        <a className="inline-block text-[16px] font-bold font-sub text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Brachyscome iberidifolia</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    </div></div > <div className="relative bg-[#3B5697] hover:bg-opacity-80 focus:bg-opacity-80 first:rounded-tl-sm last:rounded-br-sm" >
                    <a title href="javascript:void(0)" className="relative text-[12px] xl:text-[14px] z-0 flex justify-center items-center font-semibold pt-[11px] pb-[8px] px-[5px] xl:px-[10px] font-sub primary-link hover:primary-link-hover">Succulents</a></div > <div className="absolute top-full left-0 right-0 sm:text-[14px] z-50 border-t border-t-[#3B5697]" x-show="menu7" style={{ "display": "none" }}> <div className="relative bg-[#EEF3FF]"><div className="container mx-auto"><div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-6 pt-[37px] pb-[60px]"><div className="col-span-1"><div className="text-[18px] font-bold font-sub">Succulents
                    </div><ul className="text-[13px] lg:text-[14px] font-sub font-semibold"><li className="pt-[20px]">
                        <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">New</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">CA Natives</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Good for Poliantors &amp; Wildlife</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Drought Tolerant</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Deer Resistant</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Sale</a></li></ul><div className="mt-[30px]">
                            <a className="inline-flex flex-wrap items-center px-[32px] py-[16px] bg-primary text-white text-[14px] font-extrabold rounded-xs uppercase" title href="javascript:void(0)">shop all</a>
                        </div>
                    </div><div className="col-span-1 lg:col-span-2 xl:col-span-3"><div className="text-[18px] font-bold font-sub">Popular
                    </div><ul className="text-[13px] lg:text-[14px] font-sub font-semibold grid grid-cols-1 lg:grid-cols-2"><li className="pt-[20px]">
                        <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Aeonium</a></li><li className="pt-[20px]">
                                    <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Agave</a></li><li className="pt-[20px]">
                                    <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Aloe</a></li><li className="pt-[20px]">
                                    <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Crassula</a></li><li className="pt-[20px]">
                                    <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Delosperma</a></li><li className="pt-[20px]">
                                    <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Echeveria</a></li><li className="pt-[20px]">
                                    <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Epiphyllum</a></li><li className="pt-[20px]">
                                    <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Lewisia</a></li><li className="pt-[20px]">
                                    <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Sedum</a></li><li className="pt-[20px]">
                                    <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Yucca</a></li></ul>
                        </div><div className="col-span-1 xl:col-span-2"><div className="text-[18px] font-bold font-sub">Best Selling
                        </div><div className="grid grid-cols-1 lg:grid-cols-2 gap-[27px]"><div className="col-span-1 lg:col-span-1"><div className="mt-[20px]">
                            <img className="rounded-tl-xl rounded-br-xl overflow-hidden" src="https://ystore.us/HTML/Annies-Annuals/images/image-nav-succulents-1.png" alt />
                        </div><div className="mt-[15px]">
                                <a className="inline-block text-[16px] font-bold font-sub text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Brachyscome iberidifolia</a>
                            </div>
                        </div><div className="col-span-1 lg:col-span-1"><div className="mt-[20px]">
                            <img className="rounded-tl-xl rounded-br-xl overflow-hidden" src="https://ystore.us/HTML/Annies-Annuals/images/image-nav-succulents-2.png" alt />
                        </div><div className="mt-[15px]">
                                        <a className="inline-block text-[16px] font-bold font-sub text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Brachyscome iberidifolia</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    </div></div ><div className="relative bg-[#694D84] hover:bg-opacity-80 focus:bg-opacity-80 first:rounded-tl-sm last:rounded-br-sm">
                    <a title href="javascript:void(0)" className="relative text-[12px] xl:text-[14px] z-10 flex justify-center items-center font-semibold pt-[11px] pb-[8px] px-[5px] xl:px-[10px] font-sub primary-link hover:primary-link-hover">Shop the Garden</a>
                </div><div className="relative bg-[#295B4C] hover:bg-opacity-80 focus:bg-opacity-80 first:rounded-tl-sm last:rounded-br-sm" >
                    <a title href="javascript:void(0)" className="relative text-[12px] xl:text-[14px] z-0 flex justify-center items-center font-semibold pt-[11px] pb-[8px] px-[5px] xl:px-[10px] font-sub primary-link hover:primary-link-hover">Resources</a></div > <div className="absolute top-full left-0 right-0 sm:text-[14px] z-50 border-t border-t-[#295B4C]" x-show="menu9" style={{ "display": "none" }}> <div className="relative bg-[#EDFFFA]"><div className="container mx-auto"><div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-6 pt-[37px] pb-[60px]"><div className="col-span-1"><div className="text-[18px] font-bold font-sub">Resources
                    </div><ul className="text-[13px] lg:text-[14px] font-sub font-semibold"><li className="pt-[20px]">
                        <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">US Hardiness Zones</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Planting Guides</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Shop by Uses and Features</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Shop A-Z</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Gardening Videos</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Gardening Blog</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Catalogues</a></li><li className="pt-[20px]">
                                <a className="inline-block text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Wish List</a></li></ul>
                    </div><div className="col-span-1 lg:col-span-3 xl:col-span-5"><div className="text-[18px] font-bold font-sub">Gardening Tips &amp; Guidance
                    </div><div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[27px]"><div className="col-span-1 lg:col-span-1"><div className="mt-[20px]">
                        <img className="rounded-tl-xl rounded-br-xl overflow-hidden" src="https://ystore.us/HTML/Annies-Annuals/images/image-nav-resources-1.png" alt />
                    </div><div className="mt-[15px]">
                            <a className="inline-block text-[16px] font-bold font-sub text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Growing Zone Guide</a>
                        </div>
                    </div><div className="col-span-1 lg:col-span-1"><div className="mt-[20px]">
                        <img className="rounded-tl-xl rounded-br-xl overflow-hidden" src="https://ystore.us/HTML/Annies-Annuals/images/image-nav-resources-2.png" alt />
                    </div><div className="mt-[15px]">
                                        <a className="inline-block text-[16px] font-bold font-sub text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Find Your Plant</a>
                                    </div>
                                </div><div className="col-span-1 lg:col-span-1"><div className="mt-[20px]">
                                    <img className="rounded-tl-xl rounded-br-xl overflow-hidden" src="https://ystore.us/HTML/Annies-Annuals/images/image-nav-resources-3.png" alt />
                                </div><div className="mt-[15px]">
                                        <a className="inline-block text-[16px] font-bold font-sub text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Plant Types</a>
                                    </div>
                                </div><div className="col-span-1 lg:col-span-1"><div className="mt-[20px]">
                                    <img className="rounded-tl-xl rounded-br-xl overflow-hidden" src="https://ystore.us/HTML/Annies-Annuals/images/image-nav-resources-4.png" alt />
                                </div><div className="mt-[15px]">
                                        <a className="inline-block text-[16px] font-bold font-sub text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Planting Guides</a>
                                    </div>
                                </div><div className="col-span-1 lg:col-span-1"><div className="mt-[20px]">
                                    <img className="rounded-tl-xl rounded-br-xl overflow-hidden" src="https://ystore.us/HTML/Annies-Annuals/images/image-nav-resources-5.png" alt />
                                </div><div className="mt-[15px]">
                                        <a className="inline-block text-[16px] font-bold font-sub text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Gardening Library</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    </div></div > <div className="relative bg-[#3B5697] hover:bg-opacity-80 focus:bg-opacity-80 first:rounded-tl-sm last:rounded-br-sm"  >
                    <a title href="javascript:void(0)" className="relative text-[12px] xl:text-[14px] z-0 flex justify-center items-center font-semibold pt-[11px] pb-[8px] px-[5px] xl:px-[10px] font-sub primary-link hover:primary-link-hover">Gifts &amp; Supplies</a></div > <div className="absolute top-full left-0 right-0 sm:text-[14px] z-50 border-t border-t-[#3B5697]" x-show="menu10" style={{ "display": "none" }
                    }> <div className="relative bg-[#EEF3FF]"><div className="container mx-auto"><div className="pt-[37px] pb-[60px]"><div className="text-[18px] font-bold font-sub">Gifts &amp; Supplies
                    </div><div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-[27px]"><div className="col-span-1 lg:col-span-1"><div className="mt-[20px]">
                        <img className="rounded-tl-xl rounded-br-xl overflow-hidden" src="https://ystore.us/HTML/Annies-Annuals/images/image-nav-gifts-supplies-1.png" alt />
                    </div><div className="mt-[15px]">
                            <a className="inline-block text-[16px] font-bold font-sub text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Gift Cards</a>
                        </div>
                    </div><div className="col-span-1 lg:col-span-1"><div className="mt-[20px]">
                        <img className="rounded-tl-xl rounded-br-xl overflow-hidden" src="https://ystore.us/HTML/Annies-Annuals/images/image-nav-gifts-supplies-2.png" alt />
                    </div><div className="mt-[15px]">
                                    <a className="inline-block text-[16px] font-bold font-sub text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Apparel</a>
                                </div>
                            </div><div className="col-span-1 lg:col-span-1"><div className="mt-[20px]">
                                <img className="rounded-tl-xl rounded-br-xl overflow-hidden" src="https://ystore.us/HTML/Annies-Annuals/images/image-nav-gifts-supplies-3.png" alt />
                            </div><div className="mt-[15px]">
                                    <a className="inline-block text-[16px] font-bold font-sub text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Arts &amp; Books</a>
                                </div>
                            </div><div className="col-span-1 lg:col-span-1"><div className="mt-[20px]">
                                <img className="rounded-tl-xl rounded-br-xl overflow-hidden" src="https://ystore.us/HTML/Annies-Annuals/images/image-nav-gifts-supplies-4.png" alt />
                            </div><div className="mt-[15px]">
                                    <a className="inline-block text-[16px] font-bold font-sub text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Bath &amp; Body</a>
                                </div>
                            </div><div className="col-span-1 lg:col-span-1"><div className="mt-[20px]">
                                <img className="rounded-tl-xl rounded-br-xl overflow-hidden" src="https://ystore.us/HTML/Annies-Annuals/images/image-nav-gifts-supplies-5.png" alt />
                            </div><div className="mt-[15px]">
                                    <a className="inline-block text-[16px] font-bold font-sub text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Garden Supplies</a>
                                </div>
                            </div><div className="col-span-1 lg:col-span-1"><div className="mt-[20px]">
                                <img className="rounded-tl-xl rounded-br-xl overflow-hidden" src="https://ystore.us/HTML/Annies-Annuals/images/image-nav-gifts-supplies-6.png" alt />
                            </div><div className="mt-[15px]">
                                    <a className="inline-block text-[16px] font-bold font-sub text-anchor hover:text-anchor-hover" title href="javascript:void(0)">Home Goods</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    </div></div > <div className="relative bg-[#9F2D3C] hover:bg-opacity-80 focus:bg-opacity-80 first:rounded-tl-sm last:rounded-br-sm">
                    <a title href="javascript:void(0)" className="relative text-[12px] xl:text-[14px] z-10 flex justify-center items-center font-semibold pt-[11px] pb-[8px] px-[5px] xl:px-[10px] font-sub primary-link hover:primary-link-hover">Sale</a>
                </div></div ></div ></div ></div ></div ></nav ></header >
        </>
    );
};

export default Header;
