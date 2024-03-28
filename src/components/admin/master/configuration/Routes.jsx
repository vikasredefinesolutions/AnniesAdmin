import { Route } from "react-router-dom";

import Routes from "routes/Routes";

import ProductReadiness from "./readiness/product/Routes";
import SEOReadiness from "./readiness/SEO/Routes";

import ProductCustomFields from "./productCustomFields/Routes";
import CategoryConfigurator from "../configuration/categoryConfigurator/Routes"
import ProductConfigurator from "./productConfigurator/Routes";
import CategoryMasterList from "components/admin/master/eCommerceStore/categoryMaster/list/List"
import CategoryMasterCreate from "components/admin/master/eCommerceStore/categoryMaster/create/Create";
import ProductAttibutes from "components/admin/master/configuration/productAttributes/Routes"
import ProductTag from "components/admin/master/configuration/productTag/Routes"
import CategoryOrder from "components/admin/master/configuration/categoryOrder/Routes"
import MaxItemCountList from "components/admin/master/configuration/maxItemCount/list"
import QuantityDiscount from "components/admin/master/configuration/quantityDiscount/Routes"
import ShippingService from "components/admin/master/configuration/shippingService/Routes";
import ShippingMethod from "components/admin/master/configuration/shippingMethod/Routes";
import ShippingCharges from "components/admin/master/configuration/shippingCharges/Routes";
import FixCharges from "components/admin/master/configuration/fixCharges/Routes"
import EmailTemplate from "components/admin/master/configuration/emailTemplates/Routes"
import PaymentOptions from "components/admin/master/configuration/paymentOptions/Routes"
import ShippingWeight from "components/admin/master/configuration/shippingWeightAndUnits/shippingByWeight/Routes";
import ShippingUnits from "components/admin/master/configuration/shippingWeightAndUnits/shippingByUnits/Routes";
import PageRedirect from "./pageRedirect/Routes";

const InternalRouting = () => {
  return (
    <>
      <Routes>
        <Route path="/productReady/*" element={<ProductReadiness />} />
        <Route path="/SEOReady/*" element={<SEOReadiness />} />
        <Route path="/masterCategoryOrder/*" element={<CategoryOrder />} />
        <Route path="/ProductCustom/*" element={<ProductCustomFields />} />
        <Route path="/CategoryMaster" element={<CategoryMasterList />} />
        <Route path="/CategoryOrder" element={<CategoryOrder />} />
        <Route path="/CategoryMaster/create" element={<CategoryMasterCreate />} />
        <Route path="/CategoryMaster/edit/:id" element={<CategoryMasterCreate />} />
        <Route path="/CategoryConfigurator/*" element={<CategoryConfigurator />} />
        <Route path="/productConfigurator/*" element={<ProductConfigurator />} />
        <Route path="/ProductAttributes/*" element={<ProductAttibutes />} />
        <Route path="/productTagMaster/*" element={<ProductTag />} />
        <Route path="/maxItemCount/*" element={<MaxItemCountList />} />
        <Route path="/Quantitydiscount/*" element={<QuantityDiscount />} />
        <Route path="/shippingService/*" element={<ShippingService />} />
        <Route path="/shippingMethod/*" element={<ShippingMethod />} />
        <Route path="shippingCharges/*" element={<ShippingCharges />} />
        <Route path="/fixCharges/*" element={<FixCharges />} />
        <Route path="/emailTemplate/*" element={<EmailTemplate />} />
        <Route path="/paymentOptions/*" element={<PaymentOptions />} />
        <Route path="/shippingByWeight/*" element={<ShippingWeight />} />
        <Route path="/shippingByUnits/*" element={<ShippingUnits />} />
        <Route path="/pageRedirect/*" element={<PageRedirect/>} />
      </Routes>
    </>
  );
};

export default InternalRouting;
