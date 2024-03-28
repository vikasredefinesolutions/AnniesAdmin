import Input from "components/common/formComponent/Input";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BannerLinkUrlTypeOptions, blobFolder } from "global/Enum";
import { useParams } from "react-router-dom";
import ImageFile from "components/common/formComponent/ImageFile";
import { useFormikContext } from "formik";

const ProductRow = ({ push, remove, index, value, values }) => {
  const permission = useSelector((store) => store.permission);
  const arrLength = values.productSku.length;
  const { id } = useParams();
  const CompanyId = useSelector((store) => store?.CompanyConfiguration.id);
  const FolderPath = `/${blobFolder.temp}/${CompanyId}/${blobFolder.content}${
    !id ? "/0" : `/${id}`
  }/${blobFolder.productImage}`;

  const { setFieldValue } = useFormikContext();



  return (
    <>
      <td className="px-2 py-4">
        <Input
          label="id"
          name={`productSku[${index}].name`}
          defaultValue={value.name}
        />
      </td>

      <td className="px-2 py-3">
        <Input
          label="id"
          name={`productSku[${index}].link`}
          defaultValue={value.url}
        />
      </td>

      <td className="px-2 py-3">
        <Input
          label="id"
          name={`productSku[${index}].buttonText`}
          options={BannerLinkUrlTypeOptions}
          defaultValue={value.urlType}
        />
      </td>
      <td className="px-2 py-3">
       
          <ImageFile
            type="file"
            className="sr-only"
            name={`productSku[${index}].image`}
            id={values.productSku[index].image}
            buttonName="Add"
            folderpath={`${FolderPath}`}
            blogProductSection= {true}
            onChange={(value) => {
              setFieldValue(`productSku[${index}].image`, value);
            }}
            url={values.productSku[index].image}
          />
        
      </td>

      {(permission?.isEdit || permission?.isDelete) && (
        <td className="px-2 first:pl-5 py-3">
          <div className="gap-2 text-right">
            {index === arrLength - 1 && (
              <button
                type="button"
                className={"w-6 h-6 text-indigo-500"}
                onClick={() => {
                  {
                    push({
                      name: "",
                      link: "",
                      buttonText: "",
                      image: ""
                    });
                  }
                }}
              >
                <span className="material-icons-outlined">add</span>
              </button>
            )}

            <>
              {permission?.isDelete && (
                <button
                  type="button"
                  className={"w-6 h-6 text-rose-500"}
                  onClick={() => remove(index)}
                  // onLoad={setTotalFieldData(values.productSku)}
                >
                  <span className="material-icons-outlined cursor-pointer">
                    delete
                  </span>
                </button>
              )}
            </>
          </div>
        </td>
      )}
    </>
  );
};

export default ProductRow;
