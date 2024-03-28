/*Component Name: Create
Component Functional Details:  Create .
Created By: PK Kher
Created Date: <Creation Date>
Modified By: PK Kher
Modified Date: <Modified Date> */

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { ProductCatalogData, EditStoreProductTabs, masterCatalogStoreTypes, anniesAnnualData } from "global/Enum";

import SingleFieldUpdateService from 'services/admin/master/store/product/SingleFieldUpdateService';
import ProductService from 'services/admin/master/store/product/ProductService';
import StoreService from 'services/admin/store/StoreService';

import { setAddLoading } from 'redux/globalLoader/GlobalLoaderAction';

import ProductCreate from "../../common/product/create/Create";

const Create = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();

  const [store, setStore] = useState({});

  useEffect(() => {
    dispatch(setAddLoading(true));
    StoreService.getStoreById(anniesAnnualData.storeId).then((response) => {
      dispatch(setAddLoading(false));
      if (response.data.data) {
        let storeData = response.data.data;
        if (storeData.name.replace(/\s/g, "").toLowerCase() === anniesAnnualData.storeName.toLowerCase() && anniesAnnualData.storeType.toLowerCase() === storeData.storeType.name.replace(' ', '').toLowerCase()) {
          setStore(storeData);
        } else {
          navigate('404');
        }
      }
    }).catch((error) => {
      dispatch(setAddLoading(false));
      navigate('404');
    });
  }, [anniesAnnualData.storeId]);

  return (
    <>
      <title>{store?.name ? store?.name + ' |' : ''}  {!id ? "Create" : "Edit"} Product</title>
      <ProductCreate masterTabs={EditStoreProductTabs}
        masterCatalogFields={ProductCatalogData?.fields}
        listUrl={`/admin/master/products`}
        title={`${store.name ? store.name : ''} Product`}
        type={store?.storeTypeId}
        getProductById={ProductService.getStoreProductById}
        updateProductStatus={SingleFieldUpdateService.updateSingleField}
        moduleName={"products"}
        store={store}
        storeIdFinal={anniesAnnualData.storeId}
        masterCatalogStoreTypes={masterCatalogStoreTypes}
        storeTypeFinal={anniesAnnualData.storeType}
        storeNameFinal={anniesAnnualData.storeName}
      />
    </>
  );
};

export default Create;
