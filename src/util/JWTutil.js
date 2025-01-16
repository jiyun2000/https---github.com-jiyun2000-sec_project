import axios from 'axios';
import { getCookie, setCookie } from './cookieUtil';
import { API_SERVER_HOST } from './finalValue';

export const jwtAxios = axios.create();

const refreshJWTToken = async () => {

  const refreshToken = {
    refreshToken: getCookie('member').refreshToken,
  };
  const returned = await axios.get(`${API_SERVER_HOST}/auth/refresh`, {
    params: refreshToken,
  });
  console.log(returned.data);
  return returned.data;
};

const beforeReq = (config) => {
  console.log('before request');
  config.headers.Authorization = `bearer ${getCookie('member').accessToken}`;
  return config;
};
const requestFail = (err) => {
  console.log('fail request');
  console.log(err);
  
  return err;
};

const beforeRes = async (config) => {
  console.log('before response');
  const data = config.data;
  if (data && data.error === 'ERROR_TOKEN_ACCESS') {
    const memberCookieValue = getCookie('member');

    const refreshReturn = await refreshJWTToken();

    memberCookieValue.accessToken = refreshReturn.accessToken;
    memberCookieValue.refresheToken = refreshReturn.refresheToken;

    setCookie('member', JSON.stringify(memberCookieValue), 1);

    const originalRequest = config.config;

    originalRequest.headers.Authorization = `Bearer ${refreshReturn.accessToken}`;
  }

  return config;
};
const responseFail = (err) => {
  console.log('fail request');
  return err;
};

jwtAxios.interceptors.request.use(beforeReq, requestFail);
jwtAxios.interceptors.response.use(beforeRes, responseFail);
