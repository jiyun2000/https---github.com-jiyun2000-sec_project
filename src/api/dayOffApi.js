import { jwtAxios } from '../util/JWTutil';

export const API_SERVER_HOST = 'http://localhost:8080';

const prefix = `${API_SERVER_HOST}/api/dayoff`;

export const getList = async (pageParam) => {
    const [page, size] = pageParam;
    const res = await jwtAxios.get(`${prefix}/list`,{
        params : {
            page : page,
            size : size
        }
    });

    return res.data;
}

export const getOne = async (dayOffNo) => {
    const res = await jwtAxios.get(`${prefix}/read/${dayOffNo}`);
    
    return res.data;
}

export const putOne = async(dayOffNo, dayOff)=>{
    const res = await jwtAxios.put(`${prefix}/${dayOffNo}`,dayOff);
    return res.data;
}

export const delOne = async(dayOffNo)=>{
    const res = await jwtAxios.delete(`${prefix}/${dayOffNo}`);
    return res.data;
}

export const addOne = async(dayOff)=>{
    const res = await jwtAxios.post(`${prefix}/add`,dayOff);
    return res.data;
}