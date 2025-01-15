import { jwtAxios } from '../util/JWTutil';

export const API_SERVER_HOST = 'http://localhost:8080';

const prefix = `${API_SERVER_HOST}/api/commute`;

export const getCommuteList = async (empNo,pageParam) => {
    const [page, size] = pageParam;
    const res = await jwtAxios.get(`${prefix}/list/${empNo}`,{
        params : {
            page : page,
            size : size
        }
    });

    return res.data;
}

export const putCheckOut = async(empNo)=>{
    const res = await jwtAxios.put(`${prefix}/checkout/${empNo}`);
    return res.data;
}

export const putOne = async(empNo, commute)=>{
    const res = await jwtAxios.put(`${prefix}/modify/${empNo}`, commute);
    return res.data;
}

export const setCheckIn = async(empNo)=>{
    const res = await jwtAxios.post(`${prefix}/set/${empNo}`);
    return res.data;
}

export const getOneCommute = async(commNo) => {
    const res = await jwtAxios.get(`${prefix}/read/${commNo}`);

    return res.data;
}