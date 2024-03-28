import React from "react";
import { Route } from "react-router-dom";
import Routes from "routes/Routes";

import CategoryListing from "./list/List";

const InternalRouting = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<CategoryListing />} />
      </Routes>
    </>
  );
};

export default InternalRouting;
