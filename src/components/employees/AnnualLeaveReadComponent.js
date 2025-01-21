import { useEffect, useState } from "react"
import useCustomMove from "../../hooks/useCustomMove";
import { getALOne } from "../../api/annualLeaveApi";
import { useNavigate, useParams } from "react-router-dom";
import BoardTitleComponent from '../board/BoardTitleComponent';
import { Link } from 'react-router-dom';
import mail from '../../assets/icon/mail.png';
import chat from '../../assets/icon/chat.png';
import { getOneEmp } from "../../api/employeesApi";


const initState = {
    annualId : 0 ,
    empNo : 0,
    antecedent : 0,
    hours : 0
}

const AnnualLeaveReadComponent = ({empNo})=>{
    const [annualLeave, setAnnualLeave] = useState(initState);
    const [empData, setEmpData] = useState("");
    let cnt = 0;

    const navigate = useNavigate();

    const {page,moveToList, moveToRead} = useCustomMove();

    useEffect(()=>{
        getALOne(empNo).then(res => {
            setAnnualLeave(res);
        });
    },[cnt]);

    const moveToAdd = () =>{
        navigate({pathname:`../../dayoff/add`});
    }
    useEffect(()=>{
        getOneEmp(empNo).then((data)=>{
            console.log(data);
            setEmpData(data);
        }).catch((error)=>{
            console.log(error);
        })
    },[])

    const goToBoardList = () => {
        navigate(`/board/list`)
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
            {/* <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Annual Id</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{annualLeave.annualId}</div>
                </div>
            </div> */}
        <div>
           <h2 className="text-center text-3xl font-semibold">{empData.firstName}{empData.lastName}님 연차 </h2>
        </div>
            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-row items-center justify-center">
                    <div className="w-[10%] p-6 font-bold">사원번호</div>
                    <div className="w-[20%] p-6 rounded-md border border-slate-400 text-center">{annualLeave.empNo}</div>
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-row items-center justify-center">
                    <div className="w-[10%] p-6 font-bold">연차</div>
                    <div className="w-[20%] p-6 rounded-md border border-slate-400 text-center">{annualLeave.antecedent}</div>
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-row items-center justify-center">
                    <div className="w-[10%] p-6 font-bold">남은 시간</div>
                    <div className="w-[20%] p-6 rounded-md border border-slate-400 text-center">{annualLeave.hours}</div>
                </div>
            </div>

            <div className="flex justify-center p-4">

                <button type="button" 
                className="inline-block  p-4 m-2 text-xl w-40 text-white bg-[#aacbd5] rounded-md hover:bg-[#9bb5bd]"
                onClick={moveToAdd}>
                    연차 사용
                </button>

                <button type="button" 
                className="inline-block  p-4 m-2 text-xl w-40 text-white bg-[#aacbd5] rounded-md hover:bg-[#9bb5bd]"
                onClick={()=>moveToRead(empNo)}>
                    이전
                </button>

                {/* <button type="button" 
                className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
                onClick={()=>moveToModify(empNo)}>
                    Modify
                </button> */}

                <button type="button"
                className=" p-4 m-2 text-xl w-32 text-white bg-[#aacbd5] rounded-md hover:bg-[#9bb5bd]"
                onClick={()=>moveToList({page})}>
                    리스트
                </button>
            </div>
        </div>
    </div>
    </>
}

export default AnnualLeaveReadComponent;