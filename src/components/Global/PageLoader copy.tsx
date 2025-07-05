import { useState, useEffect } from "react";

const PageLoader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Add a small delay before hiding the loader
          setTimeout(() => {
            setIsLoading(false);
          }, 300);
          return 100;
        }
        return prev + Math.random() * 15; // Random increment for realistic effect
      });
    }, 100);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Don't render anything if loading is complete
  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 transition-all duration-500 ${
        progress >= 100 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-white/5 rounded-full animate-spin"
          style={{ animationDuration: "20s" }}
        ></div>
        <div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-white/5 rounded-full animate-spin"
          style={{ animationDuration: "15s", animationDirection: "reverse" }}
        ></div>
      </div>

      {/* Main Loader Content */}
      <div className="relative z-10 text-center">
        {/* Logo or Brand Name */}
        <div className="mb-8 animate-pulse">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-wide">
            Loading
          </h1>
          <p className="text-white/80 text-lg md:text-xl">
            Please wait while we prepare your experience
          </p>
        </div>

        {/* Spinner Animation */}
        <div className="relative mb-8">
          <div className="w-20 h-20 border-4 border-white/30 rounded-full animate-spin mx-auto">
            <div
              className="w-full h-full border-4 border-transparent border-t-white rounded-full animate-spin"
              style={{ animationDuration: "0.8s" }}
            ></div>
          </div>

          {/* Orbiting dots */}
          <div className="absolute inset-0 w-20 h-20 mx-auto">
            <div
              className="absolute top-0 left-1/2 w-3 h-3 bg-white rounded-full animate-ping"
              style={{
                transformOrigin: "0 40px",
                animation: "orbit 2s linear infinite",
              }}
            ></div>
            <div
              className="absolute top-0 left-1/2 w-2 h-2 bg-white/60 rounded-full"
              style={{
                transformOrigin: "0 40px",
                animation: "orbit 2s linear infinite 0.5s",
              }}
            ></div>
            <div
              className="absolute top-0 left-1/2 w-2 h-2 bg-white/40 rounded-full"
              style={{
                transformOrigin: "0 40px",
                animation: "orbit 2s linear infinite 1s",
              }}
            ></div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-64 max-w-xs mx-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/80 text-sm">Loading...</span>
            <span className="text-white font-semibold text-sm">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
            <div
              className="bg-white h-full rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${Math.min(progress, 100)}%` }}
            >
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent 
                            animate-pulse"
              ></div>
            </div>
          </div>
        </div>

        {/* Loading Tips */}
        <div className="mt-6 text-white/60 text-sm max-w-md mx-auto">
          <p>✨ Optimizing your experience for the best performance</p>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-bounce"
          style={{ animationDelay: "0s", animationDuration: "3s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-1 h-1 bg-white/40 rounded-full animate-bounce"
          style={{ animationDelay: "1s", animationDuration: "2.5s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-white/25 rounded-full animate-bounce"
          style={{ animationDelay: "0.5s", animationDuration: "2s" }}
        ></div>
        <div
          className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-white/35 rounded-full animate-bounce"
          style={{ animationDelay: "1.5s", animationDuration: "2.8s" }}
        ></div>
      </div>

      <style>{`
        @keyframes orbit {
          0% {
            transform: rotate(0deg) translateX(40px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(40px) rotate(-360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default PageLoader;
