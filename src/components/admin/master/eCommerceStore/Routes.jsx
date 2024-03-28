import React from "react";
import { Route } from "react-router-dom";
import Routes from "routes/Routes";
import CategoryCreate from "components/admin/master/eCommerceStore/categoryMaster/create/Create";
import Export from "components/admin/master/eCommerceStore/export/Export";
import Import from "components/admin/master/eCommerceStore/import/Import";
import ProductList from "components/admin/master/eCommerceStore/product/list/List"
import BrandList from "components/admin/master/eCommerceStore/brandMaster/list/List";
import BrandCreate from "components/admin/master/eCommerceStore/brandMaster/create/Create";
// import CategoryList from "components/admin/master/eCommerceStore/categoryMaster/list/List"
import CategoryList from "components/admin/master/eCommerceStore/categoryMaster/Routes"
import ProductOrder from "components/admin/master/eCommerceStore/productOrder/ProductOrder";
import CategoryListing from "components/admin/master/eCommerceStore/productCategoryDragAndDrop/list/List";
import CategoryOrderingCreate from "components/admin/master/eCommerceStore/productCategoryDragAndDrop/create/Create";
import BrandOrdering from "components/admin/master/eCommerceStore/productBrandsDragAndDrop/ProductBrandOrder";

const InternalRouting = () => {
  return (
    <>
      <Routes>
        <Route path=":storeName/:storeId/products" element={<ProductList storeType={'CorporateStore'} />} />
        <Route path=":storeName/:storeId/brands" element={<BrandList storeType={'CorporateStore'} />} />
        <Route path=":storeName/:storeId/brandingOrder" element={<BrandOrdering />} />
        <Route path=":storeName/:storeId/brandingOrder/edit/:id" element={<BrandCreate storeType={'CorporateStore'} showBrandLogo={true} />} />
        <Route path=":storeName/:storeId/brands/edit/:id" element={<BrandCreate storeType={'CorporateStore'} showBrandLogo={true} />} />
        {/* <Route path=":storeName/:storeId/category" element={<CategoryList storeType={'CorporateStore'} />} /> */}
        <Route path=":storeName/:storeId/category" element={<CategoryList />} />
        <Route path=":storeName/:storeId/categoriesOrder" element={<CategoryListing storeType={'CorporateStore'} />} />

        {/* <Route path=":storeName/:storeId/category/create" element={<CategoryCreate storeType={'CorporateStore'} />} /> */}
        {/* <Route path=":storeName/:storeId/category/edit/:id" element={<CategoryCreate storeType={'CorporateStore'} />} /> */}
        <Route path=":storeName/:storeId/categoriesOrder/edit/:id" element={<CategoryOrderingCreate storeType={'CorporateStore'} />} />
        < Route path=":storeName/:storeId/products/export" element={<Export />} />
        <Route path=":storeName/:storeId/products/import" element={<Import />} />
        <Route path=":storeName/:storeID/productOrder" element={<div className="px-4 sm:px-6 lg:px-8 py-8 "><ProductOrder showBrandDD={true} /></div>} />
      </Routes>
    </>
  );
};

export default InternalRouting;
