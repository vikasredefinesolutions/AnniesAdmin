import ElementAccordionDisplay from "../template/create/elements/ElementAccordionDisplay";
import * as ReactDOMServer from 'react-dom/server';
import * as dynamicFunctions from './DynamicFunctions';
import FeaturedImage from "assets/images/product-image-1.jpg";
import ReactDOM from 'react-dom';

export const getSymbol = (symbol, status) => {
  let returnSymbol = '';
  if (symbol === "caret") {
    if (status === "Yes")
      returnSymbol = 'keyboard_arrow_down';
    else
      returnSymbol = 'keyboard_arrow_up';
  }
  else if (symbol === "addcircle") {
    if (status === "Yes")
      returnSymbol = 'remove_circle';
    else
      returnSymbol = 'add_circle';

  }
  else if (symbol === "add") {
    if (status === "Yes")
      returnSymbol = 'remove';
    else
      returnSymbol = 'add';

  }
  else {
    if (status === "Yes")
      returnSymbol = 'remove_circle_outline';
    else
      returnSymbol = 'add_circle_outline';
  }
  return returnSymbol;
}

export const imageTextLayoutUpdate = (currentComponent, selected_Values, properties) => {

  let imagePosition = 'Left';
  let imageDisplay = 'Yes';
  let textDisplay = 'Yes';
  let layoutWidth = 50;
  Object.entries(selected_Values).map(([key, value]) => {

    if (key == "ElementConfiguration_Image_position") {
      imagePosition = value.value;
    }
    if (key == "ElementConfiguration_Image_display") {
      imageDisplay = value.value;
    }
    if (key == "ElementConfiguration_Text_display") {
      textDisplay = value.value;
    }
    if (key == "Layout") {
      layoutWidth = value.value;
    }

  });
  if (!layoutWidth)
    layoutWidth = 50;
  let x = ReactDOM.findDOMNode(currentComponent);
  let imageClass = '';
  let textClass = '';
  if (imageDisplay === 'No') {
    imageClass += 'hidden';
    textClass += 'w-[100%]';
    properties.fields.Image.forEach((tmp1) => {
      document.querySelectorAll('#LeftPanel' + tmp1)[0].classList.add("hidden");
    });
  }
  else {
    properties.fields.Image.forEach((tmp1) => {
      document.querySelectorAll('#LeftPanel' + tmp1)[0].classList.remove("hidden");
    });
  }
  if (textDisplay === 'No') {
    imageClass += ' w-[100%]';
    textClass += ' hidden';
    properties.fields.Text.forEach((tmp1) => {
      document.querySelectorAll('#LeftPanel' + tmp1)[0].classList.add("hidden");
    });
  }
  else {
    properties.fields.Text.forEach((tmp1) => {
      document.querySelectorAll('#LeftPanel' + tmp1)[0].classList.remove("hidden");
    });
  }

  if (imagePosition === 'Top' && imageDisplay === 'Yes') {
    textClass += 'w-[100%] lg:order-2';
    imageClass += ' w-[100%] lg:order-1';
  }
  if (imagePosition === 'Bottom' && imageDisplay === 'Yes') {
    textClass += 'w-[100%] lg:order-1';
    imageClass += ' w-[100%] lg:order-2';
  }
  if (imagePosition === 'Left' && imageDisplay === 'Yes' && layoutWidth !== '') {
    imageClass += 'w-[' + layoutWidth + '%] lg:order-1';
    textClass += ' w-[' + (100 - layoutWidth) + '%] lg:order-2';
  }
  if (imagePosition === 'Left' && imageDisplay === 'Yes' && layoutWidth !== '') {
    imageClass += 'w-[' + layoutWidth + '%] lg:order-2';
    textClass += ' w-[' + (100 - layoutWidth) + '%] lg:order-1';
  }

  x.querySelectorAll('#left-section')[0].className = imageClass;
  x.querySelectorAll('#left-section')[0].className = textClass;


}


export const assignMultipleClass = (classArr, obj) => {
  let tmpVal = classArr.split(' ');

  tmpVal.forEach(el => {
    if (el)
      obj.classList.add(el);
  });
}

export const generateRange = (start, len) => {
  let arr = [];
  for (var i = 0; i < len; i++, start++) {
    arr.push(start);
  }

  return arr;
}


export const randomNumber = (curArr) => {
  let rnd = Math.random();
  if (curArr.includes(rnd)) {
    rnd = randomNumber(curArr);
  }
  else
    return rnd;
};

export const updateSetProperties = (element, AzureBlobUrl) => {
  let x = document.getElementById('div' + element.no);

  if (x && element?.selected_Values) {
    let elProperties;
    let buttonId = '';
    let className = '';
    let pmClassName = '';
    let count = 0;
    let Button_className = 'text-center ';
    let Button1_className = 'text-center ';
    let Button2_className = 'text-center ';


    let Button_parent = '';
    let Button1_parent = '';
    let Button2_parent = '';
    let btnStyle = '';
    let btn1Style = '';
    let btn2Style = '';

    let btnPadding = false;
    let btn1Padding = false;
    let btn2Padding = false;



    if (element.properties.leftBoxBg) {
      let cArr = ['leftBoxBg', 'centerBoxBg', 'rightBoxBg'];
      cArr.map(cvalue => {
        let bgValue = '';
        let imageOrColor = '';
        let hBgValue = '';
        let hImageOrColor = '';
        let bLink = '';

        Object.entries(element.selected_Values).map(([key, value]) => {


          if (key == cvalue) {
            bgValue = value.value;
          }
          if (key == cvalue + "_bg_type") {
            imageOrColor = value.value;

          }
          if (key == cvalue + "_hover_option") {
            hBgValue = value.value;
          }
          if (key == cvalue + "_bg_type_hover") {
            hImageOrColor = value.value;
          }
          // if (key == cvalue+"_text_color")
          // {
          //     tmpTextColor =  value;
          // }
          // if (key == cvalue +"_text_color_hover")
          // {
          //     tmpHoverTextColor =  value;
          // }
          if (key == cvalue + "_link") {
            bLink = value.value;
          }

        });
        if (imageOrColor) {
          if (x && x.querySelectorAll('#' + cvalue).length > 0) {
            if (imageOrColor === 'Color') {
              x.querySelectorAll('#' + cvalue)[0].style = "background: " + bgValue;

            }
            else {
              x.querySelectorAll('#' + cvalue)[0].style = "background-image: url('" + bgValue + "')";
            }

          }

        }

        if (hImageOrColor) {
          if (x && x.querySelectorAll('#' + cvalue + "Hover").length > 0) {
            if (hImageOrColor === 'Color') {
              x.querySelectorAll('#' + cvalue + "Hover")[0].style = "background: " + hBgValue;

            }
            else
              x.querySelectorAll('#' + cvalue + "Hover")[0].style = "background-image: url('" + hBgValue + "')";
          }
        }

        // if(bLink)
        // {
        //   x.querySelectorAll('#'+cvalue+"Link")[0].href = bLink;
        // }

      });



    }




    Object.entries(element.selected_Values).map(([key, value]) => {
      if (value.type == 'btn_size') {
        buttonId = key.replace('_size', '');

        if (buttonId === 'Button')
          Button_className += ' ' + value.value;
        else if (buttonId === 'Button1')
          Button1_className += ' ' + value.value;
        else if (buttonId === 'Button2')
          Button2_className += ' ' + value.value;
      }

      if (value.type == 'btn_width') {
        buttonId = key.replace('_width', '');

        if (buttonId === 'Button')
          Button_className += ' ' + value.value;
        else if (buttonId === 'Button1')
          Button1_className += ' ' + value.value;
        else if (buttonId === 'Button2')
          Button2_className += ' ' + value.value;
      }

      if (value.type == 'btn_alt') {

        buttonId = key.replace('_alt', '');
        if (x.querySelectorAll('#' + buttonId).length > 0) {
          const el = x.querySelectorAll('#' + buttonId)[0];
          //el.href = value.value;
          el.title = value.value;;
        }
      }


      if (value.type == 'btn_alignment') {
        buttonId = key.replace('_alignment', '');
        if (buttonId === 'Button')
          Button_parent += ' ' + value.value;
        else if (buttonId === 'Button1')
          Button1_parent += ' ' + value.value;
        else if (buttonId === 'Button2')
          Button2_parent += ' ' + value.value;

      }


      if (value.type == 'btn_transform') {
        buttonId = key.replace('_text_transform', '');
        if (buttonId === 'Button')
          Button_className += ' ' + value.value;
        else if (buttonId === 'Button1')
          Button1_className += ' ' + value.value;
        else if (buttonId === 'Button2')
          Button2_className += ' ' + value.value;
      }

      if (value.type == 'btn_link') {
        buttonId = key.replace('_link', '');
        if (x.querySelectorAll('#' + buttonId).length > 0) {
          x.querySelectorAll('#' + buttonId)[0].href = value.value;
        }
      }

      if (value.type == 'btn_style') {
        buttonId = key.replace('_style', '');

        if (buttonId === 'Button') {
          Button_className += ' ' + value.value;
          btnStyle = value.value;
        }
        else if (buttonId === 'Button1') {
          Button1_className += ' ' + value.value;
          btn1Style = value.value;
        }
        else if (buttonId === 'Button2') {
          Button2_className += ' ' + value.value;
          btn2Style = value.value;
        }
      }

      if (value.type == 'btn_link_target') {
        buttonId = key.replace('_window', '');
        if (x.querySelectorAll('#' + buttonId).length > 0) {
          x.querySelectorAll('#' + buttonId)[0].target = value.value;
        }
      }


      if (value.type == 'btn_display') {
        if (value.value == 'No') {
          buttonId = key.replace('_display', '');
          if (x.querySelectorAll('#' + buttonId).length > 0) {
            x.querySelectorAll('#' + buttonId)[0].remove();
          }

        }
      }

      /* Padding & Margin Code for Button Text */
      if (value.type == 'btn_left_padding') {

        buttonId = key.replace('_left_padding', '');
        if (buttonId === 'Button') {
          btnPadding = true;
          Button_className += ' ' + value.value;
        }
        else if (buttonId === 'Button1') {
          Button1_className += ' ' + value.value;
          btn1Padding = true;
        }
        else if (buttonId === 'Button2') {
          btn2Padding = true;
          Button2_className += ' ' + value.value;
        }
      }


      if (value.type == 'btn_top_padding') {
        buttonId = key.replace('_top_padding', '');
        if (buttonId === 'Button') {
          btnPadding = true;
          Button_className += ' ' + value.value;
        }
        else if (buttonId === 'Button1') {
          Button1_className += ' ' + value.value;
          btn1Padding = true;
        }
        else if (buttonId === 'Button2') {
          Button2_className += ' ' + value.value;
          btn2Padding = true;
        }
      }
      if (value.type == 'btn_right_padding') {
        buttonId = key.replace('_right_padding', '');
        if (buttonId === 'Button') {
          btnPadding = true;
          Button_className += ' ' + value.value;
        }
        else if (buttonId === 'Button1') {
          Button1_className += ' ' + value.value;
          btn1Padding = true;
        }
        else if (buttonId === 'Button2') {
          Button2_className += ' ' + value.value;
          btn2Padding = true;
        }
      }
      if (value.type == 'btn_bottom_padding') {
        buttonId = key.replace('_bottom_padding', '');
        if (buttonId === 'Button') {
          Button_className += ' ' + value.value;
          btnPadding = true;
        }
        else if (buttonId === 'Button1') {
          Button1_className += ' ' + value.value;
          btn1Padding = true;
        }
        else if (buttonId === 'Button2') {
          Button2_className += ' ' + value.value;
          btn2Padding = true;
        }
      }
      if (value.type == 'btn_left_margin') {
        buttonId = key.replace('_left_margin', '');
        if (buttonId === 'Button')
          Button_className += ' ' + value.value;
        else if (buttonId === 'Button1')
          Button1_className += ' ' + value.value;
        else if (buttonId === 'Button2')
          Button2_className += ' ' + value.value;
      }
      if (value.type == 'btn_top_margin') {
        buttonId = key.replace('_top_margin', '');
        if (buttonId === 'Button')
          Button_className += ' ' + value.value;
        else if (buttonId === 'Button1')
          Button1_className += ' ' + value.value;
        else if (buttonId === 'Button2')
          Button2_className += ' ' + value.value;
      }
      if (value.type == 'btn_right_margin') {
        buttonId = key.replace('_right_margin', '');
        if (buttonId === 'Button')
          Button_className += ' ' + value.value;
        else if (buttonId === 'Button1')
          Button1_className += ' ' + value.value;
        else if (buttonId === 'Button2')
          Button2_className += ' ' + value.value;

      }
      if (value.type == 'btn_bottom_margin') {
        buttonId = key.replace('_bottom_margin', '');
        if (buttonId === 'Button')
          Button_className += ' ' + value.value;
        else if (buttonId === 'Button1')
          Button1_className += ' ' + value.value;
        else if (buttonId === 'Button2')
          Button2_className += ' ' + value.value;

      }


      if (value.type == 'btn_font_family') {
        buttonId = key.replace('_font_family', '');
        if (buttonId === 'Button')
          Button_className += ' ' + value.value;
        else if (buttonId === 'Button1')
          Button1_className += ' ' + value.value;
        else if (buttonId === 'Button2')
          Button2_className += ' ' + value.value;
      }

      if (value.type == 'btn_font_size') {
        buttonId = key.replace('_font_size', '');
        if (buttonId === 'Button')
          Button_className += ' ' + value.value;
        else if (buttonId === 'Button1')
          Button1_className += ' ' + value.value;
        else if (buttonId === 'Button2')
          Button2_className += ' ' + value.value;


      }

      if (value.type == 'btn_font_weight') {
        buttonId = key.replace('_font_weight', '');
        if (buttonId === 'Button')
          Button_className += ' ' + value.value;
        else if (buttonId === 'Button1')
          Button1_className += ' ' + value.value;
        else if (buttonId === 'Button2')
          Button2_className += ' ' + value.value;
      }

      if (value.type == 'btn_line_height') {
        buttonId = key.replace('_line_height', '');
        if (buttonId === 'Button')
          Button_className += ' ' + value.value;
        else if (buttonId === 'Button1')
          Button1_className += ' ' + value.value;
        else if (buttonId === 'Button2')
          Button2_className += ' ' + value.value;
      }

    });

    if (x.querySelectorAll('#Button').length > 0) {
      if (btnStyle === '')
        Button_className += ' inline-block custbtn-primary';
      if (!btnPadding) {
        Button_className += ' pl-[17px] sm:pl-[19px] lg:pl-[20px] pr-[17px] sm:pr-[19px] lg:pr-[20px] pt-[10px] sm:pt-[10px] lg:pb-[10px] pt-[10px] sm:pb-[10px] lg:pb-[10px]';
      }
      x.querySelectorAll('#Button')[0].className = Button_className;
      if (x.querySelectorAll('#ButtonParent').length > 0) {
        x.querySelectorAll('#ButtonParent')[0].className = Button_parent;
      }
    }

    if (x.querySelectorAll('#Button1').length > 0) {
      if (btn1Style === '')
        Button1_className += ' inline-block custbtn-primary';

      if (!btn1Padding) {
        Button1_className += ' pl-[17px] sm:pl-[19px] lg:pl-[20px] pr-[17px] sm:pr-[19px] lg:pr-[20px] pt-[10px] sm:pt-[10px] lg:pb-[10px] pt-[10px] sm:pb-[10px] lg:pb-[10px]';
      }

      x.querySelectorAll('#Button1')[0].className = Button1_className;
      if (x.querySelectorAll('#Button1Parent').length > 0) {
        x.querySelectorAll('#Button1Parent')[0].className = Button1_parent;
      }
    }

    if (x.querySelectorAll('#Button2').length > 0) {
      if (btn2Style === '')
        Button2_className += ' inline-block custbtn-primary';
      if (!btn2Padding) {
        Button2_className += ' pl-[17px] sm:pl-[19px] lg:pl-[20px] pr-[17px] sm:pr-[19px] lg:pr-[20px] pt-[10px] sm:pt-[10px] lg:pb-[10px] pt-[10px] sm:pb-[10px] lg:pb-[10px]';
      }
      x.querySelectorAll('#Button2')[0].className = Button2_className;
      if (x.querySelectorAll('#Button2Parent').length > 0) {
        x.querySelectorAll('#Button2Parent')[0].className = Button2_parent;
      }
    }


    Object.entries(element.selected_Values).map(([key, value]) => {

      if (value.type == "text") {

        if (x.querySelectorAll("#" + key).length > 0) {
          let tag = "";
          if (Object.keys(element.selected_Values).includes(key + '_header_tag')) {
            Object.entries(element.selected_Values).map(([keyq, valueq]) => {
              if (keyq === key + '_header_tag' && valueq.value !== '') {
                tag += valueq.value;
              }
            });
          }
          if (tag) {
            x.querySelectorAll("#" + key)[0].innerHTML = '<' + tag + '>' + value.value + '</' + tag + '>';
          }
          else {
            x.querySelectorAll("#" + key)[0].innerHTML = '';
          }
        }


      }

      /* Font Section CSS update */

      if (value.type === 'colcount') {
        if (value.value == '3') {

          if (x && x.querySelectorAll('#centerContent').length > 0) {
            x.querySelectorAll('#centerContent')[0].classList.remove('hidden');
            x.querySelectorAll('#leftContent')[0].classList.add('lg:w-1/3');
            x.querySelectorAll('#rightContent')[0].classList.add('lg:w-1/3');

            x.querySelectorAll('#leftContent')[0].classList.remove('lg:w-1/2');
            x.querySelectorAll('#rightContent')[0].classList.remove('lg:w-1/2');

          }
          if (x && x.querySelectorAll('#centerContentNew').length > 0) {
            x.querySelectorAll('#centerContentNew')[0].classList.remove('hidden');
            x.querySelectorAll('#leftContent')[0].classList.add('lg:w-1/3');
            x.querySelectorAll('#rightContent')[0].classList.add('lg:w-1/3');

            x.querySelectorAll('#leftContent')[0].classList.remove('lg:w-1/2');
            x.querySelectorAll('#rightContent')[0].classList.remove('lg:w-1/2');

          }
          if (x && x.querySelectorAll('#centerBox').length > 0) {
            x.querySelectorAll('#centerBox')[0].classList.remove('hidden');
            x.querySelectorAll('#leftBox')[0].classList.add('lg:w-1/3');
            x.querySelectorAll('#rightBox')[0].classList.add('lg:w-1/3');

            x.querySelectorAll('#leftBox')[0].classList.remove('lg:w-1/2');
            x.querySelectorAll('#rightBox')[0].classList.remove('lg:w-1/2');

          }
        }
        else {
          if (x && x.querySelectorAll('#centerContent').length > 0) {
            x.querySelectorAll('#centerContent')[0].classList.add('hidden');
            x.querySelectorAll('#leftContent')[0].classList.add('lg:w-1/2');
            x.querySelectorAll('#rightContent')[0].classList.add('lg:w-1/2');

            x.querySelectorAll('#leftContent')[0].classList.remove('lg:w-1/3');
            x.querySelectorAll('#rightContent')[0].classList.remove('lg:w-1/3');
          }
          if (x && x.querySelectorAll('#centerContentNew').length > 0) {
            x.querySelectorAll('#centerContentNew')[0].classList.add('hidden');
            let largeImage = "Left";
            if (element.selected_Values.columnCount_large_image)
              largeImage = element.selected_Values.columnCount_large_image.value;
            x.querySelectorAll('#leftContent')[0].classList.remove('lg:w-1/3');
            x.querySelectorAll('#rightContent')[0].classList.remove('lg:w-1/3');

            if (largeImage === 'Left') {
              x.querySelectorAll('#leftContent')[0].classList.add('lg:w-2/3');
              x.querySelectorAll('#rightContent')[0].classList.add('lg:w-1/3');
            }
            else {
              x.querySelectorAll('#leftContent')[0].classList.add('lg:w-1/3');
              x.querySelectorAll('#rightContent')[0].classList.add('lg:w-2/3');
            }
          }
          if (x && x.querySelectorAll('#centerBox').length > 0) {
            x.querySelectorAll('#centerBox')[0].classList.add('hidden');
            x.querySelectorAll('#leftBox')[0].classList.add('lg:w-1/2');
            x.querySelectorAll('#rightBox')[0].classList.add('lg:w-1/2');

            x.querySelectorAll('#leftBox')[0].classList.remove('lg:w-1/3');
            x.querySelectorAll('#rightBox')[0].classList.remove('lg:w-1/3');
          }
        }
      }

      if (value.type === 'iconclass') {
        let propName = key;
        let className = '';
        let icon;
        let iconFontSize;
        let iconFontWeight;
        let iconTextAlignment;
        let iconFontColor;
        let iconLeftMargin;
        let iconRightMargin;
        let iconTopMargin;
        let iconBottomMargin;
        let iconLeftPadding;
        let iconRightPadding;
        let iconTopPadding;
        let iconBottomPadding;
        let iconType;
        let bgPropertyName = key;
        let imageOrIcon = 'Icon';

        if (Object.keys(element.selected_Values).includes(key)) {
          Object.entries(element.selected_Values).map(([keyq, valueq]) => {

            if (keyq == bgPropertyName) {
              icon = valueq.value;
            }
            if (keyq == bgPropertyName + "_type") {
              iconType = valueq.value;
            }
            if (keyq == bgPropertyName + "_image_or_icon") {
              imageOrIcon = valueq.value;
            }
            if (keyq == bgPropertyName + "_font_color") {
              iconFontColor = valueq.value;
            }
            if (keyq == bgPropertyName + "_font_size") {
              iconFontSize = valueq.value;
            }
            if (keyq == bgPropertyName + "_font_weight") {
              iconFontWeight = valueq.value;
            }
            if (keyq == bgPropertyName + "_text_alignment") {
              iconTextAlignment = valueq.value;
            }
            if (keyq == bgPropertyName + "_left_margin") {
              iconLeftMargin = valueq.value;
            }
            if (keyq == bgPropertyName + "_right_margin") {
              iconRightMargin = valueq.value;
            }
            if (keyq == bgPropertyName + "_top_margin") {
              iconTopMargin = valueq.value;
            }
            if (keyq == bgPropertyName + "_bottom_margin") {
              iconBottomMargin = valueq.value;
            }
            if (keyq == bgPropertyName + "_left_padding") {
              iconLeftPadding = valueq.value;
            }
            if (keyq == bgPropertyName + "_right_padding") {
              iconRightPadding = valueq.value;
            }
            if (keyq == bgPropertyName + "_top_padding") {
              iconTopPadding = valueq.value;
            }
            if (keyq == bgPropertyName + "_bottom_padding") {
              iconBottomMargin = valueq.value;
            }
          });

          let className = '';
          if (imageOrIcon === 'Icon') {
            if (iconType == 'fontawesome') {
              className += '';
            }
            else if (iconType == 'googlematerial') {
              className += 'material-icons-outlined';
            }
            else if (iconType == 'googlesymbol') {
              className += 'material-symbols-outlined';
            }
            if (iconFontSize) {
              className += ' ' + iconFontSize;
            }
            if (iconFontWeight) {
              className += ' ' + iconFontWeight;
            }
          }


          if (iconLeftPadding) {
            className += " " + iconLeftPadding;
          }
          if (iconRightPadding) {
            className += " " + iconRightPadding;
          }
          if (iconTopPadding) {
            className += " " + iconTopPadding;
          }
          if (iconBottomPadding) {
            className += " " + iconBottomPadding;
          }
          if (iconLeftMargin) {
            className += " " + iconLeftMargin;
          }
          if (iconRightMargin) {
            className += " " + iconRightMargin;
          }
          if (iconTopMargin) {
            className += " " + iconTopMargin;
          }
          if (iconBottomMargin) {
            className += " " + iconBottomMargin;
          }


          let iconStr = '';
          if (imageOrIcon === 'Icon') {
            iconStr = '<span class="' + className + '"';
            if (iconFontColor)
              iconStr += ' style="color: ' + iconFontColor + ';"';
            iconStr += '>' + icon + '</span>';
          }
          else {
            iconStr = '<span class="' + className + '"';
            iconStr += '><img src="' + icon + '" /></span>';
          }

          //let x = ReactDOM.findDOMNode(props.refArray.current[props.currentComponent]);
          if (x && x.querySelectorAll("#" + key).length > 0)
            x.querySelectorAll("#" + key)[0].innerHTML = iconStr;
          if (iconTextAlignment && x && x.querySelectorAll("#" + propName).length > 0) {
            iconTextAlignment += ' flex';
            if (iconTextAlignment.includes('center')) {
              iconTextAlignment += ' justify-center';
            } else if (iconTextAlignment.includes('right')) {
              iconTextAlignment += ' justify-end';
            }
            x.querySelectorAll("#" + propName)[0].className = iconTextAlignment;
          }
        }

      }

      if (!element.properties.leftBoxBg && value.type === 'individualbg') {
        if (x && x.querySelectorAll("#" + key).length > 0) {
          if (value.value.length > 9) {
            x.querySelectorAll("#" + key)[0].setAttribute('style', `background: url('${value.value}')`);
          } else {
            x.querySelectorAll("#" + key)[0].setAttribute('style', `background: ${value.value}`);
          }
        }
      }

      if (value.type === 'sectionbgcolor') {
        if (x && x.querySelectorAll("#" + key).length > 0) {
          x.querySelectorAll("#" + key)[0].style = 'background: ' + value.value;
        }
      }

      if (value.type === "finalclass") {
        let propName = key.replace("_final_class", "");
        if (propName !== 'Button' && propName !== 'Button1' && propName !== 'Button2') {

          if (value.value !== "" && x.querySelectorAll("#" + propName).length > 0) {
            x.querySelectorAll("#" + propName)[0].className = value.value;
          }

        }
      }


      if (value.type == "fontcolor") {
        let propName = key.replace("_font_color", "");
        if (x.querySelectorAll('#' + propName).length > 0)
          x.querySelectorAll("#" + propName)[0].style = 'color: ' + value.value;
      }


      if (value.type == "image") {
        if (x.querySelectorAll("#" + key).length > 0) {

          let classAlign = '';
          let imageSize = '';
          let effectClass = '';
          let alt = '';
          let link = '';
          let imageStyle = '';
          let imgClass = '';
          let imgWidth = '';

          let objName = {};
          if (Object.keys(element.selected_Values).includes(key + '_image_hv_position')) {
            Object.entries(element.selected_Values).map(([keyq, valueq]) => {
              if (keyq == key + '_image_hv_position') {
                if (x.querySelectorAll('#' + key + "HVPosition").length > 0)
                  x.querySelectorAll('#' + key + "HVPosition")[0].className = valueq.value;
              }
            });
          }
          Object.entries(element.properties).map(([keyq, valueq]) => {
            if (keyq == key) {
              objName = valueq;
            }
          });


          if (Object.keys(element.selected_Values).includes(key + '_link')) {
            Object.entries(element.selected_Values).map(([keyq, valueq]) => {
              if (keyq == key + '_link') {
                link += valueq.value;
              }
            });
          }

          if (Object.keys(element.selected_Values).includes(key + '_is_centered')) {
            Object.entries(element.selected_Values).map(([keyq, valueq]) => {
              if (keyq == key + '_is_centered') {
                if (x.querySelectorAll('#is_centered').length > 0) {
                  if (valueq.value) {
                    x.querySelectorAll('#is_centered')[0].classList.add('items-center');
                    x.querySelectorAll('#right-section')[0].classList.remove('items-center');
                  }
                  else {
                    x.querySelectorAll('#is_centered')[0].classList.remove('items-center');
                    x.querySelectorAll('#right-section')[0].classList.add('items-center');

                  }
                }
              }
            });
          }

          if (Object.keys(element.selected_Values).includes(key + '_image_size')) {
            Object.entries(element.selected_Values).map(([keyq, valueq]) => {
              if (keyq == key + '_image_size') {
                imgWidth = valueq.value;
              }
            });
          }

          if (
            Object.keys(element.selected_Values).includes(
              key + '_transition_duration',
            )
          ) {
            Object.entries(element.selected_Values).map(([keyq, valueq]) => {
              if (keyq == key + '_transition_duration') {
                effectClass += 'duration-' + valueq.value + ' group-hover:duration-' + valueq.value;
              }
            });
          }
          if (
            Object.keys(element.selected_Values).includes(key + '_ease_option')
          ) {
            Object.entries(element.selected_Values).map(([keyq, valueq]) => {
              if (keyq == key + '_ease_option') {
                effectClass +=
                  ' ' + valueq.value + ' group-hover:' + valueq.value;
              }
            });
          }
          if (
            Object.keys(element.selected_Values).includes(
              key + '_transition_effect',
            )
          ) {
            let effectType = '';
            Object.entries(element.selected_Values).map(([keyq, valueq]) => {
              if (keyq == key + '_transition_effect') {
                effectType = valueq.value;
              }
            });
            if (effectType === 'scale') {
              if (
                Object.keys(element.selected_Values).includes(
                  key + '_scale_option_start',
                )
              ) {
                Object.entries(element.selected_Values).map(([keyq, valueq]) => {
                  if (keyq == key + '_scale_option_start') {
                    effectClass += ' ' + valueq.value;
                  }
                });
              }
              if (
                Object.keys(element.selected_Values).includes(
                  key + '_scale_option_end',
                )
              ) {
                Object.entries(element.selected_Values).map(([keyq, valueq]) => {
                  if (keyq == key + '_scale_option_end') {
                    effectClass += ' group-hover:' + valueq.value;
                  }
                });
              }
            } else if (effectType === 'fade') {
              if (
                Object.keys(element.selected_Values).includes(
                  key + '_fade_opacity_start',
                )
              ) {
                Object.entries(element.selected_Values).map(([keyq, valueq]) => {
                  if (keyq == key + '_fade_opacity_start') {
                    effectClass += ' ' + valueq.value;
                  }
                });
              }
              if (
                Object.keys(element.selected_Values).includes(
                  key + '_fade_opacity_end',
                )
              ) {
                Object.entries(element.selected_Values).map(([keyq, valueq]) => {
                  if (keyq == key + '_fade_opacity_end') {
                    effectClass += ' group-hover:' + valueq.value;
                  }
                });
              }
            } else if (effectType === 'skew') {
              if (
                Object.keys(element.selected_Values).includes(
                  key + '_skew_position',
                )
              ) {
                Object.entries(element.selected_Values).map(([keyq, valueq]) => {
                  if (keyq == key + '_skew_position') {
                    effectClass += '  group-hover:' + valueq.value;
                  }
                });
              }
            } else if (effectType === 'rotate') {
              if (
                Object.keys(element.selected_Values).includes(
                  key + '_rotate_position',
                )
              ) {
                Object.entries(element.selected_Values).map(([keyq, valueq]) => {
                  if (keyq == key + '_rotate_position') {
                    effectClass += '  group-hover:' + valueq.value;
                  }
                });
              }
            } else if (effectType === 'translate') {
              if (
                Object.keys(element.selected_Values).includes(
                  key + '_translate_position',
                )
              ) {
                Object.entries(element.selected_Values).map(([keyq, valueq]) => {
                  if (keyq == key + '_translate_position') {
                    effectClass += '  group-hover:' + valueq.value;
                  }
                });
              }
            }
          }

          if (effectClass !== '') {
            effectClass =
              'transition-all group-hover:transition-all ' + effectClass;
          }


          if (objName.ImageAsBG !== undefined) {

            x.querySelectorAll("#" + key)[0].innerHTML = '<div class="absolute inset-0 bg-cover ' + effectClass + '" style="background-image: url(\'' + value.value + '\')"></div>';
          }
          else {
            if (
              Object.keys(element.selected_Values).includes(key + '_image_position')
            ) {
              Object.entries(element.selected_Values).map(([keyq, valueq]) => {
                if (keyq == key + '_image_position') {
                  classAlign = valueq.value;
                }
              });
            }
            if (
              Object.keys(element.selected_Values).includes(key + '_image_size')
            ) {
              Object.entries(element.selected_Values).map(([keyq, valueq]) => {
                if (keyq == key + '_image_size') {
                  imageSize = valueq.value;
                }
              });
            }

            if (
              Object.keys(element.selected_Values).includes(key + '_image_style')
            ) {
              Object.entries(element.selected_Values).map(([keyq, valueq]) => {
                if (keyq == key + '_image_style') {
                  imageStyle = valueq.value;
                }
              });
              if (imageStyle === 'Round') {
                if (
                  Object.keys(element.selected_Values).includes(
                    key + '_image_roundsize',
                  )
                ) {
                  Object.entries(element.selected_Values).map(([keyq, valueq]) => {
                    if (keyq == key + '_image_roundsize') {
                      imgClass = 'rounded-[' + valueq.value + 'px]';
                    }
                  });
                }
              }
            }
            if (x.querySelectorAll("#" + key + "_img").length > 0) {
              x.querySelectorAll("#" + key + "_img")[0].src = value.value;
            }
            else {

              if (Object.keys(element.selected_Values).includes(key + "_image_position")) {
                Object.entries(element.selected_Values).map(([keyq, valueq]) => { if (keyq == key + "_image_position") { classAlign = valueq.value; } })
              }
              if (Object.keys(element.selected_Values).includes(key + "_image_style")) {
                Object.entries(element.selected_Values).map(([keyq, valueq]) => { if (keyq == key + "_image_style") { imageStyle = valueq.value; } })
                if (imageStyle === 'Round') {
                  if (Object.keys(element.selected_Values).includes(key + "_image_roundsize")) {
                    Object.entries(element.selected_Values).map(([keyq, valueq]) => { if (keyq == key + "_image_roundsize") { imgClass = 'rounded-[' + valueq.value + 'px]'; } })

                  }
                }
              }
              if (Object.keys(element.selected_Values).includes(key + "_image_size")) {
                Object.entries(element.selected_Values).map(([keyq, valueq]) => { if (keyq == key + "_image_size") { imageSize = valueq.value; } })
              }
              if (Object.keys(element.selected_Values).includes(key + "_left_padding")) {
                Object.entries(element.selected_Values).map(([keyq, valueq]) => { if (keyq == key + "_left_padding") { classAlign += ' ' + valueq.value; } })
              }
              if (Object.keys(element.selected_Values).includes(key + "_right_padding")) {
                Object.entries(element.selected_Values).map(([keyq, valueq]) => { if (keyq == key + "_right_padding") { classAlign += ' ' + valueq.value; } })
              }
              if (Object.keys(element.selected_Values).includes(key + "_top_padding")) {
                Object.entries(element.selected_Values).map(([keyq, valueq]) => { if (keyq == key + "_top_padding") { classAlign += ' ' + valueq.value; } })
              }
              if (Object.keys(element.selected_Values).includes(key + "_bottom_padding")) {
                Object.entries(element.selected_Values).map(([keyq, valueq]) => { if (keyq == key + "_bottom_padding") { classAlign += ' ' + valueq.value; } })
              }
              if (Object.keys(element.selected_Values).includes(key + "_left_margin")) {
                Object.entries(element.selected_Values).map(([keyq, valueq]) => { if (keyq == key + "_left_margin") { classAlign += ' ' + valueq.value; } })
              }
              if (Object.keys(element.selected_Values).includes(key + "_right_margin")) {
                Object.entries(element.selected_Values).map(([keyq, valueq]) => { if (keyq == key + "_right_margin") { classAlign += ' ' + valueq.value; } })
              }
              if (Object.keys(element.selected_Values).includes(key + "_top_margin")) {
                Object.entries(element.selected_Values).map(([keyq, valueq]) => { if (keyq == key + "_top_margin") { classAlign += ' ' + valueq.value; } })
              }
              if (Object.keys(element.selected_Values).includes(key + "_bottom_margin")) {
                Object.entries(element.selected_Values).map(([keyq, valueq]) => { if (keyq == key + "_bottom_margin") { classAlign += ' ' + valueq.value; } })
              }
              // if(imageSize == '')
              //   imageSize = 'max-w-none';

              if (x.querySelectorAll("#" + key + "Position").length > 0) {
                let strText = x.querySelectorAll("#Text" + key + "Position")[0].innerHTML;
                let imageTextPosition = 'Top';
                if (Object.keys(element.selected_Values).includes(key + "_image_text_position")) {
                  Object.entries(element.selected_Values).map(([keyq, valueq]) => { if (keyq == key + "_image_text_position") { imageTextPosition = valueq.value; } })
                }
                let finalHTML = '';
                if (imageTextPosition === 'Top') {
                  finalHTML += '<div class="p-[15px]" id="Text' + key + 'Position">';
                  finalHTML += strText;
                  finalHTML += '</div>';
                  finalHTML += '<div class="' + classAlign + '" id="' + key + '">';
                  finalHTML += '<a href="javascript:void(0)" class="inline-block' + imageSize + ' ' + imgWidth + ' " id="' + key + '_img_link"><img id="' + key + '_img" class="' + imgClass + ' ' + effectClass + '" src="' + value.value + '" alt="" title="" /> </a>';;
                  finalHTML += '</div>';
                }
                else {
                  finalHTML += '<div class="' + classAlign + '" id="' + key + '">';
                  finalHTML += '<a href="javascript:void(0)" class="inline-block' + imageSize + ' ' + imgWidth + ' " id="' + key + '_img_link"><img id="' + key + '_img" class="' + imgClass + ' ' + effectClass + '" src="' + value.value + '" alt="" title="" /> </a>';;
                  finalHTML += '</div>';
                  finalHTML += '<div class="p-[15px]" id="Text' + key + 'Position">';
                  finalHTML += strText;
                  finalHTML += '</div>';
                }
                x.querySelectorAll("#" + key + "Position")[0].innerHTML = finalHTML;
              }
              else {
                x.querySelectorAll("#" + key)[0].className = classAlign;
                x.querySelectorAll("#" + key)[0].innerHTML = '<a href="javascript:void(0)" class="inline-block' + imageSize + ' ' + imgWidth + ' " id="' + key + '_img_link"><img id="' + key + '_img" class="' + imgClass + ' ' + effectClass + '" src="' + value.value + '" alt="" title="" /> </a>';
              }




            }
          }

        }
      }

      if (value.type === 'imagehide') {
        if (value.value) {
          let k = key.replace('_image_hide', '');
          if (x.querySelectorAll("#" + k).length > 0)
            x.querySelectorAll('#' + k)[0].className = 'hidden';
        }
      }

      if (value.type == "alt") {
        let propName = key.replace("_alt", "");
        let objName = {};

        Object.entries(element.properties).map(([keyq, valueq]) => {
          if (keyq == key) {
            objName = valueq;
          }
        });
        if (objName.ImageAsBG === undefined) {
          if (x.querySelectorAll("#" + propName + "_img").length > 0) {
            x.querySelectorAll("#" + propName + "_img")[0].alt = value.value;
            x.querySelectorAll("#" + propName + "_img")[0].title = value.value;

          }
        }

      }

      if (value.type == "fontsize") {

        let propname = key.replace("_font_size", "");
        if (x.querySelectorAll('#' + propname).length > 0 && isNaN(value.value)) {
          assignMultipleClass(value.value, x.querySelectorAll('#' + propname)[0]);
        }
        //x.querySelectorAll('#'+propname)[0].classList.add(value.value);

        // if(element.properties.TextAppearance != null)
        // {
        //     if(element.properties.TextAppearance.fields != undefined)
        //     {
        //       let fields = element.properties.TextAppearance.fields.split(",");
        //       let textBgColor = propname.text_bg_color ?? '';
        //       let bgOpacity = propname.bg_opacity ?? '1';
        //       let fontSize = propname.font_size ?? '';
        //       let textPos = propname.text_pos ?? 'center';


        //       fields.forEach(el => {
        //         if(x.querySelectorAll('#'+el+"_pos").length > 0) {
        //           x.querySelectorAll('#'+el+"_pos")[0].className = "flex items-center absolute "+fontSize+" inset-0 p-1 lg:p-4 text-white justify-"+textPos;
        //           x.querySelectorAll('#'+el+"_bg")[0].style = "background: rgb("+textBgColor+", "+bgOpacity+"); padding: 20px";
        //           //x.querySelectorAll('#'+el)[0].className = "pb-2";
        //         }
        //       });   
        //     }
        // }


      }

      if (value.type === 'width') {
        if (value.value.replace(/(^[\s\t]+)|([\s\t]+$)/g, '') !== undefined && value.value.replace(/(^[\s\t]+)|([\s\t]+$)/g, ''))
          x.querySelectorAll('#' + key)[0].classList.add(value.value.replace(/(^[\s\t]+)|([\s\t]+$)/g, ''));
      }
      if (value.type === 'plaintext') {
        if (value.value)
          x.querySelectorAll('#' + key)[0].innerHTML = value.value;
      }
      if (value.type == "appearance") {
        let propname = value.value;
        if (element.properties.TextAppearance !== undefined) {
          if (element.properties.TextAppearance.fields != undefined) {
            let fields = element.properties.TextAppearance.fields.split(",");

            let textBgColor = propname.text_bg_color ?? '';
            let bgOpacity = propname.bg_opacity ?? '1';
            let fontSize = propname.font_size ?? '';
            let textPos = propname.text_pos ?? '';
            let textHPos = propname.text_hpos ?? '';
            let textVPos = propname.text_vpos ?? '';
            let sectionWidth = propname.section_width ?? '';


            fields.forEach(el => {
              if (x.querySelectorAll('#' + el + "_pos").length > 0) {
                if (textHPos)
                  x.querySelectorAll('#' + el + "_pos")[0].className = "flex absolute " + fontSize + " inset-0 p-1 lg:p-4 text-white " + textHPos + " " + textVPos;
                else
                  x.querySelectorAll('#' + el + "_pos")[0].className = "flex items-center absolute " + fontSize + " inset-0 p-1 lg:p-4 text-white justify-" + textPos;

                if (sectionWidth)
                  x.querySelectorAll('#' + el + "_bg")[0].classList.add(sectionWidth);
                x.querySelectorAll('#' + el + "_bg")[0].style = "background: rgb(" + textBgColor + ", " + bgOpacity + "); padding: 20px";
                x.querySelectorAll('#' + el)[0].className = "pb-2";
              }
            });
          }

        }

      }

      if (value.type == "fp_section_title") {
        x.querySelectorAll('#sectionTitle')[0].innerHTML = value?.value;
      }

      if (value.type == "tabs") {
        if (value?.value[0]?.tabing == 'Yes') {
          let tmp = "";
          value.value.forEach((el) => {
            tmp += "<li class='mr-0.5 md:mr-0 font-semibold'><a href='javacsript:void(0)' class='tab py-2 mr-1 px-2 block hover:text-primary text-primary focus:outline-none text-default-text border-b-2 font-medium border-primary'>" + el?.tabName + "</a></li>";
          });
          x.querySelectorAll("#brandsDisplay")[0].innerHTML = tmp;
        }


        let list = "";
        if (value?.value && value?.value.length) {
          value?.value[0]?.data.forEach((product, index) => {
            let innerList = ""
            product?.moreImages.forEach((img, ind) => {
              innerList += `<li
                          class="w-[30px] h-[30px] p-[1px] border-2 border-primary hover:border-primary ${ind > 3 ? 'hidden' : ''}"
                        >
                          <img
                            src=${AzureBlobUrl}${img?.imageUrl}
                            alt=""
                            title=""
                            class=""
                          />
                        </li>`
            })
            list += `
                        <li class="text-center ${index > 3 ? 'hidden' : ''}">
                          <div
                            class="flex justify-center w-full ${element?.selected_Values?.featuredproducts_show_border?.value == 'Yes' ? 'border' : ''} border-gray-border" 
                        >
                            <div class="relative w-full mb-[20px]">
                              <div class="w-full px-[20px] pt-[10px]">
                                <img
                                    src=${AzureBlobUrl}${product?.imageUrl}
                                    alt="Patagonia Men's R1 Daily Jacket"
                                    class="w-auto h-auto max-h-max"
                                />
                              </div>
                              <div
                                class="mt-[20px] relative md:px-[30px] px-[15px]"
                              >
                                
                                
                                ${element?.selected_Values?.featuredproducts_show_product_name?.value == 'Yes' ? `<div
                                  class="mb-[10px] mt-[10px] h-[46px] text-anchor hover:text-anchor-hover text-medium-text"
                                >
                                  <a href="product-page.html" class="relative"
                                    >${product?.productName}</a>
                                </div>` : ''}
                                ${element?.selected_Values?.featuredproducts_show_price?.value == 'Yes' ? `<div
                                  class="mb-[12px] text-default-text font-semibold"
                                >
                                  <span class="">MSRP $${product?.msrp}</span>
                                </div>`: ''}
                                ${element?.selected_Values?.featuredproducts_show_split_products?.value == 'Yes' ? `<ul
                                  role="list"
                                  class="flex flex-wrap items-center mt-2 justify-center space-x-1"
                                >
                                    ${innerList}
                                </ul>`: ''}
                                </div>
                            </div>
                          </div>
                        </li>
                       `;
          });
        }

        let outer = `<div class="mt-[20px] relative">
            <div class="relative w-full pb-6 -mb-6">
              <ul
                role="list"
                class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-4 gap-6 lg:gap-8 mb-8"
              >
                ${list}
              </ul>
            </div>`

        x.querySelectorAll("#productsDisplay")[0].innerHTML = outer;
      }

      if (value.type == "fp_product_count") {
        let tmp = "";
        for (let i = 0; i < value.value; i++) {
          tmp += "<div class='pr-5'><img src='" + FeaturedImage + "' width='250'></div>";
        }
        x.querySelectorAll("#productsDisplay")[0].innerHTML = tmp;
      }




      if (value.type == "link") {
        // let objName = {};
        // Object.entries(element.properties).map(([keyq, valueq]) => {
        //   if (keyq == key) {
        //     objName = valueq;
        //   }
        // });

        // if(x.querySelectorAll("#"+key).length > 0)
        // {
        //   if(objName.ImageAsBG === undefined)
        //   {
        //     if(x.querySelectorAll("#"+key+"_img_link").length > 0)
        //     {
        //       x.querySelectorAll("#"+key+"_img_link")[0].href = value.value;
        //     }
        //     else
        //     {
        //       x.querySelectorAll("#"+key)[0].innerHTML = '<a href="'+value.value+'" id="'+key+'_img_link"><img id="'+key+'_img" class="" src=""/> </a>';
        //     }
        //   }
        // }
      }




      if (value.type == "Youtube") {
        let iorvideo;
        let kn = key.replace('_video', '');
        Object.entries(element.selected_Values).map(([keyq, valueq]) => {
          if (keyq == kn + '_image_or_video') {
            iorvideo = valueq.value;
          }
        });

        if (iorvideo && iorvideo === 'Video') {
          if (x.querySelectorAll('#' + kn).length > 0) {
            x.querySelectorAll('#' + kn)[0].innerHTML = '<iframe class="w-full aspect-video" src="https://www.youtube.com/embed/' + value.value + '?rel=0" allow="autoplay; encrypted-media" frameborder="0"></iframe>'
          }
        }
      }

      if (value.type == 'Vimeo') {
        let iorvideo;
        let kn = key.replace('_video', '');

        Object.entries(element.selected_Values).map(([keyq, valueq]) => {
          if (keyq == kn + '_image_or_video') {
            iorvideo = valueq.value;
          }
        });
        if (iorvideo && iorvideo === 'Video') {
          if (x.querySelectorAll('#' + kn).length > 0) {
            x.querySelectorAll('#' + kn)[0].innerHTML = '<iframe src="https://player.vimeo.com/video/' + value.value + '?background=1" frameborder="0" allow="autoplay; fullscreen" allowfullscreen="" style="" class="w-full aspect-video"></iframe>';
          }
        }
      }

      if (value.type == "text") {

        if (x.querySelectorAll("#" + key).length > 0) {
          x.querySelectorAll("#" + key)[0].innerHTML = value.value;
        }
      }

      /* CSS for Buttons */

      if (value.type == 'side_change' && key == 'Sidechange') {
        x.querySelectorAll('#left-section')[0].classList.remove('lg:order-2');
        x.querySelectorAll('#left-section')[0].classList.remove('lg:order-1');

        x.querySelectorAll('#right-section')[0].classList.remove('lg:order-2');
        x.querySelectorAll('#right-section')[0].classList.remove('lg:order-1');

        x.querySelectorAll('#left-section')[0].classList.add(
          value.value.left ?? 'lg:order-1',
        );
        x.querySelectorAll('#right-section')[0].classList.add(
          value.value.right ?? 'lg:order-2',
        );

      }

      if (value.type == "accordion") {
        // loop for accordion ittem 
        let ourComponetiNString = ReactDOMServer.renderToStaticMarkup(
          <ElementAccordionDisplay selected_Values={element.selected_Values} acValues={value.value} />
        );
        if (x.querySelectorAll('#FullAccordion').length > 0) {
          x.querySelectorAll('#FullAccordion')[0].innerHTML = ourComponetiNString;

        }
        else {
          if (x.querySelectorAll('#' + value.type).length > 0) {
            x.querySelectorAll('#' + value.type)[0].innerHTML = ourComponetiNString;

          }

        }
      }

      if (value.type == "dynamictabdata") {
        let bottom_tabbing = "On";
        if (Object.keys(element.selected_Values).includes(key + "_bottom_tabbing")) {
          Object.entries(element.selected_Values).map(([keyq, valueq]) => { if (keyq == key + "_bottom_tabbing") { bottom_tabbing = valueq.value; } })
        }
        displayTabbing(value.value, x, bottom_tabbing);
      }

      if (value.type == "carousel") {
        if (window.location.href.includes("Page/edit") && !window.location.href.includes("Page/edit/optimize")) {
          let showIndicators = value.value.showIndicators ?? "Off";
          let showArrow = value.value.showArrow ?? "Off";
          let showStatus = value.value.showStatus ?? "Off";
          let showThumb = value.value.showThumb ?? "Off";
          let strHTML = displayCarousel(showIndicators, showArrow, showStatus, showThumb, value.value);

          if (x && x.querySelectorAll("#banner_display")[0]?.innerHTML) {
            x.querySelectorAll("#banner_display")[0].innerHTML = strHTML;
          }

        }
      }

      if (value.type == "dynamic") {
        if (element.properties[value.type] !== undefined) {
          let functionName = element.properties[value.type].html;
          let strHTML = dynamicFunctions[functionName](value.value, element);
          if (x.querySelectorAll("#" + element.properties[value.type].html).length > 0)
            x.querySelectorAll("#" + element.properties[value.type].html)[0].innerHTML = strHTML;

          // if(element.properties[value.type].html == "boximage")
          // {
          //   let strHTML = boxHTMLDisplay(value.value);
          //   x.querySelectorAll("#"+element.properties[value.type].html)[0].innerHTML = strHTML;
          // }
          // else if(element.properties[value.type].html == "multipleImages")
          // {
          //   let strHTML = multipleImages(value.value);
          //   x.querySelectorAll("#"+element.properties[value.type].html)[0].innerHTML = strHTML;
          // }

        }

      }

      if (key == "SectionImageText") {

        if (element.properties[key] !== undefined) {
          let finalArr = value.value;
          let classArr = [];
          let column = 0;
          if (!Object.keys(finalArr).includes("Right")) {
            column = column + 1;
          }
          else if (finalArr.Right.display == "Yes") {
            column = column + 1;
          }

          if (!Object.keys(finalArr).includes("Center")) {
            column = column + 1;
          }
          else if (finalArr.Center.display == "Yes") {
            column = column + 1;
          }

          if (!Object.keys(finalArr).includes("Left")) {
            column = column + 1;
          }
          else if (finalArr.Left.display == "Yes") {
            column = column + 1;
          }
          if (column == 3) {
            classArr = ["lg:w-1/3", "px-3", "md:w-1/2"];
          }
          else if (column == 2) {
            classArr = ["lg:w-1/2", "px-3", "md:w-1/2"];
          }
          else if (column == 1) {
            classArr = [];
          }
          // classArr = [];

          if (Object.keys(finalArr).includes("Left")) {

            if (finalArr.Left.display === "Yes") {
              displayClass('sectionLeft', classArr, x);
              displaySection(finalArr.Left, "Left", x);
              x.querySelectorAll('#sectionLeft')[0].classList.remove("hidden");
            }
            else {
              x.querySelectorAll('#sectionLeft')[0].classList.add("hidden");
            }
          }
          else {
            x.querySelectorAll('#sectionLeft')[0].innerHTML = '<div class="p-4 lg:p-8 flex w-full items-center"></div>';
          }

          if (Object.keys(finalArr).includes("Center")) {
            if (finalArr.Center.display == "Yes") {
              displayClass('sectionCenter', classArr, x);
              displaySection(finalArr.Center, "Center", x);
              x.querySelectorAll('#sectionCenter')[0].classList.remove("hidden");
            }
            else {
              x.querySelectorAll('#sectionCenter')[0].classList.add("hidden");
            }
          }
          else {
            x.querySelectorAll('#sectionCenter')[0].innerHTML = '<div class="p-4 lg:p-8 flex w-full items-center"></div>';

          }
          if (Object.keys(finalArr).includes("Right")) {
            if (finalArr.Right.display == "Yes") {
              displayClass('sectionRight', classArr, x);
              displaySection(finalArr.Right, "Right", x);
              x.querySelectorAll('#sectionRight')[0].classList.remove("hidden");
            }
            else {
              x.querySelectorAll('#sectionRight')[0].classList.add("hidden");
            }
          }
          else {
            x.querySelectorAll('#sectionRight')[0].innerHTML = '<div class="p-4 lg:p-8 flex w-full items-center"></div>';
          }

        }

      }
      // layout
      // sidechange
      // Here we will copy all properties and write condition to display image/text 
      // sequence and layout options




    });

    let imgDisplay = false;
    let textDisplay = false;
    let layoutAdjust = false;

    if (Object.keys(element.selected_Values).includes("ElementConfiguration_Image_display")) {
      if (element.selected_Values.ElementConfiguration_Image_display.value == "No") {
        x.querySelectorAll('#left-section')[0].classList.add("hidden");
        x.querySelectorAll('#right-section')[0].classList.remove("lg:w-1/2");
        x.querySelectorAll('#right-section')[0].classList.remove("lg:w-3/5");
        x.querySelectorAll('#right-section')[0].classList.remove("lg:w-2/3");
        x.querySelectorAll('#right-section')[0].classList.remove("lg:w-3/4");
        x.querySelectorAll('#right-section')[0].classList.remove("lg:w-4/5");
        x.querySelectorAll('#right-section')[0].classList.remove("lg:w-5/6");
      }
      else {
        imgDisplay = true;
      }
    }
    else {
      imgDisplay = true;
    }
    if (Object.keys(element.selected_Values).includes("ElementConfiguration_text_section_bg")) {
      if (element.selected_Values.ElementConfiguration_text_section_bg.value) {
        x.querySelectorAll('#right-section')[0].style = 'background: ' + element.selected_Values.ElementConfiguration_text_section_bg.value;
      }
    }

    if (Object.keys(element.selected_Values).includes("ElementConfiguration_Text_display")) {
      if (element.selected_Values.ElementConfiguration_Text_display.value == "No") {
        x.querySelectorAll('#right-section')[0].classList.add("hidden");
        removeWidthClass(x, "Left");
      }
      else {
        textDisplay = true;
      }
    }
    else {
      textDisplay = true;
    }

    if (textDisplay && imgDisplay) {
      //from here code is pending
      if (Object.keys(element.selected_Values).includes("ElementConfiguration_Image_position")) {
        // check if image position is Left Right 
        x.querySelectorAll('#left-section')[0].classList.remove("lg:order-2");
        x.querySelectorAll('#right-section')[0].classList.remove("lg:order-1");
        x.querySelectorAll('#left-section')[0].classList.remove("lg:order-1");
        x.querySelectorAll('#right-section')[0].classList.remove("lg:order-2");
        if (element.selected_Values.ElementConfiguration_Image_position.value == "Left") {
          layoutAdjust = true;
          x.querySelectorAll('#left-section')[0].classList.add("lg:order-1");
          x.querySelectorAll('#right-section')[0].classList.add("lg:order-2");

        }
        else if (element.selected_Values.ElementConfiguration_Image_position.value === "Right") {
          layoutAdjust = true;
          x.querySelectorAll('#left-section')[0].classList.add("lg:order-2");
          x.querySelectorAll('#right-section')[0].classList.add("lg:order-1");

        }
        else if (element.selected_Values.ElementConfiguration_Image_position.value === "Bottom") {
          removeWidthClass(x);

          x.querySelectorAll('#left-section')[0].classList.add("lg:order-2");
          x.querySelectorAll('#right-section')[0].classList.add("lg:order-1");

        }
        else if (element.selected_Values.ElementConfiguration_Image_position.value === "Top") {
          removeWidthClass(x);

          x.querySelectorAll('#left-section')[0].classList.add("lg:order-1");
          x.querySelectorAll('#right-section')[0].classList.add("lg:order-2");
        }


      }
      if (layoutAdjust || Object.keys(element.selected_Values).includes("Layout")) {
        let check = true;
        if (element.selected_Values.ElementConfiguration_Image_position) {
          if (element.selected_Values.ElementConfiguration_Image_position.value === "Bottom" || element.selected_Values.ElementConfiguration_Image_position.value === "Top") {
            check = false;
            removeWidthClass(x);
            x.querySelectorAll('#left-section')[0].classList.remove('lg:w-1/2');
            x.querySelectorAll('#right-section')[0].classList.remove('lg:w-1/2');
          }
        }
        let layout = 50;
        if (Object.keys(element.selected_Values).includes("Layout") && check) {
          layout = element.selected_Values.Layout.value;
          if (layout === '')
            layout = 50;
          removeWidthClass(x);
          if (layout !== '') {
            if(x.querySelectorAll('#left-section').length > 0)
            {
              x.querySelectorAll('#left-section')[0].classList.add('lg:w-[' + layout + '%]');
            }
            if(x.querySelectorAll('#right-section').length > 0)
            {
              x.querySelectorAll('#right-section')[0].classList.add('lg:w-[' + (100 - layout) + '%]');
            }
          }

        }
      }
      else {

        if (element.selected_Values.ElementConfiguration_Image_position) {
          if (element.selected_Values.ElementConfiguration_Image_position.value === "Bottom" || element.selected_Values.ElementConfiguration_Image_position.value === "Top") {
            removeWidthClass(x);
            x.querySelectorAll('#left-section')[0].classList.remove('lg:w-1/2');
            x.querySelectorAll('#right-section')[0].classList.remove('lg:w-1/2');
          }
        }
      }





    }
  }
};

export const displayCarousel = (showIndicators, showArrow, showStatus, showThumb, dataArr, selectedIndex = 0) => {

  let strHTML = `<div class="carousel-root">
  <div class="carousel carousel-slider" style="width: 100%;">`;
  if (showIndicators == "On") {
    strHTML += '<ul class="control-dots">';
    if (dataArr.images != undefined && dataArr.images.length > 0) {
      dataArr.images.map((data, index) => {
        if (index == selectedIndex)
          strHTML += `<li class="dot selected" role="button" tabindex="0" aria-label="slide item 1" value="` + index + `"></li>`;
        else
          strHTML += `<li class="dot" role="button" tabindex="0" aria-label="slide item 2" value="` + index + `"></li>`;
        strHTML += `</ul>`;
      });
    }
  }

  if (showArrow == "On") {
    strHTML += `<button type="button" aria-label="previous slide / item"
      class="control-arrow control-prev control-disabled"></button>`;
  }

  strHTML += `<div class="slider-wrapper axis-horizontal">`;

  strHTML += `<ul class="slider animated" style="transform: translate3d(0px, 0px, 0px); transition-duration: 350ms;">`;

  if (dataArr.images != undefined && dataArr.images.length > 0) {

    dataArr.images.map((data, index) => {
      if (index === selectedIndex) {
        strHTML += `
              <li class="slide selected previous">
                  <div>`;
        if (data.image_or_video == undefined || data.image_or_video == "Image") {
          strHTML += `<img src="` + data.image_url + `">`;
        }
        else {
          if (data.video_type == "Youtube") {
            strHTML += `<iframe class="w-full aspect-video" src="https://www.youtube.com/embed/` + data.video_url + `?rel=0" allow="autoplay; encrypted-media" frameborder="0"></iframe>`;
          }
          else if (data.video_type == "Vimeo") {
            strHTML += `<iframe class="w-full aspect-video" src="https://player.vimeo.com/video/` + data.video_url + `?background=1"></iframe>`;
          }


        }

        let newClass = '';

        if (data?.headline_additional_class)
          newClass = data?.headline_additional_class + ' ' + (data.text_hpos ? data.text_hpos : "") + ` ` + (data.text_vpos ? data.text_vpos : "");
        else
          newClass = 'flex absolute inset-0 p-1 lg:p-4 text-white ' + (data.text_hpos ? data.text_hpos : "") + ` ` + (data.text_vpos ? data.text_vpos : "");
        console.log("DTA", data, newClass);
        strHTML += `<div class='` + newClass + `'>`;
        strHTML += `<div class="` + data?.headline_width + ` w-full" style="background: rgb(` + data.text_bg_color + `, ` + data.bg_opacity + `); padding: 20px;">`;
        if (data.headline1_display && data.headline !== "" && data.headline !== undefined && data.headline !== null) {
          let txtColor = "";
          if (data.font_color !== undefined)
            txtColor += "color: " + data.font_color;

          strHTML += `<div class="` + (data.headline1_class ?? '') + `" style="` + txtColor + `; text-shadow: ` + data?.headline1_box_shadow + `;">` + data.headline + `</div>`;
        }
        if (data.headline2_display && data.headline1 !== "" && data.headline1 !== undefined && data.headline1 !== null) {
          let txtColor1 = "";
          if (data.font_color1 !== undefined)
            txtColor1 += "color: " + data.font_color1;

          strHTML += `<div class="` + (data.headline2_class ?? '') + `" style="` + txtColor1 + `; text-shadow: ` + data?.headline2_box_shadow + `;">` + data.headline1 + `</div>`;
        }
        if (data.description_display && data.description !== "" && data.description !== undefined && data.description !== null) {
          let txtColor2 = "";
          if (data.font_color2 !== undefined)
            txtColor2 += "color: " + data.font_color2;

          strHTML += `<div class="` + (data.description_class ?? '') + `" style="` + txtColor2 + `;">` + data.description + `</div>`;
        }
        if (data.button_display1 === undefined && data.button_display === "Yes") {
          let txtColor2 = "";
          if (data.button_font_color !== undefined)
            txtColor2 += "color: " + data.button_font_color;

          strHTML += `<div class="pt-5 ` + data?.button_text_alignment + `"><a href="` + data.button_link + `" ` + (data.button_link_window ? "target=_blank" : "") + `" class="inlne-block ` + data?.button_class + `" style="box-shadow:` + data?.button_box_shadow + `; ` + txtColor2 + `">` + data.button_text + `</a></div>`;
        }
        else if (data.button_display1 === "Yes" && data.button_display === "Yes") {
          strHTML += '<div class="pt-3 lg:pt-5 text-center">';
          let txtColor2 = "";
          if (data.button_font_color !== undefined)
            txtColor2 += "color: " + data.button_font_color;

          strHTML += `<a href="` + data.button_link + `" ` + (data.button_link_window ? "target=_blank" : "") + `" class="inlne-block ` + data?.button_class + `" style="box-shadow:` + data?.button_box_shadow + `; ` + txtColor2 + `">` + data.button_text + `</a>`;

          let txtColor1 = "";
          if (data.button_font_color1 !== undefined)
            txtColor1 += "color: " + data.button_font_color1;

          strHTML += `<a href="` + data.button_link1 + `" ` + (data.button_link_window1 ? "target=_blank" : "") + `" class="inlne-block ` + data?.button_class1 + `" style="box-shadow:` + data?.button_box_shadow1 + `; ` + txtColor1 + `">` + data.button_text1 + `</a>`;
          strHTML += '</div>';

        }
        else if (data.button_display1 === "Yes") {
          let txtColor2 = "";
          if (data.button_font_color1 !== undefined)
            txtColor2 += "color: " + data.button_font_color1;

          strHTML += `<div class="pt-5 ` + data?.button_text_alignment1 + `"><a href="` + data.button_link1 + `" ` + (data.button_link_window1 ? "target=_blank" : "") + `" class="inlne-block ` + data?.button_class1 + `" style="box-shadow:` + data?.button_box_shadow1 + `; ` + txtColor2 + `">` + data.button_text1 + `</a></div>`;
        }
        strHTML += `</div></div>`;


        strHTML += `</div>
                  </li>`;
      }

    });
  }


  strHTML += `</ul>
      </div>`;
  if (showArrow == "On") {
    strHTML += `<button type="button" aria-label="next slide / item" class="control-arrow control-next"></button>`;
  }

  if (showStatus == "On") {
    strHTML += `<p class="carousel-status">1 of 3</p>`;
  }
  strHTML += `</div>`;

  if (showThumb == "On") {
    strHTML += `
              <div class="carousel">
                  <div class="thmbs-wrapper axis-vertical"><button type="button"
                          class="control-arrow control-prev control-disabled" aria-label="previous slide / item"></button>
                      <ul class="thumbs animated" style="transform: translate3d(0px, 0px, 0px); transition-duration: 350ms;">`;
    if (dataArr.images != undefined && dataArr.images.length > 0) {
      dataArr.images.map((data, index) => {

        strHTML += `
                                  <li class="thumb selected" aria-label="slide item 1" style="width: 80px;" role="button" tabindex="0">
                                      <img
                                          src="`+ data.image_url + `">
                                  </li>`;
      });
    }

    strHTML += `</ul><button type="button" class="control-arrow control-next control-disabled"
                          aria-label="next slide / item"></button>
                  </div>
              </div>`;
  }
  strHTML += `</div>`;
  return strHTML;
};

export const displayTabbing = (tabs, x, bottomTabbing) => {

  if (tabs.length > 0) {
    let strHTML = '<li class="">';
    strHTML += '<div class="inline-block h-[8px] w-[96px] mt-[8px] mb-[8px] ' + tabs[0].color + '">';
    strHTML += '</div>';
    strHTML += '</li>';
    x.querySelectorAll("#topBorder")[0].innerHTML = strHTML;


    strHTML = '';
    let count = 0;
    tabs.forEach((tab) => {
      if (count == 0) {
        strHTML += '<li class="mr-[2px] md:mr-0 font-[600]">';
        strHTML += '<button class="tab pt-[8px] pb-[8px] pl-[8px] pr-[8px] mr-[4px] block hover:text-anchor focus:outline-none font-[600] border-anchor text-anchor hover:text-anchor-hover border-[#006CD1] border-b-[2px]">';
        strHTML += tab.title;
        strHTML += '</button>';
        strHTML += '</li>';
      }
      else {
        strHTML += '<li class="mr-[2px] md:mr-0 font-[600]">';
        strHTML += '<button class="tab pt-[8px] pb-[8px] pl-[8px] pr-[8px] mr-[4px] block hover:text-anchor focus:outline-none font-[600] border-anchor rounded-sm">';
        strHTML += tab.title;
        strHTML += '</button>';
        strHTML += '</li>';
      }

      count++;

    })
    x.querySelectorAll("#topTabbing")[0].innerHTML = strHTML;

    strHTML = '';
    if (tabs[0].contents && tabs[0].contents.length > 0) {
      strHTML += '<div class="panel-01 tab-content pb-[16px]">';
      strHTML += '<div class="w-full">';
      strHTML += '<div class="flex flex-wrap ml-[-12px] mr-[-12px] mt-[-12px]">';
      tabs[0].contents.forEach((tabContent) => {
        strHTML += '<div class="w-full lg:w-1/' + tabs[0].perRow + ' px-3 mt-3 mb-3">';
        strHTML += '<div class="border border-gray-border relative font-light ' + tabs[0].color + ' hover:' + tabs[0].color + '">';
        strHTML += '<div class="flex justify-center items-center cursor-pointer">';
        strHTML += '<a href="javascript:void(0)">';
        strHTML += '<img itemprop="image" src="' + tabContent.image + '" alt="' + tabContent.alt + '" title="' + tabContent.alt + '" class="w-full mx-auto">';
        strHTML += '</a>';
        strHTML += '</div>';
        strHTML += '</div>';
        strHTML += '</div>';
      });
      strHTML += '</div>';
      strHTML += '</div>';
      strHTML += '</div>';
      x.querySelectorAll("#tabContent")[0].innerHTML = strHTML;
    }
    if (bottomTabbing === "On") {
      strHTML = '';
      tabs.forEach((tab) => {
        strHTML += '<li class="lg:w-1/5 w-full">';
        strHTML += '<button class="' + tab.color + ' hover:' + tab.color + ' block pt-[16px] pb-[16px] pl-[40px] pr-[40px] text-center font-[600] w-full">';
        strHTML += tab.title;
        strHTML += '</button>';
        strHTML += '</li>';
      })
      x.querySelectorAll("#bottomTabbing")[0].innerHTML = strHTML;

    }
    else {
      x.querySelectorAll("#bottomTabbing")[0].innerHTML = "";
    }
  }

}

export const displayClass = (divid, classArr, x) => {
  x.querySelectorAll('#' + divid)[0].classList.remove("lg:w-1/3");
  x.querySelectorAll('#' + divid)[0].classList.remove("px-3");
  x.querySelectorAll('#' + divid)[0].classList.remove("md:w-1/2");
  x.querySelectorAll('#' + divid)[0].classList.remove("lg:w-1/2");
  classArr.forEach((value) => {
    x.querySelectorAll('#' + divid)[0].classList.add(value);
  });

}

export const displaySection = (obj, side, x) => {

  let strHTML = "";
  let color = "color: " + obj?.color;

  if (obj.contentType == "Image") {
    strHTML += '<div class="flex">';
    strHTML += '<a title="' + obj.image_alt + '" href="' + obj.image_link + '" class="hrefurl no-underline">';
    strHTML += '<div class="' + obj?.description_class + '">';
    strHTML += '<img class="w-full" src="' + obj.image + '" alt="' + obj.image_alt + '" title="' + obj.image_alt + '">';
    strHTML += '</div>';
    strHTML += '<div class="text-center w-full bg-gray-50">';
    if (obj.headline !== "") {
      strHTML += '<div class="text-base font-semibold p-4' + obj?.headline_class + '" style="' + color + '">' + obj.headline + '</div>';
    }
    strHTML += '</div>';

    //strHTML += '</div>';
    strHTML += '</a>';
    strHTML += '</div>';
  }
  else {
    strHTML += '<div class="p-4 lg:p-8 flex w-full items-center">';
    strHTML += '<div class="w-full">';
    if (obj.headline !== null) {
      strHTML += '<div class="' + obj?.headline_class + '" style="' + color + '">' + obj.headline + '</div>';
    }
    strHTML += '<div class="' + obj?.description_class + '" style="color: ' + obj?.color1 + '">' + obj.description + '</div>';
    strHTML += '</div>';
    strHTML += '</div>';
  }
  x.querySelectorAll('#section' + side)[0].innerHTML = strHTML;

}

export const removeWidthClass = (x, type = "Both") => {
  if (type == "Left" || type == "Both") {
    if(x.querySelectorAll('#left-section').length > 0)
    {
      x.querySelectorAll('#left-section')[0].classList.remove("lg:w-1/2");
      x.querySelectorAll('#left-section')[0].classList.remove("lg:w-1/3");
      x.querySelectorAll('#left-section')[0].classList.remove("lg:w-1/4");
    }
  }
  if (type == "Right" || type == "Both") {
    if(x.querySelectorAll('#right-section').length > 0)
    {
      x.querySelectorAll('#right-section')[0].classList.remove("lg:w-1/2");
      x.querySelectorAll('#right-section')[0].classList.remove("lg:w-2/3");
      x.querySelectorAll('#right-section')[0].classList.remove("lg:w-3/4");
    }
  }

}

export const showMsg = () => {
  console.log("s")
}

export const findMenuItemBuUrl = (menu, url) => {
  for (let i = 0; i < menu.length; i++) {
    const item = menu[i];
    if (item.navigationurl === url) {
      return item;
    } else if (item.subRows) {
      const submenuItem = findMenuItemBuUrl(item.subRows, url);
      if (submenuItem) {
        return submenuItem;
      }
    }
  }
  return null;
};

export const getImageHeightWidth = (url, cb) => {
  const img = new Image();
  img.src = url;
  img.onload = () => cb(null, img);
  img.onerror = (err) => cb(err);
  return img;
};
