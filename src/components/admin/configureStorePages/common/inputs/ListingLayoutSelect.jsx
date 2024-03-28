
import React, { Fragment, useEffect, useState } from 'react';
import ListingLayoutButton from './ListingLayoutButton';

const ListingLayoutSelect = ({ name }) => {

    const [foldersObj] = useState({ 'customFooter': 4, 'templateID': 10, 'breadCrumbTemplateId': 3, 'myAccountTemplateId': 10, 'cartPageTemplateId': 10, 'productDetailTemplateId': 10 });
    const [numOfImages, setNumOfImages] = useState(null)

    useEffect(() => {
        if (foldersObj[name]) {
            setNumOfImages(foldersObj[name])
        } else {
            setNumOfImages(null)
        }
    }, [foldersObj])

    return (
        <>
            <div className="last:mb-0 flex flex-wrap justify-between items-center pt-4" >
                <label className="mb-3 block text-sm font-bold">Template Select</label>
                <div className="grid grid-cols-2 gap-2 mb-5">
                    {
                        numOfImages && Array.from(Array(numOfImages)).map((_, index) => <Fragment key={index}> <ListingLayoutButton name={name} index={index + 1} /></Fragment>)
                    }
                </div>
            </div >
        </>
    );
};

export default ListingLayoutSelect;
