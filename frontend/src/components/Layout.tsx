import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = ({ children }: any) => {
    return (
        <div className='flex h-screen w-screen overflow-hidden'>
            <Sidebar />

            <div className="flex-1 flex flex-col h-screen">
                <div>
                    <Header />
                </div>
                
                <div className="flex-1 p-4 bg-gray-200 overflow-y-auto overflow-x-hidden">
                    {/* {children} */}
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Layout;