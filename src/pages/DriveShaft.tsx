import { useState } from "react";
import {
  Phone,
  CheckCircle,
  Star,
  Truck,
  Shield,
  Clock,
  Award,
  Users,
  Wrench,
  ArrowRight,
} from "lucide-react";
import { AutoPartsModalForm } from "../components/Home/AutoPartsForm";
import { AutoPartsForm } from "../components/Home/AutoPartsForm";

const DriveShaft = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const benefits = [
    {
      icon: <Star className="h-6 w-6" />,
      title: "60% Cost Savings",
      description: "Junkyard drive shaft costs 60% less than a new one",
    },
    {
      icon: <Wrench className="h-6 w-6" />,
      title: "Enhanced Performance",
      description: "Will increase versatility and improve performance",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Extended Vehicle Life",
      description: "Used drive shafts increase vehicle life with affordability",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Socially Responsible",
      description: "Buying parts is a socially responsible practice",
    },
  ];

  const features = [
    {
      icon: <Award className="h-8 w-8" />,
      title: "Quality A-Grade OEM",
      description: "Only the finest OEM used drive shafts",
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Best Price Guaranteed",
      description: "Competitive pricing with quality assurance",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Twice Tested",
      description: "Rigorous testing for reliability",
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Easy Shipping",
      description: "Fast and secure delivery nationwide",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/10 dark:bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
                ⚡ Ready To Ship Quality Parts
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Premium Used
                <span className="block text-orange-100">Drive Shafts</span>
              </h1>
              <p className="text-xl text-orange-100 mb-8 max-w-2xl">
                Get the best deal on your used drive shafts with our premium
                quality parts. Tested, verified, and ready to ship nationwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => setModalOpen(true)}
                  className="bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold hover:bg-orange-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Get Free Quote
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-orange-600 transition-all duration-200 flex items-center justify-center gap-2">
                  <Phone className="h-5 w-5" />
                  <a href="tel:+1 201-984-5730">Call Now</a>
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-2xl p-2">
                <AutoPartsForm
                  className="max-h-[70vh] sm:max-h-[75vh] lg:max-h-[80vh] overflow-y-auto"
                  showTitle={true}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-sm font-semibold mb-4">
              USED DRIVE SHAFTS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Used Drive Shafts?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Experience the perfect balance of quality, affordability, and
              sustainability
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-400 to-orange-600 rounded-2xl blur opacity-20"></div>
              <div className="relative bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-2xl p-0 h-96 flex items-center justify-center overflow-hidden">
                <img
                  src="/assets/images/car_parts/Drive_shafts.png"
                  alt="Drive Shaft"
                  className="object-contain w-full h-full"
                />
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Drive shafts are crucial components that transfer torque from
                your vehicle's engine to the wheels, enabling smooth power
                delivery and optimal vehicle performance. Our high-quality used
                drive shafts offer exceptional value while maintaining superior
                performance standards.
              </p>

              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                At Accelera Auto Parts, we thoroughly inspect and test all our
                drive shafts to ensure they meet strict quality standards and
                provide reliable performance for years to come.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg"
                  >
                    <div className="text-orange-500 mt-1">{benefit.icon}</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {benefit.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setModalOpen(true)}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center gap-2"
              >
                ORDER NOW
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Accelera Auto Parts?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Experience excellence with our premium services and unmatched
              quality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-orange-100 dark:border-orange-900/30"
              >
                <div className="text-orange-500 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Our Promise
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                With excellent experience in the automobile industry, we at
                Accelera Auto Parts specialize in sourcing premium used drive
                shafts and guaranteeing their performance. Unlike inflated
                junkyard prices, we offer transparent, competitive pricing.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Quality A-Grade OEM Used Drive Shafts
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Best Price Guaranteed
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Twice Tested Used Drive Shafts
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Expert Support</h3>
              <p className="text-orange-100 mb-6 leading-relaxed">
                Our experienced team provides exceptional customer support to
                help you find the perfect drive shaft for your vehicle.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-orange-200" />
                  <span className="text-orange-100">
                    Easy Payments & Shipping
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-orange-200" />
                  <span className="text-orange-100">
                    Collaboration with Top Junkyards
                  </span>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-2">
                  SPEAK WITH A SPECIALIST NOW
                </h4>
                <div className="flex items-center space-x-3">
                  <Phone className="h-6 w-6" />
                  <span className="text-2xl font-bold">+1 201-984-5730</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready To Find Your Perfect Drive Shaft?
              </h2>
              <p className="text-xl text-orange-100 mb-8">
                Get started with our quick quote form or speak directly with our
                specialists.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => setModalOpen(true)}
                  className="bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold hover:bg-orange-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  FIND YOUR PARTS
                </button>
                <div className="flex items-center justify-center text-white">
                  <span className="text-lg">Or call us - </span>
                  <span className="font-bold text-xl ml-2">
                    +1 201-984-5730
                  </span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-white/20 rounded-2xl blur"></div>
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 h-72 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Truck className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Fast & Reliable Shipping
                  </h3>
                  <p className="text-orange-100">
                    Quality parts delivered nationwide
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AutoPartsModalForm
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      </section>
    </div>
  );
};

export default DriveShaft;
