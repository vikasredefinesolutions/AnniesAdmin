import React, { useRef, useEffect, useState } from "react";
import Transition from "utils/Transition";
import { RecStatusValuebyName, RecStatusValueName } from "global/Enum";
import { useSelector } from "react-redux";

const Actions = ({
  id,
  row,
  setBasicModalInfo,
  setOpenBasicModal,
  setModalInformation,
  handleShowModal,
  setOpenConsultationModal,
  viewShow = false,
}) => {
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
          {row?.original?.status !== "New" && (
            <li
              className="pt-4 px-5"
              onClick={() => {
                setBasicModalInfo((prev) => {
                  return {
                    ...prev,
                    status: "change by",
                    module: "New",
                    title: "New",
                    ButtonName: "Save changes",
                    data: {
                      id,
                      status: "New",
                    },
                  };
                });
                setOpenBasicModal((prev) => !prev);
              }}
            >
              <span className="text-indigo-500 hover:text-indigo-600 cursor-pointer">
                New
              </span>
            </li>
          )}

          {row?.original?.status !== "Inprogress" && (
            <li
              className="pt-4 px-5"
              onClick={() => {
                setBasicModalInfo((prev) => {
                  return {
                    ...prev,
                    status: "change by",
                    module: "In Progress",
                    title: "In Progress",
                    ButtonName: "Save changes",
                    data: {
                      id,
                      status: "Inprogress",
                    },
                  };
                });
                setOpenBasicModal((prev) => !prev);
              }}
            >
              <span className="text-indigo-500 hover:text-indigo-600 cursor-pointer">
                In Progress
              </span>
            </li>
          )}

          {row?.original?.status !== "Approved" && (
            <li
              className="pt-4 px-5"
              onClick={() => {
                setBasicModalInfo((prev) => {
                  return {
                    ...prev,
                    status: "change by",
                    module: "Approved",
                    title: "Approved",
                    ButtonName: "Save changes",
                    data: {
                      id,
                      status: "Approved",
                    },
                  };
                });
                setOpenBasicModal((prev) => !prev);
              }}
            >
              <span className="text-indigo-500 hover:text-indigo-600 cursor-pointer">
                Approved
              </span>
            </li>
          )}

          {row?.original?.status !== "Junk" && (
            <li
              className="pt-4 px-5"
              onClick={() => {
                setBasicModalInfo((prev) => {
                  return {
                    ...prev,
                    status: "change by",
                    module: "Junk",
                    title: "Junk",
                    ButtonName: "Save changes",
                    data: {
                      id,
                      status: "Junk",
                    },
                  };
                });
                setOpenBasicModal((prev) => !prev);
              }}
            >
              <span className="text-indigo-500 hover:text-indigo-600 cursor-pointer">
                Junk
              </span>
            </li>
          )}

          {row?.original?.status !== "Rejected" && (
            <li
              className="pt-4 px-5"
              onClick={() => {
                setBasicModalInfo((prev) => {
                  return {
                    ...prev,
                    status: "change by",
                    module: "Rejected",
                    title: "Rejected",
                    ButtonName: "Save changes",
                    data: {
                      id,
                      status: "Rejected",
                    },
                  };
                });
                setOpenBasicModal((prev) => !prev);
              }}
            >
              <span className="text-indigo-500 hover:text-indigo-600 cursor-pointer">
                Rejected
              </span>
            </li>
          )}

          {viewShow && (
            <li
              className="pt-4 px-5"
              onClick={() => {
                setModalInformation(row.original);
                //   handleShowModal();
                setOpenConsultationModal(true);
              }}
            >
              <span className="text-indigo-500 hover:text-indigo-600 cursor-pointer">
                View
              </span>
            </li>
          )}
        </ul>
      </Transition>
    </div>
  );
};

export default Actions;
