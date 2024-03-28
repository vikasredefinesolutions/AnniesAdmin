import axios from "axios";
import format from "date-fns/format";
import { ValidationMsgs } from "global/ValidationMessages";
import store from "redux/Store";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { setAddLoadingHowMany } from "redux/globalLoader/GlobalLoaderAction";
import CategoryServiceCls from "services/admin/category/CategoryService";
import TopicsDetailsServicesCls from "services/admin/topics/TopicsDetailsServices";
import LocationServices from "services/common/location/LocationServices";
import { v4 as uuid } from "uuid";

export const NumericList = (start, end, gap) => {
  let font = [];
  for (var i = start; i <= end; i = i + gap) {
    font = [...font, { value: i.toString(), label: i.toString() }];
  }
  return font;
};

export const DateTimeFormat = (value, DateFormat = "MM/dd/yyyy") => {
  return {
    date: format(new Date(value), DateFormat),
    time: format(new Date(value), "hh:mm a"),
  };
};

export const getClientInfo = async () => {
  // return {
  //   browser: 'firefox',
  //   location: "string",
  //   ipAddress: "192.168.1.1",
  //   macAddress: "00-00-00-00-00-00",
  // };
  var clientInfo;
  await LocationServices.getLocation()
    .then((response) => {
      if (response?.data) {
        clientInfo = response?.data;
      }
    })
    .catch(() => { });
  return {
    browser: navigator.userAgent,
    location: clientInfo
      ? clientInfo.city +
      " " +
      clientInfo.state +
      " " +
      clientInfo.country_name +
      " " +
      clientInfo.postal
      : "AMD",
    ipAddress: clientInfo ? clientInfo.IPv4 : "125.124.545.32",
    macAddress: "00-00-00-00-00-00",
  };
};

export const ValidNumberFormat = (valFromInput, toFix = 2) => {
  let afterdecimalValue = valFromInput?.split(".")[1]?.length;

  valFromInput = valFromInput.toString();
  valFromInput = valFromInput.slice(
    0,
    valFromInput.indexOf(".") + afterdecimalValue + 1
  );
  valFromInput = Number(valFromInput).toFixed(toFix);
  return Number(valFromInput);
};

export const fileValidation = (fileInput, setMessage) => {
  // var filePath = fileInput.value;

  // Allowing file type
  var allowedExtensions = /(\.jpg|\.png|\.gif)$/i;
  // console.log("fileInput", fileInput);
  if (!allowedExtensions.exec(fileInput)) {
    // console.log("Invalid file type");
    const fileExtension = fileInput.split(".");
    setMessage(
      `Invalid file type you uploaded a .${fileExtension[fileExtension.length - 1]
      } file`
    );
    setTimeout(() => {
      setMessage("");
    }, 2000);
    return false;
  } else {
    // console.log("Image preview", fileInput[0], fileInput);
    if (fileInput && fileInput[0]) {
      return true;
    }
  }
};

export const ValidatePercentage = (event) => {
  if (!/^\d*\.?\d*$/.test(event.key)) {
    event.preventDefault();
  }
};

// using this we can restrict special Character
export const ValidateSpecialCharacter = (event, isDecimal = false, values) => {
  if (isDecimal && event.key === ".") {
    if (values.includes(".") || values === "") {
      return event.preventDefault();
    }
    return;
  } else {
    if (!/^\d*$/.test(event.key)) {
      event.preventDefault();
    }
  }
};

export const serverError = (response, renderKey) => {
  let errors = {};
  if (response.data.errors) {
    // return Object.values(response.data.errors).join("<br/> ");
    Object.keys(response.data.errors).map((key, index) => {
      let value = response.data.errors[key];

      if (
        Object.keys(response.data.errors).length > 0 &&
        typeof value !== "object" &&
        !Array.isArray(value)
      ) {
        errors = { ...errors, [key]: value };
      } else {
        errors = { ...errors, ...nested(value) };
        // nested(value);
      }
      return errors
    });
  }
  if(renderKey){
    return Object.entries(errors)
    .filter((value) => value[0])
    .join("<br/> ");
  } else {
    return Object.values(errors)
    .filter((value) => value)
    .join("<br/> ");
  }
};

const nested = (data) => {
  let errors = {};
  Object.keys(data).map((key, index) => {
    let value = data[key];
    if (
      Object.keys(data).length > 0 &&
      typeof value !== "object" /*  && Array.isArray(value) */
    ) {
      errors = { ...errors, [key]: value };
    } else {
      errors = { ...errors, ...nested(value) };
    }
    return errors
  });
  return errors;
};

export const importValidation = (response) => {
  // let a = "<ul>";
  // response?.map((data, index) => {
  //   let b = " <li key={index}>" + 'row 1' + "<ul className='ml-10'>";
  //   let c = "";
  //   Object.keys(data.error).map((key, index) => {
  //     c = c + `<li key={index}>${msg}</li>`;
  //   })
  //   a =  b + c + "</ul></li>"
  // });
  let errors = response?.map((data) => {
    let errorMsg = [];
    Object.keys(data.error).map((key, index) => {
      errorMsg = [...errorMsg, data.error[key]];
      return errorMsg
    });
    return { row: "Row " + data?.row, error: errorMsg };
  });
  return errors;
};
export const displayColumnSelection = (value) => {
  return (
    value === "Product" ||
    value === "OptionProduct" ||
    value === "ProductColor" ||
    value === "StoreProduct" ||
    value === "StoreOptionProduct"
  );
};

// export const createDynamicShades = (color) => {
//   const shades = createShades(color);
//   return shades?.colors;
// };
export const scrollTop = () => {
  var div = document.getElementById("contentbody");
  if (div) {
    div.scrollTop = 0;
  }
};

export const domain = (fullDomain) => {
  let modifiedDomain = `${fullDomain}`;
  if (modifiedDomain) {
    const domain = ["https://", "http://", "www.",];

    domain.map((prefixSufix) => {
      modifiedDomain = modifiedDomain.replace(prefixSufix, "");
      return modifiedDomain
    });
  }

  return modifiedDomain;
};

export const replaceDomain = (fullDomain) => {
  if (fullDomain) {
    let modifiedDomain = `${fullDomain}`;
    if (modifiedDomain) {
      const domain = ["https://", "http://", "www.", ".com", ".us", ".*"];

      domain.map((prefixSufix) => {
        modifiedDomain = modifiedDomain.replace(prefixSufix, "");
        return modifiedDomain
      });
    }

    return modifiedDomain;
  } else {
    return ""
  }

};

export const stringToJsonParser = (ourString) => {
  if (typeof ourString !== "string") {
    return { error: ValidationMsgs.jsonParser.notAValidJson, data: {}, success: false };
  }
  try {
    const ourJson = JSON.parse(ourString);
    return { error: null, data: ourJson, success: true };
  } catch (error) {
    return { error: error, data: {}, success: false };
  }
};


export const CmdBackgroundColorValue = (currentClass) => {
  switch (currentClass) {
    case "primary":

      return {
        backgroundColor: "red",
        color: "white"
      }

    case "secondary":

      return {
        backgroundColor: "blue",
        color: "yellow"
      }

    case "tertiary":

      return {
        backgroundColor: "yellow",
        color: "red"
      }

    case "quaternary":

      return {
        backgroundColor: "brown",
        color: "white"
      }

    default:

      return {
        backgroundColor: "black",
        color: "white"
      }
  }
}


export const RowCreaterHelper = (DATA, setterFunction) => {
  const obj = {}
  const onlyElemArray = DATA.filter((ALL_DATA) => ALL_DATA.isVisibleAtDashboard)

  const result = [];
  let temp = [];
  let totalWidth = 0;

  for (let i = 0; i < onlyElemArray.length; i++) {

    onlyElemArray[i]["uniqIndex"] = i + 1
    const widget = onlyElemArray[i];
    const width = widget.widgetWidth || 6;


    if (totalWidth + width <= 12) {
      temp.push(widget);
      totalWidth += width;
    } else {
      result.push(temp);
      temp = [widget];
      totalWidth = width;
    }
  }

  if (temp.length) {
    result.push(temp);
  }

  result.map((foundWidgetsInARow, index) => {
    obj[`row_${index}`] = foundWidgetsInARow
    return obj
  })


  if (Object.keys(obj).length) {
    setterFunction(obj)
  } else {
    setterFunction({
      row_1: []
    })
  }
}

export const caseHelper = (nameString, caseName) => {

  switch (caseName) {
    case "pascalCase":
      if (nameString) {
        const arr = nameString.split(" ");
        for (var i = 0; i < arr.length; i++) {
          arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        }
        return arr.join(" ");
      } else {
        return ""
      }

    default:
      break;
  }


}

export const sessionStorageCleanerHelper = (pathname, keyToAccessSessionFor, menuName, menuUrl, pageName) => {
  let currentPageTitle = sessionStorage.getItem(keyToAccessSessionFor)
  if (currentPageTitle) {
    currentPageTitle = stringToJsonParser(currentPageTitle)

    if (pageName !== "sidebar") {
      if (!pathname.includes(currentPageTitle.data.currentLocation)) {
        sessionStorage.removeItem(keyToAccessSessionFor)
      }
    } else {

      if (menuUrl === currentPageTitle.data.currentLocation && menuName !== currentPageTitle.data.menuName) {
        // sessionStorage.removeItem(keyToAccessSessionFor)
        sessionStorage.setItem("ActiveMenuName", JSON.stringify({ menuName: menuName, menuUrl }))
      }
    }

  } else {
    if (menuName) {
      // console.log("pathname.toLowerCase(), menuUrl.toLowerCase() ", pathname.toLowerCase(), menuUrl.toLowerCase());
      if (pathname.toLowerCase() === menuUrl.toLowerCase()) {
        sessionStorage.setItem("ActiveMenuName", JSON.stringify({ menuName: menuName, menuUrl }))
      }
    }
  }
}

export const TitleNameHelper = ({ defaultTitleName }) => {
  let currentPageTitle = sessionStorage.getItem("ActiveMenuName")
  if (!window.location.pathname.toLowerCase().includes("/dashboard") && currentPageTitle) {
    currentPageTitle = JSON.parse(currentPageTitle)
    if (currentPageTitle.menuName) {
      const ourPascalCaseString = caseHelper(currentPageTitle.menuName, "pascalCase")
      return ourPascalCaseString
    } else {
      return defaultTitleName
    }
  } else {
    return defaultTitleName
  }
}

export const getFullDomain = (name, parentName) => {
  return `${name}.${parentName.toLowerCase()}.com`
}

export const getFullDomainByParentUrl = (url, parentUrl) => {
  let pUrl = parentUrl
  const wordsToRemove = ["https://", "www."];
  for (let wordToRemove of wordsToRemove) {
    pUrl = pUrl.replaceAll(wordToRemove, "");
  }
  // console.log("complete url", `${url}.${pUrl}`);
  return `${url}.${pUrl}`
};
export const getRedirectUrl = (masterCatalogStoreTypes, storeTypeFinal, storeNameFinal, storeIdFinal, isBundle, pageType = "products") => {
  storeTypeFinal = storeTypeFinal.toLowerCase()
  // console.log("getRedirectUrl masterCatalogStoreTypes, storeTypeFinal, storeNameFinal, storeIdFinal, isBundle", masterCatalogStoreTypes, storeTypeFinal, storeNameFinal, storeIdFinal, isBundle);

  return (masterCatalogStoreTypes.includes(storeTypeFinal.toLowerCase()) && storeTypeFinal === "storebuilder") ? `/admin/stores/${storeTypeFinal}/${storeNameFinal}/${storeIdFinal}/${pageType}/bundle/create`
    : (masterCatalogStoreTypes.includes(storeTypeFinal.toLowerCase()) && storeTypeFinal === "formbuilder") ? `/admin/stores/${storeTypeFinal}/${storeNameFinal}/${storeIdFinal}/${pageType}/bundle/create`
      : (masterCatalogStoreTypes.includes(storeTypeFinal.toLowerCase()) && storeTypeFinal === "corporatestore") ? `/admin/stores/${storeTypeFinal}/${storeNameFinal}/${storeIdFinal}/${pageType}/bundle/create`
        : (masterCatalogStoreTypes.includes(storeTypeFinal.toLowerCase()) && storeTypeFinal === "ecommercestore") ? `/admin/stores/${storeTypeFinal}/${storeNameFinal}/${storeIdFinal}/${pageType}/bundle/create`
          : `/admin/master/${storeTypeFinal}/${storeNameFinal}/${storeIdFinal}/${pageType}/bundle/create`
}

export const getEditUrl = (id, masterCatalogStoreTypes, storeTypeFinal, storeNameFinal, storeIdFinal, storeType, isBundle, pageType = "products") => {
  storeTypeFinal = storeTypeFinal ? storeTypeFinal.toLowerCase() : ""
  // console.log("getEditUrl id, masterCatalogStoreTypes, storeTypeFinal, storeNameFinal, storeIdFinal, storeType, isBundle, pageType", id, masterCatalogStoreTypes, storeTypeFinal, storeNameFinal, storeIdFinal, storeType, isBundle, pageType);

  return (masterCatalogStoreTypes.includes(storeTypeFinal.toLowerCase()) && storeTypeFinal === "storebuilder") ? `/admin/stores/${storeTypeFinal}/${storeNameFinal}/${storeIdFinal}/${pageType}${isBundle ? "/bundle/edit" : "/edit"}/${id}`
    : (masterCatalogStoreTypes.includes(storeTypeFinal.toLowerCase()) && storeTypeFinal === "formbuilder") ? `/admin/stores/${storeTypeFinal}/${storeNameFinal}/${storeIdFinal}/${pageType}${isBundle ? "/bundle/edit" : "/edit"}/${id}`
      : (masterCatalogStoreTypes.includes(storeTypeFinal.toLowerCase()) && storeTypeFinal === "corporatestore") ? `/admin/stores/${storeTypeFinal}/${storeNameFinal}/${storeIdFinal}/${pageType}${isBundle ? "/bundle/edit" : "/edit"}/${id}`
        : (masterCatalogStoreTypes.includes(storeTypeFinal.toLowerCase()) && storeTypeFinal === "ecommercestore") ? `/admin/stores/${storeTypeFinal}/${storeNameFinal}/${storeIdFinal}/${pageType}${isBundle ? "/bundle/edit" : "/edit"}/${id}`
          : `/admin/master/${storeTypeFinal}/${storeNameFinal}/${storeIdFinal}/${pageType}${isBundle ? "/bundle/edit" : "/edit"}/${id}`
}

export const getDashboardRedirectUrl = (storeType, storeData) => {
  return (storeType.storeTypeName === "Store Builder") ? `/admin/stores/StoreBuilder/${storeData.name.replaceAll(" ", "")}/${storeData.id}/stores`
    : (storeType.storeTypeName === "eCommerce Store") ? `/admin/stores/ecommercestore/${storeData.name.replaceAll(" ", "")}/${storeData.id}/products`
      : (storeType.storeTypeName === "Corporate Store") ? `/admin/stores/corporatestore/${storeData.name.replaceAll(" ", "")}/${storeData.id}/products`
        : (storeType.storeTypeName === "Form Builder") ? `/admin/stores/formbuilder/${storeData.storeName.replaceAll(" ", "")}/${storeData.storeId}/forms`
          : `/admin/master/dashboard`
}


export const MenuNameReturner = (userRolePermissionData, basedOn, url) => {
  const MenuListByUserRolePermissionArray = [];
  const findNestedObject = (userRolePermission) => {
    userRolePermission.map((moduleSubRowName) => {
      MenuListByUserRolePermissionArray.push({
        name: moduleSubRowName.name,
        url: moduleSubRowName.navigationurl,
        codeName: moduleSubRowName.codeName,
      });

      if (moduleSubRowName.subRows && moduleSubRowName.subRows.length > 0) {
        findNestedObject(moduleSubRowName.subRows);
      }
      return MenuListByUserRolePermissionArray
    });
  };

  if (userRolePermissionData?.data.length > 0) {
    findNestedObject(userRolePermissionData?.data);
  }
  return MenuListByUserRolePermissionArray.filter((MenuListByUserRolePermission) => MenuListByUserRolePermission[basedOn] === url);
}

export const replaceMyBaseUrl = (myImagePath, baseUrl) => {
  if (myImagePath && baseUrl) {
    if (myImagePath.includes(baseUrl)) {
      return myImagePath.replace(baseUrl, "")
    }
  } else {
    return myImagePath || ""
  }
}

export const paginateArray = (array = [], page_size = 100, page_number = 1) => {
  if (array && array.length > 0) {
    // console.log("array,page_size,page_number", array, page_size, page_number, (page_number - 1) * page_size, page_number * page_size);
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  } return []
}


export const GenerateRandomCodeByLength = (length) => {
  let randomId = uuid();
  if (length) {
    randomId = randomId.slice(0, length);
  }
  return randomId;
};

export const UpdateJsonDetails = (dispatch,message) => {
  /*html to json data of */
 const storeUrl = localStorage.getItem("StoreURL");
 CategoryServiceCls.getClearCategoryCatch().then((res) => {
   if (res?.data?.success) {
       CategoryServiceCls.getStoreDetailsByUrl(storeUrl).then((res) => {
         TopicsDetailsServicesCls.updateStoreConfigDetails(
           res?.data?.data,
           storeUrl,
         )
           .then((response) => {
             if (response.data.success) {
               dispatch(
                 setAlertMessage({
                   type: "success",
                   message: message,
                 }),
               );
             } else {
               dispatch(
                 setAlertMessage({
                   type: "danger",
                   message: serverError(response),
                 }),
               );
             }
           })
           .catch((errors) => {
             if (errors) {
              dispatch(
                setAlertMessage({
                  type: "success",
                  message:message,
                }),
              );
             }
           });
       });
     
   }
 });
};

export const updateStoreDetails = (url) => {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${url}/api/json-upload/updateStoreDetails`,
    headers: {}
  };

  store.dispatch(setAddLoadingHowMany(1))
  return axios.request(config)
    .then((response) => {
      if (response?.data && response?.data?.message) {
        store.dispatch(setAddLoadingHowMany(0))
        return response
      } else {
        store.dispatch(setAddLoadingHowMany(0))
      }
      store.dispatch(setAddLoadingHowMany(0))
    })
    .catch((error) => {
      store.dispatch(setAddLoadingHowMany(0))
      return error
    });
}