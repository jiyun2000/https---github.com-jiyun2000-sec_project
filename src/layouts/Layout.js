import { Outlet } from "react-router-dom";
import NavigationComponent from "../components/nav/NavigationComponent";
import { useState } from "react";
import cx from "classnames";

const Layout = () => {
    const [isScrolling, setIsScrolling] = useState(false);

    const handleScroll = () => {
        clearTimeout();
        if(!isScrolling) setIsScrolling(true);
        if(isScrolling) setTimeout(() => {
            setIsScrolling(false);
        }, 1000);
    };

    return <>
        <div className="fixed top-0 left-0">
            <NavigationComponent />
        </div>
        <div className="p-5 ml-[260px] bg-slate-100 h-[100vh]">
            <div className={cx("h-full rounded-xl bg-white shadow-[0_0_5px_rgba(0,0,0,0.1)] overflow-y-scroll",
                    isScrolling && "isScrolling")} onScroll={handleScroll}>
                <Outlet />
            </div>
        </div>
    </>;
};

export default Layout;