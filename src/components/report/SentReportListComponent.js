import React, { useEffect, useState } from 'react';
import { getSentList } from '../../api/reportApi';
import useCustomMove from '../../hooks/useCustomMove';
import PageComponent from '../common/PageComponent';
import { getCookie } from '../../util/cookieUtil';
import mail from "../../assets/icon/mail.png";
import chat from "../../assets/icon/chat.png";
import BoardTitleComponent from '../board/BoardTitleComponent';
import { Link, useNavigate } from 'react-router-dom';

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

    const navigate = useNavigate();

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

    const goToBoardList = () => {
        navigate(`/board/list`)
      }
    
    return (<>
    <div>
    <div className="flex justify-between items-center w-full bg-white shadow-lg  rounded-md mb-8 px-6 py-4">
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


    <div className="mx-auto p-6">
        <div className="flex justify-center mb-6 space-x-4">
                <div className="flex-1 text-center py-4  text-white  bg-gray-300 rounded-lg shadow-md cursor-pointer hover:bg-gray-400 " 
                onClick={handleClickMove}>받은 결재문서</div>
                <div className="flex-1 text-center py-4   text-white rounded-lg shadow-md cursor-pointer bg-[#8ba7cd]  hover:bg-[#6f8cb4] " 
                >작성한 결재문서</div>
            </div>
        </div>

        {/* <div className='flex flex-col items-center justify-center gap-4'>
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
                        <div>보낸 사람 사원번호 : {data.sender}</div>
                        <div>받은 사람 사원번호 : {data.receiver}</div>
                        <div>최종 결재 : {data.finalReceiver}</div>
                    </div>
                </div>)
            })}
        </div> */}

            <div className="flex flex-col items-center justify-center gap-4">
                {report.dtoList.map((data) => {
                    return (
                        <div 
                            key={data.reportNo}
                            className="w-2/4 p-6 bg-white rounded-lg shadow-lg  cursor-pointer"
                            onClick={() => moveToSentReportRead(data.reportNo)}>
                            <div className="text-lg font-semibold mb-2">
                                마감기한 : {data.deadLine}
                            </div>
                            <div className="text-sm mb-2 text-gray-600">
                                진행 상태 : {data.reportStatus}
                            </div>
                            {data.reportStatus !== "완료" && (
                                <>
                                    <div className="text-sm mb-2 text-gray-600">보낸 사람 : {data.sender}</div>
                                    <div className="text-sm text-gray-600">받는 사람 : {data.receiver}</div>
                                </>
                            )}
                        </div>
                    )
                })}
            </div>




        <PageComponent
            serverData={report} 
            movePage={moveToReportSentPage}
            />
        </div>

        <div className="flex justify-center mt-8">
        <button type="button"
         className="text-white py-2 px-6 text-lg  bg-[#8ba7cd]  hover:bg-[#6f8cb4] rounded-md"
        onClick={handleClickAdd}>
            등록
        </button>
        </div>
        </>
    )
}

export default SentReportListComponent;