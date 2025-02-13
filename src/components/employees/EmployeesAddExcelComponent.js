import { useEffect, useRef, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { addFiles, addOne } from "../../api/employeesApi";
import { setALOne } from "../../api/annualLeaveApi";
import { getJobList } from "../../api/jobApi";
import { getDeptList } from "../../api/deptInfoApi";
import { getCookie, removeCookie } from '../../util/cookieUtil';
import mail from "../../assets/icon/mail.png";
import chat from "../../assets/icon/chat.png";
import BoardTitleComponent from '../board/BoardTitleComponent';
import { Link, useNavigate } from 'react-router-dom';
import colorChat from "../../assets/icon/colorChat.png";

const EmployeesAddExcelComponent = () => {
    const uploadRef = useRef();

    const [empNo, setEmpNo] = useState(getCookie("member").empNo);
    const {moveToList} = useCustomMove();
    const navigate = useNavigate();
    const [chatCntCook, setChatCntCook] = useState(getCookie("alert"));

    const handleClickAdd = () => {
        const files = uploadRef.current.files;

        if(files.length===0){
            alert("파일을 선택해주세요");
            return;
        }
        if(files.length>1){
            alert("파일을 한개만 선택해주세요");
            return;
        }
        
        let excelFileName = files[0].name;
        let excelExtension = ".xlsx";

        if(excelFileName.substring(excelFileName.lastIndexOf("."),excelFileName.length)!==excelExtension){
            alert("엑셀파일을 선택해주세요.");
            return;
        };

        const formData = new FormData();

        formData.append('files',files[0]);

        addFiles(formData).then((res)=>{
            moveToList();
        })
    }
    

    const goToBoardList = () => {
        navigate(`/board/list`)
      }

    const checkRemove = () => {
        removeCookie("alert");
      }

    return (
        <div>
            <div className="flex justify-between items-center px-6 py-4 bg-white shadow-lg rounded-md mb-8">
                <div className="flex items-center space-x-8">
                    <div className="text-2xl font-semibold text-blue-800 select-none cursor-pointer" onClick={goToBoardList}>
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
                <Link to={`/chat/empList/${empNo}?page=1`} className="w-12 cursor-pointer"  onClick={()=>checkRemove()}>
                {chatCntCook  ? 
                    <img src={colorChat} alt='colorChat' className='w-full' /> :
                    <img src={chat} alt="Chat" className="w-full" />
                }
                </Link>
            </div>
        </div>


        <div className="flex flex-col items-center py-10 px-4">
            <h1 className="text-3xl font-semibold mb-6">직원 일괄 등록</h1>
            <div className="bg-white p-4 mb-2 w-full">
                    
                <div className="flex justify-center">
                <div className="w-1/5 p-6 font-bold">직원 일괄 등록 엑셀 파일</div>
                    <div className="mb-4 flex w-full justify-center">   
                        <input 
                        ref={uploadRef} 
                        className="w-full p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                        type={'file'} multiple={true}
                        >    
                        </input>
                    </div>
                </div>

                <div className="flex justify-center p-4">
                    <button type="button"
                    className="inline-block rounded p-4 m-2 text-xl w-32  bg-[#8ba7cd] text-white  hover:bg-[#6f8cb4] cursor-pointer"
                    onClick={handleClickAdd}>
                        등록
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
}

export default EmployeesAddExcelComponent;