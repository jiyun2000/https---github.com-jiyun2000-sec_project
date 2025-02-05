import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useSearchParams } from 'react-router';
import { getCookie, removeCookie } from '../util/cookieUtil';
import { changeCat, deleteMail, getMailList } from '../api/mailApi';
import useCustomPageMove from '../hooks/CustomPageMove';
import '../css/mainMailBox.css';
import MailNavComponent from './MailNavComponent';
import useCustomSearchParam from '../hooks/CustomSearchParam';
import BoardTitleComponent from './board/BoardTitleComponent';
import { Link } from 'react-router-dom';
import mail from '../assets/icon/mail.png';
import chat from '../assets/icon/chat.png';
import colorChat from "../assets/icon/colorChat.png";

const MailListComponent = () => {
  const { moveToMailDetail } = useCustomPageMove();
  const [empNo, setEmpNo] = useState(getCookie('member').empNo);
  const navigate = useNavigate();
  const [chatCntCook, setChatCntCook] = useState(getCookie("alert"));
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
    setMailData,
  } = useOutletContext();
  //const [mailData, setMailData] = useState(initState);

  const chgCat = (param) => {
    setPage(1);
    setCat(param);
  };

  const goToBoardList = () => {
    navigate(`/board/list`);
  };

  const changeMailCat = (mailNo, cat) => {
    let modCat = '';
    if (cat == 'std') {
      modCat = 'import';
    } else {
      modCat = 'std';
    }
    console.log(cat);
    console.log(mailNo, modCat);
    changeCat(mailNo, modCat).then(() => {
      getMailList([page, size, cat, getCookie('member').email]).then((data) => {
        setMailData(data);
        console.log(data);
      });
    });
  };

  const delMail = (mailNo) => {
    deleteMail(mailNo).then(() => {
      getMailList([page, size, cat, getCookie('member').email]).then((data) => {
        setMailData(data);
        console.log(data);
      });
    });
  };

    const checkRemove = () => {
      removeCookie("alert");
    }
  return (
    <div>
      <div className="flex justify-between items-center w-full bg-white shadow-lg rounded-md mb-8 px-6 py-4">
        <div className="flex items-center space-x-8">
          <div
            className="text-2xl font-semibold text-blue-800 select-none cursor-pointer"
            onClick={goToBoardList}
          >
            [공지사항]
          </div>
          <div className="w-64 text-2xl font-semibold cursor-pointer">
            <BoardTitleComponent />
          </div>
        </div>
        <div className="flex space-x-4">
          <Link to="/mail" className="w-12 cursor-pointer">
            <img src={mail} alt="Mail" className="w-full" />
          </Link>
          <Link to={`/chat/empList/${empNo}?page=1`} className="w-12 cursor-pointer" onClick={()=>checkRemove()}>
          {chatCntCook  ? 
              <img src={colorChat} alt='colorChat' className='w-full' /> :
              <img src={chat} alt="Chat" className="w-full" />
          }
          </Link>
        </div>
      </div>

      <div className="h-full w-full flex flex-col">
        <MailNavComponent />
        <div className="border-2 border-black border-opacity-0 mt-5 mainMailBox">
          <div className="w-full flex flex-wrap text-center">
            <div className="w-3/4 flex flex-wrap m-0">
              {cat == 'std' ? (
                <div
                  className="w-44 border-b-4 border-blue-400 text-3xl cursor-pointer"
                  onClick={() => chgCat('std')}
                >
                  기본
                </div>
              ) : (
                <div
                  className="w-44 border-b-4 bg-gray-100 text-3xl cursor-pointer"
                  onClick={() => chgCat('std')}
                >
                  기본
                </div>
              )}
              {cat == 'import' ? (
                <div
                  className="w-44 border-b-4 border-blue-400 text-3xl cursor-pointer"
                  onClick={() => chgCat('import')}
                >
                  중요
                </div>
              ) : (
                <div
                  className="w-44 border-b-4 bg-gray-100 text-3xl cursor-pointer"
                  onClick={() => chgCat('import')}
                >
                  중요
                </div>
              )}
              {cat == 'mysend' ? (
                <div
                  className="w-44 border-b-4 border-blue-400 text-3xl cursor-pointer"
                  onClick={() => chgCat('mysend')}
                >
                  보낸메일
                </div>
              ) : (
                <div
                  className="w-44 border-b-4 bg-gray-100 text-3xl cursor-pointer"
                  onClick={() => chgCat('mysend')}
                >
                  보낸메일
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap flex-col">
            {mailData.dtoList.map((mail) => {
              return (
                <>
                  <div
                    className="w-full flex border-2 h-12 border-b-gray-300 cursor-pointer "
                    onMouseOver={(evt) => {
                      evt.currentTarget.classList.remove('border-b-gray-300');
                      evt.currentTarget.classList.add('border-b-blue-400');
                    }}
                    onMouseOut={(evt) => {
                      evt.currentTarget.classList.remove('border-b-blue-400');
                      evt.currentTarget.classList.add('border-b-gray-300');
                    }}
                  >
                    <div className="w-60 min-w-60 m-auto ml-4 flex-row flex">
                      <div
                        className="w-1/2"
                        onClick={() => {
                          changeMailCat(mail.mailNo, mail.mailCategory);
                        }}
                      >
                        {mail.mailCategory == 'std' ? (
                          <img
                            className="size-9 m-auto"
                            src={require('../assets/icon/star.png')}
                          ></img>
                        ) : (
                          <img
                            className="size-9 m-auto"
                            src={require('../assets/icon/starfill.png')}
                          ></img>
                        )}
                      </div>
                      <div
                        className="w-1/2"
                        onClick={() => {
                          delMail(mail.mailNo);
                        }}
                      >
                        <img
                          className="size-9 m-auto"
                          src={require('../assets/icon/trash.png')}
                        />
                      </div>
                    </div>
                    <div
                      className="w-full m-auto ml-8 max-w-full truncate bg-gray-100 "
                      onClick={(evt) => {
                        moveToMailDetail([page, size, mail.mailNo]);
                      }}
                    >
                      {mail.title} - {mail.contents}{' '}
                    </div>
                    <div className="min-w-48 m-auto">{mail.sendDate}</div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MailListComponent;
