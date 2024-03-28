/*Component Name: Status
Component Functional Details:  Status .
Created By: PK Kher
Created Date: \7-25-2022
Modified By: PK Kher
Modified Date: 7-25-2022 */

import React, { useEffect, useState } from "react";
import { orderStatus } from "global/Enum";
import Select from "components/common/formComponent/Select";
import OrderService from "services/admin/order/OrderService";
import { ValidationMsgs } from "global/ValidationMessages";
import { useDispatch } from "react-redux";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { serverError } from "services/common/helper/Helper";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BasicModal from "components/common/modals/Basic";
import ConfirmDelete from "components/common/modals/ConfirmDelete";

const Status = ({ orderDetail, getOrderDetails }) => {
  const permission = useSelector((store) => store?.permission);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useSelector((store) => store.location);
  const [orderStatusValue, setOrderStatusValue] = useState("");
  const [openBasicModal, setOpenBasicModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [basicModalInfo, setModalInfo] = useState("");
  const [orderStatusOptions, setOrderStatusOptions] = useState(orderStatus);

  const updateStatus = (value) => {
    dispatch(setAddLoading(true));
    OrderService.updateOrderStatus({
      orderId: orderDetail.orderNumber,
      orderStatus: value,
      ...location,
    })
      .then((response) => {
        if (response?.data?.success) {
          if (value === "Deleted") {
            navigate(`/admin/order/orders`);
          }
          dispatch(
            setAlertMessage({
              message: ValidationMsgs.order.statusUpdated,
              type: "success",
            })
          );
        } else {
          dispatch(
            setAlertMessage({ type: "danger", message: serverError(response) })
          );
        }
        if (value !== "Deleted") {
          getOrderDetails();
        }
        dispatch(setAddLoading(false));
      })
      .catch(() => {
        dispatch(setAddLoading(false));
        dispatch(
          setAlertMessage({
            message: ValidationMsgs.order.statusNotUpdated,
            type: "danger",
          })
        );
      });
    setOpenBasicModal(false);
    setOpenDeleteModal(false);
  };

  const reImportToNav = () => {
    if (orderDetail?.orderNumber) {
      dispatch(setAddLoading(true));
      OrderService.updateNavStatus(orderDetail?.orderNumber)
        .then((response) => {
          if (response?.data?.success) {
            dispatch(
              setAlertMessage({
                type: "success",
                message: ValidationMsgs.order.reImportToNavSuccess,
              })
            );
            getOrderDetails();
          } else {
            dispatch(
              setAlertMessage({
                type: "danger",
                message: ValidationMsgs.order.reImportToNavFailed,
              })
            );
          }
          dispatch(setAddLoading(false));
        })
        .catch((err) => {
          dispatch(setAddLoading(false));
        });
    }
  };

  const addNewValueInOptions = () => {
    if (
      orderDetail &&
      orderDetail?.orderStatus === "Cancelled" &&
      permission?.isDelete
    ) {
      setOrderStatusOptions([
        ...orderStatusOptions,
        { label: "Delete", value: "Deleted" },
      ]);
    } else if (
      orderDetail &&
      orderDetail?.orderStatus &&
      orderDetail?.orderStatus.toLowerCase() === "cancel & refunded"
    ) {
      setOrderStatusOptions([
        ...orderStatusOptions,
        { label: "CANCEL & REFUNDED", value: "CANCEL & REFUNDED" },
      ]);
    } else if (
      orderDetail &&
      orderDetail?.orderStatus &&
      orderDetail?.orderStatus.toLowerCase() === "partially refunded"
    ) {
      setOrderStatusOptions([
        ...orderStatusOptions,
        { label: "PARTIALLY REFUNDED", value: "PARTIALLY REFUNDED" },
      ]);
    }
  };

  useEffect(() => {
    addNewValueInOptions();
  }, [orderDetail?.orderStatus]);

  useEffect(() => {
    if (orderDetail?.orderStatus) {
      setOrderStatusValue(orderDetail.orderStatus);
    }
  }, [orderDetail?.orderStatus]);

  return (
    <>
      <div className="w-full justify-between bg-white px-3 py-3 rounded-md shadow-lg">
        <div className="w-full mb-2 last:mb-0">
          <div className="text-lg font-bold text-gray-500 text-left px-2 leading-10">
            Order Status
          </div>
        </div>
        <div className="w-full mb-2 px-2">
          <Select
            options={orderStatusOptions}
            name="orderStatus"
            defaultValue={orderStatusValue}
            isClearable={false}
            onChange={(e) => {
              if (e.value === "Cancelled") {
                setOpenBasicModal(true);
                setModalInfo(e.value);
              } else if (e.value === "Deleted") {
                setOpenDeleteModal(true);
                setModalInfo(e.value);
              } else {
                setOrderStatusValue(e.value);
                updateStatus(e.value);
              }
            }}
            isDisabled={!permission?.isEdit && !permission?.isDelete}
          />
        </div>
        <div className="flex gap-6">
          {orderDetail.isNavImport === true &&
            (orderDetail.navOrderStatus === "" ||
              orderDetail.navOrderStatus === null) && (
              <div>
                <button
                  type="button"
                  className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                  onClick={reImportToNav}
                >
                  Re-Import To Nav
                </button>
              </div>
            )}
        </div>

        <BasicModal
          handleConfirmation={updateStatus}
          data={basicModalInfo}
          openModal={openBasicModal}
          setOpenModal={setOpenBasicModal}
          cancelButtonName={"No"}
          ButtonName={"Yes"}
          message={"Are you sure you want to cancel this order ?"}
        />

        <ConfirmDelete
          handleDelete={updateStatus}
          data={basicModalInfo}
          message={
            "Deleting Order will permanently remove this record from your account. This can't be undone."
          }
          title={"Delete"}
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
        />
      </div>
    </>
  );
};

export default Status;
