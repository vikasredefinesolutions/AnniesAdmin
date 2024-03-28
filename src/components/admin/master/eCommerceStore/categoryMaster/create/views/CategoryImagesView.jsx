import React, { useCallback, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import CategoryService from "services/admin/master/store/categoryMaster/CategoryMasterService";
import Image from "components/common/formComponent/Image";
import Status from "components/common/displayStatus/Status";
import { scrollTop } from "services/common/helper/Helper";

const CategoryImagesView = ({
  mainCategoryId,
  storeId,
  tab,
  setactiveTab,
  index,
}) => {
  const dispatch = useDispatch();
  const [imagesList, setImagesList] = useState([]);

  const getImagesList = useCallback(() => {
    dispatch(setAddLoading(true));
    CategoryService.imagesList({
      categoryId: mainCategoryId,
    })
      .then((response) => {
        if (response.data.success && response.data.data) {
          setImagesList(response.data.data);
        }
        dispatch(setAddLoading(false));
      })
      .catch((error) => {
        dispatch(setAddLoading(false));
      });
  }, [storeId, mainCategoryId]);

  useEffect(() => {
    if (storeId && mainCategoryId) {
      getImagesList();
    }
  }, [storeId, mainCategoryId]);

  return (
    <>
      <div className="px-6 py-12 border-b-4 border-neutral-200 last:border-b-0">
        <div className="flex items-center justify-between">
          <div className="block uppercase tracking-wide text-gray-500 text-base font-bold mb-2">
            {tab.label}
          </div>
          <div>
            <span
              className="text-indigo-500 cursor-pointer"
              onClick={() => {
                setactiveTab(index);
                scrollTop();
              }}
            >
              Edit
            </span>
          </div>
        </div>
        <div className="w-full mb-6 last:mb-0 mt-6">
          <div className="overflow-x-auto max-h-screen border-t border-neutral-200">
            <table className="table-auto w-full text-sm text-[#191919] font-semibold mb-3">
              <thead className="text-sm font-bold uppercase text-[#b3b3b3] border-b border-neutral-200">
                <tr>
                  <td className="px-2 first:pl-5 py-4">SR.</td>
                  <td className="px-2 first:pl-5 py-4">Images</td>
                  <td className="px-2 first:pl-5 py-4">Display Order</td>
                  <td className="px-2 first:pl-5 py-4">Title Tag</td>
                  <td className="px-2 first:pl-5 py-4">Alt Tag</td>
                  <td className="px-2 first:pl-5 py-4">Status</td>
                </tr>
              </thead>
              <tbody>
                {imagesList && imagesList.length ? (
                  imagesList.map((images, index) => {
                    return (
                      <tr>
                        <td className="px-2 first:pl-5 py-3">{index + 1}</td>
                        <td className="px-2 first:pl-5 py-3">
                          <Image
                            className="w-20"
                            containerHeight={"h-20"}
                            src={images?.categoryImage}
                          />
                        </td>
                        <td className="px-2 first:pl-5 py-3">
                          {images?.displayOrder}
                        </td>
                        <td className="px-2 first:pl-5 py-3">
                          {images?.titleTag}
                        </td>
                        <td className="px-2 first:pl-5 py-3">
                          {images?.altTag}
                        </td>
                        <td className="px-2 first:pl-5 py-3">
                          <Status type={images?.recStatus} />
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr className="text-rose-500 text-center">
                    <td colSpan="6" className="text-center">
                      <span className="text-rose-500 text-2xl mr-2"></span>No
                      Data yet , please add some !
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryImagesView;
