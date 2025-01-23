import React, { useEffect, useState } from 'react';
import { getList } from '../../api/dayOffApi';
import useCustomMove from '../../hooks/useCustomMove';
import PageComponent from '../common/PageComponent';
import { Link, useNavigate } from 'react-router-dom';
import BoardTitleComponent from '../board/BoardTitleComponent';
import chat from "../../assets/icon/chat.png";
import mail from "../../assets/icon/mail.png";
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

const DayOffListComponent = () => {

    const [dayOff,setDayOff] = useState(initState);

    const { page, size, moveToRead, moveToAdd, moveToList } = useCustomMove();
    const navigate = useNavigate();
    const [empNo, setEmpNo] = useState(getCookie("member").empNo);

    useEffect(() => {
            getList([page,size]).then(data => {
                setDayOff(data);
            });
    }, [page,size]);

    const handleClickAdd = () =>{
        moveToAdd();
    }

    const goToBoardList = () => {
        navigate(`/board/list`)
      }
    
    return (<>
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


    <div className="text-3xl">
        <div className='flex flex-wrap mx-auto p-6 '>
            {dayOff.dtoList.map((data)=>{
                return(
                <div 
                key = {data.dayOffNo} 
                className='flex w-full min-w-[400px] p-2 m-2 rounded shadow-md' 
                onClick = {() => moveToRead(data.dayOffNo)}
                >
                    {data.dayOffNo} / {data.offHours} / {data.dayOffDate} / {data.empNo}
                </div>)
            })}
        </div>

        <PageComponent
            serverData={dayOff} 
            movePage={moveToList}
            />
        </div>

        <div className="flex justify-end p-4">
        <button type="button"
        className="inline-block  p-4 m-2 text-xl w-32 text-white bg-[#8ba7cd]  hover:bg-[#6f8cb4] rounded-md"
        onClick={handleClickAdd}>
            추가
        </button>
        </div>
    </div>
    </>
    )
}

export default DayOffListComponent;