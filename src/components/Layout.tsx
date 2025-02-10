
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
