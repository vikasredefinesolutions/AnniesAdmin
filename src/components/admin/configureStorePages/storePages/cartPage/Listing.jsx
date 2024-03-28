
import React, { Fragment } from 'react';
import CategoryTileList from '../common/CategoryTileList';

const Listing = ({ values }) => {
    return (
        <section id="categoryList">
            <div className="group">
                <div className="w-full border-2 relative border-solid border-transparent">

                    <div className="mx-auto">
                        <div className="group">
                            <div className="w-full relative" >
                                <div className="bg-white">
                                    <div className="container mx-auto">
                                        <section aria-labelledby="products-heading" >
                                            <h2 id="products-heading" className="sr-only">Products</h2>

                                            <div className={`grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-${values?.columnSelect ? values.columnSelect : 4} xl:gap-x-8 mb-10`}>
                                                {
                                                    [...Array(12).keys()].map((value, index) => {
                                                        return <Fragment key={index}> <CategoryTileList key={index} values={values} /> </Fragment>
                                                    })
                                                }
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Listing;
