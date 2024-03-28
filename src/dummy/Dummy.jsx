// import ProductTagMaster from "services/productTagMaster/ProductTagMaster";

const selectAllRecord = (e) => {
  // setCheckAllCheckbox(e.target.checked);
};
const CheckboxAllComponent = () => {
  return (
    <div className="flex items-center">
      <label className="inline-flex">
        <span className="sr-only">Select all</span>
        <input
          id="parent-checkbox"
          className="form-checkbox"
          type="checkbox"
          onClick={selectAllRecord}
        // defaultChecked={checkAllCheckbox}
        />
      </label>
    </div>
  );
};

export const emptyImageSkeleton = 'http://ystore.us/HTML/RedefineCommerce/Admin/images/look-11.png'

export const columns = [
  {
    field: "id",
    headerName: CheckboxAllComponent,
    width: 70,
    isComponent: true,
    orderable: false,
  },
  {
    field: "order_no",
    headerName: "Order No.",
    width: 70,
    isComponent: false,
    orderable: true,
  },
  {
    field: "items",
    headerName: "Items",
    width: 70,
    isComponent: false,
    orderable: true,
  },
  {
    field: "total",
    headerName: "Total",
    width: 70,
    isComponent: false,
    orderable: true,
  },
  {
    field: "date",
    headerName: "Date",
    width: 70,
    isComponent: false,
    orderable: true,
  },
  {
    field: "store",
    headerName: "Store",
    width: 70,
    isComponent: false,
    orderable: true,
  },
  {
    field: "print_label",
    headerName: "Print Label",
    width: 70,
    isComponent: false,
    orderable: true,
  },
  {
    field: "capture_order",
    headerName: "Capture Order",
    width: 70,
    isComponent: false,
    orderable: true,
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 70,
    isComponent: false,
    orderable: true,
  },
];

export const moreFilterOptions = [
  {
    name: "Brand",
    options: [
      { label: "A T Cross Company", value: "A T Cross Company" },
      { label: "adidas", value: "adidas" },
    ],
    type: "radio",
  },
  {
    name: "Name",
    options: [
      { label: "Admin 0", value: "Admin 0" },
      { label: "Admin 1", value: "Admin 1" },
    ],
    type: "checkbox",
  },
  {
    name: "Date",
    options: [],
    type: "date",
  },
];

// profile right
export const rights = ["view", "edit", "delete"];

export const storeData = [
  {
    id: "1",
    name: "American Magic",
    of_products: 85,
    modifieddate: "2021-12-18 15:53:05",
    createddate: "2021-11-17 18:53:05",
    updated_by: "Vipul S",
    created_by: "Vikas P",
    status: "Active",
  },
  {
    id: "2",
    name: "Cheers to Gear",
    of_products: 116,
    modifieddate: "2021-12-18 15:53:05",
    createddate: "2021-11-17 18:53:05",
    updated_by: "Vipul S",
    created_by: "Vipul S",
    status: "Active",
  },
  {
    id: "3",
    name: "Corporate Gear",
    of_products: 78,
    modifieddate: "2021-12-18 15:53:05",
    createddate: "2021-11-17 18:53:05",
    updated_by: "Vikas P",
    created_by: "Vipul S",
    status: "Active",
  },
  {
    id: "4",
    name: "Bacardi",
    of_products: 17,
    modifieddate: "2021-12-18 15:53:05",
    createddate: "2021-11-17 18:53:05",
    updated_by: "Vipul S",
    created_by: "Vikas P",
    status: "Draft",
  },
  {
    id: "5",
    name: "American Magic",
    of_products: 116,
    modifieddate: "2021-12-18 15:53:05",
    createddate: "2021-11-17 18:53:05",
    updated_by: "Vipul S",
    created_by: "Vikas P",
    status: "Active",
  },
  {
    id: "6",
    name: "Store Builder ParsonsKellogg",
    of_products: 11,
    modifieddate: "2021-12-18 15:53:05",
    createddate: "2021-11-17 18:53:05",
    updated_by: "Vikas P",
    created_by: "Vikas P",
    status: "Inactive",
  },

  {
    id: "7",
    name: "American Magic",
    of_products: 113,
    modifieddate: "2021-12-18 15:53:05",
    createddate: "2021-11-17 18:53:05",
    updated_by: "Vipul S",
    created_by: "Vipul S",
    status: "Archived",
  },
  {
    id: "8",
    name: "Store Builder Personkelloggs",
    of_products: 116,
    modifieddate: "2021-12-18 15:53:05",
    createddate: "2021-11-17 18:53:05",
    updated_by: "Vipul S",
    created_by: "Vikas P",
    status: "Draft",
  },
  {
    id: "9",
    name: "American Magic",
    of_products: 123,
    modifieddate: "2021-12-18 15:53:05",
    createddate: "2021-11-17 18:53:05",
    updated_by: "Vipul S",
    created_by: "Vipul S",
    status: "Inactive",
  },
  {
    id: "10",
    name: "Coeporate Gear",
    of_products: 116,
    modifieddate: "2021-12-18 15:53:05",
    createddate: "2021-11-17 18:53:05",
    updated_by: "Vipul S",
    created_by: "Vipul S",
    status: "Active",
  },
  {
    id: "11",
    name: "Bacardi",
    of_products: 16,
    modifieddate: "2021-12-18 15:53:05",
    createddate: "2021-11-17 18:53:05",
    updated_by: "Vikas P",
    created_by: "Vipul S",
    status: "Active",
  },
];

/* Category page data */
export const categoryProductsData = [
  {
    id: 1,
    name: "Men's Patagonia Better Sweater Jacket",
    prodstatus: "Active",
    image:
      "http://ystore.us/HTML/RedefineCommerce/tailwind-admin/images/stonewash.jpg",
  },
  {
    id: 2,
    name: "Men's Patagonia Better Sweater Jacket 2",
    prodstatus: "Inactive",
    image:
      "http://ystore.us/HTML/RedefineCommerce/tailwind-admin/images/stonewash.jpg",
  },
  {
    id: 3,
    name: "Men's Patagonia Better Sweater Jacket 3",
    prodstatus: "Active",
    image:
      "http://ystore.us/HTML/RedefineCommerce/tailwind-admin/images/stonewash.jpg",
  },
];

export const logoutTime = [
  { label: "15 minutes", value: "15" },
  { label: "20 minutes", value: "20" },
  { label: "25 minutes", value: "25" },
  { label: "30 minutes", value: "30" },
  { label: "35 minutes", value: "35" },
  { label: "40 minutes", value: "40" },
  { label: "24 hours", value: "1440" },
];

export const loginPageStyle = [
  { value: "Right Align", label: "Right Align" },
  { value: "Left Align", label: "Left Align" },
  { value: "Center Align", label: "Center Align" },
];

export const ProductTagMaster = [
  { value: 1, label: "Top Left" },
  { value: 2, label: "Top Center" },
  { value: 3, label: "Top Right" },
  { value: 4, label: "Bottom Left" },
  { value: 5, label: "Bottom Center" },
  { value: 6, label: "Bottom Right" },
];

export const ProductStatusData = [
  // { name: "New Product?", value: false, dbfield: "isNewProduct" },
  // { name: "Can this product Assemble?", value: true, dbfield: "isAssembleProduct" },
  // { name: "Drop Ship Product?", value: false, dbfield: "isDropShipProduct" },
  { name: "Sale Product?", value: false, dbfield: "isSaleProduct" },
  // { name: "Restricted product?", value: false, dbfield: "isrestrictedProduct" },
  // { name: "Featured", value: false, dbfield: "isFeatured" },
  { name: "New Arrival", value: false, dbfield: "isNewArrival" },
  { name: "Best Seller", value: false, dbfield: "isbestSellar" },
  { name: "Limit Per Customer", value: false, dbfield: "IsLimitPerCustomer" },
  { name: "Add To Cart", value: false, dbfield: "isAddToCart" },
  // { name: "Price Quote", value: false, dbfield: "isPriceQuote" },
  // { name: "Giftset", value: false, dbfield: "isGiftSet" },
  // { name: "Coming Soon", value: false, dbfield: "isCommingSoon" },
  // { name: "No coupon", value: true, dbfield: "isNoCoupan" },
  // { name: "Separate Ship?", value: false, dbfield: "isSepateShip" },
  // { name: "Sample Product?", value: false, dbfield: "isSampleProduct" },
  // { name: "Eco-Friendly", value: false, dbfield: "isEcoFriendly" },
  // { name: "Quick Ship", value: false, dbfield: "isQuickShip" },
  // { name: "Companion", value: false, dbfield: "isCompanion" },
];

export const CategoryStatusData = [
  { name: "Is Feature Category?", value: false, dbfield: "isFeatured" },
  { name: "Is Popular Category?", value: false, dbfield: "isPopular" },
  { name: "Is New Category?", value: false, dbfield: "isnew" },
  { name: "Display In Home Page?", value: false, dbfield: "isUses" },
  { name: "is Search Page", value: false, dbfield:"isSearchPage"}

];


export const BundleProductStatusData = [
  { name: "Sale Product?", value: false, dbfield: "isSaleProduct" },
  { name: "Restricted product?", value: false, dbfield: "isrestrictedProduct" },
  { name: "New Arrival", value: false, dbfield: "isNewArrival" },
  { name: "Best Seller", value: false, dbfield: "isbestSellar" },
  { name: "Price Quote", value: false, dbfield: "isPriceQuote" },
  // { name: "Giftset", value: false, dbfield: "isGiftSet" },
  { name: "Coming Soon", value: false, dbfield: "isCommingSoon" },
  { name: "No coupon", value: true, dbfield: "isNoCoupan" },
];

export const brandColumnsOptions = [
  { value: 1, label: "name" },
  { value: 2, label: "vendors" },
  { value: 3, label: "Status" },
  { value: 4, label: "Created By" },
  { value: 5, label: "Updated By" },
  { value: 6, label: "Created Date" },
  { value: 7, label: "Updated Date" },
];

export const ContentWebsitePageData = [
  {
    name: "Patagonia Corporate Gifts",
    access_url: "https://www.corporategear.com/pantone-colors",
    publish_status: "P",
    test_status: "A/B Testing",
    created_at: "Dec 12, 2021 10:07 AM",
    created_by: "Vipul S",
    updated_at: "Dec 12, 2021 10:07 AM",
    updated_by: "Vipul S",
    domain: "www.parsonskellogg.com",
    publish_at: "Dec 12, 2021 10:07 AM",
    page_title: "About Us",
  },
  {
    name: "PK Health Gear",
    access_url: "https://www.corporategear.com/pantone-colors",
    publish_status: "A",
    test_status: "A/B Testing",
    created_at: "Dec 12, 2021 10:07 AM",
    created_by: "Vipul S",
    updated_at: "Dec 12, 2021 10:07 AM",
    updated_by: "Vipul S",
    domain: "www.parsonskellogg.com",
    publish_at: "Dec 12, 2021 10:07 AM",
    page_title: "About Us",
  },
  {
    name: "Corporate Gear",
    access_url: "https://www.corporategear.com/pantone-colors",
    publish_status: "D",
    test_status: "A/B Testing",
    created_at: "Dec 12, 2021 10:07 AM",
    created_by: "Vipul S",
    updated_at: "Dec 12, 2021 10:07 AM",
    updated_by: "Vipul S",
    domain: "www.parsonskellogg.com",
    publish_at: "Dec 12, 2021 10:07 AM",
    page_title: "About Us",
  },
  {
    name: "Gameday Gear",
    access_url: "https://www.corporategear.com/pantone-colors",
    publish_status: "P",
    test_status: "A/B Testing",
    created_at: "Dec 12, 2021 10:07 AM",
    created_by: "Vipul S",
    updated_at: "Dec 12, 2021 10:07 AM",
    updated_by: "Vipul S",
    domain: "www.parsonskellogg.com",
    publish_at: "Dec 12, 2021 10:07 AM",
    page_title: "About Us",
  },
  {
    name: "Cheers to Gear",
    access_url: "https://www.corporategear.com/pantone-colors",
    publish_status: "R",
    test_status: "A/B Testing",
    created_at: "Dec 12, 2021 10:07 AM",
    created_by: "Vipul S",
    updated_at: "Dec 12, 2021 10:07 AM",
    updated_by: "Vipul S",
    domain: "www.parsonskellogg.com",
    publish_at: "Dec 12, 2021 10:07 AM",
    page_title: "About Us",
  },
];

export const ContentLandingPageData = [
  {
    name: "Patagonia Corporate Gifts",
    access_url: "https://www.corporategear.com/pantone-colors",
    publish_status: "P",
    test_status: "A/B Testing",
    created_at: "Dec 12, 2021 10:07 AM",
    created_by: "Vipul S",
    updated_at: "Dec 12, 2021 10:07 AM",
    updated_by: "Vipul S",
    domain: "www.parsonskellogg.com",
    publish_at: "Dec 12, 2021 10:07 AM",
    page_title: "About Us",
  },
  {
    name: "Branded Nike Apparel",
    access_url: "https://www.corporategear.com/pantone-colors",
    publish_status: "A",
    test_status: "A/B Testing",
    created_at: "Dec 12, 2021 10:07 AM",
    created_by: "Vipul S",
    updated_at: "Dec 12, 2021 10:07 AM",
    updated_by: "Vipul S",
    domain: "www.parsonskellogg.com",
    publish_at: "Dec 12, 2021 10:07 AM",
    page_title: "About Us",
  },
  {
    name: "Custom Yeti Cups",
    access_url: "https://www.corporategear.com/pantone-colors",
    publish_status: "D",
    test_status: "A/B Testing",
    created_at: "Dec 12, 2021 10:07 AM",
    created_by: "Vipul S",
    updated_at: "Dec 12, 2021 10:07 AM",
    updated_by: "Vipul S",
    domain: "www.parsonskellogg.com",
    publish_at: "Dec 12, 2021 10:07 AM",
    page_title: "About Us",
  },
  {
    name: "Peter Millar Custom Golf Clothing",
    access_url: "https://www.corporategear.com/pantone-colors",
    publish_status: "P",
    test_status: "A/B Testing",
    created_at: "Dec 12, 2021 10:07 AM",
    created_by: "Vipul S",
    updated_at: "Dec 12, 2021 10:07 AM",
    updated_by: "Vipul S",
    domain: "www.parsonskellogg.com",
    publish_at: "Dec 12, 2021 10:07 AM",
    page_title: "About Us",
  },
  {
    name: "Adidas Custom Branded Apparel",
    access_url: "https://www.corporategear.com/pantone-colors",
    publish_status: "R",
    test_status: "A/B Testing",
    created_at: "Dec 12, 2021 10:07 AM",
    created_by: "Vipul S",
    updated_at: "Dec 12, 2021 10:07 AM",
    updated_by: "Vipul S",
    domain: "www.parsonskellogg.com",
    publish_at: "Dec 12, 2021 10:07 AM",
    page_title: "About Us",
  },
];

export const ContentBlogPageData = [
  {
    name: "A North Face Fleece Jacket Increases Brand Visibility",
    access_url: "https://www.corporategear.com/pantone-colors",
    publish_status: "P",
    test_status: "A/B Testing",
    created_at: "Dec 12, 2021 10:07 AM",
    created_by: "Vipul S",
    updated_at: "Dec 12, 2021 10:07 AM",
    updated_by: "Vipul S",
    domain: "www.parsonskellogg.com",
    publish_at: "Dec 12, 2021 10:07 AM",
    page_title: "About Us",
  },
  {
    name: "Employee Appreciation Day Gift Ideas for Your Hard Working Staff",
    access_url: "https://www.corporategear.com/pantone-colors",
    publish_status: "A",
    test_status: "A/B Testing",
    created_at: "Dec 12, 2021 10:07 AM",
    created_by: "Vipul S",
    updated_at: "Dec 12, 2021 10:07 AM",
    updated_by: "Vipul S",
    domain: "www.parsonskellogg.com",
    publish_at: "Dec 12, 2021 10:07 AM",
    page_title: "About Us",
  },
  {
    name: "Pantone Colors & the Important Role they Play in Co-Branding",
    access_url: "https://www.corporategear.com/pantone-colors",
    publish_status: "D",
    test_status: "A/B Testing",
    created_at: "Dec 12, 2021 10:07 AM",
    created_by: "Vipul S",
    updated_at: "Dec 12, 2021 10:07 AM",
    updated_by: "Vipul S",
    domain: "www.parsonskellogg.com",
    publish_at: "Dec 12, 2021 10:07 AM",
    page_title: "About Us",
  },
  {
    name: "Custom YETI (Everything) Built for Your Logo",
    access_url: "https://www.corporategear.com/pantone-colors",
    publish_status: "P",
    test_status: "A/B Testing",
    created_at: "Dec 12, 2021 10:07 AM",
    created_by: "Vipul S",
    updated_at: "Dec 12, 2021 10:07 AM",
    updated_by: "Vipul S",
    domain: "www.parsonskellogg.com",
    publish_at: "Dec 12, 2021 10:07 AM",
    page_title: "About Us",
  },
  {
    name: "Branded Nike Markets Your Business Beyond Any Metric",
    access_url: "https://www.corporategear.com/pantone-colors",
    publish_status: "R",
    test_status: "A/B Testing",
    created_at: "Dec 12, 2021 10:07 AM",
    created_by: "Vipul S",
    updated_at: "Dec 12, 2021 10:07 AM",
    updated_by: "Vipul S",
    domain: "www.parsonskellogg.com",
    publish_at: "Dec 12, 2021 10:07 AM",
    page_title: "About Us",
  },
];

export const ViewOrdersData = [
  {
    orders: "Sanmar",
    orddate: "Dec 12, 2021 10:07 AM",
    amount: " $ 139.00",
    customerName: "Thunder Boult",
  },
  {
    orders: "ertrSanmar01",
    orddate: "Dec 12, 2021 10:07 AM",
    amount: "$ 159.00",
    customerName: "Spiderman",
  },
];

export const productTilesDetailData = [
  {
    title: "Last Publish Detail",
    subTitle: "Last Published on Sept 05, 2021 - 12:14 PM",
    subTitle2: "Last Published by Vipul S.",
    btnName: "View Log",
  },
  {
    title: "Last Save Detail",
    subTitle: "Last Saved on Sept 05, 2021 - 12:14 PM",
    subTitle2: "Last Saved by Vipul S.",
    btnName: "View Log",
  },
];

export const importData = [
  {
    title: "Image",
    field: ["Image", "title", "status"],
    sample_data: "Hello",
    updated_date: "2022-06-06T14:45:32.616236",
    UpdatedByName: "Subroza",
  },
  {
    title: "title",
    field: ["Image", "title", "status"],
    sample_data: "Hello",
    updated_date: "2022-06-06T14:45:32.616236",
    UpdatedByName: "Subroza",
  },
];

export const orderHistory = [
  {
    orderNo: "#258478",
    order_date: "2022-06-06T14:45:32.616236",
    customer: "subroza",
    qty: "5",
    total: "16.65.00",
    payment_status: "Paid",
    fulfillment_status: "Unfulfilled",
  },
  {
    orderNo: "#258478",
    order_date: "2022-06-06T14:45:32.616236",
    customer: "subroza",
    qty: "5",
    total: "2500.00",
    payment_status: "Paid",
    fulfillment_status: "FulFilled",
  },
];

export const ChartOrderData = [
  {
    month: "Jan",
    year: 2011,
    ordersAmount: 2154,
  },
  {
    month: "Feb",
    year: 2011,
    ordersAmount: 2548,
  },
  {
    month: "Mar",
    year: 2012,
    ordersAmount: 8457,
  },
  {
    month: "Apr",
    year: 2012,
    ordersAmount: 9874,
  },
  {
    month: "May",
    year: 2022,
    ordersAmount: 4512,
  },
  {
    month: "Jun",
    year: 2020,
    ordersAmount: 6548,
  },
  {
    month: "Sep",
    year: 2023,
    ordersAmount: 8951,
  },
];

export const ChartInventoryData = [
  {
    month: "Jan",
    year: 4000,
    ordersAmount: 3654,
  },
  {
    month: "Feb",
    year: 1506,
    ordersAmount: 2548,
  },
  {
    month: "Mar",
    year: 1250,
    ordersAmount: 8457,
  },
  {
    month: "Apr",
    year: 5050,
    ordersAmount: 9874,
  },
  {
    month: "May",
    year: 2664,
    ordersAmount: 4512,
  },
  {
    month: "Jun",
    year: 6565,
    ordersAmount: 6548,
  },
  {
    month: "Sep",
    year: 2627,
    ordersAmount: 8951,
  },
];

export const themeBorderStyleOptions = [
  { value: "", label: "Select an option" },
  { value: "none", label: "None" },
  { value: "solid", label: "Solid" },
  { value: "dotted", label: "Dotted" },
  { value: "dashed", label: "Dashed" },
  { value: "double", label: "Double" },
];

export const themeTextDecorations = [
  { value: "no-underline", label: "None" },
  { value: "italic", label: "Italic" },
  { value: "not-italic", label: "Normal" },
  { value: "underline", label: "Underline" },
  { value: "overline", label: "Overline" },
  { value: "line-through", label: "line-through" },
]


export const themeFontStyleOptions = [
  { value: "", label: "Select Fonts" },
  { value: "'Outfit', sans-serif", label: "Outfit, sans-serif" },
  { value: "'Open Sans', sans-serif", label: "Open Sans, sans-serif" },
  { value: "'Roboto', sans-serif", label: "Roboto, sans-serif" },
  { value: "'Lato', sans-serif", label: "Lato, sans-serif" },
  { value: "'Roboto Slab', serif", label: "Roboto Slab, serif" },
  { value: "'Raleway', sans-serif", label: "Raleway, sans-serif" },
  { value: "'Montserrat', sans-serif", label: "Montserrat, sans-serif" },
  { value: "'Saira Extra Condensed', sans-serif", label: "Saira Extra Condensed, sans-serif" },
  { value: "'Work Sans', sans-serif", label: "Work Sans, sans-serif" },
  { value: "'Nunito Sans', sans-serif", label: "Nunito Sans, sans-serif" },
  { value: "'PT Sans', sans-serif", label: "PT Sans, sans-serif" },
  { value: "'Source Sans Pro', sans-serif", label: "Source Sans Pro, sans-serif" },
  // { value: "'Lora', serif", label: "Lora, serif" },
  { value: "'porsche_nextregular', sans-serif", label: "Porsche Next, serif" },
  { value: "'Helvetica Now', 'Helvetica Neue', 'Helvetica', Roboto, 'Arial', system-ui, -apple-system, BlinkMacSystemFont, sans-serif", label: "Helvetica_neue, serif" },
  { value: "'Palatino nova Pro', Palatino, serif", label: "Palatino, serif" },
  // { value: "'Red_Hat_Display', sans-serif", label: "Red Hat Display, serif" },
  // { value: "'dm_serif_displayregular', sans-serif", label: "DM Serif Display, serif" },
  { value: "'open_sansregular', sans-serif", label: "Open Sansregular, sans-serif" },
  { value: "'Noto Serif', sans-serif", label: "Noto Serif, sans-serif" },
  { value: "'blackriverbold', sans-serif", label:"blackriverbold, sans-serif"},
];

export const themeFontTransformationOption = [
  { value: "0", label: "Select an option" },
  { value: "none", label: "None" },
  { value: "capitalize", label: "Capitalize" },
  { value: "uppercase", label: "Uppercase" },
  { value: "lowercase", label: "Lowercase" },
];
export const themeFontWeightOption = [
  { value: "0", label: "Select Font Weight" },
  { value: "100", label: "100" },
  { value: "200", label: "200" },
  { value: "300", label: "300" },
  { value: "400", label: "400" },
  { value: "500", label: "500" },
  { value: "600", label: "600" },
  { value: "700", label: "700" },
  { value: "800", label: "800" },
  { value: "900", label: "900" },
];

export const themeFontSizeOption = [
  { value: "0px", label: "Select Font Size" },
  { value: '1px', label: '1px' },
  { value: '2px', label: '2px' },
  { value: '3px', label: '3px' },
  { value: '4px', label: '4px' },
  { value: '5px', label: '5px' },
  { value: '6px', label: '6px' },
  { value: '7px', label: '7px' },
  { value: '8px', label: '8px' },
  { value: '9px', label: '9px' },
  { value: '10px', label: '10px' },
  { value: '11px', label: '11px' },
  { value: '12px', label: '12px' },
  { value: '13px', label: '13px' },
  { value: '14px', label: '14px' },
  { value: '15px', label: '15px' },
  { value: '16px', label: '16px' },
  { value: '17px', label: '17px' },
  { value: '18px', label: '18px' },
  { value: '19px', label: '19px' },
  { value: '20px', label: '20px' },
  { value: '21px', label: '21px' },
  { value: '22px', label: '22px' },
  { value: '23px', label: '23px' },
  { value: '24px', label: '24px' },
  { value: '25px', label: '25px' },
  { value: '26px', label: '26px' },
  { value: '27px', label: '27px' },
  { value: '28px', label: '28px' },
  { value: '29px', label: '29px' },
  { value: '30px', label: '30px' },
  { value: '31px', label: '31px' },
  { value: '32px', label: '32px' },
  { value: '33px', label: '33px' },
  { value: '34px', label: '34px' },
  { value: '35px', label: '35px' },
  { value: '36px', label: '36px' },
  { value: '37px', label: '37px' },
  { value: '38px', label: '38px' },
  { value: '39px', label: '39px' },
  { value: '40px', label: '40px' },
  { value: '41px', label: '41px' },
  { value: '42px', label: '42px' },
  { value: '43px', label: '43px' },
  { value: '44px', label: '44px' },
  { value: '45px', label: '45px' },
  { value: '46px', label: '46px' },
  { value: '47px', label: '47px' },
  { value: '48px', label: '48px' },
  { value: '49px', label: '49px' },
  { value: '50px', label: '50px' },
  { value: '51px', label: '51px' },
  { value: '52px', label: '52px' },
  { value: '53px', label: '53px' },
  { value: '54px', label: '54px' },
  { value: '55px', label: '55px' },
  { value: '56px', label: '56px' },
  { value: '57px', label: '57px' },
  { value: '58px', label: '58px' },
  { value: '59px', label: '59px' },
  { value: '60px', label: '60px' },
  { value: '61px', label: '61px' },
  { value: '62px', label: '62px' },
  { value: '63px', label: '63px' },
  { value: '64px', label: '64px' },
  { value: '65px', label: '65px' },
  { value: '66px', label: '66px' },
  { value: '67px', label: '67px' },
  { value: '68px', label: '68px' },
  { value: '69px', label: '69px' },
  { value: '70px', label: '70px' },
  { value: '71px', label: '71px' },
  { value: '72px', label: '72px' },
  { value: '73px', label: '73px' },
  { value: '74px', label: '74px' },
  { value: '75px', label: '75px' },
  { value: '76px', label: '76px' },
  { value: '77px', label: '77px' },
  { value: '78px', label: '78px' },
  { value: '79px', label: '79px' },
  { value: '80px', label: '80px' },
  { value: '81px', label: '81px' },
  { value: '82px', label: '82px' },
  { value: '83px', label: '83px' },
  { value: '84px', label: '84px' },
  { value: '85px', label: '85px' },
  { value: '86px', label: '86px' },
  { value: '87px', label: '87px' },
  { value: '88px', label: '88px' },
  { value: '89px', label: '89px' },
  { value: '90px', label: '90px' },
  { value: '91px', label: '91px' },
  { value: '92px', label: '92px' },
  { value: '93px', label: '93px' },
  { value: '94px', label: '94px' },
  { value: '95px', label: '95px' },
  { value: '96px', label: '96px' },
  { value: '97px', label: '97px' },
  { value: '98px', label: '98px' },
  { value: '99px', label: '99px' },
  { value: '100px', label: '100px' }

];
export const themeLineHeight = [
  { value: "0px", label: "Select Line Height" },
  { value: '1px', label: '1' },
  { value: '2px', label: '2' },
  { value: '3px', label: '3' },
  { value: '4px', label: '4' },
  { value: '5px', label: '5' },
  { value: '6px', label: '6' },
  { value: '7px', label: '7' },
  { value: '8px', label: '8' },
  { value: '9px', label: '9' },
  { value: '10px', label: '10' },
  { value: '11px', label: '11' },
  { value: '12px', label: '12' },
  { value: '13px', label: '13' },
  { value: '14px', label: '14' },
  { value: '15px', label: '15' },
  { value: '16px', label: '16' },
  { value: '17px', label: '17' },
  { value: '18px', label: '18' },
  { value: '19px', label: '19' },
  { value: '20px', label: '20' },
  { value: '21px', label: '21' },
  { value: '22px', label: '22' },
  { value: '23px', label: '23' },
  { value: '24px', label: '24' },
  { value: '25px', label: '25' },
  { value: '26px', label: '26' },
  { value: '27px', label: '27' },
  { value: '28px', label: '28' },
  { value: '29px', label: '29' },
  { value: '30px', label: '30' },
  { value: '31px', label: '31' },
  { value: '32px', label: '32' },
  { value: '33px', label: '33' },
  { value: '34px', label: '34' },
  { value: '35px', label: '35' },
  { value: '36px', label: '36' },
  { value: '37px', label: '37' },
  { value: '38px', label: '38' },
  { value: '39px', label: '39' },
  { value: '40px', label: '40' },
  { value: '41px', label: '41' },
  { value: '42px', label: '42' },
  { value: '43px', label: '43' },
  { value: '44px', label: '44' },
  { value: '45px', label: '45' },
  { value: '46px', label: '46' },
  { value: '47px', label: '47' },
  { value: '48px', label: '48' },
  { value: '49px', label: '49' },
  { value: '50px', label: '50' },
  { value: '51px', label: '51' },
  { value: '52px', label: '52' },
  { value: '53px', label: '53' },
  { value: '54px', label: '54' },
  { value: '55px', label: '55' },
  { value: '56px', label: '56' },
  { value: '57px', label: '57' },
  { value: '58px', label: '58' },
  { value: '59px', label: '59' },
  { value: '60px', label: '60' },
  { value: '61px', label: '61' },
  { value: '62px', label: '62' },
  { value: '63px', label: '63' },
  { value: '64px', label: '64' },
  { value: '65px', label: '65' },
  { value: '66px', label: '66' },
  { value: '67px', label: '67' },
  { value: '68px', label: '68' },
  { value: '69px', label: '69' },
  { value: '70px', label: '70' },
  { value: '71px', label: '71' },
  { value: '72px', label: '72' },
  { value: '73px', label: '73' },
  { value: '74px', label: '74' },
  { value: '75px', label: '75' },
  { value: '76px', label: '76' },
  { value: '77px', label: '77' },
  { value: '78px', label: '78' },
  { value: '79px', label: '79' },
  { value: '80px', label: '80' },
  { value: '81px', label: '81' },
  { value: '82px', label: '82' },
  { value: '83px', label: '83' },
  { value: '84px', label: '84' },
  { value: '85px', label: '85' },
  { value: '86px', label: '86' },
  { value: '87px', label: '87' },
  { value: '88px', label: '88' },
  { value: '89px', label: '89' },
  { value: '90px', label: '90' },
  { value: '91px', label: '91' },
  { value: '92px', label: '92' },
  { value: '93px', label: '93' },
  { value: '94px', label: '94' },
  { value: '95px', label: '95' },
  { value: '96px', label: '96' },
  { value: '97px', label: '97' },
  { value: '98px', label: '98' },
  { value: '99px', label: '99' },
  { value: '100px', label: '100' }

];

export const FontSizeOptionDetailPage = [
  { label: "Small", value: "text-sm" },
  { label: "Normal", value: "text-base" },
  { label: "Large", value: "text-lg" },
];

export const addToCartOptions = [
  { label: "Small", value: "text-sm" },
  { label: "Normal", value: "text-base" },
  { label: "Large", value: "text-lg" },
];

export const TextStyleSizeOptionDetailPage = [
  { value: "font-bold", label: "Bold" },
  { value: "italic", label: "Italic" },
  { value: "underline", label: "Underline" },
];

export const WishlistOption = [
  { value: "hide", label: "Hide" },
  { value: "left_top", label: "Left Top" },
  { value: "left_bottom", label: "Left Bottom" },
  { value: "right_top", label: "Right Top" },
  { value: "right_bottom", label: "Right Bottom" },
];

export const themeLetterSpacingOption = [
  { value: "0.1px", label: "0.1" },
  { value: "0.2px", label: "0.2" },
  { value: "0.3px", label: "0.3" },
  { value: "0.4px", label: "0.4" },
  { value: "0.5px", label: "0.5" },
  { value: "0.6px", label: "0.6" },
  { value: "0.7px", label: "0.7" },
  { value: "0.8px", label: "0.8" },
  { value: "0.9px", label: "0.9" },
  { value: "1px", label: "1" },
  { value: "1.1px", label: "1.1" },
  { value: "1.2px", label: "1.2" },
  { value: "1.3px", label: "1.3" },
  { value: "1.4px", label: "1.4" },
  { value: "1.5px", label: "1.5" },
  { value: "1.6px", label: "1.6" },
  { value: "1.7px", label: "1.7" },
  { value: "1.8px", label: "1.8" },
  { value: "1.9px", label: "1.9" },
  { value: "2px", label: "2.0" },
  { value: "2.1px", label: "2.1" },
  { value: "2.2px", label: "2.2" },
  { value: "2.3px", label: "2.3" },
  { value: "2.4px", label: "2.4" },
  { value: "2.5px", label: "2.5" },
  { value: "2.6px", label: "2.6" },
  { value: "2.7px", label: "2.7" },
  { value: "2.8px", label: "2.8" },
  { value: "2.9px", label: "2.9" },
  { value: "3px", label: "3.0" },
];

export const themeMaxContainerWidthOption = [
  { value: "", label: "Select an option" },
  { value: "1140px", label: "Compact (1140px)" },
  { value: "1440px", label: "Semi Compact (1440px)" },
  { value: "1600px", label: "Default (1600px)" },
  { value: "1920px", label: "Comfortable (1920px)" },
  // { value: "custom", label: "Custom", },
];

export const themeVerticalSpacingOption = [
  { value: "", label: "Select an option" },
  { value: "48px", label: "Compact (48px)" },
  { value: "60px", label: "Default (60px)" },
  { value: "80px", label: "Comfortable (80px)" },
];
export const MenuType = [{ label: 'None', value: 'None' }, { label: 'brands', value: 'brands' }]
export const BannerType = [
  { value: 'none', label: 'None' },
  { value: "type1", label: "Type 1" },
  { value: "type2", label: "Type 2" },
  { value: "type3", label: "Type 3" },
  { value: "type4", label: "Type 4" },
  { value: "type6", label: "Type 6" },
];
export const BreadCrumbType = [
  { value: "type1", label: "Type 1" },
  { value: "type2", label: "Type 2" },
  { value: "type3", label: "Type 3" },
  { value: "type4", label: "Type 4" },
];
export const MyAccountType = [
  { value: "type1", label: "Type 1" },
  { value: "type2", label: "Type 2" },
  { value: "type3", label: "Type 3" },
  { value: "type4", label: "Type 4" },
];
export const CustomizeLogoType = [
  { value: "type1", label: "Template 1" },
  { value: "type2", label: "Template 2" },
  { value: "type3", label: "Template 3" },
  { value: "type4", label: "Template 4" },
];


export const TemplateType = [
  { value: 1, label: "Template 1" },
  { value: 2, label: "Template 2" },
  { value: 3, label: "Template 3" },
  { value: 4, label: "Template 4" },
];
export const ViewOptions = [
  { value: "rounded", label: "Rounded" },
  { value: "square", label: "Square" },
];

export const contentThemeSettingAttributeDate = [

  {
    id: "font",
    label: "Font",
    components: {
      font_style: {
        name: "--tw-theme-body-font",
      },
      font_size: {
        name: "--tw-theme-body-font-size",
      },
      font_weight: {
        name: "--tw-theme-body-font-weight",
      },
      line_height: {
        name: "--tw-theme-body-font-line-height",
      },
      font_letter_spacing: {
        name: "--tw-theme-body-font-letter-spacing",
      },
      background_color: {
        name: "--tw-theme-font-color",
      },
    },
  },
  {
    id: "spacing",
    label: "Spacing",
    components: {
      max_container_width: {
        name: "--tw-theme-spcing-max-container-width",
      },
      vertical_spacing: {
        name: "--tw-theme-spcing-vertical_spacing",
      },
    },
  },
  {
    id: "cograybgcolor",
    label: "Gray Background Color",
    components: {
      background_color: {
        name: "--tw-theme-bg-gray-color"
      }
    },
  },
  {
    id: "graybordercolor",
    label: "Gray Border Color",
    components: {
      background_color: {
        name: "--tw-theme-border-gray-color"
      },
    },
  },
  {
    id: "text",
    label: "Text",
    sub_attributes: [
      {
        id: "extra_large_text",
        label: "Extra Large Text",
        components: {
          font_style: {
            name: "--tw-theme-extra-large-text-font-family",
          },
          font_size: {
            name: "--tw-theme-extra-large-text-font-size",
          },
          font_weight: {
            name: "--tw-theme-extra-large-text-font-weight",
          },
          font_letter_spacing: {
            name: "--tw-theme-extra-large-text-letter-spacing",
          },
          line_height: {
            name: "--tw-theme-extra-large-text-line-height"
          },
          background_color: {
            name: "--tw-theme-extra-large-text-font-color"
          }
        },
      },
      {
        id: "large_text",
        label: "Large Text",
        components: {
          font_style: {
            name: "--tw-theme-large-text-font-family",
          },
          font_size: {
            name: "--tw-theme-large-text-font-size",
          },
          font_weight: {
            name: "--tw-theme-large-text-font-weight",
          },
          font_letter_spacing: {
            name: "--tw-theme-large-text-letter-spacing",
          },
          line_height: {
            name: "--tw-theme-large-text-line-height"
          },
          background_color: {
            name: "--tw-theme-large-text-font-color"
          }
        },
      },
      {
        id: "title_text",
        label: "Title Text",
        components: {
          font_style: {
            name: "--tw-theme-title-text-font-family",
          },
          font_size: {
            name: "--tw-theme-title-text-font-size",
          },
          font_weight: {
            name: "--tw-theme-title-text-font-weight",
          },
          font_letter_spacing: {
            name: "--tw-theme-title-text-letter-spacing",
          },
          line_height: {
            name: "--tw-theme-title-text-line-height"
          },
          background_color: {
            name: "--tw-theme-title-text-font-color"
          }
        },
      },
      {
        id: "sub_text",
        label: "Sub Text",
        components: {
          font_style: {
            name: "--tw-theme-sub-text-font-family",
          },
          font_size: {
            name: "--tw-theme-sub-text-font-size",
          },
          font_weight: {
            name: "--tw-theme-sub-text-font-weight",
          },
          font_letter_spacing: {
            name: "--tw-theme-sub-text-letter-spacing",
          },
          line_height: {
            name: "--tw-theme-sub-text-line-height"
          },
          background_color: {
            name: "--tw-theme-sub-text-font-color"
          }
        },
      },
      {
        id: "medium_text",
        label: "Medium Text",
        components: {
          font_style: {
            name: "--tw-theme-medium-text-font-family",
          },
          font_size: {
            name: "--tw-theme-medium-text-font-size",
          },
          font_weight: {
            name: "--tw-theme-medium-text-font-weight",
          },
          font_letter_spacing: {
            name: "--tw-theme-medium-text-letter-spacing",
          },
          line_height: {
            name: "--tw-theme-medium-text-line-height"
          },
          background_color: {
            name: "--tw-theme-medium-text-font-color"
          }
        },
      },
      {
        id: "normal_text",
        label: "Normal Text",
        components: {
          font_style: {
            name: "--tw-theme-normal-text-font-family",
          },
          font_size: {
            name: "--tw-theme-normal-text-font-size",
          },
          font_weight: {
            name: "--tw-theme-normal-text-font-weight",
          },
          font_letter_spacing: {
            name: "--tw-theme-normal-text-letter-spacing",
          },
          line_height: {
            name: "--tw-theme-normal-text-line-height"
          },
          background_color: {
            name: "--tw-theme-normal-text-font-color"
          }
        },
      },
      {
        id: "default_text",
        label: "Default Text",
        components: {
          font_style: {
            name: "--tw-theme-default-text-font-family",
          },
          font_size: {
            name: "--tw-theme-default-text-font-size",
          },
          font_weight: {
            name: "--tw-theme-default-text-font-weight",
          },
          font_letter_spacing: {
            name: "--tw-theme-default-text-letter-spacing",
          },
          line_height: {
            name: "--tw-theme-default-text-line-height"
          },
          background_color: {
            name: "--tw-theme-default-text-font-color"
          }
        },
      },
      {
        id: "small_text",
        label: "Small Text",
        components: {
          font_style: {
            name: "--tw-theme-small-text-font-family",
          },
          font_size: {
            name: "--tw-theme-small-text-font-size",
          },
          font_weight: {
            name: "--tw-theme-small-text-font-weight",
          },
          font_letter_spacing: {
            name: "--tw-theme-small-text-letter-spacing",
          },
          line_height: {
            name: "--tw-theme-small-text-line-height"
          },
          background_color: {
            name: "--tw-theme-small-text-font-color"
          }
        },
      },
      {
        id: "extra_small_text",
        label: "Extra Small Text",
        components: {
          font_style: {
            name: "--tw-theme-extra-small-text-font-family",
          },
          font_size: {
            name: "--tw-theme-extra-small-text-font-size",
          },
          font_weight: {
            name: "--tw-theme-extra-small-text-font-weight",
          },
          font_letter_spacing: {
            name: "--tw-theme-extra-small-text-letter-spacing",
          },
          line_height: {
            name: "--tw-theme-extra-small-text-line-height"
          },
          background_color: {
            name: "--tw-theme-extra-small-text-font-color"
          }
        },
      },
    ],
  },
  {
    id: "buttons",
    label: "Buttons",
    sub_attributes: [
      {
        id: "default",
        label: "Default",
        sub_attributes: [
          {
            id: "btn_default_text",
            label: "Text",
            components: {
              background_color: {
                name: "--tw-theme-btn-default-text-color",
              },
            },
          },
          {
            id: "btn_default_background",
            label: "Background",
            components: {
              background_color: {
                name: "--tw-theme-btn-default-color",
              },
            },
          },
          {
            id: "btn_default_border",
            label: "Border",
            components: {
              font_size: {
                name: "--tw-theme-btn-default-border-width",
              },
            },
          },
          {
            id: "btn_default_border_color",
            label: "Border Color",
            components: {
              background_color: {
                name: "--tw-theme-btn-default-border-color",
              },
            },
          },
          {
            id: "btn_default_corner",
            label: "Corner",
            components: {
              font_size: {
                name: "--tw-theme-btn-default-border-radius",
              },
            },
          },
          {
            id: "btn_default_hover",
            label: "Hover",
            sub_attributes: [
              {
                id: "btn_default_hover_text",
                label: "Text",
                components: {
                  background_color: {
                    name: "--tw-theme-btn-default-hover-text-color",
                  },
                },
              },
              {
                id: "btn_default_hover_background",
                label: "Background",
                components: {
                  background_color: {
                    name: "--tw-theme-btn-default-hover-color",
                  },
                },
              },
            ],
          },
        ],
      },
      {
        id: "primary",
        label: "Primary",
        sub_attributes: [
          {
            id: "btn_primary_text",
            label: "Text",
            components: {
              background_color: {
                name: "--tw-theme-btn-primary-text-color",
              },
            },
          },
          {
            id: "btn_primary_background",
            label: "Background",
            components: {
              background_color: {
                name: "--tw-theme-btn-primary-color",
              },
            },
          },
          {
            id: "btn_primary_border",
            label: "Border",
            components: {
              font_size: {
                name: "--tw-theme-btn-primary-border-width",
              },
            },
          },
          {
            id: "btn_primary_border_color",
            label: "Border Color",
            components: {
              background_color: {
                name: "--tw-theme-btn-primary-border-color",
              },
            },
          },
          {
            id: "btn_primary_corner",
            label: "Corner",
            components: {
              font_size: {
                name: "--tw-theme-btn-primary-border-radius",
              },
            },
          },
          {
            id: "btn_primary_hover",
            label: "Hover",
            sub_attributes: [
              {
                id: "btn_primary_hover_text",
                label: "Text",
                components: {
                  background_color: {
                    name: "--tw-theme-btn-primary-hover-text-color",
                  },
                },
              },
              {
                id: "btn_primary_hover_background",
                label: "Background",
                components: {
                  background_color: {
                    name: "--tw-theme-btn-primary-hover-color",
                  },
                },
              },
            ],
          },
        ],
      },
      {
        id: "secondary",
        label: "Secondary",
        sub_attributes: [
          {
            id: "btn_secondary_text",
            label: "Text",
            components: {
              background_color: {
                name: "--tw-theme-btn-secondary-text-color",
              },
            },
          },
          {
            id: "btn_secondary_background",
            label: "Background",
            components: {
              background_color: {
                name: "--tw-theme-btn-secondary-color",
              },
            },
          },
          {
            id: "btn_secondary_border",
            label: "Border",
            components: {
              font_size: {
                name: "--tw-theme-btn-secondary-border-width",
              },
            },
          },
          {
            id: "btn_secondary_border_color",
            label: "Border Color",
            components: {
              background_color: {
                name: "--tw-theme-btn-secondary-border-color",
              },
            },
          },
          {
            id: "btn_secondary_corner",
            label: "Corner",
            components: {
              font_size: {
                name: "--tw-theme-btn-secondary-border-radius",
              },
            },
          },
          {
            id: "btn_secondary_hover",
            label: "Hover",
            sub_attributes: [
              {
                id: "btn_secondary_hover_text",
                label: "Text",
                components: {
                  background_color: {
                    name: "--tw-theme-btn-secondary-hover-text-color",
                  },
                },
              },
              {
                id: "btn_secondary_hover_background",
                label: "Background",
                components: {
                  background_color: {
                    name: "--tw-theme-btn-secondary-hover-color",
                  },
                },
              },
            ],
          },
        ],
      },
      {
        id: "tertiary",
        label: "Tertiary",
        sub_attributes: [
          {
            id: "btn_tertiary_text",
            label: "Text",
            components: {
              background_color: {
                name: "--tw-theme-btn-tertiary-text-color",
              },
            },
          },
          {
            id: "btn_tertiary_background",
            label: "Background",
            components: {
              background_color: {
                name: "--tw-theme-btn-tertiary-color",
              },
            },
          },
          {
            id: "btn_tertiary_border",
            label: "Border",
            components: {
              font_size: {
                name: "--tw-theme-btn-tertiary-border-width",
              },
            },
          },
          {
            id: "btn_tertiary_border_color",
            label: "Border Color",
            components: {
              background_color: {
                name: "--tw-theme-btn-tertiary-border-color",
              },
            },
          },
          {
            id: "btn_tertiary_corner",
            label: "Corner",
            components: {
              font_size: {
                name: "--tw-theme-btn-tertiary-border-radius",
              },
            },
          },
          {
            id: "btn_tertiary_hover",
            label: "Hover",
            sub_attributes: [
              {
                id: "btn_tertiary_hover_text",
                label: "Text",
                components: {
                  background_color: {
                    name: "--tw-theme-btn-tertiary-hover-text-color",
                  },
                },
              },
              {
                id: "btn_tertiary_hover_background",
                label: "Background",
                components: {
                  background_color: {
                    name: "--tw-theme-btn-tertiary-hover-color",
                  },
                },
              },
            ],
          },
        ],
      },
      {
        id: "quaternary",
        label: "Quaternary",
        sub_attributes: [
          {
            id: "btn_quaternary_text",
            label: "Text",
            components: {
              background_color: {
                name: "--tw-theme-btn-quaternary-text-color",
              },
            },
          },
          {
            id: "btn_quaternary_background",
            label: "Background",
            components: {
              background_color: {
                name: "--tw-theme-btn-quaternary-color",
              },
            },
          },
          {
            id: "btn_quaternary_border",
            label: "Border",
            components: {
              font_size: {
                name: "--tw-theme-btn-quaternary-border-width",
              },
            },
          },
          {
            id: "btn_quaternary_border_color",
            label: "Border Color",
            components: {
              background_color: {
                name: "--tw-theme-btn-quaternary-border-color",
              },
            },
          },
          {
            id: "btn_quaternary_corner",
            label: "Corner",
            components: {
              font_size: {
                name: "--tw-theme-btn-quaternary-border-radius",
              },
            },
          },
          {
            id: "btn_quaternary_hover",
            label: "Hover",
            sub_attributes: [
              {
                id: "btn_quaternary_hover_text",
                label: "Text",
                components: {
                  background_color: {
                    name: "--tw-theme-btn-quaternary-hover-text-color",
                  },
                },
              },
              {
                id: "btn_quaternary_hover_background",
                label: "Background",
                components: {
                  background_color: {
                    name: "--tw-theme-btn-quaternary-hover-color",
                  },
                },
              },
            ],
          },
        ],
      },
      {
        id: "default-border",
        label: "Default Border",
        sub_attributes: [
          {
            id: "btn_default_text_border",
            label: "Text",
            components: {
              background_color: {
                name: "--tw-theme-btn-default-text-color-border",
              },
            },
          },
          {
            id: "btn_default_background_border",
            label: "Background",
            components: {
              background_color: {
                name: "--tw-theme-btn-default-bg-color-border",
              },
            },
          },
          {
            id: "btn_default_border_border",
            label: "Border",
            components: {
              font_size: {
                name: "--tw-theme-btn-default-border-width-border",
              },
            },
          },
          {
            id: "btn_default_border_color_border",
            label: "Border Color",
            components: {
              background_color: {
                name: "--tw-theme-btn-default-border-color-border",
              },
            },
          },
          {
            id: "btn_default_corner_border",
            label: "Corner",
            components: {
              font_size: {
                name: "--tw-theme-btn-default-border-radius-border",
              },
            },
          },
          {
            id: "btn_default_hover_border",
            label: "Hover",
            sub_attributes: [
              {
                id: "btn_default_hover_text_border",
                label: "Text",
                components: {
                  background_color: {
                    name: "--tw-theme-btn-default-hover-text-color-border",
                  },
                },
              },
              {
                id: "btn_default_hover_background_border",
                label: "Background",
                components: {
                  background_color: {
                    name: "--tw-theme-btn-default-hover-bg-color-border",
                  },
                },
              },
              {
                id: "btn_default_border_border_hover",
                label: "Border Hover",
                components: {
                  font_size: {
                    name: "--tw-theme-btn-default-border-width-border-hover",
                  },
                },
              },
              {
                id: "btn_default_border_color_border_hover",
                label: "Border Hover Color",
                components: {
                  background_color: {
                    name: "--tw-theme-btn-default-border-color-border-hover",
                  },
                },
              },
            ],
          },
        ],
      },
      {
        id: "primary-border-border",
        label: "Primary Border",
        sub_attributes: [
          {
            id: "btn_primary_text_border",
            label: "Text",
            components: {
              background_color: {
                name: "--tw-theme-btn-primary-text-color-border",
              },
            },
          },
          {
            id: "btn_primary_background_border",
            label: "Background",
            components: {
              background_color: {
                name: "--tw-theme-btn-primary-bg-color-border",
              },
            },
          },
          {
            id: "btn_primary_border_border",
            label: "Border",
            components: {
              font_size: {
                name: "--tw-theme-btn-primary-border-width-border",
              },
            },
          },
          {
            id: "btn_primary_border_color_border",
            label: "Border Color",
            components: {
              background_color: {
                name: "--tw-theme-btn-primary-border-color-border",
              },
            },
          },
          {
            id: "btn_primary_corner_border",
            label: "Corner",
            components: {
              font_size: {
                name: "--tw-theme-btn-primary-border-radius-border",
              },
            },
          },
          {
            id: "btn_primary_hover_border",
            label: "Hover",
            sub_attributes: [
              {
                id: "btn_primary_hover_text_border",
                label: "Text",
                components: {
                  background_color: {
                    name: "--tw-theme-btn-primary-hover-text-color-border",
                  },
                },
              },
              {
                id: "btn_primary_hover_background_border",
                label: "Background",
                components: {
                  background_color: {
                    name: "--tw-theme-btn-primary-hover-bg-color-border",
                  },
                },
              },
              {
                id: "btn_primary_border_border_hover",
                label: "Border Hover",
                components: {
                  font_size: {
                    name: "--tw-theme-btn-primary-border-width-border-hover",
                  },
                },
              },
              {
                id: "btn_primary_border_color_border_hover",
                label: "Border Hover Color",
                components: {
                  background_color: {
                    name: "--tw-theme-btn-primary-border-color-border-hover",
                  },
                },
              },
            ],
          },
        ],
      },
      {
        id: "secondary-border-border",
        label: "Secondary Border",
        sub_attributes: [
          {
            id: "btn_secondary_text_border",
            label: "Text",
            components: {
              background_color: {
                name: "--tw-theme-btn-secondary-text-color-border",
              },
            },
          },
          {
            id: "btn_secondary_background_border",
            label: "Background",
            components: {
              background_color: {
                name: "--tw-theme-btn-secondary-bg-color-border",
              },
            },
          },
          {
            id: "btn_secondary_border_border",
            label: "Border",
            components: {
              font_size: {
                name: "--tw-theme-btn-secondary-border-width-border",
              },
            },
          },
          {
            id: "btn_secondary_border_color_border",
            label: "Border Color",
            components: {
              background_color: {
                name: "--tw-theme-btn-secondary-border-color-border",
              },
            },
          },
          {
            id: "btn_secondary_corner_border",
            label: "Corner",
            components: {
              font_size: {
                name: "--tw-theme-btn-secondary-border-radius-border",
              },
            },
          },
          {
            id: "btn_secondary_hover_border",
            label: "Hover",
            sub_attributes: [
              {
                id: "btn_secondary_hover_text_border",
                label: "Text",
                components: {
                  background_color: {
                    name: "--tw-theme-btn-secondary-hover-text-color-border",
                  },
                },
              },
              {
                id: "btn_secondary_hover_background_border",
                label: "Background",
                components: {
                  background_color: {
                    name: "--tw-theme-btn-secondary-hover-bg-color-border",
                  },
                },
              },
              {
                id: "btn_secondary_border_border_hover",
                label: "Border Hover",
                components: {
                  font_size: {
                    name: "--tw-theme-btn-secondary-border-width-border-hover",
                  },
                },
              },
              {
                id: "btn_secondary_border_color_border_hover",
                label: "Border Hover Color",
                components: {
                  background_color: {
                    name: "--tw-theme-btn-secondary-border-color-border-hover",
                  },
                },
              },
            ],
          },
        ],
      },
      {
        id: "tertiary-border-border",
        label: "Tertiary Border",
        sub_attributes: [
          {
            id: "btn_tertiary_text_border",
            label: "Text",
            components: {
              background_color: {
                name: "--tw-theme-btn-tertiary-text-color-border",
              },
            },
          },
          {
            id: "btn_tertiary_background_border",
            label: "Background",
            components: {
              background_color: {
                name: "--tw-theme-btn-tertiary-bg-color-border",
              },
            },
          },
          {
            id: "btn_tertiary_border_border",
            label: "Border",
            components: {
              font_size: {
                name: "--tw-theme-btn-tertiary-border-width-border",
              },
            },
          },
          {
            id: "btn_tertiary_border_color_border",
            label: "Border Color",
            components: {
              background_color: {
                name: "--tw-theme-btn-tertiary-border-color-border",
              },
            },
          },
          {
            id: "btn_tertiary_corner_border",
            label: "Corner",
            components: {
              font_size: {
                name: "--tw-theme-btn-tertiary-border-radius-border",
              },
            },
          },
          {
            id: "btn_tertiary_hover_border",
            label: "Hover",
            sub_attributes: [
              {
                id: "btn_tertiary_hover_text_border",
                label: "Text",
                components: {
                  background_color: {
                    name: "--tw-theme-btn-tertiary-hover-text-color-border",
                  },
                },
              },
              {
                id: "btn_tertiary_hover_background_border",
                label: "Background",
                components: {
                  background_color: {
                    name: "--tw-theme-btn-tertiary-hover-bg-color-border",
                  },
                },
              },
              {
                id: "btn_tertiary_border_border_hover",
                label: "Border Hover",
                components: {
                  font_size: {
                    name: "--tw-theme-btn-tertiary-border-width-border-hover",
                  },
                },
              },
              {
                id: "btn_tertiary_border_color_border_hover",
                label: "Border Hover Color",
                components: {
                  background_color: {
                    name: "--tw-theme-btn-tertiary-border-color-border-hover",
                  },
                },
              },
            ],
          },
        ],
      },
      {
        id: "quaternary-border-border",
        label: "Quaternary Border",
        sub_attributes: [
          {
            id: "btn_quaternary_text_border",
            label: "Text",
            components: {
              background_color: {
                name: "--tw-theme-btn-quaternary-text-color-border",
              },
            },
          },
          {
            id: "btn_quaternary_background_border",
            label: "Background",
            components: {
              background_color: {
                name: "--tw-theme-btn-quaternary-bg-color-border",
              },
            },
          },
          {
            id: "btn_quaternary_border_border",
            label: "Border",
            components: {
              font_size: {
                name: "--tw-theme-btn-quaternary-border-width-border",
              },
            },
          },
          {
            id: "btn_quaternary_border_color_border",
            label: "Border Color",
            components: {
              background_color: {
                name: "--tw-theme-btn-quaternary-border-color-border",
              },
            },
          },
          {
            id: "btn_quaternary_corner_border",
            label: "Corner",
            components: {
              font_size: {
                name: "--tw-theme-btn-quaternary-border-radius-border",
              },
            },
          },
          {
            id: "btn_quaternary_hover_border",
            label: "Hover",
            sub_attributes: [
              {
                id: "btn_quaternary_hover_text_border",
                label: "Text",
                components: {
                  background_color: {
                    name: "--tw-theme-btn-quaternary-hover-text-color-border",
                  },
                },
              },
              {
                id: "btn_quaternary_hover_background_border",
                label: "Background",
                components: {
                  background_color: {
                    name: "--tw-theme-btn-quaternary-hover-bg-color-border",
                  },
                },
              },
              {
                id: "btn_quaternary_border_border_hover",
                label: "Border Hover",
                components: {
                  font_size: {
                    name: "--tw-theme-btn-quaternary-border-width-border-hover",
                  },
                },
              },
              {
                id: "btn_quaternary_border_color_border_hover",
                label: "Border Hover Color",
                components: {
                  background_color: {
                    name: "--tw-theme-btn-quaternary-border-color-border-hover",
                  },
                },
              },
            ],
          },
        ]
      }
    ],
  },
  {
    id: "link",
    label: "Link",
    sub_attributes: [
      {
        id: "default",
        label: "Default",
        sub_attributes: [
          {
            id: "color",
            label: "Color",
            components: {
              'background_color': {
                name: '--tw-theme-link-default-color',
              }
            }
          },
          {
            id: "hover_color",
            label: "Hover Color",
            components: {
              'background_color': {
                name: "--tw-theme-link-default-hover-color",
              },
            },
          },
          {
            id: "text_decoration",
            label: "Text Decoration",
            components: {
              'text_decoration': {
                name: '--tw-theme-link-default-text-decoration'
              }
            },
          },
        ],
      },
      {
        id: "primary",
        label: "Primary",
        sub_attributes: [
          {
            id: "color",
            label: "Color",
            components: {
              'background_color': {
                name: '--tw-theme-link-primary-color',
              }
            }
          },
          {
            id: "hover_color",
            label: "Hover Color",
            components: {
              'background_color': {
                name: "--tw-theme-link-primary-hover-color",
              },
            },
          },
          {
            id: "text_decoration",
            label: "Text Decoration",
            components: {
              'text_decoration': {
                name: '--tw-theme-link-primary-text-decoration'
              }
            },
          },
        ],
      },
      {
        id: "secondary",
        label: "Secondary",
        sub_attributes: [
          {
            id: "color",
            label: "Color",
            components: {
              'background_color': {
                name: '--tw-theme-link-secondary-color',
              }
            }
          },
          {
            id: "hover_color",
            label: "Hover Color",
            components: {
              'background_color': {
                name: "--tw-theme-link-secondary-hover-color",
              },
            },
          },
          {
            id: "text_decoration",
            label: "Text Decoration",
            components: {
              'text_decoration': {
                name: '--tw-theme-link-secondary-text-decoration'
              }
            },
          },
        ],
      },
      {
        id: "tertiary",
        label: "Tertiary",
        sub_attributes: [
          {
            id: "color",
            label: "Color",
            components: {
              'background_color': {
                name: '--tw-theme-link-tertiary-color',
              }
            }
          },
          {
            id: "hover_color",
            label: "Hover Color",
            components: {
              'background_color': {
                name: "--tw-theme-link-tertiary-hover-color",
              },
            },
          },
          {
            id: "text_decoration",
            label: "Text Decoration",
            components: {
              'text_decoration': {
                name: '--tw-theme-link-tertiary-text-decoration'
              }
            },
          },
        ],
      },
      {
        id: "quaternary",
        label: "Quaternary",
        sub_attributes: [
          {
            id: "color",
            label: "Color",
            components: {
              'background_color': {
                name: '--tw-theme-link-quaternary-color',
              }
            }
          },
          {
            id: "hover_color",
            label: "Hover Color",
            components: {
              'background_color': {
                name: "--tw-theme-link-quaternary-hover-color",
              },
            },
          },
          {
            id: "text_decoration",
            label: "Text Decoration",
            components: {
              'text_decoration': {
                name: '--tw-theme-link-quaternary-text-decoration'
              }
            },
          },
        ],
      },
    ]
  },
  {
    id: "bodybg",
    label: "Body Background",
    components: {
      background_color: {
        name: "--tw-theme-body-bg-color",
      }
    }
  }
];

export const storeMyAccountPageProperty = [
  {
    id: "CustomizeLogoTemplate",
    label: "Customize Logo Template",
    components: [
      {
        Component: "ToggleButton",
        name: "customize_logo",
        title: "Customize Logo",
      },
      {
        Component: "RadioButtonGroup",
        name: "customizeLogoTemplate",
        conditionalRender: "customize_logo",
        options: CustomizeLogoType
      },

    ],
  },

  {
    id: "MyAccountTemplate",
    label: "My Account Template",
    components: [
      {
        Component: "ListingLayoutSelect",
        name: "myAccountTemplateId",
      },
    ],
  },

]
export const storeCartPageProperty = [
  {
    id: "CartPageTemplate",
    label: "Cart Page Layout",
    components: [
      {
        Component: "ListingLayoutSelect",
        name: "cartPageTemplateId",
        // options: MyAccountType,
      },
    ],
  },
  {
    id: "BuyItWith",
    label: "Buy it with",
    components: [
      {
        Component: "BuyItWith",
        name: "buy_it_with",
        // options: MyAccountType,
      },
    ],
  },

]



export const storeSettingProductPageDate = [
  // {
  //   id: "ProductGalleryOption",
  //   label: "Product Gallery Option",
  //   components: [
  //     {
  //       Component: "ProductGallerySlideStyle",
  //       name: "prodOpt_SlideStyle",
  //     },
  //     {
  //       Component: "ToggleButton",
  //       name: "prodOpt_thumbnailSlider",
  //       title: "Thumbnail Slider",
  //     },
  //     {
  //       Component: "ToggleButton",
  //       name: "prodOpt_productZoom",
  //       title: "Product Zoom",
  //     },
  //     {
  //       Component: "ToggleButton",
  //       name: "prodOpt_productSticky",
  //       title: "Product Sticky",
  //     },
  //   ],
  // },
  // {
  //   id: "ProductInformation",
  //   label: "Product Information",
  //   components: [
  //     // {
  //     //   Component: "ToggleButton",
  //     //   name: "prodInfo_productTitle",
  //     //   title: "Product Title",
  //     // },
  //     // {
  //     //   Component: "Dropdown",
  //     //   name: "prodInfo_productTitleFontSize",
  //     //   title: "Font Size",
  //     //   options: FontSizeOptionDetailPage,
  //     //   conditionalRender: "prodInfo_productTitle",
  //     // },
  //     // {
  //     //   Component: "Dropdown",
  //     //   name: "prodInfo_productTitleTextStyle",
  //     //   title: "Text Style",
  //     //   options: TextStyleSizeOptionDetailPage,
  //     //   conditionalRender: "prodInfo_productTitle",
  //     // },
  //     // {
  //     //   Component: "ToggleButton",
  //     //   name: "prodInfo_productprice",
  //     //   title: "Product Price",
  //     // },
  //     // {
  //     //   Component: "ToggleButton",
  //     //   name: "prodInfo_productVarient",
  //     //   title: "Product Varient",
  //     // },
  //     // {
  //     //   Component: "RadioButtonGroup",
  //     //   name: "prodInfo_productVarientType",
  //     //   options: ViewOptions,
  //     //   conditionalRender: "prodInfo_productVarient",
  //     // },
  //     // {
  //     //   Component: "ToggleButton",
  //     //   name: "prodInfo_shortDescription",
  //     //   title: "Shot Description",
  //     // },
  //     // {
  //     //   Component: "Dropdown",
  //     //   name: "prodInfo_shortDescriptionFontSize",
  //     //   title: "Font Size",
  //     //   options: FontSizeOptionDetailPage,
  //     //   conditionalRender: "prodInfo_shortDescription",
  //     // },
  //     // {
  //     //   Component: "Dropdown",
  //     //   name: "prodInfo_shortDescriptionTextStyle",
  //     //   title: "Text Style",
  //     //   options: TextStyleSizeOptionDetailPage,
  //     //   conditionalRender: "prodInfo_shortDescription",
  //     // },

  //     {
  //       Component: "ToggleButton",
  //       name: "prodInfo_shortDescription",
  //       title: "Shot Description",
  //     },
  //     {
  //       Component: "ToggleButton",
  //       name: "prodInfo_productRating",
  //       title: "Product Rating",
  //     },
  //     {
  //       Component: "ToggleButton",
  //       name: "prodInfo_availability",
  //       title: "Availablity",
  //     },
  //     {
  //       Component: "ToggleButton",
  //       name: "prodInfo_productVarient",
  //       title: "Product Varient",
  //     },
  //     {
  //       Component: "ToggleButton",
  //       name: "prodInfo_companionProduct",
  //       title: "Companion Product",
  //     },
  //     {
  //       Component: "ToggleButton",
  //       name: "prodInfo_addToCart",
  //       title: "Add to Cart Button",
  //     },
  //     {
  //       Component: "AddToCartButtonOption",
  //       name: "addToCart[text]",
  //       conditionalRender: "prodInfo_addToCart",
  //     },
  //     // {
  //     //   Component: "AddToCartButton",
  //     //   name: "prodInfo_addToCartButton",
  //     //   conditionalRender: "prodInfo_addToCart",
  //     // },
  //     // {
  //     //   Component: "ToggleButton",
  //     //   name: "prodInfo_accordion",
  //     //   title: "Product Accordion",
  //     // },
  //     // {
  //     //   Component: "Dropdown",
  //     //   name: "prodInfo_accordionFontSize",
  //     //   title: "Accordion Title Font Size",
  //     //   options: FontSizeOptionDetailPage,
  //     //   conditionalRender: "prodInfo_accordion",
  //     // },
  //     // {
  //     //   Component: "Dropdown",
  //     //   name: "prodInfo_accordionTextStyle",
  //     //   title: "Accordion Title Text style",
  //     //   options: TextStyleSizeOptionDetailPage,
  //     //   conditionalRender: "prodInfo_accordion",
  //     // },
  //   ],
  // },
  {
    id: "ProductDetailTemplate",
    label: "Template Layout Select",
    components: [
      {
        Component: "ListingLayoutSelect",
        name: "productDetailTemplateId",
      },
    ],
  },
  {
    id: "ProductSectionDisplay",
    label: "Product Section Display",
    components: [

      {
        Component: "ProductSectionDisplayComponent",
        name: "prodSecDisp_columnSelect",
        label: "You May Also Like "
      },

      // {
      //   Component: "ColumnSelect",
      //   name: "prodSecDisp_columnSelect",
      // },
      // {
      //   Component: "Alignment",
      //   name: "prodSecDisp_alignment",
      //   title: "Alignment",
      // },
      // {
      //   Component: "ToggleButton",
      //   name: "prodSecDisp_brand",
      //   title: "Brand",
      // },
      // {
      //   Component: "ToggleButton",
      //   name: "prodSecDisp_productName",
      //   title: "Product Name",
      // },
      // {
      //   Component: "Dropdown",
      //   name: "prodSecDisp_productNameFontSize",
      //   title: "Font Size",
      //   options: FontSizeOptionDetailPage,
      //   conditionalRender: "prodSecDisp_productName",
      // },
      // {
      //   Component: "Dropdown",
      //   name: "prodSecDisp_productNameTextStyle",
      //   title: "Text Style",
      //   options: TextStyleSizeOptionDetailPage,
      //   conditionalRender: "prodSecDisp_productName",
      // },
      // {
      //   Component: "ColorPicker",
      //   name: "prodSecDisp_productNameColor",
      //   title: "Color",
      //   conditionalRender: "prodSecDisp_productName",
      // },
      // {
      //   Component: "ToggleButton",
      //   name: "prodSecDisp_price",
      //   title: "Price",
      // },
      // {
      //   Component: "ToggleButton",
      //   name: "prodSecDisp_color",
      //   title: "Color",
      // },
      // {
      //   Component: "Dropdown",
      //   name: "prodSecDisp_colorViewOptions",
      //   title: "View Options",
      //   options: ViewOptions,
      //   conditionalRender: "prodSecDisp_colorViewOptions",
      // },
      // {
      //   Component: "ToggleButton",
      //   name: "prodSecDisp_shortDescription",
      //   title: "Shot Description",
      // },
      // {
      //   Component: "Dropdown",
      //   name: "prodSecDisp_shortDescriptionFontSize",
      //   title: "Font Size",
      //   options: FontSizeOptionDetailPage,
      //   conditionalRender: "prodSecDisp_shortDescription",
      // },
      // {
      //   Component: "Dropdown",
      //   name: "prodSecDisp_shortDescriptionTextStyle",
      //   title: "Text Style",
      //   options: TextStyleSizeOptionDetailPage,
      //   conditionalRender: "prodSecDisp_shortDescription",
      // },
      // {
      //   Component: "ToggleButton",
      //   name: "prodSecDisp_productRating",
      //   title: "Product Rating",
      // },
      // {
      //   Component: "ToggleButton",
      //   name: "prodSecDisp_availability",
      //   title: "Availablity",
      // },
      // {
      //   Component: "ToggleButton",
      //   name: "prodSecDisp_addToCartButton",
      //   title: "Add to Cart Button",
      // },
      // {
      //   Component: "ToggleButton",
      //   name: "prodSecDisp_tags",
      //   title: "Tags",
      // },
      // {
      //   Component: "Dropdown",
      //   name: "prodSecDisp_tagsWishlist",
      //   title: "Wishlist",
      //   options: WishlistOption,
      //   conditionalRender: "prodSecDisp_tags",
      // },
      // {
      //   Component: "Dropdown",
      //   name: "prodSecDisp_tagsSaleNewArrivalHot",
      //   title: "Sale / New Arrival / Hot",
      //   options: WishlistOption,
      //   conditionalRender: "prodSecDisp_tags",
      // },
    ],
  },
];

export const storeCategoryListProperty = [
  {
    id: "promotionalText1",
    label: "Promotional Text 1",
    components: [
      {
        Component: "CKEditor",
        name: "promotionalText1",
      },
    ],
  },
  {
    id: "BannerSection",
    label: "Banner Section",
    components: [
      {
        Component: "RadioButtonGroup",
        name: "bannertype",
        options: BannerType,
      },
    ],
  },
  {
    id: "promotionalText2",
    label: "Promotional Text 2",
    components: [
      {
        Component: "CKEditor",
        name: "promotionalText2",
      },
    ],
  },
  {
    id: "categoryListingOptions",
    label: "Category Listing Options",
    components: [
      {
        Component: "ColumnSelect",
        name: "categoryListOpt_columnSelect",
      },
      // {
      //   Component: "Dropdown",
      //   name: "categoryListOpt_titleFontSize",
      //   title: "Select Title Text Size",
      //   options: FontSizeOptionDetailPage,
      // },
      // {
      //   Component: "ColorPicker",
      //   name: "categoryListOpt_TextColor",
      //   title: "Select Title Text color",
      // },
      // {
      //   Component: "ToggleButton",
      //   name: "categoryListOpt_backgroundOverlay",
      //   title: "Background Overlay Color",
      // },
      // {
      //   Component: "ColorPicker",
      //   name: "categoryListOpt_backgroundOverlayColor",
      //   title: "Select Background Overlay color",
      //   conditionalRender: "categoryListOpt_backgroundOverlay",
      // },
      // {
      //   Component: "VerticalAlign",
      //   name: "categoryListOpt_textVerticalAlign",
      //   title: "Title Text Vertical Align",
      // },
      // {
      //   Component: "Alignment",
      //   name: "categoryListOpt_texthorizontalAlign",
      //   title: "Title Text Horizontal Align",
      // },
    ],
  },
  {
    id: "layout",
    label: "Layout",
    components: [
      {
        Component: "LayoutSelect",
        name: "categoryListOpt_layoutSelect",
      },
    ],
  },
];

export const IconTypeForHeader = [
  { value: "fontawesome", name: "fontawesome", label: "Font Awesome Icon" },
  { value: "customimage", name: "fontawesome", label: "Upload Coustom Image" }
];

export const HeaderIconSetting = [
  {
    id: "fisth_icon",
    label: "1st Icon",
    title: "first_icon",
    components: [
      {
        name: "first_icon_option",
        options: IconTypeForHeader
      },
    ],
  },
  {
    id: "fisth_icon",
    label: "2nd Icon",
    title: "second_icon",
    components: [
      {
        name: "second_icon_option",
        options: IconTypeForHeader
      },
    ],
  },
  {
    id: "fisth_icon",
    label: "3rd Icon",
    title: "third_icon",
    components: [
      {
        name: "third_icon_option",
        options: IconTypeForHeader
      },
    ],
  },
  {
    id: "fisth_icon",
    label: "4th Icon",
    title: "forth_icon",
    components: [
      {
        name: "forth_icon_option",
        options: IconTypeForHeader
      },
    ],
  },
  {
    id: "fisth_icon",
    label: "5th Icon",
    title: "fisth_icon",
    components: [
      {
        name: "fifth_icon_option",
        options: IconTypeForHeader
      },
    ],
  },
];

export const storeProductListProperty = [
  {
    id: "promotionalText1",
    label: "Promotional Text 1",
    components: [
      {
        Component: "CKEditor",
        name: "promotionalText1",
      },
    ],
  },
  {
    id: "BannerSection",
    label: "Banner Section",
    components: [
      {
        Component: "RadioButtonGroup",
        name: "bannertype",
        options: BannerType,
      },
    ],
  },
  {
    id: "BreadcrumbSection",
    label: "Bread Crumb Section",
    components: [
      {
        Component: "ListingLayoutSelect",
        name: "breadCrumbTemplateId",
        // options: BreadCrumbType,
      },
    ],
  },
  {
    id: "promotionalText2",
    label: "Promotional Text 2",
    components: [
      {
        Component: "CKEditor",
        name: "promotionalText2",
      },
    ],
  },
  {
    id: "filters",
    label: "Filter",
    components: [
      {
        Component: "RadioButtonGroup",
        name: "filter",
        options: [
          { value: "none", label: "None" },
          { value: "floyout", label: "Floyout" },
          { value: "leftSide", label: "Left Side" },
        ],
      },
      {
        Component: "LeftRight",
        name: "floyout_alignment",
        title: "flyout Alignment",
        conditionalRender: 'filter',
        conditionalValue: 'floyout'

      },
    ],
  },

  // {
  //   id: "productListingOptions",
  //   label: "Product Listing Options",
  //   components: [
  //     {
  //       Component: "ColumnSelect",
  //       name: "productListOpt_columnSelect",
  //     },
  //     {
  //       Component: "Alignment",
  //       name: "productListOpt_alignment",
  //       title: "Alignment",
  //     },
  //     {
  //       Component: "ToggleButton",
  //       name: "productListOpt_availability",
  //       title: "Availablity",
  //     },
  //     {
  //       Component: "ToggleButton",
  //       name: "productListOpt_brand",
  //       title: "Brand",
  //     },
  //     {
  //       Component: "ToggleButton",
  //       name: "productListOpt_personalize",
  //       title: "Personalize",
  //     },
  //     {
  //       Component: "ToggleButton",
  //       name: "productListOpt_productName",
  //       title: "Product Name",
  //     },
  //     {
  //       Component: "Dropdown",
  //       name: "productListOpt_productNameFontSize",
  //       title: "Font Size",
  //       options: FontSizeOptionDetailPage,
  //       conditionalRender: "productListOpt_productName",
  //     },
  //     {
  //       Component: "Dropdown",
  //       name: "productListOpt_productNameTextStyle",
  //       title: "Text Style",
  //       options: TextStyleSizeOptionDetailPage,
  //       conditionalRender: "productListOpt_productName",
  //       isMulti: true,
  //     },
  //     {
  //       Component: "ColorPicker",
  //       name: "productListOpt_productNameColor",
  //       title: "Color",
  //       conditionalRender: "productListOpt_productName",
  //     },
  //     {
  //       Component: "ToggleButton",
  //       name: "productListOpt_price",
  //       title: "Price",
  //     },
  //     {
  //       Component: "ToggleButton",
  //       name: "productListOpt_compare",
  //       title: "Compare",
  //     },
  //     {
  //       Component: "ToggleButton",
  //       name: "productListOpt_color",
  //       title: "Color",
  //     },
  //     {
  //       Component: "Dropdown",
  //       name: "productListOpt_colorViewOptions",
  //       title: "View Options",
  //       options: ViewOptions,
  //       conditionalRender: "productListOpt_color",
  //     },
  //     {
  //       Component: "ToggleButton",
  //       name: "productListOpt_addToCartButton",
  //       title: "Add to Cart Button",
  //     },
  //     {
  //       Component: "ToggleButton",
  //       name: "productListOpt_tags",
  //       title: "Tags",
  //     },
  //     {
  //       Component: "Dropdown",
  //       name: "productListOpt_tagsWishlist",
  //       title: "Wishlist",
  //       options: WishlistOption,
  //       conditionalRender: "productListOpt_tags",
  //     },
  //     {
  //       Component: "Dropdown",
  //       name: "tagsSaleNewArrivalHot",
  //       title: "Sale / New Arrival / Hot",
  //       options: WishlistOption,
  //       conditionalRender: "productListOpt_tags",
  //     },
  //     {
  //       Component: "ToggleButton",
  //       name: "productListOpt_productCount",
  //       title: "Product Count",
  //     },
  //     {
  //       Component: "ToggleButton",
  //       name: "productListOpt_ShortDesc",
  //       title: "Short Description",
  //     },
  //     {
  //       Component: "Input",
  //       name: "productListOpt_viewMoreButton",
  //       title: "View more button Text",
  //       defaultValue: "View More",
  //     },

  //   ],
  // },
  {
    id: "listingTemplate",
    label: "Listing Template",
    components: [
      {
        Component: "ListingLayoutSelect",
        name: "templateID",
        // options: TemplateType,
      },
    ],
  },

];

export const productType = {
  General: -3,
  GMC: -2,
  MC: -1,
  Bundle: 0,
  CorporateStore: 1,
  EcommerceStore: 2,
  StoreBuilder: 3,
  StoreBuilderStoreType: 4,
  FormBuilder: 5,
};

export const StoreTypeFilter = [{
  label: "Corporate Store",
  value: 1
},
{
  label: "Ecommerce Store",
  value: 2
},
{
  label: "Store Builder",
  value: 3
},
{
  label: "Form Builder",
  value: 5
}]

export const StoreExportTypes = {
  [productType.GMC]: ['GrandMasterProduct'],
  [productType.MC]: [
    'MasterProductInventoryThirdParty',
    'MasterProductCatelogUPC', //catalog spelling wrong from API side
    'MasterProductCatelogProductColor',
    'MasterProductCatelogPrice',
    'MasterProductCatelogOptionProduct',
    'MasterProductCatelogInventory',
    'MasterProductCatelogFlydate',
    'MasterProductCatelogFacetColor',
    'MasterProductCatelogCompanion',
    'MasterProductCatelogCategory',
    'MasterProductCatelogAltImage',
    'MasterProductCatelog'
  ],
  [productType?.EcommerceStore]: [
    'StoreProductMinQty',
    'StoreProductLogoLocation',
    'StoreProductCompanion',
    'StoreProduct',
    'StoreOptionProduct',
    'QuantityDiscount',
    'StoreProdutSEO',
    'StoreAltImageTag'
  ],
  [productType?.CorporateStore]: [
    'StoreProductMinQty',
    'StoreProductLogoLocation',
    'StoreProductCompanion',
    'StoreProduct',
    'StoreOptionProduct',
    'QuantityDiscount'
  ],
  [productType?.StoreBuilderStoreType]: [
    'StoreProductMinQty',
    'StoreProductLogoLocation',
    'StoreProductCompanion',
    'StoreProduct',
    'StoreOptionProduct',
    'QuantityDiscount'
  ],
  [productType?.General]: [
    'QuantityDiscount'
  ]
}
export const pageEditPasswordExpirationTime = [
  { value: "30", label: "30 Days" },
  { value: "60", label: "60 Days" },
  { value: "90", label: "90 Days" },
  { value: "120", label: "120 Days" },
];
export const CompanyId = 1;

export const ContentPageType = {
  Website: "Website",
  Landing: "Landing",
  Blog: "Blog",
};

export const StoreBuilderCreateSteps = [
  { id: 0, step: "01", label: "Setup", component: "setup" },
  { id: 1, step: "02", label: "General", component: "general" },
  { id: 2, step: "03", label: "Payment & Info", component: "paymentInfo" },
  { id: 3, step: "04", label: "Taxes & fees", component: "tax" },
  { id: 4, step: "05", label: "Messages", component: "message" },
  { id: 5, step: "06", label: "Template", component: "template" },
  { id: 6, step: "07", label: "Category", component: "category" },
  { id: 7, step: "08", label: "Products", component: "product" },
  { id: 8, step: "09", label: "Sequence", component: "sequence" },
  { id: 9, step: "10", label: "Report", component: "report" },
  { id: 10, step: "11", label: "Share Report", component: "shareReport" },

];

export const StoreBuilderShippingChargesOptions = [
  { value: 1, label: "Individual" },
  { value: 2, label: "School" },
];

export const StoreBuilderShippingMethodsOptions = [
  { value: 1, label: "Free Shipping" },
  { value: 2, label: "Flat Fee" },
  { value: 3, label: "Tiered Shipping" },
  { value: 4, label: "Runtime Charges" },
];

export const StorePagesObject = [
  // { label: "Category Page", value: "categoryPage" },
  { label: "Listing Page", value: "productListing" },
  { label: "Product Page", value: "productDetail" },
  { label: "My Account Page", value: "myAccountPage" },
  { label: "Cart Page", value: "cartPage" }
];

export const LandingPagesDropdown = [
  { value: 1, label: "Default Page" },
  { value: 2, label: "Landing Page 1" },
  { value: 3, label: "Landing Page 2" },
  { value: 4, label: "Landing Page 3" },
  { value: 5, label: "Landing Page 4" },
];

export const paymentStatus = [
  { label: 'ARIBA', value: 'ARIBA' },
  { label: 'ARIBA AUTHORIZED', value: 'ARIBA AUTHORIZED' },
  { label: 'Authorized', value: 'Authorized' },
  { label: 'COUPA AUTHORIZED', value: 'COUPA AUTHORIZED' },
  { label: 'CAPTURE', value: 'CAPTURE' },
  { label: 'CAPTURED', value: 'CAPTURED' },
  { label: 'CANCELED', value: 'CANCELED' },
  { label: 'Expired', value: 'E' },
  { label: 'FRAUD', value: 'FRAUD' },
  { label: 'PENDING', value: 'PENDING' },

  // { label: 'Overdue', value: 'overdue' },
  // { label: 'Paid', value: 'paid' },
  // { label: 'Partially paid', value: 'partiallyPaid' },
  // { label: 'Partially refunded', value: 'partiallyRefunded' },
  // { label: 'Refunded', value: 'refunded' },
  // { label: 'Unpaid', value: 'unpaid' },
  // { label: 'Voided', value: 'voided' },
];
// export const orderStatus = [
//   { label: 'Canceled', value: 'Canceled' },
//   { label: 'New', value: 'New' },
//   { label: 'Authorized', value: 'Authorized' },
//   { label: 'Partially Shipped', value: 'Partially Shipped' },
//   { label: 'Pending', value: 'Pending' },
//   { label: 'Shipped', value: 'Shipped' },
// ];

export const storeBuildernavlocationcodeOptions = [
  { value: 'GPK', label: "GPK" },
  // { value: 'GDEC', label: "GDEC" },
  { value: 'PK', label: "PK" },
  { value: 'DROPSHIP', label: "DROPSHIP" },
];
