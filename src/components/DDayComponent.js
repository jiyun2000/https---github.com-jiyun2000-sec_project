import { useEffect, useState } from "react";
import { getDDay } from "../api/employeesApi";
import { data } from "react-router-dom";

const DDayComponent = ({empNo}) => {

    const [dDay, setDDay] = useState(null);

    useEffect(()=>{
        getDDay(empNo).then((res) => {
            console.log(res);
            setDDay(res);
        }).catch((error) => {
            console.log(error);
        })
    }, [empNo])


    return(
        <>
        <div>
             ♥ + {dDay} 일
        </div>
        </>
    )
}
export default DDayComponent;