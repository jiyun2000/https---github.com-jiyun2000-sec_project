import { useEffect, useState } from "react";
import { getList } from "../../api/boardApi";
import { useNavigate } from "react-router-dom";

const BoardTitleComponent = () => {
    const [BoardData, setBoardData] = useState(null);
    const [showBoard, setShowBoard] = useState(null);
    const [cyc, setCyc] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if(BoardData!==null){
            getList([1, 5]).then((data) => {
                setBoardData(data.dtoList);  
                console.log(BoardData);
                setShowBoard(data.dtoList[0]);  
            });
        }
    }, []);

    useEffect(() => {
        if (BoardData && BoardData.length > 0) { //null 아닐때
            const boardInterval = setInterval(() => {
                setCyc((firCyc) => {
                    const nextCyc = firCyc + 1;
                    if (nextCyc > BoardData.length - 1) {
                        return 0;  
                    }
                    return nextCyc;
                });
            }, 5 * 1000);
            return () => clearInterval(boardInterval);
        }
    }, [BoardData]);  

    useEffect(() => {
        if (BoardData && cyc < BoardData.length) {
            setShowBoard(BoardData[cyc]);
        }
    }, [cyc, BoardData]);

    const goToBoardContent = (boardNo) => {
        console.log(boardNo);
        navigate(`/board/read/${boardNo}`)
    }

    return (
        <>
            { BoardData ? 
                <>
                <div onClick={()=>goToBoardContent(showBoard.boardNo)}>
                    {showBoard.title}
                </div></>
                :<></>
              } 
        </>
    );
};
export default BoardTitleComponent;
