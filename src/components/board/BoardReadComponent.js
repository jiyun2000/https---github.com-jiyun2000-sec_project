import { useEffect, useState } from 'react';
import useCustomMove from '../../hooks/useCustomMove';
import { getBookList, getOne } from '../../api/boardApi';
import { useParams } from 'react-router-dom';
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

      <div className='flex flex-col text-center '>
        <div>
          <h2 className='text-3xl text-center font-semibold m-10'>{board.title}</h2>
        </div>

        <div className='flex flex-row justify-between items-center text-2xl'>
          <div className='justify-start ml-10'>{board.category}</div>
          <div className='justify-end mr-10'>{formatDate(board.regdate)}</div>
        </div>
        
        <div className='flex text-2xl text-center justify-center m-10'>
          {board.contents}
        </div>
      </div>

          <div className="flex justify-center p-4">
            <button
              type="button"
              className="inline-block  p-4 m-2 text-xl w-[8%] text-white  bg-[#aacbd5] rounded-md hover:bg-[#9bb5bd] cursor-pointer"
              onClick={() => moveToModify(boardNo)}
            >
              수정
            </button>

            <button
              type="button"
              className="inline-block  p-4 m-2 text-xl w-[9%] text-white bg-[#aacbd5] rounded-md hover:bg-[#9bb5bd] cursor-pointer"
              onClick={moveToList}
            >
              리스트
            </button>
          </div>
        </div>
      {/* </div>
    </div> */}
    </>
  );
};

export default BoardReadComponent;
