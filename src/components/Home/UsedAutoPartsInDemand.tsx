import React, { useState, useEffect } from "react";
import {
  Star,
  X,
  Info,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { AutoPartsModalForm } from "./AutoPartsForm";
// Carousel Hook for smooth transitions
const useCarousel = (itemsLength: number, autoPlayInterval = 4000) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % itemsLength);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, itemsLength, autoPlayInterval]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % itemsLength);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + itemsLength) % itemsLength);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  return {
    currentIndex,
    isAutoPlaying,
    setIsAutoPlaying,
    goToSlide,
    nextSlide,
    prevSlide,
  };
};

// Carousel Context
const CarouselContext = React.createContext<{
  currentIndex: number;
  isAutoPlaying: boolean;
  setIsAutoPlaying: (playing: boolean) => void;
  goToSlide: (index: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;
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
}> = ({ children, itemsLength }) => {
  const carousel = useCarousel(itemsLength);
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
}> = ({ children, className = "" }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${useCarouselContext().currentIndex * 100}%)`,
        }}
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
}> = ({ children, className = "" }) => {
  return <div className={`w-full flex-shrink-0 ${className}`}>{children}</div>;
};

// Carousel Navigation Components
const CarouselPrevious: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  const { prevSlide } = useCarouselContext();
  return (
    <button
      onClick={prevSlide}
      className={`absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg z-10 transition-all duration-200 hover:scale-110 ${className}`}
    >
      <ChevronLeft size={24} />
    </button>
  );
};

const CarouselNext: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { nextSlide } = useCarouselContext();
  return (
    <button
      onClick={nextSlide}
      className={`absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg z-10 transition-all duration-200 hover:scale-110 ${className}`}
    >
      <ChevronRight size={24} />
    </button>
  );
};

// Carousel Indicators Component
const CarouselIndicators: React.FC<{
  itemsLength: number;
  className?: string;
}> = ({ itemsLength, className = "" }) => {
  const { currentIndex, goToSlide } = useCarouselContext();
  return (
    <div className={`flex justify-center gap-2 ${className}`}>
      {Array.from({ length: itemsLength }).map((_, index) => (
        <button
          key={index}
          onClick={() => goToSlide(index)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            index === currentIndex
              ? "bg-blue-600 scale-125"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
        />
      ))}
    </div>
  );
};

type Part = {
  id: number;
  name: string;
  price: string;
  rating: number;
  image: string;
  condition: string;
  description: string;
  compatibility: string[];
  warranty: string;
};

const UsedAutoPartsCarousel = () => {
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Recommended image size: 400x300 pixels (aspect ratio 4:3) for optimal display in carousel and thumbnails.
  const parts: Part[] = [
    {
      id: 1,
      name: "Engine Block",
      price: "$1,200",
      rating: 4.8,
      image: "/assets/images/car_parts/engine.png",
      condition: "Good condition",
      description:
        "Complete engine block with 60,000 miles. Includes cylinder head. Tested compression within factory specifications.",
      compatibility: ["Honda Accord 2015-2018", "Honda CR-V 2016-2019"],
      warranty: "90-day warranty",
    },
    {
      id: 2,
      name: "Transmission",
      price: "$850",
      rating: 4.6,
      image: "/assets/images/car_parts/transmission.png",
      condition: "Rebuilt",
      description:
        "Fully rebuilt automatic transmission with new seals and updated components. 30-day installation warranty included.",
      compatibility: ["Toyota Camry 2014-2017", "Toyota RAV4 2015-2018"],
      warranty: "180-day warranty",
    },
    {
      id: 3,
      name: "Wheels",
      price: "$320",
      rating: 4.9,
      image: "/assets/images/car_parts/wheel.png",
      condition: "Never deployed",
      description:
        "Complete wheel set including tires and rims. Original equipment from low-mileage vehicle.",
      compatibility: ["Ford F-150 2016-2020", "Ford Explorer 2017-2020"],
      warranty: "1-year warranty",
    },
    {
      id: 4,
      name: "AC Compressor",
      price: "$480",
      rating: 4.7,
      image: "/assets/images/car_parts/ac_compressor.png",
      condition: "Tested & working",
      description:
        "AC Compressor tested on bench and vehicle. Includes programming service for your VIN.",
      compatibility: ["Chevrolet Silverado 2015-2019", "GMC Sierra 2015-2019"],
      warranty: "120-day warranty",
    },
    {
      id: 5,
      name: "Catalytic Converter",
      price: "$650",
      rating: 4.5,
      image: "/assets/images/car_parts/alternator.png",
      condition: "OEM part",
      description:
        "Original manufacturer alternator with less than 30,000 miles. Passes emissions testing.",
      compatibility: ["Subaru Outback 2017-2021", "Subaru Forester 2018-2021"],
      warranty: "90-day warranty",
    },
    {
      id: 6,
      name: "Headlight Assembly",
      price: "$180",
      rating: 4.4,
      image: "/assets/images/car_parts/headlight.png",
      condition: "Clear lens",
      description:
        "Complete headlight assembly with bulbs and wiring harness. No cracks or moisture damage.",
      compatibility: ["Nissan Altima 2016-2019", "Nissan Rogue 2017-2020"],
      warranty: "60-day warranty",
    },
    {
      id: 7,
      name: "Transfer Case",
      price: "$290",
      rating: 4.6,
      image: "/assets/images/car_parts/transmission.png",
      condition: "Refurbished",
      description:
        "Complete brake caliper set with new seals and pistons. Tested for proper operation.",
      compatibility: ["BMW 3 Series 2015-2019", "BMW X3 2016-2020"],
      warranty: "6-month warranty",
    },
    {
      id: 8,
      name: "Axle Assembly",
      price: "$120",
      rating: 4.3,
      image: "/assets/images/car_parts/axle_assembly.png",
      condition: "Tested",
      description:
        "High-performance axle assembly with new bearings and seals. Bench tested for reliability.",
      compatibility: ["Volkswagen Golf 2014-2018", "Audi A3 2015-2019"],
      warranty: "90-day warranty",
    },
  ];

  const openDetail = (part: Part) => {
    setSelectedPart(part);
  };

  const closeDetail = () => {
    setSelectedPart(null);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Premium Used Auto Parts
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Quality tested parts with warranty - Find exactly what you need
              for your vehicle
            </p>
          </div>

          {/* Main Carousel */}
          <CarouselProvider itemsLength={parts.length}>
            <div className="relative mb-12">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <CarouselContent className="h-96 bg-gradient-to-r from-gray-900 to-gray-800">
                  {parts.map((part) => (
                    <CarouselItem key={part.id}>
                      <div className="grid md:grid-cols-2 h-full">
                        {/* Image Section */}
                        <div className="relative overflow-hidden">
                          <img
                            src={part.image}
                            alt={part.name}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                            <span className="text-sm font-medium text-gray-800">
                              {part.condition}
                            </span>
                          </div>
                        </div>

                        {/* Content Section */}
                        <div className="flex flex-col justify-center p-8 bg-white">
                          <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            {part.name}
                          </h2>

                          {/* Rating */}
                          <div className="flex items-center mb-4">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-5 h-5 ${
                                    i < Math.floor(part.rating)
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="ml-2 text-gray-600 font-medium">
                              {part.rating} out of 5
                            </span>
                          </div>

                          <p className="text-gray-600 mb-6 leading-relaxed">
                            {part.description}
                          </p>

                          <div className="flex items-center justify-between mb-6">
                            <span className="text-3xl font-bold text-green-600">
                              {part.price}
                            </span>
                            <div className="bg-green-50 px-3 py-1 rounded-full">
                              <span className="text-green-700 font-medium">
                                {part.warranty}
                              </span>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <button
                              onClick={() => openDetail(part)}
                              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105 transform"
                            >
                              <Info size={20} />
                              More Details
                            </button>
                            <button
                              onClick={() => setModalOpen(true)}
                              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105 transform"
                            >
                              <MessageCircle size={20} />
                              Contact Seller
                            </button>
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
              <CarouselIndicators itemsLength={parts.length} className="mt-8" />
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {parts.slice(0, 4).map((part, index) => (
                <ThumbnailCard
                  key={part.id}
                  part={part}
                  index={index}
                  onClick={() => useCarouselContext().goToSlide(index)}
                />
              ))}
            </div>
          </CarouselProvider>
        </div>

        {/* Product Detail Modal */}
        {selectedPart && (
          <ProductDetailModal part={selectedPart} onClose={closeDetail} />
        )}
      </div>
      <AutoPartsModalForm
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};

// Thumbnail Card Component
const ThumbnailCard: React.FC<{
  part: Part;
  index: number;
  onClick: () => void;
}> = ({ part, index, onClick }) => {
  const { currentIndex } = useCarouselContext();
  const isActive = index === currentIndex;

  return (
    <div
      onClick={onClick}
      className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 ${
        isActive
          ? "ring-4 ring-blue-500 shadow-lg"
          : "hover:ring-2 hover:ring-blue-300"
      }`}
    >
      <img
        src={part.image}
        alt={part.name}
        className="w-full h-24 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      <div className="absolute bottom-2 left-2 right-2">
        <h3 className="text-white font-semibold text-sm truncate">
          {part.name}
        </h3>
        <p className="text-green-400 font-bold text-xs">{part.price}</p>
      </div>
    </div>
  );
};

// Product Detail Modal Component
const ProductDetailModal: React.FC<{
  part: Part;
  onClose: () => void;
}> = ({ part, onClose }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
          >
            <X size={20} />
          </button>

          <div className="grid lg:grid-cols-2 gap-8 p-6">
            {/* Image Section */}
            <div className="relative h-64 lg:h-full min-h-[300px] rounded-xl overflow-hidden">
              <img
                src={part.image}
                alt={part.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details Section */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {part.name}
                </h2>
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(part.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600 font-medium">
                    {part.rating} out of 5
                  </span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
                <p className="font-semibold text-orange-800">
                  Condition: {part.condition}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Description
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {part.description}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Compatible With:
                </h3>
                <div className="grid gap-2">
                  {part.compatibility.map((model, i) => (
                    <div
                      key={i}
                      className="bg-gray-50 px-3 py-2 rounded-lg text-gray-700"
                    >
                      {model}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-1">Warranty:</h3>
                <p className="text-green-700">{part.warranty}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <span className="text-3xl font-bold text-green-600">
                  {part.price}
                </span>
                <button
                  onClick={() => setModalOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-200 flex items-center gap-2"
                >
                  <MessageCircle size={20} />
                  Contact Seller
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AutoPartsModalForm
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default UsedAutoPartsCarousel;
