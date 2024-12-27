import { User, Banknote, Landmark, FileClock, LogOut, Wallet } from "lucide-react";
const Sidebar = () => {

  const icons = [
    {
      icon: User,
      title: "Kewal"
    },
    {
      icon: Wallet,
      title: "Wallet"
    },
    {
      icon: Banknote,
      title: "P2P Transfer"
    },
    {
      icon: Landmark,
      title: "Bank"
    },
    {
      icon: FileClock,
      title: "Transactions"
    }
  ]
  return (
    <div className="flex flex-col justify-between items-center bg-[#18181b] border-solid border-[1px] w-1/6 h-screen">
      <div>
        {
          icons.map((items, i) => {
            return (
              <div key={i} className="flex justify-center p-3">
                {<items.icon />}
              </div>
            )
          })
        }
      </div>
      <div className="p-3">
        <LogOut />
      </div>
    </div>

    // <div className="absolute flex flex-col justify-between bg-[#18181b] border-solid border-[1px] w-[15%] h-screen">
    //   <div>
    //     {
    //       icons.map((items, i) => {
    //         return (
    //           <div key={i} className="flex justify-center p-3 gap-3">
    //             <span><items.icon /></span>
    //             <span>{items.title}</span>
    //           </div>
    //         )
    //       })
    //     }
    //   </div>
    //   <div className="p-3">
    //     <LogOut />
    //   </div>
    // </div>
  )
};

export default Sidebar;