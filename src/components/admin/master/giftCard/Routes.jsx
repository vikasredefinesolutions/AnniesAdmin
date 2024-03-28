import React from "react";
import { Route } from "react-router-dom";
import Routes from "routes/Routes";
import CustomerGiftCard from "./GiftCard";

const InternalRouting = ({ changeTab }) => {
    return (
        <>
            <Routes>
                <Route path="/" element={<CustomerGiftCard />} />
            </Routes>
        </>
    );
};

export default InternalRouting;
