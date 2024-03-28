import React from "react";
import * as helper from "components/admin/content/helper/Helper";

const ElementAccordionDisplay = ({ selected_Values, acValues }) => {
  const iconArr = {
    keyboard_arrow_up: "keyboard_arrow_down",
    keyboard_arrow_down: "keyboard_arrow_up",
    remove_circle_outline: "add_circle_outline",
    add_circle_outline: "remove_circle_outline",
  };

  const showHideAccordion = (event) => {
    if (event.target.querySelector(".pointer-class")) {
      let symbolobj = event.target.querySelector(".pointer-class");
      symbolobj.innerHTML = iconArr[symbolobj.innerHTML];

      if (
        event.currentTarget
          .querySelector(".ac-description")
          .classList.contains("hidden")
      )
        event.currentTarget
          .querySelector(".ac-description")
          .classList.remove("hidden");
      else
        event.currentTarget
          .querySelector(".ac-description")
          .classList.add("hidden");
    }
  };

  return (
    <>
      {acValues.length > 0 && (
        <>
          {acValues.map((acValue, index) => {
            let tmpTitleBg;
            let tmpTitleBgOption;
            let tmpTitleBorderType;
            let tmpTitleBorderColor;
            let tmpTitleBorderSize;
            let titleClass;
            let descClass;
            let liClass;
            let titleColor;
            let descColor;
            let tmpBorderRadius;
            let descriptionBg;
            if (selected_Values !== undefined) {
              Object.entries(selected_Values).map(([key, value]) => {
                if (
                  key === "FullAccordion_title_bg" ||
                  key === "Accordion_title_bg"
                ) {
                  tmpTitleBg = value.value;
                }
                if (
                  key === "FullAccordion_title_bg_option" ||
                  key === "Accordion_title_bg_option"
                ) {
                  tmpTitleBgOption = value.value;
                }
                if (
                  key === "FullAccordion_title_border_type" ||
                  key === "Accordion_title_border_type"
                ) {
                  tmpTitleBorderType = value.value;
                }
                if (
                  key === "FullAccordion_title_border_color" ||
                  key === "Accordion_title_border_color"
                ) {
                  tmpTitleBorderColor = value.value;
                }
                if (
                  key === "FullAccordion_title_border_size" ||
                  key === "Accordion_title_border_size"
                ) {
                  tmpTitleBorderSize = value.value;
                }
                if (key === "AccordionTitle_final_class") {
                  titleClass = value.value;
                }
                if (key === "AccordionDescription_final_class") {
                  descClass = value.value;
                }
                if (key === "AccordionContainer_final_class") {
                  liClass = value.value;
                }
                if (key === "AccordionDescription_font_color") {
                  descColor = value.value;
                }
                if (key === "AccordionTitle_font_color") {
                  titleColor = value.value;
                }
                if (
                  key === "FullAccordion_border_radius" ||
                  key === "Accordion_title_border_size"
                ) {
                  tmpBorderRadius = value.value;
                }
                if (key === "FullAccordion_description_bg") {
                  descriptionBg = value.value;
                }
              });
            }

            let liStyle = "";
            let titleStyle = "";
            if (tmpTitleBorderType === "box")
              liClass += " border-[" + tmpTitleBorderSize + "px]";
            else if (tmpTitleBorderType === "single")
              liClass += " border-b-[" + tmpTitleBorderSize + "px]";

            if (tmpBorderRadius !== "")
              liClass += " rounded-[" + tmpBorderRadius + "px]";
            if (tmpTitleBgOption === "Color")
              titleStyle += "background: " + tmpTitleBg + "; ";
            if (tmpTitleBorderColor !== "")
              liStyle += "border-color: " + tmpTitleBorderColor + "; ";

            return (
              <li
                className={`mb-4 overflow-hidden last:mb-0 ${liClass}`}
                style={{ borderColor: tmpTitleBorderColor }}
                onClick={showHideAccordion}
                key={index}
              >
                <button
                  className={`w-full flex justify-between ${titleClass} pointer-events-none`}
                  style={{ background: tmpTitleBg, color: titleColor }}
                >
                  <div className="text-defaule-text pointer-events-none">
                    {acValue.title}
                  </div>
                  <span className="material-icons-outlined ml-3 pointer-class pointer-events-none">
                    {helper.getSymbol(acValue.icon, acValue.openstatus)}
                  </span>
                </button>
                <div
                  className={`ac-description ${acValue.openstatus != "Yes" ? "hidden" : ""
                    } ${descClass}`}
                  style={{ color: descColor, background: descriptionBg }}
                >
                  <div
                    className="text-descrition"
                    dangerouslySetInnerHTML={{ __html: acValue.desc }}
                  ></div>
                </div>
              </li>
            );
          })}
        </>
      )}
    </>
  );
};

export default ElementAccordionDisplay;
