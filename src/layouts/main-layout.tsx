import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/navbar";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
