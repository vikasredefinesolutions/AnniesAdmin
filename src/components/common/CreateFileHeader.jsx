/*Component Name: CreateFileHeader
Component Functional Details:  CreateFileHeader .
Created By: PK Kher
Created Date: <Creation Date>
Modified By: PK Kher
Modified Date: <Modified Date> */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { setAlertMessage } from 'redux/alertMessage/AlertMessageReducers';
import { serverError } from 'services/common/helper/Helper';

import ToolTipComponent from "components/common/ToolTips";

const CreateFileHeader = ({ module = "", url = "", errors = {}, saveButtonName = "Save", validateForm, toolTipMessage }) => {
    const dispatch = useDispatch();
    const permission = useSelector(store => store.permission);
    const GlobalLoading = useSelector((store) => store?.GlobalLoaderReducer?.toLoad);
    return (
        <>
            <div className="flex flex-wrap justify-between mb-6 gap-2 sticky top-0 pb-2 pt-2 bg-slate-100 sticky-header z-20">
                <div className="flex items-center">
                    {url !== "" && <NavLink
                        to={url}
                        className="btn border-neutral-200 hover:border-neutral-400 text-gray-500 hover:text-gray-700 flex items-center mr-2"
                    >
                        <span className="material-icons-outlined">west</span>
                    </NavLink>}
                    <h1 className="text-2xl md:text-3xl text-gray-800 font-bold flex justify-center items-center">
                        {module}

                        {
                            toolTipMessage && <ToolTipComponent
                                id="NavigationVisibility"
                                className="uppercase tracking-wide font-bold"
                                message={toolTipMessage}
                                btnCls={`w-6 h-6`}
                                msgBoxCls={`relative top-20`}
                            />
                        }
                    </h1>
                </div>
                {(permission?.isEdit || permission?.isDelete) && <div className="flex flex-wrap space-x-2">
                    <NavLink
                        className="btn bg-white border-neutral-200 text-gray-500 hover:text-gray-700"
                        to={url}
                    >
                        Cancel
                    </NavLink>

                    <button
                        disabled={GlobalLoading}
                        onMouseDown={() => {
                            if (validateForm instanceof Function) {
                                validateForm();
                            }
                        }}
                        className={`flex justify-center btn px-6 bg-indigo-500 hover:bg-indigo-600 text-white ${(GlobalLoading) ? "bg-indigo-200 hover:bg-indigo-200" : "cursor-pointer"}`}
                        onMouseUp={() => {
                            if (errors && Object.keys(errors).length) {
                                dispatch(setAlertMessage({ type: "danger", message: serverError({ data: { errors: errors } }) }));
                            }
                        }}
                    >
                        {GlobalLoading &&
                            <span className="spinner-border spinner-border-sm mr-2"></span>
                        }
                        {saveButtonName}
                    </button>
                </div>}
            </div>
        </>
    );
};

export default CreateFileHeader;
