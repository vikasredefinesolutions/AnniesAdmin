import React, { useEffect, useState } from "react";
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";

import Input from "components/common/formComponent/Input";
import InputNumber from "components/common/formComponent/InputNumber";
import Dropdown from "components/common/formComponent/Dropdown";
import Checkbox from "components/common/formComponent/Checkbox";
import Messages from "components/common/alerts/messages/Index";

import { CurrencySymbolByCode } from "global/Enum";

import OrderServiceCls from "services/admin/order/OrderService";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { ValidationMsgs } from "global/ValidationMessages";
import { serverError } from "services/common/helper/Helper";

const CancelOrder = ({
  setCancelOrderModal,
  orderId,
  row,
  fullOrder,
  getOrderDetails,
  getData,
  orderDetail,
}) => {
  const dispatch = useDispatch();
  const permission = useSelector((store) => store?.permission);
  const user = useSelector((store) => store?.user);
  const [orderCancelData, setOrderCancelData] = useState();
  const [reasonOptions, setReasonOptions] = useState([]);
  const [allReturnItems, setAllReturnItems] = useState([]);
  const [finalTaxCalc, setFinalTaxCalc] = useState(0);

  const initialValues = {
    orderNumber: orderId,
    shoppingCartID: 0,
    isPhoneReturn: true,
    requestByID: user?.id || 0,

    orderTotal: orderCancelData?.refundSummery?.orderTotal || 0,
    refundSubTotal: orderCancelData?.refundSummery?.refundSubTotal || 0,
    giftCardAmount: orderCancelData?.refundSummery?.giftCardAmount || 0,
    couponamount: orderCancelData?.refundSummery?.couponamount || 0,
    shippingCharges: fullOrder
      ? orderCancelData?.refundSummery?.shippingCharges
      : 0,
    shippingTax: fullOrder
      ? orderCancelData?.refundSummery?.shippingTax
      : finalTaxCalc
      ? finalTaxCalc
      : 0,
    usedCredit: orderCancelData?.refundSummery?.storeCredit,

    shoppingCartItemID: row && row.original ? row.original.id : 0,
    qty:
      orderCancelData?.returnItemsModels.length > 0
        ? orderCancelData?.returnItemsModels[0].remainQty
        : 0,
    isRefundAmount: false,
    total:
      fullOrder === true
        ? orderCancelData?.refundSummery?.refundSubTotal -
          (orderCancelData?.refundSummery?.giftCardAmount +
            orderCancelData?.refundSummery?.couponamount +
            orderCancelData?.refundSummery?.storeCredit)
        : orderCancelData?.returnItemsModels[0]?.qty *
          orderCancelData?.returnItemsModels[0]?.price,

    issueRefund: 0,
    storeCredit: 0,
    shippingChargesCheckBox: false,
    shippingTaxCheckBox: true,
    refundReason: "",
    quantity:
      orderCancelData?.returnItemsModels.length > 0
        ? orderCancelData?.returnItemsModels[0].remainQty
        : 0,
  };

  const validationSchema = Yup.object().shape({
    issueRefund: Yup.number()
      .required(ValidationMsgs.order.issueRefund)
      .max(
        Yup.ref("total"),
        `${ValidationMsgs.order.issueRefundMax} ${initialValues?.total?.toFixed(
          2
        )}`
      ),
    storeCredit: Yup.number()
      .required(ValidationMsgs.order.storeCredit)
      .max(
        Yup.ref("total"),
        `${ValidationMsgs.order.storeCreditMax} ${initialValues.total}`
      ),
    refundReason: Yup.string().required(ValidationMsgs.order.reason),
    quantity:
      !fullOrder &&
      Yup.number()
        .required(ValidationMsgs.order.quantity)
        .min(1, ValidationMsgs.order.quantity)
        .max(Yup.ref("qty"), ValidationMsgs.order.quantityMax),
  });

  const onSubmit = (fields) => {
    if (fields.issueRefund === 0 && fields.storeCredit === 0) {
      dispatch(
        setAlertMessage({
          type: "danger",
          message: "Please enter amount in either Issue Refund or Store Credit",
        })
      );
    } else {
      dispatch(setAddLoading(true));
      const finalOrderObj = {
        orderNumber: fields.orderNumber,
        shoppingCartID: 0,
        isPhoneReturn: true,
        requestByID: fields.requestByID,
        refundReason: fields.refundReason,
        refundSummery: {
          orderTotal: 0,
          refundSubTotal:
            Number(fields.issueRefund) || Number(fields.storeCredit) || 0,
          giftCardAmount: 0,
          couponamount: 0,
          shippingCharges:
            fullOrder === true && fields.shippingChargesCheckBox === true
              ? fields.shippingCharges
              : fields.shippingCharges > 0
              ? Number(fields.shippingCharges)
              : 0,
          shippingTax:
            fullOrder === true && fields.shippingTaxCheckBox === true
              ? fields.shippingTax
              : fields.shippingTax > 0
              ? Number(fields.shippingTax)
              : 0,
        },
        returnItemQuantities:
          fullOrder === true
            ? allReturnItems
            : [
                {
                  shoppingCartItemID: fields.shoppingCartItemID,
                  quantity: fields.quantity > 0 ? Number(fields.quantity) : 0,
                },
              ],
        isRefundAmount: fields.issueRefund > 0 ? true : false,
      };

      OrderServiceCls.confirmReturnOrder({
        returnConfirmModel: finalOrderObj,
      })
        .then((response) => {
          if (response?.data?.success && response?.data?.data) {
            dispatch(
              setAlertMessage({
                type: "success",
                message: "Order Cancel successfully",
              })
            );
            getOrderDetails();
            getData();
          } else {
            dispatch(
              setAlertMessage({
                type: "danger",
                message: serverError(response),
              })
            );
          }
          setCancelOrderModal((prev) => !prev);
          dispatch(setAddLoading(false));
        })
        .catch((error) => {
          dispatch(
            setAlertMessage({
              type: "danger",
              message: "Order not calcelled",
            })
          );
          dispatch(setAddLoading(false));
          setCancelOrderModal((prev) => !prev);
        });
    }
  };

  useEffect(() => {
    if (!fullOrder) {
      let plantPrice =
        orderCancelData &&
        Number(orderCancelData?.returnItemsModels[0]?.price.toFixed(2));

      let q =
        orderCancelData?.returnItemsModels.length > 0
          ? Number(orderCancelData?.returnItemsModels[0].remainQty).toFixed(2)
          : 0;

      let finalTotal = plantPrice * q;

      let taxCalc =
        (finalTotal *
          Number(orderCancelData?.refundSummery?.shippingTax?.toFixed(2))) /
        Number(orderDetail?.subTotal);

      setFinalTaxCalc(taxCalc.toFixed(2));
    } else {
      setFinalTaxCalc(0);
    }
  }, [orderCancelData, orderDetail]);

  useEffect(() => {
    if (orderId) {
      dispatch(setAddLoading(true));
      OrderServiceCls.cancelOrder(
        orderId,
        row?.original ? row?.original?.id : 0
      )
        .then((response) => {
          let reason = [];
          let returnItems = [];
          if (response?.data?.success && response?.data?.data) {
            setOrderCancelData(response.data.data);
            const messageLists = response?.data?.data?.returnMessageLists;
            const allItems = response?.data?.data?.returnItemsModels;

            if (messageLists.length > 0) {
              messageLists.map((items) => {
                reason = [
                  ...reason,
                  { label: items.message, value: items.message },
                ];
              });
            }
            setReasonOptions(reason);

            if (allItems.length > 0) {
              allItems.map((returnAllItems) => {
                returnItems = [
                  ...returnItems,
                  {
                    quantity: returnAllItems.remainQty,
                    shoppingCartItemID: returnAllItems.shoppingCartItemID,
                  },
                ];
              });
            }
            setAllReturnItems(returnItems);
          }
          dispatch(setAddLoading(false));
        })
        .catch((error) => {
          dispatch(setAddLoading(false));
        });
    }
  }, [orderId]);

  return (
    <>
      <div className="overflow-y-auto overflow-x-hidiven fixed z-30 right-0 left-0 top-4 justify-center items-center h-modal md:h-full md:inset-0">
        <div className="w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="relative px-4 w-full max-w-2xl h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow max-h-screen overflow-y-auto">
              <div className="flex justify-between items-start p-5 rounded-t border-b sticky top-0 left-0 bg-white">
                <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl">
                  {fullOrder ? "Cancel Order" : "Cancel Line Item"}
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                  data-modal-toggle="actionModal"
                  onClick={() => setCancelOrderModal((prev) => !prev)}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodiv"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodiv"
                    />
                  </svg>
                </button>
              </div>
              <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
              >
                {({ setFieldValue, values }) => {
                  return (
                    <FormikForm>
                      <Messages />
                      <div className="gap-6 p-6">
                        <div className="border-b mb-6">
                          {fullOrder && (
                            <>
                              <div className="flex flex-wrap gap-1 mb-4 items-center">
                                <label className="w-1/4 text-sm font-medium text-gray-500">
                                  Amount :
                                </label>
                                <div className="text-sm font-bold text-gray-900 text-right">
                                  {`${
                                    CurrencySymbolByCode.USD
                                  } ${values.refundSubTotal.toFixed(2)}`}
                                </div>
                              </div>

                              {values.giftCardAmount > 0 && (
                                <div className="flex flex-wrap gap-1 mb-4 items-center">
                                  <label className="w-1/4 text-sm font-medium text-gray-500">
                                    Gift Card :
                                  </label>
                                  <div className="text-sm font-bold text-gray-900 text-right">
                                    {`-${
                                      CurrencySymbolByCode.USD
                                    } ${values.giftCardAmount.toFixed(2)}`}
                                  </div>
                                </div>
                              )}

                              {values.couponamount > 0 && (
                                <div className="flex flex-wrap gap-1 mb-4 items-center">
                                  <label className="w-1/4 text-sm font-medium text-gray-500">
                                    Coupon Amount :
                                  </label>
                                  <div className="text-sm font-bold text-gray-900 text-right">
                                    {`-${
                                      CurrencySymbolByCode.USD
                                    } ${values?.couponamount?.toFixed(2)}`}
                                  </div>
                                </div>
                              )}

                              <div className="flex flex-wrap gap-1 mb-4 items-center">
                                <label className="w-1/4 text-sm font-medium text-gray-500">
                                  Shipping :
                                </label>
                                <div className="text-sm font-bold text-gray-900 text-right">
                                  {`${CurrencySymbolByCode.USD} ${
                                    values?.shippingCharges > 0
                                      ? values?.shippingCharges?.toFixed(2)
                                      : "0.00"
                                  }`}
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-1 mb-4 items-center">
                                <label className="w-1/4 text-sm font-medium text-gray-500">
                                  Tax :
                                </label>
                                <div className="text-sm font-bold text-gray-900 text-right">
                                  {`${CurrencySymbolByCode.USD} ${
                                    values?.shippingTax > 0
                                      ? values?.shippingTax?.toFixed(2)
                                      : "0.00"
                                  }`}
                                </div>
                              </div>

                              {values?.usedCredit > 0 && (
                                <div className="flex flex-wrap gap-1 mb-4 items-center">
                                  <label className="w-1/4 text-sm font-medium text-gray-500">
                                    Store Credit :
                                  </label>
                                  <div className="text-sm font-bold text-gray-900 text-right">
                                    {`-${
                                      CurrencySymbolByCode.USD
                                    } ${values?.usedCredit?.toFixed(2)}`}
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                          {!fullOrder && (
                            <>
                              <div className="flex flex-wrap gap-1 mb-4 items-center">
                                <label className="w-1/4 text-sm font-medium text-gray-500">
                                  Plant Name :
                                </label>
                                <div className="text-sm font-bold text-gray-900 text-right">
                                  {orderCancelData &&
                                    orderCancelData?.returnItemsModels[0]?.name}
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-1 mb-4 items-center">
                                <label className="w-1/4 text-sm font-medium text-gray-500">
                                  Plant Price :
                                </label>
                                <div className="text-sm font-bold text-gray-900 text-right">
                                  {orderCancelData &&
                                    `${
                                      CurrencySymbolByCode.USD
                                    } ${orderCancelData?.returnItemsModels[0]?.price.toFixed(
                                      2
                                    )}`}
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-1 mb-4 items-center">
                                <label className="w-1/4 text-sm font-medium text-gray-500">
                                  Quantity :
                                </label>
                                <div className="flex w-96 text-sm font-bold text-gray-900 text-left items-center gap-2">
                                  <Input
                                    className={"w-24"}
                                    value={values.quantity}
                                    name={"quantity"}
                                    onKeyPress={(event) => {
                                      if (!/^\d*$/.test(event.key)) {
                                        event.preventDefault();
                                      }
                                    }}
                                    onChange={(e) => {
                                      let plantPrice =
                                        orderCancelData &&
                                        Number(
                                          orderCancelData?.returnItemsModels[0]?.price.toFixed(
                                            2
                                          )
                                        );
                                      let q = Number(e.target.value).toFixed(2);
                                      let finalTotal = plantPrice * q;
                                      setFieldValue("quantity", e.target.value);
                                      setFieldValue("total", finalTotal);

                                      // For Tax calculation
                                      let taxCalc =
                                        (finalTotal *
                                          orderCancelData?.refundSummery?.shippingTax?.toFixed(
                                            2
                                          )) /
                                        orderDetail?.subTotal;

                                      let finalTaxCalc = taxCalc.toFixed(2);
                                      setFieldValue(
                                        "shippingTax",
                                        finalTaxCalc
                                      );
                                      // End
                                    }}
                                  />

                                  {orderCancelData &&
                                    `/${orderCancelData?.returnItemsModels[0]?.remainQty}`}
                                </div>
                              </div>
                            </>
                          )}

                          <div className="flex flex-wrap gap-1 mb-4 items-center">
                            <label className="w-1/4 text-sm font-medium text-gray-500">
                              Total :
                            </label>
                            <div className="text-sm font-bold text-gray-900 text-right">
                              {fullOrder
                                ? `${
                                    CurrencySymbolByCode.USD
                                  } ${values.orderTotal.toFixed(2)}`
                                : orderCancelData &&
                                  orderCancelData?.returnItemsModels[0]
                                    ?.price &&
                                  orderCancelData?.returnItemsModels[0]?.qty
                                ? `${CurrencySymbolByCode.USD} ${(
                                    values.total ||
                                    orderCancelData?.returnItemsModels[0]?.qty *
                                      orderCancelData?.returnItemsModels[0]
                                        ?.price
                                  ).toFixed(2)}`
                                : 0}
                            </div>
                          </div>
                        </div>

                        <div className="mb-4 flex gap-[20px] items-center">
                          <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold w-[120px] text-left">
                            Issue Refund :
                          </label>
                          <div className="text-sm font-bold text-gray-900 text-left items-center">
                            <InputNumber
                              className={"w-52"}
                              value={values.issueRefund}
                              name={"issueRefund"}
                              displayError={true}
                              onChange={(e) => {
                                setFieldValue("issueRefund", e.target.value);
                                setFieldValue("storeCredit", 0);
                              }}
                            />
                          </div>
                        </div>

                        <div className="mb-4 flex gap-[20px] items-center">
                          <label className="w-[120px]" />
                          <div className="text-sm font-bold text-gray-900 text-center w-52">
                            OR
                          </div>
                        </div>

                        <div className="mb-4 flex gap-[20px] items-center">
                          <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold w-[120px] text-left">
                            Store Credit :
                          </label>
                          <div className="text-sm font-bold text-gray-900 text-left items-center">
                            <InputNumber
                              className={"w-52"}
                              value={values.storeCredit}
                              displayError={true}
                              name={"storeCredit"}
                              onChange={(e) => {
                                setFieldValue("storeCredit", e.target.value);
                                setFieldValue("issueRefund", 0);
                              }}
                            />
                          </div>
                        </div>

                        {!fullOrder && (
                          <>
                            <div className="mb-4 flex gap-[20px] items-center">
                              <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold w-[120px] text-left">
                                Shipping Charges :
                              </label>
                              <div className="text-sm font-bold text-gray-900 text-left items-center flex gap-2">
                                <InputNumber
                                  className={"w-52"}
                                  value={values.shippingCharges}
                                  displayError={true}
                                  name={"shippingCharges"}
                                  onChange={(e) => {
                                    setFieldValue(
                                      "shippingCharges",
                                      e.target.value
                                    );
                                  }}
                                />
                                {`Total Shipping : (${
                                  CurrencySymbolByCode.USD
                                } ${
                                  orderCancelData?.refundSummery
                                    ?.shippingCharges > 0
                                    ? orderCancelData?.refundSummery?.shippingCharges?.toFixed(
                                        2
                                      )
                                    : "0.00"
                                })`}
                              </div>
                            </div>

                            <div className="mb-4 flex gap-[20px] items-center">
                              <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold w-[120px] text-left">
                                Tax :
                              </label>
                              <div className="text-sm font-bold text-gray-900 text-left items-center flex gap-2">
                                <InputNumber
                                  className={"w-52"}
                                  value={values.shippingTax}
                                  displayError={true}
                                  name={"shippingTax"}
                                  onChange={(e) => {
                                    setFieldValue(
                                      "shippingTax",
                                      e.target.value
                                    );
                                  }}
                                />
                                {`Total Tax : (${CurrencySymbolByCode.USD} ${
                                  orderCancelData?.refundSummery?.shippingTax >
                                  0
                                    ? orderCancelData?.refundSummery?.shippingTax?.toFixed(
                                        2
                                      )
                                    : "0.00"
                                })`}
                              </div>
                            </div>
                          </>
                        )}

                        {fullOrder && (
                          <>
                            {values.shippingCharges > 0 && (
                              <>
                                <div className="mb-4 flex gap-[20px] items-center">
                                  <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold w-[120px] text-left">
                                    Include Shipping Charge :
                                  </label>
                                  <Checkbox
                                    name="shippingChargesCheckBox"
                                    id="shippingChargesCheckBox"
                                    checked={values.shippingChargesCheckBox}
                                    onChange={(e) => {
                                      setFieldValue(
                                        "shippingChargesCheckBox",
                                        e.target.checked
                                      );
                                    }}
                                  />
                                  {`(${
                                    CurrencySymbolByCode.USD
                                  } ${values.shippingCharges.toFixed(2)})`}
                                </div>
                              </>
                            )}
                            {values.shippingTax > 0 && (
                              <div className="mb-4 flex gap-[20px] items-center">
                                <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold w-[120px] text-left">
                                  Include Tax :
                                </label>
                                <Checkbox
                                  name="shippingTaxCheckBox"
                                  id="shippingTaxCheckBox"
                                  checked={values.shippingTaxCheckBox}
                                  onChange={(e) => {
                                    setFieldValue(
                                      "shippingTaxCheckBox",
                                      e.target.checked
                                    );
                                  }}
                                />
                                {`(${
                                  CurrencySymbolByCode.USD
                                } ${values.shippingTax.toFixed(2)})`}
                              </div>
                            )}
                          </>
                        )}

                        <div className="mb-4 flex gap-[20px] items-center">
                          <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold w-[120px] text-left">
                            Reason :
                            <span className="text-rose-500 text-2xl leading-none">
                              *
                            </span>
                          </label>
                          <div className="text-sm font-bold text-gray-900 text-left items-center">
                            <Dropdown
                              classNames={"w-80"}
                              label="Reason"
                              name={"refundReason"}
                              options={reasonOptions}
                              defaultValue={values.refundReason}
                              placeholder="Select Reason"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-center p-6 space-x-2 rounded-b border-t border-gray-200">
                        <button
                          type="button"
                          className="btn bg-white border-neutral-200 text-gray-500 hover:text-gray-700"
                          onClick={() => setCancelOrderModal((prev) => !prev)}
                        >
                          Cancel
                        </button>

                        {(permission?.isEdit || permission?.isDelete) && (
                          <button
                            type="Submit"
                            className={`flex justify-center btn px-6 bg-indigo-500 hover:bg-indigo-600 text-white`}
                          >
                            <div
                              className={`w-full flex justify-center align-middle `}
                            >
                              Cancel Order
                            </div>
                          </button>
                        )}
                      </div>
                    </FormikForm>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CancelOrder;
