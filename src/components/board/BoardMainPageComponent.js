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
    useEffect(()=>{
            getList([1,5]).then((data)=>{
                console.log(data);
                setBoardData(data);
            })
    }, [])

    const readBoard = (boardNo) => {
        console.log(boardNo);
        navigate(`/board/read/${boardNo}`)
    }

    return (
        <>
        <div className="flex flex-col p-5 m-10  rounded-md">  
                {boardData.dtoList.map((data) => (
                  <div
                    key={boardData.boardNo}
                    className="cursor-pointer text-center"
                    onClick={()=>readBoard(data.boardNo)}
                  >
                    <div className="m-2">
                        <div className="font-semibold text-xl text-center">{data.title}</div>
                        <div className="flex flex-row justify-center text-base text-center">
                            <div className="">
                                {data.mailAddress}
                            </div>
                        </div>
                    </div>
                  </div>
                ))}
        </div>
        </>
    )
}
export default BoardMainpageComponent;