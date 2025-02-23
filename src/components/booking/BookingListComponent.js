import React, { useEffect, useState } from 'react';
import { getList } from '../../api/bookingApi';
import useCustomMove from '../../hooks/useCustomMove';
import PageComponent from '../common/PageComponent';
import { getCookie, removeCookie } from '../../util/cookieUtil';
import mail from "../../assets/icon/mail.png";
import chat from "../../assets/icon/chat.png";
import BoardTitleComponent from '../board/BoardTitleComponent';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import colorChat from "../../assets/icon/colorChat.png";

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

const BookingListComponent = () => {

    const [booking,setBooking] = useState(initState);
    const [empNo, setEmpNo] = useState(getCookie("member").empNo);
    const [bookDate, setBookDate] = useState('');
    const navigate = useNavigate();
    const [chatCntCook, setChatCntCook] = useState(getCookie("alert"));
    const { page, size, moveToRead, moveToAdd, moveToList } = useCustomMove();
    const [temp,setTemp] = useSearchParams();


    useEffect(() => {
        if(bookDate!==''){
            getList(bookDate,'cr',[(page == 1 ? page:1),size]).then(data => {
                setTemp({page:1,size:10});
                setBooking(data);
            });
        }

    }, [bookDate]); 

    useEffect(() => {
        if(bookDate!==''){
            getList(bookDate,'cr',[page,size]).then(data => {
                setBooking(data);
            });
        };

    }, [page, size]);


    const handleClickAdd = () =>{
        moveToAdd();
    }

    const goToBoardList = () => {
        navigate(`/board/list`)
      }


    const checkRemove = () => {
        removeCookie("alert");
    }
    
    const handleChangeDate = (evt) => {
        booking[evt.target.name] = evt.target.value;
        setBookDate(evt.target.value);
    }

    const dateNow = new Date();
    const today = dateNow.toISOString().slice(0,10)

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
                <Link to={`/chat/empList/${empNo}?page=1`} className="w-12 cursor-pointer" onClick={()=>checkRemove()}>
                {chatCntCook ? 
                    <img src={colorChat} alt='colorChat' className='w-full' /> :
                    <img src={chat} alt="Chat" className="w-full" />
                }
                </Link>
            </div>
        </div>

     <div className="container mx-auto p-6">

        <h2 className="text-3xl font-semibold text-center mb-10">회의실 예약</h2>
        <div className="text-2xl">
            <div className="flex justify-center space-x-10">
                <input className="w-1/2 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                name="bookDate"
                type={'date'} 
                value={bookDate}
                defaultValue={today}
                onChange={handleChangeDate}></input>
            </div>
        </div>


        <h2 className="text-3xl font-semibold text-center mt-10 mb-6">예약 내역</h2>
        <div className="overflow-x-auto w-full">
            <table className="w-full ">
              <thead className="bg-gray-200 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-4 text-center">예약번호</th>
                  <th className="px-6 py-4 text-center">예약 날짜</th>
                  <th className="px-6 py-4 text-center">시작 시간</th>
                  <th className="px-6 py-4 text-center">끝난 시간</th>
                </tr>
              </thead>
              <tbody>
                {booking.dtoList.length>0?booking.dtoList.map((data) => (
                  <tr
                    key={data.bookNo}
                    className="bg-gray-50 cursor-pointer text-center"
                    onClick={() => moveToRead(data.bookNo)}
                  >
                    <td className="px-6 py-4 text-center">{data.bookNo}</td>
                    <td className="px-6 py-4 text-center">{data.bookDate}</td>
                    <td className="px-6 py-4 text-center">{data.start}</td>
                    <td className="px-6 py-4 text-center">{data.end}</td>
                  </tr>
                )):<tr>
                    <td colSpan={4} className="px-6 py-4 text-center">예약내역이 없습니다.</td>    
                </tr>}
              </tbody>
            </table>
          </div>
        <PageComponent
            serverData={booking} 
            movePage={moveToList}
            />
        </div>

        <div className="flex justify-center p-4">
        <button type="button"
        className="inline-block rounded p-4 m-2 text-xl w-32 text-white  bg-[#8ba7cd]  hover:bg-[#6f8cb4]  cursor-pointer"
        onClick={handleClickAdd}>
            추가하기
        </button>
        </div>
        </div>

    </>
    )
}

export default BookingListComponent;