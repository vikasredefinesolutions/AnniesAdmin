import React, { useState } from "react";
import { Route } from "react-router-dom";

import Routes from "routes/Routes";

import ProductList from "components/admin/master/eCommerceStore/product/list/List"
import ProductCreate from "components/admin/master/eCommerceStore/create/Create";
import Giftcard from "components/admin/master/giftCard/Routes"
import GardeningSlideshows from "components/admin/master/gardeningSlideshows/Routes"
import Bundle from "components/admin/master/eCommerceStore/bundle/create/Create";

import Configuration from "./configuration/Routes";
import MasterCatalog from "./master/Routes";
import GrandMasterCatalog from "./grandMaster/Routes";
import DashBoard from "./dashboard/Dashboard";
import ECommerceStore from "./eCommerceStore/Routes"
import Settings from "./settings/Routes"
import ProductInventory from "./productInventory/ProductInventory";

const InternalRouting = () => {
  const [changeTab, SetChangeTab] = useState(0);
  return (
    <>
      <Routes>
        <Route path="dashboard/*" element={<DashBoard SetChangeTab={SetChangeTab} />} />
        <Route path="Configuration/*" element={<Configuration />} />
        <Route path="master/*" element={<MasterCatalog changeTab={changeTab} />} />
        <Route path="Grandmaster/*" element={<GrandMasterCatalog changeTab={changeTab} />} />
        <Route exact path=":storeType/*" element={<ECommerceStore />} />
        <Route path="Settings/*" element={<Settings />} />
        <Route path="giftcard/*" element={<Giftcard />} />
        <Route path="GardeningSlideshows/*" element={<GardeningSlideshows />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/create" element={<ProductCreate />} />
        <Route path="/products/edit/:id" element={<ProductCreate />} />
        <Route path="/products/bundle/create" element={<Bundle storeType={'ecommercestore'} moduleName={"Bundle"} type={1} />} />
        <Route path="/products/bundle/edit/:id" element={<Bundle storeType={'ecommercestore'} moduleName={"Bundle"} type={1} />} />
        <Route path="productInventory" element={<ProductInventory />}/>
      </Routes>
    </>
  );
};

export default InternalRouting;
