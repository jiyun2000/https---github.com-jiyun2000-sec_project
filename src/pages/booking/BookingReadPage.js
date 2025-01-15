import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import BookingReadComponent from "../../components/booking/BookingReadComponent";

const BookingReadPage = () => {
    const {bookNo} = useParams();

    const navigate = useNavigate();

    const [queryString] = useSearchParams();

    const page = queryString.get('page')?parseInt(queryString.get('page')):1;
    const size = queryString.get('size')?parseInt(queryString.get('size')):10;

    return <>
        <div><BookingReadComponent bookNo = {bookNo}/></div>
    </>
}

export default BookingReadPage;