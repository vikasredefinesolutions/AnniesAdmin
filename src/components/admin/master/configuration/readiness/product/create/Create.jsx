/*Component Name: Create
Component Functional Details: User can create or update Create master details from here.
Created By: Happy
Created Date: 06/20/2022
Modified By: <Modified By Name>
Modified Date: <Modified Date> */


import React from "react";
import CommonCreate from "../../common/create/CommonCreate";
import ProductReadinessService from "services/admin/readiness/ProductReadinessService";
import ProductFieldService from "services/admin/productField/ProductFieldService";
import { TitleNameHelper } from "services/common/helper/Helper";

const Create = () => {

  return (
    <>
      <CommonCreate title={TitleNameHelper({ defaultTitleName: "Product Radiness" })} listUrl="/admin/master/Configuration/productReady" editURL="/admin/master/Configuration/productReady/edit" CreateReadinessAPI={ProductReadinessService.createProductReady} UpdateReadinessAPI={ProductReadinessService.updateProductReady} GetReadinessAPI={ProductReadinessService.getProductReadyById} CreateOrUpdateRedinessDetailsAPI={ProductReadinessService.createOrUpdateProductReadyDetails} getProductFieldsByStoreId={ProductFieldService.getProductFieldsByStoreId} />
    </>
  );
};

export default Create;
