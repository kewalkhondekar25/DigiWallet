import './App.css'
import { ModeToggle } from './components/theme/mode-toggle'
import { ThemeProvider } from './components/theme/theme-provider'
import { Routes, Route, BrowserRouter } from "react-router-dom"
import OtpPage from './pages/auth/Otp'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import Dashboard from './pages/screens/Dashboard'
import Wallet from './pages/screens/Wallet'
import AddToWallet from './components/cards/AddToWallet'
import P2pTransfer from './pages/screens/P2pTransfer'
import Transfer from './components/cards/Transfer'
import Transactions from './pages/screens/Transactions'
import TxnDetails from './components/cards/TxnDetails'

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* <ModeToggle /> */}
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={ <SignUp/> } />
          <Route path='/signin' element={ <SignIn/> } />
          <Route path='/otp' element={ <OtpPage/> } />
          <Route path='/dashboard' element={ <Dashboard/> } />
          <Route path='/wallet' element={ <Wallet/> }>
            <Route path='add-money' element={ <AddToWallet/> }/>
            <Route path='send-money' element={ <AddToWallet/> }/>
          </Route>
          <Route path='/p2p' element={ <P2pTransfer/> }>
            <Route path='pay' element={ <Transfer/> }/>
          </Route>
          <Route path='/transactions' element={ <Transactions/> }>
            <Route path='txn-details' element={ <TxnDetails/> }/>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
