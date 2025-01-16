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
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      <div className="flex justify-center mt-10">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Title</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="title"
            type={'text'}
            value={board.title}
            onChange={handleChangeBoard}
          ></input>
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">contents</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="contents"
            type={'text'}
            value={board.contents}
            onChange={handleChangeBoard}
          ></input>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">mailAddress</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="mailAddress"
            type={'text'}
            value={board.mailAddress}
            onChange={handleChangeBoard}
          ></input>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">catecory</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="catecory"
            type={'text'}
            value={board.catecory}
            onChange={handleChangeBoard}
          ></input>
        </div>
      </div>

      <div className="flex justify-end p-4">
        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
          onClick={handleClickAdd}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default BoardAddComponent;
