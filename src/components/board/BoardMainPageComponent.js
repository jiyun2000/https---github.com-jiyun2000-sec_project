import { useEffect, useState } from "react";
import { getList } from "../../api/boardApi";
import { useNavigate } from "react-router-dom";

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

const BoardMainpageComponent = () => {
  const [boardData, setBoardData] = useState(initState);
  const navigate = useNavigate();

  useEffect(() => {
    getList([1, 3]).then((data) => {
      console.log(data);
      setBoardData(data);
    });
  }, []);

  const readBoard = (boardNo) => {
    console.log(boardNo);
    navigate(`/board/read/${boardNo}`);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1; 
    const day = date.getDate(); // 일
    return `${month}월 ${day}일`;
  };

  return (
    <>
      <div className="flex flex-col p-5 m-10 rounded-md">
        {boardData.dtoList.map((data) => (
          <div
            key={data.boardNo} 
            className="cursor-pointer text-left  pb-4 mb-4" 
            onClick={() => readBoard(data.boardNo)}
          >
            <div className="m-2">
              <div className="font-semibold text-xl">{data.title}</div>
              <div className="flex justify-start text-base mt-2">
                <div className="mr-4">{data.mailAddress}</div>
                <div>{formatDate(data.regdate)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BoardMainpageComponent;
