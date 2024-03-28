import ReactTableServerSide from "components/common/table/ReactTableServerSide";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductService from "services/admin/master/master/products/ProductService";
import Transition from "utils/Transition";
import { paginationDetails } from "global/Enum";
import CustomSearchDropDown from "components/common/formComponent/CustomSearchDropDown";
import { useParams } from "react-router-dom";
import { Formik, Form as FormikForm, useFormikContext } from "formik";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { serverError } from 'services/common/helper/Helper';
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { ValidationMsgs } from "global/ValidationMessages";
import { productType } from "dummy/Dummy";
import Image from "components/common/formComponent/Image";
import { useAsyncDebounce } from 'react-table';

const DiscontinuedModel = ({
  data,
  message,
  title,
  type,
  handleConfirmation,
  openModal,
  setOpenModal,
  ButtonName,
  module,
  status,
  displayCancelButton,
  cancelButtonName,
  cancelButtonAction,
}) => {
  const [skuArr, setSKUArr] = useState([]);
  const [Data, setData] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useSelector((store) => {
    return store.location;
  });
  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
  });
  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "orderNo",
      direction: 0,
      priority: 0,
    },
  ]);

  // esc hide modal
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!openModal || keyCode !== 27) return;
      setOpenModal(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const confirmation = (values, resetForm) => {
    createDiscontinue(values, resetForm);
    if (handleConfirmation instanceof Function) {
      handleConfirmation(data);
    } else {
      setOpenModal(false);
    }
  };
  const cancelFunction = () => {
    if (cancelButtonAction instanceof Function) {
      cancelButtonAction();
    }
    setOpenModal(false);
  };

  const getDiscontinueStoreList = useCallback(() => {
    ProductService.discontinueListData({
      args: {
        pageIndex: 0,
        pageSize: 0,
        pagingStrategy: 0,
        sortingOptions: [{ field: "string", direction: 0, priority: 0 }],
        filteringOptions: [{ field: "string", operator: "0", value: "string" }],
      },
      productId: id,
    }).then((res) => {
      if (res.data.success) {
        setData(
          () => {
            return res.data.data.items;
          },
          setSKUArr(() => {
            let arraySku = {};
            res.data.data.items.map((storeId, index) => {
              arraySku = {
                ...arraySku,
                [storeId.storeId]: { skU1: "", skU2: "", skU3: "" },
              };
              return arraySku;
            });
            return arraySku;
          })
        );
      }
    });
  }, []);

  const createDiscontinue = (values, resetForm) => {
    let discontinueModel = [];
    let productId = Number(id);
    Object.keys(values.skuArr).map((storeId) => {
      discontinueModel = [
        ...discontinueModel,
        {
          storeId: +storeId,
          ...values.skuArr[storeId],
        },
      ];
    });
    if (discontinueModel.length <= 0) {
      dispatch(
        setAlertMessage({
          type: "danger",
          message: ValidationMsgs.masterCatalog.products.notDiscontinue,
        })
      );
      setOpenModal(false);
      return;
    }
    dispatch(setAddLoading(true));
    ProductService.createDiscontinue({
      masterproductDiscontinueModel: {
        id: 0,
        rowVersion: "",
        ...location,
        masterProductId: [productId],
        productDiscontinueModel: discontinueModel,
      },
    })
      .then((response) => {
        if (response?.data?.success && response?.data?.data) {
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.masterCatalog.products.ProductDiscontinuesuccessfully,
            })
          );
          getDiscontinueStoreList();
        } else {
          dispatch(
            setAlertMessage({
              type: "danger",
              message: serverError(response),
            })
          );
        }
        dispatch(setAddLoading(false))

      })
      .catch((errors) => {
        dispatch(
          setAlertMessage({ type: "danger", message: ValidationMsgs.masterCatalog.products.ProductDiscontinue })
        );
        dispatch(setAddLoading(false));
      });
  };

  const setPaginationDataFunc = (key, value) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const COLUMNS = [
    {
      id: "storeName",
      Header: "STORE",
      accessor: "storeName",
      column_name: "storeName",
      Cell: ({ value, row }) => {
        return value ? (
          <>
            <div className="w-full flex flex-wrap items-center gap-2">
              <div className="h-14 w-14 flex items-center justify-center overflow-hidden  box-content rounded-full border bg-white">
                <Image src={row?.original?.storeLogoUrl} className="max-h-full" containerHeight={""} />
              </div>
              <div className="font-semibold text-left">{value}</div>
            </div>
          </>
        ) : (
          "-"
        );
      },
    },
    {
      id: "sku1",
      Header: "SKU",
      accessor: "skU1",
      column_name: "skU1",
      disableSortBy: true,
      Cell: ({ value, row }) => {
        return (
          <div className="font-semibold text-left">
            <SkuInputField
              type={type}
              id={id}
              skuArr={skuArr}
              row={row}
              setSKUArr={setSKUArr}
              name={"skU1"}
            />
          </div>
        );
      },
    },
    {
      id: "sku2",
      Header: "SKU",
      accessor: "skU2",
      column_name: "skU2",
      disableSortBy: true,
      Cell: ({ value, row }) => {
        return (
          <SkuInputField
            type={type}
            id={id}
            skuArr={skuArr}
            row={row}
            setSKUArr={setSKUArr}
            name={"skU2"}
          />
        );
      },
    },
    {
      id: "sku3",
      Header: "SKU",
      accessor: "skU3",
      column_name: "skU3",
      disableSortBy: true,
      Cell: ({ value, row }) => {
        return (
          <SkuInputField
            type={type}
            id={id}
            skuArr={skuArr}
            row={row}
            setSKUArr={setSKUArr}
            name={"skU3"}
          />
        );
      },
    },
  ];

  return (
    <>
      <Transition
        className="fixed inset-0 bg-slate-900 bg-opacity-95 z-50 transition-opacity"
        show={openModal}
        tag="div"
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        onClick={() => setOpenModal(false)}
      ></Transition>
      <Transition
        className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center transform px-4 sm:px-6"
        show={openModal}
        tag="div"
        id="basic-modal"
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div className="bg-white rounded shadow-lg max-h-[calc(100%-4rem)] w-full max-w-3xl">
          <Formik enableReinitialize={true} initialValues={{ skuArr: skuArr }}>
            {({ values, resetForm }) => {
              return (
                <FormikForm>
                  <>
                    <div className="px-5 py-3 border-b border-neutral-200 ">
                      <div className="flex justify-between items-center">
                        <div className="font-bold text-black">
                          {title ? title : "Confirmation"}
                        </div>
                        <button
                          type="button"
                          className="text-black hover:text-gray-400"
                          onClick={() => setOpenModal(false)}
                        >
                          <div className="sr-only">Close</div>
                          <svg className="w-4 h-4 fill-current">
                            <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="px-5 pt-4 pb-1">
                      <div className="text-sm">
                        <div className="space-y-2">
                          <p className="mb-2">
                            {message
                              ? message
                              : status &&
                              module &&
                              `Do you want to ${status} this ${module}?`}
                          </p>
                        </div>
                      </div>
                      <div>
                        <ReactTableServerSide
                          COLUMNS={COLUMNS}
                          DATA={Data}
                          {...paginationData}
                          setTablePageSize={(value) =>
                            setPaginationDataFunc("pageSize", value)
                          }
                          sortingOptions={sortingOptions}
                          setSortingOptions={setSortingOptions}
                          fetchData={getDiscontinueStoreList}
                          displaySearch={false}
                          hiddenColumns={["rowSelection"]}
                          tablePadding={true}
                          GridViewClass={true}
                        />
                      </div>
                    </div>
                    <div className="px-5 py-4">
                      <div className="flex flex-wrap justify-end space-x-2">
                        {(displayCancelButton === true ||
                          displayCancelButton === undefined) && (
                            <button
                              type="button"
                              className="btn border-gray-300 hover:border-neutral-400 text-gray-500"
                              onClick={() => {
                                cancelFunction();
                              }}
                            >
                              {cancelButtonName ? cancelButtonName : "Cancel"}
                            </button>
                          )}
                        <button
                          type="button"
                          onClick={confirmation.bind(null, values, resetForm)}
                          className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                        >
                          {ButtonName ? ButtonName : "Save"}
                        </button>

                      </div>
                    </div>
                  </>
                </FormikForm>
              );
            }}
          </Formik>
        </div>
      </Transition>
    </>
  );
};

const SkuInputField = ({ row, name, type, id }) => {
  const { values, setFieldValue } = useFormikContext();
  const [skuList, setSkuList] = useState([]);

  const getSkuListProductIdAndStoreID = useCallback((productID) => {
    if (type === productType.MC) {
      ProductService.getSkuListPeoductIdAndStoreId(id, productID).then((res) => {
        if (res?.data?.data?.length > 0) {

          const skuData = res.data.data.map((value) => ({ label: value, value }))

          setSkuList(skuData)
        }
      })
    }
  }, [type])

  const onChange = useAsyncDebounce((e, row, skuType) => {
    setFieldValue(`skuArr.${row?.original?.storeId}.${name}`, e);
    getSkuListProductIdAndStoreID(row?.original?.storeId)
  }, [500]);
  return (
    <div className="font-semibold text-left">
      <CustomSearchDropDown
        placeholder={"SKU"}
        displayError={true}
        options={skuList}
        name={name}
        defaultValue={
          values.skuArr[row?.original?.storeId]
            ? row?.original[name]
            : ""
        }
        toSet={true}
        onChange={(e) => onChange(e, row, name)}
        uniqueId={"dropDownElem_attributeName_unique"}
      />
    </div>
  );
};

export default DiscontinuedModel;
