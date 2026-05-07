import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronLeft, ChevronRight, Phone, Mail, MapPin, ChevronRight as ChevronRightSm } from 'lucide-react';

const LOGO = 'https://raw.githubusercontent.com/Yusufsayed/brandio-leather-website/main/brandio-logo-final.png';
const FACTORY_FRONT = 'https://raw.githubusercontent.com/Yusufsayed/brandio-leather-website/main/42545c7a-e2a7-4009-82f2-f1dc6a009b4c.JPG';
const FACTORY_SIDE = 'https://raw.githubusercontent.com/Yusufsayed/brandio-leather-website/main/c9ae221d-0bd2-42b0-b23e-390863a98187.JPG';

const NAV_ITEMS = [
  { id: 'home',        label: 'Home' },
  { id: 'about',       label: 'About' },
  { id: 'products',    label: 'Products' },
  { id: 'collections', label: 'Collections' },
  { id: 'packaging',   label: 'Packaging' },
  { id: 'contact',     label: 'Contact' },
];

/* ─── Product card ─────────────────────────────────────────────────────────── */
function ProductCard({ product, onInquire }) {
  const [flipped, setFlipped] = useState(false);

  if (product.frontImage) {
    return (
      <div
        className="bg-white rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-amber-100 cursor-pointer"
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
        onClick={() => setFlipped(f => !f)}
      >
        <div className="h-48 relative overflow-hidden bg-amber-50">
          <img
            src={product.frontImage}
            alt={product.name}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${flipped ? 'opacity-0' : 'opacity-100'}`}
          />
          <img
            src={product.insideImage}
            alt={`${product.name} inside`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${flipped ? 'opacity-100' : 'opacity-0'}`}
          />
          <div className={`absolute bottom-2 right-2 text-xs px-2 py-1 rounded bg-black/50 text-white transition-opacity duration-300 ${flipped ? 'opacity-100' : 'opacity-0'}`}>
            Inside View
          </div>
          {product.sku && (
            <div className="absolute top-2 left-2 text-xs px-2 py-1 rounded bg-amber-900/80 text-white font-mono">
              {product.sku}
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold text-gray-900 mb-1">{product.name}</h3>
          {product.collection && <p className="text-xs text-amber-700 mb-3">{product.collection}</p>}
          <button
            onClick={e => { e.stopPropagation(); onInquire(); }}
            className="w-full py-2 bg-amber-100 text-amber-900 rounded-lg font-semibold hover:bg-amber-200 transition"
          >
            Inquire Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden hover:shadow-xl transition transform hover:scale-105 duration-300 border border-amber-100">
      <div className="h-36 bg-gradient-to-br from-amber-100 to-yellow-50 flex items-center justify-center text-6xl">{product.image}</div>
      <div className="p-4">
        <h3 className="font-bold text-gray-900 mb-3">{product.name}</h3>
        <button
          onClick={onInquire}
          className="w-full py-2 bg-amber-100 text-amber-900 rounded-lg font-semibold hover:bg-amber-200 transition"
        >
          Inquire Now
        </button>
      </div>
    </div>
  );
}

/* ─── Data ──────────────────────────────────────────────────────────────────── */
const PRODUCTS = {
  wallets: {
    bifold: [
      { id: 64, name: 'European Size Bifold',           sku: 'MC-0064', collection: 'Massini Collection', frontImage: '/MC-0064.png', insideImage: '/MC-0064_inside.png' },
      { id: 6,  name: 'Classic Black Bifold', image: '💳' },
      { id: 7,  name: 'Brown Leather Bifold', image: '💳' },
      { id: 8,  name: 'Tan Bifold Wallet',    image: '💳' },
    ],
    trifold: [
      { id: 65, name: 'European Size Trifold',           sku: 'MC-0065', collection: 'Massini Collection', frontImage: '/MC-0065.png', insideImage: '/MC-0065_inside.png' },
      { id: 9,  name: 'Premium Trifold Black', image: '💳' },
      { id: 10, name: 'Cognac Trifold',        image: '💳' },
    ],
    'note-case': [
      { id: 61, name: 'European Size Note Case',         sku: 'MC-0061', collection: 'Massini Collection', frontImage: '/MC-0061.png', insideImage: '/MC-0061_inside.png' },
      { id: 13, name: 'Leather Note Case',     image: '📋' },
      { id: 14, name: 'Premium Note Holder',   image: '📋' },
    ],
    'zip-around': [
      { id: 11, name: 'Full Zip Wallet Black', image: '💳' },
      { id: 12, name: 'Premium Zip Around',    image: '💳' },
    ],
  },
  bags: [
    { id: 1, name: 'Classic Leather Messenger', image: '🎒' },
    { id: 2, name: 'Premium Laptop Bag',         image: '💼' },
    { id: 3, name: 'Vintage Travel Duffel',      image: '👜' },
    { id: 4, name: 'Leather Crossbody',          image: '🎒' },
    { id: 5, name: 'Business Briefcase',         image: '💼' },
  ],
  'small-accessories': [
    { id: 17, name: 'Leather Key Holder',  image: '🔑' },
    { id: 18, name: 'Card Holder Set',     image: '💳' },
    { id: 19, name: 'Belt – Premium',      image: '👔' },
    { id: 20, name: 'Leather Watch Strap', image: '⌚' },
  ],
  travel: [
    { id: 21, name: 'Passport Holder',   image: '📕' },
    { id: 22, name: 'Travel Organizer',  image: '📦' },
    { id: 23, name: 'Luggage Tag Set',   image: '🏷️' },
    { id: 24, name: 'Document Holder',   image: '📄' },
    { id: 25, name: 'Travel Belt',       image: '⌚' },
  ],
};

const MAIN_CATEGORIES = [
  { id: 'wallets',           label: 'Wallets',              icon: '👛', desc: 'Bifold · Trifold · Note Case · Zip-around' },
  { id: 'bags',              label: 'Bags',                 icon: '🎒', desc: 'Messenger · Laptop · Duffel · Briefcase' },
  { id: 'small-accessories', label: 'Small Accessories',    icon: '🔑', desc: 'Key holders · Card cases · Belts · Straps' },
  { id: 'travel',            label: 'Travel Accessories',   icon: '✈️', desc: 'Passport · Organizers · Luggage tags' },
];

const WALLET_SUBS = [
  { id: 'bifold',     label: 'Bifold' },
  { id: 'trifold',    label: 'Trifold' },
  { id: 'note-case',  label: 'Note Case' },
  { id: 'zip-around', label: 'Zip-around' },
];

/* ─── App ───────────────────────────────────────────────────────────────────── */
export default function BrandioLeatherWebsite() {
  const [isMenuOpen,       setIsMenuOpen]       = useState(false);
  const [activeSection,    setActiveSection]    = useState('home');
  const [mainCategory,     setMainCategory]     = useState('wallets');
  const [walletSub,        setWalletSub]        = useState('bifold');
  const [currentSlide,     setCurrentSlide]     = useState(0);

  const heroSlides = [
    { image: FACTORY_FRONT, title: 'Timeless Leather Craftsmanship',  subtitle: "Handcrafted leather goods by Brandio Leather Pvt Ltd. Since 2010, we've exported premium leather accessories to over 30 countries." },
    { image: FACTORY_SIDE,  title: 'World-Class Manufacturing',        subtitle: 'State-of-the-art facility producing premium leather goods with precision, quality, and care at every step.' },
  ];

  useEffect(() => {
    if (activeSection !== 'home') return;
    const timer = setInterval(() => setCurrentSlide(p => (p + 1) % heroSlides.length), 5000);
    return () => clearInterval(timer);
  }, [activeSection]);

  const goTo = section => { setActiveSection(section); setIsMenuOpen(false); };

  /* derive product list for current selection */
  const visibleProducts = mainCategory === 'wallets'
    ? PRODUCTS.wallets[walletSub]
    : PRODUCTS[mainCategory];

  return (
    <div className="bg-gradient-to-b from-amber-50 via-white to-amber-50 text-gray-900 min-h-screen">

      {/* ── Navigation ──────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-amber-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => goTo('home')} className="flex items-center gap-2">
            <img src={LOGO} alt="Brandio Leather" className="h-14 object-contain rounded" />
          </button>

          {/* desktop */}
          <div className="hidden md:flex gap-6 items-center">
            {NAV_ITEMS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => goTo(id)}
                className={`font-medium transition-colors text-sm ${
                  activeSection === id
                    ? 'text-amber-900 border-b-2 border-amber-600 pb-0.5'
                    : 'text-gray-700 hover:text-amber-900'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* mobile hamburger */}
          <button onClick={() => setIsMenuOpen(o => !o)} className="md:hidden p-2 rounded-lg bg-amber-100">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-amber-200 py-4 px-4 space-y-1">
            {NAV_ITEMS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => goTo(id)}
                className={`block w-full text-left font-medium py-2 px-4 rounded-lg transition ${
                  activeSection === id ? 'bg-amber-100 text-amber-900' : 'hover:bg-amber-50 text-gray-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── Hero Carousel ────────────────────────────────────────────────────── */}
      {activeSection === 'home' && (
        <section className="relative h-screen overflow-hidden">
          {heroSlides.map((slide, i) => (
            <div key={i} className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: currentSlide === i ? 1 : 0 }}>
              <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50" />
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
                <button onClick={() => goTo('products')} className="px-8 py-3 bg-gradient-to-r from-amber-700 to-yellow-600 text-white rounded-lg font-semibold hover:shadow-lg transition transform hover:scale-105">
                  Explore Products
                </button>
                <button onClick={() => goTo('contact')} className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition">
                  Get in Touch
                </button>
              </div>
            </div>
          </div>
          <button onClick={() => setCurrentSlide(p => (p - 1 + heroSlides.length) % heroSlides.length)} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/20 rounded-full hover:bg-white/40 transition">
            <ChevronLeft size={32} className="text-white" />
          </button>
          <button onClick={() => setCurrentSlide(p => (p + 1) % heroSlides.length)} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/20 rounded-full hover:bg-white/40 transition">
            <ChevronRight size={32} className="text-white" />
          </button>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
            {heroSlides.map((_, i) => (
              <button key={i} onClick={() => setCurrentSlide(i)} className={`h-3 rounded-full transition-all ${currentSlide === i ? 'bg-white w-8' : 'bg-white/50 w-3'}`} />
            ))}
          </div>
        </section>
      )}

      {/* ── About ────────────────────────────────────────────────────────────── */}
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
                { title: 'Premium Quality',     desc: 'Finest leather selection' },
                { title: 'Expert Craftsmanship', desc: 'Experienced artisans' },
                { title: 'Global Reach',         desc: '30+ Countries' },
                { title: 'Sustainability',       desc: 'Ethical practices' },
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

      {/* ── Products ─────────────────────────────────────────────────────────── */}
      {activeSection === 'products' && (
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold mb-2 text-amber-900">Our Products</h2>
            <p className="text-gray-600 mb-10 text-lg">Premium leather goods crafted for quality and style.</p>

            {/* ── Level 1: 4 main categories ── */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {MAIN_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => { setMainCategory(cat.id); if (cat.id === 'wallets') setWalletSub('bifold'); }}
                  className={`p-5 rounded-xl text-left transition-all duration-200 ${
                    mainCategory === cat.id
                      ? 'bg-amber-900 text-white shadow-lg scale-105'
                      : 'bg-white border border-amber-200 text-amber-900 hover:border-amber-500 hover:shadow-md'
                  }`}
                >
                  <div className="text-2xl mb-2">{cat.icon}</div>
                  <div className="font-bold text-sm">{cat.label}</div>
                  <div className={`text-xs mt-1 leading-tight ${mainCategory === cat.id ? 'text-amber-200' : 'text-gray-500'}`}>
                    {cat.desc}
                  </div>
                </button>
              ))}
            </div>

            {/* ── Level 2: wallet subcategory tabs (only visible when Wallets selected) ── */}
            {mainCategory === 'wallets' && (
              <div className="flex flex-wrap gap-2 mb-8 border-b border-amber-100 pb-6">
                {WALLET_SUBS.map(sub => (
                  <button
                    key={sub.id}
                    onClick={() => setWalletSub(sub.id)}
                    className={`px-5 py-2 rounded-full font-semibold text-sm transition-all ${
                      walletSub === sub.id
                        ? 'bg-amber-700 text-white shadow'
                        : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                    }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            )}

            {/* ── Breadcrumb ── */}
            <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-6">
              <span className="font-medium text-amber-900">
                {MAIN_CATEGORIES.find(c => c.id === mainCategory)?.label}
              </span>
              {mainCategory === 'wallets' && (
                <>
                  <ChevronRightSm size={14} />
                  <span className="font-medium text-amber-700">
                    {WALLET_SUBS.find(s => s.id === walletSub)?.label}
                  </span>
                </>
              )}
            </div>

            {/* ── Product grid ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {visibleProducts?.map(product => (
                <ProductCard key={product.id} product={product} onInquire={() => goTo('contact')} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Collections ──────────────────────────────────────────────────────── */}
      {activeSection === 'collections' && (
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl font-bold mb-4 text-amber-900">Collections</h2>
            <p className="text-gray-600 mb-12 text-lg">Curated leather ranges crafted around a unified design language.</p>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { name: 'Massini Collection', desc: 'European-style wallets with clean lines and premium full-grain leather. Slim profile, maximum function.', tag: 'Wallets · 3 styles' },
                { name: 'Executive Series',   desc: 'Boardroom-ready bags and organisers for the modern professional. Built to last the distance.', tag: 'Bags · Coming soon' },
                { name: 'Terra Collection',   desc: 'Earth-toned small leather goods inspired by natural tanning traditions. Sustainable & beautiful.', tag: 'Small Accessories · Coming soon' },
                { name: 'Voyage Line',        desc: 'Travel companions designed for global explorers — passport holders, organisers, and more.', tag: 'Travel · Coming soon' },
              ].map((col, i) => (
                <div key={i} className="bg-white border border-amber-200 rounded-xl p-8 hover:shadow-lg transition">
                  <span className="inline-block text-xs font-semibold bg-amber-100 text-amber-800 px-3 py-1 rounded-full mb-4">{col.tag}</span>
                  <h3 className="text-2xl font-bold text-amber-900 mb-3">{col.name}</h3>
                  <p className="text-gray-600 leading-relaxed">{col.desc}</p>
                  <button onClick={() => goTo('contact')} className="mt-6 px-5 py-2 bg-amber-900 text-white rounded-lg text-sm font-semibold hover:bg-amber-800 transition">
                    Enquire
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Packaging ────────────────────────────────────────────────────────── */}
      {activeSection === 'packaging' && (
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl font-bold mb-4 text-amber-900">Packaging</h2>
            <p className="text-gray-600 mb-12 text-lg">Custom packaging solutions that elevate your brand at the point of unboxing.</p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: '📦', title: 'Gift Boxes',        desc: 'Rigid gift boxes in custom sizes, colours, and finishes. Embossed or foil-stamped logos available.' },
                { icon: '🎀', title: 'Ribbon & Tissue',   desc: 'Branded ribbon, tissue paper, and belly-bands to complete the premium unboxing experience.' },
                { icon: '🏷️', title: 'Hang Tags & Labels', desc: 'Die-cut hang tags, QR-enabled labels, and care-instruction cards printed to your spec.' },
                { icon: '🛍️', title: 'Retail Bags',       desc: 'Paper and cotton carry bags with custom print, perfect for retail or trade-show display.' },
                { icon: '📋', title: 'Custom Inserts',    desc: 'Foam or card inserts cut to product shape for a snug, premium feel inside every box.' },
                { icon: '♻️', title: 'Eco Options',       desc: 'FSC-certified papers, recycled boards, and soy-based inks for sustainable brand packaging.' },
              ].map((item, i) => (
                <div key={i} className="bg-white border border-amber-200 rounded-xl p-6 hover:shadow-lg transition text-center">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-bold text-amber-900 text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 bg-amber-50 border border-amber-200 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-amber-900 mb-3">Need a Custom Packaging Quote?</h3>
              <p className="text-gray-600 mb-6">Send us your brief and we'll turn it around within 48 hours.</p>
              <button onClick={() => goTo('contact')} className="px-8 py-3 bg-gradient-to-r from-amber-900 to-yellow-700 text-white rounded-lg font-semibold hover:shadow-lg transition">
                Request a Quote
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ── Contact ──────────────────────────────────────────────────────────── */}
      {activeSection === 'contact' && (
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-12 text-amber-900">Get In Touch</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <form className="space-y-6">
                <input type="text"  placeholder="Your Name"     className="w-full p-4 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600" />
                <input type="email" placeholder="Your Email"    className="w-full p-4 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600" />
                <input type="text"  placeholder="Company Name"  className="w-full p-4 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600" />
                <textarea          placeholder="Your Message" rows="5" className="w-full p-4 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600" />
                <button className="w-full py-3 bg-gradient-to-r from-amber-900 to-yellow-700 text-white rounded-lg font-semibold hover:shadow-lg transition">
                  Send Message
                </button>
              </form>
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

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      <footer className="bg-gradient-to-r from-amber-900 to-yellow-800 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <img src={LOGO} alt="Brandio Leather" className="h-14 mb-4 brightness-200 rounded" />
              <p className="text-amber-100">Premium leather goods manufacturer and exporter since 2010.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-amber-100">
                {NAV_ITEMS.map(({ id, label }) => (
                  <li key={id}><button onClick={() => goTo(id)} className="hover:text-white transition">{label}</button></li>
                ))}
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
