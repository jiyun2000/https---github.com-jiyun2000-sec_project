import { useEffect, useState } from 'react';

const FileListComponent = ({ props }) => {
  const [list, setList] = useState(props.fileList);
  console.log(list);
  return (
    <div className="flex flex-row justify-between">
      {list.map((file) => {
        return <div>{file}</div>;
      })}
    </div>
  );
};
export default FileListComponent;
