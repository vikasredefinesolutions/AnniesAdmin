import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { ValidationMsgs } from 'global/ValidationMessages';
import { anniesAnnualData, defaultImage, paginationDetails } from 'global/Enum';
import { DateTimeFormat, TitleNameHelper } from 'services/common/helper/Helper';
import { setAddLoading } from 'redux/globalLoader/GlobalLoaderAction';
import { setAlertMessage } from 'redux/alertMessage/AlertMessageReducers';

import BasicModal from "components/common/modals/Basic";
import Actions from '../../../common/others/admin/Action';
import Image from 'components/common/formComponent/Image';
import Status from 'components/common/displayStatus/Status';
import StarRating from "components/common/others/admin/Rating";
import ReactTable from 'components/common/table/ReactTableServerSide'

import ProductService from "services/admin/master/store/product/ProductService";
import CustomerProductReviewServices from "../../../../services/admin/customer/CustomerProductReviewServices"

const All = ({
    activeTab,
    filterData,
    storeFilter,
    store,
}) => {
    const dispatch = useDispatch()
    
    const permission = useSelector((store) => store?.permission);
    const AdminId = useSelector(store => store?.user?.id);
    
    const [Data, setData] = useState([])
    const [setBasicModalInfo] = useState({});
    const [selectedRows, setSelectedRows] = useState([]);
    const [paginationData, setPaginationData] = useState({ ...paginationDetails })
    const [filteringOptions, setColumnFilteringOptions] = useState(filterData);
    const [openBasicModal, setOpenBasicModal] = useState(false);
    const [setOeCustomerReviewModal] = useState(false);
    const [modalInformation, setModalInformation] = useState({});
    const [sortingOptions, setSortingOptions] = useState([
        {
            field: "name",
            direction: 0,
            priority: 0,
        },
    ]);
    const COLUMNS = [
        {
            id: "productImage",
            Header: "Product Image",
            accessor: "productImage",
            column_name: "productImage",
            disableSortBy: true,
            Cell: ({ value, row }) => {
                return value &&
                    value !== "" &&
                    value !== undefined &&
                    value.length > 0 ? (
                    <>
                        <div className="flex items-center h-40">
                            <Image src={value} className="w-40" containerHeight={"h-20"} />
                        </div>
                    </>
                ) : (
                    <div className="flex items-center h-40">
                        <Image
                            src={defaultImage}
                            className="w-40"
                            containerHeight={"h-20"}
                        />
                    </div>
                );
            },
        },
        {
            id: "productName",
            Header: "Product Name",
            accessor: "productName",
            column_name: "productName",
            Cell: ({ value, row }) => {
                return value ? (
                    <>
                        <div
                            className="w-full flex justify-start items-center group text-indigo-500 "
                            style={{ width: "200px" }}
                        >
                            <div>
                                {
                                    row?.original?.productURL ? (
                                        <a
                                            target="_blank"
                                            href={`${store.url}/${row?.original?.productURL}.html`}
                                        >
                                            {value}
                                        </a>
                                    ) : ("")
                                }

                            </div>
                        </div>
                    </>
                ) : (
                    ""
                );
            },
        },
        {
            id: "customerName",
            Header: "CUSTOMER NAME",
            accessor: "customerName",
            Footer: "CUSTOMER NAME",
            column_name: "customerName",
        },
        {
            id: "customerEmail",
            Header: "CUSTOMER Email",
            accessor: "customerEmail",
            Footer: "CUSTOMER Email",
            column_name: "customerEmail",
        },
        {
            id: "comment",
            Header: "Comments",
            accessor: "comment",
            Footer: "Comments",
            column_name: "comment",
        },
        {
            id: "rating",
            Header: "Rating",
            accessor: "rating",
            Footer: "Rating",
            column_name: "rating",
            Cell: ({ value }) => {
                return value ? (
                    <>
                        <div className="first:pr-2 flex-center justify-center">
                            <StarRating value={value} size="30px" avgRating={value} />
                        </div>
                    </>
                ) : (
                    ""
                );
            },
        },
        {
            id: "reviewDate",
            Header: "Date",
            accessor: "reviewDate",
            Footer: "reviewDate",
            column_name: "reviewDate",
            Cell: ({ value }) => {
                return value ? (
                    <>
                        <div >{DateTimeFormat(value).date}</div>
                        <div className="text-[#707070] text-xs font-normal">
                            {DateTimeFormat(value).time}
                        </div>
                    </>
                ) : (
                    ""
                );
            },
        },
        {
            id: "recStatus",
            Header: "Approved Status",
            accessor: "status",
            Footer: "Status",
            column_name: "recStatus",
            disableSortBy: true,
            Cell: ({ value }) => {
                if (value !== undefined) {
                    return <Status type={value} />;
                } else {
                    return "";
                }
            },
        },
        {
            id: "action",
            Header: "",
            accessor: "id",
            column_name: "action",
            Cell: ({ value, row }) => {
                // if (row.original.status !== "Approved") {
                return (
                    <Actions
                        id={value}
                        row={row}
                        moduleName={TitleNameHelper({ defaultTitleName: "Customer Review" })}
                        setOpenBasicModal={setOpenBasicModal}
                        setBasicModalInfo={setBasicModalInfo}
                        handleShowModal={handleShowModal}
                        setOeCustomerReviewModal={setOeCustomerReviewModal}
                        setModalInfo={setModalInformation}
                        viewShow={true}
                        hideAction={"delete"}
                    />
                );
                // } else {
                //     return ""
                // }
            },
            disableSortBy: true,
            disableShowHide: true,
        },
    ];

    const getConsultationAndProof = useCallback(
        (pageIndex = 1) => {
            dispatch(setAddLoading(true));
            CustomerProductReviewServices.getCustomerReview({
                args: {
                    pageSize: paginationData.pageSize,
                    pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
                    sortingOptions,
                    filteringOptions,
                },
                storeId: anniesAnnualData.storeId,
            })
                .then((response) => {
                    setData(response.data.data.items);
                    setPaginationData((prevState) => ({
                        ...prevState,
                        pageIndex: response.data.data.pageIndex,
                        pageSize: response.data.data.pageSize,
                        totalCount: response.data.data.totalCount,
                        totalPages: response.data.data.totalPages,
                        hasPreviousPage: response.data.data.hasPreviousPage,
                        hasNextPage: response.data.data.hasNextPage,
                    }));
                    dispatch(setAddLoading(false));
                })
                .catch(() => {
                    dispatch(setAddLoading(false));
                });
        },
        [
            filteringOptions,
            paginationData.pageSize,
            sortingOptions,
            paginationData.pageIndex,
            storeFilter,
            activeTab,
        ],
    );

    const handleShowModal = () => {
        setOeCustomerReviewModal((prev) => !prev);
    };

    const setSortingOptionHandler = (column, direction) => {
        setSortingOptions([
            {
                field: column,
                direction: direction,
                priority: 0,
            },
        ]);
    };
    const setPaginationDataFunc = (key, value) => {
        setPaginationData((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };
    const statusChangeHandler = (data) => {
        dispatch(setAddLoading(true));
        if (data) {
            ProductService.StatusUpdateCustomerReview({
                approvedById: AdminId,
                ratingId: data?.reviewId,
                aproveStatus: data?.changeStatus
            })
                .then((response) => {
                    if (response.data.success) {
                        dispatch(
                            setAlertMessage({
                                type: "success",
                                message: `${ValidationMsgs.CustomerReview.statusChanged
                                    } ${data?.status === "Inprogress" ? "In Progress" : data?.status
                                    }`,
                            }),
                        );
                        getConsultationAndProof();
                    } else {
                        dispatch(
                            setAlertMessage({
                                type: "danger",
                                message: ValidationMsgs.CustomerReview.statusNotChange,
                            }),
                        );
                    }
                    dispatch(setAddLoading(false));
                })
                .catch((errors) => {
                    if (errors.response.data.Errors.Error) {
                        dispatch(
                            setAlertMessage({
                                type: "danger",
                                message: errors.response.data.Errors.Error,
                            }),
                        );
                    } else {
                        dispatch(
                            setAlertMessage({
                                type: "danger",
                                message: ValidationMsgs.consultationRequestStatus.statusNotChange,
                            }),
                        );
                    }
                    dispatch(setAddLoading(false));
                });
        }
        setOpenBasicModal(false);
    };

    useEffect(() => {
        if (storeFilter) {
            getConsultationAndProof();
        }
    }, [storeFilter]);

    return (
        <>
            <ReactTable
                COLUMNS={COLUMNS}
                DATA={Data}
                {...paginationData}
                setTablePageSize={(value) => setPaginationDataFunc("pageSize", value)}
                fetchData={getConsultationAndProof}
                sortingOptions={sortingOptions}
                setSortingOptions={setSortingOptionHandler}
                // column filters
                editColumnFilter={true}
                filteringOptions={filteringOptions}
                setColumnFilteringOptions={setColumnFilteringOptions}
                setSelectedRows={setSelectedRows}
                selectedRows={selectedRows}
                hiddenColumns={[
                    "rowSelection",
                    permission?.isEdit || permission?.isDelete ? "" : "action",
                ]}
            />

            <BasicModal
                handleConfirmation={statusChangeHandler}
                openModal={openBasicModal}
                setOpenModal={setOpenBasicModal}
                {...modalInformation}
            />
        </>
    )
}

export default All