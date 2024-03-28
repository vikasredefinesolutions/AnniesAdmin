import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { serverError } from "services/common/helper/Helper";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";

import ProductInventoryServiceCls from "services/admin/productInventory/ProductInventoryService";
import { ValidationMsgs } from "global/ValidationMessages";
import Message from "components/common/alerts/messages/Index";
import FormErrorMessage from "components/common/alerts/FormErrorMessage";

const Import = ({ setShowImportModal, showImportModal }) => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    file: Yup.string().trim().required("File is Required"),
  });

  const onSubmit = (fields) => {
    dispatch(setAddLoading(true));

    const formData = new FormData();
    formData.append("file", fields.file);

    if (fields?.file) {
      ProductInventoryServiceCls.productinventoryimport(formData)
        .then((response) => {
          if (response.data.success) {
            setShowImportModal((prev) => !prev);
            dispatch(
              setAlertMessage({
                type: "success",
                message: ValidationMsgs.product.export.importSuccess,
              })
            );
          } else {
            dispatch(
              setAlertMessage({
                type: "danger",
                message: serverError(response),
              })
            );
          }
          dispatch(setAddLoading(false));
        })
        .catch(() => {
          dispatch(setAddLoading(false));
        });
    }
  };

  const csvCheck = (event, setFieldValue, setFieldError) => {
    const file = event.target.files[0];

    if (file !== undefined && file !== "" && file.type === "text/csv") {
      setFieldValue("file", event.currentTarget.files[0]);
    } else {
      setFieldError("file", ValidationMsgs.product.export.chooseOnlyCsv);
    }
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          file: "",
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ setFieldValue, values, setFieldError, errors }) => {
          return (
            <FormikForm>
              <div
                className={`overflow-y-auto overflow-x-hidden fixed inset-0 z-40 justify-center items-center h-modal max-h-screen`}
              >
                <div className="w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="relative px-4 w-full max-w-2xl h-full md:h-auto">
                    <div className="relative bg-white rounded-lg shadow  max-h-screen overflow-y-auto">
                      <div className="flex justify-between items-start p-5 rounded-t border-b  sticky top-0 left-0 bg-white">
                        <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl ">
                          Import Product Inventory
                        </h3>
                        <button
                          type="button"
                          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                          data-modal-toggle="managestoreModal"
                          onClick={() => setShowImportModal((prev) => !prev)}
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
                      {showImportModal && <Message />}
                      <div className="px-6 mb-4 mt-2">
                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                          File
                          <span className="text-rose-500 text-2xl leading-none">
                            *
                          </span>
                          :
                        </label>
                        <input
                          className="w-full px-2 py-1 text-sm leading-7 bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
                          type="file"
                          accept=".csv"
                          name="file"
                          defaultValue={values.file}
                          onChange={(event) =>
                            csvCheck(
                              event,
                              setFieldValue,
                              setFieldError,
                              values
                            )
                          }
                        />
                        <FormErrorMessage>{errors?.file}</FormErrorMessage>
                      </div>
                      <div className="flex items-center justify-end p-6 space-x-2 rounded-b border-t border-gray-200 ">
                        <button
                          type="button"
                          className="btn bg-white border-neutral-200 text-gray-500 hover:text-gray-700"
                          onClick={() => setShowImportModal((prev) => !prev)}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                        >
                          Import
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FormikForm>
          );
        }}
      </Formik>
    </>
  );
};
export default Import;
