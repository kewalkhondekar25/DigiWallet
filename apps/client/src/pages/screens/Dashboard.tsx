import Layout from "@/components/layout/Layout"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


const Dashboard = () => {

  const data = [
    {
      title: "wallet balance",
      amount: 1000
    },
    {
      title: "bank balance",
      amount: 20000
    }
  ];

  return (
    <Layout>
      <div className='flex justify-center items-center min-h-screen'>
        <div className="flex-1 ml-24">
          {
            data.map((item, i) => {
              return (
                <Card key={i} className="w-4/5 mb-2">
                  <CardHeader>
                    <CardTitle>{`${i === 0 ? "Wallet Balance" : "Bank Balance"}`}</CardTitle>
                    <CardDescription>{`${i === 2 ? "Recent" : "Available Balance"}`}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    &#8377; {item.amount}
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