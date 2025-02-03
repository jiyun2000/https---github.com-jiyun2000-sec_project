import { useEffect, useState } from "react"
import useCustomMove from "../../hooks/useCustomMove";
import { getCommuteList, putCheckOut, setCheckIn } from "../../api/commuteApi";
import { useNavigate, useParams } from "react-router-dom";
import CommutePageComponent from "../common/CommutePageComponent";
import { getOneEmp } from "../../api/employeesApi";
import BoardTitleComponent from '../board/BoardTitleComponent';
import { Link } from 'react-router-dom';
import mail from '../../assets/icon/mail.png';
import chat from '../../assets/icon/chat.png';
import { getCookie } from "../../util/cookieUtil";

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

const CommuteListComponent = ()=>{
    const [empNo, setEmpNo] = useState(getCookie("member").empNo);
    const [commute, setCommute] = useState(initState);
    const [empData, setEmpData] = useState("");
    const [deptNo, setDeptNo] = useState(getCookie("member").deptNo);
    const navigate  = useNavigate();
    
    const {page,size, moveToList,moveToCommuteList,moveToRead,moveToModifyCommute} = useCustomMove();

    useEffect(() => {
        getCommuteList(empNo,[page,size]).then(res => {
            console.log(res);
            setCommute(res);
        })
    },[page]);

    const handleCheckIn = () =>{
        setCheckIn(empNo).then(()=>moveToRead(empNo));
    }

    const handleCheckOut = () =>{
        putCheckOut(empNo).then(()=>moveToRead(empNo));
    }
    
    useEffect(()=>{
        getOneEmp(empNo).then((data)=>{
            console.log(data);
            setEmpData(data);
        }).catch((error)=>{
            console.log(error);
        })
    },[]);

    const goToBoardList = () => {
        navigate(`/board/list`)
      }
    
      const goToModify = (commNo) => {
        if(empData.jobNo === 999){
            moveToModifyCommute(commNo);
        }else{
            alert("권한이 없습니다.")
        }
      }

    return <>
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
            


        <div className=" mt-10 m-2 p-4">
            <div>
                <h2 className="text-center text-3xl font-semibold">{empData.firstName}{empData.lastName}님 출퇴근 목록</h2>
            </div>
            <div className='flex flex-col p-6 w-full'>
    {commute.dtoList.map((data) => {
        return (
            <div 
                key={data.checkDate} 
                className='flex flex-row w-full p-2 m-2 rounded-md justify-center items-center'
            >
                <div className="flex flex-row justify-center items-center w-full">
                    <div className="text-2xl text-center w-[40%] p-2 rounded shadow-md">
                        <div>날짜 : {data.checkDate}</div>
                        <div>출근 : {data.checkInTime}</div>
                        <div>퇴근 : {data.checkOutTime}</div>
                    </div>
                    <div className="flex p-4 w-[15%] justify-center">
                        {deptNo===999?<button 
                            type="button" 
                            className="inline-block px-6 py-3 text-xl text-white bg-[#8ba7cd]  hover:bg-[#6f8cb4] rounded-md"
                            onClick={() => goToModify(data.commNo)}
                        >
                            수정
                        </button>:<></>}
                        
                    </div>
                </div>
            </div>
        );
    })}
</div>


            <CommutePageComponent
                serverData={commute} 
                empNo = {empNo}
                movePage={moveToCommuteList}
                />
            </div>

            <div className="flex justify-center p-4 gap-4">

                <button type="button" 
                className="inline-block px-6 py-3 text-xl font-medium bg-[#8ba7cd] text-white  hover:bg-[#6f8cb4] rounded-md mb-8 cursor-pointer"
                onClick={()=>handleCheckIn()}>
                    출근
                </button>
                
                <button type="button" 
                className="inline-block px-6 py-3 text-xl font-medium bg-[#8ba7cd] text-white  hover:bg-[#6f8cb4] rounded-md mb-8 cursor-pointer"
                onClick={()=>handleCheckOut()}>
                    퇴근
                </button>

                <button type="button"  
                className="inline-block px-6 py-3 text-xl font-medium bg-[#8ba7cd] text-white  hover:bg-[#6f8cb4] rounded-md mb-8 cursor-pointer"
                onClick={()=>moveToRead(empNo)}>
                    이전
                </button>

                {/* <button type="button" 
                className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
                onClick={()=>moveToModify(empNo)}>
                    Modify
                </button> */}

                <button type="button"
                className="inline-block px-6 py-3 text-xl font-medium bg-[#8ba7cd] text-white  hover:bg-[#6f8cb4] rounded-md mb-8 cursor-pointer"
                onClick={()=>moveToList({page})}>
                    직원목록
                </button>
            </div>
    </div>
    </>
}

export default CommuteListComponent;