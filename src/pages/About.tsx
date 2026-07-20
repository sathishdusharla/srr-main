import { motion } from "motion/react";
import { Sparkles, Heart, Shield, Check } from "lucide-react";

export default function About() {
  return (
    <div className="bg-[#05070B] text-[#E2E4E9]">
      
      {/* ================= EDITORIAL BANNER ================= */}
      <div className="relative pt-28 md:pt-36 pb-24 px-6 max-w-7xl mx-auto border-b border-[#E2E4E9]/10">
        <div className="absolute top-[20%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-[#C5A059]/5 blur-[120px] pointer-events-none"></div>
        <div className="absolute top-[30%] left-[5%] w-[25vw] h-[25vw] rounded-full bg-[#121A2F]/20 blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 text-center flex flex-col items-center">
          <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-[#C5A059] uppercase mb-4">
            Our Legacy
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl leading-tight">
            The Story of SRR Farms
          </h1>
          <p className="text-sm md:text-base text-[#E2E4E9]/60 font-light max-w-2xl leading-relaxed">
            Preserving ancestral Ayurvedic practices, we slow-craft raw A2 milk using wooden churners and firewood to bring you true, unadulterated golden ghee.
          </p>
        </div>
      </div>

      {/* ================= THE STORY SECTION ================= */}
      <div className="py-24 px-6 max-w-7xl mx-auto relative z-10">
        
        {/* Row 1: Asymmetric Text and Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <h2 className="text-xs font-bold tracking-[0.25em] text-[#C5A059] uppercase mb-4">The Genesis</h2>
            <h3 className="font-serif text-4xl lg:text-5xl font-bold text-[#E2E4E9] mb-8 leading-tight">
              Rooted in <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF5C3] via-[#C5A059] to-[#A88543] italic font-light">Ayurvedic Tradition.</span>
            </h3>
            
            <div className="space-y-6 text-[#E2E4E9]/70 font-light text-base leading-relaxed">
              <p>
                SRR Farms was born out of a deep concern for our modern lifestyle. In an era of ultra-processed dairy, the ancient medicinal value of native cow ghee has been diluted into industrial cream boiling.
              </p>
              <p>
                We set out with a simple promise: no shortcuts, no compromises. We source exclusively from pasture-raised native Indian cows and adhere strictly to the traditional Vedic Bilona protocol.
              </p>
            </div>

            {/* Founder info and signature */}
            <div className="mt-12 flex items-center gap-6">
              <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden border border-[#C5A059]/30">
                <img 
                  src="https://images.unsplash.com/photo-1595858102377-ce669225725d?auto=format&fit=crop&q=80&w=150" 
                  alt="Founder" 
                  className="w-full h-full object-cover grayscale"
                />
              </div>
              <div>
                {/* Simulated signature using handwriting-style typography */}
                <span className="font-serif text-2xl italic tracking-wider text-[#C5A059] block select-none">
                  Team SRR Farms
                </span>
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#E2E4E9]/50 mt-1 block">
                  Team SRR Farms
                </span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-7 relative"
          >
            <div className="absolute -inset-4 border border-[#C5A059]/25 -z-10 translate-x-4 translate-y-4"></div>
            <div className="relative h-[480px] lg:h-[540px] overflow-hidden border border-[#E2E4E9]/15 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1594498653385-d5172c532c00?auto=format&fit=crop&q=80&w=1200" 
                alt="Native grazing cows in open fields" 
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-103"
              />
            </div>
          </motion.div>
        </div>

        {/* Row 2: Brand Values Section */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-xs font-bold tracking-[0.3em] text-[#C5A059] uppercase mb-4">Core Philosophy</h2>
          <h3 className="font-serif text-3xl md:text-4xl font-bold">The SRR Purity Pledge</h3>
          <div className="w-12 h-px bg-[#C5A059] mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Grass-Fed Pastures",
              icon: <Heart className="w-6 h-6 text-[#C5A059]" />,
              desc: "Our native cows graze freely on natural pastures, absorbing solar energy which enriches their A2 milk with higher beta-casein proteins."
            },
            {
              title: "Ancient Clay-Pot Churn",
              icon: <Sparkles className="w-6 h-6 text-[#C5A059]" />,
              desc: "We culturize milk into curd in large clay handis, churning it bi-directionally to naturally lock in structural granularity and fragrance."
            },
            {
              title: "Chemical Free Purity",
              icon: <Shield className="w-6 h-6 text-[#C5A059]" />,
              desc: "Absolutely zero preservatives, flavor enhancers, coloring, or GMO ingredients. Raw, pure, wood-fire clarified liquid gold."
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="bg-[#0A0E17] p-12 border border-[#E2E4E9]/10 rounded-xl text-center group hover:border-[#C5A059]/40 hover:shadow-2xl transition-all duration-500 relative"
            >
              <div className="w-14 h-14 border border-[#C5A059]/30 bg-[#C5A059]/5 flex items-center justify-center mx-auto mb-8 rounded-full group-hover:bg-[#C5A059]/10 group-hover:scale-105 transition-all">
                {item.icon}
              </div>
              <h4 className="font-serif text-2xl font-bold text-[#E2E4E9] mb-4">{item.title}</h4>
              <p className="text-sm text-[#E2E4E9]/60 font-light leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>

    </div>
  );
}
