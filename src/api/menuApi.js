import { jwtAxios } from "../util/JWTutil";

export const API_SERVER_HOSt = 'http://localhost:8080';
const host = `${API_SERVER_HOSt}/menu`;

export const getTodayMenu = async(menuDate) => {
    const dateStr = menuDate.toISOString().split('T')[0];
    const res = await jwtAxios.get(`${host}/read/${dateStr}`);
    //console.log(res);
    return res;
}

export const addMenu = async(menuDTO) => {
    const res = await jwtAxios.post(`${host}/add`,menuDTO);
    console.log(res);
    return res;
}

export const listMenu = async(pageParam) => {
    const [page,size] = pageParam;
    const res = await jwtAxios.get(`${host}/list`,{
        params : {
            page : page,
            size : size
        }
    });
    return res.data;
}

export const getOne = async(menuNo) => {
    console.log(menuNo);
    const res = await jwtAxios.get(`${host}/readMenu/${menuNo}`);
    console.log(res);
    return res.data;
}

export const delOne = async(menuNo) => {
    const res = await jwtAxios.delete(`${host}/${menuNo}`);
    return res.data;
}

export const putOne = async(menuNo, menu) => {
    const res = await jwtAxios.put(`${host}/${menuNo}`,menu);
    return res.data;
}