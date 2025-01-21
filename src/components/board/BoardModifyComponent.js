import { useEffect, useState } from 'react';
import useCustomMove from '../../hooks/useCustomMove';
import { delOne, getOne, putOne } from '../../api/boardApi';
import { getCookie } from '../../util/cookieUtil';
import mail from "../../assets/icon/mail.png";
import chat from "../../assets/icon/chat.png";
import BoardTitleComponent from '../board/BoardTitleComponent';
import { Link } from 'react-router-dom';


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
  const [empNo, setEmpNo] = useState(getCookie("member").empNo);
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

    <div className="flex flex-col justify-center items-center w-full m-3">

    <div className='flex flex-col justify-center w-full'>
      <div>
        <h2 className='text-3xl font-semibold text-center'>{board.title} 수정</h2>
      </div>

      <div className='flex flex-row justify-between text-2xl '>
        <div className='justify-start m-10'>{board.boardNo}</div>
        <div className='justify-end m-10'>{board.category}</div>
      </div>

      <div className='text-2xl text-center justify-center '>
        {board.contents}
      </div>

    </div>


      {/* <div className="w-2/3 shadow-lg p-5 pr-5">
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
        </div> */}

        <div className="flex justify-center p-4 m-10">
          <button
            type="button"
            className="inline-block  p-4 m-2 text-xl w-32 text-white bg-[#aacbd5] rounded-md hover:bg-[#9bb5bd] cursor-pointer"
            onClick={handleClickModify}
          >
            수정완료
          </button>

          <button
            type="button"
            className="inline-block  p-4 m-2 text-xl w-32 text-white bg-[#aacbd5] rounded-md hover:bg-[#9bb5bd] cursor-pointer"
            onClick={handleClickDelete}
          >
            완료처리
          </button>
        </div>
      </div>
    </div>
  // </div>
  );
};

export default BoardModifyComponent;
