import React, { useState, useEffect, useRef, useCallback } from "react";
import ToggleButton from "components/common/formComponent/ToggleButton";
import { Formik, Form } from "formik";
import { ValidationMsgs } from "global/ValidationMessages";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import UserNotification from "services/admin/user/UserNotification";
import { serverError } from "services/common/helper/Helper";

const MyNotification = ({ setUserId, setFormSubmit, setFormErrors }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const formRef = useRef();
  const location = useSelector((store) => store?.location);
  const [Data, setData] = useState([]);

  useEffect(() => {
    setUserId(id);
  }, [id, setUserId]);
  useEffect(() => {
    setFormSubmit(formRef.current);
  }, [setFormSubmit]);

  const AdminUserNotification = useCallback(() => {
    dispatch(setAddLoading(true))
    UserNotification.getUserAdminNotificationsById(id).then((response) => {
      if (response.data.data) {
        setData(response.data.data)
      }
      dispatch(setAddLoading(false))
    }).catch((error) => {
      dispatch(setAddLoading(false))
    });
  }, []);

  useEffect(() => {
    AdminUserNotification()
  }, [id])

  const submitHandler = (values) => {
    if (values.rowVersion !== "") {
      dispatch(setAddLoading(true))
      UserNotification.updateUserNotifications({ adminUserNotificationModel: values })
        .then((response) => {
          if (response.data.success) {
            dispatch(
              setAlertMessage({
                message: ValidationMsgs.userNotification.userNotificationChanges,
                type: "success",
              })
            );
            AdminUserNotification()
            dispatch(setAddLoading(false))
          } else {
            dispatch(
              setAlertMessage({
                message: serverError(response),
                type: "danger",
              })
            );
            dispatch(setAddLoading(false))

          }
        }).catch((error) => {
          dispatch(
            setAlertMessage({
              message: ValidationMsgs.userNotification.userNotificationChanges,
              type: "danger",
            })
          );
          dispatch(setAddLoading(false))
        });
    } else {
      dispatch(setAddLoading(true))
      UserNotification.createUsersNotifications({ adminUserNotificationModel: values })
        .then((response) => {
          if (response.data.success) {
            dispatch(
              setAlertMessage({
                message: ValidationMsgs.userNotification.userNotificationChanges,
                type: "success",
              })
            );
            AdminUserNotification()
            dispatch(setAddLoading(false))
          } else {
            dispatch(
              setAlertMessage({
                message: serverError(response),
                type: "danger",
              })
            );
            dispatch(setAddLoading(false))

          }
        }).catch((error) => {
          dispatch(
            setAlertMessage({
              message: ValidationMsgs.userNotification.userNotificationChanges,
              type: "danger",
            })
          );
          dispatch(setAddLoading(false))
        });
    }

  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        id: Data?.id || 0,
        rowVersion: Data?.rowVersion || "",
        adminUserId: id,
        isCommentsandreplies: Data?.isCommentsandreplies || false,
        isMessages: Data?.isMessages || false,
        isMentions: Data?.isMentions || false,
        isSharesofmycontent: Data?.isSharesofmycontent || false,
        isTeaminvites: Data?.isTeaminvites || false,
        isSmartconnection: Data?.isSmartconnection || false,
        ...location
      }}
      onSubmit={submitHandler}
      // validationSchema={validationSchema}
      innerRef={formRef}
    >
      {({ errors, setFieldValue, values }) => {
        return (
          <>
            <Form>
              <ErrorHandler setFormErrors={setFormErrors} errors={errors} />
              <div className="p-6 space-y-6">
                <h2 className="text-2xl text-gray-800 font-bold mb-5">
                  My Notifications
                </h2>
                {/* General */}
                <section>
                  <h3 className="text-xl leading-snug text-gray-800 font-bold mb-1">
                    General
                  </h3>
                  <ul>
                    <li className="flex justify-between items-center py-3 border-b border-gray-200">
                      <div>
                        <div className="text-gray-800 font-semibold">
                          Comments and replies
                        </div>
                        <div className="text-sm">
                          Excepteur sint occaecat cupidatat non proident, sunt in culpa
                          qui officia deserunt mollit.
                        </div>
                      </div>
                      <div className="flex item-center ml-4">
                        <div className="w-16 relative">
                          <ToggleButton
                            id="isCommentsandreplies"
                            defaultValue={values.isCommentsandreplies}
                            onChange={(e) => { setFieldValue('isCommentsandreplies', e.target.checked); }}
                            name="isCommentsandreplies"
                          />
                        </div>
                      </div>
                    </li>
                    <li className="flex justify-between items-center py-3 border-b border-gray-200">
                      <div>
                        <div className="text-gray-800 font-semibold">Messages</div>
                        <div className="text-sm">
                          Excepteur sint occaecat cupidatat non proident, sunt in culpa
                          qui officia deserunt mollit.
                        </div>
                      </div>
                      <div className="flex item-center ml-4">
                        <div className="w-16 relative">
                          <ToggleButton
                            id="isMessages"
                            defaultValue={values.isMessages}
                            onChange={(e) => { setFieldValue('isMessages', e.target.checked); }}
                            name="isMessages"
                          />
                        </div>
                      </div>
                    </li>
                    {/* <li className="flex justify-between items-center py-3 border-b border-gray-200">
                      <div>
                        <div className="text-gray-800 font-semibold">Mentions</div>
                        <div className="text-sm">
                          Excepteur sint occaecat cupidatat non in culpa qui officia
                          deserunt mollit.
                        </div>
                      </div>
                      <div className="flex item-center ml-4">
                        <div className="w-16 relative">
                          <ToggleButton
                            id="isMentions"
                            defaultValue={values.isMentions}
                            onChange={(e) => { setFieldValue('isMentions', e.target.checked); }}
                            name="isMentions"
                          />
                        </div>
                      </div>
                    </li> */}
                  </ul>
                </section>

                {/* Shares */}
                {/* <section>
                  <h3 className="text-xl leading-snug text-gray-800 font-bold mb-1">
                    Shares
                  </h3>
                  <ul>
                    <li className="flex justify-between items-center py-3 border-b border-gray-200">
                      <div>
                        <div className="text-gray-800 font-semibold">
                          Shares of my content
                        </div>
                        <div className="text-sm">
                          Excepteur sint occaecat cupidatat non proident, sunt in culpa
                          qui officia deserunt mollit.
                        </div>
                      </div>
                      <div className="flex items-center ml-4">
                        <button className="btn-sm border-gray-200 hover:border-gray-300 shadow-sm">
                          Manage
                        </button>
                      </div>
                    </li>
                    <li className="flex justify-between items-center py-3 border-b border-gray-200">
                      <div>
                        <div className="text-gray-800 font-semibold">Team invites</div>
                        <div className="text-sm">
                          Excepteur sint occaecat cupidatat non in culpa qui officia
                          deserunt mollit.
                        </div>
                      </div>
                      <div className="flex items-center ml-4">
                        <button className="btn-sm border-gray-200 hover:border-gray-300 shadow-sm">
                          Manage
                        </button>
                      </div>
                    </li>
                    <li className="flex justify-between items-center py-3 border-b border-gray-200">
                      <div>
                        <div className="text-gray-800 font-semibold">
                          Smart connection
                        </div>
                        <div className="text-sm">
                          Excepteur sint occaecat cupidatat non in culpa qui officia
                          deserunt mollit.
                        </div>
                      </div>
                      <div className="flex items-center ml-4">
                        <div className="text-sm text-gray-400 italic mr-2 hidden md:block">
                          Active
                        </div>
                        <button className="btn-sm border-gray-200 hover:border-gray-300 shadow-sm text-red-500">
                          Disable
                        </button>
                      </div>
                    </li>
                  </ul>
                </section> */}
              </div>
            </Form>
          </>
        );
      }}
    </Formik>
  );
};

export default MyNotification;

const ErrorHandler = ({ errors = {}, setFormErrors }) => {
  useEffect(() => {
    setFormErrors(errors);
  }, [errors]);
  return ("");
}
