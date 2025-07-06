const BrandsWeDeal = () => {
  const brands = [
    {
      image: "/images/brands/toyota.png",
      name: "Toyota",
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
    <section className="py-16 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Enhanced dark/light background with subtle pattern */}

      <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="text-orange-500 dark:text-orange-400">
              Some Brands
            </span>{" "}
            We Deal For
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We specialize in premium used auto parts from the world's leading
            automotive manufacturers. Every part is carefully inspected and
            tested to meet our high-quality standards.
          </p>
        </div>

        {/* Enhanced Sliding Logo Banner */}
        {/* <div className="overflow-hidden"> */}
        {/* relative flex h-[400px] w-full flex-col items-center justify-center
          overflow-hidden rounded-lg bg-[#fbfbfe] dark:bg-gray-900 */}

        {/* First sliding row - left to right */}
        <div className="flex animate-scroll-right mb-8 hover:animate-pause">
          {extendedBrands.map((brand, index) => (
            <div
              key={`row1-${index}`}
              className="flex-shrink-0 mx-6 flex items-center justify-center group"
            >
              <div className="bg-white dark:bg-gray-700 rounded-full p-8 shadow-lg hover:shadow-2xl dark:shadow-gray-900/50 transition-all duration-300 transform hover:scale-110 w-32 h-32 flex items-center justify-center border border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-500">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-16 h-16 object-contain filter grayscale hover:grayscale-0 transition-all duration-300 dark:brightness-90 dark:hover:brightness-110"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.style.display = "none";
                    if (
                      img.nextSibling &&
                      img.nextSibling instanceof HTMLElement
                    ) {
                      img.nextSibling.style.display = "block";
                    }
                  }}
                />
                <div className="text-2xl font-bold text-gray-800 dark:text-gray-200 hidden">
                  {brand.name.charAt(0)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Second sliding row - right to left */}
        <div className="flex animate-scroll-left mb-8 hover:animate-pause">
          {extendedBrands.map((brand, index) => (
            <div
              key={`row2-${index}`}
              className="flex-shrink-0 mx-6 flex items-center justify-center group"
            >
              <div className="bg-white dark:bg-gray-700 rounded-full p-8 shadow-lg hover:shadow-2xl dark:shadow-gray-900/50 transition-all duration-300 transform hover:scale-110 w-32 h-32 flex items-center justify-center border border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-500">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-16 h-16 object-contain filter grayscale hover:grayscale-0 transition-all duration-300 dark:brightness-90 dark:hover:brightness-110"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.style.display = "none";
                    if (
                      img.nextSibling &&
                      img.nextSibling instanceof HTMLElement
                    ) {
                      img.nextSibling.style.display = "block";
                    }
                  }}
                />
                <div className="text-2xl font-bold text-gray-800 dark:text-gray-200 hidden">
                  {brand.name.charAt(0)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced gradient overlays for better fade effect */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-gray-50 dark:from-gray-900 via-gray-50/70 dark:via-gray-900/70 to-transparent"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-gray-50 dark:from-gray-900 via-gray-50/70 dark:via-gray-900/70 to-transparent"></div>
      </div>

      {/* Optional: Add a subtle call-to-action */}
      <div className="text-center mt-12">
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Looking for parts from your favorite brand? Contact us today!
        </p>
      </div>
      {/* </div> */}

      {/* Enhanced CSS for animations with hover pause */}
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

        .animate-scroll-right {
          animation: scroll-right 50s linear infinite;
        }

        .animate-scroll-left {
          animation: scroll-left 45s linear infinite;
        }

        .animate-pause {
          animation-play-state: paused;
        }

        /* Hover effect for entire row */
        .animate-scroll-right:hover,
        .animate-scroll-left:hover {
          animation-play-state: paused;
        }

        /* Smooth transitions for dark mode */
        * {
          transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
        }

        /* Enhanced shadow effects for dark mode */
        .dark .shadow-lg {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.1);
        }

        .dark .hover\\:shadow-2xl:hover {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        /* Improved brand logo visibility in dark mode */
        .dark img {
          filter: brightness(0.9) contrast(1.1);
        }

        .dark img:hover {
          filter: brightness(1.1) contrast(1.2) grayscale(0);
        }
      `}</style>
    </section>
  );
};

export default BrandsWeDeal;
