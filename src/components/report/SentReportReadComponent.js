import { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { API_SERVER_HOST, getOne } from "../../api/reportApi";
import { getOneEmp } from "../../api/employeesApi";


const initState = {//초기화 상대 객체 선언
    reportNo : 0,
    deadLine : '',
    reportStatus : '',
    reportingDate : '',
    sender : 0,
    receiver : 0,
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

  useEffect(() => {
    //서버에 데이터 요청 보내기
    getOne(reportNo).then(data =>{
      setReport(data);
    });
    getOneEmp(report.receiver).then(data=>{
      setReceiver(data);
    });
    getOneEmp(report.sender).then(data=>{
      setSender(data);
    });
  }, [reportNo]);
  return (  
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
      <div className="w-full justify-center flex  flex-col m-auto items-center">
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
  );
};

export default SentReportReadComponent;