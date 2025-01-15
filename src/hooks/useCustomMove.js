import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

const getNum = (param, defaultValue) => {
    if(!param){
        return defaultValue;
    }

    return parseInt(param);
}

const useCustomMove = () => {
    const navigate = useNavigate();

    const[queryString] = useSearchParams();

    const page = getNum(queryString.get('page'),1);
    const size = getNum(queryString.get('size'),10);

    const queryDefault = createSearchParams({page,size}).toString();

    const moveToRead = (num) => {
        navigate({pathname:`../read/${num}`, search:queryDefault});
    }

    const moveToJobRead = (num) => {
        navigate({pathname:`../read/${num}`});
    }

    const moveToModify = (num) => {
        navigate({pathname:`../modify/${num}`,search:queryDefault});
    }

    const moveToList = (pageParam) => {
        let queryStr = '';

        if(pageParam){
            const pageNum = getNum(pageParam.page,1);
            const sizeNum = getNum(pageParam.size,10);

            queryStr = createSearchParams({
                page : pageNum,
                size : sizeNum
            }).toString();
        }else{
            queryStr = queryDefault;
        }

        navigate({pathname:`../list`,search:queryStr})
    };

    const moveToJobList = (pageParam) => {
        let queryStr = '';

        if(pageParam){
            const pageNum = getNum(pageParam.page,1);
            const sizeNum = getNum(pageParam.size,10);

            queryStr = createSearchParams({
                page : pageNum,
                size : sizeNum
            }).toString();
        }else{
            queryStr = queryDefault;
        }

        navigate({pathname:`../read/${pageParam.jobNo}`,search:queryStr})
    };

    const moveToDeptInfoList = (pageParam) => {
        let queryStr = '';

        if(pageParam){
            const pageNum = getNum(pageParam.page,1);
            const sizeNum = getNum(pageParam.size,10);

            queryStr = createSearchParams({
                page : pageNum,
                size : sizeNum
            }).toString();
        }else{
            queryStr = queryDefault;
        }

        navigate({pathname:`../read/${pageParam.deptNo}`,search:queryStr})
    };

    const moveToRoomList = (pageParam) => {
        let queryStr = '';

        if(pageParam){
            const pageNum = getNum(pageParam.page,1);
            const sizeNum = getNum(pageParam.size,10);

            queryStr = createSearchParams({
                page : pageNum,
                size : sizeNum
            }).toString();
        }else{
            queryStr = queryDefault;
        }

        navigate({pathname:`../read/${pageParam.roomNo}`,search:queryStr})
    };

    const moveToAdd = () => {
        navigate({pathname:`../add`});
    }

    return {page, size, moveToJobRead, moveToRead, moveToModify, moveToList, moveToJobList, moveToDeptInfoList, moveToRoomList, moveToAdd};
}

export default useCustomMove;