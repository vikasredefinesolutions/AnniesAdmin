import { generateRange } from "components/admin/content/helper/Helper";
import Modal from "components/common/modals/Modal";
import { passwordStrengthType } from "global/Enum";
import { useState } from "react";
import passwordStrengthImage from "assets/images/password.png"

const PasswordPolicySection = ({ formik }) => {
  const {
    values,
    handleChange,
    setFieldValue,
    errors,
    isSubmitting,
    touched,
    handleBlur,
  } = formik;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Modal
        className="h-[500px]"
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      >
        <div className="flex justify-center h-full"><img src={passwordStrengthImage} className="mt-2 h-[90%]  object-contain" /></div>

      </Modal>

      <div className="p-6 border-b-2 border-slate-200 last:border-b-0">
        <div className="flex items-center justify-between">
          <div className="tracking-wide text-gray-500 text-base font-bold">
            Password Policies
          </div>
        </div>
        <div className="mt-2">
          <div className="mb-6 last:mb-0">
            <div className="flex flex-wrap">
              <div className="w-full lg:w-1/3">
                <div className="text-sm font-semibold mb-2">
                  Minimal required password strength
                </div>

                {generateRange(1, 4).map((val, index) => (
                  <div className="mb-2" key={index}>
                    <label
                      className="inline-flex items-center"
                      for={`password_strength${val}`}
                    >
                      <input
                        className="form-radio m-0"
                        type="radio"
                        name="passwordStrengthType"
                        id={`password_strength${val}`}
                        value={val}
                        onChange={handleChange}
                        defaultChecked={values.passwordStrengthType === val}
                      />
                      <span className="text-sm font-medium ml-2">
                        {passwordStrengthType[val]}
                      </span>
                    </label>
                  </div>
                ))}

                <div>
                  <button
                    onClick={handleModalOpen}
                    type="button"
                    className="text-xs"
                  >
                    How is password strength measured?
                  </button>
                </div>
              </div>

              <div className="w-full lg:w-1/3">
                <div className="text-sm font-semibold mb-2">
                  Force reset user passwords
                </div>
                <div className="mb-2">
                  <label className="inline-flex items-center" for="user_passwords1">
                    <input
                      className="form-radio m-0"
                      type="radio"
                      name="resetPasswordType"
                      value={1}
                      id="user_passwords1"
                      onChange={(e) =>
                        setFieldValue(
                          "resetPasswordType",
                          parseInt(e.target.value)
                        )
                      }
                      defaultChecked={values.resetPasswordType === 1}
                    />
                    <span className="text-sm font-medium ml-2">Never</span>
                  </label>
                </div>
                <div className="mb-2">
                  <label className="inline-flex items-center" for="user_passwords2">
                    <input
                      className="form-radio m-0"
                      type="radio"
                      name="resetPasswordType"
                      value={2}
                      id="user_passwords2"
                      onBlur={handleBlur}
                      onChange={(e) =>
                        setFieldValue(
                          "resetPasswordType",
                          parseInt(e.target.value)
                        )
                      }
                      defaultChecked={values.resetPasswordType === 2}
                    />
                    <span className="text-sm font-medium ml-2">Every</span>
                    <input
                      className="ml-3 block w-[90px]  text-sm  bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-[8px] rounded-md disabled:bg-slate-100 placeholder:text-[10px]"
                      id="resetPasswordDays"
                      type="number"
                      name="resetPasswordDays"
                      placeholder="Enter days"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      defaultValue={values.resetPasswordDays}
                      disabled={values.resetPasswordType === 1}
                    />
                    <span className="text-[13px] font-semibold ml-2">days</span>
                  </label>
                  <div className="mb-2">
                    {(touched.resetPasswordDays || isSubmitting) &&
                      errors.resetPasswordDays && (
                        <div className="text-rose-500 mt-1 text-sm">
                          {errors.resetPasswordDays}
                        </div>
                      )}
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/3">
                <div className="text-sm font-semibold mb-2">
                  Previously used passwords
                </div>
                <div className="mb-2">
                  <label className="inline-flex items-center" for="used_passwords1">
                    <input
                      className="form-radio m-0"
                      type="radio"
                      name="restrictUsedPasswordType"
                      id="used_passwords1"
                      value={1}
                      onChange={(e) =>
                        setFieldValue(
                          "restrictUsedPasswordType",
                          parseInt(e.target.value)
                        )
                      }
                      defaultChecked={values.restrictUsedPasswordType === 1}
                    />
                    <span className="text-sm font-medium ml-2">Allow</span>
                  </label>
                </div>
                <div className="mb-2">
                  <label className="inline-flex items-center" for="used_passwords2">
                    <input
                      className="form-radio m-0"
                      type="radio"
                      name="restrictUsedPasswordType"
                      id="used_passwords2"
                      onChange={(e) =>
                        setFieldValue(
                          "restrictUsedPasswordType",
                          parseInt(e.target.value)
                        )
                      }
                      value={2}
                      defaultChecked={values.restrictUsedPasswordType === 2}
                    />
                    <span className="text-sm font-medium ml-2">Restrict</span>
                    <input
                      className="ml-3 block w-[90px]  text-sm  bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-[8px] rounded-md disabled:bg-slate-100 placeholder:text-[10px]"
                      id="restrictUsedPasswordCount"
                      type="number"
                      name="restrictUsedPasswordCount"
                      placeholder="Enter days"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      defaultValue={values.restrictUsedPasswordCount}
                      disabled={values.restrictUsedPasswordType === 1}
                    />
                    <span className="text-[13px] font-semibold ml-2">previous</span>
                  </label>

                  <div className="mb-2">
                    {(touched.restrictUsedPasswordCount || isSubmitting) &&
                      errors.restrictUsedPasswordCount && (
                        <div className="text-rose-500 mt-1 text-sm">
                          {errors.restrictUsedPasswordCount}
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordPolicySection;
