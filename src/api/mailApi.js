import { getCookie } from '../util/cookieUtil';
import { API_SERVER_HOST } from '../util/finalValue';
import { jwtAxios } from '../util/JWTutil';

const host = `${API_SERVER_HOST}/company/mail`;

export const sendMail = async (pageParam) => {
  const { selectedEmail, files } = pageParam;
  const form = new FormData();
  files.map((item) => {
    form.append('files', item.file);
  });
  const receiveEmpNo = [];
  selectedEmail.map((item) => {
    receiveEmpNo.push(item.empNo);
  });
  const headers = {
    'Content-type': 'multipart/form-data',
  };
  const title = sessionStorage.getItem('titleTA');
  const content = sessionStorage.getItem('contentTA');
  console.log(selectedEmail);
  console.log(files);
  console.log(title);
  console.log(content);
  console.log(getCookie('member'));

  form.append('sendEmpNo', getCookie('member').email);
  form.append('contents', content);
  form.append('title', title);
  form.append('mailCategory', 'std');
  form.append('receiveEmpNo', receiveEmpNo);

  const res = await jwtAxios.post(`${host}`, form, headers);

  return res.data;
};

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

export const findReceivers = async (pageParam) => {
  const email = pageParam;
  const res = await jwtAxios.get(`${host}/receiver`, {
    params: {
      email: email,
    },
  });
  return res.data;
};
export const changeCat = async (mailNo, modCat) => {
  const res = await jwtAxios.put(`${host}/m`, null, {
    params: {
      category: modCat,
      mailNo: mailNo,
    },
  });
};

export const deleteMail = async (mailNo) => {
  let cat = 'isDelete';
  const res = await jwtAxios.put(`${host}/m`, null, {
    params: {
      category: cat,
      mailNo: mailNo,
    },
  });
};
export const getAttached = async ({ mailNo }) => {
  const res = await jwtAxios.get(`${host}/${mailNo}/attcfile`);
  return res.data;
};
