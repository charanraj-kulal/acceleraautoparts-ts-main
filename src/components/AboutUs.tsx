const AboutUs = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              About <span className="text-orange-500">Accelera Auto Parts</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              With over 15 years of experience in the automotive industry,
              Accelera Auto Parts has been your trusted partner for high-quality
              used auto parts. We specialize in providing OEM-grade components
              that meet or exceed industry standards.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Our extensive inventory includes engines, transmissions, body
              parts, and electrical components for all major vehicle brands.
              Every part undergoes rigorous inspection to ensure reliability and
              performance.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-2">
                  15+
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  Years Experience
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-2">
                  50K+
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  Parts Sold
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-2">
                  99%
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  Customer Satisfaction
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-2">
                  24/7
                </div>
                <div className="text-gray-600 dark:text-gray-300">Support</div>
              </div>
            </div>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1486496572940-2bb2341fdbdf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Auto Parts"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default AboutUs;
