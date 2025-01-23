import React, { useEffect, useState } from 'react';
import { getList } from '../../api/roomListApi';
import useCustomMove from '../../hooks/useCustomMove';
import mail from '../../assets/icon/mail.png';
import chat from '../../assets/icon/chat.png';
import BoardTitleComponent from '../board/BoardTitleComponent';
import { Link, useNavigate } from 'react-router-dom';
import { getCookie } from '../../util/cookieUtil';

const initState = {
    roomNo : 0,
    roomName : '',
    location : ''
}

const RoomListComponent = () => {

    const [roomList,setRoomList] = useState([initState]);
    let cnt = 0;
    const [empNo, setEmpNo] = useState(getCookie("member").empNo);
    const navigate = useNavigate();

    const { moveToRead, moveToAdd } = useCustomMove();

    useEffect(() => {
      getList().then(res => {
        //console.log(res); //서버에서 받아오는지 확인 ok
        setRoomList(res);
      });
    }, [cnt]);

    const handleClickAdd = () =>{
        moveToAdd();
    }

    const goToBoardList = () => {
        navigate(`/board/list`)
      }
    
    return (<>
    <div>
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
                    <Link  to="/mail" className="w-12 cursor-pointer">
                        <img src={mail} alt="Mail" className="w-full" />
                    </Link>
                    <Link to={`/chat/empList/${empNo}?page=1`} className="w-12 cursor-pointer">
                        <img src={chat} alt="Chat" className="w-full" />
                    </Link>
                </div>
        </div>

            <h2 className='text-center mt-8 text-3xl'>회의실 안내</h2>
            <div className='flex flex-wrap mx-auto p-6 items-start justify-center text-center'>
                {roomList.map((res)=>{
                    return(
                    <div 
                    key = {res.roomNo} 
                    className='flex w-2/4 p-2 m-2 rounded-md font-light items-center text-center border border-blue-300 justify-center' 
                    onClick = {() => moveToRead(res.roomNo)}
                    >
                        {res.roomName} <br />
                        위치 : {res.location}
                    </div>)
                })}
            </div>
        </div>

        <div className="flex p-4 justify-center">
        <button type="button"
        className="inline-block rounded p-4 m-2 text-xl w-32 text-white  bg-blue-400 hover:text-white hover:bg-sky-500 cursor-pointer "
        onClick={handleClickAdd}>
            추가
        </button>
        </div>
    </div>
    </>
    )
}

export default RoomListComponent;