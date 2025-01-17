import { Navigate } from 'react-router-dom';
import BoardReadPage from '../pages/board/BoardReadPage.js';
import BoardModifyPage from '../pages/board/BoardModifyPage.js';
import BoardAddPage from '../pages/board/BoardAddPage.js';
import BoardListPage from '../pages/board/BoardListPage.js';

const boardRouter = () => {
  return [
    {
      path: 'list',
      element: <BoardListPage />,
    },
    {
      path: '',
      element: <Navigate replace to={'list'} />,
    },
    {
      path: 'read/:boardNo',
      element: <BoardReadPage />,
    },
    {
      path: 'modify/:boardNo',
      element: <BoardModifyPage />,
    },
    {
      path: 'add',
      element: <BoardAddPage />,
    },
  ];
};


export default boardRouter;

