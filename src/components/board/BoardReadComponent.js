import { useEffect, useState } from 'react';
import useCustomMove from '../../hooks/useCustomMove';
import { getBookList, getOne } from '../../api/boardApi';
import { useParams } from 'react-router-dom';

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

const BoardReadComponent = ({ boardNo }) => {
  const [board, setBoard] = useState(initState);
  let cnt = 0;

  const { moveToList, moveToModify } = useCustomMove();

  useEffect(() => {
    getOne(boardNo).then((res) => {
      setBoard(res);
    });
  }, [cnt]);

  return (
    <>
      <div className="border-2 border-sky-200 mt-10 m-2 p-4">
        <div className="flex justify-center mt-10">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-1/5 p-6 text-right font-bold">Book No</div>
            <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
              {board.boardNo}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-1/5 p-6 text-right font-bold">catecory</div>
            <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
              {board.catecory}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-1/5 p-6 text-right font-bold">regdate</div>
            <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
              {board.regdate}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-1/5 p-6 text-right font-bold">title</div>
            <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
              {board.title}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-1/5 p-6 text-right font-bold">contents</div>
            <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
              {board.contents}
            </div>
          </div>
        </div>

        {/* <div className="flex justify-center mt-10">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-1/5 p-6 text-right font-bold">replyCount</div>
            <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
              {board.replyCount}
            </div>
          </div>
        </div> */}

        <div className="flex justify-center p-4">
          <button
            type="button"
            className="inline-block rounded p-4 m-2 text-xl w-32 text-white  bg-sky-400 hover:text-white hover:bg-blue-500 cursor-pointer"
            onClick={() => moveToModify(boardNo)}
          >
            수정
          </button>

          <button
            type="button"
            className="inline-block rounded p-4 m-2 text-xl w-32 text-white  bg-blue-400 hover:text-white hover:bg-sky-500 cursor-pointer"
            onClick={moveToList}
          >
            리스트
          </button>
        </div>
      </div>
    </>
  );
};

export default BoardReadComponent;
