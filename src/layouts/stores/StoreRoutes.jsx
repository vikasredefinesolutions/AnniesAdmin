import React from "react";

import { Route } from "react-router-dom";
import Routes from "routes/Routes";

import EditStore from "components/admin/configureStorePages/EditStore";
import PreviewStore from "components/admin/configureStorePages/PreviewStore";
import ThemeSetting from "components/admin/content/themeSetting/ThemeSetting";

import SEO from "components/admin/master/storeConfiguration/storeMaster/seoConfig/SEOConfig";
import HeaderConfig from "components/admin/master/storeConfiguration/storeMaster/headerConfig/HeaderConfig";
import Menu from "components/admin/master/storeConfiguration/storeMaster/menuConfig/Menu";
import General from "components/admin/master/storeConfiguration/storeMaster/generalConfig/General";

const MainLayout = () => {
  return (
    <>
      <Routes>
        <Route exact path="/:type/:id" element={<EditStore />} />
        <Route exact path="/Theme/:storeid" element={<ThemeSetting />} />
        <Route
          exact
          path="/preview/:previewStoreName"
          element={<PreviewStore />}
        />
        <Route exact path="/SEO/:id" element={<SEO />} />
        <Route exact path="/HeaderConfig/:id" element={<HeaderConfig />} />
        <Route exact path="/:storeId/Menu" element={<Menu />} />
        <Route exact path="/:storeId/General" element={<General />} />
      </Routes>
    </>
  );
};
export default MainLayout;
