
const PageComponent = ({serverData, movePage}) => {
    return <div className="m-6 flex justify-center">
        {
        serverData.prev?(
            <div 
            className="m-2 p-2 w-16 text-center font-bold text-[#596fbd]" 
            onClick={()=>{movePage({page:serverData.prevPage})}}>
                prev
            </div>
        ):(
            <></>
        )
    }

    {
        serverData.pageNumList.map(pageNum=>
            <div 
            className={`m-2 p-2 w-16 text-center rounded-lg shadow-md text-[#354ea7] 
                ${serverData.current === pageNum ? 'bg-[#8ba7cd] text-white' : 'cursor-pointer bg-gray-100 hover:bg-[#c3d1e6] hover:text-white'}`}
            onClick={serverData.current === pageNum ? null : () => movePage({page: pageNum})}
            key={pageNum}
            >
                {pageNum}
            </div>
        )
    }

    {
        serverData.next?(
            <div 
            className="m-2 p-2 w-16 text-center font-bold text-[#596fbd] cursor-pointer"
            onClick={()=>movePage({page:serverData.nextPage})}>
                next
            </div>
        ):(
            <></>
        )
    }
    </div>
}

export default PageComponent;