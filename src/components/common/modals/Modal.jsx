import React from "react";
import Transition from "utils/Transition";

const Modal = (props) => {
  const { setIsModalOpen, isModalOpen, children,className } = props;
  return (
    <>
      <Transition
      className="fixed inset-0 bg-slate-900 bg-opacity-95 z-30 transition-opacity"
      show={isModalOpen}
      tag="div"
      enter="transition ease-out duration-200 transform"
      enterStart="opacity-0 -translate-y-2"
      enterEnd="opacity-100 translate-y-0"
      leave="transition ease-out duration-200"
      leaveStart="opacity-100"
      leaveEnd="opacity-0"
      onClick={() => setIsModalOpen(false)}
    ></Transition>
      <Transition
        className="fixed inset-0 z-30 overflow-hidden flex items-center my-4 justify-center transform px-4 sm:px-6"
        show={isModalOpen}
        tag="div"
        id="basic-modal"
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div className={`bg-white rounded shadow-lg overflow-hidden max-w-lg w-full max-h-full p-4  ${className}`}>
          
          <div className="flex justify-end items-center">
            <button
              type="button"
              className="text-black hover:text-gray-400"
              onClick={() => setIsModalOpen(false)}
            >
              <div className="sr-only">Close</div>
              <div className="flex justify-end">
                <svg className="w-4 h-4 fill-current ">
                  <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z"></path>
                </svg>
              </div>
            </button>
          </div>
          {children}
        </div>
      </Transition>
    </>
  );
};

export default Modal;
