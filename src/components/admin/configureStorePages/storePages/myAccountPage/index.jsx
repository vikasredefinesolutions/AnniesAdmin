
import { useFormikContext } from 'formik';
import React from 'react';
import AnnouncementBox from '../common/AnnouncementBox';
import BannerBox from '../common/bannerbox';
import Breadcrumb from '../common/Breadcrumb';
import Footer from '../common/Footer';
import Header from '../common/Header';
import ProductFilter from '../common/productFilter/FilterHeader';
import FilterOptions from '../common/productFilter/FilterOptions';
import ProductTileForList from '../common/ProductTileForList';
import PromotionText1 from '../common/PromotionText1';
import PromotionText2 from '../common/PromotionText2';
import Listing from './Listing';

const MyAccountPage = ({ storeDetails }) => {
    const { values } = useFormikContext();
    return (
        <>
            <AnnouncementBox />
            <Header storeDetails={storeDetails} />
            {/* <Breadcrumb breadCrumbType={values?.breadCrumbTemplateId}/>
            <PromotionText1 values={values?.promotionalText1} />
            <BannerBox bannerType={values?.bannertype} />
            <PromotionText2 values={values?.promotionalText2} />
            <ProductFilter values={values} /> */}
            <section id="categoryList">
                <div className="w-full border-2 relative border-solid border-transparent">
                    <div className="container mx-auto">
                    <section id="categoryList">
            <div className="group">
                <div className="w-full border-2 relative border-solid border-transparent">

                    <div className="mx-auto">
                        <div className="group">
                            <div className="w-full relative" >
                                <div className="bg-white">
                                    <div className="container mx-auto">
                                        <div className="text-center">
                                            <div >
                                                <div className="flex text-center lg:w-auto">
                                                <img src={`${process.env.PUBLIC_URL}/images/myAccountTemplateId/large/${values.myAccountTemplateId}.png`} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default MyAccountPage;
