import './App.css'
import { ModeToggle } from './components/theme/mode-toggle'
import { ThemeProvider } from './components/theme/theme-provider'
import { Routes, Route, BrowserRouter } from "react-router-dom"
import OtpPage from './pages/auth/Otp'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import Dashboard from './pages/screens/Dashboard'
import OnRampTxn from './pages/screens/Wallet'
import Sidebar from './components/sidebar/Sidebar'
import Wallet from './pages/screens/Wallet'

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* <ModeToggle /> */}
      <BrowserRouter>
      {/* <Sidebar/> */}
        <Routes>
          <Route path='/signup' element={ <SignUp/> } />
          <Route path='/signin' element={ <SignIn/> } />
          <Route path='/otp' element={ <OtpPage/> } />
          <Route path='/dashboard' element={ <Dashboard/> } />
          <Route path='/wallet' element={ <Wallet/> } />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
