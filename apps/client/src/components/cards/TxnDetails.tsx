import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppSelector } from "@/store/hooks";


const TxnDetails = () => {

  const { name } = useAppSelector(state => state.paymentState);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Details</CardTitle>
        <CardDescription>Success</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};

export default TxnDetails
