import './App.css'
import { ModeToggle } from './components/theme/mode-toggle'
import { ThemeProvider } from './components/theme/theme-provider'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import OtpPage from './pages/auth/Otp'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ModeToggle />
      <div className='flex justify-center place-items-center min-h-screen'>
        <BrowserRouter>
          <Routes>
            <Route path='/signup' element={<SignUp />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/otp' element={<OtpPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  )
}

export default App
