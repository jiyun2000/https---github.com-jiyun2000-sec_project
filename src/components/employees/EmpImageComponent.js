import { useCallback, useEffect, useRef, useState } from "react";
import upload from "../../assets/icon/upload.png";

import { delImg, getEmpImageOne, modImg, register, updateImg } from "../../api/employeesImageApi"; 
import { getCookie, removeCookie } from "../../util/cookieUtil";
import { getOneEmp } from "../../api/employeesApi";
import m from "../../assets/icon/m.png";
import w from "../../assets/icon/w.png";
import mail from "../../assets/icon/mail.png";
import chat from "../../assets/icon/chat.png";
import colorChat from "../../assets/icon/colorChat.png";
import { Link, useNavigate } from "react-router-dom";
import BoardTitleComponent from "../board/BoardTitleComponent";

export const API_SERVER_HOST = 'http://localhost:8080';

const initState = {
    empNo: 0,
    url: '',
    files: [],

}

const EmpImageComponent = () => {
    const dndRef = useRef();

    const [fileList, setFileList] = useState({ ...initState });
    const fileId = useRef();
    const [cookEmpNo, setCookEmpNO] = useState(getCookie('member').empNo);
    const [empData, setEmpData] = useState('');
    const [getEmpImage, setGetEmpImage] = useState(null);
    const [uuidImg, setUuidImg] = useState('');
    const navigate = useNavigate();
    const [chatCntCook, setChatCntCook] = useState(getCookie("alert"));
    

    useEffect(() => {
        getOneEmp(cookEmpNo).then((data) => {
            setEmpData(data);
        }).catch((error) => {
            console.log(error);
        });
    }, [cookEmpNo]);

    useEffect(() => {
        console.log(cookEmpNo);
        getEmpImageOne(cookEmpNo).then((data) => {
            if (data != null) {
                setGetEmpImage(data);
            }
        }).catch((error) => {
            console.log(error);
        });
    }, [cookEmpNo]);

    useEffect(() => {
        console.log("Image UUID:", getEmpImage?.uuid);
        if (getEmpImage?.uuid) {
            setUuidImg(`${API_SERVER_HOST}/api/empImage/view/${getEmpImage.uuid}`);
        }
    }, [getEmpImage]);

    const updateImage = () => {
        const fileList = fileId.current.files;
        if (fileList.length > 0) {
            const formData = new FormData();
            for (let i = 0; i < fileList.length; i++) {
                formData.append('files', fileList[i]);
            }

            formData.append('empNo', cookEmpNo);
            formData.append('url', fileList[0].name);

            updateImg(formData, cookEmpNo, fileList).then((response) => {
                alert("프로필 사진이 변경되었습니다.");
                navigate(`/employees/read/${cookEmpNo}`)
            }).catch((error) => {
                console.log(error);
            });
        } else {
            alert("이미지를 선택하세요");
        }
    };

     const checkRemove = () => {
        removeCookie("alert");
    }

    const deleteImg = () => {
        delImg(cookEmpNo);
        alert("삭제되었습니다.");
    }

    const goToBoardList = () => {
        navigate(`/board/list`)
      }
    

    return (
        <>
        <div>
        <div className="flex justify-between items-center px-6 py-4 bg-white shadow-lg rounded-md mb-8">
                <div className="flex items-center space-x-8">
                    <div className="text-2xl font-semibold text-blue-800 select-none  cursor-pointer" onClick={goToBoardList}>
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
                    <Link to={`/chat/empList/${cookEmpNo}?page=1`} className="w-12 cursor-pointer" onClick={()=>checkRemove()}>
                    {chatCntCook  ? 
                        <img src={colorChat} alt='colorChat' className='w-full' /> :
                        <img src={chat} alt="Chat" className="w-full" />
                    }
                    </Link>
                </div>
            </div>


            <div className="m-6">
                <h2 className=" font-semibold text-3xl text-center">{empData.firstName} {empData.lastName}님</h2>
                <p className="text-2xl text-center m-3">프로필 사진 변경</p>
            </div>

            <div className="flex items-center justify-center m-3">
    <div className="flex flex-col items-center justify-center m-8 gap-7 p-6  rounded-lg shadow-xl w-[70%]">
        <p className="text-xl text-gray-700 text-center">현재 사진</p>

        <div className="flex items-center justify-center mb-6">
            {getEmpImage && getEmpImage.uuid ? (
                <img src={`${API_SERVER_HOST}/api/empImage/view/${getEmpImage.uuid}`} alt="Profile" className="w-[200px] h-[200px] rounded-full" />
            ) : (
                empData.gender === 'm' ? 
                    <img src={m} alt="man" className="w-[200px] h-[200px] rounded-full " /> : 
                    <img src={w} alt="woman" className="w-[200px] h-[200px] rounded-full " />
            )}
        </div>

        <div className="flex flex-col  items-center justify-between w-full mb-8 p-6 bg-white rounded-lg shadow-lg border border-gray-300">
            <div className="relative w-full  p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-lg ">
                <input 
                    ref={fileId} 
                    type="file" 
                    hidden 
                    multiple 
                    onChange={(e) => {
                        const fileName = e.target.files ? e.target.files[0].name : '';
                        setFileList(prevState => ({ ...prevState, url: fileName }));
                    }} 
                    id="fileInput"
                />
                <label 
                    htmlFor="fileInput" 
                    className="flex items-center justify-between w-full h-[40px] px-4 border border-gray-300 rounded-md cursor-pointer"
                >
                    <span className="text-gray-600 truncate">{fileList.url || "파일을 선택하세요"}</span>
                    <img src={upload} alt="upload" className="w-6 h-6 ml-2" />
                </label>
            </div>

            <div className="flex flex-row justify-center gap-4 w-full  mt-6 ">
                <button 
                    className="bg-[#797979] text-white hover:bg-[#262626] rounded-md p-3 w-[40%]  text-lg font-semibold "
                    onClick={updateImage}>
                    이미지 변경
                </button>
                <button 
                    className="bg-[#797979] text-white hover:bg-[#262626] rounded-md p-3 w-[40%] text-lg font-semibold "
                    onClick={deleteImg}>
                    이미지 삭제
                </button>
            </div>
        </div>
    </div>
</div>

        </div>
        </>
    );
};


export default EmpImageComponent;