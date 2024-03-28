import ToggleButton from "components/common/formComponent/ToggleButton";
import { RecStatusValue, RecStatusValuebyName, UpdateMessage } from "global/Enum";
import { Formik, Form as FormikForm } from "formik";
import Select from "components/common/formComponent/Select";
import { useDispatch, useSelector } from "react-redux";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { ValidationMsgs } from "global/ValidationMessages";
import { UpdateJsonDetails, serverError } from "services/common/helper/Helper";
import { CategoryStatusData } from "dummy/Dummy";
import CategoryServiceCls from "services/admin/category/CategoryService";
import TopicsDetailsServicesCls from "services/admin/topics/TopicsDetailsServices";
import { anniesAnnualData } from "global/Enum";

const SideBar = ({
  values,
  getCategoryData,
  updateCategorySingleField,
  isAddMode,
  CategoryService,
}) => {
  const dispatch = useDispatch();
  const location = useSelector((store) => store?.location);
  const permission = useSelector((store) => store.permission);
  const id = values.id;

  const statusChangedHandler = (status) => {
    dispatch(setAddLoading(true));

    const object = {
      id: values.id,
      status: status.value,
      rowVersion: values.rowVersion,
    };
    CategoryService.updateStatus({
      args: { ...object, ...location },
    })
      .then((response) => {
        if (response?.data?.success) {
          UpdateJsonDetails(dispatch,UpdateMessage.categoryStatusUpdated.message)
          getCategoryData();
        } else {
          dispatch(
            setAlertMessage({
              type: "danger",
              message: serverError(response),
            })
          );
        }
        dispatch(setAddLoading(false));
      })
      .catch((errors) => {
        dispatch(
          setAlertMessage({
            type: "danger",
            message: ValidationMsgs.category.categoryStatusNotUpdated,
          })
        );
        dispatch(setAddLoading(false));
      });
  };

  const handleProductStatusToggle = (data) => {
    // console.log("Data", data?.target?.name);
    // console.log("Data_1", data?.target?.checked);
    if (!permission?.isEdit && !permission?.isDelete) {
      return;
    }
    const obj = [
      {
        path: `/${data.target.name}`,
        op: "Replace",
        value: `${data.target.checked}`,
        from: "",
      },
    ];
    dispatch(setAddLoading(true));
    updateCategorySingleField(id, obj)
      .then((response) => {
        if (response.data.success) {
          UpdateJsonDetails(dispatch,UpdateMessage.categoryStatusUpdated.message)
        } else {
          dispatch(
            setAlertMessage({ type: "danger", message: serverError(response) })
          );
        }
        getCategoryData();
        dispatch(setAddLoading(false));
      })
      .catch((errors) => {
        dispatch(
          setAlertMessage({
            type: "danger",
            message: ValidationMsgs.category.categoryStatusNotUpdated,
          })
        );
        dispatch(setAddLoading(false));
      });
  };

  return (
    <>
      <div className="w-full bg-white shadow-lg rounded-md border border-neutral-200 mb-6">
        <div className="p-6 border-b-2 border-neutral-200">
          <div className="block uppercase tracking-wide text-gray-500 text-base font-bold mb-2">
            Product Status
          </div>
          <Select
            options={RecStatusValue}
            onChange={(e) => statusChangedHandler(e)}
            name="recStatus"
            defaultValue={
              isAddMode ? RecStatusValuebyName.Active : values?.recStatus
            }
            isClearable={false}
            isDisabled={
              isAddMode ||
              (!permission?.isEdit && !permission?.isDelete && isAddMode)
            }
          />
        </div>
      </div>
      {!isAddMode && (
        <div className="w-full bg-white shadow rounded-md border border-neutral-200 mb-6">
          <Formik>
            {({}) => {
              return (
                <FormikForm>
                  <div className="p-6">
                    <div className="block uppercase tracking-wide text-gray-500 text-base font-bold mb-2">
                      Category Flag
                    </div>
                    <div>
                      <div className="overflow-auto max-h-screen">
                        {CategoryStatusData.map((productStatus, index) => (
                          <div
                            className="grid grid-cols-12 gap-4 mb-4 last:mb-0"
                            key={index}
                          >
                            <div className="col-span-full sm:col-span-8 xl:col-span-8">
                              <label className="text-gray-500">
                                {productStatus.name}
                              </label>
                            </div>
                            <div className="col-span-full sm:col-span-4 xl:col-span-4">
                              <div className="flex items-center">
                                <ToggleButton
                                  id={`productStatus${index}`}
                                  onChange={(e) => handleProductStatusToggle(e)}
                                  defaultValue={values[productStatus.dbfield]}
                                  name={productStatus.dbfield}
                                  on={"Yes"}
                                  off={"No"}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </FormikForm>
              );
            }}
          </Formik>
        </div>
      )}
    </>
  );
};

export default SideBar;
