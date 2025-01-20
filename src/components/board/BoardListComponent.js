import React, { useEffect, useState } from 'react';
import { getList } from '../../api/boardApi';
import useCustomMove from '../../hooks/useCustomMove';
import PageComponent from '../common/PageComponent';
import { getCookie } from '../../util/cookieUtil';
import mail from "../../assets/icon/mail.png";
import chat from "../../assets/icon/chat.png";
import BoardTitleComponent from '../board/BoardTitleComponent';
import { Link } from 'react-router-dom';

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
  const [empNo, setEmpNo] = useState(getCookie("member").empNo);
  const { page, size, moveToRead, moveToAdd, moveToList } = useCustomMove();

  useEffect(() => {
    getList([page, size]).then((data) => {
      console.log(data);
      setBoard(data);
    });
  }, [page]);

  const handleClickAdd = () => {
    moveToAdd();
  };

  const handleChangeBoard = (evt) => {
    board[evt.target.id] = evt.target.id;
    setBoard({ ...board });
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  }

  useEffect(()=>{

  })

  return (
    <>
    <div>
      <div className="flex justify-between items-center px-6 py-4 bg-white shadow-lg rounded-md mb-8">
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

    
      <div className='flex flex-col p-5 m-10 border border-slate-400 rounded-md'>
        <div className="text-3xl font-semibold text-center">
          <h2>공지사항</h2>
        </div>

        <div className='flex justify-center flex-col text-center mb-6'>
          <div className="flex flex-col w-full mx-auto p-6 text-center ">
            {board.dtoList.map((data) => {
              return (
                <div
                  key={data.boardNo}
                  className="flex w-2/3 min-w-[400px] p-2 m-2 rounded shadow-md text-center justify-center"
                  onClick={() => moveToRead(data.boardNo)}
                >
                  <div className="w-1/5 text-left">{data.boardNo}</div>
                  
                  <div className="w-3/5 text-center">{data.title}</div>

                  <div className="w-1/5 text-right">{formatDate(data.regdate)}</div>
                </div>
              );
            })}
          </div>

          <PageComponent serverData={board} movePage={moveToList} />
        </div>
      </div>
      <div className="flex justify-center p-4">
        <button
          type="button"
          className="inline-block rounded p-4 m-2 text-xl w-32 text-white  bg-[#95bce8] hover:text-white hover:bg-[#8daad8] cursor-pointer"
          onClick={handleClickAdd}
        >
          추가
        </button>
      </div>
          <PageComponent serverData={board} movePage={moveToList} />
        </div>

        {/* <div className="flex justify-center p-4">
          <button
            type="button"
            className="inline-block rounded p-4 m-2 text-xl w-32 text-white  bg-[#95bce8] hover:text-white hover:bg-[#8daad8] cursor-pointer"
            onClick={handleClickAdd}
          >
            추가
          </button>
        </div> */}


    </>
  );
};

export default BoardListComponent;
