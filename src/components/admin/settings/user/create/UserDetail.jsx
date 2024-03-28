import React from "react";
import { useFormikContext } from 'formik';
import { useSelector } from "react-redux";

import Checkbox from "components/common/formComponent/Checkbox";
import Dropdown from "components/common/formComponent/Dropdown";
import Input from "components/common/formComponent/Input";

const UserDetail = ({ fieldArrayProps, index, allUsers, roles }) => {
  const CurrentUserObject = useSelector((store) => store?.user)
  const { values, setFieldValue } = useFormikContext();

  return (
    <>
      <div className={`${index !== 0 ? "bg-slate-50 border border-slate-200 p-6 pb-0 relative mb-6" : ""}`}>
        <div className={`bg-white absolute top-0 right-0 border-l border-b w-8 h-8 p-1 border-slate-200 ${index === 0 && "hidden"}`}>
          <span className="text-rose-500" onClick={fieldArrayProps.remove.bind(null, index)}          >
            <span className="material-icons-outlined cursor-pointer">
              delete
            </span>
          </span>
        </div>
        <div className="flex w-full md:gap-6">
          <div className="w-full md:w-1/2 mb-6">
            <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="first_name">
              First Name
              <span className="text-rose-500 text-2xl leading-none">*</span>
            </label>
            <Input
              className={"block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md"}
              name={`adminUserViewModel[${index}].firstname`}
              placeholder="First Name"
              id="first_name"
              maxLength={255}
            />
          </div>
          <div className="w-full md:w-1/2 mb-6">
            <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor={`last_name`}>
              Last Name
              <span className="text-rose-500 text-2xl leading-none">*</span>
            </label>
            <Input
              name={`adminUserViewModel[${index}].lastname`}
              placeholder="Last Name"
              id="last_name"
              maxLength={255}
            />
          </div>
        </div>
        <div className="flex w-full md:gap-6">
          <div className="w-full md:w-1/2 mb-6">
            <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor={`email`}>
              Email
              <span className="text-rose-500 text-2xl leading-none">*</span>
            </label>
            <Input
              name={`adminUserViewModel[${index}].email`}
              placeholder="Email"
              id="email"
            />
          </div>
          <div className="w-full md:w-1/2 mb-6">
            <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor={`phone`}>
              Phone Number
              <span className="text-rose-500 text-2xl leading-none">*</span>
            </label>
            <Input
              name={`adminUserViewModel[${index}].phone`}
              placeholder="Phone Number"
              id="phone"
              maxLength="13"
            />
          </div>
        </div>

        <div className="flex w-full md:gap-6">
          <div className="w-[49.5%] mb-6">
            <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor={`adminUserViewModel[${index}].reportingTo`}>
              Report To
              <span className="text-rose-500 text-2xl leading-none"></span>
            </label>
            <Dropdown
              label="reportingTo"
              isMulti={false}
              name={`adminUserViewModel[${index}].reportingTo`}
              options={allUsers}
              defaultValue={values.adminUserViewModel[index].reportingTo}
            />
          </div>
        </div>

        <div className="flex w-full md:gap-6 min-h-[5rem]">
          <div className="w-[49.5%] flex flex-wrap items-start justify-between">
            <div className="pt-2 w-[20%]">
              {CurrentUserObject?.isSuperUser && (
                <label className="text-gray-500 flex items-center">
                  <Checkbox
                    className="mr-1"
                    name={`isSuperUser`}
                    id={`isSuperUser`}
                    checked={values.adminUserViewModel[index].isSuperUser}
                    onChange={(e) => {
                      setFieldValue(
                        `adminUserViewModel[${index}].isSuperUser`,
                        e.target.checked
                      );
                      if (e.target.checked === true) {
                        setFieldValue(`adminUserViewModel[${index}].roleId`, 0);
                      }
                    }}
                  />
                  Super User
                </label>
              )}
            </div>
            <div className="flex md:gap-6 w-[80%]">
              {!values.adminUserViewModel[index].isSuperUser && (
                <div className="flex gap-3 w-full mb-6">
                  <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2 pt-[0.6rem]" htmlFor={`adminUserViewModel[${index}].roleId`}>
                    Role
                    <span className="text-rose-500 text-2xl leading-none">*</span>
                  </label>
                  <div className="w-full">
                    <Dropdown
                      label="Roles"
                      classNames={`w-full`}
                      isMulti={false}
                      name={`adminUserViewModel[${index}].roleId`}
                      options={roles}
                      defaultValue={values.adminUserViewModel[index].roleId}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default UserDetail;
