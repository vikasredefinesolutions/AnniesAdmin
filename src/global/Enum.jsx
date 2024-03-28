import { ValidationMsgs } from "./ValidationMessages";

export const defaultImage = ``;

export const fontSizeClassOption = [
  { class: "text-xs", value: "Extral Small" },
  { class: "text-sm", value: "Small" },
  { class: "text-base", value: "Normal" },
  { class: "text-lg", value: "Large" },
  { class: "text-xl", value: "Extra Large" },
  { class: "text-2xl", value: "2 XL" },
  { class: "text-3xl", value: "3 XL" },
];

export const anniesAnnualData = {
  storeId: "5",
  brandId: 1,
  vendorId: 1,
  categoryId: 0,
  storeName: "anniesAnnuals",
  storeType: "eCommerceStore",
  project: "Annies Annual & Perennials",
  storeUrl: "https://anniesannuals.redefineapp.io",
  // storeUrl:"https://beta-anniesannuals.redefineapp.io"
  // storeUrl:"https://anniesannuals.redefineapp.com"
};

export const FilteringOperator = {
  Empty: 0,
  Contains: 1,
  Not_Contains: 2,
  LT: 3,
  LE: 4,
  GT: 5,
  GE: 6,
  NE: 7,
  EQ: 8,
  StartsWith: 9,
  EndsWith: 10,
  RangeInclusive: 11,
  RangeExclusive: 12,
  IN: 13,
  NOT_IN: 14,
  IN_CONTAINS: 15,
  NOT_IN_CONTAINS: 16,
};

export const FilteringOptions = [
  { value: 0, label: "Equal" },
  { value: 1, label: "Not Equal" },
  { value: 2, label: "Less Than" },
  { value: 3, label: "Less Than Or Equal" },
  { value: 4, label: "Greater Than" },
  { value: 5, label: "Greater Than Or Equal" },
  { value: 6, label: "Contains" },
  { value: 7, label: "Not Contains" },
  { value: 8, label: "Starts With" },
  { value: 9, label: "Not Starts With" },
  { value: 10, label: "Ends With" },
  { value: 11, label: "Not Ends With" },
  { value: 12, label: "NUll" },
  { value: 13, label: "Not NUll" },
  { value: 14, label: "Empty" },
  { value: 15, label: "Not Empty" },
  { value: 16, label: "Between" },
  { value: 17, label: "Not Between" },
  { value: 18, label: "In List" },
  { value: 19, label: "Not In List" },
];

export const RecStatusValue = [
  {
    label: "Active",
    value: "A",
  },
  {
    label: "Inactive",
    value: "I",
  },
];

export const StatusValue = [
  {
    label: "Approved",
    value: "A",
  },
  {
    label: "Pending",
    value: "P",
  },
  {
    label: "Disapproved",
    value: "I",
  },
];

export const AssetLibraryStatusValue = [
  { value: "A", label: "Active files" },
  { value: "R", label: "Archived files" },
];
export const AssetLibraryTypesValue = [
  { value: "all", label: "All Type" },
  { value: "doc", label: "Documents" },
  { value: "img", label: "Images" },
  { value: "vid", label: "Video" },
];

export const RecStatusValueForUserList = {
  A: "Active",
  I: "Inactive",
  D: "Draft",
  P: "Pending",
};

export const RecStatusValueForForm = [
  {
    label: "Active",
    value: "A",
  },
  {
    label: "Inactive",
    value: "I",
  },
  {
    label: "Draft",
    value: "D",
  },
];

export const RecStatusValueForCustomerReview = [
  {
    label: "Approve",
    value: "A",
  },
  {
    label: "Disapproved",
    value: "X",
  },
];
export const RecStatusValueForMorFilter = [
  {
    label: "Active",
    value: "A",
  },
  {
    label: "Inactive",
    value: "I",
  },
  {
    label: "Pending",
    value: "P",
  },
];

export const RecStatusValueForPromotionFilter = [
  {
    label: "Active",
    value: "A",
  },
  {
    label: "Inactive",
    value: "I",
  },
  {
    label: "Scheduled",
    value: "S",
  },
  {
    label: "Expired",
    value: "E",
  },
];

export const RecStatusValueForCustomerApproval = [
  {
    label: "Approve",
    value: "Approve",
  },
  {
    label: "Reject",
    value: "Reject",
  },
  {
    label: "Pending",
    value: "Pending",
  },
  {
    label: "ASI Distributor",
    value: "S",
  },
];

export const RecStatusValueName = {
  Active: "Active",
  Inactive: "Inactive",
  Draft: "Draft",
  Pending: "Pending",
  Archived: "Archived",
  Scheduled: "Scheduled",
  Expired: "Expired",
  Paid: "Paid",
  Unfulfilled: "Unfulfilled",
  FulFilled: "FulFilled",
  Approved: "Approved",
  Disapproved: "Disapproved",
  Approve: "Approve",
  Reject: "Reject",
};

export const RecStatusValuebyName = {
  Active: "A",
  Inactive: "I",
  Draft: "D",
  Pending: "P",
  Archived: "R",
  Scheduled: "S",
  Expired: "E",
  NavSync: "S",
  Disapproved: "X",
  Cancelled: "Cancelled",
  Fraud: "Fraud",
};

export const ProductStatusValueName = {
  Active: "Active",
  Discontinued: "Archived",
  Draft: "Draft",
  Pending: "Pending",
  Archived: "Archived",
  Scheduled: "Scheduled",
  OutofStock: "Out of Stock",
  Paid: "Paid",
  Unfulfilled: "Unfulfilled",
  FulFilled: "FulFilled",
};

export const ProductStatusValuebyName = {
  Active: "A",
  Inactive: "I",
  Discontinued: "X",
  Draft: "D",
  Pending: "P",
  // Archived: "R",
  Scheduled: "S",
  OutofStock: "O",
};

export const ViewHistoryStatus = {
  Active: "A",
  Inactive: "I",
  Draft: "D",
  Pending: "P",
  Archived: "R",
  Scheduled: "S",
  Expired: "E",
  NavSync: "S",
  Cancelled: "Cancelled",
  Fraud: "Fraud",
  OutofStock: "O",
};

export const OrderStatusForListPage = {
  Export: "e",
  Exported: "exported",
  Pending: "p",
  PendingStr: "pending",
};

export const ProductNavStatusValueName = {
  Pending: "Pending",
  Resync: "Resync",
  Sync: "Sync",
};

export const ProductNavStatusValuebyName = {
  Resync: "R",
  Pending: "P",
  Sync: "S",
};

export const ProductNavStatusValueNameForMoreFilter = [
  { value: "P", label: "Pending" },
  { value: "R", label: "Resync" },
  { value: "S", label: "Sync" },
];

export const menuConfigCategoryType = [
  { value: "topic", label: "Topic" },
  { value: "category", label: "Category" },
];

export const BundleProductStatusFormOption = [
  { value: "A", label: "Active" },
  { value: "I", label: "Inactive" },
  { value: "X", label: "Discontinued" },
  { value: "D", label: "Draft" },
  { value: "O", label: "Out of Stock" },
  { value: "B", label: "Back Order" },
];

export const ProductStatusOptionForStoreBuilder = [
  { value: "A", label: "Active" },
  { value: "I", label: "Inactive" },
  // { value: "X", label: "Discontinued" },
  { value: "D", label: "Draft" },
  // { value: "O", label: "Out of Stock" },
  // { value: "B", label: "Back Order" },
];

export const ProductStatusFormOption = [
  { value: "A", label: "Active", isDisabled: false },
  { value: "I", label: "Inactive" },
  // { value: "X", label: "Discontinued", isDisabled: true },
  { value: "D", label: "Draft" },
  { value: "O", label: "Out of Stock", isDisabled: true },
  { value: "B", label: "Back Order", isDisabled: true },
];

export const GMCProductStatusFormOption = [
  { value: "A", label: "Active", isDisabled: false },
  { value: "I", label: "Inactive" },
  // { value: "D", label: "Draft" },
  // { value: "R", label: "Archived" },
];

export const ProductStatusMoreFilterOption = [
  { value: "A", label: "Active" },
  { value: "I", label: "Inactive" },
  // { value: "X", label: "Discontinued" },
  { value: "D", label: "Draft" },
  { value: "R", label: "Archived" },
];

export const ProductIsDiscontinueMoreFilterOption = [
  { value: "true", label: "True" },
  { value: "false", label: "False" },
];

export const orderStatus = [
  { value: "New", label: "New" },
  { value: "Pending", label: "Pending" },
  { value: "Shipped", label: "Shipped" },
  { value: "Hold", label: "Hold" },
  { value: "Cancelled", label: "Cancelled" },
  { value: "Partially Shipped", label: "Partially Shipped" },
  { value: "Expired", label: "Expired" },
];

export const masterCatalogData = {
  fields: [
    // {
    //   mappingname: "brandId",
    //   dbfield: "brandId",
    //   displayname: "Brand OR Manufacturer Name",
    //   required: "Y",
    // },
    // {
    //   mappingname: "brandName",
    //   dbfield: "brandName",
    //   displayname: "Brand OR Manufacturer Name",
    //   required: "Y",
    // },
    // {
    //   mappingname: "vendorId",
    //   dbfield: "vendorId",
    //   displayname: "Vendor Name",
    //   required: "Y",
    // },
    // {
    //   mappingname: "vendorName",
    //   dbfield: "vendorName",
    //   displayname: "Vendor Name",
    //   required: "Y",
    // },
    {
      mappingname: "name",
      dbfield: "name",
      displayname: "Product Name",
      required: "Y",
    },
    // {
    //   mappingname: "isNameDifferentfromERP",
    //   dbfield: "isNameDifferentfromERP",
    //   displayname: "Our ERP / NAV will have different Name from Above Name",
    //   required: "N",
    // },
    // {
    //   mappingname: "nameInERP",
    //   dbfield: "nameInERP",
    //   displayname: "ERP Name / NAV Name ",
    //   required: "Y",
    // },
    // {
    //   mappingname: "isERPNameDifferent",
    //   dbfield: "isERPNameDifferent",
    //   displayname: "This item has and Existing ID in our ERP / NAV",
    //   required: "N",
    // },
    // {
    //   mappingname: "erpItemId",
    //   dbfield: "erpItemId",
    //   displayname: "ERP / NAV Item ID",
    //   required: "N",
    // },
    // {
    //   mappingname: "vendorSKU",
    //   dbfield: "vendorSKU",
    //   displayname: "Vendor SKU / Manufacturer / Brand Part Number",
    //   required: "Y",
    // },
    {
      mappingname: "ourSKU",
      dbfield: "ourSKU",
      displayname: "Our SKU",
      required: "Y",
    },
    // {
    //   mappingname: "producttypeId",
    //   dbfield: "producttypeId",
    //   displayname: "Product Type",
    //   required: "Y",
    // },
    // {
    //   mappingname: "productTypeName",
    //   dbfield: "productTypeName",
    //   displayname: "Product Type",
    //   required: "Y",
    // },
    // {
    //   mappingname: "companionProduct",
    //   dbfield: "companionProduct",
    //   displayname: "Companion Product",
    //   required: "N",
    // },
    // {
    //   mappingname: "taxCode",
    //   dbfield: "taxCode",
    //   displayname: "Tax Code",
    //   required: "Y",
    // },
    {
      mappingname: "categoryId",
      dbfield: "categoryId",
      displayname: "Category",
      required: "Y",
    },
    {
      mappingname: "description",
      dbfield: "description",
      displayname: "Description",
      required: "Y",
    },
    {
      mappingname: "shortDescription",
      dbfield: "shortDescription",
      displayname: "Short Description",
    },
    {
      mappingname: "productTagDetails",
      dbfield: "productTagDetails",
      displayname: "Product Tag Details",
    },
    {
      mappingname: "listPageShortDescription",
      dbfield: "listPageShortDescription",
      displayname: "List Page Short Description",
    },
    {
      mappingname: "productSpecification",
      dbfield: "productSpecification",
      displayname: "Product Specification",
    },
    {
      mappingname: "productFeatures",
      dbfield: "productFeatures",
      displayname: "Product Features",
    },
    {
      mappingname: "howToUse",
      dbfield: "howToUse",
      displayname: "How To Use",
    },
    {
      mappingname: "productAvaliability",
      dbfield: "productAvaliability",
      displayname: "Product Avaliability",
    },
    // {
    //   mappingname: "dimensionTemplateId",
    //   dbfield: "dimensionTemplateId",
    //   displayname: "Search Dimension Template",
    //   required: "N",
    // },
    // {
    //   mappingname: "length",
    //   dbfield: "length",
    //   displayname: "Length",
    //   required: "N",
    // },
    // {
    //   mappingname: "width",
    //   dbfield: "width",
    //   displayname: "width",
    //   required: "N",
    // },
    // {
    //   mappingname: "height",
    //   dbfield: "height",
    //   displayname: "Height",
    //   required: "N",
    // },
    // {
    //   mappingname: "volume",
    //   dbfield: "volume",
    //   displayname: "Volume",
    //   required: "N",
    // },
    {
      mappingname: "weightInLBS",
      dbfield: "weightInLBS",
      displayname: "Weight (LBS)",
      required: "N",
    },
    {
      mappingname: "shipWeightinLBS",
      dbfield: "shipWeightinLBS",
      displayname: "Ship Weight",
      required: "N",
    },
    {
      mappingname: "attributename",
      dbfield: "attributename",
      displayname: "Attribute Name",
      required: "Y",
    },
    {
      mappingname: "attributevalue",
      dbfield: "attributevalue",
      displayname: "Attribute Value",
      required: "Y",
    },

    {
      mappingname: "questions",
      dbfield: "questions",
      displayname: "Questions",
      required: "Y",
    },
    {
      mappingname: "answers",
      dbfield: "answers",
      displayname: "Answers",
      required: "Y",
    },
    {
      mappingname: "optionName",
      dbfield: "optionName",
      displayname: "Option Name",
      required: "Y",
    },

    {
      mappingname: "attributeRequired ",
      dbfield: " AttributeRequired ",
      displayname: "attribute Required ",
      required: "N",
    },
    {
      mappingname: "optionValues",
      dbfield: "optionValues",
      displayname: "option Values",
      required: "Y",
    },

    {
      mappingname: "oldsku",
      dbfield: "oldsku",
      displayname: "Old SKU",
      required: "Y",
    },
    {
      mappingname: "newsku",
      dbfield: "newsku",
      displayname: "New SKU",
      required: "Y",
    },
    {
      mappingname: "personalization",
      dbfield: "personalization",
      displayname: "Personalization",
      required: "Y",
    },
    {
      mappingname: "isDiscontinue",
      dbfield: "isDiscontinue",
      displayname: "Discontinued?",
    },
    /* SEO Fields */
    {
      mappingname: "previewType",
      dbfield: "previewType",
      displayname: "Preview Type",
      required: "N",
    },
    {
      mappingname: "seName",
      dbfield: "seName",
      displayname: "seName",
      required: "Y",
    },
    {
      mappingname: "pageTitle",
      dbfield: "pageTitle",
      displayname: "Page Title",
      required: "Y",
    },
    {
      mappingname: "metaDescription",
      dbfield: "metaDescription",
      displayname: "Meta Description",
      required: "Y",
    },
    {
      mappingname: "metaKeywords",
      dbfield: "metaKeywords",
      displayname: "Meta Keywords",
      required: "Y",
    },
    {
      mappingname: "roiKeywords",
      dbfield: "roiKeywords",
      displayname: "ROI Keywords",
      required: "N",
    },
    {
      mappingname: "targetedKeywords",
      dbfield: "targetedKeywords",
      displayname: "Targeted Keywords",
      required: "N",
    },
    {
      mappingname: "h1",
      dbfield: "h1title",
      displayname: "H1",
      required: "N",
    },
    {
      mappingname: "h2",
      dbfield: "h2title",
      displayname: "H2",
      required: "N",
    },
    {
      mappingname: "h3",
      dbfield: "h3title",
      displayname: "H3",
      required: "N",
    },
    {
      mappingname: "h4",
      dbfield: "h4title",
      displayname: "H4",
      required: "N",
    },
    {
      mappingname: "h5",
      dbfield: "h5title",
      displayname: "H5",
      required: "N",
    },
    {
      mappingname: "h6",
      dbfield: "H6title",
      displayname: "h6",
      required: "N",
    },
    {
      mappingname: "openGraphImagePath",
      dbfield: "openGraphImagePath",
      displayname: "Open Graph Image",
      required: "N",
    },
    {
      mappingname: "openGraphTitle",
      dbfield: "openGraphTitle",
      displayname: "Open Graph Title",
      required: "N",
    },
    {
      mappingname: "openGraphDescription",
      dbfield: "openGraphDescription",
      displayname: "Open Graph Description",
      required: "N",
    },
    {
      mappingname: "facebookImagePath",
      dbfield: "facebookImagePath",
      displayname: "facebookImagePath",
      required: "N",
    },
    {
      mappingname: "facebookOpenGraphTitle",
      dbfield: "facebookOpenGraphTitle",
      displayname: "Open Graph Title",
      required: "N",
    },
    {
      mappingname: "facebookOpenGraphDescription",
      dbfield: "facebookOpenGraphDescription",
      displayname: "Open Graph Description",
      required: "N",
    },
    {
      mappingname: "twitterImagePath",
      dbfield: "twitterImagePath",
      displayname: "twitterImagePath",
      required: "N",
    },
    {
      mappingname: "twitterOpenGraphTitle",
      dbfield: "twitterOpenGraphTitle",
      displayname: "Open Graph Title",
      required: "N",
    },
    {
      mappingname: "twitterOpenGraphDescription",
      dbfield: "twitterOpenGraphDescription",
      displayname: "Open Graph Description",
      required: "N",
    },
    {
      mappingname: "linkedinImagePath",
      dbfield: "linkedinImagePath",
      displayname: "linkedinImagePath",
      required: "N",
    },
    {
      mappingname: "linkedinOpenGraphTitle",
      dbfield: "linkedinOpenGraphTitle",
      displayname: "Open Graph Title",
      required: "N",
    },
    {
      mappingname: "linkedinOpenGraphDescription",
      dbfield: "linkedinOpenGraphDescription",
      displayname: "Open Graph Description",
      required: "N",
    },
    {
      mappingname: "pinterestImagePath",
      dbfield: "pinterestImagePath",
      displayname: "Open Graph image",
      required: "N",
    },
    {
      mappingname: "pinterestOpenGraphTitle",
      dbfield: "pinterestOpenGraphTitle",
      displayname: "Open Graph Title",
      required: "N",
    },
    {
      mappingname: "pinterestOpenGraphDescription",
      dbfield: "pinterestOpenGraphDescription",
      displayname: "Open Graph Description",
      required: "N",
    },
  ],
};

export const ProductCatalogData = {
  fields: [
    // {
    //   mappingname: "brandId",
    //   dbfield: "brandId",
    //   displayname: "Brand OR Manufacturer Name",
    //   required: "Y",
    // },
    {
      mappingname: "page_url",
      dbfield: "page_url",
      displayname: "Page Url Name",
      required: "Y",
    },
    // {
    //   mappingname: "brandName",
    //   dbfield: "brandName",
    //   displayname: "Brand OR Manufacturer Name",
    //   required: "Y",
    // },
    // {
    //   mappingname: "vendorId",
    //   dbfield: "vendorId",
    //   displayname: "Vendor Name",
    //   required: "Y",
    // },
    // {
    //   mappingname: "vendorName",
    //   dbfield: "vendorName",
    //   displayname: "Vendor Name",
    //   required: "Y",
    // },
    {
      mappingname: "name",
      dbfield: "name",
      displayname: "Product Name",
      required: "Y",
    },
    {
      mappingname: "isGiftCardProduct",
      dbfield: "isGiftCardProduct",
      displayname: "is Gift Card Product",
      required: "N",
    },
    // {
    //   mappingname: "isNameDifferentfromERP",
    //   dbfield: "isNameDifferentfromERP",
    //   displayname: "Our ERP / NAV will have different Name from Above Name",
    //   required: "N",
    // },
    // {
    //   mappingname: "nameInERP",
    //   dbfield: "nameInERP",
    //   displayname: "ERP Name / NAV Name ",
    //   required: "Y",
    // },
    // {
    //   mappingname: "isERPNameDifferent",
    //   dbfield: "isERPNameDifferent",
    //   displayname: "This item has and Existing ID in our ERP / NAV",
    //   required: "N",
    // },
    // {
    //   mappingname: "erpItemId",
    //   dbfield: "erpItemId",
    //   displayname: "ERP / NAV Item ID",
    //   required: "N",
    // },
    // {
    //   mappingname: "vendorSKU",
    //   dbfield: "vendorSKU",
    //   displayname: "Vendor SKU / Manufacturer / Brand Part Number",
    //   required: "Y",
    // },
    {
      mappingname: "ourSKU",
      dbfield: "ourSKU",
      displayname: "SKU/ID",
      required: "Y",
    },
    {
      mappingname: "producttypeId",
      dbfield: "producttypeId",
      displayname: "Product Type",
      required: "Y",
    },
    // {
    //   mappingname: "productTypeName",
    //   dbfield: "productTypeName",
    //   displayname: "Product Type",
    //   required: "Y",
    // },
    // {
    //   mappingname: "companionProduct",
    //   dbfield: "companionProduct",
    //   displayname: "Companion Product",
    //   required: "N",
    // },
    // {
    //   mappingname: "taxCode",
    //   dbfield: "taxCode",
    //   displayname: "Tax Code",
    //   required: "Y",
    // },
    // {
    //   mappingname: "newUrl",
    //   dbfield: "newUrl",
    //   displayname: "Page Redirection URL",
    //   required: "Y",
    // },
    // {
    //   mappingname: "categoryId",
    //   dbfield: "categoryId",
    //   displayname: "Category",
    //   required: "Y",
    // },
    // {
    //   mappingname: "multipleCategoryId",
    //   dbfield: "multipleCategoryId",
    //   displayname: "Category",
    //   required: "Y",
    // },
    {
      mappingname: "seName",
      dbfield: "seName",
      displayname: "SE Name",
      required: "N",
    },
    {
      mappingname: "description",
      dbfield: "description",
      displayname: "Description",
      required: "Y",
    },
    {
      mappingname: "shortDescription",
      dbfield: "shortDescription",
      displayname: "Short Description",
    },
    // {
    //   mappingname: "productTagDetails",
    //   dbfield: "productTagDetails",
    //   displayname: "Product Tag Details",
    // },
    // {
    //   mappingname: "dimensionTemplateId",
    //   dbfield: "dimensionTemplateId",
    //   displayname: "Search Dimension Template",
    //   required: "N",
    // },
    // {
    //   mappingname: "length",
    //   dbfield: "length",
    //   displayname: "Length",
    //   required: "N",
    // },
    // {
    //   mappingname: "width",
    //   dbfield: "width",
    //   displayname: "width",
    //   required: "N",
    // },
    // {
    //   mappingname: "height",
    //   dbfield: "height",
    //   displayname: "Height",
    //   required: "N",
    // },
    // {
    //   mappingname: "volume",
    //   dbfield: "volume",
    //   displayname: "Volume",
    //   required: "N",
    // },
    // {
    //   mappingname: "weightInLBS",
    //   dbfield: "weightInLBS",
    //   displayname: "Weight (LBS)",
    //   required: "N",
    // },
    // {
    //   mappingname: "shipWeightinLBS",
    //   dbfield: "shipWeightinLBS",
    //   displayname: "Ship Weight",
    //   required: "N",
    // },
    // {
    //   mappingname: "isShortDescriptionOnTop",
    //   dbfield: "isShortDescriptionOnTop",
    //   displayname: "Show On Top",
    //   required: "N",
    // },
    // pricing
    {
      mappingname: "quantityDiscountTemplate",
      dbfield: "quantityDiscountTemplate",
      displayname: "Quantity Discount Template",
    },
    /* SEO Fields */
    {
      mappingname: "previewType",
      dbfield: "previewType",
      displayname: "Preview Type",
      required: "N",
    },
    {
      mappingname: "seName",
      dbfield: "seName",
      displayname: "seName",
      required: "Y",
    },
    {
      mappingname: "pageTitle",
      dbfield: "pageTitle",
      displayname: "Page Title",
      required: "Y",
    },
    {
      mappingname: "metaDescription",
      dbfield: "metaDescription",
      displayname: "Meta Description",
      required: "Y",
    },
    {
      mappingname: "metaKeywords",
      dbfield: "metaKeywords",
      displayname: "Meta Keywords",
      required: "Y",
    },
    {
      mappingname: "roiKeywords",
      dbfield: "roiKeywords",
      displayname: "ROI Keywords",
      required: "N",
    },
    {
      mappingname: "targetedKeywords",
      dbfield: "targetedKeywords",
      displayname: "Targeted Keywords",
      required: "N",
    },
    {
      mappingname: "h1",
      dbfield: "h1title",
      displayname: "H1",
      required: "N",
    },
    {
      mappingname: "h2",
      dbfield: "h2title",
      displayname: "H2",
      required: "N",
    },
    {
      mappingname: "h3",
      dbfield: "h3title",
      displayname: "H3",
      required: "N",
    },
    {
      mappingname: "h4",
      dbfield: "h4title",
      displayname: "H4",
      required: "N",
    },
    {
      mappingname: "h5",
      dbfield: "h5title",
      displayname: "H5",
      required: "N",
    },
    {
      mappingname: "h6",
      dbfield: "H6title",
      displayname: "h6",
      required: "N",
    },
    {
      mappingname: "openGraphImagePath",
      dbfield: "openGraphImagePath",
      displayname: "Open Graph Image",
      required: "N",
    },
    {
      mappingname: "openGraphTitle",
      dbfield: "openGraphTitle",
      displayname: "Open Graph Title",
      required: "N",
    },
    {
      mappingname: "openGraphDescription",
      dbfield: "openGraphDescription",
      displayname: "Open Graph Description",
      required: "N",
    },
    {
      mappingname: "facebookImagePath",
      dbfield: "facebookImagePath",
      displayname: "facebookImagePath",
      required: "N",
    },
    {
      mappingname: "facebookOpenGraphTitle",
      dbfield: "facebookOpenGraphTitle",
      displayname: "Open Graph Title",
      required: "N",
    },
    {
      mappingname: "facebookOpenGraphDescription",
      dbfield: "facebookOpenGraphDescription",
      displayname: "Open Graph Description",
      required: "N",
    },
    {
      mappingname: "twitterImagePath",
      dbfield: "twitterImagePath",
      displayname: "twitterImagePath",
      required: "N",
    },
    {
      mappingname: "twitterOpenGraphTitle",
      dbfield: "twitterOpenGraphTitle",
      displayname: "Open Graph Title",
      required: "N",
    },
    {
      mappingname: "twitterOpenGraphDescription",
      dbfield: "twitterOpenGraphDescription",
      displayname: "Open Graph Description",
      required: "N",
    },
    {
      mappingname: "linkedinImagePath",
      dbfield: "linkedinImagePath",
      displayname: "linkedinImagePath",
      required: "N",
    },
    {
      mappingname: "linkedinOpenGraphTitle",
      dbfield: "linkedinOpenGraphTitle",
      displayname: "Open Graph Title",
      required: "N",
    },
    {
      mappingname: "linkedinOpenGraphDescription",
      dbfield: "linkedinOpenGraphDescription",
      displayname: "Open Graph Description",
      required: "N",
    },
    {
      mappingname: "pinterestImagePath",
      dbfield: "pinterestImagePath",
      displayname: "Open Graph image",
      required: "N",
    },
    {
      mappingname: "pinterestOpenGraphTitle",
      dbfield: "pinterestOpenGraphTitle",
      displayname: "Open Graph Title",
      required: "N",
    },
    {
      mappingname: "pinterestOpenGraphDescription",
      dbfield: "pinterestOpenGraphDescription",
      displayname: "Open Graph Description",
      required: "N",
    },
    {
      mappingname: "attributename",
      dbfield: "attributename",
      displayname: "Attribute Name",
      required: "Y",
    },
    {
      mappingname: "attributevalue",
      dbfield: "attributevalue",
      displayname: "Attribute Value",
      required: "Y",
    },
    {
      mappingname: "questions",
      dbfield: "questions",
      displayname: "Questions",
      required: "Y",
    },
    {
      mappingname: "answers",
      dbfield: "answers",
      displayname: "Answers",
      required: "Y",
    },
    {
      mappingname: "optionName",
      dbfield: "optionName",
      displayname: "Option Name",
      required: "Y",
    },
    {
      mappingname: "attributeRequired ",
      dbfield: " AttributeRequired ",
      displayname: "attribute Required ",
      required: "N",
    },
    {
      mappingname: "optionValues",
      dbfield: "optionValues",
      displayname: "option Values",
      required: "Y",
    },
    {
      mappingname: "oldsku",
      dbfield: "oldsku",
      displayname: "Old SKU",
      required: "Y",
    },
    {
      mappingname: "newsku",
      dbfield: "newsku",
      displayname: "New SKU",
      required: "Y",
    },
    {
      mappingname: "personalization",
      dbfield: "personalization",
      displayname: "Personalization",
      required: "Y",
    },
  ],
};

export const GrandMasterCatalogData = {
  fields: [
    {
      mappingname: "brandId",
      dbfield: "brandId",
      displayname: "Brand OR Manufacturer Name",
      required: "Y",
    },
    {
      mappingname: "brandName",
      dbfield: "brandName",
      displayname: "Brand OR Manufacturer Name",
      required: "Y",
    },
    {
      mappingname: "vendorId",
      dbfield: "vendorId",
      displayname: "Vendor Name",
      required: "Y",
    },
    {
      mappingname: "vendorName",
      dbfield: "vendorName",
      displayname: "Vendor Name",
      required: "Y",
    },
    {
      mappingname: "name",
      dbfield: "name",
      displayname: "Product Name",
      required: "Y",
    },
    {
      mappingname: "isNameDifferentfromERP",
      dbfield: "isNameDifferentfromERP",
      displayname: "Our ERP / NAV will have different Name from Above Name",
      required: "N",
    },
    {
      mappingname: "nameInERP",
      dbfield: "nameInERP",
      displayname: "ERP Name / NAV Name ",
      required: "Y",
    },
    {
      mappingname: "isERPNameDifferent",
      dbfield: "isERPNameDifferent",
      displayname: "This item has and Existing ID in our ERP / NAV",
      required: "N",
    },
    {
      mappingname: "erpItemId",
      dbfield: "erpItemId",
      displayname: "ERP / NAV Item ID",
      required: "N",
    },
    {
      mappingname: "vendorSKU",
      dbfield: "vendorSKU",
      displayname: "Vendor SKU / Manufacturer / Brand Part Number",
      required: "Y",
    },
    {
      mappingname: "ourSKU",
      dbfield: "ourSKU",
      displayname: "Our SKU",
      required: "Y",
    },
    {
      mappingname: "producttypeId",
      dbfield: "producttypeId",
      displayname: "Product Type",
      required: "Y",
    },
    {
      mappingname: "productTypeName",
      dbfield: "productTypeName",
      displayname: "Product Type",
    },
    {
      mappingname: "companionProduct",
      dbfield: "companionProduct",
      displayname: "Companion Product",
      required: "N",
    },
    {
      mappingname: "taxCode",
      dbfield: "taxCode",
      displayname: "Tax Code",
      required: "Y",
    },
    {
      mappingname: "description",
      dbfield: "description",
      displayname: "Description",
      required: "Y",
    },
    {
      mappingname: "dimensionTemplateId",
      dbfield: "dimensionTemplateId",
      displayname: "Search Dimension Template",
      required: "N",
    },
    {
      mappingname: "length",
      dbfield: "length",
      displayname: "Length",
      required: "N",
    },
    {
      mappingname: "width",
      dbfield: "width",
      displayname: "width",
      required: "N",
    },
    {
      mappingname: "height",
      dbfield: "height",
      displayname: "Height",
      required: "N",
    },
    {
      mappingname: "volume",
      dbfield: "volume",
      displayname: "Volume",
      required: "N",
    },
    {
      mappingname: "weightInLBS",
      dbfield: "weightInLBS",
      displayname: "Weight (LBS)",
      required: "N",
    },
    {
      mappingname: "shipWeightinLBS",
      dbfield: "shipWeightinLBS",
      displayname: "Ship Weight",
      required: "N",
    },
  ],
};

export const bundleFields = {
  fields: [
    {
      mappingname: "name",
      dbfield: "name",
      displayname: "Bundle Name",
      required: "Y",
    },
    {
      mappingname: "description",
      dbfield: "description",
      displayname: "Description",
    },
    // {
    //   mappingname: "isNameDifferentfromERP",
    //   dbfield: "isNameDifferentfromERP",
    //   displayname: "Our ERP / NAV will have different Name from Above Name",
    //   required: "N",
    // },
    // {
    //   mappingname: "nameInERP",
    //   dbfield: "nameInERP",
    //   displayname: "ERP Name / NAV Name ",
    //   required: "Y",
    // },
    // {
    //   mappingname: "isERPNameDifferent",
    //   dbfield: "isERPNameDifferent",
    //   displayname: "This item has and Existing ID in our ERP / NAV",
    //   required: "N",
    // },
    // {
    //   mappingname: "erpItemId",
    //   dbfield: "erpItemId",
    //   displayname: "ERP / NAV Item ID",
    //   required: "N",
    // },
    {
      mappingname: "ourSKU",
      dbfield: "ourSKU",
      displayname: "Our SKU",
      required: "Y",
    },
    // {
    //   mappingname: "producttypeId",
    //   dbfield: "producttypeId",
    //   displayname: "Product Type",
    //   required: "Y",
    // },
    // {
    //   mappingname: "taxCode",
    //   dbfield: "taxCode",
    //   displayname: "Tax Code",
    //   required: "Y",
    // },
    // {
    //   mappingname: "newUrl",
    //   dbfield: "newUrl",
    //   displayname: "Page Redirection URL",
    //   required: "Y",
    // },
    // {
    //   mappingname: "categoryId",
    //   dbfield: "categoryId",
    //   displayname: "Category",
    //   required: "Y",
    // },
    {
      mappingname: "description",
      dbfield: "description",
      displayname: "Description",
      required: "Y",
    },
    {
      mappingname: "shortDescription",
      dbfield: "shortDescription",
      displayname: "Short Description",
    },
    // {
    //   mappingname: "dimensionTemplateId",
    //   dbfield: "dimensionTemplateId",
    //   displayname: "Search Dimension Template",
    //   required: "N",
    // },
    // {
    //   mappingname: "length",
    //   dbfield: "length",
    //   displayname: "Length",
    //   required: "N",
    // },
    // {
    //   mappingname: "width",
    //   dbfield: "width",
    //   displayname: "width",
    //   required: "N",
    // },
    // {
    //   mappingname: "height",
    //   dbfield: "height",
    //   displayname: "Height",
    //   required: "N",
    // },
    // {
    //   mappingname: "volume",
    //   dbfield: "volume",
    //   displayname: "Volume",
    //   required: "N",
    // },
    // {
    //   mappingname: "weightInLBS",
    //   dbfield: "weightInLBS",
    //   displayname: "Weight (LBS)",
    //   required: "N",
    // },
    // {
    //   mappingname: "shipWeightinLBS",
    //   dbfield: "shipWeightinLBS",
    //   displayname: "Ship Weight",
    //   required: "N",
    // },
    // pricing
    {
      mappingname: "quantityDiscountTemplate",
      dbfield: "quantityDiscountTemplate",
      displayname: "Quantity Discount Template",
    },
    /* SEO Fields */
    {
      mappingname: "previewType",
      dbfield: "previewType",
      displayname: "Preview Type",
      required: "N",
    },
    {
      mappingname: "seName",
      dbfield: "seName",
      displayname: "seName",
      required: "Y",
    },
    {
      mappingname: "pageTitle",
      dbfield: "pageTitle",
      displayname: "Page Title",
      required: "Y",
    },
    {
      mappingname: "metaDescription",
      dbfield: "metaDescription",
      displayname: "Meta Description",
      required: "Y",
    },
    {
      mappingname: "metaKeywords",
      dbfield: "metaKeywords",
      displayname: "Meta Keywords",
      required: "Y",
    },
    {
      mappingname: "roiKeywords",
      dbfield: "roiKeywords",
      displayname: "ROI Keywords",
      required: "N",
    },
    {
      mappingname: "targetedKeywords",
      dbfield: "targetedKeywords",
      displayname: "Targeted Keywords",
      required: "N",
    },
    {
      mappingname: "h1",
      dbfield: "h1title",
      displayname: "H1",
      required: "N",
    },
    {
      mappingname: "h2",
      dbfield: "h2title",
      displayname: "H2",
      required: "N",
    },
    {
      mappingname: "h3",
      dbfield: "h3title",
      displayname: "H3",
      required: "N",
    },
    {
      mappingname: "h4",
      dbfield: "h4title",
      displayname: "H4",
      required: "N",
    },
    {
      mappingname: "h5",
      dbfield: "h5title",
      displayname: "H5",
      required: "N",
    },
    {
      mappingname: "h6",
      dbfield: "H6title",
      displayname: "h6",
      required: "N",
    },
    {
      mappingname: "openGraphImagePath",
      dbfield: "openGraphImagePath",
      displayname: "Open Graph Image",
      required: "N",
    },
    {
      mappingname: "openGraphTitle",
      dbfield: "openGraphTitle",
      displayname: "Open Graph Title",
      required: "N",
    },
    {
      mappingname: "openGraphDescription",
      dbfield: "openGraphDescription",
      displayname: "Open Graph Description",
      required: "N",
    },
    {
      mappingname: "facebookImagePath",
      dbfield: "facebookImagePath",
      displayname: "facebookImagePath",
      required: "N",
    },
    {
      mappingname: "facebookOpenGraphTitle",
      dbfield: "facebookOpenGraphTitle",
      displayname: "Open Graph Title",
      required: "N",
    },
    {
      mappingname: "facebookOpenGraphDescription",
      dbfield: "facebookOpenGraphDescription",
      displayname: "Open Graph Description",
      required: "N",
    },
    {
      mappingname: "twitterImagePath",
      dbfield: "twitterImagePath",
      displayname: "twitterImagePath",
      required: "N",
    },
    {
      mappingname: "twitterOpenGraphTitle",
      dbfield: "twitterOpenGraphTitle",
      displayname: "Open Graph Title",
      required: "N",
    },
    {
      mappingname: "twitterOpenGraphDescription",
      dbfield: "twitterOpenGraphDescription",
      displayname: "Open Graph Description",
      required: "N",
    },
    {
      mappingname: "linkedinImagePath",
      dbfield: "linkedinImagePath",
      displayname: "linkedinImagePath",
      required: "N",
    },
    {
      mappingname: "linkedinOpenGraphTitle",
      dbfield: "linkedinOpenGraphTitle",
      displayname: "Open Graph Title",
      required: "N",
    },
    {
      mappingname: "linkedinOpenGraphDescription",
      dbfield: "linkedinOpenGraphDescription",
      displayname: "Open Graph Description",
      required: "N",
    },
    {
      mappingname: "pinterestImagePath",
      dbfield: "pinterestImagePath",
      displayname: "Open Graph image",
      required: "N",
    },
    {
      mappingname: "pinterestOpenGraphTitle",
      dbfield: "pinterestOpenGraphTitle",
      displayname: "Open Graph Title",
      required: "N",
    },
    {
      mappingname: "pinterestOpenGraphDescription",
      dbfield: "pinterestOpenGraphDescription",
      displayname: "Open Graph Description",
      required: "N",
    },
  ],
};

export const GrandMasterProductStatusTabs = [
  {
    id: 0,
    label: "All",
    value: "All",
    componentname: "All",
    filter: [],
    extra: {
      storeDefaultOption: "All",
    },
  },
  {
    id: 1,
    label: "Active",
    value: "Active",
    componentname: "Active",
    filter: [
      {
        field: "recStatus",
        operator: 0,
        value: "A",
      },
    ],
  },
  {
    id: 2,
    label: "Inactive",
    value: "Inactive",
    componentname: "Inactive",
    filter: [
      {
        field: "recStatus",
        operator: 0,
        value: "I",
      },
    ],
  },
  {
    id: 3,
    label: " Draft",
    value: "Draft",
    componentname: "Draft",
    filter: [
      {
        field: "recStatus",
        operator: 0,
        value: "D",
      },
    ],
  },
  /* {
    id: 4,
    label: " Pending to Clone",
    value: "PendingToClone",
    componentname: "PendingToClone",
    filter: [
      {
        field: "isPendingToClone",
        operator: 0,
        value: true,
      },
    ],
  }, */
];

export const MasterProductStatusTabs = [
  {
    id: 0,
    label: "All",
    value: "All",
    componentname: "All",
    filter: [],
  },
  {
    id: 1,
    label: "Active",
    value: "Active",
    componentname: "Active",
    filter: [
      {
        field: "recStatus",
        operator: 0,
        value: "A",
      },
    ],
  },
  {
    id: 2,
    label: "Inactive",
    value: "Inactive",
    componentname: "Inactive",
    filter: [
      {
        field: "recStatus",
        operator: 0,
        value: "I",
      },
    ],
  },
  {
    id: 3,
    label: " Draft",
    value: "Draft",
    componentname: "Draft",
    filter: [
      {
        field: "recStatus",
        operator: 0,
        value: "D",
      },
    ],
  },
  // {
  //   id: 4,
  //   label: "Discontinued",
  //   value: "Discontinued",
  //   componentname: "Discontinued",
  //   filter: [
  //     {
  //       field: "isdiscontinue",
  //       operator: 0,
  //       value: "true",
  //     },
  //   ],
  // },
  // {
  //   id: 5,
  //   label: "Synced with NAV",
  //   value: "Synced with NAV",
  //   componentname: "Synced with NAV",
  //   filter: [
  //     {
  //       field: "navSyncStatus",
  //       operator: 0,
  //       value: "S",
  //     },
  //   ],
  // },
  // {
  //   id: 6,
  //   label: "Resync with NAV",
  //   value: "ResyncwithNAV",
  //   componentname: "Resync with NAV",
  //   filter: [
  //     {
  //       field: "navSyncStatus",
  //       operator: 0,
  //       value: "R",
  //     },
  //   ],
  // },
  // {
  //   id: 7,
  //   label: "NAV Sync Pending",
  //   value: "NAVSyncPending",
  //   componentname: "NAV Sync Pending",
  //   filter: [
  //     {
  //       field: "navSyncStatus",
  //       operator: 0,
  //       value: "P",
  //     },
  //   ],
  // },
];

export const StoreProductStatusTabs = [
  {
    id: 0,
    label: "All",
    value: "All",
    componentname: "All",
    extra: {
      storeDefaultOption: "All",
    },
    filter: [],
  },
  {
    id: 1,
    label: "Active",
    value: "Active",
    componentname: "Active",
    extra: {
      storeDefaultOption: "Active",
    },
    filter: [
      {
        field: "recStatus",
        operator: 0,
        value: "A",
      },
    ],
  },
  {
    id: 2,
    label: "Inactive",
    value: "Inactive",
    componentname: "Inactive",
    extra: {
      storeDefaultOption: "Inactive",
    },
    filter: [
      {
        field: "recStatus",
        operator: 0,
        value: "I",
      },
    ],
  },
  {
    id: 3,
    label: "Draft",
    value: "Draft",
    componentname: "Draft",
    extra: {
      storeDefaultOption: "Draft",
    },
    filter: [
      {
        field: "recStatus",
        operator: 0,
        value: "D",
      },
    ],
  },
  {
    id: 4,
    label: "Archived",
    value: "Archived",
    componentname: "Archived",
    extra: {
      storeDefaultOption: "Archived",
    },
    filter: [
      {
        field: "recStatus",
        operator: 0,
        value: "R",
      },
    ],
  },
  {
    id: 5,
    label: "Discontinue",
    value: "Discontinued",
    componentname: "Discontinued",
    extra: {
      storeDefaultOption: "Discontinued",
    },
    filter: [
      {
        field: "isdiscontinue",
        operator: 0,
        value: "true",
      },
    ],
  },
  {
    id: 6,
    label: "Bundle",
    value: "Bundle",
    componentname: "Bundle",
    extra: {
      storeDefaultOption: "Bundle",
    },
    filter: [],
  },
];

export const OrderStatusTabs = [
  {
    id: 1,
    label: " New",
    value: "New",
    componentname: "New",
    extra: {
      storeDefaultOption: "New",
    },
    filter: [
      {
        field: "orderStatus",
        operator: 0,
        value: "NEW",
      },
    ],
    recordCount: "0",
  },
  // {
  //   id: 2,
  //   label: "Phone Order",
  //   value: "isPhoneOrder",
  //   componentname: "Phone Order",
  //   extra: {
  //     storeDefaultOption: "Phone Order",
  //   },
  //   filter: [
  //     {
  //       field: "isPhoneOrder",
  //       operator: 0,
  //       value: "true",
  //     },
  //     {
  //       field: 'orderStatus',
  //       operator: 1,
  //       value: 'NEW,Pending,Partially Shipped, Expired, Hold,Shipped'
  //     }
  //   ],
  //   recordCount: '0'
  // },
  // {
  //   id: 3,
  //   label: "Synced With Nav",
  //   value: "isNavImport",
  //   componentname: "Synced With Nav",
  //   extra: {
  //     storeDefaultOption: "syncedWithNav",
  //   },
  //   filter: [
  //     {
  //       field: 'isNavImport',
  //       operator: 0,
  //       value: 'true'
  //     },
  //     {
  //       field: 'orderStatus',
  //       operator: 1,
  //       value: 'NEW,Pending,Partially Shipped, Expired, Hold,Shipped'
  //     }
  //   ],
  //   recordCount: '0'
  // },
  // {
  //   id: 4,
  //   label: "Pending In Nav",
  //   value: "isNavImport",
  //   componentname: "PendingInNav",
  //   extra: {
  //     storeDefaultOption: "PendingInNav",
  //   },
  //   filter: [
  //     {
  //       field: 'isNavImport',
  //       operator: 0,
  //       value: 'false'
  //     },
  //     {
  //       field: 'orderStatus',
  //       operator: 1,
  //       value: 'NEW,Pending,Partially Shipped, Expired, Hold,Shipped'
  //     }
  //   ],
  //   recordCount: '0'
  // },
  {
    id: 2,
    label: "Shipped",
    value: "Shipped",
    componentname: "Shipped",
    extra: {
      storeDefaultOption: "Shipped",
    },
    filter: [
      {
        field: "orderStatus",
        operator: 0,
        value: "Shipped",
      },
      {
        field: "orderStatus",
        operator: 1,
        value: "NEW,Pending,Partially Shipped, Expired, Hold,Shipped",
      },
    ],
    recordCount: "0",
  },
  {
    id: 3,
    label: "Cancelled Orders",
    value: "Cancelled",
    componentname: "Cancelled",
    extra: {
      storeDefaultOption: "Cancelled",
    },
    filter: [
      {
        field: "orderStatus",
        operator: 0,
        value: "Cancelled",
      },
    ],
    recordCount: "0",
  },
  {
    id: 4,
    label: "All",
    value: "All",
    componentname: "All",
    extra: {
      storeDefaultOption: "All",
    },
    filter: [],
    recordCount: "0",
  },
  {
    id: 5,
    label: "Pending Import",
    value: "Pending Import",
    componentname: "Pending Import",
    extra: {
      storeDefaultOption: "Pending Import",
    },
    filter: [
      {
        field: "readyforimport",
        operator: 1,
        value: "true",
      },
      {
        field: "orderStatus",
        operator: 1,
        value: "NEW,PARTIALLY SHIPPED,PENDING",
      },
    ],
    recordCount: "0",
  },
  {
    id: 6,
    label: "PreOrder",
    value: "PreOrder",
    componentname: "PreOrder",
    extra: {
      storeDefaultOption: "PreOrder",
    },
    filter: [
      {
        field: "isPreOrder",
        operator: 1,
        value: "true",
      },
    ],
    recordCount: "0",
  },
];

export const PromotionStatusTabs = [
  {
    id: 0,
    label: "All",
    value: "All",
    componentname: "All",
    extra: {
      storeDefaultOption: "All",
    },
    filter: [],
  },
  {
    id: 1,
    label: "Active",
    value: "Active",
    componentname: "Active",
    extra: {
      storeDefaultOption: "Active",
    },
    filter: [
      {
        field: "status",
        operator: 1,
        value: "A",
      },
    ],
  },
  {
    id: 2,
    label: " Scheduled",
    value: "Scheduled",
    componentname: "Scheduled",
    extra: {
      storeDefaultOption: "Scheduled",
    },
    filter: [
      {
        field: "status",
        operator: 1,
        value: "S",
      },
    ],
  },
  {
    id: 3,
    label: "Expired",
    value: "Expired",
    componentname: "Expired",
    extra: {
      storeDefaultOption: "Expired",
    },
    filter: [
      {
        field: "status",
        operator: 1,
        value: "E",
      },
    ],
  },
];

export const SortingDirection = { ASC: 0, DESC: 1 };

export const extensionHttpMethod = [
  { value: "Get", label: "GET" },
  { value: "Post", label: "POST" },
  { value: "Put", label: "PUT" },
  { value: "Delete", label: "DELETE" },
  { value: "Patch", label: "PATCH" },
];

export const exportType = [
  { value: 0, label: "All" },
  { value: 1, label: "Product" },
  { value: 2, label: "Inventory" },
  { value: 3, label: "Companion" },
  { value: 4, label: "Category" },
  { value: 5, label: "FacetColor" },
  { value: 6, label: "FlyDate" },
  { value: 7, label: "Prices" },
  { value: 8, label: "UPC" },
  { value: 9, label: "AlterImage" },
  { value: 10, label: "Option Product" },
];

export const importType = [
  { value: 1, label: "Product" },
  { value: 2, label: "Inventory" },
  { value: 3, label: "Companion" },
  { value: 4, label: "Category" },
  { value: 5, label: "FacetColor" },
  { value: 6, label: "FlyDate" },
  { value: 7, label: "Prices" },
  { value: 8, label: "UPC" },
  { value: 9, label: "AlterImage" },
];

export const GMCExportType = [
  { value: 0, label: "All" },
  { value: 1, label: "Product" },
  { value: 3, label: "Companion" },
  { value: 4, label: "Category" },
  { value: 5, label: "FacetColor" },
  { value: 7, label: "Prices" },
  { value: 8, label: "UPC" },
  { value: 9, label: "AlterImage" },
  { value: 10, label: "Option Product" },
];

export const GMCImportType = [
  { value: 1, label: "Product" },
  { value: 3, label: "Companion" },
  { value: 4, label: "Category" },
  { value: 5, label: "FacetColor" },
  { value: 7, label: "Prices" },
  { value: 8, label: "UPC" },
  { value: 9, label: "AlterImage" },
];

export const storeExportType = [
  { value: 0, label: "All" },
  { value: 1, label: "Product" },
  { value: 2, label: "Logo Location" },
  { value: 3, label: "Companion" },
  { value: 4, label: "Minimum Quantity" },
];

export const storeImportType = [
  { value: 1, label: "Companion" },
  { value: 2, label: "Minimum Quantity" },
];

export const paginationOptions = [
  {
    id: 0,
    value: 25,
    period: "25 Per Page",
  },
  {
    id: 1,
    value: 50,
    period: "50 Per Page",
  },
  {
    id: 2,
    value: 100,
    period: "100 Per Page",
  },
];

export const EditStoreProductTabs = [
  {
    id: 0,
    label: "All",
    value: "All",
    componentname: "all",
  },
  {
    id: 1,
    label: "Basic Information",
    value: "basicInformationForm",
    componentname: "basic",
  },
  {
    id: 2,
    label: "Additional Information",
    value: "additionalinformation",
    componentname: "additionalinformation",
  },
  {
    id: 3,
    label: "Filter & Facet",
    value: "filterfacet",
    componentname: "filterfacet",
  },
  {
    id: 4,
    label: "Pricing",
    value: "pricingForm",
    componentname: "pricing",
  },

  {
    id: 5,
    label: "Media",
    value: "media",
    componentname: "media",
  },
  {
    id: 6,
    label: "Attributes",
    value: "AttributeForm",
    componentname: "attributes",
  },
  {
    id: 7,
    label: "Vendor SKU Mapping",
    value: "VendorSKUMapping",
    componentname: "vendorskumapping",
  },
  {
    id: 8,
    label: "Inventory",
    value: "inventory",
    componentname: "inventory",
  },
  {
    id: 9,
    label: "SEO",
    value: "SEO form",
    componentname: "seo",
  },
  {
    id: 10,
    label: "Bundle",
    value: "BundleForm",
    componentname: "bundle",
  },
  {
    id: 11,
    label: "Order History",
    value: "OrderHistoryForm",
    componentname: "orderhistory",
  },
  {
    id: 12,
    label: "Customer Reviews",
    value: "CustomerReviewsForm",
    componentname: "customerreviews",
  },
  {
    id: 13,
    label: "Customer FAQ",
    value: "CustomerFAQForm",
    componentname: "customerfaq",
  },
  {
    id: 14,
    label: "Life Cycle",
    value: "LifeCycle",
    componentname: "lifecycle",
  },
];

export const EditStoreProductBuilderTabs = [
  {
    id: 0,
    label: "All",
    value: "All",
    componentname: "all",
  },
  {
    id: 1,
    label: "Basic Information",
    value: "basicInformationForm",
    componentname: "basic",
  },
  {
    id: 2,
    label: "Pricing",
    value: "pricingForm",
    componentname: "pricing",
  },
  {
    id: 4,
    label: "Attributes",
    value: "AttributeForm",
    componentname: "attributes",
    // readOnly: true
  },
  {
    id: 5,
    label: "Vendor SKU Mapping",
    value: "VendorSKUMapping",
    componentname: "vendorskumapping",
  },
  {
    id: 6,
    label: "Inventory",
    value: "inventory",
    componentname: "inventory",
    readOnly: true,
  },
  {
    id: 8,
    label: "Personalization",
    value: "Personalization form",
    componentname: "personalization",
  },
  {
    id: 3,
    label: "Product Additional Price",
    value: "productAdditionalPrice",
    componentname: "prodAdditionalPrice",
  },
  {
    id: 9,
    label: "Product Custom Fields",
    value: "productCustomFields",
    componentname: "prodCustomFields",
  },
  // {
  //   id: 10,
  //   label: "Facet",
  //   value: "FacetForm",
  //   componentname: "facet",
  // },

  {
    id: 11,
    label: "SKU Swap",
    value: "SKUSwapForm",
    componentname: "skuswap",
  },
  {
    id: 12,
    label: "Bundle",
    value: "BundleForm",
    componentname: "bundle",
    readOnly: true,
  },
  {
    id: 13,
    label: "SEO",
    value: "SEO form",
    componentname: "seo",
  },
  {
    id: 14,
    label: "Order History",
    value: "OrderHistoryForm",
    componentname: "orderhistory",
  },
  {
    id: 15,
    label: "Customer Reviews",
    value: "CustomerReviewsForm",
    componentname: "customerreviews",
  },
  {
    id: 16,
    label: "Customer FAQ",
    value: "CustomerFAQForm",
    componentname: "customerfaq",
  },
  {
    id: 17,
    label: "Life Cycle",
    value: "LifeCycle",
    componentname: "lifecycle",
  },
];

export const EditStoreBuilderProductTabs = [
  {
    id: 0,
    label: "All",
    value: "All",
    componentname: "all",
  },
  {
    id: 1,
    label: "Basic Information",
    value: "basicInformationForm",
    componentname: "basic",
  },
  {
    id: 2,
    label: "Pricing",
    value: "pricingForm",
    componentname: "pricing",
  },
  {
    id: 3,
    label: "Attributes",
    value: "AttributeForm",
    componentname: "attributes",
    readOnly: true,
  },
  {
    id: 4,
    label: "Inventory",
    value: "Inventory Form",
    componentname: "inventory",
    readOnly: true,
  },
  {
    id: 5,
    label: "Personalization",
    value: "Personalization form",
    componentname: "personalization",
  },
  // {
  //   id: 6,
  //   label: "Facet",
  //   value: "FacetForm",
  //   componentname: "facet",
  // },
  {
    id: 7,
    label: "Order History",
    value: "OrderHistoryForm",
    componentname: "orderhistory",
  },
];

export const EditMasterTabs = [
  {
    id: 0,
    label: "All",
    value: "All",
    componentname: "all",
  },
  {
    id: 1,
    label: "Basic Information",
    value: "basicInformationForm",
    componentname: "basic",
  },
  {
    id: 2,
    label: "Pricing",
    value: "pricingForm",
    componentname: "pricing",
  },
  {
    id: 3,
    label: "Attributes",
    value: "AttributeForm",
    componentname: "attributes",
  },
  // {
  //   id: 4,
  //   label: "Vendor SKU Mapping",
  //   value: "VendorSKUMapping",
  //   componentname: "vendorskumapping",
  // },
  {
    id: 5,
    label: "Inventory",
    value: "inventory",
    componentname: "inventory",
  },
  {
    id: 6,
    label: "SEO",
    value: "SEO form",
    componentname: "seo",
  },
  {
    id: 7,
    label: "Order History",
    value: "OrderHistoryForm",
    componentname: "orderhistory",
  },
  {
    id: 8,
    label: "Customer Reviews",
    value: "CustomerReviewsForm",
    componentname: "customerreviews",
  },
  {
    id: 9,
    label: "Customer FAQ",
    value: "CustomerFAQForm",
    componentname: "customerfaq",
  },
  {
    id: 10,
    label: "Life Cycle",
    value: "LifeCycle",
    componentname: "lifecycle",
  },
];

export const EditGrandMasterTabs = [
  {
    id: 0,
    label: "All",
    value: "All",
    componentname: "all",
  },
  {
    id: 1,
    label: "Basic Information",
    value: "Basic Information",
    componentname: "basic",
  },
  {
    id: 2,
    label: "Pricing",
    value: "Pricing",
    componentname: "pricing",
  },
  // {
  //   id: 3,
  //   label: "Media",
  //   value: "Media form",
  //   componentname: "media",
  //   // readOnly: true,

  // },
  {
    id: 4,
    label: "Attributes",
    value: "AttributeForm",
    componentname: "attributes",
  },
  {
    id: 5,
    label: "Vendor SKU Mapping",
    value: "VendorSKUMapping",
    componentname: "vendorskumapping",
  },
];

export const EditBundleTabs = [
  {
    id: 0,
    label: "All",
    value: "All",
    componentname: "all",
  },
  {
    id: 1,
    label: "Basic Information",
    value: "basicInformationForm",
    componentname: "basic",
    // readOnly: true,
  },
  {
    id: 2,
    label: "Additional Information",
    value: "additionalinformation",
    componentname: "additionalinformation",
  },
  {
    id: 3,
    label: "Product",
    value: "Product form",
    componentname: "product",
    // readOnly: true,
  },
  {
    id: 4,
    label: "Pricing",
    value: "pricingForm",
    componentname: "pricing",
    // readOnly: true,
  },
  {
    id: 5,
    label: "Media",
    value: "media",
    componentname: "media",
  },
  {
    id: 6,
    label: "SEO",
    value: "SEO form",
    componentname: "seo",
    // readOnly: true,
  },
  {
    id: 7,
    label: "Order History",
    value: "OrderHistoryForm",
    componentname: "orderhistory",
  },
  {
    id: 8,
    label: "Customer Reviews",
    value: "CustomerReviewsForm",
    componentname: "customerreviews",
    // readOnly: true,
  },
  {
    id: 9,
    label: "Customer FAQ",
    value: "CustomerFAQForm",
    componentname: "customerfaq",
    // readOnly: true,
  },
  {
    id: 10,
    label: "Life Cycle",
    value: "LifeCycle",
    componentname: "lifecycle",
  },
];

export const displayTabs = [
  {
    id: 0,
    label: "General",
    value: "General",
    componentname: "General",
  },
  {
    id: 1,
    label: "Social",
    value: "Social",
    componentname: "Social",
  },
  {
    id: 2,
    label: "Integration",
    value: "Integration",
    componentname: "Integration",
  },
];

export const customerEditTabs = [
  {
    id: 0,
    label: "Personal Details",
    value: "Personal Details",
    componentname: "PersonalDetails",
    icon: "sensor_occupied",
  },
  // {
  //   id: 1,
  //   label: "Biometric-AL Analysis",
  //   value: "Biometric-AL Analysis",
  //   componentname: "BiometricALAnalysis",
  //   icon: "sensor_occupied",
  // },
  {
    id: 1,
    label: "Orders",
    value: "Orders",
    componentname: "Orders",
    icon: "add_shopping_cart",
  },
  {
    id: 2,
    label: "Products",
    value: "Products",
    componentname: "Products",
    icon: "inventory_2",
  },
  // {
  //   id: 4,
  //   label: "Custom Logo",
  //   value: "Custom Logo",
  //   componentname: "CustomLogo",
  //   icon: "store",
  // },
  {
    id: 3,
    label: "Credit Info",
    value: "Credit Info",
    componentname: "CreditInfo",
    icon: "store",
  },
  // {
  //   id: 7,
  //   label: "Consultation Request",
  //   value: "Consultation Request",
  //   componentname: "ConsultationRequest",
  //   icon: "request_quote",
  // },
  {
    id: 4,
    label: "Notes",
    value: "Notes",
    componentname: "Notes",
    icon: "description",
  },
  // {
  //   id: 9,
  //   label: "Payment Option",
  //   value: "Payment Option",
  //   componentname: "PaymentOption",
  //   icon: "payment",
  // },
  {
    id: 5,
    label: "Abandoned Cart",
    value: "Abandoned Cart",
    componentname: "AbandonedShoppingCart",
    icon: "production_quantity_limits",
  },
  {
    id: 6,
    label: "Email Log",
    value: "Emails",
    componentname: "Emails",
    icon: "email",
  },
  {
    id: 7,
    label: "Activities",
    value: "Actions",
    componentname: "Actions",
    icon: "library_books",
  },
  {
    id: 8,
    label: "Life Cycle",
    value: "LifeCycle",
    componentname: "LifeCycle",
    icon: "store",
  },
  // {
  //   id: 14,
  //   label: "Customer Gift Card",
  //   value: "CustomerGiftCard",
  //   componentname: "CustomerGiftCard",
  //   icon: "redeem",
  // }
];
export const companyEditTabs = [
  {
    id: 0,
    label: "Company Details",
    value: "Company Details",
    componentName: "CompanyDetails",
    icon: "sensor_occupied",
  },
  {
    id: 1,
    label: "Orders",
    value: "Orders",
    componentName: "Orders",
    icon: "add_shopping_cart",
  },
  {
    id: 2,
    label: "Products",
    value: "Products",
    componentName: "Products",
    icon: "inventory_2",
  },
  {
    id: 3,
    label: "Notes",
    value: "Notes",
    componentName: "Notes",
    icon: "description",
  },
  // {
  //   id: 4,
  //   label: "FeedBack",
  //   value: "FeedBack",
  //   componentName: "FeedBack",
  //   icon: "question_answer",
  // },

  {
    id: 4,
    label: "Custom Logo",
    value: "Custom Logo",
    componentName: "CustomLogo",
    icon: "store",
  },
  {
    id: 5,
    label: "Users",
    value: "Users",
    componentName: "Users",
    icon: "person_outline",
  },
  {
    id: 6,
    label: "Abounded Cart",
    value: "Abounded Cart",
    componentName: "AbandonedShoppingCart",
    icon: "production_quantity_limits",
  },
  {
    id: 7,
    label: "Consultation Request",
    value: "Consultation Request",
    componentName: "ConsultationRequest",
    icon: "request_quote",
  },
  {
    id: 8,
    label: "Life Cycle",
    value: "LifeCycle",
    componentName: "LifeCycle",
    icon: "store",
  },
];

export const OrderCustomerTabs = [
  // {
  //   id: 0,
  //   label: "Company Information",
  //   value: "Company Information form",
  //   componentname: "CompanyInfo",
  // },
  {
    id: 0,
    label: "Personal Details",
    value: "Personal Details",
    componentname: "PersonalInformation",
  },
  {
    id: 1,
    label: "Payment Option",
    value: "Payment Option Form",
    componentname: "PaymentOption",
  },
  {
    id: 2,
    label: "Order",
    value: "Order Form",
    componentname: "Order",
  },
  // {
  //   id: 4,
  //   label: "Customer Logo",
  //   value: "Customer Logo Form",
  //   componentname: "CustomerLogo",
  // },
  // {
  //   id: 5,
  //   label: "Tier Discount",
  //   value: "TierDiscount",
  //   componentname: "TierDiscount",
  // },
];

export const paginationDetails = {
  pageIndex: 1,
  pageSize: 25,
  totalCount: 0,
  hasPreviousPage: false,
  hasNextPage: false,
  hasPageSize: true,
};
export const logOptions = { 0: "Select", 1: "Team Logs", 2: "My Logs" };

export const Domains = {
  apiDomains: "https://redefine-admin.azurewebsites.net/",
  siteDomains: "http://localhost/3000/",
};

export const contentPageType = { 0: "Website", 1: "Landing", 2: "Blog" };
export const contentTabs = [
  {
    id: 1,
    label: "Website Page",
    value: "website_page",
    componentname: "website_page",
    extra: {
      storeDefaultOption: "All Website Pages",
    },
  },
  {
    id: 2,
    label: "Landing Page",
    value: "landing_page",
    componentname: "landing_page",
    extra: {
      storeDefaultOption: "All Landing Pages",
    },
  },
  {
    id: 3,
    label: "Blog",
    value: "blog",
    componentname: "blog",
    extra: {
      storeDefaultOption: "All Blog Pages",
    },
  },
];

export const LEFT = "Left Align";
export const RIGHT = "Right Align";
export const CENTER = "Center Align";

export const AppliesOptions = [
  { label: "All Products", value: "1" },
  { label: "Brands", value: "2" },
  { label: "Category", value: "3" },
  { label: "Specific Products", value: "4" },
];

export const PromotionsTypeOptions = [
  { label: "Percentage", value: "1" },
  { label: "Fixed amount", value: "2" },
  { label: "Free shipping", value: "3" },
];

export const MinRequirementsOptions = [
  { label: "None", value: "1" },
  { label: "Minimum purchase amount($)", value: "2" },
  { label: "Minimum quantity of items", value: "3" },
];

export const EligibilityOptions = [
  { label: "Limit to one use per customer", value: "1" },
  { label: "Specific customers", value: "2" },
];
export const exportTabs = [
  {
    typeName: "Export Data",
    id: 0,
  },
  {
    typeName: "Export History",
    id: 1,
  },
];
export const ImportTabs = [
  {
    typeName: "Import Data",
    id: 0,
  },
  {
    typeName: "Import History",
    id: 1,
  },
];

export const InventoryImportExportTabs = [
  {
    typeName: "Download Product File",
    id: 0,
  },
  {
    typeName: "Upload Inventory File",
    id: 1,
  },
];

export const PageName = {
  Vendor: "Vendor",
  Brand: "Brand",
  Category: "Category",
  LogoLocationMaster: "LogoLocation",
  Dimension: "Dimension",
  Attributes: "Attributes",
  QuantityDiscount: "QuantityDiscount",
  ProductTagMaster: "ProductTag",
  ProductReady: "ProductReady",
  SEOReady: "SEOReady",
  GrandMasterCatalogProduct: "GrandMasterProduct",
  MasterCatalogProduct: "MasterProduct",
  Product: "StoreProduct",
  Bundle: "Bundle",
  Customer: "Customer",
  StoreProductCategory: "StoreProductCategory",
  StoreProductBrand: "StoreProductBrand",
};

export const SavedComponent = "Saved Component";

export const productActivityDropDownData = [
  { value: "0", label: "Product Inventory" },
  { value: "1", label: "Product Orders" },
];
export const customerProductTab = [
  {
    id: 0,
    label: "Purchased",
    value: "Purchased",
    componentname: "Purchased",
  },
  {
    id: 1,
    label: "Added to cart",
    value: "cart",
    componentname: "Cart",
  },
  {
    id: 2,
    label: "Viewed",
    value: "Viewed",
    componentname: "Viewed",
  },
  {
    id: 4,
    label: "Wishlist",
    value: "Wishlist",
    componentname: "Wishlist",
  },
];

export const companyProductTab = [
  {
    id: 0,
    label: "Purchased",
    value: "Purchased",
    componentname: "Purchased",
  },
  {
    id: 1,
    label: "Added to cart",
    value: "cart",
    componentname: "Cart",
  },
  {
    id: 2,
    label: "Viewed",
    value: "Viewed",
    componentname: "Viewed",
  },
  {
    id: 3,
    label: "All Products",
    value: "AllProducts",
    componentname: "AllProducts",
  },
  {
    id: 4,
    label: "Wishlist",
    value: "Wishlist",
    componentname: "Wishlist",
  },
];

export const ContentPageStatus = {
  Publish: "Publish",
  Draft: "Draft",
};

export const companyId = 1;
export const AssetLibraryBasePath = `/${companyId}/`;
export const CustomCssFilePath = `${companyId}/store`;

export const blobFolder = {
  temp: "temp",
  brand: "Brand",
  vendor: "Vendor",
  attribute: "Attribute",
  category: "Category",
  color: "Color",
  dimension: "Dimension",
  logoLocation: "LogoLocation",
  productTag: "ProductTag",
  quantityDiscount: "QuantityDiscount",
  readiness: "Readiness",
  store: "Store",
  bundle: "Bundle",
  product: "Product",
  grandMaster: "GrandMaster",
  mastercatalog: "MasterCatalog",
  storeBuilder: "StoreBuilder",
  profile: "Profile",
  account: "Account",
  user: "User",
  seo: "Seo",
  import: "Import",
  export: "Export",
  customLogo: "CustomLogo",
  resendEmailAttachments: "resendEmailAttachments",
  themeConfiguration: "ThemeConfiguration",
  companyConfiguration: "CompanyConfiguration",
  socialSettings: "SocialSettings",
  elementBackground: "ElementBackground",
  elementDynamics: "ElementDynamics",
  elementHeader: "ElementHeader",
  elementImages: "ElementImages",
  media: "Media",
  attributeImages: "AttributeImages",
  attributeViews: "AttributeViews",
  seoViews: "SeoViews",
  catalog: "Catalog",
  tagModals: "TagModals",
  catalogModals: "catalogModals",
  openGraph: "OpenGraph",
  seoSocial: "SeoSocial",
  giftCard: "GiftCard",
  storiesImage: "storiesImage",
  content: "content",
  formBuilder: "FormBuilder",
  productImage: "productImage",
  testimonial: "Testimonial",
  prodConfigFields: "ProdConfigFields",
  newsLetterArchive: "NewsLetterArchive",
  SlideShowMaster: "SlideShowMaster",
  slides: "Slides",
};

export const DasshboardData = [
  {
    title: "Master Product Feed",
    subTitle: "Product Management",
    Icon: "library_books",
    url: "/admin/master/dashboard",
    codeName: "MCF",
  },
  {
    title: "Content",
    subTitle: "Content Management",
    Icon: "article",
    url: "/admin/Content/Dashboard",
    codeName: "Content",
  },
  {
    title: "Stores",
    subTitle: "Stores Management",
    Icon: "fact_check",
    url: "/admin/stores/dashboard",
    codeName: "Stores",
  },
  {
    title: "Store Builder",
    subTitle: "Store Builder Management",
    Icon: "add_business",
    url: "/admin/stores/StoreBuilder/dashboard",
    codeName: "StoreBuilder",
  },
  {
    title: "Form Builder",
    subTitle: "Form Builder Management",
    Icon: "analytics",
    url: "/admin/stores/FormBuilder/dashboard",
    codeName: "FormBuilder",
  },
  {
    title: "Promotions",
    subTitle: "Promotions Management",
    Icon: "local_offer",
    url: "/admin/promotions/couponCodes",
    codeName: "Promotions",
  },
  {
    title: "Orders",
    subTitle: "Orders Management",
    Icon: "local_mall",
    butttonstore: "store",
    url: "/admin/Order/orders",
    codeName: "Orders",
  },
  {
    title: "Customer",
    subTitle: "Customers Management",
    Icon: "people_alt",
    url: "/admin/Customer/customer",
    codeName: "Customers",
  },
  // {
  //   title: "Google Analytics",
  //   subTitle: "Google/Semrush Reports",
  //   Icon: "analytics",
  //   url: "/admin/analytics",
  //   codeName: "googleAnalytics"

  // },
  {
    title: "Reports",
    subTitle: "Reports Management",
    Icon: "fact_check",
    url: "/admin/reports",
    codeName: "Reports",
  },
];

export const MenuType = [
  { label: "None", value: "none" },
  { label: "Dynamic", value: "dynamic" },
  { label: "Custom", value: "custom" },
];

export const storeBuilderTabs = [
  {
    id: 0,
    label: "Setup",
    value: "setup",
    componentname: "setup",
  },
  {
    id: 1,
    label: "General",
    value: "general",
    componentname: "general",
  },
  {
    id: 2,
    label: "Payment & Info",
    value: "paymentInfo",
    componentname: "paymentInfo",
  },
  {
    id: 3,
    label: "Taxes & Fees",
    value: "tax",
    componentname: "tax",
  },
  {
    id: 4,
    label: "Messages",
    value: "message",
    componentname: "message",
  },
  {
    id: 5,
    label: "Template",
    value: "template",
    componentname: "template",
  },
  {
    id: 6,
    label: "Categories",
    value: "category",
    componentname: "category",
  },
  {
    id: 7,
    label: "Products",
    value: "product",
    componentname: "product",
  },
  {
    id: 8,
    label: "Sequence",
    value: "sequence",
    componentname: "sequence",
  },
  {
    id: 9,
    label: "Report",
    value: "report",
    componentname: "report",
  },
  {
    id: 10,
    label: "Share Report",
    value: "shareReport",
    componentname: "shareReport",
  },
];

export const storeBuilderRequireFields = {
  yes: "Yes",
  no: "No",
};

export const orderNotes = {
  order: "N",
  Internal: "I",
  shipped: "S",
};
export const EditStoreBuilderBundleTabs = [
  {
    id: 0,
    label: "All",
    value: "All",
    componentname: "all",
  },
  {
    id: 1,
    label: "Basic Information",
    value: "basicInformationForm",
    componentname: "basic",
    // readOnly: true,
  },
  {
    id: 2,
    label: "Pricing",
    value: "pricingForm",
    componentname: "pricing",
    // readOnly: true,
  },
  {
    id: 3,
    label: "Images",
    value: "Media form",
    componentname: "attributes",
    // readOnly: true,
  },
  {
    id: 4,
    label: "Products",
    value: "Product form",
    componentname: "product",
    // readOnly: true,
  },
];

export const CurrencySymbolByCode = {
  BRL: "R$",
  CAD: "CA$",
  CNY: "¥",
  EUR: "€",
  GBP: "£",
  INR: "₹",
  KPW: "₩",
  KYD: "CI$",
  RUB: "₽",
  SGD: "S$",
  THB: "฿",
  USD: "$",
};
export const ShippedVia = [
  { value: "usps", label: "USPS" },
  { value: "ups", label: "UPS" },
  { value: "ODFD", label: "One Day Fast Delivery" },
];

export const InventoryTypeForMasterCatalog = {
  SanMarInventoryUpdate: 1,
  ResParkInventoryUpdate: 2,
  AlphaBorderInventoryUpdate: 3,
  NavInventoryUpdate: 4,
};

export const RandomColors = [
  "#86EFAC",
  "#263cff",
  "#B5BECC",
  "#93C5FD",
  "#FDA4AF",
  "#FDE047",
  "#7DD3FC",
  "#BEF264",
  "#FDBA74",
  "#D8B4FE",
  "#F9A8D4",
  "#67E8F9",
];

export const BannerLinkUrlTypeOptions = [
  { label: "internal", value: "internal" },
  { label: "external", value: "external" },
];

export const StoriesImageDisplaySideBar = [
  { label: "None", value: "None" },
  { label: "Left", value: "Left" },
  { label: "Center", value: "Center" },
  { label: "Right", value: "Right" },
];

export const FormBuilderTabUpdateData = [
  { id: 0, step: "01", label: "Setup", component: "Setup", visiblity: true },
  {
    id: 1,
    step: "02",
    label: "Save & Configure Form",
    component: "SaveAndConfigureForm",
    visiblity: true,
  },
  {
    id: 2,
    step: "03",
    label: "Configuration",
    component: "Configuration",
    visiblity: true,
  },
];

// export const FormBuilderTabData = [
//   { id: 0, step: "01", label: "Setup", component: "setup", visiblity: true },
//   {
//     id: 1,
//     step: "02",
//     label: "Save & Configure Form",
//     component: "SaveAndConfigureForm",
//     visiblity: true,
//   },
// ]

export const FormBuilderFormStepData = [
  { id: 0, step: "01", label: "Form 01", component: "page1", visiblity: true },
  { id: 1, step: "02", label: "Form 02", component: "page2", visiblity: true },
  { id: 2, step: "03", label: "Form 03", component: "page3", visiblity: true },
  { id: 3, step: "04", label: "Form 04", component: "page4", visiblity: true },
  { id: 4, step: "05", label: "Form 05", component: "page5", visiblity: true },
];

export const optionForHeaderIcon = [
  { label: "Cart", value: "shopping_cart" },
  { label: "Account", value: "person" },
  { label: "Wishlist", value: "favorite_border" },
  { label: "Search", value: "search" },
  { label: "Notification", value: "notifications_active" },
];

export const FormTypeOption = [
  { label: "Fill Multi Product Form", value: "filledUpForm" },
  { label: "Request Form", value: "requestForm" },
];

export const StoreMastertab = [
  {
    id: 0,
    label: "Footer",
    value: "Footer",
    componentName: "Footer",
  },
  {
    id: 1,
    label: "Custom CSS",
    value: "Custom CSS",
    componentName: "CustomCss",
  },
  {
    id: 2,
    label: "Custom Script",
    value: "Custom Script",
    componentName: "CustomScript",
  },
  {
    id: 3,
    label: "Google Tags",
    value: "Google Tags",
    componentName: "GoogleTags",
  },
  {
    id: 4,
    label: "Social Media Links",
    value: "Social Media Links",
    componentName: "SocialMediaLinks",
  },
  {
    id: 5,
    label: "Contact Info",
    value: "Contact Info",
    componentName: "ContactInfo",
  },
  // {
  //   id: 6,
  //   label: "Custom Footer",
  //   value: "Custom Footer",
  //   componentName: "CustomFooter",
  // },
];

export const StoreShareReportStep = [
  {
    id: 0,
    label: "Overview",
    value: "overview",
    componentname: "overview",
  },
  {
    id: 1,
    label: "Share with Group",
    value: "shareWithGroup",
    componentname: "shareWithGroup",
  },
  {
    id: 2,
    label: "Orders",
    value: "orders",
    componentname: "orders",
  },
];

export const CmdBackgroundColorObj = [
  { label: "Primary", value: "primary" },
  { label: "Secondary", value: "secondary" },
  { label: "Tertiary ", value: "tertiary" },
  { label: "Quaternary", value: "quaternary" },
];

export const productSectionDisplayOption = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
];
export const footerFormData = [
  {
    type: "radio",
    name: "customFooterImage",
    value: "1",
    id: "1",
    image: "/images/customFooter/1.jpg",
  },
  {
    type: "radio",
    name: "customFooterImage",
    value: "2",
    id: "2",
    image: "/images/customFooter/2.jpg",
  },
  {
    type: "radio",
    name: "customFooterImage",
    value: "3",
    id: "3",
    image: "/images/customFooter/3.jpg",
  },
  {
    type: "radio",
    name: "customFooterImage",
    value: "4",
    id: "4",
    image: "/images/customFooter/4.jpg",
  },
];

export const DurationFilter = [
  { label: "All Duration", value: "0" },
  { label: "Last 24 Hours", value: 1 },
  { label: "Yesterday", value: 7 },
  { label: "Last 7 Days", value: 2 },
  { label: "Last 30 Days", value: 3 },
  { label: "Last 6 Months", value: 6 },
  { label: "Current Year", value: 5 },
  { label: "Previous Year", value: 4 },
  // { label: "Custom", value: 8 },
];

export const masterCatalogStoreTypes = [
  "ecommercestore",
  "corporatestore",
  "storebuilder",
  "formbuilder",
];

export const widgetPageType = {
  draftPages: "Draft Pages",
  securePages: "Secure Pages",
  totalPages: "Total Pages",
  publishedPages: "Published Pages",
};

export const passwordStrengthType = {
  1: "Not set",
  2: "Fair",
  3: "Good",
  4: "Strong",
};

export const StoreBuilderStoreType = [
  { label: "Health", value: 1 },
  { label: "Team", value: 2 },
  { label: "Corporate", value: 3 },
];

export const IndiaAndUSAMobileFormat =
  /^(?:\+1)?(?:\s|-)?\(?[2-9]\d{2}\)?(?:\s|-)?\d{3}(?:\s|-)?\d{4}$|^(?:\+1)?(?:\s|-)?\d{3}(?:\s|-)?\d{3}(?:\s|-)?\d{4}$|^(?:\+91|0)?(?:\s|-)?[1-9]\d{9}$/;

export const decimalNumberCheck = /^\d+(\.\d{1,2})?$/;

export const AddressType = {
  billing: "billing",
  shipping: "shipping",
  state: {
    billing: "billingState",
    shipping: "shipState",
  },
};

export const logoLocationPosition = [
  { label: "Bottom Left", value: "Bottom Left" },
  { label: "Center", value: "Center" },
  { label: "Bottom Right", value: "Bottom Right" },
  { label: "Top Right", value: "Top Right" },
  { label: "Top Left", value: "Top Left" },
];

export const cutomerFilterDropdown = [
  { label: "All", value: "0" },
  { label: "Customer", value: 1 },
  { label: "Employee", value: 2 },
];

export const OrderByResults = {
  Name: 1,
  SequenceDisplayOrder: 2,
};
export const CustomerReview = [
  {
    id: 1,
    label: "Pending",
    value: "Panding",
    componentname: "pending",
    filter: [
      {
        field: "status",
        operator: 1,
        value: "Pending",
      },
    ],
  },
  {
    id: 2,
    label: "Approve",
    value: "Approve",
    componentname: "approve",
    filter: [
      {
        field: "status",
        operator: 1,
        value: "Approved",
      },
    ],
  },
  {
    id: 3,
    label: "Disapproved",
    value: "disapproved",
    componentname: "disapproved",
    filter: [
      {
        field: "status",
        operator: 1,
        value: "Disapproved",
      },
    ],
  },
];

export const consultationTabs = [
  {
    id: 0,
    label: "All",
    value: "All",
    componentname: "All",
    filter: [],
  },
  {
    id: 1,
    label: "New",
    value: "New",
    componentname: "New",
    filter: [
      {
        field: "status",
        operator: 1,
        value: "new",
      },
    ],
  },
  {
    id: 2,
    label: " In progress",
    value: "InProgress",
    componentname: "Inprogress",
    filter: [
      {
        field: "status",
        operator: 1,
        value: "inprogress",
      },
    ],
  },
  {
    id: 3,
    label: "Approved",
    value: "Approved",
    componentname: "Approved",
    filter: [
      {
        field: "status",
        operator: 1,
        value: "approved",
      },
    ],
  },
  {
    id: 4,
    label: "Junk",
    value: "Junk",
    componentname: "Junk",
    filter: [
      {
        field: "status",
        operator: 1,
        value: "junk",
      },
    ],
  },
  {
    id: 5,
    label: "Rejected",
    value: "Rejected",
    componentname: "Rejected",
    filter: [
      {
        field: "status",
        operator: 1,
        value: "rejected",
      },
    ],
  },
];

export const SEOH1toH6ColorCheck = {
  Red: 1,
  Yellow: 2,
  Green: 3,
};

export const mediaQueryVariableForFontSize = {
  "10px": { tablet: "10px", mobile: "10px" },
  "11px": { tablet: "11px", mobile: "11px" },
  "12px": { tablet: "12px", mobile: "12px" },
  "13px": { tablet: "13px", mobile: "13px" },
  "14px": { tablet: "14px", mobile: "14px" },
  "15px": { tablet: "15px", mobile: "14px" },
  "16px": { tablet: "16px", mobile: "14px" },
  "17px": { tablet: "17px", mobile: "14px" },
  "18px": { tablet: "17px", mobile: "14px" },
  "19px": { tablet: "17px", mobile: "14px" },
  "20px": { tablet: "17px", mobile: "14px" },
  "21px": { tablet: "18px", mobile: "14px" },
  "22px": { tablet: "18px", mobile: "14px" },
  "23px": { tablet: "18px", mobile: "14px" },
  "24px": { tablet: "19px", mobile: "14px" },
  "25px": { tablet: "19px", mobile: "14px" },
  "26px": { tablet: "19px", mobile: "14px" },
  "27px": { tablet: "19px", mobile: "14px" },
  "28px": { tablet: "20px", mobile: "14px" },
  "29px": { tablet: "20px", mobile: "14px" },
  "30px": { tablet: "21px", mobile: "14px" },
  "31px": { tablet: "21px", mobile: "16px" },
  "32px": { tablet: "22px", mobile: "16px" },
  "33px": { tablet: "22px", mobile: "16px" },
  "34px": { tablet: "23px", mobile: "16px" },
  "35px": { tablet: "23px", mobile: "16px" },
  "36px": { tablet: "24px", mobile: "18px" },
  "37px": { tablet: "24px", mobile: "18px" },
  "38px": { tablet: "24px", mobile: "18px" },
  "39px": { tablet: "24px", mobile: "18px" },
  "40px": { tablet: "24px", mobile: "18px" },
  "41px": { tablet: "24px", mobile: "18px" },
  "42px": { tablet: "24px", mobile: "18px" },
  "43px": { tablet: "24px", mobile: "18px" },
  "44px": { tablet: "24px", mobile: "18px" },
  "45px": { tablet: "25px", mobile: "20px" },
  "46px": { tablet: "25px", mobile: "20px" },
  "47px": { tablet: "26px", mobile: "20px" },
  "48px": { tablet: "26px", mobile: "20px" },
  "49px": { tablet: "27px", mobile: "20px" },
  "50px": { tablet: "27px", mobile: "20px" },
  "51px": { tablet: "28px", mobile: "22px" },
  "52px": { tablet: "28px", mobile: "22px" },
  "53px": { tablet: "29px", mobile: "22px" },
  "54px": { tablet: "29px", mobile: "22px" },
  "55px": { tablet: "30px", mobile: "22px" },
  "56px": { tablet: "30px", mobile: "22px" },
  "57px": { tablet: "31px", mobile: "23px" },
  "58px": { tablet: "31px", mobile: "23px" },
  "59px": { tablet: "32px", mobile: "23px" },
  "60px": { tablet: "32px", mobile: "23px" },
  "61px": { tablet: "33px", mobile: "23px" },
  "62px": { tablet: "33px", mobile: "23px" },
  "63px": { tablet: "34px", mobile: "24px" },
  "64px": { tablet: "34px", mobile: "24px" },
  "65px": { tablet: "35px", mobile: "24px" },
  "66px": { tablet: "35px", mobile: "24px" },
  "67px": { tablet: "36px", mobile: "24px" },
  "68px": { tablet: "36px", mobile: "24px" },
  "69px": { tablet: "37px", mobile: "25px" },
  "70px": { tablet: "37px", mobile: "25px" },
  "71px": { tablet: "38px", mobile: "25px" },
  "72px": { tablet: "38px", mobile: "25px" },
  "73px": { tablet: "39px", mobile: "25px" },
  "74px": { tablet: "39px", mobile: "25px" },
  "75px": { tablet: "40px", mobile: "26px" },
  "76px": { tablet: "40px", mobile: "26px" },
  "77px": { tablet: "41px", mobile: "26px" },
  "78px": { tablet: "41px", mobile: "26px" },
  "79px": { tablet: "42px", mobile: "26px" },
  "80px": { tablet: "42px", mobile: "26px" },
  "81px": { tablet: "43px", mobile: "27px" },
  "82px": { tablet: "43px", mobile: "27px" },
  "83px": { tablet: "44px", mobile: "27px" },
  "84px": { tablet: "44px", mobile: "27px" },
  "85px": { tablet: "45px", mobile: "27px" },
  "86px": { tablet: "45px", mobile: "27px" },
  "87px": { tablet: "46px", mobile: "28px" },
  "88px": { tablet: "46px", mobile: "28px" },
  "89px": { tablet: "47px", mobile: "28px" },
  "90px": { tablet: "47px", mobile: "28px" },
  "91px": { tablet: "48px", mobile: "28px" },
  "92px": { tablet: "48px", mobile: "28px" },
  "93px": { tablet: "49px", mobile: "29px" },
  "94px": { tablet: "49px", mobile: "29px" },
  "95px": { tablet: "50px", mobile: "29px" },
  "96px": { tablet: "50px", mobile: "29px" },
  "97px": { tablet: "50px", mobile: "30px" },
  "98px": { tablet: "50px", mobile: "30px" },
  "99px": { tablet: "50px", mobile: "30px" },
  "100px": { tablet: "50px", mobile: "30px" },
};

export const mediaQueryVariableForLineHeight = {
  "10px": { tablet: "10px", mobile: "10px" },
  "11px": { tablet: "11px", mobile: "11px" },
  "12px": { tablet: "12px", mobile: "12px" },
  "13px": { tablet: "13px", mobile: "13px" },
  "14px": { tablet: "14px", mobile: "14px" },
  "15px": { tablet: "15px", mobile: "15px" },
  "16px": { tablet: "16px", mobile: "16px" },
  "17px": { tablet: "17px", mobile: "17px" },
  "18px": { tablet: "18px", mobile: "17px" },
  "19px": { tablet: "18px", mobile: "17px" },
  "20px": { tablet: "19px", mobile: "17px" },
  "21px": { tablet: "19px", mobile: "18px" },
  "22px": { tablet: "20px", mobile: "18px" },
  "23px": { tablet: "20px", mobile: "18px" },
  "24px": { tablet: "21px", mobile: "19px" },
  "25px": { tablet: "21px", mobile: "19px" },
  "26px": { tablet: "22px", mobile: "19px" },
  "27px": { tablet: "22px", mobile: "19px" },
  "28px": { tablet: "23px", mobile: "19px" },
  "29px": { tablet: "23px", mobile: "19px" },
  "30px": { tablet: "24px", mobile: "20px" },
  "31px": { tablet: "25px", mobile: "20px" },
  "32px": { tablet: "26px", mobile: "20px" },
  "33px": { tablet: "26px", mobile: "20px" },
  "34px": { tablet: "27px", mobile: "20px" },
  "35px": { tablet: "27px", mobile: "20px" },
  "36px": { tablet: "28px", mobile: "20px" },
  "37px": { tablet: "28px", mobile: "20px" },
  "38px": { tablet: "29px", mobile: "20px" },
  "39px": { tablet: "29px", mobile: "20px" },
  "40px": { tablet: "30px", mobile: "20px" },
  "41px": { tablet: "30px", mobile: "21px" },
  "42px": { tablet: "31px", mobile: "21px" },
  "43px": { tablet: "31px", mobile: "21px" },
  "44px": { tablet: "32px", mobile: "21px" },
  "45px": { tablet: "32px", mobile: "21px" },
  "46px": { tablet: "33px", mobile: "22px" },
  "47px": { tablet: "33px", mobile: "22px" },
  "48px": { tablet: "34px", mobile: "22px" },
  "49px": { tablet: "34px", mobile: "22px" },
  "50px": { tablet: "35px", mobile: "22px" },
  "51px": { tablet: "35px", mobile: "23px" },
  "52px": { tablet: "36px", mobile: "23px" },
  "53px": { tablet: "36px", mobile: "23px" },
  "54px": { tablet: "37px", mobile: "23px" },
  "55px": { tablet: "37px", mobile: "23px" },
  "56px": { tablet: "38px", mobile: "24px" },
  "57px": { tablet: "38px", mobile: "24px" },
  "58px": { tablet: "39px", mobile: "24px" },
  "59px": { tablet: "39px", mobile: "24px" },
  "60px": { tablet: "40px", mobile: "24px" },
  "61px": { tablet: "40px", mobile: "24px" },
  "62px": { tablet: "41px", mobile: "25px" },
  "63px": { tablet: "41px", mobile: "25px" },
  "64px": { tablet: "42px", mobile: "25px" },
  "65px": { tablet: "42px", mobile: "25px" },
  "66px": { tablet: "43px", mobile: "25px" },
  "67px": { tablet: "43px", mobile: "25px" },
  "68px": { tablet: "44px", mobile: "25px" },
  "69px": { tablet: "44px", mobile: "26px" },
  "70px": { tablet: "44px", mobile: "26px" },
  "71px": { tablet: "44px", mobile: "26px" },
  "72px": { tablet: "45px", mobile: "26px" },
  "73px": { tablet: "45px", mobile: "26px" },
  "74px": { tablet: "45px", mobile: "26px" },
  "75px": { tablet: "45px", mobile: "27px" },
  "76px": { tablet: "46px", mobile: "27px" },
  "77px": { tablet: "46px", mobile: "27px" },
  "78px": { tablet: "46px", mobile: "27px" },
  "79px": { tablet: "46px", mobile: "27px" },
  "80px": { tablet: "47px", mobile: "28px" },
  "81px": { tablet: "47px", mobile: "28px" },
  "82px": { tablet: "47px", mobile: "28px" },
  "83px": { tablet: "47px", mobile: "28px" },
  "84px": { tablet: "47px", mobile: "28px" },
  "85px": { tablet: "48px", mobile: "28px" },
  "86px": { tablet: "48px", mobile: "28px" },
  "87px": { tablet: "48px", mobile: "29px" },
  "88px": { tablet: "48px", mobile: "29px" },
  "89px": { tablet: "48px", mobile: "29px" },
  "90px": { tablet: "49px", mobile: "29px" },
  "91px": { tablet: "49px", mobile: "29px" },
  "92px": { tablet: "49px", mobile: "29px" },
  "93px": { tablet: "49px", mobile: "30px" },
  "94px": { tablet: "49px", mobile: "30px" },
  "95px": { tablet: "50px", mobile: "30px" },
  "96px": { tablet: "50px", mobile: "30px" },
  "97px": { tablet: "50px", mobile: "31px" },
  "98px": { tablet: "50px", mobile: "31px" },
  "99px": { tablet: "50px", mobile: "31px" },
  "100px": { tablet: "50px", mobile: "31px" },
};

export const storeBuidlerReportTabs = [
  {
    id: 0,
    label: "Order Report",
    value: "OrderReport",
    componentname: "Orderreport",
  },
  {
    id: 1,
    label: "Product Report",
    value: "ProductReport",
    componentname: "Productreport",
  },
  {
    id: 2,
    label: "Customer Report",
    value: "CustomerReport",
    componentname: "Customerreport",
  },
  {
    id: 3,
    label: "Fundrasing Report",
    value: "FundrasingReport",
    componentname: "Fundrasingreport",
  },
  {
    id: 4,
    label: "Flyers",
    value: "Flyers",
    componentname: "Flyers",
  },
  {
    id: 5,
    label: "Receipts",
    value: "Receipts",
    componentname: "Receipts",
  },
  {
    id: 6,
    label: "Order Details",
    value: "OrderDetails",
    componentname: "OrderDetails",
  },
];

export const StoreBuilderProductStatusTabs = [
  {
    id: 0,
    label: "All",
    value: "All",
    componentname: "All",
    filter: [
      {
        field: "recStatus",
        operator: 0,
        value: "A,I,D",
      },
    ],
  },
  {
    id: 2,
    label: "Synced with NAV",
    value: "Synced with NAV",
    componentname: "Synced with NAV",
    filter: [
      {
        field: "navSyncStatus",
        operator: 0,
        value: "S",
      },
    ],
  },
  {
    id: 3,
    label: "Resync with NAV",
    value: "ResyncwithNAV",
    componentname: "Resync with NAV",
    filter: [
      {
        field: "navSyncStatus",
        operator: 0,
        value: "R",
      },
    ],
  },
  {
    id: 4,
    label: "NAV Sync Pending",
    value: "NAVSyncPending",
    componentname: "NAV Sync Pending",
    filter: [
      {
        field: "navSyncStatus",
        operator: 0,
        value: "P",
      },
    ],
  },
  // {
  //   id: 5,
  //   label: "Bundle",
  //   value: "Bundle",
  //   componentname: "Bundle",
  //   filter: [],
  // },
];

export const storeBuilderListDropdown = [
  {
    label: "All",
    value: "All",
    filter: [],
  },
  {
    label: "Active",
    value: "Active",
    filter: [
      {
        field: "status",
        operator: 0,
        value: "A",
        type: "moreFilter",
      },
    ],
  },
  {
    label: "Inactive",
    value: "Inactive",
    filter: [
      {
        field: "status",
        operator: 0,
        value: "I",
        type: "moreFilter",
      },
    ],
  },
];

export const ProductAttributeTypeValues = {
  WithAttribute: 1,
  WithoutAttribute: 2,
};

export const CustomerApplicationListModalInfo = {
  module: "Application",
  statusApprove: "Approve",
  statusReject: "Reject",
  titleApprove: "Approve this Application",
  titleReject: "Approve this Application",
  ButtonNameApprove: "Approve",
  ButtonNameReject: "Reject",
  view: "View",
  changeStatusASIDistributor: "S",
  statusASIDistributor: "ASI Distributor",
  ButtonNameASIDistributor: "ASI Distributor",
};

export const CategoryEditTabs = [
  {
    id: 0,
    label: "All",
    value: "All",
    componentname: "all",
  },
  {
    id: 1,
    label: "Basic Information",
    value: "Basic Information",
    componentname: "BasicInfo",
  },
  {
    id: 2,
    label: "Images",
    value: "Images",
    componentname: "Images",
  },
  {
    id: 3,
    label: "Additional Information",
    value: "Additional Information",
    componentname: "AdditionalInformation",
  },
  {
    id: 4,
    label: "Category Products",
    value: "Category Products",
    componentname: "CategoryProducts",
  },
  {
    id: 5,
    label: "Cart Page Policy",
    value: "CartPagePolicy",
    componentname: "CartPagePolicy",
  },
  {
    id: 6,
    label: "Category SEO",
    value: "Category SEO",
    componentname: "CategorySEO",
  },
];
export const CheckboxMultiOrSingle = [
  { label: "Single", value: "Single" },
  { label: "Multi-Select", value: "Multi-Select" },
];
export const CategoryLandingPageValues = [
  { label: "DefaultPage", value: "DefaultPage" },
  { label: "Landing Page 01", value: "LandingPage01" },
  { label: "Landing Page 02", value: "LandingPage02" },
  { label: "Landing Page 03", value: "LandingPage03" },
  { label: "Landing Page 04", value: "LandingPage04" },
];

export const UpdateMessage = {
  storeEdit: {
    message: ValidationMsgs.store.storeUpdated,
  },
  storeConfiguration: {
    message: "Configuration updated successfully",
  },
  StoreMenuConfiguration: {
    message: "Menu updated successfully",
  },
  storeheaderConfiguration: {
    message: ValidationMsgs.cmsConfig.headerConfig.headerUpdated,
  },
  storeSeoConfiguration: {
    message: ValidationMsgs.store.created,
  },
  storeThemeConfiguration: {
    message: ValidationMsgs.cmsConfig.themeStored,
  },
  categoryStatusUpdated: {
    message: ValidationMsgs.category.categoryStatusUpdated,
  },
  categoryUpdated: {
    message: ValidationMsgs.category.categoryUpdated,
  },
  additionalInformation: {
    message: "Additional information is updated successfully.",
  },
  cartPagePolicyUpdated: {
    message: ValidationMsgs.category.cartPagePolicyUpdated,
  },
  imageDeleted: {
    message: ValidationMsgs.category.imageDeleted,
  },
  imageCreated: {
    message: ValidationMsgs.category.imageCreated,
  },
  imageUpdated: {
    message: ValidationMsgs.category.imageUpdated,
  },
  seoUpdated: {
    message: ValidationMsgs.category.seoUpdated,
  },
};
