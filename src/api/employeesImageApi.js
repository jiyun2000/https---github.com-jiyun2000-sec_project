import { jwtAxios } from "../util/JWTutil";

export const API_SERVER_HOST = 'http://localhost:8080';
const prefix = `${API_SERVER_HOST}/api/empImage`;

export const register = async (empImage) => {
    const res = await jwtAxios.post(`${prefix}`,empImage);

    console.log(res.data);
    return res.data;
}

export const getEmpImageOne = async (empNo) => {
    console.log("emp " + empNo);
    
    const res = await jwtAxios.get(`${prefix}/read/${empNo}`);
    console.log(res.data);
    
    return res.data;
}