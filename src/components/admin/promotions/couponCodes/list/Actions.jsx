/*Component Name: Actions
Component Functional Details: User can create or update Actions of customer List details from here.
Created By: Shrey Patel
Created Date: 07/14/22
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import React, { useRef, useEffect, useState } from "react";
import Transition from "utils/Transition";
import { Link } from "react-router-dom";
import { RecStatusValuebyName, RecStatusValueName } from "global/Enum";
import { useSelector } from "react-redux";

const Actions = ({
  id,
  row,
  setPromotions,
  setOpenDeleteModal,
  setModalInfo,
  setOpenBasicModal,
  editUrl,
}) => {
  const permission = useSelector(store => store.permission);
  const [show, setShow] = useState(false);
  // const getEditData = useRef(null);
  const dropdown = useRef(null);
  const trigger = useRef(null);
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !show ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setShow(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });
  return (
    <div x-data="{ open: false }">
      <div className="text-right">
        <button
          ref={trigger}
          onClick={() => setShow(!show)}
          className="w-6 h-6"
          aria-haspopup="true"
          aria-expanded="true"
        >
          <span className="material-icons-outlined">more_vert</span>
        </button>
      </div>
      <Transition
        className="z-10 absolute min-w-60 bg-white border border-neutral-200 pt-1.5 rounded shadow-lg mt-1 overflow-y-auto enter-done right-14"
        show={show}
        tag="div"
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <ul className="pb-4" ref={dropdown}>
          <li className="pt-4 px-5">
            <Link
              type="button"
              to={editUrl}
              className="text-indigo-500 hover:text-indigo-600 cursor-pointer"
            >
              Edit
            </Link>
          </li>
          {(permission?.isEdit || permission?.isDelete) &&
            <>
              {(() => {
                if (row.original?.recStatus === RecStatusValuebyName.Active) {
                  return (
                    <li
                      className="pt-4 px-5"
                      onClick={() => {
                        setModalInfo((prev) => {
                          return {
                            ...prev,
                            status: RecStatusValueName.Inactive,
                            module: "Promotions",
                            title: "Inactive this Promotion",
                            ButtonName: RecStatusValueName.Inactive,
                            data: {
                              ...row.original,
                              changeStatus: RecStatusValuebyName.Inactive,
                            },
                          };
                        });
                        setOpenBasicModal((prev) => !prev);
                      }}
                    >
                      <span className="text-indigo-500 hover:text-indigo-600  cursor-pointer">
                        {RecStatusValueName.Inactive}
                      </span>
                    </li>
                  );
                } else if (
                  row.original?.recStatus === RecStatusValuebyName.Inactive
                ) {
                  return (
                    <li
                      className="pt-4 px-5"
                      onClick={() => {
                        setModalInfo((prev) => {
                          return {
                            ...prev,
                            // message: 'Do you want to change Status to Active?',
                            module: "Promotions",
                            status: RecStatusValueName.Active,
                            title: "Active this Promotion",
                            ButtonName: RecStatusValueName.Active,
                            data: {
                              ...row.original,
                              changeStatus: RecStatusValuebyName.Active,
                            },
                          };
                        });
                        setOpenBasicModal((prev) => !prev);
                      }}
                    >
                      <span className="text-indigo-500 hover:text-indigo-600  cursor-pointer">
                        {RecStatusValueName.Active}
                      </span>
                    </li>
                  );
                }
              })()}
            </>
          }
          {(row.original?.recStatus !== RecStatusValuebyName.Archived && permission?.isDelete) && (
            <li className="pt-4 px-5">
              <span
                onClick={() => {
                  setOpenDeleteModal(true);
                  setPromotions({
                    ...row.original,
                    changeStatus: RecStatusValuebyName.Archived,
                  });
                }}
                className="text-indigo-500 hover:text-indigo-600 cursor-pointer"
              >
                Delete
              </span>
            </li>
          )}
        </ul>
      </Transition>
    </div>
  );
};

export default Actions;
