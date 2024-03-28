import React from "react";
import { Route } from "react-router-dom";
import Routes from "routes/Routes";
import EcomAllPageInnerRoutes from "components/admin/master/eCommerceStore/Routes"

const InternalRouting = () => {

    return (
        <>
            <Routes>
                <Route exact path=":storeType/*" element={<EcomAllPageInnerRoutes />} />
            </Routes>
        </>
    );
};

export default InternalRouting;
