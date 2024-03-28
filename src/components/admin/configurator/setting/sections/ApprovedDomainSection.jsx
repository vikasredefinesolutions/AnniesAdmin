import ErrorMessageText from "components/common/ErrorMessageText";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import UserSecurityService from "services/admin/security/UserSecurityService";
import RemoveIcon from "components/common/icons/RemoveIcon";
import SuccessIcon from "components/common/icons/SuccessIcon";

const ApprovedDomainSection = ({ formik }) => {
  const dispatch = useDispatch();
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    setFieldValue,
    touched,
    setFieldTouched,
  } = formik;
  const [isAddingDomain, setIsAddingDomain] = useState(false);
  const [domains, setDomains] = useState([]);

  const { id } = useSelector((state) => state.CompanyConfiguration);
  const { location, ipAddress, macAddress } = useSelector(
    (store) => store.location
  );

  const fetchDomains = async () => {
    try {
      dispatch(setAddLoading(true));
      const res = await UserSecurityService.getDomains({
        companyConfigurationId: id,
      });
      dispatch(setAddLoading(false));

      if (res.data.success) {
        res.data.data ? setDomains(res.data.data) : setDomains([]);
      }
    } catch (err) {
      console.log("exception in fetching domains: ", err);
    }
  };

  const handleAddDomain = async () => {
    if (!errors.domain) {
      dispatch(setAddLoading(true));
      const payload = {
        location,
        ipAddress,
        macAddress,
        domain: values.domain,
        companyConfigurationId: id,
        recStatus: "A",
      };
      const res = await UserSecurityService.createDomain({
        userSecurityDomainAllowModel: payload,
      });
      dispatch(setAddLoading(false));
      if (res.data.success) {
        setFieldValue("domain", "");
        setIsAddingDomain(false);
        setFieldTouched("domain", false);
        fetchDomains();
      }
      if (res.data.errors) {
        dispatch(
          setAlertMessage({
            type: "danger",
            view: true,
            message: Object.values(res.data.errors)[0],
          })
        );
      }
    }
  };
  const handleCancelAddDomain = () => {
    setIsAddingDomain(false);
    setFieldValue("domain", "");
    setFieldTouched("domain", false);
  };

  const handleRemoveSingleDomin = async (domainId) => {
    dispatch(setAddLoading(true));
    const res = await UserSecurityService.deleteDomain({ id: domainId });
    dispatch(setAddLoading(false));
    if (res.data.success) {
      setDomains((prevDomains) =>
        prevDomains.filter((domain) => domain.id !== domainId)
      );
    }
    if (res.data.errors) {
      dispatch(
        setAlertMessage({
          type: "danger",
          view: true,
          message: Object.values(res.data.errors)[0],
        })
      );
    }
  };

  useEffect(() => {
    fetchDomains();
  }, []);

  return (
    <div className="p-6 border-b-2 border-slate-200 last:border-b-0">
      <div className="flex items-center justify-between">
        <div className="tracking-wide text-gray-500 text-base font-bold">
          Approved Domains
        </div>
      </div>
      <div className="mt-2">
        <div className="mb-6 last:mb-0">
          <div className="text-sm font-medium mb-2">
            <p>
              <a className="text-indigo-500 line-through cursor-pointer">
                Single Sign-On (SSO) using Microsoft credentials
              </a>{" "}
              is enabled. Approved domains below designate:
              <ol className="pl-5">
                <li type="1">Who can log in using Microsoft Credentials</li>
                <li type="1">
                  Who can automatically be granted a Wrike license based on SCIM
                  user provisioning.
                </li>
              </ol>
            </p>
            <p>How do I approve domains? Company domains (2):</p>
            <ul className="list-disc pl-5 my-2.5">
              {domains?.map((domain, index) => (
                <div className="flex" key={index}>
                  <li>{domain.domain}</li>{" "}
                  <button
                    className="mx-2"
                    type="button"
                    onClick={() => handleRemoveSingleDomin(domain.id)}
                  >
                    <RemoveIcon />
                  </button>
                </div>
              ))}
            </ul>

            {isAddingDomain && (
              <div className="lg:w-1/3 mb-2 flex">
                <input
                  className="block w-full lg:min-w-[220px] bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md disabled:bg-slate-100"
                  id="domains"
                  type="text"
                  name="domain"
                  value={values.domain}
                  placeholder="Enter domain"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <button
                  className={`ml-2 `}
                  type="button"
                  onClick={handleCancelAddDomain}
                >
                  <RemoveIcon />
                </button>

                <button
                  className={`${values.domain ? "visible" : "invisible"}`}
                  type="button"
                  onClick={handleAddDomain}
                >
                  <SuccessIcon />
                </button>
              </div>
            )}
            {touched.domain && errors.domain && (
              <ErrorMessageText message={errors.domain} />
            )}
            <p>
              <button
                type="button"
                className="text-indigo-500"
                onClick={() => setIsAddingDomain(true)}
              >
                Add domain
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovedDomainSection;
