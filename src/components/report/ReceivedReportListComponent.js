import React, { useEffect, useState } from 'react';
import { getReceivedList } from '../../api/reportApi';
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

const ReceivedReportListComponent = ({empNo}) => {

    const [report,setReport] = useState(initState);

    const { page, size, moveToReceivedReportRead, moveToAddReport, moveToReportSent, moveToReportReceivedPage } = useCustomMove();

    useEffect(() => {
        getReceivedList(empNo,[page,size]).then(data => {
            setReport(data);
        });
    }, [page,size]);

    const handleClickAdd = () =>{
        moveToAddReport(empNo);
    }
    
    const handleClickMove = () => {
        moveToReportSent(empNo);
    }
    
    return (<>
    <div className="text-2xl">

        <div className="flex justify-center">
        <div className="justify-center relative mb-4 flex w-full flex-wrap items-stretch">
                <div className="w-1/2 p-6 text-center rounded-md border border-blue-300 m-10" 
                >받은 결재문서</div>
                <div className="w-1/2 p-6 text-center rounded-md border border-blue-300 m-10" 
                onClick={handleClickMove}>작성한 결재문서</div>
            </div>
        </div>

        <div className='flex flex-wrap mx-auto p-6 justify-center'>
            {report.dtoList.map((data)=>{
                return(
                <div 
                key = {data.reportNo} 
                className='flex w-3/4 p-2 m-2 rounded shadow-md justify-center ' 
                onClick = {() => moveToReceivedReportRead(data.reportNo)}
                >
                    <div className='flex flex-col p-2 text-center'>
                        <div>마감기한 : {data.deadLine}</div>
                        <div>진행 상태 : {data.reportStatus}</div>
                        {data.reportStatus!=="완료"?<>
                        <div>보낸 사람 :  {data.sender}</div>
                        <div>받는 사람 : {data.receiver}</div>
                        </>:<></>}
                    </div>
                </div>)
            })}
        </div>

        <CommutePageComponent
            serverData={report} 
            empNo={empNo} 
            movePage={moveToReportReceivedPage}
            />
        </div>

        <div className="flex justify-center p-4">
        <button type="button"
        className="mt-4 bg-blue-300 text-white py-2 px-4 rounded-md w-2/5 text-sm "
        onClick={handleClickAdd}>
            등록
        </button>
        </div>
        </>
    )
}

export default ReceivedReportListComponent;