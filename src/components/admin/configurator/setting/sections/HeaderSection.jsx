import React from 'react'
import { TitleNameHelper } from 'services/common/helper/Helper'

const HeaderSection = () => {
  return (
    <>
      {/* <title>Security</title> */}
      <title>{TitleNameHelper({ defaultTitleName: `Security` })}</title>
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
            {TitleNameHelper({ defaultTitleName: `Security` })}
          </h1>
        </div>
        <div className="flex flex-wrap space-x-2">
          <button
            className="btn px-6 bg-green-500 hover:bg-green-600 text-white"
            type="submit"
          >
            Save
          </button>
        </div>
      </div>
    </>
  )
}

export default HeaderSection