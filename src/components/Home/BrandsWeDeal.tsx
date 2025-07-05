const BrandsWeDeal = () => {
  const brands = [
    {
      image: "/images/brands/toyota.png",
      name: "Toyota",
    },
    {
      image: "/images/brands/honda.png",
      name: "Honda",
    },
    {
      image: "/images/brands/ford.png",
      name: "Ford",
    },
    {
      image: "/images/brands/chevrolet.png",
      name: "Chevrolet",
    },
    {
      image: "/images/brands/bmw.png",
      name: "BMW",
    },
    {
      image: "/images/brands/mercedes-benz.png",
      name: "Mercedes-Benz",
    },
    {
      image: "/images/brands/audi.png",
      name: "Audi",
    },
    {
      image: "/images/brands/lexus.png",
      name: "Lexus",
    },
    {
      image: "/images/brands/nissan.png",
      name: "Nissan",
    },
    {
      image: "/images/brands/hyundai.png",
      name: "Hyundai",
    },
    {
      image: "/images/brands/kia.png",
      name: "Kia",
    },
    {
      image: "/images/brands/subaru.png",
      name: "Subaru",
    },
  ];

  // Create extended array for continuous sliding
  const extendedBrands = [...brands, ...brands, ...brands];

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Dark automotive background */}
      <div
        className="absolute inset-0 bg-gray-900"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M30 30c0-16.569 13.431-30 30-30v60c-16.569 0-30-13.431-30-30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-800/80 to-gray-900/90"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-orange-500">Some Brands</span> We Deal For
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We specialize in premium used auto parts from the world's leading
            automotive manufacturers. Every part is carefully inspected and
            tested to meet our high-quality standards.
          </p>
        </div>

        {/* Sliding Logo Banner */}
        <div className="overflow-hidden">
          <div className="relative">
            {/* First sliding row - left to right */}
            <div className="flex animate-scroll-right mb-8">
              {extendedBrands.map((brand, index) => (
                <div
                  key={`row1-${index}`}
                  className="flex-shrink-0 mx-6 flex items-center justify-center group"
                >
                  <div className="bg-white rounded-full p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 w-32 h-32 flex items-center justify-center">
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="w-16 h-16 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.style.display = "none";
                        if (
                          img.nextSibling &&
                          img.nextSibling instanceof HTMLElement
                        ) {
                          (img.nextSibling as HTMLElement).style.display =
                            "block";
                        }
                      }}
                    />
                    <div className="text-2xl font-bold text-gray-800 hidden">
                      {brand.name.charAt(0)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Second sliding row - right to left */}
            <div className="flex animate-scroll-left mb-8">
              {extendedBrands.map((brand, index) => (
                <div
                  key={`row2-${index}`}
                  className="flex-shrink-0 mx-6 flex items-center justify-center group"
                >
                  <div className="bg-white rounded-full p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 w-32 h-32 flex items-center justify-center">
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="w-16 h-16 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.style.display = "none";
                        if (
                          img.nextSibling &&
                          img.nextSibling instanceof HTMLElement
                        ) {
                          (img.nextSibling as HTMLElement).style.display =
                            "block";
                        }
                      }}
                    />
                    <div className="text-2xl font-bold text-gray-800 hidden">
                      {brand.name.charAt(0)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes scroll-right {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        @keyframes scroll-right-slow {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        .animate-scroll-right {
          animation: scroll-right 50s linear infinite;
        }

        .animate-scroll-left {
          animation: scroll-left 45s linear infinite;
        }

        .animate-scroll-right-slow {
          animation: scroll-right-slow 60s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default BrandsWeDeal;
