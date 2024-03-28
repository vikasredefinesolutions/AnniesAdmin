import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import StoreService from 'services/admin/store/StoreService';
import StateService from "services/admin/state/StateService";
import BlobUploadService from 'services/common/blobUpload/BlobUploadService';

export const setstoreIdFromDropDown = (payload: any) => ({ type: "storeIdFromDropDown", payload });
export const setOrderStoreId = (payload: any) => ({ type: "storeId", payload });
export const setstoreBuilderCategoryData = (payload: any) => ({ type: "storeBuilderCategoryData", payload });
export const setCurrentPageIndexData = (payload: any) => ({ type: "setCurrentPageIndexData", payload });
export const setCurrentStoreData = (payload: any) => ({ type: "setCurrentStoreData", payload });

export const getStoreDataById = ({ storeId }) => async (dispatch: any) => {
    dispatch(setAddLoading(true))

    StoreService.getStoreById(storeId).then((response) => {
        if (response.data.data) {
            let storeData = response.data.data;
            dispatch(setCurrentStoreData(storeData))
        }
        dispatch(setAddLoading(false))
    }).catch((error) => {
        dispatch(setAddLoading(false))
    });
};

export const getAllStatesInsideCountry = (countryName: any) => StateService.getStateByCountryName(countryName);

export const getLocationBasedOnZipCode = async (zipCode: any) => {
    const responseObj = {
        city: "",
        country: "",
        state: "",
        allStateInsideCountry: []
    }
    try {
        if (zipCode) {
            const locationResponse = await StateService.getLocationDataBasedOnZipCode(zipCode)

            if (locationResponse?.data?.success && locationResponse?.data?.data) {
                const { cityName, countryId, countryName, stateName } = locationResponse?.data?.data;

                responseObj["city"] = cityName
                responseObj["country"] = countryId
                responseObj["state"] = stateName

                if (countryName) {
                    const stateResponse = await getAllStatesInsideCountry(countryName);

                    if (stateResponse?.data?.success && stateResponse?.data?.data) {
                        let StatesData = stateResponse?.data?.data?.map((value: any) => {
                            return {
                                label: value.label,
                                value: value.label,
                            }
                        })

                        responseObj["allStateInsideCountry"] = [{ label: "Other", value: "Other" }, ...StatesData]
                    }
                }
            }
        }
        return responseObj;

    } catch (e) {
        //handle errors if needed
        console.log("getLocationBasedOnZipCode myRes error", e);
    }
}

export const getAssetsLibraryData = async (pathName: any) => {
    const res = await BlobUploadService.getAndCheckFilesByFolderPath(pathName)

    return res
}