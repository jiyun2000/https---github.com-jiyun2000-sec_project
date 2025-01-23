import { useCallback, useEffect, useRef, useState } from 'react';
import FileListComponent from './FileListComponent';
import '../css/scrollbar.css';
import { findReceivers, sendMail } from '../api/mailApi';
import MailExtraComponent from './MailExtraComponent';
import { useNavigate } from 'react-router-dom';

const MailWriteModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();
  const dndRef = useRef();
  const receiverRef = useRef();
  const titleRef = useRef('');
  const contentRef = useRef('');
  const fileId = useRef(0);
  const fileBox = useRef(null);
  const selectEmailRef = useRef(null);
  const [receiverEmail, setReceiverEmail] = useState('');
  const [receiverEmailList, setReceiverEmailList] = useState([]);
  const [selectedEmailList, setSelectedEmailList] = useState([]);
  const [selectEmailNo, setSelectEmailNo] = useState(0);
  const [fileList, setFileList] = useState([]);
  const [isHavFile, setIsHavFile] = useState(false);
  const [isDrag, setIsDrag] = useState(false);
  const [isTypeReceiver, setIsTypeReceiver] = useState(false);
  const [isMouseListEnter, setIsMouseListEnter] = useState(false);
  const navigate = useNavigate();

  const ExtraRef = useRef();
  const [isExtraShow, setIsExtraShow] = useState();

  const handleEnter = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
  };
  const handleOver = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    if (evt.dataTransfer) {
      setIsDrag(true);
    }
  };
  const handleLeave = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    setIsDrag(false);
  };

  const handleDrop = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    onChangeFile(evt);
    setIsDrag(false);
  };
  const onChangeFile = useCallback(
    (evt) => {
      console.log('file change');
      // if (evt.dataTransfer) {
      //   evt.dataTransfer.files;
      // } else {
      //   evt.target.files;
      // }

      let files = evt.dataTransfer ? evt.dataTransfer.files : evt.target.files;
      let listTemp = [...fileList];
      for (let file of files) {
        listTemp.push({ id: fileId.current++, file: file });
      }
      if (evt.type === 'change') {
        evt.target.value = null;
      }
      setIsHavFile(true);
      setFileList(listTemp);
    },
    [fileList]
  );
  const deleteFile = useCallback((id) => {
    let listTemp = [...fileList];
    listTemp = listTemp.filter((item) => {
      return item.id != id;
    });
    console.log(id);
    console.log(listTemp);

    setFileList(listTemp);
  });
  const deleteReceiver = useCallback((trgitem) => {
    let listTemp = [...selectedEmailList];
    console.log(listTemp);
    listTemp = listTemp.filter((item) => {
      return item.email != trgitem.email;
    });
    console.log(listTemp);
    setSelectedEmailList(listTemp);
  });

  const initDrag = useCallback(() => {
    if (dndRef && dndRef.current) {
      dndRef.current.addEventListener('dragenter', handleEnter);
      dndRef.current.addEventListener('dragleave', handleLeave);
      dndRef.current.addEventListener('dragover', handleOver);
      dndRef.current.addEventListener('drop', handleDrop);
    }
  });
  const resetDrag = useCallback(() => {
    if (dndRef && dndRef.current) {
      dndRef.current.removeEventListener('dragenter', handleEnter);
      dndRef.current.removeEventListener('dragleave', handleLeave);
      dndRef.current.removeEventListener('dragover', handleOver);
      dndRef.current.removeEventListener('drop', handleDrop);
    }
  });
  const contentsChange = (evt) => {
    sessionStorage.setItem(evt.target.id, evt.target.value);
  };
  const receivedChange = (evt) => {
    setReceiverEmail(evt.target.value);
  };

  const emailListMove = (evt) => {
    if (evt.key == 'ArrowUp' || evt.key == 'ArrowDown' || evt.key == 'Enter') {
      evt.preventDefault();
      if (evt.key == 'ArrowUp' && selectEmailNo > 0) {
        setSelectEmailNo(selectEmailNo - 1);
      } else if (
        evt.key == 'ArrowDown' &&
        selectEmailNo < receiverEmailList.length - 1
      ) {
        setSelectEmailNo(selectEmailNo + 1);
      } else if (
        evt.key == 'Enter' &&
        selectEmailNo < receiverEmailList.length &&
        receiverEmail != ''
      ) {
        console.log(receiverEmailList.at(selectEmailNo));
        selectedEmailListPush();
      }
    }
  };
  const selectedEmailListPush = () => {
    let tempList = [...selectedEmailList];
    let tempItem = receiverEmailList.at(selectEmailNo).item;

    if (
      tempList.find((item) => {
        return item.email == tempItem.email;
      })
    ) {
      console.log('i found same');
    } else {
      tempList.push(tempItem);
    }

    setSelectedEmailList(tempList);
  };

  const resetEveryThingOnThisModal = () => {
    setSelectedEmailList([]);
    sessionStorage.setItem('titleTA', '');
    sessionStorage.setItem('contentTA', '');
    setModalOpen(false);
    navigate(`/mail/list`);
  };

  useEffect(() => {
    initDrag();
    return () => resetDrag();
  }, [initDrag, resetDrag]);
  useEffect(() => {
    if (contentRef && contentRef.current) {
      contentRef.current.value = sessionStorage.getItem('contentTA');
    }
    if (titleRef && titleRef.current) {
      titleRef.current.value = sessionStorage.getItem('titleTA');
    }
    if (receiverRef && receiverRef.current) {
      receiverRef.current.value = sessionStorage.getItem('receiverTA');
    }
  });
  useEffect(() => {
    if (selectEmailRef.current && !isMouseListEnter) {
      selectEmailRef.current.scrollTop = 15 * selectEmailNo;
    }
  }, [selectEmailNo]);
  useEffect(() => {
    findReceivers(receiverEmail).then((data) => {
      let dataList = [];
      let cyc = 0;
      for (let item of data) {
        dataList.push({ id: cyc++, item: item });
      }
      setReceiverEmailList(dataList);
    });
  }, [receiverEmail]);
  useEffect(() => {
    if (
      selectEmailNo > receiverEmailList.length - 1 &&
      receiverEmailList.length != 0
    ) {
      setSelectEmailNo(receiverEmailList.length - 1);
    }
  }, [receiverEmailList]);

  return (
    <>
      <div className="size-full flex justify-center items-end">
        <button
          className="w-[80%] rounded-lg mb-2 text-3xl bg-slate-300 text-slate-800"
          onClick={() => setModalOpen(true)}
        >
          메일 쓰기
        </button>
        {isExtraShow ? <MailExtraComponent props={{ ExtraRef }} /> : <></>}
      </div>
      {modalOpen && (
        <div
          className={'modal-container'}
          ref={modalBackground}
          onClick={(e) => {
            if (e.target === modalBackground.current) {
              setModalOpen(false);
            }
          }}
        >
          <div className={'modal-content'}>
            <div
              className="fixed h-[80%] min-h-[300px] max-h-[720px] w-[540px] bg-white z-100 right-[3%] bottom-0 drop-shadow-[0_7px_7px_rgba(0,0,0,1)] rounded-t-lg background-color: transparent"
              ref={dndRef}
            >
              <div className="flex flex-col w-full h-full rounded-t-lg background-color: transparent">
                <div className="h-12 min-h-12 w-full bg-blue-400 border-b-2 border-b-gray-600 text-3xl flex items-center text-gray-800 rounded-t-lg">
                  메일 작성
                  <div
                    className="fixed right-0 top-0 size-12 bg-red-500 rounded-tr-lg text-center cursor-pointer"
                    onClick={() => {
                      setModalOpen(false);
                    }}
                  >X</div>
                </div>
                <div className="h-[100%] max-h-full min-h[172px] w-full border-4 border-white flex flex-col justify-stretch">
                  <div className="w-full flex flex-wrap">
                    {selectedEmailList.map((item) => {
                      return (
                        <div className="box-border border-2 border-black h-full text-lg flex flex-row">
                          <div className="mr-2">{item.email}</div>
                          <div
                            onClick={() => {
                              deleteReceiver(item);
                            }}
                          >
                            X
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="h-8 w-full my-0 relative">
                    <textarea
                      id="receiverTA"
                      className="h-8 w-full focus:outline-none resize-none text-xl my-0 border-b-gray-600 box-border border-b-2"
                      placeholder="받는 사람"
                      onChange={(evt) => {
                        contentsChange(evt);
                        receivedChange(evt);
                      }}
                      onKeyDown={(evt) => {
                        emailListMove(evt);
                      }}
                      onFocus={() => {
                        setIsTypeReceiver(true);
                      }}
                      onBlur={(evt) => {
                        if (
                          isMouseListEnter &&
                          receiverEmailList.at(selectEmailNo)
                        ) {
                          selectedEmailListPush();
                        }
                        setIsTypeReceiver(false);
                        setSelectEmailNo(0);
                        setReceiverEmail('1111');
                        sessionStorage.setItem('receiverTA', '');
                        titleRef.current.focus();
                      }}
                      ref={receiverRef}
                    ></textarea>
                    {isTypeReceiver && receiverEmail ? (
                      <div
                        className="w-full max-h-[300px] overflow-y-scroll bg-white z-101 flex flex-wrap"
                        onMouseEnter={() => {
                          setIsMouseListEnter(true);
                        }}
                        onMouseLeave={() => {
                          setIsMouseListEnter(false);
                        }}
                        ref={selectEmailRef}
                      >
                        {receiverEmailList.map((item) => {
                          return item.id == selectEmailNo ? (
                            <div className="w-full z-102 h-5 bg-blue-500">
                              {item.item.email} - {item.item.deptName},
                              {item.item.jobName}-
                              {item.item.firstName + item.item.lastName}
                            </div>
                          ) : (
                            <div
                              className="w-full z-102 h-5"
                              onMouseEnter={() => {
                                setSelectEmailNo(item.id);
                              }}
                            >
                              {item.item.email}-{item.item.deptName},
                              {item.item.jobName}-
                              {item.item.firstName + item.item.lastName}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="h-10 w-full my-0 ">
                    <textarea
                      id="titleTA"
                      className="h-10 w-full focus:outline-none resize-none text-3xl my-0 border-b-gray-500 box-border border-b-2"
                      placeholder="제목"
                      onChange={(evt) => {
                        contentsChange(evt);
                      }}
                      ref={titleRef}
                    ></textarea>
                  </div>
                  {isDrag ? (
                    <div className="box-border border-dashed h-full w-full focus:outline-none resize-none  border-blue-400 border-2"></div>
                  ) : (
                    <textarea
                      id="contentTA"
                      className="box-border h-full w-full focus:outline-none resize-none "
                      onChange={(evt) => {
                        contentsChange(evt);
                      }}
                      ref={contentRef}
                      placeholder="내용"
                    ></textarea>
                  )}
                  {isHavFile ? (
                    //<FileListComponent props={{ fileList }} />
                    <div
                      className="flex flex-row overflow-hidden overflow-x-scroll scrollhidden h-10"
                      ref={fileBox}
                    >
                      {fileList.map((val) => {
                        return (
                          <div className="box-border border-2 border-black h-full text-lg flex flex-row">
                            <div className="mr-2">{val.file.name}</div>
                            <div
                              onClick={() => {
                                deleteFile(val.id);
                              }}
                            >
                              X
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="h-[100%] max-h-20 min-h-20 w-full border-t-2 border-b-gray-600 bg-gray-100 flex flex-wrap items-center">
                  <div className="w-[70%] flex">
                    <div className="size-20 bg-pink-400">
                      <label className="fixed size-20 text-center cursor-pointer" ref={dndRef}>
                      파일첨부
                        <input
                          type="file"
                          hidden="true"
                          multiple="true"
                          onChange={(evt) => {
                            onChangeFile(evt);
                          }}
                        ></input>
                      </label>
                    </div>
                    <div className="size-20 bg-red-300">
                      <label className="fixed size-20 text-center cursor-pointer">
                        파일첨부
                        <input type="file" hidden="true"></input>
                      </label>
                    </div>
                    <div
                      className="size-20 "
                      onClick={() => {
                        setIsExtraShow(true);
                      }}
                    >
                      
                    </div>
                    <div className="size-20 "></div>
                  </div>
                  <div className="w-[30%] h-full flex flex-wrap items-center">
                    <div
                      className="bg-blue-700 w-[90%] h-[85%] flex rounded-full m-auto items-center justify-around text-gray-100 text-2xl cursor-pointer"
                      onClick={() => {
                        sendMail({
                          selectedEmail: selectedEmailList,
                          files: fileList,
                        });
                        resetEveryThingOnThisModal();
                      }}
                    >
                      메일보내기
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default MailWriteModal;
