import { useState, useEffect } from "react";

const PageLoader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Starting Engine");

  useEffect(() => {
    // Loading text progression
    const textStages = [
      "Starting Engine",
      "Checking Parts",
      "Loading Inventory",
      "Connecting Parts",
      "Ready to Drive",
    ];

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 12;

        // Update loading text based on progress
        if (newProgress >= 80) setLoadingText(textStages[4]);
        else if (newProgress >= 60) setLoadingText(textStages[3]);
        else if (newProgress >= 40) setLoadingText(textStages[2]);
        else if (newProgress >= 20) setLoadingText(textStages[1]);
        else setLoadingText(textStages[0]);

        if (newProgress >= 100) {
          clearInterval(interval);
          // Start the exit animation
          setTimeout(() => {
            setIsExiting(true);
            // Remove the loader after animation completes
            setTimeout(() => {
              setIsLoading(false);
            }, 1200); // Match the exit animation duration
          }, 300);
          return 100;
        }
        return newProgress;
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-black transition-all duration-1000 ease-out ${
        isExiting ? "opacity-0 scale-110" : "opacity-100 scale-100"
      }`}
      style={{
        background: isExiting
          ? "radial-gradient(circle at center, rgba(251,146,60,0.3) 0%, rgba(251,146,60,0.1) 30%, transparent 70%)"
          : "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #000000 100%)",
      }}
    >
      {/* Smooth Exit Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-orange-500/20 via-orange-400/10 to-transparent transition-all duration-1000 ${
          isExiting ? "opacity-100 scale-150" : "opacity-0 scale-100"
        }`}
      ></div>
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
                 linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
               `,
            backgroundSize: "50px 50px",
            animation: "grid-move 20s linear infinite",
          }}
        ></div>
      </div>

      {/* Main Loader Content */}
      <div
        className={`relative z-10 text-center transition-all duration-1000 ease-out ${
          isExiting
            ? "opacity-0 translate-y-8 scale-95"
            : "opacity-100 translate-y-0 scale-100"
        }`}
      >
        {/* Brand Logo Area */}
        <div
          className={`mb-8 transition-all duration-800 delay-100 ${
            isExiting ? "opacity-0 translate-y-12" : "opacity-100 translate-y-0"
          }`}
        >
          <div className="relative">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-wider">
              ACCELERA
            </h1>
            <div className="text-orange-400 text-lg md:text-xl font-medium tracking-widest">
              AUTO PARTS
            </div>
            <div
              className={`absolute -top-2 -right-2 w-3 h-3 bg-orange-400 rounded-full transition-all duration-500 ${
                isExiting ? "animate-ping scale-150" : "animate-ping"
              }`}
            ></div>
          </div>
        </div>

        {/* Car Engine/Gear Animation */}
        <div
          className={`relative mb-8 transition-all duration-800 delay-200 ${
            isExiting
              ? "opacity-0 scale-50 rotate-180"
              : "opacity-100 scale-100 rotate-0"
          }`}
        >
          {/* Main Gear */}
          <div className="relative w-24 h-24 mx-auto mb-4">
            <div
              className={`absolute inset-0 border-4 border-orange-400 rounded-full transition-all duration-500 ${
                isExiting ? "animate-spin border-orange-300" : "animate-spin"
              }`}
              style={{ animationDuration: isExiting ? "0.5s" : "3s" }}
            >
              {/* Gear Teeth */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-4 bg-orange-400"
                  style={{
                    top: "-8px",
                    left: "50%",
                    transformOrigin: "50% 56px",
                    transform: `translateX(-50%) rotate(${i * 45}deg)`,
                  }}
                />
              ))}
            </div>

            {/* Inner Hub */}
            <div className="absolute inset-4 bg-slate-700 rounded-full border-2 border-orange-300"></div>

            {/* Center Dot */}
            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-orange-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          {/* Smaller Rotating Gears */}
          <div
            className="absolute top-0 left-1/4 w-8 h-8 border-2 border-orange-300 rounded-full animate-spin opacity-60"
            style={{ animationDuration: "2s", animationDirection: "reverse" }}
          >
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-2 bg-orange-300"
                style={{
                  top: "-4px",
                  left: "50%",
                  transformOrigin: "50% 20px",
                  transform: `translateX(-50%) rotate(${i * 60}deg)`,
                }}
              />
            ))}
          </div>

          <div
            className="absolute top-0 right-1/4 w-6 h-6 border-2 border-orange-300 rounded-full animate-spin opacity-40"
            style={{ animationDuration: "1.5s" }}
          >
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 h-1.5 bg-orange-300"
                style={{
                  top: "-3px",
                  left: "50%",
                  transformOrigin: "50% 15px",
                  transform: `translateX(-50%) rotate(${i * 60}deg)`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Car Part Icons Animation */}
        <div className="flex justify-center space-x-8 mb-6">
          {[
            { icon: "🔧", delay: "0s" },
            { icon: "⚙️", delay: "0.5s" },
            { icon: "🛞", delay: "1s" },
            { icon: "🔩", delay: "1.5s" },
          ].map((item, index) => (
            <div
              key={index}
              className="text-2xl animate-bounce"
              style={{ animationDelay: item.delay, animationDuration: "2s" }}
            >
              {item.icon}
            </div>
          ))}
        </div>

        {/* Loading Text */}
        <div
          className={`mb-6 transition-all duration-800 delay-300 ${
            isExiting ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"
          }`}
        >
          <h2
            className={`text-xl md:text-2xl font-semibold mb-2 transition-all duration-500 ${
              isExiting
                ? "text-orange-300 animate-pulse"
                : "text-orange-400 animate-pulse"
            }`}
          >
            {isExiting ? "Welcome!" : loadingText}
          </h2>
          <p className="text-gray-400 text-sm">
            {isExiting
              ? "Your premium auto parts experience is ready!"
              : "Preparing your premium auto parts experience..."}
          </p>
        </div>

        {/* Progress Bar */}
        <div
          className={`w-80 max-w-xs mx-auto transition-all duration-800 delay-400 ${
            isExiting
              ? "opacity-0 translate-y-8 scale-95"
              : "opacity-100 translate-y-0 scale-100"
          }`}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400 text-sm">Progress</span>
            <span
              className={`font-bold text-sm transition-colors duration-500 ${
                isExiting ? "text-orange-300" : "text-orange-400"
              }`}
            >
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden border border-slate-600">
            <div
              className={`h-full rounded-full transition-all duration-500 ease-out relative ${
                isExiting
                  ? "bg-gradient-to-r from-orange-400 via-orange-300 to-yellow-300"
                  : "bg-gradient-to-r from-orange-500 to-orange-400"
              }`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-500 ${
                  isExiting ? "animate-pulse opacity-60" : "animate-pulse"
                }`}
              ></div>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div
          className={`mt-8 text-gray-500 text-xs transition-all duration-800 delay-500 ${
            isExiting ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"
          }`}
        >
          <p>🚗 Premium Quality • Fast Delivery • Best Prices</p>
        </div>
      </div>

      {/* Floating Auto Parts */}
      <div
        className={`absolute inset-0 pointer-events-none overflow-hidden transition-all duration-1000 ${
          isExiting ? "opacity-0 scale-150" : "opacity-100 scale-100"
        }`}
      >
        <div
          className="absolute top-1/4 left-1/6 text-orange-400/20 text-4xl animate-float"
          style={{ animationDelay: "0s", animationDuration: "6s" }}
        >
          🔧
        </div>
        <div
          className="absolute top-1/3 right-1/6 text-orange-400/20 text-3xl animate-float"
          style={{ animationDelay: "2s", animationDuration: "5s" }}
        >
          ⚙️
        </div>
        <div
          className="absolute bottom-1/4 left-1/4 text-orange-400/20 text-5xl animate-float"
          style={{ animationDelay: "1s", animationDuration: "7s" }}
        >
          🛞
        </div>
        <div
          className="absolute bottom-1/3 right-1/4 text-orange-400/20 text-2xl animate-float"
          style={{ animationDelay: "3s", animationDuration: "4s" }}
        >
          🔩
        </div>
      </div>

      <style>{`
        @keyframes grid-move {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }

        @keyframes animate-float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        .animate-float {
          animation: animate-float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default PageLoader;
