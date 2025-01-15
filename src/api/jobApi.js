import axios from "axios";

export const API_SERVER_HOST = 'http://localhost:8080';

const prefix = `${API_SERVER_HOST}/api/job`;

export const getList = async () => {
    const res = await axios.get(`${prefix}/list`);

    return res.data;
}

export const getOne = async (jobNo) => {
    const res = await axios.get(`${prefix}/read/${jobNo}`);
    
    return res.data;
}

export const getEmpList = async(jobNo,pageParam) => {
    const [page, size] = pageParam;
    const res = await axios.get(`${prefix}/list/${jobNo}`,{
        params : {
            page : page,
            size : size
        }
    });

    return res.data;
}

export const putOne = async(jobNo, job)=>{
    const res = await axios.put(`${prefix}/${jobNo}`,job);
    return res.data;
}

export const delOne = async(jobNo)=>{
    const res = await axios.delete(`${prefix}/${jobNo}`);
    return res.data;
}

export const addOne = async(job)=>{
    const res = await axios.post(`${prefix}/add`,job);
    return res.data;
}