import Txn from "@/components/cards/Txn"
import Layout from "@/components/layout/Layout"
import { Outlet, useLocation } from "react-router-dom"

const Transactions = () => {
  const location = useLocation();
  
  return (
    <Layout>
      <div className='flex justify-center items-center min-h-screen ml-12 '>
        {
          location.pathname === "/transactions/txn-details" ? (<Outlet/>) : (<Txn/>)
        }
      </div>
    </Layout>
  )
}

export default Transactions