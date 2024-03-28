import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ReactDOM from "react-dom";
import Select from "react-select";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";

import DropdownService from "services/common/dropdown/DropdownService";
import ProductService from "services/admin/master/master/products/ProductService";
import TopicsDetailsServices from "services/admin/topics/TopicsDetailsServices";

import ColorPicker from "components/admin/content/common/ColorPicker";

import AddProductsDialog from "../modal/addProductModal/AddProductsMoal";
import { CircularProgress } from "@mui/material";

const ElmentFeaturedProducts = (props) => {
    const dispatch = useDispatch();

    const [sectionTitle, setSectionTitle] = useState("");
    const [customMessage, setCustomMessage] = useState("");
    const [productsToDisplay, setProductsToDisplay] = useState("featured");
    const [productCount, setProductCount] = useState(4);
    const [showBorder, setShowBorder] = useState("No");
    const [productNameDisplay, setProductNameDisplay] = useState("No");
    const [showSplitProducts, setShowSplitProducts] = useState("No");
    const [showPrice, setShowPrice] = useState("No");
    const [showBrandLogo, setShowBrandLogo] = useState("No");
    const [showButton, setShowButton] = useState("No");
    const [scrollableSection, setScrollableSection] = useState("No");
    const [brands, setBrands] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [tabName, setTabName] = useState("");
    const [footerTabColorName, setFooterTabColorName] = useState("");
    const [tabing, setTabing] = useState("No");
    const [footerTabing, setFooterTabing] = useState("No");
    const [productType, setProductType] = useState("");
    const [displayMethod, setDisplayMethod] = useState("");
    const [addBtn, setAddBtn] = useState(false);
    const [editBtn, setEditBtn] = useState(false);
    const [showTabField, setShowTabField] = useState(true);
    const [showFooterTabingField, setShowFooterTabingField] = useState(true);
    const [editEnabled, setEditEnabled] = useState(false);
    const [tabValArr, setTabValArr] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [dynamicProducts, setDynamicProducts] = useState([]);
    const [pos, setPos] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [storeId, setStorId] = useState(null);
    const [productBrandLogo, setProductBrandLogo] = useState("");
    const [dataError, setDataError] = useState(false);
    const [saveDataToggleFlag, setSaveDataToggleFlag] = useState(false);
    const [loading, setLoading] = useState(false);
    const [settingObject, setSettingObject] = useState({});

    const { id } = useParams();

    const [showHide, setShowHide] = useState(false);
    const [iconStyle, setIconStyle] = useState("caret");

    const AdminAppConfigReducers = useSelector(
        (store) => store?.AdminAppConfigReducers,
    );

    const showHideProperties = () => {
        if (showHide == true) setShowHide(false);
        else {
            const allWithClass = Array.from(
                document.querySelectorAll("div.property-content"),
            );
            allWithClass.forEach((element) => {
                element.classList.add("hidden");
            });

            setShowHide(true);
        }
    };

    const selectedObj = props.componentHtml.filter(
        (obj) => obj.uid == props.currentComponent,
    );

    let attributes = {};

    const bgPropertyName = props.variable; //selectedObj.length > 0 ? Object.keys(selectedObj[0].properties).find(key => selectedObj[0].properties[key] === "background") : [];

    /* When click on any component background component will reload and
      we have called function to set default properties */

    useEffect(() => {
        TopicsDetailsServices?.getTopicDetails(id).then((res) => {
            setStorId(res?.data?.data?.storeId);
        });
    }, [id]);

    useEffect(() => {
        if (storeId) {
            if (productType != "") {
                if (!editBtn) {
                    setSelectedBrands([]);
                }

                let data = {
                    args: {
                        pageIndex: 1,
                        pageSize: 10000,
                        pagingStrategy: 0,
                        sortingOptions: [
                            {
                                field: "string",
                                direction: 0,
                                priority: 0,
                            },
                        ],
                        filteringOptions: [
                            {
                                field: "recStatus",
                                operator: 0,
                                value: "A",
                            },
                        ],
                    },
                    storeID: storeId,
                };

                if (productType === "Brand") {
                    DropdownService.getProductsBrands(data).then((res) => {
                        let data = [];
                        res.data.data.items.map((brand, ind) => {
                            data.push({ label: brand.name, value: brand.seName });
                        });
                        setBrands(() => {
                            return data;
                        });
                    });
                } else if (productType === "Category") {
                    DropdownService.getProductsCategory(data).then((res) => {
                        let data = [];
                        res.data.data.items.map((category, ind) => {
                            data.push({ label: category.name, value: category.seName });
                        });
                        setBrands(() => {
                            return data;
                        });
                    });
                }
            }
        }
    }, [productType, storeId]);

    useEffect(() => {
        props.updateProperty({ type: "tabs", value: tabValArr }, bgPropertyName);
        if (tabValArr.length > 0) {
            brandHTMLDisplay(tabValArr);
        }
    }, [tabValArr]);

    useEffect(() => {
        // props.updateProperty({ type: "fp_section_title", value: sectionTitle }, bgPropertyName+"_section_title");
        // props.updateProperty({ type: "fp_product_scrollable", value: scrollableSection }, bgPropertyName+"_scrollable_section");
        // props.updateProperty({ type: "fp_product_count", value: productCount }, bgPropertyName+"_product_count");
        // props.updateProperty({ type: "fp_product_display_type", value: productsToDisplay }, bgPropertyName+"_product_to_display");

        /* Here when change component,values are not retiNING */
        if (selectedObj.length > 0) {
            let tmpVal;
            let tmpSectionTitle;
            let tmpProductDisplay;
            let tmpCustomMessage;
            let tmpShowProductName;
            let tmpShowSplitProducts;
            let tmpShowBorder;
            let tmpShowButton;
            let tmpShowPrice;
            let tmpShowBrandLogo;
            let setting_obj = {};
            Object.entries(selectedObj[0].selected_Values).map(([key, value]) => {
                if (key == bgPropertyName) {
                    tmpVal = value;
                }

                if (key == bgPropertyName + "_section_title") {
                    tmpSectionTitle = value;
                }

                if (key == bgPropertyName + "_custom_message") {
                    tmpCustomMessage = value;
                }

                if (key == bgPropertyName + "_show_product_name") {
                    tmpShowProductName = value;
                }
                if (key == bgPropertyName + "_show_split_products") {
                    tmpShowSplitProducts = value;
                }
                if (key == bgPropertyName + "_show_button") {
                    tmpShowButton = value;
                }
                if (key == bgPropertyName + "_show_price") {
                    tmpShowPrice = value;
                }
                if (key == bgPropertyName + "_show_brand_logo") {
                    tmpShowBrandLogo = value;
                }

                if (key == bgPropertyName + "_product_to_display") {
                    tmpProductDisplay = value;
                }
                if (key == bgPropertyName + "_show_border") {
                    tmpShowBorder = value;
                }
            });
            if (tmpSectionTitle != undefined) {
                let attributes = tmpSectionTitle;
                setSectionTitle(attributes.value);
            }
            if (tmpCustomMessage != undefined) {
                let attributes = tmpCustomMessage;
                setCustomMessage(attributes.value);
            }
            if (tmpShowProductName != undefined) {
                let attributes = tmpShowProductName;
                setProductNameDisplay(attributes.value);
                setting_obj = { ...setting_obj, productNameDisplay: attributes?.value };
            }
            if (tmpShowSplitProducts != undefined) {
                let attributes = tmpShowSplitProducts;
                setShowSplitProducts(attributes.value);
                setting_obj = { ...setting_obj, showSplitProducts: attributes?.value };
            }
            if (tmpShowButton != undefined) {
                let attributes = tmpShowButton;
                setShowButton(attributes.value);
                setting_obj = { ...setting_obj, showButton: attributes?.value };
            }
            if (tmpShowPrice != undefined) {
                let attributes = tmpShowPrice;
                setShowPrice(attributes.value);
                setting_obj = { ...setting_obj, showPrice: attributes?.value };
            }
            if (tmpShowBrandLogo != undefined) {
                let attributes = tmpShowBrandLogo;
                setShowBrandLogo(attributes.value);
                setting_obj = { ...setting_obj, showBrandLogo: attributes?.value };
            }
            if (tmpProductDisplay != undefined) {
                let attributes = tmpProductDisplay;
                setProductsToDisplay(attributes.value);
            }
            if (tmpShowBorder != undefined) {
                let attributes = tmpShowBorder;
                setShowBorder(attributes?.value);
                setting_obj = { ...setting_obj, showBorder: attributes?.value };
            }
            if (tmpVal != undefined) {
                let attributes = tmpVal;
                if (attributes?.value.length > 0) {
                    brandHTMLDisplay([...attributes?.value]);
                    if (attributes?.value[0]?.tabing) {
                        setShowTabField(false);
                        setTabing("Yes");
                    }
                    if (attributes?.value[0]?.footerTabing) {
                        setShowFooterTabingField(false);
                        setFooterTabing("Yes");
                    }
                    productDisplayCount(attributes?.value[0]?.data, setting_obj);
                    setSettingObject(setting_obj);
                    setDynamicProducts(attributes?.value[0]?.data);
                }
                setTabValArr(attributes.value);
            } else {
                setTabValArr([]);
            }
        }
    }, [props.currentComponent]);

    const fetchAllProducts = async () => {
        if (storeId) {
            if ((selectedBrands.length > 0 && productType) || saveDataToggleFlag) {
                let data = {
                    sename:
                        displayMethod == "manual"
                            ? selectedProducts.map((product) => product?.seName).join(",")
                            : selectedBrands.map((brand) => brand.value).join(","),
                    type: displayMethod == "manual" ? "manual" : productType,
                    storeId: storeId,
                    maximumItemsForFetch:
                        displayMethod == "manual" ? selectedProducts?.length : productCount,
                    tagName: displayMethod == "manual" ? "" : productsToDisplay,
                };
                const res = await ProductService.getFeaturedProductsByTagName(data);
                setDynamicProducts(res.data.data);
                setProductBrandLogo(res?.data?.data?.productBrandLogo);
                if (res.data.data.length == 0) {
                    setDataError(true);
                } else {
                    setDataError(false);
                }
                setSaveDataToggleFlag(false);
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        fetchAllProducts();
    }, [
        selectedBrands,
        productType,
        saveDataToggleFlag,
        selectedProducts,
        storeId,
        productCount,
    ]);

    const updateSectionTitle = (event) => {
        let x = ReactDOM.findDOMNode(
            props.refArray.current[props.currentComponent],
        );
        if (x)
            x.querySelectorAll("#sectionTitle")[0].innerHTML = event.target.value;
        props.updateProperty(
            { type: "fp_section_title", value: event.target.value },
            bgPropertyName + "_section_title",
        );
        setSectionTitle(event.target.value);
    };

    const updateCustomMessage = (event) => {
        props.updateProperty(
            { type: "fp_custom_message", value: event.target.value },
            bgPropertyName + "_custom_message",
        );
        setCustomMessage(event.target.value);
    };

    const handleBorderDisplay = (val) => {
        props.updateProperty(
            { type: "fp_show_border", value: val },
            bgPropertyName + "_show_border",
        );
        if (val === "Yes") {
            productDisplayCount(dynamicProducts, { showBorder: val });
        } else {
            productDisplayCount(dynamicProducts, { showBorder: val });
        }
        setShowBorder(val);
        setSettingObject((prev) => {
            return { ...prev, showBorder: val };
        });
    };
    const handleProductNameDisplay = (val) => {
        props.updateProperty(
            { type: "fp_show_product_name", value: val },
            bgPropertyName + "_show_product_name",
        );
        if (val === "Yes") {
            productDisplayCount(dynamicProducts, {
                showBorder: showBorder,
                productNameDisplay: val,
            });
        } else {
            productDisplayCount(dynamicProducts, {
                showBorder: showBorder,
                productNameDisplay: val,
            });
        }
        setProductNameDisplay(val);
        setSettingObject((prev) => {
            return { ...prev, productNameDisplay: val };
        });
    };
    const handleSplitProducts = (val) => {
        props.updateProperty(
            { type: "fp_show_split_products", value: val },
            bgPropertyName + "_show_split_products",
        );
        if (val === "Yes") {
            productDisplayCount(dynamicProducts, {
                showBorder: showBorder,
                productNameDisplay: productNameDisplay,
                showSplitProducts: val,
            });
        } else {
            productDisplayCount(dynamicProducts, {
                showBorder: showBorder,
                productNameDisplay: productNameDisplay,
                showSplitProducts: val,
            });
        }
        setShowSplitProducts(val);
        setSettingObject((prev) => {
            return { ...prev, showSplitProducts: val };
        });
    };
    const handleDetailsButton = (val) => {
        props.updateProperty(
            { type: "fp_show_button", value: val },
            bgPropertyName + "_show_button",
        );
        if (val === "Yes") {
            productDisplayCount(dynamicProducts, {
                showBorder: showBorder,
                productNameDisplay: productNameDisplay,
                showSplitProducts: showSplitProducts,
                showButton: val,
            });
        } else {
            productDisplayCount(dynamicProducts, {
                showBorder: showBorder,
                productNameDisplay: productNameDisplay,
                showSplitProducts: showSplitProducts,
                showButton: val,
            });
        }
        setShowButton(val);
        setSettingObject((prev) => {
            return { ...prev, showButton: val };
        });
    };
    const handlePriceDisplay = (val) => {
        props.updateProperty(
            { type: "fp_show_price", value: val },
            bgPropertyName + "_show_price",
        );
        if (val === "Yes") {
            productDisplayCount(dynamicProducts, {
                showBorder: showBorder,
                productNameDisplay: productNameDisplay,
                showSplitProducts: showSplitProducts,
                showButton: showButton,
                showPrice: val,
            });
        } else {
            productDisplayCount(dynamicProducts, {
                showBorder: showBorder,
                productNameDisplay: productNameDisplay,
                showSplitProducts: showSplitProducts,
                showButton: showButton,
                showPrice: val,
            });
        }
        setShowPrice(val);
        setSettingObject((prev) => {
            return { ...prev, showPrice: val };
        });
    };
    const handleBrandLogoDisplay = (val) => {
        props.updateProperty(
            { type: "fp_show_brand_logo", value: val },
            bgPropertyName + "_show_brand_logo",
        );
        if (val === "Yes") {
            productDisplayCount(dynamicProducts, {
                showBorder: showBorder,
                productNameDisplay: productNameDisplay,
                showSplitProducts: showSplitProducts,
                showButton: showButton,
                showPrice: showPrice,
                showBrandLogo: val,
            });
        } else {
            productDisplayCount(dynamicProducts, {
                showBorder: showBorder,
                productNameDisplay: productNameDisplay,
                showSplitProducts: showSplitProducts,
                showButton: showButton,
                showPrice: showPrice,
                showBrandLogo: val,
            });
        }
        setShowBrandLogo(val);
        setSettingObject((prev) => {
            return { ...prev, showBrandLogo: val };
        });
    };

    const showTabing = (val) => {
        props.updateProperty(
            { type: "fp_tabing_display", value: val },
            bgPropertyName + "_tabing_display",
        );
        setTabing(val);
    };
    const showFooterTabing = (val) => {
        props.updateProperty(
            { type: "fp_footer_tabing_display", value: val },
            bgPropertyName + "_footer_tabing_display",
        );
        setFooterTabing(val);
    };

    const changeScrollableSection = (val) => {
        props.updateProperty(
            { type: "fp_product_scrollable", value: val },
            bgPropertyName + "_scrollable_section",
        );
        setScrollableSection(val);
    };

    const updateProductCount = (event) => {
        // props.updateProperty({ type: "fp_product_count", value: event.target.value }, bgPropertyName + "_product_count");
        setProductCount(event.target.value);
        // productDisplayCount(event.target.value);
    };

    const changeProductsToDisplay = (val) => {
        props.updateProperty(
            { type: "fp_product_display_type", value: val },
            bgPropertyName + "_product_to_display",
        );
        setProductsToDisplay(val);
    };

    const productDisplayCount = (products, fp_settings_object) => {
        let list = "";
        if (products && products.length) {
            products.forEach((product, index) => {
                let innerList = "";
                product?.moreImages.forEach((img, ind) => {
                    innerList += `<li
                      class="w-[30px] h-[30px] p-[1px] border-2 border-primary hover:border-primary ${ind > 3 ? "hidden" : ""}"
                    >
                      <img
                        src=${AdminAppConfigReducers["azure:BlobUrl"]}${img?.imageUrl}
                        alt=""
                        title=""
                        class=""
                      />
                    </li>`;
                });
                list += `
                    <li class="text-center ${index > 3 ? "hidden" : ""}">
                      <div
                        class="flex justify-center w-full ${fp_settings_object?.showBorder == "Yes" ? "border" : ""} border-gray-border" 
                    >
                        <div class="relative w-full mb-[20px]">
                          <div class="w-full px-[20px] pt-[10px]">
                            <img
                                src=${AdminAppConfigReducers["azure:BlobUrl"]}${product?.imageUrl}
                                alt="Patagonia Men's R1 Daily Jacket"
                                class="w-auto h-auto max-h-max"
                            />
                          </div>
                          <div
                            class="mt-[20px] relative md:px-[30px] px-[15px]"
                          >
                            
                            
                            ${fp_settings_object?.productNameDisplay == "Yes"
                        ? `<div
                              class="mb-[10px] mt-[10px] h-[46px] text-anchor hover:text-anchor-hover text-medium-text"
                            >
                              <a href="product-page.html" class="relative"
                                >${product?.productName}</a>
                            </div>`
                        : ""
                    }
                           ${fp_settings_object?.showPrice == "Yes"
                        ? `<div
                              class="mb-[12px] text-default-text font-semibold"
                            >
                              <span class="">MSRP $${product?.msrp}</span>
                            </div>`
                        : ""
                    }
                           ${fp_settings_object?.showSplitProducts == "Yes"
                        ? `<ul
                                role="list"
                                class="flex flex-wrap items-center mt-2 justify-center space-x-1"
                            >
                                ${innerList}
                            </ul>`
                        : ""
                    }
                            </div>
                        </div>
                      </div>
                    </li>
                   `;
            });
        }

        let outer = `<div class="mt-[20px] relative">
        <div class="relative w-full pb-6 -mb-6">
          <ul
            role="list"
            class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-4 gap-6 lg:gap-8 mb-8"
          >
            ${list}
          </ul>
        </div>`;

        let x = ReactDOM.findDOMNode(
            props.refArray.current[props.currentComponent],
        );
        x.querySelectorAll("#productsDisplay")[0].innerHTML = outer;
    };

    const brandHTMLDisplay = (value) => {
        let x = ReactDOM.findDOMNode(
            props.refArray.current[props.currentComponent],
        );
        let tmp = "";
        value.forEach((el) => {
            tmp +=
                "<li className='mr-0.5 md:mr-0 font-semibold'><a href='javacsript:void(0)' className='tab py-2 mr-1 px-2 block hover:text-primary text-primary focus:outline-none text-default-text border-b-2 font-medium border-primary'>" +
                el.tabName +
                "</a></li>";
        });
        if (x) x.querySelectorAll("#brandsDisplay")[0].innerHTML = tmp;
    };

    const changeSelectedBrands = (selected) => {
        setSelectedBrands(selected);
        setIsEdit(false);
    };

    const handleTab = (event) => {
        setTabName(event.target.value);
    };
    const handleFooterTabColor = (color) => {
        setFooterTabColorName(color.hex);
    };

    const handleProductType = (event) => {
        setProductType(event.target.value);
        setIsEdit(false);
    };

    const handleDisplayMethod = (event) => {
        setDisplayMethod(event.target.value);
        setIsEdit(false);
    };

    const saveTab = () => {
        if (tabing == "Yes" && tabName == "") {
            dispatch(
                setAlertMessage({
                    type: "success",
                    message: "Please add Tab Name",
                }),
            );
        } else if (displayMethod == "") {
            dispatch(
                setAlertMessage({
                    type: "success",
                    message: "Please Select Product Display Method",
                }),
            );
        } else if (displayMethod == "dynamic" && productType == "") {
            dispatch(
                setAlertMessage({
                    type: "success",
                    message: "Please Select Fetch Product By",
                }),
            );
        } else if (displayMethod == "dynamic" && selectedBrands.length == 0) {
            dispatch(
                setAlertMessage({
                    type: "success",
                    message: "Please Select Atleast one product",
                }),
            );
        } else {
            setEditEnabled(false);
            saveTabValues();
        }
    };

    const saveTabValues = () => {
        let tabData;

        if (!tabValArr.length) {
            if (displayMethod == "dynamic") {
                //    setLoadDynamicData(!loadDynamicData);
                tabData = {
                    index: `item-${tabValArr.length + 1}`,
                    tabing: tabing,
                    tabName: tabing == "Yes" ? tabName : "",
                    footerTabing: footerTabing,
                    footerTabColorName: footerTabing == "Yes" ? footerTabColorName : "",
                    displayMethod: displayMethod,
                    productType: productType,
                    selectedBrands: selectedBrands,
                    productCount: productCount,
                    data: dynamicProducts,
                };
                productDisplayCount(dynamicProducts, settingObject);
            } else {
                tabData = {
                    index: `item-${tabValArr.length + 1}`,
                    tabing: tabing,
                    tabName: tabing == "Yes" ? tabName : "",
                    footerTabing: footerTabing,
                    footerTabColorName: footerTabing == "Yes" ? footerTabColorName : "",
                    displayMethod: displayMethod,
                    productCount: dynamicProducts.length,
                    data: dynamicProducts,
                    selectedProducts: selectedProducts,
                };
                productDisplayCount(dynamicProducts, settingObject);
            }
            setShowTabField(false);
            setShowFooterTabingField(false);
        } else {
            if (displayMethod == "dynamic") {
                //    setLoadDynamicData(!loadDynamicData);
                tabData = {
                    index: `item-${tabValArr.length + 1}`,
                    tabing: tabValArr[0].tabing == "Yes" ? "Yes" : "No",
                    tabName: tabValArr[0].tabing == "Yes" ? tabName : "",
                    footerTabing: tabValArr[0]?.footerTabing == "Yes" ? "Yes" : "No",
                    footerTabColorName:
                        tabValArr[0].footerTabing == "Yes" ? footerTabColorName : "",
                    displayMethod: displayMethod,
                    productType: productType,
                    selectedBrands: selectedBrands,
                    productCount: productCount,
                    data: dynamicProducts,
                };
            } else {
                tabData = {
                    index: `item-${tabValArr.length + 1}`,
                    tabing: tabValArr[0].tabing == "Yes" ? "Yes" : "No",
                    tabName: tabValArr[0].tabing == "Yes" ? tabName : "",
                    footerTabing: tabValArr[0]?.footerTabing == "Yes" ? "Yes" : "No",
                    footerTabColorName:
                        tabValArr[0].footerTabing == "Yes" ? footerTabColorName : "",
                    displayMethod: displayMethod,
                    productCount: dynamicProducts.length,
                    data: dynamicProducts,
                    selectedProducts: selectedProducts,
                };
            }
        }
        setTabValArr((previous) => [...previous, tabData]);
        brandHTMLDisplay([...tabValArr, tabData]);
        setAddBtn(false);
        setTabName("");
        setFooterTabColorName("");
        setDisplayMethod("");
        setProductType("");
        setSelectedBrands([]);
        setProductCount(4);
        setSelectedProducts([]);
    };

    const reOrder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        const reorderedItem = reOrder(
            tabValArr,
            result.source.index,
            result.destination.index,
        );
        setTabValArr(reorderedItem);
    };
    const onDragEnd2 = (result) => {
        if (!result.destination) {
            return;
        }
        const reorderedItem = reOrder(
            selectedProducts,
            result.source.index,
            result.destination.index,
        );
        setSelectedProducts(reorderedItem);
    };

    const deleteAcc = (element) => {
        let tmpVal = [];
        if (element.index == "item-1") {
            setShowTabField(true);
            setShowFooterTabingField(true);
        }
        tabValArr.map((tabValue, index) => {
            if (tabValue.index != element.index) {
                tmpVal.push(tabValue);
            }
        });
        setTabValArr(tmpVal);
        brandHTMLDisplay([...tmpVal]);
        productDisplayCount(tmpVal[0]?.data, settingObject);
    };

    const updateTab = () => {
        setEditEnabled(false);

        let tmpVal = tabValArr.map((tabValue, index) => {
            if (tabValue.index == pos) {
                let tabData;
                if (tabValue.index == "item-1") {
                    if (displayMethod == "dynamic") {
                        tabData = {
                            index: tabValue?.index,
                            tabing: tabing,
                            tabName: tabing == "Yes" ? tabName : "",
                            footerTabing: footerTabing,
                            footerTabColorName:
                                footerTabing == "Yes" ? footerTabColorName : "",
                            displayMethod: displayMethod,
                            productType: productType,
                            selectedBrands: selectedBrands,
                            productCount: productCount,
                            data: dynamicProducts,
                        };
                        productDisplayCount(dynamicProducts, settingObject);
                    } else {
                        tabData = {
                            index: tabValue?.index,
                            tabing: tabing,
                            tabName: tabing == "Yes" ? tabName : "",
                            footerTabing: footerTabing,
                            footerTabColorName:
                                footerTabing == "Yes" ? footerTabColorName : "",
                            displayMethod: displayMethod,
                            productCount: selectedProducts.length,
                            data: dynamicProducts,
                            selectedProducts: selectedProducts,
                        };
                        productDisplayCount(dynamicProducts, settingObject);
                    }
                    setShowTabField(false);
                    setShowFooterTabingField(false);
                } else {
                    if (displayMethod == "dynamic") {
                        tabData = {
                            index: tabValue?.index,
                            tabing: tabValArr[0].tabing == "Yes" ? "Yes" : "No",
                            tabName: tabValArr[0].tabing == "Yes" ? tabName : "",
                            footerTabing: tabValArr[0]?.footerTabing == "Yes" ? "Yes" : "No",
                            footerTabColorName:
                                tabValArr[0].footerTabing == "Yes" ? footerTabColorName : "",
                            displayMethod: displayMethod,
                            productType: productType,
                            selectedBrands: selectedBrands,
                            productCount: productCount,
                            data: dynamicProducts,
                        };
                    } else {
                        tabData = {
                            index: tabValue?.index,
                            tabing: tabValArr[0].tabing == "Yes" ? "Yes" : "No",
                            tabName: tabValArr[0].tabing == "Yes" ? tabName : "",
                            footerTabing: tabValArr[0]?.footerTabing == "Yes" ? "Yes" : "No",
                            footerTabColorName:
                                tabValArr[0].footerTabing == "Yes" ? footerTabColorName : "",
                            displayMethod: displayMethod,
                            productCount: dynamicProducts.length,
                            data: dynamicProducts,
                            selectedProducts: selectedProducts,
                        };
                    }
                }
                return tabData;
            } else {
                return tabValue;
            }
        });

        setTabValArr(tmpVal);
        if (tmpVal[0]?.tabing == "Yes") {
            brandHTMLDisplay([...tmpVal]);
        } else {
            brandHTMLDisplay([]);
        }
        setEditBtn(false);
        setAddBtn(false);
        setTabName("");
        setFooterTabColorName("");
        setDisplayMethod("");
        setProductType("");
        setSelectedBrands([]);
        setProductCount(4);
        setSelectedProducts([]);
    };

    return (
        <>
            <div className="relative border-b border-neutral-00">
                <button
                    onClick={() => {
                        showHideProperties();
                    }}
                    className="flex w-full flex-wrap justify-between items-center text-sm px-3 py-4 bg-white border-0 font-bold"
                >
                    <span>{props.compprop.title ?? "Element Configuration"}</span>
                    <span className="material-icons-outlined">expand_more</span>
                </button>

                <div
                    className={`property-content bg-white border-y border-b-0 border-neutral-200 ${showHide ? "" : "hidden"}`}
                >
                    <div className="mx-2 text-sm">
                        <div className="py-2 px-3 w-full">
                            {/* <div className="mb-3 last:mb-0">
                                <div className="">
                                    <div className="flex justify-between items-center mb-1">
                                        <div>Section Title</div>
                                    </div>
                                    <div className="text-center relative overflow-hidden">
                                        <input type="text" className="w-full grow text-sm bg-white text-gray-700 border border-neutral-300 p-3 py-2 leading-tight focus:ring-0 focus:shadow-none focus:outline-none" defaultValue={sectionTitle} onChange={updateSectionTitle} />
                                    </div>
                                </div>
                           </div> */}
                            <div className="mb-3 last:mb-0">
                                <div className="">
                                    <div className="flex justify-between items-center mb-1">
                                        <div>Custom Product Message</div>
                                    </div>
                                    <div className="text-center relative overflow-hidden">
                                        <input
                                            type="text"
                                            className="w-full grow text-sm bg-white text-gray-700 border border-neutral-300 p-3 py-2 leading-tight focus:ring-0 focus:shadow-none focus:outline-none"
                                            defaultValue={customMessage}
                                            onChange={updateCustomMessage}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3 last:mb-0">
                                <div className="flex justify-between items-center mb-1">
                                    <div>Show Border</div>
                                </div>
                                <div className="flex flex-wrap divide-x divide-neutral-300 border border-neutral-300 overflow-hidden">
                                    <button
                                        value="Yes"
                                        onClick={(event) => {
                                            handleBorderDisplay(event.target.value);
                                        }}
                                        className={`w-1/2 px-2 py-1.5 inline-flex justify-center items-center text-sm focus:ring-0 focus:shadow-none focus:outline-none ${showBorder === "Yes" ? "bg-[#F1F5F9]" : "bg-white"}`}
                                        title="Yes"
                                    >
                                        Yes
                                    </button>
                                    <button
                                        value="No"
                                        onClick={(event) => {
                                            handleBorderDisplay(event.target.value);
                                        }}
                                        className={`w-1/2 px-2 py-1.5 inline-flex justify-center items-center text-sm focus:ring-0 focus:shadow-none focus:outline-none ${showBorder === "No" ? "bg-[#F1F5F9]" : "bg-white"}`}
                                        title="No"
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                            <div className="mb-3 last:mb-0">
                                <div className="flex justify-between items-center mb-1">
                                    <div>Show Product Name</div>
                                </div>
                                <div className="flex flex-wrap divide-x divide-neutral-300 border border-neutral-300 overflow-hidden">
                                    <button
                                        value="Yes"
                                        onClick={(event) => {
                                            handleProductNameDisplay(event.target.value);
                                        }}
                                        className={`w-1/2 px-2 py-1.5 inline-flex justify-center items-center text-sm focus:ring-0 focus:shadow-none focus:outline-none ${productNameDisplay === "Yes" ? "bg-[#F1F5F9]" : "bg-white"}`}
                                        title="Yes"
                                    >
                                        Yes
                                    </button>
                                    <button
                                        value="No"
                                        onClick={(event) => {
                                            handleProductNameDisplay(event.target.value);
                                        }}
                                        className={`w-1/2 px-2 py-1.5 inline-flex justify-center items-center text-sm focus:ring-0 focus:shadow-none focus:outline-none ${productNameDisplay === "No" ? "bg-[#F1F5F9]" : "bg-white"}`}
                                        title="No"
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                            <div className="mb-3 last:mb-0">
                                <div className="flex justify-between items-center mb-1">
                                    <div>Show Split Products</div>
                                </div>
                                <div className="flex flex-wrap divide-x divide-neutral-300 border border-neutral-300 overflow-hidden">
                                    <button
                                        value="Yes"
                                        onClick={(event) => {
                                            handleSplitProducts(event.target.value);
                                        }}
                                        className={`w-1/2 px-2 py-1.5 inline-flex justify-center items-center text-sm focus:ring-0 focus:shadow-none focus:outline-none ${showSplitProducts === "Yes" ? "bg-[#F1F5F9]" : "bg-white"}`}
                                        title="Yes"
                                    >
                                        Yes
                                    </button>
                                    <button
                                        value="No"
                                        onClick={(event) => {
                                            handleSplitProducts(event.target.value);
                                        }}
                                        className={`w-1/2 px-2 py-1.5 inline-flex justify-center items-center text-sm focus:ring-0 focus:shadow-none focus:outline-none ${showSplitProducts === "No" ? "bg-[#F1F5F9]" : "bg-white"}`}
                                        title="No"
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                            <div className="mb-3 last:mb-0">
                                <div className="flex justify-between items-center mb-1">
                                    <div>Show Button</div>
                                </div>
                                <div className="flex flex-wrap divide-x divide-neutral-300 border border-neutral-300 overflow-hidden">
                                    <button
                                        value="Yes"
                                        onClick={(event) => {
                                            handleDetailsButton(event.target.value);
                                        }}
                                        className={`w-1/2 px-2 py-1.5 inline-flex justify-center items-center text-sm focus:ring-0 focus:shadow-none focus:outline-none ${showButton === "Yes" ? "bg-[#F1F5F9]" : "bg-white"}`}
                                        title="Yes"
                                    >
                                        Yes
                                    </button>
                                    <button
                                        value="No"
                                        onClick={(event) => {
                                            handleDetailsButton(event.target.value);
                                        }}
                                        className={`w-1/2 px-2 py-1.5 inline-flex justify-center items-center text-sm focus:ring-0 focus:shadow-none focus:outline-none ${showButton === "No" ? "bg-[#F1F5F9]" : "bg-white"}`}
                                        title="No"
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                            <div className="mb-3 last:mb-0">
                                <div className="flex justify-between items-center mb-1">
                                    <div>Show Price</div>
                                </div>
                                <div className="flex flex-wrap divide-x divide-neutral-300 border border-neutral-300 overflow-hidden">
                                    <button
                                        value="Yes"
                                        onClick={(event) => {
                                            handlePriceDisplay(event.target.value);
                                        }}
                                        className={`w-1/2 px-2 py-1.5 inline-flex justify-center items-center text-sm focus:ring-0 focus:shadow-none focus:outline-none ${showPrice === "Yes" ? "bg-[#F1F5F9]" : "bg-white"}`}
                                        title="Yes"
                                    >
                                        Yes
                                    </button>
                                    <button
                                        value="No"
                                        onClick={(event) => {
                                            handlePriceDisplay(event.target.value);
                                        }}
                                        className={`w-1/2 px-2 py-1.5 inline-flex justify-center items-center text-sm focus:ring-0 focus:shadow-none focus:outline-none ${showPrice === "No" ? "bg-[#F1F5F9]" : "bg-white"}`}
                                        title="No"
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                            <div className="mb-3 last:mb-0">
                                <div className="flex justify-between items-center mb-1">
                                    <div>Show Brand Logo</div>
                                </div>
                                <div className="flex flex-wrap divide-x divide-neutral-300 border border-neutral-300 overflow-hidden">
                                    <button
                                        value="Yes"
                                        onClick={(event) => {
                                            handleBrandLogoDisplay(event.target.value);
                                        }}
                                        className={`w-1/2 px-2 py-1.5 inline-flex justify-center items-center text-sm focus:ring-0 focus:shadow-none focus:outline-none ${showBrandLogo === "Yes" ? "bg-[#F1F5F9]" : "bg-white"}`}
                                        title="Yes"
                                    >
                                        Yes
                                    </button>
                                    <button
                                        value="No"
                                        onClick={(event) => {
                                            handleBrandLogoDisplay(event.target.value);
                                        }}
                                        className={`w-1/2 px-2 py-1.5 inline-flex justify-center items-center text-sm focus:ring-0 focus:shadow-none focus:outline-none ${showBrandLogo === "No" ? "bg-[#F1F5F9]" : "bg-white"}`}
                                        title="No"
                                    >
                                        No
                                    </button>
                                </div>
                            </div>

                            <div className="mb-3 last:mb-0">
                                <div className="flex justify-between items-center mb-1">
                                    <div>Products to Display</div>
                                </div>
                                <div className="flex flex-wrap divide-x divide-neutral-300 border border-neutral-300 overflow-hidden">
                                    <button
                                        value="featured"
                                        onClick={(event) => {
                                            changeProductsToDisplay(event.target.value);
                                        }}
                                        className={`w-1/3 px-2 py-1.5 inline-flex justify-center items-center text-sm focus:ring-0 focus:shadow-none focus:outline-none ${productsToDisplay === "featured" ? "bg-[#F1F5F9]" : "bg-white"}`}
                                        title="Yes"
                                    >
                                        Featured
                                    </button>
                                    <button
                                        value="bestseller"
                                        onClick={(event) => {
                                            changeProductsToDisplay(event.target.value);
                                        }}
                                        className={`w-1/3 px-2 py-1.5 inline-flex justify-center items-center text-sm focus:ring-0 focus:shadow-none focus:outline-none ${productsToDisplay === "bestseller" ? "bg-[#F1F5F9]" : "bg-white"}`}
                                        title="No"
                                    >
                                        Best Sellers
                                    </button>
                                    <button
                                        value="newarrival"
                                        onClick={(event) => {
                                            changeProductsToDisplay(event.target.value);
                                        }}
                                        className={`w-1/3 px-2 py-1.5 inline-flex justify-center items-center text-sm focus:ring-0 focus:shadow-none focus:outline-none ${productsToDisplay === "newarrival" ? "bg-[#F1F5F9]" : "bg-white"}`}
                                        title="No"
                                    >
                                        New Arrivals
                                    </button>
                                </div>
                            </div>

                            <div className="mb-3 last:mb-0">
                                <div className="flex justify-between items-center mb-1 font-semibold">
                                    <div>Tabs</div>
                                </div>
                            </div>
                            <div className="mb-3 last:mb-0">
                                <DragDropContext onDragEnd={onDragEnd}>
                                    <Droppable droppableId="FeaturedProductTabing">
                                        {(provided, snapshot) => (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                className="my-2"
                                                id="accordions_list"
                                            >
                                                {tabValArr.length > 0 &&
                                                    tabValArr.map((tabValue, index) => {
                                                        return (
                                                            <Draggable
                                                                key={tabValue.index}
                                                                draggableId={tabValue.index}
                                                                index={index}
                                                            >
                                                                {(provided, snapshot) => (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        className="p-2 border border-neutral-200 border-b-0 last:border-b flex items-center justify-between "
                                                                    >
                                                                        <div className="flex items-center justify-between w-full">
                                                                            <div className="flex items-center">
                                                                                <span className="material-icons-outlined">
                                                                                    drag_indicator
                                                                                </span>
                                                                                <div className="">
                                                                                    {tabValArr[0]?.tabing == "Yes"
                                                                                        ? tabValue.tabName
                                                                                        : ""}
                                                                                </div>
                                                                            </div>
                                                                            {!editEnabled && (
                                                                                <>
                                                                                    <div>
                                                                                        <a
                                                                                            href="javascript:void(0)"
                                                                                            onClick={() => {
                                                                                                setEditEnabled(true);
                                                                                                setTabing(tabValArr[0]?.tabing);
                                                                                                setTabName(
                                                                                                    tabValArr[0]?.tabing == "Yes"
                                                                                                        ? tabValue?.tabName
                                                                                                        : "",
                                                                                                );
                                                                                                setFooterTabing(
                                                                                                    tabValArr[0]?.footerTabing,
                                                                                                );
                                                                                                setFooterTabColorName(
                                                                                                    tabValArr[0]?.footerTabing ==
                                                                                                        "Yes"
                                                                                                        ? tabValue?.footerTabColorName
                                                                                                        : "",
                                                                                                );
                                                                                                setDisplayMethod(
                                                                                                    tabValue?.displayMethod,
                                                                                                );
                                                                                                tabValue?.displayMethod ==
                                                                                                    "dynamic" &&
                                                                                                    setProductType(
                                                                                                        tabValue?.productType,
                                                                                                    );
                                                                                                tabValue?.displayMethod ==
                                                                                                    "manual"
                                                                                                    ? setSelectedProducts(
                                                                                                        tabValue.selectedProducts,
                                                                                                    )
                                                                                                    : setSelectedProducts([]);
                                                                                                tabValue?.displayMethod ==
                                                                                                    "dynamic" &&
                                                                                                    setSelectedBrands(
                                                                                                        tabValue?.selectedBrands,
                                                                                                    );
                                                                                                setPos(tabValue?.index);
                                                                                                tabValue?.index == "item-1"
                                                                                                    ? setShowTabField(true)
                                                                                                    : setShowTabField(false);
                                                                                                tabValue?.index == "item-1"
                                                                                                    ? setShowFooterTabingField(
                                                                                                        true,
                                                                                                    )
                                                                                                    : setShowFooterTabingField(
                                                                                                        false,
                                                                                                    );
                                                                                                setAddBtn(false);
                                                                                                setEditBtn(true);
                                                                                                setProductCount(
                                                                                                    tabValue?.productCount,
                                                                                                );
                                                                                                setDynamicProducts(
                                                                                                    tabValue?.data,
                                                                                                );
                                                                                                setIsEdit(true);
                                                                                            }}
                                                                                        >
                                                                                            <span className="material-icons-outlined ml-3">
                                                                                                mode_edit
                                                                                            </span>
                                                                                        </a>
                                                                                        <a
                                                                                            href="javascript:void(0)"
                                                                                            onClick={() => {
                                                                                                deleteAcc(tabValue);
                                                                                            }}
                                                                                        >
                                                                                            <span className="material-icons-outlined ml-3">
                                                                                                delete_outline
                                                                                            </span>
                                                                                        </a>
                                                                                    </div>
                                                                                </>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        );
                                                    })}
                                            </div>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                            </div>

                            <div className="mb-3 last:mb-0">
                                {!addBtn && !editBtn && (
                                    <button
                                        className="btn bg-indigo-500 hover:bg-indigo-600 text-white w-full"
                                        onClick={(event) => {
                                            setAddBtn(true);
                                        }}
                                    >
                                        + Add Tab
                                    </button>
                                )}
                            </div>

                            {(addBtn || editBtn) && (
                                <>
                                    <div className="py-2">
                                        {showTabField && (
                                            <div className="mb-3 last:mb-0">
                                                <div className="flex justify-between items-center mb-1">
                                                    <div>Show Tab Name</div>
                                                </div>
                                                <div className="flex flex-wrap divide-x divide-neutral-300 border border-neutral-300 overflow-hidden">
                                                    <button
                                                        value="Yes"
                                                        onClick={(event) => {
                                                            showTabing(event.target.value);
                                                        }}
                                                        className={`w-1/2 px-2 py-1.5 inline-flex justify-center items-center text-sm focus:ring-0 focus:shadow-none focus:outline-none ${tabing === "Yes" ? "bg-[#F1F5F9]" : "bg-white"}`}
                                                        title="Yes"
                                                    >
                                                        Yes
                                                    </button>
                                                    <button
                                                        value="No"
                                                        onClick={(event) => {
                                                            showTabing(event.target.value);
                                                        }}
                                                        className={`w-1/2 px-2 py-1.5 inline-flex justify-center items-center text-sm focus:ring-0 focus:shadow-none focus:outline-none ${tabing === "No" ? "bg-[#F1F5F9]" : "bg-white"}`}
                                                        title="No"
                                                    >
                                                        No
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {tabing == "Yes" && (
                                            <div className="mb-3 last:mb-0">
                                                <div className="">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <div>Tab Name</div>
                                                    </div>
                                                    <div className="text-center relative overflow-hidden">
                                                        <input
                                                            type="text"
                                                            className="w-full grow text-sm bg-white text-gray-700 border border-neutral-300 p-3 py-2 leading-tight focus:ring-0 focus:shadow-none focus:outline-none"
                                                            defaultValue={tabName}
                                                            onChange={handleTab}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {showFooterTabingField && (
                                            <div className="mb-3 last:mb-0">
                                                <div className="flex justify-between items-center mb-1">
                                                    <div>Show Footer Tabing Field</div>
                                                </div>
                                                <div className="flex flex-wrap divide-x divide-neutral-300 border border-neutral-300 overflow-hidden">
                                                    <button
                                                        value="Yes"
                                                        onClick={(event) => {
                                                            showFooterTabing(event.target.value);
                                                        }}
                                                        className={`w-1/2 px-2 py-1.5 inline-flex justify-center items-center text-sm focus:ring-0 focus:shadow-none focus:outline-none ${footerTabing === "Yes" ? "bg-[#F1F5F9]" : "bg-white"}`}
                                                        title="Yes"
                                                    >
                                                        Yes
                                                    </button>
                                                    <button
                                                        value="No"
                                                        onClick={(event) => {
                                                            showFooterTabing(event.target.value);
                                                        }}
                                                        className={`w-1/2 px-2 py-1.5 inline-flex justify-center items-center text-sm focus:ring-0 focus:shadow-none focus:outline-none ${footerTabing === "No" ? "bg-[#F1F5F9]" : "bg-white"}`}
                                                        title="No"
                                                    >
                                                        No
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {footerTabing == "Yes" && (
                                            <div className="mb-3 last:mb-0">
                                                <div className="">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <div>Choose Color Name</div>
                                                    </div>
                                                    <div className="flex flex-wrap">
                                                        <ColorPicker
                                                            changeBackgroundColor={handleFooterTabColor}
                                                            value={footerTabColorName}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="mb-3 last:mb-0">
                                            <div className="mb-3">
                                                <label htmlFor="" className="mb-1 block text-sm">
                                                    Product Display Method
                                                </label>
                                                <div
                                                    className="flex flex-wrap mx-auto"
                                                    style={{ width: "95%" }}
                                                >
                                                    <label htmlFor="dynamic" className="mr-2">
                                                        <input
                                                            value="dynamic"
                                                            checked={displayMethod == "dynamic"}
                                                            onChange={handleDisplayMethod}
                                                            className="mr-2"
                                                            name="productDisplayMethod"
                                                            type="radio"
                                                            id="dynamic"
                                                        />
                                                        Dynamic
                                                    </label>
                                                    <label htmlFor="manual">
                                                        <input
                                                            value="manual"
                                                            checked={displayMethod == "manual"}
                                                            onChange={handleDisplayMethod}
                                                            className="mr-2"
                                                            name="productDisplayMethod"
                                                            type="radio"
                                                            id="manual"
                                                        />
                                                        Manual
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        {displayMethod === "dynamic" ? (
                                            <>
                                                <div className="mb-3 last:mb-0">
                                                    <div className="mb-3">
                                                        <label htmlFor="" className="mb-1 block text-sm">
                                                            Fetch Products By
                                                        </label>
                                                        <div
                                                            className="flex flex-wrap mx-auto"
                                                            style={{ width: "95%" }}
                                                        >
                                                            <label htmlFor="category" className="mr-2">
                                                                <input
                                                                    value="Category"
                                                                    checked={productType == "Category"}
                                                                    onChange={handleProductType}
                                                                    className="mr-2"
                                                                    name="fetchProductType"
                                                                    type="radio"
                                                                    id="category"
                                                                />
                                                                Category
                                                            </label>
                                                            <label htmlFor="brand">
                                                                <input
                                                                    value="Brand"
                                                                    checked={productType == "Brand"}
                                                                    onChange={handleProductType}
                                                                    className="mr-2"
                                                                    name="fetchProductType"
                                                                    type="radio"
                                                                    id="brand"
                                                                />
                                                                Brand
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>

                                                {productType && (
                                                    <div className="mb-4 last:mb-0">
                                                        <label htmlFor="" className="mb-1 block text-sm">
                                                            Select {productType}
                                                        </label>
                                                        <div className="flex flex-wrap">
                                                            <Select
                                                                value={selectedBrands}
                                                                options={brands}
                                                                isMulti={true}
                                                                isSearchable={true}
                                                                onChange={changeSelectedBrands}
                                                                name="selectedBrands"
                                                                className="grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                                {loading && <CircularProgress color="secondary" />}
                                                {!loading && dataError && (
                                                    <div style={{ color: "red", paddingLeft: "20px" }}>
                                                        No Product available please select other
                                                        Brand/Category
                                                    </div>
                                                )}

                                                <div className="mb-3 last:mb-0">
                                                    <div className="mb-3">
                                                        <label htmlFor="" className="mb-1 block text-sm">
                                                            Number of Products to Display
                                                        </label>
                                                        <div
                                                            className="flex flex-wrap mx-auto"
                                                            style={{ width: "95%" }}
                                                        >
                                                            <select
                                                                onChange={updateProductCount}
                                                                value={productCount}
                                                                className="grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                                            >
                                                                <option value="4">4</option>
                                                                <option value="8">8</option>
                                                                <option value="12">12</option>
                                                                <option value="16">16</option>
                                                            </select>
                                                            {/* <SliderCustom dots={true} max={16} step={null} defaultValue={productCount} onSliderChange={updateProductCount} marks={[{value: 4, label: "4"}, {value: 8, label: "8"}, {value: 12, label: "12"}, {value: 16, label: "16"}]}  /> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ) : displayMethod === "manual" ? (
                                            <div>
                                                <AddProductsDialog
                                                    saveDataToggleFlag={saveDataToggleFlag}
                                                    setSaveDataToggleFlag={setSaveDataToggleFlag}
                                                    storeId={storeId}
                                                    selectedProducts={selectedProducts}
                                                    setSelectedProducts={setSelectedProducts}
                                                    setIsEdit={setIsEdit}
                                                    loading={loading}
                                                    setLoading={setLoading}
                                                />
                                                <DragDropContext onDragEnd={onDragEnd2}>
                                                    <Droppable droppableId="ManualProducts">
                                                        {(provided, snapshot) => (
                                                            <div
                                                                {...provided.droppableProps}
                                                                ref={provided.innerRef}
                                                                className="my-2"
                                                                id="accordions_list"
                                                            >
                                                                {selectedProducts &&
                                                                    selectedProducts.length > 0 &&
                                                                    selectedProducts.map((prod, index) => {
                                                                        return (
                                                                            <Draggable
                                                                                key={`item-${prod.id}`}
                                                                                draggableId={`item-${prod.id}`}
                                                                                index={index}
                                                                            >
                                                                                {(provided, snapshot) => (
                                                                                    <div
                                                                                        ref={provided.innerRef}
                                                                                        {...provided.draggableProps}
                                                                                        {...provided.dragHandleProps}
                                                                                        className="p-2 border border-neutral-200 border-b-0 last:border-b flex items-center justify-between "
                                                                                    >
                                                                                        <div className="flex items-center justify-between w-full">
                                                                                            <div className="flex items-center">
                                                                                                <span className="material-icons-outlined">
                                                                                                    drag_indicator
                                                                                                </span>
                                                                                                <div className="">
                                                                                                    {/* <img
                                                                                    src={`${AzureBlobUrl}${prod.productImage[0]}`}
                                                                                    alt={`${prod?.seName}`}
                                                                                    style={}
                                                                                    className="w-auto h-auto max-h-max"
                                                                                /> */}
                                                                                                    {prod.name}
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                )}
                                                                            </Draggable>
                                                                        );
                                                                    })}
                                                            </div>
                                                        )}
                                                    </Droppable>
                                                </DragDropContext>
                                            </div>
                                        ) : (
                                            ""
                                        )}

                                        <div className="mb-4 last:mb-0 hidden">
                                            <label htmlFor="" className="mb-1 block text-sm">
                                                Scrollable Section
                                            </label>
                                            <div className="flex flex-wrap">
                                                <select
                                                    value={scrollableSection}
                                                    onChange={(event) => {
                                                        changeScrollableSection(event.target.value);
                                                    }}
                                                    className="grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
                                                >
                                                    <option value="Yes">Yes</option>
                                                    <option value="No">No</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3 last:mb-0">
                                        {addBtn && (
                                            <button
                                                className="btn bg-indigo-500 hover:bg-indigo-600 text-white w-full"
                                                onClick={saveTab}
                                            >
                                                + Submit
                                            </button>
                                        )}
                                        {editBtn && (
                                            <button
                                                className="btn bg-indigo-500 hover:bg-indigo-600 text-white w-full"
                                                onClick={updateTab}
                                            >
                                                + Submit
                                            </button>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ElmentFeaturedProducts;
