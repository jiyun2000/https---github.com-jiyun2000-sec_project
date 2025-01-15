import React, { useEffect, useState } from 'react';
import { getSentList } from '../../api/reportApi';
import useCustomMove from '../../hooks/useCustomMove';
import PageComponent from '../common/PageComponent';
import CommutePageComponent from '../common/CommutePageComponent';

const initState = {
    dtoList : [],
    pageNumList : [],
    pageRequestDTO : null,
    prev : false,
    next : false,
    totalCount : 0,
    prevPage : 0,
    nextPage : 0,
    totalPage : 0,
    current : 0
}

const SentReportListComponent = ({empNo}) => {

    const [report,setReport] = useState(initState);

    const { page, size, moveToSentReportRead, moveToAddReport,moveToReportReceived,moveToReportSentPage } = useCustomMove();

    useEffect(() => {
            getSentList(empNo,[page,size]).then(data => {
                setReport(data);
            });
    }, [page,size]);

    const handleClickAdd = () =>{
        moveToAddReport(empNo);
    }

    const handleClickMove = () => {
        moveToReportReceived(empNo);
    }
    
    return (<>
    <div className="text-2xl">
        <div className="flex justify-center">
            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                <div className="w-1/2 p-6 text-center rounded-r border border-solid border-neutral-300 shadow-md" 
                onClick={handleClickMove}>받은 결재문서</div>
                <div className="w-1/2 p-6 text-center rounded-r border border-solid border-neutral-300 shadow-md" 
                >작성한 결재문서</div>
            </div>
        </div>

        <div className='flex flex-wrap mx-auto p-6'>
            {report.dtoList.map((data)=>{
                return(
                <div 
                key = {data.reportNo} 
                className='flex w-full min-w-[400px] p-2 m-2 rounded shadow-md' 
                onClick = {() => moveToSentReportRead(data.reportNo)}
                >
                    {data.reportNo} / {data.deadLine} / {data.reportStatus} / {data.sender} / {data.receiver}
                </div>)
            })}
        </div>

        <CommutePageComponent
            serverData={report} 
            empNo={empNo} 
            movePage={moveToReportSentPage}
            />
        </div>

        <div className="flex justify-end p-4">
        <button type="button"
        className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
        onClick={handleClickAdd}>
            add
        </button>
        </div>
        </>
    )
}

export default SentReportListComponent;