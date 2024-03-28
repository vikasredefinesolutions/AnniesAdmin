/*Component Name: ProductTileForList
Component Functional Details:  ProductTileForList .
Created By: PK Kher
Created Date: <Creation Date>
Modified By: PK Kher
Modified Date: <Modified Date> */

import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { footerFormData } from 'global/Enum';
import { emptyImageSkeleton } from 'dummy/Dummy';

const ProductTileForList = ({ values }) => {
    const [titleAlign, setTitleAlign] = useState("");
    useEffect(() => {
        setTitleAlign(`flex ${values?.productListOpt_alignment === 'center' ? 'justify-center' : (values?.productListOpt_alignment === 'right' ? 'justify-end' : 'justify-start')}`)
    })
    return (
        <>
            <div className="text-center">
                <div >
                    <div className="flex text-center lg:w-auto">
                    <img src={`${process.env.PUBLIC_URL}/images/templateId/large/${values.templateID}.png`} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductTileForList;
