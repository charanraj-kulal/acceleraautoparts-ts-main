import { useState, useEffect } from "react";
import { FaArrowUp, FaPhone, FaWhatsapp, FaFileInvoice } from "react-icons/fa";
import { AutoPartsModalForm } from "../Home/AutoPartsForm";

const GlobalOverlay = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [, setIsMobile] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

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
  const whatsappMessage = encodeURIComponent(
    "Hello, I'm interested in your auto parts. Please provide more details."
  );
  const whatsappLink = `https://wa.me/1234567890?text=${whatsappMessage}`;

  return (
    <>
      <div className="fixed z-50 pointer-events-none">
        {/* Back to Top Button with Progress and Smooth Animation */}
        <button
          onClick={scrollToTop}
          className={`fixed right-2 bottom-20 sm:right-3 sm:bottom-22 md:right-4 md:bottom-24 lg:right-6 lg:bottom-6 bg-orange-500 text-white rounded-full shadow-lg hover:bg-orange-600 transition-all duration-500 ease-out transform hover:scale-110 pointer-events-auto p-2 sm:p-2.5 md:p-3 lg:p-4 ${
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
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 flex items-center justify-center">
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
            <FaArrowUp className="relative text-sm sm:text-base md:text-lg lg:text-xl transform transition-transform duration-300 group-hover:translate-y-[-2px]" />
          </div>
        </button>

        {/* Sticky Contact Buttons - Desktop */}
        <div className="fixed z-40 hidden lg:flex flex-col gap-3 xl:gap-4 right-4 xl:right-6 top-1/2 -translate-y-1/2 pointer-events-auto">
          {/* Quote Button */}
          <button
            onClick={() => setModalOpen(true)}
            className="bg-purple-500 text-white rounded-full p-3 xl:p-4 shadow-lg hover:bg-purple-600 transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
            aria-label="Get a quote"
          >
            <FaFileInvoice className="text-xl xl:text-2xl" />
          </button>

          {/* WhatsApp Button */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white rounded-full p-3 xl:p-4 shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
            aria-label="Contact via WhatsApp"
          >
            <FaWhatsapp className="text-xl xl:text-2xl" />
          </a>

          {/* Phone Button */}
          <a
            href={`tel:${phoneNumber}`}
            className="bg-blue-500 text-white rounded-full p-3 xl:p-4 shadow-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
            aria-label="Call us"
          >
            <FaPhone className="text-lg xl:text-xl" />
          </a>
        </div>

        {/* Mobile Get a Quote Button - Bottom Left with Animation */}
        <div className="fixed z-40 lg:hidden bottom-4 left-2 pointer-events-auto">
          <button
            onClick={() => setModalOpen(true)}
            className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full px-4 py-2 sm:px-6 sm:py-3 shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 overflow-hidden group"
            aria-label="Get a quote"
          >
            {/* Animated Background Shimmer */}
            <div className="absolute inset-0 -skew-x-12 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer group-hover:translate-x-full transition-transform duration-1000"></div>

            {/* Pulsing Ring Animation */}
            <div className="absolute inset-0 rounded-full bg-purple-400/30 animate-ping"></div>

            {/* Icon */}
            <FaFileInvoice className="relative text-sm sm:text-base z-10" />

            {/* Text with Gradient */}
            <span className="relative text-xs sm:text-sm font-semibold z-10 bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
              Get a Quote
            </span>

            {/* Glowing Border */}
            <div className="absolute inset-0 rounded-full border-2 border-purple-300/50 animate-pulse"></div>
          </button>
        </div>

        {/* Mobile Contact Buttons - Bottom Center */}
        <div className="fixed z-40 lg:hidden bottom-2 left-1/2 -translate-x-1/2 pointer-events-auto">
          <div className="flex gap-2 sm:gap-3 bg-white/90 backdrop-blur-sm rounded-full p-2 sm:p-3 shadow-lg border border-gray-200">
            {/* WhatsApp Button */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white rounded-full p-2 sm:p-2.5 md:p-3 shadow-sm hover:bg-green-600 transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
              aria-label="Contact via WhatsApp"
            >
              <FaWhatsapp className="text-lg sm:text-lg md:text-xl" />
            </a>

            {/* Phone Button */}
            <a
              href={`tel:${phoneNumber}`}
              className="bg-blue-500 text-white rounded-full p-2 sm:p-2.5 md:p-3 shadow-sm hover:bg-blue-600 transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
              aria-label="Call us"
            >
              <FaPhone className="text-lg sm:text-base md:text-lg" />
            </a>
          </div>
        </div>
      </div>
      <AutoPartsModalForm
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      {/* Custom CSS for shimmer animation */}
      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default GlobalOverlay;
