import axios from "axios";
import { jwtAxios } from "../../util/JWTutil";

export const API_SERVER_HOST = 'http://localhost:8080';

const host = `${API_SERVER_HOST}/empTodo`;

//empTodoList
export const getEmpTodo = async (empNo, selectDate) => {
    if (!selectDate || selectDate === "null" || selectDate === "") {
        console.log("errr" + selectDate);
        return []; 
    }
    const res = await jwtAxios.get(`${host}/read/${empNo}/${selectDate}`);
    return res.data;
};