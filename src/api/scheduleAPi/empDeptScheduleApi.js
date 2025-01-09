import axios from "axios";
export const API_SERVER_HOST = 'http://localhost:8080';

const host = `${API_SERVER_HOST}/empDeptSchedule`;

//empSchedule + deptSchedule 전체 list 가져오기
export const getList = async(deptNo,empNo) => {
    const res = await axios.get(`${host}/read/${deptNo}/${empNo}`);
    return res.data;
}

//empSchedule + deptSchedule 전체에서 오늘 날짜에 해당하는 list 가져오기
export const getTodayList = async (deptNo, empNo, selectDate) => {
    if (!selectDate || selectDate === "null" || selectDate === "") {
        console.error("sel" + selectDate);
        return []; 
    }
    try {
        const res = await axios.get(`${host}/list/${deptNo}/${empNo}/${selectDate}`);
        return res.data;
    } catch (error) {
        console.error("errrrrr" + error);
        throw error;
    }
};