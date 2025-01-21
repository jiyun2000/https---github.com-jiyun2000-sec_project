import React, { useEffect, useState } from 'react';
import { getList } from '../../api/bookingApi';
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

const initRes = {
    cr : '',
    wr : ''
}

const BookingListComponent = () => {

    const [booking,setBooking] = useState(initState);
    const [empNo, setEmpNo] = useState(getCookie("member").empNo);
    const [res, setRes] = useState(initRes);
    const navigate = useNavigate();

    const { page, size, moveToRead, moveToAdd, moveToList } = useCustomMove();

    const [temp, setTemp] = useState();

    useEffect(() => {
        if(res.cr !== ''){
            getList(res.cr,[1,size]).then(data => {
                setBooking(data);
                setTemp(1);
            });
        };

        if(res.wr !== ''){
            getList(res.wr,[1,size]).then(data => {
                setBooking(data);
                setTemp(2);
            });
        };
        
    }, [res]);

    useEffect(() => {
        if(temp === 1){
            getList('cr',[page,size]).then(data => {
                setBooking(data);
            });
        };

        if(temp === 2){
            getList('wr',[page,size]).then(data => {
                setBooking(data);
            });
        };
        
    }, [page, size]);

    useEffect(()=>{
        setRes({...initRes});
    },[booking]);

    const handleClickAdd = () =>{
        moveToAdd();
    }

    const handleChangeBooking = (evt) => {
        res[evt.target.id] = evt.target.id;
        setRes({...res});
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

     <div className="container mx-auto p-6">
                <h2 className="text-3xl font-semibold text-center mb-10">회의실 예약하기</h2>
                <div className="text-2xl">
                    <div className="flex justify-center space-x-10">
                        <div className="w-1/2 p-6 text-center rounded-md border border-blue-300 m-4 cursor-pointer hover:bg-blue-100"
                            id="cr"
                            onClick={handleChangeBooking}>
                            회의실
                        </div>
                        <div className="w-1/2 p-6 text-center rounded-md border border-blue-300 m-4 cursor-pointer hover:bg-blue-100"
                            id="wr"
                            onClick={handleChangeBooking}>
                            화장실
                        </div>
                    </div>
                </div>

                <h2 className="text-3xl font-semibold text-center mt-10 mb-6">예약 내역</h2>
                <div className="flex flex-wrap justify-center">
                    {booking.dtoList.map((data) => {
                        return (
                            <div key={data.bookNo} className="flex flex-col min-w-[400px] p-6 m-4 rounded-lg shadow-lg text-center cursor-pointer hover:bg-gray-100"
                                onClick={() => moveToRead(data.bookNo)}>
                                <div>방번호 : {data.roomNo}</div>
                                <div>예약 날짜 : {data.bookDate}</div>
                                <div>시작 시간 : {data.start}</div>
                                <div>끝난 시간 : {data.end}</div>
                            </div>
                        )
                    })}
                </div>

        <PageComponent
            serverData={booking} 
            movePage={moveToList}
            />
        </div>

        <div className="flex justify-center p-4">
        <button type="button"
        className="inline-block rounded p-4 m-2 text-xl w-32 text-white  bg-[#95bce8] hover:text-white hover:bg-[#8daad8] cursor-pointer"
        onClick={handleClickAdd}>
            추가하기
        </button>
        </div>
        </div>

    </>
    )
}

export default BookingListComponent;