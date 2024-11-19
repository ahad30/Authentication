import { Outlet } from "react-router-dom";
import Header from "../../common/Header/Header";
import Footer from "../../common/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="">
      <Header />
      <div className="w-full lg:max-w-[1250px] lg:mx-auto">
      <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
