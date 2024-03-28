/*Component Name: Media
Component Functional Details: User can create or update Media details from here.
Created By: Shrey Patel
Created Date: 10/12/2023
Modified By: <Modified By Name>
Modified Date: <Modified Date> */
import Input from "components/common/formComponent/Input";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Formik, Form as FormikForm, useFormikContext } from "formik";
import ImageFile from "components/common/formComponent/ImageFile";
import * as Yup from "yup";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { useDispatch, useSelector } from "react-redux";
import { serverError } from "services/common/helper/Helper";
import { Fragment } from "react";
import { blobFolder, ProductAttributeTypeValues, RecStatusValuebyName } from "global/Enum";
import { productType } from "dummy/Dummy";
import { ValidationMsgs } from "global/ValidationMessages";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import UnsavedFormHandler from "./UnsavedFormHandler";
import StoreAttributeImageService from "services/admin/master/store/product/attribute/AttributeImageService";
import MediaVideo from './MediaVideo'

const Media = ({
  values,
  readOnly,
  index,
  type,
  user,
  productId,
  activeTab,
  setFormSubmit,
  getProductReadinessData,
  setsaveUnSavedFields,
  setWishedToChangeTab,
  clearCacheForBrandCategory,
}) => {
  const formRef = useRef();
  const dispatch = useDispatch();
  const location = useSelector((store) => store?.location);
  const valueByID = values;
  const permission = useSelector((store) => store.permission);
  const [CombinationData, setCombinationData] = useState([]);
  const [ImageData, setImageData] = useState([CombinationData]);
  const [initialValues, setInitialValues] = useState(null);
  const GlobalLoading = useSelector((store) => store?.GlobalLoaderReducer?.toLoad);
  const AdminAppConfigReducers = useSelector((store) => store?.AdminAppConfigReducers);

  useEffect(() => {
    if (activeTab === index) {
      setFormSubmit(formRef.current);
    }
  }, [formRef, setFormSubmit, activeTab]);

  useEffect(() => {
    setImageData(CombinationData);
  }, [CombinationData]);

  useEffect(() => {
    let productAttributeImageModel = {};
    if (CombinationData && CombinationData?.length > 0) {
      CombinationData?.map((Combination, index) => {
        let subRows = [];
        if (Combination.subRows && Combination?.subRows.length > 0) {
          {
            Combination?.subRows?.map((item, i) => {
              subRows = [
                ...subRows,
                {
                  id: item.id || 0,
                  imagePath: item.imagePath || "",
                  altTag:
                    item.altTag || `${valueByID.name} ${Combination.colorName}`,
                  rowVersion: item.rowVersion || null,
                  displayOrder: item.displayOrder || 0,
                  recStatus: item.recStatus || RecStatusValuebyName.Active,
                },
              ];
            });
          }
        }
        productAttributeImageModel = {
          ...productAttributeImageModel,
          [Combination.attributeOptionId]: {
            attributeOptionId: Combination.attributeOptionId || 0,
            swatch: "",
            facetColorId: Combination.facetColorId || [],
            facetColorId: Combination.facetColorId || [],
            embroideryPDF: Combination.embroideryPDF || "",
            embroideryDSTFile: Combination.embroideryDSTFile || "",
            rowVersion: Combination?.rowVersion || null,
            subRows: subRows,
          },
        };
      });
      setInitialValues({
        productAttributeImageModel: productAttributeImageModel,
      });
    }
  }, [CombinationData]);

  const schema = Yup.object().shape({
    productAttributeImageModel: Yup.object().shape({
      ...(() => {
        var validations = {};
        var validationData = initialValues?.productAttributeImageModel
          ? Object.keys(initialValues?.productAttributeImageModel)
          : [];
        validationData.map((v, i) => {
          validations = {
            ...validations,
            [v]: Yup.object().shape({
              subRows: Yup.array().of(Yup.object().shape({
                altTag: Yup.string().trim().when("recStatus", {
                  is: (recStatus) => recStatus === "A",
                  then: Yup.string().trim().required(ValidationMsgs.masterCatalog.attributes.altTagRequired),
                  otherwise: Yup.string().trim(),
                }),
              })
              ),
            }),
          };
        });
        return validations;
      })(),
    }),
  });

  const getCombinationData = useCallback(() => {
    dispatch(setAddLoading(true));
    StoreAttributeImageService.getAttributeImagesByID({
      productTypeValues: ProductAttributeTypeValues.WithoutAttribute,
      productId: productId
    }).then((response) => {
      if (response.data.success) {
        setCombinationData(response.data.data);
      }
      dispatch(setAddLoading(false));
    }).catch((errors) => {
      dispatch(setAddLoading(false));
    });
  }, []);

  const handleImageData = (fields) => {
    let Obj = [];
    Object.keys(fields.productAttributeImageModel).map((value, key) => {
      let ActiveSubRowForSwatch = [];
      ActiveSubRowForSwatch =
        fields.productAttributeImageModel[value]?.subRows?.length > 0 && fields.productAttributeImageModel[value]?.subRows.filter((A, index) => {
          return A.recStatus === RecStatusValuebyName.Active;
        });
      let FirstImageSwatchImage = ActiveSubRowForSwatch[0]?.imagePath;

      if (fields.productAttributeImageModel[value]?.subRows && fields.productAttributeImageModel[value]?.subRows?.length > 0) {
        let subRows = [];
        let ActiveRow = [];
        let ArchivedRow = [];

        ActiveRow = fields.productAttributeImageModel[value]?.subRows.filter((A) => {
          return A.recStatus === RecStatusValuebyName.Active;
        });
        ArchivedRow = fields.productAttributeImageModel[value]?.subRows.filter((AR) => {
          return AR.recStatus === RecStatusValuebyName.Archived;
        });
        if (ActiveRow.length > 0) {
          ActiveRow.map((row, index) => {
            if (typeof row.id === "string") {
              if (row.id.includes("_new")) {
                subRows = [...subRows, { ...row, id: 0, displayOrder: row.displayOrder === "" ? 0 : row.displayOrder }];
              }
            } else {
              subRows = [...subRows, { ...row, displayOrder: row.displayOrder === "" ? 0 : row.displayOrder }];
            }
          });
        }
        if (ArchivedRow.length > 0) {
          ArchivedRow.map((Archrow, index) => {
            if (typeof Archrow.id === "string") {
              if (Archrow.id.includes("_new")) {
                subRows = [...subRows, { ...Archrow, id: 0 }];
              }
            } else {
              subRows = [...subRows, { ...Archrow }];
            }
          });
        }

        Obj = [...Obj, {
          ...fields.productAttributeImageModel[value],
          swatch: "" ? FirstImageSwatchImage : fields?.productAttributeImageModel[value]?.swatch,
          subRows: subRows,
        }];
      } else {
        Obj = [...Obj, {
          ...fields.productAttributeImageModel[value],
          swatch: "" ? FirstImageSwatchImage : fields?.productAttributeImageModel[value]?.swatch,
        }];
      }
    });

    const SubmitData = Obj.filter((datas) => {
      if (datas?.swatch === undefined) {
        datas["swatch"] = "";
      }
      return datas;
    });

    dispatch(setAddLoading(true));
    StoreAttributeImageService.createAttributeImages({
      productAttributeImageModel: SubmitData,
      productId: productId,
      ...location,
      recStatus: RecStatusValuebyName.Active,
      producttypevalues: ProductAttributeTypeValues.WithoutAttribute
    }).then((response) => {
      if (response.data.success) {
        dispatch(
          setAlertMessage({
            type: "success",
            message: ValidationMsgs.masterCatalog.attributes.imageUpdated,
          })
        );
        getCombinationData();
        getProductReadinessData();
        clearCacheForBrandCategory();
      } else {
        dispatch(
          setAlertMessage({ type: "danger", message: serverError(response) })
        );
      }
      dispatch(setAddLoading(false));
    }).catch((errors) => {
      dispatch(
        setAlertMessage({
          type: "danger",
          message: ValidationMsgs.masterCatalog.attributes.imageUpdated,
        })
      );
      dispatch(setAddLoading(false));
      getCombinationData();
    });
  };

  useEffect(() => {
    setWishedToChangeTab(false);
    getCombinationData();
  }, []);

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleImageData}
      >
        {({ errors, values }) => {
          return (
            <FormikForm>
              <UnsavedFormHandler
                values={values}
                setsaveUnSavedFields={setsaveUnSavedFields}
                InitialData={initialValues}
              />
              <title>Media</title>
              <div className=" border-t-2 border-neutral-200">
                <div className="w-full p-6 pb-0 flex flex-wrap items-center justify-between mb-2">
                  <div className="block uppercase tracking-wide text-gray-500 text-lg font-bold">
                    Media Images / Alternative Images
                  </div>
                  {(permission?.isEdit || permission?.isDelete) && ImageData && ImageData.length > 0 && (
                    <>
                      {GlobalLoading ? (
                        <span className="spinner-border spinner-border-sm mr-2"></span>
                      ) : (
                        <button
                          disabled={GlobalLoading}
                          type="submit"
                          className={`btn px-6 bg-indigo-500 hover:bg-indigo-600 text-white`}
                        >
                          Save
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="overflow-x-auto max-h-screen border-t border-neutral-200">
                <table className="table-auto w-full text-sm text-[#191919] font-semibold overflow-scroll">
                  <tbody className="text-sm divide-y divide-slate-200">
                    <TR
                      imageData={ImageData ? ImageData[0] : []}
                      valueByID={valueByID}
                      type={type}
                      readOnly={readOnly}
                      productId={productId}
                      errors={errors}
                      user={user}
                      AdminAppConfigReducers={AdminAppConfigReducers}
                    />
                  </tbody>
                </table>
              </div>
            </FormikForm>
          );
        }}
      </Formik >
      <MediaVideo readOnly={readOnly} productId={productId} values={values} setsaveUnSavedFields={setsaveUnSavedFields} setWishedToChangeTab={setWishedToChangeTab} />
    </>
  );
};

export default Media;

const TR = ({
  imageData,
  valueByID,
  readOnly,
  type,
  user,
  errors,
}) => {
  const CompanyId = useSelector((store) => store?.CompanyConfiguration.id);
  const FolderPath = `/${blobFolder.temp}/${CompanyId}/${blobFolder.attributeImages}`;
  const { values, setFieldValue } = useFormikContext();
  const [MultiImages, setMultiImages] = useState([]);

  useEffect(() => {
    if (values?.productAttributeImageModel?.[imageData?.attributeOptionId]?.subRows) {
      let AddDisplayOrder = values?.productAttributeImageModel[imageData?.attributeOptionId].subRows.map((row, index) => {
        return { ...row, displayOrder: index + 1 };
      });
      setMultiImages(AddDisplayOrder);
    } else {
      setMultiImages([]);
    }
  }, [values]);

  const setMultiImagesArray = (value, e) => {
    if (e === "") {
      return MultiImages.map((x) => {
        if (x.id === value.id) {
          return { ...x, recStatus: RecStatusValuebyName.Archived };
        } else return x;
      });
    } else {
      return MultiImages;
    }
  };
  return (
    <Fragment>
      <tr role="row">
        <td colSpan={6}>
          <div className="w-full py-2 px-4">
            <div className="grid grid-cols-12 gap-3">
              {MultiImages.map((value, i) => {
                return (
                  value.recStatus !== RecStatusValuebyName.Archived && (
                    <div className="col-span-full lg:col-span-2 relative" key={value.id} >
                      <ImageFile
                        id={`productAttributeImageModel.${imageData?.attributeOptionId}.subRows[${value.id}].imagePath`}
                        type={`file`}
                        folderpath={`${FolderPath}`}
                        className="sr-only"
                        divClass={"w-full flex flex-wrap items-center h-52 bg-center bg-no-repeat bg-contain relative"}
                        onChange={(e) => {
                          setFieldValue(
                            `productAttributeImageModel.${imageData?.attributeOptionId}.subRows`,
                            setMultiImagesArray(value, e)
                          );
                        }}
                        buttonName="Add"
                        name={`productAttributeImageModel.${imageData?.attributeOptionId}.subRows[${value.id}].imagePath`}
                        url={value.imagePath}
                        disabled={[productType.EcommerceStore].includes(type) && user.isSuperUser === true ? false : readOnly}
                      />
                      <div className="flex mt-1 gap-2">
                        <Input
                          className="block w-2/3 bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md"
                          name={`productAttributeImageModel.${imageData?.attributeOptionId}.subRows[${i}].altTag`}
                          placeholder="Alt Tag"
                        />
                        <Input
                          className={`block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md`}
                          name={`productAttributeImageModel.${imageData?.attributeOptionId}.subRows[${i}].displayOrder`}
                          placeholder="DIsplay Order"
                          displayError={false}
                          defaultValue={value.displayOrder}
                          onKeyPress={(e) => {
                            if (!/^\d*$/.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          onChange={(e) => {
                            if (
                              e.target.value !== "0" &&
                              e.target.value <= MultiImages && MultiImages.length
                            ) {
                              setFieldValue(
                                `productAttributeImageModel.${imageData?.attributeOptionId}.subRows[${i}].displayOrder`,
                                e ? e.target.value : 0
                              );
                            }
                          }}
                        />
                      </div>
                      {errors?.productAttributeImageModel && (
                        <div className="text-rose-500 leading-none">
                          {
                            errors?.productAttributeImageModel[
                              imageData?.attributeOptionId
                            ]?.subRows[i]?.displayOrder
                          }
                        </div>
                      )}
                    </div>
                  )
                );
              })}
              <div className="col-span-full lg:col-span-2 ">
                <ImageFile
                  id={`multiImage${imageData?.attributeOptionId}`}
                  type={`file`}
                  folderpath={`${FolderPath}`}
                  className="sr-only"
                  divClass={
                    "w-auto flex flex-wrap items-center h-52 bg-center bg-no-repeat bg-contain"
                  }
                  buttonName="Add"
                  name={`multiImage${imageData?.attributeOptionId}`}
                  onChange={(value) => {
                    setFieldValue(
                      `productAttributeImageModel.${imageData?.attributeOptionId}.subRows`,
                      [
                        ...MultiImages,
                        {
                          id: MultiImages && MultiImages.length + "_new",
                          imagePath: value,
                          altTag: `${valueByID.name} ${imageData?.colorName}`,
                          rowVersion: null,
                          recStatus: RecStatusValuebyName.Active,
                        },
                      ]
                    );
                  }}
                  url={values?.multiImage}
                />
                <div className="mt-1 hidden">
                  <Input
                    className="block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md"
                    name={`productAttributeImageModel.${imageData?.attributeOptionId}.subRows.altTag`}
                    placeholder="Alt Tag"
                  />
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </Fragment>
  );
};
