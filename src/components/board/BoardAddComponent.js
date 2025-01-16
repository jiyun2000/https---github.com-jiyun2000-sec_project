import { useState } from 'react';
import useCustomMove from '../../hooks/useCustomMove';
import { addOne } from '../../api/boardApi';

const initState = {
  boardNo: 0,
  title: '',
  contents: '',
  mailAddress: '',
  catecory: '',
  regdate: '',
  moddate: '',
  replyCount: 0,
};

const BoardAddComponent = () => {
  const [board, setBoard] = useState({ ...initState });

  const { moveToList } = useCustomMove();

  const handleClickAdd = () => {
    addOne(board).then(() => {
      moveToList();
    });
  };

  const handleChangeBoard = (evt) => {
    board[evt.target.name] = evt.target.value;
    setBoard({ ...board });
  };

  return (
    <div className='flex flex-col justify-center items-center w-full m-3'>
    <div className='w-2/3 shadow-lg p-5 pr-5'>
      <h2 className='text-center text-3xl font-semibold my-5'>공지사항 등록</h2>
      <div className="flex justify-center">
        <div className="relative mb-4 flex flex-row items-center">
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

      <div className="flex justify-center">
        <div className="relative mb-4 flex flex-row items-center">
          <div className="p-6 font-bold">내용</div>
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
        <div className="relative mb-4 flex flex-row items-center">
          <div className="p-6 font-bold">메일 주소</div>
          <input
            className="p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="mailAddress"
            type={'text'}
            value={board.mailAddress}
            onChange={handleChangeBoard}
          ></input>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex flex-row items-center">
          <div className="p-6 font-bold">분류</div>
          <input
            className="p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="catecory"
            type={'text'}
            value={board.catecory}
            onChange={handleChangeBoard}
          ></input>
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
    </div>
    </div>
  );
};

export default BoardAddComponent;
