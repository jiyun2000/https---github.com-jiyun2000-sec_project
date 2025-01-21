import { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { API_SERVER_HOST, getOne } from "../../api/reportApi";
import { getOneEmp } from "../../api/employeesApi";
import BoardTitleComponent from "../board/BoardTitleComponent";
import { Link, useNavigate } from "react-router-dom";
import mail from '../../assets/icon/mail.png';
import chat from '../../assets/icon/chat.png';
import { getCookie } from "../../util/cookieUtil";


const initState = {//초기화 상대 객체 선언
    reportNo : 0,
    deadLine : '',
    reportStatus : '',
    reportingDate : '',
    sender : 0,
    receiver : 0,
    finalReceiver: 0,
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
  
  const [finalReceiver, setFinalReceiver] = useState(initStateEmp);

  const {moveToReportSentPage, moveToModify} = useCustomMove();
  const [empNo, setEmpNo] = useState(getCookie("member").empNo);
  const navigate = useNavigate();

  useEffect(() => {
    //서버에 데이터 요청 보내기
    getOne(reportNo).then(data =>{
      setReport(data);
    });
  }, [reportNo]);
  useEffect(()=>{
    if(report!==initState){
      getOneEmp(report.receiver).then(data=>{
        setReceiver(data);
      });
      getOneEmp(report.sender).then(data=>{
        setSender(data);
      });
      getOneEmp(report.finalReceiver).then(data=>{
        setFinalReceiver(data);
      });
    }
  },[report]);

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


    <div className="flex justify-center m-3">
    <div className = "w-full shadow-xl p-4"> 
      <h2 className="text-center text-3xl font-semibold">{receiver.firstName} {receiver.lastName}님께 보낸 보고서</h2>
      <div className="flex justify-center mt-10">
      <div className="w-1/5 p-6 font-bold">보고서 번호</div>
      <div className="mb-4 flex w-full justify-center">
          <div className="w-4/5 p-6 rounded-md border border-solid shadow-md">
            {report.reportNo}        
          </div>  
        </div>
      </div>

        <div className="flex justify-center">
        <div className="w-1/5 p-6 font-bold">마감일</div>
        <div className="mb-4 flex w-full justify-center">
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {report.deadLine}        
          </div>
        </div>
      </div>
      <div className="flex justify-center">
      <div className="w-1/5 p-6 font-bold">진행 상태</div>
        <div className="mb-4 flex w-full justify-center">
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {report.reportStatus}        
          </div>
        </div>  
      </div>
      <div className="flex justify-center">
      <div className="w-1/5 p-6 font-bold">작성 날짜</div>
        <div className="mb-4 flex w-full justify-center">
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {report.reportingDate}        
          </div>
        </div>
      </div>
      <div className="flex justify-center">
      <div className="w-1/5 p-6 font-bold">받는 사람</div>
        <div className="mb-4 flex w-full justify-center">
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
          {receiver.firstName} {receiver.lastName}       
          </div>
        </div>
      </div>
      <div className="flex justify-center">
      <div className="w-1/5 p-6 font-bold">보낸 사람</div>
        <div className="mb-4 flex w-full justify-center">
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
          {sender.firstName} {sender.lastName}        
          </div>
        </div>
      </div>
      <div className="flex justify-center">
      <div className="w-1/5 p-6 font-bold">최종 결재</div>
        <div className="mb-4 flex w-full justify-center">
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
          {finalReceiver.firstName} {finalReceiver.lastName}        
          </div>
        </div>
      </div>
      <div className="w-full justify-center flex  flex-col m-auto items-center">
      <div className="w-1/5 p-6 font-bold">관련 문서</div>
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
      
      <div className="flex justify-center p-4">
        <button type="button" 
          className="mt-4 bg-blue-300 text-white py-2 px-4 rounded-md w-2/5 text-sm "
          onClick={()=>moveToReportSentPage()}
        >
          리스트
        </button>  
      </div>
    </div>
    </div>
  </div>
  );
};

export default SentReportReadComponent;