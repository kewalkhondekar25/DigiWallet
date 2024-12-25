import './App.css'
import { ModeToggle } from './components/theme/mode-toggle'
import { ThemeProvider } from './components/theme/theme-provider'
import SignUp from './pages/SignUp'

function App() {
  
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ModeToggle/>
      <div className='flex justify-center place-items-center min-h-screen'>
        <SignUp/>
      </div>
    </ThemeProvider>
  )
}

export default App
