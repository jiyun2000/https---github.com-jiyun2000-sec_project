import React, { useEffect, useState } from 'react';
import { getSentList } from '../../api/reportApi';
import useCustomMove from '../../hooks/useCustomMove';
import PageComponent from '../common/PageComponent';
import CommutePageComponent from '../common/CommutePageComponent';
import { getCookie } from '../../util/cookieUtil';
import mail from "../../assets/icon/mail.png";
import chat from "../../assets/icon/chat.png";
import BoardTitleComponent from '../board/BoardTitleComponent';
import { Link } from 'react-router-dom';

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
    <div>
        <div className="flex justify-between items-center w-full bg-white shadow-lg rounded-md mb-8 px-6 py-4">
            <div className="flex items-center space-x-8">
                <div className="text-2xl font-semibold text-blue-800 select-none">
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
    </div>
    </>
    )
}

export default SentReportListComponent;