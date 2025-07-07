import { useState } from "react";
import { AutoPartsForm } from "./AutoPartsForm";
import { Link } from "react-router-dom";

const Hero = () => {
  const [, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [currentVideoSource, setCurrentVideoSource] = useState(0);

  // Video sources with multiple fallbacks
  const videoSources = ["/assets/video/video.mp4"];

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    console.error(`Video failed to load (source ${currentVideoSource}):`, e);

    // Try next video source if available
    if (currentVideoSource < videoSources.length - 1) {
      setCurrentVideoSource(currentVideoSource + 1);
    } else {
      setVideoError(true);
    }
  };

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
    setVideoError(false);
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        {videoError ? (
          // Video fallback when all sources fail
          <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-6xl mb-4">🎥</div>
              <h3 className="text-2xl font-bold mb-2">Video Unavailable</h3>
              <p className="text-gray-300 mb-4">
                The background video failed to load
              </p>
            </div>
          </div>
        ) : (
          <video
            key={currentVideoSource}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={handleVideoLoad}
            onError={handleVideoError}
          >
            <source src={videoSources[currentVideoSource]} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        <div className="absolute inset-0 bg-black opacity-40"></div>
        {/* Bottom gradient overlay for smooth flow, dark/light mode compatible */}

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 sm:h-56 md:h-64 bg-gradient-to-t from-gray-900 via-gray-800 to-transparent dark:from-gray-950 dark:via-gray-900 dark:to-transparent"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col xl:flex-row items-center justify-between h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Left Content */}
        <div className="flex-1 text-white text-center xl:text-left mb-6 lg:mb-8 xl:mb-0 px-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            Find Well-Inspected OEM
            <br className="hidden sm:block" />
            Grade A Used Auto Parts With
            <br className="hidden sm:block" />
            <span className="text-orange-500">The Best Deals</span>
          </h1>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-base sm:text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
            <Link to="/contactus" className="flex items-center justify-center">
              Contact Us
            </Link>
          </button>
        </div>

        {/* Right Form */}
        <div className="flex-1 max-w-sm sm:max-w-md  lg:max-w-lg xl:ml-8 w-full mt-20 sm:mt-0">
          <AutoPartsForm
            className="max-h-[100vh] sm:max-h-[70vh] lg:max-h-[80vh] overflow-y-auto"
            showTitle={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
