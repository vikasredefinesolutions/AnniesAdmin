import { useState, useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";
import Routes from "routes/Routes";
import { useParams } from "react-router-dom";

import Create from "./create/Create";
import List from "./list/List";
import StoreServiceCls from "services/admin/store/StoreService";

const InternalRouting = () => {
  const navigate = useNavigate();
  const { storeName, storeId } = useParams();
  const [store, setStore] = useState();

  useEffect(() => {
    StoreServiceCls.getStoreById(storeId)
      .then((response) => {
        if (response?.data?.success && response?.data?.data) {
          let storeData = response?.data?.data;
          if (
            storeData.name.replaceAll(" ", "").toLowerCase() ===
            storeName.toLowerCase()
          ) {
            setStore(response);
          }
        } else {
          navigate("404");
        }
      })
      .catch(() => {
        navigate("404");
      });
  }, [storeId]);

  return (
    <>
      <Routes>
        <Route path="/" element={<List mainStoreData={store?.id && store} />} />
        <Route path="/create" element={<Create mainStoreData={store} />} />
        <Route path="/edit/:id" element={<Create mainStoreData={store} />} />
      </Routes>
    </>
  );
};

export default InternalRouting;
