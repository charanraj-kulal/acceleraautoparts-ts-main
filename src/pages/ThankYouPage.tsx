import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/700.css";

const ThankYouPage = () => {
  const [countdown, setCountdown] = useState(30); // Fixed: Removed backtick
  const navigate = useNavigate();

  // Google Tag Manager script injection
  useEffect(() => {
    // GTM script
    (function (
      w: Window & { [key: string]: any },
      d: Document,
      s: string,
      l: string,
      i: string
    ) {
      w[l] = w[l] || [];
      w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
      var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s) as HTMLScriptElement,
        dl = l != "dataLayer" ? "&l=" + l : "";
      j.async = true;
      j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
      if (f.parentNode) {
        f.parentNode.insertBefore(j, f);
      }
    })(
      window as Window & { [key: string]: any },
      document,
      "script",
      "dataLayer",
      "GTM-5CLPR3VR"
    );

    // GTM noscript fallback - create and append iframe
    const noscriptIframe = document.createElement("iframe");
    noscriptIframe.src =
      "https://www.googletagmanager.com/ns.html?id=GTM-5CLPR3VR";
    noscriptIframe.height = "0";
    noscriptIframe.width = "0";
    noscriptIframe.style.display = "none";
    noscriptIframe.style.visibility = "hidden";

    // Append to body (or you can append to a specific container)
    document.body.appendChild(noscriptIframe);

    // Cleanup function to remove the iframe when component unmounts
    return () => {
      if (document.body.contains(noscriptIframe)) {
        document.body.removeChild(noscriptIframe);
      }
    };
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate(-1); // Go back to previous page
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleBackToHome = () => {
    navigate("/"); // Adjust this path to your home route
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 font-[Montserrat]">
      <div className="max-w-2xl w-full">
        {/* Main Thank You Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 sm:p-12 text-center">
          {/* Success Icon */}
          <div className="mx-auto mb-6 w-20 h-20 sm:w-24 sm:h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 sm:w-12 sm:h-12 text-green-500 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Thank You!
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6">
            Your request has been submitted successfully
          </p>

          {/* Message */}
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 sm:p-6 mb-8">
            <div className="flex items-center justify-center mb-3">
              <svg
                className="w-6 h-6 text-orange-500 dark:text-orange-400 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <h3 className="text-lg font-semibold text-orange-600 dark:text-orange-400">
                Check Your Email
              </h3>
            </div>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
              We've sent you a confirmation email with your request details. Our
              team will review your request and get back to you with the best
              quote shortly.
            </p>
          </div>

          {/* What's Next Section */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 sm:p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              What happens next?
            </h3>
            <div className="space-y-3 text-left">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  1
                </div>
                <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                  We'll review your part request within 24 hours
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  2
                </div>
                <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                  Our team will search for the best available parts
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  3
                </div>
                <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                  You'll receive a personalized quote via email
                </span>
              </div>
            </div>
          </div>

          {/* Countdown */}
          <div className="mb-8">
            <div className="inline-flex items-center bg-blue-50 dark:bg-blue-900/20 rounded-lg px-4 py-2">
              <svg
                className="w-5 h-5 text-blue-500 dark:text-blue-400 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm sm:text-base text-blue-700 dark:text-blue-300">
                Redirecting in {countdown} seconds...
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleBackToHome}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold text-sm sm:text-base transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Back to Home
            </button>
            <button
              onClick={handleGoBack}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold text-sm sm:text-base transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Go Back
            </button>
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-orange-500 dark:text-orange-400 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z"
              />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Need Help?
            </h3>
          </div>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
            If you have any questions or need immediate assistance, feel free to
            contact us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
            <div className="flex items-center justify-center">
              <svg
                className="w-4 h-4 text-orange-500 dark:text-orange-400 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <a href="tel:+12019845730">
                <span className="text-gray-700 dark:text-gray-300">
                  Call: +1 201-984-5730
                </span>
              </a>
            </div>
            <div className="flex items-center justify-center">
              <svg
                className="w-4 h-4 text-orange-500 dark:text-orange-400 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="text-gray-700 dark:text-gray-300">
                Email: info@acceleraautoparts.com
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
