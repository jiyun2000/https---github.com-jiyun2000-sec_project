import { useState } from 'react';
import { useCustomLogin } from '../hooks/CustomLoginHooks';
import useCustomPageMove from '../hooks/CustomPageMove';
import { ReactComponent as Logo } from "../assets/icon/logo.svg";

const initState = {
  email: '',
  password: '',
};

const LoginComponent = () => {
  const [loginParam, setLoginParam] = useState({ ...initState });
  const { doLogin } = useCustomLogin();
  const { moveToMain } = useCustomPageMove();

  const handleChange = (evt) => {
    loginParam[evt.target.name] = evt.target.value;
    setLoginParam({ ...loginParam });
  };

  const handleClickLogin = (evt) => {
    
    doLogin(loginParam).then((value) => {
      if (!value.error) {
        moveToMain();
      } else {
        console.log('loginError');
      }
    });
  };

  return (
    <div className='grid place-items-center h-screen w-screen'>
      <div className="items-center w-full mt-10 m-2 p-4">
      <div className="flex justify-center ">
        <Logo />
      </div>
      <div>
        <h3 className='text-center font-bold text-3xl mt-3 mb-3 p-3'>Data Development Team</h3>
      </div>
    <div className='w-full flex flex-col items-center justify-center'>
      <div className="flex justify-center flex-col items-center w-full">
        <div className="relative mb-4 flex w-full flex-col items-center">
          <div className="w-full p-3 text-center font-bold">Email</div>
          <input
            className="w-2/4 p-3 rounded-r border border-solid border-neutral-500 shadow-md"
            name="email"
            type={'text'}
            value={loginParam.email}
            onChange={handleChange}
          ></input>
        </div>
      </div>
      <div className="flex justify-center w-full">
        <div className="relative mb-4 flex w-full flex-col items-center">
          <div className="w-full p-3 text-center font-bold">Password</div>
          <input
            className="w-2/4 p-3 rounded-r border border-solid border-neutral-500 shadow-md"
            name="pw"
            type={'password'}
            value={loginParam.pw}
            onChange={handleChange}
          ></input>
        </div>
      </div>
    </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full justify-center">
          <div className="w-2/5 p-6 flex justify-center font-bold">
            <button
              className="rounded p-4 w-36 bg-[#6e6e6e] text-xl  text-white hover:bg-[#3f3f3f]"
              onClick={handleClickLogin}
            >
              LOGIN
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
    
  );
};
export default LoginComponent;
