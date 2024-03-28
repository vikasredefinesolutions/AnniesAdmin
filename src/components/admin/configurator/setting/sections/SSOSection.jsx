import React from 'react'

const SSOSection = () => {
  return (
    <div className="p-6 border-b-2 border-slate-200 last:border-b-0">
      <div className="flex items-center justify-between">
        <div className="tracking-wide text-gray-500 text-base font-bold">
          SAML SSO
        </div>
      </div>
      <div className="mt-2">
        <div className="mb-6 last:mb-0">
          <div className="text-sm font-medium mb-2">
            <p>
              Set up Single Sign-On (SSO) with SAML protocol.{" "}
              <a href={undefined} className="text-indigo-500">
                Learn more about SSO with SAML
              </a>
            </p>
            <p>
              <a href={undefined} className="text-indigo-500">
                Setup SAML SSO
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SSOSection