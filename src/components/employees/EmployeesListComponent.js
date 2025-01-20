import React, { useEffect, useState } from 'react';
import { getList } from '../../api/employeesApi';
import useCustomMove from '../../hooks/useCustomMove';
import PageComponent from '../common/PageComponent';
import BoardTitleComponent from '../board/BoardTitleComponent';
import { Link } from 'react-router-dom';
import mail from '../../assets/icon/mail.png';
import chat from '../../assets/icon/chat.png';
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


const EmployeesListComponent = () => {

    const [employees,setEmployees] = useState(initState);
    const [search, setSearch] = useState('');
    const [filterEmployees, setFilterEmployees] = useState([]);
    const [searchType, setSearchType] = useState('empNo'); //
    const [empNo, setEmpNo] = useState(getCookie("member").empNo);

    const { page, size, moveToRead, moveToAdd, moveToList } = useCustomMove();

    useEffect(() => {
            getList([page,size]).then(data => {
                setEmployees(data);
                setFilterEmployees(data.dtoList);
            });
    }, [page,size]);

    const handleClickAdd = () =>{
        moveToAdd();
    }
    
    const handleFilter = () => {
        const lowerSearch = search.toLowerCase();
        let filteredList = [];

        if (searchType === 'empNo') {
            filteredList = employees.dtoList.filter(employee =>
                employee.empNo.toString().includes(lowerSearch)
            );
        } else if (searchType === 'name') {
            filteredList = employees.dtoList.filter(employee => {
                const fullName = (employee.firstName + employee.lastName).toLowerCase();
                return fullName.includes(lowerSearch);  
            });
        }
        setFilterEmployees(filteredList); 
    }


    const handleSearch = (evt) => {
        setSearch(evt.target.value);
    }

    return  (
        <div>
            <div className="flex justify-between items-center w-full bg-white shadow-lg rounded-md mb-8 px-6 py-4">
                <div className="flex items-center space-x-8">
                    <div className="text-2xl font-semibold text-blue-800 select-none">
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
    
            <div className="flex flex-col items-center py-10 px-4">
                <h1 className="text-3xl font-semibold mb-6 border-b border-gray-400">직원 목록</h1>
    
                <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
                    <select
                        value={searchType}
                        onChange={(e) => setSearchType(e.target.value)}
                        className="p-2 border-2 border-gray-300 rounded-md"
                    >
                        <option value="empNo">사원번호</option>
                        <option value="name">이름</option>
                    </select>
    
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearch}
                        className="p-2 border-2 border-gray-300 rounded-md w-64 "
                        placeholder="검색어 입력"
                    />
    
                    <button
                        type="button"
                        onClick={handleFilter}
                        className="inline-block px-6 py-2 text-xl text-white bg-[#aacbd5] rounded-md hover:bg-[#9bb5bd]"
                    >
                        검색
                    </button>
                </div>
    
                <div className="overflow-x-auto w-full">
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
                            {filterEmployees.map((data) => (
                                <tr
                                    key={data.empNo}
                                    className="bg-gray-50 cursor-pointer text-center"
                                    onClick={() => moveToRead(data.empNo)}
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
    
                <div className="mt-6">
                    <PageComponent
                        serverData={employees}
                        movePage={moveToList}
                    />
                </div>
    
                <div className="flex justify-center mt-6">
                    <button
                        type="button"
                        onClick={handleClickAdd}
                        className="inline-block px-6 py-3 text-xl text-white bg-[#aacbd5] rounded-md hover:bg-[#9bb5bd]"
                    >
                        추가
                    </button>
                </div>
            </div>
        </div>
    );
    
}

export default EmployeesListComponent;