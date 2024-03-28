// import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import UserService from "services/admin/user/UserService.jsx";

export const storeMenuListByUserData = (payload: any) => ({ type: "storeMenuListByUserData", payload });
export const setSelectedSidebarMenu = (payload: any) => ({ type: 'setSelectedMenu', payload })

export const getMenuListForSideBar = ({ userId, isSuperUser, CompanyId }: any) => async (dispatch: any) => {

    const addIdToMenu = (menuList: any) => {
        const newMenu = [...menuList];
        newMenu.forEach((menu) => {
            menu.id = `${menu.extId}-${menu.parentId}-${menu.name}`;
            if (menu.subRows) {
                addIdToMenu(menu.subRows);
            }
        });

        return newMenu;
    }

    if (userId && CompanyId) {
        await UserService.getMenuList({
            userId: userId,
            companyConfigurationId: CompanyId,
            isSuperUser: isSuperUser || false,
        }).then((response) => {
            if (response?.data?.data) {
                dispatch(storeMenuListByUserData(addIdToMenu(response?.data?.data)));
            }
        }).catch(() => { });
    }
};