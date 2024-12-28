import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button";
import { Send, Wallet } from "lucide-react";
import { Link } from "react-router-dom";


const WalletBalance = () => {
  return (
    <Card className="w-4/5">
      <CardHeader>
        <CardTitle>Your Wallet Balance</CardTitle>
        <CardDescription>Available amount</CardDescription>
      </CardHeader>
      <CardContent>
        <p>&#8377; 1000</p>
      </CardContent>
      <CardFooter className="flex justify-between gap-1">
        <Link to="/wallet/add-money">
          <Button>
            <Wallet />Add
          </Button>
        </Link>
        <Link to="/wallet/send-money">
          <Button>
            <Send />Send
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
};

export default WalletBalance;