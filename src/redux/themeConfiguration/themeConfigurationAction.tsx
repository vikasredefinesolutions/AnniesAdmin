import ThemeConfigurationService from "services/admin/themeConfiguration/ThemeConfigurationService";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";

export const setThemeConfigurationData = (payload) => ({ type: "setData", payload });

export const getThemeConfiguration = () => async (dispatch) => {
    dispatch(setAddLoading(true))
    ThemeConfigurationService.getThemeConfiguration()
        .then((res) => {
            var response = res.data;
            if (response.success) {
                dispatch(setThemeConfigurationData(response.data))
            }
            dispatch(setAddLoading(false))
        })
        .catch((err) => {
            dispatch(setAddLoading(false))
        });

};