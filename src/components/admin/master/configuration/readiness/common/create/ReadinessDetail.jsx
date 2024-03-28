/*Component Name: ProductReadinessDetail
Component Functional Details: User can create or update ProductReadinessDetail master details from here.
Created By: Happy
Created Date: 06/20/2022
Modified By: chandan
Modified Date: <Modified Date> */

import React, { useMemo } from "react";
import { useFormikContext } from "formik";
import { useSelector } from "react-redux";

import { RecStatusValuebyName } from "global/Enum";

import { ValidatePercentage } from "services/common/helper/Helper";

import Dropdown from "components/common/formComponent/Dropdown";
import InputNumber from "components/common/formComponent/InputNumber";

const ReadinessDetail = ({
  fieldArrayProps,
  index,
  ddfields,
  setddFields,
  setTotalFieldData,
  value,
  values,
}) => {
  const { setFieldValue } = useFormikContext();

  const permission = useSelector((store) => store.permission);
  const arrLength = values.readinessDetail.length;

  const myCurrentElam = useMemo(() => value.id, [value])

  const handleDropdownOption = (selectedObj) => {
    setddFields((prevObj) => {
      const foundObj = selectedObj ? prevObj.findIndex((singleObj) => singleObj.value === selectedObj?.value) : -1

      if (selectedObj) {
        if (foundObj > -1) {
          prevObj[foundObj] = { ...prevObj[foundObj], selectedBy: foundObj }
        }
      } else {
        const foundObj = prevObj.findIndex((singleObj) => singleObj.value === myCurrentElam)
        prevObj[foundObj] = { ...prevObj[foundObj], selectedBy: -1 }
      }

      return [...prevObj]
    })
  }

  return (
    <>
      <td className="px-2 first:pl-5 py-4">
        <div className="w-full relative pr-7">
          <Dropdown
            label="id"
            isMulti={false}
            name={`readinessDetail[${index}].id`}
            options={ddfields.filter((obj) => (obj.selectedBy <= -1 || obj.value === value.id))}
            defaultValue={value.id}
            onChange={(selectedObj) => {
              handleDropdownOption(selectedObj)
              if (selectedObj) {
                setFieldValue(`readinessDetail[${index}].id`, selectedObj.value)
              } else {
                setFieldValue(`readinessDetail[${index}].id`, "")
              }
            }}
          />
        </div>
      </td>

      <td className="px-2 first:pl-8 py-3">
        <div className="w-full relative pr-7">
          <div className="font-bold absolute right-2 top-2.5">%</div>
          <InputNumber
            displayError={true}
            name={`readinessDetail[${index}].fieldPercentage`}
            defaultValue={values.readinessDetail[index].fieldPercentage}
            value={values.readinessDetail[index].fieldPercentage}
            className={`block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md`}
            onKeyPress={(event) => {
              ValidatePercentage(event)
            }}
            onKeyUp={(e) => {
              setTotalFieldData(values.readinessDetail)
            }}
            onChange={(e) => {
              setFieldValue(`readinessDetail[${index}].fieldPercentage`, e.target.value);
            }}
            maxLength={10}
            allowNegative={false}
          />
        </div>
      </td>
      {(permission?.isEdit || permission?.isDelete) && <td className="px-2 first:pl-5 py-3">
        <div className="relative gap-2 text-right">
          {(index === arrLength - 1) && <button
            type="button"
            className={"w-6 h-6 text-indigo-500"}
            onClick={() => {
              {
                fieldArrayProps.push({
                  id: "",
                  fieldPercentage: 0,
                  rowVersion: '',
                  recStatus: RecStatusValuebyName.Active
                });
              }
            }}
          >
            <span className="material-icons-outlined">add</span>
          </button>}

          <>
            {permission?.isDelete && <button
              type="button"
              className={"w-6 h-6 text-rose-500"}
              onClick={() => {
                handleDropdownOption()
                return fieldArrayProps.remove(index)
              }}
              onLoad={setTotalFieldData(values.readinessDetail)}
            >
              <span className="material-icons-outlined cursor-pointer">
                delete
              </span>
            </button>}

          </>
        </div>
      </td>}
    </>
  );
};

export default ReadinessDetail;
