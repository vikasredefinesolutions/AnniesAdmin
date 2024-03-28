/*Component Name: AllInfo
Component Functional Details: User can create or update AllInfo master details from here.
Created By: Vikas Patel
Created Date: 27th May 2022
Modified By: Shrey Patel
Modified Date: June/27/2022 */
import React, { Fragment, useMemo } from "react";
import BasicInformationView from "./BasicInformationView";
import PricingView from "./PricingView";
import MediaView from "./MediaView";
import AttributesView from "./AttributesView";
import InventoryView from "./InventoryView";
import SEOView from "./SEOView";
import OrderHistoryView from "./OrderHistoryView";
import CustomerReviewsView from "./CustomerReviewsView";
import CustomerFAQView from "./CustomerFAQView";
import LifeCycleView from "./LifeCycleView";
import ProductView from "./ProductView";
import ProductAndStoreMappingView from "./ProductAndStoreMappingView";
import AdditionalInformationView from "./AdditionalInformationView";
import FilterFacetView from "./FilterFacetView";
import VendorSKUMappingView from "./VendorSKUMappingView";
import BundleView from "./BundleView";

const AllInfo = ({
  displayFieldElement,
  fetchFieldProperty,
  fields,
  values,
  productId,
  type,
  requiredFields,
  setActiveTab,
  masterTabs,
  moduleName,
  setAttributeCombinations,
  index,
  isAddMode,
  ...prop
}) => {

  const componentsView = {
    basic: BasicInformationView,
    additionalinformation: AdditionalInformationView,
    filterfacet: FilterFacetView,
    pricing: PricingView,
    media: MediaView,
    product: ProductView,
    attributes: AttributesView,
    vendorskumapping: VendorSKUMappingView,
    inventory: InventoryView,
    seo: SEOView,
    bundle: BundleView,
    orderhistory: OrderHistoryView,
    customerreviews: CustomerReviewsView,
    customerfaq: CustomerFAQView,
    lifecycle: LifeCycleView,
    productAndStoreMapping: ProductAndStoreMappingView,
  };

  const displayTabs = useMemo(() => {
    return (!isAddMode ? masterTabs.filter((element) => element.componentname !== "all") : masterTabs)
  }, [masterTabs, isAddMode, prop?.store]);

  return (
    <>
      {displayTabs.map((tab, key) => {
        const Component = componentsView[tab.componentname];
        return (
          <Fragment key={key}>
            <Component
              displayFieldElement={displayFieldElement}
              fetchFieldProperty={fetchFieldProperty}
              fields={fields}
              values={values}
              productId={productId}
              tab={tab}
              readOnly={true}
              type={type}
              requiredFields={requiredFields}
              setActiveTab={setActiveTab}
              key={key}
              index={key + 1}
              moduleName={moduleName}
              setAttributeCombinations={setAttributeCombinations}
              {...prop}
            />
          </Fragment>
        );
      })}
    </>
  );
};

export default AllInfo;
