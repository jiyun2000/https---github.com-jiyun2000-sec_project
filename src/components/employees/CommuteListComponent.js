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
import { getCookie, removeCookie } from "../../util/cookieUtil";
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

const CommuteListComponent = ({empNo})=>{
    const [commute, setCommute] = useState(initState);
    const [empData, setEmpData] = useState("");
    const [deptNo, setDeptNo] = useState(getCookie("member").deptNo);
    const navigate  = useNavigate();
    const [chatCntCook, setChatCntCook] = useState(getCookie("alert"));
  
    
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
        if(empData.jobNo === 1){
            moveToModifyCommute(commNo);
        }else{
            alert("권한이 없습니다.")
        }
      }
 const checkRemove = () => {
    removeCookie("alert");
  }

  const dateNow = new Date();
  const today = dateNow.toISOString().slice(0,10);
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
                <Link to={`/chat/empList/${empNo}?page=1`} className="w-12 cursor-pointer" onClick={()=>checkRemove()}>
                {chatCntCook  ? 
                    <img src={colorChat} alt='colorChat' className='w-full' /> :
                    <img src={chat} alt="Chat" className="w-full" />
                }
                </Link>
            </div>
        </div>
            


        <div className="mt-10 m-2 p-4">
    <h2 className="text-center text-3xl font-semibold">{empData.firstName}{empData.lastName}님 근태현황</h2>
    
    <div className="overflow-x-auto mt-6 flex justify-center">
        <table className="w-[70%] bg-white border border-gray-200 shadow-lg">
            <thead className="bg-gray-100 ">
                <tr>
                    <th className="px-4 py-2 text-center text-xl font-semibold">날짜</th>
                    <th className="px-4 py-2 text-center text-xl font-semibold">출근</th>
                    <th className="px-4 py-2 text-center text-xl font-semibold">퇴근</th>
                    {deptNo === 1 && (
                    <th className="px-4 py-2 text-center text-xl font-semibold">수정</th>
                    )}    
                    </tr>
            </thead>
            <tbody>
                {commute.dtoList.map((data) => {
                    return (
                        <tr key={data.checkDate} className="border-b ">
                            <td className="px-4 py-3 text-center">{data.checkDate}</td>
                            <td className="px-4 py-3 text-center">{data.checkInTime}</td>
                            <td className="px-4 py-3 text-center">{data.checkOutTime}</td>
                            {deptNo === 1 && (
                            <td className="px-4 py-2 text-center">
                                    <button 
                                        type="button" 
                                        className="inline-block px-6 py-3 text-xl text-white bg-[#777777] hover:bg-[#3c3b3b] rounded-md"
                                        onClick={() => goToModify(data.commNo)}
                                    >
                                        수정
                                    </button>
                            </td>
                         )}

                        </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
    <CommutePageComponent
        serverData={commute} 
        empNo={empNo}
        movePage={moveToCommuteList}
    />
</div>


            <div className="flex justify-center p-4 gap-4">

                <button type="button" 
                className="inline-block px-6 py-3 text-xl font-medium bg-[#777777] text-white  hover:bg-[#3c3b3b] rounded-md mb-8 cursor-pointer"
                onClick={()=>handleCheckIn()}>
                    출근
                </button>
                
                <button type="button" 
                className="inline-block px-6 py-3 text-xl font-medium bg-[#777777] text-white  hover:bg-[#3c3b3b] rounded-md mb-8 cursor-pointer"
                onClick={()=>handleCheckOut()}>
                    퇴근
                </button>

                <button type="button"  
                className="inline-block px-6 py-3 text-xl font-medium bg-[#777777] text-white  hover:bg-[#3c3b3b] rounded-md mb-8 cursor-pointer"
                onClick={()=>moveToRead(empNo)}>
                    이전
                </button>

                {/* <button type="button" 
                className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
                onClick={()=>moveToModify(empNo)}>
                    Modify
                </button> */}

                <button type="button"
                className="inline-block px-6 py-3 text-xl font-medium bg-[#777777] text-white  hover:bg-[#3c3b3b] rounded-md mb-8 cursor-pointer"
                onClick={()=>moveToList({page})}>
                    직원목록
                </button>
            </div>
    </div>
    </>
}

export default CommuteListComponent;