import Navbar from "../components/organisms/Navbar.jsx";
import WaveFooter from "../components/organisms/Footer.jsx";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main id="maincontent" className="flex-grow">
        <Outlet />
      </main>
      <div className="-mt-28">
        <WaveFooter />
      </div>
    </div>
  );
};

export default AppLayout;
