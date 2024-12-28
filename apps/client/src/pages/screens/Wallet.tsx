import WalletBalance from '@/components/cards/WalletBalance'
import Layout from '@/components/layout/Layout'

const Wallet = () => {
  
  return (
    <Layout>
      <div className='flex justify-center items-center min-h-screen ml-12'>
        <WalletBalance/>
      </div>
    </Layout>
  )
}

export default Wallet