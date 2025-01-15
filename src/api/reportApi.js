import { jwtAxios } from '../util/JWTutil';

export const API_SERVER_HOST = 'http://localhost:8080';

const prefix = `${API_SERVER_HOST}/api/report`;

export const getReceivedList = async (empNo,pageParam) => {
    const [page, size] = pageParam;
    const res = await jwtAxios.get(`${prefix}/list/received/${empNo}`,{
        params : {
            page : page,
            size : size
        }
    });

    return res.data;
}

export const getSentList = async (empNo,pageParam) => {
    const [page, size] = pageParam;
    const res = await jwtAxios.get(`${prefix}/list/sent/${empNo}`,{
        params : {
            page : page,
            size : size
        }
    });

    return res.data;
}

export const getOne = async (reportNo) => {
    const res = await jwtAxios.get(`${prefix}/read/${reportNo}`);
    
    return res.data;
}

export const putOne = async(reportNo, report)=>{
    const res = await jwtAxios.put(`${prefix}/modify/${reportNo}`,report);
    return res.data;
}

export const addReport = async(empNo,employees)=>{
    const header = {
        headers : {"Content-Type" : "multipart/form-data"}
      };
    const res = await jwtAxios.post(`${prefix}/register/${empNo}`,employees,header);
    return res.data;
}