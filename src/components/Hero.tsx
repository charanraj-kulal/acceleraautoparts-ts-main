import { useState, useEffect } from "react";
import AutoPartsForm from "./AutoPartsForm";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [useVideoBackground, setUseVideoBackground] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Try multiple possible paths for images
  const slides = [
    {
      type: "image",
      src: "/assets/images/accelera_hero_sliders/1.jpg",
      fallbackSrc:
        "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1920&h=1080&fit=crop",
      title: "Premium Auto Parts",
    },
    {
      type: "image",
      src: "/assets/images/accelera_hero_sliders/2.jpg",
      fallbackSrc:
        "https://images.unsplash.com/photo-1486754735734-325b5831c3ad?w=1920&h=1080&fit=crop",
      title: "Quality Engines",
    },
    {
      type: "image",
      src: "/assets/images/accelera_hero_sliders/3.jpg",
      fallbackSrc:
        "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1920&h=1080&fit=crop",
      title: "Expert Service",
    },
    {
      type: "image",
      src: "/assets/images/accelera_hero_sliders/4.jpg",
      fallbackSrc:
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&h=1080&fit=crop",
      title: "Reliable Parts",
    },
    {
      type: "image",
      src: "/assets/images/accelera_hero_sliders/5.jpg",
      fallbackSrc:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&h=1080&fit=crop",
      title: "Fast Delivery",
    },
    {
      type: "image",
      src: "/assets/images/accelera_hero_sliders/6.jpg",
      fallbackSrc:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop",
      title: "Certified Quality",
    },
    {
      type: "image",
      src: "/assets/images/accelera_hero_sliders/7.jpg",
      fallbackSrc:
        "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=1920&h=1080&fit=crop",
      title: "Best Prices",
    },
    {
      type: "image",
      src: "/assets/images/accelera_hero_sliders/8.jpg",
      fallbackSrc:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&h=1080&fit=crop",
      title: "Wide Selection",
    },
    {
      type: "image",
      src: "/assets/images/accelera_hero_sliders/9.jpg",
      fallbackSrc:
        "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=1920&h=1080&fit=crop",
      title: "Professional Service",
    },
    {
      type: "image",
      src: "/assets/images/accelera_hero_sliders/10.jpg",
      fallbackSrc:
        "https://images.unsplash.com/photo-1563297007-0686b7003af7?w=1920&h=1080&fit=crop",
      title: "Trusted Brand",
    },
    {
      type: "image",
      src: "/assets/images/accelera_hero_sliders/11.jpg",
      fallbackSrc:
        "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=1920&h=1080&fit=crop",
      title: "Customer Satisfaction",
    },
    {
      type: "image",
      src: "/assets/images/accelera_hero_sliders/12.jpg",
      fallbackSrc:
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1920&h=1080&fit=crop",
      title: "Innovation",
    },
    {
      type: "video",
      src: "/assets/video/hero_video.mp4",
      title: "Experience Excellence",
    },
  ];

  // Filter image slides for slider functionality
  const imageSlides = slides.filter((slide) => slide.type === "image");

  const [imageLoadErrors, setImageLoadErrors] = useState<
    Record<number, boolean>
  >({});

  useEffect(() => {
    if (!useVideoBackground) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => {
          const nextSlide = (prev + 1) % imageSlides.length;
          console.log(`Switching to slide ${nextSlide}`);
          return nextSlide;
        });
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [imageSlides.length, useVideoBackground]);

  const [imageSources, setImageSources] = useState<Record<number, string>>({});

  // Initialize image sources
  useEffect(() => {
    const sources: Record<number, string> = {};
    imageSlides.forEach((slide, index) => {
      sources[index] = slide.src;
    });
    setImageSources(sources);
  }, [imageSlides]);

  const handleImageError = (index: number) => {
    console.error(
      `Failed to load image at index ${index}: ${imageSources[index]}`
    );
    // Try fallback image
    if (
      imageSlides[index].fallbackSrc &&
      imageSources[index] !== imageSlides[index].fallbackSrc
    ) {
      console.log(`Trying fallback image for index ${index}`);
      setImageSources((prev) => ({
        ...prev,
        [index]: imageSlides[index].fallbackSrc!,
      }));
    } else {
      setImageLoadErrors((prev) => ({ ...prev, [index]: true }));
    }
  };

  const handleImageLoad = (index: number) => {
    console.log(
      `Image loaded successfully at index ${index}: ${imageSources[index]}`
    );
  };

  const handleFormSubmit = (formData: any) => {
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  const scrollToContact = () => {
    // Scroll to contact section or trigger contact modal
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleBackgroundType = () => {
    setUseVideoBackground(!useVideoBackground);
    setCurrentSlide(0); // Reset slide when switching
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Debug Info */}
      <div className="absolute top-4 left-4 z-30 bg-black bg-opacity-50 text-white p-2 rounded text-xs">
        <div>Current Slide: {currentSlide}</div>
        <div>Total Images: {imageSlides.length}</div>
        <div>Video Mode: {useVideoBackground ? "ON" : "OFF"}</div>
      </div>

      {/* Background Toggle Controls */}
      <div className="absolute top-4 right-4 z-30 flex gap-2">
        <button
          onClick={toggleBackgroundType}
          className="bg-black bg-opacity-50 text-white px-4 py-2 rounded-full hover:bg-opacity-70 transition-all duration-200 text-sm"
        >
          {useVideoBackground ? "Switch to Images" : "Switch to Video"}
        </button>
      </div>

      {/* Media Slider */}
      <div className="absolute inset-0">
        {useVideoBackground ? (
          // Video Background
          <div className="absolute inset-0">
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              onLoadedData={() => {
                setIsVideoLoaded(true);
                console.log("Video loaded successfully");
              }}
              onError={(e) => {
                console.error("Video failed to load:", e);
                setIsVideoLoaded(false);
                // Automatically switch back to images if video fails
                setUseVideoBackground(false);
              }}
            >
              <source src="/assets/video/hero_video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>
        ) : (
          // Image Slider
          imageSlides.map((slide, index) => (
            <div
              key={`slide-${index}`}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
              style={{
                zIndex: index === currentSlide ? 2 : 1,
              }}
            >
              {imageLoadErrors[index] ? (
                // Fallback for failed images
                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-6xl mb-4">🚗</div>
                    <h3 className="text-2xl font-bold">{slide.title}</h3>
                    <p className="text-gray-300 mt-2">Image not found</p>
                  </div>
                </div>
              ) : (
                <img
                  src={imageSources[index] || slide.src}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                  onLoad={() => handleImageLoad(index)}
                  onError={() => handleImageError(index)}
                />
              )}
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>
          ))
        )}
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
          <button
            onClick={scrollToContact}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-base sm:text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            CONTACT NOW
          </button>
        </div>

        {/* Right Form */}
        <div className="flex-1 max-w-sm sm:max-w-md lg:max-w-lg xl:ml-8 w-full">
          <AutoPartsForm
            onSubmit={handleFormSubmit}
            className="max-h-[70vh] sm:max-h-[75vh] lg:max-h-[80vh] overflow-y-auto"
            showTitle={true}
          />
        </div>
      </div>

      {/* Slide indicators - Only show for image slider */}
      {!useVideoBackground && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {imageSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                index === currentSlide
                  ? "bg-orange-500"
                  : "bg-white bg-opacity-50 hover:bg-opacity-80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Hero;
