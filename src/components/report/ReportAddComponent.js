import { useEffect, useRef, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { addReport } from "../../api/reportApi";
import { getAllList } from "../../api/employeesApi";
import { getCookie, removeCookie } from "../../util/cookieUtil";
import mail from '../../assets/icon/mail.png';
import chat from '../../assets/icon/chat.png';
import BoardTitleComponent from "../board/BoardTitleComponent";
import { Link, useNavigate } from "react-router-dom";
import colorChat from "../../assets/icon/colorChat.png";
import Select from "react-select";

const initState = {
    deadLine : '',
    title : '',
    contents : '',
    reportStatus : '',
    sender : 0,
    receivers : [],
    isDayOff: false,
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
    const [chatCntCook, setChatCntCook] = useState(getCookie("alert"));

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

    const handleChangeChecked = (evt) => {
        report['title'] = '';
        report['contents'] = '';
        report[evt.target.name] = evt.target.checked;
        
        setReport({...report});
    }

    const handleClickAdd = (e) => {

        report["sender"] = empNo;
        report["reportStatus"] = "진행중";
        const formData = new FormData();

        if(uploadRef.current!==null){
            const files = uploadRef.current.files;
    
            for(let i = 0; i<files.length; i++){
                formData.append('files',files[i]);
            }
        }

        console.log(report.isDayOff);


        formData.append('title',report.title);
        formData.append('contents',report.contents);
        if(report.isDayOff){
            formData.append('deadLine',report.title);
        }else{
            formData.append('deadLine',report.deadLine);
        }
        formData.append('reportStatus',report.reportStatus);
        formData.append('sender',report.sender);
        formData.append('isDayOff',report.isDayOff);

        if(report.receivers.lengt<1){
            alert("수신인을 추가해주세요.");
            return;
        }
        
        if(report.deadLine===undefined){
            alert("결재기한을 추가해주세요.");
            return;
        }
        // if(files.length<1){
        //     alert("결재서류를 첨부해주세요.");
        //     return;
        // }

        for(let i = 0; i<report.receivers.length; i++){
            formData.append('receivers',report.receivers[i]);
        }
        
        addReport(empNo,formData).then((res)=>{
            alert("등록되었습니다.");
            moveToReportReceivedPage();
        });
    };
    
    const goToBoardList = () => {
        navigate(`/board/list`)
      }

    const checkRemove = () => {
        removeCookie("alert");
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
                <Link to={`/chat/empList/${empNo}?page=1`} className="w-12 cursor-pointer" onClick={()=>checkRemove()}>
                {chatCntCook  ? 
                    <img src={colorChat} alt='colorChat' className='w-full' /> :
                    <img src={chat} alt="Chat" className="w-full" />
                }
          </Link>
            </div>
        </div>

    <div className="flex flex-col w-full items-center justify-center">
        <div className="w-[80%] shadow-2xl mt-10 m-2 p-4 rounded-md ">
            <h2 className="text-center text-3xl font-semibold m-3">보고서 작성</h2>

            <div className="flex justify-center">
                <div className="w-1/5 p-6 font-bold">연차 사용</div>
                <div className="mb-4 flex w-full">
                    <input className="w-full p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="isDayOff"
                    type={'checkbox'} 
                    //value={report.title}
                    onChange={handleChangeChecked}></input>
                </div>
            </div>

            {report.isDayOff===false?<>
                <div className="flex justify-center">
                    <div className="w-1/5 p-6 font-bold">제목</div>
                    <div className="mb-4 flex w-full justify-center">
                        <input className="w-full p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                        name="title"
                        type={'text'} 
                        value={report.title}
                        onChange={handleChangeReport}></input>
                    </div>
                </div>

                <div className="flex justify-center">
                    <div className="w-1/5 p-6 font-bold">내용</div>
                    <div className="mb-4 flex w-full justify-center">
                        <textarea className="w-full p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                        name="contents"
                        type={'text'} 
                        value={report.contents}
                        onChange={handleChangeReport}></textarea>
                    </div>
                </div>
            </>:<>
                <div className="flex justify-center">
                    <div className="w-1/5 p-6 font-bold">날짜</div>
                    <div className="mb-4 flex w-full justify-center">
                        <input className="w-full p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                        name="title"
                        type={'date'} 
                        value={report.title}
                        onChange={handleChangeReport}></input>
                    </div>
                </div>

                <div className="flex justify-center">
                    <div className="w-1/5 p-6 font-bold">시간</div>
                    <div className="mb-4 flex w-full justify-center">
                        <input className="w-full p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                        name="contents"
                        type={'number'} 
                        value={report.contents}
                        onChange={handleChangeReport}></input>
                    </div>
                </div>
            </>}

            <div className="flex justify-center">
                <div className="w-1/5 p-6 font-bold">받는 사람</div>
                <div className="mb-4 flex w-full justify-center">
                    
                <Select
                    isMulti
                    closeMenuOnSelect={false}
                    options={employees.filter(res => res.empNo !== empNo).map(res => ({
                        value: res.empNo,
                        label: `${res.firstName} ${res.lastName}`
                    }))} 
                    value={report.receivers.map(empNo => {
                        const employee = employees.find(res => res.empNo === empNo);
                        return employee ? { value: employee.empNo, label: `${employee.firstName} ${employee.lastName}` } : null;
                    }).filter(Boolean)} 
                    onChange={(selectedOptions) => {
                        setReport(prev => ({
                            ...prev,
                            receivers: selectedOptions.map(option => option.value) // 순서 유지
                        }));
                    }}
                    className="w-full p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                />
                </div>
            </div>

            {report.isDayOff===false?<>
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
                <div className="w-1/5 p-6 font-bold">파일</div>
                <div className="mb-4 flex w-full justify-center">   
                    <input 
                    ref={uploadRef} 
                    className="w-full p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    type={'file'} multiple={true}
                    >    
                    </input>
                </div>
            </div></>:<></>}
            

            <div className="flex justify-center p-4">
                <button type="button"
                className="mt-4 bg-[#8ba7cd]  hover:bg-[#6f8cb4] text-white py-2 px-4 rounded-md w-2/5 text-sm "
                onClick={handleClickAdd}>
                    등록
                </button>
            </div>
        </div>
        </div>
    </div>
    )
}

export default ReportAddComponent;