import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronLeft, ChevronRight, Phone, Mail, MapPin, ChevronRight as ChevronRightSm } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';

/* ─── Custom cursor (desktop only) ─────────────────────────────────────────── */
function CustomCursor() {
  const x  = useMotionValue(-100);
  const y  = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 600, damping: 40, mass: 0.4 });
  const [grow, setGrow] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    document.documentElement.classList.add('custom-cursor');
    const onMove = e => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = e.target;
      setGrow(!!(t && t.closest && t.closest('button, a, [data-grow]')));
    };
    const onLeave = () => setVisible(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    return () => {
      document.documentElement.classList.remove('custom-cursor');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          html.custom-cursor, html.custom-cursor * { cursor: none !important; }
        }
      `}</style>
      <motion.div
        aria-hidden
        style={{ x: sx, y: sy, opacity: visible ? 1 : 0 }}
        animate={{ scale: grow ? 2.6 : 1 }}
        transition={{ scale: { type: 'spring', stiffness: 360, damping: 28 } }}
        className="pointer-events-none fixed top-0 left-0 w-3 h-3 -ml-1.5 -mt-1.5 rounded-full bg-amber-700 mix-blend-difference z-[9999] hidden md:block"
      />
      <motion.div
        aria-hidden
        style={{ x: sx, y: sy, opacity: visible ? 0.5 : 0 }}
        animate={{ scale: grow ? 1.6 : 1 }}
        transition={{ scale: { type: 'spring', stiffness: 200, damping: 22 } }}
        className="pointer-events-none fixed top-0 left-0 w-10 h-10 -ml-5 -mt-5 rounded-full border border-amber-700 z-[9998] hidden md:block"
      />
    </>
  );
}

/* ─── Loading sequence ─────────────────────────────────────────────────────── */
function LoadingReveal({ logo }) {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGone(true), 1900);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[10000] bg-gradient-to-b from-amber-100 via-amber-50 to-white flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            <img
              src={logo}
              alt="Brandio"
              className="h-24 md:h-28 mb-6 drop-shadow-md"
            />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
              style={{ originX: 0 }}
              className="h-px w-48 bg-amber-900/25"
            />
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-amber-900 text-xs tracking-[0.4em] mt-6 font-light"
            >
              CRAFTED LEATHER · SINCE 2007
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Product Alcove Modal — luxury detail view ────────────────────────────── */
function ProductAlcove({ product, onClose }) {
  const [viewIndex, setViewIndex] = useState(0);

  // build the list of views: explicit `views` array, else front + inside fallback
  const views = product?.views
    ? product.views
    : product?.insideImage
      ? [
          { src: product.frontImage,  label: 'Front' },
          { src: product.insideImage, label: (product.altLabel || 'Inside View').replace(' View', '') },
        ]
      : product?.frontImage
        ? [{ src: product.frontImage, label: 'Front' }]
        : [];

  useEffect(() => { setViewIndex(0); }, [product]);

  useEffect(() => {
    if (!product) return;            // ← only lock scroll when the modal is open
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [product, onClose]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9990] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-12"
          onClick={onClose}
        >
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            onClick={onClose}
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition z-10"
            aria-label="Close"
            data-grow
          >
            <X size={28} />
          </motion.button>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -10 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-5xl bg-gradient-to-b from-amber-950 to-stone-950 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Image side */}
            <div className="relative md:w-3/5 aspect-square md:aspect-auto bg-gradient-to-br from-amber-100/10 to-stone-900 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={viewIndex}
                  src={views[viewIndex]?.src || product.frontImage}
                  alt={product.name}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 w-full h-full object-contain p-6 md:p-12"
                />
              </AnimatePresence>
              {product.sku && (
                <div className="absolute top-5 left-5 text-[10px] tracking-[0.3em] text-amber-200/70 font-mono">
                  {product.sku}
                </div>
              )}
              {views.length > 1 && (
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1 bg-white/10 backdrop-blur-md rounded-full p-1">
                  {views.map((v, i) => (
                    <button
                      key={v.label}
                      onClick={() => setViewIndex(i)}
                      data-grow
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                        i === viewIndex ? 'bg-white text-stone-900' : 'text-white/80 hover:text-white'
                      }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info side */}
            <div className="md:w-2/5 p-8 md:p-12 flex flex-col text-amber-50 overflow-y-auto">
              {product.collection && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  className="text-[10px] tracking-[0.35em] text-amber-300/80 uppercase mb-3"
                >
                  {product.collection}
                </motion.p>
              )}
              <motion.h2
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="text-3xl md:text-4xl font-bold leading-tight mb-6"
              >
                {product.name}
              </motion.h2>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, delay: 0.45 }}
                style={{ originX: 0 }}
                className="h-px w-16 bg-amber-300/40 mb-6"
              />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="text-amber-100/80 text-sm leading-relaxed space-y-3 mb-8"
              >
                <p>Premium leather, hand-finished by our artisans. Engineered for daily luxury and built to last decades.</p>
                {product.colors && (
                  <div className="flex flex-wrap gap-x-6 gap-y-1 pt-1 text-xs">
                    {product.collection && (
                      <span><span className="text-amber-300/60">Leather&nbsp;</span><span className="text-amber-100">{product.collection}</span></span>
                    )}
                    <span><span className="text-amber-300/60">Colours&nbsp;</span><span className="text-amber-100">{product.colors}</span></span>
                  </div>
                )}
                <ul className="text-xs space-y-1.5 text-amber-200/70 pt-2">
                  <li>· Reinforced edge stitching</li>
                  <li>· Custom branding & packaging available</li>
                  <li>· MOQ &amp; bulk pricing on request</li>
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mt-auto pt-6"
              >
                <a
                  href="#contact"
                  onClick={onClose}
                  data-grow
                  className="block w-full text-center px-6 py-3 bg-gradient-to-r from-amber-600 to-yellow-500 text-stone-950 rounded-lg font-bold text-sm tracking-wide hover:shadow-lg hover:shadow-amber-500/30 transition"
                >
                  Request a Sample
                </a>
                <p className="text-[10px] text-amber-200/40 text-center mt-3 tracking-wider">
                  ESC OR CLICK OUTSIDE TO CLOSE
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Reusable motion helpers ──────────────────────────────────────────────── */

// 3D cursor-tracked tilt — the Apple signature
function useTilt(intensity = 8, springCfg = { stiffness: 220, damping: 22 }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rX = useTransform(y, [-0.5, 0.5], [intensity, -intensity]);
  const rY = useTransform(x, [-0.5, 0.5], [-intensity, intensity]);
  const rotateX = useSpring(rX, springCfg);
  const rotateY = useSpring(rY, springCfg);

  const handlers = {
    onMouseMove: e => {
      const r = e.currentTarget.getBoundingClientRect();
      x.set((e.clientX - r.left) / r.width  - 0.5);
      y.set((e.clientY - r.top)  / r.height - 0.5);
    },
    onMouseLeave: () => { x.set(0); y.set(0); },
  };
  return { rotateX, rotateY, handlers };
}

// Magnetic button — cursor pull-in
function MagneticButton({ children, className, onClick, strength = 0.3 }) {
  const x  = useMotionValue(0);
  const y  = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 14 });
  const sy = useSpring(y, { stiffness: 200, damping: 14 });

  return (
    <motion.button
      style={{ x: sx, y: sy }}
      onMouseMove={e => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width  / 2)) * strength);
        y.set((e.clientY - (r.top  + r.height / 2)) * strength);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  );
}

// Word-by-word stagger for hero titles
function StaggerWords({ text, className, delayBase = 0 }) {
  return (
    <span className={className}>
      {text.split(' ').map((word, i) => (
        <motion.span
          key={`${text}-${i}`}
          style={{ display: 'inline-block', marginRight: '0.28em', willChange: 'transform, opacity' }}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: delayBase + i * 0.07 }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

const LOGO = 'https://raw.githubusercontent.com/Yusufsayed/brandio-leather-website/main/brandio-logo-final.png';
const FACTORY_FRONT = 'https://raw.githubusercontent.com/Yusufsayed/brandio-leather-website/main/42545c7a-e2a7-4009-82f2-f1dc6a009b4c.JPG';
const FACTORY_SIDE = 'https://raw.githubusercontent.com/Yusufsayed/brandio-leather-website/main/c9ae221d-0bd2-42b0-b23e-390863a98187.JPG';

const WA_NUMBER = '919831335778';
const WA_TEMPLATE_MSG = `Hello Brandio Team,\n\nI am interested in your leather goods manufacturing services.\n\nName: \nCompany: \nCountry: \n\nI would like information regarding:\n☐ Product Catalog\n☐ MOQ\n☐ Custom Branding\n☐ Pricing\n☐ Samples\n☐ Book a Meeting\n\nLooking forward to hearing from you.`;
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_TEMPLATE_MSG)}`;
const CALENDLY_LINK = 'https://calendly.com/brandioleather';

const NAV_ITEMS = [
  { id: 'home',        label: 'Home' },
  { id: 'about',       label: 'About' },
  { id: 'products',    label: 'Products' },
  { id: 'collections', label: 'Collections' },
  { id: 'packaging',   label: 'Packaging' },
  { id: 'contact',     label: 'Contact' },
];

/* ─── Collection card (Collections page) ──────────────────────────────────── */
function CollectionCard({ col, index, onOpen }) {
  const [hovered, setHovered] = useState(false);
  const { rotateX, rotateY, handlers } = useTilt(6);

  return (
    <div style={{ perspective: 1400 }}>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (index % 3) * 0.08 }}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={e => { setHovered(false); handlers.onMouseLeave(e); }}
        onMouseMove={handlers.onMouseMove}
        onClick={() => onOpen && onOpen(col)}
        data-grow
        className={`bg-white border border-amber-200 rounded-2xl overflow-hidden flex flex-col cursor-pointer transition-shadow duration-500 ${hovered ? 'shadow-2xl' : 'shadow-sm'}`}
      >
        <div className="h-48 bg-amber-50 overflow-hidden relative" style={{ transformStyle: 'preserve-3d' }}>
          {/* default — wallet band, lower portion (texture + brand) — old-commit look */}
          <motion.img
            src={col.cover}
            alt={col.name}
            initial={false}
            animate={{ opacity: hovered ? 0 : 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ translateZ: 30, objectPosition: '50% 75%' }}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* hover reveal — full collection catalogue photo */}
          <motion.img
            src={col.hero}
            alt={`${col.name} catalogue`}
            initial={false}
            animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 1.05 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ translateZ: 30 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <motion.span
            style={{ translateZ: 60 }}
            className="absolute top-3 left-3 text-xs font-mono font-bold bg-amber-900 text-white px-2 py-1 rounded shadow"
          >
            {col.code}
          </motion.span>
          <motion.div
            style={{ translateZ: 60 }}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
            transition={{ duration: 0.35 }}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.3em] text-white bg-black/55 backdrop-blur-sm px-3 py-1.5 rounded-full whitespace-nowrap"
          >
            VIEW COLLECTION
          </motion.div>
        </div>
        <div className="p-5 flex-1 flex flex-col" style={{ transformStyle: 'preserve-3d' }}>
          <motion.h3 style={{ translateZ: 24 }} className="text-xl font-bold text-amber-900 mb-1">{col.name}</motion.h3>
          <motion.p style={{ translateZ: 20 }} className="text-xs text-amber-700 mb-3">{col.size} · {col.material}</motion.p>
          <motion.p style={{ translateZ: 14 }} className="text-xs text-gray-500 mt-auto">{col.styles}</motion.p>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Collection Modal — full catalogue view ──────────────────────────────── */
function CollectionModal({ collection, onClose, onView }) {
  useEffect(() => {
    if (!collection) return;
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [collection, onClose]);

  return (
    <AnimatePresence>
      {collection && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9990] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-12"
          onClick={onClose}
        >
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            onClick={onClose}
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition z-10"
            aria-label="Close"
            data-grow
          >
            <X size={28} />
          </motion.button>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -10 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-5xl bg-gradient-to-b from-amber-950 to-stone-950 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Image side */}
            <div className="relative md:w-3/5 bg-gradient-to-br from-amber-100/10 to-stone-900 overflow-hidden flex items-center justify-center">
              <motion.img
                key={collection.code}
                src={collection.hero}
                alt={collection.name}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full object-contain p-4 md:p-8 max-h-[50vh] md:max-h-[90vh]"
              />
              <div className="absolute top-5 left-5 text-[10px] tracking-[0.3em] text-amber-200/70 font-mono">
                {collection.code}
              </div>
            </div>

            {/* Info side */}
            <div className="md:w-2/5 p-8 md:p-12 flex flex-col text-amber-50 overflow-y-auto">
              <motion.p
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-[10px] tracking-[0.35em] text-amber-300/80 uppercase mb-3"
              >
                Brandio Collection
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="text-3xl md:text-4xl font-bold leading-tight mb-6"
              >
                {collection.name}
              </motion.h2>
              <motion.div
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, delay: 0.45 }} style={{ originX: 0 }}
                className="h-px w-16 bg-amber-300/40 mb-6"
              />
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="text-amber-100/80 text-sm leading-relaxed mb-6"
              >
                <p>{collection.desc}</p>
                <div className="flex flex-wrap gap-x-6 gap-y-1 pt-4 text-xs">
                  <span><span className="text-amber-300/60">Size&nbsp;</span><span className="text-amber-100">{collection.size}</span></span>
                  <span><span className="text-amber-300/60">Leather&nbsp;</span><span className="text-amber-100">{collection.material}</span></span>
                </div>
                <p className="text-xs text-amber-200/70 pt-2">Styles: {collection.styles}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mt-auto pt-6"
              >
                <button
                  onClick={onView}
                  data-grow
                  className="block w-full text-center px-6 py-3 bg-gradient-to-r from-amber-600 to-yellow-500 text-stone-950 rounded-lg font-bold text-sm tracking-wide hover:shadow-lg hover:shadow-amber-500/30 transition"
                >
                  View Wallets in this Collection
                </button>
                <p className="text-[10px] text-amber-200/40 text-center mt-3 tracking-wider">
                  ESC OR CLICK OUTSIDE TO CLOSE
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Packaging card — hover-flip between box & in-box views ───────────────── */
function PackagingCard({ item, index }) {
  const [flipped, setFlipped] = useState(false);
  const hasInside = Boolean(item.insideImage);
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: (index % 3) * 0.08 }}
      whileHover={{ y: -4 }}
      onMouseEnter={() => hasInside && setFlipped(true)}
      onMouseLeave={() => hasInside && setFlipped(false)}
      onClick={() => hasInside && setFlipped(f => !f)}
      data-grow
      className={`bg-white border border-amber-200 rounded-xl overflow-hidden hover:shadow-xl transition-shadow group ${hasInside ? 'cursor-pointer' : ''}`}
    >
      <div className="relative h-64 bg-gradient-to-br from-amber-50 to-white overflow-hidden">
        <img
          src={item.frontImage}
          alt={item.name}
          className={`absolute inset-0 w-full h-full object-contain p-4 transition-opacity duration-300 ${flipped ? 'opacity-0' : 'opacity-100'}`}
        />
        {hasInside && (
          <img
            src={item.insideImage}
            alt={`${item.name} in box`}
            className={`absolute inset-0 w-full h-full object-contain p-4 transition-opacity duration-300 ${flipped ? 'opacity-100' : 'opacity-0'}`}
          />
        )}
        {hasInside && (
          <div className={`absolute bottom-2 right-2 text-xs px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white transition-opacity duration-300 ${flipped ? 'opacity-100' : 'opacity-0'}`}>
            In-Box View
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-mono font-bold bg-amber-900 text-white px-2 py-0.5 rounded">{item.code}</span>
          <h3 className="font-bold text-amber-900">{item.name}</h3>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed mb-3">{item.desc}</p>
        <p className="text-xs font-semibold text-amber-700 border-t border-amber-100 pt-3">
          Available as: Tin box or corrugated paper box
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Product card ─────────────────────────────────────────────────────────── */
function ProductCard({ product, imageMode = 'cover', index = 0, onOpen }) {
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const hasInside = Boolean(product.insideImage);
  const { rotateX, rotateY, handlers } = useTilt(7);

  const imgBox = imageMode === 'contain'
    ? 'h-64 bg-gradient-to-br from-amber-50 to-white'
    : 'h-48 bg-amber-50';
  const imgFit = imageMode === 'contain'
    ? 'object-contain p-3'
    : 'object-cover';

  if (product.frontImage) {
    return (
      <div style={{ perspective: 1200 }} className="will-change-transform">
        <motion.div
          layout
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: Math.min(index * 0.04, 0.3) }}
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          onMouseEnter={() => { setHovered(true);  if (hasInside) setFlipped(true);  }}
          onMouseLeave={e => { setHovered(false); if (hasInside) setFlipped(false); handlers.onMouseLeave(e); }}
          onMouseMove={handlers.onMouseMove}
          onClick={() => onOpen && onOpen(product)}
          data-grow
          className={`bg-white rounded-xl overflow-hidden border border-amber-100 transition-shadow duration-300 cursor-pointer ${hovered ? 'shadow-2xl' : 'shadow-sm'}`}
        >
          <div className={`relative overflow-hidden ${imgBox}`} style={{ transformStyle: 'preserve-3d' }}>
            <motion.img
              src={product.frontImage}
              alt={product.name}
              animate={{ scale: hovered ? 1.08 : 1, opacity: flipped ? 0 : 1 }}
              transition={{ scale: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.3 } }}
              style={{ translateZ: 40 }}
              className={`absolute inset-0 w-full h-full ${imgFit}`}
            />
            {hasInside && (
              <motion.img
                src={product.insideImage}
                alt={`${product.name} inside`}
                animate={{ scale: hovered ? 1.08 : 1, opacity: flipped ? 1 : 0 }}
                transition={{ scale: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.3 } }}
                style={{ translateZ: 40 }}
                className={`absolute inset-0 w-full h-full ${imgFit}`}
              />
            )}

            {/* glossy highlight that follows tilt */}
            <motion.div
              aria-hidden
              style={{ translateZ: 60 }}
              animate={{ opacity: hovered ? 0.18 : 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-transparent pointer-events-none"
            />

            {hasInside && (
              <motion.div
                style={{ translateZ: 70 }}
                animate={{ opacity: flipped ? 1 : 0, y: flipped ? 0 : 6 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-2 right-2 text-xs px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white"
              >
                {product.altLabel || 'Inside View'}
              </motion.div>
            )}
            {product.sku && (
              <motion.div
                style={{ translateZ: 70 }}
                initial={false}
                animate={{ y: hovered ? 0 : -2, opacity: 1 }}
                className="absolute top-2 left-2 text-[10px] px-2 py-1 rounded bg-amber-900/85 backdrop-blur-sm text-white font-mono tracking-wide"
              >
                {product.sku}
              </motion.div>
            )}
          </div>

          <div className="p-4 relative flex flex-col justify-start min-h-[92px]" style={{ transformStyle: 'preserve-3d' }}>
            <motion.h3
              style={{ translateZ: 20 }}
              className="font-bold text-gray-900 leading-snug"
            >
              {product.name}
            </motion.h3>
            {product.collection && (
              <motion.p
                style={{ translateZ: 20 }}
                className="text-xs text-amber-700 mt-1"
              >
                {product.collection}
              </motion.p>
            )}
          </div>
        </motion.div>
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
      { id: 64,   name: 'European Size Bifold', sku: 'MC-0064', collection: 'Massini Collection · Cow NDM',         frontImage: '/MC-0064.png',  insideImage: '/MC-0064_inside.png' },
      { id: 123,  name: 'American Size Bifold', sku: 'OS-0123', collection: 'Osaka Collection · Cow Carbon Fibre',  frontImage: '/OS-0123.png',  insideImage: '/OS-0123_inside.png' },
      { id: 3035, name: 'American Size Bifold', sku: 'PA-3035', collection: 'Palermo Collection · Cow PDM',         frontImage: '/PA-3035.png',  insideImage: '/PA-3035_inside.png' },
      { id: 2286, name: 'American Size Bifold', sku: 'MN-2286', collection: 'Munich Collection · Cow DD',           frontImage: '/MN-2286.png',  insideImage: '/MN-2286_inside.png' },
      { id: 2255, name: 'American Size Bifold', sku: 'CH-2255', collection: 'Chicago Collection · Cow Nappa',       frontImage: '/CH-2255.png',  insideImage: '/CH-2255_inside.png' },
      { id: 2232, name: 'American Size Bifold', sku: 'BA-2232', collection: 'Bali Collection · Cow NDM',            frontImage: '/BA-2232.png',  insideImage: '/BA-2232_inside.png' },
      { id: 2106, name: 'American Size Bifold', sku: 'MI-2106', collection: 'Micro Collection · Textured Polyester + Cow NDM', frontImage: '/MI-2106.png',  insideImage: '/MI-2106_inside.png' },
      { id: 1146, name: 'American Size Bifold', sku: 'CN-1146', collection: 'Canton Collection · New Zealand Lamb', frontImage: '/CN-1146.png',  insideImage: '/CN-1146_inside.png' },
      { id: 5006, name: 'American Size Bifold', sku: 'CA-5006', collection: 'Cancun Collection · Cow DD Polished',  frontImage: '/CA-5006.png',  insideImage: '/CA-5006_inside.png' },
    ],
    trifold: [
      { id: 124,  name: 'American Size Trifold', sku: 'OS-0124', collection: 'Osaka Collection · Cow Carbon Fibre',  frontImage: '/OS-0124.png',  insideImage: '/OS-0124_inside.png' },
      { id: 3036, name: 'American Size Trifold', sku: 'PA-3036', collection: 'Palermo Collection · Cow PDM',         frontImage: '/PA-3036.png',  insideImage: '/PA-3036_inside.png' },
      { id: 2287, name: 'American Size Trifold', sku: 'MN-2287', collection: 'Munich Collection · Cow DD',           frontImage: '/MN-2287.png',  insideImage: '/MN-2287_inside.png' },
      { id: 2256, name: 'American Size Trifold', sku: 'CH-2256', collection: 'Chicago Collection · Cow Nappa',       frontImage: '/CH-2256.png',  insideImage: '/CH-2256_inside.png' },
      { id: 2233, name: 'American Size Trifold', sku: 'BA-2233', collection: 'Bali Collection · Cow NDM',            frontImage: '/BA-2233.png',  insideImage: '/BA-2233_inside.png' },
      { id: 2107, name: 'American Size Trifold', sku: 'MI-2107', collection: 'Micro Collection · Textured Polyester + Cow NDM', frontImage: '/MI-2107.png',  insideImage: '/MI-2107_inside.png' },
      { id: 1147, name: 'American Size Trifold', sku: 'CN-1147', collection: 'Canton Collection · New Zealand Lamb', frontImage: '/CN-1147.png',  insideImage: '/CN-1147_inside.png' },
      { id: 5007, name: 'American Size Trifold', sku: 'CA-5007', collection: 'Cancun Collection · Cow DD Polished',  frontImage: '/CA-5007.png',  insideImage: '/CA-5007_inside.png' },
    ],
    'note-case': [
      { id: 61,   name: 'European Size Note Case', sku: 'MC-0061', collection: 'Massini Collection · Cow NDM',       frontImage: '/MC-0061.png',  insideImage: '/MC-0061_inside.png' },
    ],
    'zip-around': [
      { id: 125,  name: 'American Size Zip-around', sku: 'OS-0125', collection: 'Osaka Collection · Cow Carbon Fibre', frontImage: '/OS-0125.png',  insideImage: '/OS-0125_inside.png' },
      { id: 3037, name: 'American Size Zip-around', sku: 'PA-3037', collection: 'Palermo Collection · Cow PDM',        frontImage: '/PA-3037.png',  insideImage: '/PA-3037_inside.png' },
      { id: 2288, name: 'American Size Zip-around', sku: 'MN-2288', collection: 'Munich Collection · Cow DD',          frontImage: '/MN-2288.png',  insideImage: '/MN-2288_inside.png' },
      { id: 2257, name: 'American Size Zip-around', sku: 'CH-2257', collection: 'Chicago Collection · Cow Nappa',      frontImage: '/CH-2257.png',  insideImage: '/CH-2257_inside.png' },
      { id: 2234, name: 'American Size Zip-around', sku: 'BA-2234', collection: 'Bali Collection · Cow NDM',           frontImage: '/BA-2234.png',  insideImage: '/BA-2234_inside.png' },
      { id: 2108, name: 'American Size Zip-around', sku: 'MI-2108', collection: 'Micro Collection · Textured Polyester + Cow NDM', frontImage: '/MI-2108.png',  insideImage: '/MI-2108_inside.png' },
      { id: 1148, name: 'American Size Zip-around', sku: 'CN-1148', collection: 'Canton Collection · New Zealand Lamb', frontImage: '/CN-1148.png',  insideImage: '/CN-1148_inside.png' },
      { id: 5008, name: 'American Size Zip-around', sku: 'CA-5008', collection: 'Cancun Collection · Cow DD Polished',  frontImage: '/CA-5008.png',  insideImage: '/CA-5008_inside.png' },
    ],
  },
  bags: {
    briefcase: [
      { id: 8061, name: 'Tan Leather Laptop Briefcase', sku: 'B-8061', collection: 'Buff VT Leather',      colors: 'Black · Brown · Tan',     frontImage: '/B-8061.png', insideImage: '/B-8061_inside.png', altLabel: 'Inside View', views: [{ src: '/B-8061.png', label: 'Front' }, { src: '/B-8061_inside.png', label: 'Inside' }, { src: '/B-8061_side.png', label: 'Side' }] },
      { id: 8062, name: 'Black Leather Laptop Bag',     sku: 'B-8062', collection: 'Cow YDM Leather',      colors: 'All colours',             frontImage: '/B-8062.png', insideImage: '/B-8062_inside.png', altLabel: 'Inside View', views: [{ src: '/B-8062.png', label: 'Front' }, { src: '/B-8062_inside.png', label: 'Inside' }, { src: '/B-8062_back.png', label: 'Back' }, { src: '/B-8062_side.png', label: 'Side' }] },
      { id: 8067, name: 'Vintage Brown Briefcase',      sku: 'B-8067', collection: 'Cow Hunter Leather',   colors: 'Any colour',              frontImage: '/B-8067.png', insideImage: '/B-8067_inside.png', altLabel: 'Inside View', views: [{ src: '/B-8067.png', label: 'Front' }, { src: '/B-8067_inside.png', label: 'Inside' }, { src: '/B-8067_back.png', label: 'Back' }] },
      { id: 8098, name: 'Cognac Polished Briefcase',    sku: 'B-8098', collection: 'Cow VT Leather',       colors: 'Black · Brown · Cognac',  frontImage: '/B-8098.png', insideImage: '/B-8098_inside.png', altLabel: 'Inside View', views: [{ src: '/B-8098.png', label: 'Front' }, { src: '/B-8098_inside.png', label: 'Inside' }, { src: '/B-8098_back.png', label: 'Back' }] },
    ],
    crossbody: [
      { id: 8066, name: 'Tan Crossbody Shoulder Bag',   sku: 'B-8066', collection: 'Cow DD Softy Leather', colors: 'Any colour',              frontImage: '/B-8066.png', insideImage: '/B-8066_inside.png', altLabel: 'Inside View', views: [{ src: '/B-8066.png', label: 'Front' }, { src: '/B-8066_inside.png', label: 'Inside' }, { src: '/B-8066_back.png', label: 'Back' }] },
      { id: 8068, name: 'Vintage Brown Crossbody',      sku: 'B-8068', collection: 'Cow Hunter Leather',   colors: 'Any colour',              frontImage: '/B-8068.png', insideImage: '/B-8068_inside.png', altLabel: 'Inside View', views: [{ src: '/B-8068.png', label: 'Front' }, { src: '/B-8068_inside.png', label: 'Inside' }, { src: '/B-8068_back.png', label: 'Back' }, { src: '/B-8068_side.png', label: 'Side' }] },
      { id: 9004, name: 'Brown Flap Crossbody',         sku: 'B-9004', collection: 'Cow Plain Crunch Leather', colors: 'All colours',         frontImage: '/B-9004.png', insideImage: '/B-9004_inside.png', altLabel: 'Inside View', views: [{ src: '/B-9004.png', label: 'Front' }, { src: '/B-9004_inside.png', label: 'Inside' }, { src: '/B-9004_back.png', label: 'Back' }, { src: '/B-9004_side.png', label: 'Side' }] },
    ],
    'sling-waist': [
      { id: 8008, name: 'Black Leather Waist Bag',      sku: 'B-8008', collection: 'Cow Nappa Leather',    colors: 'Any colour',              frontImage: '/B-8008.png', insideImage: '/B-8008_inside.png', altLabel: 'Inside View', views: [{ src: '/B-8008.png', label: 'Front' }, { src: '/B-8008_inside.png', label: 'Inside' }, { src: '/B-8008_back.png', label: 'Back' }, { src: '/B-8008_side.png', label: 'Side' }] },
      { id: 9002, name: 'Black Leather Chest Sling',    sku: 'B-9002', collection: 'Cow Fine Milled Nappa Leather', colors: 'Any colour',     frontImage: '/B-9002.png', insideImage: '/B-9002_inside.png', altLabel: 'Inside View', views: [{ src: '/B-9002.png', label: 'Front' }, { src: '/B-9002_inside.png', label: 'Inside' }, { src: '/B-9002_side.png', label: 'Side' }] },
    ],
    duffle: [
      { id: 9001, name: 'Vintage Brown Weekender Duffle', sku: 'B-9001', collection: 'Cow Crazy Horse Leather', colors: 'Brown · Tan', frontImage: '/B-9001.png', insideImage: '/B-9001_inside.png', altLabel: 'Inside View', views: [{ src: '/B-9001.png', label: 'Front' }, { src: '/B-9001_inside.png', label: 'Inside' }] },
    ],
  },
  'small-accessories': {
    'card-cases': [
      { id: 991,   name: 'Card Case · Magnet + ID Window', sku: 'ML-991',  collection: 'New Zealand Lamb', frontImage: '/ML-991.png',  insideImage: '/ML-991_inside.png' },
      { id: 996,   name: 'Card Case · Magnet Close',        sku: 'ML-996',  collection: 'New Zealand Lamb', frontImage: '/ML-996.png',  insideImage: '/ML-996_inside.png' },
      { id: 102,   name: 'Black Leather Card Case',          sku: 'Y-102',  collection: 'New Zealand Lamb', frontImage: '/Y-102.png',   insideImage: '/Y-102_inside.png' },
      { id: 109,   name: 'RFID Cardholder',                  sku: 'Y-109',  collection: 'New Zealand Lamb', frontImage: '/Y-109.png',   insideImage: '/Y-109_inside.png' },
      { id: 114,   name: 'Card Case with ID Slot',           sku: 'Y-114',  collection: 'New Zealand Lamb', frontImage: '/Y-114.png',   insideImage: '/Y-114_inside.png' },
      { id: 115,   name: 'Metal Card Holder',                sku: 'Y-115',  collection: 'New Zealand Lamb', frontImage: '/Y-115.png',   insideImage: '/Y-115_inside.png' },
      { id: 3804,  name: 'Card Case with ID Slot',           sku: 'Y-3804', collection: 'New Zealand Lamb', frontImage: '/Y-3804.png',  insideImage: '/Y-3804_inside.png' },
      { id: 3805,  name: 'Slotted Leather Card Case',        sku: 'Y-3805', collection: 'New Zealand Lamb', frontImage: '/Y-3805.png',  insideImage: '/Y-3805_inside.png' },
      { id: 3810,  name: 'Card Case Pouch · ID Slot',        sku: 'Y-3810', collection: 'New Zealand Lamb', frontImage: '/Y-3810.png',  insideImage: '/Y-3810_inside.png' },
      { id: 3833,  name: 'Zip-around Card Case · ID Window', sku: 'Y-3833', collection: 'New Zealand Lamb', frontImage: '/Y-3833.png',  insideImage: '/Y-3833_inside.png' },
    ],
    'money-clip': [
      { id: 103,   name: 'Sleek Card Case · Money Clip',     sku: 'Y-103',  collection: 'New Zealand Lamb', frontImage: '/Y-103.png',   insideImage: '/Y-103_inside.png' },
      { id: 993,   name: 'Card Case · Metal Money Clip',     sku: 'Y-993',  collection: 'New Zealand Lamb', frontImage: '/Y-993.png',   insideImage: '/Y-993_inside.png' },
      { id: 3814,  name: 'Cardholder · Metal Clip',          sku: 'Y-3814', collection: 'New Zealand Lamb', frontImage: '/Y-3814.png',  insideImage: '/Y-3814_inside.png' },
    ],
    'coin-cases': [
      { id: 131,   name: 'Ladies Coin Case',                 sku: 'Y-131',  collection: 'New Zealand Lamb', frontImage: '/Y-131.png' },
      { id: 132,   name: 'Ladies Coin Case',                 sku: 'Y-132',  collection: 'New Zealand Lamb', frontImage: '/Y-132.png' },
      { id: 133,   name: 'Ladies Coin Case',                 sku: 'Y-133',  collection: 'New Zealand Lamb', frontImage: '/Y-133.png' },
      { id: 134,   name: 'Ladies Coin Case',                 sku: 'Y-134',  collection: 'New Zealand Lamb', frontImage: '/Y-134.png' },
    ],
  },
  travel: [
    { id: 45, name: 'Zip Passport Holder',     sku: 'YL-45', collection: 'New Zealand Lamb',     frontImage: '/YL-45.png', insideImage: '/YL-45_inside.png' },
    { id: 47, name: 'Vintage Passport Holder', sku: 'YL-47', collection: 'Buff Hunter Leather',  frontImage: '/YL-47.png', insideImage: '/YL-47_inside.png' },
    { id: 51, name: 'Slim Passport Holder',    sku: 'YL-51', collection: 'New Zealand Lamb',     frontImage: '/YL-51.png', insideImage: '/YL-51_inside.png' },
    { id: 77, name: 'Zip Travel Wallet',       sku: 'YL-77', collection: 'New Zealand Lamb',     frontImage: '/YL-77.png', insideImage: '/YL-77_inside.png' },
  ],
};

const MAIN_CATEGORIES = [
  { id: 'wallets',           label: 'Wallets',              image: '/MC-0064.png', desc: 'Bifold · Trifold · Note Case · Zip-around' },
  { id: 'bags',              label: 'Bags',                 image: '/B-8061.png',  desc: 'Briefcase · Crossbody · Sling & Waist · Duffle' },
  { id: 'small-accessories', label: 'Small Accessories',    image: '/Y-103.png',   desc: 'Card Cases · Money Clip · Coin Cases' },
  { id: 'travel',            label: 'Travel Accessories',   image: '/YL-45.png',   desc: 'Passport Holders · Travel Wallets' },
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

const BAG_SUBS = [
  { id: 'briefcase',   label: 'Briefcase' },
  { id: 'crossbody',   label: 'Crossbody' },
  { id: 'sling-waist', label: 'Sling & Waist' },
  { id: 'duffle',      label: 'Duffle' },
];

/* ─── App ───────────────────────────────────────────────────────────────────── */
export default function BrandioLeatherWebsite() {
  const [isMenuOpen,       setIsMenuOpen]       = useState(false);
  const [contactForm,      setContactForm]      = useState({ name: '', email: '', company: '', message: '' });
  const [formStatus,       setFormStatus]       = useState('idle'); // idle | sending | sent | error
  const [activeSection,    setActiveSection]    = useState('home');
  const [mainCategory,     setMainCategory]     = useState('wallets');
  const [walletSub,        setWalletSub]        = useState('bifold');
  const [smallAccSub,      setSmallAccSub]      = useState('card-cases');
  const [bagSub,           setBagSub]           = useState('briefcase');
  const [currentSlide,     setCurrentSlide]     = useState(0);
  const [alcoveProduct,    setAlcoveProduct]    = useState(null);
  const [alcoveCollection, setAlcoveCollection] = useState(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroImgScale   = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const heroImgOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.25]);
  const heroTextY      = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const heroSlides = [
    { image: FACTORY_FRONT, title: 'Timeless Leather Craftsmanship',  subtitle: "Handcrafted leather goods by Brandio Leather Pvt Ltd. Since 2007, we've exported premium leather accessories to over 30 countries." },
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
  else if (mainCategory === 'bags')              visibleProducts = PRODUCTS.bags[bagSub];
  else                                           visibleProducts = PRODUCTS[mainCategory];

  return (
    <div className="bg-gradient-to-b from-amber-50 via-white to-amber-50 text-gray-900 min-h-screen">
      <Analytics />
      <LoadingReveal logo={LOGO} />
      <CustomCursor />
      <ProductAlcove product={alcoveProduct} onClose={() => setAlcoveProduct(null)} />
      <CollectionModal
        collection={alcoveCollection}
        onClose={() => setAlcoveCollection(null)}
        onView={() => { setAlcoveCollection(null); setMainCategory('wallets'); goTo('products'); }}
      />

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
                className={`font-medium text-sm relative pb-1 transition-colors ${
                  activeSection === id ? 'text-amber-900' : 'text-gray-700 hover:text-amber-900'
                }`}
              >
                {label}
                {activeSection === id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-amber-700 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
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
        <>
        <section ref={heroRef} className="relative h-screen overflow-hidden">
          {heroSlides.map((slide, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 transition-opacity duration-1000"
              style={{ opacity: currentSlide === i ? 1 : 0, scale: heroImgScale }}
            >
              <motion.img
                src={slide.image}
                alt={slide.title}
                style={{ opacity: heroImgOpacity }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black/70" />
            </motion.div>
          ))}
          <motion.div
            style={{ y: heroTextY, opacity: heroTextOpacity }}
            className="relative z-10 flex items-center justify-center h-full text-center px-4"
          >
            <div className="max-w-4xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div key={currentSlide}>
                  <h1 className="text-4xl md:text-7xl font-bold mb-6 text-white leading-tight overflow-hidden">
                    <StaggerWords text={heroSlides[currentSlide].title} />
                  </h1>
                  <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="text-xl md:text-2xl text-gray-200 mb-8 font-light"
                  >
                    {heroSlides[currentSlide].subtitle}
                  </motion.p>
                </motion.div>
              </AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-4 justify-center flex-wrap"
              >
                <MagneticButton
                  onClick={() => goTo('products')}
                  className="px-8 py-3 bg-gradient-to-r from-amber-700 to-yellow-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-amber-500/30 transition-shadow"
                >
                  Explore Products
                </MagneticButton>
                <MagneticButton
                  onClick={() => goTo('contact')}
                  className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
                >
                  Get a Quote
                </MagneticButton>
              </motion.div>
            </div>
          </motion.div>
          <button onClick={() => setCurrentSlide(p => (p - 1 + heroSlides.length) % heroSlides.length)} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/20 rounded-full hover:bg-white/40 transition">
            <ChevronLeft size={28} className="text-white" />
          </button>
          <button onClick={() => setCurrentSlide(p => (p + 1) % heroSlides.length)} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/20 rounded-full hover:bg-white/40 transition">
            <ChevronRight size={28} className="text-white" />
          </button>
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-3">
            {heroSlides.map((_, i) => (
              <button key={i} onClick={() => setCurrentSlide(i)} className={`h-3 rounded-full transition-all ${currentSlide === i ? 'bg-white w-8' : 'bg-white/50 w-3'}`} />
            ))}
          </div>
          {/* scroll hint */}
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ opacity: heroTextOpacity }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-white/80 text-[10px] tracking-[0.35em] flex flex-col items-center gap-2 pointer-events-none"
          >
            <span>SCROLL</span>
            <span className="block w-px h-6 bg-white/40" />
          </motion.div>
        </section>

        {/* ── Philosophy strip — muted brown cinematic transition ──────────── */}
        <section className="relative text-amber-50 py-16 md:py-44 overflow-hidden" style={{ backgroundColor: '#2d231a' }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.14 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${FACTORY_SIDE})` }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, #322619, rgba(45,35,26,0.82), #241c14)' }}
          />
          <div className="relative max-w-5xl mx-auto px-6">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-[10px] md:text-xs tracking-[0.45em] text-amber-300/80 uppercase mb-6"
            >
              The Brandio Standard
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl md:text-6xl lg:text-7xl font-light leading-[1.05] tracking-tight mb-8"
            >
              Leather, finished by hand.<br />
              <span className="text-amber-200/90 italic font-extralight">Engineered to outlive the trend cycle.</span>
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              style={{ originX: 0 }}
              className="h-px w-24 bg-amber-300/40 mb-8"
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-amber-100/70 font-light max-w-2xl leading-relaxed"
            >
              Every piece begins with full-grain leather, sourced from tanneries we've worked with for over a decade. Stitched, edged, and finished in our own workshop — then shipped to over thirty countries.
            </motion.p>
          </div>
        </section>

        {/* ── Featured Collections preview ─────────────────────────────────── */}
        <section className="relative py-24 md:py-32 px-6 bg-gradient-to-b from-amber-50 to-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-end justify-between flex-wrap gap-6 mb-12"
            >
              <div>
                <p className="text-[10px] tracking-[0.4em] text-amber-700/80 uppercase mb-3">Explore</p>
                <h2 className="text-4xl md:text-5xl font-bold text-amber-950 leading-tight">Featured Products</h2>
              </div>
              <MagneticButton
                onClick={() => goTo('products')}
                className="px-6 py-2.5 border border-amber-900 text-amber-900 rounded-full text-sm font-semibold hover:bg-amber-900 hover:text-white transition-colors"
              >
                View All Products
              </MagneticButton>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {MAIN_CATEGORIES.map((cat, i) => (
                <motion.button
                  key={cat.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, delay: (i % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6 }}
                  onClick={() => { setMainCategory(cat.id); goTo('products'); }}
                  data-grow
                  className="group relative aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-2xl bg-stone-100 text-left shadow-sm hover:shadow-2xl transition-shadow duration-500"
                >
                  <motion.img
                    src={cat.image}
                    alt={cat.label}
                    initial={false}
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 w-full h-full object-contain p-12 md:p-16 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-7 md:p-10 text-white">
                    <p className="text-[10px] tracking-[0.35em] text-amber-300/80 uppercase mb-2">{cat.desc}</p>
                    <div className="flex items-end justify-between gap-4">
                      <h3 className="text-3xl md:text-4xl font-bold leading-tight">{cat.label}</h3>
                      <motion.span
                        initial={{ opacity: 0.6, x: 0 }}
                        whileHover={{ opacity: 1, x: 6 }}
                        className="shrink-0 text-xs tracking-[0.3em] flex items-center gap-2 pb-1"
                      >
                        DISCOVER <ChevronRightSm size={14} />
                      </motion.span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>
        </>
      )}

      {/* ── About ────────────────────────────────────────────────────────────── */}
      {activeSection === 'about' && (
        <motion.section
          key={activeSection}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="py-12 md:py-20 px-4"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-amber-900">Our Story</h2>
            <div className="space-y-6 text-lg text-gray-700">
              <p>At Brandio Leather Pvt Ltd, we believe in the power of craftsmanship. Every piece we create tells a story of dedication, precision, and passion. With over a decade of experience, we've refined our expertise to deliver leather goods that stand the test of time.</p>
              <p>Our artisans meticulously hand-select the finest leather from trusted suppliers across the globe. Using traditional techniques combined with modern innovation, we create products that are not just beautiful, but built to last.</p>
              <p>Trusted by customers in Europe, North America, Australia, and beyond, we're committed to exporting quality leather goods that represent the best of craftsmanship.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
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
        </motion.section>
      )}

      {/* ── Products ─────────────────────────────────────────────────────────── */}
      {activeSection === 'products' && (
        <motion.section
          key={activeSection}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="py-12 md:py-20 px-4"
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-2 text-amber-900">Our Products</h2>
            <p className="text-gray-600 mb-10 text-lg">Premium leather goods crafted for quality and style.</p>

            {/* ── Level 1: 4 main categories ── */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {MAIN_CATEGORIES.map((cat, i) => (
                <motion.button
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setMainCategory(cat.id);
                    if (cat.id === 'wallets')           setWalletSub('bifold');
                    if (cat.id === 'small-accessories') setSmallAccSub('card-cases');
                    if (cat.id === 'bags')              setBagSub('briefcase');
                  }}
                  className={`p-3 md:p-4 rounded-xl text-left transition-all duration-300 flex items-center gap-3 md:gap-4 ${
                    mainCategory === cat.id
                      ? 'bg-amber-900 text-white shadow-xl'
                      : 'bg-white border border-amber-200 text-amber-900 hover:border-amber-500 hover:shadow-md'
                  }`}
                >
                  <div className={`shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden flex items-center justify-center transition-colors ${
                    mainCategory === cat.id ? 'bg-amber-50' : 'bg-amber-50'
                  }`}>
                    <img src={cat.image} alt={cat.label} className="w-full h-full object-contain p-1" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-sm leading-tight">{cat.label}</div>
                    <div className={`text-[10px] mt-1 leading-tight ${mainCategory === cat.id ? 'text-amber-200' : 'text-gray-500'}`}>
                      {cat.desc}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* ── Level 2: subcategory pills (Wallets / Small Accessories) ── */}
            {mainCategory === 'wallets' && (
              <div className="flex flex-wrap gap-2 mb-8 border-b border-amber-100 pb-6">
                {WALLET_SUBS.map(sub => (
                  <motion.button
                    key={sub.id}
                    onClick={() => setWalletSub(sub.id)}
                    whileHover={{ y: -2, scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                    className={`px-5 py-2 rounded-full font-semibold text-sm relative ${
                      walletSub === sub.id
                        ? 'text-white shadow'
                        : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                    }`}
                  >
                    {walletSub === sub.id && (
                      <motion.span layoutId="wallet-pill" transition={{ type: 'spring', stiffness: 380, damping: 30 }} className="absolute inset-0 bg-amber-700 rounded-full -z-0" style={{ zIndex: -1 }} />
                    )}
                    <span className="relative z-10">{sub.label}</span>
                  </motion.button>
                ))}
              </div>
            )}
            {mainCategory === 'small-accessories' && (
              <div className="flex flex-wrap gap-2 mb-8 border-b border-amber-100 pb-6">
                {SMALL_ACC_SUBS.map(sub => (
                  <motion.button
                    key={sub.id}
                    onClick={() => setSmallAccSub(sub.id)}
                    whileHover={{ y: -2, scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                    className={`px-5 py-2 rounded-full font-semibold text-sm relative ${
                      smallAccSub === sub.id
                        ? 'text-white shadow'
                        : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                    }`}
                  >
                    {smallAccSub === sub.id && (
                      <motion.span layoutId="sa-pill" transition={{ type: 'spring', stiffness: 380, damping: 30 }} className="absolute inset-0 bg-amber-700 rounded-full" style={{ zIndex: -1 }} />
                    )}
                    <span className="relative z-10">{sub.label}</span>
                  </motion.button>
                ))}
              </div>
            )}
            {mainCategory === 'bags' && (
              <div className="flex flex-wrap gap-2 mb-8 border-b border-amber-100 pb-6">
                {BAG_SUBS.map(sub => (
                  <motion.button
                    key={sub.id}
                    onClick={() => setBagSub(sub.id)}
                    whileHover={{ y: -2, scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                    className={`px-5 py-2 rounded-full font-semibold text-sm relative ${
                      bagSub === sub.id
                        ? 'text-white shadow'
                        : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                    }`}
                  >
                    {bagSub === sub.id && (
                      <motion.span layoutId="bag-pill" transition={{ type: 'spring', stiffness: 380, damping: 30 }} className="absolute inset-0 bg-amber-700 rounded-full" style={{ zIndex: -1 }} />
                    )}
                    <span className="relative z-10">{sub.label}</span>
                  </motion.button>
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
              {mainCategory === 'bags' && (
                <>
                  <ChevronRightSm size={14} />
                  <span className="font-medium text-amber-700">
                    {BAG_SUBS.find(s => s.id === bagSub)?.label}
                  </span>
                </>
              )}
            </div>

            {/* ── Product grid ── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${mainCategory}-${walletSub}-${smallAccSub}-${bagSub}`}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {visibleProducts?.map((product, i) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={i}
                    imageMode="contain"
                    onOpen={setAlcoveProduct}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.section>
      )}

      {/* ── Collections ──────────────────────────────────────────────────────── */}
      {activeSection === 'collections' && (
        <motion.section
          key={activeSection}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="py-12 md:py-20 px-4"
        >
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-amber-900">Collections</h2>
            <p className="text-gray-600 mb-12 text-lg">Curated leather ranges crafted around a unified design language.</p>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { code: 'MC', name: 'Massini Collection', size: 'European Size', material: 'Cow NDM',                       styles: 'Note Case · Bifold · Trifold',  cover: '/cover-MC.png', hero: '/col-MC.jpg', desc: 'European-style wallets in supple Cow NDM leather. Slim profile, maximum function — presented in a Yaali New York tin.' },
                { code: 'OS', name: 'Osaka Collection',   size: 'American Size', material: 'Cow Carbon Fibre',              styles: 'Bifold · Trifold · Zip-around', cover: '/cover-OS.png', hero: '/col-OS.jpg', desc: 'Carbon-fibre-textured wallets shipped in a premium MURA tin box. Bold, technical, durable.' },
                { code: 'PA', name: 'Palermo Collection', size: 'American Size', material: 'Cow PDM',                       styles: 'Bifold · Trifold · Zip-around', cover: '/cover-PA.png', hero: '/col-PA.jpg', desc: 'Two-tone black and burgundy wallets under the Yaali New York label. A classic colour story, contemporary cut.' },
                { code: 'MN', name: 'Munich Collection',  size: 'American Size', material: 'Cow DD',                        styles: 'Bifold · Trifold · Zip-around', cover: '/cover-MN.png', hero: '/col-MN.jpg', desc: 'Sleek black wallets engineered for daily luxury, finished with the Yacht-line crest packaging.' },
                { code: 'CH', name: 'Chicago Collection', size: 'American Size', material: 'Cow Nappa',                     styles: 'Bifold · Trifold · Zip-around', cover: '/cover-CH.png', hero: '/col-CH.jpg', desc: 'Hand-woven Nappa leather wallets in deep black. Texture, depth, and Brandio New York packaging.' },
                { code: 'BA', name: 'Bali Collection',    size: 'American Size', material: 'Cow NDM',                       styles: 'Bifold · Trifold · Zip-around', cover: '/cover-BA.png', hero: '/col-BA.jpg', desc: 'Brown leather wallets with a signature navy-and-cream stripe, boxed in the red Brandio New York set.' },
                { code: 'MI', name: 'Micro Collection',   size: 'American Size', material: 'Textured Polyester + Cow NDM',  styles: 'Bifold · Trifold · Zip-around', cover: '/cover-MI.png', hero: '/col-MI.jpg', desc: 'Compact textured wallets with a smooth leather trim and the Branded mark. Urban edge, RFID protected.' },
                { code: 'CN', name: 'Canton Collection',  size: 'American Size', material: 'New Zealand Lamb',               styles: 'Bifold · Trifold · Zip-around', cover: '/cover-CN.png', hero: '/col-CN.jpg', desc: 'Pure black lambskin wallets with diagonal corner stitching — clean, professional, understated.' },
                { code: 'CA', name: 'Cancun Collection',  size: 'American Size', material: 'Cow DD Polished',               styles: 'Bifold · Trifold · Zip-around', cover: '/cover-CA.png', hero: '/col-CA.jpg', desc: 'Black wallets with a bold red, cream, and navy striped accent — the signature Dimbill line, vibrant and refined.' },
              ].map((col, i) => (
                <CollectionCard
                  key={col.code}
                  col={col}
                  index={i}
                  onOpen={() => setAlcoveCollection(col)}
                />
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* ── Packaging ────────────────────────────────────────────────────────── */}
      {activeSection === 'packaging' && (
        <motion.section
          key={activeSection}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="py-12 md:py-20 px-4"
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-amber-900">Packaging</h2>
            <p className="text-gray-600 mb-3 text-lg">Each collection ships in its own branded presentation. Tap or hover any box to see the wallet seated inside.</p>
            <p className="text-sm font-semibold text-amber-700 mb-12">Every range is available as a <span className="text-amber-900">tin box</span> or a <span className="text-amber-900">corrugated paper box</span>.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { code: 'OS', name: 'Osaka — Tin Box',            desc: 'Premium tin-box packaging for the Osaka carbon-fibre range.', frontImage: '/OS_tin_box_packaging.png', insideImage: '/OS-0123_in_box.png' },
                { code: 'PA', name: 'Palermo — Yaali New York',   desc: 'Yaali New York branded gift box for the Palermo range.',      frontImage: '/PA_packaging.png',         insideImage: '/PA_in_box.png' },
                { code: 'MN', name: 'Munich — Yacht Box',         desc: 'Yacht-line presentation box for the Munich black collection.', frontImage: '/MN_packaging.png',         insideImage: '/MN_in_box.png' },
                { code: 'CH', name: 'Chicago — Brandio New York', desc: 'Brandio New York branded box for the Chicago woven range.',   frontImage: '/CH_packaging.png',         insideImage: '/CH_in_box.png' },
                { code: 'BA', name: 'Bali — Brandio Box',         desc: 'Branded Brandio gift box for the Bali range.',                frontImage: '/Brandio_Packaging.png', insideImage: '/Brandio_in_box.png' },
                { code: 'MI', name: 'Micro — Branded Gift Box',   desc: 'Premium gift box for the Micro range, RFID protected.',       frontImage: '/Branded_Packaging.png', insideImage: '/Branded_in_box.png' },
                { code: 'CA', name: 'Cancun — Dimbill Box',       desc: 'Dimbill-branded gift box for the Cancun range.',              frontImage: '/Dimbill_Packaging.png',  insideImage: '/Dimbill_in_box.png' },
              ].map((item, i) => (
                <PackagingCard key={i} item={item} index={i} />
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
        </motion.section>
      )}

      {/* ── Contact ──────────────────────────────────────────────────────────── */}
      {activeSection === 'contact' && (
        <motion.section
          key={activeSection}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="py-12 md:py-20 px-4"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 md:mb-12 text-amber-900">Get In Touch</h2>
            <div className="grid md:grid-cols-2 gap-12">
              {formStatus === 'sent' ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center text-center py-16 space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="text-green-600" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-2xl font-bold text-amber-900">Message Sent!</h3>
                  <p className="text-gray-600">We'll be in touch within 24 hours.</p>
                  <button onClick={() => { setFormStatus('idle'); setContactForm({ name: '', email: '', company: '', message: '' }); }} className="mt-4 text-sm text-amber-700 underline">Send another message</button>
                </motion.div>
              ) : (
              <form className="space-y-6" onSubmit={async e => {
                e.preventDefault();
                const id = import.meta.env.VITE_FORMSPREE_ID;
                if (!id) { window.open(`mailto:inquiries@brandioleather.com?subject=${encodeURIComponent(`Inquiry from ${contactForm.name || 'Website'}`)}&body=${encodeURIComponent(`Hello Brandio Team,\n\nI am interested in learning more about your leather goods manufacturing capabilities.\n\nRequirements/Inquiry:\n${contactForm.message || ''}\n\nBest regards,\n${contactForm.name}\n${contactForm.company}\n${contactForm.email}`)}`); return; }
                setFormStatus('sending');
                try {
                  const res = await fetch(`https://formspree.io/f/${id}`, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(contactForm) });
                  if (res.ok) setFormStatus('sent'); else setFormStatus('error');
                } catch { setFormStatus('error'); }
              }}>
                <input type="text"  placeholder="Your Name"     value={contactForm.name}    onChange={e => setContactForm(f => ({ ...f, name: e.target.value }))}    className="w-full p-4 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600" />
                <input type="email" placeholder="Your Email"    value={contactForm.email}   onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))}   className="w-full p-4 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600" />
                <input type="text"  placeholder="Company Name"  value={contactForm.company} onChange={e => setContactForm(f => ({ ...f, company: e.target.value }))} className="w-full p-4 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600" />
                <textarea          placeholder="Your Message" rows="5" value={contactForm.message} onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))} className="w-full p-4 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600" />
                {formStatus === 'error' && <p className="text-red-600 text-sm">Something went wrong — please try WhatsApp or email directly.</p>}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-amber-900 to-yellow-700 text-white rounded-lg font-semibold hover:shadow-lg transition text-sm disabled:opacity-60"
                  >
                    <Mail size={16} /> {formStatus === 'sending' ? 'Sending…' : 'Send Message'}
                  </button>
                  <a
                    href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hello Brandio Team,\n\nI am interested in your leather goods manufacturing services.\n\nName: ${contactForm.name}\nCompany: ${contactForm.company}\nCountry: \n\nMessage: ${contactForm.message}\n\nLooking forward to hearing from you.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 hover:shadow-lg transition text-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/></svg>
                    Chat on WhatsApp
                  </a>
                </div>
              </form>
              )}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-amber-900 mb-4">Direct Contact</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <Phone className="text-amber-900 mt-1 flex-shrink-0" size={24} />
                      <div><p className="font-semibold text-gray-900">Phone</p><p className="text-gray-600">+91 91477 5610<br />+91 98313 35778</p></div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Mail className="text-amber-900 mt-1 flex-shrink-0" size={24} />
                      <div>
                        <p className="font-semibold text-gray-900">Email</p>
                        <p className="text-gray-600">
                          Fiza@brandio.com<br />
                          partnerships@brandioleather.com<br />
                          inquiries@brandioleather.com
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <MapPin className="text-amber-900 mt-1 flex-shrink-0" size={24} />
                      <div><p className="font-semibold text-gray-900">Address</p><p className="text-gray-600">Calcutta Leather Complex, Bantala<br />South 24 Parganas, Kolkata<br />West Bengal 743502, India</p></div>
                    </div>
                  </div>
                </div>
                <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
                  <h4 className="font-bold text-amber-900 mb-1">Book a Meeting</h4>
                  <p className="text-gray-600 text-sm mb-4">Schedule a 30-minute consultation with our team.</p>
                  <a
                    href={CALENDLY_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-2.5 bg-amber-900 text-white rounded-lg font-semibold hover:bg-amber-800 transition text-center text-sm"
                  >Book via Calendly</a>
                </div>
                <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                  <h4 className="font-bold text-green-800 mb-1">Need a quick response?</h4>
                  <p className="text-gray-600 text-sm mb-4">Chat with us directly on WhatsApp.</p>
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition text-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/></svg>
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      <footer className="relative bg-gradient-to-b from-amber-900 via-amber-950 to-stone-950 text-white pt-16 pb-24 md:pb-10 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(252,211,77,0.15),transparent_55%)] pointer-events-none" />
        <div className="relative max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <img src={LOGO} alt="Brandio Leather" className="h-14 mb-5 drop-shadow-lg" />
              <p className="text-amber-100/85 text-sm leading-relaxed max-w-xs">
                Premium leather goods manufacturer and exporter since 2007. Crafted by hand, shipped to over thirty countries.
              </p>
            </div>
            <div>
              <h4 className="text-[10px] tracking-[0.35em] text-amber-300/80 uppercase mb-5">Quick Links</h4>
              <ul className="space-y-2.5">
                {NAV_ITEMS.map(({ id, label }) => (
                  <li key={id}>
                    <button
                      onClick={() => goTo(id)}
                      data-grow
                      className="text-amber-100/90 hover:text-white text-sm transition relative group"
                    >
                      {label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-amber-300 group-hover:w-full transition-all duration-300" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] tracking-[0.35em] text-amber-300/80 uppercase mb-5">Follow Us</h4>
              <div className="flex flex-col gap-2.5">
                {['Facebook', 'Instagram', 'LinkedIn'].map(s => (
                  <button
                    key={s}
                    data-grow
                    className="text-amber-100/90 hover:text-white text-sm text-left transition relative group w-fit"
                  >
                    {s}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-amber-300 group-hover:w-full transition-all duration-300" />
                  </button>
                ))}
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-grow
                  className="text-amber-100/90 hover:text-white text-sm text-left transition relative group w-fit flex items-center gap-1.5"
                >
                  WhatsApp
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-amber-300 group-hover:w-full transition-all duration-300" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-amber-800/40 pt-7 flex flex-wrap items-center justify-between gap-3 text-amber-200/60 text-xs tracking-wide">
            <p>&copy; {new Date().getFullYear()} Brandio Leather Pvt Ltd. All rights reserved.</p>
            <p className="text-amber-300/50">Premium Leather Goods Exporter</p>
          </div>
        </div>
      </footer>

      {/* ── Floating WhatsApp button ──────────────────────────────────────────── */}
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white pl-4 pr-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
        aria-label="Chat on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16"><path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/></svg>
        <span className="hidden sm:inline text-sm font-semibold">WhatsApp</span>
      </a>

    </div>
  );
}
