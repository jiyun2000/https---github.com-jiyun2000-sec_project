import { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { API_SERVER_HOST, getOne, putOne } from "../../api/reportApi";
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


const ReceivedReportReadComponent = ({reportNo}) => {
  //useState 를 이용한 상태값 제어 선언
  const [report, setReport] = useState(initState);

  const [newReceiver,setNewReceiver] = useState();

  const [sender, setSender] = useState(initStateEmp);
  
  const [receiver, setReceiver] = useState(initStateEmp);

  const {moveToReportReceivedPage} = useCustomMove();

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
      }
    },[report]);

  const handleClickApprove = () => {
    if(report.receiver === 1){
      report["sender"] = report.receiver;
      report["reportStatus"] = "완료"
      putOne(reportNo, report).then(()=>{
        moveToReportReceivedPage();
      })
    }else{
      report["sender"] = report.receiver;
      report["receiver"] = newReceiver;
      putOne(reportNo, report).then(()=>{
        moveToReportReceivedPage();
      })
    }
    
  }

  const handleClickReturn = () => {
    report["reportStatus"] = "반려";
    putOne(reportNo, report).then(()=>{
      moveToReportReceivedPage();
    })
  }

  const handleChangeNewReceiver = (evt) => {
    setNewReceiver(evt.target.value);
  }

  return (  
<div className="flex justify-center m-3">
    <div className = "w-full shadow-xl p-4"> 
      <h2 className="text-center text-3xl font-semibold">{sender.firstName} {sender.lastName}님께 받은 보고서</h2>
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

      <div className="flex justify-end p-4">
        {report.receiver===1?<></>:<input className="w-4/5 p-6 border border-solid border-neutral-300 shadow-md" 
          name="newReceiver"
          type={'number'} 
          value={newReceiver}
          onChange={handleChangeNewReceiver}/>}
        
        
        <button type="button" 
          className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
          onClick={handleClickApprove}
        >
          승인
        </button>

        <button type="button" 
          className="rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
          onClick={handleClickReturn}
        >
          반려
        </button>

        <button type="button" 
          className="rounded p-4 m-2 text-xl w-32 text-white bg-sky-200"
          onClick={()=>moveToReportReceivedPage()}
        >
          List
        </button>  
      </div>
    </div>
    </div>
  );
};

export default ReceivedReportReadComponent;