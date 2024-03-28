import React from "react";
import { Route } from "react-router-dom";
import Routes from "routes/Routes";
import PageRedirectListing from "./list/List";
import PageRedirectCreate from "./create/Create";

const InternalRouting = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<PageRedirectListing />} />
        <Route path="/create" element={<PageRedirectCreate />} />
      </Routes>
    </>
  );
};

export default InternalRouting;
