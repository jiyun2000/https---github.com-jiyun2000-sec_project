import axios from "axios";
import { jwtAxios } from "../../util/JWTutil";

export const API_SERVER_HOSt =  'http://localhost:8080';
const host = `${API_SERVER_HOSt}/deptSchedule`;

//deptSchedule 등록
export const postDeptSchedule = async (deptScheObj, empNo, deptNo) => {
    const res = await jwtAxios.post(`${host}/register/${empNo}/${deptNo}`, deptScheObj);
    return res.data;
};

//deptSchedule 수정
export const putDeptSchedule = async (deptScheduleObj, deptNo, empNo, deptSchNo) => {
    const res = await jwtAxios.put(`${host}/mod/${deptNo}/${empNo}/${deptSchNo}`,deptScheduleObj);
    return res.data;
};

//deptSchedule 삭제
export const deleteDeptScheduleOne = async(deptNo, deptSchNo) => {
    const res = await jwtAxios.delete(`${host}/delete/${deptNo}/${deptSchNo}`,deptNo,deptSchNo);
    return res.data;
}

//deptSchedule 한 개 가져오기
export const getDeptScheduleById = async (deptNo,empNo, deptSchNo) => {
    const res = await jwtAxios.get(`${host}/read/${deptNo}/${empNo}/${deptSchNo}`);
    return res.data;
}