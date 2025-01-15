import { jwtAxios } from '../util/JWTutil';

export const API_SERVER_HOST = 'http://localhost:8080';

const prefix = `${API_SERVER_HOST}/api/room`;

export const getList = async () => {
    const res = await jwtAxios.get(`${prefix}/list`);

    return res.data;
}

export const getOne = async (roomNo) => {
    const res = await jwtAxios.get(`${prefix}/read/${roomNo}`);
    
    return res.data;
}

export const getBookList = async(roomNo,pageParam) => {
    const [page, size] = pageParam;
    const res = await jwtAxios.get(`${prefix}/list/${roomNo}`,{
        params : {
            page : page,
            size : size
        }
    });

    return res.data;
}

export const putOne = async(roomNo, roomList)=>{
    const res = await jwtAxios.put(`${prefix}/${roomNo}`,roomList);
    return res.data;
}

export const delOne = async(roomNo)=>{
    const res = await jwtAxios.delete(`${prefix}/${roomNo}`);
    return res.data;
}

export const addOne = async(roomList)=>{
    const res = await jwtAxios.post(`${prefix}/add`,roomList);
    return res.data;
}