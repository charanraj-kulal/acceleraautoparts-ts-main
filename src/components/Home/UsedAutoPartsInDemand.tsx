import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Sun,
  Moon,
} from "lucide-react";

// Carousel Hook for smooth transitions
const useCarousel = (
  itemsLength: number,
  itemsPerView: number,
  autoPlayInterval = 5000
) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, index: 0 });
  const maxIndex = Math.max(0, itemsLength - itemsPerView);

  useEffect(() => {
    if (!isAutoPlaying || maxIndex === 0 || isDragging) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        return next > maxIndex ? 0 : next;
      });
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex, autoPlayInterval, isDragging]);

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const next = prev + 1;
      return next > maxIndex ? 0 : next;
    });
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const next = prev - 1;
      return next < 0 ? maxIndex : next;
    });
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    setIsAutoPlaying(false);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setDragStart({ x: clientX, index: currentIndex });
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const deltaX = clientX - dragStart.x;
    const threshold = 50;

    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0 && currentIndex > 0) {
        prevSlide();
      } else if (deltaX < 0 && currentIndex < maxIndex) {
        nextSlide();
      }
      setIsDragging(false);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  return {
    currentIndex,
    isAutoPlaying,
    isDragging,
    setIsAutoPlaying,
    goToSlide,
    nextSlide,
    prevSlide,
    maxIndex,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
  };
};

// Carousel Context
const CarouselContext = React.createContext<{
  currentIndex: number;
  isAutoPlaying: boolean;
  isDragging: boolean;
  setIsAutoPlaying: (playing: boolean) => void;
  goToSlide: (index: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;
  maxIndex: number;
  handleDragStart: (e: React.MouseEvent | React.TouchEvent) => void;
  handleDragMove: (e: React.MouseEvent | React.TouchEvent) => void;
  handleDragEnd: () => void;
} | null>(null);

const useCarouselContext = () => {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error(
      "useCarouselContext must be used within a CarouselProvider"
    );
  }
  return context;
};

// Carousel Provider Component
const CarouselProvider: React.FC<{
  children: React.ReactNode;
  itemsLength: number;
  itemsPerView: number;
}> = ({ children, itemsLength, itemsPerView }) => {
  const carousel = useCarousel(itemsLength, itemsPerView);
  return (
    <CarouselContext.Provider value={carousel}>
      {children}
    </CarouselContext.Provider>
  );
};

// Carousel Content Component
const CarouselContent: React.FC<{
  children: React.ReactNode;
  className?: string;
  itemsPerView: number;
}> = ({ children, className = "", itemsPerView }) => {
  const { currentIndex, handleDragStart, handleDragMove, handleDragEnd } =
    useCarouselContext();
  const itemWidth = 100 / itemsPerView;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="flex transition-transform duration-500 ease-out cursor-grab active:cursor-grabbing"
        style={{
          transform: `translateX(-${currentIndex * itemWidth}%)`,
        }}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        {children}
      </div>
    </div>
  );
};

// Carousel Item Component
const CarouselItem: React.FC<{
  children: React.ReactNode;
  className?: string;
  itemsPerView: number;
}> = ({ children, className = "", itemsPerView }) => {
  const itemWidth = 100 / itemsPerView;
  return (
    <div
      className={`flex-shrink-0 px-2 ${className}`}
      style={{ width: `${itemWidth}%` }}
    >
      {children}
    </div>
  );
};

// Carousel Navigation Components
const CarouselPrevious: React.FC<{
  className?: string;
}> = ({ className = "" }) => {
  const { prevSlide } = useCarouselContext();
  return (
    <button
      onClick={prevSlide}
      className={`absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-700/90 text-gray-800 dark:text-white p-2 md:p-3 rounded-full shadow-lg z-10 transition-all duration-200 hover:scale-110 ${className}`}
    >
      <ChevronLeft size={20} />
    </button>
  );
};

const CarouselNext: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { nextSlide } = useCarouselContext();
  return (
    <button
      onClick={nextSlide}
      className={`absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-700/90 text-gray-800 dark:text-white p-2 md:p-3 rounded-full shadow-lg z-10 transition-all duration-200 hover:scale-110 ${className}`}
    >
      <ChevronRight size={20} />
    </button>
  );
};

// Carousel Indicators Component
const CarouselIndicators: React.FC<{
  className?: string;
}> = ({ className = "" }) => {
  const { currentIndex, goToSlide, maxIndex } = useCarouselContext();
  const totalDots = maxIndex + 1;

  if (totalDots <= 1) return null;

  return (
    <div className={`flex justify-center gap-2 ${className}`}>
      {Array.from({ length: totalDots }).map((_, index) => (
        <button
          key={index}
          onClick={() => goToSlide(index)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            index === currentIndex
              ? "bg-blue-600 scale-125"
              : "bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500"
          }`}
        />
      ))}
    </div>
  );
};

type Part = {
  id: number;
  name: string;
  rating: number;
  image: string;
  condition: string;
  description: string;
  compatibility: string[];
  warranty: string;
  pageLink?: string;
};

const UsedAutoPartsCarousel = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check for dark mode preference
    const checkDarkMode = () => {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDarkMode(prefersDark);
    };

    checkMobile();
    checkDarkMode();

    window.addEventListener("resize", checkMobile);
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", checkDarkMode);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", checkDarkMode);
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Toggle dark class on document element
    document.documentElement.classList.toggle("dark");
  };

  const parts: Part[] = [
    {
      id: 1,
      name: "Used Engines",
      rating: 4.8,
      image: "assets/images/car_parts/engine.png",
      condition: "Tested & Certified",
      description:
        "Complete engine assembly with comprehensive testing. All engines come with detailed compression reports and performance verification.",
      compatibility: ["Honda Accord", "Toyota Camry", "Ford F-150"],
      warranty: "90-day warranty",
      pageLink: "/used-auto-parts/used-engines",
    },
    {
      id: 2,
      name: "Used Transmissions",
      rating: 4.6,
      image: "assets/images/car_parts/transmission.png",
      condition: "Rebuilt & Tested",
      description:
        "Professionally rebuilt transmissions with new seals and updated components. Bench tested for optimal performance.",
      compatibility: ["Toyota Camry", "Honda Civic", "Ford Fusion"],
      warranty: "180-day warranty",
      pageLink: "/used-auto-parts/used-transmissions",
    },
    {
      id: 3,
      name: "Used Wheels",
      rating: 4.9,
      image: "assets/images/car_parts/wheel.png",
      condition: "Excellent Condition",
      description:
        "Complete wheel sets from low-mileage vehicles. Inspected for structural integrity and balanced for smooth operation.",
      compatibility: ["Ford F-150", "Chevrolet Silverado", "Ram 1500"],
      warranty: "1-year warranty",
      pageLink: "/used-auto-parts/used-wheels",
    },
    {
      id: 4,
      name: "Used AC Compressor",
      rating: 4.7,
      image: "assets/images/car_parts/ac_compressor.png",
      condition: "Tested & Working",
      description:
        "AC compressors tested on bench and vehicle. Includes refrigerant compatibility check and performance verification.",
      compatibility: ["Chevrolet Silverado", "GMC Sierra", "Ford F-150"],
      warranty: "120-day warranty",
      pageLink: "/used-auto-parts/used-ac-compressor",
    },
    {
      id: 5,
      name: "Used Headlights",
      rating: 4.5,
      image: "assets/images/car_parts/headlight.png",
      condition: "Clear Lens",
      description:
        "Complete headlight assemblies with clear lenses. No cracks, moisture damage, or UV yellowing.",
      compatibility: ["Nissan Altima", "Honda Accord", "Toyota Camry"],
      warranty: "90-day warranty",
      pageLink: "/used-auto-parts/used-headlight",
    },
    {
      id: 6,
      name: "Used Transfer Case",
      rating: 4.6,
      image: "assets/images/car_parts/transfer_case.png",
      condition: "Refurbished",
      description:
        "Complete transfer case units with new seals and fluid. Tested for proper engagement and smooth operation.",
      compatibility: ["Ford F-150", "Chevrolet Silverado", "GMC Sierra"],
      warranty: "6-month warranty",
      pageLink: "/used-auto-parts/used-transfer-case",
    },
    {
      id: 7,
      name: "Used Axle Assembly",
      rating: 4.4,
      image: "assets/images/car_parts/axle_assembly.png",
      condition: "Tested & Certified",
      description:
        "Complete axle assemblies with new bearings and seals. Bench tested for durability and proper alignment.",
      compatibility: ["Ford F-150", "Chevrolet Silverado", "Ram 1500"],
      warranty: "90-day warranty",
      pageLink: "/used-auto-parts/used-axle-assembly",
    },
    {
      id: 8,
      name: "Drive Shaft",
      rating: 4.3,
      image: "assets/images/car_parts/Drive_shafts.png",
      condition: "Balanced & Tested",
      description:
        "Drive shafts professionally balanced and tested for vibration-free operation. Includes universal joint inspection.",
      compatibility: ["Ford F-150", "Chevrolet Silverado", "GMC Sierra"],
      warranty: "90-day warranty",
      pageLink: "/used-auto-parts/drive-shaft",
    },
    {
      id: 9,
      name: "Used Alternator",
      rating: 4.7,
      image: "assets/images/car_parts/alternator.png",
      condition: "Tested & Certified",
      description:
        "High-output alternators tested for proper charging and electrical performance. Includes voltage regulation testing.",
      compatibility: ["Honda Civic", "Toyota Corolla", "Ford Focus"],
      warranty: "120-day warranty",
      pageLink: "/used-auto-parts/used-alternator",
    },
    {
      id: 10,
      name: "Used Radiator",
      rating: 4.5,
      image: "assets/images/car_parts/radiator.png",
      condition: "Pressure Tested",
      description:
        "Complete radiator assemblies pressure tested for leaks. Includes fan assembly and cooling system compatibility check.",
      compatibility: ["Honda Accord", "Toyota Camry", "Nissan Altima"],
      warranty: "90-day warranty",
      pageLink: "/used-auto-parts/used-radiator",
    },
    {
      id: 11,
      name: "Steering Column",
      rating: 4.4,
      image: "assets/images/car_parts/steering_column.png",
      condition: "Tested & Certified",
      description:
        "Complete steering column assemblies with tested electrical components. Includes tilt and telescoping functionality check.",
      compatibility: ["Ford F-150", "Chevrolet Silverado", "GMC Sierra"],
      warranty: "90-day warranty",
      pageLink: "/used-auto-parts/steering-column",
    },
    {
      id: 12,
      name: "Exhaust Manifold",
      rating: 4.3,
      image: "assets/images/car_parts/exhaust_manifold.png",
      condition: "Crack Tested",
      description:
        "Cast iron and stainless steel exhaust manifolds inspected for cracks and warpage. Includes gasket surfaces machined flat.",
      compatibility: ["Ford Mustang", "Chevrolet Camaro", "Dodge Challenger"],
      warranty: "60-day warranty",
      pageLink: "/used-auto-parts/exhaust-manifold",
    },
    {
      id: 13,
      name: "Intake Manifold",
      rating: 4.6,
      image: "assets/images/car_parts/intake_manifold.png",
      condition: "Tested & Cleaned",
      description:
        "Complete intake manifold assemblies with throttle body and sensors. Tested for proper air flow and vacuum operation.",
      compatibility: ["Honda Civic", "Toyota Corolla", "Nissan Sentra"],
      warranty: "90-day warranty",
      pageLink: "/used-auto-parts/intake-manifold",
    },
    {
      id: 14,
      name: "Used Axle",
      rating: 4.5,
      image: "assets/images/car_parts/axle.png",
      condition: "Tested & Certified",
      description:
        "Individual axle components with new CV joints and boots. Tested for proper rotation and smooth operation.",
      compatibility: ["Honda Civic", "Toyota Corolla", "Ford Focus"],
      warranty: "90-day warranty",
      pageLink: "/used-auto-parts/used-axle",
    },
  ];

  const itemsPerView = isMobile ? 2 : 4;

  const navigate = useNavigate();

  const handlePartClick = (part: Part) => {
    if (part.pageLink) {
      navigate(part.pageLink);
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Theme Toggle */}
        <div className="flex justify-end mb-6">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full transition-all duration-300 hover:scale-110 bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-yellow-400"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Quality Used Auto Parts
          </h1>
          <p className="text-base md:text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Premium tested parts with comprehensive warranties - Find the
            perfect match for your vehicle
          </p>
        </div>

        {/* Main Carousel */}
        <CarouselProvider
          itemsLength={parts.length}
          itemsPerView={itemsPerView}
        >
          <div className="relative mb-8 md:mb-12">
            <div className="relative overflow-hidden rounded-2xl shadow-sm bg-white dark:bg-gray-800">
              <CarouselContent className="py-6" itemsPerView={itemsPerView}>
                {parts.map((part) => (
                  <CarouselItem key={part.id} itemsPerView={itemsPerView}>
                    <div
                      className="rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 h-full border select-none group bg-white dark:bg-gray-700 border-gray-100 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-650"
                      onClick={() => handlePartClick(part)}
                    >
                      {/* Image Section */}
                      <div className="relative overflow-hidden rounded-t-xl">
                        <img
                          src={part.image}
                          alt={part.name}
                          className="w-full h-36 md:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                          draggable={false}
                          onError={(e) => {
                            e.currentTarget.src = "/api/placeholder/300/200";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        <div className="absolute top-3 left-3 backdrop-blur-sm px-2 py-1 rounded-full bg-white/95 dark:bg-gray-800/90">
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-200">
                            {part.condition}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3 bg-blue-600/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                          <ExternalLink size={14} className="text-white" />
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-4 space-y-3">
                        <h3 className="text-lg md:text-xl font-bold line-clamp-2 text-gray-900 dark:text-white">
                          {part.name}
                        </h3>

                        {/* Rating */}
                        <div className="flex items-center">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(part.rating)
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300 dark:text-gray-600"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                            {part.rating}
                          </span>
                        </div>

                        <p className="text-sm line-clamp-3 text-gray-600 dark:text-gray-300">
                          {part.description}
                        </p>

                        {/* Warranty Badge */}
                        <div className="flex justify-between items-center pt-2">
                          <div className="px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/30">
                            <span className="text-xs font-medium text-green-700 dark:text-green-400">
                              {part.warranty}
                            </span>
                          </div>
                          <div className="text-blue-400 text-xs font-medium hover:text-blue-300 transition-colors">
                            View Details →
                          </div>
                        </div>

                        {/* Compatibility */}
                        <div className="pt-2 border-t border-gray-100 dark:border-gray-600">
                          <p className="text-xs mb-1 text-gray-500 dark:text-gray-400">
                            Popular for:
                          </p>
                          <p className="text-xs line-clamp-2 text-gray-600 dark:text-gray-300">
                            {part.compatibility.join(", ")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </div>

            {/* Navigation */}
            <CarouselPrevious />
            <CarouselNext />

            {/* Indicators */}
            <CarouselIndicators className="mt-6" />
          </div>
        </CarouselProvider>

        {/* Quick Access Grid */}
        <div className="mt-12 md:mt-16">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-6 md:mb-8 text-gray-900 dark:text-white">
            Quick Access Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {parts.slice(0, 8).map((part) => (
              <div
                key={part.id}
                className="rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer p-4 text-center group hover:-translate-y-1 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => handlePartClick(part)}
              >
                <div className="w-16 h-16 mx-auto mb-3 rounded-lg overflow-hidden">
                  <img
                    src={part.image}
                    alt={part.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    draggable={false}
                    onError={(e) => {
                      e.currentTarget.src = "/api/placeholder/64/64";
                    }}
                  />
                </div>
                <h3 className="font-semibold text-sm mb-1 text-gray-900 dark:text-white">
                  {part.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {part.compatibility.length}+ models
                </p>
                <div className="mt-2 text-xs text-blue-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore →
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 md:mt-16 rounded-2xl shadow-sm p-6 md:p-8 bg-white dark:bg-gray-800">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-6 md:mb-8 text-gray-900 dark:text-white">
            Why Choose Our Used Auto Parts?
          </h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 bg-blue-100 dark:bg-blue-900/30">
                <span className="text-2xl">🔧</span>
              </div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                Quality Tested
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Every part undergoes rigorous testing to ensure optimal
                performance and reliability
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 bg-green-100 dark:bg-green-900/30">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                Warranty Included
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Comprehensive warranty coverage from 60 days to 1 year depending
                on the part
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 bg-purple-100 dark:bg-purple-900/30">
                <span className="text-2xl">🚗</span>
              </div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                Perfect Fit
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Verified compatibility with detailed vehicle specifications and
                fitment guides
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsedAutoPartsCarousel;
