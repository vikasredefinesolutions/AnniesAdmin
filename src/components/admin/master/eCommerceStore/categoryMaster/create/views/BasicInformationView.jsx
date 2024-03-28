import React from "react";
import { scrollTop } from "services/common/helper/Helper";
import Image from "components/common/formComponent/Image";

const BasicInformationView = ({ values, tab, setactiveTab, index }) => {
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

        <div className="mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center">
          <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
            Category Name
            <span className="text-rose-500 text-2xl leading-none">*</span>:
          </label>
          <div className="col-span-2">{values?.name}</div>
        </div>

        <div className="mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center">
          <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
            Display Order
            <span className="text-rose-500 text-2xl leading-none">*</span>:
          </label>
          <div className="col-span-2">{values?.displayOrder}</div>
        </div>

        <div className="mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center">
          <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
            Landing Page :
          </label>
          <div className="col-span-2">{values?.landingPage}</div>
        </div>
        <div className="mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center">
          <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
            Custom Collection URL :
          </label>
          <div className="col-span-2">{values?.customCollectionUrl}</div>
        </div>
        <div className="mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center">
          <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
            Facet Filter URL :
          </label>
          <div className="col-span-2">{values?.facetFilterUrl}</div>
        </div>
        <div className="mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center">
          <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
            SE Name :
          </label>
          <div className="col-span-2">{values?.seName}</div>
        </div>
        <div className="mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center">
          <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
            Banner Image :
          </label>
          <div className="col-span-2">
            <Image
              className="w-20"
              containerHeight={"h-20"}
              src={values?.bannerImagePath}
            />
          </div>
        </div>
        <div className="mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center">
          <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
            Description :
          </label>
          <div
            className="col-span-2"
            dangerouslySetInnerHTML={{ __html: values?.description }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default BasicInformationView;
