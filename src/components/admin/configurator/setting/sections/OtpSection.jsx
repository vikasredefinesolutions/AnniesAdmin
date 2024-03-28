import React from 'react'

const OtpSection = ({ formik }) => {
  const { handleChange, values } = formik
  return (
    <div className="p-6 border-b-2 border-slate-200 last:border-b-0">
      <div className="flex items-center justify-between">
        <div className="tracking-wide text-gray-500 text-base font-bold">
          One-time password
        </div>
      </div>
      <div className="mt-2">
        <div className="mb-6 last:mb-0">
          <div className="text-sm font-medium mb-2">
            <div className="">
              Some applications don't support two-factor (2FA) or single
              sign-on (SSO) authentication and may need a one-time
              password (OTP) for you to log in. This option enables the
              creation and usage of OTPs for all admins and regular users
              of the account.{" "}

            </div>
            <div className="bg-gray-100 p-2.5 my-2 border-l-2 max-w-3xl">
              <p className="font-semibold">Note</p>
              <ul className="list-disc pl-5 my-2.5">
                <li>
                  Disabling OTP generation for users of this account will
                  disable OTPs for all accounts they have access to.
                </li>
                <li>
                  You won't be able to log in if OTP is disabled. Please
                  contact our support team if you need to log in to the
                  backup tool but can't enable OTP.
                </li>
              </ul>
              <p>
                <a className="text-indigo-500 line-through cursor-pointer">
                  Contact our support team
                </a>
              </p>
            </div>
          </div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox"
              name="isOneTimePasswordEnabled"
              onChange={handleChange}
              defaultChecked={values.isOneTimePasswordEnabled === true}
            />
            <span className="text-sm font-medium ml-2">
              Enable one-time passwords
            </span>
          </label>
        </div>
      </div>
    </div>
  )
}

export default OtpSection