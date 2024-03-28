import React, { useState, useEffect } from 'react'
import { Link, useSearchParams, useParams } from 'react-router-dom';

const PageEditTabHeader = ({ activeTab, permission }) => {
  const [q, setQ] = useState(null)
  const { id } = useParams();
  const [searchParams] = useSearchParams()

  useEffect(() => {
    setQ(searchParams.get("q"))
  }, [searchParams])

  const activeClass = "tab py-4 px-6 block hover:text-blue-500 focus:outline-none text-blue-500 border-b-2 font-medium border-blue-500 cursor-pointer";
  const inactiveClass = "tab text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none border-b-2 font-medium border-white hover:border-indigo-400 cursor-pointer"
  return (
    // <div className="flex justify-center items-center border-solid border-b-gray-100 ml-[16.337vw] w-[83.300vw]">
    <div className="flex justify-center items-center border-solid border-b-gray-100 w-[100vw]">
      <ul className="flex justify-center w-full bg-white">
        {permission?.isEdit || permission?.isDelete ? (
          <>
            {q ? (
              <li className="mr-0.5 md:mr-0">
                <button className="font-medium text-indigo-600 hover:text-indigo-500">
                  <span
                    className={
                      activeTab === 1 ? activeClass : inactiveClass
                    }
                  >
                    Content
                  </span>
                </button>
              </li>
            ) : (
              <li className="mr-0.5 md:mr-0">
                <Link
                  to={`/admin/Content/Page/edit/${id}`}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  <span
                    className={
                      activeTab === 1 ? activeClass : inactiveClass
                    }
                  >
                    Content
                  </span>
                </Link>
              </li>
            )}
          </>
        ) : (
          <li className="mr-0.5 md:mr-0">
            <a
              href={`/admin/Content/Page/Preview/${id}`}
              className="font-medium text-indigo-600 hover:text-indigo-500"
              target="_blank"
            >
              <span
                className={activeTab === 1 ? activeClass : inactiveClass}
              >
                Preview
              </span>
            </a>
          </li>
        )}
        {!q && (
          <li className="mr-0.5 md:mr-0">
            <Link
              to={`/admin/Content/Page/edit/setting/${id}`}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              <span
                className={activeTab === 2 ? activeClass : inactiveClass}
              >
                Settings
              </span>
            </Link>
          </li>
        )}

        {(permission?.isEdit || permission?.isDelete) && !q && (
          <>
            <li className="mr-0.5 md:mr-0">
              {" "}
              <Link
                to={`/admin/Content/Page/edit/optimize/${id}`}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                <span
                  className={
                    activeTab === 3 ? activeClass : inactiveClass
                  }
                >
                  Optimize
                </span>
              </Link>
            </li>
            <li className="mr-0.5 md:mr-0">
              <Link
                to={`/admin/Content/Page/edit/publish/${id}`}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                <span
                  className={
                    activeTab === 4 ? activeClass : inactiveClass
                  }
                >
                  Publishing Options
                </span>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default PageEditTabHeader