export const dynamicHalfSizeBoxes = (dataArr, selectedObj) => {
  let className = "";
  let tag = "p";
  let text = "";
  let fontColor = "#000";
  let check = false;
  let strHTML = "";

  let h_className = "";
  let h_tag = "div";
  let h_fontColor = "#000";

  if (selectedObj.selected_Values) {
    check = true;
    Object.entries(selectedObj.selected_Values).map(([key, value]) => {
      const isAvailTitle = key.toLowerCase().includes("title");
      const isAvailHead = key.toLowerCase().includes("headline");
      if (isAvailTitle) {
        if (value.type === "text") {
          text = value.value;
        } else if (value.type === "headertag") {
          tag = value.value;
        } else if (value.type === "fontcolor") {
          fontColor = value.value;
        } else {
          className += `${value.value} `;
        }
      } else if (isAvailHead) {
        if (value.type === "headertag") {
          h_tag = value.value;
        } else if (value.type === "fontcolor") {
          h_fontColor = value.value;
        } else {
          h_className += `${value.value} `;
        }
      }
    });

    strHTML += `<div class="w-full"><${tag} style="color: ${fontColor};" class="${className}">${text}</${tag}></div><div class="flex flex-wrap">`;
  }
  if (dataArr.length > 0) {
    let cnt = 1;

    // console.log("dataArr", dataArr);

    dataArr.forEach(function (item) {
      strHTML +=
        '<div class="w-full md:w-1/2 p-px" style="' +
        (item.BlockBg ? "background: " + item.BlockBg + ";" : "") +
        '">';

      strHTML +=
        '<div class="text-center h-full p-6 lg:py-12 lg:px-16 md:rounded-tl-lg ' +
        (item.ImageNumber === "Number" ? " relative" : "") +
        " " +
        (item.HOverColor ? item.HOverColor : "") +
        '" >';

      if (item.ImageNumber === "Number") {
        strHTML +=
          '<div class="inset-x-0 flex justify-center items-center w-12 h-12 mx-auto rounded-full bg-gray-500 text-gray-50 font-bold font-heading -top-6 absolute">';
        strHTML += cnt;
        strHTML += "</div>";
      } else if (item.ImageNumber === "Image") {
        strHTML +=
          '<span class="mx-auto mb-6 flex items-center justify-center rounded-full w-16 h-16">';
        strHTML += '<img src="' + item.ImageNumber_image + '" />';
        strHTML += "</span>";
      } else {
        let iconFontColor;

        let className = "";
        if (item.ImageNumber_icon_color) {
          iconFontColor = item.ImageNumber_icon_color;
        }
        if (item.ImageNumber_icon_font_size) {
          className += item.ImageNumber_icon_font_size;
        }
        if (item.ImageNumber_icon_font_weight) {
          className += item.ImageNumber_icon_font_weight;
        }
        if (item.ImageNumber_icon_alignment) {
          className += item.ImageNumber_icon_alignment;
        }
        if (item.ImageNumber_icon_type === "googlematerial") {
          className += " material-icons-outlined";
        } else if (item.ImageNumber_icon_type === "fontawesome") {
          className += "";
        } else if (item.ImageNumber_icon_type === "googlesymbol") {
          className += " material-symbols-outlined";
        }

        strHTML += `<div class="${item?.ImageNumber_icon_alignment ? item.ImageNumber_icon_alignment : "text-center"}">`;
        strHTML +=
          '<span class="' +
          className +
          '" style="color: ' +
          iconFontColor +
          '">' +
          item.ImageNumber_icon_symbol +
          "</span>";
        strHTML += "</div>";
      }
      cnt++;

      strHTML +=
        `<${h_tag} style="color: ${h_fontColor};" class="mb-4 text-box-h2 font-heading ${h_className}">` +
        item.Headline +
        `</${h_tag}>`;
      strHTML += '<div class="text-box-p mt-4 leading-loose">';
      strHTML += item.Description;
      strHTML += "</div></div></div>";
    });
  }
  if (check) {
    strHTML += "</div>";
  }

  return strHTML;
};

export const scrollableImages = (dataArr) => {
  let strHTML = "";
  if (dataArr.length > 0) {
    strHTML += '<div class="justify-between flex">';
    dataArr.forEach(function (item) {
      if (item.Image !== undefined) {
        strHTML +=
          '<div class="swiper-slide" style="width: 170px; margin-right: 30px;">';
        // strHTML += '<a href="' + item.Image_link + '">';
        strHTML += '<button type="button">';
        strHTML +=
          '<img class="w-full mx-auto" alt="' +
          item?.Image_alt +
          '" title="' +
          item?.Image_alt +
          '" src="' +
          item.Image +
          '"/>';
        strHTML += "</button>";
        strHTML += "</div>";
      }
    });
    strHTML += "</div>";
  }
  return strHTML;
};

export const portfolioBox = (dataArr) => {
  let strHTML = "";
  if (dataArr.length > 0) {
    dataArr.forEach(function (item) {
      strHTML +=
        '<div class="w-full md:w-3/12 sm:w-6/12 text-center px-[15px]">';
      strHTML += '<div class=""><img src="' + item.Image + '"></div>';
      if (item.Headline)
        strHTML +=
          '<div class="mt-[20px] text-[18px] font-bold">' +
          item.Headline +
          "</div>";
      if (item.Description)
        strHTML +=
          '<div class="text-[#3f5364] text-[18px] leading-[26px] tracking-wider mb-[30px]">' +
          item.Description +
          "</div>";

      strHTML += "</div>";
    });
  }
  return strHTML;
};

export const imageGallery = (dataArr) => {
  let strHTML = "";
  if (dataArr.length > 0) {
    strHTML +=
      '<div class="max-w-[950px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 gallery">';
    dataArr.forEach(function (item) {
      if (item.Image != "") {
        strHTML += "<div>";
        strHTML +=
          '<a href="javascript:void(0)" title="' +
          item.Image_alt +
          '"><img src="' +
          item.Image +
          '" alt="' +
          item.Image_alt +
          '" title="' +
          item.Image_alt +
          '"></a>';
        strHTML += "</div>";
      }
    });
    strHTML += "</div>";
  }
  return strHTML;
};

export const smallBoxes = (dataArr) => {
  let strHTML = "";
  if (dataArr.length > 0) {
    dataArr.forEach(function (item) {
      strHTML +=
        '<div class="w-full md:w-3/12 sm:w-6/12 text-center px-[15px]">';
      strHTML +=
        '<div class="mb-[30px] shadow-[5px_5px_20px_0_rgba(40,48,112,0.2)] rounded-lg py-[30px] px-[20px] text-center transition-[0.2s] duration-[all] ease-[ease-in-out] hover:scale-105 cursor-pointer">';
      strHTML +=
        '<div><img class="inline-block" src="' +
        item.Image +
        '" alt="' +
        item.Image_alt +
        '"></div>';

      if (item.Headline)
        strHTML +=
          '<div class="text-[#72a84b] mt-[15px]">' + item.Headline + "</div>";
      strHTML += "</div>";
      strHTML += "</div>";
    });
  }
  return strHTML;
};

export const numberdescriptionblock = (dataArr, selectedObj) => {
  let h_className = "text-box-h4 mt-4";
  let h_fontColor = "#000";

  if (selectedObj.selected_Values) {
    Object.entries(selectedObj.selected_Values).map(([key, value]) => {
      const isAvailHead = key.toLowerCase().includes("headline_");
      if (isAvailHead) {
        if (value.type === "fontcolor") {
          h_fontColor = value.value;
        } else if (value.type !== "text") {
          h_className += ` ${value.value}`;
        }
      }
    });
  }

  let strHTML = "";
  if (dataArr.length > 0) {
    let cnt = 1;
    dataArr.forEach(function (item) {
      strHTML += '<div class="w-full lg:w-1/3 px-4 mb-8">';
      strHTML +=
        '<div style="background: ' +
        item.BlockBg +
        '"><div class="g-gray-50 text-center p-6 rounded' +
        (item.ImageNumber === "Number" ? " relative" : "") +
        " " +
        (item.HOverColor ? item.HOverColor : "") +
        " " +
        (item.BlockBg ? "bg" + item.BlockBg + "" : "") +
        '">';
      if (item.ImageNumber === "Number") {
        strHTML +=
          '<div class="inset-x-0 flex justify-center items-center w-12 h-12 mx-auto rounded-full bg-gray-500 text-gray-50 font-bold font-heading -top-6 absolute">';
        strHTML += cnt;
        strHTML += "</div>";
      } else if (item.ImageNumber === "Image") {
        strHTML +=
          '<div class="inset-x-0 -mt-6 flex justify-center items-center w-12 h-12 mx-auto rounded-full text-gray-50 font-bold font-heading">';
        strHTML += '<img src="' + item.ImageNumber_image + '" />';
        strHTML += "</div>";
      } else {
        let iconFontColor;

        let className = "";
        if (item.ImageNumber_icon_color) {
          iconFontColor = item.ImageNumber_icon_color;
        }
        if (item.ImageNumber_icon_font_size) {
          className += item.ImageNumber_icon_font_size;
        }
        if (item.ImageNumber_icon_font_weight) {
          className += item.ImageNumber_icon_font_weight;
        }
        if (item.ImageNumber_icon_alignment) {
          className += item.ImageNumber_icon_alignment;
        }
        if (item.ImageNumber_icon_type === "googlematerial") {
          className += " material-icons-outlined";
        } else if (item.ImageNumber_icon_type === "fontawesome") {
          className += "";
        } else if (item.ImageNumber_icon_type === "googlesymbol") {
          className += " material-symbols-outlined";
        }

        strHTML += '<div class="">';
        strHTML +=
          '<span class="' +
          className +
          '" style="color: ' +
          iconFontColor +
          '">' +
          item.ImageNumber_icon_symbol +
          "</span>";
        strHTML += "</div>";
      }

      cnt++;

      strHTML +=
        '<div style="color: ' +
        h_fontColor +
        '" class="' +
        h_className +
        '">' +
        item.Headline +
        "</div>";
      strHTML += '<div class="text-box-h4 mt-4">';
      strHTML += item.Description;
      strHTML += "</div>";
      strHTML += "</div>";
      strHTML += "</div>";
      strHTML += "</div>";
      strHTML += "</div>";
    });
  }

  return strHTML;
};

export const boximage = (dataArr, selectedObj) => {
  let strHTML = "";
  if (dataArr.length > 0) {
    let count = 1;

    dataArr.forEach(function (item) {
      let className;
      if (item.colcount == 2) className = "lg:w-1/2";
      else if (item.colcount == 3) className = "lg:w-1/3";
      else className = "lg:w-1/4";

      strHTML += '<div class="' + className + ' px-[15px] mt-[30px]">';
      if (window.location.href.indexOf("/preview/") < 0) {
        strHTML += '<div class="flex justify-center pb-5">';
        strHTML +=
          '<div class="btn-primary rounded-full w-10 h-10 flex justify-center items-center text-base text-white font-semibold">' +
          count +
          "</div>";
        strHTML += "</div>";
      }
      count = count + 1;

      strHTML += '<div class="">';

      let clName = "flex justify-center";
      let aprData = {};
      let textPos = "bottom";
      let headLine = "";
      let textBg = "text-center bg-white w-full";

      let fontSize = "text-base";
      let bgOpacity = 1;
      let bgColor = "";
      let textHPos = "";
      let textVPos = "";
      let sectionWidth = "";
      let onBottom = false;
      let fullWidth = false;
      let fullWidthClass = "";

      var buttonHTML = "";
      if (
        item.Button_display != undefined &&
        item.Button_display == "Yes" &&
        item.Button_text != "" &&
        item.Button_text != null
      ) {
        if (item.Button_btn_width) {
          fullWidth = true;
          fullWidthClass = item.Button_btn_width;
        }
        let btnClass = item.Button_class;

        buttonHTML += '<div class="mt-5 mb-5 ' + item?.Button_alignment + '">';
        buttonHTML +=
          '<a style="letter-spacing: ' + (item?.Button_letter_spacing
            ? item.Button_letter_spacing
            : 'normal') + '" href="' + item?.Button_link + '" title="' + item?.Button_alt + '" class="py-3 px-4' +
          btnClass?.replace(item?.Button_alignment, 'text-center');
        if (item?.Button_link_follow == true)
          buttonHTML += ' rel="nofollow"';
        buttonHTML += '">';
        buttonHTML += item.Button_text;
        buttonHTML += '</a>';
        buttonHTML += '</div>';
      }
      if (selectedObj.selected_Values.TextAppearance != undefined) {
        aprData = selectedObj.selected_Values.TextAppearance.value;
        textPos = aprData.text_pos ?? "";
        fontSize = aprData.font_size ?? "";
        bgOpacity = aprData.bg_opacity ?? "";
        bgColor = aprData.text_bg_color ?? "";
        textHPos = aprData.text_hpos ?? "";
        textVPos = aprData.text_vpos ?? "";
        sectionWidth = aprData.section_width ?? "";
      }

      if (selectedObj.selected_Values.TextAppearance_on_bottom != undefined) {
        if (selectedObj.selected_Values.TextAppearance_on_bottom.value)
          textPos = "bottom";
      }

      if (selectedObj.selected_Values.TextAppearance_on_top != undefined) {
        if (selectedObj.selected_Values.TextAppearance_on_top.value)
          textPos = "top";
      }      //console.log("Text", selectedObj.selected_Values.TextAppearance);
      if (selectedObj.selected_Values.TextAppearance_on_bottom) {
        onBottom = selectedObj.selected_Values.TextAppearance_on_bottom.value;
      }


      let themeClass = "";
      let fontColor = "black";
      if (selectedObj.selected_Values.Headline_final_class != undefined) {
        themeClass = selectedObj.selected_Values.Headline_final_class.value;
      }
      if (selectedObj.selected_Values.Headline_font_color != undefined) {
        fontColor = selectedObj.selected_Values.Headline_font_color.value;
      }
      if (
        item.Headline !== undefined &&
        item.Headline !== "" &&
        item.Headline !== null
      ) {
        //    //flex justify-start items-end w-full absolute undefined inset-0 p-1 lg:p-4 text-white

        let abClass = "";
        if (textPos == 'top') {
          clName = "flex relative w-full text-white";
          abClass = "flex absolute ";
          // if (textPos == "top") {
          //   abClass = " relative";
          // }
        } else {
          clName = "w-full text-white";
          abClass = "flex relative ";
        }

        if (textPos == 'top') {
          headLine +=
            '<div class="' +
            abClass +
            " inset-0 text-white p-1 lg:p-4  " +
            (textHPos == 'justify-center' ? (textHPos + ' mx-auto ') : textHPos) +
            " " +
            textVPos +
            '">';
          headLine +=
            '<div class="' +
            (fullWidth ? "w-full" : "") +
            ' py-8 ' +
            sectionWidth +
            '" style="background: rgba(' +
            bgColor +
            "," +
            bgOpacity +
            ');">';
        }
        else {
          headLine +=
            '<div class="inset-0 text-white ' +
            textHPos +
            '">';
          headLine +=
            '<div class="w-full">';
        }


        headLine +=
          '<div class="' +
          themeClass +
          '" style="color:' +
          fontColor +
          '">' +
          item.Headline +
          "</div>";
        headLine += "<div>";
        if (textPos == "top") {
          headLine += buttonHTML;
        }
        headLine += "</div>";
        headLine += "</div>";
        headLine += "</div>";

      } else {
        let abClass = "";
        if (textPos == 'top') {
          clName = "flex relative w-full text-white";
          abClass = "flex absolute ";
          // abClass = " relative";
        } else {
          clName = "w-full text-white";
          abClass = "flex relative ";
        }

        if (textPos == 'top') {
          headLine +=
            '<div class="' +
            abClass +
            " inset-0 p-1 lg:p-4 text-white " +
            (textHPos == 'justify-center' ? (textHPos + ' mx-auto ') : textHPos) +
            " " +
            textVPos +
            '">';
          if (bgColor) {
            headLine +=
              '<div class="w-full py-8 ' + sectionWidth + '" style="background: rgba(' +
              bgColor +
              "," +
              bgOpacity +
              ');">';

          }
          else {
            headLine +=
              '<div class="py-8 ' + sectionWidth + '">';

          }

        }
        else {
          headLine +=
            '<div class="inset-0 text-white ' +
            textHPos +
            '">';
          headLine += '<div class="w-full">';
        }
        headLine += "<div>";
        if (textPos == "top") {
          headLine += buttonHTML;
        }
        headLine += "</div>";
        headLine += "</div>";
        headLine += "</div>";
      }

      if (textPos == "top") {
        //strHTML += headLine;
      }

      if (item.Image !== undefined) {
        strHTML += '<div class="' + clName + '">';
        strHTML +=
          '<button type="button" title="' +
          item?.Image_alt +
          '" class="w-full min-h-[400px] max-h-[400px] flex flex-col justify-center items-center">';
        strHTML +=
          '<img class="min-h-[400px] max-h-[400px]" alt="' +
          item?.Image_alt +
          '" title="' +
          item?.Image_alt +
          '" src="' +
          item.Image +
          '"/>';
        strHTML += "</button>";
        if (textPos == "top") {
          strHTML += headLine;// + buttonHTML;
        }
        strHTML += "</div>";
      }

      if (textPos == "bottom") {
      }
      if (textPos != "top") {
        strHTML += headLine + buttonHTML;
      }
      strHTML += "</div>";
      strHTML += "</div>";
    });
  }

  return strHTML;
};

export const numberingdiv = (dataArr, selectedObj) => {
  let h_className = "text-box-h4 mt-4";
  let h_fontColor = "#000";

  if (selectedObj.selected_Values) {
    Object.entries(selectedObj.selected_Values).map(([key, value]) => {
      const isAvailHead = key.toLowerCase().includes("headline_");
      if (isAvailHead) {
        if (value.type === "fontcolor") {
          h_fontColor = value.value;
        } else if (value.type !== "text") {
          h_className += ` ${value.value}`;
        }
      }
    });
  }
  let strHTML = "";
  if (dataArr.length > 0) {
    dataArr.forEach(function (item, index) {
      strHTML += '<div class="flex items-start mb-6">';
      strHTML +=
        '<div class="mr-10 flex-shrink-0 flex justify-center items-center w-12 h-12 rounded-full bg-gray-500 text-gray-50 font-bold font-heading">' +
        (index + 1) +
        "</div>";
      strHTML += '<div class="max-w-xs w-full">';
      strHTML +=
        '<div class="text-box-p ' +
        h_className +
        '" style="color:' +
        h_fontColor +
        '">';
      strHTML += item.Description;
      strHTML += "</div>";
      strHTML += "</div>";
      strHTML += "</div>";
    });
  }
  return strHTML;
};

export const multipleBrands = (dataArr) => {
  let strHTML = "";

  if (dataArr.length > 0) {
    dataArr.forEach(function (item) {
      if (item.Image !== undefined) {
        strHTML += '<div class="w-full lg:w-1/4 px-3 mt-3 mb-3">';
        strHTML +=
          '<div class="border bg-[] hover:bg-[] relative" style="background-color:' +
          (item.BgColor ? item.BgColor : "#003a70") +
          ' ">';
        strHTML += '<div class="flex justify-center items-center">';
        // strHTML += '<a href="' + item.Image_link + '">';
        strHTML += '<button type="button">';
        strHTML +=
          '<img class="w-full mx-auto" alt="' +
          item?.Image_alt +
          '" title="' +
          item?.Image_alt +
          '" src="' +
          item.Image +
          '"/>';
        strHTML += "</button>";
        strHTML += "</div>";
        strHTML += "</div>";
        strHTML += "</div>";
      }
    });
  }
  return strHTML;
};

export const multipleImages = (dataArr, selectedObj) => {
  let strHTML = "";
  if (dataArr.length > 0) {
    let cnt = 1;
    dataArr.forEach(function (item) {
      let textPos = "";
      let fontSize = "";
      let bgOpacity = "";
      let bgColor = "";
      let headLine = "";
      let clName = "";
      let aprData = {};
      let buttonHTML = "";

      let textHPos = "";
      let textVPos = "";
      let sectionWidth = "";
      if (
        item.Button_display != undefined &&
        item.Button_display == "Yes" &&
        item.Button_text !== "" &&
        item.Button_text !== null
      ) {
        let btnClass = item.Button_class;
        buttonHTML += '<div class="mt-5 mb-5 ' + item.Button_alignment + '">';
        buttonHTML +=
          '<a style="text-align: center !important; letter-spacing: ' +
          (item?.Button_letter_spacing
            ? item.Button_letter_spacing
            : 'normal') +
          '" target="' +
          (item?.Button_link_window ? '_blank' : 'self') +
          '" rel="' +
          (item?.Button_link_follow ? 'nofollow' : '') +
          '" href="' +
          item.Button_link;
        if (item.Button_alt) {
          buttonHTML += '" title="' + item.Button_alt;
        }

        buttonHTML += '" class="pl-[17px] sm:pl-[19px] lg:pl-[20px] pr-[17px] sm:pr-[19px] lg:pr-[20px] pt-[10px] sm:pt-[10px] lg:pt-[10px] pb-[10px] sm:pb-[10px] lg:pb-[10px] ' + btnClass + '">';
        buttonHTML += item.Button_text;
        buttonHTML += '</a>';
        buttonHTML += '</div>';
      }

      if (selectedObj.selected_Values.TextAppearance != undefined) {
        aprData = selectedObj.selected_Values.TextAppearance.value;
        textPos = aprData.text_pos ?? "center";
        fontSize = aprData.font_size ?? "";
        bgOpacity = aprData.bg_opacity ?? "";
        bgColor = aprData.text_bg_color ?? "";
        textHPos = aprData.text_hpos ?? "";
        textVPos = aprData.text_vpos ?? "";
        sectionWidth = aprData.section_width ?? "max-w-3xl";

        if (sectionWidth === "") sectionWidth = "max-w-3xl";
      }

      let themeClass = "";
      let fontColor = "";
      let isBottom = false;
      if (!textPos) textPos = "center";
      if (selectedObj.selected_Values.Headline_final_class != undefined) {
        themeClass = selectedObj.selected_Values.Headline_final_class.value;
      }
      if (selectedObj.selected_Values.Headline_font_color != undefined) {
        fontColor = selectedObj.selected_Values.Headline_font_color.value;
      }

      if (selectedObj.selected_Values.TextAppearance_on_bottom) {
        isBottom = selectedObj.selected_Values.TextAppearance_on_bottom.value;
      }

      if (
        item.Headline != undefined &&
        item.Headline != "" &&
        item.Headline != null
      ) {
        // if(textPos != "top" && textPos != "bottom" && textPos != "")
        // {
        clName = "relative w-full text-white";
        if (!isBottom) {
          clName += " flex";
        }
        headLine +=
          '<div class="flex ' +
          (isBottom ? "relative" : "absolute") +
          " inset-0 p-1 lg:p-4 text-white " +
          textHPos +
          " " +
          textVPos +
          '">';
        headLine +=
          '<div class="z-20 w-full ' + sectionWidth + '" style="background: rgba(' +
          bgColor +
          "," +
          bgOpacity +
          '); padding: 20px;">';
        headLine +=
          '<div class="pb-2 ' +
          themeClass +
          '" style="color:' +
          fontColor +
          '">' +
          item.Headline +
          "</div>";
        headLine += "<div>";
        headLine += buttonHTML;
        headLine += "</div>";
        headLine += "</div>";
        headLine += "</div>";
      } else {
        clName = "relative w-full text-white";
        if (!isBottom) {
          clName += " flex";
        }
        headLine +=
          '<div class="flex ' +
          (isBottom ? "relative" : "absolute") +
          " inset-0 p-1 lg:p-4 text-white " +
          textHPos +
          " " +
          textVPos +
          '">';
        headLine +=
          '<div class="z-20 w-full ' + sectionWidth + '" style="background: rgba(' +
          bgColor +
          "," +
          bgOpacity +
          '); padding: 20px;">';
        headLine += "<div>";
        headLine += buttonHTML;
        headLine += "</div>";
        headLine += "</div>";
        headLine += "</div>";
      }

      strHTML += '<div class="w-full lg:w-1/4 px-3">';
      if (window.location.href.indexOf("/preview/") < 0) {
        strHTML += '<div class="flex justify-center pb-5">';
        strHTML +=
          '<div class="btn-primary rounded-full w-10 h-10 flex justify-center items-center text-base text-white font-semibold">' +
          cnt +
          "</div>";
        strHTML += "</div>";
      }
      cnt = cnt + 1;
      strHTML += '<div class="relative border border-gray-50 px-2 py-2">';
      if (textPos === "top") {
        strHTML += headLine;
      }

      if (item.Image !== undefined) {
        strHTML += '<div class="' + clName + '">';
        strHTML += '<div class="flex justify-center">';
        strHTML += "<p>";
        strHTML +=
          '<img class="w-full" alt="' +
          item?.Image_alt +
          '" title="' +
          item?.Image_alt +
          '" src="' +
          item.Image +
          '"/>';
        strHTML += "</p>";
        strHTML += "</div>";
        if (textPos === "center") {
          strHTML += headLine;
        }
        strHTML += "</div>";
      }

      if (textPos === "bottom" || textPos === "") {
        strHTML += headLine;
      }

      // if (textPos === "top" || textPos === "bottom") {
      //   strHTML += buttonHTML;
      // }

      strHTML += "</div>";
      strHTML += "</div>";
    });
  }

  return strHTML;
};