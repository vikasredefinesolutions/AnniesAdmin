import React from 'react';
import ProductCreate from "../../../common/product/create/Create";
import { anniesAnnualData, bundleFields, EditBundleTabs, masterCatalogStoreTypes } from "global/Enum";
import BundleProductService from "services/admin/master/store/bundle/ProductService";
import { productType } from "dummy/Dummy";
import SingleFieldUpdateService from 'services/admin/master/store/product/SingleFieldUpdateService';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import StoreService from 'services/admin/store/StoreService';
import { useEffect } from 'react';
import { useState } from 'react';
import { setAddLoading } from 'redux/globalLoader/GlobalLoaderAction';

const Create = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [store, setStore] = useState({});

  useEffect(() => {
    dispatch(setAddLoading(true));
    StoreService.getStoreById(anniesAnnualData.storeId).then((response) => {
      dispatch(setAddLoading(false));
      if (response.data.success && response.data.data) {
        let storeData = response.data.data;
        if (storeData.name.replace(' ', '').toLowerCase() === anniesAnnualData.storeName.toLowerCase() && anniesAnnualData.storeType.toLowerCase() === storeData.storeType.name.replace(' ', '').toLowerCase()) {
          setStore(storeData);
        } else {
          navigate('404');
        }
      }
    }).catch((error) => {
      dispatch(setAddLoading(false));
      navigate('404');
    });
  }, []);

  return (
    <>
      <title>{!id ? "Create" : "Edit"} Bundle</title>
      <ProductCreate
        masterTabs={EditBundleTabs}
        masterCatalogFields={bundleFields?.fields}
        // listUrl={
        //   getEditUrl(id, masterCatalogStoreTypes, storeTypeFinal, storeNameFinal, storeIdFinal, storeType, true)
        //   // `/admin/MasterCatalog/${storeTypeFinal}/${storeName}/${storeId}/products`
        // }
        title={"Bundle"}
        getProductById={BundleProductService.getBundleProductById}
        type={productType.Bundle}
        updateProductStatus={SingleFieldUpdateService.updateSingleField}
        // moduleName={moduleName}
        moduleName={"bundle"}
        store={store}
        storeType={anniesAnnualData.storeType}
        storeIdFinal={anniesAnnualData.storeId}
        masterCatalogStoreTypes={masterCatalogStoreTypes}
        storeTypeFinal={anniesAnnualData.storeType}
        storeNameFinal={anniesAnnualData.storeName}
      />
    </>
  );
};

export default Create;