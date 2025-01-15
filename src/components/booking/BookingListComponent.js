import React, { useEffect, useState } from 'react';
import { getList } from '../../api/bookingApi';
import useCustomMove from '../../hooks/useCustomMove';
import PageComponent from '../common/PageComponent';

const initState = {
    dtoList : [],
    pageNumList : [],
    pageRequestDTO : null,
    prev : false,
    next : false,
    totalCount : 0,
    prevPage : 0,
    nextPage : 0,
    totalPage : 0,
    current : 0
}

const initRes = {
    cr : '',
    wr : ''
}

const BookingListComponent = () => {

    const [booking,setBooking] = useState(initState);

    const [res, setRes] = useState(initRes);

    const { page, size, moveToRead, moveToAdd, moveToList } = useCustomMove();

    const [temp, setTemp] = useState();

    useEffect(() => {
        if(res.cr !== ''){
            getList(res.cr,[1,size]).then(data => {
                setBooking(data);
                setTemp(1);
            });
        };

        if(res.wr !== ''){
            getList(res.wr,[1,size]).then(data => {
                setBooking(data);
                setTemp(2);
            });
        };
        
    }, [res]);

    useEffect(() => {
        if(temp === 1){
            getList('cr',[page,size]).then(data => {
                setBooking(data);
            });
        };

        if(temp === 2){
            getList('wr',[page,size]).then(data => {
                setBooking(data);
            });
        };
        
    }, [page, size]);

    useEffect(()=>{
        setRes({...initRes});
    },[booking]);

    const handleClickAdd = () =>{
        moveToAdd();
    }

    const handleChangeBooking = (evt) => {
        res[evt.target.id] = evt.target.id;
        setRes({...res});
    }

    
    return (<>
    <div className="text-3xl">
        <div className="flex justify-center">
            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                <div className="w-1/2 p-6 text-center rounded-r border border-solid border-neutral-300 shadow-md" 
                id="cr"
                onClick={handleChangeBooking}>회의실</div>
                <div className="w-1/2 p-6 text-center rounded-r border border-solid border-neutral-300 shadow-md" 
                id='wr'
                onClick={handleChangeBooking}>화장실</div>
            </div>
        </div>

        <div className='flex flex-wrap mx-auto p-6'>
            {booking.dtoList.map((data)=>{
                return(
                <div 
                key = {data.bookNo} 
                className='flex w-full min-w-[400px] p-2 m-2 rounded shadow-md' 
                onClick = {() => moveToRead(data.bookNo)}
                >
                    {data.bookNo} / {data.roomNo} / {data.bookDate} / {data.start} / {data.end}
                </div>)
            })}
        </div>

        <PageComponent
            serverData={booking} 
            movePage={moveToList}
            />
        </div>

        <div className="flex justify-end p-4">
        <button type="button"
        className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
        onClick={handleClickAdd}>
            add
        </button>
        </div>
        </>
    )
}

export default BookingListComponent;