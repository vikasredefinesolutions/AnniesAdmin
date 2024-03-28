/*Component Name: BannerLinks
Component Functional Details: User can create or update BannerLinks master details from here.
Created By: chandan
Created Date: <Creation Date>
Modified By: chandan
Modified Date: <Modified Date> */
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { FieldArray } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BnnerRow from "./BannerRow"
import TemplateService from "services/admin/template/TemplateService";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import Messages from "components/common/alerts/messages/Index";
import { ValidationMsgs } from 'global/ValidationMessages';

const BannerLinks = forwardRef(({ values, BannerLinksData, getcmsbannerlinksbytopicsid }, ref) => {
    const dispatch = useDispatch();

    const GlobalLoading = useSelector((store) => store?.GlobalLoaderReducer?.toLoad);
    const location = useSelector((store) => store?.location);

    const showMessage = useSelector(state => state.alertMessage);

    const permission = useSelector(store => store.permission);

    const { id } = useParams();
    const isAddMode = !id

    useImperativeHandle(ref, () => ({
        handleAddBannerlinks() {

            if (values.bannerLinksArray && values.bannerLinksArray.length > 0) {

                dispatch(setAddLoading(true))

                // new banner data mapping
                const TempBannerObj = values.bannerLinksArray.map((newBannerObj) => {
                    return {
                        id: newBannerObj.id || 0,
                        name: newBannerObj.name,
                        url: newBannerObj.url,
                        urlType: newBannerObj.urlType,
                        recStatus: "A",
                        rowVersion: newBannerObj.rowVersion || ""
                    }
                })

                // old banner data mapping
                BannerLinksData.map((oldBannerObj) => {
                    const isFoundBrandId = TempBannerObj.find(tempNewBannerObj => tempNewBannerObj.id === oldBannerObj.id);
                    if (!isFoundBrandId) {
                        TempBannerObj.push({
                            id: oldBannerObj.id || 0,
                            name: oldBannerObj.name,
                            url: oldBannerObj.url,
                            urlType: oldBannerObj.urlType,
                            recStatus: "R",
                            rowVersion: oldBannerObj.rowVersion || ""
                        })
                    }
                })

                const paramObj = {
                    cmsBannerLinksModel: {
                        topicsId: id || 0,
                        ...location,
                        cmsBannerLinksDetails: TempBannerObj
                    }
                }

                TemplateService.createAndUpdateCmsBannerLinks(paramObj).then((res) => {
                    if (res) {
                        // dispatch(
                        //     setAlertMessage({
                        //         type: "success",
                        //         message: ValidationMsgs.cmsConfig.banner.bannerLinkAdded,
                        //     })
                        // );
                        getcmsbannerlinksbytopicsid()
                    }
                }).catch((error) => {
                    //dispatch(setAddLoading(false))
                    // dispatch(
                    //     setAlertMessage({
                    //         type: "danger",
                    //         message: ValidationMsgs.cmsConfig.banner.bannerLinkNotAdded,
                    //     })
                    // );
                })
            } else {
                // dispatch(
                //     setAlertMessage({
                //         type: "danger",
                //         message: ValidationMsgs.cmsConfig.banner.addSomeBannerLinks,
                //     })
                // );
            }
        }
    }));


    return (
        <>
            <div className="px-5 py-4 bg-white mb-6">
                {
                    showMessage?.message === `${ValidationMsgs.cmsConfig.banner.addSomeBannerLinks}` && <Messages />
                }

                <div className='flex'>
                    <h4 className="flex items-center justify-between w-full group mb-1">
                        <div className="text-lg text-gray-800 font-bold">Banner Links</div>
                    </h4>

                    {(permission?.isEdit || permission?.isDelete) && <div className=" w-full flex justify-end">
                        <button
                            disabled={GlobalLoading}
                            type="button"
                            className={`hidden flex justify-center btn px-6 bg-indigo-500 hover:bg-indigo-600 text-white ${(GlobalLoading) ? "bg-indigo-200 hover:bg-indigo-200" : "cursor-pointer"}`}
                        >
                            <div className={`w-full flex justify-center align-middle `}>
                                {GlobalLoading && (
                                    <span className="spinner-border spinner-border-sm mr-2"></span>
                                )}
                                Save Banner Links
                            </div>
                        </button>
                    </div>}
                </div>

                <div>
                    {(!isAddMode) && (
                        <table className="table-auto w-full text-sm text-[#191919] font-semibold">
                            <thead className="text-sm font-bold uppercase text-[#b3b3b3] border-b border-neutral-200">
                                <tr className='first:pl-5'>
                                    <th className="px-2 py-4">
                                        <div className="font-semibold text-left w-32 max-w-sm flex items-center">
                                            <span>Name</span>
                                        </div>
                                    </th>
                                    <th className="px-2 py-4">
                                        <div>
                                            <span>Url</span>
                                        </div>
                                    </th>

                                    <th className="px-2 py-4">
                                        <div>
                                            <span>Url Type</span>
                                        </div>
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-200">
                                <FieldArray
                                    name="bannerLinksArray"
                                    render={(fieldArrayProps) => {
                                        const { form } = fieldArrayProps;
                                        return (
                                            <>
                                                {
                                                    form.values.bannerLinksArray !== undefined && form.values.bannerLinksArray.length > 0 ? form.values.bannerLinksArray.map(
                                                        (value, i) => {
                                                            return (
                                                                <tr key={i}>
                                                                    <BnnerRow
                                                                        fieldArrayProps={fieldArrayProps}
                                                                        key={i}
                                                                        values={values}
                                                                        index={i}
                                                                        value={value}
                                                                    />
                                                                </tr>
                                                            );
                                                        }
                                                    ) : <tr>
                                                        <td>
                                                            <span>
                                                                Please add some banner link
                                                            </span>
                                                        </td>

                                                        <td></td>

                                                        <td className='text-right'>
                                                            <button
                                                                type="button"
                                                                className={"w-6 h-6 text-indigo-500"}
                                                                onClick={() => {
                                                                    {
                                                                        fieldArrayProps.push({
                                                                            name: "",
                                                                            url: "",
                                                                            urlType: "",
                                                                        });
                                                                    }
                                                                }}
                                                            >
                                                                <span className="material-icons-outlined">add</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                }
                                            </>
                                        );
                                    }}
                                />
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
});

export default BannerLinks;
