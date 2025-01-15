import { Navigate } from "react-router-dom";
import BookingReadPage from "../pages/booking/BookingReadPage.js";
import BookingModifyPage from "../pages/booking/BookingModifyPage.js";
import BookingAddPage from "../pages/booking/BookingAddPage.js";
import BookingListPage from "../pages/booking/BookingListPage.js";

const bookingRouter = () => {
    return [
        {
            path : "list",
            element : <BookingListPage/>
        },
        {
            path : '',
            element : <Navigate replace to={'list'}/>
        },
        {
            path : 'read/:bookNo',
            element : <BookingReadPage/>
        },
        {
            path : 'modify/:bookNo',
            element : <BookingModifyPage/>
        },
        {
            path : 'add',
            element : <BookingAddPage/>
        }
    ]
}

export default bookingRouter;