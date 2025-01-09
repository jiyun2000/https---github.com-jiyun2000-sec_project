import axios from "axios";

export const API_SERVER_HOST =  'http://localhost:8080';
const host = `${API_SERVER_HOST}/chat`;

export const empList = async (empNo, page = 1) => {
        const res = await axios.get(`${host}/empList/${empNo}?page=${page}`);
        console.log(res.data);
        return res.data;
};

export const sendChat = async (senderEmpNo, receiverEmpNo, chatMessageDTO) => {
        const res = await axios.post(`${host}/${senderEmpNo}/${receiverEmpNo}`, chatMessageDTO);
        console.log( res.data);

        return res.data;
};

export const createChatRoom = async (chatDTO) => {
    const res = await axios.post(`${host}/createChatRoom`,chatDTO);
    return res.data;
}







