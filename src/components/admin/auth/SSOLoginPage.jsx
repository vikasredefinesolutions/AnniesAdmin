import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { login } from "redux/auth/AuthAction";

const SSOLoginPage = () => {
    const dispatch = useDispatch();

    const Auth = useSelector(store => store?.auth);

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const ourSSOToken = searchParams.get("token")

    useEffect(() => {
        if (ourSSOToken) {
            localStorage.setItem("token", ourSSOToken)
            dispatch(login({ token: ourSSOToken, isauthorized: true }));
            navigate("/admin/dashboard")
        } else {
            if (!Auth?.token) {
                if (!window.location.href.includes("ssologin?")) {
                    window.location.replace(`${process.env.REACT_APP_API_URL}/login/smallogin`)
                } else { navigate("/") }
            }
            else {
                navigate("/admin/dashboard")
            }
        }
    }, [searchParams]);

    return <div className="flex w-[100vw] h-[100vh] justify-center items-center text-lg font-bold text-gray-500 text-left leading-10">Redirecting you for Sso Login with Microsoft account.</div>
}


export default SSOLoginPage;
