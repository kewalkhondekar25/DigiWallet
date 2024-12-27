import { User, Banknote, Landmark, FileClock, LogOut, Wallet, PanelRightClose, PanelRightOpen } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {

  const [isOpen, setIsOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsOpen(prev => !prev);
  }

  const icons = [
    {
      icon: Wallet,
      title: "Wallet",
      path: "/wallet"
    },
    {
      icon: Banknote,
      title: "P2P Transfer",
      path: "wallet"
    },
    {
      icon: Landmark,
      title: "Bank",
      path: "wallet"
    },
    {
      icon: FileClock,
      title: "Transactions",
      path: "wallet"
    }
  ]
  return (
    <div className="absolute flex">
      <div className={`flex flex-col justify-between items-center bg-[#18181b] border-solid border-[1px]  h-screen 
        transition-all duration-300 ease-in-out ${isOpen ? "w-60" : "w-14"}`}>
        <div>
          <Link to="/dashboard" onClick={handleToggleSidebar}>
            <div className="flex-1 p-3">
              <div className="flex justify-between gap-2">
                <div className="bg-[#e11d48] rounded-lg"><User className="h-8 w-8"/></div>
                { isOpen ? (<div className="text-xs font-semibold">
                  <p>kewal</p>
                  <p>kewalkhondekar@icloud.com</p>
                </div>) : null}
              </div>
            </div>
          </Link>
          {
            icons.map((items, i) => {
              return (
                <Link to={`${items.path}`} key={i} onClick={handleToggleSidebar}>
                  <div className={`flex ${isOpen ? "justify-start gap-3" : "justify-center"} p-3`}>
                    {<items.icon />}
                    {isOpen ? <span>{items.title}</span> : null}
                  </div>
                </Link>
              )
            })
          }
        </div>
        <div className="p-3">
          <LogOut />
        </div>
      </div>
      <div className="flex gap-1 p-2 hover:cursor-pointer text-xs"
        onClick={handleToggleSidebar} >
        {isOpen ? <PanelRightOpen /> : <PanelRightClose />}
        <span className="mt-1">Dashboard</span>
      </div>
    </div>

  )
};

export default Sidebar;