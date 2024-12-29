import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Filter from "./Filter";
import { Button } from "../ui/button";
import { payTo } from "@/store/features/payment/paymentSlice";
import { useAppDispatch } from "@/store/hooks";
import { useNavigate } from "react-router-dom";

const Txn = () => {

  const txnData = [
    {
      name: "albert",
      avatar: "https://github.com/shadcn.png",
      date: "2024-12-20T21:00:24.104Z",
      amount: 100
    },
    {
      name: "bob",
      avatar: "https://github.com/shadcn.png",
      date: "2024-12-20T21:00:24.104Z",
      amount: 400
    },
    {
      name: "charley",
      avatar: "https://github.com/shadcn.png",
      date: "2024-12-20T21:00:24.104Z",
      amount: 350
    },
    {
      name: "dave",
      avatar: "https://github.com/shadcn.png",
      date: "2024-12-20T21:00:24.104Z",
      amount: 900
    },
    {
      name: "emily",
      avatar: "https://github.com/shadcn.png",
      date: "2024-12-20T21:00:24.104Z",
      amount: 700
    },
    {
      name: "dave",
      avatar: "https://github.com/shadcn.png",
      date: "2024-12-20T21:00:24.104Z",
      amount: 1000
    },
    {
      name: "fredy",
      avatar: "https://github.com/shadcn.png",
      date: "2024-12-20T21:00:24.104Z",
      amount: 1200
    },
    {
      name: "ganesh",
      avatar: "https://github.com/shadcn.png",
      date: "2024-12-20T21:00:24.104Z",
      amount: 2100
    },
    {
      name: "harry",
      avatar: "https://github.com/shadcn.png",
      date: "2024-12-20T21:00:24.104Z",
      amount: 100
    }
  ];

  const dateFormat = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getUTCDate();
    const month = date.toLocaleString("en-US", { month: "short", timeZone: "UTC" });
    const year = date.getFullYear().toString().slice(-2);
    return `${day} ${month} ${year}`;
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const handleNavigate = (name: string) => {
    dispatch(payTo(name));
    navigate("/transactions/txn-details")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>Deposite, Withdrawal, P2P Transfers</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <Filter />
          <ScrollArea className="h-72 rounded-md border">
            <div className="p-4">
              {txnData.map((item, i) => (
                <div key={i} className="hover:cursor-pointer" onClick={() => handleNavigate(item.name)}>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-sm">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span>{item.name}</span>
                        <span>{dateFormat(item.date)}</span>
                      </div>
                    </div>
                    <div>{item.amount}</div>
                  </div>
                  <Separator className="my-2" />
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button>Clear Filter</Button>
      </CardFooter>
    </Card>
  );
};

export default Txn
