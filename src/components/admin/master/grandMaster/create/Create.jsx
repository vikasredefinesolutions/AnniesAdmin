/*Component Name: Create
Component Functional Details:  Create .
Created By: Chandan
Created Date: 29-08-2022
Modified By: Chandan
Modified Date: 29-08-2022 */

import React from 'react';
import ProductCreate from "../../common/product/create/Create";
import { EditGrandMasterTabs, GrandMasterCatalogData, masterCatalogStoreTypes } from "global/Enum";
import { productType } from "dummy/Dummy";
import ProductService from 'services/admin/master/grandMaster/products/ProductService';
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
        masterTabs={EditGrandMasterTabs}
        masterCatalogFields={GrandMasterCatalogData?.fields}
        listUrl={'/admin/master/GrandMasterCatalog'}
        title={TitleNameHelper({ defaultTitleName: "External Product Feed" })}
        getProductById={ProductService.getGrandMasterProductById}
        getValidationForAllFilledFields={ValidateService.getGMasterCatalogValidateProductStatus}
        type={productType.GMC}
        moduleName={`grandMaster`}
        storeIdFinal={storeIdFinal}
        masterCatalogStoreTypes={masterCatalogStoreTypes}
        storeTypeFinal={storeTypeFinal}
        storeNameFinal={storeNameFinal}
      />
    </>
  );
};

export default Create;
