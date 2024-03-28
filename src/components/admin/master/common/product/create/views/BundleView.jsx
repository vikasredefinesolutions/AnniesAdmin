/*Component Name: BundleView.jsx
Component Functional Details: Basic Information tab field display
Created By: Vikas Patel
Created Date: 11-May-2022
Modified By: Shrey Patel
Modified Date: Sept/28/2022 */
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams } from "react-router-dom";
import { productType } from 'dummy/Dummy';
import { defaultImage, paginationDetails, CurrencySymbolByCode } from 'global/Enum';
import ReactTable from 'components/common/table/ReactTableServerSide';
import Image from 'components/common/formComponent/Image';
import BundleStoreService from 'services/admin/master/store/product/BundleService'
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { useDispatch, useSelector } from "react-redux";
import { scrollTop } from 'services/common/helper/Helper';

const BundleView = ({ displayFieldElement, fetchFieldProperty, fields, values, requiredFields, type, tab, setActiveTab, index, productId, activeTab }) => {
  const dispatch = useDispatch();
  const AdminAppConfigReducers = useSelector((store) => store?.AdminAppConfigReducers);

  const COLUMNS = [
    {
      id: "",
      Header: "",
      accessor: "productImage",
      column_name: "",
      disableSortBy: true,
      Cell: ({ value, row }) => {
        return row ? (
          <>
            {/* {row.original.subRows === undefined && ( */}
              {/* <> */}
                {value !== null ? (
                  <>
                    <div className="w-14 h-14 shrink-0 mr-2 sm:mr-3  rounded-full text-center">
                      <div className="h-14 w-14 flex items-center justify-center overflow-hidden  box-content border bg-white">
                        <Image src={value} containerHeight={""} className="max-h-full" />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-14 h-14 shrink-0 mr-2 sm:mr-3  rounded-full text-center">
                      <div className="h-14 w-14 flex items-center justify-center overflow-hidden  box-content border bg-white">
                        <Image src={defaultImage} containerHeight={""} className="max-h-full" />
                      </div>
                    </div>
                  </>
                )}
              {/* </> */}
            {/* )} */}
          </>
        ) : (
          "-"
        );
      },
    },
    {
      id: "name",
      Header: "Name",
      accessor: "name",
      column_name: "name",
      disableSortBy: true,
      Cell: ({ value, row }) => {
        return row ? (
          <>
            <div
              className="w-full flex justify-start items-center group"
              style={{ width: "200px" }}
            >
              <div >
                {value}
              </div>
            </div>
          </>
        ) : (
          "-"
        );
      },
    },
    {
      id: "store",
      Header: "Store",
      accessor: "storeImage",
      column_name: "store",
      disableSortBy: true,
      Cell: ({ value, row }) => {
        return row ? (
          <>
            {row.original.subRows !== undefined && (
              <>
                {value !== null ? (
                  <>
                    <div  >
                      <img className={'w-12 h-12 border border-neutral-200 rounded-full box-content items-center'} src={`${AdminAppConfigReducers["azure:BlobUrl"]}${value}`} />
                    </div>
                  </>
                ) : (
                  <>
                    <div  >
                      <Image src={defaultImage} />
                    </div>
                  </>
                )}
              </>
            )}
          </>
        ) : (
          "-"
        );
      },
    },
    {
      id: "sku",
      Header: "SKU",
      accessor: "ourSKU",
      column_name: "SKU",
      disableSortBy: true,
      Cell: ({ value, row }) => {
        return row ? (
          <>
            <div className="w-full flex justify-start items-center group mr-8">
              <div >
                {value}
              </div>
            </div>
          </>
        ) : (
          "-"
        );
      },
    },
    {
      id: "salePrice",
      Header: `Sale Price (${CurrencySymbolByCode.USD})`,
      accessor: "salePrice",
      column_name: "salePrice",
      disableSortBy: true,
      Cell: ({ value, row }) => {
        return row ? (
          <>
            <div className="w-full flex justify-start items-center group mr-8">
              <div >
                {value}
              </div>
            </div>
          </>
        ) : (
          "-"
        );
      },
    },
    {
      id: "msrp",
      Header: `MSRP (${CurrencySymbolByCode.USD})`,
      accessor: "msrp",
      column_name: "MSRP",
      disableSortBy: true,
      Cell: ({ value, row }) => {
        return row ? (
          <>
            <div className="w-full flex justify-start items-center group mr-8">
              <div >
                {value}
              </div>
            </div>
          </>
        ) : (
          "-"
        );
      },
    },
    {
      id: "quantity",
      Header: "Quantity",
      accessor: "quantity",
      column_name: "quantity",
      disableSortBy: true,
      Cell: ({ value, row }) => {
        return row ? (
          <>
            <div className="w-full flex justify-start items-center group mr-8">
              <div >
                {value}
              </div>
            </div>
          </>
        ) : (
          "-"
        );
      },
    },
    // {
    //   id: "color",
    //   Header: "color",
    //   accessor: "color",
    //   column_name: "color",
    //   disableSortBy: true,
    //   Cell: ({ value, row }) => {
    //     return row ? (
    //       <>
    //         <div className="w-full flex justify-start items-center group">
    //           <div >
    //             {value}
    //           </div>
    //         </div>
    //       </>
    //     ) : (
    //       "-"
    //     );
    //   },
    // },
  ];
  const [Data, setData] = useState([]);
  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "name",
      direction: 0,
      priority: 0,
    },
  ]);
  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
  });
  const [filteringOptions, setColumnFilteringOptions] = useState([]);
  const setPaginationDataFunc = (key, value) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
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

  const getBundleData = () => {
    dispatch(setAddLoading(true))
      BundleStoreService.getBundleProducts(productId)
        .then((response) => {
          const StoreBundleProduct = response?.data;
          setData(StoreBundleProduct?.data);
          dispatch(setAddLoading(false))
        });
  }

  useEffect(() => {
    if (activeTab === 0) {
      getBundleData();
    }
  }, [filteringOptions, paginationData.pageSize, sortingOptions, paginationData.pageIndex, activeTab])

  return (
    <>
      <div className="px-6 py-12 border-b-4 border-neutral-200 last:border-b-0">
        <div className='flex items-center justify-between'>
          <div className='block uppercase tracking-wide text-gray-500 text-base font-bold mb-2'>
            {tab.label}
          </div>
          <div >
            <span className="text-indigo-500 cursor-pointer" onClick={() => { setActiveTab(index); scrollTop(); }}>Edit</span>
          </div>
        </div>
        <div className="col-span-full w-full rounded-md">
          <ReactTable
            COLUMNS={COLUMNS}
            DATA={Data}
            // {...paginationData}
            setTablePageSize={(value) =>
              setPaginationDataFunc("pageSize", value)
            }
            fetchData={() => { }}
            sortingOptions={sortingOptions}
            setSortingOptions={setSortingOptionHandler}
            hiddenColumns={['rowSelection', [productType.EcommerceStore, productType.CorporateStore].includes(type) && 'store']}
            tablePadding={'px-4 pb-4'}
            displaySearch={false}
            expandedRows={useMemo(() => false, [])}

          />
        </div>
      </div>
    </>
  );
};

export default BundleView;

