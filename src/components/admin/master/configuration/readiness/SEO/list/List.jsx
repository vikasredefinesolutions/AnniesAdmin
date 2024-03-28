/*Component Name: List
Component Functional Details: User can show List of SEO Readiness and he/she can edit, delete and update status of list from here.
Created By: Happy
Created Date: 31/5/22
Modified By: Happy
Modified Date: 06/20/2022 */

import React from "react";
import SEOReadinessService from "services/admin/readiness/SEOReadinessService";
import CommonList from "../../common/list/CommonList";
import { TitleNameHelper } from "services/common/helper/Helper";

const List = () => {
  return (
    <>

      <CommonList
        title={TitleNameHelper({ defaultTitleName: "Seo Radiness" })} editURL="/admin/master/Configuration/SEOReady/edit" GetReadinessAPI={SEOReadinessService.getSEOReadiness} statusChangeAPI={SEOReadinessService.updateStatus} multiplestatusChangeAPI={SEOReadinessService.updateMultipleStatus} />
    </>
  );
};

export default List;
