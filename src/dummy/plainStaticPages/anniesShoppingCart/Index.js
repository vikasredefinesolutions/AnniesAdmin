import AnniesHeader from "dummy/plainStaticPages/common/AnniesHeader"
import Header from "dummy/plainStaticPages/common/Header"
import AnnmiesFooter from "dummy/plainStaticPages/common/AnnmiesFooter"
import Suscribe from "dummy/plainStaticPages/common/Suscribe"
import ProductListing from "dummy/plainStaticPages/common/ProductListing"

import Category from "dummy/plainStaticPages/common/Category";
const Index = () => {
    return (
        <>
            <AnniesHeader />
            <Header />
            <Category />

            <ProductListing />
            <Suscribe />
            <AnnmiesFooter />

        </>
    );
};

export default Index;
