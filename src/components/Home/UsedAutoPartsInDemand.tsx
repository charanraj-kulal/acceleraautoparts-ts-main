import { TrendingUp, Star, Clock, Award } from "lucide-react";

const UsedAutoPartsInDemand = () => {
  const demandParts = [
    {
      name: "Engine Blocks",
      demand: "High",
      percentage: 95,
      priceRange: "$800 - $3,500",
      availability: "In Stock",
      rating: 4.9,
      image: "🔧",
      features: ["OEM Quality", "Tested", "Warranty"],
    },
    {
      name: "Transmissions",
      demand: "Very High",
      percentage: 98,
      priceRange: "$600 - $2,800",
      availability: "In Stock",
      rating: 4.8,
      image: "⚙️",
      features: ["Rebuilt", "Certified", "30-Day Return"],
    },
    {
      name: "Airbags",
      demand: "High",
      percentage: 92,
      priceRange: "$150 - $800",
      availability: "Limited",
      rating: 4.7,
      image: "🛡️",
      features: ["Safety Tested", "OEM", "No Deployment"],
    },
    {
      name: "ECU Modules",
      demand: "Very High",
      percentage: 96,
      priceRange: "$200 - $1,200",
      availability: "In Stock",
      rating: 4.9,
      image: "💻",
      features: ["Programmed", "Tested", "Plug & Play"],
    },
    {
      name: "Catalytic Converters",
      demand: "Extreme",
      percentage: 99,
      priceRange: "$300 - $1,500",
      availability: "In Stock",
      rating: 4.8,
      image: "🌿",
      features: ["Emissions Tested", "OEM", "Guaranteed"],
    },
    {
      name: "Headlights",
      demand: "High",
      percentage: 88,
      priceRange: "$80 - $450",
      availability: "In Stock",
      rating: 4.6,
      image: "💡",
      features: ["LED/HID", "Clear Lens", "Tested"],
    },
    {
      name: "Steering Racks",
      demand: "High",
      percentage: 90,
      priceRange: "$250 - $900",
      availability: "In Stock",
      rating: 4.7,
      image: "🎯",
      features: ["Rebuilt", "Tested", "Power Steering"],
    },
    {
      name: "Brake Calipers",
      demand: "Medium",
      percentage: 82,
      priceRange: "$50 - $300",
      availability: "In Stock",
      rating: 4.5,
      image: "🛑",
      features: ["Rebuilt", "Tested", "OEM Quality"],
    },
  ];

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case "Extreme":
        return "bg-red-500";
      case "Very High":
        return "bg-orange-500";
      case "High":
        return "bg-yellow-500";
      case "Medium":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getDemandTextColor = (demand: string) => {
    switch (demand) {
      case "Extreme":
        return "text-red-600 dark:text-red-400";
      case "Very High":
        return "text-orange-600 dark:text-orange-400";
      case "High":
        return "text-yellow-600 dark:text-yellow-400";
      case "Medium":
        return "text-blue-600 dark:text-blue-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="w-8 h-8 text-orange-500 mr-2" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Used Auto Parts in High Demand
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover the most sought-after used auto parts in the market. Our
            inventory is constantly updated based on current demand and
            availability.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-700 rounded-xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-orange-500 mb-2">50K+</div>
            <div className="text-gray-600 dark:text-gray-300">Parts Sold</div>
          </div>
          <div className="bg-white dark:bg-gray-700 rounded-xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-orange-500 mb-2">98%</div>
            <div className="text-gray-600 dark:text-gray-300">
              Satisfaction Rate
            </div>
          </div>
          <div className="bg-white dark:bg-gray-700 rounded-xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-orange-500 mb-2">24/7</div>
            <div className="text-gray-600 dark:text-gray-300">Support</div>
          </div>
          <div className="bg-white dark:bg-gray-700 rounded-xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-orange-500 mb-2">500+</div>
            <div className="text-gray-600 dark:text-gray-300">Brands</div>
          </div>
        </div>

        {/* Parts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {demandParts.map((part, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-600"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl">{part.image}</div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {part.rating}
                  </span>
                </div>
              </div>

              {/* Part Name */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {part.name}
              </h3>

              {/* Demand Level */}
              <div className="flex items-center mb-3">
                <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">
                  Demand:
                </span>
                <span
                  className={`text-sm font-semibold ${getDemandTextColor(
                    part.demand
                  )}`}
                >
                  {part.demand}
                </span>
              </div>

              {/* Demand Bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-4">
                <div
                  className={`h-2 rounded-full ${getDemandColor(part.demand)}`}
                  style={{ width: `${part.percentage}%` }}
                ></div>
              </div>

              {/* Price Range */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Price Range:
                </span>
                <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                  {part.priceRange}
                </span>
              </div>

              {/* Availability */}
              <div className="flex items-center mb-4">
                <Clock className="w-4 h-4 text-gray-400 mr-2" />
                <span
                  className={`text-sm ${
                    part.availability === "In Stock"
                      ? "text-green-600 dark:text-green-400"
                      : "text-orange-600 dark:text-orange-400"
                  }`}
                >
                  {part.availability}
                </span>
              </div>

              {/* Features */}
              <div className="space-y-1 mb-4">
                {part.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center">
                    <Award className="w-3 h-3 text-orange-500 mr-2" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-200">
                View Details
              </button>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Get Real-Time Demand Updates
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Subscribe to our newsletter and stay informed about the latest
              market trends and part availability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg text-gray-900 w-full sm:w-auto min-w-[300px]"
              />
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UsedAutoPartsInDemand;
