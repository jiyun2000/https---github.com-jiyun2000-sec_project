import React, { useEffect, useState } from 'react';
import { getList } from '../../api/boardApi';
import useCustomMove from '../../hooks/useCustomMove';
import PageComponent from '../common/PageComponent';

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

  return (
    <>
      <h2 className="text-2xl text-center m-10">공지사항</h2>
      <div className="text-1xl">
        <h2>목록</h2>
        <div className="flex flex-wrap mx-auto p-6">
          {board.dtoList.map((data) => {
            return (
              <div
                key={data.boardNo}
                className="flex w-full min-w-[400px] p-2 m-2 rounded shadow-md"
                onClick={() => moveToRead(data.boardNo)}
              >
                {data.boardNo} {data.title}
              </div>
            );
          })}
        </div>

        <PageComponent serverData={board} movePage={moveToList} />
      </div>

      <div className="flex justify-center p-4">
        <button
          type="button"
          className="inline-block rounded p-4 m-2 text-xl w-32 text-white  bg-sky-400 hover:text-white hover:bg-blue-500 cursor-pointer"
          onClick={handleClickAdd}
        >
          추가하기
        </button>
      </div>
    </>
  );
};

export default BoardListComponent;
