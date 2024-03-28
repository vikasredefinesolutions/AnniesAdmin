import { Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { Switch } from "@mui/material";
import CMSConfiguration from "services/admin/cmsConfiguration/CMSConfiguration";
import CategoryServiceCls from "services/admin/category/CategoryService";
import TopicsDetailsServicesCls from "services/admin/topics/TopicsDetailsServices";

import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";

import { UpdateMessage, anniesAnnualData } from "global/Enum";
import { UpdateJsonDetails, updateStoreDetails } from "services/common/helper/Helper";
import { ValidationMsgs } from "global/ValidationMessages";

const GoogleTags = ({ setFormSubmit, store }) => {
  const [twitterTags, setTwitterTags] = useState({
    twitterTagRadio: false,
    twitterTagTextArea: "",
  });
  const [dcTags, setDcTags] = useState({
    dcTagRadio: false,
    dcTagTextArea: "",
  });

  const formRef = useRef();
  const [id, setId] = useState(0);
  const { storeId } = useParams();
  const dispatch = useDispatch();
  const [initialValues] = useState({});

  useEffect(() => {
    setFormSubmit(formRef.current);
  }, [formRef, setFormSubmit]);

  const getConfiguration = () => {
    dispatch(setAddLoading(true));
    CMSConfiguration.getConfiguration(storeId, "googleTags")
      .then((response) => {
        if (response.data.success) {
          if (response?.data?.data?.config_value) {
            let config_value = JSON.parse(response?.data?.data.config_value);
            setTwitterTags(config_value.twitterTags);
            setDcTags(config_value.dcTags);
            setId(response.data.data.id);
          }
        }
        dispatch(setAddLoading(false));
      })
      .catch(() => {
        dispatch(setAddLoading(false));
      });
  };

  useEffect(() => {
    getConfiguration();
  }, []);

  const HandleSubmit = () => {
    updateConfiguration();
  };

  const updateConfiguration = () => {
    dispatch(setAddLoading(true));
    var jsonData = JSON.stringify({
      twitterTags: {
        twitterTagRadio: twitterTags.twitterTagRadio,
        twitterTagTextArea: twitterTags.twitterTagRadio
          ? twitterTags.twitterTagTextArea
          : "",
      },
      dcTags: {
        dcTagRadio: dcTags.dcTagRadio,
        dcTagTextArea: dcTags.dcTagRadio ? dcTags.dcTagTextArea : "",
      },
    });
    CMSConfiguration.getConfiguration(storeId, "googleTags")
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
      config_name: `googleTags`,
      config_value: jsonData,
      status: "Y",
    };

    CMSConfiguration.updateConfiguration(menuConfigObj)
      .then(async (res) => {
        if (res.data.success) {
          // UpdateJsonDetails(dispatch, ValidationMsgs.store.googleTags.updated);
          if (store?.url) {
            const uploadStoreDetails = await updateStoreDetails(store?.url);
            if (uploadStoreDetails?.data && uploadStoreDetails?.data?.message) {
              dispatch(
                setAlertMessage({
                  type: "success",
                  message: ValidationMsgs.store.googleTags.updated,
                })
              );
            }
          }
        } else {
          dispatch(
            setAlertMessage({
              type: "danger",
              message: ValidationMsgs.store.googleTags.notupdated,
            })
          );
        }
        getConfiguration();
        dispatch(setAddLoading(false));
      })
      .catch((error) => {
        dispatch(setAddLoading(false));
        dispatch(
          setAlertMessage({
            type: "danger",
            message: ValidationMsgs.store.googleTags.notupdated,
          })
        );
      });
  };

  const handleTwitterSwitchChange = (event) => {
    setTwitterTags({ ...twitterTags, twitterTagRadio: event.target.checked });
  };
  const handleTwitterChange = (event) => {
    setTwitterTags({ ...twitterTags, twitterTagTextArea: event.target.value });
  };
  const handleDcSwitchChange = (event) => {
    setDcTags({ ...dcTags, dcTagRadio: event.target.checked });
  };
  const handleDcChange = (event) => {
    setDcTags({ ...dcTags, dcTagTextArea: event.target.value });
  };

  return (
    <div className=" p-6">
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={HandleSubmit}
        innerRef={formRef}
        validateOnChange={true}
        validateOnBlur={false}
      >
        {({ values, errors, ...rest }) => (
          <Form className="[&>input]:ml-2">
            <div className="">
              <div className="m-1.5 ml-0 flex items-center mt-4">
                <div className="w-1/4 ml-2">
                  <label className="block text-sm font-bold">Twitter Tag</label>
                </div>

                <Switch
                  checked={twitterTags?.twitterTagRadio}
                  onChange={handleTwitterSwitchChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
              {twitterTags?.twitterTagRadio && (
                <div className="m-1.5 ml-0 flex items-center mt-4">
                  <div className="w-1/3 ml-2 ">
                    <label className=" text-sm lg:opacity-0 lg:sidebar-expanded:opacity-100 duration-200 font-semibold">{`Twiiter Tags Code`}</label>
                  </div>
                  <textarea
                    value={twitterTags.twitterTagTextArea}
                    onChange={handleTwitterChange}
                    placeholder=""
                    maxLength="160"
                    className="text-gray-700 border-gray-200 rounded focus:outline-none focus:bg-white block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md"
                  />
                </div>
              )}
            </div>
            <div className="">
              <div className="m-1.5 ml-0 flex items-center mt-4">
                <div className="w-1/4 ml-2">
                  <label className="block text-sm font-bold">DC Tag</label>
                </div>

                <Switch
                  checked={dcTags?.dcTagRadio}
                  onChange={handleDcSwitchChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
              {dcTags?.dcTagRadio && (
                <div className="m-1.5 ml-0 flex items-center mt-4">
                  <div className="w-1/3 ml-2 ">
                    <label className=" text-sm lg:opacity-0 lg:sidebar-expanded:opacity-100 duration-200 font-semibold">{`DC Tags Code`}</label>
                  </div>
                  <textarea
                    value={dcTags.dcTagTextArea}
                    onChange={handleDcChange}
                    placeholder=""
                    maxLength="160"
                    className="text-gray-700 border-gray-200 rounded focus:outline-none focus:bg-white block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md"
                  />
                </div>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default GoogleTags;
