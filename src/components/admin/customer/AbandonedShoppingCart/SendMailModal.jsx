import React from "react";
import Transition from "utils/Transition";

const SendMailModal = ({
  setSendMailModal,
  sendMailModal,
  setSendMailModalData,
  sendMailModalData,
  SendEmail,
  CustomerId,
}) => {
  return (
    <>
      <Transition
        className="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity"
        show={sendMailModal}
        tag="div"
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        onClick={() => setSendMailModal(false)}
      />
      <Transition
        className="fixed inset-0 z-50 overflow-hidden flex items-center my-4 justify-center transform px-4 sm:px-6"
        show={sendMailModal}
        tag="div"
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div className="bg-white rounded shadow-lg overflow-auto max-w-4xl w-full max-h-full">
          <div className="px-5 py-3 border-b border-neutral-200">
            <div className="flex justify-between items-center">
              <div className="font-semibold text-gray-800">Send Email</div>
              <button
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setSendMailModal(false)}
              >
                <div className="sr-only">Close</div>
                <svg className="w-4 h-4 fill-current">
                  <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z"></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="px-5">
            <div className="text-sm flex flex-wrap justify-start text-left -mx-4">
              <div className="w-full p-4">
                <div className="col-span-12 md:col-span-6 mt-2">
                  <>
                    {sendMailModalData && sendMailModalData.length ? (
                      <div
                        className={`bg-white m-5`}
                        dangerouslySetInnerHTML={{ __html: sendMailModalData }}
                      ></div>
                    ) : (
                      <div className="flex justify-center items-center rounded-t border-b text-red-600 bg-white min-w-[400px] min-h-[160px] p-5 text-lg">
                        No Email Template found
                      </div>
                    )}
                  </>
                </div>
              </div>
            </div>
          </div>

          <div className="px-5 py-4">
            <div className="flex flex-wrap justify-end space-x-2">
              <button
                className={`flex justify-center btn px-6 bg-indigo-500 hover:bg-indigo-600 text-white`}
                onClick={() => {
                  SendEmail(CustomerId, false);
                }}
              >
                <div className={`w-full flex justify-center align-middle `}>
                  send
                </div>
              </button>
              <button
                type="button"
                className="btn bg-white border-neutral-200 text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setSendMailModal(false);
                  setSendMailModalData("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
};

export default SendMailModal;
