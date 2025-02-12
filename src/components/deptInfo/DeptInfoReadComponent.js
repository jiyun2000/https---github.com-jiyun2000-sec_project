import { useEffect, useState } from "react"
import useCustomMove from "../../hooks/useCustomMove";
import { getEmpList, getOne } from "../../api/deptInfoApi";
import DeptInfoPageComponent from "../common/DeptInfoPageComponent";
import { useNavigate, useParams } from "react-router-dom";
import { getCookie, removeCookie } from '../../util/cookieUtil';
import mail from "../../assets/icon/mail.png";
import chat from "../../assets/icon/chat.png";
import BoardTitleComponent from '../board/BoardTitleComponent';
import { Link } from 'react-router-dom';
import colorChat from "../../assets/icon/colorChat.png";

const initState = {
    deptNo : 0,
    deptName : '',
    deptAddress : '',
    phoneNo : ''
}

const initStateEmp = {
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

const DeptInfoReadComponent = ({deptNo})=>{
    const [deptInfo, setDeptInfo] = useState(initState);
    const [employees, setEmployees] = useState(initStateEmp);
    const [empNo, setEmpNo] = useState(getCookie("member").empNo);
    const {page, size, moveToDeptInfoList, moveToList, moveToModify} = useCustomMove();
    const [deptInfoNo, setDeptInfoNo] = useState(getCookie("member").deptNo);
    const navigate = useNavigate();
    const [chatCntCook, setChatCntCook] = useState(getCookie("alert"));

    useEffect(()=>{
        getOne(deptNo).then(res => {
            setDeptInfo(res);
        });
    },[page]);

    useEffect(() => {
        getEmpList(deptNo,[page,size]).then(res => {
            setEmployees(res);
        })
    },[page]);

    const goToBoardList = () => {
        navigate(`/board/list`)
      }

    const checkRemove = () => {
        removeCookie("alert");
      }
    return <>
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
          <Link to={`/chat/empList/${empNo}?page=1`} className="w-12 cursor-pointer"  onClick={()=>checkRemove()}>
          {chatCntCook  ? 
              <img src={colorChat} alt='colorChat' className='w-full' /> :
              <img src={chat} alt="Chat" className="w-full" />
          }
          </Link>
        </div>
      </div>

    <div className="px-6 py-8 bg-white rounded-lg  mb-8 w-full">
        <h1 className="text-3xl font-bold text-center mb-8">{deptInfo.deptName} 부서 안내</h1>
  
        <div className=" flex flex-col items-center justify-center">
            <div className="flex justify-center items-center p-6 rounded-lg shadow-sm">
                <div className="font-semibold text-lg ml-2 mr-2">부서 번호</div>
                <div className="text-lg ml-2 mr-2">{deptInfo.deptNo}</div>
            </div>
    
            <div className="flex justify-center items-center  p-6 rounded-lg shadow-sm">
                <div className="font-semibold text-lg ml-2 mr-2">부서 이름</div>
                <div className="text-lg ml-2 mr-2">{deptInfo.deptName}</div>
            </div>
    
            <div className="flex justify-center items-center  p-6 rounded-lg shadow-sm">
                <div className="font-semibold text-lg ml-2 mr-2">부서 주소</div>
                <div className="text-lg ml-2 mr-2">{deptInfo.deptAddress}</div>
            </div>
    
            <div className="flex justify-center items-center p-6 rounded-lg shadow-sm">
                <div className="font-semibold text-lg ml-2 mr-2">대표 번호</div>
                <div className="text-lg ml-2 mr-2">{deptInfo.phoneNo}</div>
            </div>
        </div>
  
        <div className="mt-8 flex justify-center gap-4">
            {deptInfoNo===1?<button
                type="button"
                className="px-6 py-2 text-xl font-medium bg-[#8ba7cd] text-white  hover:bg-[#6f8cb4] rounded-md"
                onClick={() => moveToModify(deptNo)}
            >
            수정
            </button>:<></>}
            
            <button
                type="button"
                className="px-6 py-2 text-xl font-medium bg-[#8ba7cd] text-white  hover:bg-[#6f8cb4] rounded-md"
                onClick={moveToList}
            >
            리스트
            </button>
        </div>
    </div>


        <h1 className='text-center mt-10 font-bold text-3xl'> 소속 직원 목록</h1>
            <div className="overflow-x-auto w-full p-8">
                    <table className="w-full ">
                        <thead className="bg-gray-200 sticky top-0 z-10">
                            <tr>
                                <th className="px-6 py-4 text-center">사원 번호</th>
                                <th className="px-6 py-4 text-center">이름</th>
                                <th className="px-6 py-4 text-center">입사일</th>
                                <th className="px-6 py-4 text-center">메일주소</th>
                                <th className="px-6 py-4 text-center">성별</th>
                                <th className="px-6 py-4 text-center">전화번호</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.dtoList.map((data) => (
                                <tr
                                    key={data.empNo}
                                    className="bg-gray-50 cursor-pointer text-center"
                                >
                                    <td className="px-6 py-4">{data.empNo}</td>
                                    <td className="px-6 py-4">{data.firstName} {data.lastName}</td>
                                    <td className="px-6 py-4">{data.hireDate}</td>
                                    <td className="px-6 py-4">{data.mailAddress}</td>
                                    <td className="px-6 py-4">{data.gender === 'm' ? '남성' : '여성'}</td>
                                    <td className="px-6 py-4">{data.phoneNum}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            <div>
                <DeptInfoPageComponent
                serverData={employees} 
                deptInfo={deptInfo}
                movePage={moveToDeptInfoList}
                 />
            </div>
    </div>
    </>
}

export default DeptInfoReadComponent;