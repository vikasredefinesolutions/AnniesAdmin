/*Component Name: Create
Component Functional Details:  Create .
Created By: PK Kher
Created Date: <Creation Date>
Modified By: PK Kher
Modified Date: <Modified Date> */

import React from 'react';
import ProductCreate from "../../common/product/create/Create";
import { EditMasterTabs, masterCatalogData, masterCatalogStoreTypes } from "global/Enum";
import { productType } from "dummy/Dummy";
import ProductService from 'services/admin/master/master/products/ProductService';
import SingleFieldUpdateService from 'services/admin/master/master/products/SingleFieldUpdateService';
import { useParams } from 'react-router-dom';
import ValidateService from "services/admin/validate/ValidateServices";
import { TitleNameHelper } from "services/common/helper/Helper";

const Create = ({ storeType }) => {
  const { storeName, storeType: storeTypeBrowserQuery, storeId, id } = useParams();


  const storeNameFinal = storeName
  const storeIdFinal = storeId
  const storeTypeFinal = storeTypeBrowserQuery ? storeTypeBrowserQuery : storeType

  return (
    <>
      <title>{!id ? "Create" : "Edit"} Product</title>
      <ProductCreate
        masterTabs={EditMasterTabs}
        masterCatalogFields={masterCatalogData?.fields}
        listUrl={'/admin/master/master/'}
        title={TitleNameHelper({ defaultTitleName: "Core Product Feed" })}
        type={productType.MC}
        getProductById={ProductService.getMasterProductById}
        getValidationForAllFilledFields={ValidateService.getMasterCatalogValidateProductStatus}
        updateProductStatus={SingleFieldUpdateService.updateSingleField}
        moduleName={`mastercatalog`}
        storeIdFinal={storeIdFinal}
        masterCatalogStoreTypes={masterCatalogStoreTypes}
        storeTypeFinal={storeTypeFinal}
        storeNameFinal={storeNameFinal}
      />
    </>
  );
};

export default Create;
