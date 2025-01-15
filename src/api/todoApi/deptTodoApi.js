import axios from "axios";
import { jwtAxios } from "../../util/JWTutil";

export const API_SERVER_HOST = 'http://localhost:8080';

const host = `${API_SERVER_HOST}/deptTodo`;

//deptTodoList 
export const getDeptTodo = async (empNo, deptNo ,selectDate) => {
    if (!selectDate || selectDate === "null" || selectDate === "") {
        console.log("errrr" + selectDate);
        return []; 
    }
    const res = await jwtAxios.get(`${host}/read/${empNo}/${deptNo}/${selectDate}`);
    return res.data;
};
