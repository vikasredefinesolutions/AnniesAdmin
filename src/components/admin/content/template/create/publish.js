import {
  FP,
  SS,
  BDB,
  BT,
  BAZ,
  SL,
  RCF,
  SBG,
  SBU,
  SBP,
  SBC,
  SBF,
  GMZ,
  NC,
} from "./component";

function nodeToString(node) {
  var tmpNode = document.createElement("div");
  tmpNode.appendChild(node.cloneNode(true));
  var str = tmpNode.innerHTML;
  tmpNode = node = null; // prevent memory leaks in IE
  return str;
}

// const loadBackgroundDefault = (element) => {
//   if (element?.selected_Values !== undefined) {
//     if (Object.keys(element?.selected_Values).length > 0) {
//       const bgPropertyName = Object.keys(element?.properties).find(
//         (key) => key === "bg"
//       );

//       let attributes;
//       Object.entries(element?.selected_Values).map(([key, value]) => {
//         if (key === bgPropertyName) {
//           attributes = value;
//         }
//       });

//       if (attributes !== undefined && Object.keys(attributes).length > 0) {
//         if (attributes.type === "color") {
//           return attributes.value;
//         } else if (attributes.type === "image") {
//           return 'url("' + attributes.value + '")';
//         } else if (attributes.type === "none") {
//           return "none";
//         }
//       }
//     }

//     return "none";
//   }
//   return "none";
// };

// const checkFixedBG = (element) => {
//   if (element?.selected_Values !== undefined) {
//     if (Object.keys(element?.selected_Values).length > 0) {
//       const bgPropertyName = Object.keys(element?.properties).find(
//         (key) => key === "bg"
//       );

//       let attributes;
//       let fixedBg;
//       Object.entries(element?.selected_Values).map(([key, value]) => {
//         if (key === bgPropertyName) {
//           attributes = value;
//         }
//         if (key === bgPropertyName + "_fixed_bg") {
//           fixedBg = value;
//         }
//       });

//       if (attributes !== undefined && Object.keys(attributes).length > 0) {
//         if (attributes.type === "color") {
//           return false;
//         } else if (attributes.type === "image") {
//           if (fixedBg && fixedBg.value) {
//             return true;
//           }
//         } else if (attributes.type === "none") {
//           return false;
//         }
//       }
//     }
//     return false;
//   }
//   return false;
// };

// const loadBackgroundType = (element) => {
//   if (element?.selected_Values !== undefined) {
//     if (Object.keys(element?.selected_Values).length > 0) {
//       const bgPropertyName = "bg";

//       let attributes;
//       Object.entries(element?.selected_Values).map(([key, value]) => {
//         if (key === bgPropertyName) {
//           attributes = value;
//         }
//       });

//       if (attributes !== undefined && Object.keys(attributes).length > 0) {
//         return attributes.type;
//       } else {
//         return "";
//       }
//     }
//     return "";
//   }
//   return "";
// };

// const loadBackgroundDefaultStyle = (element) => {
//   if (element?.selected_Values !== undefined) {
//     if (Object.keys(element?.selected_Values).length > 0) {
//       const bgPropertyName = "bg";

//       let attributes;
//       Object.entries(element?.selected_Values).map(([key, value]) => {
//         if (key === bgPropertyName + "_bg_style") {
//           attributes = value;
//         }
//       });

//       if (attributes !== undefined && Object.keys(attributes).length > 0) {
//         if (attributes.value === "fullbg") {
//           return "outer";
//         } else {
//           return "inner";
//         }
//       }
//     }
//     return "outer";
//   }
//   return "outer";
// };

// const loadBackgroundImageClass = (element) => {
//   if (element?.selected_Values !== undefined) {
//     if (Object.keys(element?.selected_Values).length > 0) {
//       const bgPropertyName = "bg";

//       let attributes;
//       Object.entries(element?.selected_Values).map(([key, value]) => {
//         if (key === bgPropertyName) {
//           attributes = value;
//         }
//       });

//       let bgType = "";

//       if (attributes !== undefined && Object.keys(attributes).length > 0) {
//         if (attributes.type === "image") {
//           bgType = "image";
//         }
//       }
//       if (bgType === "image") {
//         let imageClass = "";

//         if ("bg_bg_image_style" in element?.selected_Values) {
//           imageClass += " " + element?.selected_Values.bg_bg_image_style.value;
//         }
//         if ("bg_bg_image_position" in element?.selected_Values) {
//           imageClass +=
//             " " + element?.selected_Values.bg_bg_image_position.value;
//         }
//         return imageClass;
//       }
//     }
//     return "";
//   }
//   return "";
// };

export const publishFunction = (componentHtml) => {
  const components = document.querySelectorAll(".component-selector");
  let array2 = Array.from(components);
  const array3 = array2.map((item, index) => nodeToString(item));
  const jsArray = [];
  return componentHtml.map((component, index) => {
    if (
      [
        FP,
        SS,
        BDB,
        BT,
        BAZ,
        SL,
        RCF,
        SBG,
        SBU,
        SBP,
        SBC,
        SBF,
        GMZ,
        NC,
      ].includes(component.name)
    ) {
      return {
        id: component.id,
        name: component.name,
        html: component.html,
        properties: JSON.stringify(component.properties),
        selectedVal: JSON.stringify(component.selected_Values),
      };
    } else {
      if (["Full Screen Slider", "Banner Section"].includes(component.name)) {
        if (!jsArray.includes("carousel")) {
          jsArray.push("carousel");
        }
      } else if (component.name === "Full Accordion") {
        jsArray.push("accordion");
      }

      return {
        html: array3[index],
        name: component.name,
      };
    }
  });

  // const ScriptsAr = jsArray.map((name) => {
  //   const script = scripts.find((_script) => _script.name === name);
  //   return script.script;
  // });

  // if (ScriptsAr.length > 0) {
  //   finalHtml.push({
  //     html: `<script>${ScriptsAr.join("")}</script>`,
  //     name: "scripts",
  //   });
  // }
};
