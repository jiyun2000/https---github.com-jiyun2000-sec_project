const ReadComponent = ({serverData}) => {
    
    return serverData.map((detail, index) => (
        <div className="w-full flex px-2 py-4 gap-4 border-b border-slate-200" key={index}>
            <div className="w-[180px] my-3 px-3 font-bold flex items-center gap-[0.5em] border-r-2 border-slate-200">
                <div className="w-[4px] h-[1em] rounded-[0.5em] bg-cyan-300"></div>
                <span>{detail.label}</span>
            </div>
            <div className="relative flex w-full flex-row items-stretch">
                <div className="w-full p-3">{detail.value}</div>
            </div>
        </div>
    ))
}

export default ReadComponent;