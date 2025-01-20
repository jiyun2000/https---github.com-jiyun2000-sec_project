import { useEffect, useState } from 'react';
import useCustomMove from '../../hooks/useCustomMove';
import { getBookList, getOne } from '../../api/boardApi';
import { useParams } from 'react-router-dom';

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
      <div className="flex flex-col justify-center items-center w-full m-3">
        <div className="w-2/3 shadow-lg p-5 pr-5">
          <h2 className="text-center text-3xl font-semibold">
            {' '}
            {board.title}{' '}
          </h2>
          <div className="flex justify-center">
            <div className="relative mb-4 flex flex-row items-center">
              <div className="p-6 font-bold">게시글 번호</div>
              <div className="p-6 rounded-r border border-solid shadow-md">
                {board.boardNo}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center w-full m-3">
            <div className="w-2/3 shadow-lg p-5 pr-5">
              <div className="p-6 font-bold">분류</div>
              <div className="p-6 rounded-r border border-solid shadow-md">
                {board.category}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center w-full m-3">
            <div className="w-2/3 shadow-lg p-5 pr-5">
              <div className="p-6 font-bold">등록일</div>
              <div className="p-6 rounded-r border border-solid shadow-md">
                {board.regdate}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center w-full m-3">
            <div className="w-2/3 shadow-lg p-5 pr-5">
              <div className="p-6 font-bold">제목</div>
              <div className="p-6 rounded-r border border-solid shadow-md">
                {board.title}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center w-full m-3">
            <div className="w-2/3 shadow-lg p-5 pr-5">
              <div className="p-6 font-bold">내용</div>
              <div className="p-6 rounded-r border border-solid shadow-md">
                {board.contents}
              </div>
            </div>
          </div>

          <div className="flex justify-center p-4">
            <button
              type="button"
              className="inline-block rounded p-4 m-2 text-xl w-32 text-white  bg-[#95bce8] hover:text-white hover:bg-[#8daad8] cursor-pointer"
              onClick={() => moveToModify(boardNo)}
            >
              수정
            </button>

            <button
              type="button"
              className="inline-block rounded p-4 m-2 text-xl w-32 text-white  bg-[#95bce8] hover:text-white hover:bg-[#8daad8] cursor-pointer"
              onClick={moveToList}
            >
              리스트
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BoardReadComponent;
