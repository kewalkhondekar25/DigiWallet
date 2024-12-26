import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from './components/sidebar/AppSidebar.tsx'
import { BrowserRouter, useLocation } from 'react-router-dom'

const Root = () => {

  const location = useLocation();
  const hideSidebarOnRoutes = ["/", "/signup", "/signin", "/otp"];
  const hideSidebar = hideSidebarOnRoutes.includes(location.pathname);

  return (
    <SidebarProvider>
      {!hideSidebar && <AppSidebar />}
      <main>
        {!hideSidebar && <SidebarTrigger />}
        <App />
      </main>
    </SidebarProvider>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </StrictMode>,
)
