import { Outlet, useLocation } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function RootLayout() {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Handle single-load preloader for a premium entry experience
  useEffect(() => {
    // If it's already shown in session storage, skip it for secondary routes
    const hasLoaded = sessionStorage.getItem("srr_loaded");
    if (hasLoaded) {
      setLoading(false);
    } else {
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("srr_loaded", "true");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#05070B] text-[#E2E4E9] relative selection:bg-[#C5A059] selection:text-white">
      
      {/* ================= CINEMATIC PRELOADER ================= */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 bg-[#05070B] z-[99999] flex flex-col items-center justify-center"
          >
            {/* Ambient gold glow */}
            <div className="absolute w-[260px] h-[260px] rounded-full bg-[#C5A059]/10 blur-[90px] animate-pulse"></div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative z-10 text-center flex flex-col items-center"
            >
              <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-[0.25em] text-white leading-none mb-4">
                SRR FARMS
              </h1>
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mb-4"></div>
              <p className="text-[9px] font-bold tracking-[0.3em] text-[#C5A059] uppercase">
                Vedic Bilona Churning
              </p>
              
              {/* Gold Loading Spinner */}
              <div className="mt-8 relative flex items-center justify-center">
                <span className="w-8 h-8 rounded-full border border-2 border-[#C5A059]/10 border-t-[#C5A059] animate-spin"></span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Noise Overlay for Texture */}
      <div className="fixed inset-0 pointer-events-none bg-noise z-[9999] mix-blend-multiply opacity-40"></div>
      
      <Navigation />
      <main className="flex-1 w-full relative z-0">
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer className="bg-[#0A0E17] text-[#E2E4E9] pt-24 pb-12 px-6 relative overflow-hidden z-10">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C5A059]/30 to-transparent"></div>
        <div className="absolute -bottom-[50%] -right-[10%] w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full bg-[#121A2F]/20 blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 relative z-10">
          
          <div className="md:col-span-5 lg:col-span-4">
            <h3 className="font-serif text-4xl font-bold tracking-widest mb-6 drop-shadow-sm flex items-center gap-1">
              SRR<span className="text-[#C5A059]">.</span>
            </h3>
            <p className="text-[#E2E4E9]/60 text-sm md:text-base leading-relaxed font-light mb-8 max-w-sm">
              Preserving the ancient Vedic Bilona method to bring you the purest A2 Desi Cow Ghee. Crafted with heritage, delivered with love.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 border border-[#E2E4E9]/20 flex items-center justify-center hover:border-[#C5A059] hover:bg-[#C5A059] hover:text-[#05070B] transition-colors group">
                <span className="text-xs group-hover:text-[#05070B] transition-colors">IN</span>
              </a>
              <a href="#" className="w-10 h-10 border border-[#E2E4E9]/20 flex items-center justify-center hover:border-[#C5A059] hover:bg-[#C5A059] hover:text-[#05070B] transition-colors group">
                <span className="text-xs group-hover:text-[#05070B] transition-colors">FB</span>
              </a>
            </div>
          </div>
          
          <div className="md:col-span-3 lg:col-span-2 lg:col-start-7">
            <h4 className="font-sans font-bold tracking-[0.2em] uppercase text-xs mb-8 text-[#C5A059]">Shop</h4>
            <ul className="flex flex-col gap-5 text-sm font-light text-[#E2E4E9]/70">
              <li><a href="/products" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-300">A2 Ghee</a></li>
              <li><a href="/products" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-300">Combos</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-300">Corporate Gifting</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-4 lg:col-span-3">
            <h4 className="font-sans font-bold tracking-[0.2em] uppercase text-xs mb-8 text-[#C5A059]">Newsletter</h4>
            <p className="text-sm font-light text-[#E2E4E9]/70 mb-4 leading-relaxed">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="relative mt-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full bg-transparent border-b border-[#E2E4E9]/30 py-3 text-sm focus:outline-none focus:border-[#C5A059] transition-colors text-white placeholder:text-white/30"
              />
              <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-xs font-bold tracking-widest text-[#C5A059] uppercase hover:text-white transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-[#E2E4E9]/10 flex flex-col md:flex-row items-center justify-between text-xs text-[#E2E4E9]/40 font-light tracking-wide relative z-10">
          <p>&copy; {new Date().getFullYear()} SRR Farms. All rights reserved.</p>
          <p className="mt-2 md:mt-0 text-[#C5A059]/90 font-medium tracking-wider">Developed by Sathish Dusharla</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Shipping Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
