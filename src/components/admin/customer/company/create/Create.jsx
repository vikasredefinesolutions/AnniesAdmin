import React from "react";
import RightSidebar from "./RightSidebar";
import { Formik, Form as FormikForm } from "formik";
import { useState } from "react";
import { RecStatusValuebyName } from "global/Enum";
import { NavLink } from "react-router-dom";
import * as Yup from "yup"
import { ValidationMsgs } from "global/ValidationMessages";
import Input from "components/common/formComponent/Input";
import EditCustomer from "./EditCustomer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { serverError, TitleNameHelper } from "services/common/helper/Helper";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";

import CompanyInformationService from "services/admin/companyInformation/CompanyInformationServices";
import Message from "components/common/alerts/messages/Index"
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import StateService from "services/admin/state/StateService";
import CountryService from "services/admin/country/CountryService";
import { useEffect } from "react";
import Dropdown from "components/common/formComponent/Dropdown";

const Create = () => {
  let navigate = useNavigate();
  const GlobalLoading = useSelector((store) => store?.GlobalLoaderReducer?.toLoad);

  const { id } = useParams();
  const isAddMode = !id;
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [showEditCustomer, setShowEditCustomer] = useState(false);

  const regexForURL =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

  const schema = Yup.object().shape({
    corporateName: Yup.string().trim().required(ValidationMsgs.company.corporateName),
    address1: Yup.string().trim().required(ValidationMsgs.company.address1),
    state: Yup.string().trim().required(ValidationMsgs.company.state),
    OtherState: Yup.string().trim().when("state", {
      is: (val) => val === "Other" ? true : false,
      then: Yup.string().trim().required(ValidationMsgs.common.stateRequired)
    }),
    city: Yup.string().trim().required(ValidationMsgs.company.city),
    // countryCode: Yup.string().trim().required(ValidationMsgs.company.countryCode),
    zipCode: Yup.string().trim().required(ValidationMsgs.company.zipCode),
    countryName: Yup.string().trim().required(ValidationMsgs.company.country),
    email: Yup.string().trim().email(ValidationMsgs.common.Email).required(ValidationMsgs.common.emailRequired),
    webSite: Yup.string().trim().matches(regexForURL, ValidationMsgs.vendor.websiteMatches),
    recStatus: Yup.string().trim().required(ValidationMsgs.common.recStatusRequired),
  });

  const location = useSelector((store) => store?.location);
  const [isDesabledAddCatalog, setisDesabledAddCatalog] = useState("");

  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const getCountry = () => {
    CountryService.getCountryWithCode().then((response) => {
      if (response?.data?.success && response?.data?.data) {
        setCountry(() => {
          return response?.data?.data?.map(value => {
            return {
              ...value,
              label: value.name,
              value: value.name,
              countryCode: value.countryCode,
            }
          })
        });
      }
    }).catch(() => { });
  }

  const getState = (countryName) => {
    if (countryName) {
      StateService.getStateByCountryName(countryName).then((response) => {
        if (response?.data?.success && response?.data?.data) {

          let StatesData = response?.data?.data?.map(value => {
            return {
              label: value.label,
              value: value.label,
            }
          })


          setState([{ label: "Other", value: "Other" }, ...StatesData]);
        }
      }).catch(() => { });
    } else {
      setState([]);
    }
  }
  useEffect(() => {
    getCountry();
  }, []);
  useEffect(() => {
    getState("United States");
  }, []);

  const createCompanyInformation = (fields, resetForm) => {
    let StateValue = fields.state !== "Other" ? fields.state : fields.OtherState

    dispatch(setAddLoading(true))
    CompanyInformationService.createCompanyInformation({ ...fields, state: StateValue, ...location })
      .then((response) => {
        if (response.data.success) {
          setisDesabledAddCatalog(response.data.data.id);
          navigate(
            `/admin/customer/company/edit/${response.data.data.id}`
          );
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.company.created,
            })
          );
          resetForm({});
        } else {
          dispatch(
            setAlertMessage({ type: "danger", message: serverError(response) })
          );
        }
        dispatch(setAddLoading(false))
      })
      .catch((errors) => {
        dispatch(
          setAlertMessage({
            type: "danger",
            message: ValidationMsgs.company.notCreated,
          })
        );
        dispatch(setAddLoading(false))
      });
  };

  const submitHandler = (values, { resetForm }) => {
    createCompanyInformation(values, resetForm)
  }

  return (
    <>
      <title>{isAddMode ? "Add " : "Edit "} {TitleNameHelper({ defaultTitleName: "Company Information" })}</title>

      <Formik
        enableReinitialize={true}
        initialValues={{
          id: data?.id || 0,
          corporateName: data?.corporateName || "",
          departmentName: data?.departmentName || "",
          address1: data?.address1 || "",
          address2: data?.address2 || "",
          suite: data?.suite || '',
          city: data?.city || '',
          state: data?.state || 'Alabama',
          zipCode: data?.zipCode || '',
          countryName: data?.countryName || "United States",
          countryCode: data?.countryCode || '',
          webSite: data?.webSite || '',
          email: data?.email || '',
          phone: data?.phone || '',
          fax: data?.fax || '',
          tax: data?.tax || false,
          tags: data?.tags || '',
          recStatus: data?.recStatus || RecStatusValuebyName.Active,
          rowVersion: data?.rowVersion || "",
          isTaxEnable: data?.isTaxEnable || false,
          createdDate: data?.createdDate || "",
          createdBy: data.createdBy || 0,
          modifiedDate: data.modifiedDate || "",
          modifiedBy: data.modifiedBy || 0,
          OtherState: data?.state || "",
        }}
        onSubmit={submitHandler}
        validationSchema={schema}
        validateOnMount={true}
      >
        {({ errors, setFieldValue, values }) => {
          return (
            <FormikForm>
              <div className="px-4 sm:px-6 lg:px-8 py-8 w-full">
                <div className="sm:flex sm:justify-between sm:items-center mb-8">
                  <div className=" flex items-center">
                    <Link
                      to="/admin/customer/company"
                      className="btn border-neutral-200 hover:border-neutral-400 text-gray-500 hover:text-gray-700 flex items-center mr-2"
                    >
                      <span className="material-icons-outlined">west</span>
                    </Link>
                    <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
                      {isAddMode ? "Add " : "Edit "} {TitleNameHelper({ defaultTitleName: "Company Information" })}
                    </h1>
                  </div >
                  <div className="flex flex-wrap items-center space-x-2">
                    <button
                      disabled={GlobalLoading}
                      type="submit" className={`flex justify-center btn px-6 bg-indigo-500 hover:bg-indigo-600 text-white ${(GlobalLoading) ? "bg-indigo-200 hover:bg-indigo-200" : "cursor-pointer"}`}
                      onClick={() => {
                        dispatch(setAlertMessage({ type: "danger", message: serverError({ data: { errors: errors } }) }));
                      }}
                    >
                      <div className={`w-full flex justify-center align-middle `}>
                        {GlobalLoading && (
                          <span className="spinner-border spinner-border-sm mr-2"></span>
                        )}
                        Save
                      </div>
                    </button>
                    <NavLink to={'/admin/Customer/company/'} className="btn h-10 bg-white border-neutral-200 hover:border-neutral-300 text-gray-500 hover:text-gray-600">Cancel</NavLink>
                  </div>

                </div >
                <Message />
                {/* <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-9"> */}
                <div className="bg-white shadow-xxl rounded-md p-6 mb-6">
                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 md:col-span-6">
                      <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">Corporate Name <span className="text-rose-500 text-2xl leading-none">*</span></label>
                      <Input name={'corporateName'} className="block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md" type="text" placeholder="Corporate Name" />
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">Department Name</label>
                      <Input name={'departmentName'} className="block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md" type="text" placeholder="Department Name" />
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">Address 1 <span className="text-rose-500 text-2xl leading-none">*</span></label>
                      <Input name={'address1'} className="block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md" type="text" placeholder="Address 01" />
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">Address 2 <span className="text-rose-500 text-2xl leading-none"></span></label>
                      <Input name={'address2'} className="block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md" type="text" placeholder="Address 02" />
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">Apt/ Suite# <span className="text-rose-500 text-2xl leading-none"></span></label>
                      <Input name={'suite'} className="block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md" type="text" placeholder="Apt/ Suite#" />
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">City <span className="text-rose-500 text-2xl leading-none">*</span></label>
                      <Input name={'city'} className="block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md" type="text" placeholder="City" />
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">Country <span className="text-rose-500 text-2xl leading-none">*</span></label>
                      {/* <Input name={'countryName'} className="block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md" type="text" placeholder="Country" /> */}
                      <Dropdown
                        options={country}
                        defaultValue={values?.countryName || ''}
                        isClearable={false}
                        name={`countryName`}
                        onChange={(e) => {
                          setFieldValue(`countryName`, (e ? e.value : ''));
                          setFieldValue(`countryCode`, e ? e?.countryCode : '');
                          getState(e?.value);
                          setFieldValue(`state`, '');
                        }}
                      />
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">Postal Code <span className="text-rose-500 text-2xl leading-none">*</span></label>
                      <Input name={'zipCode'} className="block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md" type="text" placeholder="Postal Code" />
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">State <span className="text-rose-500 text-2xl leading-none">*</span></label>
                      {/* <Input name={'state'} className="block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md" type="text" placeholder="State" /> */}
                      <Dropdown
                        options={state}
                        defaultValue={values?.state || ''}
                        isClearable={false}
                        name={`state`}
                        onChange={(e) => {
                          setFieldValue(`state`, (e ? e.value : ''));
                        }}
                      />
                    </div>
                    {values.state === "Other" &&
                      <div className="col-span-12 md:col-span-6">
                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">Other State <span className="text-rose-500 text-2xl leading-none">*</span></label>
                        {/* <Input name={'OtherState'} className="block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md" type="text" placeholder="Postal Code" /> */}
                        <Input type="text" name={'OtherState'} maxLength={200}
                          defaultValue={values?.OtherState}
                          // value={data?.state}
                          onChange={(e) => {
                            setFieldValue(`OtherState`, (e ? e.target.value : ""))
                          }} />
                      </div>
                    }
                    <div className="col-span-12 md:col-span-6">
                      <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">Country Code <span className="text-rose-500 text-2xl leading-none"></span></label>
                      <Input name={'countryCode'} className="block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md" type="text" placeholder="Country Code" />
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">Enter Website</label>
                      <Input name="webSite" className="block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md" type="text" placeholder="Enter Website" />
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">Email <span className="text-rose-500 text-2xl leading-none">*</span></label>
                      <Input name={'email'} className="block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md" type="email" placeholder="Email" />
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">Phone</label>
                      <Input name={'phone'} className="block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md" type="text" placeholder="000-000-0000" />
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">Fax</label>
                      <Input name={'fax'} className="block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md" type="text" placeholder="000-000-0000" />
                    </div>
                  </div>
                </div>
              </div >
              {/* <div className="col-span-3">
                    <RightSidebar />
                  </div> */}
              {/* </div>
              </div> */}
            </FormikForm >
          )
        }}
      </Formik >
      {showEditCustomer && <EditCustomer showEditCustomer={showEditCustomer} setShowEditCustomer={setShowEditCustomer} />}
    </>
  );
};

export default Create;
