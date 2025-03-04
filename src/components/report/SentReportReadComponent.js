import { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { API_SERVER_HOST, getOne } from "../../api/reportApi";
import { getOneEmp } from "../../api/employeesApi";
import BoardTitleComponent from "../board/BoardTitleComponent";
import { Link, useNavigate } from "react-router-dom";
import mail from '../../assets/icon/mail.png';
import chat from '../../assets/icon/chat.png';
import { getCookie, removeCookie } from "../../util/cookieUtil";
import colorChat from '../../assets/icon/colorChat.png';
import ReadComponent from "../common/ReadComponent";

const initState = {//초기화 상대 객체 선언
    reportNo : 0,
    deadLine : '',
    title: '',
    contents: '',
    reportStatus : '',
    reportingDate : '',
    sender : 0,
    receivers : [],
    files : [],
    uploadFileNames : []
};

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


const SentReportReadComponent = ({reportNo}) => {
  //useState 를 이용한 상태값 제어 선언
  const [report, setReport] = useState(initState);
  
  const [sender, setSender] = useState(initStateEmp);
  
  const [receiver, setReceiver] = useState(initStateEmp);

  const {moveToReportSentPage, moveToModify} = useCustomMove();
  const [empNo, setEmpNo] = useState(getCookie("member").empNo);
  const navigate = useNavigate();
  const [chatCntCook, setChatCntCook] = useState(getCookie("alert"));
  useEffect(() => {
    //서버에 데이터 요청 보내기
    getOne(reportNo).then(data =>{
      setReport(data);
      console.log(data);
    });
  }, [reportNo]);
  useEffect(()=>{
    if(report!==initState){
      if(report.reportStatus!=='완료'){
        getOneEmp(report.receivers).then(data=>{
          setReceiver(data);
        });
        getOneEmp(report.sender).then(data=>{
          setSender(data);
        });
      }
    }
  },[report]);

  const goToBoardList = () => {
    navigate(`/board/list`)
  }

   const checkRemove = () => {
      removeCookie("alert");
    }

    const reportDetail = [
      { label: "보고서 번호", value: report.reportNo },
      { label: "마감 기한", value: report.deadLine },
      report.isDayOff?{ label: "날짜", value: report.title }:{ label: "제목", value: report.title },
      report.isDayOff?{ label: "시간", value: report.contents }:{ label: "내용", value: report.contents },
      { label: "진행 상태", value: report.reportStatus },
      { label: "보고 일시", value: report.reportingDate },
      ...(report.reportStatus !== '완료' ? [
        { label: "발신인", value: `${sender.firstName}${sender.lastName}` },
        { label: "수신인", value: `${receiver.firstName}${receiver.lastName}` }
      ] : [])
  ];

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


      <div className="flex flex-col items-center">
      <div className="shadow-xl mt-1 m-2 p-6 w-2/3 flex flex-col items-center">
      <h2 className="text-center text-3xl font-semibold">{sender.firstName} {sender.lastName}님께 받은 보고서</h2>
        <ReadComponent serverData={reportDetail}/>
      </div>
     
      
      <div className="w-full justify-center flex  flex-col m-auto items-center">
      {report.uploadFileNames.length>1?<div className="w-1/5 p-6 font-bold text-center">관련 문서</div>:<></>}
        {report.uploadFileNames.map( (fileName, i) => 
          <a 
          alt ="report"
          key={i}
          className="w-1/2 p-6 rounded-lg border border-solid shadow-md mt-4" 
          href={`${API_SERVER_HOST}/api/report/view/${fileName}`}>
                {fileName}
            </a>
        )}
      </div>
      
        
      </div>
      <div className="flex justify-center p-4">
        <button type="button" 
          className="mt-4 bg-[#8ba7cd]  hover:bg-[#6f8cb4] text-white py-2 px-4 rounded-md w-2/5 text-sm "
          onClick={()=>moveToReportSentPage()}
        >
          리스트
        </button>
    </div>
    </div>
  );
};

export default SentReportReadComponent;