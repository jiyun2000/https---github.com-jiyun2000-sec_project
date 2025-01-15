import { jwtAxios } from '../util/JWTutil';

export const API_SERVER_HOST = 'http://localhost:8080';

const prefix = `${API_SERVER_HOST}/api/annualleave`;

export const getALList = async (empNo,pageParam) => {
    const [page, size] = pageParam;
    const res = await jwtAxios.get(`${prefix}/list/${empNo}`,{
        params : {
            page : page,
            size : size
        }
    });

    return res.data;
}

export const getALOne = async (empNo) => {
    const res = await jwtAxios.get(`${prefix}/read/${empNo}`);
    
    return res.data;
}

export const putALOne = async(empNo, annualLeave)=>{
    const res = await jwtAxios.put(`${prefix}/${empNo}`,annualLeave);
    return res.data;
}

export const delALOne = async(empNo)=>{
    const res = await jwtAxios.delete(`${prefix}/${empNo}`);
    return res.data;
}

export const setALOne = async(empNo)=>{
    const res = await jwtAxios.post(`${prefix}/set`,empNo);
    return res.data;
}