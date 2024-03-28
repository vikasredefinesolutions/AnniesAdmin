/*Component Name: Error
Component Functional Details:  Error .
Created By: PK Kher
Created Date: 6-17-2022
Modified By: PK Kher
Modified Date: 6-17-2022 */

import React from "react";
import { useNavigate } from "react-router-dom";
const Error = () => {
  const navigate = useNavigate();

  const redirectToMainDashboard = () => {
    navigate("/admin/dashboard");
    window.location.reload();
  };

  return (
    <>
      <title>Something went wrong...</title>

      <div className="pt-[60px] pb-[30px] flex flex-col justify-center items-center">
        <div className="text-center mb-[40px]">
          <img src="/something-went-wrong.png" alt="Something went wrong..." />
        </div>
        <div className="mb-[30px] mt-[15px]">
          <div className="text-2xl-text mb-[20px] font-bold text-stone-900">
            Something went wrong...
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

export default Error;
