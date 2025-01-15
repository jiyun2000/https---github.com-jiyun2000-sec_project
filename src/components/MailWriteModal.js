import { useCallback, useEffect, useRef, useState } from 'react';

const MailWriteModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();
  const dndRef = useRef();
  const titleRef = useRef('');
  const contentRef = useRef('');
  const [isHavFile, setIsHavFile] = useState(false);
  const [isDrag, setIsDrag] = useState(false);

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
  const onChangeFile = useCallback((evt) => {
    console.log('file change');
    console.log(evt.dataTransfer.files);
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
    console.log(evt.target.id);
    sessionStorage.setItem(evt.target.id, evt.target.value);
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
  });

  return (
    <>
      <div className={'btn-wrapper'}>
        <button className={'modal-open-btn'} onClick={() => setModalOpen(true)}>
          모달 열기
        </button>
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
                    className="fixed right-0 top-0 size-12 bg-red-500 rounded-tr-lg"
                    onClick={() => {
                      setModalOpen(false);
                    }}
                  ></div>
                </div>
                <div className="h-[100%] max-h-full min-h[172px] w-full border-4 border-white">
                  <div className="h-10 w-full my-0 ">
                    <textarea
                      id="titleTA"
                      className="h-10 w-full focus:outline-none resize-none text-3xl my-0 border-b-gray-600 box-border border-b-2"
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
                  {isHavFile ? <></> : <></>}
                </div>
                <div className="h-[100%] max-h-20 min-h-20 w-full border-t-2 border-b-gray-600 bg-gray-100 flex flex-wrap items-center">
                  <div className="w-[70%] flex">
                    <div className="size-20 bg-pink-400">
                      <label className="fixed size-20" ref={dndRef}>
                        file
                        <input
                          type="file"
                          hidden="true"
                          multiple="true"
                          onChange={() => {
                            onChangeFile();
                          }}
                        ></input>
                      </label>
                    </div>
                    <div className="size-20 bg-red-300">
                      <label className="fixed size-20">
                        file
                        <input type="file" hidden="true"></input>
                      </label>
                    </div>
                    <div className="size-20 bg-green-300">3</div>
                    <div className="size-20 bg-blue-300">4</div>
                  </div>
                  <div className="w-[30%] h-full flex flex-wrap items-center">
                    <div className="bg-blue-700 w-[90%] h-[85%] flex rounded-full m-auto items-center justify-around text-gray-100 text-2xl">
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
