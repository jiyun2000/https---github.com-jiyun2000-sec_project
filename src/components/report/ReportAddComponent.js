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
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Deadline</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="deadLine"
                    type={'date'} 
                    value={report.deadLine}
                    onChange={handleChangeReport}></input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Receiver</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="receiver"
                    type={'number'} 
                    value={report.receiver}
                    onChange={handleChangeReport}></input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">files</div>
                    <input 
                    ref={uploadRef} 
                    className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    type={'file'} multiple={true}
                    >    
                    </input>
                </div>
            </div>

            <div className="flex justify-end p-4">
                <button type="button"
                className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
                onClick={handleClickAdd}>
                    Add
                </button>
            </div>
        </div>
    )
}

export default ReportAddComponent;