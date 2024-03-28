import React from 'react'

const IPSection = () => {
  return (
    <div className="p-6 border-b-2 border-slate-200 last:border-b-0">
      <div className="flex items-center justify-between">
        <div className="tracking-wide text-gray-500 text-base font-bold">
          Approved IP ranges or subnets{" "}
          <span className="text-red-500 text-sm ml-1">(Coming Soon)</span>
        </div>
      </div>
      <div className="mt-2">
        <div className="mb-6 last:mb-0">
          <div className="text-sm font-medium mb-2">
            <div className="">
              Only users with IP addresses within the specified range will
              be able to access account.
            </div>
            <div className="">
              This computer is using IP address 27.54.168.197
            </div>
            <div className="">Approved IP ranges or subnets (0):</div>
            <div className="mt-2.5">
              <span className="text-gray-400 cursor-pointer" >
                Add IP address
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IPSection