import { useParams } from 'react-router-dom';
import BoardModifyComponent from '../../components/board/BoardModifyComponent';

const BoardModifyPage = () => {
  const { boardNo } = useParams();
  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">Board Modify {boardNo}</div>
      <BoardModifyComponent boardNo={boardNo} />
    </div>
  );
};

export default BoardModifyPage;
