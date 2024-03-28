/*Component Name: 404
Component Functional Details:  404 .
Created By: PK Kher
Created Date: <Creation Date>
Modified By: PK Kher
Modified Date: <Modified Date> */

import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  const redirectToMainDashboard = () => {
    navigate("/admin/dashboard");
    window.location.reload();
  };

  return (
    <>
      <title>404 Page Not</title>

      <div className="pt-[60px] pb-[30px] flex flex-col justify-center items-center">
        <div className="text-center mb-[40px]">
          <img src="/something-went-wrong.png" alt="Something went wrong..." />
        </div>
        <div className="mb-[30px] mt-[15px]">
          <div className="text-2xl-text mb-[20px] font-bold text-stone-900">
            {/* Please contact to the Admin */}
            404 Page Not Found
          </div>
          <div className="mt-[30px] btn bg-indigo-500 hover:bg-indigo-600 text-white rounded-md">
            <span
              className="cursor-pointer"
              onClick={() => {
                redirectToMainDashboard();
              }}
            >
              BACK TO HOME PAGE
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
