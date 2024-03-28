/*Component Name: InvoicePrintTemplate
Component Functional Details:  InvoicePrintTemplate .
Created By: PK Kher
Created Date: <Creation Date>
Modified By: PK Kher
Modified Date: <Modified Date> */

import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

import { CurrencySymbolByCode } from 'global/Enum';

import { DateTimeFormat } from 'services/common/helper/Helper';
import OrderService from 'services/admin/order/OrderService';

import { setAddLoading } from 'redux/globalLoader/GlobalLoaderAction';
import { setAlertMessage } from 'redux/alertMessage/AlertMessageReducers';
import Prices from './Prices';

const InvoicePrintTemplate = () => {
    const location = useSelector(store => store?.location);
    const dispatch = useDispatch();
    const print = useRef();
    const AdminAppConfigReducers = useSelector((store) => store?.AdminAppConfigReducers);
    const handlePrint = useReactToPrint({
        content: () => print.current,
    });
    const [orderItems, setOrderItems] = useState([]);
    const [orderDetail, setOrderDetail] = useState({});
    const { id } = useParams();

    const storeIdFromDropDown = useSelector((store) => store?.TempDataReducer?.order?.storeIdFromDropDown);

    let multipleStoreId = [];

    useEffect(() => {
        if (storeIdFromDropDown && storeIdFromDropDown.length) {
            storeIdFromDropDown.map((value) => {
                if (value.label === "All Stores") {
                    value.value.split(",").map((stId) => multipleStoreId.push(stId))
                } else {
                    multipleStoreId.push(value.value)
                }
            });
        }
    }, [storeIdFromDropDown]);

    const getOrderItems = useCallback(
        (pageIndex) => {
            OrderService.OrderedShoppingCartItems({
                pageSearchArgs: {
                    pageIndex: 0,
                    pageSize: 0,
                    pagingStrategy: 0,
                    filteringOptions: [
                        {
                            field: "isItemCancel",
                            operator: 1,
                            value: false
                        }
                    ]
                },
                orderId: id,
                productTypeId: 0
            }).then((response) => {
                if (response?.data?.data?.items) {
                    setOrderItems(response.data.data?.items);
                }
            }).catch(() => {
            })
        },
        [orderDetail]
    );

    useEffect(() => {
        getOrderItems();
        getOrderDetails();
    }, [id]);

    const getOrderDetails = () => {
        dispatch(setAddLoading(true));
        OrderService.getOrderDetails({
            orderNumber: id,
            storeIdList: [5],
            ...location
        }).then((response) => {
            if (response?.data?.success && response.data.data) {
                setOrderDetail(response.data.data);
            } else {
                dispatch(setAlertMessage({
                    message: "Order not found.",
                    type: 'danger'
                }));
                // navigate('/admin/Order/orders');
            }
            dispatch(setAddLoading(false));
        }).catch(() => {
            dispatch(setAddLoading(false));
        })
    }
    return (
        <>
            <title>Order Receipt: #{orderDetail?.orderNumber}</title>
            <div className='px-4 sm:px-6 lg:px-8 py-8 w-full'>
                <div className='sm:flex sm:justify-between mb-8 sm:flex-wrap sm:items-start'>
                    <div c0lass="flex mb-4 sm:mb-0 grow">
                        <NavLink to={`/admin/order/orders/edit/${orderDetail?.orderNumber}`} className="inline-flex btn border-neutral-200 hover:border-neutral-400 text-gray-500 hover:text-gray-700 items-center mr-2"> <span className="material-icons-outlined">west</span> </NavLink>
                        <div className="inline-flex items-center gap-2 flex-wrap">
                            <h1 className="text-2xl md:text-3xl text-gray-800 font-bold inline-flex">Orders Receipt: #{orderDetail?.orderNumber}</h1>

                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center gap-4 mr-4">
                            <button type='button' onClick={handlePrint} className='btn bg-indigo-500 hover:bg-indigo-600 text-white ml-2 first:ml-0'>Print Invoice</button>
                        </div>
                    </div>
                </div>
                <div className="" style={{ fontFamily: 'Raleway,sans-serif' }} id="printpdfpage" ref={print}>
                    <title>Order Receipt: #{orderDetail?.orderNumber}</title>
                    <div className="mx-auto bg-white min-h-screen px-5">
                        <div className="px-4 py-4 border-b border-neutral-200 text-center">
                            <img className="inline-block w-72" src={AdminAppConfigReducers["azure:BlobUrl"] + orderDetail?.storeLogo} alt="" />
                        </div>
                        <div className="grid grid-cols-2 px-4 py-1 border-b border-neutral-200">
                            <div className="">
                                <div className="font-semibold">Order # : {orderDetail?.orderNumber}</div>
                            </div>
                            <div className=" text-right">
                                <div className="font-semibold">Order Date :{orderDetail?.orderDate ? DateTimeFormat(orderDetail?.orderDate).date + " " + DateTimeFormat(orderDetail?.orderDate).time : ''}</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 px-4 py-4 border-b border-neutral-200">
                            <div className="w-full ">
                                <div className="font-semibold mb-1">Shipping Address</div>
                                <div className="">
                                    {orderDetail?.shippingAddress?.name}<br />
                                    {orderDetail?.shippingAddress?.email ? <>{orderDetail?.shippingAddress?.email}<br /></> : ''}
                                    {orderDetail?.shippingAddress?.address1}<br />
                                    {orderDetail?.shippingAddress?.address2 && <>{orderDetail?.shippingAddress?.address2}<br /></>}
                                    {orderDetail?.shippingAddress?.city}, {orderDetail?.shippingAddress?.state},{orderDetail?.shippingAddress?.country}, {orderDetail?.shippingAddress?.zipCode}<br />
                                    {orderDetail?.shippingAddress?.phone}
                                </div>
                            </div>
                            <div className="w-full ">
                                <div className="font-semibold mb-1">Billing Address</div>
                                <div className="">
                                    {orderDetail?.billingAddress?.name}<br />
                                    {orderDetail?.billingAddress?.email}<br />
                                    {orderDetail?.billingAddress?.address1}<br />
                                    {orderDetail?.billingAddress?.address2 && <>{orderDetail?.billingAddress?.address2}<br /></>}
                                    {orderDetail?.billingAddress?.city}, {orderDetail?.billingAddress?.state},{orderDetail?.billingAddress?.country}, {orderDetail?.billingAddress?.zipCode}<br />
                                    {orderDetail?.billingAddress?.phone}
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <table className="table-auto w-full text-sm text-[#191919] font-semibold">
                                <thead className="text-sm font-bold uppercase text-[#b3b3b3] border-b border-neutral-200">
                                    <tr>
                                        <th className="px-2 py-2" colSpan="2">
                                            <div className="font-semibold text-left max-w-sm flex items-center"> <span>Line Items</span></div>
                                        </th>
                                        <th className="px-2 py-2" colSpan="2">
                                            <div className="font-semibold text-left max-w-sm flex items-center">QTY</div>
                                        </th>
                                        <th className="px-2 py-2">
                                            <div className="font-semibold text-left max-w-sm flex items-center">Price</div>
                                        </th>
                                        <th className="px-2 py-2 flex items-center justify-end">
                                            <div className="font-semibold text-right max-w-sm flex items-center justify-end">
                                                <span>Subtotal</span>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm divide-y divide-slate-200 border-b border-neutral-200">
                                    {
                                        orderItems.map((value, index) => {
                                            console.log(value,"value")
                                            return (
                                                <tr key={value?.id}>
                                                    <td className="px-2 py-3 whitespace-nowrap w-px">
                                                        <div className='flex flex-row'>
                                                            <div className="h-24 w-24 shrink-0 mr-2 sm:mr-3">
                                                                <img className="max-w-20 max-h-20" src={`${AdminAppConfigReducers["azure:BlobUrl"]}${value?.colorImage}`} alt="" />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-2 py-3">
                                                        <div className='w-full'>
                                                            <div className="">{value?.productName}</div>
                                                            <div className="text-[#707070] text-sm font-normal">SKU: {value?.sku || '-'} </div>
                                                            <div className="text-[#707070] text-sm font-normal">Unit: {value?.qty } </div>
                                                        </div>
                                                    </td>
                                                    <td></td>
                                                    <td className="px-2 py-3"><span>{value?.qty}</span></td>
                                                    <td className="px-2 py-3"><span>{value?.price}</span></td>
                                                    <td className="px-2 py-3 text-right"><span>{`${CurrencySymbolByCode.USD}${parseFloat(value?.subTotal).toFixed(2) || 0.00}`}</span></td>
                                                </tr>
                                            );
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>
                        <Prices orderDetail={orderDetail} />
                        <div className="text-center px-4 pt-2">© {new Date().getFullYear()} {orderDetail?.storeName} All Rights Reserved</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InvoicePrintTemplate;
