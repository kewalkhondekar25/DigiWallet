import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { useAppSelector } from "@/store/hooks";
import { CircleCheckBig } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";


const TxnDetails = () => {

  const { name } = useAppSelector(state => state.paymentState);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Details</CardTitle>
        <CardDescription>
          <div className="flex flex-col">
            <span>To: {name}</span>
            <span>Transaction ID: 9463826491</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col justify-center items-center gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>&#8377; 100</div>
          <div className="flex gap-3">
            <div className="text-green-500"><CircleCheckBig/></div>
            <span>Success</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link to="/transactions">
          <Button>Back</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default TxnDetails
