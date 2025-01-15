import axios from "axios";

export const API_SERVER_HOST = 'http://localhost:8080';

const prefix = `${API_SERVER_HOST}/api/room`;

export const getList = async () => {
    const res = await axios.get(`${prefix}/list`);

    return res.data;
}

export const getOne = async (roomNo) => {
    const res = await axios.get(`${prefix}/read/${roomNo}`);
    
    return res.data;
}

export const getBookList = async(roomNo,pageParam) => {
    const [page, size] = pageParam;
    const res = await axios.get(`${prefix}/list/${roomNo}`,{
        params : {
            page : page,
            size : size
        }
    });

    return res.data;
}

export const putOne = async(roomNo, roomList)=>{
    const res = await axios.put(`${prefix}/${roomNo}`,roomList);
    return res.data;
}

export const delOne = async(roomNo)=>{
    const res = await axios.delete(`${prefix}/${roomNo}`);
    return res.data;
}

export const addOne = async(roomList)=>{
    const res = await axios.post(`${prefix}/add`,roomList);
    return res.data;
}