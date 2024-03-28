import axios from "axios";
import { useSelector } from "react-redux";
import authHeader from "services/admin/auth/AuthHeader";

// Dev
const defaultBaseAPI = "https://anniesadminapi.redefineapp.io/"
const defaultFrontBaseAPI = "https://anniesfrontapi.redefineapp.io/";
// End

// Beta
// const defaultBaseAPI = "https://beta-anniesadminapi.redefineapp.io/"; 
// const defaultFrontBaseAPI = "https://beta-anniesfrontapi.redefineapp.io/"; 
// End

// Live
// const defaultBaseAPI = "https://adminapi.anniesannuals.com/"; 
// const defaultFrontBaseAPI = "https://frontapi.anniesannuals.com/"; 
// End


export const AzureBlobUrl = 'https://redefinecommerce.blob.core.windows.net';

export const fileUploadAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL ?? defaultBaseAPI + "upload/image",
  headers: {
    Accept: "application/json",
    ...authHeader(),
  },
});

export const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL ?? defaultBaseAPI,
});

const FrontApiURL = localStorage.getItem('FrontApiURL');
export const FrontAPI = axios.create({
  baseURL: FrontApiURL,
});

export const PublicAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL ?? defaultBaseAPI,
  headers: {
    Accept: "application/json",
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Credentials': true,
    // 'Access-Control-Request-Private-Network': true,
    'Access-Control-Allow-Private-Network': true
  },
});
