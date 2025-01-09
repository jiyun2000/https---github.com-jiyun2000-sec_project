import axios from "axios";

export const API_SERVER_HOST = 'http://localhost:8080';

const host = `${API_SERVER_HOST}/deptTodo`;

//deptTodoList 
export const getDeptTodo = async (empNo, deptNo ,selectDate) => {
    if (!selectDate || selectDate === "null" || selectDate === "") {
        console.error("sel" + selectDate);
        return []; 
    }
    try {
        const res = await axios.get(`${host}/read/${empNo}/${deptNo}/${selectDate}`);
        return res.data;

    } catch (error) {
        console.error("errrrrr" + error);
        throw error;
    }
};
