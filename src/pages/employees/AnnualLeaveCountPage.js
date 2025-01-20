import AnnualLeaveCountComponent from "../../components/employees/AnnualLeaveCountComponent";

const AnnualLeaveCountPage = ({empNo}) => {
    console.log(empNo)

    return (
        <>
            <AnnualLeaveCountComponent empNo={empNo} /> 
        </>
    )
}
export default AnnualLeaveCountPage;