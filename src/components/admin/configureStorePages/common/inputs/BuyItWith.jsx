import { useState, useEffect, Fragment } from 'react';
import { useParams } from "react-router-dom";
import { useFormikContext } from 'formik';

import ProductService from 'services/admin/master/store/product/ProductService';

import AddProductsMoal from 'components/admin/content/template/create/modal/addProductModal/AddProductsMoal';

const BuyItWith = () => {
    const { id } = useParams();

    const { setFieldValue, values } = useFormikContext();

    const [checkedProducts, setCheckedProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [saveDataToggleFlag, setSaveDataToggleFlag] = useState(false);
    const [open, setOpen] = useState(false);

    const fetchAllProducts = async (queryVal, len) => {
        let payload = {
            sename: queryVal,
            type: 'manual',
            storeId: parseInt(id),
            maximumItemsForFetch: len,
            tagName: '',
        }
        const res = await ProductService.getFeaturedProductsByTagName(payload)

        setSelectedProducts(res?.data?.data || []);
    }

    useEffect(() => {
        if (values?.buy_it_with && values?.buy_it_with.length) {
            fetchAllProducts(values.buy_it_with.filter((obj) => obj).join(","), values.buy_it_with.length);
        }
    }, [values.buy_it_with]);

    useEffect(() => {
        if (selectedProducts && selectedProducts.length && open) {
            setFieldValue("buy_it_with", selectedProducts.map((obj) => {
                return obj.seName || obj.productSEName
            }))
            setOpen(false)
        }
    }, [selectedProducts])

    const handleDeleteProduct = (singleProduct) => {
        let filterdProducts = selectedProducts.filter((prod) => `${prod.productSEName}` !== `${singleProduct?.productSEName}`)
        setFieldValue("buy_it_with", filterdProducts.map((obj) => obj.productSEName))
        setSelectedProducts(filterdProducts)
    }

    return (
        <>
            <div className="bg-white py-4 px-3">
                <div className="pt-4 first:pt-0"> <label className="text-xl mb-[5px]">Search Product</label>
                    <div className="flex items-center w-full" x-show="open">
                        {/* <input onChange={handleSearch} id="CouponCode" name="CouponCode" placeholder="Enter product name / SKU" className="form-input mr-[10px] w-full" /> */}

                        <AddProductsMoal checkedProducts={checkedProducts} setCheckedProducts={setCheckedProducts} storeId={id} setLoading={setLoading} loading={loading} selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} setSaveDataToggleFlag={setSaveDataToggleFlag} saveDataToggleFlag={saveDataToggleFlag} open={open} setOpen={setOpen} addBy={"seName"} />
                    </div>
                    <div className="pt-[20px]">
                        <label className="text-xl mb-2 ">Product List</label>

                        <div className='overflow-x-scroll max-h-[46vh]'>
                            {
                                (selectedProducts && selectedProducts.length) && selectedProducts?.map((product, index) => {
                                    return (
                                        <Fragment key={index}>
                                            <div className="flex justify-between items-start w-full mb-4 border bg-gray-[] rounded p-1">
                                                <div className="w-[calc(100%-70px)]">
                                                    <div className="text-normal-text font-bold font-sub mb-[5px]">
                                                        {product?.productName}
                                                    </div>
                                                    <div className="text-left text-default-text font-bold">${product?.msrp}
                                                    </div>
                                                    <div className="text-left text-default-text font-bold text-[#9C331C]">{product?.quantity > 0 ? `${product?.quantity} Item left` : "Out of Stock"}
                                                    </div>
                                                    {/* <div className="w-full"> <label className="block text-xs font-semibold text-gray-500 uppercase mb-2"> DISPLAY ORDER
                                                    <span className="text-rose-500 text-2xl leading-none">*</span>:</label>
                                                    <input type="text" className="block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md" defaultValue={1} />
                                                </div> */}
                                                </div>
                                                <button type='button' className="text-[#9C331C] hover:text-[#9C331C]" onClick={() => handleDeleteProduct(product)}>
                                                    <span className="material-icons-outlined align-right">delete</span>
                                                </button>
                                            </div>

                                        </Fragment>
                                    )
                                })
                            }
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default BuyItWith;
