import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import BoardReadComponent from '../../components/board/BoardReadComponent';

const BoardReadPage = () => {
  const { boardNo } = useParams();

  const navigate = useNavigate();

  const [queryString] = useSearchParams();

  const page = queryString.get('page') ? parseInt(queryString.get('page')) : 1;
  const size = queryString.get('size') ? parseInt(queryString.get('size')) : 10;

  return (
    <>
      <div>
        <BoardReadComponent boardNo={boardNo} />
      </div>
    </>
  );
};

export default BoardReadPage;
