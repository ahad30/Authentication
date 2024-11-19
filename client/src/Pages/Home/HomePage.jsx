import Banner from "./Banner";
import { CardWithForm } from "@/components/common/Card/CardWithForm";

const HomePage = () => {
  return (
    <div className="max-w-7xl mx-auto">
     <Banner/>
     <CardWithForm/>
    </div>
  );
};

export default HomePage;
