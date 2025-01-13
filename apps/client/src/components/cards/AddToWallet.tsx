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
import { useFormik } from "formik";
import { onRampTxnSchema } from "@/validations/wallet.validation";
import { useState } from "react";
import { usePostRequest } from "@/hooks/useQuery";
import { onRampTxnRequest } from "@/lib/apiCalls";

const AddToWallet = () => {

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const path = useLocation();
  const navigate = useNavigate();

  const { mutate, data, isPending, isError, error} = usePostRequest(onRampTxnRequest);

  const formik = useFormik({
    initialValues: {
      id: 69,
      amount: 1
    },
    validationSchema: onRampTxnSchema,
    onSubmit: (values) => {
      values.amount = values.amount * 100;
      mutate(values);
      console.log(values);
    }
  });

  return (
    <Card>
      <form onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit()
      }}>
        <CardHeader>
          <CardTitle>{path.pathname === "/wallet/add-money" ? "Add Money to Wallet" : "Send Money to Bank"}</CardTitle>
          <CardDescription>{path.pathname === "/wallet/add-money" ? "Deposit Funds from your Bank" : "Withdrawal Funds from your Wallet"}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Label>Amount</Label>
          <Input type="number"
            {...formik.getFieldProps("amount")}
            name="amount" placeholder="Enter Amount"
          />
          {formik.errors.amount && formik.touched.amount && <p className="text-red-500 text-sm">{formik.errors.amount}</p>}
          {/* {
            isError && errorMessage && (<p className="text-red-500 text-sm">{errorMessage}</p>)
          } */}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button>Proceed</Button>
          <Button onClick={() => navigate("/wallet")}>Back</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AddToWallet;