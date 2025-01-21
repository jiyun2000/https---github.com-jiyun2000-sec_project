import { useEffect, useRef, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { addReport } from "../../api/reportApi";
import { getAllList } from "../../api/employeesApi";
import { getCookie } from "../../util/cookieUtil";
import mail from '../../assets/icon/mail.png';
import chat from '../../assets/icon/chat.png';
import BoardTitleComponent from "../board/BoardTitleComponent";
import { Link, useNavigate } from "react-router-dom";

const initState = {
    deadLine : '',
    reportStatus : '',
    sender : 0,
    receiver : 0,
    finalReceiver: 0,
    files : []
}

const initStateEmp = {
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
    gender : '',
    citizenId : ''
}

const ReportAddComponent = () => {
    
    const [empNo, setEmpNo] = useState(getCookie('member').empNo);
    
    const [report, setReport] = useState({...initState});

    const {moveToReportReceivedPage} = useCustomMove();

    const [employees, setEmployees] = useState([initStateEmp]);

    const navigate = useNavigate();

    useEffect(()=>{
        getAllList().then((data)=>{
            setEmployees(data);
        });
    },[report]);

    //업로드 되는 파일을 Ref 하는 hook.
    const uploadRef = useRef();

    const handleChangeReport = (evt) => {
        report[evt.target.name] = evt.target.value;
        setReport({...report});
    }

    const handleClickAdd = (e) => {

        report["sender"] = empNo;
        report["reportStatus"] = "진행중";

        const files = uploadRef.current.files;

        const formData = new FormData();

        for(let i = 0; i<files.length; i++){
            formData.append('files',files[i]);
        }

        formData.append('deadLine',report.deadLine);
        formData.append('reportStatus',report.reportStatus);
        formData.append('sender',report.sender);
        formData.append('receiver',report.receiver);
        formData.append('finalReceiver',report.finalReceiver);

        addReport(empNo,formData).then(()=>{
            moveToReportReceivedPage();
        });
    };
    
    const goToBoardList = () => {
        navigate(`/board/list`)
      }

    return (
    <div>
        <div className="flex justify-between items-center w-full bg-white shadow-lg rounded-md mb-8 px-6 py-4">
            <div className="flex items-center space-x-8">
                <div className="text-2xl font-semibold text-blue-800 select-none cursor-pointer" onClick={goToBoardList}>
                    [공지사항]
                </div>
                <div className="w-64 text-2xl font-semibold cursor-pointer">
                    <BoardTitleComponent />
                </div>
            </div>
            <div className="flex space-x-4">
                <Link to="/mail" className="w-12 cursor-pointer">
                    <img src={mail} alt="Mail" className="w-full" />
                </Link>
                <Link to={`/chat/empList/${empNo}?page=1`} className="w-12 cursor-pointer">
                    <img src={chat} alt="Chat" className="w-full" />
                </Link>
            </div>
        </div>


        <div className="shadow-2xl mt-10 m-2 p-4 rounded-md">
            <h2 className="text-center text-3xl font-semibold m-3">보고서 작성</h2>
            <div className="flex justify-center">
            <div className="w-1/5 p-6 font-bold">마감일</div>
                <div className="mb-4 flex w-full justify-center">
                    <input className="w-full p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="deadLine"
                    type={'date'} 
                    value={report.deadLine}
                    onChange={handleChangeReport}></input>
                </div>
            </div>

            <div className="flex justify-center">
            <div className="w-1/5 p-6 font-bold">받는 사람</div>
                <div className="mb-4 flex w-full justify-center">
                    <select className="w-full p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="receiver"
                    type={'number'} 
                    value={report.receiver}
                    onChange={handleChangeReport}>
                        <option value={0}></option>
                        {employees.map((res)=>{
                            return(
                                <option value={res.empNo}> {res.firstName} {res.lastName}</option>
                            )
                        })}
                    </select>
                </div>
            </div>

            <div className="flex justify-center">
            <div className="w-1/5 p-6 font-bold">최종 결재</div>
                <div className="mb-4 flex w-full justify-center">
                    <select className="w-full p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="finalReceiver"
                    type={'number'} 
                    value={report.finalReceiver}
                    onChange={handleChangeReport}>
                        <option value={0}></option>
                        {employees.map((res)=>{
                            return(
                                <option value={res.empNo}> {res.firstName} {res.lastName}</option>
                            )
                        })}
                    </select>
                </div>
            </div>

            <div className="flex justify-center">
            <div className="w-1/5 p-6 font-bold">파일</div>
                <div className="mb-4 flex w-full justify-center">   
                    <input 
                    ref={uploadRef} 
                    className="w-full p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    type={'file'} multiple={true}
                    >    
                    </input>
                </div>
            </div>

            <div className="flex justify-center p-4">
                <button type="button"
                className="mt-4 bg-blue-300 text-white py-2 px-4 rounded-md w-2/5 text-sm "
                onClick={handleClickAdd}>
                    등록
                </button>
            </div>
        </div>
    </div>
    )
}

export default ReportAddComponent;