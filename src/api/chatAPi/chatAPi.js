import axios from "axios";
import { jwtAxios } from "../../util/JWTutil";

export const API_SERVER_HOST =  'http://localhost:8080';
const host = `${API_SERVER_HOST}/chat`;

// 직원리스트 가져오기
export const empList = async (empNo, page = 1) => {
        const res = await jwtAxios.get(`${host}/empList/${empNo}?page=${page}`);
        return res.data;
};

// 채팅보내기
export const sendChat = async (senderEmpNo, receiverEmpNo, chatMessageDTO) => {
        const res = await jwtAxios.post(`${host}/${senderEmpNo}/${receiverEmpNo}`, chatMessageDTO);
        return res.data;
};

// 채팅방 생성하기
export const createChatRoom = async (chatDTO) => {
    const res = await jwtAxios.post(`${host}/createChatRoom`,chatDTO);
    return res.data;
}

// 채팅방 나가기(기록 삭제)
export const leaveChatRoom = async (senderEmpNo,receiverEmpNo) => {
        const res = await jwtAxios.delete(`${host}/${senderEmpNo}/${receiverEmpNo}`);
        return res.data;
}

export const getChatList = async (senderEmpNo) => {
        const res = await jwtAxios.get(`${host}/chatList/${senderEmpNo}`);
        return res.data;
}

export const sendFile = async (formData, chatNo, chatFileDTO, empNo, chatDTO) => {
        console.log("Api chatNo" + chatNo);
        console.log("api dto " + chatFileDTO);
        
        
        const res = await jwtAxios.post(`${host}/file/${chatNo}/${empNo}`,formData, chatDTO, {
                headers: {
                        'Content-Type': 'multipart/form-data',
                    },
        });
        
        return res.data;
}

export const getFileDetail = async (attachOriginName) => {
        const res = await jwtAxios.get(`${host}/fileDetail/${attachOriginName}`);
        return res.data;
}

