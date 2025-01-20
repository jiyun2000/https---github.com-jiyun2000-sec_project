import { useEffect, useState } from "react";
import { getBirth } from "../api/employeesApi";
import useCustomMove from "../hooks/useCustomMove";

const initState = {
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: null,
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 0
}
const BirthEmpComponent = () => {
    const [birthEmp, setBirthEmp] = useState(initState);
    const { page, size } = useCustomMove();
  
    useEffect(() => {
      getBirth([page, size]).then((data) => {
        setBirthEmp(data);
      }).catch((error) => {
        console.log(error);
      });
    }, [page, size]);
    
  
    return (
    <div className="h-[20vh] w-full flex flex-col">
        <h2 className="text-2xl font-semibold text-center">오늘의 생일자</h2>
        <div className="overflow-y-auto flex-grow">
          {Array.isArray(birthEmp.dtoList) && birthEmp.dtoList.length > 0 ? (
            birthEmp.dtoList.map((data) => (
              <div key={data.empNo} className="flex p-2 m-2 rounded shadow-md items-center justify-center">
                <div className="flex flex-col items-center font-light">
                  <div>이름 : {data.firstName}{data.lastName}</div>
                  <div>부서 : {data.deptNo}</div>
                </div>
              </div>
            ))
          ) : (
            <p>오늘 생일인 직원이 없습니다.</p>
          )}
        </div>
    </div>
    );
  };
  

export default BirthEmpComponent;
