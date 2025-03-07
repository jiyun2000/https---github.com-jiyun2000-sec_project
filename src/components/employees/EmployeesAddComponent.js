import { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { addOne, mailCheck } from "../../api/employeesApi";
import { setALOne } from "../../api/annualLeaveApi";
import { getJobList } from "../../api/jobApi";
import { getDeptList } from "../../api/deptInfoApi";
import { getCookie, removeCookie } from '../../util/cookieUtil';
import mail from "../../assets/icon/mail.png";
import chat from "../../assets/icon/chat.png";
import BoardTitleComponent from '../board/BoardTitleComponent';
import { Link, useNavigate } from 'react-router-dom';
import colorChat from "../../assets/icon/colorChat.png";

const initState = {
    empNo : 0 ,
    firstName : '',
    lastName : '',
    hireDate : '',
    mailAddress : '',
    salary : 0,
    deptNo : 0,
    jobNo : 0,
    birthday : '',
    address : '',
    phoneNum : '',
    gender : 'm',
    citizenId : '',
    password : ''
}

const initStateJob = {
    jobNo : 0,
    jobTitle : ''
}

const initStateDeptinfo = {
    deptNo : 0,
    deptName : '',
    deptAddress : '',
    phoneNo : ''
}

const EmployeesAddComponent = () => {
    const [employees, setEmployees] = useState({...initState});
    const [checkPw, setCheckPw] = useState("");
    const [job, setJob] = useState([initStateJob]);
    const [checkPassword, setCheckPassword] = useState("");
    const [deptInfo, setDeptInfo] = useState([initStateDeptinfo]);
    const [checkMail, setCheckMail] = useState("");
    const [empNo, setEmpNo] = useState(getCookie("member").empNo);
    const { moveToList } = useCustomMove();
    const navigate = useNavigate();
    const [chatCntCook, setChatCntCook] = useState(getCookie("alert"));

    useEffect(() => {
        getJobList().then(res => {
            setJob(res);
        });
        getDeptList().then(res => {
            setDeptInfo(res);
        });
    }, [employees]);

    const handleClickAdd = () => {
        addOne(employees).then((data) => {
            setALOne(data).then(() => {
                alert("등록되었습니다.");
                moveToList();
            });
        });
    };

    const handleChangePassword = (evt) => {
        setCheckPw(evt.target.value);
    };

    useEffect(() => {
        if (checkPw !== "") {
            if (checkPw === employees.password) {
                setCheckPassword("ok");
            } else {
                setCheckPassword("no");
            }
        }
    }, [checkPw, employees.password]);

    const handleChangeEmployees = (evt) => {
        employees[evt.target.name] = evt.target.value;
        setEmployees({ ...employees });
    };

    const goToBoardList = () => {
        navigate(`/board/list`);
    };

    const checkRemove = () => {
        removeCookie("alert");
    };

    const handleClickCheck = () => {
        mailCheck(employees).then((res) => {
            if (res === 0) {
                setCheckMail("ok");
            } else {
                setCheckMail("no");
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center space-x-8">
                        <div className="text-3xl font-semibold text-blue-800 cursor-pointer" onClick={goToBoardList}>
                            [공지사항]
                        </div>
                        <div className="text-3xl font-semibold">
                            <BoardTitleComponent />
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <Link to="/mail" className="w-12 cursor-pointer">
                            <img src={mail} alt="Mail" className="w-full" />
                        </Link>
                        <Link to={`/chat/empList/${empNo}?page=1`} className="w-12 cursor-pointer" onClick={checkRemove}>
                            {chatCntCook ?
                                <img src={colorChat} alt='colorChat' className='w-full' /> :
                                <img src={chat} alt="Chat" className="w-full" />
                            }
                        </Link>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-md max-w-3xl mx-auto">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-6">직원 등록</h1>

                    {/* 성 */}
                    <div className="flex items-center mb-4">
                        <label className="w-32 text-lg font-medium text-gray-700" htmlFor="firstName">성</label>
                        <input
                            className="flex-grow p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="firstName"
                            type="text"
                            value={employees.firstName}
                            onChange={handleChangeEmployees}
                        />
                    </div>

                    {/* 이름 */}
                    <div className="flex items-center mb-4">
                        <label className="w-32 text-lg font-medium text-gray-700" htmlFor="lastName">이름</label>
                        <input
                            className="flex-grow p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="lastName"
                            type="text"
                            value={employees.lastName}
                            onChange={handleChangeEmployees}
                        />
                    </div>

                    {/* 메일 주소 */}
                    <div className="flex items-center mb-4">
                        <label className="w-32 text-lg font-medium text-gray-700" htmlFor="mailAddress">메일 주소</label>
                        <div className="flex-grow flex items-center gap-3">
                            <input
                                className="flex-grow p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="example@abc.com"
                                name="mailAddress"
                                type="text"
                                value={employees.mailAddress}
                                onChange={handleChangeEmployees}
                            />
                            <button
                                className="px-4 py-2 border rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
                                onClick={handleClickCheck}
                            >
                                중복 확인
                            </button>
                        </div>
                    </div>

                    {/* 중복 확인 메시지 */}
                    {checkMail && (
                        <div className="text-right mb-4 text-sm">
                            {checkMail === "ok" ? (
                                <span className="text-green-600 font-medium">사용 가능한 메일 주소입니다.</span>
                            ) : (
                                <span className="text-red-600 font-medium">이미 존재하는 메일 주소입니다.</span>
                            )}
                        </div>
                    )}

                    {/* 연봉 */}
                    <div className="flex items-center mb-4">
                        <label className="w-32 text-lg font-medium text-gray-700" htmlFor="salary">연봉</label>
                        <input
                            className="flex-grow p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="salary"
                            type="number"
                            value={employees.salary}
                            onChange={handleChangeEmployees}
                        />
                    </div>

                    {/* 부서 */}
                    <div className="flex items-center mb-4">
                        <label className="w-32 text-lg font-medium text-gray-700" htmlFor="deptNo">부서</label>
                        <select
                            className="flex-grow p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="deptNo"
                            onChange={handleChangeEmployees}
                        >
                            <option value={0}>선택</option>
                            {deptInfo.map((data) => (
                                <option key={data.deptNo} value={data.deptNo}>
                                    {data.deptName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* 직책 */}
                    <div className="flex items-center mb-4">
                        <label className="w-32 text-lg font-medium text-gray-700" htmlFor="jobNo">직책</label>
                        <select
                            className="flex-grow p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="jobNo"
                            onChange={handleChangeEmployees}
                        >
                            <option value={0}>선택</option>
                            {job.map((data) => (
                                <option key={data.jobNo} value={data.jobNo}>
                                    {data.jobTitle}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* 생년월일 */}
                    <div className="flex items-center mb-4">
                        <label className="w-32 text-lg font-medium text-gray-700" htmlFor="birthday">생년월일</label>
                        <input
                            className="flex-grow p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="birthday"
                            type="date"
                            value={employees.birthday}
                            onChange={handleChangeEmployees}
                        />
                    </div>

                    {/* 주소 */}
                    <div className="flex items-center mb-4">
                        <label className="w-32 text-lg font-medium text-gray-700" htmlFor="address">주소</label>
                        <input
                            className="flex-grow p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="address"
                            type="text"
                            value={employees.address}
                            onChange={handleChangeEmployees}
                        />
                    </div>

                    {/* 전화번호 */}
                    <div className="flex items-center mb-4">
                        <label className="w-32 text-lg font-medium text-gray-700" htmlFor="phoneNum">전화번호</label>
                        <input
                            className="flex-grow p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="- 빼고 입력"
                            name="phoneNum"
                            type="text"
                            value={employees.phoneNum}
                            onChange={handleChangeEmployees}
                        />
                    </div>

                    {/* 성별 */}
                    <div className="flex items-center mb-4">
                        <label className="w-32 text-lg font-medium text-gray-700" htmlFor="gender">성별</label>
                        <select
                            className="flex-grow p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="gender"
                            onChange={handleChangeEmployees}
                        >
                            <option value="m">남성</option>
                            <option value="y">여성</option>
                        </select>
                    </div>

                    {/* 주민등록번호 */}
                    <div className="flex items-center mb-4">
                        <label className="w-32 text-lg font-medium text-gray-700" htmlFor="citizenId">주민등록번호</label>
                        <input
                            className="flex-grow p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="- 빼고 입력"
                            name="citizenId"
                            type="text"
                            value={employees.citizenId}
                            onChange={handleChangeEmployees}
                        />
                    </div>

                    {/* 비밀번호 */}
                    <div className="flex items-center mb-4">
                        <label className="w-32 text-lg font-medium text-gray-700" htmlFor="password">비밀번호</label>
                        <input
                            className="flex-grow p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="password"
                            type="password"
                            value={employees.password}
                            onChange={handleChangeEmployees}
                        />
                    </div>

                    {/* 비밀번호 확인 */}
                    <div className="flex items-center mb-4">
                        <label className="w-32 text-lg font-medium text-gray-700" htmlFor="checkPw">비밀번호 확인</label>
                        <input
                            className="flex-grow p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="password"
                            value={checkPw}
                            onChange={handleChangePassword}
                        />
                    </div>

                    {/* 비밀번호 일치 여부 */}
                    {checkPassword && (
                        <div className="text-right mb-4">
                            {checkPassword === "ok" ? (
                                <span className="text-green-600 font-medium">비밀번호가 같습니다.</span>
                            ) : (
                                <span className="text-red-600 font-medium">비밀번호가 다릅니다.</span>
                            )}
                        </div>
                    )}

                    <div className="flex justify-center">
                        {checkMail === "ok" && (
                            <button
                                type="button"
                                className="inline-block rounded p-4 m-2 text-xl w-32 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
                                onClick={handleClickAdd}
                            >
                                등록
                            </button>
                        )}
                        <button
                            type="button"
                            className="inline-block rounded p-4 m-2 text-xl w-32 bg-gray-500 text-white hover:bg-gray-600 focus:outline-none"
                            onClick={moveToList}
                        >
                            리스트
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeesAddComponent;
