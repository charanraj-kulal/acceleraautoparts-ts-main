import { useState } from "react";
import {
  Star,
  Shield,
  Wrench,
  Clock,
  CheckCircle,
  Phone,
  Search,
  ArrowRight,
  Award,
  Truck,
  Users,
  DollarSign,
} from "lucide-react";
import { AutoPartsModalForm } from "../components/Home/AutoPartsForm";
import { useNavigate, Link } from "react-router-dom";

// Define the Part type
interface Part {
  id: number;
  name: string;
  rating: number;
  image: string;
  condition: string;
  description: string;
  compatibility: string[];
  warranty: string;
  pageLink: string;
  category: string;
  features: string[];
}

const UsedAutoPartsPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

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
      category: "powertrain",
      features: [
        "Compression Tested",
        "Performance Verified",
        "Certified Quality",
      ],
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
      category: "powertrain",
      features: ["Rebuilt", "Bench Tested", "New Seals"],
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
      category: "exterior",
      features: ["Low Mileage", "Balanced", "Inspected"],
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
      category: "hvac",
      features: ["Bench Tested", "Refrigerant Checked", "Performance Verified"],
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
      category: "exterior",
      features: ["Clear Lens", "No Cracks", "No UV Yellowing"],
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
      category: "powertrain",
      features: ["New Seals", "Fluid Changed", "Tested Engagement"],
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
      category: "powertrain",
      features: ["New Bearings", "Bench Tested", "Certified"],
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
      category: "powertrain",
      features: ["Balanced", "Vibration-Free", "U-Joint Inspected"],
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
      category: "electrical",
      features: ["Voltage Tested", "Certified", "High Output"],
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
      category: "powertrain",
      features: ["Pressure Tested", "Leak-Free", "Fan Assembly Included"],
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
      category: "exterior",
      features: ["Electrical Tested", "Tilt & Telescoping", "Certified"],
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
      category: "powertrain",
      features: [
        "Crack Inspected",
        "Machined Gasket Surface",
        "Stainless/Steel",
      ],
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
      category: "powertrain",
      features: [
        "Throttle Body Included",
        "Sensors Included",
        "Air Flow Tested",
      ],
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
      category: "powertrain",
      features: ["New CV Joints", "Boots Included", "Rotation Tested"],
    },
  ];

  const categories = [
    { id: "all", name: "All Parts", count: parts.length },
    {
      id: "powertrain",
      name: "Powertrain",
      count: parts.filter((p) => p.category === "powertrain").length,
    },
    {
      id: "exterior",
      name: "Exterior",
      count: parts.filter((p) => p.category === "exterior").length,
    },
    {
      id: "hvac",
      name: "HVAC",
      count: parts.filter((p) => p.category === "hvac").length,
    },
    {
      id: "electrical",
      name: "Electrical",
      count: parts.filter((p) => p.category === "electrical").length,
    },
  ];
  const navigate = useNavigate();

  const handlePartClick = (part: Part) => {
    if (part.pageLink) {
      navigate(part.pageLink);
    }
  };
  const filteredParts = parts.filter((part) => {
    const matchesSearch =
      part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || part.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = [
    { icon: Users, value: "50,000+", label: "Happy Customers" },
    { icon: Award, value: "25+", label: "Years Experience" },
    { icon: Truck, value: "100,000+", label: "Parts in Stock" },
    { icon: DollarSign, value: "60%", label: "Average Savings" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-900 via-orange-800 to-orange-900 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Premium Used Auto Parts
          </h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto mb-8 text-orange-100">
            Quality tested parts with comprehensive warranties. Save up to 60%
            compared to new parts while maintaining the same reliability and
            performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setModalOpen(true)}
              className="bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold hover:bg-orange-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Get Free Quote
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-orange-600 transition-all duration-200">
              <Link to="/contact">Contact Us</Link>
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="text-3xl font-bold text-orange-900 dark:text-orange-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-orange-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for parts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-orange-200 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category.id
                      ? "bg-orange-600 text-white"
                      : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-gray-600"
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Parts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredParts.map((part) => (
              <div
                key={part.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-orange-100 dark:border-gray-700 group overflow-hidden"
                onClick={() => handlePartClick(part)}
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={part.image}
                    alt={part.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute top-4 left-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {part.condition}
                  </div>
                  {/* Optionally show availability here if you add it to the data */}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col h-full">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex-1">
                      {part.name}
                    </h3>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
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
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                      {part.rating} ({Math.floor(Math.random() * 200) + 50}{" "}
                      reviews)
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1 leading-relaxed">
                    {part.description}
                  </p>

                  {/* Features */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {part.features.map((feature, index) => (
                        <span
                          key={index}
                          className="bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 px-2 py-1 rounded-md text-xs font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Warranty */}
                  <div className="flex items-center mb-4">
                    <Shield className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {part.warranty}
                    </span>
                  </div>

                  {/* Compatibility */}
                  <div className="mb-6">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">
                      Compatible with:
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {part.compatibility.join(", ")}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-auto">
                    <button
                      onClick={() => setModalOpen(true)}
                      className="flex-1 bg-orange-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                    >
                      Get Quote
                    </button>
                    <button className="px-4 py-3 border border-orange-600 text-orange-600 dark:text-orange-400 rounded-lg font-semibold hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-orange-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-orange-900 dark:text-orange-400 mb-4">
              Why Choose Our Used Auto Parts?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We provide quality, tested parts with comprehensive warranties to
              ensure your vehicle runs smoothly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Wrench className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-orange-900 dark:text-orange-400 mb-4">
                Quality Tested
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Every part undergoes rigorous testing to ensure optimal
                performance and reliability for your vehicle.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-orange-900 dark:text-orange-400 mb-4">
                Warranty Included
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Comprehensive warranty coverage from 60 days to 1 year depending
                on the part type and condition.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-orange-900 dark:text-orange-400 mb-4">
                Perfect Fit
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Verified compatibility with detailed vehicle specifications and
                comprehensive fitment guides.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-900 via-orange-800 to-orange-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Find Your Perfect Part?
          </h2>
          <p className="text-xl mb-8 text-orange-100">
            Get a free quote today and save up to 60% on quality used auto parts
            with warranty included.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setModalOpen(true)}
              className="bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold hover:bg-orange-50 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center"
            >
              Get Free Quote Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <div className="flex items-center justify-center space-x-4 text-orange-100">
              <div className="flex items-center">
                <a
                  href="tel:+12019845730"
                  className="flex items-center hover:text-orange-200 transition-colors"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  <span>+1 201-984-5730</span>
                </a>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <AutoPartsModalForm
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default UsedAutoPartsPage;
