import { useRef, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { addReport } from "../../api/reportApi";

const initState = {
    deadLine : '',
    reportStatus : '',
    sender : 0,
    receiver : 0,
    files : []
}

const ReportAddComponent = ({empNo}) => {
    const [report, setReport] = useState({...initState});

    const {moveToReportReceived} = useCustomMove();

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

        addReport(empNo,formData).then(data=>{
            moveToReportReceived(empNo);
        });
    };
    


    return (
        <div className="shadow-2xl mt-10 m-2 p-4 rounded-md">
            <h2 className="text-center text-3xl font-semibold m-3">보고서 작성</h2>
            <div className="flex justify-center">
                <div className="mb-4 flex w-full justify-center">
                    <div className="p-6 font-bold">마감일</div>
                    <input className="p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="deadLine"
                    type={'date'} 
                    value={report.deadLine}
                    onChange={handleChangeReport}></input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="mb-4 flex w-full justify-center">
                    <div className="p-6 font-bold">받는 사람</div>
                    <input className="p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="receiver"
                    type={'number'} 
                    value={report.receiver}
                    onChange={handleChangeReport}></input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="mb-4 flex w-full justify-center">   
                    <div className="p-6 font-bold">파일</div>
                    <input 
                    ref={uploadRef} 
                    className="p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
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
    )
}

export default ReportAddComponent;