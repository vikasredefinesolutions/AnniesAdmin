/*Component Name: Footer
Component Functional Details: User can create or update Footer master details from here.
Created By: Happy
Created Date: <Creation Date>
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import CKEditor from "components/common/formComponent/CKEditor";
import { Form as FormikForm, Formik } from "formik";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import CMSConfiguration from "services/admin/cmsConfiguration/CMSConfiguration";
import CategoryServiceCls from "services/admin/category/CategoryService";
import TopicsDetailsServicesCls from "services/admin/topics/TopicsDetailsServices";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";

import { UpdateMessage, anniesAnnualData } from "global/Enum";
import { UpdateJsonDetails, updateStoreDetails } from "services/common/helper/Helper";
import { ValidationMsgs } from "global/ValidationMessages";
import Textarea from "components/common/formComponent/Textarea";

const Footer = ({ setFormSubmit, store }) => {
  const formRef = useRef();
  const { storeId } = useParams();
  const dispatch = useDispatch();
  const [initialValues, setinitialValues] = useState({ content: "" });

  useEffect(() => {
    setFormSubmit(formRef.current);
  }, [formRef, setFormSubmit]);

  const getConfiguration = useCallback(() => {
    CMSConfiguration.getConfiguration(storeId, "footer").then((response) => {
      if (response.data.success) {
        if (response?.data?.data?.config_value) {
          setinitialValues({ content: response.data.data.config_value });
        }
      }
    });
  }, []);
  useEffect(() => {
    getConfiguration();
  }, []);

  const HandleSubmit = (fields) => {
    updateConfiguration(fields);
  };

  const updateConfiguration = (fields) => {
    dispatch(setAddLoading(true));
    /*let menuConfigObj = {
      store_id: storeId,
      config_name: `footer`,
      config_value: fields.content,
      status: "Y",
    };
    CMSConfiguration.updateConfiguration(menuConfigObj).then((response) => {
      if (response.data.success) {
        getConfiguration();

        dispatch(
          setAlertMessage({
            view: true,
            type: "success",
            message: response.data.message,
          })
        );
      }
    });*/
    CMSConfiguration.getConfiguration(storeId, "footer")
      .then((response) => {
        if (response.data.success) {
          let menuConfigObj = {
            id: response.data?.data?.id ?? 0,
            store_id: storeId,
            config_name: `footer`,
            config_value: fields.content,
            status: "Y",
          };
          CMSConfiguration.updateConfiguration(menuConfigObj)
            .then(async (res) => {
              if (res.data.success) {
                // UpdateJsonDetails(
                //   dispatch,
                //   ValidationMsgs.store.footer.updated
                // );
                if (store?.url) {
                  const uploadStoreDetails = await updateStoreDetails(
                    store?.url
                  );
                  if (
                    uploadStoreDetails?.data &&
                    uploadStoreDetails?.data?.message
                  ) {
                    dispatch(
                      setAlertMessage({
                        type: "success",
                        message: ValidationMsgs.store.footer.updated,
                      })
                    );
                  }
                }
              } else {
                dispatch(
                  setAlertMessage({
                    type: "danger",
                    message: ValidationMsgs.store.footer.notupdated,
                  })
                );
              }
              getConfiguration();
              dispatch(setAddLoading(false));
            })
            .catch(() => {
              dispatch(
                setAlertMessage({
                  type: "danger",
                  message: ValidationMsgs.store.footer.notupdated,
                })
              );
              dispatch(setAddLoading(false));
            });
          dispatch(setAddLoading(false));
        }
      })
      .catch((error) => {
        dispatch(setAddLoading(false));
      });
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={HandleSubmit}
        innerRef={formRef}
        validateOnChange={true}
        validateOnBlur={false}
      >
        {({ values, setFieldValue }) => {
          return (
            <FormikForm>
              <div className="w-full mb-6 p-6 last:mb-0">
                <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                  Content
                </label>
                <Textarea
                  name={`content`}
                  id={`content`}
                  defaultValue={values.content}
                  rows="20"
                />
                {/* <CKEditor
                  type="simple"
                  name={`content`}
                  id={`content`}
                  defaultValue={values.content}
                  onChange={(value) => {
                    setFieldValue(`content`, value);
                  }}
                  loading={initialValues.content}
                  config={{
                    toolbar: [
                      ["Source"],
                      ["Styles"],
                      ["Bold", "Italic", "Underline"],
                      ["NumberedList", "BulletedList"],
                      ["List", "Indent", "Blocks", "Align"],
                    ],
                    extraPlugins: [
                      //'wordcount'  
                    ],
                    removePlugins: ["image"],
                    extraAllowedContent: "div(*)",
                    allowedContent: true,
                  }}
                /> */}
              </div>
            </FormikForm>
          );
        }}
      </Formik>
    </>
  );
};

export default Footer;
