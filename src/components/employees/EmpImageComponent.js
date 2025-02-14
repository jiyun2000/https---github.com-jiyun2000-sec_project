import { useCallback, useEffect, useRef, useState } from "react";
import upload from "../../assets/icon/upload.png";
import { getEmpImageOne, modImg, register } from "../../api/employeesImageApi";
import { getCookie } from "../../util/cookieUtil";
import { getOneEmp } from "../../api/employeesApi";
export const API_SERVER_HOST = 'http://localhost:8080';

const initState = {
    empNo : 0,
    url : '',
    files : [],
}

const EmpImageComponent = () => {
    const dndRef = useRef();
    const [isExtraShow, setIsExtraShow] = useState();
    const [fileList, setFileList] = useState({...initState});
    const fileId = useRef();
    const [cookEmpNo, setCookEmpNO] = useState(getCookie('member').empNo);
    console.log("이 사람 empNo = " + cookEmpNo);
    const [empData, setEmpData] = useState('');
    const [getEmpImage, setGetEmpImage] = useState('');
    

    useEffect(()=>{
        getOneEmp(cookEmpNo).then((data)=>{
            setEmpData(data);
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    const sendImage = () => {
    
            const fileList = fileId.current.files;
            console.log(fileId);
            console.log(fileList);
            
            const formData = new FormData();
            
            for(let i = 0; i<fileList.length; i++){
                formData.append('files',fileList[i]);
            };
            
            console.log(cookEmpNo);
            
            // formData.append('empImgNo', fileList.empImgNo);
            formData.append('empNo',cookEmpNo);
            formData.append('url',fileList[0].name);
            formData.append('uuid',fileList.uploadFileNames);
            // formData.append('uploadFileNames',fileList.uploadFileNames);

            console.log(formData);
            register(formData,cookEmpNo);  

        
    }


    useEffect(()=>{
        console.log(cookEmpNo); //잘받음
        getEmpImageOne(cookEmpNo).then((data) => {
            console.log("dd" + data);
            if(data != null){
                setGetEmpImage(data);
            }else{
                return;
            }
            
        }).catch((error)=>{
            console.log(error);
        })
    }, []);

    return(
        <>
        <div className="m-6">
            <h2 className="font-semibold text-2xl text-center">{empData.firstName}{empData.lastName}</h2>
            <p className="text-xl text-center m-3">프로필 사진을 등록하세요</p>
        </div>

        <div className="w-[50%] flex flex-row items-center justify-center m-5 gap-7">
            <p>현재 사진</p>
            {getEmpImage ? <img src={`${API_SERVER_HOST}/api/empImage/view/${getEmpImage.url}`}/> : <></> }
            {getEmpImage.url}
            
            
        </div>

        <div className='flex flex-row'>
            <div className='flex flex-row justify-center'>
                <label ref={dndRef} className='w-[50%] items-center justify-center inline-block '>
                        <img src={upload} alt='upload' className='w-[20%]'/>
                        <input
                            ref={fileId}
                            type="file"
                            hidden="true"
                            multiple="true"
                            // onChange={(evt) => {
                            //     onChangeFile(evt);
                            // }}
                        ></input>
                </label>
            </div>
            <div
            onClick={() => {
                setIsExtraShow(true);
            }}
            ></div>
        
            
            <div>
                <div className='bg-[#83a3d0] text-white hover:bg-[#718aab] rounded-md p-2 '
                    onClick={() => {
                        sendImage({
                            files: fileList,
                            empNo:cookEmpNo
                        });
                        }}
                >
                    이미지 변경
                </div>
            </div>
        </div>   
        </>
    )
}
export default EmpImageComponent;