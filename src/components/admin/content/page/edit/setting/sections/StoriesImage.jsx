/*Component Name: StoriesImage
Component Functional Details: User can create or update StoriesImage master details from here.
Created By: chandan
Created Date: <Creation Date>
Modified By: chandan
Modified Date: <Modified Date> */

import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { blobFolder, StoriesImageDisplaySideBar } from "global/Enum";

import Dropdown from "components/common/formComponent/Dropdown";
import ImageFile from "components/common/formComponent/ImageFile";
import TemplateService from "services/admin/template/TemplateService";

const StoriesImage = ({ setFieldValue, values }) => {
    const CompanyId = useSelector((store) => store?.CompanyConfiguration.id)
    const { id } = useParams()
    const FolderPath = `/${blobFolder.temp}/${CompanyId}/${blobFolder.content}${!id ? "/0" : `/${id}`}/${blobFolder.storiesImage}`

    const [categoryOption, setcategoryOption] = useState([])

    const getCategoryDropdownData = useCallback(() => {
        TemplateService.getstoriescategoryfordropdown().then((res) => {
            if (res) {
                // console.log("this is a response", res);
                setcategoryOption(() => {
                    return res.data.data;
                });
            }
        });
    }, []);

    useEffect(() => {
        getCategoryDropdownData()
    }, [])


    return (
        <>
            <div className="mt-6 px-5 py-4 bg-white mb-6">
                <h4 className="flex items-center justify-between w-full group mb-1">
                    <div className="text-lg text-gray-800 font-bold mb-2">Banner Image</div>
                </h4>

                <div className="flex flex-wrap -mx-4 -mb-4 md:mb-0">
                    <div className="w-full md:w-1/2 px-4 mb-4">
                        <ImageFile
                            type="file"
                            className="sr-only"
                            name="storiesImage"
                            id="storiesImage"
                            buttonName="Add"
                            folderpath={`${FolderPath}`}
                            onChange={(value) => {
                                setFieldValue("storiesImage", value);
                            }}
                            url={values.storiesImage}
                        />

                    </div>
                    <div className="w-full md:w-1/2 px-4 mb-4">
                        <div>
                            <div className="flex items-center justify-between">
                                <label className="tracking-wide text-gray-700 text-sm font-bold mb-2 flex items-center">
                                    Category 
                                </label>
                            </div>

                            <Dropdown
                                label="id"
                                isMulti={false}
                                name={`categoryId`}
                                options={categoryOption}
                                defaultValue={values.categoryId}
                            />
                        </div>
                        <div className='mt-6'>
                            <div className="flex items-center justify-between">
                                <label className="tracking-wide text-gray-700 text-sm font-bold mb-2 flex items-center">
                                    Display SideBar
                                </label>
                            </div>
                            <Dropdown
                                label="id"
                                isMulti={false}
                                name={`displaySideBar`}
                                options={StoriesImageDisplaySideBar}
                                defaultValue={values.displaySideBar}
                            />

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StoriesImage;
