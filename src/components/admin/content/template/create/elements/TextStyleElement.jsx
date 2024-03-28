import ColorPicker from "components/admin/content/common/ColorPicker";
import * as ThemeVariable from "components/admin/content/helper/ThemeVariables";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const TextStyleElement = (props) => {
  let bgPropertyName = props.variable;

  const selectedObj = props.componentHtml.filter(
    (obj) => obj.uid == props.currentComponent,
  );

  const [textTransform, setTextTransform] = useState(props.textTransform ?? "");
  const [fontSize, setFontSize] = useState(props.fontSize ?? "");
  const [fontFamily, setFontFamily] = useState(props.fontFamily ?? "");
  const [fontColor, setFontColor] = useState(props.fontColor ?? "");
  const [lineHeight, setLineHeight] = useState(props.lineHeight ?? "");
  const [letterSpacing, setLetterSpacing] = useState(props.letterSpacing ?? "");
  const [fontWeight, setFontWeight] = useState(props.fontWeight ?? "");
  const [fontStyle, setFontStyle] = useState(props.fontStyle ?? "");
  const [textDecoration, setTextDecoration] = useState("");
  const [textAlignment, setTextAlignment] = useState(props.textAlignment ?? "");

  /* Function to set component with updated attributes values */

  useEffect(() => {
    if (selectedObj.length > 0 && !props.noPropupdate) {
      if (
        selectedObj[0].selected_Values != undefined &&
        Object.keys(selectedObj[0].selected_Values).length > 0
      ) {
        let tmpTextTransform;
        let tmpFontSize;
        let tmpFontFamily;
        let tmpFontColor;
        let tmpLineHeight;
        let tmpLetterSpacing;
        let tmpFontWeight;
        let tmpFontStyle;
        let tmpTextDecoration;
        let tmpTextAlignment;

        Object.entries(selectedObj[0].selected_Values).map(([key, value]) => {
          if (key == bgPropertyName + "_text_transform") {
            tmpTextTransform = value;
          }
          if (key == bgPropertyName + "_font_size") {
            tmpFontSize = value;
          }
          if (key == bgPropertyName + "_font_family") {
            tmpFontFamily = value;
          }
          if (key == bgPropertyName + "_font_color") {
            tmpFontColor = value;
          }
          if (key == bgPropertyName + "_line_height") {
            tmpLineHeight = value;
          }
          if (key == bgPropertyName + "_letter_spacing") {
            tmpLetterSpacing = value;
          }
          if (key == bgPropertyName + "_font_weight") {
            tmpFontWeight = value;
          }
          if (key == bgPropertyName + "_font_style") {
            tmpFontStyle = value;
          }
          if (key == bgPropertyName + "_text_alignment") {
            tmpTextAlignment = value;
          }
        });

        if (tmpTextTransform != undefined) {
          let attributes = tmpTextTransform;
          setTextTransform(attributes.value);
        }

        if (tmpFontSize != undefined) {
          let attributes = tmpFontSize;
          setFontSize(attributes.value);
          //changeFontSize(attributes.value);
        }

        if (tmpFontFamily != undefined) {
          let attributes = tmpFontFamily;
          setFontFamily(attributes.value);
          //changeFontSize(attributes.value);
        }

        if (tmpFontColor != undefined) {
          let attributes = tmpFontColor;
          setFontColor(attributes.value);
          //changeFontSize(attributes.value);
        }

        if (tmpLineHeight != undefined) {
          let attributes = tmpLineHeight;
          setLineHeight(attributes.value);
          //changeFontSize(attributes.value);
        }

        if (tmpLetterSpacing != undefined) {
          let attributes = tmpLetterSpacing;
          setLetterSpacing(attributes.value);
          //changeFontSize(attributes.value);
        }

        if (tmpFontWeight != undefined) {
          let attributes = tmpFontWeight;
          setFontWeight(attributes.value);
          //changeFontSize(attributes.value);
        }

        if (tmpFontStyle != undefined) {
          let attributes = tmpFontStyle;
          setFontStyle(attributes.value);
          //changeFontSize(attributes.value);
        }

        if (tmpTextDecoration != undefined) {
          let attributes = tmpTextDecoration;
          setTextDecoration(attributes.value);
          //changeFontSize(attributes.value);
        }

        if (tmpTextAlignment != undefined) {
          let attributes = tmpTextAlignment;
          setTextAlignment(attributes.value);
          //changeFontSize(attributes.value);
        }
      } else {
        //setHeadline('');
        //updateProperty({[bgPropertyName]: imageURL});
      }
    }
  }, [props.currentComponent]);

  const changeFontSize = (event) => {
    setFontSize(event.target.value);
    props.updateProperty(
      { type: "fontsize", value: event.target.value },
      bgPropertyName + "_font_size",
    );
    if (props.changeFontSize) {
      props.changeFontSize(event);
    }
    //applyFinalClasses();
  };

  const changeFontFamily = (event) => {
    setFontFamily(event.target.value);
    props.updateProperty(
      { type: "fontfamily", value: event.target.value },
      bgPropertyName + "_font_family",
    );

    if (props.changeFontFamily) {
      props.changeFontFamily(event);
    }
    //applyFinalClasses();
  };

  const changeTextTransform = (event) => {
    if (props.type !== 'button') {
      setTextTransform(event.target.value);
      props.updateProperty(
        { type: "transform", value: event.target.value },
        bgPropertyName + "_text_transform",
      );

    }
    if (props.changeTextTransform) {
      props.changeTextTransform(event);
    }
    //applyFinalClasses();
  };

  const changeBackgroundColor = (color) => {
    setFontColor(color.hex);
    props.updateProperty(
      { type: "fontcolor", value: color.hex },
      bgPropertyName + "_font_color",
    );
    if (props.changeBackgroundColor) {
      props.changeBackgroundColor(color);
    }
    //applyFinalClasses();
  };

  const changeLineHeight = (event) => {
    setLineHeight(event.target.value);
    props.updateProperty(
      { type: "lineheight", value: event.target.value },
      bgPropertyName + "_line_height",
    );
    if (props.changeLineHeight) {
      props.changeLineHeight(event);
    }
    //applyFinalClasses();
  };

  const changeLetterSpacing = (event) => {
    setLetterSpacing(event.target.value);
    props.updateProperty(
      { type: "letterspace", value: event.target.value },
      bgPropertyName + "_letter_spacing",
    );
    if (props.changeLetterSpacing) {
      props.changeLetterSpacing(event);
    }
    //applyFinalClasses();
  };

  const changeFontStyle = (event) => {
    setFontStyle(event.target.value);
    props.updateProperty(
      { type: "fontstyle", value: event.target.value },
      bgPropertyName + "_font_style",
    );
    if (props.changeFontStyle) {
      props.changeFontStyle(event);
    }
    //applyFinalClasses();
  };

  const changeTextAlignment = (event) => {
    setTextAlignment(event.target.value);
    props.updateProperty(
      { type: "alignment", value: event.target.value },
      bgPropertyName + "_text_alignment",
    );
    if (props.changeTextAlignment) {
      props.changeTextAlignment(event);
    }
    //applyFinalClasses();
  };

  const changeFontWeight = (event) => {
    setFontWeight(event.target.value);
    props.updateProperty(
      { type: "font_weight", value: event.target.value },
      bgPropertyName + "_font_weight",
    );
    if (props.changeFontWeight) {
      props.changeFontWeight(event);
    }
    //applyFinalClasses();
  };

  const applyFinalClasses = () => {
    let addClassName = "";
    if (selectedObj.length > 0) {
      if (
        selectedObj[0].selected_Values != undefined &&
        Object.keys(selectedObj[0].selected_Values).length > 0
      ) {
        Object.entries(selectedObj[0].selected_Values).map(([key, value]) => {
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
        });
      }
    }

    let x = ReactDOM.findDOMNode(
      props.refArray.current[props.currentComponent],
    );
    let className = "";
    className += addClassName;
    if (fontSize !== "") {
      className += " " + fontSize;
    }
    if (fontFamily !== "") {
      className += " " + fontFamily;
    }
    if (letterSpacing !== "") {
      className += " tracking-[" + letterSpacing + "]";
    }
    if (lineHeight !== "") {
      className += " " + lineHeight;
    }
    if (fontWeight !== "") {
      className += " " + fontWeight;
    }
    if (textAlignment !== "") {
      className += " " + textAlignment;
    }
    if (fontStyle !== "") {
      className += " " + fontStyle;
    }
    if (textTransform !== "") {
      className += " " + textTransform;
    }
    if (props.btnStyle) className += " " + props.btnStyle;
    props.updateProperty(
      { type: "finalclass", value: className },
      bgPropertyName + "_final_class",
    );

    if (className !== "") {
      if (
        props.type !== undefined &&
        (props.type === "accordion" ||
          props.type === "carousel" ||
          props.type === "dynamic" || props.type === "button")
      ) {
      } else {
        if (x && x.querySelectorAll("#" + props.variable).length > 0) {
          x.querySelectorAll("#" + props.variable)[0].className = className;
        }
      }
    }
    if (fontColor !== "") {
      if (
        props.type !== undefined &&
        (props.type === "accordion" ||
          props.type === "carousel" ||
          props.type === "dynamic")
      ) {
      } else if (x.querySelectorAll("#" + props.variable).length > 0)
        x.querySelectorAll("#" + props.variable)[0].style =
          "color: " + fontColor;
    }

    // text decpration is pending
  };

  useEffect(() => {
    if (props.type !== "button")
      applyFinalClasses();
  }, [
    fontSize,
    fontColor,
    fontFamily,
    letterSpacing,
    lineHeight,
    fontWeight,
    textAlignment,
    fontStyle,
    textTransform,
  ]);

  return (
    <>
      <div className="mb-4 last:mb-0">
        <div className="mb-4 last:mb-0">
          <div className="flex justify-between items-center mb-1">
            <div>Font Family</div>
          </div>

          <div className="flex flex-wrap">
            <select
              onChange={changeFontFamily}
              value={props.fontFamily ? props.fontFamily : fontFamily}
              className="w-full grow text-sm bg-gray-100 text-gray-700 border border-gray-200 p-3 py-2 leading-tight focus:ring-0 focus:shadow-none focus:outline-none focus:bg-white"
            >
              <option value="">Select Font Family</option>
              {/* {props.fontsArray.map((value, index) => (
              //value.value  --> props.fontsArray
                <option key={index} value={value.value} className={value.value}>
                  {value.label}
                </option>
              ))} */}
              {ThemeVariable.FontFamily.map((value, index) => (
                <option key={index} value={value.value} className={value.value}>
                  {value.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-4 last:mb-0 flex flex-wrap -mx-1.5">
          <div className="w-1/2 px-1.5">
            <div className="flex justify-between items-center mb-1">
              <div>Font Size</div>
            </div>
            <div className="relative flex flex-wrap">
              <select
                onChange={changeFontSize}
                value={(props.fontSize || props.fontSize == "") ? props.fontSize : fontSize}
                className="grow text-sm bg-gray-100 text-gray-700 border border-gray-200 p-3 py-2 leading-tight focus:ring-0 focus:shadow-none focus:outline-none focus:bg-white"
              >
                <option value="">None</option>
                {ThemeVariable.FontSize.map((value, index) => (
                  <option key={index} value={value.value}>
                    {value.label}
                  </option>
                ))}
              </select>
              <a
                href="javascript:void(0);"
                className="w-11 px-2 py-1 inline-flex items-center justify-center text-sm bg-[#F1F5F9] border border-neutral-200 border-l-0 outline-none focus:ring-0 "
              >
                <span className="font-semibold">PX</span>
              </a>
            </div>
          </div>
          <div className="w-1/2 px-1.5">
            <div className="flex justify-between items-center mb-1">
              <div>Font Weight</div>
            </div>
            <div className="relative flex flex-wrap">
              <select
                onChange={changeFontWeight}
                value={props.fontWeight ?? fontWeight}
                className="grow text-sm bg-gray-100 text-gray-700 border border-gray-200 p-3 py-2  leading-tight focus:ring-0 focus:shadow-none focus:outline-none focus:bg-white"
              >
                <option value="">None</option>
                {ThemeVariable.FontWeight.map((value, index) => (
                  <option key={index} value={value.value}>
                    {value.label}
                  </option>
                ))}
              </select>
              <a
                href="javascript:void(0);"
                className="w-11 px-2 py-1 inline-flex items-center justify-center text-sm bg-[#F1F5F9] border border-neutral-200 border-l-0 outline-none focus:ring-0 "
              >
                <span className="material-icons-outlined">format_bold</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mb-4 last:mb-0 flex flex-wrap -mx-1.5">
          <div className="w-1/2 px-1.5">
            <div className="flex justify-between items-center mb-1">
              <div>Line Height</div>
            </div>
            <div className="relative flex flex-wrap">
              <select
                onChange={changeLineHeight}
                value={props.lineHeight ?? lineHeight}
                className="grow text-sm bg-gray-100 text-gray-700 border border-gray-200 p-3 py-2  leading-tight focus:ring-0 focus:shadow-none focus:outline-none focus:bg-white"
              >
                <option value="">None</option>
                {ThemeVariable.lineHeight.map((value, index) => (
                  <option key={index} value={value.value}>
                    {value.label}
                  </option>
                ))}
              </select>
              <a
                href="javascript:void(0);"
                className="w-11 px-2 py-1 inline-flex items-center justify-center text-sm bg-[#F1F5F9] border border-neutral-200 border-l-0 outline-none focus:ring-0 "
              >
                <span className="material-icons-outlined">
                  format_line_spacing
                </span>
              </a>
            </div>
          </div>

          <div className="w-1/2 px-1.5">
            <div className="flex justify-between items-center mb-1">
              <div>Letter Spacing</div>
            </div>
            <div className="relative flex flex-wrap">
              <select
                onChange={changeLetterSpacing}
                value={props.letterSpacing ?? letterSpacing}
                className="grow text-sm bg-gray-100 text-gray-700 border border-gray-200 p-3 py-2  leading-tight focus:ring-0 focus:shadow-none focus:outline-none focus:bg-white"
              >
                <option value="">None</option>
                {ThemeVariable.LetterSpacing.map((value, index) => (
                  <option key={index} value={value.value}>
                    {value.label}
                  </option>
                ))}
              </select>
              <a
                href="javascript:void(0);"
                className="w-11 px-2 py-1 inline-flex items-center justify-center text-sm bg-[#F1F5F9] border border-neutral-200 border-l-0 outline-none focus:ring-0 "
              >
                <span className="material-symbols-outlined">
                  format_letter_spacing
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="mb-4 last:mb-0">
          <label htmlFor="" className="mb-1 block text-sm">
            {props.title ?? ""} Font Color
          </label>
          <div className="flex flex-wrap">
            <ColorPicker
              changeBackgroundColor={changeBackgroundColor}
              value={props.fontColor ?? fontColor}
            />
          </div>
        </div>

        {!props.noTextAlignment && (
          <div className="mb-4 last:mb-0">
            <div className="flex justify-between items-center mb-1">
              <div>Text Alignment</div>
            </div>
            <div className="flex flex-wrap divide-x divide-neutral-200 border border-neutral-200 overflow-hidden">
              {ThemeVariable.FontAlignment.map((alignment, index) => (
                <button
                  key={index}
                  value={alignment.value}
                  onClick={changeTextAlignment}
                  className={`w-1/4 px-2 py-1 inline-flex justify-center items-center text-sm focus:ring-0 focus:shadow-none focus:outline-none ${(props.textAlignment ?? textAlignment) === alignment.value ? "bg-[#F1F5F9]" : "bg-white"}`}
                  dangerouslySetInnerHTML={{ __html: alignment.icon }}
                />
              ))}
            </div>
          </div>
        )}

        <div className="mb-4 last:mb-0">
          <div className="flex justify-between items-center mb-1">
            <div>Font Style</div>
          </div>
          <div className="flex flex-wrap divide-x divide-neutral-200 border border-neutral-200 overflow-hidden">
            {ThemeVariable.FontStyle.map((style, index) => (
              <button
                key={index}
                value={style.value}
                onClick={changeFontStyle}
                className={`w-1/5 px-2 py-1 inline-flex justify-center items-center text-sm focus:ring-0 focus:shadow-none focus:outline-none ${(props.fontStyle ?? fontStyle) === style.value ? "bg-[#F1F5F9]" : "bg-white"}`}
                dangerouslySetInnerHTML={{ __html: style.icon }}
              />
            ))}
          </div>
        </div>
        <div className="mb-4 last:mb-0">
          <div className="flex justify-between items-center mb-1">
            <div>Text Transform</div>
          </div>
          <div className="flex flex-wrap divide-x divide-neutral-200 border border-neutral-200 overflow-hidden">
            {ThemeVariable.TextTransform.map((transform, index) => (
              <button
                key={index}
                value={transform.value}
                onClick={changeTextTransform}
                className={`w-1/4 px-2 py-1 inline-flex justify-center items-center text-sm bg-[#F1F5F9] focus:ring-0 focus:shadow-none focus:outline-none ${(props.textTransform ?? textTransform) === transform.value ? "bg-[#F1F5F9]" : "bg-white"}`}
              >
                <span
                  className={`pointer-events-none ${transform.icon === "block"
                    ? "material-icons-outlined"
                    : "font-semibold"
                    }`}
                >
                  {transform.icon}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TextStyleElement;
