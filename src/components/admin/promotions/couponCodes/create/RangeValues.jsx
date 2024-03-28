/*Component Name: RangeValues
Component Functional Details: User can create or update ProductReadinessDetail master details from here.
Created By: Shrey Patel
Created Date: 08/05/2022
Modified By: chandan
Modified Date: 26-08-2022 */

import React, { useState, useRef, useEffect } from "react";
import { RecStatusValuebyName } from "global/Enum";
import { useFormikContext } from "formik";
import { Fragment } from "react";
import InputNumber from "components/common/formComponent/InputNumber";
import { ValidationMsgs } from "global/ValidationMessages";
import ToolTipComponent from "components/common/ToolTips";
import { ToolTipsMessages } from "global/ToolTipsMessages";

const RangeValues = ({ RangeDetails = [{}] }) => {
  const { values, setFieldValue } = useFormikContext();
  const [rangeErrorMessage, setRangeErrorMessage] = useState(false);

  let firstIndex = useRef(0)
  let lastIndex = useRef(0)

  const addRange = (rangeObj) => {

    const filteredWithActiveStatus = values.RangeDetails.filter((obj) => obj.recStatus === "A")

    if ((values?.RangeDetails.length > 1 ?
      (rangeObj?.rangeFrom > filteredWithActiveStatus[1]?.rangeTo && rangeObj?.rangeTo > rangeObj?.rangeFrom) && (rangeObj?.valuePercentage > 0 || rangeObj?.discountValue > 0) :
      (rangeObj?.rangeFrom > 0 && rangeObj?.rangeTo > rangeObj?.rangeFrom) && (rangeObj?.valuePercentage > 0 || rangeObj?.discountValue > 0))) {
      setRangeErrorMessage(false);
      setFieldValue("RangeDetails", [
        {
          id: 0,
          promotionsId: 0,
          rangeFrom: 0,
          rangeTo: 0,
          discountValue: 0,
          valuePercentage: 0,
          recStatus: RecStatusValuebyName.Active,
          rowVersion: "",
        },
        ...values.RangeDetails,
      ]);
    } else {
      setRangeErrorMessage(true);
    }
  };

  useEffect(() => {
    firstIndex.current = 0
    values.RangeDetails.map((value, index) => {
      if (value.recStatus === "A") {
        if (!firstIndex.current) {
          firstIndex.current = index
        }
        lastIndex.current = index
      }
    })
  }, [values.RangeDetails]);

  return (
    <>
      <div className="flex">
        <div className="pt-4 w-[224px]">
          Range From
        </div>

        <div className="pt-4 w-[224px]">
          Range To
        </div>

        <div className="pt-4 w-[442px]">
          Discount Value
        </div>
      </div>

      {values.RangeDetails.map((value, index) => {
        if (value.recStatus === RecStatusValuebyName.Active) {
          return (
            <Fragment key={index}>
              <div className="flex">
                <div className="py-4">
                  <div className="relative">
                    <InputNumber
                      className={`form-input w-full rounded-md border-neutral-200 hover:border-neutral-300 focus:border-neutral-500 focus:ring-neutral-300 focus:shadow-lg pl-8 `}
                      type="text"
                      name={`RangeDetails.[${index}].rangeFrom`}
                      defaultValue={RangeDetails.rangeFrom}
                      placeholder={"Range From"}
                      disabled={index > 0}
                      displayError={true}
                      value={values.RangeDetails[index].rangeFrom}
                      onChange={(e) => {
                        setFieldValue(e.target.name, parseInt(e.target.value));
                      }}
                      maxLength={10}
                      allowNegative={false}
                    />
                    <div className="absolute w-10 h-10 left-0 top-0 flex items-center justify-center">
                      <span className="material-icons-outlined">
                        attach_money
                      </span>
                    </div>
                  </div>
                </div>
                <span className="flex pt-4 pl-2 pr-2 text-2xl md:text-3xl text-gray-800">
                  -
                </span>

                <div className="py-4">
                  <div className="relative">
                    <InputNumber
                      className={`form-input w-full rounded-md border-neutral-200 hover:border-neutral-300 focus:border-neutral-500 focus:ring-neutral-300 focus:shadow-lg pl-8 `}
                      type="text"
                      name={`RangeDetails.[${index}].rangeTo`}
                      defaultValue={RangeDetails.rangeTo}
                      placeholder={"Range To"}
                      disabled={index > 0}
                      displayError={true}
                      value={values.RangeDetails[index].rangeTo}
                      onChange={(e) => {
                        setFieldValue(e.target.name, parseInt(e.target.value));
                      }}
                      maxLength={10}
                      allowNegative={false}
                    />
                    <div className="absolute w-10 h-10 left-0 top-0 flex items-center justify-center">
                      <span className="material-icons-outlined">
                        attach_money
                      </span>
                    </div>
                  </div>
                </div>
                <span className=" flex pt-4 pl-2 pr-2 text-2xl md:text-3xl text-gray-800">
                  =
                </span>

                <div className="py-4">
                  <div className="relative">
                    <InputNumber
                      className={`form-input w-full rounded-md border-neutral-200 hover:border-neutral-300 focus:border-neutral-500 focus:ring-neutral-300 focus:shadow-lg pl-8 `}
                      type="text"
                      name={`RangeDetails.[${index}].discountValue`}
                      defaultValue={RangeDetails.discountValue}
                      placeholder={"Discount Value"}
                      disabled={index > 0}
                      displayError={true}
                      value={values.RangeDetails[index].discountValue}
                      onChange={(e) => {
                        setFieldValue(e.target.name, e.target.value);
                        setFieldValue(
                          `RangeDetails.[${index}].valuePercentage`,
                          0
                        );
                      }}
                      maxLength={10}
                      allowNegative={false}
                    />
                    <div className="absolute w-10 h-10 left-0 top-0 flex items-center justify-center">
                      <span className="material-icons-outlined">
                        attach_money
                      </span>
                    </div>
                  </div>
                </div>
                <span className="flex pt-6 pl-2 pr-2 text-gray-800">OR</span>

                <div className="py-4">
                  <div className="relative">
                    <InputNumber
                      id="suffix"
                      className={`form-input w-full rounded-md border-neutral-200 hover:border-neutral-300 focus:border-neutral-500 focus:ring-neutral-300 focus:shadow-lg pl-2 `}
                      type="text"
                      name={`RangeDetails.[${index}].valuePercentage`}
                      defaultValue={RangeDetails.valuePercentage}
                      placeholder={"Discount Value"}
                      disabled={index > 0}
                      displayError={true}
                      value={values.RangeDetails[index].valuePercentage}
                      onChange={(e) => {
                        setFieldValue(e.target.name, e.target.value);
                        setFieldValue(
                          `RangeDetails.[${index}].discountValue`,
                          0
                        );
                      }}
                      allowNegative={false}
                      maxLength={3}
                    />
                    <div className="absolute inset-0 left-auto flex items-center pointer-events-none">
                      <span className="text-xl text-black-500 font-medium px-3">
                        %
                      </span>
                    </div>
                  </div>
                </div>

                <div className="px-2 first:pl-5 py-3">
                  <div className="relative gap-2 pt-2 text-right">
                    {index === 0 ? (
                      <button
                        type="button"
                        className={`btn btn-sm bg-indigo-500 hover:bg-indigo-600 w-12 h-6 text-white`}
                        onClick={() => addRange(values.RangeDetails[0])}
                      >
                        Add
                      </button>
                    ) : (
                      <>
                        {(firstIndex.current === index || lastIndex.current === index) ? (
                          <button
                            type="button"
                            className={`w-6 h-6 text-rose-500`}
                            onClick={() => {
                              firstIndex.current = 0
                              setFieldValue(
                                "RangeDetails",
                                values.RangeDetails.map((value, index1) => {
                                  if (index === index1) {
                                    return {
                                      ...value,
                                      recStatus: RecStatusValuebyName.Archived,
                                    };
                                  }
                                  return value;
                                })
                              );

                            }}
                          >
                            <span className="material-icons-outlined cursor-pointer">
                              delete
                            </span>
                          </button>
                        ) : <span className="ml-6"></span>}
                      </>
                    )}
                  </div>
                </div>
                <div className="px-2 first:pl-5 py-3">
                  <div className="relative gap-2 text-right"></div>
                </div>
              </div>
              {(rangeErrorMessage && index === 0) ? (<div className={"text-rose-500 pb-5 flex items-center"}>{ValidationMsgs.promotions.rangeErrorMessage}
                <ToolTipComponent
                  id="SEOPageURL"
                  message={ToolTipsMessages.PromotionRangeTooltips.rangeMethod}
                />
              </div>) : ("")}

            </Fragment>
          );
        }
        return <Fragment key={index}></Fragment>
      })}
    </>
  );
};

export default RangeValues;
