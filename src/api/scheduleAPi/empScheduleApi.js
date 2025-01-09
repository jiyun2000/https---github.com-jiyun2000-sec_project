import axios from "axios";

export const API_SERVER_HOSt = 'http://localhost:8080';
const host = `${API_SERVER_HOSt}/empSchedule`;

//empSchedule 스케줄 등록
export const postEmpScheule = async(empScheObj,empNo) => {
    const res = await axios.post(`${host}/register/${empNo}`, empScheObj);
    return res.data;
}

//empSchedule 수정
export const putEmpScheduleOne = async (empScheObj, empNo, empSchNo) => {
    const res = await axios.put(`${host}/mod/${empNo}/${empSchNo}`, empScheObj);  
    return res.data;
};

//empSchedule 삭제
export const deleteScheduleOne = async (empNo, empSchNo) => {
    const res = await axios.delete(`${host}/${empNo}/${empSchNo}`);
    return res.data;
}

//empSchedule 한 개 가져오기
export const getEmpScheduleById = async (empNo, empSchNo) => {
    const res = await axios.get(`${host}/read/${empNo}/${empSchNo}`);
    return res.data;
};
