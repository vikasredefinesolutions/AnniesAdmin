import React from 'react'

const InvitationSection = () => {
  return (
    <div className="p-6 border-b-2 border-slate-200 last:border-b-0">
      <div className="flex items-center justify-between">
        <div className="tracking-wide text-gray-500 text-base font-bold">
          Invitation settings
        </div>
      </div>
      <div className="mt-2">
        <div className="mb-6 last:mb-0">
          <div className="text-sm font-semibold mb-2">
            Who can invite users to this account?
          </div>
          <div className="mb-2">
            <label
              className="inline-flex items-center"
              for="invitation_settings1"
            >
              <input
                className="form-radio m-0"
                type="radio"
                name="invitation_settings"
                id="invitation_settings1"
              />
              <span className="text-sm font-medium ml-2">
                Owner and Admin only
              </span>
            </label>
          </div>
          <div className="mb-2">
            <label
              className="inline-flex items-center"
              for="invitation_settings2"
            >
              <input
                className="form-radio m-0"
                type="radio"
                name="invitation_settings"
                id="invitation_settings2"
              />
              <span className="text-sm font-medium ml-2">
                All members of My Team (Owner, Admin, Regular User)
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvitationSection