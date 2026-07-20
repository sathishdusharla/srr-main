import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { ArrowDown, Check, Star, ArrowRight, ShieldCheck, Award, Zap, ChevronDown, Play, X } from "lucide-react";
import { GheeJar } from "../components/GheeJar";
import { useNavigate } from "react-router-dom";
import srrapp from "@/assets/srrapp.png";
import { supabase } from "../lib/supabase";

const Particles = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden mix-blend-screen opacity-40">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#C5A059]"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            boxShadow: "0 0 10px rgba(197, 160, 89, 0.8)",
          }}
          animate={{
            y: [0, -150 - Math.random() * 150],
            opacity: [0, 0.8, 0],
            scale: [0, 1.2, 0.4]
          }}
          transition={{
            duration: Math.random() * 8 + 8,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default function Home() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Mouse 3D tilt interaction states
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Scroll to top state
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    const checkScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  // Video Film modal state
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Subscribe & Save state
  const [purchaseType, setPurchaseType] = useState<"onetime" | "subscribe">("onetime");



  // Batch Tracker states
  const [batchNo, setBatchNo] = useState("");
  const [batchReport, setBatchReport] = useState<any | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    setTilt({ x: x * 25, y: y * -25 }); // scale to max 25 degrees tilt
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  // Interactive volume picker states
  const [selectedVolume, setSelectedVolume] = useState("1 Liter");
  const volumes = [
    { name: "500ml", price: "₹1,299", desc: "Perfect size to experience the premium taste and rich texture.", label: "Standard Jar" },
    { name: "1 Liter", price: "₹2,499", desc: "Our most popular size, ideal for families and regular traditional cooking.", label: "Family Harvest" },
    { name: "5 Liters", price: "₹11,999", desc: "Bulk pack with optimal value. For true culinary connoisseurs.", label: "Kitchen Essential" }
  ];

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const faqs = [
    {
      q: "What makes Bilona Ghee different from commercial ghee?",
      a: "Commercial ghee is made by boiling cream or butter using industrial machines, which destroys active enzymes. SRR Farms Ghee is crafted using the ancient Bilona method: first curdling the A2 milk, churning the curd in wooden churns to obtain butter (makhan), and then slowly clarifying it over firewood. This slow process yields high granularity, premium taste, and retains healthy fats."
    },
    {
      q: "Is A2 Ghee suitable for lactose-intolerant individuals?",
      a: "Yes, our A2 Desi Cow Ghee is clarified butter. The slow heat clarification process separates almost all milk solids, lactose, and casein, leaving behind pure golden fat. Most lactose-sensitive individuals can enjoy SRR Farms Ghee without issue."
    },
    {
      q: "Where is your milk sourced from?",
      a: "Our milk is sourced exclusively from grass-fed, free-grazing native Indian cow breeds (such as Gir and Sahiwal) on our sustainable partner farms. We maintain ethical dairy practices, ensuring the calves are well-fed before milking."
    },
    {
      q: "How should I store SRR Farms Ghee?",
      a: "Ghee has a naturally long shelf life and does not need to be refrigerated. Store it in a cool, dry place in its glass jar. Always use a clean, dry spoon to prevent moisture from introducing bacteria."
    }
  ];

  return (
    <div className="bg-[#05070B] text-[#E2E4E9] font-sans relative overflow-x-hidden selection:bg-[#C5A059] selection:text-black">
      <Particles />

      {/* ================= HERO SECTION ================= */}
      <section 
        ref={heroRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(5, 7, 11, 0.45), rgba(5, 7, 11, 0.98)), url(${srrapp})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center center' 
        }}
        className="relative min-h-screen pt-24 pb-16 flex items-center justify-center px-6 lg:px-16"
      >
        {/* Subtle radial lights */}
        <div className="absolute top-[20%] left-[10%] w-[35vw] h-[35vw] rounded-full bg-[#C5A059]/5 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-[#121A2F]/20 blur-[150px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
          
          {/* Centered Content: Full Width Hero */}
          <div className="lg:col-span-12 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#C5A059]/30 bg-[#C5A059]/5 mb-8"
            >
              <Award className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="text-[10px] md:text-xs font-bold tracking-[0.25em] text-[#C5A059] uppercase">
                Vedic Bilona Craftsmanship
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.05] tracking-tight mb-8"
            >
              Pure Gold, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF5C3] via-[#C5A059] to-[#A88543] italic font-light">Crafted by Hand.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base md:text-xl text-[#E2E4E9]/70 font-light leading-relaxed max-w-xl mb-12 tracking-wide"
            >
              SRR Farms honors Ayurvedic legacy. Hand-churned from organic A2 milk of free-grazing native cows, yielding pure, granular ghee with deep medicinal benefits.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center gap-6"
            >
              <button 
                onClick={() => navigate('/products')} 
                className="group relative px-10 py-5 bg-gradient-to-b from-[#E6C98A] via-[#C5A059] to-[#A88543] text-[#0A0E17] rounded-full font-bold tracking-widest uppercase text-xs hover:brightness-110 transition-all duration-300 shadow-[0_12px_35px_rgba(197,160,89,0.35),inset_0_1px_1px_rgba(255,255,255,0.7)] hover:-translate-y-1 overflow-hidden border border-[#F4E3B4]/40"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out"></div>
                <span className="relative z-10">Shop The Harvest</span>
              </button>
              
              <button 
                onClick={() => setIsVideoOpen(true)}
                className="group relative flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-[#E2E4E9]/80 hover:text-white transition-colors duration-300 cursor-pointer"
              >
                <span>Watch Brand Film</span>
                <span className="w-10 h-10 rounded-full border border-[#E2E4E9]/20 group-hover:border-[#C5A059] flex items-center justify-center transition-all duration-500 overflow-hidden relative">
                  <Play className="w-3 h-3 text-[#E2E4E9] group-hover:text-[#C5A059] group-hover:translate-x-0.5 transition-all fill-[#E2E4E9] group-hover:fill-[#C5A059]" />
                </span>
              </button>
            </motion.div>

            {/* Quick Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1.2 }}
              className="mt-16 flex flex-wrap justify-center lg:justify-start gap-8 text-[9px] tracking-[0.25em] text-[#E2E4E9]/50 uppercase font-semibold border-t border-[#E2E4E9]/10 pt-8 w-full"
            >
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]"></span> 100% Vedic Bilona
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]"></span> Indigenous A2 Cows
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]"></span> Lab Certified Purity
              </span>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#E2E4E9]/40 animate-bounce pointer-events-none">
          <span className="text-[9px] tracking-[0.25em] uppercase font-bold">Discover</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </div>
      </section>

      {/* ================= THE HERITAGE SECTION ================= */}
      <section className="py-32 px-6 lg:px-16 border-t border-[#E2E4E9]/5 relative">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-24">
            <h2 className="text-xs font-bold tracking-[0.3em] text-[#C5A059] uppercase mb-4">The Vedic Standard</h2>
            <h3 className="font-serif text-4xl md:text-5xl font-bold mb-6">Our Heritage of Churning</h3>
            <div className="w-16 h-0.5 bg-[#C5A059] mx-auto mb-8"></div>
            <p className="text-base text-[#E2E4E9]/60 leading-relaxed font-light">
              Unlike commercial ghee made directly from cream or heated curd rapidly, we respect nature's process. The Bilona method preserves active nutrients, providing an incredibly rich aroma and traditional granularity.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Visual Column */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="relative aspect-video lg:aspect-square overflow-hidden border border-[#E2E4E9]/10 group"
            >
              <div className="absolute inset-0 bg-[#0A0E17]/40 z-10 transition-opacity group-hover:opacity-20"></div>
              <img 
                src="https://images.unsplash.com/photo-1605333396914-1e0e8e97a3ef?auto=format&fit=crop&q=80&w=1000" 
                alt="Ayurvedic clay pot preparation" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 border border-[#C5A059]/20 m-4 pointer-events-none z-20"></div>
            </motion.div>

            {/* Informative Grid */}
            <div className="space-y-12">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex gap-6 group"
              >
                <div className="flex-shrink-0 w-12 h-12 border border-[#C5A059]/30 rounded-full flex items-center justify-center bg-[#C5A059]/5 group-hover:bg-[#C5A059]/10 transition-colors">
                  <span className="font-serif text-[#C5A059] font-bold">01</span>
                </div>
                <div>
                  <h4 className="font-serif text-xl font-bold text-[#E2E4E9] mb-3">Traditional Curd Route</h4>
                  <p className="text-sm text-[#E2E4E9]/60 leading-relaxed font-light">
                    We turn raw A2 cow milk into whole curd using custom earthen vessels, fermenting it overnight to lock in healthy microflora and probiotic elements.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="flex gap-6 group"
              >
                <div className="flex-shrink-0 w-12 h-12 border border-[#C5A059]/30 rounded-full flex items-center justify-center bg-[#C5A059]/5 group-hover:bg-[#C5A059]/10 transition-colors">
                  <span className="font-serif text-[#C5A059] font-bold">02</span>
                </div>
                <div>
                  <h4 className="font-serif text-xl font-bold text-[#E2E4E9] mb-3">Bi-Directional Churning</h4>
                  <p className="text-sm text-[#E2E4E9]/60 leading-relaxed font-light">
                    Using wooden churners, we churn curd bi-directionally to isolate high-grade white butter (Makhan), leaving nutrient-rich buttermilk behind.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex gap-6 group"
              >
                <div className="flex-shrink-0 w-12 h-12 border border-[#C5A059]/30 rounded-full flex items-center justify-center bg-[#C5A059]/5 group-hover:bg-[#C5A059]/10 transition-colors">
                  <span className="font-serif text-[#C5A059] font-bold">03</span>
                </div>
                <div>
                  <h4 className="font-serif text-xl font-bold text-[#E2E4E9] mb-3">Wood-Fired Slow Heat</h4>
                  <p className="text-sm text-[#E2E4E9]/60 leading-relaxed font-light">
                    The isolated butter is simmered gently on firewood in brass containers, vaporizing the remaining moisture to leave crystal pure golden ghee.
                  </p>
                </div>
              </motion.div>
            </div>

          </div>

        </div>
      </section>


      {/* ================= OUR GIR COWS SECTION ================= */}
      <section className="py-32 px-6 lg:px-16 bg-[#05070B] relative overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Text Column */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <span className="text-xs font-bold tracking-[0.3em] text-[#C5A059] uppercase mb-4">Sovereign Bovine Breed</span>
            <h3 className="font-serif text-4xl md:text-5xl font-bold mb-8">The Sacred Gir Cow & Surya Ketu Nadi</h3>
            <p className="text-sm text-[#E2E4E9]/60 leading-relaxed font-light mb-6">
              Our ghee is sourced exclusively from humped Gir cows, indigenous to the forest regions of Gujarat. These cows are unique: they possess a specialized spinal vein called the <span className="text-white font-medium">Surya Ketu Nadi</span>.
            </p>
            <p className="text-sm text-[#E2E4E9]/60 leading-relaxed font-light mb-10">
              When grazing in broad sunlight, this vein absorbs solar energy, releasing beneficial minerals and golden-hued beta-carotene pigments directly into their milk. This provides our ghee with its distinct bright golden color, rich granulation, and deep therapeutic properties.
            </p>
            <div className="grid grid-cols-2 gap-6 w-full border-t border-[#E2E4E9]/10 pt-8">
              <div>
                <span className="font-serif text-3xl font-bold text-[#C5A059] block">100% A2</span>
                <span className="text-[10px] uppercase tracking-widest text-[#E2E4E9]/50 font-bold block mt-1">Beta-Casein Protein</span>
              </div>
              <div>
                <span className="font-serif text-3xl font-bold text-[#C5A059] block">Grass-Fed</span>
                <span className="text-[10px] uppercase tracking-widest text-[#E2E4E9]/50 font-bold block mt-1">Pasture Raised Cattle</span>
              </div>
            </div>
          </div>
          {/* Image Column */}
          <div className="lg:col-span-6 relative">
            <div className="absolute -inset-4 border border-[#C5A059]/20 -z-10 translate-x-4 -translate-y-4"></div>
            <div className="relative aspect-[4/3] overflow-hidden border border-[#E2E4E9]/15 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1595858102377-ce669225725d?auto=format&fit=crop&q=80&w=1000" 
                alt="Gir Cows in grazing field" 
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-103"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= THE PURITY / BENEFITS GRID ================= */}
      <section className="py-24 bg-[#0A0E17] px-6 lg:px-16 border-y border-[#E2E4E9]/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#C5A059]/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-xs font-bold tracking-[0.3em] text-[#C5A059] uppercase mb-4">Therapeutic Potency</h2>
              <h3 className="font-serif text-4xl md:text-5xl font-bold">Liquid Gold for the Body</h3>
            </div>
            <p className="max-w-md text-sm text-[#E2E4E9]/60 leading-relaxed font-light">
              Desi A2 Cow Ghee is a natural superfood. Packed with healthy short-chain fatty acids, it benefits digestion, brain function, and cellular recovery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Enhanced Digestion",
                icon: <ShieldCheck className="w-6 h-6 text-[#C5A059]" />,
                desc: "Contains natural Butyric acid, providing energy to colon walls, aiding digestion, and naturally boosting gut integrity."
              },
              {
                title: "Vitamins Carrier",
                icon: <Award className="w-6 h-6 text-[#C5A059]" />,
                desc: "An organic carrier of essential fat-soluble vitamins (A, D, E, and K), facilitating faster nutrient absorption in body tissues."
              },
              {
                title: "Ayurvedic Rasayana",
                icon: <Star className="w-6 h-6 text-[#C5A059]" />,
                desc: "Traditional texts describe A2 Ghee as a 'Rasayana'—rejuvenating the nervous system, boosting skin radiance, and enhancing immunity."
              }
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                className="bg-[#05070B] p-10 border border-[#E2E4E9]/10 rounded-2xl hover:border-[#C5A059]/40 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group relative overflow-hidden"
              >
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#FFF5C3]/0 via-[#C5A059]/40 to-[#A88543]/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-12 h-12 rounded-xl bg-[#C5A059]/5 border border-[#C5A059]/20 flex items-center justify-center mb-8 group-hover:bg-[#C5A059]/10 group-hover:scale-105 transition-all">
                  {benefit.icon}
                </div>
                <h4 className="font-serif text-2xl font-bold mb-4 text-[#E2E4E9]">{benefit.title}</h4>
                <p className="text-sm text-[#E2E4E9]/60 leading-relaxed font-light">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= THE STEP-BY-STEP PROCESS TIMELINE ================= */}
      <section className="py-32 px-6 lg:px-16 relative">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-28">
            <h2 className="text-xs font-bold tracking-[0.3em] text-[#C5A059] uppercase mb-4">Honoring Chronology</h2>
            <h3 className="font-serif text-4xl md:text-5xl font-bold">The Journey of Gold</h3>
            <div className="w-16 h-0.5 bg-[#C5A059] mx-auto mt-6"></div>
          </div>

          <div className="relative pl-10 md:pl-0 max-w-5xl mx-auto space-y-24">
            
            {/* Centered vertical line on desktop, offset left line on mobile */}
            <div className="absolute left-[16px] md:left-[50%] top-0 bottom-0 w-px bg-[#C5A059]/20 z-0"></div>

            {[
              {
                step: "01",
                title: "Milking Indigenous Cows",
                side: "left",
                desc: "Our cattle are organic, grass-fed native Indian cows (Gir/Sahiwal). We ensure ethical milking practices where calves feed first. Our milk is purely A2 protein-rich, promoting structural digestive ease.",
                img: "https://images.unsplash.com/photo-1595858102377-ce669225725d?auto=format&fit=crop&q=80&w=600"
              },
              {
                step: "02",
                title: "Clay Pot Culturing",
                side: "right",
                desc: "Milk is boiled and naturally curdled in earthenware vessels overnight. The clay regulates temperature and provides rich microbial fermentation, converting milk into probiotic curd.",
                img: "https://images.unsplash.com/photo-1594498653385-d5172c532c00?auto=format&fit=crop&q=80&w=600"
              },
              {
                step: "03",
                title: "Churning The Makhan",
                side: "left",
                desc: "The fermented curd is slow-churned bi-directionally with wooden churners (Bilona). This separates the premium buttermilk from the pure white butter solids (Makhan).",
                img: "https://images.unsplash.com/photo-1628187807490-c020f01a3512?auto=format&fit=crop&q=80&w=600"
              },
              {
                step: "04",
                title: "Clarification Over Firewood",
                side: "right",
                desc: "Makhan is slowly heated in brass handis over firewood. Milk solids float down, separating cleanly. After cooling, it is double-filtered into jars, revealing granular golden ghee with a profound aroma.",
                img: "https://images.unsplash.com/photo-1595858102377-ce669225725d?auto=format&fit=crop&q=80&w=600"
              }
            ].map((item, idx) => (
              <div key={idx} className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center z-10">
                
                {/* Visual marker in middle for desktop, offset left on mobile */}
                <div className="absolute left-[-34px] md:left-[50%] md:-translate-x-1/2 w-5 h-5 border-2 border-[#C5A059] bg-[#05070B] rounded-full flex items-center justify-center z-20">
                  <span className="w-2 h-2 bg-[#C5A059] rounded-full"></span>
                </div>

                {/* Left alignment box */}
                <div className={`flex flex-col ${item.side === 'right' ? 'md:order-2 md:pl-16' : 'md:text-right md:pr-16'}`}>
                  <span className="font-serif text-[42px] font-bold text-[#C5A059]/40 leading-none mb-4 block">{item.step}</span>
                  <h4 className="font-serif text-2xl font-bold mb-4 text-[#E2E4E9]">{item.title}</h4>
                  <p className="text-sm text-[#E2E4E9]/60 leading-relaxed font-light">{item.desc}</p>
                </div>

                {/* Right alignment box (image) */}
                <div className={`relative overflow-hidden aspect-video md:aspect-[4/3] border border-[#E2E4E9]/10 group ${item.side === 'right' ? 'md:order-1' : 'md:pl-0'}`}>
                  <div className="absolute inset-0 bg-[#0A0E17]/40 z-10 transition-opacity group-hover:opacity-20"></div>
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>

              </div>
            ))}

          </div>

        </div>
      </section>


      {/* ================= THE ARTISANAL COMPARISON ================= */}
      <section className="py-32 px-6 lg:px-16 bg-[#05070B] relative">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-xs font-bold tracking-[0.3em] text-[#C5A059] uppercase mb-4">Artisanal Integrity</h2>
            <h3 className="font-serif text-4xl md:text-5xl font-bold">Why Vedic Bilona Matters</h3>
            <div className="w-16 h-0.5 bg-[#C5A059] mx-auto mt-6"></div>
          </div>

          <div className="max-w-4xl mx-auto overflow-x-auto border border-[#E2E4E9]/10 rounded-2xl bg-[#0A0E17]/20 backdrop-blur-md">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-[#E2E4E9]/10 bg-[#05070B]/40">
                  <th className="p-6 font-serif text-lg font-bold text-white">Product Feature</th>
                  <th className="p-6 font-serif text-lg font-bold text-[#C5A059] bg-[#C5A059]/5 text-center">SRR Farms Bilona Ghee</th>
                  <th className="p-6 font-serif text-lg font-bold text-gray-500 text-center">Industrial Ghee</th>
                </tr>
              </thead>
              <tbody className="text-sm font-light text-[#E2E4E9]/70">
                <tr className="border-b border-[#E2E4E9]/5 hover:bg-white/5 transition-colors">
                  <td className="p-6 font-medium text-white">Starting Material</td>
                  <td className="p-6 bg-[#C5A059]/5 text-center text-white">Probiotic whole milk curd (Dahi)</td>
                  <td className="p-6 text-center">Industrial cream separator (Malai)</td>
                </tr>
                <tr className="border-b border-[#E2E4E9]/5 hover:bg-white/5 transition-colors">
                  <td className="p-6 font-medium text-white">Churning Protocol</td>
                  <td className="p-6 bg-[#C5A059]/5 text-center text-white">Bi-directional wooden churn (Bilona)</td>
                  <td className="p-6 text-center">High-speed mechanical centrifuges</td>
                </tr>
                <tr className="border-b border-[#E2E4E9]/5 hover:bg-white/5 transition-colors">
                  <td className="p-6 font-medium text-white">Clarifying Method</td>
                  <td className="p-6 bg-[#C5A059]/5 text-center text-white">Slow wood-fired simmer in brass handi</td>
                  <td className="p-6 text-center">Boiled in steel steam boilers</td>
                </tr>
                <tr className="border-b border-[#E2E4E9]/5 hover:bg-white/5 transition-colors">
                  <td className="p-6 font-medium text-white">Fat Structure</td>
                  <td className="p-6 bg-[#C5A059]/5 text-center text-white">High density of butyric & short-chain acids</td>
                  <td className="p-6 text-center">Industrial long-chain fatty structure</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-6 font-medium text-white">Casein & Lactose</td>
                  <td className="p-6 bg-[#C5A059]/5 text-center text-white">Virtually 0% (clarified double-filtered)</td>
                  <td className="p-6 text-center">Often contains residue traces</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* ================= THE QUICK-SHOP / VOLUME SELECTOR ================= */}
      <section className="py-24 bg-[#0A0E17] px-6 lg:px-16 border-y border-[#E2E4E9]/5 relative">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Visual Column: Ghee Jar Showcase */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              <div className="absolute w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(197,160,89,0.25)_0%,transparent_60%)] blur-xl pointer-events-none"></div>
              <motion.div 
                key={selectedVolume}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="scale-[0.8] md:scale-[0.85]"
              >
                <GheeJar showShadows={true} animateFloat={true} />
              </motion.div>
            </div>

            {/* Content Column: Volume selection details */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4 mb-4">
                <div>
                  <span className="text-xs font-bold tracking-[0.3em] text-[#C5A059] uppercase block mb-1">Direct Harvest</span>
                  <h3 className="font-serif text-4xl md:text-5xl font-bold">Select Volume</h3>
                </div>
              </div>
              <p className="text-sm text-[#E2E4E9]/60 leading-relaxed font-light mb-8 max-w-xl">
                Choose the size that fits your household. Our jars are glass-sealed to preserve organic purity, freshness, and the profound scent of clay-pot wood-fired ghee.
              </p>

              {/* Purchase Mode Toggle */}
              <div className="flex gap-4 p-1.5 border border-[#E2E4E9]/10 rounded-full bg-[#05070B]/50 mb-8 w-full sm:w-auto">
                <button
                  onClick={() => setPurchaseType("onetime")}
                  className={`flex-1 sm:flex-none px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ${
                    purchaseType === "onetime" ? "bg-[#C5A059] text-[#05070B]" : "text-[#E2E4E9]/60 hover:text-white"
                  }`}
                >
                  One-time Purchase
                </button>
                <button
                  onClick={() => setPurchaseType("subscribe")}
                  className={`flex-1 sm:flex-none px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 justify-center ${
                    purchaseType === "subscribe" ? "bg-[#C5A059] text-[#05070B]" : "text-[#E2E4E9]/60 hover:text-white"
                  }`}
                >
                  Subscribe & Save 10%
                </button>
              </div>

              {/* Selector Tabs */}
              <div className="flex gap-4 mb-10 w-full flex-wrap sm:flex-nowrap">
                {volumes.map((v, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedVolume(v.name)}
                    className={`flex-1 text-center py-4 px-6 border transition-all duration-300 relative overflow-hidden ${
                      selectedVolume === v.name
                        ? "border-[#C5A059] bg-[#C5A059]/5 text-white"
                        : "border-[#E2E4E9]/10 text-[#E2E4E9]/50 hover:border-[#E2E4E9]/30"
                    }`}
                  >
                    {selectedVolume === v.name && (
                      <span className="absolute top-0 left-0 w-full h-[2px] bg-[#C5A059]"></span>
                    )}
                    <span className="text-[10px] tracking-wider uppercase opacity-60 font-bold block mb-1">{v.label}</span>
                    <span className="font-serif text-lg font-bold block">{v.name}</span>
                  </button>
                ))}
              </div>

              {/* Selection details */}
              <motion.div
                key={selectedVolume + "_details"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full border-t border-[#E2E4E9]/10 pt-8"
              >
                <div className="flex justify-between items-baseline mb-6">
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif text-4xl font-bold text-[#C5A059]">
                      ₹{(purchaseType === "subscribe" 
                        ? Math.floor(
                            (selectedVolume === "500ml" ? 1299 : selectedVolume === "1 Liter" ? 2499 : 11999) * 0.9
                          ) 
                        : (selectedVolume === "500ml" ? 1299 : selectedVolume === "1 Liter" ? 2499 : 11999)
                      ).toLocaleString()}
                    </span>
                    {purchaseType === "subscribe" && (
                      <span className="text-xs text-[#E2E4E9]/40 line-through">
                        {volumes.find(v => v.name === selectedVolume)?.price}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-[#E2E4E9]/40 tracking-wider font-semibold uppercase">Free Complimentary Shipping</span>
                </div>

                <p className="text-sm text-[#E2E4E9]/70 leading-relaxed font-light mb-10">
                  {volumes.find(v => v.name === selectedVolume)?.desc}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-stretch sm:items-center">
                  <button 
                    onClick={() => {
                      const selected = volumes.find(v => v.name === selectedVolume);
                      if (selected) {
                        const basePrice = selectedVolume === "500ml" ? 1299 : selectedVolume === "1 Liter" ? 2499 : 11999;
                        const priceNum = purchaseType === "subscribe" ? Math.floor(basePrice * 0.9) : basePrice;
                        const volumeLabel = purchaseType === "subscribe" ? `${selectedVolume} (Monthly Auto-ship)` : selectedVolume;
                        window.dispatchEvent(new CustomEvent("add-to-cart", {
                          detail: {
                            id: selectedVolume === "500ml" ? 1 : selectedVolume === "1 Liter" ? 2 : 3,
                            name: purchaseType === "subscribe" ? "A2 Desi Cow Ghee [Subscription]" : "Pure A2 Desi Cow Ghee",
                            volume: volumeLabel,
                            price: priceNum
                          }
                        }));
                      }
                    }} 
                    className="px-10 py-5 bg-gradient-to-b from-[#E6C98A] via-[#C5A059] to-[#A88543] text-[#0A0E17] rounded-full font-bold tracking-widest uppercase text-xs hover:brightness-110 shadow-[0_10px_25px_rgba(197,160,89,0.3)] hover:-translate-y-0.5 transition-all cursor-pointer text-center"
                  >
                    Add to Cart
                  </button>
                  <button 
                    onClick={() => navigate('/products')}
                    className="px-8 py-5 border border-[#E2E4E9]/20 text-[#E2E4E9] rounded-full font-bold tracking-widest uppercase text-xs hover:border-white transition-colors cursor-pointer text-center"
                  >
                    All Products
                  </button>
                  <a 
                    href={`https://wa.me/919948233702?text=${encodeURIComponent(
                      `Hello Team SRR Farms, I would like to place an order for the ${selectedVolume} jar of Pure A2 Desi Cow Ghee (${purchaseType === "subscribe" ? "Subscription Plan" : "One-time Purchase"}). Please share details.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-bold tracking-widest uppercase text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-[0_10px_25px_rgba(16,185,129,0.2)] text-center"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.503-5.733-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.118-2.905-6.993-1.876-1.875-4.359-2.907-6.999-2.909-5.443 0-9.87 4.417-9.873 9.861-.001 1.79.483 3.541 1.398 5.091L1.85 22.147l4.797-1.258zM17.482 14.3c-.302-.15-1.787-.882-2.062-.982-.275-.1-.475-.15-.675.15-.2.3-.775.982-.95 1.182-.175.2-.35.225-.65.075-.3-.15-1.267-.467-2.414-1.492-.893-.797-1.496-1.78-1.671-2.08-.175-.3-.019-.462.132-.612.135-.135.302-.35.452-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.589-.493-.51-.675-.52l-.575-.01c-.2 0-.525.075-.8.376-.275.3-1.05 1.027-1.05 2.504 0 1.478 1.075 2.903 1.225 3.103.15.2 2.115 3.23 5.124 4.53.715.31 1.273.495 1.708.634.719.228 1.375.196 1.892.119.577-.087 1.787-.732 2.037-1.439.25-.706.25-1.314.175-1.439-.075-.125-.275-.2-.575-.35z"/>
                    </svg>
                    Order on WhatsApp
                  </a>
                </div>
              </motion.div>
            </div>

          </div>

        </div>
      </section>

      {/* ================= TESTIMONIALS SECTION ================= */}
      <section className="py-32 px-6 lg:px-16 relative">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-xs font-bold tracking-[0.3em] text-[#C5A059] uppercase mb-4">Customer Endorsements</h2>
            <h3 className="font-serif text-4xl md:text-5xl font-bold">Trusted by Health Purists</h3>
            <div className="w-12 h-0.5 bg-[#C5A059] mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                text: "The aroma takes me straight back to my childhood. The granularity is exceptional—exactly like my grandmother used to prepare over firewood. Absolutely buying again.",
                author: "Anjali S.",
                role: "Nutrition Therapist",
                stars: 5
              },
              {
                text: "Being lactose-sensitive, dairy is usually out. But SRR Farms' slow-clarified ghee digests beautifully. It has a beautiful rich colour and elevates my breakfast bullet coffee.",
                author: "Rohan M.",
                role: "Fitness Coach",
                stars: 5
              },
              {
                text: "Incredible packaging and prompt service. The glass jar seal is solid, keeping that rich, deep butter fragrance intact. Highly recommend for pure A2 quality.",
                author: "Divya K.",
                role: "Home Culinary Artist",
                stars: 5
              }
            ].map((t, i) => (
              <div 
                key={i} 
                className="bg-[#05070B] p-10 border border-[#E2E4E9]/10 rounded-2xl flex flex-col justify-between hover:border-[#C5A059]/40 hover:shadow-xl transition-all duration-500 relative"
              >
                <div>
                  <div className="flex gap-1 mb-6">
                    {[...Array(t.stars)].map((_, s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
                    ))}
                  </div>
                  <p className="text-sm text-[#E2E4E9]/75 italic leading-relaxed font-light mb-8">
                    "{t.text}"
                  </p>
                </div>
                
                <div className="border-t border-[#E2E4E9]/10 pt-6">
                  <div className="font-serif text-base font-bold text-[#E2E4E9]">{t.author}</div>
                  <div className="text-[10px] text-[#C5A059] tracking-wider uppercase font-semibold mt-1">{t.role}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ================= LAB CERTIFICATIONS SECTION ================= */}
      <section className="py-24 bg-[#0A0E17] px-6 lg:px-16 border-t border-[#E2E4E9]/5 relative overflow-hidden">
        <div className="absolute bottom-0 right-[20%] w-[35vw] h-[35vw] rounded-full bg-[#C5A059]/5 blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-5">
              <span className="text-xs font-bold tracking-[0.3em] text-[#C5A059] uppercase mb-4 block">Uncompromising Quality</span>
              <h3 className="font-serif text-4xl md:text-5xl font-bold mb-6">Lab Certified Purity</h3>
              <p className="text-sm text-[#E2E4E9]/60 leading-relaxed font-light mb-8">
                We validate every batch at independent NABL-accredited laboratories. We test for moisture values, free fatty acidity, peroxide values, and guarantee 100% absence of adulterants, vegetable oils, and starch.
              </p>
              
              <div className="space-y-4">
                {[
                  "FSSAI Registered Operations",
                  "Tested for Zero Adulterants",
                  "Verified A2 Casein Structure"
                ].map((check, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-[#E2E4E9]">
                    <span className="w-5 h-5 rounded-full border border-emerald-500 bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-emerald-400" />
                    </span>
                    {check}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 gap-6">
              {[
                { label: "Moisture Content", value: "< 0.2%", desc: "Ensuring long shelf stability without additives" },
                { label: "Free Fatty Acids", value: "< 0.5%", desc: "Indicative of optimal firewood heat control" },
                { label: "Peroxide Value", value: "0.0 meq/kg", desc: "Verifying absolute freshness and no rancidity" },
                { label: "Milk Casein Test", value: "100% A2", desc: "Guaranteed Gir Cow milk origin profile" }
              ].map((metric, i) => (
                <div key={i} className="bg-[#05070B] p-8 border border-[#E2E4E9]/10 rounded-xl hover:border-[#C5A059]/30 transition-colors">
                  <span className="text-[10px] text-[#C5A059] tracking-wider uppercase font-bold block mb-2">{metric.label}</span>
                  <span className="font-serif text-3xl font-bold text-white block mb-2">{metric.value}</span>
                  <p className="text-xs text-[#E2E4E9]/40 leading-relaxed font-light">{metric.desc}</p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>


      {/* ================= BATCH TRACEABILITY SECTION ================= */}
      <section className="py-24 bg-[#05070B] px-6 lg:px-16 border-t border-[#E2E4E9]/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-5">
              <span className="text-xs font-bold tracking-[0.3em] text-[#C5A059] uppercase mb-4 block">Organic Trust Audit</span>
              <h3 className="font-serif text-4xl md:text-5xl font-bold mb-6">Trace Your Harvest</h3>
              <p className="text-sm text-[#E2E4E9]/60 leading-relaxed font-light mb-8">
                Enter your jar's batch number printed on the back label to view a detailed verification report of the pasture location, cow breed, curd fermentation date, and lab purity logs.
              </p>
              
              <div className="flex gap-4">
                <input 
                  type="text" 
                  value={batchNo}
                  onChange={(e) => setBatchNo(e.target.value)}
                  placeholder="Enter batch number (78, 77, 76)"
                  className="bg-[#0A0E17] border border-[#E2E4E9]/15 rounded-xl px-5 py-4 focus:outline-none focus:border-[#C5A059] transition-colors text-white placeholder:text-white/20 text-sm flex-1 font-light"
                />
                 <button
                  onClick={async () => {
                    const cleanVal = batchNo.trim();
                    if (!cleanVal) return;
                    try {
                      const { data, error } = await supabase
                        .from('batches')
                        .select('*')
                        .eq('batch_no', cleanVal)
                        .maybeSingle();
                      if (error) throw error;
                      if (data) {
                        setBatchReport({
                          batch: data.batch_no,
                          milking: data.milking_date,
                          churn: data.churn_date,
                          clarify: data.churn_date,
                          pasture: data.pasture_origin,
                          acidity: data.acidity,
                          cows: data.cow_shelter
                        });
                      } else {
                        setBatchReport("error");
                      }
                    } catch (e) {
                      setBatchReport("error");
                    }
                  }}
                  className="px-8 py-4 bg-gradient-to-b from-[#E6C98A] via-[#C5A059] to-[#A88543] text-[#0A0E17] rounded-xl font-bold tracking-widest uppercase text-xs hover:brightness-110 shadow-md transition-all cursor-pointer"
                >
                  Audit
                </button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                {batchReport === null ? (
                  <motion.div 
                    key="empty-report"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="border border-[#E2E4E9]/5 bg-[#0A0E17]/20 rounded-2xl p-10 flex flex-col items-center justify-center text-center h-[320px] backdrop-blur-md"
                  >
                    <ShieldCheck className="w-12 h-12 text-[#E2E4E9]/10 mb-4" />
                    <p className="text-sm text-[#E2E4E9]/40 font-light">Verification report will render here upon look up.</p>
                  </motion.div>
                ) : batchReport === "error" ? (
                  <motion.div 
                    key="error-report"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="border border-red-500/20 bg-red-500/5 rounded-2xl p-10 flex flex-col items-center justify-center text-center h-[320px]"
                  >
                    <X className="w-10 h-10 text-red-400 mb-4" />
                    <p className="text-sm font-semibold text-white">Batch Not Found</p>
                    <p className="text-xs text-[#E2E4E9]/50 font-light mt-2 max-w-xs">Enter Batch #78, #77, or #76 (representing currently active clarifying batches) to trace your jar.</p>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="data-report"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="border border-[#C5A059]/30 bg-[#0A0E17]/40 rounded-2xl p-8 space-y-6 backdrop-blur-md text-left"
                  >
                    <div className="flex justify-between items-center border-b border-[#E2E4E9]/10 pb-4">
                      <div>
                        <span className="text-[10px] text-[#C5A059] tracking-wider uppercase font-bold">Traceability Audit</span>
                        <h4 className="font-serif text-xl font-bold text-white mt-1">Batch #{batchReport.batch} Verified Report</h4>
                      </div>
                      <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[9px] font-bold tracking-wider uppercase rounded-full">
                        100% Authentic
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-6 text-xs font-light">
                      <div>
                        <span className="text-[#E2E4E9]/40 block mb-1">Pasture Sourced</span>
                        <span className="font-medium text-white">{batchReport.pasture}</span>
                      </div>
                      <div>
                        <span className="text-[#E2E4E9]/40 block mb-1">Cows Origin</span>
                        <span className="font-medium text-white">{batchReport.cows}</span>
                      </div>
                      <div>
                        <span className="text-[#E2E4E9]/40 block mb-1">Milking Date</span>
                        <span className="font-medium text-white">{batchReport.milking}</span>
                      </div>
                      <div>
                        <span className="text-[#E2E4E9]/40 block mb-1">Curd Churn Date</span>
                        <span className="font-medium text-white">{batchReport.churn}</span>
                      </div>
                      <div>
                        <span className="text-[#E2E4E9]/40 block mb-1">Wood-Fire Clarification</span>
                        <span className="font-medium text-white">{batchReport.clarify}</span>
                      </div>
                      <div>
                        <span className="text-[#E2E4E9]/40 block mb-1">Lab Acid Metrics</span>
                        <span className="font-medium text-[#C5A059]">{batchReport.acidity}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="py-24 bg-[#0A0E17] px-6 lg:px-16 border-t border-[#E2E4E9]/5 relative">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold tracking-[0.3em] text-[#C5A059] uppercase mb-4">FAQ</h2>
            <h3 className="font-serif text-3xl md:text-4xl font-bold">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className="border border-[#E2E4E9]/10 rounded-xl overflow-hidden bg-[#05070B] transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none hover:text-[#C5A059] transition-colors"
                >
                  <span className="font-serif text-lg font-bold text-[#E2E4E9] pr-4">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#C5A059] transition-transform duration-300 flex-shrink-0 ${
                    openFaq === i ? "rotate-180" : ""
                  }`} />
                </button>
                
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === i ? "auto" : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="p-6 pt-0 border-t border-[#E2E4E9]/5 text-sm text-[#E2E4E9]/60 leading-relaxed font-light">
                    {faq.a}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= FINAL CTA SECTION ================= */}
      <section className="py-32 px-6 text-center relative overflow-hidden bg-[#05070B]">
        <div className="absolute inset-0 bg-noise opacity-30 mix-blend-multiply pointer-events-none"></div>
        <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[60vw] h-[60vw] rounded-full bg-[#C5A059]/5 blur-[120px] pointer-events-none"></div>

        <div className="max-w-2xl mx-auto relative z-10 flex flex-col items-center">
          <h2 className="text-xs font-bold tracking-[0.4em] text-[#C5A059] uppercase mb-6">Taste Purity</h2>
          <h3 className="font-serif text-4xl md:text-6xl font-bold mb-8 leading-tight">Bring Home Vedic Heritage</h3>
          <p className="text-base text-[#E2E4E9]/60 font-light leading-relaxed mb-12 max-w-lg">
            Experience the genuine taste, grain texture, and deep health wellness of handcrafted Bilona A2 Ghee.
          </p>

          <button 
            onClick={() => navigate('/products')}
            className="group relative px-12 py-5 bg-gradient-to-b from-[#E6C98A] via-[#C5A059] to-[#A88543] text-[#0A0E17] rounded-full font-bold tracking-widest uppercase text-xs hover:brightness-110 shadow-[0_15px_40px_rgba(197,160,89,0.4)] hover:-translate-y-1 transition-all"
          >
            Order Pure Ghee
          </button>
        </div>
      </section>

      {/* ================= FLOATING LUXURY ELEMENTS ================= */}
      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 z-[90] w-12 h-12 rounded-full border border-[#C5A059]/40 bg-[#0A0E17]/85 backdrop-blur-md flex items-center justify-center text-[#C5A059] hover:border-[#E6C98A] hover:text-white transition-all shadow-xl hover:-translate-y-0.5 cursor-pointer"
          >
            <ChevronDown className="w-5 h-5 rotate-180" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Live Harvest Status */}
      <div className="fixed bottom-8 left-8 z-[90] hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-full border border-[#C5A059]/20 bg-[#0A0E17]/90 backdrop-blur-md shadow-2xl">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-[9px] tracking-widest font-bold uppercase text-[#E2E4E9]/80">
          Batch #78 Clarifying ❖ Ships tomorrow
        </span>
      </div>

      {/* ================= CINEMATIC VIDEO DIALOG/MODAL ================= */}
      <AnimatePresence>
        {isVideoOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsVideoOpen(false)}
              className="fixed inset-0 bg-black/95 z-[200] backdrop-blur-md"
            />

            {/* Video Player Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-6 sm:inset-12 md:inset-x-auto md:left-[50%] md:-translate-x-1/2 md:top-[15%] md:w-full md:max-w-4xl aspect-video bg-[#05070B] border border-[#C5A059]/25 z-[201] shadow-2xl rounded-2xl overflow-hidden flex flex-col justify-between"
            >
              {/* Custom Header overlay */}
              <div className="absolute top-0 inset-x-0 p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent z-10">
                <span className="text-[10px] font-bold tracking-[0.25em] text-[#C5A059] uppercase">The Story of SRR Farms</span>
                <button
                  onClick={() => setIsVideoOpen(false)}
                  className="w-8 h-8 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center hover:border-white transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Video Tag */}
              <video 
                src="https://assets.mixkit.co/videos/preview/mixkit-sunbeams-shining-through-green-leaves-of-trees-34389-large.mp4" 
                controls 
                autoPlay 
                loop
                className="w-full h-full object-cover"
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
