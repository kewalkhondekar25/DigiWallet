import Layout from "@/components/layout/Layout"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { usePostRequest } from "@/hooks/useQuery";
import { fetchUserData } from "@/lib/apiCalls";
import { formatAmount } from "@/lib/currencyFormat";
import { setUserData } from "@/store/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";

const Dashboard = () => {

  const body = { "id": 69 };
  const dispatch = useAppDispatch();

  const { mutate, data, isPending, isError, error} = usePostRequest(fetchUserData);
  const { name, email, walletBalance, bankBalance } = useAppSelector(state => state.userState)
  
  useEffect(() => {
    mutate(body);
  }, []);

  useEffect(() => {

    if(data){
      const payload = {
        name: data.data.name,
        email: data.data.email,
        walletBalance: data.data.wallet_balances.amount,
        bankBalance: data.data.user_bank_ballances.amount,
      };
      dispatch(setUserData(payload))
    }
  }, [data]);

  const Data = [
    {
      title: "wallet balance",
      amount: walletBalance
    },
    {
      title: "bank balance",
      amount: bankBalance
    }
  ];

  return (
    <Layout>
      <div className='flex justify-center items-center min-h-screen'>
        <div className="flex-1 ml-24">
        <div className=" flex justify-between items-center w-4/5 mb-3">
            <p className="text-sm">Empowering Payments, Enabling Possibilities.</p>
          </div>
          {
            Data.map((item, i) => {
              return (
                <Card key={i} className="w-4/5 mb-2">
                  <CardHeader>
                    <CardTitle>{`${i === 0 ? "Wallet Balance" : "Bank Balance"}`}</CardTitle>
                    <CardDescription>{`${i === 2 ? "Recent" : "Available Balance"}`}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    &#8377; {formatAmount(item.amount)}
                  </CardContent>
                </Card>
              )
            })
          }

        </div>
      </div>
    </Layout>
  )
}

export default Dashboard