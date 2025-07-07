import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import emailjs from "emailjs-com";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/700.css";
import React from "react";

type FormDataState = {
  name: string;
  email: string;
  phone: string;
  year: string;
  make: string;
  model: string;
  partType: string;
};

// Enhanced Modal Component with blur backdrop
const Modal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  // Handle ESC key press
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Enhanced backdrop with blur effect */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300"
        onClick={onClose}
      />
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl font-[Montserrat] max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100 opacity-100">
        {/* Enhanced close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
          aria-label="Close modal"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

// Enhanced Form Component
const AutoPartsForm = ({
  onSubmit,
  className = "",
  showTitle = true,
  onSuccess,
}: {
  onSubmit?: (formData: FormDataState) => void;
  className?: string;
  showTitle?: boolean;
  onSuccess?: () => void;
}) => {
  const [formData, setFormData] = useState<FormDataState>({
    name: "",
    email: "",
    phone: "",
    year: "",
    make: "",
    model: "",
    partType: "",
  });
  emailjs.init("u0jB2jWwkIFUZMmwc");

  const [availableModels, setAvailableModels] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Car data from CSV
  const carData: Record<string, string[]> = {
    Acura: [
      "CL",
      "CL Type-S",
      "CSX",
      "EL",
      "ILX",
      "ILX Hybrid",
      "Integra",
      "Integra Type R",
      "Legend",
      "MDX",
      "MDX Hybrid",
      "NSX",
      "NSX Type S",
      "RDX",
      "RL",
      "RLX",
      "RLX Sport Hybrid",
      "RSX",
      "RSX Type-S",
      "SLX",
      "TL",
      "TL Type-S",
      "TLX",
      "TLX Type S",
      "TSX",
      "TSX Sport Wagon",
      "Vigor",
      "ZDX",
    ],
    "Alfa Romeo": [
      "145",
      "146",
      "147",
      "155",
      "156",
      "159",
      "164",
      "166",
      "33",
      "4C",
      "4C Spider",
      "8C Competizione",
      "Brera",
      "Giulia",
      "Giulia Quadrifoglio",
      "Giulietta",
      "GT",
      "MiTo",
      "Spider",
      "Stelvio",
      "Stelvio Quadrifoglio",
    ],
    "Aston Martin": [
      "DB7",
      "DB7 Zagato",
      "DB9",
      "DB9 AMR",
      "DB9 GT",
      "DB11",
      "DB11 AMR",
      "DBS",
      "DBS Superleggera",
      "DBX",
      "DBX707",
      "Lagonda Taraf",
      "Rapide",
      "Rapide AMR",
      "V12 Vanquish",
      "V12 Vantage",
      "V8 Vantage",
      "Vanquish",
      "Vanquish S",
      "Vanquish Zagato",
      "Vantage",
      "Vantage AMR",
      "Virage",
    ],
    Audi: [
      "A2",
      "A3",
      "A3 Sportback",
      "A4",
      "A4 Allroad",
      "A5",
      "A5 Sportback",
      "A6",
      "A6 Allroad",
      "A7",
      "A7 Sportback",
      "A8",
      "A8 L",
      "e-tron",
      "e-tron GT",
      "e-tron S",
      "Q2",
      "Q3",
      "Q3 Sportback",
      "Q4 e-tron",
      "Q4 Sportback e-tron",
      "Q5",
      "Q5 Sportback",
      "Q7",
      "Q8",
      "R8",
      "R8 Spyder",
      "RS2",
      "RS3",
      "RS4",
      "RS5",
      "RS6",
      "RS7",
      "S3",
      "S4",
      "S5",
      "S6",
      "S7",
      "S8",
      "SQ2",
      "SQ5",
      "SQ7",
      "SQ8",
      "TT",
      "TT RS",
      "TTS",
    ],
    BMW: [
      "1 Series",
      "1 Series M",
      "2 Series",
      "2 Series Active Tourer",
      "2 Series Gran Coupe",
      "3 Series",
      "3 Series Gran Turismo",
      "4 Series",
      "4 Series Gran Coupe",
      "5 Series",
      "5 Series Gran Turismo",
      "6 Series",
      "6 Series Gran Coupe",
      "7 Series",
      "8 Series",
      "8 Series Gran Coupe",
      "i3",
      "i4",
      "i5",
      "i7",
      "i8",
      "iX",
      "iX3",
      "M1",
      "M2",
      "M3",
      "M4",
      "M5",
      "M6",
      "M8",
      "X1",
      "X2",
      "X3",
      "X3 M",
      "X4",
      "X4 M",
      "X5",
      "X5 M",
      "X6",
      "X6 M",
      "X7",
      "Z3",
      "Z3 M",
      "Z4",
      "Z4 M",
      "Z8",
    ],
    Chevrolet: [
      "Astro",
      "Avalanche",
      "Aveo",
      "Blazer",
      "Blazer EV",
      "Bolt EV",
      "Bolt EUV",
      "Camaro",
      "Camaro ZL1",
      "Caprice",
      "Captiva",
      "Cavalier",
      "Cobalt",
      "Colorado",
      "Corvette",
      "Corvette Stingray",
      "Corvette Z06",
      "Corvette ZR1",
      "Cruze",
      "Cruze Limited",
      "Equinox",
      "Express",
      "HHR",
      "Impala",
      "Impala Limited",
      "Lumina",
      "Malibu",
      "Malibu Hybrid",
      "Metro",
      "Monte Carlo",
      "Prizm",
      "Silverado",
      "Silverado EV",
      "Sonic",
      "Spark",
      "Spark EV",
      "SS",
      "SSR",
      "Suburban",
      "Tahoe",
      "Tracker",
      "Trailblazer",
      "Traverse",
      "Trax",
      "Uplander",
      "Venture",
      "Volt",
    ],
    Ford: [
      "Bronco",
      "Edge",
      "Escape",
      "Expedition",
      "Explorer",
      "F-150",
      "F-250",
      "F-350",
      "Fiesta",
      "Focus",
      "Fusion",
      "Mustang",
      "Ranger",
      "Taurus",
    ],
    Honda: [
      "Accord",
      "Civic",
      "CR-V",
      "HR-V",
      "Odyssey",
      "Passport",
      "Pilot",
      "Ridgeline",
    ],
    Toyota: [
      "4Runner",
      "Avalon",
      "bZ4X",
      "Camry",
      "Camry Solara",
      "Celica",
      "Corolla",
      "Corolla Cross",
      "Crown",
      "Echo",
      "FJ Cruiser",
      "GR86",
      "Highlander",
      "Highlander Hybrid",
      "Land Cruiser",
      "Matrix",
      "Mirai",
      "MR2 Spyder",
      "Paseo",
      "Previa",
      "Prius",
      "Prius c",
      "Prius v",
      "RAV4",
      "RAV4 Hybrid",
      "Sequoia",
      "Sienna",
      "Supra",
      "Tacoma",
      "Tercel",
      "Tundra",
      "Venza",
      "Yaris",
    ],
  };

  type CarMake = keyof typeof carData;

  const years = Array.from({ length: 30 }, (_, i) => 2024 - i);
  const makes = Object.keys(carData).sort();

  const partTypes = [
    "Engine",
    "Transmission",
    "Body Parts",
    "Electrical",
    "Suspension",
    "Brakes",
    "Exhaust",
    "Interior",
    "Exterior",
    "Wheels & Tires",
    "Lighting",
    "Cooling System",
    "Fuel System",
    "Air Conditioning",
  ];

  useEffect(() => {
    if (
      formData.make &&
      (Object.keys(carData) as string[]).includes(formData.make)
    ) {
      setAvailableModels([...carData[formData.make as CarMake]]);
      if (
        formData.model &&
        !carData[formData.make as CarMake].includes(formData.model)
      ) {
        setFormData((prev: FormDataState) => ({ ...prev, model: "" }));
      }
    } else {
      setAvailableModels([]);
      setFormData((prev: FormDataState) => ({ ...prev, model: "" }));
    }
  }, [formData.make]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: FormDataState) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.year ||
      !formData.make ||
      !formData.model ||
      !formData.partType
    ) {
      alert("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    try {
      await emailjs.send(
        "service_b304oc2", // serviceId
        "template_cxw8wr8", // templateId
        {
          to_name: "Auto Parts Team",
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          year: formData.year,
          make: formData.make,
          model: formData.model,
          part_type: formData.partType,
          reply_to: formData.email,
        }
      );

      alert("Your request has been submitted successfully!");

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        year: "",
        make: "",
        model: "",
        partType: "",
      });

      if (onSubmit) {
        onSubmit(formData);
      }

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 font-[Montserrat] rounded-2xl shadow-2xl p-8 ${className}`}
    >
      {showTitle && (
        <div className="text-center mb-4 lg:mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Get Your Free Quote
          </h2>
          <p className="text-sm  text-gray-600 dark:text-gray-300">
            Submit your request and we'll get back to you with the best price
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3">
        {/* Personal Info Row */}
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-6">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
              Your Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
              Your Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
              placeholder="Enter your email"
            />
          </div>
        </div>

        {/* Contact & Year Row */}
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-6">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
              Your Phone *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
              placeholder="Enter your phone"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
              Model Year *
            </label>
            <select
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
            >
              <option value="">Select Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Make & Model Row */}
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-6">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
              Make *
            </label>
            <select
              name="make"
              value={formData.make}
              onChange={handleInputChange}
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
            >
              <option value="">Select Make</option>
              {makes.map((make) => (
                <option key={make} value={make}>
                  {make}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
              Model *
            </label>
            <select
              name="model"
              value={formData.model}
              onChange={handleInputChange}
              required
              disabled={!formData.make}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <option value="">Select Model</option>
              {availableModels.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Part Type - Full Width */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
            Part Type *
          </label>
          <select
            name="partType"
            value={formData.partType}
            onChange={handleInputChange}
            required
            className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
          >
            <option value="">Select Part Type</option>
            {partTypes.map((part) => (
              <option key={part} value={part}>
                {part}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-semibold text-sm sm:text-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
              SUBMITTING...
            </div>
          ) : (
            "SUBMIT REQUEST"
          )}
        </button>
      </form>
    </div>
  );
};

// Modal Form Component that combines both
const AutoPartsModalForm = ({
  isOpen,
  onClose,
  onSubmit,
  showTitle = true,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (formData: FormDataState) => void;
  showTitle?: boolean;
}) => {
  const handleFormSuccess = () => {
    setTimeout(() => {
      onClose(); // Close modal after successful submission with slight delay
    }, 1500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <AutoPartsForm
        onSubmit={onSubmit}
        onSuccess={handleFormSuccess}
        showTitle={showTitle}
      />
    </Modal>
  );
};

// Hook for auto-opening modal after delay
const useAutoOpenModal = (delay: number = 5000) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);

  useEffect(() => {
    if (!hasAutoOpened) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setHasAutoOpened(true);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [delay, hasAutoOpened]);

  return {
    isOpen,
    openModal: () => setIsOpen(true),
    closeModal: () => setIsOpen(false),
  };
};
export { AutoPartsForm, AutoPartsModalForm, useAutoOpenModal };
export type { FormDataState };
