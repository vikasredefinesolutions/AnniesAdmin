import React from "react";
import { Link } from "react-router-dom";

const ThemeSettingBody = ({ showSidebar }) => {
  return (
    <>
      <div id="right" className={`lg:w-3/4 transition-all relative grow`}>
        <div className="p-6 relative z-10">
          <div className="border border-dashed border-neutral-200 mx-auto flex flex-wrap">
            <div className="w-full lg:w-1/3 flex flex-col">
              <div className="mx-3 bg-white h-full">
                <h1 className="border-b border-b-gray-border p-4 font-bold">Buttons</h1>
                <div className="flex flex-col p-4 gap-4">
                  <button className="custbtn-default py-[6px] px-4">Default</button>
                  <button className="custbtn-primary py-[6px] px-4">Primary</button>
                  <button className="custbtn-secondary py-[6px] px-4">Secondary</button>
                  <button className="custbtn-tertiary py-[6px] px-4">Tertiary</button>
                  <button className="custbtn-quaternary py-[6px] px-4">Quaternary</button>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/3 flex flex-col">
              <div className="h-full mx-3 bg-white">
                <h1 className="border-b border-b-gray-border p-4 font-bold">Links</h1>
                <div className="flex flex-col p-4 gap-4">
                  <Link to={'#'} className='default-link p-2'>This Default Link</Link>
                  <Link to={'#'} className='primary-link p-2'>This Primary Link</Link>
                  <Link to={'#'} className='secondary-link p-2'>This Secondary Link</Link>
                  <Link to={'#'} className='tertiary-link p-2'>This Tertiary Link</Link>
                  <Link to={'#'} className='quaternary-link p-2'>This Quaternary Link</Link>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/3 flex flex-col">
              <div className="h-full mx-3 bg-white">
                <h1 className="border-b border-b-gray-border p-4 font-bold">Fonts</h1>
                <div className="flex flex-col p-4 gap-4">
                  <p className='large-font p-2 '>This is Large Font</p>
                  <p className='title-font p-2'>This is Title Font</p>
                  <p className='medium-font p-2'>This is Medium Font</p>
                  <p className='normal-font p-2'>This is Normal Font</p>
                  <p className='default-font p-2'>This is Default Font</p>
                  <p className='extra-small-font p-2'>This is Extra Small Font</p>
                  <p className='sub-font p-2'>This is Sub Font</p>
                  <p className='small-font p-2'>This is Small Font</p>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col pt-20">

              <h1 className="mx-3 bg-white border-b border-b-gray-border p-4 font-bold">Body Font</h1>
              <div className="mx-3 bg-white flex flex-col p-4 gap-4">
                <div className="flex flex-col justify-between pt-3">
                  <p className='body-font p-2'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint optio numquam, est necessitatibus labore aperiam consectetur cupiditate blanditiis doloremque explicabo deserunt debitis, officia, obcaecati modi dolorum quis repudiandae aspernatur voluptatum fuga dolor! Ea illo iusto repellat enim nostrum porro nihil nisi aut fugit magnam atque natus soluta quibusdam praesentium esse quam, deserunt voluptate blanditiis illum molestias doloremque corporis aspernatur facere ad? Itaque debitis sed dolores necessitatibus laudantium numquam illo quasi tempore dicta voluptatibus. Doloremque veritatis assumenda totam, ullam cupiditate mollitia natus dolorum ipsa quasi laboriosam repellat similique expedita quod quaerat vero accusantium commodi sit enim fugit amet placeat impedit. Necessitatibus?</p>
                </div>
              </div>

            </div>


          </div>
        </div>
      </div>
    </>
  )
}

export default ThemeSettingBody