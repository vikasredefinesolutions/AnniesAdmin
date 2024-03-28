import React from 'react'

const TwoStepVerificationSection = ({ formik }) => {
  const { handleChange, values } = formik
  return (
    <div className="p-6 border-b-2 border-slate-200 last:border-b-0">
      <div className="flex items-center justify-between">
        <div className="tracking-wide text-gray-500 text-base font-bold">
          Two-step verification
        </div>
      </div>
      <div className="mt-2">
        <div className="mb-6 last:mb-0">
          <div className="text-sm font-medium mb-2">
            This will ask for verification codes, delivered through a
            mobile authenticator application, when you sign in to your
            account from unrecognized computers or devices.{" "}

          </div>
          <div className="flex flex-wrap">
            <div className="w-full lg:w-1/3">
              <div className="text-sm font-semibold mb-2">
                2-step verification
              </div>
              <div className="mb-2">
                <label
                  className="inline-flex items-center"
                  for="step_verification1"
                >
                  <input
                    className="form-radio m-0"
                    type="radio"
                    name="twoStepVerificationType"
                    id="step_verification1"
                    onChange={handleChange}
                    value={1}
                    defaultChecked={values.twoStepVerificationType === 1}
                  />
                  <span className="text-sm font-medium ml-2">Optional</span>
                </label>
              </div>
              <div className="mb-2">
                <label
                  className="inline-flex items-center"
                  for="step_verification2"
                >
                  <input
                    className="form-radio m-0"
                    type="radio"
                    name="twoStepVerificationType"
                    id="step_verification2"
                    onChange={handleChange}
                    value={2}
                    defaultChecked={values.twoStepVerificationType === 2}
                  />
                  <span className="text-sm font-medium ml-2">
                    Obligatory for all users
                  </span>
                </label>
              </div>
            </div>
            {/* <div className="w-full lg:w-1/3">
            <div className="text-sm font-medium mb-2">
              <div className="pt-2">2FA usage info</div>
              <div className="pt-2">
                0 of your 161 users have Wrike 2-Step Verification
                enabled
              </div>
              <div className="pt-2">
                <a href={undefined} className="text-indigo-500">
                  Download stats (.xls)
                </a>
              </div>
            </div>
          </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TwoStepVerificationSection