import Layout from "@/components/layout/Layout"
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ChangeEvent } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const P2pTransfer = () => {

  const contacts = [
    {
      name: "albert",
      avatar: "https://github.com/shadcn.png"
    },
    {
      name: "bob",
      avatar: "https://github.com/shadcn.png"
    },
    {
      name: "catherine",
      avatar: "https://github.com/shadcn.png"
    },
    {
      name: "dave",
      avatar: "https://github.com/shadcn.png"
    },
    {
      name: "emily",
      avatar: "https://github.com/shadcn.png"
    },
    {
      name: "fred",
      avatar: "https://github.com/shadcn.png"
    },
    {
      name: "ganesh",
      avatar: "https://github.com/shadcn.png"
    },
    {
      name: "harry",
      avatar: "https://github.com/shadcn.png"
    },
    {
      name: "ive",
      avatar: "https://github.com/shadcn.png"
    },
    {
      name: "james",
      avatar: "https://github.com/shadcn.png"
    },
    {
      name: "kevin",
      avatar: "https://github.com/shadcn.png"
    }
  ];

  const handleSearchContact = (e: ChangeEvent<HTMLInputElement>) => {
    const result = e.target.value ? (contacts.filter(item => item.name.startsWith(e.target.value))) : [];
    console.log(result);
  };

  const location = useLocation();

  return (
    <Layout>
      <div className='flex justify-center items-center min-h-screen ml-12 '>
        {
          location.pathname === "/p2p/pay" ? (<Outlet />) : (
            <ScrollArea className="rounded-md border h-96">
              <div className="p-3">
                <div className="flex flex-col gap-3 p-1 mb-3">
                  <div className="text-sm font-semibold">Pay anyone on DigiWallet</div>
                  <Input type="text" placeholder="Search contact" onChange={handleSearchContact} />
                </div>
                {
                  contacts.map((item, i) => {
                    return (
                      <div key={i}>
                        <Link to={`/p2p/pay`}>
                          <div className="flex items-center gap-3 mb-3 hover:cursor-pointer">
                            <Avatar>
                              <AvatarImage src={item.avatar} />
                            </Avatar>
                            <div>{item.name}</div>
                          </div>
                        </Link>
                        <Separator />
                      </div>
                    )
                  })
                }
              </div>
            </ScrollArea>
          )
        }
      </div>
    </Layout>
  )
};

export default P2pTransfer
