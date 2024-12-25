const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <span className="text-xl font-semibold text-white">Logo</span>
            <p className="mt-4 text-sm">
              Creating beautiful experiences through thoughtful design and attention to detail.
            </p>
          </div>
          
          {["Product", "Company", "Resources"].map((section) => (
            <div key={section}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                {section}
              </h3>
              <ul className="mt-4 space-y-2">
                {[1, 2, 3].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm hover:text-white transition-colors duration-200"
                    >
                      {section} Link {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-12 pt-8 border-t border-neutral-800 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;