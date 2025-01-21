import { useEffect, useState } from 'react';
import useCustomMove from '../../hooks/useCustomMove';
import { getBookList, getOne } from '../../api/boardApi';
import { useNavigate, useParams } from 'react-router-dom';
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

const BoardReadComponent = ({ boardNo }) => {
  const [board, setBoard] = useState(initState);
  let cnt = 0;
  const [empNo, setEmpNo] = useState(getCookie("member").empNo);
  const navigate = useNavigate();


  const { moveToList, moveToModify } = useCustomMove();

  useEffect(() => {
    getOne(boardNo).then((res) => {
      setBoard(res);
    });
  }, [cnt]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  }

  const goToBoardList = () => {
    navigate(`/board/list`)
  }

  return (
    <>
    <div>
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

      <div className="max-w-3xl mx-auto mt-10 bg-white  rounded-md p-6">
        <div className="text-3xl font-semibold text-center text-gray-800 mb-6">
          {board.title}
        </div>

        <div className="flex justify-between items-center text-lg text-gray-500 mb-6">
          <span className="font-semibold">{board.category}</span>
          <span>{formatDate(board.regdate)}</span>
        </div>

        <div className="text-lg text-gray-700 leading-relaxed text-center mb-8">
          {board.contents}
        </div>

        <div className="flex justify-center gap-6 mt-8">
          <button
            type="button"
            className="px-6 py-3 text-xl text-white bg-[#aacbd5] rounded-md hover:bg-[#9bb5bd] cursor-pointer "
            onClick={() => moveToModify(boardNo)}
          >
            수정
          </button>

          <button
            type="button"
            className="px-6 py-3 text-xl text-white bg-[#aacbd5] rounded-md hover:bg-[#9bb5bd] cursor-pointer"
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
