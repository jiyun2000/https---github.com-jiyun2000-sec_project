import axios from "axios";

export const API_SERVER_HOST = 'http://localhost:8080';

const prefix = `${API_SERVER_HOST}/api/employees`;

export const getList = async (pageParam) => {
    const [page, size] = pageParam;
    const res = await axios.get(`${prefix}/list`,{
        params : {
            page : page,
            size : size
        }
    });

    return res.data;
}

export const getOne = async (empNo) => {
    const res = await axios.get(`${prefix}/read/${empNo}`);
    
    return res.data;
}

export const putOne = async(empNo, employees)=>{
    const res = await axios.put(`${prefix}/${empNo}`,employees);
    return res.data;
}

export const delOne = async(empNo)=>{
    const res = await axios.delete(`${prefix}/${empNo}`);
    return res.data;
}

export const addOne = async(employees)=>{
    const res = await axios.post(`${prefix}/add`,employees);
    return res.data;
}