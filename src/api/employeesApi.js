import { jwtAxios } from '../util/JWTutil';

export const API_SERVER_HOST = 'http://localhost:8080';

const prefix = `${API_SERVER_HOST}/api/employees`;

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

export const getFindList = async (pageParam, name) => {
    const [page, size] = pageParam;
    const res = await jwtAxios.get(`${prefix}/findList/${name}`,{
        params : {
            page:page,
            size:size
        }
    });

    return res.data;
}


export const getOneEmp = async (empNo) => {
    const res = await jwtAxios.get(`${prefix}/read/${empNo}`);
    return res.data;
}

export const putOne = async(empNo, employees)=>{
    const res = await jwtAxios.put(`${prefix}/${empNo}`,employees);
    return res.data;
}

export const delOne = async(empNo)=>{
    const res = await jwtAxios.delete(`${prefix}/${empNo}`);
    return res.data;
}

export const addOne = async(employees)=>{
    const res = await jwtAxios.post(`${prefix}/add`,employees);
    return res.data;
}

export const addFiles = async(files)=>{
    const res = await jwtAxios.post(`${prefix}/add/excel`,files);
    return res.data;
}

export const getAllList = async()=>{
    const res = await jwtAxios.get(`${prefix}/list/all`);
    return res.data;
}

export const getDDay = async(empNo) => {
    const res = await jwtAxios.get(`${prefix}/dday/${empNo}`);
    return res.data;
}

export const getBirth = async(pageParam) => {
    const [page, size] = pageParam;
    const res = await jwtAxios.get(`${prefix}/birth`,{
        params : {
            page : page,
            size : size
        }
    });
    return res.data;
}

export const mailCheck = async(employees)=>{
    console.log(`${prefix}/check`);
    const res = await jwtAxios.post(`${prefix}/check`,employees)
    return res.data;
}