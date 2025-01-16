import { jwtAxios } from '../util/JWTutil';

export const API_SERVER_HOST = 'http://localhost:8080';

const prefix = `${API_SERVER_HOST}/api/board`;

export const getList = async (pageParam) => {
  const [page, size] = pageParam;
  const res = await jwtAxios.get(`${prefix}/list`, {
    params: {
      page: page,
      size: size,
    },
  });

  return res.data;
};

export const getOne = async (boardNo) => {
  const res = await jwtAxios.get(`${prefix}/read/${boardNo}`);

  return res.data;
};

export const putOne = async (boardNo, board) => {
  const res = await jwtAxios.put(`${prefix}/${boardNo}`, board);
  return res.data;
};

export const delOne = async (boardNo) => {
  const res = await jwtAxios.delete(`${prefix}/${boardNo}`);
  return res.data;
};

export const addOne = async (board) => {
  console.log(board);
  const res = await jwtAxios.post(`${prefix}/add`, board);
  return res.data;
};
