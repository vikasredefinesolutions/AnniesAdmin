import React, { useMemo, Fragment } from 'react'
import AdditionalInformationView from './AdditionalInformationView';
import BasicInformationView from './BasicInformationView';
import CategorySEOView from './CategorySEOView';
import CategoryProductsView from './CategoryProductsView';
import CartPagePolicyView from './CartPagePolicyView';
import CategoryImagesView from './CategoryImagesView';

const AllInfo = ({ CategoryEditTabs,
    values,
    type,
    setactiveTab,
    isAddMode,
    mainCategoryId,
    storeId,
}) => {
    const componentsView = {
        BasicInfo: BasicInformationView,
        AdditionalInformation: AdditionalInformationView,
        CategoryProducts: CategoryProductsView,
        CartPagePolicy: CartPagePolicyView,
        CategorySEO: CategorySEOView,
        Images: CategoryImagesView
    };

    const displayTabs = useMemo(() => {
        return (!isAddMode ? CategoryEditTabs.filter((element) => element.componentname != "all") : CategoryEditTabs)
    }, [CategoryEditTabs, isAddMode]);

    return (
        <>
            {displayTabs.map((tab, key) => {
                const Component = componentsView[tab.componentname];
                return (
                    <Fragment key={key}>
                        <Component
                            values={values}
                            tab={tab}
                            readOnly={true}
                            type={type}
                            setactiveTab={setactiveTab}
                            index={key + 1}
                            storeId={storeId}
                            mainCategoryId={mainCategoryId}
                        />
                    </Fragment>
                );
            })}
        </>
    )
}

export default AllInfo;