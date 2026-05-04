import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronLeft, ChevronRight, Phone, Mail, MapPin } from 'lucide-react';

const LOGO = 'https://raw.githubusercontent.com/Yusufsayed/brandio-leather-website/main/2d46e22e-2f36-431d-84c7-e7a672eb63dd.JPG';
const FACTORY_FRONT = 'https://raw.githubusercontent.com/Yusufsayed/brandio-leather-website/main/42545c7a-e2a7-4009-82f2-f1dc6a009b4c.JPG';
const FACTORY_SIDE = 'https://raw.githubusercontent.com/Yusufsayed/brandio-leather-website/main/c9ae221d-0bd2-42b0-b23e-390863a98187.JPG';

export default function BrandioLeatherWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('mens-bags');
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    { image: FACTORY_FRONT, title: 'Timeless Leather Craftsmanship', subtitle: 'Handcrafted leather goods by Brandio Leather Pvt Ltd. Since 2010, we\'ve exported premium leather accessories to over 30 countries.' },
    { image: FACTORY_SIDE, title: 'World-Class Manufacturing', subtitle: 'State-of-the-art facility producing premium leather goods with precision, quality, and care at every step.' },
  ];

  useEffect(() => {
    if (activeSection === 'home') {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [activeSection]);

  const products = {
    'mens-bags': [
      { id: 1, name: 'Classic Leather Messenger', image: '🎒' },
      { id: 2, name: 'Premium Laptop Bag', image: '💼' },
      { id: 3, name: 'Vintage Travel Duffel', image: '👜' },
      { id: 4, name: 'Leather Crossbody', image: '🎒' },
      { id: 5, name: 'Business Briefcase', image: '💼' },
    ],
    'bifold': [
      { id: 6, name: 'Classic Black Bifold', image: '💳' },
      { id: 7, name: 'Brown Leather Bifold', image: '💳' },
      { id: 8, name: 'Tan Bifold Wallet', image: '💳' },
    ],
    'trifold': [
      { id: 9, name: 'Premium Trifold Black', image: '💳' },
      { id: 10, name: 'Cognac Trifold', image: '💳' },
    ],
    'zip-around': [
      { id: 11, name: 'Full Zip Wallet Black', image: '💳' },
      { id: 12, name: 'Premium Zip Around', image: '💳' },
    ],
    'note-case': [
      { id: 13, name: 'Leather Note Case', image: '📋' },
      { id: 14, name: 'Premium Note Holder', image: '📋' },
    ],
    'european': [
      { id: 15, name: 'European Size Wallet', image: '💳' },
      { id: 16, name: 'Continental Wallet', image: '💳' },
    ],
    'small-goods': [
      { id: 17, name: 'Leather Key Holder', image: '🔑' },
      { id: 18, name: 'Card Holder Set', image: '💳' },
      { id: 19, name: 'Belt - Premium', image: '⌚' },
      { id: 20, name: 'Leather Watch Strap', image: '⌚' },
    ],
    'travel': [
      { id: 21, name: 'Passport Holder', image: '📕' },
      { id: 22, name: 'Travel Organizer', image: '📦' },
      { id: 23, name: 'Luggage Tag Set', image: '🏷️' },
      { id: 24, name: 'Document Holder', image: '📄' },
      { id: 25, name: 'Travel Belt', image: '⌚' },
    ],
  };

  const categories = [
    { id: 'mens-bags', name: "Men's Bags", count: 25 },
    { id: 'bifold', name: 'Bifold Wallets', count: 50 },
    { id: 'trifold', name: 'Trifold Wallets', subcategory: true },
    { id: 'zip-around', name: 'Zip-Around', subcategory: true },
    { id: 'note-case', name: 'Note Case', subcategory: true },
    { id: 'european', name: 'European Size', subcategory: true },
    { id: 'small-goods', name: 'Small Leather Goods', count: 20 },
    { id: 'travel', name: 'Travel Accessories', count: 5 },
  ];

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-gradient-to-b from-amber-50 via-white to-amber-50 text-gray-900 min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-amber-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => scrollToSection('home')} className="flex items-center gap-2">
            <img src={LOGO} alt="Brandio Leather" className="h-10 object-contain" />
          </button>

          <div className="hidden md:flex gap-8 items-center">
            {['home', 'about', 'products', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`capitalize font-medium transition-colors ${
                  activeSection === item
                    ? 'text-amber-900 border-b-2 border-amber-600'
                    : 'text-gray-700 hover:text-amber-900'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-lg bg-amber-100">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-amber-200 py-4 px-4 space-y-3">
            {['home', 'about', 'products', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="block w-full text-left capitalize font-medium py-2 px-4 rounded-lg hover:bg-amber-100 transition"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section with Carousel */}
      {activeSection === 'home' && (
        <section className="relative h-screen overflow-hidden">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className="absolute inset-0 transition-opacity duration-1000"
              style={{ opacity: currentSlide === index ? 1 : 0 }}
            >
              <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50"></div>
            </div>
          ))}

          <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
                {heroSlides[currentSlide].title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 font-light">
                {heroSlides[currentSlide].subtitle}
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <button
                  onClick={() => scrollToSection('products')}
                  className="px-8 py-3 bg-gradient-to-r from-amber-700 to-yellow-600 text-white rounded-lg font-semibold hover:shadow-lg transition transform hover:scale-105"
                >
                  Explore Products
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition"
                >
                  Get in Touch
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/20 rounded-full hover:bg-white/40 transition"
          >
            <ChevronLeft size={32} className="text-white" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/20 rounded-full hover:bg-white/40 transition"
          >
            <ChevronRight size={32} className="text-white" />
          </button>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlide === index ? 'bg-white w-8' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </section>
      )}

      {/* About Section */}
      {activeSection === 'about' && (
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-8 text-amber-900">Our Story</h2>
            <div className="space-y-6 text-lg text-gray-700">
              <p>At Brandio Leather Pvt Ltd, we believe in the power of craftsmanship. Every piece we create tells a story of dedication, precision, and passion. With over a decade of experience, we've refined our expertise to deliver leather goods that stand the test of time.</p>
              <p>Our artisans meticulously hand-select the finest leather from trusted suppliers across the globe. Using traditional techniques combined with modern innovation, we create products that are not just beautiful, but built to last.</p>
              <p>Trusted by customers in Europe, North America, Australia, and beyond, we're committed to exporting quality leather goods that represent the best of craftsmanship.</p>
            </div>
            <div className="grid md:grid-cols-4 gap-6 mt-12">
              {[
                { title: 'Premium Quality', desc: 'Finest leather selection' },
                { title: 'Expert Craftsmanship', desc: 'Experienced artisans' },
                { title: 'Global Reach', desc: '30+ Countries' },
                { title: 'Sustainability', desc: 'Ethical practices' },
              ].map((item, idx) => (
                <div key={idx} className="p-6 bg-white rounded-lg border border-amber-200 hover:shadow-lg transition">
                  <h3 className="font-bold text-amber-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products Section */}
      {activeSection === 'products' && (
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold mb-4 text-amber-900">Our Collections</h2>
            <p className="text-gray-600 mb-12 text-lg">Premium leather goods designed for those who appreciate quality and style.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`p-4 rounded-lg font-semibold transition transform ${
                    selectedCategory === cat.id
                      ? 'bg-amber-900 text-white shadow-lg scale-105'
                      : 'bg-white border border-amber-200 text-amber-900 hover:border-amber-500'
                  }`}
                >
                  <div className="text-sm">{cat.name}</div>
                  {cat.count && <div className="text-xs opacity-75 mt-1">({cat.count})</div>}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products[selectedCategory]?.map((product) => (
                <div key={product.id} className="bg-white rounded-lg overflow-hidden hover:shadow-xl transition transform hover:scale-105 duration-300 border border-amber-100">
                  <div className="h-32 bg-gradient-to-br from-amber-100 to-yellow-50 flex items-center justify-center text-6xl">{product.image}</div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-3">{product.name}</h3>
                    <button
                      onClick={() => scrollToSection('contact')}
                      className="w-full py-2 bg-amber-100 text-amber-900 rounded-lg font-semibold hover:bg-amber-200 transition"
                    >
                      Inquire Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {activeSection === 'contact' && (
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-12 text-amber-900">Get In Touch</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <form className="space-y-6">
                  <input type="text" placeholder="Your Name" className="w-full p-4 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600" />
                  <input type="email" placeholder="Your Email" className="w-full p-4 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600" />
                  <input type="text" placeholder="Company Name" className="w-full p-4 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600" />
                  <textarea placeholder="Your Message" rows="5" className="w-full p-4 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"></textarea>
                  <button className="w-full py-3 bg-gradient-to-r from-amber-900 to-yellow-700 text-white rounded-lg font-semibold hover:shadow-lg transition">Send Message</button>
                </form>
              </div>
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-amber-900 mb-4">Direct Contact</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <Phone className="text-amber-900 mt-1 flex-shrink-0" size={24} />
                      <div><p className="font-semibold text-gray-900">Phone</p><p className="text-gray-600">+1 (555) 123-4567</p></div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Mail className="text-amber-900 mt-1 flex-shrink-0" size={24} />
                      <div><p className="font-semibold text-gray-900">Email</p><p className="text-gray-600">hello@brandio.com</p></div>
                    </div>
                    <div className="flex items-start gap-4">
                      <MapPin className="text-amber-900 mt-1 flex-shrink-0" size={24} />
                      <div><p className="font-semibold text-gray-900">Address</p><p className="text-gray-600">Brandio Leather Manufacturing<br />Industrial Zone, City, Country</p></div>
                    </div>
                  </div>
                </div>
                <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
                  <h4 className="font-bold text-amber-900 mb-3">Schedule a Call</h4>
                  <p className="text-gray-700 mb-4">Let's discuss your leather goods requirements and explore custom solutions.</p>
                  <button className="w-full py-2 bg-amber-900 text-white rounded-lg font-semibold hover:bg-amber-800 transition">Book Meeting</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-r from-amber-900 to-yellow-800 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <img src={LOGO} alt="Brandio Leather" className="h-10 mb-4 brightness-200" />
              <p className="text-amber-100">Premium leather goods manufacturer and exporter since 2010.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-amber-100">
                <li><button onClick={() => scrollToSection('home')} className="hover:text-white">Home</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-white">About</button></li>
                <li><button onClick={() => scrollToSection('products')} className="hover:text-white">Products</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-white">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <button className="hover:text-yellow-200 transition">Facebook</button>
                <button className="hover:text-yellow-200 transition">Instagram</button>
                <button className="hover:text-yellow-200 transition">LinkedIn</button>
              </div>
            </div>
          </div>
          <div className="border-t border-amber-700 pt-8 text-center text-amber-100">
            <p>&copy; 2024 Brandio Leather Pvt Ltd. All rights reserved. | Premium Leather Goods Exporter</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
