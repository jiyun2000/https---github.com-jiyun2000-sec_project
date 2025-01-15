import { API_SERVER_HOST } from '../util/finalValue';
import { jwtAxios } from '../util/JWTutil';

const host = `${API_SERVER_HOST}/company/mail`;
export const getDetail = async (pageParam) => {
  const { mailNo } = pageParam;
  const res = await jwtAxios.get(`${host}/r/${mailNo}`);
  return res.data;
};

export const getReceived = async (pageParam) => {
  const { mailNo } = pageParam;
  console.log(mailNo);
  const res = await jwtAxios.get(`${host}/${mailNo}/received`);
  return res.data;
};

export const getMailList = async (pageParam) => {
  const [page, size, cat, email] = pageParam;
  if (cat == 'mysend') {
    const res = await jwtAxios.get(`${host}/l/${email}`, {
      params: {
        page: page,
        size: size,
        email: email,
        cat: cat,
      },
    });
    return res.data;
  } else {
    const res = await jwtAxios.get(`${host}/l`, {
      params: {
        page: page,
        size: size,
        email: email,
        cat: cat,
      },
    });
    return res.data;
  }
};
export const getSendMailList = async (pageParam) => {
  const [page, size, email] = pageParam;
  const res = await jwtAxios.get(`${host}/l/${email}`, {
    params: {
      page: page,
      size: size,
    },
  });
  return res.data;
};
