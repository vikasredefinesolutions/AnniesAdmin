import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";

import ReactTableServerSide from "components/common/table/ReactTableServerSide";
import Image from "components/common/formComponent/Image";
import EditQuantity from "./EditQuantity";
import BasicModal from "components/common/modals/Basic";
import Actions from "./Actions";
import Messages from "components/common/alerts/messages/Index";

import { CurrencySymbolByCode, defaultImage } from "global/Enum";
import { serverError } from "services/common/helper/Helper";
import { ValidationMsgs } from "global/ValidationMessages";

import OrderService from "services/admin/order/OrderService";
import Input from "components/common/formComponent/Input";
import CancelOrder from "../CancelOrder";

const Items = ({
  orderDetail = { shoppingCartItemDetailsViewModels: [] },
  setDisplayMessage,
  getOrderDetails,
  getData,
  Data,
  sortingOptions,
  setSortingOptions,
  importShipStatiOnOrder,
  shipRemainQtyModal,
  setShipRemainQtyModal,
}) => {
  const permission = useSelector((store) => store?.permission);
  const dispatch = useDispatch();
  const location = useSelector((store) => store?.location);

  const [basicModalInfo, setBasicModalInfo] = useState({});
  const [editQtyModal, setEditQtyModal] = useState({ show: false });
  const [openBasicModal, setOpenBasicModal] = useState(false);
  const [cancelOrderModal, setCancelOrderModal] = useState(false);
  const [shipStationQtyData, setShipStationQtyData] = useState();

  const cancelOrderItem = (data) => {
    dispatch(setAddLoading(true));
    OrderService.cancelOrderItem({
      orderedShoppingCartItemsId: data.id,
      isItemCancel: true,
      orderId: orderDetail?.orderNumber,
      ...location,
    })
      .then((response) => {
        if (response.data.success && response.data.data) {
          dispatch(
            setAlertMessage({
              view: true,
              type: "success",
              message: ValidationMsgs.order.cancelOrderItem,
            })
          );
          getData();
        } else {
          dispatch(
            setAlertMessage({
              view: true,
              type: "danger",
              message: serverError(response),
            })
          );
        }
        dispatch(setAddLoading(false));
      })
      .catch((errors) => {
        dispatch(
          setAlertMessage({
            view: true,
            type: "danger",
            message: ValidationMsgs.order.cancelOrderItemFail,
          })
        );
        dispatch(setAddLoading(false));
      });
    setOpenBasicModal(false);
  };

  const COLUMNS = useMemo(
    () => [
      {
        id: "image",
        accessor: "colorImage",
        column_name: "colorImage",
        disableSortBy: true,
        Header: () => {
          return <div className="w-8">Line Item</div>;
        },
        Cell: ({ value, row }) => {
          return (
            <div>
              {row?.original?.colorImage !== "" ? (
                <div className="h-24 w-24 flex items-center justify-center overflow-hidden box-content border bg-white">
                  <Image
                    src={row?.original?.colorImage}
                    containerHeight={"h-24"}
                    className="max-h-full"
                  />
                </div>
              ) : (
                <div className="h-24 w-24 flex items-center justify-center overflow-hidden box-content border bg-white">
                  <Image
                    src={defaultImage}
                    className="max-h-full"
                    containerHeight={"h-24"}
                  />
                </div>
              )}
            </div>
          );
        },
      },
      {
        id: "productName",
        header: "Product Name",
        accessor: "productName",
        column_name: "productName",
        disableSortBy: true,
        Cell: ({ value, row }) => {
          return (
            <>
              <div className="w-60">
                <div>{value}</div>
                <div className="text-[#707070] text-sm font-normal">
                  SKU : {row?.original?.sku}
                </div>
                <div className="text-[#707070] text-sm font-normal">
                  Unit : {row?.original?.qty}
                </div>
                <div className="divide-y divide-gray-300">
                  {row?.original?.shoppingCartLineSizeListViewModel &&
                    row?.original?.shoppingCartLineSizeListViewModel.map(
                      (value, index) => {
                        return (
                          <div
                            className="flex flex-wrap gap-4 justify-between py-1"
                            key={row?.original?.attributeOptionId + index}
                          >
                            <div className="">
                              Size: {value?.sizeName || "-"}
                            </div>
                            <div className="">Qty: {value?.qty || 0}</div>
                            <div className="">
                              {CurrencySymbolByCode.USD}{" "}
                              {value?.price / value?.qty > 0
                                ? (value?.price / value?.qty).toFixed(2)
                                : "0.00"}
                              /Qty
                            </div>
                          </div>
                        );
                      }
                    )}
                </div>
              </div>
            </>
          );
        },
      },
      {
        id: "isPreOrder",
        Header: "Pre Order",
        accessor: "isPreOrder",
        column_name: "isPreOrder",
        Cell: ({ value }) => {
          return (
            <>
              {value && (
                <div className="border uppercase text-xs inline-block font-medium rounded-md text-center px-2.5 py-1 border-orange-300 bg-orange-100 text-orange-600">
                  Pre Order
                </div>
              )}
            </>
          );
        },
        disableSortBy: true,
      },
      {
        id: "qty",
        Header: "QTY",
        accessor: "qty",
        column_name: "qty",
        disableSortBy: true,
        Cell: ({ value, row }) => {
          return <div className="w-24 absolute top-5">{value}</div>;
        },
      },
      {
        id: "shipRemainQty",
        Header: "Remain Qty",
        accessor: "shipRemainQty",
        column_name: "shipRemainQty",
        disableSortBy: true,
        Cell: ({ value, row }) => {
          return (
            <div className="w-36 absolute top-5 flex gap-2 items-center">
              {value}
            </div>
          );
        },
      },
      {
        id: "price",
        Header: "Price",
        accessor: "price",
        column_name: "price",
        disableSortBy: true,
        Cell: ({ value }) => {
          return (
            <div className="w-24 absolute top-5">
              {`${CurrencySymbolByCode.USD}${
                parseFloat(value).toFixed(2) || 0.0
              }`}
            </div>
          );
        },
      },
      {
        id: "subTotal",
        Header: "Sub Total",
        accessor: "subTotal",
        column_name: "sub_total",
        disableSortBy: true,
        Cell: ({ value }) => {
          return (
            <>
              <div className="w-24 absolute top-5">{`${
                CurrencySymbolByCode.USD
              }${parseFloat(value).toFixed(2) || 0.0}`}</div>
            </>
          );
        },
      },
      {
        id: "shippedQty",
        Header: "Shipped",
        accessor: "shippedQty",
        column_name: "shippedQty",
        disableSortBy: true,
        Cell: ({ value, row }) => {
          return (
            <div className="w-24 absolute top-5">
              {value}/{row?.original?.qty}
              <span className="material-icons-outlined block cursor-pointer ml-2">
                local_shipping
              </span>
            </div>
          );
        },
      },
      {
        id: "id",
        Header: "",
        accessor: "id",
        column_name: "id",
        disableSortBy: true,
        Cell: ({ value, row }) => {
          return (
            <>
              <div className="flex gap-4">
                <button
                  className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                  type="button"
                  disabled={
                    row?.original?.isItemShipStationImport ||
                    row.original.shipRemainQty <= 0
                      ? true
                      : false
                  }
                  onClick={() => {
                    setShipRemainQtyModal(true);
                    setShipStationQtyData(row);
                  }}
                >
                  Send Item to ShipStation
                </button>

                <button
                  disabled={
                    ["cancel & refunded", "cancelled"].includes(
                      orderDetail?.orderStatus?.toLowerCase()
                    ) ||
                    orderDetail?.total === 0 ||
                    row?.original?.isRefunded ||
                    orderDetail?.paymentStatus?.toLowerCase() === "authorize"
                  }
                  className="btn  hover:text-rose-600 text-rose-600 border-rose-300 bg-rose-100"
                  type="button"
                  onClick={() => {
                    setCancelOrderModal((prev) => !prev);
                    setShipStationQtyData(row);
                  }}
                >
                  Cancel Item
                </button>
              </div>
            </>
          );
        },
      },
      {
        id: "action",
        Header: "",
        accessor: "orderShoppingCartItemsId",
        column_name: "action",
        Cell: ({ value, row }) => {
          return (permission?.isEdit || permission?.isDelete) &&
            !row?.original?.isItemCancel &&
            orderDetail.paymentStatus === "PAYMENTPENDING" &&
            !row?.original?.isNavImport ? (
            <div className="-ml-4 absolute top-5">
              <Actions
                row={row}
                cancelOrderItem={cancelOrderItem}
                id={value}
                editQtyModal={editQtyModal}
                setEditQtyModal={setEditQtyModal}
                setBasicModalInfo={setBasicModalInfo}
                setOpenBasicModal={setOpenBasicModal}
              />
            </div>
          ) : (
            ""
          );
        },
        disableSortBy: true,
      },
    ],
    [orderDetail]
  );

  const setSortingOptionHandler = (column, direction) => {
    setSortingOptions([
      {
        field: column,
        direction: direction,
        priority: 0,
      },
    ]);
  };

  useEffect(() => {
    setDisplayMessage(!editQtyModal?.show);
  }, [editQtyModal?.show]);

  return (
    <>
      <div className="col-span-full w-full rounded-md overflow-auto">
        {orderDetail?.orderNumber && (
          <ReactTableServerSide
            COLUMNS={COLUMNS}
            DATA={Data}
            fetchData={getData}
            sortingOptions={sortingOptions}
            setSortingOptions={setSortingOptionHandler}
            hiddenColumns={["rowSelection"]}
            tablePadding={"px-4 pb-4"}
            displaySearch={false}
            filters={false}
            actionRelativeCl={`first:pl-2`}
          />
        )}

        {editQtyModal?.show && (
          <EditQuantity
            editQtyModal={editQtyModal}
            setEditQtyModal={setEditQtyModal}
            getData={getData}
            orderDetail={orderDetail}
            getOrderDetails={getOrderDetails}
          />
        )}
      </div>
      <BasicModal
        handleConfirmation={cancelOrderItem}
        openModal={openBasicModal}
        setOpenModal={setOpenBasicModal}
        {...basicModalInfo}
      />

      {shipRemainQtyModal && (
        <SendItemToShipStation
          setShipRemainQtyModal={setShipRemainQtyModal}
          shipStationQtyData={shipStationQtyData}
          permission={permission}
          importShipStatiOnOrder={importShipStatiOnOrder}
        />
      )}

      {cancelOrderModal && (
        <CancelOrder
          setCancelOrderModal={setCancelOrderModal}
          orderId={orderDetail?.orderNumber}
          fullOrder={false}
          row={shipStationQtyData}
          getOrderDetails={getOrderDetails}
          getData={getData}
          orderDetail={orderDetail}
        />
      )}
    </>
  );
};

export default Items;

const SendItemToShipStation = ({
  setShipRemainQtyModal,
  shipStationQtyData,
  importShipStatiOnOrder,
  permission,
}) => {
  const schema = Yup.object().shape({
    shipRemainQty: Yup.number()
      .required("Quantity is required")
      .min(1, "Quantity is required")
      .max(
        Yup.ref("MainshipStationQty"),
        "Quantity must be less than or equal to Available Quantity"
      ),
  });

  const onSubmit = (fields) => {
    importShipStatiOnOrder(fields, false);
  };

  return (
    <>
      <div className="overflow-y-auto overflow-x-hidden fixed z-30 right-0 left-0 top-4 justify-center items-center h-modal md:h-full md:inset-0">
        <div className="w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="relative px-4 w-full max-w-2xl h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow max-h-screen overflow-y-auto">
              <div className="flex justify-between items-start p-5 rounded-t border-b sticky top-0 left-0 bg-white">
                <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl">
                  Send Item to ShipStation
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                  data-modal-toggle="actionModal"
                  onClick={() => setShipRemainQtyModal((prev) => !prev)}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <Formik
                enableReinitialize={true}
                initialValues={{
                  MainshipStationQty:
                    shipStationQtyData?.original?.shipRemainQty,
                  shipRemainQty:
                    shipStationQtyData?.original?.shipRemainQty || 0,
                  shoppingCartItemID: shipStationQtyData?.original?.id,
                }}
                validationSchema={schema}
                onSubmit={onSubmit}
              >
                {({ values, setFieldValue }) => {
                  return (
                    <FormikForm>
                      <Messages />
                      <div className="p-6">
                        <div className="w-full mb-4 last:mb-0">
                          <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                            {`Quantity / Available Quantity (${values.MainshipStationQty})`}
                          </label>
                          <div className="items-center gap-3">
                            <Input
                              type="number"
                              name={"shipRemainQty"}
                              onChange={(e) => {
                                setFieldValue("shipRemainQty", e.target.value);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-end p-6 space-x-2 rounded-b border-t border-gray-200">
                        <button
                          type="button"
                          className="btn bg-white border-neutral-200 text-gray-500 hover:text-gray-700"
                          onClick={() => setShipRemainQtyModal((prev) => !prev)}
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
                              Send Item to ShipStation
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
