import Dropdown from "components/common/formComponent/Dropdown";
import Input from "components/common/formComponent/Input";
import DatePicker from "components/common/formComponent/DatePicker";
import Checkbox from "components/common/formComponent/Checkbox";

// Please use the inside of formik parent element <FormikForm> only
export const SingleInputElementReturner = ({ 
  elementName, 
  setFieldValue, 
  childId, 
  fields,
  childNameHavingMultiChild,
  ...rest 
}) => {
    switch (`${elementName}`.toLowerCase()) {
      case "dropdown":
      case "multidropdown":
        return (
            <Dropdown 
              isMulti={elementName.toLowerCase() === "multidropdown" ? true : false}
              hidecheckbox={false}
              onChange={(e)=> {
                if(e){
                  const temp = e.length ? e : [e]
                  setFieldValue(`${childNameHavingMultiChild}`,temp.map((child)=> ({customFieldsValue: child.value, id : child.id})))
                } else {
                  setFieldValue(`${childNameHavingMultiChild}`,[])
                }
                }}
              {...rest}
            defaultValue={(rest?.defaultValue && rest?.defaultValue?.length) ? rest.defaultValue.map((obj) => obj.customFieldsValue) : []}
            showColor={true}
            />
      );

      case "textbox":
        return (
            <Input type="text"
              onChange={(e)=> {
                setFieldValue(`${rest.elemNameForFormik}.customFieldsValue`,e.target.value)
                setFieldValue(`${rest.elemNameForFormik}.id`,childId)
               }}
             
              {...rest} 
            />
      );
      case "datetime":
        return (
            <DatePicker 
             className={"mr-2"} 
             placeholder="Select Date"
            onChange={(e)=> {
              setFieldValue(`${rest.elemNameForFormik}.customFieldsValue`,e)
              setFieldValue(`${rest.elemNameForFormik}.id`,childId)
             }}
             {...rest}
             defaultValue={rest.defaultValue && rest.defaultValue.length ? rest.defaultValue[0]["customFieldsValue"]:""}
             />
      );

      case "checkbox":
        return(
          <div className="flex items-center gap-8">
          {fields?.fieldvalues.length && fields?.fieldvalues.map((field, index) =>{
            const temp = rest.defaultValue.find((value)=> value?.id === field?.id)
            const foundIndex = rest.defaultValue.findIndex((value)=>value?.id === field?.id)
            // console.log(fields?.fieldvalues,"tttt",rest.defaultValue,temp, foundIndex)
            return (
              <div className="items-center flex">
                <Checkbox 
                  className=""
                  // name={field?.customFieldsValue}
                  label={field?.customFieldsValue}
                  id={rest.name}
                  checked={(temp && temp?.isInProduct) ? true : false}
                  onChange={(e) => {
                    setFieldValue(
                      `${childNameHavingMultiChild}[${foundIndex>-1 ? foundIndex:rest.defaultValue.length +1 }].customFieldsValue`,
                      e.target.checked
                    );
                    setFieldValue(
                      `${childNameHavingMultiChild}[${foundIndex>-1 ? foundIndex: rest.defaultValue.length +1}].isInProduct`,
                      e.target.checked
                    );
                    setFieldValue(`${childNameHavingMultiChild}[${foundIndex>-1 ? foundIndex:rest.defaultValue.length +1 }].id`, field?.id);
                  }}
                />
              </div>
            )
          })}
          </div>
        );
  
      default:
        return (
          <>
            <div>Proper Element is not added, Please contact support team.</div>
          </>
        );
    }
  }