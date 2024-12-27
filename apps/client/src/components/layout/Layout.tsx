import { ReactNode } from "react";
import Sidebar from "../sidebar/Sidebar"

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex w-full">
      <Sidebar/>
      <div className="flex-1">{ children }</div>
    </div>
  )
}

export default Layout