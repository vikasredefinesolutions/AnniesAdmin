import React from "react";
import { Route } from "react-router-dom";
import Routes from "routes/Routes";

import GardeningSlideshowsList from "components/admin/master/gardeningSlideshows/List"
import GardeningSlideshowsCreate from "components/admin/master/gardeningSlideshows/Create"

const InternalRouting = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<GardeningSlideshowsList />} />
                <Route path="/create" element={<GardeningSlideshowsCreate />} />
                <Route path="/edit/:id" element={<GardeningSlideshowsCreate />} />
            </Routes>
        </>
    );
};

export default InternalRouting;
