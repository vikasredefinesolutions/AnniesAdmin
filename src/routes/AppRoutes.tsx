import { Route } from "react-router-dom";
import { useSelector } from "react-redux";

import { __AllStoresObj } from "typeDefination/app.type"

import MainLayout from "layouts/admin/MainLayout";

import PublishOptions from "components/admin/content/page/edit/publishOptions/PublishOptions";
import TwoFactorAuthentication from "components/admin/auth/TwoFactorAuthentication";
import PageSettingsEdit from "components/admin/content/page/edit/setting/Settings";
import PageOptimize from "components/admin/content/page/edit/optimize/Optimize";
import TemplatePreview from "components/admin/content/template/create/Preview";
import TemplateEdit from "components/admin/content/template/create/CmsBuilderAndPreviewer";
import ChangePassword from "components/admin/auth/ChangePassword";
import ForgotPassword from "components/admin/auth/ForgotPassword";
import ResetPassword from "components/admin/auth/ResetPassword";
import SSOLoginPage from "components/admin/auth/SSOLoginPage";
import FrontCms from "components/front/cms/FrontCms";
import Login from "components/admin/auth/Login";

import ProtectedRoute from "./ProtectedRoute";
import Routes from "./Routes";

export default function AppRoutes() {
        const companyInfo = useSelector((store: __AllStoresObj) => store?.CompanyConfiguration);

        return (
                <Routes>
                        <Route path="/" element={companyInfo?.mS365Enabled ? <SSOLoginPage /> : <Login />} />
                        <Route path="/login" element={companyInfo?.mS365Enabled ? <SSOLoginPage /> : <Login />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/reset-password/:id/:code" element={<ResetPassword />} />
                        <Route path="/reset-password/:id" element={<ChangePassword />} />
                        <Route path="/two-factor/authentication/:id" element={<TwoFactorAuthentication />} />

                        {/* What ever route you want to serve after authentication, will go inside this middleware ProtectedRoute */}
                        <Route path="/" element={<ProtectedRoute />}>

                                <Route path="/admin/*" element={<MainLayout />} />
                                <Route path="/admin/Content/Template/edit/:id" element={<TemplateEdit />} />
                                <Route path="/admin/Content/Page/edit/:id" element={<TemplateEdit />} />
                                <Route path="/admin/Content/Page/Category/edit/:id" element={<TemplateEdit />} />
                                <Route path="/admin/Content/Page/preview/:id" element={<TemplatePreview />} />
                                <Route path="/admin/Content/Template/preview/:id" element={<TemplatePreview />} />
                                <Route path="/admin/Content/Page/edit/setting/:id" element={<PageSettingsEdit />} />
                                <Route path="/admin/Content/Page/edit/optimize/:id" element={<PageOptimize />} />
                                <Route path="/admin/Content/Page/edit/publish/:id" element={<PublishOptions />} />

                                <Route path="/resource/:slug" element={<FrontCms />} />
                                {/* This is going to serve our stores (client side stores) and its pages */}
                        </Route>
                </Routes>
        );
}