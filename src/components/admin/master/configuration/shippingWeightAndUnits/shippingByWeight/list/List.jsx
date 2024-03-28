import React from "react";
import ShippingWeightAndUnitsService from "services/admin/shippingWeightAndUnits/shippingWeightAndUnitsService";
import CommonList from "../../common/list/CommonList";
import { TitleNameHelper } from "services/common/helper/Helper";

const List = () => {
  return (
    <>
      <CommonList
        title={TitleNameHelper({ defaultTitleName: "Shipping By Weight" })}
        ByWeight={true}
        editURL="/admin/master/Configuration/shippingByWeight/edit"
        ShippingWeightAndUnitsList={ShippingWeightAndUnitsService.getShippingWeightAndUnitsList}
        statusChangeAPI={ShippingWeightAndUnitsService.updateStatus}
        multiplestatusChangeAPI={ShippingWeightAndUnitsService.updateMultipleStatus}
      />
    </>
  );
};

export default List;
