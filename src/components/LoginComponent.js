import { useState, useRef } from 'react';
import { useCustomLogin } from '../hooks/CustomLoginHooks';
import useCustomPageMove from '../hooks/CustomPageMove';
import { ReactComponent as Logo } from "../assets/icon/logo.svg";
import { ReactComponent as LoginImg } from "../assets/img/loginImg.svg";
import { ReactComponent as Password } from "../assets/icon/password.svg";
import { ReactComponent as Email } from "../assets/icon/email.svg";
import { useNavigate } from 'react-router-dom';

const initState = {
  email: '',
  password: '',
};

const LoginComponent = () => {
  const [loginParam, setLoginParam] = useState({ ...initState });
  const { doLogin } = useCustomLogin();
  const { moveToMain } = useCustomPageMove();
  const pwInput = useRef();
  const emailInput = useRef();
  const pwIcon = useRef();
  const emailIcon = useRef();
  const [blurInput, setblurInput] = useState('border-slate-300');
  const [focusInput, setFocusInput] = useState('border-cyan-500');
  const [blurIcon, setblurIcon] = useState('fill-slate-300');
  const [focusIcon, setFocusIcon] = useState('fill-cyan-500');
  const navigate = useNavigate();

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

  const handleFocus = (inputRef, iconRef) => {
    inputRef.current.classList.add(focusInput);
    inputRef.current.classList.remove(blurInput);
    iconRef.current.classList.add(focusIcon);
    iconRef.current.classList.remove(blurIcon);
  };

  const handleBlur = (inputRef, iconRef) => {
    inputRef.current.classList.remove(focusInput);
    inputRef.current.classList.add(blurInput);
    iconRef.current.classList.remove(focusIcon);
    iconRef.current.classList.add(blurIcon);
  };

  const bgStyle = {
    backgroundColor: 'hsla(0, 0%, 100%, 1)',
    backgroundImage: `radial-gradient(circle at 91% 11%, hsla(241.99999999999997, 100%, 88%, 0.66) 4.038772213247173%, transparent 37.2265767974114%), radial-gradient(circle at 66% 37%, hsla(191.91176470588238, 100%, 88%, 1) 0%, transparent 63.33640956108327%), radial-gradient(circle at 36% 87%, hsla(136.32352941176467, 100%, 88%, 1) 12.107536057085522%, transparent 63.33640956108327%)`,
    backgroundBlendMode: 'normal, normal, normal',
  }

  return (
    <div
      style={bgStyle}
      className='grid place-items-center h-screen w-screen px-[10%]'
    >
      <div className="w-full max-h-[85vh] h-[700px] bg-white grid lg:grid-cols-2 rounded-2xl shadow-2xl shadow-cyan-800/50 divide-x-4 overflow-hidden">
        <div className="hidden lg:flex grow justify-center items-center shrink-0 bg-slate-500">
          <LoginImg className="w-2/3 p-[5%]" />
        </div>
        <div className="flex grow shrink-0 flex-col items-center justify-center">
          <div className="flex justify-center">
            <Logo />
          </div>
          <div>
            <h3 className='text-center font-bold text-3xl mt-3 mb-3 p-3'>Data Development Team</h3>
          </div>
          <div className='w-full flex flex-col items-center justify-center'>
            <div className="flex justify-center w-full">
              <div
                ref={emailInput}
                className={`mb-4 px-3 flex items-center rounded border border-solid shadow-md ${blurInput}`}
              >
                <Email
                  ref={emailIcon}
                  className={`w-[22px] ${blurIcon}`}
                />
                <input
                  className="flex-grow p-3 outline-none"
                  name="email"
                  placeholder="Email"
                  type={'text'}
                  value={loginParam.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus(emailInput, emailIcon)}
                  onBlur={() => handleBlur(emailInput, emailIcon)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      handleClickLogin()
                    }
                  }}
                ></input>
              </div>
            </div>
            <div className="flex justify-center w-full">
              <div
                ref={pwInput}
                className={`mb-4 px-3 flex items-center rounded border border-solid shadow-md ${blurInput}`}
              >
                <Password
                  ref={pwIcon}
                  className={`w-[22px] ${blurIcon}`}
                />
                <input
                  className="flex-grow p-3 outline-none"
                  name="pw"
                  placeholder="Password"
                  type={'password'}
                  value={loginParam.pw}
                  onChange={handleChange}
                  onFocus={() => handleFocus(pwInput, pwIcon)}
                  onBlur={() => handleBlur(pwInput, pwIcon)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      handleClickLogin()
                    }
                  }}
                >
                </input>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className="rounded p-4 w-36 bg-[#6e6e6e] text-xl font-medium text-white hover:bg-[#3f3f3f]"
              onClick={handleClickLogin}
            >
              LOGIN
            </button>
          </div>
        </div>
      </div>
    </div>
    
  );
};
export default LoginComponent;
