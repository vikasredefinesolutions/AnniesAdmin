import React from "react";
import { Route } from "react-router-dom";
import Routes from "routes/Routes";
import MasterCatalogCreate from "./create/Create";
import Export from "./export/Export";
import Import from "./import/Import";
import MasterCatalogList from "./product/list/List";

const InternalRouting = ({ changeTab }) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MasterCatalogList changeTab={changeTab} />} />
        <Route path="/create" element={<MasterCatalogCreate />} />
        <Route path="/edit/:id" element={<MasterCatalogCreate />} />
        <Route path="/export" element={<Export />} />
        <Route path="/import" element={<Import />} />
      </Routes>
    </>
  );
};

export default InternalRouting;
