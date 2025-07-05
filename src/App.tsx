import { useState, useEffect } from "react";
import Navbar from "./components/Global/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Global/Footer";
import GlobalOverlay from "./components/Global/GlobalOverlay";
import PageLoader from "./components/Global/PageLoader";

function App() {
  const [darkMode, setDarkMode] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      <PageLoader />

      <GlobalOverlay />
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Home />

      {/* Footer */}
      <Footer />
    </div>
  );
}
export default App;
