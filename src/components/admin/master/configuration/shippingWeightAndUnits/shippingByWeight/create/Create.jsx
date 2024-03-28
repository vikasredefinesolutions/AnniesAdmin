import React from "react";
import CommonCreate from "../../common/create/CommonCreate";
import ShippingWeightAndUnitsService from "services/admin/shippingWeightAndUnits/shippingWeightAndUnitsService";
import ShippingWeightAndUnitsDetailService from "services/admin/shippingWeightAndUnits/shippingWeightAndUnitsDetailService";
import { TitleNameHelper } from "services/common/helper/Helper";
import StateServiceCls from "services/admin/state/StateService";

const Create = () => {
  return (
    <>
      <CommonCreate
        title={TitleNameHelper({ defaultTitleName: "Shipping By Weight" })}
        ByWeight={true}
        listUrl="/admin/master/Configuration/shippingByWeight"
        editURL="/admin/master/Configuration/shippingByWeight/edit"
        CreateShippingWeightAndUnitAPI={ShippingWeightAndUnitsService.createShippingWeightAndUnits}
        UpdateShippingWeightAndUnitAPI={ShippingWeightAndUnitsService.updateShippingWeightAndUnits}
        GetShippingWeightAndUnitAPI={ShippingWeightAndUnitsService.getShippingWeightAndUnitsById}
        RangePriceDetailsAPI={ShippingWeightAndUnitsDetailService.getShippingWeightAndUnitsDetailsListById}
        RangePriceDetailsDeleteAPI={ShippingWeightAndUnitsDetailService.updateMultipleStatus}
        getProductFieldsByStoreId={StateServiceCls.getState}
      />
    </>
  );
};

export default Create;
