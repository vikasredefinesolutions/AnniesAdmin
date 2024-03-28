import React, { useState } from "react";
import { useEffect } from "react";

const ElementTailwindAccordionDisplay = ({ html, id }) => {
  useEffect(() => {
    handleAddLogic();
  }, []);

  const handleAddLogic = async () => {
    const mainDiv = await document.querySelector(`#custom_accordion_${id}`);
    const accordion = mainDiv.querySelector("#accordion");
    const buttons = accordion.querySelectorAll("button");
    buttons.forEach((button, index) => {
      button.addEventListener("click", (e) => {
        const accordionItems = accordion.querySelectorAll("li");
        const divToToggle =
          accordionItems[index].querySelector(".ac-description");
        if (divToToggle.classList.contains("hidden")) {
          divToToggle.classList.remove("hidden");
        } else {
          divToToggle.classList.add("hidden");
        }
      });
    });
  };
  return (
    <div className="text-center w-full" id={`custom_accordion_${id}`}>
      <div
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      ></div>
    </div>
  );
};

export default ElementTailwindAccordionDisplay;
