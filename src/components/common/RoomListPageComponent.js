
const RoomListPageComponent = ({serverData, roomList, movePage}) => {
    return <div className="m-6 flex justify-center">
        {
        serverData.prev?(
            <div 
            className="m-2 p-2 w-16 text-center font-bold text-blue-400" 
            onClick={()=>{movePage({page:serverData.prevPage,roomNo:roomList.roomNo})}}>
                prev
            </div>
        ):(
            <></>
        )
    }

    {
        serverData.pageNumList.map(pageNum=>
            <div 
            className={`m-2 p-2 w-16 text-center rounded shadow-md text-blue ${serverData.current === pageNum}?'bg-gray-500':'bg-blue-400'}`}
            onClick={()=>movePage({page:pageNum,roomNo:roomList.roomNo})}
            key={pageNum}
            >
                {pageNum}
            </div>
        )
    }

    {
        serverData.next?(
            <div 
            className="m-2 p-2 w-16 text-center font-bold text-blue-400"
            onClick={()=>movePage({page:serverData.nextPage,roomNo:roomList.roomNo})}>
                next
            </div>
        ):(
            <></>
        )
    }
    </div>
}

export default RoomListPageComponent;