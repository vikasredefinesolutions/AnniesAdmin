import React, { useRef, useEffect, useState } from "react";
import Transition from "utils/Transition";
import { Link } from "react-router-dom";
import { RecStatusValuebyName, RecStatusValueName } from "global/Enum";
import { useSelector } from "react-redux";

const Actions = ({
  id,
  row,
  setReadiness,
  setOpenDeleteModal,
  setModalInfo,
  setOpenBasicModal,
  setViewHistoryModal,
  setRecordId
}) => {
  const permission = useSelector(store => store.permission);
  const [show, setShow] = useState(false);
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
              to={`edit/${id}`}
              className="text-indigo-500 hover:text-indigo-600 cursor-pointer"
            >
              Edit
            </Link>
          </li>
          {(row.original?.recStatus !== RecStatusValuebyName.Archived && permission?.isDelete) && (
            <li className="pt-4 px-5">
              <span
                onClick={() => {
                  setReadiness({
                    ...row.original,
                    changeStatus: RecStatusValuebyName.Archived,
                  });

                  setOpenDeleteModal(true);
                }}
                className="text-indigo-500 hover:text-indigo-600 cursor-pointer"
              >
                Delete
              </span>
            </li>
          )}
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
                            module: "Readiness",
                            title: "Inactive this Readiness",
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
                            module: "Readiness",
                            status: RecStatusValueName.Active,
                            title: "Active this Readiness",
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

          <li className="pt-4 px-5">
            <span
              type="button"
              className="text-indigo-500 hover:text-indigo-600 cursor-pointer"
              onClick={() => { setRecordId(row.original.id); setViewHistoryModal(prev => !prev); }}
            >
              View history
            </span>
          </li>

        </ul>
      </Transition>
    </div>
  );
};

export default Actions;
