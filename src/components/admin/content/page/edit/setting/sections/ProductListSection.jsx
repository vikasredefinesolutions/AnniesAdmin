import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import AddProductsMoal from "components/admin/content/template/create/modal/addProductModal/AddProductsMoal";
import TopicsDetailsServices from "services/admin/topics/TopicsDetailsServices";

const ProductListSection = ({ products, setFieldValue, isLoadingProducts }) => {
  const [open, setOpen] = useState(false);

  const { id } = useParams();

  const [storeId, setStorId] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    TopicsDetailsServices?.getTopicDetails(id).then(res => {
      setStorId(res?.data?.data?.storeId);
    })
  }, [id]);

  useEffect(() => {
    setFieldValue("productSku", selectedProducts.map((product, ind) => product?.seName).join(','))
  }, [selectedProducts]);

  return (
    <div className="px-5 py-4 bg-white mb-6">
      <h4 className="flex items-center justify-between w-full group mb-1">
        <div className="text-lg text-gray-800 font-bold">Products Section</div>
      </h4>

      <div>
        <AddProductsMoal storeId={storeId} selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} setFieldValue={setFieldValue} open={open} setOpen={setOpen} addBy={"id"} />
      </div>

    </div>
  );
};

export default ProductListSection;
