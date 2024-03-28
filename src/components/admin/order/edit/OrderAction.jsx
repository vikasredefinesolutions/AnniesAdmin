/*Component Name: Action
Component Functional Details:  Action .
Created By: PK Kher
Created Date: <Creation Date>
Modified By: PK Kher
Modified Date: <Modified Date> */

import { useState, useRef, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import Transition from 'utils/Transition';

import OrderService from 'services/admin/order/OrderService';
import { serverError } from 'services/common/helper/Helper';
import { ValidationMsgs } from 'global/ValidationMessages';

import { setAlertMessage } from 'redux/alertMessage/AlertMessageReducers';
import { hideAlertMessage } from "redux/alertMessage/AlertMessageActions";
import { setAddLoading } from 'redux/globalLoader/GlobalLoaderAction';

import OldOrders from './OldOrders';
import ManualShippingModals from './ManualShipping';

const OrderAction = ({ getOrderDetails, orderDetail, shippingOptions, ProductData }) => {
    const dispatch = useDispatch();

    const permission = useSelector(store => store?.permission);
    const location = useSelector(store => store.location);

    const [orderModal, setOrderModal] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [ManualShipping, setManualShipping] = useState(false);

    const { id } = useParams();
    const trigger = useRef(null);
    const dropdown = useRef(null);

    const editDeletePerm = (permission?.isEdit || permission?.isDelete);

    const review = useCallback(() => {
        setDropdownOpen(false);
        dispatch(setAddLoading(true));
        OrderService.reviewOrder({
            orderId: id,
            ...location
        }).then((response) => {
            if (response?.data?.success && response?.data?.data) {
                dispatch(setAlertMessage({
                    message: ValidationMsgs.order.reviewMailSend,
                    type: 'success'
                }));
            } else {
                dispatch(setAlertMessage({
                    message: ValidationMsgs.order.reviewMailNotSend,
                    type: 'danger'
                }));
            }
            dispatch(setAddLoading(false));
        }).catch(() => {
            dispatch(setAlertMessage({
                message: ValidationMsgs.order.reviewMailNotSend,
                type: 'danger'
            }));
            dispatch(setAddLoading(false));

        });
    }, [id, location]);

    // const duplicate = useCallback(() => {
    //     setDropdownOpen(false);
    //     dispatch(setAddLoading(true));
    //     OrderService.duplicateOrder({
    //         orderId: id,
    //         userId: user.id,
    //         ...location
    //     }).then((response) => {
    //         if (response?.data?.success && response?.data?.data) {
    //             dispatch(setAlertMessage({
    //                 message: ValidationMsgs.order.duplicateOrder,
    //                 type: 'success'
    //             }))
    //             getOrderDetails();
    //         } else {
    //             dispatch(setAlertMessage({
    //                 message: ValidationMsgs.order.orderNotDuplicate,
    //                 type: 'danger'
    //             }));
    //         }
    //         dispatch(setAddLoading(false));
    //     }).catch(() => {
    //         dispatch(setAlertMessage({
    //             message: ValidationMsgs.order.orderNotDuplicate,
    //             type: 'danger'
    //         }));
    //         dispatch(setAddLoading(false));

    //     });
    // }, [id, location, user]);

    const fraud = useCallback(() => {
        setDropdownOpen(false);
        dispatch(setAddLoading(true));
        OrderService.orderFraud({
            orderId: id,
            isFraudStatus: true,
            ...location
        }).then((response) => {
            if (response?.data?.success) {
                dispatch(setAlertMessage({
                    message: ValidationMsgs.order.fraud,
                    type: 'success'
                }));
            } else {
                dispatch(setAlertMessage({
                    message: serverError(response),
                    type: 'danger'
                }));
            }
            dispatch(setAddLoading(false));
        }).catch(() => {
            dispatch(setAddLoading(false));
            dispatch(setAlertMessage({
                message: ValidationMsgs.order.statusNotChange,
                type: 'danger'
            }));
        });
    }, [id, location]);

    const blockOrderIP = useCallback(() => {
        setDropdownOpen(false);
        dispatch(setAddLoading(true));
        OrderService.blockOrderIP({
            orderId: id,
            isBlockIP: true,
            ...location
        }).then((response) => {
            if (response?.data?.success && response?.data?.data) {
                dispatch(setAlertMessage({
                    message: ValidationMsgs.order.orderIPBlocked,
                    type: 'success'
                }));
            } else {
                dispatch(setAlertMessage({
                    message: ValidationMsgs.order.orderIPNotBlocked,
                    type: 'danger'
                }));
            }
            dispatch(setAddLoading(false));
        }).catch(() => {
            dispatch(setAlertMessage({
                message: ValidationMsgs.order.orderIPBlocked,
                type: 'danger'
            }));
            dispatch(setAddLoading(false));

        });
    }, [id, location]);

    const cancelOrder = useCallback(() => {
        if (orderDetail?.orderStatus === "Cancelled") {
            dispatch(
                setAlertMessage({
                    message: ValidationMsgs.order.AlreadyCanceledOrder,
                    type: "warning",
                })
            );
            setDropdownOpen(false);
        } else {
            setDropdownOpen(false);
            dispatch(setAddLoading(true));
            OrderService.cancelOrder({
                orderId: id,
                isCancelStatus: true,
                ...location,
            })
                .then((response) => {
                    if (response?.data?.success) {
                        dispatch(
                            setAlertMessage({
                                message: ValidationMsgs.order.cancelOrder,
                                type: "success",
                            })
                        );
                        dispatch(setAddLoading(false));
                        getOrderDetails();
                    } else {
                        dispatch(
                            setAlertMessage({
                                message: serverError(response.data.data),
                                type: "danger",
                            })
                        );
                    }
                    dispatch(setAddLoading(false));
                })
                .catch(() => {
                    dispatch(
                        setAlertMessage({
                            message: ValidationMsgs.order.orderNotCanceled,
                            type: "danger",
                        })
                    );
                    dispatch(setAddLoading(false));
                });
        }
    }, [id, location, orderDetail]);

    const handleManualShipping = useCallback(() => {
        setManualShipping(true)
        setDropdownOpen(false)
    }, [])

    const handleMoreAction = () => {
        setDropdownOpen(prev => !prev)
        dispatch(hideAlertMessage());
    }

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!dropdown.current) return;
            if (
                !dropdownOpen ||
                dropdown.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setDropdownOpen(false);
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    });
    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!dropdownOpen || keyCode !== 27) return;
            setDropdownOpen(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    });

    return (
        <>
            <div className="relative inline-flex">
                <button ref={trigger} type='button' onClick={handleMoreAction} className="flex flex-wrap items-center text-sm text-indigo-500" aria-haspopup="true" aria-expanded="false">
                    <span >More Action</span> <span className="material-icons-outlined">expand_more</span>
                </button>
                <Transition
                    show={dropdownOpen}
                    tag="div"
                    className="origin-top-left z-10 absolute top-full right-0 min-w-72 bg-white border border-neutral-200 pt-1.5 rounded shadow-lg overflow-hidden mt-1"
                    enter="transition ease-out duration-100 transform"
                    enterStart="opacity-0 -translate-y-2"
                    enterEnd="opacity-100 translate-y-0"
                    leave="transition ease-out duration-100"
                    leaveStart="opacity-100"
                    leaveEnd="opacity-0"
                >
                    <ul className="my-2 mx-1 text-sm" ref={dropdown}>
                        {true && <li className="py-4 px-3 cursor-pointer" onClick={handleManualShipping}>
                            <span className="flex items-center text-indigo-500"><span className="material-icons-outlined">local_shipping</span><span className="ml-2">Manual Shipping</span></span>
                        </li>}
                        {editDeletePerm && <li className="py-4 px-3 cursor-pointer" onClick={review}>
                            <span className="flex items-center text-indigo-500"><span className="material-icons-outlined">preview</span><span className="ml-2">Send review request email</span></span>
                        </li>}
                        <li className="py-4 px-3 cursor-pointer" onClick={() => setOrderModal(true)}>
                            <span className="flex items-center text-indigo-500"><span className="material-icons-outlined">visibility</span><span className="ml-2">View Old Orders</span></span>
                        </li>
                        {/* {editDeletePerm && <li className="py-4 px-3 cursor-pointer" onClick={duplicate}>
                            <span className="flex items-center text-indigo-500"><span className="material-icons-outlined">content_copy</span><span className="ml-2">Duplicate</span></span>
                        </li>} */}
                        {/* {(editDeletePerm && orderDetail?.paymentStatus !== 'Fraud') && <li className="py-4 px-3 cursor-pointer" onClick={fraud}>
                            <span className="flex items-center text-indigo-500"><span className="material-icons-outlined">no_accounts</span><span className="ml-2">Fraud</span></span>
                        </li>} */}
                        {/* <li className={`py-2 px-3 ${editDeletePerm ? 'cursor-pointer' : ''}`} onClick={editDeletePerm ? blockOrderIP : () => { }}>
                            <div className='flex justify-between'>
                                <span className={`flex items-center ${editDeletePerm ? 'text-indigo-500' : 'text-indigo-300'}`}>
                                    <span className="material-icons-outlined">desktop_access_disabled</span>
                                    <span className="ml-2">Block IP</span>
                                </span>
                                {orderDetail?.isBlockIpAddress && <span className="material-icons-outlined text-green-500">done</span>}
                            </div>
                        </li> */}
                        {((permission?.isDelete) && orderDetail?.fulfillmentStatus !== 'Cancelled') && <li className="py-4 px-3 cursor-pointer" onClick={cancelOrder}>
                            <span className="flex items-center text-indigo-500"><span className="material-icons-outlined">close</span><span className="ml-2">Cancel Order</span></span>
                        </li>}
                    </ul>
                </Transition>
                <OldOrders orderDetails={orderDetail} OrderModal={orderModal} setOrderModal={setOrderModal} />
                <ManualShippingModals ManualShipping={ManualShipping} setManualShipping={setManualShipping} shippingOptions={shippingOptions} orderDetail={orderDetail} ProductData={ProductData} id={id} />
            </div>
        </>
    );
};

export default OrderAction;
