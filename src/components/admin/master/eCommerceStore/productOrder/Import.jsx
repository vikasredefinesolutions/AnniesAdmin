import React, { useRef } from "react";
import { Formik, Form as FormikForm } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { serverError } from "services/common/helper/Helper";
import { ValidationMsgs } from "global/ValidationMessages";
import Messages from "components/common/alerts/messages/Index";
import ProductOrderService from "services/admin/master/store/productOrder/ProductOrderService";

const Import = ({
  handleShowModal,
  storeID,
}) => {
  const dispatch = useDispatch();
  const file = useRef();

  const location = useSelector((store) => store?.location);

  const handleSelectFile = (event, setFieldValue) => {
    if (event) {
      setFieldValue("file", event.currentTarget.files[0]);
    } else {
      setFieldValue("file", "");
    }
  };

  const MAX_FILE_SIZE = 156250;

  const validFileExtensions = { file: ["csv"] };

  const isValidFileType = (fileName, fileType) => {
    return (
      fileName &&
      validFileExtensions[fileType].indexOf(fileName.split(".").pop()) > -1
    );
  };

  const validationSchema = Yup.object({
    file: Yup.mixed()
      .required(ValidationMsgs.common.importFileRequired)
      .test("is-valid-type", ValidationMsgs.common.notAValidFileType, (value) =>
        isValidFileType(value && value.name.toLowerCase(), "file")
      )
      .test(
        "is-valid-size",
        ValidationMsgs.common.maxFileSizeIs,
        (value) => value && value.size <= MAX_FILE_SIZE
      ),
  });

  const onSubmit = (fields, { resetForm }) => {
    const formData = new FormData();
    formData.append("other.ExportType", 37);
    formData.append("other.Browser", location.browser);
    formData.append("other.Location", location.location);
    formData.append("other.IPAddress", location.ipAddress);
    formData.append("other.MACAddress", location.macAddress);
    formData.append("other.StoreId", storeID);
    formData.append("file", fields.file);

    dispatch(setAddLoading(true));
    ProductOrderService.productOrderImport(formData)
      .then((response) => {
        if (response.data.success) {
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.product.export.importSuccess,
            })
          );
          resetForm({});
          handleShowModal();
        } else {
          dispatch(
            setAlertMessage({
              type: "danger",
              message: serverError(response),
            })
          );
          handleShowModal();
        }
        dispatch(setAddLoading(false));
      })
      .catch((errors) => {
        dispatch(
          setAlertMessage({
            type: "danger",
            message: ValidationMsgs.product.export.importFailed,
          })
        );
        handleShowModal();
        dispatch(setAddLoading(false));
      });
  };

  return (
    <>
      <div className="overflow-y-auto overflow-x-hidden z-30 fixed right-0 left-0 top-4 justify-center items-center h-modal md:h-full md:inset-0">
        <div className="w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="relative px-4 w-full max-w-2xl h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow max-h-screen overflow-y-auto">
              <div className="justify-between items-start rounded-t border-b sticky top-0 left-0 bg-white">
                <div className="px-5 py-3 border-b border-neutral-300">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800">{"Import"}</h3>
                    <button
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                      data-modal-toggle="actionModal"
                      onClick={handleShowModal}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <Messages />
                <Formik
                  enableReinitialize={true}
                  initialValues={{ file: "" }}
                  onSubmit={onSubmit}
                  validationSchema={validationSchema}
                >
                  {({ setFieldValue, values, errors }) => {
                    const allErrors = errors ? Object.values(errors) : [];

                    return (
                      <FormikForm>
                        <div className="p-4">
                          <div className="mb-6">
                            <label
                              htmlFor=""
                              className="block uppercase tracking-wide text-xs font-bold mb-2"
                            >
                              File :
                            </label>
                            <input
                              type="file"
                              name="file"
                              accept=".csv"
                              id="file"
                              ref={file}
                              className="w-full px-2 py-1 text-sm leading-7 bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
                              onChange={(e) =>
                                handleSelectFile(e, setFieldValue)
                              }
                            />
                            {allErrors.length
                              ? allErrors.map((error, index) => {
                                return (
                                  <p
                                    className="py-4 text-red-600"
                                    key={index}
                                  >
                                    {error}
                                  </p>
                                );
                              })
                              : ""}
                            <div className="text-xs mt-1">
                              {"Choose only CSV file"}
                            </div>
                          </div>
                          <div className="p-4 flex items-center justify-end space-x-2 border-t-2 border-neutral-200">
                            <button
                              className="btn bg-white border-neutral-200 text-gray-500 hover:text-gray-700"
                              type="button"
                              onClick={() => {
                                handleShowModal();
                              }}
                            >
                              Cancel
                            </button>

                            <button
                              type="submit"
                              className={`cursor-pointer btn px-6 ${storeID < 0 ||
                                values?.file === "" ||
                                (allErrors && allErrors.length > 0)
                                ? "bg-slate-400 cursor-not-allowed "
                                : "bg-indigo-500"
                                } text-white`}
                              disabled={
                                storeID < 0 ||
                                  values?.file === "" ||
                                  (allErrors && allErrors.length > 0)
                                  ? true
                                  : false
                              }
                            >
                              Import
                            </button>
                          </div>
                        </div>
                      </FormikForm>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Import;
