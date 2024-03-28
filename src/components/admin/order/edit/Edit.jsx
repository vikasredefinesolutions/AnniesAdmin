import React, { useState, useEffect, useCallback } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { DateTimeFormat, TitleNameHelper } from "services/common/helper/Helper";
import StoreCustomerService from "services/front/StoreCustomerService";
import CustomerService from "services/admin/customer/CustomerService";
import OrderService from "services/admin/order/OrderService";
import StoreService from "services/admin/store/StoreService";

import { ValidationMsgs } from "global/ValidationMessages";
import { paginationDetails, orderNotes, anniesAnnualData } from "global/Enum";

import { fillSerchQuery } from "redux/searchQueryForMGS/SearchQueryAction";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import Select from "components/common/formComponent/Select";

import GeneralStatus from "components/common/displayStatus/General";
import Messages from "components/common/alerts/messages/Index";
import BasicModal from "components/common/modals/Basic";

import CustomerInformation from "../subComponents/CustomerInfo";
import ShippingAddress from "../subComponents/ShippingAddress";
import BillingAddress from "../subComponents/BillingAddress";
import General from "../list/customerOrderDetail/General";
import OrderDetails from "../subComponents/OrderDetails";
import PaymentInformaton from "./PaymentInformaton";
import UploadDocument from "./UploadDocument";
import TrackingInfo from "./TrackingInfo";
import Invoice from "./invoice/Invoice";
import OrderAction from "./OrderAction";
import DropdownStatus from "./Status";
import Items from "./Items/Items";
import Timeline from "./Timeline";
import Note from "./Note";
import Log from "./Log";
import Tag from "./Tag";
import CancelOrder from "./CancelOrder";

const Create = ({ statusList }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const location = useSelector((store) => store?.location);
  const searchQuery = useSelector(
    (store) => store?.SearchQueryReducers?.searchQuery
  );
  const orderStoreId = useSelector(
    (store) => store?.TempDataReducer?.order?.storeId
  );

  const [orderDetail, setOrderDetail] = useState({});
  const [displayMessage, setDisplayMessage] = useState(true);
  const [CustomerOrderModal, setCustomerOrderModal] = useState({
    state: false,
    fromWhereItIsClicked: "",
    currenttab: 0,
  });
  const [openBasicModal, setOpenBasicModal] = useState(false);
  const [customerData, setCustomerData] = useState({});
  const [shippingOptions, setShippingOptions] = useState([]);
  const [Data, setData] = useState([]);
  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
  });
  const [productTypeId, setProductTypeId] = useState(0);
  const [sortingOptions, setSortingOptions] = useState([]);
  const [StoreData, setStoreData] = useState({});
  const [shipRemainQtyModal, setShipRemainQtyModal] = useState(false);
  const [cancelOrderModal, setCancelOrderModal] = useState(false);

  // const [shipCarrier, setShipCarrier] = useState([]);
  // const [selectedShipCarrier, setSelectedShipCarrier] = useState("");

  const isAddMode = !id;
  useEffect(() => {
    if (!isAddMode && anniesAnnualData.storeId) {
      getOrderDetails();
    } else {
      navigate("/admin/Order/orders");
    }
  }, [id]);

  const getData = useCallback(
    (pageIndex) => {
      dispatch(setAddLoading(true));
      OrderService.OrderedShoppingCartItems({
        pageSearchArgs: {
          pageSize: 100000,
          pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
          sortingOptions,
          filteringOptions: [
            {
              field: "isItemCancel",
              operator: 1,
              value: false,
            },
          ],
        },
        orderId: id,
        productTypeId: productTypeId !== "none" ? productTypeId : 0,
      })
        .then((response) => {
          if (response?.data?.data?.items) {
            setPaginationData((prevState) => ({
              ...prevState,
              pageIndex: response.data.data.pageIndex,
              pageSize: response.data.data.pageSize,
              totalCount: response.data.data.totalCount,
              totalPages: response.data.data.totalPages,
              hasPreviousPage: response.data.data.hasPreviousPage,
              hasNextPage: response.data.data.hasNextPage,
            }));
            setData(response.data.data?.items);
          }
          dispatch(setAddLoading(false));
        })
        .catch(() => {
          dispatch(setAddLoading(false));
        });
    },
    [id, orderDetail, productTypeId]
  );

  const getOrderDetails = () => {
    dispatch(setAddLoading(true));
    OrderService.getOrderDetails({
      orderNumber: id,
      storeIdList: [anniesAnnualData.storeId],
      ...location,
    })
      .then((response) => {
        if (response?.data?.success && response.data.data) {
          if (response?.data?.data && response?.data?.data) {
            setOrderDetail(response.data.data);
          }
        } else {
          dispatch(
            setAlertMessage({
              message: ValidationMsgs.order.orderNotFound,
              type: "danger",
            })
          );
          navigate("/admin/Order/orders");
        }
        dispatch(setAddLoading(false));
      })
      .catch(() => {
        dispatch(setAddLoading(false));
      });
  };

  const blockOrderIP = () => {
    dispatch(setAddLoading(true));
    OrderService.blockOrderIP({
      orderId: id,
      isBlockIP: orderDetail?.isBlockIpAddress == true ? false : true,
      ...location,
    })
      .then((response) => {
        if (response?.data?.success && response?.data?.data) {
          dispatch(
            setAlertMessage({
              message: ValidationMsgs.order.orderIPBlocked,
              type: "success",
            })
          );
          getOrderDetails();
        } else {
          dispatch(
            setAlertMessage({
              message: ValidationMsgs.order.orderIPNotBlocked,
              type: "danger",
            })
          );
        }
        dispatch(setAddLoading(false));
      })
      .catch(() => {
        dispatch(
          setAlertMessage({
            message: ValidationMsgs.order.orderIPBlocked,
            type: "danger",
          })
        );
        dispatch(setAddLoading(false));
      });
  };

  const handleConfirmationResetPassword = () => {
    dispatch(setAddLoading(true));
    StoreCustomerService.sendResetPasswordLink(
      orderDetail?.storeId,
      customerData?.email
    )
      .then((response) => {
        if (response?.data?.data?.issend) {
          dispatch(
            setAlertMessage({
              message: ValidationMsgs.customer.resetPasswordLink,
              type: "success",
            })
          );
        } else {
          dispatch(
            setAlertMessage({
              message: ValidationMsgs.customer.resetPasswordLinkNotSend,
              type: "danger",
            })
          );
        }
        dispatch(setAddLoading(false));
        setOpenBasicModal(false);
      })
      .catch(() => {
        dispatch(setAddLoading(false));
        setOpenBasicModal(false);
      });
  };

  const getCustomerData = useCallback(() => {
    dispatch(setAddLoading(true));
    CustomerService.getCustomerById(orderDetail?.customerId)
      .then((response) => {
        if (response.data.data) {
          setCustomerData(response.data.data);
        } else {
          dispatch(
            setAlertMessage({
              message: ValidationMsgs.customer.customerNotFound,
              type: "danger",
            })
          );
        }
        dispatch(setAddLoading(false));
      })
      .catch((error) => {
        dispatch(setAddLoading(false));
      });
  }, [orderDetail]);

  // const getShipCarrierData = () => {
  //   if (StoreData && StoreData?.id) {
  //     dispatch(setAddLoading(true));
  //     OrderService.getshipcarrier(StoreData?.id)
  //       .then((response) => {
  //         if (response.data.success && response.data.data) {
  //           setShipCarrier(response?.data?.data);
  //         }
  //         dispatch(setAddLoading(false));
  //       })
  //       .catch((error) => {
  //         dispatch(setAddLoading(false));
  //       });
  //   }
  // };

  const importShipStatiOnOrder = (fields, itemImport) => {
    if (orderDetail) {
      dispatch(setAddLoading(true));
      OrderService.importshipstationorder({
        orderId: orderDetail?.orderNumber,
        isAllItemImport: itemImport,
        carriercode: "",
        shippedItems:
          itemImport === true
            ? []
            : [
                {
                  shoppingCartItemID: fields.shoppingCartItemID,
                  quantity: fields.shipRemainQty,
                },
              ],
      })
        .then((response) => {
          if (response.data.success && response.data.data) {
            dispatch(
              setAlertMessage({
                type: "success",
                message: ValidationMsgs.product.export.importSuccess,
              })
            );
            setShipRemainQtyModal((prev) => !prev);
            getOrderDetails();
            getData();
          } else {
            dispatch(
              setAlertMessage({
                type: "danger",
                message: ValidationMsgs.product.export.importFailed,
              })
            );
          }
          dispatch(setAddLoading(false));
        })
        .catch((error) => {
          dispatch(
            setAlertMessage({
              type: "danger",
              message: ValidationMsgs.product.export.importFailed,
            })
          );
          dispatch(setAddLoading(false));
        });
    }
  };

  // useEffect(() => {
  //   getShipCarrierData();
  // }, [StoreData]);

  useEffect(() => {
    if (orderDetail?.orderNumber) {
      getCustomerData();
    }
  }, [orderDetail]);

  useEffect(() => {
    if (orderDetail?.orderNumber) {
      OrderService.getShippingOptionsByStore(orderDetail?.orderNumber)
        .then((response) => {
          if (response?.data?.success && response?.data?.data) {
            setShippingOptions(response?.data?.data);
          }
        })
        .catch(() => {});
    }
  }, [orderDetail]);

  useEffect(() => {
    getData();
  }, [productTypeId, id]);

  useEffect(() => {
    if (orderDetail?.storeId !== undefined) {
      StoreService.getStoreById(orderDetail?.storeId)
        .then((res) => {
          var response = res.data;
          if (response.success && response.data) {
            setStoreData(response?.data);
          }
        })
        .catch((err) => {
          dispatch(setAddLoading(false));
        });
    }
  }, [orderDetail]);

  return (
    <>
      <title>{TitleNameHelper({ defaultTitleName: `Order Receipt` })}</title>
      <div className="py-8">
        <div className="px-4 sm:px-6 lg:px-8 w-full items-center flex justify-between sticky top-0 z-20 py-2 bg-slate-100">
          <div c0lass="flex mb-4 sm:mb-0 grow">
            <div
              onClick={() => {
                searchQuery && dispatch(fillSerchQuery(true));
              }}
            >
              <NavLink
                to={"/admin/order/orders"}
                className="inline-flex btn border-neutral-200 hover:border-neutral-400 text-gray-500 hover:text-gray-700 items-center mr-2"
              >
                <span className="material-icons-outlined">west</span>
              </NavLink>
            </div>
            <div className="inline-flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl md:text-3xl text-gray-800 font-bold inline-flex">
                Orders: #{orderDetail?.orderNumber}
              </h1>
              <div>PO # : {orderDetail?.transactionId}</div>
              Fulfillment:
              <GeneralStatus
                type={orderDetail?.fulfillmentStatus}
                style={{
                  backgroundColor: `${
                    statusList?.["fulfillmentstatus"]?.[
                      orderDetail?.fulfillmentStatus?.toLowerCase()
                    ]?.color
                  }`,
                  color: `${
                    statusList?.["fulfillmentstatus"]?.[
                      orderDetail?.fulfillmentStatus?.toLowerCase()
                    ]?.textColor
                  }`,
                }}
              />
              Payment:
              <GeneralStatus
                type={orderDetail?.paymentStatus}
                style={{
                  backgroundColor: `${
                    statusList?.["paymentstatus"]?.[
                      orderDetail?.paymentStatus?.toLowerCase()
                    ]?.color
                  }`,
                  color: `${
                    statusList?.["paymentstatus"]?.[
                      orderDetail?.paymentStatus?.toLowerCase()
                    ]?.textColor
                  }`,
                }}
              />
            </div>
            <div className="text-sm text-gray-500 flex items-center pl-16 pt-2">
              <div>
                {orderDetail?.orderDate
                  ? DateTimeFormat(orderDetail?.orderDate).date +
                    " " +
                    DateTimeFormat(orderDetail?.orderDate).time
                  : ""}
              </div>
              &nbsp;from
              <span className="font-bold text-2xl ml-1 text-black">
                {orderDetail?.storeName}
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex items-center gap-4 mr-4">
              <OrderAction
                orderDetail={orderDetail}
                getOrderDetails={getOrderDetails}
                shippingOptions={shippingOptions}
                ProductData={Data}
              />
            </div>
            <div
              className="inline-flex rounded-md shadow-sm -space-x-1"
              role="group"
            >
              <div className="relative inline-flex">
                <button
                  type="button"
                  onClick={() => {
                    if (orderDetail?.previousOrderId) {
                      navigate(
                        `/admin/Order/orders/edit/${orderDetail?.previousOrderId}`
                      );
                    }
                  }}
                  className={`flex flex-wrap items-center text-sm px-3 py-2 bg-white border rounded-r-md ${
                    orderDetail?.previousOrderId
                      ? "border-neutral-200 text-gray-500 hover:text-gray-700"
                      : "border-neutral-100 text-gray-200 cursor-default"
                  }`}
                >
                  <span className="material-icons-outlined">west</span>
                </button>
              </div>
              <div className="relative inline-flex">
                <button
                  onClick={() => {
                    if (orderDetail?.nextOrderId) {
                      navigate(
                        `/admin/Order/orders/edit/${orderDetail?.nextOrderId}`
                      );
                    }
                  }}
                  type="button"
                  className={`flex flex-wrap items-center text-sm px-3 py-2 bg-white border rounded-r-md ${
                    orderDetail?.nextOrderId
                      ? "border-neutral-200 text-gray-500 hover:text-gray-700"
                      : "border-neutral-100 text-gray-200 cursor-default"
                  }`}
                >
                  <span className="material-icons-outlined">east</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 sm:px-6 lg:px-8 w-full pt-7">
          {displayMessage && !cancelOrderModal && <Messages />}

          <div className="flex flex-col md:flex-row md:-mr-px text-sm relative">
            <div className="w-full h-full">
              <div className="grid grid-cols-12 gap-6">
                <div className="overflow-x-auto col-span-full lg:col-span-9">
                  <div className="flex items-stretch justify-between gap-6">
                    <OrderDetails
                      orderDetail={orderDetail}
                      getOrderDetails={getOrderDetails}
                      getData={getData}
                    />
                    <CustomerInformation
                      orderDetail={orderDetail}
                      blockOrderIP={blockOrderIP}
                      setCustomerOrderModal={setCustomerOrderModal}
                    />
                  </div>
                  <div className="flex items-stretch justify-between my-6 gap-6">
                    <BillingAddress
                      orderDetail={orderDetail}
                      getOrderDetails={getOrderDetails}
                      setDisplayMessage={setDisplayMessage}
                    />
                    <ShippingAddress
                      orderDetail={orderDetail}
                      getOrderDetails={getOrderDetails}
                      setDisplayMessage={setDisplayMessage}
                    />
                    <PaymentInformaton orderDetail={orderDetail} />
                  </div>

                  <div className="flex flex-wrap">
                    <div className="w-full bg-white shadow-lg rounded-md px-2 py-2 mb-6">
                      <div className="flex w-full justify-between items-center px-2">
                        <div className="w-1/4 text-lg font-bold text-gray-500 text-left ">
                          Line Items
                        </div>
                        <div className="flex gap-4 items-center">
                          {/* <div className="w-44">
                            <Select
                              options={shipCarrier}
                              defaultValue={
                                selectedShipCarrier ? selectedShipCarrier : 0
                              }
                              onChange={(e) => {
                                setSelectedShipCarrier(e?.value);
                              }}
                            />
                          </div> */}
                          <div>
                            <button
                              disabled={[
                                "cancel & refunded",
                                "partially refunded",
                                "cancelled",
                              ].includes(
                                orderDetail?.orderStatus?.toLowerCase() ||
                                  orderDetail?.total === 0
                              )}
                              className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                              type="button"
                              onClick={() =>
                                setCancelOrderModal((prev) => !prev)
                              }
                            >
                              Cancel Order
                            </button>
                          </div>
                          <div>
                            <button
                              disabled={
                                orderDetail && orderDetail?.isShipStationImport
                                  ? true
                                  : false
                              }
                              className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                              type="button"
                              onClick={() => importShipStatiOnOrder("", true)}
                            >
                              Send order to ShipStation
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex max-h-screen mt-5">
                        <Items
                          orderDetail={orderDetail}
                          setDisplayMessage={setDisplayMessage}
                          getOrderDetails={getOrderDetails}
                          getData={getData}
                          Data={Data}
                          sortingOptions={sortingOptions}
                          setSortingOptions={setSortingOptions}
                          importShipStatiOnOrder={importShipStatiOnOrder}
                          shipRemainQtyModal={shipRemainQtyModal}
                          setShipRemainQtyModal={setShipRemainQtyModal}
                        />
                      </div>
                    </div>
                    <Invoice orderDetail={orderDetail} StoreData={StoreData} />
                    <Timeline orderDetail={orderDetail} />
                    <div className="w-full bg-white shadow-lg rounded-md px-2 py-2 mb-6">
                      <div className="flex px-2 border-b border-neutral-200 justify-between items-center">
                        <div className="text-lg font-bold text-gray-500 text-left leading-10">
                          Order Log
                        </div>
                      </div>
                      <div className="flex overflow-x-auto max-h-screen">
                        <Log orderDetail={orderDetail} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-full sm:col-span-3 lg:col-span-3">
                  <div className="w-full grid grid-cols-1 gap-6">
                    <DropdownStatus
                      orderDetail={orderDetail}
                      getOrderDetails={getOrderDetails}
                    />
                    <TrackingInfo
                      orderDetail={orderDetail}
                      getOrderDetails={getOrderDetails}
                      shippingOptions={shippingOptions}
                    />
                    <Note
                      orderDetail={orderDetail}
                      title="Order Note"
                      note={orderDetail.orderNotes}
                      type={orderNotes.order}
                    />
                    <Note
                      orderDetail={orderDetail}
                      title="Internal Note"
                      note={orderDetail.internalNotes}
                      type={orderNotes.Internal}
                    />
                    <Note
                      orderDetail={orderDetail}
                      title="Shipped Note"
                      note={orderDetail.shippedNotes}
                      type={orderNotes.shipped}
                    />
                    <UploadDocument orderDetail={orderDetail} />
                    <Tag orderDetail={orderDetail} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {CustomerOrderModal.state && (
        <General
          setCustomerOrderModal={setCustomerOrderModal}
          CustomerOrderModal={CustomerOrderModal}
          orderDetails={orderDetail}
          from={"order"}
          customerId={orderDetail?.customerId ? orderDetail?.customerId : 0}
          setOpenBasicModal={setOpenBasicModal}
          customerData={customerData}
        />
      )}

      <BasicModal
        openModal={openBasicModal}
        setOpenModal={setOpenBasicModal}
        handleConfirmation={handleConfirmationResetPassword}
        title={"Reset Password"}
        message={"Are you sure you want to Reset Password?"}
        ButtonName={"Yes"}
      />

      {cancelOrderModal && (
        <CancelOrder
          setCancelOrderModal={setCancelOrderModal}
          orderId={id}
          fullOrder={true}
          getOrderDetails={getOrderDetails}
          getData={getData}
          orderDetails={orderDetail}
        />
      )}
    </>
  );
};

export default Create;
