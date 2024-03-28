import React from "react";
import ShippingWeightAndUnitsService from "services/admin/shippingWeightAndUnits/shippingWeightAndUnitsService";
import CommonList from "../../common/list/CommonList";
import { TitleNameHelper } from "services/common/helper/Helper";

const List = () => {
  return (
    <>
      <CommonList
        title={TitleNameHelper({ defaultTitleName: "Shipping By Units" })}
        ByWeight={false}
        editURL="/admin/master/Configuration/shippingByUnits/edit"
        ShippingWeightAndUnitsList={ShippingWeightAndUnitsService.getShippingWeightAndUnitsList}
        statusChangeAPI={ShippingWeightAndUnitsService.updateStatus}
        multiplestatusChangeAPI={ShippingWeightAndUnitsService.updateMultipleStatus}
      />
    </>
  );
};

export default List;
