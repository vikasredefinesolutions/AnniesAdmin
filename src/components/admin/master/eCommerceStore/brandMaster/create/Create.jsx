import { Formik, Form as FormikForm } from "formik";
import React, { useState, useEffect, useCallback } from "react";
import * as Yup from "yup";
import BrandService from "services/admin/master/store/brand/BrandService";
import { useParams, useNavigate } from "react-router-dom";
import Input from "components/common/formComponent/Input";
import Dropdown from "components/common/formComponent/Dropdown";
import DropdownService from "services/common/dropdown/DropdownService";
import ImageFile from "components/common/formComponent/ImageFile";
import CKEditor from "components/common/formComponent/CKEditor";
import Catalog from "./Catalog";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import Messages from "components/common/alerts/messages/Index";
import { RecStatusValue, RecStatusValuebyName, blobFolder } from "global/Enum";
import { useDispatch, useSelector } from "react-redux";
import { ValidationMsgs } from "global/ValidationMessages";
import ToggleButton from "components/common/formComponent/ToggleButton";
import CreateFileHeader from "components/common/CreateFileHeader";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import Checkbox from "components/common/formComponent/Checkbox";
import Textarea from 'components/common/formComponent/Textarea';
import InputNumber from "components/common/formComponent/InputNumber";
import { TitleNameHelper, serverError } from "services/common/helper/Helper";
import StoreService from "services/admin/store/StoreService";

const Create = ({ storeType, showBrandLogo }) => {
  const { id } = useParams();
  const isAddMode = !id;
  const [vendors, setVendors] = useState([]);
  const [mainStoreData, setMainStoreData] = useState({});
  const [initialVendors, setInitialVendor] = useState([]);
  const dispatch = useDispatch();
  const location = useSelector((store) => store?.location);
  const CompanyId = useSelector((store) => store?.CompanyConfiguration.id);
  const FolderPath = `/${blobFolder.temp}/${CompanyId}/${blobFolder.brand}`;
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const { storeName, storeType: storeTypeBrowserQuery, storeId } = useParams();


  const storeNameFinal = storeName && storeName;
  const storeIdFinal = storeId && storeId;
  const storeTypeFinal = storeTypeBrowserQuery ? storeTypeBrowserQuery : storeType

  const getVendorDropdownData = useCallback(() => {
    DropdownService.getDropdownValues(
      "vendor").then((res) => {
        if (res.data.success) {
          setVendors(() => {
            return res.data.data;
          });
        }
      });
  }, []);

  const getMainStoreData = () => {
    StoreService.getStoreById(storeId).then((res) => {
      var response = res.data;
      if (response.success && response.data) {
        setMainStoreData(response.data);
      }
    })
  }
  useEffect(() => {
    getMainStoreData();
  }, [])

  const getBrandData = useCallback(() => {

    BrandService.getBrandById(id)
      .then((res) => {
        var response = res.data;
        if (response.success) {
          setInitialVendor(response.data.vendorList);
          setData({
            ...response.data, vendorId: (
              response.data.vendorList ? response.data.vendorList.map((value, key) => {
                return value.vendorId
              }) : [])
          });
        } else {
          dispatch(setAlertMessage({
            type: 'danger',
            message: ValidationMsgs.brand.notFound
          }))
          navigate(`/admin/master/${storeTypeFinal}/${storeName}/${storeId}/brands`);
        }
      })
      .catch((err) => { });

  }, [id]);
  useEffect(() => {
    getVendorDropdownData();
    getBrandData();
  }, [id, isAddMode, getVendorDropdownData, getBrandData]);

  // this useEffect is for getting catalog data based on id

  const schema = Yup.object().shape({
    name: Yup.string().trim().required(ValidationMsgs.masterCatalog.Store.brand.nameRequired),
    seTitle: mainStoreData?.isSeoMarketing === true ? Yup.string().trim().required(ValidationMsgs.masterCatalog.Store.brand.seTitleRequired) : "",
    discountPercentage: Yup.number()
      .min(0, ValidationMsgs.common.minpercentage)
      .max(100, ValidationMsgs.common.maxpercentage),
    recStatus: Yup.string().trim().required(ValidationMsgs.common.recStatusRequired),
    vendorId: Yup.array().min(1, ValidationMsgs.common.vendorIdRequired),
  });
  function submitHandler(values, { resetForm }) {
    if (isAddMode) {
      createBrand(values, resetForm);
    } else {
      updateBrand(values, resetForm);
    }
  }
  const createBrand = (values) => {
    dispatch(setAddLoading(true))

    BrandService.createBrand({ brandModel: { ...values, ...location } })
      .then((response) => {
        if (response.data.success && response.data.data) {
          // store vendor Information
          const vendors = values.vendorId.map((value, i) => {
            return {
              vendorId: value,
              status: "A"
            }
          })
          BrandService.createUpdateBrandVendors({
            brandVendorListModel: {
              id: response.data.data.id,
              ...location,
              brandVendorXLists: vendors
            }
          }).then((VendorResponse) => {
            if (VendorResponse.data.success && VendorResponse.data.data) {
              dispatch(
                setAlertMessage({
                  type: "success",
                  message: ValidationMsgs.brand.brandCreated,
                })
              );
              return navigate(`/admin/master/${storeTypeFinal}/${storeName}/${storeId}/brand/edit/${response.data.data.id}`);
            } else {
              dispatch(
                setAlertMessage({ type: "danger", message: serverError(response) })
              );
            }
            dispatch(setAddLoading(false))

          }).catch(err => {
            dispatch(setAlertMessage({ type: "danger", message: ValidationMsgs.brand.vendorNotStored }));
            dispatch(setAddLoading(false))

          });
        } else {
          dispatch(
            setAlertMessage({ type: "danger", message: serverError(response) })
          );
        }
      })
      .catch((errors) => {

        dispatch(setAlertMessage({ type: "danger", message: ValidationMsgs.brand.brandNotCreated }));
        dispatch(setAddLoading(false))

      });
  };
  const updateBrand = (values) => {
    dispatch(setAddLoading(true))

    let vendors = [...initialVendors];
    const vendorId = values.vendorId.map((vendor) => {
      const existVendor = initialVendors.find((value) => value.vendorId.toString() === vendor.toString());
      if (!existVendor) {
        vendors = [...vendors, { vendorId: vendor, storeId: storeId, status: 'A' }]
      }
      return vendor.toString();
    })

    vendors = vendors.map((vendor) => {
      if (vendorId.includes(vendor.vendorId.toString())) {
        return { ...vendor, status: 'A' };
      } else {
        return { ...vendor, status: 'R' };
      }
    });
    // update brand details
    BrandService.updateBrand({ brandModel: { ...values, ...location } })
      .then((response) => {
        if (response.data.success) {
          // update vendor details
          BrandService.updateandcreatestoreproductbrand({
            vendorStoreProductBrandListModel: {
              id: id,
              ...location,
              vendorStoreProductBrandXList: vendors
            }
          }).then((response) => {
            if (response.data.success) {
              dispatch(
                setAlertMessage({
                  message: ValidationMsgs.brand.brandUpdated,
                  type: "success",
                })
              );
              getBrandData();
            } else {
              dispatch(
                setAlertMessage({ type: "danger", message: serverError(response) })
              );
            }
            dispatch(setAddLoading(false))

          }).catch((errors) => {

            if (errors?.response?.data?.Errors?.Error) {
              dispatch(
                setAlertMessage({
                  message: errors.response.data.Errors.Error,
                  type: "danger",
                })
              );
            } else {
              dispatch(
                setAlertMessage({ message: ValidationMsgs.brand.brandNotUpdated, type: "danger" })
              );
            }
            dispatch(setAddLoading(false))

          });

        } else {
          serverError(response);
          dispatch(
            setAlertMessage({ type: "danger", message: serverError().errors })
          );
        }
      })
      .catch((errors) => {
        if (errors?.response?.data?.Errors?.Error) {
          dispatch(
            setAlertMessage({
              message: errors.response.data.Errors.Error,
              type: "danger",
            })
          );
        } else {
          dispatch(
            setAlertMessage({ message: ValidationMsgs.brand.brandNotUpdated, type: "danger" })
          );
        }
        dispatch(setAddLoading(false))

      });

  };

  return (
    <>
      <title>{isAddMode ? "Add " : "Edit "} {TitleNameHelper({ defaultTitleName: "Brand" })}</title>
      <Formik
        enableReinitialize={true}
        initialValues={{
          id: data?.id || 0,
          name: data?.name || "",
          vendorId: data?.vendorId || [],
          seTitle: data?.seTitle || "",
          seKeyWord: data?.seKeyWord || "",
          seDescription: data?.seDescription || "",
          storeID: data?.storeID || storeId,
          colorLogoUrl: `${data?.colorLogoUrl}` || "",
          bandWLogoUrl: `${data?.bandWLogoUrl}` || "",
          displayOrder: data?.displayOrder || 0,
          productBrandLogo: `${data?.productBrandLogo}` || "",
          bannerImagePath: `${data?.bannerImagePath}` || "",
          notes: data?.notes || "",
          policyWithCheckBox: data?.policyWithCheckBox || false,
          policyMessage: data?.policyMessage || "",
          recStatus: data?.recStatus || RecStatusValuebyName.Active,
          rowVersion: data?.rowVersion || null,
          allowDiscountForVerifyUser: data?.allowDiscountForVerifyUser || false,
          isEndUserDisplay: data?.isEndUserDisplay || false,
          onlineBrand: data?.onlineBrand || false,
          customSEName: data?.customSEName || "",
          seName: data?.seName || "",
          isCallUsForPriceManufacture: data?.isCallUsForPriceManufacture || false,
          isShowavailability: data?.isShowavailability || false,
          brandH1: data?.brandH1 || "",
          brandH2: data?.brandH2 || "",
          discountPercentage: data?.discountPercentage || 0,
          isMinQuantity: data?.isMinQuantity || false,
          minQuantity: data?.minQuantity || 0,
          isBrandPersonalization: data?.isBrandPersonalization || false,
        }}
        onSubmit={submitHandler}
        validationSchema={schema}
      >
        {({ errors, setFieldValue, values, validateForm }) => {
          return (
            <FormikForm>
              <div className="px-4 sm:px-6 lg:px-8 py-8 w-full">
                <CreateFileHeader module={`${isAddMode ? 'Create' : 'Edit'} ${TitleNameHelper({ defaultTitleName: "Brand" })}`} url={`/admin/stores/${storeTypeFinal}/${storeNameFinal}/${storeIdFinal}/brands`} errors={errors} validateForm={validateForm} />
                <Messages />
                <div className="grid grid-cols-12 gap-6 pt-5">
                  <div className="col-span-full xl:col-span-9">
                    <div className="w-full bg-white shadow-lg rounded-md border border-neutral-200 p-6 mb-6">
                      <div className="w-full mb-6 flex justify-between gap-2 items-center">
                        <div className="w-full" >
                          <label
                            htmlFor="name"
                            className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                          >
                            Name
                            <span className="text-rose-500 text-2xl leading-none">
                              *
                            </span>
                          </label>
                          <Input name="name" id="name" type="text" />
                        </div>

                        <div className="w-full">
                          <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                            Display Order
                            <span className="text-rose-500 text-lg leading-none">*</span>
                          </label>

                          <InputNumber name={`displayOrder`}
                            placeholder="Display Order"
                            value={values?.displayOrder}
                            displayError={true}
                            className={"py-1"}
                            type={"number"}
                            onKeyPress={(event) => {
                              if (!/^\d*$/.test(event.key)) {
                                event.preventDefault();
                              }
                            }}
                            onChange={(e) => { setFieldValue(`displayOrder`, e.target.value) }}
                          />
                        </div>

                      </div>
                      <div className="w-full mb-6 last:mb-0">
                        <div className="grid grid-cols-12 gap-6">
                          <div className="col-span-full lg:col-span-6">
                            <label
                              className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                              htmlFor="colorLogoUrl"
                            >
                              Color Logo
                            </label>
                            <div className="grid grid-cols-12 gap-6 w-full">
                              <ImageFile
                                type="file"
                                className="sr-only"
                                name="colorLogoUrl"
                                id="colorLogoUrl"
                                buttonName="Add"
                                onChange={(value) => {
                                  setFieldValue("colorLogoUrl", value);
                                }}
                                folderpath={`${FolderPath}`}
                                url={values.colorLogoUrl}
                              />
                            </div>
                          </div>
                          <div className="col-span-full lg:col-span-6">
                            <label
                              className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                              htmlFor="bandWLogoUrl"
                            >
                              Black & White Logo
                            </label>
                            <div className="grid grid-cols-12 gap-6 w-full">
                              <ImageFile
                                type="file"
                                className="sr-only"
                                name="bandWLogoUrl"
                                id="bandWLogoUrl"
                                buttonName="Add"
                                onChange={(value) => {
                                  setFieldValue("bandWLogoUrl", value);
                                }}
                                folderpath={`${FolderPath}`}
                                url={values.bandWLogoUrl}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="text-sm mt-2">
                          Recommended size for brand logo is 350 x 250 pixel and
                          it's mandatory for user to compress logo via&nbsp;
                          <a
                            href="https://tinypng.com/"
                            rel="noreferrer"
                            title="www.tinypng.com"
                            className="text-indigo-500"
                            target="_blank"
                          >
                            www.tinypng.com
                          </a>
                          &nbsp;and then upload.
                        </div>
                      </div>
                      <div className="w-full mb-6 last:mb-0">
                        <div className="grid grid-cols-12 gap-6">
                          <div className="col-span-full">
                            <label
                              className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                              htmlFor="bannerImagePath"
                            >
                              Banner Image
                            </label>
                            <div className="grid grid-cols-12 gap-6 w-full">
                              <ImageFile
                                type="file"
                                className="sr-only"
                                name="bannerImagePath"
                                id="bannerImagePath"
                                buttonName="Add"
                                onChange={(value) => {
                                  setFieldValue("bannerImagePath", value);
                                }}
                                folderpath={`${FolderPath}`}
                                url={values.bannerImagePath}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="text-sm mt-2">
                          Recommended size for brand logo is 350 x 250 pixel and
                          it's mandatory for user to compress logo via&nbsp;
                          <a
                            href="https://tinypng.com/"
                            rel="noreferrer"
                            title="www.tinypng.com"
                            className="text-indigo-500"
                            target="_blank"
                          >
                            www.tinypng.com
                          </a>
                          &nbsp;and then upload.
                        </div>
                      </div>

                      {showBrandLogo && <div className="grid grid-cols-12 gap-6 mb-6">
                        <div className="col-span-6">
                          <label
                            className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                            htmlFor="productBrandLogo"
                          >
                            Brand Logo
                          </label>
                          <div className="grid grid-cols-6 gap-6 w-full">
                            <ImageFile
                              type="file"
                              className="sr-only"
                              name="productBrandLogo"
                              id="productBrandLogo"
                              buttonName="Add"
                              onChange={(value) => {
                                setFieldValue("productBrandLogo", value);
                              }}
                              folderpath={`${FolderPath}`}
                              url={values.productBrandLogo}
                            />
                          </div>
                        </div>
                      </div>}


                      <div className="w-full mb-6 last:mb-0">
                        <label
                          className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                          htmlFor="grid-first-name"
                        >
                          Select Vendor
                          <span className="text-rose-500 text-2xl leading-none">
                            *
                          </span>
                        </label>
                        <Dropdown
                          isMulti={true}
                          hidecheckbox={false}
                          defaultValue={values.vendorId}
                          name={"vendorId"}
                          options={
                            vendors
                          }
                        />
                      </div>
                    </div>
                    <div className="w-full bg-white shadow-lg rounded-md border border-neutral-200 p-6 mb-6">
                      <label className="flex flex-wrap uppercase tracking-wide text-gray-500 text-base mb-6 font-bold">
                        Cart Page Policy
                      </label>
                      <div className="w-full mb-6 last:mb-0">
                        <label className="text-gray-500 inline-flex items-center">
                          <Checkbox
                            name="policyWithCheckBox"
                            label="With Checkbox"
                            id="policyWithCheckBox"
                            checked={values?.policyWithCheckBox}
                            onChange={(e) => {
                              setFieldValue(
                                "policyWithCheckBox",
                                e.target.checked
                              );
                            }}
                          />
                        </label>
                      </div>
                      <div className="w-full mb-6 last:mb-0">
                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                          Message :
                        </label>
                        <Textarea
                          rows={3}
                          name={"policyMessage"}
                          className="block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md"
                        />
                      </div>
                    </div>
                    {mainStoreData.isSeoMarketing === true ? (<>
                      <div className="w-full bg-white shadow-lg rounded-md border border-neutral-200 p-6 mb-6">
                        <label className="flex flex-wrap uppercase tracking-wide text-gray-500 text-base mb-6 font-bold">
                          SEO
                        </label>
                        <div className="w-full mb-6 last:mb-0">
                          <label
                            htmlFor="name"
                            className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                          >
                            Title :
                            <span className="text-rose-500 text-2xl leading-none">
                              *
                            </span>
                          </label>
                          <Input name="seTitle" id="seTitle" type="text" />
                        </div>
                        <div className="w-full mb-6 last:mb-0">
                          <label
                            htmlFor="name"
                            className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                          >
                            Keywords :
                          </label>
                          <Input name="seKeyWord" id="seKeyWord" type="text" />
                        </div>
                        <div className="w-full mb-6 last:mb-0">
                          <label
                            htmlFor="name"
                            className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                          >
                            Description :
                          </label>
                          <Input name="seDescription" id="seDescription" type="text" />
                        </div>
                        <div className="w-full mb-6 last:mb-0">
                          <label
                            htmlFor="name"
                            className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                          >
                            H1 Tag :
                          </label>
                          <Input name="brandH1" id="brandH1" type="text" />
                        </div>
                        <div className="w-full mb-6 last:mb-0">
                          <label
                            htmlFor="name"
                            className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                          >
                            H2 Tag :
                          </label>
                          <Input name="brandH2" id="brandH2" type="text" />
                        </div>
                      </div>
                    </>) : ("")}

                    <div className="w-full bg-white shadow-lg rounded-md border border-neutral-200 p-6 mb-6">
                      <div className="w-full mb-6 last:mb-0">
                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                          Notes
                        </label>
                        <CKEditor
                          type="simple"
                          name={"notes"}
                          id="notes"
                          defaultValue={values?.notes}
                          loading={data?.notes}
                          config={{
                            extraAllowedContent: 'div(*)',
                            allowedContent: true
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col col-span-full xl:col-span-3">
                    <div className="w-full bg-white shadow-xxl rounded-md p-6 mb-6">
                      <div >
                        <div className="block uppercase tracking-wide text-gray-500 text-base font-bold mb-2">

                          Brand Status
                          <span className="text-rose-500 text-2xl leading-none">
                            *
                          </span>
                        </div>
                        <Dropdown
                          hidecheckbox={false}
                          isMulti={false}
                          defaultValue={values.recStatus}
                          name={"recStatus"}
                          optionStyle={{ padding: "1px" }}
                          options={RecStatusValue}
                        />
                      </div>
                    </div>

                    <div className="w-full bg-white shadow-xxl rounded-md p-6 mb-6">
                      <div className="mb-3">
                        <div className="flex flex-wrap items-center justify-between pb-2 last:pb-0  last:mb-0 capitalize">
                          Show discount with login

                        </div>
                        <ToggleButton
                          id={"allowDiscountForVerifyUser"}
                          name={"allowDiscountForVerifyUser"}
                          defaultValue={values?.allowDiscountForVerifyUser}
                          setFieldValue={setFieldValue}
                        />
                      </div>
                      <div className="mb-3">
                        <div className="flex flex-wrap items-center justify-between pb-2 last:pb-0  last:mb-0 capitalize">
                          End User Display

                        </div>
                        <ToggleButton
                          id={"isEndUserDisplay"}
                          name={"isEndUserDisplay"}
                          defaultValue={values?.isEndUserDisplay}
                          setFieldValue={setFieldValue}
                        />
                      </div>
                      <div className="mb-3">
                        <div className="flex flex-wrap items-center justify-between pb-2 last:pb-0 last:mb-0 capitalize">
                          online Brand

                        </div>
                        <ToggleButton
                          id={"onlineBrand"}
                          name={"onlineBrand"}
                          defaultValue={values?.onlineBrand}
                          setFieldValue={setFieldValue}
                        />
                      </div>
                      <div className="mb-3">
                        <div className="flex flex-wrap items-center justify-between pb-2 last:pb-0 last:mb-0 capitalize">
                          Call Us For Price Manufacture
                        </div>
                        <ToggleButton
                          id={"isCallUsForPriceManufacture"}
                          name={"isCallUsForPriceManufacture"}
                          defaultValue={values?.isCallUsForPriceManufacture}
                          setFieldValue={setFieldValue}
                        />
                      </div>
                      <div className="mb-3">
                        <div className="flex flex-wrap items-center justify-between pb-2 last:pb-0 last:mb-0 capitalize">
                          Show Availability
                        </div>
                        <ToggleButton
                          id={"isShowavailability"}
                          name={"isShowavailability"}
                          defaultValue={values?.isShowavailability}
                          setFieldValue={setFieldValue}
                        />
                      </div>
                      <div className="mb-3">
                        <div className="flex flex-wrap items-center justify-between pb-2 last:pb-0 last:mb-0 capitalize">
                          Personalization
                        </div>
                        <ToggleButton
                          id={"isBrandPersonalization"}
                          name={"isBrandPersonalization"}
                          defaultValue={values?.isBrandPersonalization}
                          setFieldValue={setFieldValue}
                        />
                      </div>
                      <div className="mb-3">
                        <div className="flex flex-wrap items-center justify-between pb-2 last:pb-0 last:mb-0 capitalize">
                          Discount Percentage (%)
                        </div>
                        <InputNumber
                          name="discountPercentage"
                          value={values.discountPercentage}
                          displayError={true}
                          onChange={(e) =>
                            setFieldValue("discountPercentage", e.target.value)
                          }
                        />
                      </div>
                      <div className="flex w-full">
                        <div className="flex items-center justify-between">
                          <Checkbox
                            className="mt-1"
                            name="isMinQuantity"
                            id="isMinQuantity"
                            checked={values?.isMinQuantity}
                            onChange={(e) => {
                              setFieldValue(
                                "isMinQuantity",
                                e ? e.target.checked : false
                              )
                              if (e.target.checked === false) {
                                setFieldValue("minQuantity", "0")
                              }
                            }
                            }
                          />
                        </div>

                        <div className={`w-full flex items-center grid-cols-1 xl:grid-cols-2 gap-4 mt-4`}>
                          <div className="items-center justify-between flex relative grow gap-2">
                            <label className="block mb-2 w-1/2 text-[14px]">Allow Minimum Quantity
                            </label>
                            {values.isMinQuantity ?
                              <div className="w-full">
                                <InputNumber
                                  className={"block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md"}
                                  name="minQuantity"
                                  defaultValue={values.minQuantity || 0}
                                  displayError={true}
                                  onChange={(e) =>
                                    setFieldValue("minQuantity", e ? e.target.value : 0)
                                  }
                                />
                              </div>
                              : ""
                            }
                          </div>
                        </div>

                      </div>
                      <div className="mb-3">
                        <div className="flex flex-wrap items-center justify-between pb-2 last:pb-0 last:mb-0 capitalize">
                          Collection URL
                        </div>
                        <Input
                          id={"customSEName"}
                          name={"customSEName"}
                        />
                      </div>
                      <div className="mb-3">
                        <div className="flex flex-wrap items-center justify-between pb-2 last:pb-0 last:mb-0 capitalize">
                          SE Name
                        </div>
                        <Input
                          className={`${true ? "bg-slate-200" : "bg-white"}`}
                          id={"seName"}
                          name={"seName"}
                          disabled={true}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FormikForm>
          );
        }}
      </Formik>
      <Catalog
        isAddMode={isAddMode}
        id={id}
        brandId={data.id}
        vendors={vendors}
        vendorId={
          data.vendorId ? data.vendorId.map((value) => value.toString()) : []
        }
      />
    </>
  );
};

export default Create;
