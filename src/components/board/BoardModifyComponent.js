import { useEffect, useState } from 'react';
import useCustomMove from '../../hooks/useCustomMove';
import { delOne, getOne, putOne } from '../../api/boardApi';

const initState = {
  boardNo: 0,
  title: '',
  contents: '',
  mailAddress: '',
  category: '',
  regdate: '',
  moddate: '',
  replyCount: 0,
};

const BoardModifyComponent = ({ boardNo }) => {
  const [board, setBoard] = useState({ ...initState });

  const { moveToList, moveToRead } = useCustomMove();

  useEffect(() => {
    getOne(boardNo).then((data) => setBoard(data));
  }, [boardNo]);

  const handleClickDelete = () => {
    board['category'] = '완료';
    setBoard({ ...board });

    //   delOne(boardNo).then(() => {
    putOne(boardNo, board).then(() => {
      moveToList();
    });
    // });
  };

  const handleClickModify = () => {
    putOne(boardNo, board).then(() => moveToRead(boardNo));
  };

  const handleChangeBoard = (evt) => {
    board[evt.target.name] = evt.target.value;
    setBoard({ ...board });
  };

  return (
    <div className="flex flex-col justify-center items-center w-full m-3">
      <div className="w-2/3 shadow-lg p-5 pr-5">
        <h2 className="text-center text-3xl font-semibold">
          {board.title} 내용 수정
        </h2>
        <div className="flex justify-center relative mb-4 flex-row items-center ">
          <div className="p-6 font-bold">게시글 번호</div>
          <div className="p-6 rounded-r border border-solid shadow-md">
            {board.boardNo}
          </div>
        </div>

        <div className="flex flex-col justify-center items-center m-3 ">
          <div className="flex justify-center relative mb-4 flex-row items-center ">
            <div className="p-6 font-bold">제목</div>
            <input
              className="p-6 rounded-r border border-solid border-neutral-300 shadow-md"
              name="title"
              type={'text'}
              value={board.title}
              onChange={handleChangeBoard}
            ></input>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center w-full m-3">
          <div className="flex justify-center relative mb-4 flex-row items-center ">
            <div className="p-6  font-bold">내용</div>
            <input
              className="p-6 rounded-r border border-solid border-neutral-300 shadow-md"
              name="contents"
              type={'text'}
              value={board.contents}
              onChange={handleChangeBoard}
            ></input>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-1/5 p-6 text-right font-bold">category</div>
            <select
              id="category"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
              name="category"
              type={'text'}
              value={board.category}
              onChange={handleChangeBoard}
            >
              <option value="">선택해주세요</option>
              <option value="공지">공지</option>
              <option value="긴급">긴급</option>
              <option value="완료">완료</option>
            </select>
          </div>
        </div>

        <div className="flex justify-center p-4">
          <button
            type="button"
            className="inline-block rounded p-4 m-2 text-xl w-32 text-white  bg-[#95bce8] hover:text-white hover:bg-[#8daad8] cursor-pointer"
            onClick={handleClickModify}
          >
            수정완료
          </button>

          <button
            type="button"
            className="inline-block rounded p-4 m-2 text-xl w-32 text-white  bg-[#95bce8] hover:text-white hover:bg-[#8daad8] cursor-pointer"
            onClick={handleClickDelete}
          >
            완료처리
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardModifyComponent;
