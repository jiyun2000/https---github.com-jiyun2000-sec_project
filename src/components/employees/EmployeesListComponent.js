// import React, { useEffect, useState } from 'react';
// import { API_SERVER_HOST, getList } from '../../api/employeesApi';
// import useCustomMove from '../../hooks/useCustomMove';
// import PageComponent from '../common/PageComponent';
// import BoardTitleComponent from '../board/BoardTitleComponent';
// import { Link, useNavigate } from 'react-router-dom';
// import mail from '../../assets/icon/mail.png';
// import chat from '../../assets/icon/chat.png';
// import { getCookie, removeCookie } from '../../util/cookieUtil';
// import { getOne } from '../../api/deptInfoApi';
// import colorChat from "../../assets/icon/colorChat.png";

// const initState = {
//     dtoList : [],
//     pageNumList : [],
//     pageRequestDTO : null,
//     prev : false,
//     next : false,
//     totalCount : 0,
//     prevPage : 0,
//     nextPage : 0,
//     totalPage : 0,
//     current : 0
// }


// const EmployeesListComponent = () => {

//     const [employees,setEmployees] = useState(initState);
//     const [search, setSearch] = useState('');
//     const [filterEmployees, setFilterEmployees] = useState([]);
//     const [searchType, setSearchType] = useState('empNo'); //
//     const [cookEmpNo, setCookEmpNo] = useState(getCookie("member").empNo);
//     const navigate = useNavigate();
//     const [cookDeptNo, setCookDeptNo] = useState(getCookie("member").deptNo);
//     const [deptData, setDeptData] = useState('');
//     const [chatCntCook, setChatCntCook] = useState(getCookie("alert"));
//     const { page, size, moveToRead, moveToAdd, moveToList, moveToAddExcel } = useCustomMove();

//     useEffect(() => {
//             getList([page,size]).then(data => {
//                 setEmployees(data);
//                 console.log(data);
//                 console.log(data.dtoList); 

//             });
//     }, [page,size]);

//     const handleClickAdd = () =>{
//         moveToAdd();
//     }
    
//     useEffect(()=>{
//         getOne(cookDeptNo).then((data) => {
//             console.log(data);
//             setDeptData(data);
//         })
//     }, [])



//     const goToBoardList = () => {
//         navigate(`/board/list`)
//       }

//     const goToEmpRead = (empNo) => {
//         const strEmp = empNo + '';
//         const strCook = cookEmpNo + '';
//         console.log(strEmp);
//         console.log(strCook);
//         if(strEmp === strCook){
//             moveToRead(cookEmpNo)
//         }else if(deptData.deptNo === 1){
//             moveToRead(empNo)
//         }else{
//             alert("권한이 없습니다.");
//         }
//     }

//       const checkRemove = () => {
//         removeCookie("alert");
//       }

//       const handleClickAddExcel = () => {
//         moveToAddExcel();
//       }

//     return  (
//         <div>
//             <div className="flex justify-between items-center w-full bg-white shadow-lg rounded-md mb-8 px-6 py-4">
//                 <div className="flex items-center space-x-8">
//                     <div className="text-2xl font-semibold text-blue-800 select-none cursor-pointer" onClick={goToBoardList}>
//                         [공지사항]
//                     </div>
//                     <div className="w-64 text-2xl font-semibold cursor-pointer">
//                         <BoardTitleComponent />
//                     </div>
//                 </div>
//                 <div className="flex space-x-4">
//                     <Link to="/mail" className="w-12 cursor-pointer">
//                         <img src={mail} alt="Mail" className="w-full" />
//                     </Link>
//                     <Link to={`/chat/empList/${cookEmpNo}?page=1`} className="w-12 cursor-pointer" onClick={()=>checkRemove()}>
//                     {chatCntCook  ? 
//                         <img src={colorChat} alt='colorChat' className='w-full' /> :
//                         <img src={chat} alt="Chat" className="w-full" />
//                     }
//                     </Link>
//                 </div>
//             </div>
    
//             <div className="flex flex-col items-center py-10 px-4">
//                 <h1 className="text-3xl font-semibold mb-6 border-b border-gray-400">직원 목록</h1>

//                 <div className='flex justify-end w-full my-5'>
//                     <a 
//                     alt="form"
//                     className="inline-block px-6 py-3 text-xl bg-white text-black border border-[#6f8cb4] hover:bg-[#6f8cb4] hover:text-white rounded-md"
//                     href={`${API_SERVER_HOST}/api/employees/download/form`}>
//                         일괄 등록 폼 다운로드
//                     </a>
//                 </div>
    
//                 <div className="overflow-x-auto w-full">
//                     <table className="w-full ">
//                         <thead className="bg-gray-200 sticky top-0 z-10">
//                             <tr>
//                                 <th className="px-6 py-4 text-center">사원 번호</th>
//                                 <th className="px-6 py-4 text-center">이름</th>
//                                 <th className="px-6 py-4 text-center">입사일</th>
//                                 <th className="px-6 py-4 text-center">메일주소</th>
//                                 <th className="px-6 py-4 text-center">성별</th>
//                                 <th className="px-6 py-4 text-center">전화번호</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {employees.dtoList.map((data) => (
//                                 <tr
//                                     key={data.empNo}
//                                     className="bg-gray-50 cursor-pointer text-center"
//                                     onClick={() => goToEmpRead(data.empNo)}
//                                 >
//                                     <td className="px-6 py-4">{data.empNo}</td>
//                                     <td className="px-6 py-4">{data.firstName} {data.lastName}</td>
//                                     <td className="px-6 py-4">{data.hireDate}</td>
//                                     <td className="px-6 py-4">{data.mailAddress}</td>
//                                     <td className="px-6 py-4">{data.gender === 'm' ? '남성' : '여성'}</td>
//                                     <td className="px-6 py-4">{data.phoneNum.substring(0,3)}-{data.phoneNum.substring(3,7)}-{data.phoneNum.substring(7,data.phoneNum.length)}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
    
//                 <div className="mt-6">
//                     <PageComponent
//                         serverData={employees}
//                         movePage={moveToList}
//                     />
//                 </div>
                
//                 {cookDeptNo===1?<div className="flex justify-center mt-6 w-full">
//                     <button
//                         type="button"
//                         onClick={handleClickAdd}
//                         className="inline-block px-6 py-3 text-xl bg-[#8ba7cd] text-white  hover:bg-[#6f8cb4] rounded-md mr-5"
//                     >
//                         직원 등록
//                     </button>

//                     <button
//                         type="button"
//                         onClick={handleClickAddExcel}
//                         className="inline-block px-6 py-3 text-xl bg-[#8ba7cd] text-white  hover:bg-[#6f8cb4] rounded-md"
//                     >
//                         일괄 등록
//                     </button>
//                 </div>:<></>
//                 }
//             </div>
//         </div>
//     );
    
// }

// export default EmployeesListComponent;

import React, { useEffect, useState } from 'react';
import { API_SERVER_HOST, getList } from '../../api/employeesApi';
import useCustomMove from '../../hooks/useCustomMove';
import PageComponent from '../common/PageComponent';
import BoardTitleComponent from '../board/BoardTitleComponent';
import { Link, useNavigate } from 'react-router-dom';
import mail from '../../assets/icon/mail.png';
import chat from '../../assets/icon/chat.png';
import { getCookie, removeCookie } from '../../util/cookieUtil';
import { getOne } from '../../api/deptInfoApi';
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

const EmployeesListComponent = () => {
    const [employees, setEmployees] = useState(initState);
    const [search, setSearch] = useState('');
    const [filterEmployees, setFilterEmployees] = useState([]);
    const [searchType, setSearchType] = useState('empNo'); 
    const [cookEmpNo, setCookEmpNo] = useState(getCookie("member").empNo);
    const navigate = useNavigate();
    const [cookDeptNo, setCookDeptNo] = useState(getCookie("member").deptNo);
    const [deptData, setDeptData] = useState('');
    const [chatCntCook, setChatCntCook] = useState(getCookie("alert"));
    const { page, size, moveToRead, moveToAdd, moveToList, moveToAddExcel } = useCustomMove();

    useEffect(() => {
        getList([page, size]).then(data => {
            setEmployees(data);
            setFilterEmployees(data.dtoList); 
        });
    }, [page, size]);

    useEffect(() => {
        getOne(cookDeptNo).then((data) => {
            setDeptData(data);
        });
    }, []);

    const handleSearchChange = (e) => {
        const searchTerm = e.target.value;
        setSearch(searchTerm);

        if (searchTerm === '') {
            setFilterEmployees(employees.dtoList);
        } else {
            const filtered = employees.dtoList.filter(employee => {
                return (
                    employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    employee.lastName.toLowerCase().includes(searchTerm.toLowerCase())
                );
            });
            setFilterEmployees(filtered);
        }
    };

    const handleClickAdd = () => {
        moveToAdd();
    };

    const goToBoardList = () => {
        navigate(`/board/list`);
    };

    const goToEmpRead = (empNo) => {
        const strEmp = empNo + '';
        const strCook = cookEmpNo + '';
        if (strEmp === strCook) {
            moveToRead(cookEmpNo);
        } else if (deptData.deptNo === 1) {
            moveToRead(empNo);
        } else {
            alert("권한이 없습니다.");
        }
    };

    const checkRemove = () => {
        removeCookie("alert");
    };

    const handleClickAddExcel = () => {
        moveToAddExcel();
    };

    return (
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
                    <Link to={`/chat/empList/${cookEmpNo}?page=1`} className="w-12 cursor-pointer" onClick={() => checkRemove()}>
                        {chatCntCook ?
                            <img src={colorChat} alt='colorChat' className='w-full' /> :
                            <img src={chat} alt="Chat" className="w-full" />
                        }
                    </Link>
                </div>
            </div>

            <div className="flex flex-col items-center py-10 px-4 ">
                <h1 className="text-3xl font-semibold mb-6">직원 목록</h1>

                <div className="w-full mb-5 flex justify-center">
                    <input
                        type="text"
                        placeholder="사원 이름으로 검색"
                        value={search}
                        onChange={handleSearchChange}
                        className="w-1/3 px-4 py-2 border border-gray-300 rounded-md text-center "
                    />
                </div>

                <div className='flex justify-end w-full my-5'>
                    <a 
                        alt="form"
                        className="inline-block px-6 py-3 text-xl bg-white text-black border border-[#6f8cb4] hover:bg-[#6f8cb4] hover:text-white rounded-md"
                        href={`${API_SERVER_HOST}/api/employees/download/form`}>
                        일괄 등록 폼 다운로드
                    </a>
                </div>

                <div className="overflow-x-auto w-full">
                    <table className="w-full">
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
                            {filterEmployees.map((data) => (
                                <tr
                                    key={data.empNo}
                                    className="bg-gray-50 cursor-pointer text-center"
                                    onClick={() => goToEmpRead(data.empNo)}
                                >
                                    <td className="px-6 py-4">{data.empNo}</td>
                                    <td className="px-6 py-4">{data.firstName} {data.lastName}</td>
                                    <td className="px-6 py-4">{data.hireDate}</td>
                                    <td className="px-6 py-4">{data.mailAddress}</td>
                                    <td className="px-6 py-4">{data.gender === 'm' ? '남성' : '여성'}</td>
                                    <td className="px-6 py-4">{data.phoneNum.substring(0, 3)}-{data.phoneNum.substring(3, 7)}-{data.phoneNum.substring(7, data.phoneNum.length)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-6">
                    <PageComponent
                        serverData={employees}
                        movePage={moveToList}
                    />
                </div>

                {cookDeptNo === 1 ? (
                    <div className="flex justify-center mt-6 w-full">
                        <button
                            type="button"
                            onClick={handleClickAdd}
                            className="inline-block px-6 py-3 text-xl bg-[#8ba7cd] text-white hover:bg-[#6f8cb4] rounded-md mr-5"
                        >
                            직원 등록
                        </button>

                        <button
                            type="button"
                            onClick={handleClickAddExcel}
                            className="inline-block px-6 py-3 text-xl bg-[#8ba7cd] text-white hover:bg-[#6f8cb4] rounded-md"
                        >
                            일괄 등록
                        </button>
                    </div>
                ) : <></>}
            </div>
        </div>
    );
}

export default EmployeesListComponent;
