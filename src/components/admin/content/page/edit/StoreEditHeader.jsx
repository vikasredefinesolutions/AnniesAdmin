import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const StoreEditHeader = ({ activeTab }) => {
  const { id, storeId, storeid } = useParams();
  const [pageId, setPageId] = useState(null);
  useEffect(() => {
    setPageId(id || storeId || storeid);
  }, [id]);


  const activeClass = "tab py-4 px-6 block hover:text-blue-500 focus:outline-none text-blue-500 border-b-2 font-medium border-blue-500 cursor-pointer";
  const inactiveClass = "tab text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none border-b-2 font-medium border-white hover:border-indigo-400 cursor-pointer"

  return (
    <>
      {pageId && (
        <div className='flex justify-between border-solid border-b-gray-100 mb-6'>
          <ul className='w-full flex justify-center bg-white'>
            <li className='mr-0.5 md:mr-0'>
              <Link
                to={`/admin/configurator/storeconfiguration/configuration/productListing/${pageId}`}
                className='font-medium text-indigo-600 hover:text-indigo-500'
              >
                <span
                  className={activeTab === 1 ? activeClass : inactiveClass}
                >
                  Configure Store
                </span>
              </Link>
            </li>

            <li className='mr-0.5 md:mr-0'>
              <Link
                to={`/admin/configurator/storeconfiguration/configuration/Theme/${pageId}`}
                className='font-medium text-indigo-600 hover:text-indigo-500'
              >
                <span className={activeTab === 2 ? activeClass : inactiveClass}>
                  Configure Theme
                </span>
              </Link>
            </li>

            <li className='mr-0.5 md:mr-0'>
              <Link
                to={`/admin/configurator/storeconfiguration/configuration/SEO/${pageId}`}
                className='font-medium text-indigo-600 hover:text-indigo-500'
              >
                <span
                  className={activeTab === 3 ? activeClass : inactiveClass}
                >
                  Configure SEO
                </span>
              </Link>
            </li>

            <li className='mr-0.5 md:mr-0'>
              <Link
                to={`/admin/configurator/storeconfiguration/configuration/HeaderConfig/${pageId}`}
                className='font-medium text-indigo-600 hover:text-indigo-500'
              >
                <span
                  className={activeTab === 4 ? activeClass : inactiveClass}
                >
                  Configure Header
                </span>
              </Link>
            </li>

            <li className='mr-0.5 md:mr-0'>
              <Link
                to={`/admin/configurator/storeconfiguration/configuration/${pageId}/Menu`}
                className='font-medium text-indigo-600 hover:text-indigo-500'
              >
                <span className={activeTab === 5 ? activeClass : inactiveClass}>
                  Configure Menu
                </span>
              </Link>
            </li>

            <li className='mr-0.5 md:mr-0'>
              <Link
                to={`/admin/configurator/storeconfiguration/configuration/${pageId}/General`}
                className='font-medium text-indigo-600 hover:text-indigo-500'
              >
                <span
                  className={activeTab === 6 ? activeClass : inactiveClass}
                >
                  Configure General
                </span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default StoreEditHeader;
