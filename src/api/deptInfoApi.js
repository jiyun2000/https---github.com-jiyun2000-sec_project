import axios from "axios";

export const API_SERVER_HOST = 'http://localhost:8080';

const prefix = `${API_SERVER_HOST}/api/deptinfo`;

export const getList = async () => {
    const res = await axios.get(`${prefix}/list`);

    return res.data;
}

export const getOne = async (deptNo) => {
    const res = await axios.get(`${prefix}/read/${deptNo}`);
    
    return res.data;
}

export const getEmpList = async(deptNo,pageParam) => {
    const [page, size] = pageParam;
    const res = await axios.get(`${prefix}/list/${deptNo}`,{
        params : {
            page : page,
            size : size
        }
    });

    return res.data;
}

export const putOne = async(deptNo, deptInfo)=>{
    const res = await axios.put(`${prefix}/${deptNo}`,deptInfo);
    return res.data;
}

export const delOne = async(deptNo)=>{
    const res = await axios.delete(`${prefix}/${deptNo}`);
    return res.data;
}

export const addOne = async(deptNo)=>{
    const res = await axios.post(`${prefix}/add`,deptNo);
    return res.data;
}