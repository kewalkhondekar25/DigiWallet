import WalletBalance from '@/components/cards/WalletBalance'
import Layout from '@/components/layout/Layout'
import { ChevronLeft } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom'

const Wallet = () => {

  const location = useLocation();
  const isBaseRoute = location.pathname === "/wallet";

  return (
    <Layout>
      <div className='flex flex-col justify-center items-center min-h-screen ml-12 gap-3'>
        {
          isBaseRoute ? (<WalletBalance />) : (<Outlet />)
        }
        {
          isBaseRoute ? null : (
            <Link to="/wallet" className='flex'>
              <ChevronLeft />
              <span>Back</span>
            </Link>
          )
        }
      </div>
    </Layout>
  )
}

export default Wallet