import axios from 'axios';
import { API_SERVER_HOST } from '../util/finalValue';

const host = `${API_SERVER_HOST}`;

export const loginPost = async (loginParam) => {
  const header = { headers: { 'Content-Type': 'x-www-form-urlencoded' } };
  const form = new FormData();

  form.append('username', loginParam.email);
  form.append('password', loginParam.pw);

  const res = await axios.post(`${host}/auth`, form, header);
  return res.data;
};
