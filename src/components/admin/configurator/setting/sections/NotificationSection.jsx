import React from 'react'

const NotificationSection = () => {
  return (
    <div className="p-6 border-b-2 border-slate-200 last:border-b-0">
      <div className="flex items-center justify-between">
        <div className="tracking-wide text-gray-500 text-base font-bold">
          Security notifications
        </div>
      </div>
      <div className="mt-2">
        <div className="mb-6 last:mb-0">
          <div className="text-sm font-medium mb-2">
            Choose which admins will receive email notifications about
            important system events.
          </div>
          <div className="flex flex-wrap">
            <div className="w-full lg:w-1/3">
              <div className="text-sm font-semibold mb-2">
                New users added through SAML, SCIM, Azure, or Google.
              </div>
              <div className="mb-2">
                <label
                  className="inline-flex items-center"
                  for="new_user_notification1"
                >
                  <input
                    className="form-radio m-0"
                    type="radio"
                    name="new_user_notification"
                    id="new_user_notification1"
                  />
                  <span className="text-sm font-medium ml-2">
                    Turn on notification
                  </span>
                </label>
              </div>
              <div className="mb-2">
                <label
                  className="inline-flex items-center"
                  for="new_user_notification2"
                >
                  <input
                    className="form-radio m-0"
                    type="radio"
                    name="new_user_notification"
                    id="new_user_notification2"
                  />
                  <span className="text-sm font-medium ml-2">
                    Turn off notification
                  </span>
                </label>
              </div>
            </div>
            <div className="w-full lg:w-1/3">
              <div className="text-sm font-semibold mb-2">
                SAML SSO or Approved Domains changes
              </div>
              <div className="mb-2">
                <label
                  className="inline-flex items-center"
                  for="domain_changes1"
                >
                  <input
                    className="form-radio m-0"
                    type="radio"
                    name="domain_changes"
                    id="domain_changes1"
                  />
                  <span className="text-sm font-medium ml-2">
                    All admins (including the account owner)
                  </span>
                </label>
              </div>
              <div className="mb-2">
                <label
                  className="inline-flex items-center"
                  for="domain_changes2"
                >
                  <input
                    className="form-radio m-0"
                    type="radio"
                    name="domain_changes"
                    id="domain_changes2"
                  />
                  <span className="text-sm font-medium ml-2">
                    Account owner only
                  </span>
                </label>
              </div>
              <div className="mb-2">
                <label
                  className="inline-flex items-center"
                  for="domain_changes3"
                >
                  <input
                    className="form-radio m-0"
                    type="radio"
                    name="domain_changes"
                    id="domain_changes3"
                  />
                  <span className="text-sm font-medium ml-2">
                    Turn off notification
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificationSection