/*Component Name: InvoicePrintTemplate
Component Functional Details:  InvoicePrintTemplate .
Created By: Shrey Patel
Created Date: 03/20/2023
Modified By: <Modified By>
Modified Date: <Modified Date> */

import React, { useState, useEffect, useRef } from "react";
import { CurrencySymbolByCode } from "global/Enum";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from 'react-to-print';
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import AbandonedShoppingCartService from "services/admin/customer/AbandonedShoppingCartService";
import Image from 'components/common/formComponent/Image';
import { TitleNameHelper } from "services/common/helper/Helper";
import { Fragment } from "react";
import { fillSerchQuery } from "redux/searchQueryForMGS/SearchQueryAction";

const InvoicePrintTemplate = ({ title, CustomerId, setShowViewCart }) => {
    const dispatch = useDispatch();
    const searchQuery = useSelector((store) => store?.SearchQueryReducers?.searchQuery);
    const [data, setData] = useState([]);
    const print = useRef();
    const AdminAppConfigReducers = useSelector((store) => store?.AdminAppConfigReducers);

    const handlePrint = useReactToPrint({
        content: () => print.current,
    });

    const getAbandonedCartProducts = () => {
        if (CustomerId !== 0) {
            dispatch(setAddLoading(true));
            AbandonedShoppingCartService.getAbandonedShoppingCartProducts(CustomerId).then((response) => {
                setData(response.data.data);
                dispatch(setAddLoading(false));
            });
        }
    }

    let TotalPrice = 0;
    let TotalQuantity = 0;

    useEffect(() => {
        if (CustomerId !== 0) {
            getAbandonedCartProducts()
        }
    }, [CustomerId])

    return (
        <>
            <title>{TitleNameHelper({ defaultTitleName: "Abandoned Cart Details Receipt" })}</title>
            <div className='px-4 sm:px-6 lg:px-8 py-8 w-full'>
                <div className='sm:flex sm:justify-between mb-8 sm:flex-wrap sm:items-start'>
                    <div className="flex mb-4 sm:mb-0 grow">
                        <button className="inline-flex btn border-neutral-200 hover:border-neutral-400 text-gray-500 hover:text-gray-700 items-center mr-2" onClick={() => { searchQuery && dispatch(fillSerchQuery(true)); setShowViewCart(false) }}> <span className="material-icons-outlined">west</span> </button>
                        <div className="inline-flex items-center gap-2 flex-wrap">
                            <h1 className="text-2xl md:text-3xl text-gray-800 font-bold inline-flex">
                                {TitleNameHelper({ defaultTitleName: "Abandoned Cart Details Receipt" })}
                            </h1>
                        </div>
                    </div>
                    {/* <div className="flex items-center">
                        <div className="flex items-center gap-4 mr-4">
                            <button type='button' onClick={handlePrint} className='btn bg-indigo-500 hover:bg-indigo-600 text-white ml-2 first:ml-0'>Print Cart</button>
                        </div>
                    </div> */}
                </div>

                <div className="" style={{ fontFamily: 'Raleway,sans-serif' }} id="printpdfpage" ref={print}>
                    <div className="mt-6">
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full text-sm text-[#191919] font-semibold">
                                <thead className="text-sm font-bold uppercase text-[#b3b3b3] border-b border-neutral-200 border-t">
                                    <tr>
                                        <th className="px-2 first:pl-5 py-4">
                                            <div className="font-semibold text-left max-w-max flex items-center">
                                                <span>ThumbNail</span>
                                            </div>
                                        </th>
                                        <th className="px-2 first:pl-5 py-4">
                                            <div className="font-semibold text-left flex items-center">
                                                <span>Product Name</span>
                                            </div>
                                        </th>
                                        <th className="px-2 first:pl-5 py-4">
                                            <div className="font-semibold text-left flex items-center">
                                                <span>SKU</span>
                                            </div>
                                        </th>
                                        <th className="px-2 first:pl-5 py-4">
                                            <div className="font-semibold text-left flex items-center">
                                                <span>Quantity</span>
                                            </div>
                                        </th>
                                        <th className="px-2 first:pl-5 py-4">
                                            <div className="font-semibold text-left flex items-center">
                                                <span>SubTotal ({CurrencySymbolByCode.USD})</span>
                                            </div>
                                        </th>
                                        <th className="px-2 first:pl-5 py-4">
                                            <div className="font-semibold text-left flex items-center"></div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 text-sm">
                                    {data.map((value, index) => {
                                        TotalPrice += value.totalPrice;
                                        TotalQuantity += value.totalQty;
                                        let UnitPrice = value.unitPrice
                                        return (<Fragment key={index}>
                                            <tr key={value?.id}>
                                                <td className="px-2 first:pl-5 py-3">
                                                    <div className=""><img className="max-w-20 max-h-20" src={`${AdminAppConfigReducers["azure:BlobUrl"]}${value?.colorImage}`} alt="" /></div>
                                                </td>
                                                <td className="px-2 first:pl-5 py-3">
                                                    <div className="">{value?.productName}
                                                        <div className='flex gap-2'>
                                                            {value?.shoppingCartLogoPersonViewModels && value?.shoppingCartLogoPersonViewModels.map((value, index) => {
                                                                return (
                                                                    <div className="flex justify-center items-center h-10 border w-10 overflow-hidden text-sm" key={value?.id}>
                                                                        <Image src={value?.logoImagePath} alt="not available" className={`max-h-full`} />
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                        <div className="divide-y divide-gray-300">
                                                            {value?.shoppingCartItemDetailsViewModels && value?.shoppingCartItemDetailsViewModels.map((value, index) => {
                                                                return (
                                                                    <div className="flex flex-wrap gap-3 justify-between py-1 text-left w-1/3" key={index}>
                                                                        <div className="">Size: {value?.attributeOptionValue || '-'}</div>
                                                                        <div className="">Qty: {value?.qty || 0}</div>
                                                                        <div className=""> {CurrencySymbolByCode.USD} {UnitPrice > 0 ? (UnitPrice.toFixed(2)) : "0.00"}/Qty</div>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-2 first:pl-5 py-3">
                                                    <div className="">{value?.sku || '-'}</div>
                                                </td>
                                                <td className="px-2 first:pl-5 py-3">
                                                    <div className="">{value?.totalQty}</div>
                                                </td>
                                                <td className="px-2 first:pl-5 py-3">
                                                    <div className="">{value?.totalPrice.toFixed(2)}</div>
                                                </td>
                                            </tr>
                                        </Fragment>
                                        )
                                    })
                                    }
                                    <tr>
                                        <td className="px-2 first:pl-5 py-4">
                                            <div className="text-right"></div>
                                        </td>
                                        <td className="px-2 first:pl-5 py-4">
                                            <div className="text-right"></div>
                                        </td>
                                        <td className="px-2 first:pl-5 py-4">
                                            <div className="text-left">Total</div>
                                        </td>
                                        <td className="px-2 first:pl-5 py-4">
                                            <div className="text-left">{TotalQuantity}</div>
                                        </td>
                                        <td className="px-2 first:pl-5 py-4">
                                            <div className="text-left">{CurrencySymbolByCode.USD} {TotalPrice.toFixed(2)}</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InvoicePrintTemplate;
