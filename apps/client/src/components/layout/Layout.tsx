import { ReactNode } from "react";
import Sidebar from "../sidebar/Sidebar";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {

  const navigate = useLocation();

  return (
    <div className=" relative flex">
      <Sidebar path={navigate.pathname} />
      <div className="flex-1">{children}</div>
    </div>
  )
}

export default Layout