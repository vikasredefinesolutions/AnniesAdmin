/*Component Name: ProductDetailPreview
Component Functional Details: User can create or update ProductDetailPreview master details from here.
Created By: chandan
Created Date: <Creation Date>
Modified By: chandan
Modified Date: <Modified Date> */

import React from 'react';
import { useFormikContext } from 'formik';
import AnnouncementBox from './common/AnnouncementBox';
import BannerBox from './common/bannerbox';
import Breadcrumb from './common/Breadcrumb';
import Footer from './common/Footer';
import Header from './common/Header';
import PromotionText1 from './common/PromotionText1';




const ProductDetailPreview = ({storeDetails}) => {
    const { values } = useFormikContext();
    return (
        <>
             <AnnouncementBox />
            <Header storeDetails={storeDetails} />
            <PromotionText1 values={values?.promotionalText1} />
            { values?.productDetailTemplateId && <section id="categoryList">
                <div className="w-full border-2 relative border-solid border-transparent">
                    <div className="container mx-auto">
                       <img src={`${process.env.PUBLIC_URL}/images/templateId/large/${values?.productDetailTemplateId}.png`} />
                    </div>
                </div>
            </section>}
            <Footer />
        </>
    );
};

export default ProductDetailPreview;
