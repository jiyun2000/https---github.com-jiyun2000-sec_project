import { jwtAxios } from "../util/JWTutil";

export const API_SERVER_HOST = 'http://localhost:8080';
const prefix = `${API_SERVER_HOST}/api/empImage`;

export const register = async (empImage,empNo) => {
    try {
        const res = await jwtAxios.post(`${prefix}/${empNo}`,empImage);
        console.log("api " + empNo);
    

        console.log(res.data);
        return res.data;

    } catch (error) {
        console.log(error);
        return;
    }
}    

export const getEmpImageOne = async (empNo) => {
    console.log("emp " + empNo);
    
    const res = await jwtAxios.get(`${prefix}/read/${empNo}`);
    console.log(res.data);
    
    return res.data;
}

export const viewImg = async (url) => {
    const res = await jwtAxios.get(`${prefix}/view/${url}`);
    console.log(res.data);
    
    return res.data;
} 

export const modImg = async (empNo) => {
    const res = await jwtAxios.put(`${prefix}/mod/${empNo}`);
    console.log(res.data);
    return res.data;
}