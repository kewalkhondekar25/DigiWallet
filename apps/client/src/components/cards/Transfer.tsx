import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useAppSelector } from "@/store/hooks";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const Transfer = () => {

  const navigate = useNavigate();
  const { name } = useAppSelector(state => state.paymentState);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment</CardTitle>
        <CardDescription>Paying {name} from your Wallet</CardDescription>
      </CardHeader>
      <CardContent>
        <Input type="number" name="amount" placeholder="Enter Amount"/>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button>Proceed</Button>
        <Button onClick={() => navigate("/p2p")}>Back</Button>
      </CardFooter>
    </Card>
  )
};

export default Transfer;