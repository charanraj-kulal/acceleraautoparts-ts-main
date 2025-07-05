import { useState, useEffect } from "react";
import { FaArrowUp, FaPhone, FaWhatsapp } from "react-icons/fa";

const GlobalOverlay = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [, setIsMobile] = useState(false);

  // Check scroll position and window size
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Calculate scroll progress (0-100)
      const progress = (scrollTop / (docHeight - windowHeight)) * 100;
      setScrollProgress(progress);

      // Show back-to-top button after scrolling down 300px
      setIsVisible(scrollTop > 300);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    handleScroll();
    handleResize();

    // Add event listeners
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Replace with your actual phone number and WhatsApp link
  const phoneNumber = "+1234567890";
  const whatsappLink = "https://wa.me/1234567890";

  return (
    <div className="fixed z-50 pointer-events-none">
      {/* Back to Top Button with Progress and Smooth Animation */}
      <button
        onClick={scrollToTop}
        className={`fixed right-4 bottom-24 md:right-6 md:bottom-6 bg-orange-500 text-white rounded-full p-3 shadow-lg hover:bg-orange-600 transition-all duration-500 ease-out transform hover:scale-110 pointer-events-auto ${
          isVisible
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-16 opacity-0 scale-75"
        }`}
        style={{
          transition:
            "transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55), opacity 0.5s ease-out",
        }}
        aria-label="Back to top"
      >
        <div className="relative w-12 h-12 flex items-center justify-center">
          {/* Progress circle */}
          <svg
            className="absolute w-full h-full -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="5"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="white"
              strokeWidth="5"
              strokeDasharray="283"
              strokeDashoffset={283 - (283 * scrollProgress) / 100}
              strokeLinecap="round"
              style={{
                transition: "stroke-dashoffset 0.3s ease-out",
              }}
            />
          </svg>
          <FaArrowUp className="relative text-xl transform transition-transform duration-300 group-hover:translate-y-[-2px]" />
        </div>
      </button>

      {/* Sticky Contact Buttons */}
      <div className="fixed z-40 hidden lg:flex flex-col gap-4 right-6 top-1/2 -translate-y-1/2 pointer-events-auto">
        {/* WhatsApp Button */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white rounded-full p-3 shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-110 flex items-center justify-center "
          aria-label="Contact via WhatsApp"
        >
          <FaWhatsapp className="text-2xl" />
        </a>

        {/* Phone Button */}
        <a
          href={`tel:${phoneNumber}`}
          className="bg-blue-500 text-white rounded-full p-3 shadow-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
          aria-label="Call us"
        >
          <FaPhone className="text-xl" />
        </a>
      </div>
    </div>
  );
};

export default GlobalOverlay;
