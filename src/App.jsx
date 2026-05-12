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
function ProductCard({ product, imageMode = 'cover' }) {
  const [flipped, setFlipped] = useState(false);
  const hasInside = Boolean(product.insideImage);

  const imgBox = imageMode === 'contain'
    ? 'h-64 bg-gradient-to-br from-amber-50 to-white'
    : 'h-48 bg-amber-50';
  const imgFit = imageMode === 'contain'
    ? 'object-contain p-3'
    : 'object-cover';

  if (product.frontImage) {
    return (
      <div
        className={`bg-white rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-amber-100 ${hasInside ? 'cursor-pointer' : ''}`}
        onMouseEnter={hasInside ? () => setFlipped(true)  : undefined}
        onMouseLeave={hasInside ? () => setFlipped(false) : undefined}
        onClick={hasInside ? () => setFlipped(f => !f)    : undefined}
      >
        <div className={`relative overflow-hidden ${imgBox}`}>
          <img
            src={product.frontImage}
            alt={product.name}
            className={`absolute inset-0 w-full h-full ${imgFit} transition-opacity duration-300 ${flipped ? 'opacity-0' : 'opacity-100'}`}
          />
          {hasInside && (
            <img
              src={product.insideImage}
              alt={`${product.name} inside`}
              className={`absolute inset-0 w-full h-full ${imgFit} transition-opacity duration-300 ${flipped ? 'opacity-100' : 'opacity-0'}`}
            />
          )}
          {hasInside && (
            <div className={`absolute bottom-2 right-2 text-xs px-2 py-1 rounded bg-black/50 text-white transition-opacity duration-300 ${flipped ? 'opacity-100' : 'opacity-0'}`}>
              Inside View
            </div>
          )}
          {product.sku && (
            <div className="absolute top-2 left-2 text-xs px-2 py-1 rounded bg-amber-900/80 text-white font-mono">
              {product.sku}
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold text-gray-900 leading-snug">{product.name}</h3>
          {product.collection && <p className="text-xs text-amber-700 mt-1">{product.collection}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden hover:shadow-xl transition transform hover:scale-105 duration-300 border border-amber-100">
      <div className="h-36 bg-gradient-to-br from-amber-100 to-yellow-50 flex items-center justify-center text-6xl">{product.image}</div>
      <div className="p-4">
        <h3 className="font-bold text-gray-900">{product.name}</h3>
      </div>
    </div>
  );
}

/* ─── Data ──────────────────────────────────────────────────────────────────── */
const PRODUCTS = {
  wallets: {
    bifold: [
      { id: 64,   name: 'European Size Bifold', sku: 'MC-0064', collection: 'Massini Collection · Paper',              frontImage: '/MC-0064.png',  insideImage: '/MC-0064_inside.png' },
      { id: 123,  name: 'American Size Bifold', sku: 'OS-0123', collection: 'Osaka Collection · Carbon Fiber',         frontImage: '/OS-0123.png',  insideImage: '/OS-0123_inside.png' },
      { id: 3035, name: 'American Size Bifold', sku: 'PA-3035', collection: 'Palermo Collection · Yaali New York',     frontImage: '/PA-3035.png',  insideImage: '/PA-3035_inside.png' },
      { id: 2286, name: 'American Size Bifold', sku: 'MN-2286', collection: 'Munich Collection · Yacht',               frontImage: '/MN-2286.png',  insideImage: '/MN-2286_inside.png' },
      { id: 2255, name: 'American Size Bifold', sku: 'CH-2255', collection: 'Chicago Collection · Massini Woven',      frontImage: '/CH-2255.png',  insideImage: '/CH-2255_inside.png' },
      { id: 2232, name: 'American Size Bifold', sku: 'BA-2232', collection: 'Bali Collection · Brown Stripe',          frontImage: '/BA-2232.png',  insideImage: '/BA-2232_inside.png' },
      { id: 2106, name: 'American Size Bifold', sku: 'MI-2106', collection: 'Micro Collection · Textured Black',       frontImage: '/MI-2106.png',  insideImage: '/MI-2106_inside.png' },
      { id: 1146, name: 'American Size Bifold', sku: 'CN-1146', collection: 'Canton Collection · Classic Black',       frontImage: '/CN-1146.png',  insideImage: '/CN-1146_inside.png' },
      { id: 5006, name: 'American Size Bifold', sku: 'CA-5006', collection: 'Cancun Collection · Dimbill Stripe',      frontImage: '/CA-5006.png',  insideImage: '/CA-5006_inside.png' },
    ],
    trifold: [
      { id: 65,   name: 'European Size Trifold', sku: 'MC-0065', collection: 'Massini Collection · Paper',              frontImage: '/MC-0065.png',  insideImage: '/MC-0065_inside.png' },
      { id: 124,  name: 'American Size Trifold', sku: 'OS-0124', collection: 'Osaka Collection · Carbon Fiber',         frontImage: '/OS-0124.png',  insideImage: '/OS-0124_inside.png' },
      { id: 3036, name: 'American Size Trifold', sku: 'PA-3036', collection: 'Palermo Collection · Yaali New York',     frontImage: '/PA-3036.png',  insideImage: '/PA-3036_inside.png' },
      { id: 2287, name: 'American Size Trifold', sku: 'MN-2287', collection: 'Munich Collection · Yacht',               frontImage: '/MN-2287.png',  insideImage: '/MN-2287_inside.png' },
      { id: 2256, name: 'American Size Trifold', sku: 'CH-2256', collection: 'Chicago Collection · Massini Woven',      frontImage: '/CH-2256.png',  insideImage: '/CH-2256_inside.png' },
      { id: 2233, name: 'American Size Trifold', sku: 'BA-2233', collection: 'Bali Collection · Brown Stripe',          frontImage: '/BA-2233.png',  insideImage: '/BA-2233_inside.png' },
      { id: 2107, name: 'American Size Trifold', sku: 'MI-2107', collection: 'Micro Collection · Textured Black',       frontImage: '/MI-2107.png',  insideImage: '/MI-2107_inside.png' },
      { id: 1147, name: 'American Size Trifold', sku: 'CN-1147', collection: 'Canton Collection · Classic Black',       frontImage: '/CN-1147.png',  insideImage: '/CN-1147_inside.png' },
      { id: 5007, name: 'American Size Trifold', sku: 'CA-5007', collection: 'Cancun Collection · Dimbill Stripe',      frontImage: '/CA-5007.png',  insideImage: '/CA-5007_inside.png' },
    ],
    'note-case': [
      { id: 61,   name: 'European Size Note Case', sku: 'MC-0061', collection: 'Massini Collection · Paper',            frontImage: '/MC-0061.png',  insideImage: '/MC-0061_inside.png' },
    ],
    'zip-around': [
      { id: 125,  name: 'American Size Zip-around', sku: 'OS-0125', collection: 'Osaka Collection · Carbon Fiber',     frontImage: '/OS-0125.png',  insideImage: '/OS-0125_inside.png' },
      { id: 3037, name: 'American Size Zip-around', sku: 'PA-3037', collection: 'Palermo Collection · Yaali New York', frontImage: '/PA-3037.png',  insideImage: '/PA-3037_inside.png' },
      { id: 2288, name: 'American Size Zip-around', sku: 'MN-2288', collection: 'Munich Collection · Yacht',           frontImage: '/MN-2288.png',  insideImage: '/MN-2288_inside.png' },
      { id: 2257, name: 'American Size Zip-around', sku: 'CH-2257', collection: 'Chicago Collection · Massini Woven',  frontImage: '/CH-2257.png',  insideImage: '/CH-2257_inside.png' },
      { id: 2234, name: 'American Size Zip-around', sku: 'BA-2234', collection: 'Bali Collection · Brown Stripe',      frontImage: '/BA-2234.png',  insideImage: '/BA-2234_inside.png' },
      { id: 2108, name: 'American Size Zip-around', sku: 'MI-2108', collection: 'Micro Collection · Textured Black',   frontImage: '/MI-2108.png',  insideImage: '/MI-2108_inside.png' },
      { id: 1148, name: 'American Size Zip-around', sku: 'CN-1148', collection: 'Canton Collection · Classic Black',   frontImage: '/CN-1148.png',  insideImage: '/CN-1148_inside.png' },
      { id: 5008, name: 'American Size Zip-around', sku: 'CA-5008', collection: 'Cancun Collection · Dimbill Stripe',  frontImage: '/CA-5008.png',  insideImage: '/CA-5008_inside.png' },
    ],
  },
  bags: [
    { id: 1, name: 'Classic Leather Messenger', image: '🎒' },
    { id: 2, name: 'Premium Laptop Bag',         image: '💼' },
    { id: 3, name: 'Vintage Travel Duffel',      image: '👜' },
    { id: 4, name: 'Leather Crossbody',          image: '🎒' },
    { id: 5, name: 'Business Briefcase',         image: '💼' },
  ],
  'small-accessories': {
    'card-cases': [
      { id: 991,   name: 'Card Case · Magnet + ID Window', sku: 'ML-991',  collection: 'Yaali Small Goods · Magnet',     frontImage: '/ML-991.png',  insideImage: '/ML-991_inside.png' },
      { id: 996,   name: 'Card Case · Magnet Close',        sku: 'ML-996',  collection: 'Yaali Small Goods · Magnet',     frontImage: '/ML-996.png',  insideImage: '/ML-996_inside.png' },
      { id: 102,   name: 'Black Leather Card Case',          sku: 'Y-102',  collection: 'Yaali Small Goods · Classic',    frontImage: '/Y-102.png',   insideImage: '/Y-102_inside.png' },
      { id: 109,   name: 'RFID Cardholder',                  sku: 'Y-109',  collection: 'Yaali Small Goods · RFID',       frontImage: '/Y-109.png',   insideImage: '/Y-109_inside.png' },
      { id: 114,   name: 'Card Case with ID Slot',           sku: 'Y-114',  collection: 'Yaali Small Goods · ID Slot',    frontImage: '/Y-114.png',   insideImage: '/Y-114_inside.png' },
      { id: 115,   name: 'Metal Card Holder',                sku: 'Y-115',  collection: 'Yaali Small Goods · Metal',      frontImage: '/Y-115.png',   insideImage: '/Y-115_inside.png' },
      { id: 3804,  name: 'Card Case with ID Slot',           sku: 'Y-3804', collection: 'Yaali Small Goods · ID Slot',    frontImage: '/Y-3804.png',  insideImage: '/Y-3804_inside.png' },
      { id: 3805,  name: 'Slotted Leather Card Case',        sku: 'Y-3805', collection: 'Yaali Small Goods · Slots',      frontImage: '/Y-3805.png',  insideImage: '/Y-3805_inside.png' },
      { id: 3810,  name: 'Card Case Pouch · ID Slot',        sku: 'Y-3810', collection: 'Yaali Small Goods · Pouch',      frontImage: '/Y-3810.png',  insideImage: '/Y-3810_inside.png' },
      { id: 3833,  name: 'Zip-around Card Case · ID Window', sku: 'Y-3833', collection: 'Yaali Small Goods · Zip-around', frontImage: '/Y-3833.png',  insideImage: '/Y-3833_inside.png' },
    ],
    'money-clip': [
      { id: 103,   name: 'Sleek Card Case · Money Clip',     sku: 'Y-103',  collection: 'Yaali Small Goods · Money Clip', frontImage: '/Y-103.png',   insideImage: '/Y-103_inside.png' },
      { id: 993,   name: 'Card Case · Metal Money Clip',     sku: 'Y-993',  collection: 'Yaali Small Goods · Money Clip', frontImage: '/Y-993.png',   insideImage: '/Y-993_inside.png' },
      { id: 3814,  name: 'Cardholder · Metal Clip',          sku: 'Y-3814', collection: 'Yaali Small Goods · Money Clip', frontImage: '/Y-3814.png',  insideImage: '/Y-3814_inside.png' },
    ],
    'coin-cases': [
      { id: 131,   name: 'Ladies Coin Case',                 sku: 'Y-131',  collection: 'Yaali Small Goods · Coin',       frontImage: '/Y-131.png' },
      { id: 132,   name: 'Ladies Coin Case',                 sku: 'Y-132',  collection: 'Yaali Small Goods · Coin',       frontImage: '/Y-132.png' },
      { id: 133,   name: 'Ladies Coin Case',                 sku: 'Y-133',  collection: 'Yaali Small Goods · Coin',       frontImage: '/Y-133.png' },
      { id: 134,   name: 'Ladies Coin Case',                 sku: 'Y-134',  collection: 'Yaali Small Goods · Coin',       frontImage: '/Y-134.png' },
    ],
  },
  travel: [
    { id: 45, name: 'Zip Passport Holder',     sku: 'YL-45', collection: 'Yaali Travel · Smooth Black',    frontImage: '/YL-45.png', insideImage: '/YL-45_inside.png' },
    { id: 47, name: 'Vintage Passport Holder', sku: 'YL-47', collection: 'Yaali Travel · Vintage Brown',   frontImage: '/YL-47.png', insideImage: '/YL-47_inside.png' },
    { id: 51, name: 'Slim Passport Holder',    sku: 'YL-51', collection: 'Yaali Travel · Classic Black',   frontImage: '/YL-51.png', insideImage: '/YL-51_inside.png' },
    { id: 77, name: 'Zip Travel Wallet',       sku: 'YL-77', collection: 'Yaali Travel · Minimal Black',   frontImage: '/YL-77.png', insideImage: '/YL-77_inside.png' },
  ],
};

const MAIN_CATEGORIES = [
  { id: 'wallets',           label: 'Wallets',              icon: '👛', desc: 'Bifold · Trifold · Note Case · Zip-around' },
  { id: 'bags',              label: 'Bags',                 icon: '🎒', desc: 'Messenger · Laptop · Duffel · Briefcase' },
  { id: 'small-accessories', label: 'Small Accessories',    icon: '💳', desc: 'Card Cases · Money Clip · Coin Cases' },
  { id: 'travel',            label: 'Travel Accessories',   icon: '✈️', desc: 'Passport Holders · Travel Wallets' },
];

const WALLET_SUBS = [
  { id: 'bifold',     label: 'Bifold' },
  { id: 'trifold',    label: 'Trifold' },
  { id: 'note-case',  label: 'Note Case' },
  { id: 'zip-around', label: 'Zip-around' },
];

const SMALL_ACC_SUBS = [
  { id: 'card-cases', label: 'Card Cases' },
  { id: 'money-clip', label: 'Money Clip' },
  { id: 'coin-cases', label: 'Coin Cases' },
];

/* ─── App ───────────────────────────────────────────────────────────────────── */
export default function BrandioLeatherWebsite() {
  const [isMenuOpen,       setIsMenuOpen]       = useState(false);
  const [activeSection,    setActiveSection]    = useState('home');
  const [mainCategory,     setMainCategory]     = useState('wallets');
  const [walletSub,        setWalletSub]        = useState('bifold');
  const [smallAccSub,      setSmallAccSub]      = useState('card-cases');
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
  let visibleProducts;
  if (mainCategory === 'wallets')                visibleProducts = PRODUCTS.wallets[walletSub];
  else if (mainCategory === 'small-accessories') visibleProducts = PRODUCTS['small-accessories'][smallAccSub];
  else                                           visibleProducts = PRODUCTS[mainCategory];

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
                  onClick={() => {
                    setMainCategory(cat.id);
                    if (cat.id === 'wallets')           setWalletSub('bifold');
                    if (cat.id === 'small-accessories') setSmallAccSub('card-cases');
                  }}
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

            {/* ── Level 2: subcategory pills (Wallets / Small Accessories) ── */}
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
            {mainCategory === 'small-accessories' && (
              <div className="flex flex-wrap gap-2 mb-8 border-b border-amber-100 pb-6">
                {SMALL_ACC_SUBS.map(sub => (
                  <button
                    key={sub.id}
                    onClick={() => setSmallAccSub(sub.id)}
                    className={`px-5 py-2 rounded-full font-semibold text-sm transition-all ${
                      smallAccSub === sub.id
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
              {mainCategory === 'small-accessories' && (
                <>
                  <ChevronRightSm size={14} />
                  <span className="font-medium text-amber-700">
                    {SMALL_ACC_SUBS.find(s => s.id === smallAccSub)?.label}
                  </span>
                </>
              )}
            </div>

            {/* ── Product grid ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {visibleProducts?.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  imageMode={mainCategory === 'travel' ? 'contain' : 'cover'}
                />
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
                { code: 'MC', name: 'Massini Collection', size: 'European Size', material: 'Paper Packaging',          styles: 'Note Case · Bifold · Trifold', hero: '/MC-0064.png',  desc: 'European-style wallets with clean lines and premium full-grain leather. Slim profile, maximum function.' },
                { code: 'OS', name: 'Osaka Collection',   size: 'American Size', material: 'Carbon Fiber · Tin Box',   styles: 'Bifold · Trifold · Zip-around', hero: '/OS-0123.png', desc: 'Modern carbon-fiber-pattern wallets shipped in a premium tin box. Bold, technical, durable.' },
                { code: 'PA', name: 'Palermo Collection', size: 'American Size', material: 'Black / Burgundy',          styles: 'Bifold · Trifold · Zip-around', hero: '/PA-3035.png', desc: 'Two-tone black and burgundy wallets under the Yaali New York label. Classic colour story, contemporary cut.' },
                { code: 'MN', name: 'Munich Collection',  size: 'American Size', material: 'Yacht Leather',            styles: 'Bifold · Trifold · Zip-around', hero: '/MN-2286.png', desc: 'Sleek black yacht-leather wallets engineered for daily luxury. Yacht line packaging included.' },
                { code: 'CH', name: 'Chicago Collection', size: 'American Size', material: 'Massini Woven Leather',     styles: 'Bifold · Trifold · Zip-around', hero: '/CH-2255.png', desc: 'Hand-woven leather wallets in deep black. Texture, depth, and Brandio New York packaging.' },
                { code: 'BA', name: 'Bali Collection',    size: 'American Size', material: 'Brown Leather · Stripe',    styles: 'Bifold · Trifold · Zip-around', hero: '/BA-2232.png', desc: 'Minimalist brown leather wallets with a signature navy-and-cream stripe detail. Branded with the Brandio mark.' },
                { code: 'MI', name: 'Micro Collection',   size: 'American Size', material: 'Textured Black · Leather',  styles: 'Bifold · Trifold · Zip-around', hero: '/MI-2106.png', desc: 'Compact black wallets with a textured weave panel and smooth leather trim. Subtle Branded mark, urban edge.' },
                { code: 'CN', name: 'Canton Collection',  size: 'American Size', material: 'Classic Black Leather',     styles: 'Bifold · Trifold · Zip-around', hero: '/CN-1146.png', desc: 'Pure black leather wallets with diagonal corner stitching. Understated Brandio branding for a clean, professional look.' },
                { code: 'CA', name: 'Cancun Collection',  size: 'American Size', material: 'Dimbill · Red & Navy Stripe', styles: 'Bifold · Trifold · Zip-around', hero: '/CA-5006.png', desc: 'Black leather wallets with a bold red, cream, and navy striped accent. The signature Dimbill line, vibrant and refined.' },
                { code: 'YL', name: 'Yaali Small Goods',  size: 'Compact',        material: 'Card Cases · Money Clip · Coin', styles: '17 styles across 3 categories', hero: '/Y-103.png',     desc: 'Card holders, money-clip wallets, RFID cases, and ladies coin cases — the everyday-carry range, refined.', cat: 'small-accessories', ctaLabel: 'View Small Goods' },
              ].map(col => (
                <div key={col.code} className="bg-white border border-amber-200 rounded-xl overflow-hidden hover:shadow-lg transition flex flex-col">
                  <div className="h-48 bg-amber-50 overflow-hidden">
                    <img
                      src={col.hero}
                      alt={col.name}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: '50% 75%' }}
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className="text-xs font-mono font-bold bg-amber-900 text-white px-2 py-1 rounded">{col.code}</span>
                      <span className="text-xs font-semibold bg-amber-100 text-amber-800 px-2 py-1 rounded-full">{col.size}</span>
                      <span className="text-xs font-semibold bg-amber-50 text-amber-700 px-2 py-1 rounded-full border border-amber-200">{col.material}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-amber-900 mb-2">{col.name}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm mb-4">{col.desc}</p>
                    <p className="text-xs text-gray-500 mb-4 mt-auto">{col.styles}</p>
                    <button
                      onClick={() => {
                        const cat = col.cat || 'wallets';
                        setMainCategory(cat);
                        if (cat === 'small-accessories') setSmallAccSub('card-cases');
                        goTo('products');
                      }}
                      className="px-5 py-2 bg-amber-900 text-white rounded-lg text-sm font-semibold hover:bg-amber-800 transition self-start"
                    >
                      {col.ctaLabel || 'View Wallets'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Packaging ────────────────────────────────────────────────────────── */}
      {activeSection === 'packaging' && (
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold mb-4 text-amber-900">Packaging</h2>
            <p className="text-gray-600 mb-12 text-lg">Each collection ships in its own branded presentation. Real packaging from our current production runs.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { code: 'OS', name: 'Osaka — Tin Box',           desc: 'Premium tin-box packaging for the Osaka carbon-fiber range.', image: '/OS_tin_box_packaging.png' },
                { code: 'PA', name: 'Palermo — Yaali New York',  desc: 'Yaali New York branded gift box for the Palermo range.',     image: '/PA_packaging.png' },
                { code: 'PA', name: 'Palermo — In-Box View',     desc: 'Palermo wallet seated in its Yaali New York presentation box.', image: '/PA_in_box.png' },
                { code: 'MN', name: 'Munich — Yacht Box',        desc: 'Yacht-line presentation box for the Munich black collection.', image: '/MN_packaging.png' },
                { code: 'MN', name: 'Munich — In-Box View',      desc: 'Munich wallet seated in its Yacht-line presentation box.',    image: '/MN_in_box.png' },
                { code: 'CH', name: 'Chicago — Brandio New York', desc: 'Brandio New York branded box for the Chicago woven range.',  image: '/CH_packaging.png' },
                { code: 'CH', name: 'Chicago — In-Box View',     desc: 'Chicago woven wallet seated in its Brandio New York box.',    image: '/CH_in_box.png' },
                { code: 'BA', name: 'Bali — Brandio Box',         desc: 'Branded Brandio gift box for the Bali brown-stripe range.',  image: '/Brandio_Packaging.png' },
                { code: 'MI', name: 'Micro — Branded Gift Box',   desc: 'Premium blue gift box for the Micro textured-black range. RFID protected.', image: '/Branded_Packaging.png' },
                { code: 'CA', name: 'Cancun — Dimbill Box',       desc: 'Dimbill-branded gift box for the Cancun striped-accent range.', image: '/Dimbill_Packaging.png' },
              ].map((item, i) => (
                <div key={i} className="bg-white border border-amber-200 rounded-xl overflow-hidden hover:shadow-lg transition group">
                  <div className="h-64 bg-gradient-to-br from-amber-50 to-white overflow-hidden flex items-center justify-center p-4">
                    <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono font-bold bg-amber-900 text-white px-2 py-0.5 rounded">{item.code}</span>
                      <h3 className="font-bold text-amber-900">{item.name}</h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-amber-50 border border-amber-200 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-amber-900 mb-3">Need Custom Packaging?</h3>
              <p className="text-gray-600 mb-6">Tin boxes, branded gift boxes, custom inserts, hang tags and more — built to your brand spec.</p>
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
