/*Component Name: prices
Component Functional Details:  prices .
Created By: PK Kher
Created Date: <Creation Date>
Modified By: PK Kher
Modified Date: <Modified Date> */

import React from 'react';
import { CurrencySymbolByCode } from 'global/Enum';

const Prices = ({ orderDetail, StoreData }) => {
    return (
        <>
            <div className="overflow-x-auto max-h-screen"  >
                <div className="w-full justify-between px-3 mb-2">
                    <div className="w-full flex mb-2 last:mb-0">
                        <div className="w-1/2 text-left">
                            <div className="text-md font-medium text-gray-500 text-left px-2 py-1"><span className="inline-block min-w-[100px] font-bold">Subtotal</span> {orderDetail?.totalItems} Item(s)</div>
                        </div>
                        <div className="w-1/2 text-right"><div className="text-md font-medium text-gray-500 text-right px-2 py-1">{CurrencySymbolByCode.USD}{parseInt(orderDetail.subTotal) > 0 ? parseFloat(orderDetail?.subTotal - orderDetail?.customFieldTotal).toFixed(2) : "0.00"}</div></div>
                    </div>
                    {orderDetail?.tax !== 0 && (
                        <div className="w-full flex mb-2 last:mb-0">
                            <div className="w-1/2 text-left">
                                <div className="text-md font-medium text-gray-500 text-left px-2 py-1"><span className="inline-block min-w-[100px] font-bold">Tax</span> {orderDetail?.taxType}</div>
                            </div>
                            <div className="w-1/2 text-right"><div className="text-md font-medium text-gray-500 text-right px-2 py-1">{CurrencySymbolByCode.USD}{orderDetail?.tax > 0 ? parseFloat(orderDetail?.tax).toFixed(2) : "0.00"}</div></div>
                        </div>
                    )}
                    {orderDetail?.shipping !== 0 && (
                        <div className="w-full flex mb-2 last:mb-0">
                            <div className="w-1/2 text-left">
                                <div className="text-md font-medium text-gray-500 text-left px-2 py-1"><span className="inline-block min-w-[100px] font-bold">Shipping</span> {orderDetail?.shippingType}</div>
                            </div>
                            <div className="w-1/2 text-right"><div className="text-md font-medium text-gray-500 text-right px-2 py-1">{CurrencySymbolByCode.USD}{parseInt(orderDetail?.shipping) > 0 ? parseFloat(orderDetail?.shipping).toFixed(2) : "0.00"}</div></div>
                        </div>
                    )}
                    {/* {orderDetail?.smallRunFee !== 0 && orderDetail?.smallRunFee !== null && (
                        <div className="w-full flex mb-2 last:mb-0">
                            <div className="w-1/2 text-left">
                                <div className="text-md font-medium text-gray-500 text-left px-2 py-1"><span className="inline-block min-w-[100px] font-bold">Small Run Fee</span></div>
                            </div>
                            <div className="w-1/2 text-right"><div className="text-md font-medium text-gray-500 text-right px-2 py-1">{CurrencySymbolByCode.USD}{parseInt(orderDetail?.smallRunFee) > 0 ? parseFloat(orderDetail?.smallRunFee).toFixed(2) : "0.00"}</div></div>
                        </div>
                    )} */}
                    {StoreData && StoreData?.isLinepersonalization === true && orderDetail?.lineFinalTotal !== 0 && orderDetail?.lineFinalTotal !== null && (
                        <div className="w-full flex mb-2 last:mb-0">
                            <div className="w-1/2 text-left">
                                <div className="text-md font-medium text-gray-500 text-left px-2 py-1"><span className="inline-block min-w-[100px] font-bold">Total Line Cost</span></div>
                            </div>
                            <div className="w-1/2 text-right"><div className="text-md font-medium text-gray-500 text-right px-2 py-1">{CurrencySymbolByCode.USD}{parseInt(orderDetail?.lineFinalTotal) > 0 ? parseFloat(orderDetail?.lineFinalTotal).toFixed(2) : "0.00"}</div></div>
                        </div>
                    )}
                    {/* {orderDetail?.additionalCost !== 0 && orderDetail?.additionalCost !== null && (
                        <div className="w-full flex mb-2 last:mb-0">
                            <div className="w-1/2 text-left">
                                <div className="text-md font-medium text-gray-500 text-left px-2 py-1"><span className="inline-block min-w-[100px] font-bold">Total Logo Cost</span></div>
                            </div>
                            <div className="w-1/2 text-right"><div className="text-md font-medium text-gray-500 text-right px-2 py-1">{CurrencySymbolByCode.USD}{parseInt(orderDetail?.additionalCost) > 0 ? parseFloat(orderDetail?.additionalCost).toFixed(2) : "0.00"}</div></div>
                        </div>
                    )} */}
                    {/* {orderDetail?.logoSetupFee !== 0 && orderDetail?.logoSetupFee !== null && (
                        <div className="w-full flex mb-2 last:mb-0">
                            <div className="w-1/2 text-left">
                                <div className="text-md font-medium text-gray-500 text-left px-2 py-1"><span className="inline-block min-w-[100px] font-bold">Logo Setup Fee</span></div>
                            </div>
                            <div className="w-1/2 text-right"><div className="text-md font-medium text-gray-500 text-right px-2 py-1">{CurrencySymbolByCode.USD}{parseInt(orderDetail?.logoSetupFee) > 0 ? parseFloat(orderDetail?.logoSetupFee).toFixed(2) : "0.00"}</div></div>
                        </div>
                    )} */}
                    {orderDetail?.fee !== 0 && (
                        <div className="w-full flex mb-2 last:mb-0">
                            <div className="w-1/2 text-left">
                                <div className="text-md font-medium text-gray-500 text-left px-2 py-1"><span className="inline-block min-w-[100px] font-bold">Fee</span>{orderDetail?.feeType}</div>
                            </div>
                            <div className="w-1/2 text-right"><div className="text-md font-medium text-gray-500 text-right px-2 py-1">{CurrencySymbolByCode.USD}{parseInt(orderDetail?.fee) > 0 ? parseFloat(orderDetail?.fee).toFixed(2) : "0.00"}</div></div>
                        </div>
                    )}
                    {orderDetail?.couponCode !== "" && orderDetail?.couponCode !== null && (
                        <div className="w-full flex mb-2 last:mb-0">
                            <div className="w-1/2 text-left">
                                <div className="text-md font-medium text-gray-500 text-left px-2 py-1"><span className="inline-block min-w-[100px] font-bold">Promocode</span></div>
                            </div>
                            <div className="w-1/2 text-right"><div className="text-md font-medium text-gray-500 text-right px-2 py-1">{orderDetail?.couponCode ? (orderDetail?.couponCode === "string" ? "PromoCode Not Added Yet" : "") : ""}</div></div>
                        </div>
                    )}
                    {orderDetail?.others !== 0 && (
                        <div className="w-full flex mb-2 last:mb-0">
                            <div className="w-1/2 text-left">
                                <div className="text-md font-medium text-gray-500 text-left px-2 py-1"><span className="inline-block min-w-[100px] font-bold">Other</span> {orderDetail?.othersType}</div>
                            </div>
                            <div className="w-1/2 text-right"><div className="text-md font-medium text-gray-500 text-right px-2 py-1">{CurrencySymbolByCode.USD}{parseInt(orderDetail?.others) > 0 ? parseFloat(orderDetail?.others) : "0.00"}</div></div>
                        </div>
                    )}
                    {orderDetail?.discounts !== 0 && (
                        <div className="w-full flex mb-2 last:mb-0">
                            <div className="w-1/2 text-left">
                                <div className="text-md font-medium text-gray-500 text-left px-2 py-1"><span className="inline-block min-w-[100px] font-bold">Discounts</span> {orderDetail?.discountsType}</div>
                            </div>
                            <div className="w-1/2 text-right"><div className="text-md font-medium text-gray-500 text-right px-2 py-1">-{CurrencySymbolByCode.USD}{parseInt(orderDetail?.discounts) > 0 ? parseFloat(orderDetail?.discounts).toFixed(2) : "0.00"}</div></div>
                        </div>
                    )}
                    {orderDetail?.storeCredit !== 0 && (
                        <div className="w-full flex mb-2 last:mb-0">
                            <div className="w-1/2 text-left">
                                <div className="text-md font-medium text-gray-500 text-left px-2 py-1"><span className="inline-block min-w-[100px] font-bold">Store Credit</span></div>
                            </div>
                            <div className="w-1/2 text-right"><div className="text-md font-medium text-gray-500 text-right px-2 py-1">-{CurrencySymbolByCode.USD}{parseInt(orderDetail?.storeCredit) > 0 ? parseFloat(orderDetail?.storeCredit).toFixed(2) : "0.00"}</div></div>
                        </div>
                    )}
                    {orderDetail?.giftCardWalletAmount !== 0 && (
                        <div className="w-full flex mb-2 last:mb-0">
                            <div className="w-1/2 text-left">
                                <div className="text-md font-medium text-gray-500 text-left px-2 py-1"><span className="inline-block min-w-[100px] font-bold">Gift Card Amount</span></div>
                            </div>
                            <div className="w-1/2 text-right"><div className="text-md font-medium text-gray-500 text-right px-2 py-1">-{CurrencySymbolByCode.USD}{parseInt(orderDetail?.giftCardWalletAmount) > 0 ? parseFloat(orderDetail?.giftCardWalletAmount).toFixed(2) : "0.00"}</div></div>
                        </div>
                    )}
                    {orderDetail?.giftCertificateDiscountAmount !== 0 && (
                        <div className="w-full flex mb-2 last:mb-0">
                            <div className="w-1/2 text-left">
                                <div className="text-md font-medium text-gray-500 text-left px-2 py-1"><span className="inline-block min-w-[100px] font-bold">Gift Certificate Amount</span></div>
                            </div>
                            <div className="w-1/2 text-right"><div className="text-md font-medium text-gray-500 text-right px-2 py-1">-{CurrencySymbolByCode.USD}{parseInt(orderDetail?.giftCertificateDiscountAmount) > 0 ? parseFloat(orderDetail?.giftCertificateDiscountAmount).toFixed(2) : "0.00"}</div></div>
                        </div>
                    )}
                    {orderDetail?.refundTotal !== 0 && (
                        <div className="w-full flex mb-2 last:mb-0">
                            <div className="w-1/2 text-left">
                                <div className="text-md font-medium text-gray-500 text-left px-2 py-1"><span className="inline-block min-w-[100px] font-bold">Refunded Amount</span></div>
                            </div>
                            <div className="w-1/2 text-right"><div className="text-md font-medium text-gray-500 text-right px-2 py-1">-{CurrencySymbolByCode.USD}{parseInt(orderDetail?.refundTotal) > 0 ? parseFloat(orderDetail?.refundTotal).toFixed(2) : "0.00"}</div></div>
                        </div>
                    )}
                    {orderDetail?.customFieldTotal !== 0 && orderDetail?.customFieldTotal !== null && orderDetail?.customFieldTotal !== undefined && (
                        <div className="w-full flex mb-2 last:mb-0">
                            <div className="w-1/2 text-left">
                                <div className="text-md font-medium text-gray-500 text-left px-2 py-1"><span className="inline-block min-w-[100px] font-bold">Customization Charge</span></div>
                            </div>
                            <div className="w-1/2 text-right"><div className="text-md font-medium text-gray-500 text-right px-2 py-1">{CurrencySymbolByCode.USD}{parseInt(orderDetail?.customFieldTotal) > 0 ? parseFloat(orderDetail?.customFieldTotal).toFixed(2) : "0.00"}</div></div>
                        </div>
                    )}
                    <div className="w-full flex mb-2 last:mb-0 border-t border-neutral-200 divide-y divide-dotted">
                        <div className="w-1/2 text-left">
                            <div className="text-lg font-bold text-gray-500 text-left px-2 py-1"><span className="inline-block font-bold">Total</span></div>
                        </div>
                        <div className="w-1/2 text-right"><div className="text-lg font-bold text-gray-500 text-right px-2 py-1">{CurrencySymbolByCode.USD}{parseInt(orderDetail?.total) > 0 ? parseFloat(orderDetail?.total).toFixed(2) : "0.00"}</div></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Prices;
