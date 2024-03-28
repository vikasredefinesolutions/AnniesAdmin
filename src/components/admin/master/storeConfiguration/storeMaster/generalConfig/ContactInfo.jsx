/*Component Name: ContactInfo
Component Functional Details: User can create or update ContactInfo master details from here.
Created By: chandan
Created Date: <Creation Date>
Modified By: chandan
Modified Date: <Modified Date> */

import React, {
  useEffect,
  useRef,
  useState,
  Fragment,
  useCallback,
} from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Form as FormikForm, Formik } from "formik";

import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import CMSConfiguration from "services/admin/cmsConfiguration/CMSConfiguration";
import Textarea from "components/common/formComponent/Textarea";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import CategoryServiceCls from "services/admin/category/CategoryService";
import TopicsDetailsServicesCls from "services/admin/topics/TopicsDetailsServices";
import { UpdateMessage, anniesAnnualData } from "global/Enum";
import { UpdateJsonDetails, updateStoreDetails } from "services/common/helper/Helper";
import { ValidationMsgs } from "global/ValidationMessages";

const ContactInfo = ({ setFormSubmit, store }) => {
  const formRef = useRef();
  const { storeId } = useParams();
  const [id, setId] = useState(0);

  const [initialValues, setInitialValues] = useState({
    contactInfo: {
      email_address: "",
      phone_number: "",
      company_address: "",
    },
  });
  const dispatch = useDispatch();

  // const validationSchema = Yup.object({
  //     email_address: Yup.string().trim().required(ValidationMsgs.common.emailRequired).email(ValidationMsgs.common.Email),
  //     phone_number: Yup.string().trim()
  //         .required(ValidationMsgs.common.phoneRequired).test(
  //             'phone',
  //             ValidationMsgs.common.phoneMatches,
  //             (value, context) => {
  //                 if (/^(\+\d{1,3}[- ]?)?\d{10}$/.test(value)) {
  //                     return true;
  //                 } else if (/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value)) {
  //                     return true;
  //                 }
  //                 return false;
  //             },
  //         ),
  //     company_address: Yup.string().trim().required(ValidationMsgs.store.contactInfo.company_address),
  // });

  useEffect(() => {
    setFormSubmit(formRef.current);
  }, [formRef, setFormSubmit]);

  const HandleSubmit = (fields) => {
    updateConfiguration(fields);
  };

  const getConfiguration = useCallback(() => {
    dispatch(setAddLoading(true));
    CMSConfiguration.getConfiguration(storeId, `contactInfo`)
      .then((response) => {
        if (response.data.success && response?.data?.data) {
          setInitialValues({
            contactInfo: JSON.parse(response.data.data.config_value),
          });
          setId(response.data.data.id);
        }
        dispatch(setAddLoading(false));
      })
      .catch(() => {
        dispatch(setAddLoading(false));
      });
  }, [dispatch, storeId]);

  const updateConfiguration = useCallback(
    (fields) => {
      dispatch(setAddLoading(true));
      var jsonData = JSON.stringify(fields.contactInfo);
      CMSConfiguration.getConfiguration(storeId, "contactInfo")
        .then((response) => {
          if (response.data.success) {
            setId(response.data.data.id);
          }
          dispatch(setAddLoading(false));
        })
        .catch((error) => {
          dispatch(setAddLoading(false));
        });
      let menuConfigObj = {
        id: id,
        store_id: storeId,
        config_name: `contactInfo`,
        config_value: jsonData,
        status: "Y",
      };
      CMSConfiguration.updateConfiguration(menuConfigObj)
        .then(async (response) => {
          if (response.data.success) {
            if (store?.url) {
              const uploadStoreDetails = await updateStoreDetails(store?.url);
              if (
                uploadStoreDetails?.data &&
                uploadStoreDetails?.data?.message
              ) {
                dispatch(
                  setAlertMessage({
                    type: "success",
                    message: ValidationMsgs.store.contactInfo.updated,
                  })
                );
              } else {
                dispatch(
                  setAlertMessage({
                    type: "success",
                    message: ValidationMsgs.store.contactInfo.updated,
                  })
                );
              }
            }
            } else {
              dispatch(
                setAlertMessage({
                  type: "danger",
                  message: ValidationMsgs.store.contactInfo.notupdated,
                })
              );
            }
          dispatch(setAddLoading(false));
          getConfiguration();
        })
        .catch((error) => {
          dispatch(
            setAlertMessage({
              type: "danger",
              message: ValidationMsgs.store.contactInfo.notupdated,
            })
          );
          dispatch(setAddLoading(false));
        });
    },
    [id]
  );

  useEffect(() => {
    getConfiguration();
  }, []);

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={HandleSubmit}
        innerRef={formRef}
        // validationSchema={validationSchema}
        validateOnChange={true}
        validateOnBlur={false}
        // dirty={false}
      >
        {({ values, setFieldValue, errors, ...rest }) => {
          return (
            <FormikForm>
              <div className="p-6 sm:px-6 lg:px-8 w-full">
                <div className="overflow-x-auto max-h-screen">
                  <div className="flex-wrap items-center whitespace-nowrap">
                    <Fragment>
                      <div className="m-1.5 ml-0 flex items-center">
                        <div className="w-1/6 ml-2 ">
                          <label className=" text-sm lg:opacity-0 lg:sidebar-expanded:opacity-100 duration-200 font-semibold">{`Email Address`}</label>
                        </div>
                        <div className="w-full">
                          <Textarea
                            name={"contactInfo.email_address"}
                            type="text"
                            placeholder=""
                            maxLength="160"
                            className="text-gray-700 border-gray-200 rounded focus:outline-none focus:bg-white"
                            rows={1}
                          />
                        </div>
                      </div>
                      <div className="m-1.5 ml-0 flex items-center">
                        <div className="w-1/6 ml-2 ">
                          <label className=" text-sm lg:opacity-0 lg:sidebar-expanded:opacity-100 duration-200 font-semibold">{`Phone Number`}</label>
                        </div>
                        <div className="w-full">
                          <Textarea
                            name={"contactInfo.phone_number"}
                            type="text"
                            placeholder=""
                            maxLength="160"
                            className="text-gray-700 border-gray-200 rounded focus:outline-none focus:bg-white"
                            rows={1}
                          />
                        </div>
                      </div>
                      <div className="m-1.5 ml-0 flex items-center">
                        <div className="w-1/6 ml-2 ">
                          <label className=" text-sm lg:opacity-0 lg:sidebar-expanded:opacity-100 duration-200 font-semibold">{`Company Address`}</label>
                        </div>
                        <div className="w-full">
                          <Textarea
                            name={"contactInfo.company_address"}
                            type="text"
                            placeholder=""
                            maxLength="160"
                            className="text-gray-700 border-gray-200 rounded focus:outline-none focus:bg-white"
                            rows={1}
                          />
                        </div>
                      </div>
                    </Fragment>
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
export default ContactInfo;
