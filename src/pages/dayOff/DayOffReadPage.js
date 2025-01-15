import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import DayOffReadComponent from "../../components/dayOff/DayOffReadComponent";

const DayOffReadPage = () => {
    const {dayOffNo} = useParams();

    const navigate = useNavigate();

    const [queryString] = useSearchParams();

    const page = queryString.get('page')?parseInt(queryString.get('page')):1;
    const size = queryString.get('size')?parseInt(queryString.get('size')):10;

    return <>
        <div><DayOffReadComponent dayOffNo = {dayOffNo}/></div>
    </>
}

export default DayOffReadPage;