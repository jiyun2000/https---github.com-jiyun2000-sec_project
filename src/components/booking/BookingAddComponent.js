import { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";


import { getCookie, removeCookie } from "../../util/cookieUtil";
import { addOne, getListAtDate, getListAtDateWithRoomNo } from "../../api/bookingApi";


import { getList } from "../../api/roomListApi";
import { Link, useNavigate } from "react-router-dom";
import chat from "../../assets/icon/chat.png";
import mail from "../../assets/icon/mail.png";
import BoardTitleComponent from "../board/BoardTitleComponent";
import colorChat from "../../assets/icon/colorChat.png";

const initState = {
    bookNo : 0 ,
    bookDate : '',
    start : '',
    end : '',
    roomNo : 0,
    empNo : 0
}

const initStateRL = {
    roomNo : 0,
    roomName : '',
    location : ''
}

const BookingAddComponent = () => {
    const [booking, setBooking] = useState({...initState});
    const [bookingTemp, setBookingTemp] = useState({...initState});
    const [bookingAtDate, setBookingAtDate] = useState([]);
    const [bookDate, setBookDate] = useState('');
    const [roomNumber, setRoomNumber] = useState(0);
    const [addBooking, setAddBooking] = useState([]);

    const [timeSlotStart, setTimeSlotStart] = useState(["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"]);
    const [timeSlotEnd, setTimeSlotEnd] = useState(["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00"]);
    const [timeSlotRes, setTimeSlotRes] = useState(["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"]);
    let timeSlotTemp = ["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"];
    let slotsTemp = [];
    let remove = false;
    const [roomList, setRoomList] = useState([initStateRL]);
    const [empNo, setEmpNo] = useState(getCookie("member").empNo);

    const navigate = useNavigate();
    const [chatCntCook, setChatCntCook] = useState(getCookie("alert"));
    const {moveToList} = useCustomMove();

    useEffect(()=>{
        getList().then(res=>setRoomList(res));
        
        if(booking!==initState){
            for(let i = 0; i<addBooking.length; i++){
                if(addBooking[i].start!==booking.start){
                    slotsTemp.push(addBooking[i]);
                }else{
                    remove = true;
                }
            }
            if(!remove){
                slotsTemp.push({...booking});
            }
            console.log(slotsTemp);
            setAddBooking(slotsTemp);
        }
    },[booking]);

    useEffect(()=>{
        for(let i = 0;i<timeSlotStart.length;i++){
            for(let j = 0; j<bookingAtDate.length;j++){
                if(timeSlotStart[i]===bookingAtDate[j].start){
                    timeSlotTemp[i] = '';
                }
                setTimeSlotRes(timeSlotTemp);
            }
        }       
    },[bookingAtDate])

    useEffect(()=>{
        if(bookDate!==''){
            if(roomNumber!==0){
                getListAtDateWithRoomNo(bookDate,roomNumber).then(res=>setBookingAtDate(res));
            }
        }
        setAddBooking([{initState}]);
    },[bookDate,roomNumber]);

    const handleClickAdd = () => {

        if(addBooking.length>1){
            for(let i = 1;i<addBooking.length;i++){
                addOne(addBooking[i]).then(()=>{
                console.log(addBooking[i]);
            });
        };
        alert("등록되었습니다.");
        moveToList();
        }
    }

    const handleChangeBooking = (evt) => {
        booking[evt.target.name] = evt.target.value;
        setBooking({...booking});
    }

    const handleChangeDate = (evt) => {
        booking[evt.target.name] = evt.target.value;
        setBookDate(evt.target.value);
    }

    const handleChangeRoomNo = (evt) => {
        booking[evt.target.name] = evt.target.value;
        setRoomNumber(evt.target.value);
    }

    const goToBoardList = () => {
        navigate(`/board/list`)
      }
    
    const handleClickBooking = (evt) => {
        booking["empNo"] = getCookie("member").empNo;
        booking[evt.target.name] = evt.target.id;
        booking["end"] = evt.target.value;
        setBooking({...booking});
        console.log(evt.target.className === "grid place-items-center w-[46%] border border-solid border-neutral-300 shadow-md text-center h-10 rounded-xl m-2 cursor-pointer bg-white");
        console.log(evt.target.className);
        if(evt.target.className === "grid place-items-center w-[46%] border border-solid border-neutral-300 shadow-md text-center h-10 rounded-xl m-2 cursor-pointer bg-white"){
            evt.target.className = "grid place-items-center w-[46%] border border-solid border-neutral-300 shadow-md text-center h-10 rounded-xl m-2 cursor-pointer bg-[#aaaaaa]";
        }else{
            evt.target.className = "grid place-items-center w-[46%] border border-solid border-neutral-300 shadow-md text-center h-10 rounded-xl m-2 cursor-pointer bg-white";
        }
    }


  const checkRemove = () => {
    removeCookie("alert");
  }
    return (
        <div>
        <div className="flex justify-between items-center px-6 py-4 bg-white shadow-lg rounded-md mb-8">
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

        <div className="flex justify-center w-full">
        <div className="shadow-lg w-2/3 mt-10 m-2 p-4">
            <h2 className="text-center text-3xl font-semibold">예약</h2>
            <div className="flex justify-center mt-10 ">
            <div className="w-1/5 p-6 font-bold">예약날짜</div>
                <div className="relative mb-4 flex w-full flex-wrap items-center justify-center">
                    <input className="w-full p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="bookDate"
                    type={'date'} 
                    value={booking.bookDate}
                    onChange={handleChangeDate}></input>
                </div>
            </div>

            <div className="flex justify-center mt-10 ">
                    <div className="w-1/5 p-6 font-bold">방번호</div>
                    
                <div className="relative mb-4 flex w-full flex-wrap items-center justify-center">
                    <select className="w-full p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="roomNo"
                    type={'number'} 
                    value={booking.roomNo} 
                    onChange={handleChangeRoomNo}>
                        <option value={0}></option>
                        {roomList.map((res)=>{
                            return(
                                <option value={res.roomNo}>{res.roomName}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
            
            {/* <div className="flex justify-center mt-10 ">
            <div className="w-1/5 p-6 font-bold">시작시간</div>
                <div className="relative mb-4 flex w-full flex-wrap items-center justify-center">
                    <input className="w-full p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="start"
                    type={'time'} 
                    value={booking.start}
                    onChange={handleChangeBooking}></input>
                </div>
            </div>

            <div className="flex justify-center mt-10 ">
            <div className="w-1/5 p-6 font-bold">끝난시간</div>
                <div className="relative mb-4 flex w-full flex-wrap items-center justify-center">
                    <input className="w-full p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="end"
                    type={'time'} 
                    value={booking.end} 
                    onChange={handleChangeBooking}></input>
                </div>
            </div> */}
            
            {/* <div className="grid place-items-center w-full">
            <div className="w-[75%] flex m-auto flex-wrap  ">
                {bookingAtDate.map((data)=>{
                    return <div className="grid place-items-center w-[46%] border border-solid border-neutral-300 shadow-md text-center h-10 rounded-xl m-2">
                        {data.start} ~ {data.end}
                    </div>
                })}
            </div>
            </div> */}

            {roomNumber===0?<></>:bookDate===''?<></>:<div className="grid place-items-center w-full">
            <div className="w-full flex m-auto flex-wrap  ">
                {timeSlotRes.map((data)=>{
                    return data===''?<></>:<button 
                        className="grid place-items-center w-[46%] border border-solid border-neutral-300 shadow-md text-center h-10 rounded-xl m-2 cursor-pointer bg-white"
                        onClick={handleClickBooking}
                        id={data} 
                        name="start"
                        value={timeSlotEnd[timeSlotStart.indexOf(data)]}
                        >
                        {data} ~ {data!==''?timeSlotEnd[timeSlotStart.indexOf(data)]:<></>}
                    </button>})}
            </div>
            </div>  }
            
            <div className="flex justify-center p-4">
                <button type="button"
                className="inline-block rounded p-4 m-2 text-xl w-32 text-white  bg-[#8ba7cd]  hover:bg-[#6f8cb4] cursor-pointer"
                onClick={handleClickAdd}>
                    추가
                </button>
            </div>
        </div>
        </div>
    </div>
    )
}

export default BookingAddComponent;