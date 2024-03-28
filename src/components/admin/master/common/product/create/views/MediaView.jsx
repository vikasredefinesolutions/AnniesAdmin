/*Component Name: MediaView
Component Functional Details: User can create or update MediaView master details from here.
Created By: Shrey Patel
Created Date: 11/01/2023
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import React, { useState, useEffect, useCallback, Fragment } from "react";
import { ProductAttributeTypeValues, blobFolder } from "global/Enum";
import StoreAttributeImageService from "services/admin/master/store/product/attribute/AttributeImageService";
import ImageFile from "components/common/formComponent/ImageFile";
import { useSelector, useDispatch } from "react-redux";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { scrollTop } from "services/common/helper/Helper";
import MediaVideoServices from "services/admin/master/store/product/MediaServices";
import VideoPlayer from "components/common/VIdeoPlayer";

const MediaView = ({
  type,
  tab,
  setActiveTab,
  index,
  productId,
  moduleName,
  ProductAttributeLength,
}) => {
  const [ImageData, setImageData] = useState([]);
  const [VideoData, setVideoData] = useState([]);
  const dispatch = useDispatch();
  const AdminAppConfigReducers = useSelector((store) => store?.AdminAppConfigReducers);

  useEffect(() => {
    getAttributeImagesData();
    getMediaVideoData();
  }, [tab]);

  const getAttributeImagesData = useCallback(() => {
    dispatch(setAddLoading(true));
    StoreAttributeImageService.getAttributeImagesByID({
      productTypeValues: ProductAttributeLength ? ProductAttributeTypeValues.WithoutAttribute : ProductAttributeTypeValues.WithoutAttribute,
      productId: productId
    }).then((response) => {
      if (response?.data?.success && response?.data?.data) {
        setImageData(response?.data?.data?.[0]?.subRows);
      }
      dispatch(setAddLoading(false));
    }).catch((errors) => {
      dispatch(setAddLoading(false));
    });
  }, []);

  const getMediaVideoData = useCallback(() => {
    dispatch(setAddLoading(true));
    MediaVideoServices.getMediaVideoData(productId).then((response) => {
      if (response.data.success) {
        setVideoData(response.data.data);
      }
      dispatch(setAddLoading(false));
    }).catch((errors) => {
      dispatch(setAddLoading(false));
    });
  }, []);

  return (
    <>
      <div className="px-6 py-12 border-b-4 border-neutral-200 last:border-b-0">
        <div className="flex items-center justify-between">
          <div className="block uppercase tracking-wide text-gray-500 text-base font-bold mb-2">
            {tab.label}
          </div>
          <div>
            <span className="text-indigo-500 cursor-pointer"
              onClick={() => {
                setActiveTab(index);
                scrollTop();
              }}
            >
              Edit
            </span>
          </div>
        </div>
        <div className="tracking-wide text-gray-500 text-base font-bold mb-2 mt-15">Media Images / Alternative Images</div>
        <div className="mb-8">
          {ImageData?.length > 0 ? <div className="overflow-x-auto max-h-screen border-t border-neutral-200">
            <table className="table-auto w-full text-sm text-[#191919] overflow-scroll">
              <tbody className="text-sm divide-y divide-slate-200">
                <TRImage
                  imageData={ImageData}
                  productId={productId}
                  moduleName={moduleName}
                />
              </tbody>
            </table>
          </div>
            :
            <div className="text-rose-500 leading-none">No Data Found!</div>
          }
        </div>
        <div className="tracking-wide text-gray-500 text-base font-bold mb-2 mt-15">Media Videos</div>
        <div className="border-b-4 border-neutral-200 last:border-b-0">
          {VideoData?.length > 0 ? <div className="overflow-x-auto max-h-screen border-t border-neutral-200">
            <table className="table-auto w-full text-sm text-[#191919] overflow-scroll">
              <tbody className="text-sm divide-y divide-slate-200">
                <TRVideo
                  VideoData={VideoData}
                  productId={productId}
                  moduleName={moduleName}
                  AdminAppConfigReducers={AdminAppConfigReducers}
                />
              </tbody>
            </table>
          </div>
            :
            <div className="text-rose-500 leading-none">No Data Found!</div>
          }
        </div>
      </div >
    </>
  );
};

export default MediaView;

const TRImage = ({ imageData, productId, moduleName }) => {
  const CompanyId = useSelector((store) => store?.CompanyConfiguration.id);
  const FolderPath = `/${blobFolder.temp}/${CompanyId}/${blobFolder[moduleName]}${!productId ? "/0" : `/${productId}`}/${blobFolder.attribute}`;
  return (
    <Fragment>
      <tr role="row">
        <td colSpan={6}>
          <div className="w-full py-2 px-4">
            <div className="grid grid-cols-12 gap-3">
              {imageData?.map(
                (value, i) =>
                  value?.recStatus !== "R" && (
                    <div className="col-span-full lg:col-span-2 relative "
                      key={value.id}
                    >
                      <ImageFile
                        folderpath={`${FolderPath}`}
                        className="sr-only"
                        divClass={"w-full flex flex-wrap items-center h-52 bg-center bg-no-repeat bg-contain relative"}
                        url={value.imagePath}
                        disabled={true}
                      />
                      <div className="mt-1">
                        <span>{value.altTag}</span>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </td>
      </tr>
    </Fragment>
  );
};

const TRVideo = ({ VideoData }) => {
  return (
    <Fragment>
      <tr role="row">
        <td colSpan={6}>
          <div className="w-full py-2 px-4">
            <div className="grid grid-cols-12 gap-3">
              {VideoData?.map(
                (value, i) =>
                  value?.recStatus !== "R" && (
                    <div className="col-span-full lg:col-span-2 relative "
                      key={value.id}
                    >
                      <div className="border-2 border-neutral-200 rounded-md shadow relative h-[350px] flex items-center justify-center">
                        <VideoPlayer videoUrl={value?.videoUrl} onErrorImage={value?.videoImagePath} />
                      </div>
                      <div className="mt-1">
                        <span>{value.altTag}</span>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </td>

      </tr>
    </Fragment>
  );
};