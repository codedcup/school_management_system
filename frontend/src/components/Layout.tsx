import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = ({ children }: any) => {
    return (
        <div className='flex h-screen w-screen overflow-hidden'>
            <Sidebar />

            <div className="flex-1 flex flex-col h-screen">
                <div>
                    <Header />
                </div>
                
                <div className="flex-1 p-4 overflow-y-auto overflow-x-hidden">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout;