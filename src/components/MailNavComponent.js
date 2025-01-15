import { createSearchParams, useNavigate, useSearchParams } from 'react-router';
import useCustomSearchParam from '../hooks/CustomSearchParam';
import '../css/mainMailBox.css';
import MailWriteModal from './MailWriteModal';
import TestingMemo from './TestingMemo';

const MailNavComponent = () => {
  const { getNum, getStr } = useCustomSearchParam();
  const navigate = useNavigate();
  const [queryString] = useSearchParams();
  const curPage = getNum(queryString.get('page'), 1);
  const size = getNum(queryString.get('size'), 50);
  const cat = getStr(queryString.get('cat'), 'cat1');
  const pageMove = (val) => {
    let page = curPage + val;
    let qStr = createSearchParams({ page, size, cat }).toString();
    navigate({ pathName: `../list`, search: qStr });
  };
  return (
    <div className="h-48">
      <div className="bg-red-300 fixed h-48 w-[85%]">
        mailnav
        <button
          type="button"
          onClick={() => {
            pageMove(1);
          }}
        >
          up
        </button>
        <button
          type="button"
          onClick={() => {
            pageMove(-1);
          }}
        >
          down
        </button>
        <MailWriteModal />
      </div>
    </div>
  );
};
export default MailNavComponent;
