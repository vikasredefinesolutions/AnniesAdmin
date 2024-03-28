/*Component Name: BannerLinks
Component Functional Details: User can create or update BannerLinks master details from here.
Created By: chandan
Created Date: <Creation Date>
Modified By: chandan
Modified Date: <Modified Date> */
import { FieldArray, useFormikContext } from "formik";
import {  useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductRow from "./ProductRow";

const AddProductSection = () => {
  const { values } = useFormikContext();
  const GlobalLoading = useSelector(
    (store) => store?.GlobalLoaderReducer?.toLoad
  );
  const showMessage = useSelector((state) => state.alertMessage);

  const permission = useSelector((store) => store.permission);

  const { id } = useParams();
  const isAddMode = !id;


  return (
    <>
      <div className="px-5 py-4 bg-white mb-6">
        {/* {showMessage?.message ===
          `${ValidationMsgs.cmsConfig.banner.addSomeBannerLinks}` && (
          <Messages />
        )} */}

        <div className="flex">
          <h4 className="flex items-center justify-between w-full group mb-1">
            <div className="text-lg text-gray-800 font-bold">
              Products Section
            </div>
          </h4>

          {(permission?.isEdit || permission?.isDelete) && (
            <div className=" w-full flex justify-end">
              <button
                disabled={GlobalLoading}
                type="button"
                className={`hidden flex justify-center btn px-6 bg-indigo-500 hover:bg-indigo-600 text-white ${
                  GlobalLoading
                    ? "bg-indigo-200 hover:bg-indigo-200"
                    : "cursor-pointer"
                }`}
              >
                <div className={`w-full flex justify-center align-middle `}>
                  {GlobalLoading && (
                    <span className="spinner-border spinner-border-sm mr-2"></span>
                  )}
                  Save Products
                </div>
              </button>
            </div>
          )}
        </div>

        <div>
          {!isAddMode && (
            <table className="table-auto w-full text-sm text-[#191919] font-semibold">
              <thead className="text-sm font-bold uppercase text-[#b3b3b3] border-b border-neutral-200">
                <tr className="first:pl-5">
                  <th className="px-2 py-4">
                    <div className="font-semibold text-left w-32 max-w-sm flex items-center">
                      <span>Name</span>
                    </div>
                  </th>
                  <th className="px-2 py-4">
                    <div>
                      <span>Link</span>
                    </div>
                  </th>

                  <th className="px-2 py-4">
                    <div>
                      <span>Button Text</span>
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                <FieldArray
                  name="productSku"
                 
                >
                  {({push,remove})=>(
                      <>
                        {Object.keys(values.productSku) &&
                        values.productSku.length > 0 ? (
                          values.productSku.map((value, i) => {
                            return (
                              <tr key={i}>
                                <ProductRow
                                  key={i}
                                  values={values}
                                  index={i}
                                  value={value}
                                  remove= {remove}
                                  push = {push}
                                />
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td>
                              <span>Please add some products</span>
                            </td>

                            <td></td>

                            <td className="text-right">
                              <button
                                type="button"
                                className={"w-6 h-6 text-indigo-500"}
                                onClick={() => {
                                  {
                                    push({
                                      name: "",
                                      link: "",
                                      buttonText: "",
                                      image: ""
                                    });
                                  }
                                }}
                              >
                                <span className="material-icons-outlined">
                                  add
                                </span>
                              </button>
                            </td>
                          </tr>
                        )}
                      </>
                    )}
                </FieldArray>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default AddProductSection;
