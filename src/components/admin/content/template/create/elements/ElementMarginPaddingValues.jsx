import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import * as ThemeVariable from "components/admin/content/helper/ThemeVariables";

const ElementMarginPaddingValues = (props) => {
  const [isAllMarginSwitchOn, setIsAllMarginSwitchOn] = useState(false);
  const [isPaddingSwitchOn, setIsPaddingSwitchOn] = useState(false);

  // padding values
  const [leftPadding, setLeftPadding] = useState(props.leftPadding ?? "");
  const [topPadding, setTopPadding] = useState(props.topPadding ?? "");
  const [rightPadding, setRightPadding] = useState(props.rightPadding ?? "");
  const [bottomPadding, setBottomPadding] = useState(props.bottomPadding ?? "");

  // margin values
  const [leftMargin, setLeftMargin] = useState(props.leftMargin ?? "");
  const [topMargin, setTopMargin] = useState(props.topMargin ?? "");
  const [rightMargin, setRightMargin] = useState(props.rightMargin ?? "");
  const [bottomMargin, setBottomMargin] = useState(props.bottomMargin ?? "");

  let bgPropertyName = props.variable;
  const selectedObj = props.componentHtml.filter(
    (obj) => obj.uid == props.currentComponent,
  );

  const changeLeftMargin = (event) => {
    setLeftMargin(event.target.value);
    if (!props.noPropupdate) {
      props.updateProperty(
        { type: "left_margin", value: event.target.value },
        bgPropertyName + "_left_margin",
      );
    }
    if (props.changeLeftMargin) {
      props.changeLeftMargin(event);
    }
  };

  const changeTopMargin = (event) => {
    setTopMargin(event.target.value);
    if (!props.noPropupdate) {
      props.updateProperty(
        { type: "top_margin", value: event.target.value },
        bgPropertyName + "_top_margin",
      );
    }
    if (props.changeTopMargin) {
      props.changeTopMargin(event);
    }
  };

  const changeRightMargin = (event) => {
    setRightMargin(event.target.value);
    if (!props.noPropupdate) {
      props.updateProperty(
        { type: "right_margin", value: event.target.value },
        bgPropertyName + "_right_margin",
      );
    }
    if (props.changeRightMargin) {
      props.changeRightMargin(event);
    }
  };

  const changeBottomMargin = (event) => {
    setBottomMargin(event.target.value);
    if (!props.noPropupdate) {
      props.updateProperty(
        { type: "bottom_margin", value: event.target.value },
        bgPropertyName + "_bottom_margin",
      );
    }
    if (props.changeBottomMargin) {
      props.changeBottomMargin(event);
    }
  };

  const changeLeftPadding = (event) => {
    // console.log("changeLeftPadding event ", event.target.value);
    setLeftPadding(event.target.value);
    if (!props.noPropupdate) {
      props.updateProperty(
        { type: "left_padding", value: event.target.value },
        bgPropertyName + "_left_padding",
      );
    }
    if (props.changeLeftPadding) {
      props.changeLeftPadding(event);
    }
  };

  const changeTopPadding = (event) => {
    setTopPadding(event.target.value);
    if (!props.noPropupdate) {
      props.updateProperty(
        { type: "top_padding", value: event.target.value },
        bgPropertyName + "_top_padding",
      );
    }
    if (props.changeTopPadding) {
      props.changeTopPadding(event);
    }
  };

  const changeRightPadding = (event) => {
    setRightPadding(event.target.value);
    if (!props.noPropupdate) {
      props.updateProperty(
        { type: "right_padding", value: event.target.value },
        bgPropertyName + "_right_padding",
      );
    }
    if (props.changeRightPadding) {
      props.changeRightPadding(event);
    }
  };

  const changeBottomPadding = (event) => {
    setBottomPadding(event.target.value);
    if (!props.noPropupdate) {
      props.updateProperty(
        { type: "bottom_padding", value: event.target.value },
        bgPropertyName + "_bottom_padding",
      );
    }
    if (props.changeBottomPadding) {
      props.changeBottomPadding(event);
    }
  };

  const handleSelectAllMargins = (event) => {
    changeTopMargin(event);
    changeRightMargin(event);
    changeBottomMargin(event);
    changeLeftMargin(event);
  };

  const handleSelectAllPaddings = (event) => {
    changeTopPadding(event);
    setTimeout(function () {
      changeRightPadding(event);
    }, 500);
    setTimeout(function () {
      changeBottomPadding(event);
    }, 500);
    setTimeout(function () {
      changeLeftPadding(event);
    }, 500);
  };

  const applyFinalClassesWithMargin = (event) => {
    let addClassName = "";
    if (selectedObj.length > 0) {
      if (
        selectedObj[0].selected_Values != undefined &&
        Object.keys(selectedObj[0].selected_Values).length > 0
      ) {
        Object.entries(selectedObj[0].selected_Values).map(([key, value]) => {
          if (key == bgPropertyName + "_text_transform") {
            addClassName += " " + value.value;
          }
          if (key == bgPropertyName + "_font_size") {
            addClassName += " " + value.value;
          }
          if (key == bgPropertyName + "_font_family") {
            addClassName += " " + value.value;
          }
          if (key == bgPropertyName + "_line_height") {
            addClassName += " " + value.value;
          }
          if (key == bgPropertyName + "_letter_spacing") {
            if (value.value == "None")
              addClassName += " tracking-[" + value.value + "]";
            else addClassName += " tracking-[" + value.value + "]";
          }
          if (key == bgPropertyName + "_font_weight") {
            addClassName += " " + value.value;
          }
          if (key == bgPropertyName + "_font_style") {
            addClassName += " " + value.value;
          }
          if (key == bgPropertyName + "_text_alignment") {
            addClassName += " " + value.value;
          }
          if (key === bgPropertyName + "_left_margin") {
            addClassName += " " + value.value;
          }
          if (key === bgPropertyName + "_top_margin") {
            addClassName += " " + value.value;
          }
          if (key === bgPropertyName + "_right_margin") {
            addClassName += " " + value.value;
          }
          if (key === bgPropertyName + "_bottom_margin") {
            addClassName += " " + value.value;
          }
          if (key === bgPropertyName + "_image_position") {
            addClassName += " " + value.value;
          }
        });
      }
    }

    let x = ReactDOM.findDOMNode(
      props.refArray.current[props.currentComponent],
    );
    let className = "";
    className += addClassName;
    if (leftPadding !== "") {
      className += " " + leftPadding;
    }
    if (rightPadding !== "") {
      className += " " + rightPadding;
    }
    if (topPadding !== "") {
      className += " " + topPadding;
    }
    if (bottomPadding !== "") {
      className += " " + bottomPadding;
    }
    if (props.btnStyle) className += " " + props.btnStyle;
    if (props.imagePosition) className += " " + props.imagePosition;

    if (
      className !== "" &&
      x &&
      x.querySelectorAll("#" + props.variable).length > 0
    ) {
      x.querySelectorAll("#" + props.variable)[0].className = className;
    }

    props.updateProperty(
      { type: "finalclass", value: className },
      bgPropertyName + "_final_class",
    );

    if (props.setTextClass) {
      props.setTextClass();
    }
  };

  const applyFinalClassesWithPadding = (event) => {
    let addClassName = "";
    if (selectedObj.length > 0) {
      if (
        selectedObj[0].selected_Values != undefined &&
        Object.keys(selectedObj[0].selected_Values).length > 0
      ) {
        Object.entries(selectedObj[0].selected_Values).map(([key, value]) => {
          if (key == bgPropertyName + "_text_transform") {
            addClassName += " " + value.value;
          }
          if (key == bgPropertyName + "_font_size") {
            addClassName += " " + value.value;
          }
          if (key == bgPropertyName + "_font_family") {
            addClassName += " " + value.value;
          }
          if (key == bgPropertyName + "_line_height") {
            addClassName += " " + value.value;
          }
          if (key == bgPropertyName + "_letter_spacing") {
            if (value.value == "None")
              addClassName += " tracking-[" + value.value + "]";
            else addClassName += " tracking-[" + value.value + "]";
          }
          if (key == bgPropertyName + "_font_weight") {
            addClassName += " " + value.value;
          }
          if (key == bgPropertyName + "_font_style") {
            addClassName += " " + value.value;
          }
          if (key == bgPropertyName + "_text_alignment") {
            addClassName += " " + value.value;
          }
          if (key === bgPropertyName + "_left_padding") {
            addClassName += " " + value.value;
          }
          if (key === bgPropertyName + "_top_padding") {
            addClassName += " " + value.value;
          }
          if (key === bgPropertyName + "_right_padding") {
            addClassName += " " + value.value;
          }
          if (key === bgPropertyName + "_bottom_padding") {
            addClassName += " " + value.value;
          }
          if (key === bgPropertyName + "_image_position") {
            addClassName += " " + value.value;
          }
        });
      }
    }

    let x = ReactDOM.findDOMNode(
      props.refArray.current[props.currentComponent],
    );
    let className = "";
    className += addClassName;
    if (leftMargin !== "") {
      className += " " + leftMargin;
    }
    if (rightMargin !== "") {
      className += " " + rightMargin;
    }
    if (topMargin !== "") {
      className += " " + topMargin;
    }
    if (bottomMargin !== "") {
      className += " " + bottomMargin;
    }
    if (props.btnStyle) className += " " + props.btnStyle;

    if (props.type && props.type == "ca") {
    } else {
      if (
        className !== "" &&
        x &&
        x.querySelectorAll("#" + props.variable).length > 0
      ) {
        x.querySelectorAll("#" + props.variable)[0].className = className;
      }
      props.updateProperty(
        { type: "finalclass", value: className },
        bgPropertyName + "_final_class",
      );
    }

    if (typeof props.setTextClass === "function") {
      props.setTextClass();
    }
  };

  /* Function to set component with updated attributes values */
  useEffect(() => {
    if (selectedObj.length > 0 && !props.noPropupdate) {
      if (
        selectedObj[0].selected_Values != undefined &&
        Object.keys(selectedObj[0].selected_Values).length > 0
      ) {
        let tmpLeftPadding;
        let tmpTopPadding;
        let tmpRightPadding;
        let tmpBottomPadding;

        Object.entries(selectedObj[0].selected_Values).map(([key, value]) => {
          if (key == bgPropertyName + "_left_padding") {
            tmpLeftPadding = value;
          }
          if (key == bgPropertyName + "_top_padding") {
            tmpTopPadding = value;
          }
          if (key == bgPropertyName + "_right_padding") {
            tmpRightPadding = value;
          }
          if (key == bgPropertyName + "_bottom_padding") {
            tmpBottomPadding = value;
          }
        });

        if (tmpLeftPadding != undefined) {
          let attributes = tmpLeftPadding;
          setLeftPadding(attributes.value);
        }

        if (tmpTopPadding != undefined) {
          let attributes = tmpTopPadding;
          setTopPadding(attributes.value);
        }

        if (tmpRightPadding != undefined) {
          let attributes = tmpRightPadding;
          setRightPadding(attributes.value);
        }

        if (tmpBottomPadding != undefined) {
          let attributes = tmpBottomPadding;
          setBottomPadding(attributes.value);
        }
      }
    }
  }, [props.currentComponent]);

  useEffect(() => {
    if (selectedObj.length > 0 && !props.noPropupdate) {
      if (
        selectedObj[0].selected_Values != undefined &&
        Object.keys(selectedObj[0].selected_Values).length > 0
      ) {
        let tmpLeftMargin;
        let tmpTopMargin;
        let tmpRightMargin;
        let tmpBottomMargin;

        Object.entries(selectedObj[0].selected_Values).map(([key, value]) => {
          if (key == bgPropertyName + "_left_margin") {
            tmpLeftMargin = value;
          }
          if (key == bgPropertyName + "_top_margin") {
            tmpTopMargin = value;
          }
          if (key == bgPropertyName + "_right_margin") {
            tmpRightMargin = value;
          }
          if (key == bgPropertyName + "_bottom_margin") {
            tmpBottomMargin = value;
          }
        });

        if (tmpLeftMargin != undefined) {
          let attributes = tmpLeftMargin;
          setLeftMargin(attributes.value);
        }

        if (tmpTopMargin != undefined) {
          let attributes = tmpTopMargin;
          setTopMargin(attributes.value);
        }

        if (tmpRightMargin != undefined) {
          let attributes = tmpRightMargin;
          setRightMargin(attributes.value);
        }

        if (tmpBottomMargin != undefined) {
          let attributes = tmpBottomMargin;
          setBottomMargin(attributes.value);
        }
      }
    }
  }, [props.currentComponent]);

  useEffect(() => {
    if (bgPropertyName !== "container") {
      applyFinalClassesWithPadding();
    }
  }, [leftPadding, rightPadding, topPadding, bottomPadding]);

  useEffect(() => {
    applyFinalClassesWithMargin();
  }, [leftMargin, rightMargin, topMargin, bottomMargin]);

  return (
    <>
      <div className="mb-3 last:mb-0">
        <div className="flex justify-between items-center mb-1">
          <div>Margin & Padding</div>
        </div>
        <div className="py-7">
          <div className="relative">
            <a
              href="javascript:void(0);"
              className={`hidden z-1 absolute left-6 top-3 h-8 px-1 mx-0.5 py-1 w-[40px] text-center text-sm ${isAllMarginSwitchOn ? "bg-[#bebebe]" : "bg-white "} border border-neutral-200 outline-none focus:ring-0 rounded-md `}
            >
              <span
                onClick={() => setIsAllMarginSwitchOn((prev) => !prev)}
                className="material-icons-outlined  hidden"
              >
                drag_handle
              </span>
            </a>
            <div
              id="margin-border"
              className="border-2 border-[#CDD7E3] border-dashed mx-5 px-5 py-4 min-h-[140px] max-h-[140px]"
            >
              <div id="padding-container" className="bg-[#CDD7E3]">
                <div
                  id="padding-border"
                  className="border-2 border-white border-dashed bg-[#CDD7E3] w-full h-28"
                >
                  <div className="absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-full text-center">
                      <div className="my-2">
                        {/* top margin */}
                        <select
                          onChange={(e) =>
                            isAllMarginSwitchOn
                              ? handleSelectAllMargins(e)
                              : changeTopMargin(e)
                          }
                          value={props.topMargin ?? topMargin}
                          className="grow h-8 px-1 mx-0.5 py-1 w-1/4 text-sm bg-white border border-[neutral-200] outline-none focus:ring-0 rounded-md"
                        >
                          {(props.isButton
                            ? ThemeVariable.btnTopMargin
                            : ThemeVariable.topMargin
                          ).map((value, index) => (
                            <option key={index} value={value.value}>
                              {value.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="my-2">
                        {/* top padding */}
                        <select
                          onChange={(e) =>
                            isPaddingSwitchOn
                              ? handleSelectAllPaddings(e)
                              : changeTopPadding(e)
                          }
                          value={props.topPadding ?? topPadding}
                          className="grow h-8 px-1 mx-0.5 py-1 w-1/4 text-sm bg-[#F1F5F9] border border-neutral-200 outline-none focus:ring-0 rounded-md"
                        >
                          {(props.isButton
                            ? ThemeVariable.btnTopPadding
                            : ThemeVariable.topPadding
                          ).map((value, index) => (
                            <option key={index} value={value.value}>
                              {value.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center">
                      {/* left margin  */}
                      <select
                        onChange={(e) =>
                          isAllMarginSwitchOn
                            ? handleSelectAllMargins(e)
                            : changeLeftMargin(e)
                        }
                        value={props.leftMargin ?? leftMargin}
                        className="grow h-8 px-1 mx-0.5 py-1 w-1/6 text-sm bg-white border border-neutral-200 outline-none focus:ring-0 rounded-md"
                      >
                        {(props.isButton
                          ? ThemeVariable.btnLeftMargin
                          : ThemeVariable.leftMargin
                        ).map((value, index) => (
                          <option key={index} value={value.value}>
                            {value.label}
                          </option>
                        ))}
                      </select>
                      {/* left padding */}
                      <select
                        onChange={(e) =>
                          isPaddingSwitchOn
                            ? handleSelectAllPaddings(e)
                            : changeLeftPadding(e)
                        }
                        value={props.leftPadding ?? leftPadding}
                        className="grow h-8 px-1 mx-0.5 py-1 w-1/6 text-sm bg-[#F1F5F9] border border-neutral-200 outline-none focus:ring-0 rounded-md"
                      >
                        {(props.isButton
                          ? ThemeVariable.btnLeftPadding
                          : ThemeVariable.leftPadding
                        ).map((value, index) => (
                          <option key={index} value={value.value}>
                            {value.label}
                          </option>
                        ))}
                      </select>
                      <a
                        href="javascript:void(0);"
                        className={`hidden h-8 px-1 mx-0.5 py-1 w-[40px] text-center text-sm ${isPaddingSwitchOn ? "bg-[#bebebe]" : "bg-white "} border border-neutral-200 outline-none focus:ring-0 rounded-md`}
                      >
                        {/* padding equal */}
                        <span
                          onClick={() => setIsPaddingSwitchOn((prev) => !prev)}
                          className="material-icons-outlined hidden"
                        >
                          drag_handle
                        </span>
                      </a>
                      {/* right padding */}
                      <select
                        onChange={(e) =>
                          isPaddingSwitchOn
                            ? handleSelectAllPaddings(e)
                            : changeRightPadding(e)
                        }
                        value={props.rightPadding ?? rightPadding}
                        className="grow h-8 px-1 mx-0.5 py-1 w-1/6 text-sm bg-[#F1F5F9] border border-neutral-200 outline-none focus:ring-0 rounded-md"
                      >
                        {(props.isButton
                          ? ThemeVariable.btnRightPadding
                          : ThemeVariable.rightPadding
                        ).map((value, index) => (
                          <option key={index} value={value.value}>
                            {value.label}
                          </option>
                        ))}
                      </select>
                      {/* right margin */}
                      <select
                        onChange={(e) =>
                          isAllMarginSwitchOn
                            ? handleSelectAllMargins(e)
                            : changeRightMargin(e)
                        }
                        value={props.rightMargin ?? rightMargin}
                        className="grow h-8 px-1 mx-0.5 py-1 w-1/6 text-sm bg-white border border-neutral-200 outline-none focus:ring-0 rounded-md"
                      >
                        {(props.isButton
                          ? ThemeVariable.btnRightMargin
                          : ThemeVariable.rightMargin
                        ).map((value, index) => (
                          <option key={index} value={value.value}>
                            {value.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-full text-center">
                      <div className="my-2">
                        {/* bottom padding */}
                        <select
                          onChange={(e) =>
                            isPaddingSwitchOn
                              ? handleSelectAllPaddings(e)
                              : changeBottomPadding(e)
                          }
                          value={props.bottomPadding ?? bottomPadding}
                          className="grow h-8 px-1 mx-0.5 py-1 w-1/4 text-sm bg-[#F1F5F9] border border-neutral-200 outline-none focus:ring-0 rounded-md"
                        >
                          {(props.isButton
                            ? ThemeVariable.btnBottomPadding
                            : ThemeVariable.bottomPadding
                          ).map((value, index) => (
                            <option key={index} value={value.value}>
                              {value.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="my-2">
                        {/* bottom margin */}
                        <select
                          onChange={(e) =>
                            isAllMarginSwitchOn
                              ? handleSelectAllMargins(e)
                              : changeBottomMargin(e)
                          }
                          value={props.bottomMargin ?? bottomMargin}
                          className="grow h-8 px-1 mx-0.5 py-1 w-1/4 text-sm bg-white border border-neutral-200 outline-none focus:ring-0 rounded-md"
                        >
                          {(props.isButton
                            ? ThemeVariable.btnBottomMargin
                            : ThemeVariable.bottomMargin
                          ).map((value, index) => (
                            <option key={index} value={value.value}>
                              {value.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ElementMarginPaddingValues;
