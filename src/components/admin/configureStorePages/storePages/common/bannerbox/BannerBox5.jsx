/*Component Name: BannerBox4
Component Functional Details:  BannerBox4 .
Created By: PK Kher
Created Date: <Creation Date>
Modified By: PK Kher
Modified Date: <Modified Date> */

import React from 'react';

const BannerBox5 = () => {
    return (
        <>
            <section id="bannerBox5">
            <div className='container pl-[15px] pr-[15px] mx-auto'>
        <div className='bg-white'>
          <div className='flex flex-wrap items-center gap-y-[40px]'>
            <div className='w-full lg:w-1/2 sm:flex'>
              <img
                alt=''
                className=''
                src='https://pkheadlessstorage.blob.core.windows.net/storagemedia/1/store/45/images/porsche-category-image.jpg'
              />
            </div>
            <div className='w-full lg:w-1/2'>
              <div className='pl-[20px] sm:pl-[30px] lg:pl-[40px] pr-[20px] sm:pr-[30px] lg:pr-[40px]'>
                <div className='text-2xl-text pb-[10px]'>
                  Mens
                </div>
                
                  <div className='text-sub-text pb-[5px]'>Sub Title</div>
                  <div
                    className='text-default-text'
                    dangerouslySetInnerHTML={{
                      __html: `<p>Description of the category will display here</p>`,
                    }}
                  ></div>
                </div>
            </div>
          </div>
        </div>
      </div>
            </section>
        </>
    );
};

export default BannerBox5;
