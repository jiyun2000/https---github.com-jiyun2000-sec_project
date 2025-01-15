import axios from "axios";

export const API_SERVER_HOST = 'http://localhost:8080';

const prefix = `${API_SERVER_HOST}/api/booking`;

export const getList = async (bookType, pageParam) => {
    const [page, size] = pageParam;
    const res = await axios.get(`${prefix}/list/${bookType}`,{
        params : {
            page : page,
            size : size
        }
    });

    return res.data;
}

export const getOne = async (bookNo) => {
    const res = await axios.get(`${prefix}/read/${bookNo}`);
    
    return res.data;
}

export const putOne = async(bookNo, booking)=>{
    const res = await axios.put(`${prefix}/${bookNo}`,booking);
    return res.data;
}

export const delOne = async(bookNo)=>{
    const res = await axios.delete(`${prefix}/${bookNo}`);
    return res.data;
}

export const addOne = async(booking)=>{
    const res = await axios.post(`${prefix}/add`,booking);
    return res.data;
}