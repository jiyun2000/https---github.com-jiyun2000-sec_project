import { useParams } from 'react-router-dom';
import BoardModifyComponent from '../../components/board/BoardModifyComponent';

const BoardModifyPage = () => {
  const { boardNo } = useParams();
  return (

    <div>
       <BoardModifyComponent boardNo={boardNo} />

    </div>
  );
};

export default BoardModifyPage;
