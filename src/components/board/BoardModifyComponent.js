import { useEffect, useState } from 'react';
import useCustomMove from '../../hooks/useCustomMove';
import { delOne, getOne, putOne } from '../../api/boardApi';
import { getCookie } from '../../util/cookieUtil';
import mail from "../../assets/icon/mail.png";
import chat from "../../assets/icon/chat.png";
import BoardTitleComponent from '../board/BoardTitleComponent';
import { Link, useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  useEffect(() => {
    getOne(boardNo).then((data) => setBoard(data));
  }, [boardNo]);

  const handleClickDelete = () => {
    board['category'] = '완료';
    setBoard({ ...board });

    putOne(boardNo, board).then(() => {
      moveToList();
    });
  };

  const handleClickModify = () => {
    putOne(boardNo, board).then(() => moveToRead(boardNo));
  };

  const handleChangeBoard = (evt) => {
    board[evt.target.name] = evt.target.value;
    setBoard({ ...board });
  };

  const goToBoardList = () => {
    navigate(`/board/list`)
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center px-6 py-4 bg-white shadow-lg rounded-md mb-8">
         <div className="flex items-center space-x-8">
           <div className="text-2xl font-semibold text-blue-800 select-none cursor-pointer" onClick={goToBoardList}>
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

      <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-md p-6">
        <div className="text-3xl font-semibold text-center text-gray-800 mb-6">
          {board.title} 수정
        </div>

        <div className="flex justify-between items-center text-lg text-gray-500 mb-6">
          <div className="font-semibold">게시글 번호: {board.boardNo}</div>
        </div>

        <div className="mb-6">
          <label className="block text-xl font-semibold mb-2">제목</label>
          <input
            className="w-full p-4 text-lg border border-gray-300 rounded-md shadow-sm"
            type="text"
            name="title"
            value={board.title}
            onChange={handleChangeBoard}
          />
        </div>

        <div className="mb-6">
          <label className="block text-xl font-semibold mb-2">내용</label>
          <textarea
            className="w-full p-4 text-lg border border-gray-300 rounded-md shadow-sm"
            name="contents"
            value={board.contents}
            onChange={handleChangeBoard}
          />
        </div>

        <div className="mb-6">
          <label className="block text-xl font-semibold mb-2">카테고리</label>
          <select
            className="w-full p-4 text-lg border border-gray-300 rounded-md shadow-sm"
            name="category"
            value={board.category}
            onChange={handleChangeBoard}
          >
            <option value="">선택해주세요</option>
            <option value="공지">공지</option>
            <option value="긴급">긴급</option>
            <option value="완료">완료</option>
          </select>
        </div>

        <div className="flex justify-center gap-6">
          <button
            type="button"
            className="px-6 py-3 text-xl text-white bg-[#aacbd5] rounded-md hover:bg-[#9bb5bd] cursor-pointer transition duration-300"
            onClick={handleClickModify}
          >
            수정완료
          </button>

          <button
            type="button"
            className="px-6 py-3 text-xl text-white bg-[#aacbd5] rounded-md hover:bg-[#9bb5bd] cursor-pointer transition duration-300"
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

