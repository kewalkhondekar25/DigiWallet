import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useLocation, useNavigate } from "react-router-dom";

const AddToWallet = () => {

  const path = useLocation();
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{path.pathname === "/wallet/add-money" ? "Add Money to Wallet" : "Send Money to Bank"}</CardTitle>
        <CardDescription>{path.pathname === "/wallet/add-money" ? "Deposit Funds from your Bank" : "Withdrawal Funds from your Wallet"}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Label>Amount</Label>
        <Input type="number" name="amount" placeholder="Enter Amount"/>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button>Proceed</Button>
        <Button onClick={() => navigate("/wallet")}>Back</Button>
      </CardFooter>
    </Card>
  );
};

export default AddToWallet;