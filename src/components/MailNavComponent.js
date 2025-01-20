import {
  createSearchParams,
  useNavigate,
  useOutletContext,
  useSearchParams,
} from 'react-router';
import useCustomSearchParam from '../hooks/CustomSearchParam';
import '../css/mainMailBox.css';
import MailWriteModal from './MailWriteModal';
import TestingMemo from './TestingMemo';
import { useEffect } from 'react';

const MailNavComponent = () => {
  const { getNum, getStr } = useCustomSearchParam();
  const navigate = useNavigate();
  const [queryString] = useSearchParams();
  const {
    page,
    size,
    cat,
    mailNo,
    mailData,
    setPage,
    setSize,
    setCat,
    setMailNo,
  } = useOutletContext();
  // const curPage = getNum(queryString.get('page'), 1);
  // const size = getNum(queryString.get('size'), 50);
  // const cat = getStr(queryString.get('cat'), 'cat1');
  const pageMove = (val) => {
    // let page = curPage + val;
    // let qStr = createSearchParams({ page, size, cat }).toString();
    // navigate({ pathName: `../list`, search: qStr });
    setPage(page + val);
  };
  const newTotals = Math.ceil(mailData.totalCnt / size);
  return (
    <div className="h-48">
      <div
        className=" bg-blue-400 fixed h-48 w-[85%] flex flex-row
      "
      >
        <div className="h-full w-[30%]">
          <MailWriteModal />
        </div>
        <div className="h-full w-[70%] flex flex-row">
          <div>
            {page} of {newTotals}
          </div>

          <div>
            {page < newTotals ? (
              <button
                type="button"
                onClick={() => {
                  pageMove(1);
                }}
              >
                up
              </button>
            ) : (
              <></>
            )}
            {page > 1 ? (
              <button
                type="button"
                onClick={() => {
                  pageMove(-1);
                }}
              >
                down
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MailNavComponent;
