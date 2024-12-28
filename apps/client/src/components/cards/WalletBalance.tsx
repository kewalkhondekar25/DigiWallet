import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button";
import { Send, Wallet, Plus } from "lucide-react";


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
        <Button><Wallet/>Add</Button>
        <Button><Send/>Send</Button>
      </CardFooter>
    </Card>

  )
};

export default WalletBalance;