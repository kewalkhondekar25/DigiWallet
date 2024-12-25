import './App.css'
import { ModeToggle } from './components/theme/mode-toggle'
import { ThemeProvider } from './components/theme/theme-provider'
import OtpPage from './pages/auth/Otp'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'

function App() {
  
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ModeToggle/>
      <div className='flex justify-center place-items-center min-h-screen'>
        {/* <SignUp/> */}
        {/* <SignIn/> */}
        <OtpPage/>
      </div>
    </ThemeProvider>
  )
}

export default App
