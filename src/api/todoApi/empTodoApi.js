import axios from "axios";

export const API_SERVER_HOST = 'http://localhost:8080';

const host = `${API_SERVER_HOST}/empTodo`;

//empTodoList
export const getEmpTodo = async (empNo, selectDate) => {
    if (!selectDate || selectDate === "null" || selectDate === "") {
        console.error("sel" + selectDate);
        return []; 
    }
    
    try {
        const res = await axios.get(`${host}/read/${empNo}/${selectDate}`);
        return res.data;

    } catch (error) {
        console.error("errrrrr" + error);
        throw error;
    }
};