import React, { useEffect, useState } from 'react';
import { getList } from '../../api/boardApi';
import useCustomMove from '../../hooks/useCustomMove';
import PageComponent from '../common/PageComponent';
import { getCookie, removeCookie } from '../../util/cookieUtil';
import mail from '../../assets/icon/mail.png';
import chat from '../../assets/icon/chat.png';
import BoardTitleComponent from '../board/BoardTitleComponent';
import { Link, useNavigate } from 'react-router-dom';
import { getOneEmp } from '../../api/employeesApi';
import colorChat from "../../assets/icon/colorChat.png";

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

const BoardListComponent = () => {
  const [board, setBoard] = useState(initState);
  const [empNo, setEmpNo] = useState(getCookie('member').empNo);
  const [deptNo, setDeptNo] = useState(getCookie('member').deptNo);
  const { page, size, moveToRead, moveToAdd, moveToList } = useCustomMove();
  const navigate = useNavigate();
  const [empData, setEmpData] = useState('');
  const [chatCntCook, setChatCntCook] = useState(getCookie("alert"));

  useEffect(() => {
    getList([page, size]).then((data) => {
      console.log(data);
      setBoard(data);
    });
  }, [page]);

  useEffect(()=>{
    getOneEmp(empNo).then((data) => {
      setEmpData(data)
    });
  }, [])

  const handleClickAdd = () => {
    if(empData.jobNo === 999){
      moveToAdd();
    }else{
      alert("권한이 없습니다.");
      return;
    }

  };

  const handleChangeBoard = (evt) => {
    board[evt.target.id] = evt.target.id;
    setBoard({ ...board });
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  useEffect(() => {});

  const goToBoardList = () => {
    navigate(`/board/list`);
  };

  const checkRemove = () => {
    removeCookie("alert");
  }

  return (
    <>
      <div>
        <div className="flex justify-between items-center px-6 py-4 bg-white shadow-lg rounded-md mb-8">
          <div className="flex items-center space-x-8">
            <div
              className="text-2xl font-semibold text-blue-800 select-none cursor-pointer"
              onClick={goToBoardList}
            >
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
            <Link
              to={`/chat/empList/${empNo}?page=1`}
              className="w-12 cursor-pointer"
              onClick={()=>checkRemove()}
            >
              {chatCntCook  ? 
              <img src={colorChat} alt='colorChat' className='w-full' /> :
              <img src={chat} alt="Chat" className="w-full" />
        }
            </Link>
          </div>
        </div>

        <div className="flex flex-col p-5 m-10  justify-center rounded-md">
          <div className="text-3xl font-semibold text-center m-5">
            <h2>공지사항</h2>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full ">
              <thead className="bg-gray-200 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-4 text-center">번호</th>
                  <th className="px-6 py-4 text-center">분류</th>
                  <th className="px-6 py-4 text-center">제목</th>
                  <th className="px-6 py-4 text-center">등록일</th>
                </tr>
              </thead>
              <tbody>
                {board.dtoList.map((data) => (
                  <tr
                    key={data.boardNo}
                    className="bg-gray-50 cursor-pointer text-center"
                    onClick={() => moveToRead(data.boardNo)}
                  >
                    <td className="px-6 py-4 text-center">{data.boardNo}</td>
                    <td className="px-6 py-4 text-center">{data.category}</td>
                    <td className="px-6 py-4 text-center">{data.title}</td>
                    <td className="px-6 py-4 text-center">
                      {formatDate(data.regdate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {deptNo===999?<div className="flex justify-center p-4">
          <button
            type="button"
            className="inline-block  p-4 m-2 text-xl w-32 text-white  rounded-md bg-[#8ba7cd]  hover:bg-[#6f8cb4]  cursor-pointer"
            onClick={handleClickAdd}
          >
            추가
          </button>
        </div>:<></>}
        <PageComponent serverData={board} movePage={moveToList} />
      </div>
    </>
  );
};

export default BoardListComponent;
