import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
type FormDataState = {
  name: string;
  email: string;
  phone: string;
  year: string;
  make: string;
  model: string;
  partType: string;
};

// Form Component - Reusable
const AutoPartsForm = ({
  onSubmit,
  className = "",
  showTitle = true,
}: {
  onSubmit?: (formData: FormDataState) => void;
  className?: string;
  showTitle?: boolean;
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
    Jeep: [
      "Wrangler",
      "Cherokee",
      "Grand Cherokee",
      "Compass",
      "Renegade",
      "Wagoneer",
      "Gladiator",
      "Patriot",
      "Liberty",
      "Commander",
      "Comanche",
      "CJ",
      "Scrambler",
      "Renegade (Classic)",
      "J10",
      "J20",
      "Willys",
      "FC",
      "Grand Wagoneer",
      "Laredo",
    ],
    "Mercedes-Benz": [
      "C-Class",
      "E-Class",
      "S-Class",
      "A-Class",
      "B-Class",
      "CLK",
      "SLK",
      "SL",
      "CLS",
      "GLK",
      "ML",
      "GL",
      "G-Class",
      "R-Class",
      "CLA",
      "GLA",
      "GLC",
      "GLE",
      "GLS",
      "AMG GT",
      "EQE",
      "EQS",
      "EQA",
      "EQB",
      "EQC",
    ],
    Nissan: [
      "Altima",
      "Sentra",
      "Maxima",
      "Rogue",
      "Pathfinder",
      "Armada",
      "Titan",
      "Frontier",
      "370Z",
      "GT-R",
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
      // Only reset model if it's not valid for the new make
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

    // Validate required fields
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

      // Call parent callback if provided
      if (onSubmit) {
        onSubmit(formData);
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
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 ${className}`}
    >
      {showTitle && (
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Submit Your Request To Get A Free Quote
        </h2>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name and Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Your Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Your Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your email"
            />
          </div>
        </div>

        {/* Phone and Year */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Your Phone *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your phone"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Model Year *
            </label>
            <select
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
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

        {/* Make and Model */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Make *
            </label>
            <select
              name="make"
              value={formData.make}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Model *
            </label>
            <select
              name="model"
              value={formData.model}
              onChange={handleInputChange}
              required
              disabled={!formData.make}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50"
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

        {/* Part Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Part Type *
          </label>
          <select
            name="partType"
            value={formData.partType}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
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
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white py-3 px-4 rounded-full font-semibold transition-colors duration-200 transform hover:scale-105 disabled:transform-none"
        >
          {isSubmitting ? "SUBMITTING..." : "SUBMIT REQUEST"}
        </button>
      </form>
    </div>
  );
};

const Modal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <svg
            className="w-6 h-6"
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
export default AutoPartsForm;
export { Modal };
