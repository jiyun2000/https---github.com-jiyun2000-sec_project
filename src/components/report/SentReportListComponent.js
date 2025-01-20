import React, { useEffect, useState } from 'react';
import { getSentList } from '../../api/reportApi';
import useCustomMove from '../../hooks/useCustomMove';
import PageComponent from '../common/PageComponent';
import { getCookie } from '../../util/cookieUtil';

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

const SentReportListComponent = () => {

    const [empNo, setEmpNo] = useState(getCookie('member').empNo);

    const [report,setReport] = useState(initState);

    const { page, size, moveToSentReportRead, moveToAdd,moveToReportReceivedPage,moveToReportSentPage } = useCustomMove();

    useEffect(() => {
            getSentList(empNo,[page,size]).then(data => {
                setReport(data);
            });
    }, [page,size]);

    const handleClickAdd = () =>{
        moveToAdd();
    }

    const handleClickMove = () => {
        moveToReportReceivedPage();
    }
    
    return (<>
    <div className="text-2xl">
        <div className="flex justify-center">
            <div className="justify-center relative mb-4 flex w-full flex-wrap items-stretch">
                <div className="w-1/2 p-6 text-center rounded-md border border-blue-300 m-10" 
                onClick={handleClickMove}>받은 결재문서</div>
                <div className="w-1/2 p-6 text-center rounded-md border border-blue-300 m-10" 
                >작성한 결재문서</div>
            </div>
        </div>

        <div className='flex flex-wrap mx-auto p-6 justify-center'>
            {report.dtoList.map((data)=>{
                return(
                <div 
                key = {data.reportNo} 
                className='flex w-3/4 p-2 m-2 rounded shadow-md justify-center ' 
                onClick = {() => moveToSentReportRead(data.reportNo)}
                >
                    <div className='flex flex-col p-2 text-center'>
                        <div>마감기한 : {data.deadLine}</div>
                        <div>진행 상태 : {data.reportStatus}</div>
                        <div>보낸 사람 : {data.sender}</div>
                        <div>받은 사람 : {data.receiver}</div>
                    </div>
                </div>)
            })}
        </div>

        <PageComponent
            serverData={report} 
            movePage={moveToReportSentPage}
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

export default SentReportListComponent;