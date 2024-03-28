/*Component Name: Create
Component Functional Details: User can create or update Create master details from here.
Created By: Happy
Created Date: 06/20/2022
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import React from "react";
import CommonCreate from "../../common/create/CommonCreate";
import SEOReadinessService from "services/admin/readiness/SEOReadinessService";
import SEOFieldService from "services/admin/seoField/SEOFieldService";
import { TitleNameHelper } from "services/common/helper/Helper";

const Create = () => {

  return (
    <>
      <CommonCreate title={TitleNameHelper({ defaultTitleName: "Seo Radiness" })} listUrl="/admin/master/Configuration/SEOReady" editURL="/admin/master/Configuration/SEOReady/edit" CreateReadinessAPI={SEOReadinessService.createSEOReady} UpdateReadinessAPI={SEOReadinessService.updateSEOReady} GetReadinessAPI={SEOReadinessService.getSEOReadyById} CreateOrUpdateRedinessDetailsAPI={SEOReadinessService.createOrUpdateSEOReadyDetails} getProductFieldsByStoreId={SEOFieldService.getSeoProductFieldsByStoreId} />
    </>
  );
};

export default Create;
