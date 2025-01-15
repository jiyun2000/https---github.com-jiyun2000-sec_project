import { useEffect, useRef, useState } from 'react';

const TestingMemo = () => {
  const [memoCnt, setMemoCnt] = useState(0);
  const [memoList, setMemoList] = useState([]);
  const refList = useRef([]);
  const hahaha = (evt) => {
    setMemoCnt(memoCnt + 1);
  };
  useEffect(() => {
    console.log(memoCnt);
    memoList.push(memoCnt);
  }, [memoCnt]);
  return (
    <div>
      <button
        onClick={(evt) => {
          hahaha(evt);
        }}
      >
        buttooooooooooooooooon
      </button>
      <div>
        {memoCnt
          ? memoList.map((v) => {
              console.log('!!!');
              return (
                <div
                  className="bg-black fixed size-40 top-0 left-0 z-[100]"
                  draggable="true"
                  onDragStart={(evt) => {
                    console.log(evt);
                  }}
                  onDragEnd={(evt) => {
                    console.log(evt);
                    console.log(evt.target);
                    console.log(evt.target);
                  }}
                ></div>
              );
            })
          : null}
      </div>
    </div>
  );
};
export default TestingMemo;
