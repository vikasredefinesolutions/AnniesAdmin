/*Component Name: Footer
Component Functional Details: User can create or update Footer master details from here.
Created By: Happy
Created Date: <Creation Date>
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import { Form, Form as FormikForm, Formik } from "formik";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";

import CMSConfiguration from "services/admin/cmsConfiguration/CMSConfiguration";

import { footerFormData } from "global/Enum";

const CustomFooter = ({ setFormSubmit }) => {
  const formRef = useRef();
  const { storeId } = useParams();
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState();
  const [initialValues, setinitialValues] = useState({ selectedImage: "" });

  useEffect(() => {
    setFormSubmit(formRef.current);
  }, [formRef, setFormSubmit]);

  const getConfiguration = useCallback(() => {
    CMSConfiguration.getConfiguration(storeId, "customFooter").then(
      (response) => {
        if (response.data.success) {
          if (response?.data?.data?.config_value) {
            setSelectedOption(response?.data?.data?.config_value);
          }
        }
      }
    );
  }, []);

  useEffect(() => {
    getConfiguration();
  }, []);

  const HandleSubmit = (fields) => {
    updateConfiguration(fields);
  };

  const updateConfiguration = (fields) => {
    CMSConfiguration.getConfiguration(storeId, "customFooter").then(
      (response) => {
        if (response.data.success) {
          let menuConfigObj = {
            id: response.data?.data?.id ?? 0,
            store_id: storeId,
            config_name: `customFooter`,
            config_value: selectedOption,
            status: "A",
          };

          CMSConfiguration.updateConfiguration(menuConfigObj)
            .then((res) => {
              if (res.data.success) {
                dispatch(
                  setAlertMessage({
                    view: true,
                    type: "success",
                    message: "Configuration updated successfully",
                  })
                );
              }
              getConfiguration();
            })
            .catch(() => {});
        }
      }
    );
  };

  return (
    <div className=" p-6">
      <p className="mt-2">Please select an image</p>

      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={HandleSubmit}
        innerRef={formRef}
        validateOnChange={true}
        validateOnBlur={false}
      >
        {() => (
          <Form className="[&>input]:ml-2">
            {footerFormData.map((formData) => (
              <div className="flex items-center [& img]:ml-4">
                <input
                  {...formData}
                  defaultChecked={selectedOption === formData.value}
                  checked={selectedOption === formData.value}
                  onChange={(event) => setSelectedOption(event.target.value)}
                />

                <div className="mt-2">
                  <img
                    className="ml-3"
                    src={formData.image}
                    width={250}
                    height={250}
                  />
                </div>
              </div>
            ))}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CustomFooter;
