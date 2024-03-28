import React, { Fragment } from "react";

import * as ThemeVariable from "components/admin/content/helper/ThemeVariables";

const ElementIconBrowser = ({ showModal, setShowModal, updateFont }) => {
  const showElement = (str) => {
    let x = document.getElementById("fontdisplay");
    if (x != undefined) {
      x.querySelectorAll("#fontawesome-div")[0].classList.remove(
        "bg-slate-500",
      );
      x.querySelectorAll("#fontawesome-div")[0].classList.remove("text-white");

      x.querySelectorAll("#googleicons-div")[0].classList.remove(
        "bg-slate-500",
      );
      x.querySelectorAll("#googleicons-div")[0].classList.remove("text-white");

      x.querySelectorAll("#googlesymbols-div")[0].classList.remove(
        "bg-slate-500",
      );
      x.querySelectorAll("#googlesymbols-div")[0].classList.remove(
        "text-white",
      );

      x.querySelectorAll("#googleicons")[0].classList.add("hidden");
      x.querySelectorAll("#googlesymbols")[0].classList.add("hidden");
      x.querySelectorAll("#fontawesome")[0].classList.add("hidden");

      x.querySelectorAll("#" + str + "-div")[0].classList.add("bg-slate-500");
      x.querySelectorAll("#" + str + "-div")[0].classList.add("text-white");
      x.querySelectorAll("#" + str)[0].classList.remove("hidden");
    }
  };

  return (
    <>
      {showModal ? (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-60 outline-none focus:outline-none">
          <div className="relative w-full my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                <h3 className="text-3xl font=semibold">Icon Library</h3>
                <button
                  className="bg-transparent border-0 text-black float-right"
                  onClick={() => setShowModal(false)}
                >
                  <span className="text-black opacity-7 h-6 w-6 text-xl block py-0 rounded-full">
                    x
                  </span>
                </button>
              </div>
              <div
                className="relative p-6 flex-auto flex flex-wrap"
                id={`fontdisplay`}
              >
                <ul
                  className="w-full nav nav-tabs custom-tabs flex"
                  role="tablist"
                >
                  <li
                    role="presentation"
                    className="pr-5 border-l border-t border-r rounded-t bg-slate-500 text-white p-1"
                    id="fontawesome-div"
                  >
                    <a
                      href="javascript:void(0)"
                      onClick={() => {
                        showElement("fontawesome");
                      }}
                    >
                      Font Awesome
                    </a>
                  </li>
                  <li
                    role="presentation"
                    className="border-l border-t border-r rounded-t p-1"
                    id="googleicons-div"
                  >
                    <a
                      href="javascript:void(0)"
                      onClick={() => {
                        showElement("googleicons");
                      }}
                    >
                      Google Icons
                    </a>
                  </li>
                  <li
                    role="presentation"
                    className="border-l border-t border-r rounded-t p-1"
                    id="googlesymbols-div"
                  >
                    <a
                      href="javascript:void(0)"
                      onClick={() => {
                        showElement("googlesymbols");
                      }}
                    >
                      Google Symbols
                    </a>
                  </li>
                </ul>
                <div className="box-border w-full p-4 border- border-gray-400 bg-gray-100">
                  <div className="h-full w-full bg-gray-10">
                    <div
                      id="fontawesome"
                      className="tab-pane"
                      role="tabpanel"
                      style={{ height: "200px", overflow: "scroll" }}
                    >
                      {ThemeVariable.iconLibrary.fontawesome.length > 0 && (
                        <>
                          {ThemeVariable.iconLibrary.fontawesome.map(
                            (fntsome, index) => (
                              <Fragment key={index}>
                                <a
                                  href="javascript:void(0)"
                                  onClick={() => {
                                    updateFont("fontawesome", fntsome);
                                  }}
                                  className="p-2 icon-list"
                                  dangerouslySetInnerHTML={{ __html: fntsome }}
                                />
                              </Fragment>
                            ),
                          )}
                        </>
                      )}
                    </div>

                    <div
                      id="googleicons"
                      className="tab-pane hidden"
                      role="tabpanel"
                      style={{ height: "200px", overflow: "scroll" }}
                    >
                      {ThemeVariable.iconLibrary.googleicon.length > 0 && (
                        <>
                          {ThemeVariable.iconLibrary.googleicon.map(
                            (googlefnt, index) => (
                              <Fragment key={index}>
                                <a
                                  href="javascript:void(0)"
                                  onClick={() => {
                                    updateFont("googlematerial", googlefnt);
                                  }}
                                  className="p-2  icon-list"
                                >
                                  <span className="icon-asset material-icons-outlined ng-star-inserted">
                                    {googlefnt}
                                  </span>
                                </a>
                              </Fragment>
                            ),
                          )}
                        </>
                      )}
                    </div>

                    <div
                      id="googlesymbols"
                      className="tab-pane hidden"
                      role="tabpanel"
                      style={{ height: "200px", overflow: "scroll" }}
                    >
                      {ThemeVariable.iconLibrary.googleoutline.length > 0 && (
                        <>
                          {ThemeVariable.iconLibrary.googleoutline.map(
                            (googlefnt, index) => (
                              <Fragment key={index}>
                                <a
                                  href="javascript:void(0)"
                                  onClick={() => {
                                    updateFont("googlesymbol", googlefnt);
                                  }}
                                  className="p-2  icon-list"
                                >
                                  <span className="icon-asset material-icons-outlined ng-star-inserted">
                                    {googlefnt}
                                  </span>
                                </a>
                              </Fragment>
                            ),
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ElementIconBrowser;
