/*Component Name: Routes
Component Functional Details: User can create or update Routes of main customer module details from here.
Created By: Happy
Created Date: 01/06/22
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import React from "react";
import { Route } from "react-router-dom";
import Routes from "routes/Routes";
import Customer from "./customer/Routes";
import Testimonial from "./testimonial/Routes";
import NewsLetterArchive from "./newsletterArchive/Routes";
// import Company from "./company/Routes";
import RequestConsultation from "./consultationRequest/RequestConsultation";
import ContactUs from "./contactUs/ContactUs";
import AbandonedShoppingCartList from "./AbandonedShoppingCart/AbandonedShoppingCartList";
// import ManageBulkTire from "./ManageBulkTier/List"
// import CustomerApplicationList from "./customerApplicationList/CustomerApplicationList";
// import DashBoard from "./dashBoard/DashBoard";
// import CustomerGiftCard from "./customerGiftCard/CustomerGiftCard";
// import SpecialRequest from "./specialRequest/List";
import CustomerReview from "./customerReview/Review"

const InternalRouting = () => {
  return (
    <>
      <Routes>
        {/* <Route path="DashBoard/*" element={<DashBoard />} /> */}
        <Route path="Customer/*" element={<Customer />} />
        <Route path="testimonial/*" element={<Testimonial />} />
        <Route path="newsLetterArchive/*" element={<NewsLetterArchive />} />
        {/* <Route path="Company/*" element={<Company />} /> */}
        <Route path="consultationRequest" element={<RequestConsultation />} />
        <Route path="contactUs" element={<ContactUs />} />
        <Route path="abandonedShoppingCart" element={<AbandonedShoppingCartList />} />
        <Route path="productCustomerReview" element={<CustomerReview />} />
        {/* <Route path="manageBulkTier/*" element={<ManageBulkTire />} /> */}
        {/* <Route path="AccountApprovalList" element={<CustomerApplicationList />} /> */}
        {/* <Route path="giftCardCustomer" element={<CustomerGiftCard />} /> */}
        {/* <Route path="specialRequest" element={<SpecialRequest />} /> */}
      </Routes >
    </>
  );
};

export default InternalRouting;
