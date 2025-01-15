import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { loginPostAsynch } from '../slice/LoginSlice';

export const useCustomLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.loginSlice);
  const isLogin = loginState.email ? true : false;

  const doLogin = async (loginParam) => {
    const action = await dispatch(loginPostAsynch(loginParam));
    return action.payload;
  };

  return {
    loginState,
    isLogin,
    doLogin,
  };
};
