import Hero from "../components/Home/Hero";
import AboutUs from "../components/Home/AboutUs";
import BrandsWeDeal from "../components/Home/BrandsWeDeal";
import UsedAutoPartsInDemand from "../components/Home/UsedAutoPartsInDemand";

const Home = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      <Hero />
      <AboutUs />
      <BrandsWeDeal />
      <UsedAutoPartsInDemand />
    </div>
  );
};

export default Home;
